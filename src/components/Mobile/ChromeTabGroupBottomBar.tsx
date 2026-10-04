import React from 'react';
import { ChevronUp, Plus, X } from 'lucide-react';
import { Tab, TabGroup } from '../../types/browser';

interface ChromeTabGroupBottomBarProps {
  group: TabGroup;
  tabsInGroup: Tab[];
  activeTabId: string;
  onSelectTab: (tabId: string) => void;
  onCloseTab: (tabId: string, e: React.MouseEvent) => void;
  onNewTabInGroup: () => void;
  onOpenGroupSheet: () => void;
}

export const ChromeTabGroupBottomBar: React.FC<ChromeTabGroupBottomBarProps> = ({
  tabsInGroup,
  activeTabId,
  onSelectTab,
  onCloseTab,
  onNewTabInGroup,
  onOpenGroupSheet,
}) => {
  return (
    <div className="w-full h-13 bg-white/95 backdrop-blur-md border-t border-neutral-200/90 px-3 flex items-center justify-between shrink-0 shadow-[0_-2px_12px_rgba(0,0,0,0.06)] z-30 select-none">
      {/* 1. Left: Up Arrow Button (^) - When clicked, opens the Expanded Tab Group Sheet (Image 4) */}
      <button
        type="button"
        onClick={onOpenGroupSheet}
        className="w-9 h-9 rounded-full flex items-center justify-center text-[#1F1F1F] hover:bg-neutral-100 active:scale-90 transition-transform shrink-0"
        title="Show group tabs"
      >
        <ChevronUp className="w-6 h-6 stroke-[2.4]" />
      </button>

      {/* 2. Middle: Circular Tab Chips (Image 2) */}
      <div className="flex-1 flex items-center justify-center gap-2.5 overflow-x-auto px-2 py-1 scrollbar-none">
        {tabsInGroup.map((tab) => {
          const isActive = tab.id === activeTabId;
          const isGoogleSearch = tab.url.includes('google.com/search') || tab.title.includes('Google');
          const isNewTab = tab.url === 'lemon://newtab' || tab.url === 'google://newtab' || tab.title === 'New tab';

          return (
            <div
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className="relative cursor-pointer shrink-0 transition-transform active:scale-90"
              title={tab.title}
            >
              {/* Circular Chip */}
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center shadow-xs transition-all ${
                  isActive
                    ? 'border-[2.5px] border-[#00676C] bg-white ring-2 ring-[#00676C]/20'
                    : 'bg-[#DFE5E2] hover:bg-[#D5DDD9]'
                }`}
              >
                {isNewTab ? (
                  // Chrome Circular Logo (Image 2 active chip)
                  <div className="w-5 h-5 rounded-full flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-4.5 h-4.5">
                      <circle cx="12" cy="12" r="10" fill="#4285F4" />
                      <circle cx="12" cy="12" r="7" fill="#EA4335" />
                      <circle cx="12" cy="12" r="5" fill="#FBBC05" />
                      <circle cx="12" cy="12" r="3.5" fill="#34A853" />
                      <circle cx="12" cy="12" r="2.2" fill="#FFFFFF" />
                      <circle cx="12" cy="12" r="1.5" fill="#1A73E8" />
                    </svg>
                  </div>
                ) : isGoogleSearch ? (
                  // Google G Logo (Image 2 chips)
                  <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center shadow-2xs">
                    <span className="text-[10px] font-bold text-[#4285F4]">G</span>
                  </div>
                ) : (
                  <span className="text-xs">{tab.favicon || '🌐'}</span>
                )}
              </div>

              {/* Close Tab (X) Badge on Active Chip (Image 2) */}
              {isActive && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onCloseTab(tab.id, e);
                  }}
                  className="w-4 h-4 rounded-full bg-[#00676C] hover:bg-[#004F53] text-white flex items-center justify-center absolute -top-1 -right-1 shadow-xs hover:scale-110 active:scale-95 transition-transform"
                  title="Close tab"
                >
                  <X className="w-2.5 h-2.5 stroke-[3]" />
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* 3. Right: Plus (+) Button to Add Tab to this Group (Image 2) */}
      <button
        type="button"
        onClick={onNewTabInGroup}
        className="w-9 h-9 rounded-full flex items-center justify-center text-[#1F1F1F] hover:bg-neutral-100 active:scale-90 transition-transform shrink-0"
        title="New tab in group"
      >
        <Plus className="w-5.5 h-5.5 stroke-[2.2]" />
      </button>
    </div>
  );
};
