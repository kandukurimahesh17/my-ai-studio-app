import React, { useState, useEffect, useRef } from 'react';
import { SearchEngineType } from '../../types/browser';
import { SearchEngineBadge } from '../Search/SearchEngineIcons';
import { MobileSearchOverlay } from '../Mobile/MobileSearchOverlay';
import { MOBILE_SHORTCUTS, MobileShortcut } from '../Mobile/mobileShortcutsData';
import { ALL_SITES } from '../../data/allSitesData';
import { AllSitesScreen } from '../Mobile/AllSitesScreen';

interface MobileHomeNewTabProps {
  onNavigate: (url: string) => void;
  tabCount: number;
  onOpenTabSwitcher: () => void;
  onOpenCleanModal: () => void;
  onOpenMusicModal: () => void;
  onOpenSportsModal: () => void;
  onOpenMoreAppsModal?: () => void;
  onOpenDownloadsModal?: () => void;
  onOpenStatusSaverModal?: () => void;
  defaultEngine: SearchEngineType;
  onSelectEngine?: (engine: SearchEngineType) => void;
  onOpenInNewTab?: (url: string) => void;
  onOpenInIncognitoTab?: (url: string) => void;
}

export const MobileHomeNewTab: React.FC<MobileHomeNewTabProps> = ({
  onNavigate,
  onOpenCleanModal,
  onOpenMusicModal,
  onOpenSportsModal,
  onOpenDownloadsModal,
  onOpenStatusSaverModal,
  defaultEngine,
  onSelectEngine,
  onOpenInNewTab,
  onOpenInIncognitoTab,
}) => {
  const [query, setQuery] = useState('');
  const [isSearchOverlayOpen, setIsSearchOverlayOpen] = useState(false);
  const [isAllSitesOpen, setIsAllSitesOpen] = useState(false);

  // Home Screen Shortcuts State (Persisted)
  const [shortcuts, setShortcuts] = useState<MobileShortcut[]>(() => {
    try {
      const saved = localStorage.getItem('lemon_home_shortcuts_v4');
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.map((item: any) => {
          const found =
            MOBILE_SHORTCUTS.find((m) => m.id === item.id) ||
            ALL_SITES.find((s) => s.id === item.id);
          return {
            ...item,
            renderIcon: found
              ? found.renderIcon
              : () => (
                  <div className="w-full h-full rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-base shadow-xs">
                    {item.name.charAt(0)}
                  </div>
                ),
          };
        });
      }
      return MOBILE_SHORTCUTS;
    } catch {
      return MOBILE_SHORTCUTS;
    }
  });

  // Save shortcuts changes to localStorage
  useEffect(() => {
    try {
      const serializable = shortcuts.map(({ id, name, url, type, badgeColor }) => ({
        id,
        name,
        url,
        type,
        badgeColor,
      }));
      localStorage.setItem('lemon_home_shortcuts_v4', JSON.stringify(serializable));
    } catch {}
  }, [shortcuts]);

  // Context Menu state for Long-Press (Image-1)
  const [contextMenu, setContextMenu] = useState<{
    shortcut: MobileShortcut;
    x: number;
    y: number;
  } | null>(null);

  const longPressTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isLongPressTriggeredRef = useRef(false);

  const handleTouchStart = (shortcut: MobileShortcut, e: React.TouchEvent | React.MouseEvent) => {
    if (shortcut.id === 'more') return;
    isLongPressTriggeredRef.current = false;

    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;

    longPressTimerRef.current = setTimeout(() => {
      isLongPressTriggeredRef.current = true;
      setContextMenu({
        shortcut,
        x: Math.min(Math.max(clientX - 100, 16), window.innerWidth - 220),
        y: Math.min(clientY + 12, window.innerHeight - 200),
      });
    }, 450);
  };

  const handleTouchEnd = () => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
  };

  const handleContextMenu = (shortcut: MobileShortcut, e: React.MouseEvent) => {
    e.preventDefault();
    if (shortcut.id === 'more') return;
    setContextMenu({
      shortcut,
      x: Math.min(Math.max(e.clientX - 100, 16), window.innerWidth - 220),
      y: Math.min(e.clientY + 12, window.innerHeight - 200),
    });
  };

  const handleShortcutClick = (shortcut: MobileShortcut) => {
    if (isLongPressTriggeredRef.current) {
      isLongPressTriggeredRef.current = false;
      return;
    }

    if (shortcut.id === 'clean') {
      onOpenCleanModal();
    } else if (shortcut.id === 'music') {
      onOpenMusicModal();
    } else if (shortcut.id === 'wescore') {
      onOpenSportsModal();
    } else if (shortcut.id === 'more') {
      setIsAllSitesOpen(true);
    } else if (shortcut.id === 'status') {
      if (onOpenStatusSaverModal) {
        onOpenStatusSaverModal();
      } else {
        onNavigate('https://web.whatsapp.com');
      }
    } else if (shortcut.id === 'downloader') {
      if (onOpenDownloadsModal) {
        onOpenDownloadsModal();
      } else {
        onNavigate(shortcut.url);
      }
    } else {
      onNavigate(shortcut.url);
    }
  };

  // Add site from All sites screen directly to home shortcuts
  const handleAddShortcut = (newShortcut: MobileShortcut) => {
    setShortcuts((prev) => {
      if (prev.some((s) => s.id === newShortcut.id)) return prev;
      const withoutMore = prev.filter((s) => s.id !== 'more');
      const moreItem =
        prev.find((s) => s.id === 'more') ||
        MOBILE_SHORTCUTS.find((s) => s.id === 'more')!;
      return [...withoutMore, newShortcut, moreItem];
    });
  };

  // Close context menu on outside click
  useEffect(() => {
    const handleOutsideClick = () => {
      setContextMenu(null);
    };
    if (contextMenu) {
      window.addEventListener('click', handleOutsideClick);
      window.addEventListener('touchstart', handleOutsideClick);
    }
    return () => {
      window.removeEventListener('click', handleOutsideClick);
      window.removeEventListener('touchstart', handleOutsideClick);
    };
  }, [contextMenu]);

  return (
    <div className="flex-1 w-full h-full bg-[#F3ECE2] text-[#1F1D1A] flex flex-col justify-start px-4 pt-1 pb-16 overflow-y-auto font-sans select-none relative scrollbar-none">
      {/* Main Container - Constrained to max-width */}
      <div className="w-full max-w-[840px] mx-auto flex flex-col items-center">
        {/* ============================================================== */}
        {/* 1. BRAND HEADER: Phoenix Logo Matching User Image-1             */}
        {/* ============================================================== */}
        <div className="flex items-center justify-center gap-3.5 my-7 select-none">
          {/* Stylized Phoenix 'P' Logo */}
          <div className="relative w-10 h-12 flex items-center justify-center filter drop-shadow-xs">
            <svg viewBox="0 0 100 120" className="w-full h-full">
              {/* Vertical blue/purple stem */}
              <rect x="24" y="20" width="22" height="85" rx="11" fill="url(#pStem)" />
              {/* Curving pink/purple loop */}
              <path
                d="M35 20 H68 C84 20 95 32 95 48 C95 64 84 76 68 76 H35 Z"
                fill="url(#pLoop)"
              />
              {/* Inner cutout hole */}
              <circle cx="60" cy="48" r="14" fill="#F3ECE2" />
              <defs>
                <linearGradient id="pStem" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#2563EB" />
                  <stop offset="100%" stopColor="#4338CA" />
                </linearGradient>
                <linearGradient id="pLoop" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#EC4899" />
                  <stop offset="100%" stopColor="#8B5CF6" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <span className="text-4xl sm:text-5xl font-black tracking-tight text-[#1F1D1A]">
            Phoenix
          </span>
        </div>

        {/* ============================================================== */}
        {/* 2. SEARCH OMNIBOX WITH CORNER TRIANGLE (Image-1 & 2)           */}
        {/* ============================================================== */}
        <div
          onClick={() => setIsSearchOverlayOpen(true)}
          className="w-full mb-8 max-w-lg cursor-pointer"
        >
          <div className="w-full h-12 bg-white hover:bg-white/95 focus-within:bg-white border border-[#E5DFD5] rounded-[14px] px-3.5 flex items-center gap-3 transition-all shadow-xs">
            {/* Search Engine Badge (Logo + Small Grey Triangle in bottom-right corner) */}
            <div className="flex items-center justify-center shrink-0">
              <SearchEngineBadge engine={defaultEngine} className="w-6 h-6" />
            </div>
            <input
              type="text"
              value={query}
              readOnly
              onClick={() => setIsSearchOverlayOpen(true)}
              onFocus={() => setIsSearchOverlayOpen(true)}
              placeholder="Search or type URL"
              className="flex-1 bg-transparent text-sm sm:text-base text-[#1F1D1A] placeholder-[#80868B] outline-none font-normal cursor-pointer caret-[#1A73E8]"
            />
            {/* Google Voice & Lens Buttons */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigate('https://www.google.com');
                }}
                className="p-1 rounded-full hover:bg-black/5 active:scale-90 transition-transform"
                title="Voice Search"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5">
                  <path fill="#4285F4" d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
                  <path fill="#34A853" d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
                  <path fill="#FBBC05" d="M7 11H5c0 1.3.39 2.51 1.06 3.52l1.45-1.45C7.19 12.39 7 11.72 7 11z" />
                  <path fill="#E53935" d="M12 16c1.38 0 2.63-.56 3.54-1.46l-1.45-1.45C13.51 13.67 12.8 14 12 14z" />
                </svg>
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigate('https://lens.google.com');
                }}
                className="p-1 rounded-full hover:bg-black/5 active:scale-90 transition-transform"
                title="Google Lens"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5">
                  <path fill="#4285F4" d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                  <path fill="#E53935" d="M19 6.5A1.5 1.5 0 0 0 17.5 5h-11A1.5 1.5 0 0 0 5 6.5V8h2V7h10v1h2V6.5z" />
                  <path fill="#FBBC05" d="M5 17.5A1.5 1.5 0 0 0 6.5 19h11a1.5 1.5 0 0 0 1.5-1.5V16h-2v1H7v-1H5v1.5z" />
                  <path fill="#34A853" d="M19 8h-2v8h2V8zM7 8H5v8h2V8z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 3. 5-COLUMN GRID OF APP SHORTCUTS WITH LONG-PRESS (Image-1)    */}
        {/* ============================================================== */}
        <div className="w-full max-w-lg grid grid-cols-5 gap-y-6 gap-x-2 mb-10 px-1 relative">
          {shortcuts.map((sc) => (
            <div
              key={sc.id}
              onClick={() => handleShortcutClick(sc)}
              onContextMenu={(e) => handleContextMenu(sc, e)}
              onTouchStart={(e) => handleTouchStart(sc, e)}
              onTouchEnd={handleTouchEnd}
              onMouseDown={(e) => handleTouchStart(sc, e)}
              onMouseUp={handleTouchEnd}
              onMouseLeave={handleTouchEnd}
              className="flex flex-col items-center justify-start group active:scale-95 transition-transform cursor-pointer select-none"
            >
              <div className="w-11 h-11 sm:w-11 sm:h-11 rounded-full flex items-center justify-center shadow-xs group-hover:scale-105 transition-all overflow-hidden shrink-0 [&>*]:w-full [&>*]:h-full [&>*]:rounded-full">
                {sc.renderIcon()}
              </div>
              <span className="text-[12px] font-normal text-[#1F1D1A] text-center leading-tight mt-1.5 truncate w-16">
                {sc.name}
              </span>
            </div>
          ))}

          {/* ============================================================== */}
          {/* 4. LONG-PRESS CONTEXT MENU (Pixel-matched to User Image-1)     */}
          {/* ============================================================== */}
          {contextMenu && (
            <div
              onClick={(e) => e.stopPropagation()}
              className="fixed z-50 bg-white rounded-[22px] shadow-2xl border border-neutral-150 p-2 min-w-[210px] animate-in fade-in zoom-in-95 duration-100"
              style={{
                left: `${contextMenu.x}px`,
                top: `${contextMenu.y}px`,
              }}
            >
              <div className="flex flex-col space-y-1">
                {/* 1. Remove Option */}
                <button
                  type="button"
                  onClick={() => {
                    setShortcuts((prev) => prev.filter((s) => s.id !== contextMenu.shortcut.id));
                    setContextMenu(null);
                  }}
                  className="w-full px-4 py-3 rounded-[14px] text-left text-[16px] font-normal text-[#1F1D1A] hover:bg-neutral-100/80 active:bg-neutral-200/70 transition-colors"
                >
                  Remove
                </button>

                {/* 2. Open in new tab Option */}
                <button
                  type="button"
                  onClick={() => {
                    if (onOpenInNewTab) {
                      onOpenInNewTab(contextMenu.shortcut.url);
                    } else {
                      onNavigate(contextMenu.shortcut.url);
                    }
                    setContextMenu(null);
                  }}
                  className="w-full px-4 py-3 rounded-[14px] text-left text-[16px] font-normal text-[#1F1D1A] hover:bg-neutral-100/80 active:bg-neutral-200/70 transition-colors"
                >
                  Open in new tab
                </button>

                {/* 3. Open in incognito tab Option */}
                <button
                  type="button"
                  onClick={() => {
                    if (onOpenInIncognitoTab) {
                      onOpenInIncognitoTab(contextMenu.shortcut.url);
                    } else {
                      onNavigate(contextMenu.shortcut.url);
                    }
                    setContextMenu(null);
                  }}
                  className="w-full px-4 py-3 rounded-[14px] text-left text-[16px] font-normal text-[#1F1D1A] hover:bg-neutral-100/80 active:bg-neutral-200/70 transition-colors"
                >
                  Open in incognito tab
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ============================================================== */}
      {/* 5. ALL SITES SCREEN (Pixel-matched to Images 2, 3, 4, 5)       */}
      {/* ============================================================== */}
      <AllSitesScreen
        isOpen={isAllSitesOpen}
        onClose={() => setIsAllSitesOpen(false)}
        onNavigate={(url) => {
          setIsAllSitesOpen(false);
          onNavigate(url);
        }}
        existingShortcutIds={shortcuts.map((s) => s.id)}
        onAddShortcut={handleAddShortcut}
      />

      {/* Full-screen Interactive Search Overlay */}
      <MobileSearchOverlay
        isOpen={isSearchOverlayOpen}
        initialQuery={query}
        defaultEngine={defaultEngine}
        onSelectEngine={(engine) => onSelectEngine?.(engine)}
        onSearch={(searchQuery) => {
          setIsSearchOverlayOpen(false);
          onNavigate(searchQuery);
        }}
        onClose={() => setIsSearchOverlayOpen(false)}
      />
    </div>
  );
};
