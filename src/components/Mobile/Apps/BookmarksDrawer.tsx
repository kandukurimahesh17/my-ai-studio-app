import React, { useState } from 'react';
import {
  X,
  Bookmark as BookmarkIcon,
  Star,
  Search,
  Plus,
  Trash2,
  ExternalLink,
  Folder,
  Globe,
  Check,
} from 'lucide-react';
import { Bookmark } from '../../../types/browser';

interface BookmarksDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  bookmarks: Bookmark[];
  onNavigate: (url: string) => void;
  onRemoveBookmark: (id: string) => void;
  onAddBookmark: (title: string, url: string, folder?: string) => void;
  currentTabTitle?: string;
  currentTabUrl?: string;
}

export const BookmarksDrawer: React.FC<BookmarksDrawerProps> = ({
  isOpen,
  onClose,
  bookmarks,
  onNavigate,
  onRemoveBookmark,
  onAddBookmark,
  currentTabTitle = '',
  currentTabUrl = '',
}) => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [customTitle, setCustomTitle] = useState('');
  const [customUrl, setCustomUrl] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const isCurrentPageBookmarked =
    currentTabUrl && bookmarks.some((b) => b.url === currentTabUrl);

  const handleBookmarkCurrentPage = () => {
    if (!currentTabUrl || isCurrentPageBookmarked) return;
    onAddBookmark(currentTabTitle || 'Page Bookmark', currentTabUrl);
  };

  const handleManualAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTitle.trim() || !customUrl.trim()) return;
    let url = customUrl.trim();
    if (!url.startsWith('http://') && !url.startsWith('https://') && !url.startsWith('lemon://')) {
      url = 'https://' + url;
    }
    onAddBookmark(customTitle.trim(), url);
    setCustomTitle('');
    setCustomUrl('');
    setShowAddForm(false);
  };

  const filteredBookmarks = bookmarks.filter((b) => {
    const matchesSearch =
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.url.toLowerCase().includes(search.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-end justify-center p-0 select-none">
      <div className="bg-white text-neutral-900 rounded-t-3xl max-w-md w-full p-5 shadow-2xl flex flex-col max-h-[88vh] border-t border-neutral-100">
        <div className="w-10 h-1 bg-neutral-300 rounded-full mx-auto mb-3" />

        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-400 text-neutral-950 flex items-center justify-center font-bold shadow-xs">
              <Star className="w-4 h-4 fill-current" />
            </div>
            <div>
              <h3 className="font-bold text-base text-neutral-900 leading-tight">Bookmarks</h3>
              <p className="text-[11px] text-neutral-500 font-medium">
                {bookmarks.length} saved {bookmarks.length === 1 ? 'site' : 'sites'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs font-semibold flex items-center gap-1 shadow-sm active:scale-95 transition-transform"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
            <button onClick={onClose} className="p-1.5 text-neutral-400 hover:text-neutral-700 rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Quick 1-Tap Bookmark Current Page Banner */}
        {currentTabUrl && !isCurrentPageBookmarked && currentTabUrl !== 'lemon://newtab' && (
          <div className="my-2 p-2.5 bg-amber-50 border border-amber-200/80 rounded-2xl flex items-center justify-between gap-3">
            <div className="min-w-0 flex-1">
              <span className="text-[11px] font-bold text-amber-900 block truncate">
                Bookmark current page?
              </span>
              <span className="text-[10px] text-amber-700 truncate block">{currentTabTitle}</span>
            </div>
            <button
              onClick={handleBookmarkCurrentPage}
              className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 rounded-xl text-xs font-bold shrink-0 shadow-xs active:scale-95 transition-transform flex items-center gap-1"
            >
              <Star className="w-3 h-3 fill-current" />
              <span>Save</span>
            </button>
          </div>
        )}

        {/* Manual Add Form (Expandable) */}
        {showAddForm && (
          <form
            onSubmit={handleManualAdd}
            className="my-2 p-3 bg-neutral-50 rounded-2xl border border-neutral-200/80 space-y-2 animate-in fade-in duration-150"
          >
            <span className="text-xs font-bold text-neutral-800 block">Add Custom Bookmark</span>
            <input
              type="text"
              placeholder="Title (e.g. GitHub)"
              value={customTitle}
              onChange={(e) => setCustomTitle(e.target.value)}
              className="w-full bg-white border border-neutral-200 rounded-xl px-3 py-1.5 text-xs text-neutral-900 outline-none focus:border-amber-400"
              required
            />
            <input
              type="text"
              placeholder="URL (e.g. https://github.com)"
              value={customUrl}
              onChange={(e) => setCustomUrl(e.target.value)}
              className="w-full bg-white border border-neutral-200 rounded-xl px-3 py-1.5 text-xs text-neutral-900 outline-none focus:border-amber-400"
              required
            />
            <div className="flex justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-3 py-1 text-xs text-neutral-500 hover:text-neutral-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-3.5 py-1 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold rounded-xl text-xs shadow-xs"
              >
                Save Bookmark
              </button>
            </div>
          </form>
        )}

        {/* Search Bar */}
        <div className="my-2.5 flex items-center gap-2 bg-neutral-100 rounded-xl px-3 py-2 border border-transparent focus-within:border-neutral-300 focus-within:bg-white transition-all">
          <Search className="w-4 h-4 text-neutral-400 shrink-0" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search saved bookmarks..."
            className="w-full bg-transparent text-xs text-neutral-800 outline-none"
          />
          {search && (
            <button onClick={() => setSearch('')} className="text-neutral-400 hover:text-neutral-700 text-xs">
              ✕
            </button>
          )}
        </div>

        {/* Bookmarks List */}
        <div className="flex-1 overflow-y-auto space-y-2 py-1 pr-0.5">
          {filteredBookmarks.length === 0 ? (
            <div className="py-16 text-center flex flex-col items-center justify-center text-neutral-400">
              <div className="w-12 h-12 rounded-2xl bg-neutral-100 flex items-center justify-center text-neutral-400 mb-2">
                <BookmarkIcon className="w-6 h-6" />
              </div>
              <h4 className="text-xs font-semibold text-neutral-700">No bookmarks found</h4>
              <p className="text-[11px] text-neutral-400 max-w-xs mt-1">
                Tap the star icon in the address bar on any website to save it here.
              </p>
            </div>
          ) : (
            filteredBookmarks.map((bm) => (
              <div
                key={bm.id}
                className="p-3 bg-neutral-50 hover:bg-neutral-100/80 rounded-2xl border border-neutral-200/80 hover:border-neutral-300 transition-all flex items-center justify-between gap-3 group active:scale-[0.99]"
              >
                {/* 1-Tap Navigate to Bookmarked Site */}
                <div
                  onClick={() => {
                    onNavigate(bm.url);
                    onClose();
                  }}
                  className="flex items-center gap-3 min-w-0 flex-1 cursor-pointer"
                >
                  <div className="w-9 h-9 rounded-xl bg-white border border-neutral-200 flex items-center justify-center shrink-0 shadow-xs text-base">
                    {bm.favicon || '⭐'}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-semibold text-neutral-900 truncate group-hover:text-amber-600 transition-colors">
                      {bm.title}
                    </div>
                    <div className="text-[10px] text-neutral-400 truncate mt-0.5 font-mono">
                      {bm.url}
                    </div>
                  </div>
                </div>

                {/* Delete Bookmark Button */}
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => {
                      onNavigate(bm.url);
                      onClose();
                    }}
                    className="p-1.5 hover:bg-neutral-200 rounded-lg text-neutral-500 hover:text-neutral-900 transition-colors"
                    title="Open site"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onRemoveBookmark(bm.id)}
                    className="p-1.5 hover:bg-rose-100 rounded-lg text-neutral-400 hover:text-rose-600 transition-colors"
                    title="Delete bookmark"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
