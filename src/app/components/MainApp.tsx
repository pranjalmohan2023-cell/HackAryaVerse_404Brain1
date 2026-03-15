import { useState } from 'react';
import { motion } from 'motion/react';
import { LayoutDashboard, Upload, History, FileText, BarChart3, Settings, LogOut, Shield, ShieldAlert } from 'lucide-react';
import { DashboardTab } from './tabs/DashboardTab';
import { NewAnalysisTab } from './tabs/NewAnalysisTab';
import { HistoryTab } from './tabs/HistoryTab';
import { ReportsTab } from './tabs/ReportsTab';
import { AnalyticsTab } from './tabs/AnalyticsTab';
import { SettingsTab } from './tabs/SettingsTab';
import { Presentation } from './Presentation';
import { TechnicalPresentation } from './TechnicalPresentation';
import { MTRRSModule } from './government/MTRRSModule';

interface MainAppProps {
  session: any;
  onSignOut: () => void;
}

type TabId = 'dashboard' | 'new-analysis' | 'history' | 'reports' | 'analytics' | 'settings';

const tabs = [
  { id: 'dashboard' as TabId, label: 'Dashboard', icon: LayoutDashboard },
  { id: 'new-analysis' as TabId, label: 'New Analysis', icon: Upload },
  { id: 'history' as TabId, label: 'History', icon: History },
  { id: 'reports' as TabId, label: 'Reports', icon: FileText },
  { id: 'analytics' as TabId, label: 'Analytics', icon: BarChart3 },
  { id: 'settings' as TabId, label: 'Settings', icon: Settings },
];

export function MainApp({ session, onSignOut }: MainAppProps) {
  const [activeTab, setActiveTab] = useState<TabId>('dashboard');
  const [refreshKey, setRefreshKey] = useState(0);
  const [showPresentation, setShowPresentation] = useState(false);
  const [showTechnicalPresentation, setShowTechnicalPresentation] = useState(false);
  const [showGovernmentModule, setShowGovernmentModule] = useState(false);

  const handleAnalysisComplete = () => {
    // Increment refresh key to force re-render of all tabs
    setRefreshKey(prev => prev + 1);
    // Navigate to history to show the new analysis
    setActiveTab('history');
  };

  const handleTabChange = (tabId: TabId) => {
    setActiveTab(tabId);
    // Increment refresh key when switching to dashboard, history, or analytics
    // to ensure they reload data from localStorage
    if (tabId === 'dashboard' || tabId === 'history' || tabId === 'analytics') {
      setRefreshKey(prev => prev + 1);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardTab key={refreshKey} session={session} onNavigate={handleTabChange} />;
      case 'new-analysis':
        return <NewAnalysisTab session={session} onAnalysisComplete={handleAnalysisComplete} />;
      case 'history':
        return <HistoryTab key={refreshKey} session={session} />;
      case 'reports':
        return <ReportsTab key={refreshKey} session={session} />;
      case 'analytics':
        return <AnalyticsTab key={refreshKey} session={session} />;
      case 'settings':
        return <SettingsTab 
          session={session} 
          onSignOut={onSignOut} 
          onOpenPresentation={() => setShowPresentation(true)}
          onOpenTechnicalPresentation={() => setShowTechnicalPresentation(true)}
          onOpenGovernmentModule={() => setShowGovernmentModule(true)}
        />;
      default:
        return <DashboardTab session={session} onNavigate={handleTabChange} />;
    }
  };

  const userName = session?.user?.user_metadata?.name || session?.user?.email?.split('@')[0] || 'User';

  // If technical presentation is open, render it in full screen
  if (showTechnicalPresentation) {
    return (
      <div className="relative">
        <TechnicalPresentation />
        <button
          onClick={() => setShowTechnicalPresentation(false)}
          className="fixed top-4 left-4 z-50 px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white rounded-xl font-medium transition-all flex items-center gap-2"
        >
          ← Back to App
        </button>
      </div>
    );
  }

  // If government module is open, render it in full screen
  if (showGovernmentModule) {
    return (
      <div className="relative">
        <button
          onClick={() => setShowGovernmentModule(false)}
          className="fixed top-4 right-4 z-50 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium transition-all border border-slate-700"
        >
          ← Back to Main App
        </button>
        <MTRRSModule session={session} />
      </div>
    );
  }

  return (
    <>
      {/* Presentation Mode */}
      {showPresentation && <Presentation onClose={() => setShowPresentation(false)} />}

      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
        {/* Background pattern */}
        <div className="fixed inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(59, 130, 246, 0.5) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="relative z-10 flex h-screen">
          {/* Sidebar */}
          <aside className="w-72 bg-slate-900/50 border-r border-slate-700/50 backdrop-blur-xl flex flex-col">
            {/* Logo */}
            <div className="p-6 border-b border-slate-700/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">TruthGuard AI</h1>
                  <p className="text-xs text-gray-400">Deepfake Detection</p>
                </div>
              </div>
            </div>

            {/* User Info */}
            <div className="p-4 border-b border-slate-700/50">
              <div className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-xl">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">
                    {userName.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{userName}</p>
                  <p className="text-xs text-gray-400 truncate">{session?.user?.email}</p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabChange(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                        : 'text-gray-400 hover:text-white hover:bg-slate-800/50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Sign Out */}
            <div className="p-4 border-t border-slate-700/50">
              <button
                onClick={onSignOut}
                className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-slate-800/50 rounded-xl transition-all"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Sign Out</span>
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 overflow-y-auto">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="p-8"
            >
              {renderTabContent()}
            </motion.div>
          </main>
        </div>
      </div>
    </>
  );
}