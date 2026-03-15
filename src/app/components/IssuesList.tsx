import { motion } from 'motion/react';
import { AlertTriangle, Clock, FileText } from 'lucide-react';

interface Issue {
  time?: string;
  line?: string;
  issue: string;
  severity: 'high' | 'medium' | 'low';
}

interface IssuesListProps {
  issues: Issue[];
}

export function IssuesList({ issues }: IssuesListProps) {
  const getSeverityColor = (severity: string) => {
    if (severity === 'high') return 'text-red-500 bg-red-500/10 border-red-500/30';
    if (severity === 'medium') return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/30';
    return 'text-blue-500 bg-blue-500/10 border-blue-500/30';
  };

  const getSeverityLabel = (severity: string) => {
    return severity.charAt(0).toUpperCase() + severity.slice(1);
  };

  return (
    <div className="bg-slate-900/50 border border-slate-700 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-white">Detected Issues</h3>
        <div className="px-3 py-1 bg-red-500/10 border border-red-500/30 rounded-full">
          <span className="text-sm text-red-500 font-medium">{issues.length} Found</span>
        </div>
      </div>

      {issues.length > 0 ? (
        <div className="space-y-3">
          {issues.map((issue, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-slate-800/50 border border-slate-700 rounded-xl p-4"
            >
              {/* Header */}
              <div className="flex items-start gap-3 mb-2">
                <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${
                  getSeverityColor(issue.severity)
                }`}>
                  <AlertTriangle className="w-4 h-4" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`px-2 py-0.5 text-xs font-medium rounded border ${
                      getSeverityColor(issue.severity)
                    }`}>
                      {getSeverityLabel(issue.severity)}
                    </span>
                    {issue.time && (
                      <div className="flex items-center gap-1 text-xs text-gray-400">
                        <Clock className="w-3 h-3" />
                        <span>{issue.time}</span>
                      </div>
                    )}
                    {issue.line && (
                      <div className="flex items-center gap-1 text-xs text-gray-400">
                        <FileText className="w-3 h-3" />
                        <span>Lines {issue.line}</span>
                      </div>
                    )}
                  </div>

                  <p className="text-sm text-gray-300 leading-relaxed">
                    {issue.issue}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-3">
            <AlertTriangle className="w-8 h-8 text-green-500" />
          </div>
          <p className="text-gray-400">No significant issues detected</p>
        </div>
      )}

      {/* Footer */}
      <div className="mt-6 pt-6 border-t border-slate-700 text-sm text-gray-400">
        <p>
          💡 <strong className="text-white">Tip:</strong> Issues are ranked by severity and timestamp. 
          Click "Download Report" for detailed analysis.
        </p>
      </div>
    </div>
  );
}
