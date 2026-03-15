import { Download, FileText, Calendar } from 'lucide-react';
import { useState } from 'react';
import { API_URL, supabase } from '/src/lib/supabase';
import { toast } from 'sonner';

interface ReportsTabProps {
  session: any;
}

export function ReportsTab({ session }: ReportsTabProps) {
  const [generating, setGenerating] = useState(false);
  const [generatingMonthly, setGeneratingMonthly] = useState(false);

  const handleDownloadPDF = async () => {
    // Get the most recent analysis
    try {
      setGenerating(true);
      
      const accessToken = (await supabase.auth.getSession()).data.session?.access_token;
      
      // Get history first
      const historyResponse = await fetch(`${API_URL}/analysis/history`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      
      if (!historyResponse.ok) {
        toast.error('Failed to load analyses');
        return;
      }
      
      const { analyses } = await historyResponse.json();
      
      if (analyses.length === 0) {
        toast.error('No analyses found. Please run an analysis first.');
        return;
      }
      
      // Use the most recent analysis
      const mostRecent = analyses[0];
      
      toast.info('Generating PDF report...');
      
      const response = await fetch(`${API_URL}/reports/generate-pdf`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({ analysisId: mostRecent.id })
      });
      
      if (!response.ok) {
        const error = await response.json();
        toast.error(error.error || 'Failed to generate PDF');
        return;
      }
      
      const { downloadUrl, fileName } = await response.json();
      
      // Download the file
      window.open(downloadUrl, '_blank');
      toast.success('PDF report generated successfully!');
    } catch (error) {
      console.error('Download error:', error);
      toast.error('Failed to download report');
    } finally {
      setGenerating(false);
    }
  };

  const handleGenerateMonthly = async () => {
    try {
      setGeneratingMonthly(true);
      
      const now = new Date();
      const month = now.getMonth() + 1;
      const year = now.getFullYear();
      
      toast.info('Generating monthly summary...');
      
      const accessToken = (await supabase.auth.getSession()).data.session?.access_token;
      
      const response = await fetch(`${API_URL}/reports/monthly-summary`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({ month, year })
      });
      
      if (!response.ok) {
        const error = await response.json();
        toast.error(error.error || 'Failed to generate summary');
        return;
      }
      
      const { downloadUrl, fileName } = await response.json();
      
      // Download the file
      window.open(downloadUrl, '_blank');
      toast.success('Monthly summary generated successfully!');
    } catch (error) {
      console.error('Monthly summary error:', error);
      toast.error('Failed to generate monthly summary');
    } finally {
      setGeneratingMonthly(false);
    }
  };

  return (
    <div className="max-w-5xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Reports</h1>
        <p className="text-gray-400">Generate and download detailed analysis reports</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
          <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mb-4">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Single Analysis Report</h3>
          <p className="text-gray-400 mb-6">Export detailed PDF report for your most recent analysis</p>
          <button 
            onClick={handleDownloadPDF}
            disabled={generating}
            className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-xl font-medium transition-all flex items-center justify-center gap-2"
          >
            <Download className="w-5 h-5" />
            {generating ? 'Generating...' : 'Download PDF'}
          </button>
        </div>

        <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
          <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mb-4">
            <Calendar className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Monthly Summary</h3>
          <p className="text-gray-400 mb-6">Get a comprehensive monthly activity report</p>
          <button 
            onClick={handleGenerateMonthly}
            disabled={generatingMonthly}
            className="w-full px-4 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-xl font-medium transition-all flex items-center justify-center gap-2"
          >
            <Download className="w-5 h-5" />
            {generatingMonthly ? 'Generating...' : 'Generate Report'}
          </button>
        </div>
      </div>

      <div className="mt-8 bg-blue-500/10 border border-blue-500/30 rounded-xl p-6">
        <p className="text-blue-300">
          <strong>Pro Tip:</strong> Reports include detailed breakdowns, model consensus data, and recommendations for each analysis.
        </p>
      </div>
    </div>
  );
}