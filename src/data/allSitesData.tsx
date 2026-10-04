import React from 'react';

export type SiteCategoryId =
  | 'download'
  | 'social'
  | 'video'
  | 'news'
  | 'tools'
  | 'entertainment'
  | 'music'
  | 'shopping'
  | 'business'
  | 'photography'
  | 'sports'
  | 'religion'
  | 'education'
  | 'job'
  | 'finance'
  | 'books'
  | 'travel'
  | 'food'
  | 'fashion'
  | 'health'
  | 'parenting'
  | 'reference';

export interface SiteItem {
  id: string;
  name: string;
  url: string;
  category: SiteCategoryId;
  logoUrl?: string;
  renderIcon: () => React.ReactNode;
}

export interface SiteCategory {
  id: SiteCategoryId;
  name: string;
  icon: string;
  color: string;
  activeBg: string;
}

export const SITE_CATEGORIES: SiteCategory[] = [
  { id: 'download', name: 'Download', icon: '⬇', color: '#2563EB', activeBg: 'bg-[#2F70F2] text-white' },
  { id: 'social', name: 'Social', icon: '💬', color: '#16A34A', activeBg: 'bg-[#16A34A] text-white' },
  { id: 'video', name: 'Video', icon: '🎬', color: '#7C3AED', activeBg: 'bg-[#7C3AED] text-white' },
  { id: 'news', name: 'News', icon: '📰', color: '#DC2626', activeBg: 'bg-[#DC2626] text-white' },
  { id: 'tools', name: 'Tools', icon: '📦', color: '#7C3AED', activeBg: 'bg-[#7C3AED] text-white' },
  { id: 'entertainment', name: 'Entertainment', icon: '🎤', color: '#F59E0B', activeBg: 'bg-[#F59E0B] text-white' },
  { id: 'music', name: 'Music', icon: '🎵', color: '#06B6D4', activeBg: 'bg-[#06B6D4] text-white' },
  { id: 'shopping', name: 'Shopping', icon: '🛒', color: '#E11D48', activeBg: 'bg-[#E11D48] text-white' },
  { id: 'business', name: 'Business', icon: '💹', color: '#16A34A', activeBg: 'bg-[#16A34A] text-white' },
  { id: 'photography', name: 'Photography', icon: '📷', color: '#9F1239', activeBg: 'bg-[#9F1239] text-white' },
  { id: 'sports', name: 'Sports', icon: '🏃', color: '#16A34A', activeBg: 'bg-[#16A34A] text-white' },
  { id: 'religion', name: 'Religion', icon: 'ℹ', color: '#4F46E5', activeBg: 'bg-[#4F46E5] text-white' },
  { id: 'education', name: 'Education', icon: '🎓', color: '#0D9488', activeBg: 'bg-[#0D9488] text-white' },
  { id: 'job', name: 'Job', icon: '👔', color: '#DC2626', activeBg: 'bg-[#DC2626] text-white' },
  { id: 'finance', name: 'Finance', icon: '📈', color: '#2563EB', activeBg: 'bg-[#2563EB] text-white' },
  { id: 'books', name: 'Books', icon: '📖', color: '#B45309', activeBg: 'bg-[#B45309] text-white' },
  { id: 'travel', name: 'Travel', icon: '✈', color: '#7C3AED', activeBg: 'bg-[#7C3AED] text-white' },
  { id: 'food', name: 'Food', icon: '🍕', color: '#EA580C', activeBg: 'bg-[#EA580C] text-white' },
  { id: 'fashion', name: 'Fashion', icon: '👠', color: '#E11D48', activeBg: 'bg-[#E11D48] text-white' },
  { id: 'health', name: 'Health', icon: '💖', color: '#EF4444', activeBg: 'bg-[#EF4444] text-white' },
  { id: 'parenting', name: 'Parenting', icon: '🍼', color: '#F59E0B', activeBg: 'bg-[#F59E0B] text-white' },
  { id: 'reference', name: 'Reference', icon: '🏛', color: '#0D9488', activeBg: 'bg-[#0D9488] text-white' },
];

export const ALL_SITES: SiteItem[] = [
  // ==========================================
  // 1. DOWNLOAD
  // ==========================================
  {
    id: 'piratebay',
    name: 'The Pirate Bay',
    url: 'https://thepiratebay.org',
    category: 'download',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-[#EA580C] flex items-center justify-center shadow-xs">
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
          <path d="M20 21c-1.39 0-2.78-.47-4-1.32-2.44 1.71-5.56 1.71-8 0C6.78 20.53 5.39 21 4 21H2v2h2c1.38 0 2.74-.35 4-.99 2.52 1.29 5.48 1.29 8 0 1.26.65 2.62.99 4 .99h2v-2h-2zM3.95 19H4c1.6 0 3.02-.88 4-2 .98 1.12 2.4 2 4 2s3.02-.88 4-2c.98 1.12 2.4 2 4 2h.05l1.89-6.68c.08-.26.06-.54-.06-.78s-.33-.41-.6-.46L19 11V3h-2v5.87l-4.22-.84c-.2-.04-.42-.01-.62.08s-.36.25-.44.45L10 12H7V9H5v4.5l-2.94.59c-.27.05-.49.22-.61.46s-.13.52-.06.78L3.95 19z" />
        </svg>
      </div>
    ),
  },
  {
    id: '1337x',
    name: '1337X',
    url: 'https://1337x.to',
    category: 'download',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-[#DC2626] flex items-center justify-center text-white font-black text-[9px] shadow-xs tracking-tighter">
        1337X
      </div>
    ),
  },
  {
    id: 'watchvideo',
    name: 'Watch Video',
    url: 'https://watchvideo.us',
    category: 'download',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-[#374151] flex items-center justify-center shadow-xs">
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
        </svg>
      </div>
    ),
  },
  {
    id: 'movcr',
    name: 'Movcr',
    url: 'https://movcr.to',
    category: 'download',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-[#16A34A] flex items-center justify-center text-white font-bold text-[10px] shadow-xs">
        MovCr
      </div>
    ),
  },
  {
    id: 'o2tvseries',
    name: 'O2tvseries',
    url: 'https://o2tvseries.com',
    category: 'download',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-[#2563EB] flex items-center justify-center text-white font-black text-[12px] shadow-xs">
        O₂
      </div>
    ),
  },
  {
    id: 'tvshow4mobile',
    name: 'TvShow4Mobile',
    url: 'https://tvshow4mobile.com',
    category: 'download',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-white border border-teal-200 flex items-center justify-center text-[#0D9488] font-black text-[11px] shadow-xs">
        Tv
      </div>
    ),
  },
  {
    id: 'fzmovies',
    name: 'Fz Movies',
    url: 'https://fzmovies.net',
    category: 'download',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-[#1F2937] flex items-center justify-center shadow-xs">
        <div className="w-4 h-4 rounded-full border-2 border-orange-500 border-t-cyan-400 rotate-45" />
      </div>
    ),
  },
  {
    id: 'eztv',
    name: 'EZTV',
    url: 'https://eztv.re',
    category: 'download',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-[#EA580C] flex items-center justify-center text-white font-bold text-[9px] shadow-xs">
        EZTV
      </div>
    ),
  },
  {
    id: 'downloadanymovie',
    name: 'Download Any Movie',
    url: 'https://downloadanymovie.com',
    category: 'download',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-[#EF4444] flex items-center justify-center shadow-xs">
        <div className="w-0 h-0 border-y-[4px] border-y-transparent border-l-[7px] border-l-white ml-0.5" />
      </div>
    ),
  },
  {
    id: 'torhd',
    name: 'TORHD',
    url: 'https://torhd.com',
    category: 'download',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-[#06B6D4] flex items-center justify-center text-white font-bold text-[9px] shadow-xs">
        TOR
      </div>
    ),
  },
  {
    id: 'lightdownloads',
    name: 'LIGHT DOWNLOADS',
    url: 'https://lightdownloads.com',
    category: 'download',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-[#3B82F6] flex items-center justify-center shadow-xs">
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
          <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
        </svg>
      </div>
    ),
  },

  // ==========================================
  // 2. SOCIAL
  // ==========================================
  {
    id: 'tumblr',
    name: 'Tumblr',
    url: 'https://www.tumblr.com',
    category: 'social',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-[#36465D] flex items-center justify-center text-white font-serif font-black text-xl shadow-xs">
        t
      </div>
    ),
  },
  {
    id: 'linkedin_social',
    name: 'LinkedIn',
    url: 'https://www.linkedin.com',
    category: 'social',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-[#0A66C2] flex items-center justify-center text-white font-bold text-sm shadow-xs">
        in
      </div>
    ),
  },
  {
    id: 'pinterest_social',
    name: 'Pinterest',
    url: 'https://www.pinterest.com',
    category: 'social',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-[#E60023] flex items-center justify-center text-white font-serif font-black text-xl shadow-xs">
        P
      </div>
    ),
  },
  {
    id: 'snapchat',
    name: 'Snapchat',
    url: 'https://www.snapchat.com',
    category: 'social',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-[#FFFC00] flex items-center justify-center shadow-xs">
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white stroke-black stroke-1">
          <path d="M12 2c-3.86 0-6 2.87-6 5.86 0 1.22.42 2.64.48 2.85-.24.08-.82.28-1.29.53-.4.21-.69.57-.46 1.05.23.47.78.68 1.48.51.27.76.77 1.58 1.64 1.94-.09.31-.38.86-.88 1.15-.47.27-.85.35-1.04.77-.18.4.15.77.67.75 1.01-.03 2.12-.59 2.76-.89.6.35 1.54.59 2.62.59s2.02-.24 2.62-.59c.64.3 1.75.86 2.76.89.52.02.85-.35.67-.75-.19-.42-.57-.5-1.04-.77-.5-.29-.79-.84-.88-1.15.87-.36 1.37-1.18 1.64-1.94.7.17 1.25-.04 1.48-.51.23-.48-.06-.84-.46-1.05-.47-.25-1.05-.45-1.29-.53.06-.21.48-1.63.48-2.85C18 4.87 15.86 2 12 2z" />
        </svg>
      </div>
    ),
  },
  {
    id: 'x_site',
    name: 'X',
    url: 'https://x.com',
    category: 'social',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-black flex items-center justify-center shadow-xs">
        <svg viewBox="0 0 24 24" className="w-4.5 h-4.5 fill-white">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </div>
    ),
  },
  {
    id: 'blogger',
    name: 'Blogger',
    url: 'https://www.blogger.com',
    category: 'social',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-[#FF5722] flex items-center justify-center text-white font-bold text-lg shadow-xs">
        B
      </div>
    ),
  },
  {
    id: 'facebook_site',
    name: 'Facebook',
    url: 'https://www.facebook.com',
    category: 'social',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-[#1877F2] flex items-center justify-center text-white font-black text-xl shadow-xs">
        f
      </div>
    ),
  },
  {
    id: 'instagram_site',
    name: 'Instagram',
    url: 'https://www.instagram.com',
    category: 'social',
    renderIcon: () => (
      <div
        className="w-9 h-9 rounded-full flex items-center justify-center shadow-xs"
        style={{
          background:
            'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)',
        }}
      >
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-white stroke-[2.2]">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <circle cx="17.5" cy="6.5" r="1.2" fill="white" stroke="none" />
        </svg>
      </div>
    ),
  },

  // ==========================================
  // 3. VIDEO
  // ==========================================
  {
    id: 'youtube_site',
    name: 'YouTube',
    url: 'https://www.youtube.com',
    category: 'video',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-[#FF0000] flex items-center justify-center shadow-xs">
        <div className="w-0 h-0 border-y-[4px] border-y-transparent border-l-[7px] border-l-white ml-0.5" />
      </div>
    ),
  },
  {
    id: 'netflix',
    name: 'Netflix',
    url: 'https://www.netflix.com',
    category: 'video',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-black flex items-center justify-center text-[#E50914] font-black text-xl shadow-xs">
        N
      </div>
    ),
  },
  {
    id: 'amazonprime',
    name: 'Amazon Prime Video',
    url: 'https://www.primevideo.com',
    category: 'video',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-[#00A8E1] flex items-center justify-center text-white font-bold text-[9px] shadow-xs">
        prime
      </div>
    ),
  },
  {
    id: 'dailymotion',
    name: 'Dailymotion',
    url: 'https://www.dailymotion.com',
    category: 'video',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-[#202124] flex items-center justify-center text-white font-black text-base shadow-xs">
        d
      </div>
    ),
  },
  {
    id: 'twitch',
    name: 'Twitch',
    url: 'https://www.twitch.tv',
    category: 'video',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-[#9146FF] flex items-center justify-center text-white font-bold text-sm shadow-xs">
        💬
      </div>
    ),
  },
  {
    id: 'vimeo',
    name: 'Vimeo',
    url: 'https://www.vimeo.com',
    category: 'video',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-[#1AB7EA] flex items-center justify-center text-white font-serif font-black text-lg shadow-xs">
        v
      </div>
    ),
  },
  {
    id: 'hulu',
    name: 'Hulu',
    url: 'https://www.hulu.com',
    category: 'video',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-[#1CE783] flex items-center justify-center text-white font-black text-[9px] shadow-xs">
        hulu
      </div>
    ),
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    url: 'https://www.tiktok.com',
    category: 'video',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-black flex items-center justify-center shadow-xs">
        <svg viewBox="0 0 24 24" className="w-4.5 h-4.5 fill-[#00F2FE]">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.49 6.27 6.27 0 0 0 1.88-4.49v-7a8.21 8.21 0 0 0 4.89 1.6v-3.57z" />
        </svg>
      </div>
    ),
  },

  // ==========================================
  // 4. NEWS
  // ==========================================
  {
    id: 'bbc',
    name: 'BBC',
    url: 'https://www.bbc.com',
    category: 'news',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-[#BB1919] flex items-center justify-center text-white font-bold text-[9px] tracking-tight shadow-xs">
        BBC
      </div>
    ),
  },
  {
    id: 'cnn',
    name: 'CNN',
    url: 'https://www.cnn.com',
    category: 'news',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-[#CC0000] flex items-center justify-center text-white font-black text-[9px] tracking-tight shadow-xs">
        CNN
      </div>
    ),
  },
  {
    id: 'googlenews',
    name: 'Google News',
    url: 'https://news.google.com',
    category: 'news',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-white border border-neutral-200 flex items-center justify-center shadow-xs">
        <svg viewBox="0 0 24 24" className="w-5 h-5">
          <path fill="#4285F4" d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
          <path fill="#FFF" d="M7 7h10v2H7zm0 4h10v2H7zm0 4h7v2H7z" />
        </svg>
      </div>
    ),
  },
  {
    id: 'express',
    name: 'Express',
    url: 'https://www.express.co.uk',
    category: 'news',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-[#DC2626] flex items-center justify-center text-white font-serif font-black text-base shadow-xs">
        E
      </div>
    ),
  },
  {
    id: 'dailymail',
    name: 'Dailymail',
    url: 'https://www.dailymail.co.uk',
    category: 'news',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-[#004C8C] flex items-center justify-center text-white font-serif font-black text-sm shadow-xs">
        M
      </div>
    ),
  },

  // ==========================================
  // 5. TOOLS
  // ==========================================
  {
    id: 'gmail',
    name: 'Gmail',
    url: 'https://mail.google.com',
    category: 'tools',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-white border border-neutral-200 flex items-center justify-center shadow-xs">
        <svg viewBox="0 0 24 24" className="w-5 h-5">
          <path fill="#EA4335" d="M4 20h16a2 2 0 0 0 2-2V8l-10 6L2 8v10a2 2 0 0 0 2 2z" />
          <path fill="#FBBC05" d="M22 6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v2l10 6 10-6V6z" />
        </svg>
      </div>
    ),
  },
  {
    id: 'maps',
    name: 'Maps',
    url: 'https://maps.google.com',
    category: 'tools',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-white border border-neutral-200 flex items-center justify-center shadow-xs">
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#34A853]">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
        </svg>
      </div>
    ),
  },
  {
    id: 'drive',
    name: 'Drive',
    url: 'https://drive.google.com',
    category: 'tools',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-white border border-neutral-200 flex items-center justify-center shadow-xs">
        <svg viewBox="0 0 24 24" className="w-5 h-5">
          <path fill="#FFC107" d="M8.5 3h7L22 15h-7z" />
          <path fill="#0066DA" d="M2 15h13l3.5 6H5.5z" />
          <path fill="#00AC47" d="M8.5 3L2 15l3.5 6 6.5-12z" />
        </svg>
      </div>
    ),
  },
  {
    id: 'translate',
    name: 'Translate',
    url: 'https://translate.google.com',
    category: 'tools',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-white border border-neutral-200 flex items-center justify-center shadow-xs">
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#4285F4]">
          <path d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z" />
        </svg>
      </div>
    ),
  },
  {
    id: 'yahoomail',
    name: 'Yahoo Mail',
    url: 'https://mail.yahoo.com',
    category: 'tools',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-[#6001D2] flex items-center justify-center text-white font-bold text-xs shadow-xs">
        y!
      </div>
    ),
  },
  {
    id: 'dropbox',
    name: 'Dropbox',
    url: 'https://www.dropbox.com',
    category: 'tools',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-[#0061FF] flex items-center justify-center text-white font-bold text-xs shadow-xs">
        📦
      </div>
    ),
  },
  {
    id: 'slideshare',
    name: 'SlideShare',
    url: 'https://www.slideshare.net',
    category: 'tools',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-white border border-neutral-200 flex items-center justify-center text-[#0077B5] font-black text-xs shadow-xs">
        👥
      </div>
    ),
  },
  {
    id: 'freepik',
    name: 'Freepik',
    url: 'https://www.freepik.com',
    category: 'tools',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-[#1273EB] flex items-center justify-center text-white font-bold text-xs shadow-xs">
        🤖
      </div>
    ),
  },
  {
    id: 'outlook',
    name: 'Outlook',
    url: 'https://outlook.live.com',
    category: 'tools',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-[#0078D4] flex items-center justify-center text-white font-bold text-xs shadow-xs">
        O
      </div>
    ),
  },
  {
    id: 'wordpress',
    name: 'Wordpress',
    url: 'https://wordpress.com',
    category: 'tools',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-[#21759B] flex items-center justify-center text-white font-bold text-base shadow-xs">
        W
      </div>
    ),
  },
  {
    id: 'factcheck',
    name: 'Fact Check',
    url: 'https://toolbox.google.com/factcheck/explorer',
    category: 'tools',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-white border border-neutral-200 flex items-center justify-center shadow-xs">
        <span className="text-[#4285F4] font-black text-sm">G</span>
      </div>
    ),
  },

  // ==========================================
  // 6. ENTERTAINMENT
  // ==========================================
  {
    id: 'rottentomatoes',
    name: 'Rotten Tomatoes',
    url: 'https://www.rottentomatoes.com',
    category: 'entertainment',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-[#FA320A] flex items-center justify-center text-white font-bold text-[7px] leading-tight text-center p-0.5 shadow-xs">
        Rotten Tomatoes
      </div>
    ),
  },
  {
    id: 'imdb',
    name: 'IMDB',
    url: 'https://www.imdb.com',
    category: 'entertainment',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-[#F5C518] flex items-center justify-center text-black font-black text-[9px] tracking-tight shadow-xs">
        IMDb
      </div>
    ),
  },

  // ==========================================
  // 7. MUSIC
  // ==========================================
  {
    id: 'soundcloud',
    name: 'Sound Cloud',
    url: 'https://soundcloud.com',
    category: 'music',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-[#FF5500] flex items-center justify-center shadow-xs">
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
          <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
        </svg>
      </div>
    ),
  },
  {
    id: 'spotify',
    name: 'Spotify',
    url: 'https://open.spotify.com',
    category: 'music',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-black flex items-center justify-center shadow-xs">
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.59 14.42c-.18.3-.57.39-.87.21-2.38-1.46-5.38-1.79-8.91-.98-.34.08-.68-.14-.76-.48-.08-.34.14-.68.48-.76 3.87-.89 7.18-.51 9.85 1.13.3.18.39.57.21.88zm1.22-2.72c-.23.37-.71.49-1.08.26-2.73-1.68-6.88-2.17-10.11-1.18-.42.13-.86-.11-.98-.53-.13-.42.11-.86.53-.98 3.7-1.13 8.28-.58 11.38 1.33.37.23.49.72.26 1.1zm.11-2.82C14.65 8.92 9.24 8.74 6.1 9.69c-.5.15-1.03-.13-1.18-.63-.15-.5.13-1.03.63-1.18 3.65-1.11 9.64-.9 13.43 1.35.45.27.6.86.33 1.31-.27.46-.86.61-1.39.34z" />
        </svg>
      </div>
    ),
  },
  {
    id: 'genius',
    name: 'Genius',
    url: 'https://genius.com',
    category: 'music',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-[#FFFF64] flex items-center justify-center text-black font-black text-base shadow-xs">
        😊
      </div>
    ),
  },
  {
    id: 'worldstar',
    name: 'WorldStar HipHop',
    url: 'https://worldstarhiphop.com',
    category: 'music',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-black flex items-center justify-center text-white shadow-xs">
        <svg viewBox="0 0 24 24" className="w-4.5 h-4.5 fill-white">
          <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z" />
        </svg>
      </div>
    ),
  },
  {
    id: 'ultimateguitar',
    name: 'Ultimate Guitar',
    url: 'https://www.ultimate-guitar.com',
    category: 'music',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-[#181818] flex items-center justify-center text-[#FFC600] font-black text-base shadow-xs">
        🎸
      </div>
    ),
  },

  // ==========================================
  // 8. SHOPPING
  // ==========================================
  {
    id: 'amazon',
    name: 'Amazon',
    url: 'https://www.amazon.com',
    category: 'shopping',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-[#232F3E] flex items-center justify-center text-white font-bold text-sm shadow-xs">
        a
      </div>
    ),
  },
  {
    id: 'aliexpress',
    name: 'Aliexpress',
    url: 'https://www.aliexpress.com',
    category: 'shopping',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-[#E62E04] flex items-center justify-center text-white font-serif font-black text-[7px] leading-tight text-center shadow-xs">
        AliExpress
      </div>
    ),
  },

  // ==========================================
  // 9. BUSINESS
  // ==========================================
  {
    id: 'bloomberg',
    name: 'Bloomberg',
    url: 'https://www.bloomberg.com',
    category: 'business',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-black flex items-center justify-center text-white font-bold text-base shadow-xs">
        B
      </div>
    ),
  },
  {
    id: 'businessinsider',
    name: 'Business Insider',
    url: 'https://www.businessinsider.com',
    category: 'business',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-black flex items-center justify-center text-white font-bold text-xs tracking-tight shadow-xs">
        BI
      </div>
    ),
  },
  {
    id: 'forbes',
    name: 'Forbes',
    url: 'https://www.forbes.com',
    category: 'business',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-black flex items-center justify-center text-white font-serif font-bold text-[8px] tracking-tighter shadow-xs">
        Forbes
      </div>
    ),
  },
  {
    id: 'wsj',
    name: 'Wall Street Journal',
    url: 'https://www.wsj.com',
    category: 'business',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-white border border-neutral-300 flex items-center justify-center text-black font-serif font-bold text-[9px] shadow-xs">
        WSJ
      </div>
    ),
  },
  {
    id: 'ft',
    name: 'Financial Times',
    url: 'https://www.ft.com',
    category: 'business',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-[#FFF1E5] border border-neutral-200 flex items-center justify-center text-[#333333] font-serif font-bold text-xs shadow-xs">
        FT
      </div>
    ),
  },
  {
    id: 'economist',
    name: 'The Economist',
    url: 'https://www.economist.com',
    category: 'business',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-[#E3120B] flex items-center justify-center text-white font-serif font-black text-base shadow-xs">
        E
      </div>
    ),
  },

  // ==========================================
  // 10. PHOTOGRAPHY
  // ==========================================
  {
    id: 'pinterest_photo',
    name: 'Pinterest',
    url: 'https://www.pinterest.com',
    category: 'photography',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-[#E60023] flex items-center justify-center text-white font-serif font-black text-xl shadow-xs">
        P
      </div>
    ),
  },
  {
    id: '500px',
    name: '500px',
    url: 'https://500px.com',
    category: 'photography',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-black flex items-center justify-center text-white font-bold text-[8px] shadow-xs">
        500px
      </div>
    ),
  },
  {
    id: 'foter',
    name: 'FOTER',
    url: 'https://foter.com',
    category: 'photography',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-black flex items-center justify-center text-white font-bold text-[8px] tracking-tight shadow-xs">
        FOTER
      </div>
    ),
  },
  {
    id: 'pixabay',
    name: 'Pixabay',
    url: 'https://pixabay.com',
    category: 'photography',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-[#02BE6E] flex items-center justify-center text-white font-bold text-xs shadow-xs">
        px
      </div>
    ),
  },
  {
    id: 'unsplash',
    name: 'Unsplash',
    url: 'https://unsplash.com',
    category: 'photography',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-black flex items-center justify-center shadow-xs">
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
          <path d="M7.5 6.75V0h9v6.75h-9zm9 3.75H24V24H0V10.5h7.5v6.75h9V10.5z" />
        </svg>
      </div>
    ),
  },
  {
    id: 'pexels',
    name: 'Pexels',
    url: 'https://www.pexels.com',
    category: 'photography',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-[#05A081] flex items-center justify-center text-white font-bold text-base shadow-xs">
        P
      </div>
    ),
  },
  {
    id: 'flickr',
    name: 'Flickr',
    url: 'https://www.flickr.com',
    category: 'photography',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-black flex items-center justify-center gap-1 shadow-xs">
        <div className="w-2.5 h-2.5 rounded-full bg-[#0063DC]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#FF0084]" />
      </div>
    ),
  },
  {
    id: 'googlearts',
    name: 'Google Arts & Culture',
    url: 'https://artsandculture.google.com',
    category: 'photography',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-white border border-neutral-200 flex items-center justify-center text-[#4285F4] shadow-xs">
        🏛️
      </div>
    ),
  },
  {
    id: 'istock',
    name: 'iStock',
    url: 'https://www.istockphoto.com',
    category: 'photography',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-black flex items-center justify-center text-white font-bold text-[8px] tracking-tight shadow-xs">
        iStock
      </div>
    ),
  },

  // ==========================================
  // 11. SPORTS
  // ==========================================
  {
    id: 'livescore',
    name: 'LiveScore',
    url: 'https://www.livescore.com',
    category: 'sports',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-[#FF6900] flex items-center justify-center text-white font-black text-sm italic shadow-xs">
        LS
      </div>
    ),
  },
  {
    id: 'espn',
    name: 'ESPN',
    url: 'https://www.espn.com',
    category: 'sports',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-[#CC0000] flex items-center justify-center text-white font-black text-[9px] tracking-tighter italic shadow-xs">
        ESPN
      </div>
    ),
  },
  {
    id: 'flashscore',
    name: 'FlashScore',
    url: 'https://www.flashscore.com',
    category: 'sports',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-[#1A1A1A] flex items-center justify-center text-white font-black text-xs shadow-xs">
        FS
      </div>
    ),
  },
  {
    id: 'goal',
    name: 'GOAL',
    url: 'https://www.goal.com',
    category: 'sports',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-black flex items-center justify-center text-white font-black text-[9px] shadow-xs">
        GOAL
      </div>
    ),
  },
  {
    id: 'cricbuzz',
    name: 'Cricbuzz',
    url: 'https://www.cricbuzz.com',
    category: 'sports',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-[#009270] flex items-center justify-center text-white font-black text-xs shadow-xs">
        cb
      </div>
    ),
  },
  {
    id: 'wwe',
    name: 'WWE',
    url: 'https://www.wwe.com',
    category: 'sports',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-black flex items-center justify-center text-white font-black text-xs shadow-xs">
        WWE
      </div>
    ),
  },
  {
    id: 'sofascore',
    name: 'SofaScore',
    url: 'https://www.sofascore.com',
    category: 'sports',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-[#374DF5] flex items-center justify-center text-white font-bold text-xs shadow-xs">
        🛋️
      </div>
    ),
  },
  {
    id: 'yahoosports',
    name: 'Yahoo! Sports',
    url: 'https://sports.yahoo.com',
    category: 'sports',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-[#6001D2] flex items-center justify-center text-white font-bold text-xs shadow-xs">
        y!
      </div>
    ),
  },
  {
    id: 'marca',
    name: 'Marca',
    url: 'https://marca.com',
    category: 'sports',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-[#E51B24] flex items-center justify-center text-white font-black text-base shadow-xs">
        M
      </div>
    ),
  },
  {
    id: 'fpl',
    name: 'Fantasy Premier League',
    url: 'https://fantasy.premierleague.com',
    category: 'sports',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-[#38003C] flex items-center justify-center text-[#00FF87] font-bold text-base shadow-xs">
        👑
      </div>
    ),
  },

  // ==========================================
  // 12. RELIGION (Images 1 & 2)
  // ==========================================
  {
    id: 'biblegateway',
    name: 'Bible Gateway',
    url: 'https://www.biblegateway.com',
    category: 'religion',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-[#782329] flex items-center justify-center text-white font-serif font-bold text-[7px] text-center p-0.5 shadow-xs">
        Bible Gateway
      </div>
    ),
  },
  {
    id: 'jw',
    name: 'JW',
    url: 'https://www.jw.org',
    category: 'religion',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-[#0066CC] flex items-center justify-center text-white font-bold text-sm shadow-xs">
        JW
      </div>
    ),
  },
  {
    id: 'bible_org',
    name: 'Bible',
    url: 'https://www.bible.com',
    category: 'religion',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-[#00B050] flex items-center justify-center text-white font-bold text-xs shadow-xs">
        Bible
      </div>
    ),
  },
  {
    id: 'biblehub',
    name: 'Bible Hub',
    url: 'https://biblehub.com',
    category: 'religion',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-[#0070C0] flex items-center justify-center text-white font-bold text-base shadow-xs">
        B
      </div>
    ),
  },
  {
    id: 'churchofjesuschrist',
    name: 'The Church of Jesus Christ',
    url: 'https://www.churchofjesuschrist.org',
    category: 'religion',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-white border border-neutral-200 flex items-center justify-center text-[#B38F48] font-serif text-[7px] text-center leading-tight p-0.5 shadow-xs">
        Jesus Christ
      </div>
    ),
  },
  {
    id: 'biblestudytools',
    name: 'Bible Study Tools',
    url: 'https://www.biblestudytools.com',
    category: 'religion',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-black flex items-center justify-center text-[#FFC000] text-sm shadow-xs">
        ✦
      </div>
    ),
  },
  {
    id: 'islamweb',
    name: 'Islam web',
    url: 'https://www.islamweb.net',
    category: 'religion',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-white border border-neutral-200 flex items-center justify-center text-[#C00060] text-sm shadow-xs">
        🌸
      </div>
    ),
  },
  {
    id: 'islamicfinder',
    name: 'Islamic Finder',
    url: 'https://www.islamicfinder.org',
    category: 'religion',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-[#009944] flex items-center justify-center text-white text-sm shadow-xs">
        🕌
      </div>
    ),
  },
  {
    id: 'muslimpro',
    name: 'Muslim Pro',
    url: 'https://www.muslimpro.com',
    category: 'religion',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-[#008000] flex items-center justify-center text-white text-sm shadow-xs">
        ☪
      </div>
    ),
  },
  {
    id: 'astrologyzodiac',
    name: 'Astrology Zodiac Signs',
    url: 'https://www.astrology-zodiac-signs.com',
    category: 'religion',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-white border border-neutral-200 flex items-center justify-center text-lg shadow-xs">
        🔮
      </div>
    ),
  },

  // ==========================================
  // 13. EDUCATION (Images 2 & 6)
  // ==========================================
  {
    id: 'topuniversities',
    name: 'Top Universities',
    url: 'https://www.topuniversities.com',
    category: 'education',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-[#E57200] flex items-center justify-center text-white font-bold text-xs shadow-xs">
        QS
      </div>
    ),
  },
  {
    id: 'coursera',
    name: 'Coursera',
    url: 'https://www.coursera.org',
    category: 'education',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-[#0056D2] flex items-center justify-center text-white font-bold text-[8px] shadow-xs">
        coursera
      </div>
    ),
  },
  {
    id: 'edx',
    name: 'EdX',
    url: 'https://www.edx.org',
    category: 'education',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-[#00262B] flex items-center justify-center text-[#B5F9FF] font-bold text-xs shadow-xs">
        edX
      </div>
    ),
  },
  {
    id: 'khanacademy',
    name: 'Khan Academy',
    url: 'https://www.khanacademy.org',
    category: 'education',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-[#14BF98] flex items-center justify-center text-white text-sm shadow-xs">
        🌿
      </div>
    ),
  },
  {
    id: 'w3schools',
    name: 'W3 Schools',
    url: 'https://www.w3schools.com',
    category: 'education',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-[#04AA6D] flex items-center justify-center text-white font-bold text-xs shadow-xs">
        w3
      </div>
    ),
  },
  {
    id: 'harvardonline',
    name: 'Harvard Online Courses',
    url: 'https://pll.harvard.edu',
    category: 'education',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-[#A51C30] flex items-center justify-center text-white font-serif font-black text-xs shadow-xs">
        H
      </div>
    ),
  },
  {
    id: 'udemy',
    name: 'Udemy',
    url: 'https://www.udemy.com',
    category: 'education',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-[#A435F0] flex items-center justify-center text-white font-bold text-base shadow-xs">
        u
      </div>
    ),
  },
  {
    id: 'openclassrooms',
    name: 'Open Classrooms',
    url: 'https://openclassrooms.com',
    category: 'education',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-[#5E2B97] flex items-center justify-center text-white font-bold text-sm shadow-xs">
        ↄ
      </div>
    ),
  },

  // ==========================================
  // 14. JOB (Images 2, 5, 6)
  // ==========================================
  {
    id: 'linkedin_job',
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/jobs',
    category: 'job',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-[#0A66C2] flex items-center justify-center text-white font-bold text-sm shadow-xs">
        in
      </div>
    ),
  },
  {
    id: 'indeed',
    name: 'Indeed',
    url: 'https://www.indeed.com',
    category: 'job',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-[#003A9B] flex items-center justify-center text-white font-bold text-[8px] shadow-xs">
        indeed
      </div>
    ),
  },
  {
    id: 'glassdoor',
    name: 'Glassdoor',
    url: 'https://www.glassdoor.com',
    category: 'job',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-[#0CAA41] flex items-center justify-center text-white font-bold text-xs shadow-xs">
        []
      </div>
    ),
  },
  {
    id: 'freelancer',
    name: 'Freelancer',
    url: 'https://www.freelancer.com',
    category: 'job',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-[#29B2FE] flex items-center justify-center text-white text-xs shadow-xs">
        🕊
      </div>
    ),
  },

  // ==========================================
  // 15. FINANCE (Images 4, 5, 6)
  // ==========================================
  {
    id: 'paypal',
    name: 'PayPal',
    url: 'https://www.paypal.com',
    category: 'finance',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-[#003087] flex items-center justify-center text-white font-bold text-sm italic shadow-xs">
        P
      </div>
    ),
  },
  {
    id: 'xe',
    name: 'XE.com',
    url: 'https://www.xe.com',
    category: 'finance',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-[#002B49] flex items-center justify-center text-white font-bold text-[10px] shadow-xs">
        xe
      </div>
    ),
  },

  // ==========================================
  // 16. BOOKS (Images 3, 4, 5)
  // ==========================================
  {
    id: 'wattpad',
    name: 'Wattpad',
    url: 'https://www.wattpad.com',
    category: 'books',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-[#FF6122] flex items-center justify-center text-white font-black text-sm shadow-xs">
        W
      </div>
    ),
  },
  {
    id: 'goodreads',
    name: 'Goodreads',
    url: 'https://www.goodreads.com',
    category: 'books',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-[#F4F1EA] border border-neutral-300 flex items-center justify-center text-[#553B08] font-serif font-bold text-base shadow-xs">
        g
      </div>
    ),
  },
  {
    id: 'projectgutenberg',
    name: 'Project Gutenberg',
    url: 'https://www.gutenberg.org',
    category: 'books',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-[#CC0000] flex items-center justify-center text-white font-bold text-xs shadow-xs">
        G
      </div>
    ),
  },
  {
    id: 'googlebooks',
    name: 'Google Books',
    url: 'https://books.google.com',
    category: 'books',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-white border border-neutral-200 flex items-center justify-center text-xs shadow-xs">
        📖
      </div>
    ),
  },
  {
    id: 'manybooks',
    name: 'ManyBooks',
    url: 'https://manybooks.net',
    category: 'books',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-[#D32F2F] flex items-center justify-center text-white font-bold text-xs shadow-xs">
        M
      </div>
    ),
  },
  {
    id: 'bookrix',
    name: 'BookRix',
    url: 'https://www.bookrix.com',
    category: 'books',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-[#006699] flex items-center justify-center text-white font-bold text-[8px] shadow-xs">
        BookRix
      </div>
    ),
  },
  {
    id: 'smashwords',
    name: 'Smashwords',
    url: 'https://www.smashwords.com',
    category: 'books',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-white border border-neutral-200 flex items-center justify-center text-[#006699] text-xs shadow-xs">
        📚
      </div>
    ),
  },
  {
    id: 'openlibrary',
    name: 'Open Library',
    url: 'https://openlibrary.org',
    category: 'books',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-white border border-neutral-200 flex items-center justify-center text-xs shadow-xs">
        🏛
      </div>
    ),
  },
  {
    id: 'pdfdrive',
    name: 'Pdfdrive',
    url: 'https://www.pdfdrive.com',
    category: 'books',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-[#C62828] flex items-center justify-center text-white font-bold text-[7px] shadow-xs">
        PDFDRIVE
      </div>
    ),
  },

  // ==========================================
  // 17. TRAVEL (Images 3, 4, 7)
  // ==========================================
  {
    id: 'airbnb',
    name: 'Airbnb',
    url: 'https://www.airbnb.com',
    category: 'travel',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-[#FF5A5F] flex items-center justify-center text-white font-black text-sm shadow-xs">
        ▲
      </div>
    ),
  },
  {
    id: 'tripadvisor',
    name: 'Tripadvisor',
    url: 'https://www.tripadvisor.com',
    category: 'travel',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-[#00AF87] flex items-center justify-center text-white text-sm shadow-xs">
        🦉
      </div>
    ),
  },
  {
    id: 'jumiatravel',
    name: 'Jumia travel',
    url: 'https://travel.jumia.com',
    category: 'travel',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-[#0066CC] flex items-center justify-center text-white text-sm shadow-xs">
        🔔
      </div>
    ),
  },
  {
    id: 'hotelsng',
    name: 'Hotels',
    url: 'https://hotels.ng',
    category: 'travel',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-[#0088CC] flex items-center justify-center text-white font-bold text-[8px] shadow-xs">
        Hotels
      </div>
    ),
  },
  {
    id: 'travelstart',
    name: 'Travelstart',
    url: 'https://www.travelstart.com',
    category: 'travel',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-[#0099FF] flex items-center justify-center text-white font-black text-base shadow-xs">
        ◎
      </div>
    ),
  },

  // ==========================================
  // 18. FOOD (Images 3, 7, 8)
  // ==========================================
  {
    id: 'foodnetwork',
    name: 'The Food Network',
    url: 'https://www.foodnetwork.com',
    category: 'food',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-[#E31B23] flex items-center justify-center text-white font-bold text-[8px] shadow-xs">
        food
      </div>
    ),
  },
  {
    id: 'allrecipes',
    name: 'Allrecipes',
    url: 'https://www.allrecipes.com',
    category: 'food',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-[#F15D22] flex items-center justify-center text-white font-bold text-[7px] shadow-xs">
        allrecipes
      </div>
    ),
  },
  {
    id: 'delish',
    name: 'Delish',
    url: 'https://www.delish.com',
    category: 'food',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-[#007A87] flex items-center justify-center text-white font-serif font-bold text-[9px] shadow-xs">
        delish
      </div>
    ),
  },
  {
    id: 'bbcgoodfood',
    name: 'BBC Good Food',
    url: 'https://www.bbcgoodfood.com',
    category: 'food',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-[#BB1919] flex items-center justify-center text-white font-bold text-[9px] shadow-xs">
        gf
      </div>
    ),
  },
  {
    id: 'howtofeedaloon',
    name: 'How To Feed A Loon',
    url: 'https://howtofeedaloon.com',
    category: 'food',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-[#5E9CA0] flex items-center justify-center text-white font-bold text-xs shadow-xs">
        FL
      </div>
    ),
  },
  {
    id: 'cookpad',
    name: 'Cookpad',
    url: 'https://cookpad.com',
    category: 'food',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-[#FF6A00] flex items-center justify-center text-white text-sm shadow-xs">
        👨‍🍳
      </div>
    ),
  },

  // ==========================================
  // 19. FASHION (Images 7 & 8)
  // ==========================================
  {
    id: 'cosmopolitan',
    name: 'Cosmopolitan',
    url: 'https://www.cosmopolitan.com',
    category: 'fashion',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-black flex items-center justify-center text-[#EC008C] font-black text-base shadow-xs">
        C
      </div>
    ),
  },
  {
    id: 'pullandbear',
    name: 'Pull&Bear',
    url: 'https://www.pullandbear.com',
    category: 'fashion',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-black flex items-center justify-center text-white font-bold text-[9px] shadow-xs">
        P&B
      </div>
    ),
  },
  {
    id: 'elle',
    name: 'Elle',
    url: 'https://www.elle.com',
    category: 'fashion',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-black flex items-center justify-center text-white font-serif font-bold text-[9px] tracking-tight shadow-xs">
        ELLE
      </div>
    ),
  },
  {
    id: 'timeanddate',
    name: 'Time and Date',
    url: 'https://www.timeanddate.com',
    category: 'fashion',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-white border border-neutral-200 flex items-center justify-center text-sm shadow-xs">
        ⏳
      </div>
    ),
  },
  {
    id: 'vogue',
    name: 'Vogue',
    url: 'https://www.vogue.com',
    category: 'fashion',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-black flex items-center justify-center text-white font-serif font-black text-[8px] tracking-tight shadow-xs">
        VOGUE
      </div>
    ),
  },
  {
    id: 'harpersbazaar',
    name: 'Harper\'s Bazaar',
    url: 'https://www.harpersbazaar.com',
    category: 'fashion',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-black flex items-center justify-center text-white font-serif text-[7px] text-center shadow-xs">
        BAZAAR
      </div>
    ),
  },
  {
    id: 'gucci',
    name: 'Gucci',
    url: 'https://www.gucci.com',
    category: 'fashion',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-[#1C1C1C] flex items-center justify-center text-white font-serif text-[8px] tracking-widest shadow-xs">
        GUCCI
      </div>
    ),
  },
  {
    id: 'dior',
    name: 'Dior',
    url: 'https://www.dior.com',
    category: 'fashion',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-black flex items-center justify-center text-white font-serif text-[9px] italic shadow-xs">
        Dior
      </div>
    ),
  },
  {
    id: 'hermes',
    name: 'Hermes',
    url: 'https://www.hermes.com',
    category: 'fashion',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-black flex items-center justify-center text-white font-serif font-black text-sm shadow-xs">
        H
      </div>
    ),
  },
  {
    id: 'louisvuitton',
    name: 'Louis Vuitton',
    url: 'https://louisvuitton.com',
    category: 'fashion',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-white border border-neutral-300 flex items-center justify-center text-black font-serif font-black text-xs shadow-xs">
        LV
      </div>
    ),
  },
  {
    id: 'marieclaire',
    name: 'Marie Claire',
    url: 'https://www.marieclaire.com',
    category: 'fashion',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-black flex items-center justify-center text-white font-serif text-[7px] text-center leading-tight shadow-xs">
        marie claire
      </div>
    ),
  },

  // ==========================================
  // 20. HEALTH (Images 2 & 3)
  // ==========================================
  {
    id: 'healthline',
    name: 'Healthline',
    url: 'https://www.healthline.com',
    category: 'health',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-black flex items-center justify-center text-white font-bold text-base shadow-xs">
        h
      </div>
    ),
  },
  {
    id: 'thelancet',
    name: 'The Lancet',
    url: 'https://www.thelancet.com',
    category: 'health',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-[#184880] flex items-center justify-center text-white font-serif font-black text-lg shadow-xs">
        L
      </div>
    ),
  },
  {
    id: 'kidshealth',
    name: 'Kids Health',
    url: 'https://kidshealth.org',
    category: 'health',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-[#004B87] flex items-center justify-center text-white font-bold text-xs shadow-xs">
        KH
      </div>
    ),
  },
  {
    id: 'webmd',
    name: 'WebMD',
    url: 'https://www.webmd.com',
    category: 'health',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-white border border-neutral-200 flex items-center justify-center text-[#0057B8] font-bold text-[8px] shadow-xs">
        WebMD
      </div>
    ),
  },
  {
    id: 'drugs',
    name: 'Drugs',
    url: 'https://www.drugs.com',
    category: 'health',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-white border border-neutral-200 flex items-center justify-center shadow-xs">
        <span className="text-[#00A1E0] font-black text-xs">💊</span>
      </div>
    ),
  },
  {
    id: 'bodybuilding',
    name: 'Body Building',
    url: 'https://www.bodybuilding.com',
    category: 'health',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-[#0066CC] flex items-center justify-center text-white font-black italic text-base shadow-xs">
        B
      </div>
    ),
  },
  {
    id: 'tnation',
    name: 'T-Nation',
    url: 'https://www.t-nation.com',
    category: 'health',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-[#CC0000] flex items-center justify-center text-white font-black text-lg shadow-xs">
        T
      </div>
    ),
  },
  {
    id: 'mayoclinic',
    name: 'Mayo Clinic',
    url: 'https://www.mayoclinic.org',
    category: 'health',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-white border border-neutral-200 flex items-center justify-center text-[#003B71] text-xs shadow-xs">
        ⚕
      </div>
    ),
  },
  {
    id: 'who',
    name: 'WHO',
    url: 'https://www.who.int',
    category: 'health',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-white border border-neutral-200 flex items-center justify-center text-[#008DC9] text-sm shadow-xs">
        🌐
      </div>
    ),
  },

  // ==========================================
  // 21. PARENTING (Images 3 & 4)
  // ==========================================
  {
    id: 'cafemom',
    name: 'CafeMom',
    url: 'https://www.cafemom.com',
    category: 'parenting',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-black flex items-center justify-center text-white font-bold text-base shadow-xs">
        m
      </div>
    ),
  },
  {
    id: 'nameberry',
    name: 'Nameberry',
    url: 'https://nameberry.com',
    category: 'parenting',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-white border border-pink-200 flex items-center justify-center text-[#E91E63] font-serif font-black text-base shadow-xs">
        n
      </div>
    ),
  },
  {
    id: 'babycenter',
    name: 'Baby Center',
    url: 'https://www.babycenter.com',
    category: 'parenting',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-white border border-teal-200 flex items-center justify-center text-[#00A896] text-sm shadow-xs">
        🌱
      </div>
    ),
  },
  {
    id: 'babbel',
    name: 'Babbel',
    url: 'https://www.babbel.com',
    category: 'parenting',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-[#FF6600] flex items-center justify-center text-white font-bold text-xs shadow-xs">
        +B
      </div>
    ),
  },
  {
    id: 'scarymommy',
    name: 'Scary Mommy',
    url: 'https://www.scarymommy.com',
    category: 'parenting',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-black flex items-center justify-center text-white font-bold text-[7px] text-center leading-tight p-0.5 shadow-xs">
        Scary Mommy
      </div>
    ),
  },

  // ==========================================
  // 22. REFERENCE (Images 3 & 4)
  // ==========================================
  {
    id: 'wikipedia',
    name: 'Wikipedia',
    url: 'https://en.wikipedia.org',
    category: 'reference',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-white border border-neutral-300 flex items-center justify-center text-black font-serif font-black text-base shadow-xs">
        W
      </div>
    ),
  },
  {
    id: 'askubuntu',
    name: 'Ask Ubuntu',
    url: 'https://askubuntu.com',
    category: 'reference',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-[#E95420] flex items-center justify-center text-white font-bold text-xs shadow-xs">
        ask
      </div>
    ),
  },
  {
    id: 'wikihow',
    name: 'wikiHow',
    url: 'https://www.wikihow.com',
    category: 'reference',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-[#93B874] flex items-center justify-center text-white font-bold text-[8px] shadow-xs">
        wikiHow
      </div>
    ),
  },
  {
    id: 'similarweb',
    name: 'SimilarWeb',
    url: 'https://www.similarweb.com',
    category: 'reference',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-white border border-neutral-200 flex items-center justify-center text-[#1C51FD] text-sm shadow-xs">
        🔄
      </div>
    ),
  },
  {
    id: 'archiveorg',
    name: 'The Internet Archive',
    url: 'https://archive.org',
    category: 'reference',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-[#333333] flex items-center justify-center text-white text-sm shadow-xs">
        🏛
      </div>
    ),
  },
  {
    id: 'stackoverflow',
    name: 'SO',
    url: 'https://stackoverflow.com',
    category: 'reference',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-[#F48024] flex items-center justify-center text-white font-bold text-xs shadow-xs">
        ≡
      </div>
    ),
  },
  {
    id: 'blogspot',
    name: 'Blogspot',
    url: 'https://www.blogspot.com',
    category: 'reference',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-[#FF5722] flex items-center justify-center text-white font-bold text-base shadow-xs">
        B
      </div>
    ),
  },
  {
    id: 'quora',
    name: 'Quora',
    url: 'https://www.quora.com',
    category: 'reference',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-[#B92B27] flex items-center justify-center text-white font-serif font-black text-base shadow-xs">
        Q
      </div>
    ),
  },
  {
    id: 'medium_ref',
    name: 'Medium',
    url: 'https://medium.com',
    category: 'reference',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-[#242424] flex items-center justify-center text-white font-serif font-black text-sm shadow-xs">
        M
      </div>
    ),
  },
  {
    id: 'researchgate',
    name: 'Research Gate',
    url: 'https://www.researchgate.net',
    category: 'reference',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-[#00CCBB] flex items-center justify-center text-white font-bold text-xs shadow-xs">
        Rᴳ
      </div>
    ),
  },
  {
    id: 'ask_ref',
    name: 'Ask',
    url: 'https://www.ask.com',
    category: 'reference',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-[#CC0000] flex items-center justify-center text-white font-serif italic font-bold text-xs shadow-xs">
        Ask
      </div>
    ),
  },
  {
    id: 'worldometers',
    name: 'Worldometers',
    url: 'https://www.worldometers.info',
    category: 'reference',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-[#65A726] flex items-center justify-center text-white font-bold text-xs shadow-xs">
        W
      </div>
    ),
  },
  {
    id: 'sciencedirect',
    name: 'Science Direct',
    url: 'https://www.sciencedirect.com',
    category: 'reference',
    renderIcon: () => (
      <div className="w-9 h-9 rounded-full bg-white border border-neutral-200 flex items-center justify-center text-[#FF6C00] text-sm shadow-xs">
        🌳
      </div>
    ),
  },
];
