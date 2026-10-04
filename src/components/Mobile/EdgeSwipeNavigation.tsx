import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

interface EdgeSwipeNavigationProps {
  canGoBack: boolean;
  canGoForward: boolean;
  onGoBack: () => void;
  onGoForward: () => void;
  previousTitle?: string;
  nextTitle?: string;
  children: React.ReactNode;
}

export const EdgeSwipeNavigation: React.FC<EdgeSwipeNavigationProps> = ({
  canGoBack,
  canGoForward,
  onGoBack,
  onGoForward,
  previousTitle,
  nextTitle,
  children,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Swipe state
  const [swipeDirection, setSwipeDirection] = useState<'back' | 'forward' | null>(null);
  const [swipeProgress, setSwipeProgress] = useState(0); // 0 to 1
  const [touchY, setTouchY] = useState(250);
  const [isSwiping, setIsSwiping] = useState(false);

  // Gesture tracking refs
  const startXRef = useRef<number | null>(null);
  const startYRef = useRef<number | null>(null);
  const isEdgeRef = useRef<'left' | 'right' | null>(null);
  const currentDiffXRef = useRef(0);

  const THRESHOLD = 65; // pixels to trigger navigation
  const EDGE_MARGIN = 40; // width of edge capture area

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent | React.PointerEvent) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.PointerEvent).clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.PointerEvent).clientY;

    const relativeX = clientX - rect.left;
    const relativeY = clientY - rect.top;

    // Check if touch originated within left or right edge margin
    if (relativeX <= EDGE_MARGIN) {
      startXRef.current = clientX;
      startYRef.current = clientY;
      isEdgeRef.current = 'left';
      setTouchY(Math.max(100, Math.min(rect.height - 100, relativeY)));
      currentDiffXRef.current = 0;
    } else if (relativeX >= rect.width - EDGE_MARGIN) {
      startXRef.current = clientX;
      startYRef.current = clientY;
      isEdgeRef.current = 'right';
      setTouchY(Math.max(100, Math.min(rect.height - 100, relativeY)));
      currentDiffXRef.current = 0;
    } else {
      isEdgeRef.current = null;
    }
  };

  const handleTouchMove = (e: React.TouchEvent | React.PointerEvent) => {
    if (!isEdgeRef.current || startXRef.current === null || startYRef.current === null) return;

    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.PointerEvent).clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.PointerEvent).clientY;

    const diffX = clientX - startXRef.current;
    const diffY = clientY - startYRef.current;

    // If movement is predominantly vertical, cancel swipe so user can scroll naturally
    if (!isSwiping && Math.abs(diffY) > Math.abs(diffX) * 1.4 && Math.abs(diffY) > 10) {
      isEdgeRef.current = null;
      setIsSwiping(false);
      setSwipeDirection(null);
      return;
    }

    if (isEdgeRef.current === 'left' && diffX > 8) {
      // Swiping from left edge -> GO BACK
      setIsSwiping(true);
      setSwipeDirection('back');
      const progress = Math.min(1, Math.max(0, diffX / THRESHOLD));
      setSwipeProgress(progress);
      currentDiffXRef.current = diffX;

      // Update Y position slightly to follow finger smoothly
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setTouchY(Math.max(80, Math.min(rect.height - 80, clientY - rect.top)));
      }
    } else if (isEdgeRef.current === 'right' && diffX < -8) {
      // Swiping from right edge -> GO FORWARD
      setIsSwiping(true);
      setSwipeDirection('forward');
      const progress = Math.min(1, Math.max(0, -diffX / THRESHOLD));
      setSwipeProgress(progress);
      currentDiffXRef.current = -diffX;

      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setTouchY(Math.max(80, Math.min(rect.height - 80, clientY - rect.top)));
      }
    }
  };

  const handleTouchEnd = () => {
    if (isSwiping && swipeDirection) {
      if (currentDiffXRef.current >= THRESHOLD) {
        // Trigger navigation
        if (swipeDirection === 'back') {
          if (canGoBack) {
            try {
              navigator.vibrate?.(15);
            } catch {}
            onGoBack();
          }
        } else if (swipeDirection === 'forward') {
          if (canGoForward) {
            try {
              navigator.vibrate?.(15);
            } catch {}
            onGoForward();
          }
        }
      }
    }

    // Reset
    setIsSwiping(false);
    setSwipeDirection(null);
    setSwipeProgress(0);
    startXRef.current = null;
    startYRef.current = null;
    isEdgeRef.current = null;
    currentDiffXRef.current = 0;
  };

  const isTriggered = swipeProgress >= 1;

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex flex-col overflow-hidden select-none touch-pan-y"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      onPointerDown={handleTouchStart}
      onPointerMove={handleTouchMove}
      onPointerUp={handleTouchEnd}
      onPointerCancel={handleTouchEnd}
    >
      {/* Viewport Content */}
      <div
        className="w-full h-full flex-1 flex flex-col transition-transform duration-100 ease-out"
        style={{
          transform: isSwiping
            ? swipeDirection === 'back'
              ? `translateX(${Math.min(30, currentDiffXRef.current * 0.25)}px)`
              : `translateX(-${Math.min(30, currentDiffXRef.current * 0.25)}px)`
            : 'none',
        }}
      >
        {children}
      </div>

      {/* LEFT EDGE: Go Back Bubble & Indicator */}
      {isSwiping && swipeDirection === 'back' && (
        <div
          className="absolute left-0 z-40 pointer-events-none transition-all duration-75 ease-out flex items-center"
          style={{
            top: `${touchY - 24}px`,
            transform: `translateX(${Math.min(70, currentDiffXRef.current * 0.7) - 48}px)`,
          }}
        >
          {/* Curved Edge Bubble */}
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center shadow-xl border transition-all ${
              !canGoBack
                ? 'bg-neutral-800/80 border-neutral-700 text-neutral-400 opacity-60'
                : isTriggered
                ? 'bg-[#1A73E8] border-white text-white scale-110 shadow-blue-500/40 ring-4 ring-[#1A73E8]/30'
                : 'bg-white/95 border-neutral-200 text-[#1A73E8] scale-95 shadow-md'
            }`}
          >
            <ChevronLeft
              className={`w-6 h-6 stroke-[3] transition-transform ${
                isTriggered ? '-translate-x-0.5 scale-115' : ''
              }`}
            />
          </div>

          {/* Optional preview tooltip */}
          {isTriggered && (
            <div className="ml-3 bg-neutral-900/90 backdrop-blur-md text-white text-[11px] font-medium px-3 py-1.5 rounded-full shadow-lg whitespace-nowrap animate-in fade-in zoom-in-95 duration-100 border border-neutral-700/60 flex items-center gap-1.5">
              <ArrowLeft className="w-3 h-3 text-blue-400" />
              <span>{canGoBack ? (previousTitle ? `Back: ${previousTitle}` : 'Go Back') : 'No previous page'}</span>
            </div>
          )}
        </div>
      )}

      {/* RIGHT EDGE: Go Forward Bubble & Indicator */}
      {isSwiping && swipeDirection === 'forward' && (
        <div
          className="absolute right-0 z-40 pointer-events-none transition-all duration-75 ease-out flex items-center flex-row-reverse"
          style={{
            top: `${touchY - 24}px`,
            transform: `translateX(-${Math.min(70, currentDiffXRef.current * 0.7) - 48}px)`,
          }}
        >
          {/* Curved Edge Bubble */}
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center shadow-xl border transition-all ${
              !canGoForward
                ? 'bg-neutral-800/80 border-neutral-700 text-neutral-400 opacity-60'
                : isTriggered
                ? 'bg-[#1A73E8] border-white text-white scale-110 shadow-blue-500/40 ring-4 ring-[#1A73E8]/30'
                : 'bg-white/95 border-neutral-200 text-[#1A73E8] scale-95 shadow-md'
            }`}
          >
            <ChevronRight
              className={`w-6 h-6 stroke-[3] transition-transform ${
                isTriggered ? 'translate-x-0.5 scale-115' : ''
              }`}
            />
          </div>

          {/* Optional preview tooltip */}
          {isTriggered && (
            <div className="mr-3 bg-neutral-900/90 backdrop-blur-md text-white text-[11px] font-medium px-3 py-1.5 rounded-full shadow-lg whitespace-nowrap animate-in fade-in zoom-in-95 duration-100 border border-neutral-700/60 flex items-center gap-1.5">
              <span>{canGoForward ? (nextTitle ? `Forward: ${nextTitle}` : 'Go Forward') : 'No forward page'}</span>
              <ArrowRight className="w-3 h-3 text-blue-400" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
