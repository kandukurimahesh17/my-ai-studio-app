import React, { useState, useEffect } from 'react';
import { Lock, MoreVertical, X } from 'lucide-react';
import { Tab } from '../../types/browser';
import { getDisplayUrl } from '../../utils/urlHelper';
import { IncognitoIcon } from './IncognitoIcon';

interface MobileBrowserHeaderProps {
  activeTab: Tab;
  onNavigate: (url: string) => void;
  onGoHome: () => void;
  tabCount: number;
  onOpenTabSwitcher: () => void;
  onOpenMenu: () => void;
  onOpenCertificateModal: () => void;
  isIncognito?: boolean;
}

export const MobileBrowserHeader: React.FC<MobileBrowserHeaderProps> = ({
  activeTab,
  onNavigate,
  onGoHome,
  tabCount,
  onOpenTabSwitcher,
  onOpenMenu,
  onOpenCertificateModal,
  isIncognito = false,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputVal, setInputVal] = useState(activeTab.url);

  useEffect(() => {
    setInputVal(activeTab.url);
  }, [activeTab.url]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    setIsEditing(false);
    (document.activeElement as HTMLElement)?.blur();
    onNavigate(inputVal.trim());
  };

  // Home screen state (Lemon home, Aura home, or Google home tab)
  const isHome =
    activeTab.url === 'lemon://newtab' ||
    activeTab.url === 'aura://newtab' ||
    activeTab.url === 'google://newtab' ||
    !activeTab.url.startsWith('http');

  return (
    <header
      className={`w-full h-14 px-3 flex items-center justify-between z-30 select-none transition-colors shrink-0 ${
        isIncognito
          ? 'bg-[#1F1F1F] border-b border-[#2E2F30] text-white'
          : isHome
          ? 'bg-[#F3ECE2] border-b border-transparent text-[#1F1D1A]'
          : 'bg-[#FFFFFF] border-b border-[#E8EAED] text-[#1F1F1F]'
      }`}
    >
      {/* 1. Left: Home Icon (Exact doorway cutout icon from user screenshot) */}
      <button
        type="button"
        onClick={onGoHome}
        className={`w-10 h-10 rounded-full flex items-center justify-center active:scale-90 transition-transform shrink-0 ${
          isIncognito
            ? 'text-neutral-300 hover:bg-[#2E2F30]'
            : 'text-[#1F1D1A] hover:bg-black/5'
        }`}
        title="Home"
      >
        <svg
          viewBox="0 0 24 24"
          className="w-6 h-6 fill-none stroke-current stroke-[2] stroke-linecap-round stroke-linejoin-round"
        >
          <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-6a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v6H4a1 1 0 0 1-1-1V9.5z" />
        </svg>
      </button>

      {/* 2. Middle: Empty spacer on Home Screen (matching screenshot) OR Omnibox on external pages */}
      {isHome && !isIncognito ? (
        <div className="flex-1" />
      ) : (
        <form
          onSubmit={handleSubmit}
          className={`flex-1 mx-2 h-10 rounded-full px-3 flex items-center gap-2 border transition-all ${
            isIncognito
              ? 'bg-[#2B2B2B] border-transparent focus-within:border-[#8AB4F8] text-white'
              : 'bg-[#F1F3F4] border-transparent hover:bg-[#E8EAED] focus-within:bg-white focus-within:border-[#1A73E8] focus-within:ring-2 focus-within:ring-[#1A73E8]/20 text-[#1F1F1F] shadow-xs'
          }`}
        >
          {/* Security / Incognito Icon */}
          <button
            type="button"
            onClick={onOpenCertificateModal}
            className="text-neutral-400 hover:text-neutral-600 shrink-0 flex items-center justify-center"
            title="Connection Security & Permissions"
          >
            {isIncognito ? (
              <IncognitoIcon className="w-4.5 h-4.5 text-neutral-300" />
            ) : activeTab.url.startsWith('https://') ? (
              <Lock className="w-3.5 h-3.5 text-[#1E8E3E]" />
            ) : (
              <div className="w-4 h-4 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
              </div>
            )}
          </button>

          {/* URL text field */}
          <input
            type="text"
            value={
              isEditing
                ? inputVal
                : (activeTab.url === 'lemon://newtab' || activeTab.url === 'aura://newtab' || activeTab.url === 'google://newtab'
                    ? ''
                    : getDisplayUrl(activeTab.url))
            }
            onFocus={(e) => {
              setIsEditing(true);
              setInputVal(activeTab.url.startsWith('http') ? getDisplayUrl(activeTab.url) : '');
              e.target.select();
            }}
            onBlur={() => setIsEditing(false)}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder={isIncognito ? 'Search or type web address' : 'Search or type URL'}
            autoCapitalize="none"
            autoCorrect="off"
            className={`flex-1 bg-transparent text-[13px] outline-none truncate font-medium ${
              isIncognito ? 'text-white placeholder-neutral-400' : 'text-[#1F1F1F] placeholder-[#5F6368]'
            }`}
          />

          {isEditing && inputVal.length > 0 && (
            <button
              type="button"
              onClick={() => setInputVal('')}
              className="p-1 text-neutral-400 hover:text-neutral-600 rounded-full"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </form>
      )}

      {/* 3. Right: Tab Counter Badge + 3-Dots Menu */}
      <div className="flex items-center gap-2.5 shrink-0">
        {/* Tab Counter Badge [ 16 ] (Exact rounded badge from user screenshot) */}
        <button
          type="button"
          onClick={onOpenTabSwitcher}
          className={`w-6.5 h-6.5 rounded-[7px] border-[2px] flex items-center justify-center font-bold text-xs shadow-2xs active:scale-90 transition-all shrink-0 ${
            isIncognito
              ? 'border-neutral-300 text-neutral-200 bg-transparent'
              : 'border-[#1F1F1F] text-[#1F1F1F] bg-transparent hover:bg-black/5'
          }`}
          title="Tabs"
        >
          <span className="leading-none text-[11px] font-bold">{tabCount}</span>
        </button>

        {/* 3-Dots Menu Button ⋮ (Pixel-matching user screenshot) */}
        <button
          type="button"
          onClick={onOpenMenu}
          className={`w-8 h-8 rounded-full flex items-center justify-center active:scale-90 transition-all shrink-0 ${
            isIncognito
              ? 'text-neutral-300 hover:bg-[#2E2F30]'
              : 'text-[#1F1F1F] hover:bg-black/5'
          }`}
          title="More options"
        >
          <MoreVertical className="w-5 h-5 stroke-[2.4]" />
        </button>
      </div>
    </header>
  );
};
