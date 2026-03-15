import { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Upload, Image, Video, Mic, FileText, Database, Hash, Eye, Layers, Microscope, Download } from 'lucide-react';

export function ForensicAnalysis() {
  const [analysisType, setAnalysisType] = useState<'metadata' | 'visual' | 'audio' | 'signature'>('metadata');

  const metadata = {
    fileInfo: {
      name: 'suspicious_video_2847.mp4',
      size: '47.2 MB',
      hash: 'sha256:8f7a9b2c3d4e5f6a7b8c9d0e1f2a3b4c',
      format: 'MP4 (H.264)',
      duration: '2:34',
      resolution: '1920x1080',
      framerate: '30 fps',
      bitrate: '2.5 Mbps'
    },
    exifData: {
      camera: 'None (Removed)',
      software: 'Unknown editing software',
      createDate: '2026:03:14 08:23:15',
      modifyDate: '2026:03:14 10:47:32',
      gps: 'Stripped',
      author: 'Not specified'
    },
    platformSignatures: {
      twitter: {
        detected: true,
        uploadTime: '2026-03-14T10:48:00Z',
        account: '@suspicious_account_2847',
        reencoded: true
      },
      telegram: {
        detected: true,
        uploadTime: '2026-03-14T11:15:00Z',
        channel: 'political_updates_2847',
        reencoded: true
      }
    },
    compressionAnalysis: {
      recompressionCount: 3,
      qualityLoss: 'Significant',
      artifactLevel: 'High',
      inconsistentRegions: ['Face area', 'Background edges'],
      anomalyScore: 87
    }
  };

  const visualFindings = [
    {
      category: 'Facial Analysis',
      findings: [
        { issue: 'GAN Artifacts in Facial Region', severity: 'high', confidence: 96 },
        { issue: 'Inconsistent Skin Texture', severity: 'high', confidence: 92 },
        { issue: 'Unnatural Eye Reflections', severity: 'medium', confidence: 84 },
        { issue: 'Boundary Blending Artifacts', severity: 'high', confidence: 89 }
      ]
    },
    {
      category: 'Temporal Analysis',
      findings: [
        { issue: 'Frame Interpolation Anomalies', severity: 'high', confidence: 91 },
        { issue: 'Inconsistent Motion Blur', severity: 'medium', confidence: 78 },
        { issue: 'Optical Flow Discontinuities', severity: 'high', confidence: 88 }
      ]
    },
    {
      category: 'Pixel-Level Analysis',
      findings: [
        { issue: 'CFA Pattern Irregularities', severity: 'medium', confidence: 76 },
        { issue: 'JPEG Double Compression', severity: 'high', confidence: 94 },
        { issue: 'Inconsistent Noise Patterns', severity: 'medium', confidence: 82 }
      ]
    }
  ];

  const audioFindings = [
    {
      category: 'Voice Analysis',
      findings: [
        { issue: 'Synthetic Voice Signatures Detected', severity: 'high', confidence: 93 },
        { issue: 'Unnatural Prosody Patterns', severity: 'high', confidence: 88 },
        { issue: 'Spectral Envelope Anomalies', severity: 'medium', confidence: 81 }
      ]
    },
    {
      category: 'Audio Processing',
      findings: [
        { issue: 'AI Voice Synthesis Markers', severity: 'high', confidence: 95 },
        { issue: 'Temporal Alignment Issues', severity: 'medium', confidence: 79 },
        { issue: 'Background Noise Inconsistency', severity: 'low', confidence: 68 }
      ]
    }
  ];

  const signatureMatches = [
    {
      model: 'DeepFake Detection Model v3.2',
      match: true,
      confidence: 96,
      signature: 'Face2Face GAN variant',
      notes: 'Strong match with known deepfake generation pattern'
    },
    {
      model: 'Audio Synthesis Detector',
      match: true,
      confidence: 88,
      signature: 'Voice cloning neural network',
      notes: 'Synthetic voice characteristics detected'
    },
    {
      model: 'Temporal Consistency Analyzer',
      match: true,
      confidence: 91,
      signature: 'Frame interpolation artifacts',
      notes: 'Non-natural temporal transitions'
    },
    {
      model: 'GAN Fingerprint Database',
      match: true,
      confidence: 89,
      signature: 'StyleGAN2-based generation',
      notes: 'Matches known GAN artifact patterns'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">Forensic Analysis Laboratory</h2>
          <p className="text-gray-400">Deep technical analysis of suspected deepfake content</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all flex items-center gap-2">
          <Upload className="w-4 h-4" />
          Upload for Analysis
        </button>
      </div>

      {/* Analysis Type Selector */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-2 flex gap-2">
        {[
          { id: 'metadata', label: 'Metadata & EXIF', icon: Database },
          { id: 'visual', label: 'Visual Forensics', icon: Eye },
          { id: 'audio', label: 'Audio Analysis', icon: Mic },
          { id: 'signature', label: 'AI Signatures', icon: Hash },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setAnalysisType(tab.id as any)}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                analysisType === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Metadata Analysis */}
      {analysisType === 'metadata' && (
        <div className="grid grid-cols-2 gap-6">
          {/* File Information */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-500" />
              File Information
            </h3>
            <div className="space-y-3">
              {Object.entries(metadata.fileInfo).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center p-3 bg-slate-900/50 rounded-lg">
                  <span className="text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                  <span className="text-white font-medium font-mono text-sm">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* EXIF Data */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Layers className="w-5 h-5 text-purple-500" />
              EXIF Metadata
            </h3>
            <div className="space-y-3">
              {Object.entries(metadata.exifData).map(([key, value]) => (
                <div key={key} className="p-3 bg-slate-900/50 rounded-lg">
                  <div className="text-xs text-gray-500 mb-1 capitalize">
                    {key.replace(/([A-Z])/g, ' $1')}
                  </div>
                  <div className={`text-sm font-medium ${
                    value.includes('None') || value.includes('Stripped') || value.includes('Unknown')
                      ? 'text-red-400'
                      : 'text-white'
                  }`}>
                    {value}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
              <div className="text-sm text-red-400 font-medium">⚠️ Metadata Tampering Detected</div>
              <div className="text-xs text-gray-300 mt-1">
                Multiple metadata fields removed or modified, indicating intentional obfuscation
              </div>
            </div>
          </div>

          {/* Platform Signatures */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Hash className="w-5 h-5 text-green-500" />
              Platform Fingerprints
            </h3>
            <div className="space-y-4">
              {Object.entries(metadata.platformSignatures).map(([platform, data]: [string, any]) => (
                <div key={platform} className="p-4 bg-slate-900/50 border border-slate-700 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-white font-medium capitalize">{platform}</span>
                    <span className={`px-2 py-1 text-xs font-bold rounded ${
                      data.detected ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'
                    }`}>
                      {data.detected ? 'DETECTED' : 'NOT FOUND'}
                    </span>
                  </div>
                  {data.detected && (
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Upload Time</span>
                        <span className="text-white">{new Date(data.uploadTime).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Account/Channel</span>
                        <span className="text-white font-mono">{data.account || data.channel}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Re-encoded</span>
                        <span className={data.reencoded ? 'text-orange-400' : 'text-green-400'}>
                          {data.reencoded ? 'Yes' : 'No'}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Compression Analysis */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Microscope className="w-5 h-5 text-orange-500" />
              Compression Analysis
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-slate-900/50 rounded-lg">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400">Recompression Count</span>
                  <span className="text-orange-500 font-bold">{metadata.compressionAnalysis.recompressionCount}</span>
                </div>
                <div className="text-xs text-gray-400">Multiple recompressions indicate file manipulation</div>
              </div>

              <div className="p-4 bg-slate-900/50 rounded-lg">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400">Quality Loss</span>
                  <span className="text-red-500 font-bold">{metadata.compressionAnalysis.qualityLoss}</span>
                </div>
              </div>

              <div className="p-4 bg-slate-900/50 rounded-lg">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400">Artifact Level</span>
                  <span className="text-red-500 font-bold">{metadata.compressionAnalysis.artifactLevel}</span>
                </div>
              </div>

              <div className="p-4 bg-slate-900/50 rounded-lg">
                <div className="text-gray-400 mb-2">Inconsistent Regions</div>
                <div className="flex flex-wrap gap-2">
                  {metadata.compressionAnalysis.inconsistentRegions.map((region, idx) => (
                    <span key={idx} className="px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded">
                      {region}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-orange-500/10 border border-orange-500/30 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-orange-400 font-medium">Anomaly Score</span>
                  <span className="text-2xl font-bold text-orange-500">
                    {metadata.compressionAnalysis.anomalyScore}%
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-700 rounded-full mt-2 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-orange-500 to-red-500"
                    style={{ width: `${metadata.compressionAnalysis.anomalyScore}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Visual Forensics */}
      {analysisType === 'visual' && (
        <div className="grid grid-cols-2 gap-6">
          <div className="col-span-2 bg-slate-800/50 border border-slate-700 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Eye className="w-5 h-5 text-cyan-500" />
              Visual Forensic Analysis Results
            </h3>
            <div className="space-y-6">
              {visualFindings.map((category, idx) => (
                <motion.div
                  key={category.category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <h4 className="text-white font-semibold mb-3">{category.category}</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {category.findings.map((finding, fIdx) => (
                      <div
                        key={fIdx}
                        className={`p-4 rounded-lg border ${
                          finding.severity === 'high'
                            ? 'bg-red-500/10 border-red-500/30'
                            : finding.severity === 'medium'
                            ? 'bg-orange-500/10 border-orange-500/30'
                            : 'bg-yellow-500/10 border-yellow-500/30'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <span className={`text-sm font-medium ${
                            finding.severity === 'high' ? 'text-red-400' :
                            finding.severity === 'medium' ? 'text-orange-400' :
                            'text-yellow-400'
                          }`}>
                            {finding.issue}
                          </span>
                          <span className="px-2 py-0.5 bg-slate-900 text-xs font-bold text-white rounded">
                            {finding.confidence}%
                          </span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${
                              finding.severity === 'high' ? 'bg-red-500' :
                              finding.severity === 'medium' ? 'bg-orange-500' :
                              'bg-yellow-500'
                            }`}
                            style={{ width: `${finding.confidence}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Audio Analysis */}
      {analysisType === 'audio' && (
        <div className="grid grid-cols-2 gap-6">
          <div className="col-span-2 bg-slate-800/50 border border-slate-700 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Mic className="w-5 h-5 text-green-500" />
              Audio Forensic Analysis Results
            </h3>
            <div className="space-y-6">
              {audioFindings.map((category, idx) => (
                <motion.div
                  key={category.category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <h4 className="text-white font-semibold mb-3">{category.category}</h4>
                  <div className="grid grid-cols-3 gap-3">
                    {category.findings.map((finding, fIdx) => (
                      <div
                        key={fIdx}
                        className={`p-4 rounded-lg border ${
                          finding.severity === 'high'
                            ? 'bg-red-500/10 border-red-500/30'
                            : finding.severity === 'medium'
                            ? 'bg-orange-500/10 border-orange-500/30'
                            : 'bg-yellow-500/10 border-yellow-500/30'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <span className={`text-sm font-medium ${
                            finding.severity === 'high' ? 'text-red-400' :
                            finding.severity === 'medium' ? 'text-orange-400' :
                            'text-yellow-400'
                          }`}>
                            {finding.issue}
                          </span>
                          <span className="px-2 py-0.5 bg-slate-900 text-xs font-bold text-white rounded">
                            {finding.confidence}%
                          </span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${
                              finding.severity === 'high' ? 'bg-red-500' :
                              finding.severity === 'medium' ? 'bg-orange-500' :
                              'bg-yellow-500'
                            }`}
                            style={{ width: `${finding.confidence}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* AI Signature Matching */}
      {analysisType === 'signature' && (
        <div className="space-y-6">
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Hash className="w-5 h-5 text-purple-500" />
              AI Model Signature Matches
            </h3>
            <div className="space-y-4">
              {signatureMatches.map((match, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-6 bg-slate-900/50 border border-slate-700 rounded-lg"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="text-white font-semibold mb-1">{match.model}</h4>
                      <p className="text-sm text-gray-400">{match.notes}</p>
                    </div>
                    <div className="text-right">
                      <div className={`px-3 py-1 rounded-full text-sm font-bold mb-2 ${
                        match.match ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'
                      }`}>
                        {match.match ? 'MATCH' : 'NO MATCH'}
                      </div>
                      <div className="text-2xl font-bold text-white">{match.confidence}%</div>
                    </div>
                  </div>
                  <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-700">
                    <div className="text-xs text-gray-500 mb-1">Detected Signature</div>
                    <div className="text-sm text-orange-400 font-medium">{match.signature}</div>
                  </div>
                  <div className="mt-3 w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-red-500 to-orange-500"
                      style={{ width: `${match.confidence}%` }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 border-2 border-red-500/50 rounded-xl p-6">
            <h4 className="text-xl font-bold text-white mb-3">⚠️ Forensic Conclusion</h4>
            <p className="text-gray-200 mb-4">
              Based on comprehensive multi-modal analysis, this content shows strong indicators of AI manipulation across multiple forensic domains:
            </p>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-red-500 font-bold">•</span>
                <span>High-confidence GAN artifact detection in facial regions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 font-bold">•</span>
                <span>Synthetic voice signatures matching known AI models</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 font-bold">•</span>
                <span>Multiple compression artifacts indicating post-processing</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 font-bold">•</span>
                <span>Stripped/modified metadata suggesting intentional obfuscation</span>
              </li>
            </ul>
            <div className="mt-6 flex gap-3">
              <button className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-all flex items-center gap-2">
                <Download className="w-5 h-5" />
                Download Full Forensic Report
              </button>
              <button className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-all">
                Add to Registry
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}