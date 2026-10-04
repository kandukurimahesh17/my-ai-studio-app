import React, { useState } from 'react';
import { Search, Volume2, Menu, X, Mic, ChevronDown, HelpCircle, ExternalLink } from 'lucide-react';

interface GoogleSearchEngineProps {
  initialQuery?: string;
  onNavigate: (url: string) => void;
  isDark?: boolean;
}

export const GoogleSearchEngine: React.FC<GoogleSearchEngineProps> = ({
  initialQuery = '',
  onNavigate,
  isDark = false,
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [activeTab, setActiveTab] = useState<'all' | 'images' | 'videos' | 'shopping' | 'shorts'>('all');
  const [targetLang, setTargetLang] = useState('Spanish');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    onNavigate(`https://www.google.com/search?q=${encodeURIComponent(query.trim())}`);
  };

  const handleSpeak = (text: string) => {
    if ('speechSynthesis' in window) {
      setIsPlayingAudio(true);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const isHiQuery = query.trim().toLowerCase() === 'hi' || query.trim().toLowerCase() === 'hello';

  // Sample results for common queries
  const sampleResults = [
    {
      title: 'Hi - Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Hi',
      displayUrl: 'en.wikipedia.org > wiki > Hi',
      snippet: 'Hi is a free-form greeting in the English language. Hi may also refer to: Arts and media. Film and television. Hi (film), a 2002 Indian Telugu-language film...',
    },
    {
      title: 'Higgsfield AI - Foundation Models for Video & Generation',
      url: 'https://higgsfield.ai',
      displayUrl: 'higgsfield.ai',
      snippet: 'Higgsfield builds advanced foundation models and motion systems for creators and game developers. Experience generative video like never before.',
    },
    {
      title: 'Hindi to English Translation - Google Translate',
      url: 'https://translate.google.com/?sl=hi&tl=en',
      displayUrl: 'translate.google.com',
      snippet: "Google's service, offered free of charge, instantly translates words, phrases, and web pages between English and over 100 other languages.",
    },
    {
      title: 'React - A JavaScript library for building user interfaces',
      url: 'https://react.dev',
      displayUrl: 'react.dev',
      snippet: 'React lets you build user interfaces out of individual pieces called components. Create your own React components like Thumbnail, LikeButton, and Video.',
    },
  ];

  return (
    <div
      className={`flex-1 h-full overflow-y-auto font-sans select-none flex flex-col ${
        isDark ? 'bg-[#202124] text-white' : 'bg-white text-[#202124]'
      }`}
    >
      {/* ============================================================== */}
      {/* 1. GOOGLE MOBILE HEADER (Pixel-matching Image 4)                */}
      {/* ============================================================== */}
      <header
        className={`w-full px-4 pt-3 pb-2 flex items-center justify-between border-b ${
          isDark ? 'border-[#3C4043] bg-[#202124]' : 'border-[#E8EAED] bg-white'
        }`}
      >
        <div className="flex items-center gap-4">
          {/* Hamburger Menu ☰ */}
          <button
            type="button"
            className={`p-1 -ml-1 rounded-full ${isDark ? 'text-neutral-300' : 'text-[#5F6368]'}`}
          >
            <Menu className="w-5.5 h-5.5 stroke-[2.2]" />
          </button>

          {/* Google Colorful Logo */}
          <div
            onClick={() => onNavigate('https://www.google.com')}
            className="flex items-center text-[22px] font-bold tracking-tight cursor-pointer select-none"
            style={{ fontFamily: "'Product Sans', 'Google Sans', sans-serif" }}
          >
            <span className="text-[#4285F4]">G</span>
            <span className="text-[#EA4335]">o</span>
            <span className="text-[#FBBC05]">o</span>
            <span className="text-[#4285F4]">g</span>
            <span className="text-[#34A853]">l</span>
            <span className="text-[#EA4335]">e</span>
          </div>
        </div>

        {/* Blue "Sign in" Pill Button */}
        <button
          type="button"
          onClick={() => onNavigate('https://accounts.google.com')}
          className="px-4 py-1.5 rounded-full bg-[#1A73E8] hover:bg-[#1557B0] text-white font-medium text-[13px] shadow-xs active:scale-95 transition-all"
        >
          Sign in
        </button>
      </header>

      {/* ============================================================== */}
      {/* 2. GOOGLE IN-PAGE SEARCH BOX (Matching Image 4)                 */}
      {/* ============================================================== */}
      <div className="w-full px-4 pt-3 pb-2">
        <form
          onSubmit={handleSearch}
          className={`w-full h-11 px-3.5 rounded-full flex items-center gap-2.5 border shadow-xs transition-all ${
            isDark
              ? 'bg-[#303134] border-[#3C4043] focus-within:border-[#8AB4F8]'
              : 'bg-white border-[#DFE1E5] hover:shadow-md focus-within:shadow-md focus-within:border-transparent'
          }`}
        >
          <Search className={`w-4.5 h-4.5 ${isDark ? 'text-neutral-400' : 'text-[#70757A]'}`} />

          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={`flex-1 bg-transparent text-[15px] outline-none font-normal ${
              isDark ? 'text-white' : 'text-[#202124]'
            }`}
          />

          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className={`p-1 rounded-full ${isDark ? 'text-neutral-400' : 'text-[#70757A]'}`}
            >
              <X className="w-4 h-4" />
            </button>
          )}

          <button
            type="button"
            className="p-1 rounded-full text-[#4285F4] hover:bg-neutral-100 dark:hover:bg-neutral-800"
          >
            <Mic className="w-4.5 h-4.5" />
          </button>
        </form>
      </div>

      {/* ============================================================== */}
      {/* 3. GOOGLE SEARCH CATEGORIES TABS (Image 4: All, Images, etc.)   */}
      {/* ============================================================== */}
      <div
        className={`w-full flex items-center gap-5 px-4 overflow-x-auto text-[13px] border-b scrollbar-none ${
          isDark ? 'border-[#3C4043] text-neutral-400' : 'border-[#E8EAED] text-[#5F6368]'
        }`}
      >
        {[
          { id: 'all', label: 'All' },
          { id: 'images', label: 'Images' },
          { id: 'videos', label: 'Videos' },
          { id: 'shopping', label: 'Shopping' },
          { id: 'shorts', label: 'Short videos' },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as any)}
            className={`py-2.5 font-medium whitespace-nowrap transition-colors relative ${
              activeTab === tab.id
                ? isDark
                  ? 'text-[#8AB4F8] font-semibold border-b-[3px] border-[#8AB4F8]'
                  : 'text-[#1A73E8] font-semibold border-b-[3px] border-[#1A73E8]'
                : 'hover:text-[#202124]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ============================================================== */}
      {/* 4. TELUGU SEARCH PROMPT (Matching Image 4)                     */}
      {/* ============================================================== */}
      <div className="w-full px-4 pt-3 pb-1 flex items-center gap-2 text-xs text-[#5F6368]">
        <span>తెలుగులో శోధించండి:</span>
        <button
          type="button"
          onClick={() => {
            setQuery('హాయ్');
            onNavigate('https://www.google.com/search?q=' + encodeURIComponent('హాయ్'));
          }}
          className={`px-3 py-1.5 rounded-[12px] flex items-center gap-1.5 font-medium border ${
            isDark
              ? 'bg-[#303134] border-[#3C4043] text-neutral-200'
              : 'bg-[#F8F9FA] border-[#DADCE0] text-[#1F1F1F]'
          }`}
        >
          <span>హాయ్</span>
          <Search className="w-3.5 h-3.5 text-[#5F6368]" />
        </button>
        <HelpCircle className="w-3.5 h-3.5 text-[#9AA0A6] ml-auto shrink-0" />
      </div>

      {/* ============================================================== */}
      {/* 5. DICTIONARY KNOWLEDGE GRAPH CARD (Pixel-matching Image 4)     */}
      {/* ============================================================== */}
      {isHiQuery && (
        <div className="w-full px-4 py-3">
          <div
            className={`w-full rounded-[18px] p-4 border shadow-xs transition-colors ${
              isDark ? 'bg-[#303134] border-[#3C4043]' : 'bg-white border-[#DADCE0]'
            }`}
          >
            {/* Dictionary Header */}
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-xl font-normal text-[#202124] dark:text-white">Dictionary</h2>
            </div>
            <p className="text-xs text-[#70757A] dark:text-neutral-400 mb-4">
              Definitions from <span className="underline">Oxford Languages</span> •{' '}
              <span className="underline">Learn more</span>
            </p>

            {/* Word & Pronunciation */}
            <div className="flex items-center gap-3.5 mb-3">
              <button
                type="button"
                onClick={() => handleSpeak('hi')}
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                  isPlayingAudio
                    ? 'bg-[#1A73E8] text-white scale-105'
                    : 'bg-[#1A73E8] hover:bg-[#1557B0] text-white active:scale-95'
                }`}
                title="Listen to pronunciation"
              >
                <Volume2 className="w-4.5 h-4.5 stroke-[2.2]" />
              </button>

              <div>
                <h1 className="text-2xl font-bold text-[#202124] dark:text-white leading-tight">
                  hi
                </h1>
                <p className="text-sm text-[#70757A] dark:text-neutral-400 font-serif">/hʌɪ/</p>
              </div>
            </div>

            {/* Grammar category */}
            <div className="text-xs text-[#70757A] dark:text-neutral-400 italic mb-2">
              exclamation{' '}
              <span className="not-italic font-semibold text-[10px] uppercase bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded text-neutral-600 dark:text-neutral-300 ml-1">
                INFORMAL
              </span>
            </div>

            {/* Definition */}
            <p className="text-sm text-[#202124] dark:text-neutral-200 leading-relaxed mb-1.5 pl-3 border-l-2 border-neutral-300 dark:border-neutral-600">
              used as a friendly greeting or to attract attention.
            </p>

            {/* Example quote */}
            <p className="text-xs text-[#70757A] dark:text-neutral-400 italic pl-3 mb-4">
              "Hi there. How was the flight?"
            </p>

            {/* Blue pill: See translations in 100+ languages */}
            <button
              type="button"
              className="px-3.5 py-1.5 rounded-full bg-[#1A73E8] text-white text-xs font-semibold mb-3 shadow-2xs hover:bg-[#1557B0] active:scale-95 transition-all"
            >
              See translations in 100+ languages
            </button>

            {/* Translate dropdown */}
            <div
              className={`w-full rounded-[12px] p-2.5 flex items-center justify-between border ${
                isDark ? 'border-neutral-700 bg-neutral-800' : 'border-[#DADCE0] bg-[#F8F9FA]'
              }`}
            >
              <span className="text-xs text-[#5F6368] dark:text-neutral-400">Translate hi to</span>
              <div className="flex items-center gap-1.5 text-xs font-medium text-[#202124] dark:text-white">
                <span>{targetLang}</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#5F6368]" />
              </div>
            </div>

            {/* TIP banner matching Image 4 */}
            <div className="mt-4 pt-3 border-t border-neutral-200 dark:border-neutral-700 flex items-start gap-2 text-xs">
              <span className="px-1.5 py-0.5 rounded bg-[#FBBC05] text-black font-bold text-[10px]">
                TIP
              </span>
              <p className="text-[#3C4043] dark:text-neutral-300">
                <span className="font-semibold">Similar-sounding words:</span>{' '}
                <span className="italic">hi</span> is sometimes confused with{' '}
                <span className="text-[#1A73E8] underline font-medium">high</span>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 6. ORGANIC WEB SEARCH RESULTS                                   */}
      {/* ============================================================== */}
      <div className="w-full px-4 py-2 space-y-4 pb-20">
        {sampleResults.map((item, idx) => (
          <div
            key={idx}
            onClick={() => onNavigate(item.url)}
            className={`p-3.5 rounded-[16px] border transition-all cursor-pointer ${
              isDark
                ? 'bg-[#303134] border-[#3C4043] hover:border-neutral-500'
                : 'bg-white border-[#DADCE0] hover:border-blue-400 shadow-2xs'
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <div className="w-4 h-4 rounded-full bg-blue-50 dark:bg-neutral-800 flex items-center justify-center text-[10px]">
                🌐
              </div>
              <span className="text-xs text-[#5F6368] dark:text-neutral-400 truncate">
                {item.displayUrl}
              </span>
            </div>

            <h3 className="text-base font-medium text-[#1A0DAB] dark:text-[#8AB4F8] hover:underline mb-1.5 leading-snug">
              {item.title}
            </h3>

            <p className="text-xs text-[#4D5156] dark:text-neutral-300 leading-relaxed">
              {item.snippet}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
