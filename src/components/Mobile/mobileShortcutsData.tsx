import React from 'react';

export interface MobileShortcut {
  id: string;
  name: string;
  url: string;
  type: 'web' | 'action' | 'drawer';
  badgeColor?: string;
  renderIcon: () => React.ReactNode;
}

export const MOBILE_SHORTCUTS: MobileShortcut[] = [
  // Row 1: Google, YouTube, Facebook, WeScore, X
  {
    id: 'google',
    name: 'Google',
    url: 'https://www.google.com',
    type: 'web',
    renderIcon: () => (
      <div className="w-full h-full rounded-full overflow-hidden relative flex items-center justify-center shadow-xs">
        <svg viewBox="0 0 100 100" className="w-full h-full absolute inset-0">
          {/* Top-Left Quadrant: Yellow */}
          <path d="M 50 50 L 0 50 A 50 50 0 0 1 50 0 Z" fill="#FBBC05" />
          {/* Top-Right Quadrant: Red */}
          <path d="M 50 50 L 50 0 A 50 50 0 0 1 100 50 Z" fill="#EA4335" />
          {/* Bottom-Right Quadrant: Blue */}
          <path d="M 50 50 L 100 50 A 50 50 0 0 1 50 100 Z" fill="#4285F4" />
          {/* Bottom-Left Quadrant: Green */}
          <path d="M 50 50 L 50 100 A 50 50 0 0 1 0 50 Z" fill="#34A853" />
        </svg>
        {/* Bold White G in center */}
        <span
          className="relative z-10 text-white font-black text-2xl select-none leading-none"
          style={{ fontFamily: "'Product Sans', 'Google Sans', system-ui, sans-serif" }}
        >
          G
        </span>
      </div>
    ),
  },
  {
    id: 'youtube',
    name: 'YouTube',
    url: 'https://www.youtube.com',
    type: 'web',
    renderIcon: () => (
      <div className="w-full h-full rounded-full bg-[#FF0000] flex items-center justify-center shadow-xs">
        <div className="w-6.5 h-4.5 bg-white rounded-[6px] flex items-center justify-center shadow-2xs">
          <div className="w-0 h-0 border-y-[4.5px] border-y-transparent border-l-[7px] border-l-[#FF0000] ml-0.5" />
        </div>
      </div>
    ),
  },
  {
    id: 'facebook',
    name: 'Facebook',
    url: 'https://www.facebook.com',
    type: 'web',
    renderIcon: () => (
      <div className="w-full h-full rounded-full bg-[#1877F2] flex items-center justify-center overflow-hidden shadow-xs relative">
        <svg viewBox="0 0 36 36" className="w-7 h-7 fill-white translate-x-0.5 translate-y-0.5">
          <path d="M20.14 35V20.25h4.95l.74-5.75h-5.69v-3.67c0-1.66.46-2.8 2.85-2.8h3.05V2.88c-.53-.07-2.34-.23-4.45-.23-4.4 0-7.41 2.69-7.41 7.62v4.23H8.72v5.75h5.46V35h5.96z" />
        </svg>
      </div>
    ),
  },
  {
    id: 'wescore',
    name: 'WeScore',
    url: 'https://www.flashscore.com',
    type: 'action',
    renderIcon: () => (
      <div className="w-full h-full rounded-full bg-[#22C55E] flex items-center justify-center shadow-xs">
        <div className="w-7.5 h-7.5 rounded-full bg-white flex items-center justify-center p-0.5 shadow-2xs">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="47" fill="#FFFFFF" stroke="#111827" strokeWidth="4" />
            {/* Center black pentagon */}
            <polygon points="50,33 66,45 60,64 40,64 34,45" fill="#111827" />
            {/* Top seam & pentagon */}
            <line x1="50" y1="33" x2="50" y2="4" stroke="#111827" strokeWidth="4" />
            <path d="M35 4 L50 4 L65 4 L58 16 L42 16 Z" fill="#111827" />
            {/* Top-right seam & patch */}
            <line x1="66" y1="45" x2="94" y2="35" stroke="#111827" strokeWidth="4" />
            <path d="M94 35 L86 52 L76 46 L82 32 Z" fill="#111827" />
            {/* Bottom-right seam & patch */}
            <line x1="60" y1="64" x2="78" y2="90" stroke="#111827" strokeWidth="4" />
            <path d="M78 90 L62 96 L60 84 L72 78 Z" fill="#111827" />
            {/* Bottom-left seam & patch */}
            <line x1="40" y1="64" x2="22" y2="90" stroke="#111827" strokeWidth="4" />
            <path d="M22 90 L38 96 L40 84 L28 78 Z" fill="#111827" />
            {/* Top-left seam & patch */}
            <line x1="34" y1="45" x2="6" y2="35" stroke="#111827" strokeWidth="4" />
            <path d="M6 35 L14 52 L24 46 L18 32 Z" fill="#111827" />
          </svg>
        </div>
      </div>
    ),
  },
  {
    id: 'x',
    name: 'X',
    url: 'https://x.com',
    type: 'web',
    renderIcon: () => (
      <div className="w-full h-full rounded-full bg-black flex items-center justify-center shadow-xs">
        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </div>
    ),
  },

  // Row 2: Instagram, Status, Clean, Music, More
  {
    id: 'instagram',
    name: 'Instagram',
    url: 'https://www.instagram.com',
    type: 'web',
    renderIcon: () => (
      <div
        className="w-full h-full rounded-full flex items-center justify-center shadow-xs"
        style={{
          background:
            'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)',
        }}
      >
        <svg
          viewBox="0 0 24 24"
          className="w-6.5 h-6.5 fill-none stroke-white stroke-[2.2] stroke-linecap-round stroke-linejoin-round"
        >
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <circle cx="17.5" cy="6.5" r="1.2" fill="white" stroke="none" />
        </svg>
      </div>
    ),
  },
  {
    id: 'status',
    name: 'Status',
    url: 'https://web.whatsapp.com',
    type: 'action',
    renderIcon: () => (
      <div className="w-full h-full rounded-full bg-[#25D366] flex items-center justify-center shadow-xs">
        <svg viewBox="0 0 24 24" className="w-6.5 h-6.5 fill-white">
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 18.09c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.13 8.13 0 0 1-1.25-4.32c0-4.5 3.66-8.16 8.16-8.16 2.18 0 4.23.85 5.77 2.39 1.54 1.54 2.39 3.59 2.39 5.77 0 4.5-3.66 8.17-8.16 8.17zm4.47-6.11c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.15-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.15.17-.25.25-.41.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.84-.86 2.05s.88 2.38 1 2.55c.12.17 1.74 2.65 4.21 3.72.59.25 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.07-.1-.23-.17-.48-.29z" />
        </svg>
      </div>
    ),
  },
  {
    id: 'clean',
    name: 'Clean',
    url: 'lemon://clean',
    type: 'action',
    renderIcon: () => (
      <div className="w-full h-full rounded-full bg-[#FF6B00] flex items-center justify-center shadow-xs">
        <svg viewBox="0 0 24 24" className="w-6.5 h-6.5 fill-white">
          <path d="M9 3h6v2H9z" />
          <path d="M4 6h16v2H4z" />
          <path d="M6 9l1.2 11.2c.1 1 1 1.8 2 1.8h5.6c1 0 1.9-.8 2-1.8L18 9H6zm4 9H8.5l-.8-7H9.2l.8 7zm3 0h-2v-7h2v7zm3 0h-1.5l.8-7h1.5l-.8 7z" />
        </svg>
      </div>
    ),
  },
  {
    id: 'music',
    name: 'Music',
    url: 'lemon://music',
    type: 'action',
    renderIcon: () => (
      <div className="w-full h-full rounded-full bg-[#FF2D55] flex items-center justify-center shadow-xs">
        <svg viewBox="0 0 24 24" className="w-6.5 h-6.5 fill-white">
          <path d="M19 3H9c-1.1 0-2 .9-2 2v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V9h8v6.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V5c0-1.1.9-2 2-2h2V3z" />
        </svg>
      </div>
    ),
  },
  {
    id: 'more',
    name: 'More',
    url: 'lemon://more',
    type: 'action',
    renderIcon: () => (
      <div className="w-full h-full rounded-full bg-[#EEF2F6] p-2 flex items-center justify-center shadow-xs">
        <div className="grid grid-cols-2 gap-1 w-full h-full">
          {/* Netflix */}
          <div className="rounded-full bg-black flex items-center justify-center overflow-hidden">
            <span className="text-[#E50914] font-black text-[9px] leading-none">N</span>
          </div>
          {/* Snapchat */}
          <div className="rounded-full bg-[#FFFC00] flex items-center justify-center">
            <div className="w-2.5 h-2.5 bg-white rounded-full border border-neutral-300/40" />
          </div>
          {/* SoundCloud */}
          <div className="rounded-full bg-[#FF5500] flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-2.5 h-2.5 fill-white">
              <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
            </svg>
          </div>
          {/* Amazon */}
          <div className="rounded-full bg-[#232F3E] flex items-center justify-center">
            <span className="text-[#FF9900] font-bold text-[8px] leading-none">a</span>
          </div>
        </div>
      </div>
    ),
  },
];
