import React, { useState } from 'react';
import { Mic, Camera, Sparkles, Share2, MoreVertical } from 'lucide-react';
import { IncognitoIcon } from '../Mobile/IncognitoIcon';

interface GoogleMobileNewTabProps {
  onNavigate: (url: string) => void;
  onOpenIncognito: () => void;
}

export const GoogleMobileNewTab: React.FC<GoogleMobileNewTabProps> = ({
  onNavigate,
  onOpenIncognito,
}) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    onNavigate(`https://www.google.com/search?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <div className="flex-1 w-full h-full bg-[#EDF3F0] text-[#1F1F1F] flex flex-col items-center px-4 pt-4 pb-20 overflow-y-auto font-sans select-none scrollbar-none">
      <div className="w-full max-w-md flex flex-col items-center">
        {/* 1. Google Logo (Official Google Colors, Image 3) */}
        <div className="flex items-center justify-center my-6 select-none">
          <span className="text-4xl sm:text-5xl font-bold tracking-tight text-[#4285F4]">G</span>
          <span className="text-4xl sm:text-5xl font-bold tracking-tight text-[#EA4335]">o</span>
          <span className="text-4xl sm:text-5xl font-bold tracking-tight text-[#FBBC05]">o</span>
          <span className="text-4xl sm:text-5xl font-bold tracking-tight text-[#4285F4]">g</span>
          <span className="text-4xl sm:text-5xl font-bold tracking-tight text-[#34A853]">l</span>
          <span className="text-4xl sm:text-5xl font-bold tracking-tight text-[#EA4335]">e</span>
        </div>

        {/* 2. Google Search Pill (Image 3) */}
        <form onSubmit={handleSubmit} className="w-full mb-3.5">
          <div className="w-full h-13 bg-[#DFE5E2] hover:bg-[#D5DCD8] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#4285F4] rounded-full px-4 flex items-center gap-3 transition-all shadow-inner">
            {/* Google G Icon */}
            <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-2xs shrink-0">
              <span className="text-xs font-bold text-[#4285F4]">G</span>
            </div>

            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search Google or ty..."
              className="flex-1 bg-transparent text-[15px] text-[#1F1F1F] placeholder-[#444746] outline-none"
            />

            {/* Mic and Camera / Lens */}
            <div className="flex items-center gap-2 text-[#444746] shrink-0">
              <button
                type="button"
                onClick={() => onNavigate('https://www.google.com')}
                className="p-1 hover:text-[#1F1F1F]"
              >
                <Mic className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => onNavigate('https://lens.google.com')}
                className="p-1 hover:text-[#1F1F1F]"
              >
                <Camera className="w-5 h-5" />
              </button>
            </div>
          </div>
        </form>

        {/* 3. Quick Action Pills (AI Mode | Incognito) (Image 3) */}
        <div className="w-full flex items-center gap-2.5 mb-5">
          <button
            type="button"
            onClick={() => onNavigate('https://www.google.com/search?q=AI+Mode')}
            className="flex-1 h-10 rounded-full bg-[#DFE5E2] hover:bg-[#D5DCD8] active:scale-98 transition-all flex items-center justify-center gap-1.5 text-xs font-semibold text-[#1F1F1F]"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#1A73E8]" />
            <span>AI Mode</span>
          </button>

          <button
            type="button"
            onClick={onOpenIncognito}
            className="flex-1 h-10 rounded-full bg-[#DFE5E2] hover:bg-[#D5DCD8] active:scale-98 transition-all flex items-center justify-center gap-1.5 text-xs font-semibold text-[#1F1F1F]"
          >
            <IncognitoIcon className="w-4 h-4 text-[#444746]" />
            <span>Incognito</span>
          </button>
        </div>

        {/* 4. Most Visited Shortcuts Card (Image 3) */}
        <div className="w-full bg-white rounded-[26px] p-4 shadow-xs border border-neutral-200/60 mb-4">
          <div className="grid grid-cols-4 gap-2 text-center">
            {/* 1. NewTube */}
            <div
              onClick={() => onNavigate('https://youtube.com')}
              className="flex flex-col items-center gap-1.5 cursor-pointer group active:scale-95 transition-transform"
            >
              <div className="w-12 h-12 rounded-full bg-[#18233C] text-white flex items-center justify-center font-bold text-base shadow-xs">
                n
              </div>
              <span className="text-[11px] text-[#444746] font-medium truncate w-full">
                NewTube
              </span>
            </div>

            {/* 2. family.com */}
            <div
              onClick={() => onNavigate('https://family.com')}
              className="flex flex-col items-center gap-1.5 cursor-pointer group active:scale-95 transition-transform"
            >
              <div className="w-12 h-12 rounded-full bg-[#5F6368] text-white flex items-center justify-center font-bold text-sm shadow-xs">
                F
              </div>
              <span className="text-[11px] text-[#444746] font-medium truncate w-full">
                family.com
              </span>
            </div>

            {/* 3. YouTube */}
            <div
              onClick={() => onNavigate('https://youtube.com')}
              className="flex flex-col items-center gap-1.5 cursor-pointer group active:scale-95 transition-transform"
            >
              <div className="w-12 h-12 rounded-full bg-[#FF0000] text-white flex items-center justify-center shadow-xs">
                <div className="w-0 h-0 border-y-4 border-y-transparent border-l-7 border-l-white ml-0.5" />
              </div>
              <span className="text-[11px] text-[#444746] font-medium truncate w-full">
                YouTube
              </span>
            </div>

            {/* 4. Wikipedia */}
            <div
              onClick={() => onNavigate('https://wikipedia.org')}
              className="flex flex-col items-center gap-1.5 cursor-pointer group active:scale-95 transition-transform"
            >
              <div className="w-12 h-12 rounded-full bg-white border border-neutral-200 text-[#1F1F1F] flex items-center justify-center font-serif font-bold text-base shadow-xs">
                W
              </div>
              <span className="text-[11px] text-[#444746] font-medium truncate w-full">
                Wikipedia
              </span>
            </div>
          </div>
        </div>

        {/* 5. Discover Feed Card (GitHub MiniMax-AI OpenAgentCore - Image 3) */}
        <div
          onClick={() => onNavigate('https://github.com/MiniMax-AI/OpenAgentCore')}
          className="w-full bg-white rounded-[26px] p-4 shadow-xs border border-neutral-200/60 mb-3 text-left cursor-pointer hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between gap-3 mb-3">
            <h3 className="text-sm font-semibold text-[#1F1F1F] leading-snug flex-1">
              GitHub - MiniMax-AI/OpenAgentCore: Open-source, self-ho...
            </h3>
            {/* Thumbnail */}
            <div className="w-16 h-14 rounded-xl bg-amber-50 border border-amber-200 flex flex-col items-center justify-center p-1 text-center shrink-0">
              <span className="text-[8px] font-bold text-amber-900 leading-tight">One core. Many agents.</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-[#5F6368]">
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#1F1F1F]">GitHub</span>
              <span>· 1d</span>
            </div>
            <div className="flex items-center gap-3">
              <Share2 className="w-4 h-4 text-[#5F6368]" />
              <MoreVertical className="w-4 h-4 text-[#5F6368]" />
            </div>
          </div>
        </div>

        {/* 6. Next Article Tech Photo (Image 3) */}
        <div
          onClick={() => onNavigate('https://antigravity.ai')}
          className="w-full rounded-[26px] overflow-hidden bg-neutral-900 shadow-xs border border-neutral-800 cursor-pointer"
        >
          <div className="w-full h-36 bg-gradient-to-br from-neutral-900 via-indigo-950 to-neutral-900 flex items-center justify-center relative p-3">
            <div className="px-3 py-1 bg-black/60 backdrop-blur-md rounded-full border border-white/20 text-white text-xs font-semibold flex items-center gap-1.5 shadow-lg">
              <span>✦</span>
              <span>Antigravity</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
