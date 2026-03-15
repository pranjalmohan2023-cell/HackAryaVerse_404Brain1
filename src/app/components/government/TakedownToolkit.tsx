import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Target, FileText, Download, Send, CheckCircle, Clock, AlertTriangle, Globe, Share2 } from 'lucide-react';
import { toast } from 'sonner';

// Helper function to generate takedown case ID
function generateTakedownId(existingIds: string[]): string {
  const today = new Date();
  const dateStr = today.toISOString().slice(0, 10).replace(/-/g, '');
  
  // Find highest sequence number for today
  const todayIds = existingIds.filter(id => id.startsWith(`TKD-${dateStr}`));
  const sequences = todayIds.map(id => {
    const parts = id.split('-');
    return parseInt(parts[2] || '0');
  });
  
  const nextSeq = sequences.length > 0 ? Math.max(...sequences) + 1 : 1;
  const seqStr = nextSeq.toString().padStart(4, '0');
  
  return `TKD-${dateStr}-${seqStr}`;
}

export function TakedownToolkit() {
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [reportType, setReportType] = useState('DMCA');
  const [targetThreatId, setTargetThreatId] = useState('');
  const [notes, setNotes] = useState('');
  const [takedownRequests, setTakedownRequests] = useState<any[]>(() => {
    // Load from localStorage on initial mount
    const saved = localStorage.getItem('takedownRequests');
    return saved ? JSON.parse(saved) : [];
  });
  const [loading, setLoading] = useState(false);

  // Save to localStorage whenever takedownRequests changes
  useEffect(() => {
    localStorage.setItem('takedownRequests', JSON.stringify(takedownRequests));
  }, [takedownRequests]);

  const platforms = [
    { id: 'twitter', name: 'Twitter/X', status: 'AVAILABLE', responseTime: '2-4 hours', successRate: 94 },
    { id: 'facebook', name: 'Facebook', status: 'AVAILABLE', responseTime: '4-6 hours', successRate: 89 },
    { id: 'instagram', name: 'Instagram', status: 'AVAILABLE', responseTime: '4-6 hours', successRate: 91 },
    { id: 'whatsapp', name: 'WhatsApp', status: 'LIMITED', responseTime: '24-48 hours', successRate: 67 },
    { id: 'telegram', name: 'Telegram', status: 'LIMITED', responseTime: '48-72 hours', successRate: 45 },
    { id: 'tiktok', name: 'TikTok', status: 'AVAILABLE', responseTime: '6-12 hours', successRate: 87 },
    { id: 'youtube', name: 'YouTube', status: 'AVAILABLE', responseTime: '2-3 hours', successRate: 96 },
  ];

  const togglePlatform = (platformId: string) => {
    if (selectedPlatforms.includes(platformId)) {
      setSelectedPlatforms(selectedPlatforms.filter(p => p !== platformId));
    } else {
      setSelectedPlatforms([...selectedPlatforms, platformId]);
    }
  };

  const handleInitiateTakedown = async () => {
    // Validate inputs
    if (!targetThreatId.trim()) {
      toast.error('Please enter a valid Threat ID and select at least one platform.');
      return;
    }
    
    if (selectedPlatforms.length === 0) {
      toast.error('Please enter a valid Threat ID and select at least one platform.');
      return;
    }
    
    try {
      setLoading(true);
      console.log('🚀 Initiating takedown workflow...');
      
      // Generate case ID
      const existingIds = takedownRequests.map(req => req.id);
      const caseId = generateTakedownId(existingIds);
      console.log('📋 Generated Case ID:', caseId);
      
      // Get platform names
      const platformNames = selectedPlatforms.map(id => 
        platforms.find(p => p.id === id)?.name || id
      );
      console.log('🎯 Target Platforms:', platformNames);
      
      // Simulate platform submission
      toast.info('Initiating takedown request...');
      
      // Show platform-specific submission messages
      for (const platformName of platformNames) {
        await new Promise(resolve => setTimeout(resolve, 300));
        toast.info(`Submitting takedown request to ${platformName}...`);
        console.log(`📤 Submitting to ${platformName}...`);
      }
      
      // Create takedown request object
      const newTakedown = {
        caseId,
        id: caseId, // For backwards compatibility
        threatId: targetThreatId,
        target: targetThreatId, // For backwards compatibility
        platforms: platformNames,
        reportType,
        notes,
        timestamp: new Date().toISOString(),
        initiated: new Date().toISOString(), // For backwards compatibility
        status: 'Pending',
        evidencePackage: true,
        targetCount: Math.floor(Math.random() * 500) + 100,
        removed: 0,
        pending: Math.floor(Math.random() * 500) + 100
      };
      console.log('📦 Created takedown object:', newTakedown);
      
      // Store takedown request
      const updatedRequests = [newTakedown, ...takedownRequests];
      setTakedownRequests(updatedRequests);
      console.log('💾 Updated takedownRequests state. Total entries:', updatedRequests.length);
      console.log('✅ localStorage will auto-save via useEffect');
      
      // Show success notification with details
      toast.success(
        <div>
          <div className="font-bold">Takedown Request Submitted Successfully</div>
          <div className="text-sm mt-1">Case ID: {caseId}</div>
          <div className="text-sm">Platforms Notified: {platformNames.join(', ')}</div>
          <div className="text-sm">Status: Pending Platform Review</div>
        </div>,
        { duration: 5000 }
      );
      
      // Reset form
      setTargetThreatId('');
      setSelectedPlatforms([]);
      setNotes('');
      setReportType('DMCA');
      console.log('🔄 Form reset complete');
      
    } catch (error) {
      console.error('❌ Takedown error:', error);
      toast.error('Failed to initiate takedown');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadReport = (takedownId: string, reportName: string) => {
    try {
      toast.info(`Generating ${reportName}...`);
      
      // Find the takedown
      const takedown = takedownRequests.find(t => t.id === takedownId || t.caseId === takedownId);
      
      if (!takedown) {
        toast.error('Takedown not found');
        return;
      }
      
      // Generate report content
      const reportContent = `
TAKEDOWN REQUEST REPORT
========================

Case ID: ${takedown.caseId || takedown.id}
Threat ID: ${takedown.threatId || takedown.target}
Report Type: ${takedown.reportType}
Status: ${takedown.status}
Timestamp: ${new Date(takedown.timestamp || takedown.initiated).toLocaleString()}

Platforms: ${takedown.platforms.join(', ')}

Notes:
${takedown.notes || 'No additional notes'}

Evidence Package: ${takedown.evidencePackage ? 'Attached' : 'Not attached'}

---
Generated by TruthGuard AI MTRRS
      `.trim();
      
      // Create and download the file
      const blob = new Blob([reportContent], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `takedown-report-${takedown.caseId || takedown.id}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      
      toast.success('Report downloaded successfully!');
    } catch (error) {
      console.error('Report generation error:', error);
      toast.error('Failed to generate report');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">Platform Takedown Toolkit</h2>
          <p className="text-gray-400">Automated evidence reports and removal requests</p>
        </div>
      </div>

      {/* Active Takedowns */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl">
        <div className="p-6 border-b border-slate-700">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-500" />
            Active Takedown Operations
          </h3>
        </div>
        <div className="divide-y divide-slate-700">
          {takedownRequests.length === 0 ? (
            <div className="p-8 text-center text-gray-400">
              No active takedown operations
            </div>
          ) : (
            takedownRequests.map((takedown, idx) => (
              <motion.div
                key={takedown.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="p-6 hover:bg-slate-700/30 transition-all"
              >
                <div className="flex items-start gap-6">
                  <div className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center ${
                    takedown.status === 'IN_PROGRESS' ? 'bg-blue-500/20 border border-blue-500/50' :
                    takedown.status === 'PARTIALLY_COMPLETE' ? 'bg-yellow-500/20 border border-yellow-500/50' :
                    'bg-green-500/20 border border-green-500/50'
                  }`}>
                    {takedown.status === 'IN_PROGRESS' ? <Clock className="w-6 h-6 text-blue-500 animate-spin" /> :
                     takedown.status === 'PARTIALLY_COMPLETE' ? <AlertTriangle className="w-6 h-6 text-yellow-500" /> :
                     <CheckCircle className="w-6 h-6 text-green-500" />}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-mono text-sm text-gray-400">{takedown.id}</span>
                      <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                        takedown.status === 'IN_PROGRESS' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                        takedown.status === 'PARTIALLY_COMPLETE' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                        'bg-green-500/20 text-green-400 border border-green-500/30'
                      }`}>
                        {takedown.status.replace(/_/g, ' ')}
                      </span>
                    </div>

                    <div className="text-white mb-3">Target: <span className="font-mono">{takedown.target}</span></div>

                    <div className="grid grid-cols-4 gap-4 mb-3">
                      <div>
                        <div className="text-xs text-gray-400 mb-1">Initiated</div>
                        <div className="text-white text-sm">{new Date(takedown.initiated).toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-400 mb-1">Platforms</div>
                        <div className="text-white text-sm">{takedown.platforms.join(', ')}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-400 mb-1">Removed</div>
                        <div className="text-green-500 font-bold text-lg">{takedown.removed}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-400 mb-1">Pending</div>
                        <div className="text-yellow-500 font-bold text-lg">{takedown.pending}</div>
                      </div>
                    </div>

                    <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-green-500 to-blue-500 transition-all"
                        style={{ width: `${(takedown.removed / (takedown.removed + takedown.pending)) * 100}%` }}
                      />
                    </div>
                  </div>

                  <button 
                    onClick={() => handleDownloadReport(takedown.id, 'FULL_EVIDENCE')}
                    className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm font-medium transition-all"
                  >
                    Download Report
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* New Takedown Request */}
      <div className="grid grid-cols-3 gap-6">
        {/* Platform Selection */}
        <div className="col-span-2 bg-slate-800/50 border border-slate-700 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-red-500" />
            Initiate New Takedown
          </h3>

          <div className="mb-6">
            <label className="block text-sm text-gray-400 mb-2">Target Threat ID</label>
            <input
              type="text"
              placeholder="ALT-2026-XXXX"
              value={targetThreatId}
              onChange={(e) => setTargetThreatId(e.target.value)}
              className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm text-gray-400 mb-3">Select Target Platforms</label>
            <div className="grid grid-cols-2 gap-3">
              {platforms.map((platform, idx) => (
                <motion.button
                  key={platform.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => togglePlatform(platform.id)}
                  disabled={platform.status === 'UNAVAILABLE'}
                  className={`p-4 rounded-lg border-2 transition-all text-left ${
                    selectedPlatforms.includes(platform.id)
                      ? 'bg-blue-500/20 border-blue-500'
                      : 'bg-slate-900/50 border-slate-700 hover:border-slate-600'
                  } ${platform.status === 'UNAVAILABLE' ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-medium">{platform.name}</span>
                    <span className={`px-2 py-0.5 text-xs rounded ${
                      platform.status === 'AVAILABLE' ? 'bg-green-500/20 text-green-400' :
                      platform.status === 'LIMITED' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {platform.status}
                    </span>
                  </div>
                  <div className="text-xs text-gray-400">
                    Response: {platform.responseTime}
                  </div>
                  <div className="text-xs text-gray-400">
                    Success Rate: {platform.successRate}%
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm text-gray-400 mb-2">Report Type</label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white"
            >
              <option value="DMCA">DMCA Takedown Notice</option>
              <option value="GOVERNMENT">Government Request</option>
              <option value="COURT_ORDER">Court Order</option>
              <option value="EMERGENCY">Emergency Takedown</option>
              <option value="TERMS_VIOLATION">Terms of Service Violation</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-sm text-gray-400 mb-2">Additional Notes</label>
            <textarea
              rows={4}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Provide additional context for the takedown request..."
              className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-gray-500"
            />
          </div>

          <div className="flex gap-3">
            <button 
              onClick={handleInitiateTakedown}
              disabled={loading}
              className="flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-all flex items-center justify-center gap-2"
            >
              <Target className="w-5 h-5" />
              {loading ? 'Initiating...' : 'Initiate Takedown'}
            </button>
          </div>
        </div>

        {/* Report Templates */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-purple-500" />
            Evidence Reports
          </h3>

          <div className="space-y-3">
            {['Full Evidence Package', 'Legal Summary', 'Platform Submission', 'Technical Analysis', 'Public Statement'].map((reportName, idx) => (
              <button 
                key={idx}
                className="w-full p-4 bg-slate-900/50 border border-slate-700 rounded-lg hover:border-purple-500/50 transition-all text-left"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-medium">{reportName}</span>
                  <Download className="w-4 h-4 text-gray-400" />
                </div>
                <div className="text-xs text-gray-400">
                  {idx === 0 && 'Complete forensic analysis, metadata, and detection results'}
                  {idx === 1 && 'Court-ready summary with legal citations'}
                  {idx === 2 && 'Formatted for platform abuse report systems'}
                  {idx === 3 && 'Detailed technical findings for experts'}
                  {idx === 4 && 'Press release template for public disclosure'}
                </div>
              </button>
            ))}
          </div>

          <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <div className="text-sm text-blue-400 font-medium mb-1">Pro Tip</div>
            <div className="text-xs text-gray-300">
              Include cryptographic hashes and timestamps for stronger legal evidence
            </div>
          </div>
        </div>
      </div>

      {/* Platform Response Statistics */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Globe className="w-5 h-5 text-green-500" />
          Platform Response Statistics (Last 30 Days)
        </h3>
        <div className="grid grid-cols-4 gap-4">
          {platforms.map((platform, idx) => (
            <motion.div
              key={platform.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="p-4 bg-slate-900/50 rounded-lg"
            >
              <div className="text-white font-medium mb-3">{platform.name}</div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Success Rate</span>
                  <span className={`font-bold ${
                    platform.successRate >= 90 ? 'text-green-500' :
                    platform.successRate >= 70 ? 'text-yellow-500' :
                    'text-red-500'
                  }`}>
                    {platform.successRate}%
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${
                      platform.successRate >= 90 ? 'bg-green-500' :
                      platform.successRate >= 70 ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`}
                    style={{ width: `${platform.successRate}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Avg Response</span>
                  <span className="text-gray-400">{platform.responseTime}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}