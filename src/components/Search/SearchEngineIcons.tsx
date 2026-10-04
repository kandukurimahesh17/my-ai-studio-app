import React from 'react';
import { SearchEngineType } from '../../types/browser';

interface EngineIconProps {
  engine: SearchEngineType;
  className?: string;
}

export const SearchEngineIcon: React.FC<EngineIconProps> = ({ engine, className = 'w-6 h-6' }) => {
  switch (engine) {
    case 'google':
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
        </svg>
      );

    case 'bing':
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <path
            fill="#0083D0"
            d="M5 3v18l6-3.5 6-3.5V8.5L9.5 6.2 5 3zm4 5.8l3 1.5v4.5l-3 1.8V8.8z"
          />
          <path
            fill="#00B2FF"
            d="M17 8.5v5.5l-6 3.5 6-9z"
            opacity="0.85"
          />
        </svg>
      );

    case 'yahoo':
      return (
        <div className={`${className} rounded-full bg-[#6001D2] flex items-center justify-center text-white font-black text-[13px] leading-none select-none shadow-xs`}>
          y!
        </div>
      );

    case 'duckduckgo':
      return (
        <div className={`${className} rounded-full bg-[#DE5833] flex items-center justify-center p-0.5 overflow-hidden shadow-xs`}>
          <svg viewBox="0 0 64 64" className="w-full h-full">
            <circle cx="32" cy="32" r="30" fill="#DE5833" />
            {/* Duck head */}
            <circle cx="32" cy="30" r="18" fill="#FFFFFF" />
            {/* Green bowtie */}
            <polygon points="26,45 38,45 32,49" fill="#4B9B48" />
            {/* Orange bill */}
            <ellipse cx="40" cy="32" rx="9" ry="5" fill="#F49A24" />
            {/* Eye */}
            <circle cx="32" cy="27" r="3" fill="#202124" />
            <circle cx="33" cy="26" r="1" fill="#FFFFFF" />
          </svg>
        </div>
      );

    case 'yandex':
      return (
        <div className={`${className} rounded-full bg-[#FC3F1D] flex items-center justify-center text-white font-bold text-sm leading-none select-none shadow-xs`}>
          <span style={{ fontFamily: 'sans-serif' }}>Y</span>
        </div>
      );

    case 'aol':
      return (
        <div className={`${className} rounded-full bg-black flex items-center justify-center text-white font-black text-[10px] tracking-tight leading-none select-none shadow-xs`}>
          Aol.
        </div>
      );

    default:
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
        </svg>
      );
  }
};

/**
 * SearchEngineBadge:
 * Displays the search engine logo with the exact small grey triangle in the
 * bottom-right corner as shown in user Image-2. When the user selects a different
 * search engine, only the logo changes and the triangle remains in place.
 */
export const SearchEngineBadge: React.FC<{ engine: SearchEngineType; className?: string }> = ({
  engine,
  className = 'w-6 h-6',
}) => {
  return (
    <div className="relative inline-flex items-center justify-center shrink-0">
      <SearchEngineIcon engine={engine} className={className} />
      {/* Tiny subtle grey triangle dropdown indicator at bottom-right corner (Pixel-matched to Image-2) */}
      <svg
        viewBox="0 0 10 10"
        className="w-1.5 h-1.5 absolute bottom-0 right-0 pointer-events-none"
      >
        <polygon points="10,0 10,10 0,10" fill="#70757A" />
      </svg>
    </div>
  );
};
