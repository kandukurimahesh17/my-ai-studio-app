import React, { useState } from 'react';
import {
  ArrowRight,
  Star,
  Download,
  Info,
  RotateCw,
  PlusSquare,
  History,
  CheckCircle,
  Monitor,
  Settings,
  HelpCircle,
  Laptop,
  Check,
  X,
  Share2,
} from 'lucide-react';
import { IncognitoIcon } from './IncognitoIcon';

interface MobileMenuSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onNewTab: () => void;
  onNewIncognitoTab: () => void;
  onOpenDownloads: () => void;
  onOpenBookmarks: () => void;
  onOpenHistory: () => void;
  onOpenSettings: () => void;
  onOpenDevTools?: () => void;
  isIncognito: boolean;
  onToggleIncognito: () => void;
  onReload: () => void;
  onOpenClean?: () => void;
  isDesktopSite?: boolean;
  onToggleDesktopSite?: () => void;
  canGoForward?: boolean;
  onGoForward?: () => void;
}

export const MobileMenuSheet: React.FC<MobileMenuSheetProps> = ({
  isOpen,
  onClose,
  onNewTab,
  onNewIncognitoTab,
  onOpenDownloads,
  onOpenBookmarks,
  onOpenHistory,
  onOpenSettings,
  onOpenDevTools,
  isIncognito,
  onToggleIncognito,
  onReload,
  onOpenClean,
  isDesktopSite = false,
  onToggleDesktopSite,
  canGoForward = false,
  onGoForward,
}) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 1800);
  };

  return (
    <div className="fixed inset-0 z-50 select-none animate-in fade-in duration-100">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" onClick={onClose} />

      {/* Floating Chrome-Style Menu Dropdown (Top Right below Omnibox / 3-Dots Button) */}
      <div
        className={`absolute top-12 right-2.5 w-[240px] sm:w-[260px] rounded-2xl shadow-2xl py-2 z-50 border overflow-hidden transition-all animate-in zoom-in-95 duration-100 ${
          isIncognito
            ? 'bg-[#292A2D] text-white border-[#3C4043]'
            : 'bg-white text-[#202124] border-[#E8EAED]'
        }`}
      >
        {/* Top 5 Quick Action Icons Row (Matching Screenshot Image 3 & 5) */}
        <div
          className={`flex items-center justify-between px-3 py-2 border-b ${
            isIncognito ? 'border-[#3C4043] text-neutral-300' : 'border-neutral-100 text-[#444746]'
          }`}
        >
          {/* Forward */}
          <button
            onClick={() => {
              onGoForward?.();
              onClose();
            }}
            disabled={!canGoForward}
            className={`p-2 rounded-full transition-colors active:scale-90 ${
              canGoForward
                ? isIncognito ? 'hover:bg-white/10 text-white' : 'hover:bg-black/5 text-[#202124]'
                : 'opacity-30 cursor-not-allowed'
            }`}
            title="Forward"
          >
            <ArrowRight className="w-5 h-5 stroke-[2]" />
          </button>

          {/* Bookmark Star */}
          <button
            onClick={() => {
              setIsBookmarked(!isBookmarked);
              showToast(isBookmarked ? 'Removed from bookmarks' : 'Added to bookmarks');
            }}
            className={`p-2 rounded-full transition-colors active:scale-90 ${
              isBookmarked
                ? 'text-[#1A73E8]'
                : isIncognito ? 'hover:bg-white/10 text-neutral-300' : 'hover:bg-black/5 text-[#444746]'
            }`}
            title="Bookmark this tab"
          >
            <Star className={`w-5 h-5 stroke-[2] ${isBookmarked ? 'fill-current' : ''}`} />
          </button>

          {/* Download Page */}
          <button
            onClick={() => {
              showToast('Page saved to downloads');
              onClose();
            }}
            className={`p-2 rounded-full transition-colors active:scale-90 ${
              isIncognito ? 'hover:bg-white/10 text-neutral-300' : 'hover:bg-black/5 text-[#444746]'
            }`}
            title="Download page"
          >
            <Download className="w-5 h-5 stroke-[2]" />
          </button>

          {/* Page Info */}
          <button
            onClick={() => {
              showToast(isIncognito ? 'Incognito Mode Active' : 'Connection is secure');
              onClose();
            }}
            className={`p-2 rounded-full transition-colors active:scale-90 ${
              isIncognito ? 'hover:bg-white/10 text-neutral-300' : 'hover:bg-black/5 text-[#444746]'
            }`}
            title="Page info"
          >
            <Info className="w-5 h-5 stroke-[2]" />
          </button>

          {/* Reload Page */}
          <button
            onClick={() => {
              onReload();
              onClose();
            }}
            className={`p-2 rounded-full transition-colors active:scale-90 ${
              isIncognito ? 'hover:bg-white/10 text-neutral-300' : 'hover:bg-black/5 text-[#444746]'
            }`}
            title="Reload"
          >
            <RotateCw className="w-5 h-5 stroke-[2]" />
          </button>
        </div>

        {/* Menu Items List (Exact order and styling from Chrome Screenshots) */}
        <div className="py-1 text-sm font-normal">
          {/* 1. New Tab */}
          <button
            onClick={() => {
              onClose();
              onNewTab();
            }}
            className={`w-full flex items-center gap-3.5 px-4 py-2.5 text-left transition-colors ${
              isIncognito ? 'hover:bg-white/10 text-white' : 'hover:bg-black/5 text-[#202124]'
            }`}
          >
            <PlusSquare className="w-5 h-5 stroke-[1.8] text-neutral-400" />
            <span>New tab</span>
          </button>

          {/* 2. New Incognito Tab (Exact highlight matching Screenshots Image 3 & 5) */}
          <button
            onClick={() => {
              onClose();
              onNewIncognitoTab();
            }}
            className={`w-full flex items-center gap-3.5 px-4 py-2.5 text-left font-medium transition-colors ${
              isIncognito
                ? 'hover:bg-white/10 text-[#C58AF9]'
                : 'hover:bg-purple-50 text-[#1F1F1F]'
            }`}
          >
            <div className={`shrink-0 ${isIncognito ? 'text-[#C58AF9]' : 'text-neutral-700'}`}>
              <IncognitoIcon className="w-5 h-5" />
            </div>
            <span className="font-semibold">New incognito tab</span>
          </button>

          <div className={`h-px my-1 ${isIncognito ? 'bg-[#3C4043]' : 'bg-neutral-100'}`} />

          {/* 3. History */}
          <button
            onClick={() => {
              onClose();
              onOpenHistory();
            }}
            className={`w-full flex items-center gap-3.5 px-4 py-2.5 text-left transition-colors ${
              isIncognito ? 'hover:bg-white/10 text-white' : 'hover:bg-black/5 text-[#202124]'
            }`}
          >
            <History className="w-5 h-5 stroke-[1.8] text-neutral-400" />
            <span>History</span>
          </button>

          {/* 4. Downloads */}
          <button
            onClick={() => {
              onClose();
              onOpenDownloads();
            }}
            className={`w-full flex items-center gap-3.5 px-4 py-2.5 text-left transition-colors ${
              isIncognito ? 'hover:bg-white/10 text-white' : 'hover:bg-black/5 text-[#202124]'
            }`}
          >
            <Download className="w-5 h-5 stroke-[1.8] text-neutral-400" />
            <span>Downloads</span>
          </button>

          {/* 5. Bookmarks */}
          <button
            onClick={() => {
              onClose();
              onOpenBookmarks();
            }}
            className={`w-full flex items-center gap-3.5 px-4 py-2.5 text-left transition-colors ${
              isIncognito ? 'hover:bg-white/10 text-white' : 'hover:bg-black/5 text-[#202124]'
            }`}
          >
            <Star className="w-5 h-5 stroke-[1.8] text-neutral-400" />
            <span>Bookmarks</span>
          </button>

          {/* 6. Recent tabs */}
          <button
            onClick={() => {
              onClose();
              onOpenHistory();
            }}
            className={`w-full flex items-center gap-3.5 px-4 py-2.5 text-left transition-colors ${
              isIncognito ? 'hover:bg-white/10 text-white' : 'hover:bg-black/5 text-[#202124]'
            }`}
          >
            <Laptop className="w-5 h-5 stroke-[1.8] text-neutral-400" />
            <span>Recent tabs</span>
          </button>

          <div className={`h-px my-1 ${isIncognito ? 'bg-[#3C4043]' : 'bg-neutral-100'}`} />

          {/* 7. Desktop site (with authentic checkbox from screenshot) */}
          <button
            onClick={() => {
              onToggleDesktopSite?.();
              showToast(isDesktopSite ? 'Mobile view enabled' : 'Desktop view requested');
              onClose();
            }}
            className={`w-full flex items-center justify-between px-4 py-2.5 text-left transition-colors ${
              isIncognito ? 'hover:bg-white/10 text-white' : 'hover:bg-black/5 text-[#202124]'
            }`}
          >
            <div className="flex items-center gap-3.5">
              <Monitor className="w-5 h-5 stroke-[1.8] text-neutral-400" />
              <span>Desktop site</span>
            </div>

            {/* Checkbox */}
            <div
              className={`w-4.5 h-4.5 rounded-[4px] border flex items-center justify-center transition-all ${
                isDesktopSite
                  ? 'bg-[#1A73E8] border-[#1A73E8] text-white'
                  : isIncognito ? 'border-neutral-500 bg-transparent' : 'border-neutral-400 bg-transparent'
              }`}
            >
              {isDesktopSite && <Check className="w-3 h-3 stroke-[3]" />}
            </div>
          </button>

          {/* 8. Settings */}
          <button
            onClick={() => {
              onClose();
              onOpenSettings();
            }}
            className={`w-full flex items-center gap-3.5 px-4 py-2.5 text-left transition-colors ${
              isIncognito ? 'hover:bg-white/10 text-white' : 'hover:bg-black/5 text-[#202124]'
            }`}
          >
            <Settings className="w-5 h-5 stroke-[1.8] text-neutral-400" />
            <span>Settings</span>
          </button>

          {/* 9. Help & feedback */}
          <button
            onClick={() => {
              showToast('Lemon Browser v3.2 · All systems normal');
              onClose();
            }}
            className={`w-full flex items-center gap-3.5 px-4 py-2.5 text-left transition-colors ${
              isIncognito ? 'hover:bg-white/10 text-white' : 'hover:bg-black/5 text-[#202124]'
            }`}
          >
            <HelpCircle className="w-5 h-5 stroke-[1.8] text-neutral-400" />
            <span>Help &amp; feedback</span>
          </button>
        </div>
      </div>

      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-16 left-1/2 -translate-x-1/2 z-50 px-4 py-2 bg-neutral-900/90 text-white text-xs font-semibold rounded-2xl shadow-xl animate-in fade-in duration-150">
          {toastMsg}
        </div>
      )}
    </div>
  );
};
