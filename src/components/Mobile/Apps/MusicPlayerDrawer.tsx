import React, { useState } from 'react';
import { X, Play, Pause, SkipForward, SkipBack, Volume2, Music, Radio } from 'lucide-react';

interface MusicPlayerDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MusicPlayerDrawer: React.FC<MusicPlayerDrawerProps> = ({ isOpen, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  const playlist = [
    { title: 'Citrus Breeze (Chillhop)', artist: 'Lemon Radio', duration: '3:24' },
    { title: 'Morning Espresso & Code', artist: 'Lofi Pulse', duration: '2:48' },
    { title: 'Midnight City Lights', artist: 'Synth Horizon', duration: '4:12' },
  ];

  if (!isOpen) return null;

  const track = playlist[currentTrackIndex];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end justify-center p-0 select-none">
      <div className="bg-white text-neutral-900 rounded-t-3xl max-w-md w-full p-6 shadow-2xl flex flex-col border-t border-neutral-100">
        {/* Grab Handle */}
        <div className="w-10 h-1 bg-neutral-300 rounded-full mx-auto mb-3" />

        <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-rose-500 animate-pulse" />
            <span className="font-bold text-sm text-neutral-900">Lemon FM · Web Player</span>
          </div>
          <button onClick={onClose} className="text-neutral-400 hover:text-neutral-700 p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Track Artwork & Info */}
        <div className="py-6 flex flex-col items-center text-center">
          <div className="w-32 h-32 rounded-2xl bg-gradient-to-tr from-amber-400 via-rose-500 to-purple-600 flex items-center justify-center text-white shadow-xl mb-4 group hover:scale-105 transition-transform">
            <Music className={`w-12 h-12 ${isPlaying ? 'animate-bounce' : ''}`} />
          </div>

          <h3 className="font-bold text-base text-neutral-900">{track.title}</h3>
          <p className="text-xs text-neutral-500 mt-0.5">{track.artist}</p>

          {/* Fake Progress Bar */}
          <div className="w-full max-w-xs mt-6">
            <div className="w-full h-1.5 bg-neutral-100 rounded-full overflow-hidden">
              <div className={`h-full bg-rose-500 rounded-full ${isPlaying ? 'w-2/3 animate-pulse' : 'w-1/4'}`} />
            </div>
            <div className="flex justify-between text-[11px] text-neutral-400 mt-1 font-mono">
              <span>{isPlaying ? '1:42' : '0:00'}</span>
              <span>{track.duration}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6 mt-6">
            <button
              onClick={() => setCurrentTrackIndex((i) => (i > 0 ? i - 1 : playlist.length - 1))}
              className="p-2 text-neutral-500 hover:text-neutral-900 transition-colors"
            >
              <SkipBack className="w-5 h-5 fill-current" />
            </button>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-14 h-14 rounded-full bg-rose-500 hover:bg-rose-600 text-white flex items-center justify-center shadow-lg transition-transform active:scale-95"
            >
              {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-0.5" />}
            </button>

            <button
              onClick={() => setCurrentTrackIndex((i) => (i < playlist.length - 1 ? i + 1 : 0))}
              className="p-2 text-neutral-500 hover:text-neutral-900 transition-colors"
            >
              <SkipForward className="w-5 h-5 fill-current" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
