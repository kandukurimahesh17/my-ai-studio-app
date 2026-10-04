import React from 'react';
import { Star, ExternalLink, X } from 'lucide-react';
import { Bookmark } from '../../types/browser';

interface BookmarkToastProps {
  bookmark: Bookmark | null;
  onOpenBookmarks: () => void;
  onDismiss: () => void;
}

export const BookmarkToast: React.FC<BookmarkToastProps> = ({
  bookmark,
  onOpenBookmarks,
  onDismiss,
}) => {
  if (!bookmark) return null;

  return (
    <div className="absolute top-10 inset-x-3 z-50 flex items-center justify-between p-3 bg-neutral-900/95 backdrop-blur-md text-white rounded-2xl border border-amber-400/40 shadow-2xl animate-in fade-in slide-in-from-top-3 duration-300 select-none">
      <div className="flex items-center gap-2.5 min-w-0 flex-1">
        <div className="w-8 h-8 rounded-xl bg-amber-400/20 text-amber-400 border border-amber-400/40 flex items-center justify-center shrink-0">
          <Star className="w-4 h-4 fill-current" />
        </div>
        <div className="min-w-0 flex-1">
          <span className="text-[10px] text-amber-400 uppercase font-bold tracking-wider block">
            Bookmark Saved
          </span>
          <span className="text-xs font-semibold truncate block text-neutral-100">
            {bookmark.title}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-1.5 shrink-0">
        <button
          onClick={() => {
            onOpenBookmarks();
            onDismiss();
          }}
          className="px-2.5 py-1 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold rounded-lg text-xs flex items-center gap-1 active:scale-95 transition-transform"
        >
          <span>View</span>
          <ExternalLink className="w-3 h-3" />
        </button>

        <button onClick={onDismiss} className="p-1 text-neutral-400 hover:text-white rounded-lg">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
