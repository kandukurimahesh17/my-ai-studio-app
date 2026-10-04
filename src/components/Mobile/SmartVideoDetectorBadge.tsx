import React from 'react';
import { Download, Film, Zap } from 'lucide-react';

interface SmartVideoDetectorBadgeProps {
  isVisible: boolean;
  onOpenDownloader: () => void;
  videoTitle?: string;
}

export const SmartVideoDetectorBadge: React.FC<SmartVideoDetectorBadgeProps> = ({
  isVisible,
  onOpenDownloader,
  videoTitle,
}) => {
  if (!isVisible) return null;

  return (
    <div className="absolute bottom-14 right-3 z-40 animate-in bounce-in duration-300">
      <button
        onClick={onOpenDownloader}
        className="flex items-center gap-2 bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-600 text-white pl-3 pr-3.5 py-2 rounded-full shadow-xl border border-white/20 active:scale-95 transition-all text-xs font-bold"
        title="Smart Video Downloader detected media"
      >
        <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center animate-pulse">
          <Download className="w-3 h-3 stroke-[3]" />
        </div>
        <span>Download Video</span>
      </button>
    </div>
  );
};
