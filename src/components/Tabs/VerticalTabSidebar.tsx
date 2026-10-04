import React, { useState } from 'react';
import { Plus, X, Pin, Volume2, VolumeX, ShieldAlert, ChevronLeft, ChevronRight, Compass, Bookmark, History, Settings, Code2 } from 'lucide-react';
import { Tab } from '../../types/browser';

interface VerticalTabSidebarProps {
  tabs: Tab[];
  activeTabId: string;
  onSelectTab: (id: string) => void;
  onCloseTab: (id: string, e: React.MouseEvent) => void;
  onNewTab: () => void;
  onTogglePin: (id: string, e: React.MouseEvent) => void;
  onToggleMute: (id: string, e: React.MouseEvent) => void;
  onNavigateInternal: (url: string) => void;
  isIncognito: boolean;
}

export const VerticalTabSidebar: React.FC<VerticalTabSidebarProps> = ({
  tabs,
  activeTabId,
  onSelectTab,
  onCloseTab,
  onNewTab,
  onTogglePin,
  onToggleMute,
  onNavigateInternal,
  isIncognito,
}) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`h-full bg-neutral-950 border-r border-neutral-800/80 flex flex-col transition-all duration-200 select-none z-20 ${
        collapsed ? 'w-16' : 'w-60'
      }`}
    >
      {/* Brand & Collapse Bar */}
      <div className="p-3 border-b border-neutral-800/80 flex items-center justify-between">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-amber-400 text-neutral-950 flex items-center justify-center text-sm font-bold shadow-sm">
              🍋
            </div>
            <span className="font-bold text-sm tracking-tight text-white">Lemon</span>
          </div>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded hover:bg-neutral-900 text-neutral-400 hover:text-white mx-auto"
          title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Incognito indicator if active */}
      {isIncognito && !collapsed && (
        <div className="mx-3 mt-2 p-2 bg-purple-950/60 border border-purple-900 rounded-xl flex items-center gap-2 text-xs text-purple-300">
          <ShieldAlert className="w-4 h-4 text-purple-400 shrink-0" />
          <span>Private Mode Active</span>
        </div>
      )}

      {/* Quick Internal Nav Spaces */}
      <div className="p-2 border-b border-neutral-900 flex flex-col gap-1">
        <button
          onClick={() => onNavigateInternal('lemon://newtab')}
          className="flex items-center gap-2.5 p-2 rounded-xl text-xs text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors"
          title="New Tab / Speed Dial"
        >
          <Compass className="w-4 h-4 text-amber-400 shrink-0" />
          {!collapsed && <span className="font-medium">Speed Dial</span>}
        </button>

        <button
          onClick={() => onNavigateInternal('lemon://playground')}
          className="flex items-center gap-2.5 p-2 rounded-xl text-xs text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors"
          title="Code Playground"
        >
          <Code2 className="w-4 h-4 text-yellow-400 shrink-0" />
          {!collapsed && <span className="font-medium">Playground</span>}
        </button>

        <button
          onClick={() => onNavigateInternal('lemon://bookmarks')}
          className="flex items-center gap-2.5 p-2 rounded-xl text-xs text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors"
          title="Bookmarks"
        >
          <Bookmark className="w-4 h-4 text-amber-400 shrink-0" />
          {!collapsed && <span className="font-medium">Bookmarks</span>}
        </button>

        <button
          onClick={() => onNavigateInternal('lemon://history')}
          className="flex items-center gap-2.5 p-2 rounded-xl text-xs text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors"
          title="History"
        >
          <History className="w-4 h-4 text-emerald-400 shrink-0" />
          {!collapsed && <span className="font-medium">History</span>}
        </button>
      </div>

      {/* Pinned / Active Tabs Section */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {!collapsed && (
          <div className="flex items-center justify-between px-2 py-1 text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
            <span>Tabs ({tabs.length})</span>
            <button
              onClick={onNewTab}
              className="p-1 hover:text-white hover:bg-neutral-900 rounded"
              title="New Tab"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {tabs.map((tab) => {
          const isActive = tab.id === activeTabId;
          return (
            <div
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`group flex items-center gap-2.5 p-2 rounded-xl text-xs cursor-pointer transition-all ${
                isActive
                  ? 'bg-neutral-900 text-white font-medium shadow-sm border border-neutral-700/60'
                  : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900/50'
              }`}
              title={tab.title}
            >
              <span className="text-sm shrink-0">{tab.favicon || '🌐'}</span>

              {!collapsed && (
                <>
                  <span className="truncate flex-1">{tab.title || 'New Tab'}</span>

                  {tab.isMuted && <VolumeX className="w-3.5 h-3.5 text-amber-400 shrink-0" />}

                  {!tab.isPinned && tabs.length > 1 && (
                    <button
                      onClick={(e) => onCloseTab(tab.id, e)}
                      aria-label="Close tab"
                      className="p-1 rounded hover:bg-neutral-800 text-neutral-500 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Footer Actions */}
      <div className="p-2 border-t border-neutral-900">
        <button
          onClick={() => onNavigateInternal('aura://settings')}
          className="w-full flex items-center gap-2.5 p-2 rounded-xl text-xs text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors"
          title="Settings"
        >
          <Settings className="w-4 h-4 shrink-0" />
          {!collapsed && <span>Settings</span>}
        </button>
      </div>
    </aside>
  );
};
