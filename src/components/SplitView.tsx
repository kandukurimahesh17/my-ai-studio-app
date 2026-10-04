import React, { useState } from 'react';
import { X, ArrowRightLeft, Maximize2 } from 'lucide-react';
import { Tab } from '../types/browser';

interface SplitViewProps {
  primaryTab: Tab;
  secondaryTab: Tab | null;
  tabs: Tab[];
  onSelectSecondaryTab: (tabId: string) => void;
  onCloseSplit: () => void;
  renderTabContent: (tab: Tab) => React.ReactNode;
}

export const SplitView: React.FC<SplitViewProps> = ({
  primaryTab,
  secondaryTab,
  tabs,
  onSelectSecondaryTab,
  onCloseSplit,
  renderTabContent,
}) => {
  const otherTabs = tabs.filter((t) => t.id !== primaryTab.id);

  return (
    <div className="flex-1 h-full w-full flex flex-col md:flex-row overflow-hidden relative">
      {/* Primary Left Pane */}
      <div className="flex-1 h-full flex flex-col border-b md:border-b-0 md:border-r border-neutral-800/80 overflow-hidden relative">
        <div className="bg-neutral-900/90 px-3 py-1 border-b border-neutral-800 text-[11px] font-medium text-neutral-400 flex items-center justify-between shrink-0">
          <span className="truncate">{primaryTab.title}</span>
          <span className="text-[10px] text-sky-400">Left Pane (Primary)</span>
        </div>
        <div className="flex-1 h-full overflow-hidden relative">
          {renderTabContent(primaryTab)}
        </div>
      </div>

      {/* Secondary Right Pane */}
      <div className="flex-1 h-full flex flex-col overflow-hidden relative">
        <div className="bg-neutral-900/90 px-3 py-1 border-b border-neutral-800 text-[11px] font-medium text-neutral-400 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-amber-400">Right Pane:</span>
            {secondaryTab ? (
              <span className="truncate max-w-[150px]">{secondaryTab.title}</span>
            ) : (
              <span>Choose tab</span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {/* Tab selector dropdown */}
            <select
              value={secondaryTab?.id || ''}
              onChange={(e) => onSelectSecondaryTab(e.target.value)}
              aria-label="Select secondary tab for split view"
              className="bg-neutral-950 text-neutral-300 border border-neutral-800 text-[10px] px-2 py-0.5 rounded outline-none"
            >
              <option value="" disabled>Select tab...</option>
              {otherTabs.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.title}
                </option>
              ))}
            </select>

            <button
              onClick={onCloseSplit}
              className="text-neutral-400 hover:text-white p-0.5"
              title="Close Split View"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="flex-1 h-full overflow-hidden relative bg-neutral-950">
          {secondaryTab ? (
            renderTabContent(secondaryTab)
          ) : (
            <div className="h-full flex flex-col items-center justify-center p-6 text-center text-neutral-500 text-xs">
              <p className="mb-3">Select another open tab from the dropdown above to view side-by-side.</p>
              <div className="flex flex-wrap gap-2 justify-center max-w-sm">
                {otherTabs.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => onSelectSecondaryTab(t.id)}
                    className="px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-lg text-neutral-300 transition-colors truncate max-w-[140px]"
                  >
                    {t.favicon} {t.title}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
