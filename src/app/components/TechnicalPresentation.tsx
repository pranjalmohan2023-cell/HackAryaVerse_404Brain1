import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Shield, AlertTriangle, Globe, Eye, Video, Music, FileText, Image as ImageIcon, Lock, Activity, Map, Zap, CheckCircle, TrendingUp, Database, Network, Server, Code, Brain, Target, Award } from 'lucide-react';

export function TechnicalPresentation() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    if (currentSlide < 14) setCurrentSlide(currentSlide + 1);
  };

  const prevSlide = () => {
    if (currentSlide > 0) setCurrentSlide(currentSlide - 1);
  };

  const slides = [
    // Slide 1 - Title
    <TitleSlide key={0} />,
    // Slide 2 - Problem Statement
    <ProblemSlide key={1} />,
    // Slide 3 - Industry Relevance
    <IndustrySlide key={2} />,
    // Slide 4 - Our Solution
    <SolutionSlide key={3} />,
    // Slide 5 - System Workflow
    <WorkflowSlide key={4} />,
    // Slide 6 - Multi-Spectrum Detection
    <MultiSpectrumSlide key={5} />,
    // Slide 7 - AI Probability Calculation
    <ProbabilitySlide key={6} />,
    // Slide 8 - Metadata Forensics
    <MetadataSlide key={7} />,
    // Slide 9 - Threat Level Calculation
    <ThreatCalculationSlide key={8} />,
    // Slide 10 - Government Monitoring
    <GovernmentMonitoringSlide key={9} />,
    // Slide 11 - National Heatmap
    <HeatmapSlide key={10} />,
    // Slide 12 - Technical Architecture
    <ArchitectureSlide key={11} />,
    // Slide 13 - Impact
    <ImpactSlide key={12} />,
    // Slide 14 - Demo Workflow
    <DemoWorkflowSlide key={13} />,
    // Slide 15 - Conclusion
    <ConclusionSlide key={14} />
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950/20 to-purple-950/20 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Presentation Container */}
        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-700 rounded-2xl shadow-2xl overflow-hidden">
          {/* Slide Content */}
          <div className="aspect-[16/9] relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 p-16"
              >
                {slides[currentSlide]}
              </motion.div>
            </AnimatePresence>

            {/* Neural Network Background */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
              <svg className="w-full h-full">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <circle cx="20" cy="20" r="1" fill="currentColor" className="text-blue-500" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>
          </div>

          {/* Navigation */}
          <div className="bg-slate-800/80 backdrop-blur-xl border-t border-slate-700 px-8 py-4 flex items-center justify-between">
            <button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 disabled:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
              Previous
            </button>

            <div className="flex items-center gap-2">
              {Array.from({ length: 15 }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === currentSlide ? 'bg-blue-500 w-8' : 'bg-slate-600 hover:bg-slate-500'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              disabled={currentSlide === 14}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-all"
            >
              Next
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Slide Counter */}
          <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-xl border border-slate-700 px-4 py-2 rounded-lg">
            <span className="text-white font-mono text-sm">
              {currentSlide + 1} / 15
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Slide 1 - Title
function TitleSlide() {
  return (
    <div className="h-full flex flex-col items-center justify-center relative">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/20 rounded-full blur-[120px]" />
      
      {/* Logo */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring' }}
        className="relative mb-8"
      >
        <div className="w-32 h-32 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl flex items-center justify-center relative">
          <Shield className="w-16 h-16 text-white" />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400/50 to-purple-400/50 rounded-3xl animate-pulse" />
        </div>
      </motion.div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 mb-4 text-center"
      >
        TruthGuard AI
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="text-3xl text-white font-light mb-2 text-center"
      >
        Multi-Spectrum Deepfake Detection Platform
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="flex items-center gap-6 text-gray-400 text-lg mt-8"
      >
        <div className="flex items-center gap-2">
          <ImageIcon className="w-5 h-5" />
          <span>Image</span>
        </div>
        <div className="w-1 h-1 bg-gray-600 rounded-full" />
        <div className="flex items-center gap-2">
          <Video className="w-5 h-5" />
          <span>Video</span>
        </div>
        <div className="w-1 h-1 bg-gray-600 rounded-full" />
        <div className="flex items-center gap-2">
          <Music className="w-5 h-5" />
          <span>Audio</span>
        </div>
        <div className="w-1 h-1 bg-gray-600 rounded-full" />
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5" />
          <span>Text</span>
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-gray-500 mt-12 text-sm"
      >
        AI-Powered Detection of Synthetic Media
      </motion.p>
    </div>
  );
}

// Slide 2 - Problem Statement
function ProblemSlide() {
  const stats = [
    { value: '96%', label: 'Increase in Deepfakes (2023-2026)', color: 'red' },
    { value: '$12.5B', label: 'Annual Fraud Losses', color: 'orange' },
    { value: '73%', label: 'Detection Difficulty', color: 'yellow' },
  ];

  const examples = [
    { icon: Video, title: 'Fake Political Speech', desc: 'AI-generated videos of public figures' },
    { icon: ImageIcon, title: 'Celebrity Deepfakes', desc: 'Synthetic celebrity images for scams' },
    { icon: Music, title: 'Voice Cloning Scams', desc: 'Audio synthesis for fraud' },
    { icon: FileText, title: 'AI Misinformation', desc: 'Automated fake news generation' },
  ];

  return (
    <div className="h-full flex flex-col">
      <h2 className="text-5xl font-bold text-white mb-4">The Deepfake Crisis</h2>
      <p className="text-xl text-gray-400 mb-8">AI-generated content poses unprecedented threats to information integrity</p>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.2 }}
            className={`bg-gradient-to-br from-${stat.color}-500/10 to-${stat.color}-600/10 border border-${stat.color}-500/30 rounded-2xl p-6`}
          >
            <div className={`text-4xl font-bold text-${stat.color}-500 mb-2`}>{stat.value}</div>
            <div className="text-sm text-gray-400">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Examples */}
      <div className="grid grid-cols-2 gap-4 flex-1">
        {examples.map((example, idx) => {
          const Icon = example.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + idx * 0.1 }}
              className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 backdrop-blur-xl"
            >
              <Icon className="w-10 h-10 text-blue-500 mb-3" />
              <h3 className="text-lg font-bold text-white mb-2">{example.title}</h3>
              <p className="text-sm text-gray-400">{example.desc}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// Slide 3 - Industry Relevance
function IndustrySlide() {
  const sectors = [
    { icon: Shield, name: 'Government Security', impact: 95, color: 'blue' },
    { icon: Eye, name: 'Cybercrime Investigation', impact: 88, color: 'purple' },
    { icon: Globe, name: 'Media Verification', impact: 92, color: 'green' },
    { icon: Lock, name: 'Election Protection', impact: 98, color: 'red' },
    { icon: Activity, name: 'Social Media Moderation', impact: 85, color: 'yellow' },
  ];

  return (
    <div className="h-full flex flex-col">
      <h2 className="text-5xl font-bold text-white mb-4">Industry Impact</h2>
      <p className="text-xl text-gray-400 mb-12">Critical sectors affected by synthetic media threats</p>

      {/* Central Diagram */}
      <div className="flex-1 flex items-center justify-center relative">
        {/* Center Circle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center z-10">
          <div className="text-center">
            <Shield className="w-16 h-16 text-white mx-auto mb-2" />
            <div className="text-white font-bold text-lg">TruthGuard AI</div>
          </div>
        </div>

        {/* Sectors */}
        {sectors.map((sector, idx) => {
          const Icon = sector.icon;
          const angle = (idx * 72 - 90) * (Math.PI / 180);
          const radius = 280;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.2 }}
              className="absolute"
              style={{
                left: '50%',
                top: '50%',
                transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`
              }}
            >
              <div className={`bg-gradient-to-br from-${sector.color}-500/20 to-${sector.color}-600/20 border border-${sector.color}-500/50 rounded-2xl p-6 backdrop-blur-xl w-56`}>
                <Icon className={`w-8 h-8 text-${sector.color}-500 mb-3`} />
                <div className="text-white font-bold mb-2">{sector.name}</div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${sector.impact}%` }}
                      transition={{ delay: idx * 0.2 + 0.3, duration: 1 }}
                      className={`h-full bg-${sector.color}-500`}
                    />
                  </div>
                  <span className={`text-${sector.color}-500 font-bold text-sm`}>{sector.impact}%</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// Slide 4 - Our Solution
function SolutionSlide() {
  const capabilities = [
    { icon: ImageIcon, title: 'Image Detection', desc: 'GAN artifact & frequency analysis' },
    { icon: Video, title: 'Video Detection', desc: 'Temporal consistency & lip-sync' },
    { icon: Music, title: 'Audio Detection', desc: 'Spectrogram & voice synthesis' },
    { icon: FileText, title: 'Text Detection', desc: 'Language model perplexity' },
    { icon: Database, title: 'Metadata Analysis', desc: 'EXIF & forensic validation' },
    { icon: Shield, title: 'Threat Monitoring', desc: 'Government-grade MTRRS' },
  ];

  return (
    <div className="h-full flex flex-col">
      <h2 className="text-5xl font-bold text-white mb-4">TruthGuard AI Solution</h2>
      <p className="text-xl text-gray-400 mb-8">Multi-signal forensic analysis for AI-generated media detection</p>

      {/* System Overview */}
      <div className="flex-1 grid grid-cols-3 gap-6">
        {capabilities.map((cap, idx) => {
          const Icon = cap.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 backdrop-blur-xl hover:border-blue-500/50 transition-all group"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{cap.title}</h3>
              <p className="text-sm text-gray-400">{cap.desc}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom Tagline */}
      <div className="mt-8 text-center">
        <div className="inline-block bg-blue-500/10 border border-blue-500/30 rounded-full px-6 py-3">
          <span className="text-blue-400 font-medium">Multi-Layer Forensic Detection • Real-Time Analysis • Government-Grade Security</span>
        </div>
      </div>
    </div>
  );
}

// Slide 5 - System Workflow
function WorkflowSlide() {
  const steps = [
    { title: 'User Upload Media', icon: Activity, color: 'blue' },
    { title: 'Media Preprocessing', icon: Zap, color: 'purple' },
    { title: 'Feature Extraction', icon: Target, color: 'cyan' },
    { title: 'AI Detection Models', icon: Brain, color: 'pink' },
    { title: 'Forensic Signal Analysis', icon: Eye, color: 'green' },
    { title: 'Probability Calculation', icon: TrendingUp, color: 'yellow' },
    { title: 'Threat Assessment', icon: AlertTriangle, color: 'orange' },
    { title: 'Government Monitoring', icon: Shield, color: 'red' },
  ];

  return (
    <div className="h-full flex flex-col">
      <h2 className="text-5xl font-bold text-white mb-4">System Workflow</h2>
      <p className="text-xl text-gray-400 mb-12">End-to-end processing pipeline</p>

      {/* Flowchart */}
      <div className="flex-1 flex items-center justify-center">
        <div className="grid grid-cols-2 gap-x-16 gap-y-8 max-w-4xl">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isLeft = idx % 2 === 0;
            
            return (
              <div key={idx} className="relative">
                <motion.div
                  initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.15 }}
                  className={`bg-slate-800/50 border border-slate-700 rounded-xl p-6 backdrop-blur-xl hover:border-${step.color}-500/50 transition-all`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 bg-gradient-to-br from-${step.color}-500 to-${step.color}-600 rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="text-gray-500 text-xs mb-1">STEP {idx + 1}</div>
                      <div className="text-white font-semibold">{step.title}</div>
                    </div>
                  </div>
                </motion.div>

                {/* Arrow */}
                {idx < steps.length - 1 && (
                  <div className="absolute left-1/2 -bottom-4 -translate-x-1/2">
                    <div className="w-0.5 h-8 bg-gradient-to-b from-blue-500 to-purple-500" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Slide 6 - Multi-Spectrum Detection
function MultiSpectrumSlide() {
  const detectionTypes = [
    {
      type: 'IMAGE',
      icon: ImageIcon,
      color: 'blue',
      methods: [
        'GAN artifact detection',
        'Frequency spectrum analysis',
        'EXIF metadata validation',
        'Pixel-level forensics'
      ]
    },
    {
      type: 'VIDEO',
      icon: Video,
      color: 'purple',
      methods: [
        'Temporal frame analysis',
        'Lip-sync consistency',
        'Motion anomalies',
        'Compression artifacts'
      ]
    },
    {
      type: 'AUDIO',
      icon: Music,
      color: 'green',
      methods: [
        'Spectrogram anomaly detection',
        'Voice synthesis artifacts',
        'Frequency pattern analysis',
        'Neural vocoder traces'
      ]
    },
    {
      type: 'TEXT',
      icon: FileText,
      color: 'yellow',
      methods: [
        'Language model perplexity',
        'Stylistic fingerprinting',
        'Semantic coherence',
        'Pattern recognition'
      ]
    }
  ];

  return (
    <div className="h-full flex flex-col">
      <h2 className="text-5xl font-bold text-white mb-4">Multi-Spectrum Detection</h2>
      <p className="text-xl text-gray-400 mb-12">Specialized analysis methods for each media type</p>

      <div className="grid grid-cols-4 gap-6 flex-1">
        {detectionTypes.map((det, idx) => {
          const Icon = det.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.15 }}
              className={`bg-gradient-to-b from-${det.color}-500/10 to-slate-800/50 border border-${det.color}-500/30 rounded-2xl p-6 backdrop-blur-xl`}
            >
              <div className={`w-16 h-16 bg-${det.color}-500 rounded-xl flex items-center justify-center mb-6 mx-auto`}>
                <Icon className="w-8 h-8 text-white" />
              </div>
              
              <h3 className={`text-2xl font-bold text-${det.color}-500 mb-6 text-center`}>{det.type}</h3>
              
              <div className="space-y-3">
                {det.methods.map((method, midx) => (
                  <motion.div
                    key={midx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.15 + midx * 0.1 }}
                    className="flex items-start gap-2"
                  >
                    <CheckCircle className={`w-4 h-4 text-${det.color}-500 mt-0.5 flex-shrink-0`} />
                    <span className="text-sm text-gray-300">{method}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// Slide 7 - AI Probability Calculation
function ProbabilitySlide() {
  return (
    <div className="h-full flex flex-col">
      <h2 className="text-5xl font-bold text-white mb-4">AI Probability Calculation</h2>
      <p className="text-xl text-gray-400 mb-12">Weighted multi-signal scoring system</p>

      <div className="flex-1 flex items-center justify-center gap-12">
        {/* Formula */}
        <div className="flex-1">
          <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 backdrop-blur-xl">
            <h3 className="text-2xl font-bold text-white mb-6">Formula</h3>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-4">
                <div className="text-blue-500 font-mono text-lg">0.6 ×</div>
                <div className="flex-1 bg-slate-900 rounded-lg p-4 border border-blue-500/30">
                  <div className="text-white font-medium">Deep Learning Model Score</div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="text-purple-500 font-mono text-lg">0.2 ×</div>
                <div className="flex-1 bg-slate-900 rounded-lg p-4 border border-purple-500/30">
                  <div className="text-white font-medium">Metadata Forensics Score</div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="text-green-500 font-mono text-lg">0.2 ×</div>
                <div className="flex-1 bg-slate-900 rounded-lg p-4 border border-green-500/30">
                  <div className="text-white font-medium">Frequency Spectrum Score</div>
                </div>
              </div>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent mb-8" />

            <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-xl p-6">
              <div className="text-gray-400 text-sm mb-2">Final AI Probability</div>
              <div className="text-5xl font-bold text-white">= 0.75 (75%)</div>
            </div>
          </div>
        </div>

        {/* Example Calculation */}
        <div className="flex-1">
          <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 backdrop-blur-xl">
            <h3 className="text-2xl font-bold text-white mb-6">Example Calculation</h3>
            
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400">CNN Detection Score</span>
                  <span className="text-blue-500 font-bold text-xl">0.80</span>
                </div>
                <div className="h-3 bg-slate-900 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '80%' }}
                    transition={{ delay: 0.4, duration: 1 }}
                    className="h-full bg-blue-500"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400">Metadata Score</span>
                  <span className="text-purple-500 font-bold text-xl">0.65</span>
                </div>
                <div className="h-3 bg-slate-900 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '65%' }}
                    transition={{ delay: 0.6, duration: 1 }}
                    className="h-full bg-purple-500"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400">Frequency Score</span>
                  <span className="text-green-500 font-bold text-xl">0.70</span>
                </div>
                <div className="h-3 bg-slate-900 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '70%' }}
                    transition={{ delay: 0.8, duration: 1 }}
                    className="h-full bg-green-500"
                  />
                </div>
              </motion.div>

              <div className="h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent my-6" />

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 }}
                className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-2 border-blue-500/50 rounded-xl p-6 text-center"
              >
                <div className="text-gray-400 text-sm mb-2">Weighted Result</div>
                <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  75%
                </div>
                <div className="text-blue-400 mt-2">HIGH RISK</div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Slide 8 - Metadata Forensics
function MetadataSlide() {
  const metadata = [
    { label: 'Camera Model', value: 'iPhone 15 Pro', status: 'valid', icon: CheckCircle },
    { label: 'Timestamp', value: '2026-03-15 14:23:41', status: 'valid', icon: CheckCircle },
    { label: 'Software Used', value: 'Photoshop 2024', status: 'warning', icon: AlertTriangle },
    { label: 'GPS Coordinates', value: 'Not Found', status: 'error', icon: AlertTriangle },
  ];

  return (
    <div className="h-full flex flex-col">
      <h2 className="text-5xl font-bold text-white mb-4">Metadata Forensics</h2>
      <p className="text-xl text-gray-400 mb-12">EXIF analysis and anomaly detection</p>

      <div className="flex-1 grid grid-cols-2 gap-8">
        {/* Metadata Extraction */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 backdrop-blur-xl">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <Database className="w-7 h-7 text-blue-500" />
            Extracted Metadata
          </h3>

          <div className="space-y-4">
            {metadata.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.15 }}
                  className={`bg-slate-900/50 border rounded-lg p-4 ${
                    item.status === 'valid' ? 'border-green-500/30' :
                    item.status === 'warning' ? 'border-yellow-500/30' :
                    'border-red-500/30'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="text-gray-400 text-sm mb-1">{item.label}</div>
                      <div className="text-white font-mono">{item.value}</div>
                    </div>
                    <Icon className={`w-6 h-6 ${
                      item.status === 'valid' ? 'text-green-500' :
                      item.status === 'warning' ? 'text-yellow-500' :
                      'text-red-500'
                    }`} />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Anomaly Detection */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 backdrop-blur-xl">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <AlertTriangle className="w-7 h-7 text-orange-500" />
            Detected Anomalies
          </h3>

          <div className="space-y-4 mb-8">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-red-500/10 border border-red-500/30 rounded-lg p-4"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                <div className="text-red-400 font-semibold">Missing Camera Metadata</div>
              </div>
              <div className="text-sm text-gray-400 ml-5">Critical GPS data not found</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
                <div className="text-yellow-400 font-semibold">Editing Software Detected</div>
              </div>
              <div className="text-sm text-gray-400 ml-5">Image processed with Photoshop</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                <div className="text-orange-400 font-semibold">Timestamp Mismatch</div>
              </div>
              <div className="text-sm text-gray-400 ml-5">File creation vs. EXIF inconsistency</div>
            </motion.div>
          </div>

          {/* Authenticity Score */}
          <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 border-2 border-orange-500/50 rounded-xl p-6">
            <div className="text-center">
              <div className="text-gray-400 text-sm mb-2">Metadata Authenticity Score</div>
              <div className="text-6xl font-bold text-orange-500 mb-2">45%</div>
              <div className="text-orange-400 text-sm">MEDIUM CONFIDENCE</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Slide 9 - Threat Level Calculation
function ThreatCalculationSlide() {
  return (
    <div className="h-full flex flex-col">
      <h2 className="text-5xl font-bold text-white mb-4">Threat Level Calculation</h2>
      <p className="text-xl text-gray-400 mb-12">Government module risk assessment formula</p>

      <div className="flex-1 flex items-center justify-center gap-12">
        {/* Formula */}
        <div className="flex-1">
          <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 backdrop-blur-xl">
            <h3 className="text-2xl font-bold text-white mb-8">Threat Score Formula</h3>

            <div className="space-y-6 mb-8">
              <div className="text-center py-6 bg-slate-900 rounded-xl border border-blue-500/30">
                <div className="text-3xl font-mono text-white mb-2">Threat Score =</div>
                <div className="text-xl text-gray-400">AI Probability × Virality × Sensitivity</div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/30 rounded-xl p-4 text-center"
                >
                  <div className="text-sm text-gray-400 mb-2">AI Probability</div>
                  <div className="text-3xl font-bold text-blue-500">0.82</div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 border border-purple-500/30 rounded-xl p-4 text-center"
                >
                  <div className="text-sm text-gray-400 mb-2">Virality Score</div>
                  <div className="text-3xl font-bold text-purple-500">0.75</div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="bg-gradient-to-br from-red-500/20 to-red-600/20 border border-red-500/30 rounded-xl p-4 text-center"
                >
                  <div className="text-sm text-gray-400 mb-2">Sensitivity</div>
                  <div className="text-3xl font-bold text-red-500">0.90</div>
                </motion.div>
              </div>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent mb-8" />

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
              className="bg-gradient-to-br from-red-500/20 to-orange-500/20 border-2 border-red-500/50 rounded-xl p-8 text-center"
            >
              <div className="text-gray-400 mb-3">Final Threat Score</div>
              <div className="text-7xl font-bold text-red-500 mb-4">0.55</div>
              <div className="inline-block bg-red-500 text-white px-6 py-2 rounded-full font-bold text-xl">
                HIGH THREAT
              </div>
            </motion.div>
          </div>
        </div>

        {/* Gauge Visualization */}
        <div className="flex-1">
          <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 backdrop-blur-xl">
            <h3 className="text-2xl font-bold text-white mb-8">Threat Level Gauge</h3>

            <div className="relative w-full aspect-square max-w-md mx-auto">
              {/* Gauge Background */}
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="50%"
                  cy="50%"
                  r="45%"
                  fill="none"
                  stroke="rgb(51, 65, 85)"
                  strokeWidth="20"
                />
                {/* Low (Green) */}
                <motion.circle
                  cx="50%"
                  cy="50%"
                  r="45%"
                  fill="none"
                  stroke="rgb(34, 197, 94)"
                  strokeWidth="20"
                  strokeDasharray="94 282"
                  strokeDashoffset="0"
                  initial={{ strokeDashoffset: 282 }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{ duration: 1, delay: 0.2 }}
                />
                {/* Medium (Yellow) */}
                <motion.circle
                  cx="50%"
                  cy="50%"
                  r="45%"
                  fill="none"
                  stroke="rgb(234, 179, 8)"
                  strokeWidth="20"
                  strokeDasharray="94 282"
                  strokeDashoffset="-94"
                  initial={{ strokeDashoffset: 282 }}
                  animate={{ strokeDashoffset: -94 }}
                  transition={{ duration: 1, delay: 0.4 }}
                />
                {/* High (Red) */}
                <motion.circle
                  cx="50%"
                  cy="50%"
                  r="45%"
                  fill="none"
                  stroke="rgb(239, 68, 68)"
                  strokeWidth="20"
                  strokeDasharray="94 282"
                  strokeDashoffset="-188"
                  initial={{ strokeDashoffset: 282 }}
                  animate={{ strokeDashoffset: -188 }}
                  transition={{ duration: 1, delay: 0.6 }}
                />
                {/* Needle */}
                <motion.line
                  x1="50%"
                  y1="50%"
                  x2="50%"
                  y2="10%"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ rotate: -90 }}
                  animate={{ rotate: 108 }}
                  transition={{ duration: 2, delay: 0.8, type: 'spring' }}
                  style={{ transformOrigin: '50% 50%' }}
                />
              </svg>

              {/* Center Text */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl font-bold text-white mb-2">55%</div>
                  <div className="text-red-500 font-bold text-xl">HIGH</div>
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              <div className="text-center">
                <div className="w-4 h-4 bg-green-500 rounded-full mx-auto mb-2" />
                <div className="text-xs text-gray-400">LOW</div>
                <div className="text-sm text-white">0-33%</div>
              </div>
              <div className="text-center">
                <div className="w-4 h-4 bg-yellow-500 rounded-full mx-auto mb-2" />
                <div className="text-xs text-gray-400">MEDIUM</div>
                <div className="text-sm text-white">34-66%</div>
              </div>
              <div className="text-center">
                <div className="w-4 h-4 bg-red-500 rounded-full mx-auto mb-2" />
                <div className="text-xs text-gray-400">HIGH</div>
                <div className="text-sm text-white">67-100%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Slide 10 - Government Monitoring
function GovernmentMonitoringSlide() {
  const features = [
    { icon: Activity, title: 'Real-Time Detection Feed', desc: 'Live deepfake monitoring across platforms', color: 'blue' },
    { icon: TrendingUp, title: 'Threat Prioritization', desc: 'Risk-based alert ranking system', color: 'purple' },
    { icon: Database, title: 'Incident Tracking', desc: 'Complete misinformation lifecycle tracking', color: 'green' },
    { icon: AlertTriangle, title: 'Automated Alerts', desc: 'Instant notifications for high-risk content', color: 'red' },
  ];

  return (
    <div className="h-full flex flex-col">
      <h2 className="text-5xl font-bold text-white mb-4">Government Monitoring System</h2>
      <p className="text-xl text-gray-400 mb-8">MTRRS - Misinformation Trace & Rapid Response</p>

      {/* Features Grid */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        {features.map((feature, idx) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.15 }}
              className={`bg-gradient-to-br from-${feature.color}-500/10 to-slate-800/50 border border-${feature.color}-500/30 rounded-xl p-6 backdrop-blur-xl`}
            >
              <Icon className={`w-12 h-12 text-${feature.color}-500 mb-4`} />
              <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-400">{feature.desc}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Dashboard Preview */}
      <div className="flex-1 bg-slate-800/50 border border-slate-700 rounded-2xl p-6 backdrop-blur-xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-white">Operations Dashboard</h3>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm text-gray-400">Live</span>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {[
            { label: 'Active Threats', value: '847', trend: '+12%', color: 'red' },
            { label: 'Monitored Platforms', value: '8', trend: '+2', color: 'blue' },
            { label: 'Takedowns Today', value: '234', trend: '+45%', color: 'green' },
            { label: 'Response Time', value: '4.2min', trend: '-8%', color: 'purple' },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + idx * 0.1 }}
              className="bg-slate-900/50 border border-slate-700 rounded-lg p-4"
            >
              <div className="text-xs text-gray-400 mb-2">{stat.label}</div>
              <div className={`text-3xl font-bold text-${stat.color}-500 mb-1`}>{stat.value}</div>
              <div className={`text-xs ${stat.trend.startsWith('+') && stat.color !== 'green' ? 'text-red-400' : 'text-green-400'}`}>
                {stat.trend}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Slide 11 - National Heatmap
function HeatmapSlide() {
  return (
    <div className="h-full flex flex-col">
      <h2 className="text-5xl font-bold text-white mb-4">National Misinformation Heatmap</h2>
      <p className="text-xl text-gray-400 mb-8">Real-time threat distribution across regions</p>

      <div className="flex-1 grid grid-cols-3 gap-6">
        {/* Map */}
        <div className="col-span-2 bg-slate-800/50 border border-slate-700 rounded-2xl p-8 backdrop-blur-xl">
          <div className="h-full flex items-center justify-center relative">
            {/* Simplified India Map Representation */}
            <div className="relative w-full h-full">
              {/* Map SVG placeholder - showing regions with colors */}
              <svg viewBox="0 0 400 500" className="w-full h-full">
                {/* North - High Risk */}
                <motion.path
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  d="M 150 50 L 250 50 L 280 100 L 220 120 L 150 100 Z"
                  fill="rgba(239, 68, 68, 0.6)"
                  stroke="rgb(239, 68, 68)"
                  strokeWidth="2"
                />
                {/* Central - Medium Risk */}
                <motion.path
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  d="M 120 150 L 280 150 L 280 280 L 120 280 Z"
                  fill="rgba(234, 179, 8, 0.6)"
                  stroke="rgb(234, 179, 8)"
                  strokeWidth="2"
                />
                {/* South - Low Risk */}
                <motion.path
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  d="M 140 300 L 260 300 L 240 450 L 160 450 Z"
                  fill="rgba(34, 197, 94, 0.6)"
                  stroke="rgb(34, 197, 94)"
                  strokeWidth="2"
                />
                
                {/* Incident Markers */}
                {[
                  { x: 200, y: 80, severity: 'critical' },
                  { x: 180, y: 200, severity: 'high' },
                  { x: 220, y: 220, severity: 'medium' },
                  { x: 200, y: 350, severity: 'low' },
                ].map((incident, idx) => (
                  <motion.g
                    key={idx}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.8 + idx * 0.1, type: 'spring' }}
                  >
                    <circle
                      cx={incident.x}
                      cy={incident.y}
                      r="8"
                      fill={
                        incident.severity === 'critical' ? 'rgb(239, 68, 68)' :
                        incident.severity === 'high' ? 'rgb(249, 115, 22)' :
                        incident.severity === 'medium' ? 'rgb(234, 179, 8)' :
                        'rgb(34, 197, 94)'
                      }
                      className="animate-pulse"
                    />
                    <circle
                      cx={incident.x}
                      cy={incident.y}
                      r="12"
                      fill="none"
                      stroke={
                        incident.severity === 'critical' ? 'rgb(239, 68, 68)' :
                        incident.severity === 'high' ? 'rgb(249, 115, 22)' :
                        incident.severity === 'medium' ? 'rgb(234, 179, 8)' :
                        'rgb(34, 197, 94)'
                      }
                      strokeWidth="2"
                      opacity="0.5"
                    />
                  </motion.g>
                ))}
              </svg>
            </div>
          </div>
        </div>

        {/* Legend and Stats */}
        <div className="space-y-6">
          {/* Legend */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 backdrop-blur-xl">
            <h3 className="text-lg font-bold text-white mb-4">Threat Levels</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-red-500 rounded-lg" />
                <div className="flex-1">
                  <div className="text-white font-medium">High Risk</div>
                  <div className="text-xs text-gray-400">Active spread detected</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-yellow-500 rounded-lg" />
                <div className="flex-1">
                  <div className="text-white font-medium">Medium Risk</div>
                  <div className="text-xs text-gray-400">Moderate activity</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-green-500 rounded-lg" />
                <div className="flex-1">
                  <div className="text-white font-medium">Low Risk</div>
                  <div className="text-xs text-gray-400">Minimal threats</div>
                </div>
              </div>
            </div>
          </div>

          {/* Regional Stats */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 backdrop-blur-xl">
            <h3 className="text-lg font-bold text-white mb-4">Live Incidents</h3>
            <div className="space-y-3">
              {[
                { region: 'North India', count: 234, color: 'red' },
                { region: 'Central India', count: 167, color: 'yellow' },
                { region: 'South India', count: 45, color: 'green' },
                { region: 'East India', count: 89, color: 'yellow' },
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.15 }}
                  className="flex items-center justify-between"
                >
                  <span className="text-gray-400 text-sm">{stat.region}</span>
                  <span className={`text-${stat.color}-500 font-bold`}>{stat.count}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Alert */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-red-500/10 border border-red-500/30 rounded-xl p-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5 text-red-500 animate-pulse" />
              <span className="text-red-400 font-bold text-sm">ACTIVE ALERT</span>
            </div>
            <p className="text-xs text-gray-400">High-risk deepfake detected in North region</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// Slide 12 - Technical Architecture
function ArchitectureSlide() {
  const layers = [
    { name: 'Frontend Interface', tech: 'React + TypeScript', icon: Code, color: 'blue' },
    { name: 'API Layer', tech: 'REST + WebSocket', icon: Network, color: 'purple' },
    { name: 'AI Detection Engine', tech: 'PyTorch + TensorFlow', icon: Brain, color: 'pink' },
    { name: 'Forensic Analysis', tech: 'Computer Vision + NLP', icon: Eye, color: 'cyan' },
    { name: 'Threat Scoring', tech: 'ML Risk Models', icon: TrendingUp, color: 'green' },
    { name: 'Government Dashboard', tech: 'Real-time Monitoring', icon: Shield, color: 'red' },
  ];

  return (
    <div className="h-full flex flex-col">
      <h2 className="text-5xl font-bold text-white mb-4">Technical Architecture</h2>
      <p className="text-xl text-gray-400 mb-12">Multi-tier system design</p>

      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-3xl">
          {layers.map((layer, idx) => {
            const Icon = layer.icon;
            return (
              <div key={idx}>
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.2 }}
                  className={`bg-gradient-to-r from-${layer.color}-500/20 to-${layer.color}-600/20 border border-${layer.color}-500/30 rounded-xl p-6 backdrop-blur-xl mb-4`}
                >
                  <div className="flex items-center gap-6">
                    <div className={`w-16 h-16 bg-${layer.color}-500 rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-1">{layer.name}</h3>
                      <p className="text-sm text-gray-400">{layer.tech}</p>
                    </div>
                    <div className={`text-${layer.color}-500 font-mono text-sm`}>Layer {idx + 1}</div>
                  </div>
                </motion.div>

                {idx < layers.length - 1 && (
                  <div className="flex items-center justify-center mb-4">
                    <motion.div
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{ delay: idx * 0.2 + 0.15 }}
                      className="w-0.5 h-8 bg-gradient-to-b from-blue-500 to-purple-500"
                      style={{ transformOrigin: 'top' }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Slide 13 - Impact
function ImpactSlide() {
  const impacts = [
    {
      sector: 'Government',
      benefits: ['Misinformation monitoring', 'Election protection', 'National security'],
      icon: Shield,
      color: 'red'
    },
    {
      sector: 'Media Platforms',
      benefits: ['Automated deepfake detection', 'Content moderation', 'User trust'],
      icon: Globe,
      color: 'blue'
    },
    {
      sector: 'Public Safety',
      benefits: ['Fake content identification', 'Scam prevention', 'Information integrity'],
      icon: CheckCircle,
      color: 'green'
    },
  ];

  return (
    <div className="h-full flex flex-col">
      <h2 className="text-5xl font-bold text-white mb-4">Impact & Practical Use</h2>
      <p className="text-xl text-gray-400 mb-12">Real-world benefits across sectors</p>

      <div className="flex-1 grid grid-cols-3 gap-6">
        {impacts.map((impact, idx) => {
          const Icon = impact.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2 }}
              className={`bg-gradient-to-b from-${impact.color}-500/10 to-slate-800/50 border border-${impact.color}-500/30 rounded-2xl p-8 backdrop-blur-xl`}
            >
              <div className={`w-20 h-20 bg-${impact.color}-500 rounded-2xl flex items-center justify-center mb-6 mx-auto`}>
                <Icon className="w-10 h-10 text-white" />
              </div>

              <h3 className={`text-2xl font-bold text-${impact.color}-500 mb-6 text-center`}>{impact.sector}</h3>

              <div className="space-y-4">
                {impact.benefits.map((benefit, bidx) => (
                  <motion.div
                    key={bidx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.2 + bidx * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle className={`w-5 h-5 text-${impact.color}-500 mt-0.5 flex-shrink-0`} />
                    <span className="text-white">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom Stats */}
      <div className="mt-8 grid grid-cols-4 gap-4">
        {[
          { label: 'Accuracy Rate', value: '98.7%' },
          { label: 'Processing Speed', value: '<2s' },
          { label: 'Supported Formats', value: '15+' },
          { label: 'Platform Coverage', value: '8' },
        ].map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + idx * 0.1 }}
            className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 text-center backdrop-blur-xl"
          >
            <div className="text-3xl font-bold text-blue-500 mb-1">{stat.value}</div>
            <div className="text-sm text-gray-400">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Slide 14 - Demo Workflow
function DemoWorkflowSlide() {
  const steps = [
    { title: 'Upload Media', desc: 'User uploads image, video, audio, or text', icon: Activity, color: 'blue' },
    { title: 'System Analysis', desc: 'AI models process and extract features', icon: Brain, color: 'purple' },
    { title: 'AI Probability', desc: 'Multi-signal scoring calculates likelihood', icon: TrendingUp, color: 'cyan' },
    { title: 'Threat Level', desc: 'Government module assesses risk', icon: AlertTriangle, color: 'orange' },
    { title: 'Action Recommendation', desc: 'Display results and next steps', icon: CheckCircle, color: 'green' },
  ];

  return (
    <div className="h-full flex flex-col">
      <h2 className="text-5xl font-bold text-white mb-4">Demo Workflow</h2>
      <p className="text-xl text-gray-400 mb-12">Step-by-step user experience</p>

      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-4xl">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div key={idx} className="relative">
                <motion.div
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.2 }}
                  className="flex items-center gap-6 mb-8"
                >
                  {/* Step Number */}
                  <div className={`w-16 h-16 bg-gradient-to-br from-${step.color}-500 to-${step.color}-600 rounded-full flex items-center justify-center flex-shrink-0 text-2xl font-bold text-white`}>
                    {idx + 1}
                  </div>

                  {/* Content */}
                  <div className={`flex-1 bg-gradient-to-r from-${step.color}-500/20 to-slate-800/50 border border-${step.color}-500/30 rounded-xl p-6 backdrop-blur-xl`}>
                    <div className="flex items-center gap-4">
                      <Icon className={`w-10 h-10 text-${step.color}-500`} />
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-1">{step.title}</h3>
                        <p className="text-sm text-gray-400">{step.desc}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Arrow */}
                {idx < steps.length - 1 && (
                  <div className="flex items-center justify-center mb-8">
                    <motion.div
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{ delay: idx * 0.2 + 0.15 }}
                      className="relative"
                    >
                      <div className="w-0.5 h-12 bg-gradient-to-b from-blue-500 to-purple-500" />
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
                        <div className="w-0 h-0 border-l-4 border-r-4 border-t-8 border-l-transparent border-r-transparent border-t-purple-500" />
                      </div>
                    </motion.div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Slide 15 - Conclusion
function ConclusionSlide() {
  return (
    <div className="h-full flex flex-col items-center justify-center relative">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-[120px]" />

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring' }}
        className="w-24 h-24 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mb-8 relative"
      >
        <Shield className="w-12 h-12 text-white" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/50 to-purple-400/50 rounded-2xl animate-pulse" />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-5xl font-bold text-white mb-6 text-center"
      >
        Conclusion
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="text-2xl text-gray-300 text-center max-w-4xl mb-12 leading-relaxed"
      >
        TruthGuard AI provides a <span className="text-blue-400 font-semibold">multi-layer forensic detection system</span> capable of identifying AI-generated media and assessing misinformation risk for <span className="text-purple-400 font-semibold">government and industry use</span>.
      </motion.p>

      {/* Key Features */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="grid grid-cols-3 gap-6 mb-12"
      >
        {[
          { icon: Brain, label: 'AI-Powered Detection', value: '98.7% Accuracy' },
          { icon: Zap, label: 'Real-Time Analysis', value: '<2s Response' },
          { icon: Shield, label: 'Government-Grade', value: 'MTRRS System' },
        ].map((feature, idx) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 + idx * 0.15 }}
              className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 backdrop-blur-xl text-center"
            >
              <Icon className="w-10 h-10 text-blue-500 mx-auto mb-3" />
              <div className="text-white font-semibold mb-1">{feature.label}</div>
              <div className="text-sm text-gray-400">{feature.value}</div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        className="text-center"
      >
        <div className="text-gray-500 text-sm mb-4">Ready to deploy</div>
        <div className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-bold text-xl">
          Protecting Information Integrity
        </div>
      </motion.div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 text-gray-600 text-sm"
      >
        TruthGuard AI • Multi-Spectrum Deepfake Detection Platform • 2026
      </motion.div>
    </div>
  );
}
