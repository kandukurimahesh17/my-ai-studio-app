import React, { useState } from 'react';
import { X, Plus, Download, Sparkles, FileText, Image, Code2, Music, Archive, Globe } from 'lucide-react';
import { PRESET_DOWNLOADS, PresetDownload, formatBytes } from '../../../utils/downloadHelper';

interface NewDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartDownload: (filename: string, url: string, sizeBytes: number, mimeType: string, content?: string) => void;
}

export const NewDownloadModal: React.FC<NewDownloadModalProps> = ({
  isOpen,
  onClose,
  onStartDownload,
}) => {
  const [customUrl, setCustomUrl] = useState('');
  const [customName, setCustomName] = useState('');

  if (!isOpen) return null;

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customUrl.trim()) return;

    let filename = customName.trim();
    if (!filename) {
      try {
        const u = new URL(customUrl.trim());
        filename = u.pathname.split('/').pop() || 'downloaded-file.bin';
      } catch {
        filename = 'web-resource.bin';
      }
    }

    onStartDownload(
      filename,
      customUrl.trim(),
      2500000,
      'application/octet-stream',
      'Web resource content downloaded via Lemon Android Browser'
    );
    onClose();
  };

  const handleSelectPreset = (preset: PresetDownload) => {
    onStartDownload(
      preset.name,
      preset.url,
      preset.sizeBytes,
      preset.mimeType,
      preset.generateSampleContent()
    );
    onClose();
  };

  const getPresetIcon = (category: string) => {
    switch (category) {
      case 'image':
        return <Image className="w-5 h-5 text-emerald-500" />;
      case 'media':
        return <Music className="w-5 h-5 text-rose-500" />;
      case 'document':
        return <FileText className="w-5 h-5 text-amber-500" />;
      case 'code':
        return <Code2 className="w-5 h-5 text-blue-500" />;
      default:
        return <Archive className="w-5 h-5 text-purple-500" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 select-none">
      <div className="bg-white text-neutral-900 rounded-t-3xl sm:rounded-2xl max-w-md w-full p-5 shadow-2xl flex flex-col max-h-[85vh] border-t border-neutral-100 overflow-hidden">
        <div className="w-10 h-1 bg-neutral-300 rounded-full mx-auto mb-3 sm:hidden" />

        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-400 text-neutral-950 flex items-center justify-center shadow-xs">
              <Download className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-neutral-900">Initiate New Download</h3>
              <p className="text-[11px] text-neutral-500">Enter a web URL or select a sample package</p>
            </div>
          </div>
          <button onClick={onClose} className="text-neutral-400 hover:text-neutral-700 p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="my-3 overflow-y-auto space-y-4 max-h-[60vh] pr-1">
          {/* Custom URL Form */}
          <form onSubmit={handleCustomSubmit} className="space-y-2.5">
            <div>
              <label className="text-[11px] font-semibold text-neutral-700 uppercase tracking-wider block mb-1">
                Direct Download URL
              </label>
              <div className="flex items-center gap-2 bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2 focus-within:border-amber-500 focus-within:bg-white transition-all">
                <Globe className="w-4 h-4 text-neutral-400 shrink-0" />
                <input
                  type="text"
                  value={customUrl}
                  onChange={(e) => setCustomUrl(e.target.value)}
                  placeholder="https://example.com/file.zip"
                  className="w-full bg-transparent text-xs text-neutral-900 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-neutral-700 uppercase tracking-wider block mb-1">
                Save As (Optional)
              </label>
              <input
                type="text"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                placeholder="my-downloaded-file.zip"
                className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2 text-xs text-neutral-900 outline-none focus:border-amber-500 focus:bg-white transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={!customUrl.trim()}
              className="w-full py-2.5 bg-neutral-900 hover:bg-neutral-800 disabled:opacity-40 text-white font-semibold text-xs rounded-xl shadow-sm transition-all active:scale-98 flex items-center justify-center gap-1.5"
            >
              <Download className="w-4 h-4" />
              <span>Start Download</span>
            </button>
          </form>

          {/* Preset Sample Packages */}
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-800 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>One-Tap Sample Downloads</span>
            </div>

            <div className="space-y-2">
              {PRESET_DOWNLOADS.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectPreset(preset)}
                  className="w-full text-left p-3 rounded-2xl bg-neutral-50 hover:bg-amber-50/50 border border-neutral-200/80 hover:border-amber-300 transition-all flex items-center justify-between gap-3 group active:scale-98"
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="w-10 h-10 rounded-xl bg-white border border-neutral-200 flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                      {getPresetIcon(preset.category)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-semibold text-neutral-900 truncate">
                        {preset.name}
                      </div>
                      <div className="text-[10px] text-neutral-500 truncate mt-0.5">
                        {preset.description}
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-[11px] font-mono font-semibold text-neutral-700 block">
                      {formatBytes(preset.sizeBytes)}
                    </span>
                    <span className="text-[10px] font-semibold text-amber-600 uppercase tracking-tight">
                      + Add
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
