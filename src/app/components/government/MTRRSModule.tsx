import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Shield, AlertTriangle, TrendingUp, Database, FileText, Bell, 
  Activity, Globe, Users, Target, Lock, Download, Search, Filter,
  Map, Network, BarChart3, Clock, CheckCircle, XCircle, AlertOctagon
} from 'lucide-react';
import { PropagationMap } from './PropagationMap';
import { RiskAlertDashboard } from './RiskAlertDashboard';
import { FingerprintRegistry } from './FingerprintRegistry';
import { TakedownToolkit } from './TakedownToolkit';
import { ForensicAnalysis } from './ForensicAnalysis';

interface MTRRSModuleProps {
  session: any;
}

type ViewMode = 'overview' | 'propagation' | 'alerts' | 'registry' | 'takedown' | 'forensics';

export function MTRRSModule({ session }: MTRRSModuleProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('overview');
  const [selectedThreat, setSelectedThreat] = useState<any>(null);

  const stats = {
    activeCampaigns: 12,
    threatsDetected: 847,
    platformsMonitored: 8,
    takedownsInitiated: 234,
    avgResponseTime: '4.2 min',
    riskLevel: 'MEDIUM'
  };

  const recentAlerts = [
    {
      id: 'ALT-2026-0847',
      timestamp: new Date(Date.now() - 12 * 60000),
      type: 'VIDEO_DEEPFAKE',
      riskScore: 94,
      subject: 'Political Figure - False Statement',
      reach: '2.4M',
      platforms: ['Twitter', 'Telegram', 'WhatsApp'],
      status: 'ACTIVE',
      priority: 'CRITICAL'
    },
    {
      id: 'ALT-2026-0846',
      timestamp: new Date(Date.now() - 45 * 60000),
      type: 'AUDIO_CLONE',
      riskScore: 87,
      subject: 'Government Official - Fake Audio',
      reach: '1.8M',
      platforms: ['WhatsApp', 'Instagram'],
      status: 'INVESTIGATING',
      priority: 'HIGH'
    },
    {
      id: 'ALT-2026-0845',
      timestamp: new Date(Date.now() - 2 * 60 * 60000),
      type: 'IMAGE_MANIPULATION',
      riskScore: 76,
      subject: 'Election Rally - Crowd Manipulation',
      reach: '890K',
      platforms: ['Twitter', 'Facebook'],
      status: 'TAKEDOWN_INITIATED',
      priority: 'HIGH'
    },
    {
      id: 'ALT-2026-0844',
      timestamp: new Date(Date.now() - 3 * 60 * 60000),
      type: 'AI_TEXT',
      riskScore: 68,
      subject: 'Economic Policy - Fake Announcement',
      reach: '450K',
      platforms: ['Twitter'],
      status: 'CONTAINED',
      priority: 'MEDIUM'
    }
  ];

  const activeCampaigns = [
    {
      id: 'CAMP-001',
      name: 'Operation Shadow Echo',
      detected: new Date(Date.now() - 6 * 60 * 60000),
      variants: 23,
      platforms: 5,
      reach: '8.7M',
      status: 'ACTIVE',
      category: 'Political Misinformation'
    },
    {
      id: 'CAMP-002',
      name: 'Synthetic Voice Campaign',
      detected: new Date(Date.now() - 12 * 60 * 60000),
      variants: 17,
      platforms: 3,
      reach: '3.2M',
      status: 'MONITORING',
      category: 'Audio Deepfakes'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-red-950/20 to-slate-900">
      {/* Top Bar - Classification Banner */}
      <div className="bg-red-600 border-b-2 border-red-700">
        <div className="px-8 py-2 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Lock className="w-4 h-4 text-white" />
            <span className="text-white font-bold text-sm tracking-wider">GOVERNMENT RESTRICTED</span>
            <span className="text-white/80 text-xs">• AUTHORIZED PERSONNEL ONLY</span>
          </div>
          <div className="text-white text-xs">
            CLASSIFICATION: OFFICIAL USE ONLY | SESSION: {session?.user?.email}
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="border-b border-slate-700/50 bg-slate-900/50 backdrop-blur-xl">
        <div className="px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-4 mb-2">
                <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-orange-600 rounded-lg flex items-center justify-center">
                  <Shield className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white">
                    Misinformation Trace & Rapid Response System
                  </h1>
                  <p className="text-gray-400 text-sm">MTRRS v3.2 | National Security Division</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className={`px-4 py-2 rounded-lg border-2 ${
                stats.riskLevel === 'CRITICAL' 
                  ? 'bg-red-500/20 border-red-500 text-red-400' 
                  : stats.riskLevel === 'HIGH'
                  ? 'bg-orange-500/20 border-orange-500 text-orange-400'
                  : 'bg-yellow-500/20 border-yellow-500 text-yellow-400'
              }`}>
                <div className="text-xs font-medium">NATIONAL THREAT LEVEL</div>
                <div className="text-xl font-bold">{stats.riskLevel}</div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-6 gap-4">
            {[
              { label: 'Active Campaigns', value: stats.activeCampaigns, icon: Activity, color: 'red' },
              { label: 'Threats Detected', value: stats.threatsDetected, icon: AlertTriangle, color: 'orange' },
              { label: 'Platforms Monitored', value: stats.platformsMonitored, icon: Globe, color: 'blue' },
              { label: 'Takedowns Initiated', value: stats.takedownsInitiated, icon: Target, color: 'green' },
              { label: 'Avg Response Time', value: stats.avgResponseTime, icon: Clock, color: 'cyan' },
              { label: 'Registry Entries', value: '12.4K', icon: Database, color: 'purple' },
            ].map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-slate-800/50 border border-slate-700 rounded-lg p-4"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className={`w-4 h-4 text-${stat.color}-500`} />
                    <span className="text-xs text-gray-400">{stat.label}</span>
                  </div>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="px-8 flex gap-2">
          {[
            { id: 'overview', label: 'Command Center', icon: Activity },
            { id: 'propagation', label: 'Propagation Map', icon: Map },
            { id: 'alerts', label: 'Risk Alerts', icon: AlertTriangle },
            { id: 'registry', label: 'Fingerprint Registry', icon: Database },
            { id: 'takedown', label: 'Takedown Toolkit', icon: Target },
            { id: 'forensics', label: 'Forensic Analysis', icon: Search },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = viewMode === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setViewMode(tab.id as ViewMode)}
                className={`flex items-center gap-2 px-6 py-3 font-medium transition-all border-b-2 ${
                  isActive
                    ? 'text-white border-blue-500 bg-blue-500/10'
                    : 'text-gray-400 border-transparent hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-8">
        {viewMode === 'overview' && (
          <div className="space-y-6">
            {/* Critical Alerts Banner */}
            {recentAlerts.filter(a => a.priority === 'CRITICAL').length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/10 border-2 border-red-500 rounded-xl p-6"
              >
                <div className="flex items-start gap-4">
                  <AlertOctagon className="w-8 h-8 text-red-500 flex-shrink-0 animate-pulse" />
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-red-500 mb-2">CRITICAL THREAT DETECTED</h3>
                    <p className="text-white mb-4">
                      High-impact deepfake campaign detected with rapid propagation across multiple platforms. 
                      Immediate response recommended.
                    </p>
                    <div className="flex gap-3">
                      <button 
                        onClick={() => setViewMode('alerts')}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-all"
                      >
                        View Alert Details
                      </button>
                      <button 
                        onClick={() => setViewMode('takedown')}
                        className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-all"
                      >
                        Initiate Takedown
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            <div className="grid grid-cols-3 gap-6">
              {/* Recent Alerts */}
              <div className="col-span-2 bg-slate-800/50 border border-slate-700 rounded-xl">
                <div className="p-6 border-b border-slate-700">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                      <Bell className="w-5 h-5 text-orange-500" />
                      Recent Threat Alerts
                    </h3>
                    <button 
                      onClick={() => setViewMode('alerts')}
                      className="text-sm text-blue-400 hover:text-blue-300"
                    >
                      View All →
                    </button>
                  </div>
                </div>
                <div className="divide-y divide-slate-700">
                  {recentAlerts.map((alert, idx) => (
                    <motion.div
                      key={alert.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="p-6 hover:bg-slate-700/30 cursor-pointer transition-all"
                      onClick={() => {
                        setSelectedThreat(alert);
                        setViewMode('alerts');
                      }}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center ${
                          alert.priority === 'CRITICAL' 
                            ? 'bg-red-500/20 border border-red-500/50' 
                            : alert.priority === 'HIGH'
                            ? 'bg-orange-500/20 border border-orange-500/50'
                            : 'bg-yellow-500/20 border border-yellow-500/50'
                        }`}>
                          <AlertTriangle className={`w-6 h-6 ${
                            alert.priority === 'CRITICAL' ? 'text-red-500' : 
                            alert.priority === 'HIGH' ? 'text-orange-500' : 'text-yellow-500'
                          }`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-2">
                            <span className={`px-2 py-1 text-xs font-bold rounded ${
                              alert.priority === 'CRITICAL' 
                                ? 'bg-red-500 text-white' 
                                : alert.priority === 'HIGH'
                                ? 'bg-orange-500 text-white'
                                : 'bg-yellow-500 text-black'
                            }`}>
                              {alert.priority}
                            </span>
                            <span className="text-sm text-gray-400">
                              {alert.id} • {alert.timestamp.toLocaleTimeString()}
                            </span>
                          </div>
                          <h4 className="text-white font-semibold mb-1">{alert.subject}</h4>
                          <div className="flex items-center gap-4 text-sm text-gray-400">
                            <span>Type: {alert.type}</span>
                            <span>Risk: {alert.riskScore}%</span>
                            <span>Reach: {alert.reach}</span>
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            {alert.platforms.map(platform => (
                              <span key={platform} className="px-2 py-1 bg-slate-700 text-xs text-gray-300 rounded">
                                {platform}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                            alert.status === 'ACTIVE' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                            alert.status === 'INVESTIGATING' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' :
                            alert.status === 'TAKEDOWN_INITIATED' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                            'bg-green-500/20 text-green-400 border border-green-500/30'
                          }`}>
                            {alert.status.replace('_', ' ')}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Active Campaigns */}
              <div className="bg-slate-800/50 border border-slate-700 rounded-xl">
                <div className="p-6 border-b border-slate-700">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Network className="w-5 h-5 text-purple-500" />
                    Active Campaigns
                  </h3>
                </div>
                <div className="p-6 space-y-4">
                  {activeCampaigns.map((campaign, idx) => (
                    <motion.div
                      key={campaign.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.1 }}
                      className="p-4 bg-slate-900/50 border border-slate-700 rounded-lg hover:border-purple-500/50 cursor-pointer transition-all"
                      onClick={() => setViewMode('propagation')}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="text-sm font-mono text-gray-400 mb-1">{campaign.id}</div>
                          <div className="text-white font-semibold">{campaign.name}</div>
                        </div>
                        <span className={`px-2 py-1 text-xs font-bold rounded ${
                          campaign.status === 'ACTIVE' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {campaign.status}
                        </span>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between text-gray-400">
                          <span>Variants:</span>
                          <span className="text-white font-medium">{campaign.variants}</span>
                        </div>
                        <div className="flex justify-between text-gray-400">
                          <span>Platforms:</span>
                          <span className="text-white font-medium">{campaign.platforms}</span>
                        </div>
                        <div className="flex justify-between text-gray-400">
                          <span>Total Reach:</span>
                          <span className="text-white font-medium">{campaign.reach}</span>
                        </div>
                      </div>
                      <div className="mt-3 pt-3 border-t border-slate-700">
                        <div className="text-xs text-gray-400">{campaign.category}</div>
                      </div>
                    </motion.div>
                  ))}
                  
                  <button 
                    onClick={() => setViewMode('propagation')}
                    className="w-full py-3 border border-slate-600 hover:border-purple-500 rounded-lg text-sm text-gray-400 hover:text-white transition-all"
                  >
                    View All Campaigns →
                  </button>
                </div>
              </div>
            </div>

            {/* System Status */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-green-500" />
                  Platform Monitoring Status
                </h3>
                <div className="space-y-3">
                  {[
                    { name: 'Twitter/X', status: 'ACTIVE', monitored: '2.4M accounts', color: 'green' },
                    { name: 'WhatsApp', status: 'ACTIVE', monitored: '1.8M groups', color: 'green' },
                    { name: 'Telegram', status: 'ACTIVE', monitored: '920K channels', color: 'green' },
                    { name: 'Instagram', status: 'ACTIVE', monitored: '1.2M accounts', color: 'green' },
                    { name: 'Facebook', status: 'DEGRADED', monitored: '890K pages', color: 'yellow' },
                    { name: 'TikTok', status: 'ACTIVE', monitored: '650K creators', color: 'green' },
                  ].map((platform, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${
                          platform.status === 'ACTIVE' ? 'bg-green-500 animate-pulse' : 'bg-yellow-500'
                        }`} />
                        <span className="text-white font-medium">{platform.name}</span>
                      </div>
                      <div className="text-sm text-gray-400">{platform.monitored}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-blue-500" />
                  Response Performance
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-400">Detection Rate</span>
                      <span className="text-white font-bold">98.7%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-green-500 to-emerald-500" style={{ width: '98.7%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-400">Avg Response Time</span>
                      <span className="text-white font-bold">4.2 min</span>
                    </div>
                    <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500" style={{ width: '85%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-400">Takedown Success</span>
                      <span className="text-white font-bold">94.3%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500" style={{ width: '94.3%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-400">False Positive Rate</span>
                      <span className="text-white font-bold">0.8%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-red-500 to-orange-500" style={{ width: '0.8%' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {viewMode === 'propagation' && <PropagationMap />}
        {viewMode === 'alerts' && <RiskAlertDashboard selectedThreat={selectedThreat} />}
        {viewMode === 'registry' && <FingerprintRegistry />}
        {viewMode === 'takedown' && <TakedownToolkit />}
        {viewMode === 'forensics' && <ForensicAnalysis />}
      </div>
    </div>
  );
}
