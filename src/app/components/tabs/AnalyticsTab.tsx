import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { TrendingUp, Video, Mic, FileText, Image as ImageIcon } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { API_URL, supabase } from '/src/lib/supabase';

interface AnalyticsTabProps {
  session: any;
}

const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b'];

export function AnalyticsTab({ session }: AnalyticsTabProps) {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      // Load from localStorage instead of backend
      const analyses = JSON.parse(localStorage.getItem('truthguard_analyses') || '[]');
      
      // Calculate stats from localStorage data
      const totalAnalyses = analyses.length;
      const highRisk = analyses.filter((a: any) => a.overallScore > 70).length;
      const mediumRisk = analyses.filter((a: any) => a.overallScore > 40 && a.overallScore <= 70).length;
      const lowRisk = analyses.filter((a: any) => a.overallScore <= 40).length;
      
      // Count by mode
      const byMode = {
        video: analyses.filter((a: any) => a.mode === 'video').length,
        audio: analyses.filter((a: any) => a.mode === 'audio').length,
        text: analyses.filter((a: any) => a.mode === 'text').length,
        image: analyses.filter((a: any) => a.mode === 'image').length,
      };
      
      const calculatedStats = {
        totalAnalyses,
        highRisk,
        mediumRisk,
        lowRisk,
        byMode,
      };
      
      setStats(calculatedStats);
    } catch (error) {
      console.error('Failed to load stats:', error);
      setStats({ totalAnalyses: 0, highRisk: 0, mediumRisk: 0, lowRisk: 0, byMode: {} });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-white text-xl">Loading analytics...</div>
      </div>
    );
  }

  const modeData = [
    { name: 'Video', value: stats?.byMode?.video || 0, icon: Video },
    { name: 'Audio', value: stats?.byMode?.audio || 0, icon: Mic },
    { name: 'Text', value: stats?.byMode?.text || 0, icon: FileText },
    { name: 'Image', value: stats?.byMode?.image || 0, icon: ImageIcon },
  ];

  const riskData = [
    { name: 'High Risk', value: stats?.highRisk || 0, id: 'high' },
    { name: 'Medium Risk', value: stats?.mediumRisk || 0, id: 'medium' },
    { name: 'Low Risk', value: stats?.lowRisk || 0, id: 'low' },
  ];

  return (
    <div className="max-w-7xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Analytics</h1>
        <p className="text-gray-400">Detailed insights into your detection activities</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Total Analyses', value: stats?.totalAnalyses || 0, color: 'blue' },
          { label: 'High Risk', value: stats?.highRisk || 0, color: 'red' },
          { label: 'Medium Risk', value: stats?.mediumRisk || 0, color: 'yellow' },
          { label: 'Low Risk', value: stats?.lowRisk || 0, color: 'green' },
        ].map((card, index) => (
          <motion.div
            key={`${card.label}-${index}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`bg-${card.color}-500/10 border border-${card.color}-500/30 rounded-2xl p-6`}
          >
            <div className="text-3xl font-bold text-white mb-1">{card.value}</div>
            <div className="text-sm text-gray-400">{card.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Detection Modes */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
          <h3 className="text-xl font-bold text-white mb-6">Analyses by Mode</h3>
          {stats?.totalAnalyses > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={modeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
                <XAxis dataKey="name" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #334155',
                    borderRadius: '8px',
                  }}
                />
                <Bar dataKey="value" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[300px] flex items-center justify-center text-gray-400">
              No data available
            </div>
          )}
        </div>

        {/* Risk Distribution */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
          <h3 className="text-xl font-bold text-white mb-6">Risk Distribution</h3>
          {stats?.totalAnalyses > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={riskData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {riskData.map((entry, index) => (
                    <Cell key={`cell-${entry.id}-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #334155',
                    borderRadius: '8px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[300px] flex items-center justify-center text-gray-400">
              No data available
            </div>
          )}
        </div>
      </div>
    </div>
  );
}