import { User, Bell, Shield, LogOut, Presentation as PresentationIcon, ShieldAlert, Monitor } from 'lucide-react';

interface SettingsTabProps {
  session: any;
  onSignOut: () => void;
  onOpenPresentation?: () => void;
  onOpenGovernmentModule?: () => void;
  onOpenTechnicalPresentation?: () => void;
}

export function SettingsTab({ session, onSignOut, onOpenPresentation, onOpenGovernmentModule, onOpenTechnicalPresentation }: SettingsTabProps) {
  const userName = session?.user?.user_metadata?.name || 'User';
  const userEmail = session?.user?.email || '';

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Settings</h1>
        <p className="text-gray-400">Manage your account and preferences</p>
      </div>

      <div className="space-y-6">
        {/* Profile Section */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <User className="w-6 h-6 text-blue-500" />
            <h2 className="text-xl font-bold text-white">Profile Information</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Name</label>
              <input
                type="text"
                value={userName}
                disabled
                className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white disabled:opacity-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
              <input
                type="email"
                value={userEmail}
                disabled
                className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white disabled:opacity-50"
              />
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <Bell className="w-6 h-6 text-blue-500" />
            <h2 className="text-xl font-bold text-white">Notifications</h2>
          </div>

          <div className="space-y-4">
            <label className="flex items-center justify-between">
              <span className="text-white">Email notifications</span>
              <input type="checkbox" className="w-5 h-5" />
            </label>
            <label className="flex items-center justify-between">
              <span className="text-white">High-risk detection alerts</span>
              <input type="checkbox" className="w-5 h-5" defaultChecked />
            </label>
          </div>
        </div>

        {/* Security */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-6 h-6 text-blue-500" />
            <h2 className="text-xl font-bold text-white">Security</h2>
          </div>

          <p className="text-gray-400 mb-4">
            Your data is encrypted and secure. All analyses are stored privately.
          </p>
        </div>

        {/* Presentations */}
        <div className="grid grid-cols-2 gap-4">
          {onOpenPresentation && (
            <button
              onClick={onOpenPresentation}
              className="p-6 bg-gradient-to-r from-purple-600/20 to-blue-600/20 border-2 border-purple-600/50 rounded-2xl text-left hover:from-purple-600/30 hover:to-blue-600/30 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
                  <PresentationIcon className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white mb-1">PowerPoint Deck</h3>
                  <p className="text-gray-300 text-sm">View product presentation</p>
                </div>
              </div>
            </button>
          )}

          {onOpenTechnicalPresentation && (
            <button
              onClick={onOpenTechnicalPresentation}
              className="p-6 bg-gradient-to-r from-cyan-600/20 to-blue-600/20 border-2 border-cyan-600/50 rounded-2xl text-left hover:from-cyan-600/30 hover:to-blue-600/30 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-600 to-blue-600 rounded-xl flex items-center justify-center">
                  <Monitor className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white mb-1">Technical Deck</h3>
                  <p className="text-gray-300 text-sm">Research presentation</p>
                </div>
              </div>
            </button>
          )}
        </div>

        {/* Government Module Access */}
        {onOpenGovernmentModule && (
          <button
            onClick={onOpenGovernmentModule}
            className="w-full p-6 bg-gradient-to-r from-red-600/20 to-orange-600/20 border-2 border-red-600/50 rounded-2xl text-left hover:from-red-600/30 hover:to-orange-600/30 transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-orange-600 rounded-xl flex items-center justify-center">
                <ShieldAlert className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-1">Government MTRRS Module</h3>
                <p className="text-gray-300 text-sm">
                  Access Misinformation Trace & Rapid Response System (AUTHORIZED PERSONNEL ONLY)
                </p>
              </div>
            </div>
          </button>
        )}

        {/* Sign Out */}
        <button
          onClick={onSignOut}
          className="w-full p-6 bg-red-500/10 border border-red-500/30 rounded-2xl text-left hover:bg-red-500/20 transition-all group"
        >
          <div className="flex items-center gap-3">
            <LogOut className="w-6 h-6 text-red-500" />
            <div>
              <h3 className="text-xl font-bold text-red-500">Sign Out</h3>
              <p className="text-red-400/70 text-sm">Sign out of your account</p>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}