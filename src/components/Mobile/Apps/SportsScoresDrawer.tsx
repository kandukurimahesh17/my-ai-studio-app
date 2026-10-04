import React from 'react';
import { X, Trophy, Flame } from 'lucide-react';

interface SportsScoresDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SportsScoresDrawer: React.FC<SportsScoresDrawerProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const matches = [
    {
      league: 'Premier League',
      home: 'Arsenal',
      away: 'Chelsea',
      homeScore: 2,
      awayScore: 1,
      time: "74'",
      isLive: true,
    },
    {
      league: 'La Liga',
      home: 'Real Madrid',
      away: 'Barcelona',
      homeScore: 3,
      awayScore: 2,
      time: 'FT',
      isLive: false,
    },
    {
      league: 'Champions League',
      home: 'Bayern Munich',
      away: 'Paris SG',
      homeScore: 1,
      awayScore: 1,
      time: "58'",
      isLive: true,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end justify-center p-0 select-none">
      <div className="bg-white text-neutral-900 rounded-t-3xl max-w-md w-full p-6 shadow-2xl flex flex-col border-t border-neutral-100 max-h-[85vh] overflow-y-auto">
        <div className="w-10 h-1 bg-neutral-300 rounded-full mx-auto mb-3" />

        <div className="flex items-center justify-between pb-3 border-b border-neutral-100 mb-4">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-emerald-600" />
            <span className="font-bold text-sm text-neutral-900">WeScore · Live Match Tracker</span>
          </div>
          <button onClick={onClose} className="text-neutral-400 hover:text-neutral-700 p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3">
          {matches.map((m, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/80 hover:border-emerald-500/50 transition-all shadow-sm"
            >
              <div className="flex items-center justify-between text-[11px] font-semibold text-neutral-500 uppercase tracking-wider mb-2">
                <span>{m.league}</span>
                {m.isLive ? (
                  <span className="text-red-500 flex items-center gap-1 font-mono font-bold animate-pulse">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                    LIVE {m.time}
                  </span>
                ) : (
                  <span className="text-neutral-400 font-mono">Full Time</span>
                )}
              </div>

              <div className="flex items-center justify-between py-1">
                <div className="flex-1 font-semibold text-neutral-900 text-sm">{m.home}</div>
                <div className="px-3 font-mono font-bold text-base text-neutral-900">
                  {m.homeScore} - {m.awayScore}
                </div>
                <div className="flex-1 text-right font-semibold text-neutral-900 text-sm">{m.away}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
