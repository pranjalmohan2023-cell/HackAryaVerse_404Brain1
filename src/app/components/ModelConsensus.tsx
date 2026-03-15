import { motion } from 'motion/react';
import { Brain, CheckCircle, AlertTriangle } from 'lucide-react';

interface ModelConsensusProps {
  models: {
    model1: number;
    model2: number;
    model3: number;
    model4: number;
  };
}

export function ModelConsensus({ models }: ModelConsensusProps) {
  const modelNames = {
    model1: 'FaceForensics++',
    model2: 'XceptionNet',
    model3: 'MesoNet-4',
    model4: 'CNNDetection'
  };

  const modelData = Object.entries(models).map(([key, score]) => ({
    name: modelNames[key as keyof typeof modelNames],
    score,
    key
  }));

  const avgScore = Math.round(
    modelData.reduce((sum, model) => sum + model.score, 0) / modelData.length
  );

  const consensus = modelData.filter(m => Math.abs(m.score - avgScore) < 10).length;
  const agreementPercent = (consensus / modelData.length) * 100;

  return (
    <div className="bg-slate-900/50 border border-slate-700 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-white">AI Model Consensus</h3>
        <div className="flex items-center gap-2">
          {agreementPercent > 75 ? (
            <>
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-sm text-green-500 font-medium">High Agreement</span>
            </>
          ) : (
            <>
              <AlertTriangle className="w-5 h-5 text-yellow-500" />
              <span className="text-sm text-yellow-500 font-medium">Mixed Signals</span>
            </>
          )}
        </div>
      </div>

      <div className="space-y-4 mb-6">
        {modelData.map((model, index) => (
          <motion.div
            key={model.key}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Brain className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-medium text-gray-300">{model.name}</span>
              </div>
              <span className={`text-sm font-bold ${
                model.score > 70 ? 'text-red-500' : 
                model.score > 40 ? 'text-yellow-500' : 
                'text-green-500'
              }`}>
                {model.score}%
              </span>
            </div>

            <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${model.score}%` }}
                transition={{ duration: 1, delay: index * 0.1 + 0.2 }}
                className={`h-full ${
                  model.score > 70 ? 'bg-red-500' : 
                  model.score > 40 ? 'bg-yellow-500' : 
                  'bg-green-500'
                }`}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Consensus Summary */}
      <div className="pt-6 border-t border-slate-700">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-gray-400">Average Confidence</span>
          <span className="text-2xl font-bold text-white">{avgScore}%</span>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">Model Agreement</span>
          <span className={`font-medium ${
            agreementPercent > 75 ? 'text-green-500' : 'text-yellow-500'
          }`}>
            {agreementPercent.toFixed(0)}%
          </span>
        </div>
      </div>
    </div>
  );
}
