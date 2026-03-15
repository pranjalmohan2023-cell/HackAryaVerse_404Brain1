import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  AlertTriangle, AlertOctagon, AlertCircle, TrendingUp, 
  Users, Globe, Clock, Target, Eye, FileText, Download, Share2
} from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts';

interface RiskAlertDashboardProps {
  selectedThreat?: any;
}

export function RiskAlertDashboard({ selectedThreat }: RiskAlertDashboardProps) {
  const [filterPriority, setFilterPriority] = useState<string>('ALL');
  const [filterType, setFilterType] = useState<string>('ALL');

  // Mock threat data
  const threatDetails = selectedThreat || {
    id: 'ALT-2026-0847',
    timestamp: new Date(Date.now() - 12 * 60000),
    type: 'VIDEO_DEEPFAKE',
    riskScore: 94,
    subject: 'Political Figure - False Statement on Economic Policy',
    description: 'High-quality deepfake video showing political figure making false statements about upcoming economic reforms',
    reach: '2.4M',
    platforms: ['Twitter', 'Telegram', 'WhatsApp'],
    status: 'ACTIVE',
    priority: 'CRITICAL',
    detectionModels: {
      faceManipulation: 96,
      lipSync: 92,
      audioCloning: 88,
      temporalConsistency: 91
    },
    metadata: {
      fileHash: 'sha256:8f7a9b2c3d4e5f6a7b8c9d0e1f2a3b4c',
      duration: '2:34',
      resolution: '1920x1080',
      codec: 'H.264',
      fileSize: '47.2 MB',
      created: new Date(Date.now() - 7 * 60 * 60000),
      platform: 'Twitter',
      originalPoster: '@suspicious_account_2847'
    },
    forensics: {
      compressionArtifacts: 'High inconsistency in compression patterns',
      pixelAnalysis: 'GAN artifacts detected in facial region',
      temporalAnalysis: 'Frame interpolation anomalies',
      audioAnalysis: 'Voice synthesis signatures present',
      exifData: {
        camera: 'None',
        software: 'Unknown editing software',
        gps: 'Stripped',
        timestamp: 'Modified'
      }
    }
  };

  // Risk scoring breakdown
  const riskFactors = [
    { factor: 'Virality Score', score: 96, weight: 30, contribution: 28.8 },
    { factor: 'Content Sensitivity', score: 98, weight: 25, contribution: 24.5 },
    { factor: 'Audience Reach', score: 92, weight: 20, contribution: 18.4 },
    { factor: 'Source Credibility', score: 15, weight: 15, contribution: 2.25 },
    { factor: 'Detection Confidence', score: 93, weight: 10, contribution: 9.3 },
  ];

  const impactAssessment = {
    politicalImpact: 95,
    socialImpact: 88,
    economicImpact: 67,
    securityImpact: 92,
    publicTrustImpact: 94,
    electoralImpact: 89
  };

  const radarData = [
    { category: 'Political', value: impactAssessment.politicalImpact, fullMark: 100, id: 'political' },
    { category: 'Social', value: impactAssessment.socialImpact, fullMark: 100, id: 'social' },
    { category: 'Economic', value: impactAssessment.economicImpact, fullMark: 100, id: 'economic' },
    { category: 'Security', value: impactAssessment.securityImpact, fullMark: 100, id: 'security' },
    { category: 'Trust', value: impactAssessment.publicTrustImpact, fullMark: 100, id: 'trust' },
    { category: 'Electoral', value: impactAssessment.electoralImpact, fullMark: 100, id: 'electoral' },
  ];

  const spreadData = Array.from({ length: 12 }, (_, i) => ({
    time: `${i}h`,
    views: Math.floor(Math.random() * 500000) + 100000,
    shares: Math.floor(Math.random() * 50000) + 10000,
    id: `spread-${i}`
  }));

  return (
    <div className="space-y-6">
      {/* Alert Header */}
      <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 border-2 border-red-500/50 rounded-xl p-6">
        <div className="flex items-start gap-6">
          <div className="flex-shrink-0 w-20 h-20 bg-red-500/30 border-2 border-red-500 rounded-xl flex items-center justify-center">
            <AlertOctagon className="w-10 h-10 text-red-500 animate-pulse" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <span className="px-4 py-1 bg-red-600 text-white font-bold rounded-full text-sm">
                {threatDetails.priority} PRIORITY
              </span>
              <span className="px-3 py-1 bg-slate-800 border border-slate-600 text-gray-300 rounded font-mono text-sm">
                {threatDetails.id}
              </span>
              <span className="text-sm text-gray-400">
                Detected: {threatDetails.timestamp.toLocaleString()}
              </span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">{threatDetails.subject}</h2>
            <p className="text-gray-300 mb-4">{threatDetails.description}</p>
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-blue-400" />
                <span className="text-gray-400">Reach:</span>
                <span className="text-white font-bold">{threatDetails.reach}</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-purple-400" />
                <span className="text-gray-400">Platforms:</span>
                <span className="text-white font-bold">{threatDetails.platforms.join(', ')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-red-400" />
                <span className="text-gray-400">Risk Score:</span>
                <span className="text-red-500 font-bold text-lg">{threatDetails.riskScore}%</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-all">
              Initiate Takedown
            </button>
            <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-all">
              Generate Report
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Risk Score Breakdown */}
        <div className="col-span-2 space-y-6">
          {/* Detection Models */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-red-500" />
              AI Detection Model Results
            </h3>
            <div className="space-y-4">
              {Object.entries(threatDetails.detectionModels).map(([model, score], idx) => (
                <motion.div
                  key={model}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-medium capitalize">
                      {model.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    <span className={`font-bold ${
                      score >= 90 ? 'text-red-500' : 
                      score >= 75 ? 'text-orange-500' : 
                      'text-yellow-500'
                    }`}>
                      {score}%
                    </span>
                  </div>
                  <div className="w-full h-3 bg-slate-700 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all ${
                        score >= 90 ? 'bg-gradient-to-r from-red-500 to-red-600' : 
                        score >= 75 ? 'bg-gradient-to-r from-orange-500 to-orange-600' : 
                        'bg-gradient-to-r from-yellow-500 to-yellow-600'
                      }`}
                      style={{ width: `${score}%` }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-white font-bold">Overall Detection Confidence</span>
                <span className="text-2xl font-bold text-red-500">
                  {Math.round(Object.values(threatDetails.detectionModels).reduce((a, b) => a + b, 0) / 
                    Object.values(threatDetails.detectionModels).length)}%
                </span>
              </div>
            </div>
          </div>

          {/* Risk Factor Contribution */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-orange-500" />
              Risk Score Breakdown
            </h3>
            <div className="space-y-4">
              {riskFactors.map((factor, idx) => (
                <motion.div
                  key={factor.factor}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-4 bg-slate-900/50 rounded-lg"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <div className="text-white font-medium">{factor.factor}</div>
                      <div className="text-xs text-gray-400">Weight: {factor.weight}%</div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-orange-500">+{factor.contribution.toFixed(1)}</div>
                      <div className="text-xs text-gray-400">Score: {factor.score}</div>
                    </div>
                  </div>
                  <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-orange-500 to-red-500"
                      style={{ width: `${factor.score}%` }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-slate-700 flex items-center justify-between">
              <span className="text-white font-bold text-lg">Total Risk Score</span>
              <span className="text-3xl font-bold text-red-500">{threatDetails.riskScore}%</span>
            </div>
          </div>

          {/* Propagation Chart */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-500" />
              Propagation Growth
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={spreadData}>
                  <defs>
                    <linearGradient id="viewsGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="sharesGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
                  <XAxis dataKey="time" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      border: '1px solid #334155',
                      borderRadius: '8px'
                    }}
                  />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="views"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    fill="url(#viewsGradient)"
                    name="Views"
                  />
                  <Area
                    type="monotone"
                    dataKey="shares"
                    stroke="#ef4444"
                    strokeWidth={2}
                    fill="url(#sharesGradient)"
                    name="Shares"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Societal Impact Assessment */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-purple-500" />
              Impact Assessment
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#334155" />
                  <PolarAngleAxis dataKey="category" stroke="#94a3b8" style={{ fontSize: '11px' }} />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="#64748b" />
                  <Radar
                    name="Impact Score"
                    dataKey="value"
                    stroke="#a855f7"
                    fill="#a855f7"
                    fillOpacity={0.5}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4 text-xs">
              {radarData.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 bg-slate-900/50 rounded">
                  <span className="text-gray-400">{item.category}</span>
                  <span className={`font-bold ${
                    item.value >= 90 ? 'text-red-500' :
                    item.value >= 75 ? 'text-orange-500' :
                    'text-yellow-500'
                  }`}>
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* File Metadata */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-cyan-500" />
              Technical Metadata
            </h3>
            <div className="space-y-3 text-sm">
              <div>
                <div className="text-gray-400 mb-1">File Hash (SHA-256)</div>
                <div className="text-white font-mono text-xs break-all bg-slate-900/50 p-2 rounded">
                  {threatDetails.metadata.fileHash}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="text-gray-400 mb-1">Duration</div>
                  <div className="text-white font-medium">{threatDetails.metadata.duration}</div>
                </div>
                <div>
                  <div className="text-gray-400 mb-1">Resolution</div>
                  <div className="text-white font-medium">{threatDetails.metadata.resolution}</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="text-gray-400 mb-1">Codec</div>
                  <div className="text-white font-medium">{threatDetails.metadata.codec}</div>
                </div>
                <div>
                  <div className="text-gray-400 mb-1">File Size</div>
                  <div className="text-white font-medium">{threatDetails.metadata.fileSize}</div>
                </div>
              </div>
              <div>
                <div className="text-gray-400 mb-1">Original Platform</div>
                <div className="text-white font-medium">{threatDetails.metadata.platform}</div>
              </div>
              <div>
                <div className="text-gray-400 mb-1">Original Poster</div>
                <div className="text-white font-mono font-medium">{threatDetails.metadata.originalPoster}</div>
              </div>
            </div>
          </div>

          {/* Forensic Findings */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-yellow-500" />
              Forensic Findings
            </h3>
            <div className="space-y-3">
              {Object.entries(threatDetails.forensics)
                .filter(([key]) => key !== 'exifData')
                .map(([key, value], idx) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg"
                >
                  <div className="text-xs text-yellow-500 font-medium mb-1 uppercase">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </div>
                  <div className="text-sm text-white">{value as string}</div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-all flex items-center gap-2">
                <Target className="w-4 h-4" />
                Initiate Platform Takedown
              </button>
              <button className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all flex items-center gap-2">
                <Share2 className="w-4 h-4" />
                Alert Partner Agencies
              </button>
              <button className="w-full px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-all flex items-center gap-2">
                <Download className="w-4 h-4" />
                Download Evidence Package
              </button>
              <button className="w-full px-4 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-all flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Generate Detailed Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}