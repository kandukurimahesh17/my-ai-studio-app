import React, { useState } from 'react';
import {
  X,
  History as HistoryIcon,
  Search,
  Trash2,
  ExternalLink,
  Clock,
  Calendar,
  AlertTriangle,
} from 'lucide-react';
import { HistoryItem } from '../../../types/browser';

interface HistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  history: HistoryItem[];
  onNavigate: (url: string) => void;
  onRemoveItem: (id: string) => void;
  onClearAll: () => void;
}

export const HistoryDrawer: React.FC<HistoryDrawerProps> = ({
  isOpen,
  onClose,
  history,
  onNavigate,
  onRemoveItem,
  onClearAll,
}) => {
  const [search, setSearch] = useState('');
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  if (!isOpen) return null;

  // Filter history
  const filteredHistory = history.filter((item) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return item.title.toLowerCase().includes(q) || item.url.toLowerCase().includes(q);
  });

  // Group by Today, Yesterday, or Older
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const yesterdayStart = todayStart - 86400000;

  const groups: { label: string; items: HistoryItem[] }[] = [];
  const todayItems: HistoryItem[] = [];
  const yesterdayItems: HistoryItem[] = [];
  const olderItems: HistoryItem[] = [];

  filteredHistory.forEach((item) => {
    if (item.timestamp >= todayStart) {
      todayItems.push(item);
    } else if (item.timestamp >= yesterdayStart) {
      yesterdayItems.push(item);
    } else {
      olderItems.push(item);
    }
  });

  if (todayItems.length > 0) groups.push({ label: 'Today', items: todayItems });
  if (yesterdayItems.length > 0) groups.push({ label: 'Yesterday', items: yesterdayItems });
  if (olderItems.length > 0) groups.push({ label: 'Older', items: olderItems });

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-end justify-center p-0 select-none">
      <div className="bg-white text-neutral-900 rounded-t-3xl max-w-md w-full p-5 shadow-2xl flex flex-col max-h-[88vh] border-t border-neutral-100">
        <div className="w-10 h-1 bg-neutral-300 rounded-full mx-auto mb-3" />

        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-bold shadow-xs">
              <HistoryIcon className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base text-neutral-900 leading-tight">Browsing History</h3>
              <p className="text-[11px] text-neutral-500 font-medium">
                {history.length} {history.length === 1 ? 'page' : 'pages'} visited · Most recent first
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {history.length > 0 && (
              <button
                onClick={() => setShowClearConfirm(true)}
                className="px-2.5 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl text-xs font-semibold flex items-center gap-1 transition-colors active:scale-95"
                title="Clear all browsing history"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear</span>
              </button>
            )}
            <button onClick={onClose} className="p-1.5 text-neutral-400 hover:text-neutral-700 rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Clear Confirmation Prompt */}
        {showClearConfirm && (
          <div className="my-3 p-3.5 bg-rose-50 rounded-2xl border border-rose-200 text-xs flex flex-col gap-2 animate-in fade-in duration-150">
            <div className="flex items-center gap-2 text-rose-800 font-bold">
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>Clear all browsing history?</span>
            </div>
            <p className="text-[11px] text-rose-700 leading-relaxed">
              This will remove all visited pages from this device. Bookmarks and downloads will remain intact.
            </p>
            <div className="flex items-center justify-end gap-2 mt-1">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="px-3 py-1 bg-white border border-rose-200 text-neutral-700 rounded-lg text-xs font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onClearAll();
                  setShowClearConfirm(false);
                }}
                className="px-3 py-1 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs font-bold shadow-xs"
              >
                Confirm Clear
              </button>
            </div>
          </div>
        )}

        {/* Search Bar */}
        <div className="my-2.5 flex items-center gap-2 bg-neutral-100 rounded-xl px-3 py-2 border border-transparent focus-within:border-neutral-300 focus-within:bg-white transition-all">
          <Search className="w-4 h-4 text-neutral-400 shrink-0" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search browsing history..."
            className="w-full bg-transparent text-xs text-neutral-800 outline-none"
          />
          {search && (
            <button onClick={() => setSearch('')} className="text-neutral-400 hover:text-neutral-700 text-xs">
              ✕
            </button>
          )}
        </div>

        {/* History Items Scrollable List */}
        <div className="flex-1 overflow-y-auto space-y-4 py-1 pr-0.5">
          {filteredHistory.length === 0 ? (
            <div className="py-16 text-center flex flex-col items-center justify-center text-neutral-400">
              <div className="w-12 h-12 rounded-2xl bg-neutral-100 flex items-center justify-center text-neutral-400 mb-2">
                <Clock className="w-6 h-6" />
              </div>
              <h4 className="text-xs font-semibold text-neutral-700">No history found</h4>
              <p className="text-[11px] text-neutral-400 max-w-xs mt-1">
                Pages you visit will automatically appear here with the most recent at the top.
              </p>
            </div>
          ) : (
            groups.map((group) => (
              <div key={group.label} className="space-y-1.5">
                <div className="flex items-center gap-1.5 px-1 text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
                  <Calendar className="w-3 h-3" />
                  <span>{group.label}</span>
                </div>

                <div className="space-y-1.5">
                  {group.items.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 bg-neutral-50 hover:bg-neutral-100/80 rounded-2xl border border-neutral-200/80 hover:border-neutral-300 transition-all flex items-center justify-between gap-3 group active:scale-[0.99]"
                    >
                      {/* Click to Navigate to that page */}
                      <div
                        onClick={() => {
                          onNavigate(item.url);
                          onClose();
                        }}
                        className="flex items-center gap-3 min-w-0 flex-1 cursor-pointer"
                      >
                        <div className="w-9 h-9 rounded-xl bg-white border border-neutral-200 flex items-center justify-center shrink-0 shadow-xs text-base">
                          {item.favicon || '🌐'}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-xs font-semibold text-neutral-900 truncate group-hover:text-emerald-600 transition-colors">
                            {item.title}
                          </div>
                          <div className="text-[10px] text-neutral-400 truncate mt-0.5 font-mono">
                            {item.url}
                          </div>
                        </div>
                      </div>

                      {/* Timestamp & Delete Action */}
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-[10px] font-mono text-neutral-400 tabular-nums">
                          {new Date(item.timestamp).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>

                        <button
                          onClick={() => {
                            onNavigate(item.url);
                            onClose();
                          }}
                          className="p-1.5 hover:bg-neutral-200 rounded-lg text-neutral-500 hover:text-neutral-900 transition-colors"
                          title="Open page"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="p-1.5 hover:bg-rose-100 rounded-lg text-neutral-400 hover:text-rose-600 transition-colors"
                          title="Remove from history"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
