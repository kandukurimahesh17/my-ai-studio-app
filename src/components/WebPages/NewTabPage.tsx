import React, { useState, useEffect } from 'react';
import { Search, Globe, Sparkles, Clock, Compass, Plus, ExternalLink } from 'lucide-react';
import { SPEED_DIAL_ITEMS, WALLPAPERS, SEARCH_ENGINES } from '../../utils/browserConstants';
import { SearchEngineType } from '../../types/browser';

interface NewTabPageProps {
  onNavigate: (url: string) => void;
  defaultEngine: SearchEngineType;
  onSelectEngine: (engine: SearchEngineType) => void;
  selectedWallpaper: string;
  onSelectWallpaper: (id: string) => void;
}

export const NewTabPage: React.FC<NewTabPageProps> = ({
  onNavigate,
  defaultEngine,
  onSelectEngine,
  selectedWallpaper,
  onSelectWallpaper,
}) => {
  const [query, setQuery] = useState('');
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const [customSites, setCustomSites] = useState<Array<{ title: string; url: string; icon: string }>>([]);
  const [showAddSite, setShowAddSite] = useState(false);
  const [newSiteTitle, setNewSiteTitle] = useState('');
  const [newSiteUrl, setNewSiteUrl] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      setDate(now.toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    onNavigate(query.trim());
  };

  const handleAddCustomSite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSiteTitle || !newSiteUrl) return;
    let url = newSiteUrl;
    if (!url.startsWith('http') && !url.startsWith('aura://')) {
      url = 'https://' + url;
    }
    setCustomSites((prev) => [...prev, { title: newSiteTitle, url, icon: '🔗' }]);
    setNewSiteTitle('');
    setNewSiteUrl('');
    setShowAddSite(false);
  };

  const currentWp = WALLPAPERS.find((w) => w.id === selectedWallpaper) || WALLPAPERS[0];

  return (
    <div
      className="relative flex-1 h-full overflow-y-auto px-6 py-12 flex flex-col items-center justify-between text-neutral-100 transition-all duration-300"
      style={{ background: currentWp.gradient }}
    >
      {/* Top right theme & wallpaper selector */}
      <div className="absolute top-6 right-8 flex items-center gap-2 bg-neutral-900/60 backdrop-blur-md border border-neutral-800/80 px-3 py-1.5 rounded-full text-xs text-neutral-300">
        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
        <span className="text-neutral-400">Background:</span>
        <select
          value={selectedWallpaper}
          onChange={(e) => onSelectWallpaper(e.target.value)}
          aria-label="Select background wallpaper"
          className="bg-transparent text-neutral-200 outline-none cursor-pointer font-medium"
        >
          {WALLPAPERS.map((w) => (
            <option key={w.id} value={w.id} className="bg-neutral-900 text-neutral-200">
              {w.name}
            </option>
          ))}
        </select>
      </div>

      {/* Main Center Content */}
      <div className="w-full max-w-4xl flex flex-col items-center my-auto">
        {/* Clock & Greeting */}
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-6xl font-semibold tracking-tight text-white mb-2 tabular-nums">
            {time || '12:00'}
          </h1>
          <p className="text-sm md:text-base text-neutral-400 font-normal">
            {date || 'Today'}
          </p>
        </div>

        {/* Central Search Bar */}
        <form onSubmit={handleSearchSubmit} className="w-full max-w-2xl mb-12">
          <div className="relative flex items-center bg-neutral-900/80 backdrop-blur-xl border border-neutral-700/60 hover:border-neutral-500/80 focus-within:border-sky-500/80 focus-within:ring-2 focus-within:ring-sky-500/20 rounded-2xl shadow-2xl transition-all p-1.5">
            {/* Search Engine Switcher */}
            <div className="flex items-center pl-3 pr-2 py-1 text-sm border-r border-neutral-800 text-neutral-300 gap-1.5">
              <span>{SEARCH_ENGINES[defaultEngine]?.icon}</span>
              <select
                value={defaultEngine}
                onChange={(e) => onSelectEngine(e.target.value as SearchEngineType)}
                aria-label="Select default search engine"
                className="bg-transparent text-xs text-neutral-300 outline-none cursor-pointer font-medium"
              >
                {Object.values(SEARCH_ENGINES).map((eng) => (
                  <option key={eng.id} value={eng.id} className="bg-neutral-900 text-neutral-200">
                    {eng.name}
                  </option>
                ))}
              </select>
            </div>

            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`Search with ${SEARCH_ENGINES[defaultEngine]?.name} or type a web address...`}
              className="flex-1 bg-transparent px-4 py-2.5 text-sm md:text-base text-white placeholder-neutral-500 outline-none font-normal"
              autoFocus
            />

            <button
              type="submit"
              className="bg-amber-500 hover:bg-amber-400 active:scale-95 text-neutral-950 px-4 py-2 rounded-xl text-sm font-semibold transition-all shadow-sm flex items-center gap-1.5"
            >
              <Search className="w-4 h-4" />
              <span>Search</span>
            </button>
          </div>
        </form>

        {/* Speed Dial Grid */}
        <div className="w-full max-w-3xl">
          <div className="flex items-center justify-between mb-4 px-1">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-400">
              <Compass className="w-3.5 h-3.5 text-amber-400" />
              <span>Speed Dial & Quick Access</span>
            </div>
            <button
              onClick={() => setShowAddSite(!showAddSite)}
              className="text-xs text-neutral-400 hover:text-neutral-200 flex items-center gap-1 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Shortcut</span>
            </button>
          </div>

          {/* Add custom site panel */}
          {showAddSite && (
            <form
              onSubmit={handleAddCustomSite}
              className="mb-4 p-4 bg-neutral-900/90 border border-neutral-800 rounded-xl flex flex-wrap gap-2 items-center"
            >
              <input
                type="text"
                placeholder="Shortcut Name (e.g. GitHub)"
                value={newSiteTitle}
                onChange={(e) => setNewSiteTitle(e.target.value)}
                className="flex-1 min-w-[140px] bg-neutral-950 border border-neutral-800 px-3 py-1.5 text-xs rounded-lg text-white outline-none focus:border-amber-500"
                required
              />
              <input
                type="text"
                placeholder="URL (e.g. github.com)"
                value={newSiteUrl}
                onChange={(e) => setNewSiteUrl(e.target.value)}
                className="flex-1 min-w-[200px] bg-neutral-950 border border-neutral-800 px-3 py-1.5 text-xs rounded-lg text-white outline-none focus:border-amber-500"
                required
              />
              <button
                type="submit"
                className="bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs px-3 py-1.5 rounded-lg font-semibold"
              >
                Add
              </button>
              <button
                type="button"
                onClick={() => setShowAddSite(false)}
                className="text-neutral-400 hover:text-white text-xs px-2 py-1.5"
              >
                Cancel
              </button>
            </form>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[...SPEED_DIAL_ITEMS, ...customSites].map((item, idx) => (
              <button
                key={idx}
                onClick={() => onNavigate(item.url)}
                className="group flex flex-col items-center justify-center p-3.5 rounded-xl bg-neutral-900/50 hover:bg-neutral-800/80 border border-neutral-800/60 hover:border-neutral-700/80 backdrop-blur-sm transition-all duration-200 text-center"
              >
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center text-lg font-bold text-white mb-2 shadow-inner group-hover:scale-105 transition-transform bg-gradient-to-br ${
                    'color' in item ? (item as any).color : 'from-neutral-700 to-neutral-800'
                  }`}
                >
                  {item.icon}
                </div>
                <span className="text-xs font-medium text-neutral-200 group-hover:text-white truncate max-w-[120px]">
                  {item.title}
                </span>
                {'category' in item && (
                  <span className="text-[10px] text-neutral-400 truncate max-w-[120px] mt-0.5">
                    {(item as any).category}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Quick Launchpad Suggestions */}
        <div className="w-full max-w-3xl mt-10 pt-6 border-t border-neutral-800/60 flex flex-wrap items-center justify-between gap-4 text-xs text-neutral-400">
          <div className="flex items-center gap-4">
            <span className="text-neutral-500">Built-in Apps:</span>
            <button
              onClick={() => onNavigate('lemon://playground')}
              className="hover:text-amber-400 transition-colors"
            >
              Code Playground
            </button>
            <span className="text-neutral-700">/</span>
            <button
              onClick={() => onNavigate('lemon://notes')}
              className="hover:text-amber-400 transition-colors"
            >
              Research Scratchpad
            </button>
            <span className="text-neutral-700">/</span>
            <button
              onClick={() => onNavigate('lemon://canvas')}
              className="hover:text-amber-400 transition-colors"
            >
              Web Whiteboard
            </button>
            <span className="text-neutral-700">/</span>
            <button
              onClick={() => onNavigate('lemon://retro')}
              className="hover:text-amber-400 transition-colors"
            >
              1995 Web
            </button>
          </div>
          <div className="flex items-center gap-2 text-neutral-400">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>Lemon Engine v2.4</span>
          </div>
        </div>
      </div>

      {/* Clean Footer */}
      <footer className="w-full max-w-4xl text-center text-xs text-neutral-400 pt-8">
        <span>Lemon Browser</span>
        <span className="mx-2">·</span>
        <span>Fast, Private, Sandboxed Browsing</span>
        <span className="mx-2">·</span>
        <span>Keyboard: Press Ctrl+L to focus address bar</span>
      </footer>
    </div>
  );
};
