import React from 'react';
import { ArrowDown, CheckCircle2, ExternalLink, X } from 'lucide-react';
import { DownloadItem } from '../../types/browser';

interface DownloadToastProps {
  item: DownloadItem | null;
  onOpen: (item: DownloadItem) => void;
  onDismiss: () => void;
}

export const DownloadToast: React.FC<DownloadToastProps> = ({ item, onOpen, onDismiss }) => {
  if (!item) return null;

  return (
    <div className="absolute top-10 inset-x-3 z-50 flex items-center justify-between p-3.5 bg-neutral-900/95 backdrop-blur-md text-white rounded-2xl border border-neutral-800 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300">
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0">
          <CheckCircle2 className="w-5 h-5" />
        </div>
        <div className="min-w-0 flex-1">
          <span className="text-[10px] text-emerald-400 uppercase font-bold tracking-wider block">
            Download Complete
          </span>
          <span className="text-xs font-semibold truncate block text-neutral-100">{item.name}</span>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={() => {
            onOpen(item);
            onDismiss();
          }}
          className="px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold rounded-xl text-xs flex items-center gap-1 shadow-sm active:scale-95 transition-transform"
        >
          <span>Open</span>
          <ExternalLink className="w-3 h-3" />
        </button>

        <button onClick={onDismiss} className="p-1 text-neutral-400 hover:text-white rounded-lg">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
