import React, { useState } from 'react';
import {
  ChevronLeft,
  Search,
  MoreVertical,
  Music2,
  Trash2,
  Share2,
  ExternalLink,
  X,
  FileText,
  Play,
  Check,
} from 'lucide-react';
import { DownloadItem } from '../../../types/browser';
import { PdfViewerModal } from './PdfViewerModal';

export interface RecentFileItem {
  id: string;
  name: string;
  type: 'pdf' | 'audio' | 'video' | 'image' | 'doc';
  openedDate: string;
  size?: string;
  url?: string;
}

interface RecentFilesScreenProps {
  isOpen: boolean;
  onBack: () => void;
  recentFiles?: RecentFileItem[];
  downloads?: DownloadItem[];
  onOpenFile?: (fileName: string, url?: string) => void;
}

const DEFAULT_RECENT_FILES: RecentFileItem[] = [
  {
    id: 'rec-1',
    name: 'translated_page_1790754651723.pdf',
    type: 'pdf',
    openedDate: 'Opened on Sep 30',
    size: '1.2 MB',
  },
  {
    id: 'rec-2',
    name: 'hi-GoogleSearch_1790586471874.pdf',
    type: 'pdf',
    openedDate: 'Opened on Sep 28',
    size: '850 KB',
  },
  {
    id: 'rec-3',
    name: 'AUD-20260706-WA0001.m4a',
    type: 'audio',
    openedDate: 'Opened on Sep 27',
    size: '3.4 MB',
  },
];

export const RecentFilesScreen: React.FC<RecentFilesScreenProps> = ({
  isOpen,
  onBack,
  recentFiles = DEFAULT_RECENT_FILES,
  downloads = [],
  onOpenFile,
}) => {
  const [files, setFiles] = useState<RecentFileItem[]>(() => {
    try {
      const saved = localStorage.getItem('lemon_recent_files');
      if (saved) return JSON.parse(saved);
    } catch {}
    return DEFAULT_RECENT_FILES;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [selectedPdfFile, setSelectedPdfFile] = useState<RecentFileItem | null>(null);

  if (!isOpen) return null;

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2000);
  };

  const handleDeleteFile = (id: string) => {
    const updated = files.filter((f) => f.id !== id);
    setFiles(updated);
    try {
      localStorage.setItem('lemon_recent_files', JSON.stringify(updated));
    } catch {}
    setActiveMenuId(null);
    showToast('Removed from recent files');
  };

  const filteredFiles = files.filter((f) =>
    f.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderIcon = (type: RecentFileItem['type']) => {
    switch (type) {
      case 'pdf':
        return (
          <div className="w-12 h-12 rounded-2xl bg-[#E53935] text-white flex flex-col items-center justify-center p-1 shadow-xs shrink-0 select-none">
            <span className="text-[11px] font-black tracking-tight leading-none">PDF</span>
            <div className="w-6 h-0.5 bg-white/90 rounded-full mt-1.5" />
            <div className="w-4 h-0.5 bg-white/70 rounded-full mt-0.75" />
          </div>
        );
      case 'audio':
        return (
          <div className="w-12 h-12 rounded-2xl bg-[#FF3B62] text-white flex items-center justify-center shadow-xs shrink-0 select-none">
            <Music2 className="w-6 h-6 fill-current stroke-[1.5]" />
          </div>
        );
      case 'video':
        return (
          <div className="w-12 h-12 rounded-2xl bg-[#8A3FFC] text-white flex items-center justify-center shadow-xs shrink-0 select-none">
            <Play className="w-6 h-6 fill-current" />
          </div>
        );
      default:
        return (
          <div className="w-12 h-12 rounded-2xl bg-[#0088FF] text-white flex items-center justify-center shadow-xs shrink-0 select-none">
            <FileText className="w-6 h-6" />
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#F3ECE2] text-[#1F1D1A] flex flex-col font-sans select-none animate-in fade-in duration-150 overflow-hidden">
      {/* 1. Android Status Bar (Matching Reference Palette) */}
      <div className="w-full h-8 px-6 pt-1 flex items-center justify-between text-[#1F1D1A] text-xs font-semibold shrink-0 bg-[#F3ECE2]">
        <div className="flex items-center gap-2">
          <span className="text-[13px] font-bold tracking-tight">19:02</span>
          <div className="w-1.5 h-1.5 rounded-full bg-[#E53935]" />
          <div className="w-3 h-3 rounded-full bg-emerald-500 flex items-center justify-center text-[7px] text-white">
            <svg viewBox="0 0 24 24" className="w-2 h-2 fill-current">
              <path d="M12 2C6.48 2 2 6.48 2 12c0 1.89.52 3.66 1.44 5.17L2 22l4.98-1.35A9.96 9.96 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2z" />
            </svg>
          </div>
          <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
        </div>

        <div className="flex items-center gap-1.5 text-[#1F1D1A]">
          <div className="flex items-end gap-0.5 h-3">
            <div className="w-0.5 h-1 bg-[#1F1D1A] rounded-xs" />
            <div className="w-0.5 h-1.5 bg-[#1F1D1A] rounded-xs" />
            <div className="w-0.5 h-2 bg-[#1F1D1A] rounded-xs" />
            <div className="w-0.5 h-2.5 bg-[#1F1D1A] rounded-xs" />
          </div>
          <svg className="w-3.5 h-3.5 fill-[#1F1D1A]" viewBox="0 0 24 24">
            <path d="M12 4C7.31 4 3.07 5.9 0 8.98L12 21 24 8.98C20.93 5.9 16.69 4 12 4z" />
          </svg>
          <div className="flex items-center border border-[#6B645D] rounded-md px-1 py-0.2 text-[9px] font-bold font-mono ml-0.5 bg-white/60">
            <span>17</span>
          </div>
        </div>
      </div>

      {/* 2. Top Header (Back arrow < | Centered "Recent" | Search 🔍 | 3-dots ⋮) */}
      <div className="w-full px-4 py-3 flex items-center justify-between shrink-0 bg-[#F3ECE2] border-b border-[#E5DFD5]">
        <button
          onClick={onBack}
          className="p-1.5 -ml-1 text-[#1F1D1A] hover:text-black rounded-full hover:bg-black/5 active:scale-95 transition-transform"
          title="Back to Tools"
        >
          <ChevronLeft className="w-6 h-6 stroke-[2.2]" />
        </button>

        <h1 className="text-lg font-bold tracking-tight text-[#1F1D1A]">
          Recent
        </h1>

        <div className="flex items-center gap-2 text-[#1F1D1A]">
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="p-1.5 rounded-full hover:bg-black/5 active:scale-95 transition-transform"
            title="Search recent files"
          >
            <Search className="w-5 h-5 stroke-[2]" />
          </button>
          <button
            onClick={() => {
              if (window.confirm('Clear all recent files history?')) {
                setFiles([]);
                localStorage.removeItem('lemon_recent_files');
                showToast('Recent files cleared');
              }
            }}
            className="p-1.5 rounded-full hover:bg-black/5 active:scale-95 transition-transform"
            title="Options"
          >
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Search Bar Input (toggled on search click) */}
      {isSearchOpen && (
        <div className="px-4 py-2 border-b border-[#E5DFD5] bg-[#FAF7F2] flex items-center gap-2 animate-in fade-in duration-100">
          <Search className="w-4 h-4 text-[#6B645D]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search recent files..."
            className="w-full bg-transparent text-xs text-[#1F1D1A] outline-none"
            autoFocus
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="p-1 text-[#6B645D]">
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      )}

      {/* Notification Toast */}
      {toastMsg && (
        <div className="mx-4 mt-2 p-2.5 bg-[#1F1D1A]/90 backdrop-blur-md text-white text-xs font-semibold rounded-2xl text-center shadow-lg animate-in fade-in duration-150">
          {toastMsg}
        </div>
      )}

      {/* 3. List of Recent Files (Matches Exact Screenshot inside themed card) */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="bg-white rounded-[24px] border border-[#E5DFD5] shadow-xs px-4 py-2 divide-y divide-[#F0EAE0]">
          {filteredFiles.map((file) => (
            <div
              key={file.id}
              onClick={() => {
                if (file.type === 'pdf' || file.name.toLowerCase().endsWith('.pdf')) {
                  setSelectedPdfFile(file);
                } else {
                  onOpenFile?.(file.name, file.url);
                }
              }}
              className="py-3.5 flex items-center justify-between gap-3 group hover:bg-[#FAF7F2] -mx-2 px-2 rounded-2xl transition-colors cursor-pointer relative"
            >
              <div className="flex items-center gap-3.5 min-w-0 flex-1">
                {/* File Icon */}
                {renderIcon(file.type)}

                {/* File Name & Subtitle */}
                <div className="min-w-0 flex-1 pr-2">
                  <h3 className="text-sm font-semibold text-[#1F1D1A] leading-snug break-all line-clamp-2">
                    {file.name}
                  </h3>
                  <span className="text-xs text-[#6B645D] block mt-0.5">
                    {file.openedDate}
                  </span>
                </div>
              </div>

              {/* 3-dots Menu Button */}
              <div className="relative">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveMenuId(activeMenuId === file.id ? null : file.id);
                  }}
                  className="p-2 text-[#6B645D] hover:text-[#1F1D1A] rounded-full hover:bg-black/5 transition-colors"
                  title="Options"
                >
                  <MoreVertical className="w-5 h-5" />
                </button>

                {/* Popover Menu */}
                {activeMenuId === file.id && (
                  <>
                    <div
                      className="fixed inset-0 z-30"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveMenuId(null);
                      }}
                    />
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="absolute right-0 top-10 w-44 bg-white rounded-2xl shadow-xl border border-[#E5DFD5] p-1.5 z-40 animate-in zoom-in-95 duration-100"
                    >
                      <button
                        onClick={() => {
                          setActiveMenuId(null);
                          onOpenFile?.(file.name, file.url);
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-neutral-700 hover:bg-neutral-100 rounded-xl text-left"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Open File</span>
                      </button>
                      <button
                        onClick={() => {
                          setActiveMenuId(null);
                          showToast(`Link copied: ${file.name}`);
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-neutral-700 hover:bg-neutral-100 rounded-xl text-left"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                        <span>Share</span>
                      </button>
                      <button
                        onClick={() => handleDeleteFile(file.id)}
                        className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-[#E53935] hover:bg-rose-50 rounded-xl text-left border-t border-[#F0EAE0] mt-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete from Recent</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}

          {filteredFiles.length === 0 && (
            <div className="py-16 text-center text-[#6B645D] text-xs">
              No recent files found.
            </div>
          )}
        </div>
      </div>

      {/* 4. Android Bottom 3-Button Navigation Bar (|||  ▢  ◁) */}
      <div className="w-full h-11 bg-[#F3ECE2] border-t border-[#E5DFD5] flex items-center justify-around text-[#6B645D] select-none shrink-0 px-8">
        <button onClick={onBack} className="p-2 hover:text-[#1F1D1A] active:scale-90" title="Recent Apps">
          <div className="flex items-center gap-[3px]">
            <div className="w-[2px] h-3.5 bg-[#6B645D] rounded-full" />
            <div className="w-[2px] h-3.5 bg-[#6B645D] rounded-full" />
            <div className="w-[2px] h-3.5 bg-[#6B645D] rounded-full" />
          </div>
        </button>
        <button onClick={onBack} className="p-2 hover:text-[#1F1D1A] active:scale-90" title="Home">
          <div className="w-3.5 h-3.5 border-2 border-[#6B645D] rounded-[4px]" />
        </button>
        <button onClick={onBack} className="p-2 hover:text-[#1F1D1A] active:scale-90" title="Back">
          <svg className="w-4 h-4 fill-[#6B645D]" viewBox="0 0 24 24">
            <polygon points="18,5 6,12 18,19" />
          </svg>
        </button>
      </div>

      {/* 5. Exact PDF Viewer Modal */}
      <PdfViewerModal
        isOpen={!!selectedPdfFile}
        onClose={() => setSelectedPdfFile(null)}
        title={selectedPdfFile?.name}
      />
    </div>
  );
};
