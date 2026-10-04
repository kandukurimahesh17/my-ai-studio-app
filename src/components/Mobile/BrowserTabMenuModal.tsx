import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Star,
  RotateCw,
  Clock,
  Download,
  Search,
  Languages,
  Smartphone,
  Monitor,
  FileDown,
  Share2,
  Settings,
  MessageSquare,
  Shield,
  Check,
  Zap,
  Gauge,
} from 'lucide-react';
import { Tab, Bookmark } from '../../types/browser';

interface BrowserTabMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: Tab;
  canGoBack: boolean;
  canGoForward: boolean;
  onGoBack: () => void;
  onGoForward: () => void;
  onReload: () => void;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
  onOpenBookmarks: () => void;
  onOpenHistory: () => void;
  onOpenDownloads: () => void;
  onOpenSettings: () => void;
  onFindInPage: () => void;
  onToggleDesktopSite: () => void;
  isDesktopSite: boolean;
  onSaveAsPdf: () => void;
  onShare: () => void;
  onCreateShortcut: () => void;
  onTranslatePage: () => void;
  onOpenFeedback: () => void;
  onOpenReportSite?: () => void;
  onOpenVideoDownloader?: () => void;
  onOpenDataSaver?: () => void;
  dataSaverActive?: boolean;
  onOpenStatusSaver?: () => void;
}

export const BrowserTabMenuModal: React.FC<BrowserTabMenuModalProps> = ({
  isOpen,
  onClose,
  activeTab,
  canGoBack,
  canGoForward,
  onGoBack,
  onGoForward,
  onReload,
  isBookmarked,
  onToggleBookmark,
  onOpenBookmarks,
  onOpenHistory,
  onOpenDownloads,
  onOpenSettings,
  onFindInPage,
  onToggleDesktopSite,
  isDesktopSite,
  onSaveAsPdf,
  onShare,
  onCreateShortcut,
  onTranslatePage,
  onOpenFeedback,
  onOpenReportSite,
  onOpenVideoDownloader,
  onOpenDataSaver,
  dataSaverActive = true,
  onOpenStatusSaver,
}) => {
  const [adBlockEnabled, setAdBlockEnabled] = useState(true);

  if (!isOpen) return null;

  return (
    <>
      {/* Invisible backdrop to dismiss on click outside */}
      <div
        className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[0.5px]"
        onClick={onClose}
      />

      {/* Popup Menu Card (matches user screenshot exactly) */}
      <div className="absolute right-2 top-11 bg-white rounded-[26px] shadow-[0_12px_45px_rgba(0,0,0,0.2)] border border-neutral-100/90 py-3 px-3.5 w-[248px] z-50 animate-in fade-in zoom-in-95 duration-150 select-none text-neutral-800">
        {/* Top Quick Actions Bar (<  >  ☆  AD  ↻) */}
        <div className="bg-[#EEF2F6] rounded-2xl p-1 flex items-center justify-between mb-3 text-neutral-700">
          {/* 1. Back */}
          <button
            onClick={() => {
              onGoBack();
              onClose();
            }}
            disabled={!canGoBack}
            className={`p-2 rounded-xl transition-all ${
              canGoBack
                ? 'hover:bg-white text-neutral-800 active:scale-90 shadow-xs'
                : 'text-neutral-400 opacity-60 cursor-not-allowed'
            }`}
            title="Back"
          >
            <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
          </button>

          {/* 2. Forward */}
          <button
            onClick={() => {
              onGoForward();
              onClose();
            }}
            disabled={!canGoForward}
            className={`p-2 rounded-xl transition-all ${
              canGoForward
                ? 'hover:bg-white text-neutral-800 active:scale-90 shadow-xs'
                : 'text-neutral-400 opacity-60 cursor-not-allowed'
            }`}
            title="Forward"
          >
            <ChevronRight className="w-4 h-4 stroke-[2.5]" />
          </button>

          {/* 3. Bookmark / Star */}
          <button
            onClick={() => {
              onToggleBookmark();
            }}
            className={`p-2 rounded-xl hover:bg-white active:scale-90 transition-all ${
              isBookmarked ? 'text-amber-500' : 'text-neutral-700 hover:text-amber-500'
            }`}
            title={isBookmarked ? 'Remove bookmark' : 'Bookmark this page'}
          >
            <Star
              className={`w-4 h-4 stroke-[2] ${
                isBookmarked ? 'fill-amber-400 text-amber-500' : ''
              }`}
            />
          </button>

          {/* 4. AD Blocker */}
          <button
            onClick={() => {
              setAdBlockEnabled(!adBlockEnabled);
            }}
            className={`px-1.5 py-1 rounded-xl text-[10px] font-bold tracking-tight border flex items-center justify-center transition-all ${
              adBlockEnabled
                ? 'bg-neutral-800 text-white border-neutral-800'
                : 'bg-white text-neutral-500 border-neutral-300'
            }`}
            title={`Ad Blocker: ${adBlockEnabled ? 'Enabled' : 'Disabled'}`}
          >
            <span>AD</span>
          </button>

          {/* 5. Reload */}
          <button
            onClick={() => {
              onReload();
              onClose();
            }}
            className="p-2 rounded-xl hover:bg-white text-neutral-800 active:scale-90 transition-all"
            title="Reload"
          >
            <RotateCw className="w-4 h-4 stroke-[2.3]" />
          </button>
        </div>

        {/* Section 1: Library Links */}
        <div className="space-y-1">
          {/* Favourites */}
          <button
            onClick={() => {
              onClose();
              onOpenBookmarks();
            }}
            className="w-full flex items-center gap-3.5 px-2.5 py-2 rounded-xl hover:bg-neutral-100/70 active:scale-98 transition-all text-left"
          >
            <Star className="w-[18px] h-[18px] text-amber-500 stroke-[2]" />
            <span className="text-[14px] text-neutral-800 font-normal">Favourites</span>
          </button>

          {/* History */}
          <button
            onClick={() => {
              onClose();
              onOpenHistory();
            }}
            className="w-full flex items-center gap-3.5 px-2.5 py-2 rounded-xl hover:bg-neutral-100/70 active:scale-98 transition-all text-left"
          >
            <Clock className="w-[18px] h-[18px] text-blue-500 stroke-[2]" />
            <span className="text-[14px] text-neutral-800 font-normal">History</span>
          </button>

          {/* Downloads */}
          <button
            onClick={() => {
              onClose();
              onOpenDownloads();
            }}
            className="w-full flex items-center gap-3.5 px-2.5 py-2 rounded-xl hover:bg-neutral-100/70 active:scale-98 transition-all text-left"
          >
            <Download className="w-[18px] h-[18px] text-blue-600 stroke-[2]" />
            <span className="text-[14px] text-neutral-800 font-normal">Downloads</span>
          </button>
        </div>

        {/* Subtle Horizontal Divider */}
        <div className="h-[1px] bg-neutral-100 my-1.5" />

        {/* Section 2: Page Actions */}
        <div className="space-y-1">
          {/* Smart Video Downloader */}
          {onOpenVideoDownloader && (
            <button
              onClick={() => {
                onClose();
                onOpenVideoDownloader();
              }}
              className="w-full flex items-center justify-between px-2.5 py-2 rounded-xl hover:bg-rose-50/80 active:scale-98 transition-all text-left text-rose-600"
            >
              <div className="flex items-center gap-3.5">
                <Zap className="w-[18px] h-[18px] fill-rose-500 text-rose-500" />
                <span className="text-[14px] font-semibold text-rose-700">Video Downloader</span>
              </div>
              <span className="text-[9px] bg-rose-600 text-white px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">
                Smart
              </span>
            </button>
          )}

          {/* Data Saver Mode */}
          {onOpenDataSaver && (
            <button
              onClick={() => {
                onClose();
                onOpenDataSaver();
              }}
              className="w-full flex items-center justify-between px-2.5 py-2 rounded-xl hover:bg-neutral-100/70 active:scale-98 transition-all text-left"
            >
              <div className="flex items-center gap-3.5">
                <Gauge className={`w-[18px] h-[18px] stroke-[2] ${dataSaverActive ? 'text-amber-500' : 'text-neutral-700'}`} />
                <span className="text-[14px] text-neutral-800 font-normal">Data Saver Mode</span>
              </div>
              {dataSaverActive && (
                <span className="text-[9px] bg-amber-500 text-white px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">
                  68% Off
                </span>
              )}
            </button>
          )}

          {/* WhatsApp Status Saver */}
          {onOpenStatusSaver && (
            <button
              onClick={() => {
                onClose();
                onOpenStatusSaver();
              }}
              className="w-full flex items-center justify-between px-2.5 py-2 rounded-xl hover:bg-emerald-50/80 active:scale-98 transition-all text-left"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-[18px] h-[18px] rounded-full bg-[#25D366] flex items-center justify-center text-white text-[9px] font-bold">
                  S
                </div>
                <span className="text-[14px] text-neutral-800 font-normal">Status Saver</span>
              </div>
              <span className="text-[9px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-bold">
                WhatsApp
              </span>
            </button>
          )}

          {/* Find in page */}
          <button
            onClick={() => {
              onClose();
              onFindInPage();
            }}
            className="w-full flex items-center gap-3.5 px-2.5 py-2 rounded-xl hover:bg-neutral-100/70 active:scale-98 transition-all text-left"
          >
            <Search className="w-[18px] h-[18px] text-neutral-700 stroke-[2]" />
            <span className="text-[14px] text-neutral-800 font-normal">Find in page</span>
          </button>

          {/* Translate page */}
          <button
            onClick={() => {
              onClose();
              onTranslatePage();
            }}
            className="w-full flex items-center gap-3.5 px-2.5 py-2 rounded-xl hover:bg-neutral-100/70 active:scale-98 transition-all text-left"
          >
            <Languages className="w-[18px] h-[18px] text-neutral-700 stroke-[2]" />
            <span className="text-[14px] text-neutral-800 font-normal">Translate page</span>
          </button>

          {/* Create shortcut */}
          <button
            onClick={() => {
              onClose();
              onCreateShortcut();
            }}
            className="w-full flex items-center gap-3.5 px-2.5 py-2 rounded-xl hover:bg-neutral-100/70 active:scale-98 transition-all text-left"
          >
            <Smartphone className="w-[18px] h-[18px] text-neutral-700 stroke-[2]" />
            <span className="text-[14px] text-neutral-800 font-normal">Create shortcut</span>
          </button>

          {/* Desktop site */}
          <button
            onClick={() => {
              onToggleDesktopSite();
            }}
            className="w-full flex items-center justify-between px-2.5 py-2 rounded-xl hover:bg-neutral-100/70 active:scale-98 transition-all text-left"
          >
            <div className="flex items-center gap-3.5">
              <Monitor className="w-[18px] h-[18px] text-neutral-700 stroke-[2]" />
              <span className="text-[14px] text-neutral-800 font-normal">Desktop site</span>
            </div>
            {isDesktopSite && (
              <div className="w-4 h-4 rounded bg-blue-600 text-white flex items-center justify-center">
                <Check className="w-3 h-3 stroke-[3]" />
              </div>
            )}
          </button>

          {/* Save as PDF */}
          <button
            onClick={() => {
              onClose();
              onSaveAsPdf();
            }}
            className="w-full flex items-center gap-3.5 px-2.5 py-2 rounded-xl hover:bg-neutral-100/70 active:scale-98 transition-all text-left"
          >
            <div className="w-[18px] h-[18px] border border-neutral-700 rounded-sm flex items-center justify-center text-[8px] font-bold">
              PDF
            </div>
            <span className="text-[14px] text-neutral-800 font-normal">Save as PDF</span>
          </button>

          {/* Share */}
          <button
            onClick={() => {
              onClose();
              onShare();
            }}
            className="w-full flex items-center gap-3.5 px-2.5 py-2 rounded-xl hover:bg-neutral-100/70 active:scale-98 transition-all text-left"
          >
            <Share2 className="w-[18px] h-[18px] text-neutral-700 stroke-[2]" />
            <span className="text-[14px] text-neutral-800 font-normal">Share</span>
          </button>
        </div>

        {/* Subtle Horizontal Divider */}
        <div className="h-[1px] bg-neutral-100 my-1.5" />

        {/* Section 3: Settings & Feedback */}
        <div className="space-y-1">
          {/* Settings */}
          <button
            onClick={() => {
              onClose();
              onOpenSettings();
            }}
            className="w-full flex items-center gap-3.5 px-2.5 py-2 rounded-xl hover:bg-neutral-100/70 active:scale-98 transition-all text-left"
          >
            <Settings className="w-[18px] h-[18px] text-neutral-700 stroke-[2]" />
            <span className="text-[14px] text-neutral-800 font-normal">Settings</span>
          </button>

          {/* Feedback */}
          <button
            onClick={() => {
              onClose();
              onOpenFeedback();
            }}
            className="w-full flex items-center gap-3.5 px-2.5 py-2 rounded-xl hover:bg-neutral-100/70 active:scale-98 transition-all text-left"
          >
            <MessageSquare className="w-[18px] h-[18px] text-neutral-700 stroke-[2]" />
            <span className="text-[14px] text-neutral-800 font-normal">Feedback</span>
          </button>

          {/* Report Site (Google Play UGC & Safety) */}
          {onOpenReportSite && (
            <button
              onClick={() => {
                onClose();
                onOpenReportSite();
              }}
              className="w-full flex items-center gap-3.5 px-2.5 py-2 rounded-xl hover:bg-rose-50/80 active:scale-98 transition-all text-left"
            >
              <Shield className="w-[18px] h-[18px] text-rose-500 stroke-[2]" />
              <span className="text-[14px] text-rose-600 font-normal">Report & Block Site</span>
            </button>
          )}
        </div>
      </div>
    </>
  );
};
