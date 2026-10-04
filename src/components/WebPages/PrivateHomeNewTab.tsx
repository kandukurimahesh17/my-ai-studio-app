import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { IncognitoIcon } from '../Mobile/IncognitoIcon';
import { SearchEngineType } from '../../types/browser';

interface PrivateHomeNewTabProps {
  onNavigate: (url: string) => void;
  onExitIncognito: () => void;
  tabCount: number;
  onOpenTabSwitcher: () => void;
  defaultEngine?: SearchEngineType;
}

export const PrivateHomeNewTab: React.FC<PrivateHomeNewTabProps> = ({
  onNavigate,
}) => {
  const [searchInput, setSearchInput] = useState('');
  const [blockThirdPartyCookies, setBlockThirdPartyCookies] = useState(true);
  const [showSecurityToast, setShowSecurityToast] = useState(false);

  const handleTriggerSecurityToast = () => {
    setShowSecurityToast(true);
    setTimeout(() => setShowSecurityToast(false), 2500);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    onNavigate(searchInput.trim());
  };

  return (
    <div
      onClick={handleTriggerSecurityToast}
      className="flex-1 w-full h-full bg-[#202124] text-white flex flex-col items-center px-6 pt-6 pb-16 overflow-y-auto font-sans select-none relative"
    >
      {/* Main Centered Incognito Content (Pixel-matching Screenshot Image 1) */}
      <div className="w-full max-w-md flex flex-col items-center text-center">
        {/* Circle Avatar with Chrome Incognito Hat & Glasses Emblem */}
        <div className="w-22 h-22 sm:w-24 sm:h-24 rounded-full bg-[#35363A] flex items-center justify-center mb-6 shadow-md shrink-0">
          <IncognitoIcon className="w-13 h-13 sm:w-14 sm:h-14 text-white" />
        </div>

        {/* Heading: You've gone incognito */}
        <h1 className="text-2xl sm:text-[28px] font-normal tracking-tight text-white mb-3">
          You've gone incognito
        </h1>

        {/* Description */}
        <p className="text-sm text-[#9AA0A6] leading-relaxed text-left sm:text-center mb-5">
          Now you can browse privately, and other people who use this device won't see your activity. However, downloads and bookmarks will be saved.
        </p>

        {/* Search Capsule (Allows searching directly on the incognito page) */}
        <form
          onSubmit={handleSearchSubmit}
          onClick={(e) => e.stopPropagation()}
          className="w-full mb-6"
        >
          <div className="w-full h-12 bg-[#2D2F31] border border-[#3C4043] rounded-full px-4 flex items-center gap-3 text-neutral-300 focus-within:border-[#8AB4F8] focus-within:ring-2 focus-within:ring-[#8AB4F8]/20 transition-all shadow-xs">
            <Search className="w-4.5 h-4.5 text-neutral-400 shrink-0" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search or type web address"
              className="flex-1 bg-transparent text-sm text-white placeholder-[#9AA0A6] outline-none"
            />
            {searchInput && (
              <button
                type="button"
                onClick={() => setSearchInput('')}
                className="text-neutral-400 hover:text-white text-xs px-1"
              >
                ✕
              </button>
            )}
          </div>
        </form>

        {/* Block Third-Party Cookies Card (Matching Image 1) */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="w-full bg-[#2D2F31] border border-[#3C4043] rounded-2xl p-4 text-left mb-6 shadow-xs"
        >
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-sm font-semibold text-white">
              Block third-party cookies
            </h3>

            {/* Material Toggle Switch */}
            <button
              type="button"
              onClick={() => setBlockThirdPartyCookies(!blockThirdPartyCookies)}
              className={`w-11 h-6 rounded-full transition-colors relative flex items-center p-0.5 shrink-0 ${
                blockThirdPartyCookies ? 'bg-[#8AB4F8]' : 'bg-[#5F6368]'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-[#202124] shadow-md transform transition-transform ${
                  blockThirdPartyCookies ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <p className="text-xs text-[#9AA0A6] leading-relaxed mt-1 pr-6">
            When on, sites can't use cookies that track you across the web. Features on some sites may break.
          </p>
        </div>

        {/* Detailed Privacy Explanations (Matching Image 2) */}
        <div className="w-full text-left space-y-4 text-xs text-[#9AA0A6] mb-8">
          <div>
            <p className="text-neutral-300 font-medium mb-1.5">
              Lemon won't save the following information:
            </p>
            <ul className="space-y-1 pl-4 list-disc marker:text-neutral-500 leading-relaxed">
              <li>Your browsing history</li>
              <li>Cookies and site data</li>
              <li>Information entered in forms</li>
            </ul>
          </div>

          <div>
            <p className="text-neutral-300 font-medium mb-1.5">
              Your activity might still be visible to:
            </p>
            <ul className="space-y-1 pl-4 list-disc marker:text-neutral-500 leading-relaxed">
              <li>Websites you visit</li>
              <li>Your employer or school</li>
              <li>Your internet service provider</li>
            </ul>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onNavigate('https://support.google.com/chrome/answer/95464');
            }}
            className="text-[#8AB4F8] hover:underline block pt-1 font-medium"
          >
            Learn more
          </button>
        </div>
      </div>

      {/* Security Screenshot Toast from Screenshot Image 1 */}
      {showSecurityToast && (
        <div className="fixed bottom-12 z-50 px-5 py-3 bg-[#3C4043]/95 backdrop-blur-sm text-neutral-200 text-xs rounded-2xl shadow-2xl border border-white/10 animate-in fade-in duration-150">
          Can't take screenshot due to security policy.
        </div>
      )}
    </div>
  );
};
