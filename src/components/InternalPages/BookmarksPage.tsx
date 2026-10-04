import React, { useState } from 'react';
import { Bookmark as BookmarkIcon, Search, Plus, Trash2, ExternalLink } from 'lucide-react';
import { Bookmark } from '../../types/browser';

interface BookmarksPageProps {
  bookmarks: Bookmark[];
  onNavigate: (url: string) => void;
  onRemoveBookmark: (id: string) => void;
  onAddBookmark: (title: string, url: string) => void;
}

export const BookmarksPage: React.FC<BookmarksPageProps> = ({
  bookmarks,
  onNavigate,
  onRemoveBookmark,
  onAddBookmark,
}) => {
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newUrl, setNewUrl] = useState('');

  const filtered = bookmarks.filter((b) =>
    search ? b.title.toLowerCase().includes(search.toLowerCase()) || b.url.toLowerCase().includes(search.toLowerCase()) : true
  );

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newUrl.trim()) return;
    let url = newUrl.trim();
    if (!url.startsWith('http') && !url.startsWith('aura://')) {
      url = 'https://' + url;
    }
    onAddBookmark(newTitle.trim(), url);
    setNewTitle('');
    setNewUrl('');
    setShowAddModal(false);
  };

  return (
    <div className="flex-1 h-full overflow-y-auto bg-neutral-950 text-neutral-100 p-6 md:p-12 font-sans flex flex-col">
      <div className="max-w-4xl w-full mx-auto flex-1 flex flex-col">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-neutral-800 gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
              <BookmarkIcon className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight">Bookmarks Manager</h1>
              <p className="text-xs text-neutral-400">Manage pinned websites and quick links</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative flex items-center bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-1.5 focus-within:border-amber-500">
              <Search className="w-3.5 h-3.5 text-neutral-400 mr-2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search bookmarks..."
                className="bg-transparent text-xs text-white outline-none w-44"
              />
            </div>

            <button
              onClick={() => setShowAddModal(true)}
              className="px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-neutral-950 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Bookmark</span>
            </button>
          </div>
        </div>

        {/* Add Modal */}
        {showAddModal && (
          <div className="mb-6 p-4 bg-neutral-900 border border-neutral-800 rounded-xl">
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">
              Add New Bookmark
            </h3>
            <form onSubmit={handleAdd} className="flex flex-wrap gap-2 items-center">
              <input
                type="text"
                placeholder="Page Title (e.g. GitHub)"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="flex-1 min-w-[150px] bg-neutral-950 border border-neutral-800 px-3 py-1.5 text-xs rounded-lg text-white outline-none focus:border-amber-500"
                required
              />
              <input
                type="text"
                placeholder="URL (e.g. https://github.com)"
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
                className="flex-1 min-w-[220px] bg-neutral-950 border border-neutral-800 px-3 py-1.5 text-xs rounded-lg text-white outline-none focus:border-amber-500"
                required
              />
              <button
                type="submit"
                className="bg-amber-500 hover:bg-amber-400 text-black text-xs font-semibold px-4 py-1.5 rounded-lg"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="text-neutral-400 hover:text-white text-xs px-2 py-1.5"
              >
                Cancel
              </button>
            </form>
          </div>
        )}

        {/* Bookmarks List */}
        <div className="flex-1">
          {filtered.length === 0 ? (
            <div className="py-20 text-center text-neutral-500 text-xs">
              No bookmarks found.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {filtered.map((bm) => (
                <div
                  key={bm.id}
                  className="group flex items-center justify-between p-3.5 rounded-xl bg-neutral-900/60 border border-neutral-800/80 hover:border-neutral-700 transition-all text-xs"
                >
                  <div
                    onClick={() => onNavigate(bm.url)}
                    className="flex items-center gap-3 flex-1 min-w-0 cursor-pointer"
                  >
                    <span className="text-base shrink-0">{bm.favicon || '⭐'}</span>
                    <div className="min-w-0 flex-1">
                      <div className="font-medium text-neutral-200 group-hover:text-amber-400 truncate transition-colors">
                        {bm.title}
                      </div>
                      <div className="text-[11px] text-neutral-400 truncate">{bm.url}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 ml-3 shrink-0">
                    <button
                      onClick={() => onRemoveBookmark(bm.id)}
                      className="p-1 text-neutral-500 hover:text-rose-400 transition-colors opacity-0 group-hover:opacity-100"
                      title="Delete bookmark"
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
