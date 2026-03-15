import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { TrendingUp, AlertTriangle, CheckCircle, Clock, ArrowRight } from 'lucide-react';
import { API_URL, supabase } from '/src/lib/supabase';

interface DashboardTabProps {
  session: any;
  onNavigate: (tab: string) => void;
}

export function DashboardTab({ session, onNavigate }: DashboardTabProps) {
  const [stats, setStats] = useState<any>(null);
  const [recentAnalyses, setRecentAnalyses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      // Load from localStorage instead of backend
      const analyses = JSON.parse(localStorage.getItem('truthguard_analyses') || '[]');
      
      // Calculate stats from localStorage data
      const totalAnalyses = analyses.length;
      const highRisk = analyses.filter((a: any) => a.overallScore > 70).length;
      const avgScore = totalAnalyses > 0 
        ? Math.round(analyses.reduce((sum: number, a: any) => sum + a.overallScore, 0) / totalAnalyses)
        : 0;
      
      const calculatedStats = {
        totalAnalyses,
        highRisk,
        avgScore,
      };
      
      setStats(calculatedStats);
      setRecentAnalyses(analyses.slice(0, 5));
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
      setStats({ totalAnalyses: 0, highRisk: 0, avgScore: 0 });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-white text-xl">Loading dashboard...</div>
      </div>
    );
  }

  const statCards = [
    {
      label: 'Total Analyses',
      value: stats?.totalAnalyses || 0,
      icon: TrendingUp,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/30',
    },
    {
      label: 'High Risk Detected',
      value: stats?.highRisk || 0,
      icon: AlertTriangle,
      color: 'from-red-500 to-orange-500',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500/30',
    },
    {
      label: 'Average Score',
      value: `${stats?.avgScore || 0}%`,
      icon: CheckCircle,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/30',
    },
    {
      label: 'This Month',
      value: stats?.totalAnalyses || 0,
      icon: Clock,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/30',
    },
  ];

  return (
    <div className="max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-gray-400">Overview of your deepfake detection activities</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`${card.bgColor} border ${card.borderColor} rounded-2xl p-6`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${card.color} rounded-xl flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="text-3xl font-bold text-white mb-1">{card.value}</div>
              <div className="text-sm text-gray-400">{card.label}</div>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => onNavigate('new-analysis')}
            className="p-6 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl text-left hover:shadow-lg hover:shadow-blue-600/20 transition-all group"
          >
            <h3 className="text-xl font-bold text-white mb-2">Start New Analysis</h3>
            <p className="text-blue-100 text-sm mb-4">Upload and analyze content for deepfakes</p>
            <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => onNavigate('history')}
            className="p-6 bg-slate-800/50 border border-slate-700 rounded-2xl text-left hover:border-slate-600 transition-all group"
          >
            <h3 className="text-xl font-bold text-white mb-2">View History</h3>
            <p className="text-gray-400 text-sm mb-4">Browse past analysis results</p>
            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => onNavigate('analytics')}
            className="p-6 bg-slate-800/50 border border-slate-700 rounded-2xl text-left hover:border-slate-600 transition-all group"
          >
            <h3 className="text-xl font-bold text-white mb-2">View Analytics</h3>
            <p className="text-gray-400 text-sm mb-4">See detailed statistics and trends</p>
            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Recent Analyses */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-white">Recent Analyses</h2>
          <button
            onClick={() => onNavigate('history')}
            className="text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium"
          >
            View All →
          </button>
        </div>

        {recentAnalyses.length > 0 ? (
          <div className="space-y-3">
            {recentAnalyses.map((analysis, index) => (
              <motion.div
                key={analysis.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 hover:border-slate-600 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="text-white font-medium mb-1">{analysis.fileName}</h4>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span>{analysis.mode?.toUpperCase()}</span>
                      <span>{new Date(analysis.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-2xl font-bold ${
                      analysis.overallScore > 70 ? 'text-red-500' :
                      analysis.overallScore > 40 ? 'text-yellow-500' :
                      'text-green-500'
                    }`}>
                      {analysis.overallScore}%
                    </div>
                    <div className="text-xs text-gray-500">Risk Score</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-slate-800/30 border border-slate-700 rounded-2xl">
            <p className="text-gray-400 mb-4">No analyses yet</p>
            <button
              onClick={() => onNavigate('new-analysis')}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-all"
            >
              Start Your First Analysis
            </button>
          </div>
        )}
      </div>
    </div>
  );
}