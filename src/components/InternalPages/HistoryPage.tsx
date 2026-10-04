import React, { useState } from 'react';
import { History as HistoryIcon, Search, Trash2, ExternalLink } from 'lucide-react';
import { HistoryItem } from '../../types/browser';

interface HistoryPageProps {
  history: HistoryItem[];
  onNavigate: (url: string) => void;
  onRemoveItem: (id: string) => void;
  onClearAll: () => void;
}

export const HistoryPage: React.FC<HistoryPageProps> = ({
  history,
  onNavigate,
  onRemoveItem,
  onClearAll,
}) => {
  const [search, setSearch] = useState('');

  const filtered = history.filter((item) =>
    search ? item.title.toLowerCase().includes(search.toLowerCase()) || item.url.toLowerCase().includes(search.toLowerCase()) : true
  );

  return (
    <div className="flex-1 h-full overflow-y-auto bg-neutral-950 text-neutral-100 p-6 md:p-12 font-sans flex flex-col">
      <div className="max-w-4xl w-full mx-auto flex-1 flex flex-col">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-neutral-800 gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <HistoryIcon className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight">Browsing History</h1>
              <p className="text-xs text-neutral-400">Pages visited during active browser sessions</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative flex items-center bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-1.5 focus-within:border-emerald-500">
              <Search className="w-3.5 h-3.5 text-neutral-400 mr-2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search history..."
                className="bg-transparent text-xs text-white outline-none w-44"
              />
            </div>

            {history.length > 0 && (
              <button
                onClick={onClearAll}
                className="px-3 py-1.5 bg-rose-950 hover:bg-rose-900 border border-rose-800 text-rose-300 rounded-xl text-xs font-medium transition-colors flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All</span>
              </button>
            )}
          </div>
        </div>

        {/* History Items List */}
        <div className="flex-1">
          {filtered.length === 0 ? (
            <div className="py-20 text-center text-neutral-500 text-xs">
              No matching history entries found.
            </div>
          ) : (
            <div className="space-y-2">
              {filtered.map((item) => (
                <div
                  key={item.id}
                  className="group flex items-center justify-between p-3 rounded-xl bg-neutral-900/60 border border-neutral-800/80 hover:border-neutral-700 transition-all text-xs"
                >
                  <div
                    onClick={() => onNavigate(item.url)}
                    className="flex items-center gap-3 flex-1 min-w-0 cursor-pointer"
                  >
                    <span className="text-sm shrink-0">{item.favicon || '🌐'}</span>
                    <div className="min-w-0 flex-1">
                      <div className="font-medium text-neutral-200 group-hover:text-emerald-400 truncate transition-colors">
                        {item.title}
                      </div>
                      <div className="text-[11px] text-neutral-400 truncate">{item.url}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-neutral-400 ml-4 shrink-0">
                    <span className="tabular-nums font-mono text-[11px]">
                      {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="p-1 text-neutral-500 hover:text-rose-400 transition-colors opacity-0 group-hover:opacity-100"
                      title="Remove from history"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
