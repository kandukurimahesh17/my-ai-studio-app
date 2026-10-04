import React, { useState } from 'react';
import {
  Search,
  MoreVertical,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  Play,
  ArrowDown,
  Music2,
  FileText,
  Home,
  User,
  Wrench,
  Globe,
  Folder,
  Smartphone,
  FolderArchive,
  Image,
  Package,
  FileSpreadsheet,
  Clock,
  QrCode,
} from 'lucide-react';
import { RecentFilesScreen } from './RecentFilesScreen';
import { DocumentsScreen } from './DocumentsScreen';
import { FileManagerCategoryScreen } from './FileManagerCategoryScreen';
import { MeScreen } from './MeScreen';
import { PdfViewerModal } from './PdfViewerModal';

interface ToolsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenClean: () => void;
  onOpenKeyVault?: () => void;
  onOpenDevTools?: () => void;
  onOpenSettings?: () => void;
  onNavigate?: (url: string) => void;
  adBlockEnabled?: boolean;
  onToggleAdBlock?: () => void;
  darkReaderEnabled?: boolean;
  onToggleDarkReader?: () => void;
  onOpenStatusSaver?: () => void;
  onOpenDataSaver?: () => void;
  onOpenVideoDownloader?: () => void;
  onOpenFiles?: () => void;
  onOpenMusic?: () => void;
  onOpenScan?: () => void;
}

interface CategoryItem {
  id: string;
  name: string;
  count?: number | string;
  bgColor: string;
  renderIcon: () => React.ReactNode;
}

export const ToolsDrawer: React.FC<ToolsDrawerProps> = ({
  isOpen,
  onClose,
  onOpenClean,
  onOpenStatusSaver,
  onOpenFiles,
  onOpenMusic,
  onOpenSettings,
  onOpenScan,
}) => {
  const [isPlayingDemo, setIsPlayingDemo] = useState(false);
  // Default to expanded category grid as requested in the screenshot
  const [isGridExpanded, setIsGridExpanded] = useState(true);
  const [isJunkCleaned, setIsJunkCleaned] = useState(false);
  const [cleanFeedback, setCleanFeedback] = useState<string | null>(null);
  const [showRecentScreen, setShowRecentScreen] = useState(false);
  const [showDocumentsScreen, setShowDocumentsScreen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<{ id: string; title: string } | null>(null);
  const [showMeScreen, setShowMeScreen] = useState(false);
  const [activePdfViewer, setActivePdfViewer] = useState<{ name: string } | null>(null);

  // Quick-access recent files for File Manager drawer
  const quickRecentFiles = [
    {
      id: 'qrf-1',
      name: 'Financial_Quarterly_Statement_2026.pdf',
      type: 'pdf',
      date: 'Today, 14:20',
      size: '1.4 MB',
      badgeColor: 'bg-[#E53935]',
    },
    {
      id: 'qrf-2',
      name: 'AUD-20260706-WA0001.m4a',
      type: 'audio',
      date: 'Yesterday, 18:30',
      size: '3.4 MB',
      badgeColor: 'bg-[#FF3B62]',
    },
    {
      id: 'qrf-3',
      name: 'Project_Design_Brief_V2.docx',
      type: 'doc',
      date: 'Sep 29 2026',
      size: '520 KB',
      badgeColor: 'bg-[#185ABD]',
    },
    {
      id: 'qrf-4',
      name: 'Q4_Revenue_Projections.xlsx',
      type: 'excel',
      date: 'Sep 28 2026',
      size: '890 KB',
      badgeColor: 'bg-[#107C41]',
    },
  ];

  if (!isOpen) return null;

  const triggerCleanAction = (label: string, freedSize: string) => {
    setCleanFeedback(`Cleaning ${label}...`);
    setTimeout(() => {
      setCleanFeedback(`Freed ${freedSize} of storage! 🧹`);
      setTimeout(() => setCleanFeedback(null), 2500);
    }, 600);
  };

  // Full 12-item Category Grid exactly from the user's second screenshot
  const categories: CategoryItem[] = [
    {
      id: 'downloads',
      name: 'Downloads',
      count: 0,
      bgColor: 'bg-[#0088FF]',
      renderIcon: () => (
        <div className="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center">
          <ArrowDown className="w-3.5 h-3.5 stroke-[2.5]" />
        </div>
      ),
    },
    {
      id: 'music',
      name: 'Music',
      count: 2,
      bgColor: 'bg-[#FF3B62]',
      renderIcon: () => <Music2 className="w-6 h-6 fill-current stroke-[1.5]" />,
    },
    {
      id: 'videos',
      name: 'Videos',
      count: 6,
      bgColor: 'bg-[#8A3FFC]',
      renderIcon: () => <Play className="w-5 h-5 fill-current" />,
    },
    {
      id: 'documents',
      name: 'Documents',
      count: 119,
      bgColor: 'bg-[#FFB000]',
      renderIcon: () => (
        <div className="flex flex-col gap-1 items-center justify-center">
          <div className="w-5 h-0.75 bg-white rounded-full" />
          <div className="w-5 h-0.75 bg-white rounded-full" />
          <div className="w-3.5 h-0.75 bg-white rounded-full self-start ml-0.5" />
        </div>
      ),
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      count: 3619,
      bgColor: 'bg-[#25D366]',
      renderIcon: () => (
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12c0 1.89.52 3.66 1.44 5.17L2 22l4.98-1.35A9.96 9.96 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.64 0-3.18-.48-4.46-1.32l-.32-.2-2.96.8.8-2.91-.21-.33A7.95 7.95 0 0 1 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8-8 8z" />
        </svg>
      ),
    },
    {
      id: 'images',
      name: 'Images',
      count: 1839,
      bgColor: 'bg-[#00B4D8]',
      renderIcon: () => (
        <svg className="w-6 h-6 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
          <rect x="3" y="3" width="18" height="18" rx="4" />
          <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
          <polyline points="21 15 16 10 5 21" />
        </svg>
      ),
    },
    {
      id: 'apps',
      name: 'Apps',
      count: 1,
      bgColor: 'bg-[#3DDC84]',
      renderIcon: () => (
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path d="M6 18c0 .55.45 1 1 1h1v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h2v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h1c.55 0 1-.45 1-1V8H6v10zM3.5 8C2.67 8 2 8.67 2 9.5v7c0 .83.67 1.5 1.5 1.5S5 17.33 5 16.5v-7C5 8.67 4.33 8 3.5 8zm17 0c-.83 0-1.5.67-1.5 1.5v7c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-7c0-.83-.67-1.5-1.5-1.5zm-4.97-4.84l1.3-1.3c.2-.2.2-.51 0-.71-.2-.2-.51-.2-.71 0l-1.48 1.48C13.85 2.23 12.95 2 12 2c-.96 0-1.86.23-2.66.63L7.85 1.15c-.2-.2-.51-.2-.71 0-.2.2-.2.51 0 .71l1.31 1.31C6.97 4.26 6 6.01 6 8h12c0-1.99-.97-3.75-2.47-4.84zM10 5H9V4h1v1zm5 0h-1V4h1v1z" />
        </svg>
      ),
    },
    {
      id: 'zips',
      name: 'Zips',
      count: 1,
      bgColor: 'bg-[#FF9500]',
      renderIcon: () => (
        <div className="flex flex-col items-center">
          <div className="w-4 h-5 border-2 border-white rounded-[3px] flex flex-col items-center justify-between p-0.5">
            <div className="w-1.5 h-1 bg-white rounded-xs" />
            <div className="w-1.5 h-1 bg-white rounded-xs" />
            <div className="w-2 h-1.5 bg-white rounded-xs" />
          </div>
        </div>
      ),
    },
    {
      id: 'pages',
      name: 'Pages',
      count: 0,
      bgColor: 'bg-[#4361EE]',
      renderIcon: () => (
        <div className="w-6 h-6 flex items-center justify-center">
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <ellipse cx="12" cy="12" rx="9" ry="5" transform="rotate(-30 12 12)" fill="none" stroke="white" strokeWidth="2" />
            <circle cx="12" cy="12" r="4.5" fill="white" />
          </svg>
        </div>
      ),
    },
    {
      id: 'instagram',
      name: 'Instagram',
      count: 3,
      bgColor: 'bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF]',
      renderIcon: () => (
        <svg className="w-6 h-6 fill-none stroke-white stroke-2" viewBox="0 0 24 24">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      ),
    },
    {
      id: 'others',
      name: 'Others',
      count: 0,
      bgColor: 'bg-[#6C8EBF]',
      renderIcon: () => (
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
        </svg>
      ),
    },
    {
      id: 'storage',
      name: 'Storage',
      count: '',
      bgColor: 'bg-[#2F80ED]',
      renderIcon: () => <Smartphone className="w-5 h-5 stroke-[2]" />,
    },
  ];

  const displayedCategories = isGridExpanded ? categories : categories.slice(0, 4);

  return (
    <div className="fixed inset-0 z-50 bg-[#F3ECE2] text-[#1F1D1A] flex flex-col font-sans select-none animate-in fade-in duration-150 overflow-hidden">
      {/* 1. Android Status Bar (Matching Reference Palette) */}
      <div className="w-full h-8 px-6 pt-1 flex items-center justify-between text-[#1F1D1A] text-xs font-semibold shrink-0 bg-[#F3ECE2]">
        <div className="flex items-center gap-2">
          <span className="text-[13px] font-bold tracking-tight">19:02</span>
          {/* Status bar mini indicators with theme red dot */}
          <div className="w-1.5 h-1.5 rounded-full bg-[#E53935]" />
          <div className="w-3 h-3 rounded-full bg-emerald-500 flex items-center justify-center text-[7px] text-white">
            <svg viewBox="0 0 24 24" className="w-2 h-2 fill-current">
              <path d="M12 2C6.48 2 2 6.48 2 12c0 1.89.52 3.66 1.44 5.17L2 22l4.98-1.35A9.96 9.96 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2z" />
            </svg>
          </div>
          <div className="w-1.5 h-1.5 rounded-full bg-[#1A73E8]" />
        </div>

        <div className="flex items-center gap-1.5 text-[#1F1D1A]">
          {/* Cellular Signal & VoLTE */}
          <div className="flex items-end gap-0.5 h-3">
            <div className="w-0.5 h-1 bg-[#1F1D1A] rounded-xs" />
            <div className="w-0.5 h-1.5 bg-[#1F1D1A] rounded-xs" />
            <div className="w-0.5 h-2 bg-[#1F1D1A] rounded-xs" />
            <div className="w-0.5 h-2.5 bg-[#1F1D1A] rounded-xs" />
          </div>
          {/* Wi-Fi Icon */}
          <svg className="w-3.5 h-3.5 fill-[#1F1D1A]" viewBox="0 0 24 24">
            <path d="M12 4C7.31 4 3.07 5.9 0 8.98L12 21 24 8.98C20.93 5.9 16.69 4 12 4z" />
          </svg>
          {/* Battery [ 17 ] */}
          <div className="flex items-center border border-[#6B645D] rounded-md px-1 py-0.2 text-[9px] font-bold font-mono ml-0.5 bg-white/60">
            <span>17</span>
          </div>
        </div>
      </div>

      {/* 2. Screen Header: Bold "Tools" title, Search, 3-dots */}
      <div className="w-full px-5 py-3 flex items-center justify-between shrink-0 bg-[#F3ECE2]">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1F1D1A]">
            Tools
          </h1>
          <div className="w-2 h-2 rounded-full bg-[#E53935] animate-pulse" title="Active Updates" />
        </div>

        <div className="flex items-center gap-3 text-[#1F1D1A]">
          <button
            type="button"
            className="p-1 rounded-full hover:bg-black/5 active:scale-95 transition-transform"
            title="Search tools"
          >
            <Search className="w-5 h-5 stroke-[2]" />
          </button>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-full hover:bg-black/5 active:scale-95 transition-transform"
            title="More options"
          >
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* 3. Scrollable Cards Container */}
      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-3.5 scrollbar-none">
        {/* Clean Notification Toast */}
        {cleanFeedback && (
          <div className="p-3 bg-[#1F1D1A]/95 text-white text-xs font-semibold rounded-2xl text-center shadow-lg animate-in fade-in slide-in-from-top-2">
            {cleanFeedback}
          </div>
        )}

        {/* CARD 1: Status saver */}
        <div
          onClick={() => onOpenStatusSaver?.()}
          className="bg-white rounded-[24px] p-4 shadow-xs border border-[#E5DFD5] cursor-pointer hover:border-emerald-400 active:scale-[0.99] transition-all"
        >
          <div className="flex items-center justify-between mb-3.5">
            <h2 className="text-base font-bold text-[#1F1D1A]">Status saver</h2>
            <button
              onClick={() => onOpenStatusSaver?.()}
              className="text-xs text-[#6B645D] hover:text-[#1F1D1A] font-medium flex items-center gap-0.5"
            >
              <span>Manage</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full border-2 border-emerald-500 overflow-hidden bg-neutral-100 relative z-30 shadow-xs">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150"
                    alt="Status 1"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-10 h-10 rounded-full border-2 border-emerald-500 overflow-hidden bg-neutral-100 relative z-20 -ml-3 shadow-xs">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150"
                    alt="Status 2"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-10 h-10 rounded-full border-2 border-emerald-500 overflow-hidden bg-neutral-100 relative z-10 -ml-3 shadow-xs">
                  <img
                    src="https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=150"
                    alt="Status 3"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="text-sm">
                <span className="text-[#E53935] font-bold">3</span>{' '}
                <span className="text-[#1F1D1A] font-medium">unsaved</span>
              </div>
            </div>

            <button
              onClick={() => onOpenStatusSaver?.()}
              className="px-5 py-1.5 rounded-full border border-emerald-500 text-emerald-600 font-semibold text-xs hover:bg-emerald-50 active:scale-95 transition-all shadow-xs"
            >
              View
            </button>
          </div>
        </div>

        {/* CARD 2: Music */}
        <div className="bg-white rounded-[24px] p-4 shadow-xs border border-[#E5DFD5]">
          <div className="flex items-center justify-between mb-3.5">
            <h2 className="text-base font-bold text-[#1F1D1A]">Music</h2>
            <button
              onClick={() => onOpenMusic?.()}
              className="text-xs text-[#6B645D] hover:text-[#1F1D1A] font-medium flex items-center gap-0.5"
            >
              <span>All songs</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div
              onClick={() => setIsPlayingDemo(!isPlayingDemo)}
              className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#D8D2FA] via-[#C9BFF9] to-[#BAABF7] relative overflow-hidden flex flex-col justify-between p-2 shadow-xs cursor-pointer active:scale-95 transition-transform shrink-0"
            >
              <span className="text-[10px] text-white/95 font-semibold tracking-tight drop-shadow-xs">
                {isPlayingDemo ? 'Playing...' : 'Tap to play'}
              </span>

              <div className="absolute inset-0 m-auto w-12 h-12 flex items-center justify-center pointer-events-none">
                <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full border border-white/40 flex items-center justify-center">
                    <Music2 className="w-5 h-5 text-white/90 drop-shadow-xs" />
                  </div>
                </div>
              </div>

              <div className="self-end w-6 h-6 rounded-full bg-black/40 text-white flex items-center justify-center shadow-xs">
                <Play className="w-3 h-3 fill-current ml-0.5" />
              </div>
            </div>

            <div className="flex-1 flex items-center justify-between min-w-0 pr-1">
              <span className="text-sm font-semibold text-[#1F1D1A] truncate">
                AUD-20260706-WA0001
              </span>

              <button
                onClick={() => setIsPlayingDemo(!isPlayingDemo)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#1F1D1A] hover:bg-neutral-100 active:scale-90 transition-transform shrink-0"
                title="Play track"
              >
                <div className="w-6 h-6 rounded-full border-[1.5px] border-[#6B645D] flex items-center justify-center">
                  {isPlayingDemo ? (
                    <div className="w-2 h-2.5 bg-[#1F1D1A] rounded-xs" />
                  ) : (
                    <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
                  )}
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* CARD 3: File manager */}
        <div className="bg-white rounded-[24px] p-4 shadow-xs border border-[#E5DFD5]">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-neutral-900">File manager</h2>
            <button
              onClick={() => setShowRecentScreen(true)}
              className="text-xs text-neutral-400 hover:text-neutral-700 font-medium flex items-center gap-0.5"
            >
              <span>Recent</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 4-Column Category Icons Grid (Supports 4 or Full 12 Items from Screenshot 2) */}
          <div className="grid grid-cols-4 gap-y-4 gap-x-2 mb-3">
            {displayedCategories.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  if (item.id === 'documents') {
                    setShowDocumentsScreen(true);
                  } else {
                    setSelectedCategory({ id: item.id, title: item.name });
                  }
                }}
                className="flex flex-col items-center group active:scale-95 transition-transform"
              >
                <div
                  className={`w-12 h-12 rounded-2xl ${item.bgColor} text-white flex items-center justify-center shadow-xs mb-1.5 group-hover:scale-105 transition-transform`}
                >
                  {item.renderIcon()}
                </div>
                <span className="text-xs font-semibold text-neutral-800 text-center truncate max-w-[70px]">
                  {item.name}
                </span>
                {item.count !== '' && (
                  <span className="text-[11px] text-neutral-400 text-center">
                    {item.count}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Centered Chevron Toggle Button (Expands to 12 or collapses to 4) */}
          <div className="w-full flex justify-center py-0.5">
            <button
              onClick={() => setIsGridExpanded(!isGridExpanded)}
              className="text-neutral-400 hover:text-neutral-700 p-1 active:scale-90 transition-transform"
              title={isGridExpanded ? 'Collapse' : 'Show all categories'}
            >
              {isGridExpanded ? (
                <ChevronUp className="w-4 h-4 stroke-[2.5]" />
              ) : (
                <ChevronDown className="w-4 h-4 stroke-[2.5]" />
              )}
            </button>
          </div>

          {/* Quick-Access Recent Files Section */}
          <div className="mt-3 pt-3 border-t border-[#F0EAE0]">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs font-bold text-[#1F1D1A] flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#E53935]" />
                Recent Files
              </span>
              <button
                onClick={() => setShowRecentScreen(true)}
                className="text-[11px] font-semibold text-[#1A73E8] hover:underline flex items-center gap-0.5"
              >
                <span>View all</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>

            <div className="space-y-2">
              {quickRecentFiles.map((file) => (
                <div
                  key={file.id}
                  onClick={() => {
                    if (file.type === 'pdf') {
                      setActivePdfViewer({ name: file.name });
                    } else {
                      onOpenFiles?.();
                    }
                  }}
                  className="flex items-center justify-between p-2 rounded-xl hover:bg-[#FAF7F2] border border-[#F0EAE0] transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-2.5 min-w-0 flex-1">
                    <div
                      className={`w-8 h-8 rounded-lg ${file.badgeColor} text-white flex items-center justify-center shrink-0 shadow-xs font-black text-[9px]`}
                    >
                      {file.type === 'pdf' && 'PDF'}
                      {file.type === 'audio' && <Music2 className="w-4 h-4 fill-current stroke-[1.5]" />}
                      {file.type === 'doc' && <FileText className="w-4 h-4" />}
                      {file.type === 'excel' && <FileSpreadsheet className="w-4 h-4" />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="text-xs font-bold text-[#1F1D1A] truncate group-hover:text-[#1A73E8] transition-colors">
                        {file.name}
                      </h4>
                      <p className="text-[10px] text-[#8A8279] mt-0.5">
                        {file.date} · {file.size}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-[#8A8279] group-hover:text-[#1F1D1A] group-hover:translate-x-0.5 transition-all shrink-0 ml-1" />
                </div>
              ))}
            </div>
          </div>

          {/* Subcard: Junk files (8.2 KB junk files + Clean button) */}
          <div className="bg-[#EBEDF0] rounded-2xl p-3.5 flex items-center justify-between mt-2 border border-[#DFE3E8]">
            <div>
              <div className="text-sm font-bold">
                <span className="text-[#E53935]">8.2 KB</span>{' '}
                <span className="text-[#1F1D1A]">junk files</span>
              </div>
              <div className="text-xs text-[#6B645D] mt-0.5">
                {isJunkCleaned ? 'Storage clean and optimized' : 'Phone gets frozen by junk files'}
              </div>
            </div>

            <button
              onClick={() => {
                setIsJunkCleaned(true);
                onOpenClean();
              }}
              className="px-5 py-1.5 rounded-full border border-blue-500 text-blue-600 font-semibold text-xs hover:bg-blue-50 active:scale-95 transition-all shadow-xs"
            >
              {isJunkCleaned ? 'Cleaned' : 'Clean'}
            </button>
          </div>

          {/* Full List of 4 Cleanup Items from Screenshot 1 */}
          <div className="mt-4 space-y-4 pt-1">
            {/* 1. Clean web cache */}
            <div
              onClick={() => triggerCleanAction('web cache', '19.4 MB')}
              className="flex items-center justify-between cursor-pointer hover:bg-neutral-50 p-1 rounded-xl transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-neutral-800">
                  <svg className="w-5 h-5 fill-none stroke-current stroke-[1.8]" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="8" />
                    <ellipse cx="12" cy="12" rx="10" ry="3.5" transform="rotate(-25 12 12)" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-neutral-800">Clean web cache</span>
              </div>
              <div className="text-xs text-neutral-400 font-medium flex items-center gap-0.5">
                <span>19.4 MB</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* 2. Clean WhatsApp files */}
            <div
              onClick={() => triggerCleanAction('WhatsApp files', '1.4 GB')}
              className="flex items-center justify-between cursor-pointer hover:bg-neutral-50 p-1 rounded-xl transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-neutral-800">
                  <svg className="w-5 h-5 fill-none stroke-current stroke-[1.8]" viewBox="0 0 24 24">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-neutral-800">Clean WhatsApp files</span>
              </div>
              <div className="text-xs text-neutral-400 font-medium flex items-center gap-0.5">
                <span>1.4 GB</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* 3. Clean large files */}
            <div
              onClick={() => triggerCleanAction('large files', '141.7 MB')}
              className="flex items-center justify-between cursor-pointer hover:bg-neutral-50 p-1 rounded-xl transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-neutral-800">
                  <Folder className="w-5 h-5 stroke-[1.8]" />
                </div>
                <span className="text-sm font-medium text-neutral-800">Clean large files</span>
              </div>
              <div className="text-xs text-neutral-400 font-medium flex items-center gap-0.5">
                <span>141.7 MB</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* 4. Clean videos */}
            <div
              onClick={() => triggerCleanAction('video cache', '183.3 MB')}
              className="flex items-center justify-between cursor-pointer hover:bg-neutral-50 p-1 rounded-xl transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-neutral-800">
                  <div className="w-5 h-4 border-2 border-neutral-800 rounded-[3px] flex items-center justify-center">
                    <Play className="w-2 h-2 fill-neutral-800 ml-0.2" />
                  </div>
                </div>
                <span className="text-sm font-medium text-neutral-800">Clean videos</span>
              </div>
              <div className="text-xs text-neutral-400 font-medium flex items-center gap-0.5">
                <span>183.3 MB</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Bottom Navigation Bar matching Screenshot: Home | Tools (active) | Me */}
      <footer className="w-full h-15 bg-white border-t border-[#E5DFD5] px-6 flex items-center justify-around select-none shrink-0 shadow-sm">
        {/* Home */}
        <button
          onClick={onClose}
          className="flex flex-col items-center justify-center flex-1 h-full text-[#6B645D] hover:text-[#1F1D1A] active:scale-95 transition-transform"
        >
          <Home className="w-6 h-6 stroke-[1.8]" />
          <span className="text-[11px] font-medium mt-1 tracking-tight">Home</span>
        </button>

        {/* Tools (Active with Blue Folder Icon) */}
        <button
          className="flex flex-col items-center justify-center flex-1 h-full text-[#1A73E8] active:scale-95 transition-transform"
        >
          <div className="relative flex items-center justify-center">
            <svg className="w-6 h-6 fill-[#1A73E8] stroke-[#1A73E8]" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.8"
                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
              />
            </svg>
            <Wrench className="w-2.5 h-2.5 text-white absolute inset-0 m-auto" />
          </div>
          <span className="text-[11px] font-bold mt-1 tracking-tight text-[#1A73E8]">
            Tools
          </span>
        </button>

        {/* Scan Button (Always present on bottom bar!) */}
        <button
          onClick={() => {
            onClose();
            onOpenScan?.();
          }}
          className="flex flex-col items-center justify-center flex-1 h-full text-[#6B645D] hover:text-[#1F1D1A] active:scale-95 transition-transform"
          title="QR Scanner"
        >
          <QrCode className="w-5.5 h-5.5 stroke-[1.8]" />
          <span className="text-[11px] font-medium mt-1 tracking-tight text-[#6B645D]">
            Scan
          </span>
        </button>

        {/* Me */}
        <button
          onClick={() => setShowMeScreen(true)}
          className="flex flex-col items-center justify-center flex-1 h-full text-[#6B645D] hover:text-[#1F1D1A] active:scale-95 transition-transform"
        >
          <User className="w-6 h-6 stroke-[1.8]" />
          <span className="text-[11px] font-medium mt-1 tracking-tight">Me</span>
        </button>
      </footer>

      {/* 5. Android Bottom 3-Button Navigation Bar (|||  ▢  ◁) */}
      <div className="w-full h-11 bg-[#F3ECE2] border-t border-[#E5DFD5] flex items-center justify-around text-[#6B645D] select-none shrink-0 px-8">
        <button onClick={onClose} className="p-2 hover:text-[#1F1D1A] active:scale-90" title="Recent Apps">
          <div className="flex items-center gap-[3px]">
            <div className="w-[2px] h-3.5 bg-[#6B645D] rounded-full" />
            <div className="w-[2px] h-3.5 bg-[#6B645D] rounded-full" />
            <div className="w-[2px] h-3.5 bg-[#6B645D] rounded-full" />
          </div>
        </button>
        <button onClick={onClose} className="p-2 hover:text-[#1F1D1A] active:scale-90" title="Home">
          <div className="w-3.5 h-3.5 border-2 border-[#6B645D] rounded-[4px]" />
        </button>
        <button onClick={onClose} className="p-2 hover:text-[#1F1D1A] active:scale-90" title="Back">
          <svg className="w-4 h-4 fill-[#6B645D]" viewBox="0 0 24 24">
            <polygon points="18,5 6,12 18,19" />
          </svg>
        </button>
      </div>
      {/* 6. Recent Files Screen (Rendered when user taps "Recent >") */}
      <RecentFilesScreen
        isOpen={showRecentScreen}
        onBack={() => setShowRecentScreen(false)}
        onOpenFile={() => {
          onOpenFiles?.();
        }}
      />
      {/* 7. Documents Screen (Rendered when user taps "Documents" category) */}
      <DocumentsScreen
        isOpen={showDocumentsScreen}
        onClose={() => setShowDocumentsScreen(false)}
        onOpenFile={() => {
          onOpenFiles?.();
        }}
      />
      {/* 8. Dedicated Individual Category Screen (Downloads, Music, Videos, WhatsApp, Images, Apps, Zips, Pages, Instagram, Others, Storage) */}
      {selectedCategory && (
        <FileManagerCategoryScreen
          categoryId={selectedCategory.id}
          title={selectedCategory.title}
          isOpen={!!selectedCategory}
          onClose={() => setSelectedCategory(null)}
          onOpenFile={() => {
            onOpenFiles?.();
          }}
        />
      )}
      {/* 9. Me Screen (Profile, Account, Stats, Privacy, Storage & App Theme) */}
      <MeScreen
        isOpen={showMeScreen}
        onClose={() => setShowMeScreen(false)}
        onOpenHome={onClose}
        onOpenTools={() => setShowMeScreen(false)}
        onOpenBookmarks={() => {
          setShowMeScreen(false);
          onOpenSettings?.();
        }}
        onOpenDownloads={() => {
          setShowMeScreen(false);
          onOpenFiles?.();
        }}
        onOpenHistory={() => {
          setShowMeScreen(false);
          onOpenSettings?.();
        }}
        onOpenSettings={() => {
          setShowMeScreen(false);
          onOpenSettings?.();
        }}
        onOpenClean={() => {
          setShowMeScreen(false);
          onOpenClean?.();
        }}
      />
      {/* 10. Dedicated PDF Viewer Screen */}
      <PdfViewerModal
        isOpen={!!activePdfViewer}
        onClose={() => setActivePdfViewer(null)}
        title={activePdfViewer?.name}
      />
    </div>
  );
};
