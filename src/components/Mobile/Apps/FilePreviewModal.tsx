import React from 'react';
import { X, Download, Share2, Trash2, FileText, Image, Code2, Music, Archive, ExternalLink, Check, Copy } from 'lucide-react';
import { DownloadItem } from '../../../types/browser';
import { PdfViewerModal } from './PdfViewerModal';

interface FilePreviewModalProps {
  item: DownloadItem | null;
  onClose: () => void;
  onDelete: (id: string) => void;
  onSaveToDevice: (item: DownloadItem) => void;
}

export const FilePreviewModal: React.FC<FilePreviewModalProps> = ({
  item,
  onClose,
  onDelete,
  onSaveToDevice,
}) => {
  const [copied, setCopied] = React.useState(false);

  if (!item) return null;

  const isPdf = item.name.toLowerCase().endsWith('.pdf') || (item.category === 'document' && !item.name.match(/\.(txt|md|docx|xlsx)$/i));

  if (isPdf) {
    return (
      <PdfViewerModal
        isOpen={true}
        onClose={onClose}
        title={item.name}
        content={item.content}
        onSaveToDevice={() => onSaveToDevice(item)}
      />
    );
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(item.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const isImage = item.category === 'image' || item.name.match(/\.(png|jpg|jpeg|svg|webp)$/i);
  const isCode = item.category === 'code' || item.name.match(/\.(html|js|json|css|ts)$/i);
  const isAudio = item.category === 'media' || item.name.match(/\.(mp3|wav|ogg)$/i);

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 select-none">
      <div className="bg-white text-neutral-900 rounded-t-3xl sm:rounded-2xl max-w-md w-full p-5 shadow-2xl flex flex-col max-h-[85vh] border-t border-neutral-100">
        <div className="w-10 h-1 bg-neutral-300 rounded-full mx-auto mb-3 sm:hidden" />

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
          <div className="min-w-0 flex-1 pr-3">
            <h3 className="font-bold text-sm text-neutral-900 truncate">{item.name}</h3>
            <p className="text-[11px] text-neutral-500 font-mono mt-0.5">{item.size} · Completed</p>
          </div>
          <button onClick={onClose} className="text-neutral-400 hover:text-neutral-700 p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Preview Viewport */}
        <div className="my-4 flex-1 overflow-y-auto max-h-[50vh] flex flex-col items-center justify-center bg-neutral-50 rounded-2xl border border-neutral-200/80 p-4">
          {isImage ? (
            <div className="flex flex-col items-center text-center">
              {item.content && item.content.startsWith('data:image') ? (
                <img
                  src={item.content}
                  alt={item.name}
                  className="max-h-60 max-w-full rounded-xl object-contain shadow-sm border border-neutral-200"
                />
              ) : (
                <div className="w-36 h-36 rounded-2xl bg-gradient-to-tr from-amber-400 to-rose-400 flex items-center justify-center text-white shadow-md">
                  <Image className="w-16 h-16" />
                </div>
              )}
              <span className="text-xs text-neutral-500 mt-3 font-medium">Image Asset · Ready to view</span>
            </div>
          ) : isCode ? (
            <div className="w-full text-left font-mono text-[11px] bg-neutral-950 text-amber-300 p-4 rounded-xl overflow-x-auto max-h-56 leading-relaxed">
              <pre className="whitespace-pre-wrap">{item.content || '// Standalone Code File\nconsole.log("Ready");'}</pre>
            </div>
          ) : isAudio ? (
            <div className="flex flex-col items-center text-center py-4">
              <div className="w-20 h-20 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mb-3 shadow-inner">
                <Music className="w-10 h-10 animate-pulse" />
              </div>
              <h4 className="font-semibold text-sm text-neutral-900">{item.name}</h4>
              <p className="text-xs text-neutral-400 mt-1">High-fidelity 320kbps Audio</p>
            </div>
          ) : (
            <div className="flex flex-col items-center text-center py-4">
              <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3">
                <Archive className="w-8 h-8" />
              </div>
              <span className="text-xs font-semibold text-neutral-800">{item.name}</span>
              <p className="text-[11px] text-neutral-500 mt-1 max-w-xs break-all font-mono">
                Source: {item.url}
              </p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-neutral-100">
          <button
            onClick={() => onSaveToDevice(item)}
            className="py-2.5 px-3 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-transform"
          >
            <Download className="w-4 h-4" />
            <span>Save</span>
          </button>

          <button
            onClick={handleCopyLink}
            className="py-2.5 px-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-semibold rounded-xl text-xs flex items-center justify-center gap-1.5 active:scale-95 transition-transform"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied' : 'Link'}</span>
          </button>

          <button
            onClick={() => {
              onDelete(item.id);
              onClose();
            }}
            className="py-2.5 px-3 bg-rose-50 hover:bg-rose-100 text-rose-600 font-semibold rounded-xl text-xs flex items-center justify-center gap-1.5 active:scale-95 transition-transform"
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
};
