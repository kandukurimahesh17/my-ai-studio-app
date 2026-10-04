import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  RotateCw,
  Home,
  Lock,
  Star,
  BookOpen,
  Code2,
  Puzzle,
  Download,
  MoreVertical,
  Search,
  ExternalLink,
  ZoomIn,
  ShieldCheck,
  SplitSquareVertical,
} from 'lucide-react';
import { Tab, Bookmark, HistoryItem, SearchEngineType } from '../types/browser';
import { SEARCH_ENGINES } from '../utils/browserConstants';

interface OmnibarProps {
  activeTab: Tab;
  canGoBack: boolean;
  canGoForward: boolean;
  onGoBack: () => void;
  onGoForward: () => void;
  onReload: () => void;
  onGoHome: () => void;
  onNavigate: (url: string) => void;
  onToggleBookmark: () => void;
  isBookmarked: boolean;
  onToggleReaderMode: () => void;
  onToggleDevTools: () => void;
  isDevToolsOpen: boolean;
  onOpenCertificateModal: () => void;
  onOpenExtensionsModal: () => void;
  onOpenDownloadsDrawer: () => void;
  onOpenSettingsModal: () => void;
  onToggleSplitView: () => void;
  isSplitView: boolean;
  downloadsCount: number;
  bookmarks: Bookmark[];
  history: HistoryItem[];
  defaultEngine: SearchEngineType;
  onChangeZoom: (level: number) => void;
}

export const Omnibar: React.FC<OmnibarProps> = ({
  activeTab,
  canGoBack,
  canGoForward,
  onGoBack,
  onGoForward,
  onReload,
  onGoHome,
  onNavigate,
  onToggleBookmark,
  isBookmarked,
  onToggleReaderMode,
  onToggleDevTools,
  isDevToolsOpen,
  onOpenCertificateModal,
  onOpenExtensionsModal,
  onOpenDownloadsDrawer,
  onOpenSettingsModal,
  onToggleSplitView,
  isSplitView,
  downloadsCount,
  bookmarks,
  history,
  defaultEngine,
  onChangeZoom,
}) => {
  const [inputValue, setInputValue] = useState(activeTab.url);
  const [isFocused, setIsFocused] = useState(false);
  const [showZoomMenu, setShowZoomMenu] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Sync input value with activeTab.url when tab changes
  useEffect(() => {
    setInputValue(activeTab.url);
  }, [activeTab.url]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    setIsFocused(false);
    inputRef.current?.blur();
    onNavigate(inputValue.trim());
  };

  // Keyboard shortcut Ctrl/Cmd + L to focus address bar
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'l') {
        e.preventDefault();
        inputRef.current?.focus();
        inputRef.current?.select();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Filter autocomplete suggestions
  const trimmed = inputValue.trim().toLowerCase();
  const matchingBookmarks = trimmed
    ? bookmarks.filter((b) => b.title.toLowerCase().includes(trimmed) || b.url.toLowerCase().includes(trimmed)).slice(0, 3)
    : [];

  const matchingHistory = trimmed
    ? history.filter((h) => h.title.toLowerCase().includes(trimmed) || h.url.toLowerCase().includes(trimmed)).slice(0, 3)
    : [];

  const quickActions = [
    { name: 'Code Playground', url: 'lemon://playground', icon: '⚡' },
    { name: 'Research Scratchpad', url: 'lemon://notes', icon: '📝' },
    { name: 'Web Canvas Whiteboard', url: 'lemon://canvas', icon: '🎨' },
    { name: '1995 Web Experience', url: 'lemon://retro', icon: '💾' },
    { name: 'Developer Tools', url: 'lemon://devtools', icon: '🛠️' },
  ].filter((q) => q.name.toLowerCase().includes(trimmed) || q.url.toLowerCase().includes(trimmed));

  return (
    <div className="relative bg-neutral-900 border-b border-neutral-800/80 px-3 py-2 flex items-center gap-2 select-none z-30">
      {/* Navigation Controls: Back, Forward, Refresh, Home */}
      <div className="flex items-center gap-1 text-neutral-400">
        <button
          onClick={onGoBack}
          disabled={!canGoBack}
          aria-label="Back"
          className="p-1.5 rounded-lg hover:bg-neutral-800 hover:text-white disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
          title="Back (Alt+Left)"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        <button
          onClick={onGoForward}
          disabled={!canGoForward}
          aria-label="Forward"
          className="p-1.5 rounded-lg hover:bg-neutral-800 hover:text-white disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
          title="Forward (Alt+Right)"
        >
          <ArrowRight className="w-4 h-4" />
        </button>

        <button
          onClick={onReload}
          aria-label="Reload current page"
          className="p-1.5 rounded-lg hover:bg-neutral-800 hover:text-white transition-colors"
          title="Reload (Ctrl+R)"
        >
          <RotateCw className={`w-4 h-4 ${activeTab.isLoading ? 'animate-spin text-sky-400' : ''}`} />
        </button>

        <button
          onClick={onGoHome}
          aria-label="Go to home page"
          className="p-1.5 rounded-lg hover:bg-neutral-800 hover:text-white transition-colors"
          title="Home Page"
        >
          <Home className="w-4 h-4" />
        </button>
      </div>

      {/* Omnibar / Address Input Container */}
      <div className="flex-1 relative">
        <form
          onSubmit={handleSubmit}
          className={`flex items-center bg-neutral-950 border rounded-xl px-3 py-1.5 text-xs transition-all ${
            isFocused
              ? 'border-sky-500/80 ring-2 ring-sky-500/20 shadow-lg'
              : 'border-neutral-700/80 hover:border-neutral-600'
          }`}
        >
          {/* SSL Lock Security Indicator */}
          <button
            type="button"
            onClick={onOpenCertificateModal}
            className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 pr-2 border-r border-neutral-800 shrink-0 transition-colors"
            title="View Site Information & TLS Certificate"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-[10px] hidden md:inline font-mono font-medium">HTTPS</span>
          </button>

          {/* Real Input */}
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onFocus={() => setIsFocused(true)}
            placeholder="Search or enter web address..."
            className="flex-1 bg-transparent px-2.5 text-white placeholder-neutral-500 outline-none text-xs font-normal"
          />

          {/* Quick Right Affordances inside address bar */}
          <div className="flex items-center gap-1.5 text-neutral-400 shrink-0">
            {/* Zoom Indicator */}
            {activeTab.zoomLevel !== 100 && (
              <span className="text-[10px] font-mono text-neutral-300 px-1.5 py-0.5 rounded bg-neutral-800">
                {activeTab.zoomLevel}%
              </span>
            )}

            {/* Reader Mode Button */}
            <button
              type="button"
              onClick={onToggleReaderMode}
              className={`p-1 rounded hover:bg-neutral-800 transition-colors ${
                activeTab.readerMode ? 'text-sky-400 font-semibold' : 'hover:text-white'
              }`}
              title="Toggle Reader Mode"
            >
              <BookOpen className="w-3.5 h-3.5" />
            </button>

            {/* Star / Bookmark Button */}
            <button
              type="button"
              onClick={onToggleBookmark}
              className={`p-1 rounded hover:bg-neutral-800 transition-colors ${
                isBookmarked ? 'text-amber-400 fill-amber-400' : 'hover:text-white'
              }`}
              title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Page (Ctrl+D)'}
            >
              <Star className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>
          </div>
        </form>

        {/* Live Autocomplete Dropdown */}
        {isFocused && (
          <div
            ref={dropdownRef}
            className="absolute top-full left-0 right-0 mt-1.5 bg-neutral-900 border border-neutral-700/90 rounded-2xl shadow-2xl p-2 z-50 overflow-hidden text-xs"
          >
            {/* Search query suggestion */}
            {inputValue.trim() && (
              <div
                onClick={() => {
                  onNavigate(inputValue.trim());
                  setIsFocused(false);
                }}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-neutral-800 text-sky-400 cursor-pointer font-medium"
              >
                <Search className="w-4 h-4 text-sky-400 shrink-0" />
                <span className="truncate">
                  Search {SEARCH_ENGINES[defaultEngine]?.name} for "
                  <strong className="text-white">{inputValue}</strong>"
                </span>
              </div>
            )}

            {/* Bookmarks matches */}
            {matchingBookmarks.length > 0 && (
              <div className="mt-1 pt-1 border-t border-neutral-800">
                <div className="px-3 py-1 text-[10px] uppercase font-semibold text-neutral-400 tracking-wider">
                  Matching Bookmarks
                </div>
                {matchingBookmarks.map((bm) => (
                  <div
                    key={bm.id}
                    onClick={() => {
                      onNavigate(bm.url);
                      setIsFocused(false);
                    }}
                    className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl hover:bg-neutral-800 text-neutral-200 cursor-pointer"
                  >
                    <span>{bm.favicon}</span>
                    <span className="font-medium text-white truncate">{bm.title}</span>
                    <span className="text-neutral-500 truncate text-[11px] ml-auto">{bm.url}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Quick built-in tools matches */}
            {quickActions.length > 0 && (
              <div className="mt-1 pt-1 border-t border-neutral-800">
                <div className="px-3 py-1 text-[10px] uppercase font-semibold text-neutral-400 tracking-wider">
                  Lemon Quick Engines
                </div>
                {quickActions.map((qa, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      onNavigate(qa.url);
                      setIsFocused(false);
                    }}
                    className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl hover:bg-neutral-800 text-neutral-200 cursor-pointer"
                  >
                    <span>{qa.icon}</span>
                    <span className="font-medium text-white">{qa.name}</span>
                    <span className="text-neutral-500 font-mono text-[11px] ml-auto">{qa.url}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Matching History */}
            {matchingHistory.length > 0 && (
              <div className="mt-1 pt-1 border-t border-neutral-800">
                <div className="px-3 py-1 text-[10px] uppercase font-semibold text-neutral-400 tracking-wider">
                  Recent History
                </div>
                {matchingHistory.map((h) => (
                  <div
                    key={h.id}
                    onClick={() => {
                      onNavigate(h.url);
                      setIsFocused(false);
                    }}
                    className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl hover:bg-neutral-800 text-neutral-300 cursor-pointer"
                  >
                    <span>{h.favicon}</span>
                    <span className="truncate">{h.title}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Browser Tool Actions: DevTools, Extensions, Downloads, Settings */}
      <div className="flex items-center gap-1 text-neutral-400">
        {/* Zoom Selector dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowZoomMenu(!showZoomMenu)}
            aria-label="Adjust zoom level"
            className="p-1.5 rounded-lg hover:bg-neutral-800 hover:text-white transition-colors"
            title="Zoom Page"
          >
            <ZoomIn className="w-4 h-4" />
          </button>

          {showZoomMenu && (
            <div className="absolute right-0 top-full mt-1 bg-neutral-900 border border-neutral-800 rounded-xl p-1 shadow-2xl z-50 w-28 text-xs">
              {[80, 90, 100, 110, 125, 150].map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => {
                    onChangeZoom(lvl);
                    setShowZoomMenu(false);
                  }}
                  className={`w-full text-left px-2.5 py-1 rounded-lg ${
                    activeTab.zoomLevel === lvl ? 'bg-sky-600 text-white font-medium' : 'text-neutral-300 hover:bg-neutral-800'
                  }`}
                >
                  {lvl}% {lvl === 100 && '(Default)'}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* DevTools Toggle */}
        <button
          onClick={onToggleDevTools}
          aria-label="Toggle developer tools"
          className={`p-1.5 rounded-lg hover:bg-neutral-800 transition-colors ${
            isDevToolsOpen ? 'text-sky-400 bg-neutral-800' : 'hover:text-white'
          }`}
          title="Toggle Developer Tools (F12)"
        >
          <Code2 className="w-4 h-4" />
        </button>

        {/* Extensions */}
        <button
          onClick={onOpenExtensionsModal}
          aria-label="Manage extensions"
          className="p-1.5 rounded-lg hover:bg-neutral-800 hover:text-white transition-colors"
          title="Browser Extensions"
        >
          <Puzzle className="w-4 h-4" />
        </button>

        {/* Downloads */}
        <button
          onClick={onOpenDownloadsDrawer}
          aria-label="View downloads"
          className="relative p-1.5 rounded-lg hover:bg-neutral-800 hover:text-white transition-colors"
          title="Downloads Manager"
        >
          <Download className="w-4 h-4" />
          {downloadsCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-sky-500 text-neutral-950 text-[10px] font-bold rounded-full flex items-center justify-center">
              {downloadsCount}
            </span>
          )}
        </button>

        {/* Settings Menu */}
        <button
          onClick={onOpenSettingsModal}
          aria-label="Browser settings"
          className="p-1.5 rounded-lg hover:bg-neutral-800 hover:text-white transition-colors"
          title="Browser Settings"
        >
          <MoreVertical className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
