import { motion } from 'motion/react';

interface ScoreGaugeProps {
  score: number;
}

export function ScoreGauge({ score }: ScoreGaugeProps) {
  const getColor = (score: number) => {
    if (score > 70) return '#ef4444'; // red
    if (score > 40) return '#eab308'; // yellow
    return '#22c55e'; // green
  };

  const circumference = 2 * Math.PI * 90;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="bg-slate-900/50 border border-slate-700 rounded-2xl p-6">
      <h3 className="text-lg font-bold text-white mb-6">Manipulation Score</h3>
      
      <div className="relative flex items-center justify-center">
        {/* Background glow */}
        <div 
          className="absolute inset-0 blur-3xl opacity-30 rounded-full"
          style={{ backgroundColor: getColor(score) }}
        />

        {/* SVG Gauge */}
        <svg width="240" height="240" className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx="120"
            cy="120"
            r="90"
            stroke="#1e293b"
            strokeWidth="20"
            fill="none"
          />
          
          {/* Progress circle */}
          <motion.circle
            cx="120"
            cy="120"
            r="90"
            stroke={getColor(score)}
            strokeWidth="20"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            style={{ filter: `drop-shadow(0 0 10px ${getColor(score)})` }}
          />
        </svg>

        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: 'spring' }}
            className="text-6xl font-bold"
            style={{ color: getColor(score) }}
          >
            {score}%
          </motion.div>
          <div className="text-sm text-gray-400 mt-2">Confidence</div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">Threshold</span>
          <span className="text-white font-medium">
            {score > 70 ? 'Critical' : score > 40 ? 'Warning' : 'Safe'}
          </span>
        </div>
        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full flex">
            <div className="h-full bg-green-500" style={{ width: '40%' }} />
            <div className="h-full bg-yellow-500" style={{ width: '30%' }} />
            <div className="h-full bg-red-500" style={{ width: '30%' }} />
          </div>
        </div>
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>0% Safe</span>
          <span>40% Warning</span>
          <span>70% Critical</span>
        </div>
      </div>
    </div>
  );
}
