import React from 'react';
import { Home, User, QrCode, Wrench } from 'lucide-react';

interface MobileBottomBarProps {
  currentTabUrl: string;
  onGoHome: () => void;
  onOpenFiles?: () => void;
  onOpenScan: () => void;
  onOpenTools: () => void;
  onOpenMenu: () => void;
  isIncognito?: boolean;
  isToolsActive?: boolean;
  isScanActive?: boolean;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({
  currentTabUrl,
  onGoHome,
  onOpenScan,
  onOpenTools,
  onOpenMenu,
  isIncognito = false,
  isToolsActive = false,
  isScanActive = false,
}) => {
  const isHome = !isToolsActive && !isScanActive && (currentTabUrl === 'lemon://newtab' || currentTabUrl === 'aura://newtab');

  return (
    <footer
      className={`w-full h-15 backdrop-blur-md border-t px-4 flex items-center justify-around select-none z-30 shrink-0 transition-colors ${
        isIncognito
          ? 'bg-[#181818]/95 border-neutral-800 text-neutral-300'
          : 'bg-white border-[#E5DFD5] text-[#1F1D1A] shadow-xs'
      }`}
    >
      {/* 1. Home Tab */}
      <button
        onClick={onGoHome}
        className={`flex flex-col items-center justify-center flex-1 h-full transition-transform active:scale-90 ${
          isHome ? 'text-[#1A73E8]' : 'text-[#6B645D] hover:text-[#1F1D1A]'
        }`}
        title="Home"
      >
        <Home className={`w-5.5 h-5.5 stroke-[1.8] ${isHome ? 'text-[#1A73E8]' : ''}`} />
        <span className={`text-[11px] mt-1 tracking-tight ${isHome ? 'font-bold text-[#1A73E8]' : 'font-medium'}`}>
          Home
        </span>
      </button>

      {/* 2. Tools Tab with Files Folder Icon */}
      <button
        onClick={onOpenTools}
        className={`flex flex-col items-center justify-center flex-1 h-full transition-transform active:scale-90 ${
          isToolsActive ? 'text-[#1A73E8]' : 'text-[#6B645D] hover:text-[#1F1D1A]'
        }`}
        title="Tools"
      >
        <div className="relative flex items-center justify-center">
          <svg
            className="w-5.5 h-5.5"
            viewBox="0 0 24 24"
            fill={isToolsActive ? '#1A73E8' : 'none'}
            stroke={isToolsActive ? '#1A73E8' : 'currentColor'}
            strokeWidth="1.8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <Wrench className={`w-2 h-2 ${isToolsActive ? 'text-white' : 'text-[#1F1D1A]'}`} />
          </div>
        </div>
        <span
          className={`text-[11px] mt-1 tracking-tight ${
            isToolsActive ? 'font-bold text-[#1A73E8]' : 'font-medium text-[#6B645D]'
          }`}
        >
          Tools
        </span>
      </button>

      {/* 3. Scan Tab (Requested by user: dedicated screen named scan) */}
      <button
        onClick={onOpenScan}
        className={`flex flex-col items-center justify-center flex-1 h-full transition-transform active:scale-90 ${
          isScanActive ? 'text-[#1A73E8]' : 'text-[#6B645D] hover:text-[#1F1D1A]'
        }`}
        title="QR Scanner"
      >
        <div className="relative flex items-center justify-center">
          <QrCode className={`w-5.5 h-5.5 stroke-[1.8] ${isScanActive ? 'text-[#1A73E8]' : ''}`} />
        </div>
        <span
          className={`text-[11px] mt-1 tracking-tight ${
            isScanActive ? 'font-bold text-[#1A73E8]' : 'font-medium text-[#6B645D]'
          }`}
        >
          Scan
        </span>
      </button>

      {/* 4. Me Tab */}
      <button
        onClick={onOpenMenu}
        className="flex flex-col items-center justify-center flex-1 h-full transition-transform active:scale-90 text-[#6B645D] hover:text-[#1F1D1A]"
        title="Me / Profile & Settings"
      >
        <User className="w-5.5 h-5.5 stroke-[1.8]" />
        <span className="text-[11px] font-medium mt-1 tracking-tight">Me</span>
      </button>
    </footer>
  );
};
