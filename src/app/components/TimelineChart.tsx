import { motion } from 'motion/react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

interface TimelineChartProps {
  data: number[];
  mode?: string;
}

export function TimelineChart({ data, mode = 'video' }: TimelineChartProps) {
  // Get labels based on mode
  const getLabels = () => {
    switch (mode) {
      case 'video':
        return {
          title: 'Frame-by-Frame Analysis',
          subtitle: 'Manipulation probability per frame',
          xLabel: 'time',
          statsLabel: 'Frames'
        };
      case 'audio':
        return {
          title: 'Waveform Analysis',
          subtitle: 'Voice authenticity over time',
          xLabel: 'time',
          statsLabel: 'Segments'
        };
      case 'image':
        return {
          title: 'Region Analysis',
          subtitle: 'Manipulation probability by region',
          xLabel: 'region',
          statsLabel: 'Regions'
        };
      case 'text':
        return {
          title: 'Content Analysis',
          subtitle: 'AI generation probability by section',
          xLabel: 'section',
          statsLabel: 'Sections'
        };
      default:
        return {
          title: 'Timeline Analysis',
          subtitle: 'Manipulation probability over time',
          xLabel: 'time',
          statsLabel: 'Data Points'
        };
    }
  };

  const labels = getLabels();

  const chartData = data.map((value, index) => ({
    frame: index,
    score: value,
    time: mode === 'video' || mode === 'audio' 
      ? `${Math.floor(index * 2 / 60)}:${String(Math.floor((index * 2) % 60)).padStart(2, '0')}`
      : mode === 'image'
      ? `R${index + 1}`
      : `S${index + 1}`,
    id: `point-${index}`
  }));

  return (
    <div className="bg-slate-900/50 border border-slate-700 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-white mb-1">{labels.title}</h3>
          <p className="text-sm text-gray-400">{labels.subtitle}</p>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full" />
            <span className="text-gray-400">Detection Score</span>
          </div>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
            <XAxis 
              dataKey="time" 
              stroke="#64748b" 
              style={{ fontSize: '12px' }}
              tick={{ fill: '#64748b' }}
            />
            <YAxis 
              stroke="#64748b" 
              style={{ fontSize: '12px' }}
              tick={{ fill: '#64748b' }}
              domain={[0, 100]}
              ticks={[0, 25, 50, 75, 100]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1e293b',
                border: '1px solid #334155',
                borderRadius: '8px',
                color: '#fff'
              }}
              labelStyle={{ color: '#94a3b8' }}
            />
            <Area
              type="monotone"
              dataKey="score"
              stroke="#3b82f6"
              strokeWidth={3}
              fill="url(#scoreGradient)"
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-700">
        <div>
          <div className="text-xs text-gray-400 mb-1">Average</div>
          <div className="text-xl font-bold text-white">
            {Math.round(data.reduce((a, b) => a + b, 0) / data.length)}%
          </div>
        </div>
        <div>
          <div className="text-xs text-gray-400 mb-1">Peak</div>
          <div className="text-xl font-bold text-red-500">
            {Math.max(...data)}%
          </div>
        </div>
        <div>
          <div className="text-xs text-gray-400 mb-1">Lowest</div>
          <div className="text-xl font-bold text-green-500">
            {Math.min(...data)}%
          </div>
        </div>
        <div>
          <div className="text-xs text-gray-400 mb-1">{labels.statsLabel}</div>
          <div className="text-xl font-bold text-white">
            {data.length}
          </div>
        </div>
      </div>
    </div>
  );
}