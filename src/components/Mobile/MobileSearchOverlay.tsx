import React, { useState, useEffect, useRef } from 'react';
import { Search, ArrowUpLeft, Check, Mic, Palette, Grid, Languages, History, Trash2 } from 'lucide-react';
import { SearchEngineType } from '../../types/browser';
import { SearchEngineIcon, SearchEngineBadge } from '../Search/SearchEngineIcons';

interface MobileSearchOverlayProps {
  isOpen: boolean;
  initialQuery?: string;
  defaultEngine: SearchEngineType;
  onSelectEngine: (engine: SearchEngineType) => void;
  onSearch: (query: string) => void;
  onClose: () => void;
}

interface EngineOption {
  id: SearchEngineType;
  name: string;
}

const SEARCH_ENGINE_OPTIONS: EngineOption[] = [
  { id: 'google', name: 'Google' },
  { id: 'bing', name: 'Bing' },
  { id: 'yahoo', name: 'Yahoo' },
  { id: 'duckduckgo', name: 'DuckDuckGo' },
  { id: 'yandex', name: 'Yandex' },
  { id: 'aol', name: 'Aol' },
];

interface HistoryItem {
  id: string;
  query: string;
  subUrl?: string;
}

// Preset default search history matching user Image-1
const DEFAULT_SEARCH_HISTORY: HistoryItem[] = [
  { id: 'h-1', query: 'hi' },
  { id: 'h-2', query: 'mohh' },
  { id: 'h-3', query: 'mojapp.in/series/c1c42bdda548...', subUrl: 'https://mojapp.in/series/c1c42bdda5481618...' },
];

// Curated query suggestions dictionary with comprehensive presets
const PRESET_SUGGESTIONS: Record<string, string[]> = {
  hi: [
    'hindi to english',
    'hindi varnamala',
    'high court of telangana',
    'higgsfield',
    'hindi',
    'hindi songs',
    'hindi to telugu',
    'higgsfield ai',
  ],
  mo: [
    'mohh',
    'mojapp.in/series/c1c42bdda548...',
    'movies online 2026',
    'mobile phone prices',
    'moneycontrol share market',
  ],
  goo: [
    'google translate',
    'google maps',
    'google flight',
    'google earth',
    'google drive',
    'google finance',
  ],
  you: [
    'youtube music',
    'youtube studio',
    'youtube to mp3',
    'youtube kids',
    'youtube tv',
  ],
  we: [
    'weather forecast',
    'wescore live score',
    'web whatsapp',
    'weight loss tips',
    'wikipedia online',
  ],
};

export const MobileSearchOverlay: React.FC<MobileSearchOverlayProps> = ({
  isOpen,
  initialQuery = '',
  defaultEngine,
  onSelectEngine,
  onSearch,
  onClose,
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [historyItems, setHistoryItems] = useState<HistoryItem[]>(DEFAULT_SEARCH_HISTORY);
  const [isEngineDropdownOpen, setIsEngineDropdownOpen] = useState(false);
  const [isShiftActive, setIsShiftActive] = useState(false);
  const [isSymbolsMode, setIsSymbolsMode] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery(initialQuery);
      setIsEngineDropdownOpen(false);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isOpen, initialQuery]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsEngineDropdownOpen(false);
      }
    };
    if (isEngineDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isEngineDropdownOpen]);

  if (!isOpen) return null;

  const handleSubmit = (searchVal: string) => {
    const trimmed = searchVal.trim();
    if (!trimmed) return;

    // Add to history if not duplicate
    setHistoryItems((prev) => {
      const filtered = prev.filter((item) => item.query.toLowerCase() !== trimmed.toLowerCase());
      return [{ id: Date.now().toString(), query: trimmed }, ...filtered];
    });

    onSearch(trimmed);
  };

  const handleClearHistory = () => {
    setHistoryItems([]);
  };

  // Build dynamic suggestions based on typed query
  const getSuggestions = (): string[] => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    // Check exact or prefix preset
    for (const [key, list] of Object.entries(PRESET_SUGGESTIONS)) {
      if (q === key || (q.startsWith(key) && key.length >= 2)) {
        return list;
      }
    }

    // Dynamic generated suggestions for any other query
    return [
      q,
      `${q} search`,
      `${q} online`,
      `${q} meaning`,
      `${q} login`,
      `${q} news`,
      `${q} official website`,
      `${q} app`,
    ];
  };

  const suggestions = getSuggestions();

  // Keyboard handlers
  const handleVirtualKeyPress = (char: string) => {
    setQuery((prev) => prev + (isShiftActive ? char.toUpperCase() : char.toLowerCase()));
    if (isShiftActive) setIsShiftActive(false);
    inputRef.current?.focus();
  };

  const handleBackspace = () => {
    setQuery((prev) => prev.slice(0, -1));
    inputRef.current?.focus();
  };

  const handleSpace = () => {
    setQuery((prev) => prev + ' ');
    inputRef.current?.focus();
  };

  // Candidate prediction list (Image 3)
  const candidates = query
    ? [query.toLowerCase(), query.charAt(0).toUpperCase() + query.slice(1), query + 'i']
    : [];

  return (
    <div className="fixed inset-0 z-50 bg-[#EFEFEF] flex flex-col font-sans select-none animate-in fade-in duration-100 overflow-hidden">
      {/* ============================================================== */}
      {/* 1. TOP SEARCH BAR CONTAINER (Pixel-matched to User Image-1)    */}
      {/* ============================================================== */}
      <div className="w-full px-3 pt-2.5 pb-2 shrink-0 z-30">
        <div className="relative w-full">
          {/* Rounded Rectangle Search Bar with rounded-[14px] (Image-1) */}
          <div className="w-full h-12 bg-white rounded-[14px] px-3.5 flex items-center gap-3 shadow-xs border border-transparent transition-all">
            {/* Search Engine Badge (Logo + Small Grey Triangle in bottom-right corner from Image-2) */}
            <button
              type="button"
              onClick={() => setIsEngineDropdownOpen(!isEngineDropdownOpen)}
              className="flex items-center justify-center active:scale-90 transition-transform cursor-pointer shrink-0"
              title="Change search engine"
            >
              <SearchEngineBadge engine={defaultEngine} className="w-6 h-6" />
            </button>

            {/* Input with real-time sync & blue caret (Image-1) */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(query);
              }}
              className="flex-1 flex items-center h-full"
            >
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search or type URL"
                autoCapitalize="none"
                autoCorrect="off"
                className="w-full h-full bg-transparent text-[16px] text-[#202124] placeholder-[#80868B] outline-none font-normal caret-[#1A73E8]"
              />
            </form>

            {/* Clear (✕) Button in Grey Circle (Matching Image 3) */}
            {query.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  inputRef.current?.focus();
                }}
                className="w-5 h-5 rounded-full bg-[#70757A] hover:bg-[#5F6368] text-white flex items-center justify-center shrink-0 active:scale-90 transition-transform"
                title="Clear"
              >
                <span className="text-[11px] font-bold leading-none">✕</span>
              </button>
            )}
          </div>

          {/* ============================================================== */}
          {/* 2. SEARCH ENGINE SELECTOR DROPDOWN (Pixel-matching Image 2)    */}
          {/* ============================================================== */}
          {isEngineDropdownOpen && (
            <div
              ref={dropdownRef}
              className="absolute top-14 left-0 w-64 bg-white rounded-[22px] shadow-2xl border border-neutral-200/80 p-2 z-50 animate-in fade-in zoom-in-95 duration-100"
            >
              <div className="flex flex-col space-y-0.5">
                {SEARCH_ENGINE_OPTIONS.map((engine) => {
                  const isSelected = engine.id === defaultEngine;
                  return (
                    <button
                      key={engine.id}
                      type="button"
                      onClick={() => {
                        onSelectEngine(engine.id);
                        setIsEngineDropdownOpen(false);
                        inputRef.current?.focus();
                      }}
                      className="w-full px-3 py-2.5 rounded-[14px] flex items-center justify-between hover:bg-neutral-100/80 active:bg-neutral-200/70 transition-colors text-left"
                    >
                      <div className="flex items-center gap-3.5">
                        <div className="w-6 h-6 flex items-center justify-center shrink-0">
                          <SearchEngineIcon engine={engine.id} className="w-5.5 h-5.5" />
                        </div>
                        <span className="text-[15px] font-medium text-[#202124]">
                          {engine.name}
                        </span>
                      </div>

                      {/* Selected Checkmark (Image 2) */}
                      {isSelected && (
                        <Check className="w-5 h-5 text-[#202124] stroke-[2.4] shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ============================================================== */}
      {/* 3. MIDDLE CONTENT AREA: History (Image-1) OR Suggestions (Image-3) */}
      {/* ============================================================== */}
      <div className="flex-1 w-full overflow-y-auto px-3 pb-2 scrollbar-none">
        {/* CASE A: No query typed -> Show HISTORY Card (Exact replica of Image-1) */}
        {query.trim().length === 0 && (
          <div className="w-full bg-white rounded-[20px] shadow-xs border border-neutral-200/50 p-4 animate-in fade-in duration-100">
            {/* History Header with Trash Icon */}
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-[17px] font-bold text-[#1F1D1A]">History</h2>
              {historyItems.length > 0 && (
                <button
                  type="button"
                  onClick={handleClearHistory}
                  className="p-1 rounded-full text-[#5F6368] hover:text-red-500 active:scale-90 transition-transform"
                  title="Clear history"
                >
                  <Trash2 className="w-5 h-5 stroke-[1.8]" />
                </button>
              )}
            </div>

            {/* History Items List */}
            {historyItems.length > 0 ? (
              <div className="flex flex-col divide-y divide-neutral-100">
                {historyItems.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleSubmit(item.query)}
                    className="py-3 flex items-center justify-between cursor-pointer hover:bg-neutral-50 active:bg-neutral-100/70 transition-colors"
                  >
                    <div className="flex items-center gap-3.5 min-w-0 flex-1 pr-2">
                      <History className="w-5 h-5 text-[#5F6368] shrink-0 stroke-[1.8]" />
                      <div className="min-w-0 flex-1">
                        <div className="text-[15px] text-[#202124] truncate leading-tight">
                          {item.query}
                        </div>
                        {item.subUrl && (
                          <div className="text-[12px] text-[#80868B] truncate mt-0.5">
                            {item.subUrl}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Diagonal Arrow Up-Left to Insert into Search Bar (Image-1) */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setQuery(item.query);
                        inputRef.current?.focus();
                      }}
                      className="p-1.5 rounded-full text-[#5F6368] hover:text-[#202124] hover:bg-neutral-100 active:scale-90 transition-all shrink-0"
                      title="Insert to search bar"
                    >
                      <ArrowUpLeft className="w-5 h-5 stroke-[2]" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-6 text-center text-xs text-neutral-400">
                Search history is empty
              </div>
            )}
          </div>
        )}

        {/* CASE B: Query is typed -> Show AUTOCOMPLETE SUGGESTIONS (Image-3) */}
        {query.trim().length > 0 && suggestions.length > 0 && (
          <div className="w-full bg-white rounded-[20px] shadow-xs border border-neutral-200/50 overflow-hidden divide-y divide-neutral-100 animate-in fade-in duration-100">
            {suggestions.map((item, idx) => {
              const qLower = query.toLowerCase();
              const itemLower = item.toLowerCase();
              const isMatchPrefix = itemLower.startsWith(qLower);

              return (
                <div
                  key={`${item}-${idx}`}
                  onClick={() => handleSubmit(item)}
                  className="w-full px-4 py-3 flex items-center justify-between hover:bg-neutral-50 active:bg-neutral-100/70 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3.5 min-w-0 flex-1">
                    <Search className="w-4.5 h-4.5 text-[#5F6368] shrink-0 stroke-[2]" />
                    <span className="text-[15px] text-[#202124] truncate leading-normal">
                      {isMatchPrefix ? (
                        <>
                          <strong className="font-bold">{item.slice(0, query.length)}</strong>
                          <span className="font-normal">{item.slice(query.length)}</span>
                        </>
                      ) : (
                        item
                      )}
                    </span>
                  </div>

                  {/* Diagonal Arrow Up-Left to Insert into Search Bar (Image 3) */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setQuery(item);
                      inputRef.current?.focus();
                    }}
                    className="p-1 rounded-full text-[#70757A] hover:text-[#202124] hover:bg-neutral-100 active:scale-90 transition-all shrink-0 ml-2"
                    title="Insert to search bar"
                  >
                    <ArrowUpLeft className="w-4.5 h-4.5 stroke-[2.2]" />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ============================================================== */}
      {/* 4. REALISTIC GBOARD ANDROID KEYBOARD (Images 1 & 3)             */}
      {/* ============================================================== */}
      <div className="w-full bg-[#E9ECEF] border-t border-neutral-300/70 pt-1 pb-1 shrink-0 z-40 select-none shadow-md">
        {/* Top Prediction Bar (Image 3) OR Gboard Utility Toolbar (Image 1) */}
        {query.trim().length > 0 ? (
          <div className="w-full h-11 px-4 flex items-center justify-between bg-[#E9ECEF] border-b border-neutral-300/50 text-[#1F1D1A]">
            {/* 3 Suggestions: hi | Hi | hii */}
            <div className="flex-1 flex items-center justify-around divide-x divide-neutral-300">
              {candidates.map((cand, idx) => (
                <button
                  key={`${cand}-${idx}`}
                  type="button"
                  onClick={() => {
                    setQuery(cand);
                    inputRef.current?.focus();
                  }}
                  className="flex-1 text-center font-medium text-[15px] text-[#202124] hover:text-blue-600 active:scale-95 transition-all truncate px-2"
                >
                  {cand}
                </button>
              ))}
            </div>

            {/* Microphone Icon on Far Right */}
            <div className="pl-3 border-l border-neutral-300 text-[#444746] flex items-center justify-center">
              <Mic className="w-5 h-5 stroke-[2]" />
            </div>
          </div>
        ) : (
          <div className="w-full h-11 px-4 flex items-center justify-between text-[#444746]">
            <div className="flex items-center gap-6">
              <button type="button" className="hover:text-neutral-800 transition-colors">
                <Grid className="w-5 h-5 stroke-[2]" />
              </button>
              <button type="button" className="hover:text-neutral-800 transition-colors">
                <Palette className="w-5 h-5 stroke-[2]" />
              </button>
              <button type="button" className="hover:text-neutral-800 transition-colors">
                <Languages className="w-5 h-5 stroke-[2]" />
              </button>
            </div>
            <div className="flex items-center">
              <button type="button" className="hover:text-neutral-800 transition-colors">
                <Mic className="w-5 h-5 stroke-[2]" />
              </button>
            </div>
          </div>
        )}

        {/* Keyboard Keys Layout */}
        <div className="w-full px-1.5 py-1.5 flex flex-col gap-1.5">
          {/* Row 1: q w e r t y u i o p with superscripts 1-0 */}
          <div className="flex items-center gap-1 justify-center">
            {[
              { letter: 'q', num: '1' },
              { letter: 'w', num: '2' },
              { letter: 'e', num: '3' },
              { letter: 'r', num: '4' },
              { letter: 't', num: '5' },
              { letter: 'y', num: '6' },
              { letter: 'u', num: '7' },
              { letter: 'i', num: '8' },
              { letter: 'o', num: '9' },
              { letter: 'p', num: '0' },
            ].map(({ letter, num }) => (
              <button
                key={letter}
                type="button"
                onClick={() => handleVirtualKeyPress(letter)}
                className="flex-1 h-11 bg-white hover:bg-neutral-50 active:bg-neutral-200 rounded-[7px] shadow-[0_1px_1px_rgba(0,0,0,0.15)] flex flex-col items-center justify-center relative active:scale-95 transition-all text-[#1F1D1A]"
              >
                <span className="text-[17px] font-medium leading-none">
                  {isShiftActive ? letter.toUpperCase() : letter}
                </span>
                <span className="text-[9px] text-[#70757A] absolute top-0.5 right-1 leading-none">
                  {num}
                </span>
              </button>
            ))}
          </div>

          {/* Row 2: a s d f g h j k l */}
          <div className="flex items-center gap-1 justify-center px-3">
            {['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'].map((letter) => (
              <button
                key={letter}
                type="button"
                onClick={() => handleVirtualKeyPress(letter)}
                className="flex-1 h-11 bg-white hover:bg-neutral-50 active:bg-neutral-200 rounded-[7px] shadow-[0_1px_1px_rgba(0,0,0,0.15)] flex items-center justify-center text-[17px] font-medium text-[#1F1D1A] active:scale-95 transition-all"
              >
                {isShiftActive ? letter.toUpperCase() : letter}
              </button>
            ))}
          </div>

          {/* Row 3: Shift, z x c v b n m, Backspace */}
          <div className="flex items-center gap-1 justify-center">
            {/* Shift key */}
            <button
              type="button"
              onClick={() => setIsShiftActive(!isShiftActive)}
              className={`w-11 h-11 rounded-[7px] shadow-[0_1px_1px_rgba(0,0,0,0.15)] flex items-center justify-center active:scale-95 transition-all ${
                isShiftActive ? 'bg-[#D3E3FD] text-[#041E49]' : 'bg-[#D2D8DF] text-[#1F1D1A]'
              }`}
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-2">
                <path d="M12 4l-7 8h4v8h6v-8h4z" />
              </svg>
            </button>

            {['z', 'x', 'c', 'v', 'b', 'n', 'm'].map((letter) => (
              <button
                key={letter}
                type="button"
                onClick={() => handleVirtualKeyPress(letter)}
                className="flex-1 h-11 bg-white hover:bg-neutral-50 active:bg-neutral-200 rounded-[7px] shadow-[0_1px_1px_rgba(0,0,0,0.15)] flex items-center justify-center text-[17px] font-medium text-[#1F1D1A] active:scale-95 transition-all"
              >
                {isShiftActive ? letter.toUpperCase() : letter}
              </button>
            ))}

            {/* Backspace key */}
            <button
              type="button"
              onClick={handleBackspace}
              className="w-11 h-11 rounded-[7px] bg-[#D2D8DF] hover:bg-[#C2C9D1] text-[#1F1D1A] shadow-[0_1px_1px_rgba(0,0,0,0.15)] flex items-center justify-center active:scale-95 transition-all"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-2">
                <path d="M21 4H8l-6 8 6 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z" />
                <line x1="18" y1="9" x2="12" y2="15" />
                <line x1="12" y1="9" x2="18" y2="15" />
              </svg>
            </button>
          </div>

          {/* Row 4: ?123, comma, emoji, Spacebar, period, Search action ➔ */}
          <div className="flex items-center gap-1.5 justify-center">
            <button
              type="button"
              onClick={() => setIsSymbolsMode(!isSymbolsMode)}
              className="w-12 h-11 rounded-[7px] bg-[#D2D8DF] text-[13px] font-bold text-[#1F1D1A] shadow-[0_1px_1px_rgba(0,0,0,0.15)] flex items-center justify-center active:scale-95 transition-all"
            >
              ?123
            </button>

            <button
              type="button"
              onClick={() => handleVirtualKeyPress(',')}
              className="w-10 h-11 rounded-[7px] bg-[#D2D8DF] text-base font-medium text-[#1F1D1A] shadow-[0_1px_1px_rgba(0,0,0,0.15)] flex items-center justify-center active:scale-95 transition-all"
            >
              ,
            </button>

            <button
              type="button"
              onClick={() => handleVirtualKeyPress('😊')}
              className="w-10 h-11 rounded-[7px] bg-white text-lg flex items-center justify-center shadow-[0_1px_1px_rgba(0,0,0,0.15)] active:scale-95 transition-all"
            >
              😊
            </button>

            {/* Spacebar */}
            <button
              type="button"
              onClick={handleSpace}
              className="flex-1 h-11 rounded-[7px] bg-white text-xs text-neutral-400 font-medium shadow-[0_1px_1px_rgba(0,0,0,0.15)] flex items-center justify-center active:scale-98 transition-all"
            >
              English
            </button>

            <button
              type="button"
              onClick={() => handleVirtualKeyPress('.')}
              className="w-10 h-11 rounded-[7px] bg-[#D2D8DF] text-base font-bold text-[#1F1D1A] shadow-[0_1px_1px_rgba(0,0,0,0.15)] flex items-center justify-center active:scale-95 transition-all"
            >
              .
            </button>

            {/* Blue Arrow Search Execution Button (Images 1 & 3) */}
            <button
              type="button"
              onClick={() => handleSubmit(query)}
              className="w-13 h-11 rounded-[16px] bg-[#D3E3FD] hover:bg-[#C2E7FF] text-[#041E49] shadow-[0_1px_2px_rgba(0,0,0,0.15)] flex items-center justify-center active:scale-90 transition-all cursor-pointer"
              title="Search"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-[2.5]">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>
        </div>

        {/* Android 3-Button System Nav Bar (|||  ▢  ◁) */}
        <div className="w-full h-9 flex items-center justify-around text-[#70757A] px-10">
          {/* Recent Apps ||| */}
          <div className="flex items-center gap-1">
            <div className="w-0.5 h-3.5 bg-[#70757A] rounded-full" />
            <div className="w-0.5 h-3.5 bg-[#70757A] rounded-full" />
            <div className="w-0.5 h-3.5 bg-[#70757A] rounded-full" />
          </div>

          {/* Home ▢ */}
          <div className="w-3.5 h-3.5 border-2 border-[#70757A] rounded-[3px]" />

          {/* Back ◁ (Tapping closes the search overlay) */}
          <button
            type="button"
            onClick={onClose}
            className="p-1 active:scale-90 transition-transform"
            title="Back"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-[#70757A] stroke-[2.5]">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
