import { Bookmark, Extension, SearchEngineType } from '../types/browser';

export interface SearchEngineConfig {
  id: SearchEngineType;
  name: string;
  icon: string;
  searchUrl: (query: string) => string;
}

export const SEARCH_ENGINES: Record<SearchEngineType, SearchEngineConfig> = {
  google: {
    id: 'google',
    name: 'Google',
    icon: '🔍',
    searchUrl: (q) => `https://www.google.com/search?q=${encodeURIComponent(q)}`,
  },
  bing: {
    id: 'bing',
    name: 'Bing',
    icon: '🌐',
    searchUrl: (q) => `https://www.bing.com/search?q=${encodeURIComponent(q)}`,
  },
  yahoo: {
    id: 'yahoo',
    name: 'Yahoo',
    icon: '🟣',
    searchUrl: (q) => `https://search.yahoo.com/search?p=${encodeURIComponent(q)}`,
  },
  duckduckgo: {
    id: 'duckduckgo',
    name: 'DuckDuckGo',
    icon: '🦆',
    searchUrl: (q) => `https://duckduckgo.com/?q=${encodeURIComponent(q)}`,
  },
  yandex: {
    id: 'yandex',
    name: 'Yandex',
    icon: '🔴',
    searchUrl: (q) => `https://yandex.com/search/?text=${encodeURIComponent(q)}`,
  },
  aol: {
    id: 'aol',
    name: 'Aol',
    icon: '⚫',
    searchUrl: (q) => `https://search.aol.com/aol/search?q=${encodeURIComponent(q)}`,
  },
  wikipedia: {
    id: 'wikipedia',
    name: 'Wikipedia',
    icon: '📚',
    searchUrl: (q) => `https://en.wikipedia.org/wiki/Special:Search?search=${encodeURIComponent(q)}`,
  },
  github: {
    id: 'github',
    name: 'GitHub',
    icon: '🐙',
    searchUrl: (q) => `https://github.com/search?q=${encodeURIComponent(q)}`,
  },
};

export const DEFAULT_BOOKMARKS: Bookmark[] = [
  {
    id: 'bm-1',
    title: 'Hacker News',
    url: 'https://news.ycombinator.com',
    favicon: '🟧',
    folder: 'Favorites',
    createdAt: Date.now() - 500000,
  },
  {
    id: 'bm-2',
    title: 'Wikipedia',
    url: 'https://en.wikipedia.org',
    favicon: '📖',
    folder: 'Favorites',
    createdAt: Date.now() - 400000,
  },
  {
    id: 'bm-3',
    title: 'Code Playground',
    url: 'lemon://playground',
    favicon: '⚡',
    folder: 'Dev Tools',
    createdAt: Date.now() - 300000,
  },
  {
    id: 'bm-4',
    title: 'MDN Web Docs',
    url: 'https://developer.mozilla.org',
    favicon: '🦖',
    folder: 'Dev Tools',
    createdAt: Date.now() - 200000,
  },
  {
    id: 'bm-5',
    title: 'Research Notes',
    url: 'lemon://notes',
    favicon: '📝',
    folder: 'Favorites',
    createdAt: Date.now() - 100000,
  },
  {
    id: 'bm-6',
    title: 'Web Canvas / Paint',
    url: 'lemon://canvas',
    favicon: '🎨',
    folder: 'Creative',
    createdAt: Date.now() - 50000,
  },
  {
    id: 'bm-7',
    title: '90s Retro Web',
    url: 'lemon://retro',
    favicon: '💾',
    folder: 'Fun',
    createdAt: Date.now() - 20000,
  },
];

export const SPEED_DIAL_ITEMS = [
  {
    title: 'Google Search',
    url: 'https://www.google.com',
    icon: '🔍',
    category: 'Search',
    color: 'from-amber-400 to-yellow-600',
  },
  {
    title: 'Hacker News',
    url: 'https://news.ycombinator.com',
    icon: 'Y',
    category: 'Tech News',
    color: 'from-orange-500 to-amber-600',
  },
  {
    title: 'Wikipedia',
    url: 'https://en.wikipedia.org',
    icon: 'W',
    category: 'Knowledge',
    color: 'from-neutral-700 to-neutral-800',
  },
  {
    title: 'Code Playground',
    url: 'lemon://playground',
    icon: '⚡',
    category: 'Development',
    color: 'from-yellow-500 to-amber-600',
  },
  {
    title: 'MDN Dev Docs',
    url: 'https://developer.mozilla.org',
    icon: 'M',
    category: 'Documentation',
    color: 'from-sky-500 to-cyan-600',
  },
  {
    title: 'Web Whiteboard',
    url: 'lemon://canvas',
    icon: '🎨',
    category: 'Creative',
    color: 'from-emerald-500 to-teal-600',
  },
  {
    title: 'Scratchpad Notes',
    url: 'lemon://notes',
    icon: '📝',
    category: 'Productivity',
    color: 'from-amber-500 to-yellow-600',
  },
  {
    title: '1995 Web Time Machine',
    url: 'lemon://retro',
    icon: '💾',
    category: 'Nostalgia',
    color: 'from-fuchsia-600 to-pink-700',
  },
];

export const DEFAULT_EXTENSIONS: Extension[] = [
  {
    id: 'adblock-shield',
    name: 'Lemon Shield AdBlock',
    description: 'Blocks intrusive banner ads, trackers, and malicious scripts.',
    icon: 'Shield',
    enabled: true,
    badge: '18 blocked',
    actionType: 'adblock',
  },
  {
    id: 'dark-reader',
    name: 'Midnight Mode',
    description: 'Invert bright websites into eye-care dark mode.',
    icon: 'Moon',
    enabled: false,
    badge: 'Off',
    actionType: 'darkreader',
  },
  {
    id: 'passwords-vault',
    name: 'Lemon KeyVault',
    description: 'Simulated password manager with strong password generator.',
    icon: 'KeyRound',
    enabled: true,
    badge: 'Active',
    actionType: 'passwords',
  },
  {
    id: 'custom-css',
    name: 'User Stylesheet',
    description: 'Inject custom CSS / styling into any web page.',
    icon: 'Code2',
    enabled: false,
    badge: 'Custom',
    actionType: 'customcss',
  },
];

export const WALLPAPERS = [
  {
    id: 'citrus-zest',
    name: 'Zesty Citrus',
    gradient: 'radial-gradient(ellipse at top left, #292004 0%, #09090b 60%, #171202 100%)',
  },
  {
    id: 'aurora',
    name: 'Northern Aurora',
    gradient: 'radial-gradient(ellipse at top left, #1e1b4b 0%, #09090b 60%, #022c22 100%)',
  },
  {
    id: 'deep-space',
    name: 'Deep Obsidian',
    gradient: 'radial-gradient(circle at center, #18181b 0%, #09090b 100%)',
  },
  {
    id: 'cyber-dusk',
    name: 'Cyber Dusk',
    gradient: 'linear-gradient(135deg, #18092a 0%, #0b0f19 50%, #051622 100%)',
  },
  {
    id: 'studio-slate',
    name: 'Studio Slate',
    gradient: 'linear-gradient(145deg, #1c1917 0%, #0c0a09 100%)',
  },
];
