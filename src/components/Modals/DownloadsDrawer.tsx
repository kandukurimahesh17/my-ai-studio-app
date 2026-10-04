import React from 'react';
import { X, Download, FileText, CheckCircle2, Trash2, ExternalLink } from 'lucide-react';
import { DownloadItem } from '../../types/browser';

interface DownloadsDrawerProps {
  downloads: DownloadItem[];
  isOpen: boolean;
  onClose: () => void;
  onClearDownloads: () => void;
}

export const DownloadsDrawer: React.FC<DownloadsDrawerProps> = ({
  downloads,
  isOpen,
  onClose,
  onClearDownloads,
}) => {
  if (!isOpen) return null;

  const handleOpenFile = (item: DownloadItem) => {
    if (item.content) {
      const blob = new Blob([item.content], { type: item.mimeType || 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = item.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-md bg-neutral-900 border-l border-neutral-800 h-full p-6 flex flex-col text-neutral-100 text-xs shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
          <div className="flex items-center gap-2">
            <Download className="w-4 h-4 text-sky-400" />
            <h3 className="font-semibold text-sm text-white">Downloads</h3>
            <span className="text-[11px] text-neutral-400">({downloads.length})</span>
          </div>
          <div className="flex items-center gap-2">
            {downloads.length > 0 && (
              <button
                onClick={onClearDownloads}
                className="text-neutral-400 hover:text-rose-400 p-1 transition-colors"
                title="Clear all downloads"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
            <button onClick={onClose} className="text-neutral-400 hover:text-white p-1">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Downloads List */}
        <div className="flex-1 overflow-y-auto py-4 space-y-3">
          {downloads.length === 0 ? (
            <div className="py-20 flex flex-col items-center justify-center text-neutral-500 gap-2">
              <Download className="w-8 h-8 opacity-40" />
              <span>No active or previous downloads</span>
            </div>
          ) : (
            downloads.map((item) => (
              <div
                key={item.id}
                className="p-3 bg-neutral-950/80 border border-neutral-800 rounded-xl flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="w-9 h-9 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-sky-400 shrink-0">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-white truncate">{item.name}</div>
                    <div className="flex items-center gap-2 text-[10px] text-neutral-400 mt-0.5">
                      <span>{item.size}</span>
                      <span>·</span>
                      <span className="text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-2.5 h-2.5" />
                        Completed
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleOpenFile(item)}
                  className="px-2.5 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-sky-400 rounded-lg text-xs font-medium transition-colors shrink-0 flex items-center gap-1"
                >
                  <span>Save</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-neutral-800 text-neutral-400 text-[11px] text-center">
          Files exported from Lemon Browser save directly to your computer.
        </div>
      </div>
    </div>
  );
};
