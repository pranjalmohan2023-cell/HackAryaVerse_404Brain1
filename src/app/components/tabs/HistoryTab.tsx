import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Search, Trash2, Eye, Download, Filter } from 'lucide-react';
import { API_URL, supabase } from '/src/lib/supabase';

interface HistoryTabProps {
  session: any;
}

export function HistoryTab({ session }: HistoryTabProps) {
  const [analyses, setAnalyses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMode, setFilterMode] = useState<string>('all');

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      // Load from localStorage instead of backend
      const analyses = JSON.parse(localStorage.getItem('truthguard_analyses') || '[]');
      setAnalyses(analyses);
    } catch (error) {
      console.error('Failed to load history:', error);
      setAnalyses([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this analysis?')) return;

    try {
      // Delete from localStorage
      const analyses = JSON.parse(localStorage.getItem('truthguard_analyses') || '[]');
      const updatedAnalyses = analyses.filter((a: any) => a.id !== id);
      localStorage.setItem('truthguard_analyses', JSON.stringify(updatedAnalyses));
      setAnalyses(updatedAnalyses);
    } catch (error) {
      console.error('Failed to delete:', error);
    }
  };

  const filteredAnalyses = analyses.filter(analysis => {
    const matchesSearch = analysis.fileName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterMode === 'all' || analysis.mode === filterMode;
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-white text-xl">Loading history...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Analysis History</h1>
        <p className="text-gray-400">View and manage your past analyses</p>
      </div>

      {/* Filters */}
      <div className="mb-6 flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by filename..."
            className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <select
          value={filterMode}
          onChange={(e) => setFilterMode(e.target.value)}
          className="px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Modes</option>
          <option value="video">Video</option>
          <option value="audio">Audio</option>
          <option value="text">Text</option>
          <option value="image">Image</option>
        </select>
      </div>

      {/* Results */}
      {filteredAnalyses.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {filteredAnalyses.map((analysis, index) => (
            <motion.div
              key={analysis.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:border-slate-600 transition-all"
            >
              <div className="flex items-start gap-6">
                <div className={`flex-shrink-0 w-16 h-16 rounded-xl flex items-center justify-center ${
                  analysis.overallScore > 70 ? 'bg-red-500' :
                  analysis.overallScore > 40 ? 'bg-yellow-500' :
                  'bg-green-500'
                }`}>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{analysis.overallScore}</div>
                    <div className="text-xs text-white/80">%</div>
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-white mb-2 truncate">
                    {analysis.fileName}
                  </h3>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                    <span className="px-2 py-1 bg-blue-500/10 border border-blue-500/30 rounded text-blue-400 font-medium">
                      {analysis.mode?.toUpperCase()}
                    </span>
                    <span>{new Date(analysis.createdAt).toLocaleString()}</span>
                    <span className={
                      analysis.overallScore > 70 ? 'text-red-400' :
                      analysis.overallScore > 40 ? 'text-yellow-400' :
                      'text-green-400'
                    }>
                      {analysis.verdict}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button className="p-2 text-gray-400 hover:text-white hover:bg-slate-700 rounded-lg transition-all">
                    <Download className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(analysis.id)}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-slate-700 rounded-lg transition-all"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-slate-800/30 border border-slate-700 rounded-2xl">
          <p className="text-gray-400 text-lg">No analyses found</p>
        </div>
      )}
    </div>
  );
}