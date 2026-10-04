import React from 'react';
import { ArrowLeft, ArrowRight, Home, MoreVertical } from 'lucide-react';

interface BrowserBottomNavProps {
  canGoBack: boolean;
  canGoForward: boolean;
  onBack: () => void;
  onForward: () => void;
  onHome: () => void;
  tabCount: number;
  onOpenTabSwitcher: () => void;
  onOpenMenu: () => void;
  isIncognito?: boolean;
}

export const BrowserBottomNav: React.FC<BrowserBottomNavProps> = ({
  canGoBack,
  canGoForward,
  onBack,
  onForward,
  onHome,
  tabCount,
  onOpenTabSwitcher,
  onOpenMenu,
  isIncognito = false,
}) => {
  return (
    <nav
      className={`w-full h-14 border-t px-2 flex items-center justify-around select-none shrink-0 z-30 transition-colors shadow-xs ${
        isIncognito
          ? 'bg-[#1F1F1F] border-[#2E2F30] text-white'
          : 'bg-[#F8F9FA] border-[#E8EAED] text-[#444746]'
      }`}
    >
      {/* 1. Back Button (Google ArrowLeft) */}
      <button
        onClick={onBack}
        disabled={!canGoBack}
        className={`p-2.5 rounded-full flex items-center justify-center transition-all ${
          canGoBack
            ? 'text-[#1F1F1F] hover:bg-[#E8EAED] active:scale-90 cursor-pointer'
            : 'text-[#C4C7C5] pointer-events-none cursor-not-allowed opacity-40'
        } ${isIncognito && canGoBack ? 'text-white hover:bg-[#2E2F30]' : ''}`}
        title="Back"
      >
        <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
      </button>

      {/* 2. Forward Button (Google ArrowRight) */}
      <button
        onClick={onForward}
        disabled={!canGoForward}
        className={`p-2.5 rounded-full flex items-center justify-center transition-all ${
          canGoForward
            ? 'text-[#1F1F1F] hover:bg-[#E8EAED] active:scale-90 cursor-pointer'
            : 'text-[#C4C7C5] pointer-events-none cursor-not-allowed opacity-40'
        } ${isIncognito && canGoForward ? 'text-white hover:bg-[#2E2F30]' : ''}`}
        title="Forward"
      >
        <ArrowRight className="w-5 h-5 stroke-[2.2]" />
      </button>

      {/* 3. Home Button with Material You Active Tonal Pill */}
      <button
        onClick={onHome}
        className={`px-4 py-1.5 rounded-full flex items-center justify-center active:scale-95 transition-all ${
          isIncognito
            ? 'bg-[#37393B] text-white hover:bg-[#434548]'
            : 'bg-[#D3E3FD] text-[#041E49] hover:bg-[#C2E7FF]'
        }`}
        title="Home"
      >
        <Home className="w-5 h-5 stroke-[2.2]" />
      </button>

      {/* 4. Tab Switcher Badge Button [ count ] */}
      <button
        onClick={onOpenTabSwitcher}
        className={`w-7 h-7 rounded-[7px] border-[1.8px] flex items-center justify-center font-bold text-xs shadow-xs active:scale-90 transition-all shrink-0 ${
          isIncognito
            ? 'border-[#C58AF9] text-[#C58AF9] hover:bg-[#2E2F30]'
            : 'border-[#444746] text-[#444746] hover:bg-[#E8EAED]'
        }`}
        title="Tabs"
      >
        <span className="leading-none text-[11px] font-bold">{tabCount}</span>
      </button>

      {/* 5. More / Features Menu (⋮) */}
      <button
        onClick={onOpenMenu}
        className={`p-2.5 rounded-full flex items-center justify-center text-[#444746] hover:bg-[#E8EAED] active:scale-90 transition-all ${
          isIncognito ? 'text-white hover:bg-[#2E2F30]' : ''
        }`}
        title="Menu"
      >
        <MoreVertical className="w-5 h-5 stroke-[2.2]" />
      </button>
    </nav>
  );
};
