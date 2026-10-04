import React, { useState } from 'react';
import {
  X,
  Download,
  Plus,
  Search,
  HardDrive,
  Trash2,
  Play,
  Pause,
  RotateCw,
  ExternalLink,
  FileText,
  Image,
  Code2,
  Music,
  Archive,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  ArrowDown,
} from 'lucide-react';
import { DownloadItem, DownloadCategory } from '../../../types/browser';
import { formatBytes } from '../../../utils/downloadHelper';

interface DownloadManagerDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  downloads: DownloadItem[];
  onOpenNewDownload: () => void;
  onPauseDownload: (id: string) => void;
  onResumeDownload: (id: string) => void;
  onCancelDownload: (id: string) => void;
  onDeleteDownload: (id: string) => void;
  onClearCompleted: () => void;
  onPreviewFile: (item: DownloadItem) => void;
  onSaveToDevice: (item: DownloadItem) => void;
}

export const DownloadManagerDrawer: React.FC<DownloadManagerDrawerProps> = ({
  isOpen,
  onClose,
  downloads,
  onOpenNewDownload,
  onPauseDownload,
  onResumeDownload,
  onCancelDownload,
  onDeleteDownload,
  onClearCompleted,
  onPreviewFile,
  onSaveToDevice,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'downloading' | 'completed' | 'docs' | 'images' | 'media' | 'code'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const activeDownloading = downloads.filter((d) => d.status === 'downloading' || d.status === 'paused');
  const completedDownloads = downloads.filter((d) => d.status === 'completed');

  // Filter list
  const filteredDownloads = downloads.filter((d) => {
    // Search match
    if (searchQuery.trim() && !d.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    if (activeTab === 'downloading') {
      return d.status === 'downloading' || d.status === 'paused';
    }
    if (activeTab === 'completed') {
      return d.status === 'completed';
    }
    if (activeTab === 'docs') {
      return d.category === 'document' || d.name.match(/\.(pdf|doc|docx|txt|md)$/i);
    }
    if (activeTab === 'images') {
      return d.category === 'image' || d.name.match(/\.(png|jpg|jpeg|svg|webp)$/i);
    }
    if (activeTab === 'media') {
      return d.category === 'media' || d.name.match(/\.(mp3|wav|mp4|webm)$/i);
    }
    if (activeTab === 'code') {
      return d.category === 'code' || d.category === 'archive' || d.name.match(/\.(html|js|json|zip|apk)$/i);
    }

    return true;
  });

  const getCategoryIcon = (item: DownloadItem) => {
    if (item.category === 'image' || item.name.match(/\.(png|jpg|jpeg|svg|webp)$/i)) {
      return <Image className="w-5 h-5 text-emerald-500" />;
    }
    if (item.category === 'media' || item.name.match(/\.(mp3|wav|mp4)$/i)) {
      return <Music className="w-5 h-5 text-rose-500" />;
    }
    if (item.category === 'code' || item.name.match(/\.(html|js|json|ts)$/i)) {
      return <Code2 className="w-5 h-5 text-blue-500" />;
    }
    if (item.category === 'archive' || item.name.match(/\.(zip|apk|rar)$/i)) {
      return <Archive className="w-5 h-5 text-purple-500" />;
    }
    return <FileText className="w-5 h-5 text-amber-500" />;
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-end justify-center p-0 select-none">
      <div className="bg-white text-neutral-900 rounded-t-3xl max-w-md w-full p-5 shadow-2xl flex flex-col max-h-[90vh] border-t border-neutral-100">
        <div className="w-10 h-1 bg-neutral-300 rounded-full mx-auto mb-3" />

        {/* Top Header */}
        <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-400 text-neutral-950 flex items-center justify-center font-bold shadow-xs">
              <ArrowDown className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base text-neutral-900 leading-tight">Download Manager</h3>
              <p className="text-[11px] text-neutral-500">
                {activeDownloading.length > 0 ? `${activeDownloading.length} downloading` : 'All tasks completed'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenNewDownload}
              className="px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs font-semibold flex items-center gap-1 shadow-sm active:scale-95 transition-transform"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New</span>
            </button>

            <button onClick={onClose} className="p-1.5 text-neutral-400 hover:text-neutral-700 rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search & Storage Meter */}
        <div className="my-3 space-y-2.5">
          {/* Search bar */}
          <div className="flex items-center gap-2 bg-neutral-100/80 rounded-xl px-3 py-2 border border-transparent focus-within:border-neutral-300 focus-within:bg-white transition-all">
            <Search className="w-4 h-4 text-neutral-400 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search downloads by name..."
              className="w-full bg-transparent text-xs text-neutral-800 outline-none"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="text-neutral-400 hover:text-neutral-700 text-xs">
                ✕
              </button>
            )}
          </div>

          {/* Internal Storage Widget */}
          <div className="p-2.5 bg-neutral-50 rounded-xl border border-neutral-200/80 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <HardDrive className="w-3.5 h-3.5 text-neutral-500" />
              <span className="font-semibold text-neutral-700 text-[11px]">Storage:</span>
              <div className="w-24 h-1.5 bg-neutral-200 rounded-full overflow-hidden flex">
                <div className="w-1/3 bg-amber-400" />
                <div className="w-1/6 bg-blue-500" />
              </div>
            </div>
            <span className="text-[11px] font-mono text-neutral-500">22.8 MB / 64 GB</span>
          </div>
        </div>

        {/* Tabs Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-2 mb-1 text-xs border-b border-neutral-100">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 rounded-full font-medium transition-colors shrink-0 ${
              activeTab === 'all' ? 'bg-neutral-900 text-white' : 'bg-neutral-100 text-neutral-600'
            }`}
          >
            All ({downloads.length})
          </button>

          {activeDownloading.length > 0 && (
            <button
              onClick={() => setActiveTab('downloading')}
              className={`px-3 py-1.5 rounded-full font-semibold transition-colors shrink-0 flex items-center gap-1.5 ${
                activeTab === 'downloading' ? 'bg-amber-400 text-neutral-950 shadow-sm' : 'bg-amber-100 text-amber-800'
              }`}
            >
              <RotateCw className="w-3 h-3 animate-spin" />
              <span>Downloading ({activeDownloading.length})</span>
            </button>
          )}

          <button
            onClick={() => setActiveTab('completed')}
            className={`px-3 py-1.5 rounded-full font-medium transition-colors shrink-0 ${
              activeTab === 'completed' ? 'bg-neutral-900 text-white' : 'bg-neutral-100 text-neutral-600'
            }`}
          >
            Completed ({completedDownloads.length})
          </button>

          <button
            onClick={() => setActiveTab('docs')}
            className={`px-3 py-1.5 rounded-full font-medium transition-colors shrink-0 ${
              activeTab === 'docs' ? 'bg-neutral-900 text-white' : 'bg-neutral-100 text-neutral-600'
            }`}
          >
            Documents
          </button>

          <button
            onClick={() => setActiveTab('images')}
            className={`px-3 py-1.5 rounded-full font-medium transition-colors shrink-0 ${
              activeTab === 'images' ? 'bg-neutral-900 text-white' : 'bg-neutral-100 text-neutral-600'
            }`}
          >
            Images
          </button>

          <button
            onClick={() => setActiveTab('media')}
            className={`px-3 py-1.5 rounded-full font-medium transition-colors shrink-0 ${
              activeTab === 'media' ? 'bg-neutral-900 text-white' : 'bg-neutral-100 text-neutral-600'
            }`}
          >
            Media
          </button>

          <button
            onClick={() => setActiveTab('code')}
            className={`px-3 py-1.5 rounded-full font-medium transition-colors shrink-0 ${
              activeTab === 'code' ? 'bg-neutral-900 text-white' : 'bg-neutral-100 text-neutral-600'
            }`}
          >
            Code / APK
          </button>
        </div>

        {/* Downloads Scrollable List */}
        <div className="flex-1 overflow-y-auto space-y-2.5 py-2">
          {filteredDownloads.length === 0 ? (
            <div className="py-12 flex flex-col items-center justify-center text-center text-neutral-400 gap-2">
              <div className="w-12 h-12 rounded-2xl bg-neutral-100 flex items-center justify-center text-neutral-400">
                <Download className="w-6 h-6" />
              </div>
              <h4 className="text-xs font-semibold text-neutral-600">No downloads found</h4>
              <p className="text-[11px] text-neutral-400 max-w-xs leading-relaxed">
                Tap "+ New" above to download an Android APK, documentation PDF, or sample wallpaper.
              </p>
              <button
                onClick={onOpenNewDownload}
                className="mt-2 px-4 py-2 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs rounded-xl shadow-sm transition-transform active:scale-95"
              >
                Start a Download
              </button>
            </div>
          ) : (
            filteredDownloads.map((item) => {
              const isDownloading = item.status === 'downloading';
              const isPaused = item.status === 'paused';
              const isFailed = item.status === 'failed';
              const isCompleted = item.status === 'completed';

              return (
                <div
                  key={item.id}
                  className="p-3 bg-neutral-50 rounded-2xl border border-neutral-200/80 hover:border-neutral-300 transition-all flex flex-col gap-2 shadow-2xs"
                >
                  {/* Top Row: Icon, Filename, Actions */}
                  <div className="flex items-center justify-between gap-3">
                    <div
                      onClick={() => isCompleted && onPreviewFile(item)}
                      className={`flex items-center gap-3 min-w-0 flex-1 ${isCompleted ? 'cursor-pointer' : ''}`}
                    >
                      <div className="w-10 h-10 rounded-xl bg-white border border-neutral-200 flex items-center justify-center shrink-0 shadow-xs">
                        {getCategoryIcon(item)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-semibold text-neutral-900 truncate hover:text-amber-600 transition-colors">
                          {item.name}
                        </div>
                        <div className="text-[10px] text-neutral-500 flex items-center gap-1.5 mt-0.5 font-mono">
                          <span>{item.size}</span>
                          <span>·</span>
                          {isCompleted && (
                            <span className="text-emerald-600 font-sans font-medium flex items-center gap-0.5">
                              <CheckCircle2 className="w-3 h-3" />
                              Completed
                            </span>
                          )}
                          {isDownloading && (
                            <span className="text-blue-600 font-sans font-medium">
                              {item.speed || '1.8 MB/s'} · {item.progress}%
                            </span>
                          )}
                          {isPaused && (
                            <span className="text-amber-600 font-sans font-medium">
                              Paused ({item.progress}%)
                            </span>
                          )}
                          {isFailed && (
                            <span className="text-rose-600 font-sans font-medium flex items-center gap-0.5">
                              <AlertCircle className="w-3 h-3" />
                              Failed
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-1 shrink-0">
                      {isDownloading && (
                        <button
                          onClick={() => onPauseDownload(item.id)}
                          className="p-2 hover:bg-neutral-200 rounded-xl text-neutral-700 transition-colors"
                          title="Pause"
                        >
                          <Pause className="w-4 h-4 fill-current" />
                        </button>
                      )}

                      {isPaused && (
                        <button
                          onClick={() => onResumeDownload(item.id)}
                          className="p-2 hover:bg-amber-100 rounded-xl text-amber-700 transition-colors"
                          title="Resume"
                        >
                          <Play className="w-4 h-4 fill-current" />
                        </button>
                      )}

                      {(isDownloading || isPaused) && (
                        <button
                          onClick={() => onCancelDownload(item.id)}
                          className="p-2 hover:bg-rose-100 rounded-xl text-rose-600 transition-colors"
                          title="Cancel"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}

                      {isCompleted && (
                        <>
                          <button
                            onClick={() => onPreviewFile(item)}
                            className="px-2.5 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-[11px] font-semibold flex items-center gap-1 active:scale-95 transition-transform"
                          >
                            <span>Open</span>
                            <ExternalLink className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => onDeleteDownload(item.id)}
                            className="p-1.5 hover:bg-rose-100 rounded-xl text-neutral-400 hover:text-rose-600 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Progress Bar for Active Downloads */}
                  {(isDownloading || isPaused) && (
                    <div className="w-full">
                      <div className="w-full h-1.5 bg-neutral-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all duration-300 rounded-full ${
                            isPaused ? 'bg-amber-400' : 'bg-blue-600 animate-pulse'
                          }`}
                          style={{ width: `${Math.max(item.progress, 5)}%` }}
                        />
                      </div>
                      <div className="flex justify-between items-center text-[10px] text-neutral-400 mt-1 font-mono">
                        <span>{item.downloadedBytes ? formatBytes(item.downloadedBytes) : `${item.progress}%`}</span>
                        <span>{item.totalBytes ? formatBytes(item.totalBytes) : item.size}</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Footer: Stats & Batch Actions */}
        {completedDownloads.length > 0 && (
          <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs">
            <span className="text-neutral-500 font-medium">
              {completedDownloads.length} finished files
            </span>
            <button
              onClick={onClearCompleted}
              className="text-rose-500 hover:text-rose-700 font-semibold flex items-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Completed</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
