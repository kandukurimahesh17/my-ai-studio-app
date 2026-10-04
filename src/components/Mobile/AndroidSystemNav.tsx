import React from 'react';

interface AndroidSystemNavProps {
  onOpenTabSwitcher: () => void;
  onGoHome: () => void;
  onGoBack: () => void;
  isDark?: boolean;
}

export const AndroidSystemNav: React.FC<AndroidSystemNavProps> = ({
  onOpenTabSwitcher,
  onGoHome,
  onGoBack,
  isDark = false,
}) => {
  return (
    <div
      className={`w-full h-11 flex items-center justify-around px-8 select-none shrink-0 transition-colors border-t ${
        isDark
          ? 'bg-[#181818] border-neutral-800 text-neutral-400'
          : 'bg-[#F4F6F8] border-neutral-200/60 text-neutral-400'
      }`}
    >
      {/* 1. Recent Apps / Tabs (||| - 3 vertical lines) */}
      <button
        onClick={onOpenTabSwitcher}
        className="p-2.5 hover:text-neutral-700 active:scale-90 transition-transform"
        title="Open Tabs"
      >
        <div className="flex items-center gap-[3.5px]">
          <div className="w-[1.8px] h-3.5 bg-current rounded-full" />
          <div className="w-[1.8px] h-3.5 bg-current rounded-full" />
          <div className="w-[1.8px] h-3.5 bg-current rounded-full" />
        </div>
      </button>

      {/* 2. Home Screen (▢ - rounded square outline) */}
      <button
        onClick={onGoHome}
        className="p-2.5 hover:text-neutral-700 active:scale-90 transition-transform"
        title="Home Screen"
      >
        <div className="w-3.5 h-3.5 border-[1.8px] border-current rounded-[3.5px]" />
      </button>

      {/* 3. Back Button (◁ - left-pointing triangle) */}
      <button
        onClick={onGoBack}
        className="p-2.5 hover:text-neutral-700 active:scale-90 transition-transform"
        title="Go Back"
      >
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <polygon points="17,5 7,12 17,19" />
        </svg>
      </button>
    </div>
  );
};
