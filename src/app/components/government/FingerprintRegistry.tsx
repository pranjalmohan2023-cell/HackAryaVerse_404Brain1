import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Database, Search, Filter, Download, Upload, Hash, CheckCircle, XCircle, Clock, FileType } from 'lucide-react';
import { toast } from 'sonner';

// Helper function to generate SHA-256 hash from file
async function hashFile(file: File): Promise<string> {
  const buffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

// Helper function to generate fingerprint ID
function generateFingerprintId(existingIds: string[]): string {
  const today = new Date();
  const dateStr = today.toISOString().slice(0, 10).replace(/-/g, '');
  
  // Find highest sequence number for today
  const todayIds = existingIds.filter(id => id.startsWith(`FP-${dateStr}`));
  const sequences = todayIds.map(id => {
    const parts = id.split('-');
    return parseInt(parts[2] || '0');
  });
  
  const nextSeq = sequences.length > 0 ? Math.max(...sequences) + 1 : 1;
  const seqStr = nextSeq.toString().padStart(4, '0');
  
  return `FP-${dateStr}-${seqStr}`;
}

export function FingerprintRegistry() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [filterType, setFilterType] = useState('ALL');
  const [filterTimeRange, setFilterTimeRange] = useState('all');
  const [registryEntries, setRegistryEntries] = useState<any[]>(() => {
    // Load from localStorage on initial mount
    const saved = localStorage.getItem('registryEntries');
    return saved ? JSON.parse(saved) : [];
  });
  
  // Form states
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [manualHash, setManualHash] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Political Misinformation');
  const [selectedType, setSelectedType] = useState('VIDEO_DEEPFAKE');
  const [submitting, setSubmitting] = useState(false);

  // Save to localStorage whenever registryEntries changes
  useEffect(() => {
    localStorage.setItem('registryEntries', JSON.stringify(registryEntries));
  }, [registryEntries]);

  const handleExportDatabase = () => {
    try {
      toast.info('Exporting database...');
      
      // Export from localStorage
      const csvHeaders = 'Fingerprint ID,Hash,Content Type,Category,Status,Timestamp,Variants,Match Count,Platform\n';
      const csvRows = registryEntries.map(entry => 
        `${entry.fingerprintId},"${entry.hash}",${entry.contentType},${entry.category},${entry.status},${entry.timestamp},${entry.variants || 1},${entry.matchCount || 0},${entry.platform || 'Unknown'}`
      ).join('\n');
      
      const csvContent = csvHeaders + csvRows;
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `fingerprint-registry-${Date.now()}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      
      toast.success(`Database exported successfully! (${registryEntries.length} entries)`);
    } catch (error) {
      console.error('Export error:', error);
      toast.error('Failed to export database');
    }
  };

  const handleFormSubmit = async () => {
    try {
      setSubmitting(true);
      
      // Validate inputs
      if (!uploadedFile && !manualHash) {
        toast.error('Please upload a file or enter a hash manually');
        return;
      }
      
      let hashToSubmit = manualHash;
      
      // If file is uploaded, hash it using Web Crypto API
      if (uploadedFile) {
        toast.info('Hashing file...');
        hashToSubmit = await hashFile(uploadedFile);
        toast.success('File hashed successfully!');
      }
      
      // Generate fingerprint ID
      const existingIds = registryEntries.map(e => e.fingerprintId);
      const fingerprintId = generateFingerprintId(existingIds);
      
      // Create new entry
      const newEntry = {
        fingerprintId,
        hash: hashToSubmit,
        contentType: selectedType,
        category: selectedCategory,
        timestamp: new Date().toISOString(),
        status: 'MONITORING',
        platform: 'Unknown',
        variants: 1,
        matchCount: 0
      };
      
      // Add to registry
      const updatedEntries = [newEntry, ...registryEntries];
      setRegistryEntries(updatedEntries);
      
      toast.success(`Fingerprint ${fingerprintId} submitted successfully!`);
      
      // Clear form
      setManualHash('');
      setUploadedFile(null);
      setSelectedCategory('Political Misinformation');
      setSelectedType('VIDEO_DEEPFAKE');
      
    } catch (error) {
      console.error('Submit error:', error);
      toast.error('Failed to submit fingerprint');
    } finally {
      setSubmitting(false);
    }
  };

  const stats = {
    totalFingerprints: registryEntries.length,
    activeThreats: registryEntries.filter(e => e.status === 'ACTIVE_THREAT').length,
    containedThreats: registryEntries.filter(e => e.status === 'CONTAINED').length,
    neutralizedThreats: registryEntries.filter(e => e.status === 'NEUTRALIZED').length,
    avgMatchTime: '0.03s',
    todayMatches: registryEntries.reduce((sum, e) => sum + (e.matchCount || 0), 0)
  };

  const filteredEntries = registryEntries.filter(entry => {
    const matchesSearch = 
      entry.fingerprintId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.hash?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.category?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = filterStatus === 'ALL' || entry.status === filterStatus;
    
    const matchesType = filterType === 'ALL' || entry.contentType === filterType;
    
    const matchesTimeRange = filterTimeRange === 'all' || 
      (filterTimeRange === '24h' && new Date(entry.timestamp).getTime() > Date.now() - 24 * 60 * 60 * 1000) ||
      (filterTimeRange === '7d' && new Date(entry.timestamp).getTime() > Date.now() - 7 * 24 * 60 * 60 * 1000) ||
      (filterTimeRange === '30d' && new Date(entry.timestamp).getTime() > Date.now() - 30 * 24 * 60 * 60 * 1000);
    
    return matchesSearch && matchesFilter && matchesType && matchesTimeRange;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">National Deepfake Fingerprint Registry</h2>
          <p className="text-gray-400">Cryptographic hashes and signatures of detected deepfakes</p>
        </div>
        <button 
          onClick={handleExportDatabase}
          className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-all flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          Export Database
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-6 gap-4">
        {[
          { label: 'Total Fingerprints', value: stats.totalFingerprints.toLocaleString(), icon: Database, color: 'blue' },
          { label: 'Active Threats', value: stats.activeThreats, icon: XCircle, color: 'red' },
          { label: 'Contained', value: stats.containedThreats, icon: Clock, color: 'yellow' },
          { label: 'Neutralized', value: stats.neutralizedThreats, icon: CheckCircle, color: 'green' },
          { label: 'Avg Match Time', value: stats.avgMatchTime, icon: Hash, color: 'purple' },
          { label: 'Today\'s Matches', value: stats.todayMatches, icon: FileType, color: 'cyan' },
        ].map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-slate-800/50 border border-slate-700 rounded-lg p-4"
            >
              <div className="flex items-center gap-2 mb-2">
                <Icon className={`w-4 h-4 text-${stat.color}-500`} />
                <span className="text-xs text-gray-400">{stat.label}</span>
              </div>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
            </motion.div>
          );
        })}
      </div>

      {/* Search and Filters */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6">
            <label className="block text-sm text-gray-400 mb-2">Search by Hash, ID, or Category</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter SHA-256 hash or fingerprint ID..."
                className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:border-blue-500 outline-none"
              />
            </div>
          </div>
          <div className="col-span-2">
            <label className="block text-sm text-gray-400 mb-2">Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white"
            >
              <option value="ALL">All Statuses</option>
              <option value="ACTIVE_THREAT">Active Threat</option>
              <option value="CONTAINED">Contained</option>
              <option value="MONITORING">Monitoring</option>
              <option value="NEUTRALIZED">Neutralized</option>
            </select>
          </div>
          <div className="col-span-2">
            <label className="block text-sm text-gray-400 mb-2">Content Type</label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white"
            >
              <option value="ALL">All Types</option>
              <option value="VIDEO_DEEPFAKE">Video Deepfake</option>
              <option value="AUDIO_CLONE">Audio Clone</option>
              <option value="IMAGE_MANIPULATION">Image Manipulation</option>
              <option value="AI_TEXT">AI Text</option>
            </select>
          </div>
          <div className="col-span-2">
            <label className="block text-sm text-gray-400 mb-2">Time Range</label>
            <select
              value={filterTimeRange}
              onChange={(e) => setFilterTimeRange(e.target.value)}
              className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white"
            >
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="all">All Time</option>
            </select>
          </div>
        </div>
      </div>

      {/* Registry Entries */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl">
        <div className="p-6 border-b border-slate-700">
          <h3 className="text-lg font-bold text-white">Registry Entries</h3>
        </div>
        {filteredEntries.length === 0 ? (
          <div className="p-12 text-center">
            <Database className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h4 className="text-xl font-bold text-gray-400 mb-2">No fingerprint entries registered yet</h4>
            <p className="text-gray-500">Upload a file or enter a hash manually to create your first fingerprint entry.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-700">
            {filteredEntries.map((entry, idx) => (
              <motion.div
                key={entry.fingerprintId}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="p-6 hover:bg-slate-700/30 cursor-pointer transition-all"
              >
                <div className="flex items-start gap-6">
                  <div className={`flex-shrink-0 w-16 h-16 rounded-xl flex items-center justify-center ${
                    entry.status === 'ACTIVE_THREAT' ? 'bg-red-500/20 border-2 border-red-500' :
                    entry.status === 'CONTAINED' ? 'bg-yellow-500/20 border-2 border-yellow-500' :
                    entry.status === 'MONITORING' ? 'bg-blue-500/20 border-2 border-blue-500' :
                    'bg-green-500/20 border-2 border-green-500'
                  }`}>
                    {entry.status === 'ACTIVE_THREAT' ? <XCircle className="w-8 h-8 text-red-500" /> :
                     entry.status === 'CONTAINED' ? <Clock className="w-8 h-8 text-yellow-500" /> :
                     entry.status === 'MONITORING' ? <Hash className="w-8 h-8 text-blue-500" /> :
                     <CheckCircle className="w-8 h-8 text-green-500" />}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-mono text-sm text-gray-400">{entry.fingerprintId}</span>
                      <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                        entry.status === 'ACTIVE_THREAT' ? 'bg-red-500 text-white' :
                        entry.status === 'CONTAINED' ? 'bg-yellow-500 text-black' :
                        entry.status === 'MONITORING' ? 'bg-blue-500 text-white' :
                        'bg-green-500 text-white'
                      }`}>
                        {entry.status.replace('_', ' ')}
                      </span>
                      <span className="px-2 py-1 bg-slate-700 text-gray-300 text-xs rounded">
                        {entry.contentType.replace('_', ' ')}
                      </span>
                    </div>

                    <div className="mb-3">
                      <div className="text-xs text-gray-500 mb-1">SHA-256 Hash</div>
                      <div className="font-mono text-sm text-white bg-slate-900/50 p-2 rounded border border-slate-700 break-all">
                        {entry.hash}
                      </div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 text-sm">
                      <div>
                        <div className="text-gray-400 text-xs mb-1">Submitted</div>
                        <div className="text-white">{new Date(entry.timestamp).toLocaleDateString()}</div>
                        <div className="text-gray-500 text-xs">{new Date(entry.timestamp).toLocaleTimeString()}</div>
                      </div>
                      <div>
                        <div className="text-gray-400 text-xs mb-1">Variants Found</div>
                        <div className="text-white font-bold">{entry.variants || 1}</div>
                      </div>
                      <div>
                        <div className="text-gray-400 text-xs mb-1">Total Matches</div>
                        <div className="text-white font-bold">{entry.matchCount || 0}</div>
                      </div>
                      <div>
                        <div className="text-gray-400 text-xs mb-1">Platform</div>
                        <div className="text-white">{entry.platform || 'Unknown'}</div>
                      </div>
                      <div>
                        <div className="text-gray-400 text-xs mb-1">Category</div>
                        <div className="text-white text-xs">{entry.category}</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex-shrink-0 flex flex-col gap-2">
                    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-all">
                      View Details
                    </button>
                    <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm font-medium transition-all">
                      Export
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Fingerprint Submission */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
        <h3 className="text-lg font-bold text-white mb-4">Submit New Fingerprint</h3>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Upload File for Hashing</label>
            <input
              type="file"
              id="file-upload"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setUploadedFile(file);
                  toast.success(`File "${file.name}" selected`);
                }
              }}
            />
            <div
              className="border-2 border-dashed border-slate-600 rounded-lg p-8 text-center hover:border-blue-500 cursor-pointer transition-all"
              onClick={() => document.getElementById('file-upload')?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const file = e.dataTransfer.files[0];
                if (file) {
                  setUploadedFile(file);
                  toast.success(`File "${file.name}" selected`);
                }
              }}
            >
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              {uploadedFile ? (
                <>
                  <div className="text-white mb-1 font-medium">{uploadedFile.name}</div>
                  <div className="text-xs text-gray-500">{(uploadedFile.size / 1024).toFixed(2)} KB</div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setUploadedFile(null);
                      toast.info('File removed');
                    }}
                    className="mt-2 text-xs text-red-400 hover:text-red-300"
                  >
                    Remove file
                  </button>
                </>
              ) : (
                <>
                  <div className="text-white mb-1">Drop file here or click to upload</div>
                  <div className="text-xs text-gray-500">Supports video, audio, image, and text files</div>
                </>
              )}
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Or Enter Hash Manually</label>
            <input
              type="text"
              value={manualHash}
              onChange={(e) => setManualHash(e.target.value)}
              placeholder="sha256:..."
              className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-gray-500 font-mono mb-4"
            />
            <label className="block text-sm text-gray-400 mb-2">Content Type</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white mb-4"
            >
              <option value="VIDEO_DEEPFAKE">Video Deepfake</option>
              <option value="AUDIO_CLONE">Audio Clone</option>
              <option value="IMAGE_MANIPULATION">Image Manipulation</option>
              <option value="AI_TEXT">AI Text</option>
            </select>
            <label className="block text-sm text-gray-400 mb-2">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white mb-4"
            >
              <option>Political Misinformation</option>
              <option>Celebrity Impersonation</option>
              <option>Financial Fraud</option>
              <option>Audio Synthesis</option>
              <option>Event Manipulation</option>
            </select>
            <button
              onClick={handleFormSubmit}
              className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-all"
              disabled={submitting}
            >
              {submitting ? 'Submitting...' : 'Submit to Registry'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}