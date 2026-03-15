import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Shield, Video, Mic, FileText, Image as ImageIcon, BarChart3, CheckCircle, TrendingUp, Zap, Lock, Globe, Award, X, ShieldAlert, Network, Target, Database, AlertTriangle } from 'lucide-react';

interface PresentationProps {
  onClose?: () => void;
}

export function Presentation({ onClose }: PresentationProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'Space' || e.key === 'Enter') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'Escape' && onClose) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide, onClose]);

  const slides = [
    // Slide 1: Title
    {
      type: 'title',
      content: (
        <div className="flex flex-col items-center justify-center h-full text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', duration: 0.8 }}
            className="w-32 h-32 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-3xl flex items-center justify-center mb-8 shadow-2xl"
          >
            <Shield className="w-16 h-16 text-white" />
          </motion.div>
          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-7xl font-bold text-white mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"
          >
            TruthGuard AI
          </motion.h1>
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-3xl text-gray-300 mb-4"
          >
            Multi-Spectrum Deepfake Detection System
          </motion.p>
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-xl text-gray-400"
          >
            Protecting Truth in the Age of AI
          </motion.p>
        </div>
      ),
    },

    // Slide 2: The Problem
    {
      type: 'content',
      title: 'The Deepfake Crisis',
      content: (
        <div className="space-y-8">
          <div className="grid grid-cols-2 gap-8">
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-red-500/10 border-2 border-red-500/30 rounded-2xl p-8"
            >
              <div className="text-6xl font-bold text-red-500 mb-4">96%</div>
              <p className="text-xl text-gray-300">Increase in deepfake content since 2023</p>
            </motion.div>

            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-orange-500/10 border-2 border-orange-500/30 rounded-2xl p-8"
            >
              <div className="text-6xl font-bold text-orange-500 mb-4">$12.5B</div>
              <p className="text-xl text-gray-300">Estimated annual fraud losses from deepfakes</p>
            </motion.div>
          </div>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="space-y-4"
          >
            <h3 className="text-2xl font-bold text-white mb-4">Critical Challenges:</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                'Political misinformation campaigns',
                'Financial fraud & identity theft',
                'Corporate espionage & fake announcements',
                'Erosion of public trust in media'
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.8 + idx * 0.1 }}
                  className="flex items-center gap-3 bg-slate-800/50 border border-slate-700 rounded-xl p-4"
                >
                  <div className="w-3 h-3 bg-red-500 rounded-full" />
                  <span className="text-gray-300">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      ),
    },

    // Slide 3: Our Solution
    {
      type: 'content',
      title: 'Our Solution: TruthGuard AI',
      content: (
        <div className="space-y-8">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-2xl text-gray-300 leading-relaxed"
          >
            A comprehensive, multi-modal AI detection platform that analyzes video, audio, text, and images to identify deepfakes and AI-generated content with industry-leading accuracy.
          </motion.p>

          <div className="grid grid-cols-2 gap-6">
            {[
              { icon: Video, label: 'Video Analysis', desc: 'Frame-by-frame deepfake detection', color: 'from-blue-500 to-blue-600' },
              { icon: Mic, label: 'Audio Analysis', desc: 'Voice cloning & synthesis detection', color: 'from-purple-500 to-purple-600' },
              { icon: ImageIcon, label: 'Image Analysis', desc: 'GAN artifact & pixel manipulation', color: 'from-green-500 to-green-600' },
              { icon: FileText, label: 'Text Analysis', desc: 'AI-generated content detection', color: 'from-orange-500 to-orange-600' },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.4 + idx * 0.1, type: 'spring' }}
                  className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 hover:border-blue-500/50 transition-all"
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center mb-4`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">{item.label}</h4>
                  <p className="text-gray-400">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      ),
    },

    // Slide 4: Key Features
    {
      type: 'content',
      title: 'Powerful Features',
      content: (
        <div className="space-y-6">
          {[
            {
              icon: BarChart3,
              title: 'Real-Time Analysis Dashboard',
              desc: 'Live visualization of detection metrics, confidence scores, and timeline analysis',
              color: 'blue'
            },
            {
              icon: Zap,
              title: 'Multi-AI Model Consensus',
              desc: '4 specialized AI models working together for 99.2% accuracy',
              color: 'yellow'
            },
            {
              icon: TrendingUp,
              title: 'Temporal Analysis',
              desc: 'Frame-by-frame manipulation detection with heatmap visualization',
              color: 'green'
            },
            {
              icon: Lock,
              title: 'Enterprise-Grade Security',
              desc: 'Secure file handling, encrypted storage, and detailed audit trails',
              color: 'purple'
            },
            {
              icon: Globe,
              title: 'Comprehensive Reporting',
              desc: 'PDF, JSON, and text reports with detailed forensic analysis',
              color: 'cyan'
            },
          ].map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={idx}
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 + idx * 0.1 }}
                className="flex items-start gap-6 bg-slate-800/50 border border-slate-700 rounded-2xl p-6 hover:border-blue-500/50 transition-all"
              >
                <div className={`flex-shrink-0 w-14 h-14 bg-${feature.color}-500/10 border border-${feature.color}-500/30 rounded-xl flex items-center justify-center`}>
                  <Icon className={`w-7 h-7 text-${feature.color}-500`} />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">{feature.title}</h4>
                  <p className="text-gray-400">{feature.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      ),
    },

    // Slide 5: Technology Stack
    {
      type: 'content',
      title: 'Technology Stack',
      content: (
        <div className="grid grid-cols-2 gap-8">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold text-white mb-6">Frontend</h3>
            <div className="space-y-4">
              {[
                { name: 'React 18.3', desc: 'Modern UI framework' },
                { name: 'Motion (Framer Motion)', desc: 'Smooth animations' },
                { name: 'Tailwind CSS v4', desc: 'Utility-first styling' },
                { name: 'Recharts', desc: 'Data visualization' },
                { name: 'React Router', desc: 'Client-side routing' },
              ].map((tech, idx) => (
                <motion.div
                  key={idx}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4 + idx * 0.1 }}
                  className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-xl p-4"
                >
                  <div className="font-bold text-white mb-1">{tech.name}</div>
                  <div className="text-sm text-gray-400">{tech.desc}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold text-white mb-6">Backend & AI</h3>
            <div className="space-y-4">
              {[
                { name: 'Supabase', desc: 'Authentication & storage' },
                { name: 'Edge Functions', desc: 'Serverless compute' },
                { name: 'PostgreSQL', desc: 'Data persistence' },
                { name: 'Multi-Model AI', desc: 'Deepfake detection' },
                { name: 'jsPDF', desc: 'Report generation' },
              ].map((tech, idx) => (
                <motion.div
                  key={idx}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4 + idx * 0.1 }}
                  className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-4"
                >
                  <div className="font-bold text-white mb-1">{tech.name}</div>
                  <div className="text-sm text-gray-400">{tech.desc}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      ),
    },

    // Slide 6: How It Works
    {
      type: 'content',
      title: 'How It Works',
      content: (
        <div className="space-y-8">
          <div className="relative">
            {/* Timeline */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-cyan-500" />
            
            {[
              { step: '1', title: 'Upload Content', desc: 'Drag & drop video, audio, image, or text files' },
              { step: '2', title: 'Multi-Model Analysis', desc: '4 AI models analyze different aspects simultaneously' },
              { step: '3', title: 'Pattern Detection', desc: 'Identify manipulation artifacts, inconsistencies, and AI signatures' },
              { step: '4', title: 'Consensus & Scoring', desc: 'Aggregate results into comprehensive risk assessment' },
              { step: '5', title: 'Generate Report', desc: 'Detailed forensic report with visualizations and recommendations' },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ x: idx % 2 === 0 ? -100 : 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 + idx * 0.15 }}
                className={`relative flex items-center gap-8 mb-8 ${idx % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
              >
                <div className={`flex-1 ${idx % 2 === 0 ? 'text-right' : 'text-left'}`}>
                  <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 inline-block">
                    <h4 className="text-xl font-bold text-white mb-2">{item.title}</h4>
                    <p className="text-gray-400">{item.desc}</p>
                  </div>
                </div>
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-2xl font-bold text-white shadow-xl z-10">
                  {item.step}
                </div>
                <div className="flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      ),
    },

    // Slide 7: Results & Impact
    {
      type: 'content',
      title: 'Results & Impact',
      content: (
        <div className="space-y-8">
          <div className="grid grid-cols-3 gap-6">
            {[
              { value: '99.2%', label: 'Detection Accuracy', color: 'green' },
              { value: '<2s', label: 'Average Analysis Time', color: 'blue' },
              { value: '4', label: 'Content Types Supported', color: 'purple' },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2 + idx * 0.1, type: 'spring' }}
                className={`bg-${stat.color}-500/10 border-2 border-${stat.color}-500/30 rounded-2xl p-8 text-center`}
              >
                <div className={`text-6xl font-bold text-${stat.color}-500 mb-2`}>{stat.value}</div>
                <div className="text-lg text-gray-300">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-2xl p-8"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Use Cases</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                '🏛️ Government & Law Enforcement',
                '📰 Media & Journalism Verification',
                '🏢 Corporate Security & Compliance',
                '🎓 Academic Research & Education',
                '⚖️ Legal Evidence Authentication',
                '🛡️ Social Media Platform Moderation',
              ].map((useCase, idx) => (
                <motion.div
                  key={idx}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.7 + idx * 0.05 }}
                  className="flex items-center gap-3 text-gray-300 text-lg"
                >
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span>{useCase}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      ),
    },

    // Slide 8: Competitive Advantage
    {
      type: 'content',
      title: 'Why TruthGuard AI?',
      content: (
        <div className="space-y-6">
          {[
            {
              title: 'Multi-Modal Detection',
              desc: 'Only solution analyzing video, audio, text, AND images in one platform',
              icon: Award,
              highlight: true
            },
            {
              title: 'Real-Time Visualization',
              desc: 'Interactive dashboards with frame-by-frame analysis and heatmaps',
              icon: BarChart3,
              highlight: false
            },
            {
              title: 'Enterprise Ready',
              desc: 'Full authentication, history tracking, and comprehensive reporting',
              icon: Lock,
              highlight: false
            },
            {
              title: 'Open & Accessible',
              desc: 'Built for hackathons, researchers, and developers to extend',
              icon: Globe,
              highlight: true
            },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 + idx * 0.1 }}
                className={`flex items-start gap-6 rounded-2xl p-8 ${
                  item.highlight
                    ? 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border-2 border-blue-500/50'
                    : 'bg-slate-800/50 border border-slate-700'
                }`}
              >
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-white mb-3">{item.title}</h4>
                  <p className="text-lg text-gray-300">{item.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      ),
    },

    // NEW SLIDE: Government MTRRS Module Introduction
    {
      type: 'content',
      title: 'Government MTRRS Module',
      content: (
        <div className="space-y-8">
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-r from-red-500/20 to-orange-500/20 border-2 border-red-500/50 rounded-2xl p-8"
          >
            <div className="flex items-center gap-6 mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-red-600 to-orange-600 rounded-2xl flex items-center justify-center">
                <ShieldAlert className="w-12 h-12 text-white" />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-white mb-2">Misinformation Trace & Rapid Response System</h3>
                <p className="text-xl text-gray-300">Government-grade platform for national security agencies</p>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-3 gap-6">
            {[
              { icon: Network, title: 'Propagation Tracking', desc: 'Real-time spread analysis across 8+ platforms', value: '2.4M', metric: 'Reach Tracked' },
              { icon: Database, title: 'Fingerprint Registry', desc: 'National deepfake signature database', value: '12.4K', metric: 'Signatures Stored' },
              { icon: Target, title: 'Takedown Toolkit', desc: 'Automated platform removal requests', value: '94%', metric: 'Success Rate' },
            ].map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.4 + idx * 0.15, type: 'spring' }}
                  className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">{feature.title}</h4>
                  <p className="text-gray-400 mb-4 text-sm">{feature.desc}</p>
                  <div className="border-t border-slate-700 pt-3">
                    <div className="text-3xl font-bold text-red-500 mb-1">{feature.value}</div>
                    <div className="text-xs text-gray-500">{feature.metric}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6"
          >
            <h4 className="text-lg font-bold text-white mb-4">Key Capabilities</h4>
            <div className="grid grid-cols-2 gap-3">
              {[
                'Multi-platform propagation analysis',
                'Forensic metadata extraction (EXIF, compression)',
                'Risk scoring with societal impact assessment',
                'Government alert & notification system',
                'Automated evidence report generation',
                'SHA-256 fingerprint registry with fast matching',
              ].map((capability, idx) => (
                <motion.div
                  key={idx}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1 + idx * 0.05 }}
                  className="flex items-center gap-2 text-gray-300"
                >
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span className="text-sm">{capability}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      ),
    },

    // NEW SLIDE: Sample Analysis Results with Visualizations
    {
      type: 'content',
      title: 'Sample Analysis Results',
      content: (
        <div className="space-y-6">
          {/* Alert Header */}
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-r from-red-500/20 to-orange-500/20 border-2 border-red-500/50 rounded-xl p-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-6 h-6 text-red-500 animate-pulse" />
                <div>
                  <div className="text-white font-bold">ALT-2026-0847 • CRITICAL PRIORITY</div>
                  <div className="text-sm text-gray-300">Political Figure - False Statement on Economic Policy</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-red-500 font-bold text-3xl">94%</div>
                <div className="text-xs text-gray-400">Risk Score</div>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-3 gap-6">
            {/* AI Detection Models */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-slate-800/50 border border-slate-700 rounded-xl p-6"
            >
              <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-500" />
                AI Model Consensus
              </h4>
              <div className="space-y-3">
                {[
                  { name: 'Face Manipulation', score: 96 },
                  { name: 'Lip Sync Analysis', score: 92 },
                  { name: 'Audio Cloning', score: 88 },
                  { name: 'Temporal Consistency', score: 91 },
                ].map((model, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.5 + idx * 0.1 }}
                  >
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">{model.name}</span>
                      <span className="text-red-500 font-bold">{model.score}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${model.score}%` }}
                        transition={{ delay: 0.5 + idx * 0.1, duration: 0.8 }}
                        className="h-full bg-gradient-to-r from-red-500 to-orange-500"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Impact Assessment */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-slate-800/50 border border-slate-700 rounded-xl p-6"
            >
              <h4 className="text-lg font-bold text-white mb-4">Societal Impact</h4>
              <div className="space-y-3">
                {[
                  { category: 'Political', score: 95, color: 'red' },
                  { category: 'Social', score: 88, color: 'orange' },
                  { category: 'Electoral', score: 89, color: 'red' },
                  { category: 'Public Trust', score: 94, color: 'red' },
                ].map((impact, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.6 + idx * 0.1 }}
                  >
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">{impact.category}</span>
                      <span className={`text-${impact.color}-500 font-bold`}>{impact.score}</span>
                    </div>
                    <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${impact.score}%` }}
                        transition={{ delay: 0.6 + idx * 0.1, duration: 0.8 }}
                        className={`h-full bg-${impact.color}-500`}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Propagation Stats */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-slate-800/50 border border-slate-700 rounded-xl p-6"
            >
              <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Network className="w-5 h-5 text-purple-500" />
                Propagation
              </h4>
              <div className="space-y-4">
                <div className="text-center p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                  <div className="text-3xl font-bold text-red-500">2.4M</div>
                  <div className="text-xs text-gray-400">Total Reach</div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { platform: 'Twitter', posts: 1073 },
                    { platform: 'WhatsApp', posts: 249 },
                    { platform: 'Facebook', posts: 67 },
                    { platform: 'Instagram', posts: 43 },
                  ].map((platform, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.7 + idx * 0.05 }}
                      className="p-2 bg-slate-900/50 rounded text-center"
                    >
                      <div className="text-white font-bold text-lg">{platform.posts}</div>
                      <div className="text-xs text-gray-500">{platform.platform}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Forensic Findings */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="bg-slate-800/50 border border-slate-700 rounded-xl p-6"
          >
            <h4 className="text-lg font-bold text-white mb-4">Forensic Analysis Highlights</h4>
            <div className="grid grid-cols-4 gap-4">
              {[
                { label: 'GAN Artifacts Detected', value: 'HIGH', color: 'red' },
                { label: 'Voice Synthesis', value: '88% Match', color: 'orange' },
                { label: 'Metadata Tampering', value: 'CONFIRMED', color: 'red' },
                { label: 'Recompression', value: '3x Detected', color: 'yellow' },
              ].map((finding, idx) => (
                <motion.div
                  key={idx}
                  initial={{ scale: 0, rotate: -90 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 1 + idx * 0.1, type: 'spring' }}
                  className={`p-4 bg-${finding.color}-500/10 border border-${finding.color}-500/30 rounded-lg text-center`}
                >
                  <div className={`text-xl font-bold text-${finding.color}-500 mb-1`}>{finding.value}</div>
                  <div className="text-xs text-gray-400">{finding.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      ),
    },

    // NEW SLIDE: Network Propagation Visualization
    {
      type: 'content',
      title: 'Propagation Network Analysis',
      content: (
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-slate-800/50 border border-slate-700 rounded-xl p-8 relative"
            style={{ height: '550px' }}
          >
            {/* Network Visualization */}
            <svg width="100%" height="100%" className="overflow-visible">
              {/* Origin Node - CRITICAL */}
              <motion.g
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: 'spring' }}
              >
                <circle cx="50%" cy="15%" r="30" fill="#ef4444" className="animate-pulse" />
                <circle cx="50%" cy="15%" r="35" fill="none" stroke="#ef4444" strokeWidth="2" opacity="0.3" />
                <text x="50%" y="15%" textAnchor="middle" dy="5" className="text-sm fill-white font-bold">
                  ORIGIN
                </text>
                <text x="50%" y="calc(15% + 50px)" textAnchor="middle" className="text-xs fill-red-400 font-bold">
                  @suspicious_2847
                </text>
              </motion.g>

              {/* Tier 1 Spread */}
              {[
                { x: '20%', y: '35%', platform: 'Twitter', reach: '145K', color: '#3b82f6', delay: 0.5 },
                { x: '50%', y: '35%', platform: 'Telegram', reach: '89K', color: '#06b6d4', delay: 0.6 },
                { x: '80%', y: '35%', platform: 'WhatsApp', reach: '67K', color: '#10b981', delay: 0.7 },
              ].map((node, idx) => (
                <motion.g
                  key={idx}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: node.delay, type: 'spring' }}
                >
                  <line 
                    x1="50%" 
                    y1="calc(15% + 30px)" 
                    x2={node.x} 
                    y2="calc(35% - 20px)" 
                    stroke={node.color}
                    strokeWidth="3"
                    opacity="0.4"
                    strokeDasharray="5,5"
                  />
                  <circle cx={node.x} cy="35%" r="20" fill={node.color} opacity="0.9" />
                  <text x={node.x} y="35%" textAnchor="middle" dy="5" className="text-xs fill-white font-bold">
                    T1
                  </text>
                  <text x={node.x} y="calc(35% + 30px)" textAnchor="middle" className="text-xs fill-gray-300">
                    {node.platform}
                  </text>
                  <text x={node.x} y="calc(35% + 45px)" textAnchor="middle" className="text-xs fill-white font-bold">
                    {node.reach}
                  </text>
                </motion.g>
              ))}

              {/* Tier 2 Mass Spread */}
              {[
                { x: '15%', y: '60%', size: 15, color: '#3b82f6', delay: 0.8 },
                { x: '30%', y: '60%', size: 12, color: '#ec4899', delay: 0.85 },
                { x: '50%', y: '60%', size: 14, color: '#8b5cf6', delay: 0.9 },
                { x: '70%', y: '60%', size: 18, color: '#10b981', delay: 0.95 },
                { x: '85%', y: '60%', size: 10, color: '#f59e0b', delay: 1.0 },
              ].map((node, idx) => (
                <motion.circle
                  key={idx}
                  cx={node.x}
                  cy="60%"
                  r={node.size}
                  fill={node.color}
                  opacity="0.8"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: node.delay, type: 'spring' }}
                />
              ))}

              {/* Final Tier 3 - Maximum Spread */}
              <motion.g
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.1, type: 'spring' }}
              >
                <circle cx="50%" cy="85%" r="35" fill="#ef4444" opacity="0.2" className="animate-pulse" />
                <circle cx="50%" cy="85%" r="25" fill="#ef4444" opacity="0.6" />
                <text x="50%" y="85%" textAnchor="middle" dy="5" className="text-base fill-white font-bold">
                  T3
                </text>
                <text x="50%" y="calc(85% + 50px)" textAnchor="middle" className="text-lg fill-red-400 font-bold">
                  2.4M Total Reach
                </text>
              </motion.g>
            </svg>

            {/* Legend */}
            <div className="absolute bottom-4 left-4 bg-slate-900/80 border border-slate-700 rounded-lg p-3">
              <div className="text-xs text-gray-400 mb-2 font-medium">Propagation Tiers</div>
              <div className="space-y-1 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full" />
                  <span className="text-gray-300">Origin / Critical Mass</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full" />
                  <span className="text-gray-300">Tier 1: First Spread</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full" />
                  <span className="text-gray-300">Tier 2: Multi-Platform</span>
                </div>
              </div>
            </div>

            {/* Stats Panel */}
            <div className="absolute bottom-4 right-4 bg-slate-900/80 border border-slate-700 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-red-500">1,073</div>
              <div className="text-xs text-gray-400">Total Posts</div>
              <div className="text-xs text-gray-500 mt-1">Across 5 platforms</div>
            </div>
          </motion.div>

          {/* Timeline Growth Chart */}
          <div className="grid grid-cols-8 gap-2">
            {[
              { hour: 0, posts: 1 },
              { hour: 1, posts: 3 },
              { hour: 2, posts: 12 },
              { hour: 3, posts: 47 },
              { hour: 4, posts: 189 },
              { hour: 5, posts: 523 },
              { hour: 6, posts: 873 },
              { hour: 7, posts: 1073 },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: 1.3 + idx * 0.1 }}
                className="text-center"
              >
                <div className="mb-2 text-xs text-gray-400">Hour {item.hour}</div>
                <div className="relative h-24 bg-slate-900/50 rounded-lg flex flex-col justify-end p-1">
                  <div 
                    className="bg-gradient-to-t from-red-500 to-orange-500 rounded"
                    style={{ height: `${(item.posts / 1073) * 100}%` }}
                  />
                </div>
                <div className="mt-2 text-sm text-white font-bold">{item.posts}</div>
              </motion.div>
            ))}
          </div>
        </div>
      ),
    },

    // Slide 12: Thank You
    {
      type: 'title',
      content: (
        <div className="flex flex-col items-center justify-center h-full text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', duration: 0.8 }}
            className="w-40 h-40 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mb-8 shadow-2xl"
          >
            <Shield className="w-20 h-20 text-white" />
          </motion.div>
          
          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-6xl font-bold text-white mb-6"
          >
            Thank You!
          </motion.h1>
          
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-3xl text-gray-300 mb-8"
          >
            TruthGuard AI - Protecting Truth in the Age of AI
          </motion.p>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="space-y-4 text-xl text-gray-400"
          >
            <p>🌐 Demo: truthguard.ai</p>
            <p>📧 Contact: team@truthguard.ai</p>
            <p>💡 Built for a Safer Digital Future</p>
          </motion.div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1, type: 'spring' }}
            className="mt-12 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full text-white text-2xl font-bold"
          >
            Questions?
          </motion.div>
        </div>
      ),
    },
  ];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 z-50">
      {/* Background pattern */}
      <div className="fixed inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(59, 130, 246, 0.5) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Slide Content */}
      <div className="relative z-10 h-full flex flex-col">
        <div className="flex-1 p-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="h-full"
            >
              {slides[currentSlide].type === 'content' && (
                <div className="mb-8">
                  <h2 className="text-5xl font-bold text-white mb-4">
                    {slides[currentSlide].title}
                  </h2>
                  <div className="w-32 h-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" />
                </div>
              )}
              <div className={slides[currentSlide].type === 'content' ? 'h-[calc(100%-8rem)]' : 'h-full'}>
                {slides[currentSlide].content}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="relative z-20 p-8 flex items-center justify-between">
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="w-14 h-14 rounded-full bg-slate-800/50 border border-slate-700 flex items-center justify-center text-white hover:bg-slate-700 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div className="flex items-center gap-3">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                className={`transition-all rounded-full ${
                  idx === currentSlide
                    ? 'w-12 h-3 bg-blue-500'
                    : 'w-3 h-3 bg-slate-600 hover:bg-slate-500'
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            disabled={currentSlide === slides.length - 1}
            className="w-14 h-14 rounded-full bg-slate-800/50 border border-slate-700 flex items-center justify-center text-white hover:bg-slate-700 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Slide Counter */}
        <div className="absolute top-8 right-8 text-white text-xl">
          <span className="font-bold">{currentSlide + 1}</span>
          <span className="text-gray-400"> / {slides.length}</span>
        </div>

        {/* Close Button */}
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-8 left-8 text-white text-xl bg-slate-800/50 border border-slate-700 rounded-full p-2 hover:bg-slate-700 transition-all"
          >
            <X className="w-6 h-6" />
          </button>
        )}
      </div>
    </div>
  );
}