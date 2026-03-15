import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js@2.39.3";
import * as kv from "./kv_store.tsx";
import { jsPDF } from "npm:jspdf@2.5.2";

const app = new Hono();

// Supabase client
const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
);

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Helper function to verify user
async function verifyUser(authHeader: string | null) {
  console.log('verifyUser called with header:', authHeader?.substring(0, 30) + '...');
  
  if (!authHeader?.startsWith('Bearer ')) {
    console.log('Missing or invalid authorization header format');
    return { error: 'Missing authorization header', user: null };
  }
  
  const token = authHeader.split(' ')[1];
  console.log('Extracted token (first 20 chars):', token?.substring(0, 20));
  
  try {
    const { data: { user }, error } = await supabase.auth.getUser(token);
    
    console.log('getUser result:', { hasUser: !!user, userId: user?.id, error: error?.message });
    
    if (error || !user) {
      console.log('Authorization failed:', error?.message || 'No user found');
      return { error: error?.message || 'Unauthorized', user: null };
    }
    
    return { error: null, user };
  } catch (e) {
    console.log('Exception in verifyUser:', e);
    return { error: 'Authorization failed', user: null };
  }
}

// Health check endpoint
app.get("/make-server-13e89e3d/health", (c) => {
  return c.json({ status: "ok" });
});

// Auth: Sign up
app.post("/make-server-13e89e3d/auth/signup", async (c) => {
  try {
    const { email, password, name } = await c.req.json();
    
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name },
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true
    });
    
    if (error) {
      return c.json({ error: error.message }, 400);
    }
    
    return c.json({ user: data.user });
  } catch (error) {
    console.log('Signup error:', error);
    return c.json({ error: 'Signup failed' }, 500);
  }
});

// Analytics: Get user stats
app.get("/make-server-13e89e3d/analytics/stats", async (c) => {
  try {
    const { error, user } = await verifyUser(c.req.header('Authorization'));
    if (error) return c.json({ error }, 401);
    
    // Get all analyses for user
    const analyses = await kv.getByPrefix(`analysis:${user.id}:`);
    
    const stats = {
      totalAnalyses: analyses.length,
      byMode: { video: 0, audio: 0, text: 0, image: 0 },
      highRisk: 0,
      mediumRisk: 0,
      lowRisk: 0,
      avgScore: 0,
    };
    
    let totalScore = 0;
    analyses.forEach((analysis: any) => {
      stats.byMode[analysis.mode as keyof typeof stats.byMode]++;
      totalScore += analysis.overallScore;
      
      if (analysis.overallScore > 70) stats.highRisk++;
      else if (analysis.overallScore > 40) stats.mediumRisk++;
      else stats.lowRisk++;
    });
    
    stats.avgScore = analyses.length > 0 ? Math.round(totalScore / analyses.length) : 0;
    
    return c.json(stats);
  } catch (error) {
    console.log('Stats error:', error);
    return c.json({ error: 'Failed to get stats' }, 500);
  }
});

// Analysis: Save new analysis
app.post("/make-server-13e89e3d/analysis/save", async (c) => {
  try {
    console.log('Save analysis request received');
    
    const { error, user } = await verifyUser(c.req.header('Authorization'));
    if (error) {
      console.log('Authorization error:', error);
      return c.json({ error }, 401);
    }
    
    console.log('User verified:', user.id);
    
    const analysisData = await c.req.json();
    console.log('Analysis data received:', { mode: analysisData.mode, fileName: analysisData.fileName });
    
    const analysisId = crypto.randomUUID();
    
    const analysis = {
      id: analysisId,
      userId: user.id,
      ...analysisData,
      createdAt: new Date().toISOString(),
    };
    
    console.log('Attempting to save to KV store with key:', `analysis:${user.id}:${analysisId}`);
    
    await kv.set(`analysis:${user.id}:${analysisId}`, analysis);
    
    console.log('Analysis saved successfully');
    
    return c.json({ id: analysisId, analysis });
  } catch (error) {
    console.log('Save analysis error:', error);
    return c.json({ error: `Failed to save analysis: ${error.message || error}` }, 500);
  }
});

// Analysis: Get all user analyses
app.get("/make-server-13e89e3d/analysis/history", async (c) => {
  try {
    const { error, user } = await verifyUser(c.req.header('Authorization'));
    if (error) return c.json({ error }, 401);
    
    const analyses = await kv.getByPrefix(`analysis:${user.id}:`);
    
    // Sort by date, newest first
    analyses.sort((a: any, b: any) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    
    return c.json({ analyses });
  } catch (error) {
    console.log('Get history error:', error);
    return c.json({ error: 'Failed to get history' }, 500);
  }
});

// Analysis: Get single analysis
app.get("/make-server-13e89e3d/analysis/:id", async (c) => {
  try {
    const { error, user } = await verifyUser(c.req.header('Authorization'));
    if (error) return c.json({ error }, 401);
    
    const id = c.req.param('id');
    const analysis = await kv.get(`analysis:${user.id}:${id}`);
    
    if (!analysis) {
      return c.json({ error: 'Analysis not found' }, 404);
    }
    
    return c.json({ analysis });
  } catch (error) {
    console.log('Get analysis error:', error);
    return c.json({ error: 'Failed to get analysis' }, 500);
  }
});

// Analysis: Delete analysis
app.delete("/make-server-13e89e3d/analysis/:id", async (c) => {
  try {
    const { error, user } = await verifyUser(c.req.header('Authorization'));
    if (error) return c.json({ error }, 401);
    
    const id = c.req.param('id');
    await kv.del(`analysis:${user.id}:${id}`);
    
    return c.json({ success: true });
  } catch (error) {
    console.log('Delete analysis error:', error);
    return c.json({ error: 'Failed to delete analysis' }, 500);
  }
});

// Reports: Generate PDF for analysis
app.post("/make-server-13e89e3d/reports/generate-pdf", async (c) => {
  try {
    const { error, user } = await verifyUser(c.req.header('Authorization'));
    if (error) return c.json({ error }, 401);
    
    const { analysisId } = await c.req.json();
    
    // Get analysis data
    const analysis = await kv.get(`analysis:${user.id}:${analysisId}`);
    
    if (!analysis) {
      return c.json({ error: 'Analysis not found' }, 404);
    }
    
    // Generate PDF
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const margin = 20;
    let yPos = 20;
    
    // Header
    pdf.setFillColor(59, 130, 246);
    pdf.rect(0, 0, pageWidth, 40, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(24);
    pdf.setFont('helvetica', 'bold');
    pdf.text('TRUTHGUARD AI', pageWidth / 2, 20, { align: 'center' });
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
    pdf.text('Deepfake Detection Report', pageWidth / 2, 30, { align: 'center' });
    
    yPos = 50;
    pdf.setTextColor(0, 0, 0);
    
    // Analysis Details
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Analysis Report', margin, yPos);
    yPos += 10;
    
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'normal');
    pdf.text(`File: ${analysis.fileName || 'Unknown'}`, margin, yPos);
    yPos += 7;
    pdf.text(`Type: ${analysis.mode.toUpperCase()}`, margin, yPos);
    yPos += 7;
    pdf.text(`Date: ${new Date(analysis.createdAt).toLocaleString()}`, margin, yPos);
    yPos += 7;
    pdf.text(`Analysis ID: ${analysisId}`, margin, yPos);
    yPos += 15;
    
    // Overall Score
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Overall Detection Score', margin, yPos);
    yPos += 10;
    
    const scoreColor = analysis.overallScore > 70 ? [220, 38, 38] : 
                       analysis.overallScore > 40 ? [234, 179, 8] : [34, 197, 94];
    pdf.setFontSize(32);
    pdf.setTextColor(scoreColor[0], scoreColor[1], scoreColor[2]);
    pdf.text(`${analysis.overallScore}%`, margin, yPos);
    yPos += 10;
    
    pdf.setFontSize(11);
    pdf.setTextColor(0, 0, 0);
    const verdict = analysis.overallScore > 70 ? 'HIGH RISK - Likely Deepfake' :
                   analysis.overallScore > 40 ? 'MEDIUM RISK - Suspicious' : 'LOW RISK - Likely Authentic';
    pdf.text(verdict, margin, yPos);
    yPos += 15;
    
    // Detection Breakdown
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Detection Breakdown', margin, yPos);
    yPos += 10;
    
    if (analysis.breakdown) {
      analysis.breakdown.forEach((item: any) => {
        pdf.setFontSize(11);
        pdf.setFont('helvetica', 'bold');
        pdf.text(item.method, margin, yPos);
        pdf.setFont('helvetica', 'normal');
        pdf.text(`${item.score}%`, pageWidth - margin - 20, yPos);
        yPos += 7;
      });
    }
    yPos += 10;
    
    // Model Consensus
    if (yPos > 250) {
      pdf.addPage();
      yPos = 20;
    }
    
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('AI Model Consensus', margin, yPos);
    yPos += 10;
    
    if (analysis.modelConsensus) {
      analysis.modelConsensus.forEach((model: any) => {
        pdf.setFontSize(11);
        pdf.setFont('helvetica', 'bold');
        pdf.text(model.name, margin, yPos);
        pdf.setFont('helvetica', 'normal');
        pdf.text(`${model.confidence}%`, pageWidth - margin - 20, yPos);
        yPos += 5;
        pdf.setFontSize(9);
        pdf.text(model.verdict, margin + 5, yPos);
        yPos += 8;
      });
    }
    
    // Issues
    if (analysis.issues && analysis.issues.length > 0) {
      if (yPos > 200) {
        pdf.addPage();
        yPos = 20;
      }
      
      yPos += 10;
      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Detected Issues', margin, yPos);
      yPos += 10;
      
      analysis.issues.forEach((issue: any, idx: number) => {
        if (yPos > 270) {
          pdf.addPage();
          yPos = 20;
        }
        
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'bold');
        pdf.text(`${idx + 1}. ${issue.title}`, margin, yPos);
        yPos += 5;
        pdf.setFontSize(9);
        pdf.setFont('helvetica', 'normal');
        const lines = pdf.splitTextToSize(issue.description, pageWidth - 2 * margin);
        pdf.text(lines, margin + 5, yPos);
        yPos += lines.length * 4 + 5;
      });
    }
    
    // Footer
    const pageCount = (pdf as any).internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      pdf.setPage(i);
      pdf.setFontSize(8);
      pdf.setTextColor(100, 100, 100);
      pdf.text(`Page ${i} of ${pageCount}`, pageWidth / 2, pdf.internal.pageSize.getHeight() - 10, { align: 'center' });
      pdf.text('Generated by TruthGuard AI', margin, pdf.internal.pageSize.getHeight() - 10);
    }
    
    // Save to Supabase Storage
    const pdfBytes = pdf.output('arraybuffer');
    const fileName = `report-${analysisId}-${Date.now()}.pdf`;
    
    // Create bucket if it doesn't exist
    const bucketName = 'make-13e89e3d-reports';
    const { data: buckets } = await supabase.storage.listBuckets();
    const bucketExists = buckets?.some(bucket => bucket.name === bucketName);
    
    if (!bucketExists) {
      await supabase.storage.createBucket(bucketName, { public: false });
    }
    
    // Upload file
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(`${user.id}/${fileName}`, pdfBytes, {
        contentType: 'application/pdf',
        upsert: false
      });
    
    if (uploadError) {
      console.log('Upload error:', uploadError);
      return c.json({ error: 'Failed to upload PDF' }, 500);
    }
    
    // Create signed URL (valid for 1 hour)
    const { data: signedUrlData, error: signedUrlError } = await supabase.storage
      .from(bucketName)
      .createSignedUrl(`${user.id}/${fileName}`, 3600);
    
    if (signedUrlError) {
      return c.json({ error: 'Failed to create download URL' }, 500);
    }
    
    return c.json({ 
      success: true, 
      downloadUrl: signedUrlData.signedUrl,
      fileName 
    });
  } catch (error) {
    console.log('PDF generation error:', error);
    return c.json({ error: `Failed to generate PDF: ${error.message || error}` }, 500);
  }
});

// Reports: Generate monthly summary
app.post("/make-server-13e89e3d/reports/monthly-summary", async (c) => {
  try {
    const { error, user } = await verifyUser(c.req.header('Authorization'));
    if (error) return c.json({ error }, 401);
    
    const { month, year } = await c.req.json();
    
    // Get all analyses for user
    const analyses = await kv.getByPrefix(`analysis:${user.id}:`);
    
    // Filter by month/year
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59);
    
    const monthAnalyses = analyses.filter((a: any) => {
      const date = new Date(a.createdAt);
      return date >= startDate && date <= endDate;
    });
    
    // Generate summary PDF
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const margin = 20;
    let yPos = 20;
    
    // Header
    pdf.setFillColor(59, 130, 246);
    pdf.rect(0, 0, pageWidth, 40, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(24);
    pdf.setFont('helvetica', 'bold');
    pdf.text('TRUTHGUARD AI', pageWidth / 2, 20, { align: 'center' });
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
    pdf.text('Monthly Summary Report', pageWidth / 2, 30, { align: 'center' });
    
    yPos = 50;
    pdf.setTextColor(0, 0, 0);
    
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    const monthName = new Date(year, month - 1).toLocaleString('default', { month: 'long' });
    pdf.text(`${monthName} ${year} Summary`, margin, yPos);
    yPos += 15;
    
    // Stats
    const stats = {
      total: monthAnalyses.length,
      byMode: { video: 0, audio: 0, text: 0, image: 0 },
      highRisk: 0,
      mediumRisk: 0,
      lowRisk: 0,
      avgScore: 0
    };
    
    let totalScore = 0;
    monthAnalyses.forEach((a: any) => {
      stats.byMode[a.mode as keyof typeof stats.byMode]++;
      totalScore += a.overallScore;
      
      if (a.overallScore > 70) stats.highRisk++;
      else if (a.overallScore > 40) stats.mediumRisk++;
      else stats.lowRisk++;
    });
    
    stats.avgScore = stats.total > 0 ? Math.round(totalScore / stats.total) : 0;
    
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
    pdf.text(`Total Analyses: ${stats.total}`, margin, yPos);
    yPos += 7;
    pdf.text(`Average Risk Score: ${stats.avgScore}%`, margin, yPos);
    yPos += 7;
    pdf.text(`High Risk: ${stats.highRisk} | Medium Risk: ${stats.mediumRisk} | Low Risk: ${stats.lowRisk}`, margin, yPos);
    yPos += 15;
    
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Analysis Breakdown by Type', margin, yPos);
    yPos += 10;
    
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'normal');
    Object.entries(stats.byMode).forEach(([mode, count]) => {
      pdf.text(`${mode.charAt(0).toUpperCase() + mode.slice(1)}: ${count}`, margin, yPos);
      yPos += 7;
    });
    
    // Save PDF
    const pdfBytes = pdf.output('arraybuffer');
    const fileName = `monthly-summary-${year}-${month}-${Date.now()}.pdf`;
    
    const bucketName = 'make-13e89e3d-reports';
    const { data: buckets } = await supabase.storage.listBuckets();
    const bucketExists = buckets?.some(bucket => bucket.name === bucketName);
    
    if (!bucketExists) {
      await supabase.storage.createBucket(bucketName, { public: false });
    }
    
    await supabase.storage
      .from(bucketName)
      .upload(`${user.id}/${fileName}`, pdfBytes, {
        contentType: 'application/pdf',
        upsert: false
      });
    
    const { data: signedUrlData } = await supabase.storage
      .from(bucketName)
      .createSignedUrl(`${user.id}/${fileName}`, 3600);
    
    return c.json({ 
      success: true, 
      downloadUrl: signedUrlData?.signedUrl,
      fileName,
      stats
    });
  } catch (error) {
    console.log('Monthly summary error:', error);
    return c.json({ error: `Failed to generate summary: ${error.message || error}` }, 500);
  }
});

// MTRRS: Get all threats/alerts
app.get("/make-server-13e89e3d/mtrrs/threats", async (c) => {
  try {
    const { error, user } = await verifyUser(c.req.header('Authorization'));
    if (error) return c.json({ error }, 401);
    
    const threats = await kv.getByPrefix('mtrrs:threat:');
    
    // Sort by timestamp, newest first
    threats.sort((a: any, b: any) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
    
    return c.json({ threats });
  } catch (error) {
    console.log('Get threats error:', error);
    return c.json({ error: 'Failed to get threats' }, 500);
  }
});

// MTRRS: Create new threat/alert
app.post("/make-server-13e89e3d/mtrrs/threats", async (c) => {
  try {
    const { error, user } = await verifyUser(c.req.header('Authorization'));
    if (error) return c.json({ error }, 401);
    
    const threatData = await c.req.json();
    
    // Generate threat ID
    const threatCount = (await kv.getByPrefix('mtrrs:threat:')).length;
    const threatId = `ALT-2026-${String(threatCount + 1).padStart(4, '0')}`;
    
    const threat = {
      id: threatId,
      ...threatData,
      timestamp: new Date().toISOString(),
      createdBy: user.id
    };
    
    await kv.set(`mtrrs:threat:${threatId}`, threat);
    
    return c.json({ success: true, threat });
  } catch (error) {
    console.log('Create threat error:', error);
    return c.json({ error: 'Failed to create threat' }, 500);
  }
});

// MTRRS: Update threat status
app.put("/make-server-13e89e3d/mtrrs/threats/:id", async (c) => {
  try {
    const { error, user } = await verifyUser(c.req.header('Authorization'));
    if (error) return c.json({ error }, 401);
    
    const id = c.req.param('id');
    const updates = await c.req.json();
    
    const threat = await kv.get(`mtrrs:threat:${id}`);
    if (!threat) {
      return c.json({ error: 'Threat not found' }, 404);
    }
    
    const updatedThreat = {
      ...threat,
      ...updates,
      updatedAt: new Date().toISOString(),
      updatedBy: user.id
    };
    
    await kv.set(`mtrrs:threat:${id}`, updatedThreat);
    
    return c.json({ success: true, threat: updatedThreat });
  } catch (error) {
    console.log('Update threat error:', error);
    return c.json({ error: 'Failed to update threat' }, 500);
  }
});

// MTRRS: Get fingerprint registry entries
app.get("/make-server-13e89e3d/mtrrs/fingerprints", async (c) => {
  try {
    const { error, user } = await verifyUser(c.req.header('Authorization'));
    if (error) return c.json({ error }, 401);
    
    const fingerprints = await kv.getByPrefix('mtrrs:fingerprint:');
    
    // Sort by detected date, newest first
    fingerprints.sort((a: any, b: any) => 
      new Date(b.detected).getTime() - new Date(a.detected).getTime()
    );
    
    return c.json({ fingerprints });
  } catch (error) {
    console.log('Get fingerprints error:', error);
    return c.json({ error: 'Failed to get fingerprints' }, 500);
  }
});

// MTRRS: Submit new fingerprint
app.post("/make-server-13e89e3d/mtrrs/fingerprints", async (c) => {
  try {
    const { error, user } = await verifyUser(c.req.header('Authorization'));
    if (error) return c.json({ error }, 401);
    
    const fingerprintData = await c.req.json();
    
    // Generate fingerprint ID
    const date = new Date();
    const dateStr = date.toISOString().split('T')[0].replace(/-/g, '');
    const count = (await kv.getByPrefix(`mtrrs:fingerprint:FP-${dateStr}`)).length;
    const fingerprintId = `FP-${dateStr}-${String(count + 1).padStart(4, '0')}`;
    
    const fingerprint = {
      id: fingerprintId,
      ...fingerprintData,
      detected: new Date().toISOString(),
      submittedBy: user.id
    };
    
    await kv.set(`mtrrs:fingerprint:${fingerprintId}`, fingerprint);
    
    return c.json({ success: true, fingerprint });
  } catch (error) {
    console.log('Submit fingerprint error:', error);
    return c.json({ error: 'Failed to submit fingerprint' }, 500);
  }
});

// MTRRS: Hash file for fingerprinting
app.post("/make-server-13e89e3d/mtrrs/fingerprints/hash", async (c) => {
  try {
    const { error, user } = await verifyUser(c.req.header('Authorization'));
    if (error) return c.json({ error }, 401);
    
    const formData = await c.req.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return c.json({ error: 'No file provided' }, 400);
    }
    
    // Read file as ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);
    
    // Compute SHA-256 hash using Web Crypto API
    const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    
    return c.json({ hash: `sha256:${hash}`, filename: file.name, size: file.size });
  } catch (error) {
    console.log('File hashing error:', error);
    return c.json({ error: 'Failed to hash file' }, 500);
  }
});

// MTRRS: Export fingerprint database
app.get("/make-server-13e89e3d/mtrrs/fingerprints/export", async (c) => {
  try {
    const { error, user } = await verifyUser(c.req.header('Authorization'));
    if (error) return c.json({ error }, 401);
    
    const fingerprints = await kv.getByPrefix('mtrrs:fingerprint:');
    
    // Generate CSV
    const headers = ['ID', 'Hash', 'Type', 'Detected', 'Variants', 'Platforms', 'Status', 'Match Count', 'Category'];
    const rows = fingerprints.map((fp: any) => [
      fp.id,
      fp.hash,
      fp.type,
      new Date(fp.detected).toISOString(),
      fp.variants,
      fp.platforms.join(';'),
      fp.status,
      fp.matchCount,
      fp.category
    ]);
    
    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    
    return new Response(csv, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="fingerprint-registry-${Date.now()}.csv"`
      }
    });
  } catch (error) {
    console.log('Export fingerprints error:', error);
    return c.json({ error: 'Failed to export fingerprints' }, 500);
  }
});

// MTRRS: Get takedown operations
app.get("/make-server-13e89e3d/mtrrs/takedowns", async (c) => {
  try {
    const { error, user } = await verifyUser(c.req.header('Authorization'));
    if (error) return c.json({ error }, 401);
    
    const takedowns = await kv.getByPrefix('mtrrs:takedown:');
    
    // Sort by initiated date, newest first
    takedowns.sort((a: any, b: any) => 
      new Date(b.initiated).getTime() - new Date(a.initiated).getTime()
    );
    
    return c.json({ takedowns });
  } catch (error) {
    console.log('Get takedowns error:', error);
    return c.json({ error: 'Failed to get takedowns' }, 500);
  }
});

// MTRRS: Initiate takedown operation
app.post("/make-server-13e89e3d/mtrrs/takedowns", async (c) => {
  try {
    const { error, user } = await verifyUser(c.req.header('Authorization'));
    if (error) return c.json({ error }, 401);
    
    const takedownData = await c.req.json();
    
    // Generate takedown ID
    const takedownCount = (await kv.getByPrefix('mtrrs:takedown:')).length;
    const takedownId = `TKD-2026-${String(takedownCount + 1).padStart(4, '0')}`;
    
    const takedown = {
      id: takedownId,
      ...takedownData,
      initiated: new Date().toISOString(),
      initiatedBy: user.id,
      status: 'IN_PROGRESS',
      removed: 0,
      pending: takedownData.targetCount || 0
    };
    
    await kv.set(`mtrrs:takedown:${takedownId}`, takedown);
    
    return c.json({ success: true, takedown });
  } catch (error) {
    console.log('Initiate takedown error:', error);
    return c.json({ error: 'Failed to initiate takedown' }, 500);
  }
});

// MTRRS: Update takedown status
app.put("/make-server-13e89e3d/mtrrs/takedowns/:id", async (c) => {
  try {
    const { error, user } = await verifyUser(c.req.header('Authorization'));
    if (error) return c.json({ error }, 401);
    
    const id = c.req.param('id');
    const updates = await c.req.json();
    
    const takedown = await kv.get(`mtrrs:takedown:${id}`);
    if (!takedown) {
      return c.json({ error: 'Takedown not found' }, 404);
    }
    
    const updatedTakedown = {
      ...takedown,
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    await kv.set(`mtrrs:takedown:${id}`, updatedTakedown);
    
    return c.json({ success: true, takedown: updatedTakedown });
  } catch (error) {
    console.log('Update takedown error:', error);
    return c.json({ error: 'Failed to update takedown' }, 500);
  }
});

// MTRRS: Generate takedown report
app.post("/make-server-13e89e3d/mtrrs/takedowns/:id/report", async (c) => {
  try {
    const { error, user } = await verifyUser(c.req.header('Authorization'));
    if (error) return c.json({ error }, 401);
    
    const id = c.req.param('id');
    const { reportType } = await c.req.json();
    
    const takedown = await kv.get(`mtrrs:takedown:${id}`);
    if (!takedown) {
      return c.json({ error: 'Takedown not found' }, 404);
    }
    
    // Get associated threat
    const threat = await kv.get(`mtrrs:threat:${takedown.target}`);
    
    // Generate PDF report
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const margin = 20;
    let yPos = 20;
    
    // Header - Red banner for government
    pdf.setFillColor(220, 38, 38);
    pdf.rect(0, 0, pageWidth, 15, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'bold');
    pdf.text('GOVERNMENT RESTRICTED - OFFICIAL USE ONLY', pageWidth / 2, 10, { align: 'center' });
    
    yPos = 30;
    
    // Title
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(20);
    pdf.setFont('helvetica', 'bold');
    pdf.text('MTRRS Takedown Report', margin, yPos);
    yPos += 10;
    
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
    pdf.text(`Report Type: ${reportType}`, margin, yPos);
    yPos += 15;
    
    // Takedown Details
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Takedown Operation Details', margin, yPos);
    yPos += 10;
    
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'normal');
    pdf.text(`Operation ID: ${takedown.id}`, margin, yPos);
    yPos += 7;
    pdf.text(`Target Threat: ${takedown.target}`, margin, yPos);
    yPos += 7;
    pdf.text(`Initiated: ${new Date(takedown.initiated).toLocaleString()}`, margin, yPos);
    yPos += 7;
    pdf.text(`Status: ${takedown.status}`, margin, yPos);
    yPos += 7;
    pdf.text(`Platforms: ${takedown.platforms.join(', ')}`, margin, yPos);
    yPos += 7;
    pdf.text(`Content Removed: ${takedown.removed}`, margin, yPos);
    yPos += 7;
    pdf.text(`Pending Removal: ${takedown.pending}`, margin, yPos);
    yPos += 15;
    
    // Threat Information
    if (threat) {
      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Threat Information', margin, yPos);
      yPos += 10;
      
      pdf.setFontSize(11);
      pdf.setFont('helvetica', 'normal');
      pdf.text(`Type: ${threat.type}`, margin, yPos);
      yPos += 7;
      pdf.text(`Risk Score: ${threat.riskScore}%`, margin, yPos);
      yPos += 7;
      pdf.text(`Subject: ${threat.subject}`, margin, yPos);
      yPos += 7;
      pdf.text(`Estimated Reach: ${threat.reach}`, margin, yPos);
      yPos += 15;
    }
    
    // Legal Notice
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'italic');
    pdf.setTextColor(100, 100, 100);
    const legalText = 'This report contains sensitive government information and is intended solely for authorized recipients. Unauthorized disclosure may result in criminal penalties.';
    const lines = pdf.splitTextToSize(legalText, pageWidth - 2 * margin);
    pdf.text(lines, margin, yPos);
    
    // Footer
    pdf.setFontSize(8);
    pdf.setTextColor(100, 100, 100);
    pdf.text(`Generated: ${new Date().toLocaleString()}`, margin, pdf.internal.pageSize.getHeight() - 10);
    pdf.text('MTRRS - Misinformation Trace & Rapid Response System', pageWidth / 2, pdf.internal.pageSize.getHeight() - 10, { align: 'center' });
    
    // Save PDF
    const pdfBytes = pdf.output('arraybuffer');
    const fileName = `mtrrs-takedown-${takedown.id}-${reportType.toLowerCase()}-${Date.now()}.pdf`;
    
    const bucketName = 'make-13e89e3d-reports';
    const { data: buckets } = await supabase.storage.listBuckets();
    const bucketExists = buckets?.some(bucket => bucket.name === bucketName);
    
    if (!bucketExists) {
      await supabase.storage.createBucket(bucketName, { public: false });
    }
    
    await supabase.storage
      .from(bucketName)
      .upload(`${user.id}/mtrrs/${fileName}`, pdfBytes, {
        contentType: 'application/pdf',
        upsert: false
      });
    
    const { data: signedUrlData } = await supabase.storage
      .from(bucketName)
      .createSignedUrl(`${user.id}/mtrrs/${fileName}`, 3600);
    
    return c.json({ 
      success: true, 
      downloadUrl: signedUrlData?.signedUrl,
      fileName
    });
  } catch (error) {
    console.log('Generate takedown report error:', error);
    return c.json({ error: `Failed to generate report: ${error.message || error}` }, 500);
  }
});

// MTRRS: Get campaigns
app.get("/make-server-13e89e3d/mtrrs/campaigns", async (c) => {
  try {
    const { error, user } = await verifyUser(c.req.header('Authorization'));
    if (error) return c.json({ error }, 401);
    
    const campaigns = await kv.getByPrefix('mtrrs:campaign:');
    
    // Sort by detected date, newest first
    campaigns.sort((a: any, b: any) => 
      new Date(b.detected).getTime() - new Date(a.detected).getTime()
    );
    
    return c.json({ campaigns });
  } catch (error) {
    console.log('Get campaigns error:', error);
    return c.json({ error: 'Failed to get campaigns' }, 500);
  }
});

// MTRRS: Create campaign
app.post("/make-server-13e89e3d/mtrrs/campaigns", async (c) => {
  try {
    const { error, user } = await verifyUser(c.req.header('Authorization'));
    if (error) return c.json({ error }, 401);
    
    const campaignData = await c.req.json();
    
    // Generate campaign ID
    const campaignCount = (await kv.getByPrefix('mtrrs:campaign:')).length;
    const campaignId = `CAMP-${String(campaignCount + 1).padStart(3, '0')}`;
    
    const campaign = {
      id: campaignId,
      ...campaignData,
      detected: new Date().toISOString(),
      createdBy: user.id
    };
    
    await kv.set(`mtrrs:campaign:${campaignId}`, campaign);
    
    return c.json({ success: true, campaign });
  } catch (error) {
    console.log('Create campaign error:', error);
    return c.json({ error: 'Failed to create campaign' }, 500);
  }
});

Deno.serve(app.fetch);