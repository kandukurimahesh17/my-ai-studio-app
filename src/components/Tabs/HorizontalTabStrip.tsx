import React from 'react';
import { Plus, X, Volume2, VolumeX, Pin, ShieldAlert, SplitSquareVertical } from 'lucide-react';
import { Tab } from '../../types/browser';

interface HorizontalTabStripProps {
  tabs: Tab[];
  activeTabId: string;
  onSelectTab: (id: string) => void;
  onCloseTab: (id: string, e: React.MouseEvent) => void;
  onNewTab: () => void;
  onTogglePin: (id: string, e: React.MouseEvent) => void;
  onToggleMute: (id: string, e: React.MouseEvent) => void;
  isIncognito: boolean;
  isSplitView: boolean;
  onToggleSplitView: () => void;
}

export const HorizontalTabStrip: React.FC<HorizontalTabStripProps> = ({
  tabs,
  activeTabId,
  onSelectTab,
  onCloseTab,
  onNewTab,
  onTogglePin,
  onToggleMute,
  isIncognito,
  isSplitView,
  onToggleSplitView,
}) => {
  return (
    <div className="flex items-center bg-neutral-950 border-b border-neutral-800/80 px-2 pt-2 gap-1 overflow-x-auto no-scrollbar select-none">
      {/* Window Controls (Mac Style) */}
      <div className="flex items-center gap-1.5 px-2 mr-2">
        <div className="w-3 h-3 rounded-full bg-rose-500/80 hover:bg-rose-500 cursor-pointer shadow-sm" />
        <div className="w-3 h-3 rounded-full bg-amber-500/80 hover:bg-amber-500 cursor-pointer shadow-sm" />
        <div className="w-3 h-3 rounded-full bg-emerald-500/80 hover:bg-emerald-500 cursor-pointer shadow-sm" />
      </div>

      {/* Incognito badge if active */}
      {isIncognito && (
        <div className="flex items-center gap-1.5 bg-purple-950/70 border border-purple-800 text-purple-300 text-[11px] px-2.5 py-1 rounded-lg mr-2 font-medium shrink-0">
          <ShieldAlert className="w-3 h-3 text-purple-400" />
          <span>Incognito</span>
        </div>
      )}

      {/* Tabs List */}
      <div className="flex items-center gap-1 flex-1 overflow-x-auto no-scrollbar">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTabId;
          return (
            <div
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`group relative flex items-center gap-2 px-3 py-1.5 rounded-t-xl text-xs cursor-pointer transition-all duration-150 border-t border-x ${
                isActive
                  ? 'bg-neutral-900 text-white border-neutral-700/80 shadow-md'
                  : 'bg-neutral-950 hover:bg-neutral-900/60 text-neutral-400 hover:text-neutral-200 border-transparent'
              } ${tab.isPinned ? 'w-10 justify-center px-1' : 'min-w-[130px] max-w-[200px]'}`}
            >
              {/* Favicon */}
              <span className="text-xs shrink-0 select-none">
                {tab.favicon || '🌐'}
              </span>

              {/* Title */}
              {!tab.isPinned && (
                <span className="truncate flex-1 font-medium">
                  {tab.title || 'New Tab'}
                </span>
              )}

              {/* Mute button if audible */}
              <button
                onClick={(e) => onToggleMute(tab.id, e)}
                className={`p-0.5 rounded hover:bg-neutral-800 text-neutral-400 hover:text-white transition-opacity ${
                  tab.isMuted ? 'opacity-100 text-amber-400' : 'opacity-0 group-hover:opacity-100'
                }`}
                title={tab.isMuted ? 'Unmute Tab' : 'Mute Tab'}
              >
                {tab.isMuted ? (
                  <VolumeX className="w-3 h-3 text-amber-400" />
                ) : (
                  <Volume2 className="w-3 h-3" />
                )}
              </button>

              {/* Close Tab Button */}
              {!tab.isPinned && tabs.length > 1 && (
                <button
                  onClick={(e) => onCloseTab(tab.id, e)}
                  aria-label="Close tab"
                  className="p-0.5 rounded hover:bg-neutral-800 text-neutral-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Close Tab"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          );
        })}

        {/* New Tab Button */}
        <button
          onClick={onNewTab}
          aria-label="Open new tab"
          className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors shrink-0"
          title="New Tab (Ctrl+T)"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Split View Toggle */}
      <button
        onClick={onToggleSplitView}
        className={`px-2 py-1 rounded-lg text-xs flex items-center gap-1.5 transition-colors shrink-0 ${
          isSplitView ? 'bg-sky-950 text-sky-400 border border-sky-800' : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
        }`}
        title="Toggle Split Screen View"
      >
        <SplitSquareVertical className="w-3.5 h-3.5" />
        <span className="hidden sm:inline text-[11px] font-medium">Split View</span>
      </button>
    </div>
  );
};
