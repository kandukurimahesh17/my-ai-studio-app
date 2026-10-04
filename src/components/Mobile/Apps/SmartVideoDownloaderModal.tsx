import React, { useState } from 'react';
import {
  X,
  Download,
  Film,
  Music,
  CheckCircle,
  Play,
  Sparkles,
  Zap,
  ShieldCheck,
} from 'lucide-react';
import { DownloadItem } from '../../../types/browser';

interface VideoQualityOption {
  quality: string;
  resolution: string;
  size: string;
  format: 'mp4' | 'mp3';
  isAudio?: boolean;
}

const QUALITY_OPTIONS: VideoQualityOption[] = [
  { quality: '1080p Full HD', resolution: '1920x1080', size: '28.4 MB', format: 'mp4' },
  { quality: '720p HD', resolution: '1280x720', size: '14.2 MB', format: 'mp4' },
  { quality: '480p Fast', resolution: '854x480', size: '7.8 MB', format: 'mp4' },
  { quality: 'Audio Only (MP3)', resolution: '320 kbps', size: '3.6 MB', format: 'mp3', isAudio: true },
];

interface SmartVideoDownloaderModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoTitle: string;
  videoUrl: string;
  platform?: string;
  onStartDownload: (item: Omit<DownloadItem, 'id'>) => void;
}

export const SmartVideoDownloaderModal: React.FC<SmartVideoDownloaderModalProps> = ({
  isOpen,
  onClose,
  videoTitle,
  videoUrl,
  platform = 'Web Video',
  onStartDownload,
}) => {
  const [selectedQuality, setSelectedQuality] = useState<VideoQualityOption>(QUALITY_OPTIONS[1]);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handleDownload = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const fileName = `${(videoTitle || 'Detected_Video').replace(/[^a-zA-Z0-9_-]/g, '_')}_${selectedQuality.quality.split(' ')[0]}.${selectedQuality.format}`;
      onStartDownload({
        name: fileName,
        url: videoUrl || 'https://video.lemonbrowser.net/media/stream.mp4',
        size: selectedQuality.size,
        totalBytes: parseFloat(selectedQuality.size) * 1024 * 1024,
        downloadedBytes: 0,
        progress: 0,
        status: 'downloading',
        category: selectedQuality.isAudio ? 'media' : 'media',
        mimeType: selectedQuality.isAudio ? 'audio/mpeg' : 'video/mp4',
        content: `Media Stream (${selectedQuality.quality}) from ${platform}`,
      });
      setIsProcessing(false);
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 select-none animate-in fade-in">
      <div className="bg-white text-neutral-900 rounded-t-3xl sm:rounded-3xl max-w-sm w-full p-5 shadow-2xl flex flex-col border-t sm:border border-neutral-100">
        <div className="w-10 h-1 bg-neutral-300 rounded-full mx-auto mb-3 sm:hidden" />

        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-rose-500 text-white flex items-center justify-center font-bold shadow-xs">
              <Zap className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h3 className="font-bold text-base text-neutral-900 leading-tight">
                Smart Video Downloader
              </h3>
              <p className="text-[11px] text-neutral-500 font-medium">
                Auto-detected {platform} · 1-Click Save
              </p>
            </div>
          </div>

          <button onClick={onClose} className="p-1.5 text-neutral-400 hover:text-neutral-700 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Thumbnail Preview */}
        <div className="my-3.5 bg-neutral-900 rounded-2xl p-3 text-white flex items-center gap-3 relative overflow-hidden shadow-inner">
          <div className="w-16 h-14 rounded-xl bg-neutral-800 flex items-center justify-center relative overflow-hidden shrink-0 border border-neutral-700">
            <Film className="w-7 h-7 text-neutral-400" />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <Play className="w-4 h-4 fill-white text-white ml-0.5" />
            </div>
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="text-[10px] bg-rose-600 px-1.5 py-0.2 rounded font-bold uppercase tracking-wider text-white">
                {platform}
              </span>
              <span className="text-[10px] text-neutral-400">03:42</span>
            </div>
            <div className="text-xs font-semibold truncate leading-tight">
              {videoTitle || 'Social Media Video Stream'}
            </div>
            <div className="text-[10px] text-neutral-400 truncate mt-0.5 font-mono">
              {videoUrl || 'https://media.stream.mp4'}
            </div>
          </div>
        </div>

        {/* Quality Format Selection */}
        <div className="space-y-1.5 mb-4">
          <div className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider px-1">
            Select Download Quality
          </div>

          <div className="space-y-1.5">
            {QUALITY_OPTIONS.map((opt) => (
              <div
                key={opt.quality}
                onClick={() => setSelectedQuality(opt)}
                className={`p-2.5 rounded-2xl border transition-all flex items-center justify-between cursor-pointer active:scale-99 ${
                  selectedQuality.quality === opt.quality
                    ? 'border-rose-500 bg-rose-50/70 text-rose-950 font-semibold shadow-xs'
                    : 'border-neutral-200 hover:border-neutral-300 bg-neutral-50 text-neutral-700'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-7 h-7 rounded-xl flex items-center justify-center ${
                      opt.isAudio
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-rose-100 text-rose-600'
                    }`}
                  >
                    {opt.isAudio ? <Music className="w-4 h-4" /> : <Film className="w-4 h-4" />}
                  </div>
                  <div>
                    <div className="text-xs font-bold leading-tight">{opt.quality}</div>
                    <div className="text-[10px] text-neutral-400">{opt.resolution}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold">{opt.size}</span>
                  {selectedQuality.quality === opt.quality && (
                    <CheckCircle className="w-4 h-4 text-rose-600" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Download Action Button */}
        <button
          onClick={handleDownload}
          disabled={isProcessing}
          className="w-full py-3 bg-rose-600 hover:bg-rose-700 active:scale-98 text-white rounded-2xl text-xs font-bold shadow-lg flex items-center justify-center gap-2 transition-all"
        >
          {isProcessing ? (
            <span>Starting Download...</span>
          ) : (
            <>
              <Download className="w-4 h-4 stroke-[2.5]" />
              <span>Download {selectedQuality.quality.split(' ')[0]} ({selectedQuality.size})</span>
            </>
          )}
        </button>

        <div className="mt-2.5 text-center flex items-center justify-center gap-1.5 text-[10px] text-neutral-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>High-speed multi-threaded background download</span>
        </div>
      </div>
    </div>
  );
};
