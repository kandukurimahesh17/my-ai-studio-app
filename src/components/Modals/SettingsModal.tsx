import React from 'react';
import { X, Search, Layout, Bookmark, ShieldAlert, Trash2, Keyboard, HelpCircle } from 'lucide-react';
import { SearchEngineType, TabLayoutStyle } from '../../types/browser';
import { SEARCH_ENGINES } from '../../utils/browserConstants';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultEngine: SearchEngineType;
  onSelectEngine: (engine: SearchEngineType) => void;
  tabLayout: TabLayoutStyle;
  onSelectTabLayout: (layout: TabLayoutStyle) => void;
  showBookmarksBar: boolean;
  onToggleBookmarksBar: () => void;
  isIncognito: boolean;
  onToggleIncognito: () => void;
  onClearHistory: () => void;
  onOpenShortcuts: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  defaultEngine,
  onSelectEngine,
  tabLayout,
  onSelectTabLayout,
  showBookmarksBar,
  onToggleBookmarksBar,
  isIncognito,
  onToggleIncognito,
  onClearHistory,
  onOpenShortcuts,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 select-none">
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl text-neutral-100 text-xs">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
          <div className="flex items-center gap-2">
            <span className="text-base">🍋</span>
            <h3 className="font-semibold text-base text-white">Lemon Browser Preferences</h3>
          </div>
          <button onClick={onClose} className="text-neutral-400 hover:text-white p-1">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Options List */}
        <div className="py-4 space-y-4">
          {/* Default Search Engine */}
          <div className="p-3 bg-neutral-950/70 border border-neutral-800 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Search className="w-4 h-4 text-sky-400" />
              <div>
                <div className="font-medium text-white">Search Engine</div>
                <div className="text-[11px] text-neutral-400">Used in omnibar when typing queries</div>
              </div>
            </div>
            <select
              value={defaultEngine}
              onChange={(e) => onSelectEngine(e.target.value as SearchEngineType)}
              aria-label="Select default search engine"
              className="bg-neutral-900 border border-neutral-700 text-neutral-200 px-2.5 py-1 rounded-lg outline-none font-medium"
            >
              {Object.values(SEARCH_ENGINES).map((eng) => (
                <option key={eng.id} value={eng.id}>
                  {eng.name}
                </option>
              ))}
            </select>
          </div>

          {/* Tab Layout: Horizontal vs Vertical (Arc style) */}
          <div className="p-3 bg-neutral-950/70 border border-neutral-800 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Layout className="w-4 h-4 text-purple-400" />
              <div>
                <div className="font-medium text-white">Tab Orientation</div>
                <div className="text-[11px] text-neutral-400">Choose Chrome-style top tabs or Arc-style sidebar</div>
              </div>
            </div>
            <div className="flex items-center bg-neutral-900 p-0.5 rounded-lg border border-neutral-800">
              <button
                onClick={() => onSelectTabLayout('horizontal')}
                className={`px-2.5 py-1 rounded text-xs transition-colors ${
                  tabLayout === 'horizontal' ? 'bg-sky-600 text-white font-medium' : 'text-neutral-400'
                }`}
              >
                Top Tabs
              </button>
              <button
                onClick={() => onSelectTabLayout('vertical')}
                className={`px-2.5 py-1 rounded text-xs transition-colors ${
                  tabLayout === 'vertical' ? 'bg-sky-600 text-white font-medium' : 'text-neutral-400'
                }`}
              >
                Vertical Sidebar
              </button>
            </div>
          </div>

          {/* Bookmarks Bar Toggle */}
          <div className="p-3 bg-neutral-950/70 border border-neutral-800 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Bookmark className="w-4 h-4 text-amber-400" />
              <div>
                <div className="font-medium text-white">Show Bookmarks Bar</div>
                <div className="text-[11px] text-neutral-400">Always visible toolbar under address bar</div>
              </div>
            </div>
            <button
              onClick={onToggleBookmarksBar}
              aria-label="Toggle bookmarks bar"
              className={`w-10 h-5 flex items-center rounded-full p-0.5 transition-colors ${
                showBookmarksBar ? 'bg-sky-500 justify-end' : 'bg-neutral-800 justify-start'
              }`}
            >
              <div className="w-4 h-4 rounded-full bg-white shadow-md" />
            </button>
          </div>

          {/* Incognito Mode */}
          <div className="p-3 bg-neutral-950/70 border border-neutral-800 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShieldAlert className="w-4 h-4 text-rose-400" />
              <div>
                <div className="font-medium text-white">Private Browsing (Incognito)</div>
                <div className="text-[11px] text-neutral-400">Prevent history logging and tracking cookies</div>
              </div>
            </div>
            <button
              onClick={onToggleIncognito}
              aria-label="Toggle incognito browsing"
              className={`w-10 h-5 flex items-center rounded-full p-0.5 transition-colors ${
                isIncognito ? 'bg-purple-600 justify-end' : 'bg-neutral-800 justify-start'
              }`}
            >
              <div className="w-4 h-4 rounded-full bg-white shadow-md" />
            </button>
          </div>

          {/* Keyboard Shortcuts button */}
          <div className="p-3 bg-neutral-950/70 border border-neutral-800 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Keyboard className="w-4 h-4 text-sky-400" />
              <div>
                <div className="font-medium text-white">Keyboard Shortcuts</div>
                <div className="text-[11px] text-neutral-400">View quick key combinations</div>
              </div>
            </div>
            <button
              onClick={() => {
                onClose();
                onOpenShortcuts();
              }}
              className="px-3 py-1 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded-lg transition-colors"
            >
              View Keys
            </button>
          </div>

          {/* Clear Browsing Data */}
          <div className="p-3 bg-neutral-950/70 border border-neutral-800 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Trash2 className="w-4 h-4 text-rose-400" />
              <div>
                <div className="font-medium text-white">Clear Browsing Data</div>
                <div className="text-[11px] text-neutral-400">Purge visited URLs and search cache</div>
              </div>
            </div>
            <button
              onClick={onClearHistory}
              className="px-3 py-1 bg-rose-950 hover:bg-rose-900 border border-rose-800 text-rose-300 rounded-lg transition-colors"
            >
              Purge Data
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-neutral-800 text-right">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl font-medium transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
