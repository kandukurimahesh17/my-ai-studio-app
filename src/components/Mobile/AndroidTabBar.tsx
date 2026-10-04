import React, { useRef } from 'react';
import { Plus, X, EyeOff, Layers } from 'lucide-react';
import { Tab } from '../../types/browser';

interface AndroidTabBarProps {
  tabs: Tab[];
  activeTabId: string;
  onSelectTab: (id: string) => void;
  onCloseTab: (id: string, e: React.MouseEvent) => void;
  onNewTab: () => void;
  onOpenTabSwitcher: () => void;
  isIncognito: boolean;
}

export const AndroidTabBar: React.FC<AndroidTabBarProps> = ({
  tabs,
  activeTabId,
  onSelectTab,
  onCloseTab,
  onNewTab,
  onOpenTabSwitcher,
  isIncognito,
}) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  return (
    <div
      className={`w-full border-b px-1.5 pt-1.5 flex items-center gap-1 select-none z-20 shrink-0 overflow-hidden transition-colors ${
        isIncognito
          ? 'bg-[#181818] border-neutral-800 text-neutral-200'
          : 'bg-[#E8EAED] border-neutral-300/80 text-neutral-900'
      }`}
    >
      {/* Incognito badge if active */}
      {isIncognito && (
        <div className="flex items-center gap-1 bg-purple-950/90 border border-purple-500/50 text-purple-300 text-[10px] px-2 py-1 rounded-lg mr-1 font-bold shrink-0">
          <EyeOff className="w-3 h-3" />
          <span>Private</span>
        </div>
      )}

      {/* Scrollable Tabs Row */}
      <div
        ref={scrollRef}
        className="flex items-center gap-1 flex-1 overflow-x-auto no-scrollbar scroll-smooth pr-1"
      >
        {tabs.map((tab) => {
          const isActive = tab.id === activeTabId;
          return (
            <div
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`group relative flex items-center gap-1.5 px-3 py-1.5 rounded-t-xl text-xs cursor-pointer transition-all shrink-0 max-w-[150px] min-w-[100px] border-t border-x ${
                isActive
                  ? isIncognito
                    ? 'bg-[#2A2A2A] text-white border-neutral-700 shadow-xs font-semibold'
                    : 'bg-white text-neutral-900 border-neutral-300 shadow-xs font-semibold'
                  : isIncognito
                  ? 'bg-[#1F1F1F] hover:bg-[#252525] text-neutral-400 border-transparent font-medium'
                  : 'bg-[#DADCE0] hover:bg-[#E1E3E6] text-neutral-600 border-transparent font-medium'
              }`}
            >
              {/* Favicon */}
              <span className="text-xs shrink-0 select-none">{tab.favicon || '🌐'}</span>

              {/* Title */}
              <span className="truncate flex-1 text-[11px] leading-tight">
                {tab.title || 'New Tab'}
              </span>

              {/* Close Tab Button */}
              {tabs.length > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onCloseTab(tab.id, e);
                  }}
                  className={`w-4 h-4 rounded-full flex items-center justify-center transition-all shrink-0 ml-0.5 ${
                    isIncognito
                      ? 'hover:bg-neutral-700 text-neutral-400 hover:text-white'
                      : 'hover:bg-neutral-200 text-neutral-500 hover:text-neutral-900'
                  }`}
                  title="Close tab"
                >
                  <X className="w-3 h-3" />
                </button>
              )}

              {/* Active Tab Accent Bar */}
              {isActive && (
                <div
                  className={`absolute -top-[1px] inset-x-2 h-[2.5px] rounded-full ${
                    isIncognito ? 'bg-purple-500' : 'bg-amber-500'
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Right Controls: + New Tab & Grid View */}
      <div className="flex items-center gap-1 shrink-0 pb-1 pr-1">
        <button
          onClick={onNewTab}
          className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
            isIncognito
              ? 'hover:bg-neutral-800 text-neutral-300'
              : 'hover:bg-neutral-300/80 active:bg-neutral-400/80 text-neutral-700'
          }`}
          title="Open new tab"
        >
          <Plus className="w-4 h-4" />
        </button>

        <button
          onClick={onOpenTabSwitcher}
          className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors text-[11px] font-bold ${
            isIncognito
              ? 'hover:bg-neutral-800 text-purple-300'
              : 'hover:bg-neutral-300/80 active:bg-neutral-400/80 text-neutral-700'
          }`}
          title="View all tabs"
        >
          <div
            className={`w-4 h-4 border-[1.5px] rounded-[4px] flex items-center justify-center leading-none text-[9px] ${
              isIncognito ? 'border-purple-400' : 'border-neutral-700'
            }`}
          >
            {tabs.length}
          </div>
        </button>
      </div>
    </div>
  );
};
