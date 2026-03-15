import { useState } from 'react';
import { motion } from 'motion/react';
import { Network, Users, Share2, TrendingUp, Globe, Filter, Download, Maximize2 } from 'lucide-react';
import { ResponsiveContainer, Sankey, Tooltip } from 'recharts';

export function PropagationMap() {
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState('24h');

  // Mock propagation data
  const propagationData = {
    originPost: {
      id: 'POST-2847392',
      platform: 'Twitter',
      author: '@suspicious_account_2847',
      timestamp: new Date(Date.now() - 6 * 60 * 60000),
      content: 'Political deepfake video',
      initialReach: 12000
    },
    nodes: [
      { id: 'origin', platform: 'Twitter', accounts: 1, reach: 12000, tier: 0 },
      { id: 't1_1', platform: 'Twitter', accounts: 24, reach: 145000, tier: 1 },
      { id: 't1_2', platform: 'Telegram', accounts: 8, reach: 89000, tier: 1 },
      { id: 't1_3', platform: 'WhatsApp', accounts: 15, reach: 67000, tier: 1 },
      { id: 't2_1', platform: 'Twitter', accounts: 156, reach: 890000, tier: 2 },
      { id: 't2_2', platform: 'Instagram', accounts: 43, reach: 234000, tier: 2 },
      { id: 't2_3', platform: 'Facebook', accounts: 67, reach: 456000, tier: 2 },
      { id: 't2_4', platform: 'WhatsApp', accounts: 234, reach: 1200000, tier: 2 },
      { id: 't3_1', platform: 'Twitter', accounts: 892, reach: 2400000, tier: 3 },
    ],
    edges: [
      { from: 'origin', to: 't1_1', weight: 145000 },
      { from: 'origin', to: 't1_2', weight: 89000 },
      { from: 'origin', to: 't1_3', weight: 67000 },
      { from: 't1_1', to: 't2_1', weight: 890000 },
      { from: 't1_1', to: 't2_2', weight: 234000 },
      { from: 't1_2', to: 't2_3', weight: 456000 },
      { from: 't1_3', to: 't2_4', weight: 1200000 },
      { from: 't2_1', to: 't3_1', weight: 2400000 },
    ]
  };

  const platformStats = [
    { platform: 'Twitter', posts: 1073, accounts: 892, reach: '2.4M', growth: '+340%', color: 'blue' },
    { platform: 'WhatsApp', posts: 249, accounts: 234, reach: '1.2M', growth: '+280%', color: 'green' },
    { platform: 'Facebook', posts: 67, accounts: 67, reach: '456K', growth: '+180%', color: 'purple' },
    { platform: 'Instagram', posts: 43, accounts: 43, reach: '234K', growth: '+120%', color: 'pink' },
    { platform: 'Telegram', posts: 8, accounts: 8, reach: '89K', growth: '+45%', color: 'cyan' },
  ];

  const keyAccounts = [
    { 
      handle: '@suspicious_account_2847', 
      platform: 'Twitter', 
      role: 'Origin', 
      followers: '12K',
      shares: 24,
      riskScore: 94
    },
    { 
      handle: '@viral_news_hub', 
      platform: 'Twitter', 
      role: 'Super Spreader', 
      followers: '890K',
      shares: 156,
      riskScore: 88
    },
    { 
      handle: 'Political Updates (Group)', 
      platform: 'WhatsApp', 
      role: 'Amplifier', 
      followers: '45K members',
      shares: 234,
      riskScore: 76
    },
    { 
      handle: '@breaking_updates', 
      platform: 'Instagram', 
      role: 'Cross-Platform Bridge', 
      followers: '234K',
      shares: 43,
      riskScore: 72
    },
  ];

  const timelineData = [
    { hour: 0, posts: 1, reach: 12000 },
    { hour: 1, posts: 3, reach: 45000 },
    { hour: 2, posts: 12, reach: 156000 },
    { hour: 3, posts: 47, reach: 589000 },
    { hour: 4, posts: 189, reach: 1240000 },
    { hour: 5, posts: 523, reach: 2890000 },
    { hour: 6, posts: 1073, reach: 4870000 },
  ];

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">Propagation Network Analysis</h2>
          <p className="text-gray-400">Tracking spread of ALT-2026-0847 across platforms</p>
        </div>
        <div className="flex items-center gap-3">
          <select 
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
          >
            <option value="1h">Last Hour</option>
            <option value="6h">Last 6 Hours</option>
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
          </select>
          <button className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white hover:bg-slate-700 transition-all flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filter
          </button>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-all flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export Network
          </button>
        </div>
      </div>

      {/* Origin Information */}
      <div className="bg-red-500/10 border-2 border-red-500/30 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-red-500/20 border border-red-500/50 rounded-lg flex items-center justify-center">
            <Share2 className="w-6 h-6 text-red-500" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <h3 className="text-xl font-bold text-white">Origin Point Detected</h3>
              <span className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
                PRIMARY SOURCE
              </span>
            </div>
            <div className="grid grid-cols-4 gap-4 mb-4">
              <div>
                <div className="text-xs text-gray-400 mb-1">Platform</div>
                <div className="text-white font-medium">{propagationData.originPost.platform}</div>
              </div>
              <div>
                <div className="text-xs text-gray-400 mb-1">Account</div>
                <div className="text-white font-medium font-mono">{propagationData.originPost.author}</div>
              </div>
              <div>
                <div className="text-xs text-gray-400 mb-1">First Detected</div>
                <div className="text-white font-medium">{propagationData.originPost.timestamp.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-xs text-gray-400 mb-1">Current Total Reach</div>
                <div className="text-red-500 font-bold text-lg">4.87M</div>
              </div>
            </div>
            <div className="text-sm text-gray-300">
              Content Type: {propagationData.originPost.content} • Post ID: {propagationData.originPost.id}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Visual Network Graph */}
        <div className="col-span-2 bg-slate-800/50 border border-slate-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Network className="w-5 h-5 text-purple-500" />
              Propagation Network Graph
            </h3>
            <button className="p-2 hover:bg-slate-700 rounded-lg transition-all">
              <Maximize2 className="w-4 h-4 text-gray-400" />
            </button>
          </div>

          {/* Network Visualization */}
          <div className="relative bg-slate-900/50 rounded-lg p-8" style={{ height: '500px' }}>
            {/* SVG Network Graph */}
            <svg width="100%" height="100%" className="overflow-visible">
              {/* Origin Node */}
              <g>
                <circle cx="50%" cy="10%" r="20" fill="#ef4444" className="animate-pulse" />
                <text x="50%" y="10%" textAnchor="middle" dy="5" className="text-xs fill-white font-bold">
                  ORIGIN
                </text>
                <text x="50%" y="calc(10% + 35px)" textAnchor="middle" className="text-xs fill-gray-400">
                  Twitter
                </text>
              </g>

              {/* Tier 1 Nodes */}
              {[
                { x: '25%', y: '35%', platform: 'Twitter', color: '#3b82f6', label: '145K' },
                { x: '50%', y: '35%', platform: 'Telegram', color: '#06b6d4', label: '89K' },
                { x: '75%', y: '35%', platform: 'WhatsApp', color: '#10b981', label: '67K' },
              ].map((node, idx) => (
                <g key={idx}>
                  <line 
                    x1="50%" 
                    y1="calc(10% + 20px)" 
                    x2={node.x} 
                    y2="calc(35% - 15px)" 
                    stroke={node.color}
                    strokeWidth="2"
                    opacity="0.5"
                    strokeDasharray="5,5"
                  />
                  <circle cx={node.x} cy="35%" r="15" fill={node.color} opacity="0.8" />
                  <text x={node.x} y="35%" textAnchor="middle" dy="4" className="text-xs fill-white font-medium">
                    T1
                  </text>
                  <text x={node.x} y="calc(35% + 25px)" textAnchor="middle" className="text-xs fill-gray-400">
                    {node.platform}
                  </text>
                  <text x={node.x} y="calc(35% + 40px)" textAnchor="middle" className="text-xs fill-white font-bold">
                    {node.label}
                  </text>
                </g>
              ))}

              {/* Tier 2 Nodes */}
              {[
                { x: '15%', y: '60%', platform: 'Twitter', color: '#3b82f6', label: '890K' },
                { x: '30%', y: '60%', platform: 'Instagram', color: '#ec4899', label: '234K' },
                { x: '45%', y: '60%', platform: 'Facebook', color: '#8b5cf6', label: '456K' },
                { x: '60%', y: '60%', platform: 'WhatsApp', color: '#10b981', label: '1.2M' },
              ].map((node, idx) => (
                <g key={idx}>
                  <circle cx={node.x} cy="60%" r="12" fill={node.color} opacity="0.8" />
                  <text x={node.x} y="60%" textAnchor="middle" dy="4" className="text-[10px] fill-white font-medium">
                    T2
                  </text>
                  <text x={node.x} y="calc(60% + 20px)" textAnchor="middle" className="text-[10px] fill-gray-400">
                    {node.platform}
                  </text>
                  <text x={node.x} y="calc(60% + 32px)" textAnchor="middle" className="text-xs fill-white font-bold">
                    {node.label}
                  </text>
                </g>
              ))}

              {/* Tier 3 Final Spread */}
              <g>
                <circle cx="50%" cy="85%" r="25" fill="#ef4444" opacity="0.3" className="animate-pulse" />
                <circle cx="50%" cy="85%" r="18" fill="#ef4444" opacity="0.6" />
                <text x="50%" y="85%" textAnchor="middle" dy="5" className="text-sm fill-white font-bold">
                  T3
                </text>
                <text x="50%" y="calc(85% + 35px)" textAnchor="middle" className="text-xs fill-gray-400">
                  Multi-Platform
                </text>
                <text x="50%" y="calc(85% + 50px)" textAnchor="middle" className="text-base fill-red-400 font-bold">
                  2.4M Reach
                </text>
              </g>

              {/* Connection lines from Tier 1 to Tier 2 */}
              <line x1="25%" y1="calc(35% + 15px)" x2="15%" y2="calc(60% - 12px)" stroke="#3b82f6" strokeWidth="3" opacity="0.3" />
              <line x1="25%" y1="calc(35% + 15px)" x2="30%" y2="calc(60% - 12px)" stroke="#ec4899" strokeWidth="2" opacity="0.3" />
              <line x1="50%" y1="calc(35% + 15px)" x2="45%" y2="calc(60% - 12px)" stroke="#8b5cf6" strokeWidth="2" opacity="0.3" />
              <line x1="75%" y1="calc(35% + 15px)" x2="60%" y2="calc(60% - 12px)" stroke="#10b981" strokeWidth="4" opacity="0.3" />

              {/* Connection lines from Tier 2 to Tier 3 */}
              <line x1="15%" y1="calc(60% + 12px)" x2="50%" y2="calc(85% - 25px)" stroke="#3b82f6" strokeWidth="5" opacity="0.3" />
            </svg>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-4">
            <div className="text-center p-3 bg-slate-900/50 rounded-lg">
              <div className="text-2xl font-bold text-white mb-1">3</div>
              <div className="text-xs text-gray-400">Propagation Tiers</div>
            </div>
            <div className="text-center p-3 bg-slate-900/50 rounded-lg">
              <div className="text-2xl font-bold text-white mb-1">1,073</div>
              <div className="text-xs text-gray-400">Total Posts</div>
            </div>
            <div className="text-center p-3 bg-slate-900/50 rounded-lg">
              <div className="text-2xl font-bold text-red-500 mb-1">4.87M</div>
              <div className="text-xs text-gray-400">Total Reach</div>
            </div>
          </div>
        </div>

        {/* Platform Breakdown */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Globe className="w-5 h-5 text-blue-500" />
            Platform Distribution
          </h3>
          <div className="space-y-4">
            {platformStats.map((platform, idx) => (
              <motion.div
                key={platform.platform}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="p-4 bg-slate-900/50 rounded-lg hover:bg-slate-900 cursor-pointer transition-all border border-transparent hover:border-blue-500/30"
                onClick={() => setSelectedPlatform(platform.platform)}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-medium">{platform.platform}</span>
                  <span className="text-xs text-green-400 font-bold">{platform.growth}</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs mb-2">
                  <div>
                    <div className="text-gray-500">Posts</div>
                    <div className="text-white font-bold">{platform.posts}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Accounts</div>
                    <div className="text-white font-bold">{platform.accounts}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Reach</div>
                    <div className="text-white font-bold">{platform.reach}</div>
                  </div>
                </div>
                <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden">
                  <div 
                    className={`h-full bg-${platform.color}-500`}
                    style={{ width: `${(platform.posts / 1073) * 100}%` }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Key Accounts */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Users className="w-5 h-5 text-orange-500" />
          Key Propagation Accounts
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {keyAccounts.map((account, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="p-4 bg-slate-900/50 border border-slate-700 rounded-lg hover:border-orange-500/50 cursor-pointer transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="text-white font-mono font-medium mb-1">{account.handle}</div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">{account.platform}</span>
                    <span className="px-2 py-0.5 bg-orange-500/20 text-orange-400 text-xs rounded">
                      {account.role}
                    </span>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-lg font-bold text-sm ${
                  account.riskScore >= 90 ? 'bg-red-500/20 text-red-400' :
                  account.riskScore >= 80 ? 'bg-orange-500/20 text-orange-400' :
                  'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {account.riskScore}%
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <div className="text-gray-500 text-xs">Followers/Members</div>
                  <div className="text-white font-bold">{account.followers}</div>
                </div>
                <div>
                  <div className="text-gray-500 text-xs">Shares/Forwards</div>
                  <div className="text-white font-bold">{account.shares}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Timeline Spread */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-green-500" />
          Propagation Timeline (Last 6 Hours)
        </h3>
        <div className="grid grid-cols-7 gap-3">
          {timelineData.map((item, idx) => (
            <div key={idx} className="text-center">
              <div className="mb-2 text-xs text-gray-400">Hour {item.hour}</div>
              <div className="relative h-32 bg-slate-900/50 rounded-lg flex flex-col justify-end p-2">
                <div 
                  className="bg-gradient-to-t from-blue-500 to-cyan-500 rounded"
                  style={{ height: `${(item.reach / 4870000) * 100}%` }}
                />
              </div>
              <div className="mt-2 text-xs text-white font-bold">{item.posts}</div>
              <div className="text-xs text-gray-500">posts</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
