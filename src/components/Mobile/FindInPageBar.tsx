import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronUp, ChevronDown, X, Search } from 'lucide-react';
import { generateFindInPageScript, generateClearFindInPageScript } from '../../utils/findInPageHelper';

interface FindInPageBarProps {
  isOpen: boolean;
  onClose: () => void;
  onInjectScript?: (script: string) => void;
}

export const FindInPageBar: React.FC<FindInPageBarProps> = ({
  isOpen,
  onClose,
  onInjectScript,
}) => {
  const [query, setQuery] = useState('');
  const [currentMatch, setCurrentMatch] = useState(0);
  const [totalMatches, setTotalMatches] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Execute DOM Highlight Script
  const executeHighlight = useCallback(
    (searchQuery: string, index: number) => {
      const script = generateFindInPageScript(searchQuery, index);

      // If custom WebView injection handler provided
      if (onInjectScript) {
        onInjectScript(script);
      }

      // Execute on client viewport DOM
      try {
        const cleanScript = script.trim();
        const runFn = new Function(cleanScript);
        runFn();
      } catch (err) {
        console.error('Highlight execution error:', err);
      }
    },
    [onInjectScript]
  );

  // Clear highlights
  const handleClear = useCallback(() => {
    const clearScript = generateClearFindInPageScript();
    if (onInjectScript) {
      onInjectScript(clearScript);
    }
    try {
      const runFn = new Function(clearScript);
      runFn();
    } catch {}
    setQuery('');
    setCurrentMatch(0);
    setTotalMatches(0);
  }, [onInjectScript]);

  // Handle incoming message from WebView or DOM
  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      try {
        const data = typeof e.data === 'string' ? JSON.parse(e.data) : e.data;
        if (data && data.type === 'FIND_MATCHES_RESULT') {
          setTotalMatches(data.count);
          setCurrentMatch(data.activeIndex);
        }
      } catch {}
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Update highlights when query changes
  useEffect(() => {
    if (!isOpen) return;

    if (!query.trim()) {
      handleClear();
      return;
    }

    const timer = setTimeout(() => {
      executeHighlight(query, 0);
    }, 120);

    return () => clearTimeout(timer);
  }, [query, isOpen, executeHighlight, handleClear]);

  // Clean on close
  useEffect(() => {
    if (!isOpen) {
      handleClear();
    } else {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen, handleClear]);

  const handleNext = () => {
    if (totalMatches <= 1) return;
    const nextIdx = currentMatch >= totalMatches ? 0 : currentMatch;
    executeHighlight(query, nextIdx);
  };

  const handlePrev = () => {
    if (totalMatches <= 1) return;
    const prevIdx = currentMatch <= 1 ? totalMatches - 1 : currentMatch - 2;
    executeHighlight(query, prevIdx);
  };

  const handleClose = () => {
    handleClear();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="w-full bg-white border-b border-neutral-200 px-3 py-2 flex items-center justify-between gap-2 shadow-md z-40 select-none animate-in slide-in-from-top-2 duration-150">
      {/* 1. Search Input Capsule */}
      <div className="flex-1 bg-neutral-100 focus-within:bg-white focus-within:ring-2 focus-within:ring-amber-400 rounded-full px-3 py-1.5 flex items-center gap-2 border border-neutral-200/80 transition-all">
        <Search className="w-4 h-4 text-neutral-400 shrink-0" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Find in page..."
          className="w-full bg-transparent text-xs text-neutral-900 outline-none placeholder:text-neutral-400"
        />

        {/* Counter Badge */}
        {query && (
          <span className="text-[11px] font-semibold text-neutral-500 font-mono shrink-0 bg-neutral-200/60 px-1.5 py-0.5 rounded">
            {totalMatches > 0 ? `${currentMatch}/${totalMatches}` : '0/0'}
          </span>
        )}
      </div>

      {/* 2. Control Buttons: Previous, Next, Close */}
      <div className="flex items-center gap-1 shrink-0">
        {/* Previous */}
        <button
          onClick={handlePrev}
          disabled={totalMatches === 0}
          className="p-1.5 rounded-lg hover:bg-neutral-100 text-neutral-700 disabled:opacity-30 disabled:pointer-events-none active:scale-95 transition-transform"
          title="Previous match"
        >
          <ChevronUp className="w-4 h-4 stroke-[2.5]" />
        </button>

        {/* Next */}
        <button
          onClick={handleNext}
          disabled={totalMatches === 0}
          className="p-1.5 rounded-lg hover:bg-neutral-100 text-neutral-700 disabled:opacity-30 disabled:pointer-events-none active:scale-95 transition-transform"
          title="Next match"
        >
          <ChevronDown className="w-4 h-4 stroke-[2.5]" />
        </button>

        <div className="w-[1px] h-4 bg-neutral-200 mx-0.5" />

        {/* Close */}
        <button
          onClick={handleClose}
          className="p-1.5 rounded-lg hover:bg-neutral-100 text-neutral-500 hover:text-neutral-800 active:scale-90 transition-transform"
          title="Close search"
        >
          <X className="w-4 h-4 stroke-[2.5]" />
        </button>
      </div>
    </div>
  );
};
