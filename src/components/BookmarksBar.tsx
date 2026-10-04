import React from 'react';
import { Bookmark as BookmarkIcon, Plus, X } from 'lucide-react';
import { Bookmark } from '../types/browser';

interface BookmarksBarProps {
  bookmarks: Bookmark[];
  onNavigate: (url: string) => void;
  onRemoveBookmark: (id: string, e: React.MouseEvent) => void;
  onAddCurrentPage: () => void;
}

export const BookmarksBar: React.FC<BookmarksBarProps> = ({
  bookmarks,
  onNavigate,
  onRemoveBookmark,
  onAddCurrentPage,
}) => {
  return (
    <div className="bg-neutral-900/90 border-b border-neutral-800/80 px-3 py-1 flex items-center gap-1.5 overflow-x-auto no-scrollbar select-none text-xs">
      <div className="flex items-center gap-1 text-neutral-400 mr-2 shrink-0">
        <BookmarkIcon className="w-3.5 h-3.5 text-amber-400" />
      </div>

      <div className="flex items-center gap-1 flex-1 overflow-x-auto no-scrollbar">
        {bookmarks.map((bm) => (
          <div
            key={bm.id}
            onClick={() => onNavigate(bm.url)}
            className="group flex items-center gap-1.5 px-2 py-1 rounded-lg hover:bg-neutral-800 text-neutral-300 hover:text-white cursor-pointer transition-colors shrink-0 max-w-[170px]"
            title={`${bm.title} (${bm.url})`}
          >
            <span className="text-xs shrink-0">{bm.favicon || '⭐'}</span>
            <span className="truncate font-medium">{bm.title}</span>
            <button
              onClick={(e) => onRemoveBookmark(bm.id, e)}
              className="p-0.5 rounded hover:bg-neutral-700 text-neutral-500 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity ml-1"
              title="Remove bookmark"
            >
              <X className="w-2.5 h-2.5" />
            </button>
          </div>
        ))}

        <button
          onClick={onAddCurrentPage}
          className="flex items-center gap-1 px-2 py-1 rounded-lg text-neutral-500 hover:text-neutral-300 hover:bg-neutral-800 transition-colors shrink-0 text-[11px]"
          title="Bookmark current tab"
        >
          <Plus className="w-3 h-3" />
          <span>Add bookmark</span>
        </button>
      </div>
    </div>
  );
};
