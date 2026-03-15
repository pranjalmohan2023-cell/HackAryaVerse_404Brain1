import { motion } from 'motion/react';
import { Eye, Mic, Type, Image, AlertCircle } from 'lucide-react';

interface DetectionBreakdownProps {
  detections: any;
  mode: string;
}

export function DetectionBreakdown({ detections, mode }: DetectionBreakdownProps) {
  const getIcon = (key: string) => {
    if (key.includes('face') || key.includes('lip')) return Eye;
    if (key.includes('audio') || key.includes('voice')) return Mic;
    if (key.includes('text') || key.includes('ai')) return Type;
    if (key.includes('pixel') || key.includes('artifact')) return Image;
    return AlertCircle;
  };

  const formatLabel = (key: string) => {
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .trim();
  };

  const getScoreColor = (score: number) => {
    if (score > 70) return 'text-red-500';
    if (score > 40) return 'text-yellow-500';
    return 'text-green-500';
  };

  const getBarColor = (score: number) => {
    if (score > 70) return 'bg-red-500';
    if (score > 40) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const activeDetections = Object.entries(detections).filter(([_, value]) => value !== null);

  return (
    <div className="bg-slate-900/50 border border-slate-700 rounded-2xl p-6">
      <h3 className="text-lg font-bold text-white mb-6">Detection Breakdown</h3>

      <div className="space-y-4">
        {activeDetections.map(([key, value], index) => {
          const Icon = getIcon(key);
          const score = value as number;

          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              {/* Label row */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4 text-gray-400" />
                  <span className="text-sm font-medium text-gray-300">
                    {formatLabel(key)}
                  </span>
                </div>
                <span className={`text-lg font-bold ${getScoreColor(score)}`}>
                  {score}%
                </span>
              </div>

              {/* Progress bar */}
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${score}%` }}
                  transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                  className={`h-full ${getBarColor(score)} relative`}
                  style={{ 
                    boxShadow: score > 50 ? `0 0 10px ${
                      score > 70 ? 'rgba(239, 68, 68, 0.5)' : 'rgba(234, 179, 8, 0.5)'
                    }` : 'none'
                  }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Summary */}
      <div className="mt-6 pt-6 border-t border-slate-700">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">Active Detectors</span>
          <span className="text-white font-medium">{activeDetections.length}/6</span>
        </div>
      </div>
    </div>
  );
}
