import React from 'react';
import { Wifi, ShieldAlert, EyeOff } from 'lucide-react';

interface MobileStatusBarProps {
  currentTime?: string;
  batteryLevel?: number;
  isIncognito?: boolean;
}

export const MobileStatusBar: React.FC<MobileStatusBarProps> = ({
  currentTime = '14:48',
  batteryLevel = 17,
  isIncognito = false,
}) => {
  return (
    <div
      className={`w-full h-8 px-5 flex items-center justify-between select-none text-xs font-semibold tracking-tight z-30 transition-colors ${
        isIncognito ? 'bg-[#181818] text-neutral-200' : 'bg-[#F3ECE2] text-[#1F1D1A]'
      }`}
    >
      {/* Left: Time and Private Indicator */}
      <div className="flex items-center gap-2">
        <span className="tabular-nums font-medium text-[13px]">{currentTime}</span>
        {isIncognito ? (
          <span className="bg-purple-950/80 border border-purple-500/50 text-purple-300 text-[9px] px-1.5 py-0.5 rounded-full font-bold flex items-center gap-1">
            <EyeOff className="w-2.5 h-2.5" />
            <span>Incognito</span>
          </span>
        ) : (
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
        )}
      </div>

      {/* Right: Connectivity and Battery */}
      <div className={`flex items-center gap-1.5 ${isIncognito ? 'text-neutral-300' : 'text-neutral-800'}`}>
        <Wifi className="w-3.5 h-3.5" />
        {/* Cell signal bars */}
        <div className="flex items-end gap-0.5 h-3">
          <div className={`w-0.5 h-1 rounded-sm ${isIncognito ? 'bg-neutral-300' : 'bg-neutral-800'}`} />
          <div className={`w-0.5 h-1.5 rounded-sm ${isIncognito ? 'bg-neutral-300' : 'bg-neutral-800'}`} />
          <div className={`w-0.5 h-2 rounded-sm ${isIncognito ? 'bg-neutral-300' : 'bg-neutral-800'}`} />
          <div className={`w-0.5 h-3 rounded-sm ${isIncognito ? 'bg-neutral-300' : 'bg-neutral-800'}`} />
        </div>
        {/* Battery icon with percentage */}
        <div
          className={`flex items-center border rounded-sm px-1 py-0.2 text-[10px] font-mono leading-none ml-1 ${
            isIncognito ? 'border-neutral-500 text-neutral-300' : 'border-neutral-700 text-neutral-800'
          }`}
        >
          <span className="tabular-nums">{batteryLevel}</span>
        </div>
      </div>
    </div>
  );
};
