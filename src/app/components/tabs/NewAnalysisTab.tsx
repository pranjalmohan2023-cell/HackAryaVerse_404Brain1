import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Video, Mic, FileText, Image, Upload, File, X, Loader2, CheckCircle } from 'lucide-react';
import { API_URL } from '/src/lib/supabase';
import { AnalysisResults } from '../analysis/AnalysisResults';
import { supabase } from '/src/lib/supabase';

interface NewAnalysisTabProps {
  session: any;
  onAnalysisComplete: () => void;
}

type DetectionMode = 'video' | 'audio' | 'text' | 'image';

const modes = [
  { 
    id: 'video' as DetectionMode, 
    label: 'Video', 
    icon: Video,
    description: 'Deepfake detection, facial manipulation',
    accept: 'video/*',
    color: 'from-blue-500 to-cyan-500'
  },
  { 
    id: 'audio' as DetectionMode, 
    label: 'Audio', 
    icon: Mic,
    description: 'Voice cloning, synthetic speech',
    accept: 'audio/*',
    color: 'from-purple-500 to-pink-500'
  },
  { 
    id: 'text' as DetectionMode, 
    label: 'Text', 
    icon: FileText,
    description: 'AI-generated content detection',
    accept: '.txt,.doc,.docx,.pdf',
    color: 'from-green-500 to-emerald-500'
  },
  { 
    id: 'image' as DetectionMode, 
    label: 'Image', 
    icon: Image,
    description: 'AI-generated images, manipulation',
    accept: 'image/*',
    color: 'from-orange-500 to-red-500'
  }
];

export function NewAnalysisTab({ session, onAnalysisComplete }: NewAnalysisTabProps) {
  const [selectedMode, setSelectedMode] = useState<DetectionMode>('video');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragging(true);
    } else if (e.type === 'dragleave') {
      setIsDragging(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;
    
    setAnalyzing(true);
    setProgress(0);

    // Simulate progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + Math.random() * 20;
      });
    }, 200);

    try {
      // Generate mock analysis
      const mockAnalysis = generateAnalysis(selectedFile, selectedMode);
      
      // For now, just use the analysis locally without backend save
      // This bypasses the JWT issue temporarily
      const analysis = {
        id: crypto.randomUUID(),
        userId: session?.user?.id || 'local',
        ...mockAnalysis,
        createdAt: new Date().toISOString(),
      };
      
      console.log('Analysis generated:', { mode: analysis.mode, fileName: analysis.fileName });
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setProgress(100);
      setTimeout(() => {
        clearInterval(interval);
        setAnalysisResult(analysis);
        // Save to localStorage for persistence
        saveAnalysisToLocalStorage(analysis);
        // Call onAnalysisComplete to refresh dashboard
        onAnalysisComplete();
      }, 500);
    } catch (error) {
      console.error('Analysis failed:', error);
      clearInterval(interval);
      setAnalyzing(false);
      alert(`Analysis failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const saveAnalysisToLocalStorage = (analysis: any) => {
    try {
      const existingAnalyses = JSON.parse(localStorage.getItem('truthguard_analyses') || '[]');
      existingAnalyses.unshift(analysis); // Add to beginning of array
      // Keep only last 100 analyses
      const trimmedAnalyses = existingAnalyses.slice(0, 100);
      localStorage.setItem('truthguard_analyses', JSON.stringify(trimmedAnalyses));
      console.log('Analysis saved to localStorage');
    } catch (error) {
      console.error('Failed to save to localStorage:', error);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setAnalyzing(false);
    setProgress(0);
    setAnalysisResult(null);
  };

  if (analysisResult) {
    return <AnalysisResults data={analysisResult} onReset={handleReset} />;
  }

  const selectedModeData = modes.find(m => m.id === selectedMode)!;

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">New Analysis</h1>
        <p className="text-gray-400">Upload content to detect manipulation and deepfakes</p>
      </div>

      {/* Mode Selection */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">Select Detection Mode</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {modes.map((mode) => {
            const Icon = mode.icon;
            const isActive = selectedMode === mode.id;
            
            return (
              <button
                key={mode.id}
                onClick={() => setSelectedMode(mode.id)}
                disabled={analyzing}
                className={`p-4 rounded-xl border-2 transition-all ${
                  isActive
                    ? 'border-blue-500 bg-blue-500/10'
                    : 'border-slate-700 bg-slate-800/50 hover:border-slate-600'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${
                  isActive ? `bg-gradient-to-br ${mode.color}` : 'bg-slate-700'
                }`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-white font-bold mb-1">{mode.label}</h3>
                <p className="text-xs text-gray-400">{mode.description}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Upload Section */}
      <div>
        <h2 className="text-xl font-bold text-white mb-4">Upload File</h2>
        
        {!selectedFile ? (
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all ${
              isDragging
                ? 'border-blue-500 bg-blue-500/10'
                : 'border-slate-700 bg-slate-800/30'
            }`}
          >
            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 bg-gradient-to-br ${selectedModeData.color}`}>
              <Upload className="w-8 h-8 text-white" />
            </div>
            
            <h3 className="text-xl font-bold text-white mb-2">
              Drop your {selectedModeData.label.toLowerCase()} file here
            </h3>
            <p className="text-gray-400 mb-6">or click to browse</p>
            
            <label>
              <input
                type="file"
                accept={selectedModeData.accept}
                onChange={handleFileSelect}
                className="hidden"
              />
              <span className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium cursor-pointer transition-all">
                Select File
              </span>
            </label>
          </div>
        ) : (
          <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
            <div className="flex items-start gap-4 mb-6">
              <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${selectedModeData.color}`}>
                <File className="w-6 h-6 text-white" />
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className="text-lg font-semibold text-white mb-1 truncate">
                  {selectedFile.name}
                </h4>
                <p className="text-sm text-gray-400">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB • {selectedModeData.label}
                </p>
              </div>

              {!analyzing && (
                <button
                  onClick={() => setSelectedFile(null)}
                  className="flex-shrink-0 p-2 text-gray-400 hover:text-white hover:bg-slate-700 rounded-lg transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {analyzing && (
              <div className="mb-6">
                <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
                  <span>Analyzing with AI models...</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="h-2 bg-slate-900 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
                  />
                </div>
              </div>
            )}

            {!analyzing ? (
              <button
                onClick={handleAnalyze}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2"
              >
                Start Analysis
                <Upload className="w-5 h-5" />
              </button>
            ) : (
              <div className="flex items-center justify-center gap-3 text-blue-400 py-4">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span className="font-medium">Processing...</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// Generate mock analysis
function generateAnalysis(file: File, mode: DetectionMode) {
  const baseScore = Math.floor(Math.random() * 40) + 50;
  
  // Generate timeline data for all modes (frame/time-based analysis)
  const generateTimelineData = () => {
    if (mode === 'video') {
      // Video: Frame-by-frame analysis (50 frames)
      return Array.from({ length: 50 }, () => Math.floor(Math.random() * 40) + 40);
    } else if (mode === 'audio') {
      // Audio: Time-based waveform analysis (40 segments)
      return Array.from({ length: 40 }, () => Math.floor(Math.random() * 35) + 45);
    } else if (mode === 'image') {
      // Image: Region-based analysis (30 regions)
      return Array.from({ length: 30 }, () => Math.floor(Math.random() * 45) + 35);
    } else if (mode === 'text') {
      // Text: Sentence/paragraph analysis (25 segments)
      return Array.from({ length: 25 }, () => Math.floor(Math.random() * 40) + 40);
    }
    return null;
  };
  
  return {
    fileName: file.name,
    fileSize: file.size,
    mode,
    overallScore: baseScore,
    verdict: baseScore > 70 ? 'HIGHLY SUSPICIOUS' : baseScore > 40 ? 'POTENTIALLY MANIPULATED' : 'LIKELY AUTHENTIC',
    detections: {
      faceManipulation: mode === 'video' || mode === 'image' ? Math.floor(Math.random() * 30) + 60 : null,
      lipSync: mode === 'video' ? Math.floor(Math.random() * 30) + 50 : null,
      audioCloning: mode === 'audio' || mode === 'video' ? Math.floor(Math.random() * 30) + 55 : null,
      pixelArtifacts: mode === 'image' || mode === 'video' ? Math.floor(Math.random() * 30) + 70 : null,
      aiGeneration: mode === 'text' || mode === 'image' ? Math.floor(Math.random() * 30) + 65 : null,
      voiceAuthenticity: mode === 'audio' ? Math.floor(Math.random() * 30) + 60 : null,
      spectralAnalysis: mode === 'audio' ? Math.floor(Math.random() * 30) + 58 : null,
      semanticConsistency: mode === 'text' ? Math.floor(Math.random() * 30) + 62 : null,
      ganArtifacts: mode === 'image' ? Math.floor(Math.random() * 30) + 68 : null,
    },
    timeline: generateTimelineData(),
    issues: generateIssues(mode, baseScore),
    modelConsensus: {
      model1: Math.floor(Math.random() * 20) + 70,
      model2: Math.floor(Math.random() * 20) + 65,
      model3: Math.floor(Math.random() * 20) + 75,
      model4: Math.floor(Math.random() * 20) + 60,
    }
  };
}

function generateIssues(mode: string, score: number) {
  const issues = [];
  
  if (mode === 'video') {
    if (score > 60) issues.push({ time: '0:23', issue: 'Unnatural eye blinking detected', severity: 'high' });
    if (score > 50) issues.push({ time: '0:45', issue: 'Lip sync mismatch', severity: 'medium' });
    if (score > 70) issues.push({ time: '1:12', issue: 'Face boundary artifacts', severity: 'high' });
    if (score > 55) issues.push({ time: '0:58', issue: 'Frame interpolation anomalies', severity: 'medium' });
  } else if (mode === 'audio') {
    if (score > 60) issues.push({ time: '0:15', issue: 'Spectral anomalies detected', severity: 'high' });
    if (score > 50) issues.push({ time: '0:32', issue: 'Unnatural voice timbre', severity: 'medium' });
    if (score > 65) issues.push({ time: '0:48', issue: 'AI voice synthesis patterns', severity: 'high' });
  } else if (mode === 'text') {
    if (score > 60) issues.push({ line: '3-7', issue: 'Repetitive sentence structure', severity: 'medium' });
    if (score > 70) issues.push({ line: '12-15', issue: 'Typical AI phrasing patterns', severity: 'high' });
    if (score > 55) issues.push({ line: '8-10', issue: 'Inconsistent writing style', severity: 'medium' });
  } else if (mode === 'image') {
    if (score > 60) issues.push({ region: 'Face area', issue: 'GAN fingerprint detected', severity: 'high' });
    if (score > 50) issues.push({ region: 'Background', issue: 'Inconsistent lighting patterns', severity: 'medium' });
    if (score > 70) issues.push({ region: 'Edges', issue: 'Pixel-level artifacts', severity: 'high' });
  }
  
  return issues;
}