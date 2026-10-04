import { SearchEngineType } from '../types/browser';
import { SEARCH_ENGINES } from './browserConstants';

export function normalizeBrowserUrl(input: string, defaultEngine: SearchEngineType = 'google'): string {
  const trimmed = input.trim();
  if (!trimmed) {
    return 'lemon://newtab';
  }

  // Handle internal lemon:// and legacy aura:// protocols
  if (trimmed.startsWith('lemon://')) {
    return trimmed;
  }
  if (trimmed.startsWith('aura://')) {
    return trimmed.replace('aura://', 'lemon://');
  }

  // Quick shortcuts (e.g., "about:blank", "settings", "history", "notes", "newtab")
  if (trimmed === 'about:blank' || trimmed === 'newtab') {
    return 'lemon://newtab';
  }
  if (['history', 'bookmarks', 'downloads', 'settings', 'devtools', 'playground', 'notes', 'canvas', 'retro'].includes(trimmed.toLowerCase())) {
    return `lemon://${trimmed.toLowerCase()}`;
  }

  // Check if it's already an HTTP or HTTPS or data URL
  if (/^https?:\/\//i.test(trimmed) || /^data:/i.test(trimmed)) {
    return trimmed;
  }

  // Detect domain patterns like "example.com", "sub.domain.org/path", "localhost:3000"
  const domainPattern = /^([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/.*)?$/;
  const isLocalhost = /^localhost(:\d+)?(\/.*)?$/i.test(trimmed);

  if (domainPattern.test(trimmed) || isLocalhost) {
    return `https://${trimmed}`;
  }

  // Otherwise treat as a search query with chosen search engine
  const engine = SEARCH_ENGINES[defaultEngine] || SEARCH_ENGINES.google;
  return engine.searchUrl(trimmed);
}

export function getDisplayUrl(url: string): string {
  if (url.startsWith('lemon://') || url.startsWith('aura://')) {
    return url.replace('aura://', 'lemon://');
  }
  try {
    const parsed = new URL(url);
    if (parsed.searchParams.get('q')) {
      return parsed.searchParams.get('q') || url;
    }
    return parsed.hostname + (parsed.pathname === '/' ? '' : parsed.pathname);
  } catch {
    return url;
  }
}

export function getFaviconForUrl(url: string): string {
  if (url.startsWith('lemon://newtab') || url.startsWith('aura://newtab')) return '🍋';
  if (url.startsWith('lemon://history') || url.startsWith('aura://history')) return '⏱️';
  if (url.startsWith('lemon://bookmarks') || url.startsWith('aura://bookmarks')) return '⭐';
  if (url.startsWith('lemon://downloads') || url.startsWith('aura://downloads')) return '📥';
  if (url.startsWith('lemon://settings') || url.startsWith('aura://settings')) return '⚙️';
  if (url.startsWith('lemon://devtools') || url.startsWith('aura://devtools')) return '🛠️';
  if (url.startsWith('lemon://playground') || url.startsWith('aura://playground')) return '⚡';
  if (url.startsWith('lemon://notes') || url.startsWith('aura://notes')) return '📝';
  if (url.startsWith('lemon://canvas') || url.startsWith('aura://canvas')) return '🎨';
  if (url.startsWith('lemon://retro') || url.startsWith('aura://retro')) return '💾';

  if (url.includes('google.com')) return '🔍';
  if (url.includes('duckduckgo.com')) return '🦆';
  if (url.includes('ycombinator.com') || url.includes('news.ycombinator')) return '🟧';
  if (url.includes('wikipedia.org')) return '📖';
  if (url.includes('github.com')) return '🐙';
  if (url.includes('reddit.com')) return '🤖';
  if (url.includes('developer.mozilla.org') || url.includes('mdn')) return '🦖';

  return '🌐';
}

export function getTitleForUrl(url: string): string {
  if (url === 'lemon://newtab' || url === 'aura://newtab') return 'New Tab';
  if (url === 'lemon://history' || url === 'aura://history') return 'History';
  if (url === 'lemon://bookmarks' || url === 'aura://bookmarks') return 'Bookmarks';
  if (url === 'lemon://downloads' || url === 'aura://downloads') return 'Downloads';
  if (url === 'lemon://settings' || url === 'aura://settings') return 'Settings';
  if (url === 'lemon://devtools' || url === 'aura://devtools') return 'Developer Tools';
  if (url === 'lemon://playground' || url === 'aura://playground') return 'Code Playground';
  if (url === 'lemon://notes' || url === 'aura://notes') return 'Research Scratchpad';
  if (url === 'lemon://canvas' || url === 'aura://canvas') return 'Whiteboard Canvas';
  if (url === 'lemon://retro' || url === 'aura://retro') return '1995 Web Experience';

  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes('google.com')) {
      const q = parsed.searchParams.get('q');
      return q ? `${q} - Google Search` : 'Google';
    }
    if (parsed.hostname.includes('ycombinator.com')) return 'Hacker News';
    if (parsed.hostname.includes('wikipedia.org')) {
      const pathParts = parsed.pathname.split('/');
      const title = pathParts[pathParts.length - 1];
      return title ? decodeURIComponent(title).replace(/_/g, ' ') : 'Wikipedia';
    }
    if (parsed.hostname.includes('github.com')) return 'GitHub';
    if (parsed.hostname.includes('reddit.com')) return 'Reddit';
    return parsed.hostname;
  } catch {
    return url;
  }
}
