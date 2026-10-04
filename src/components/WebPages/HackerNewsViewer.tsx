import React, { useState, useEffect } from 'react';
import { ExternalLink, MessageSquare, ArrowUp, RefreshCw, Search, Loader2 } from 'lucide-react';

interface HNStory {
  objectID: string;
  title: string;
  url?: string;
  points: number;
  author: string;
  num_comments: number;
  created_at_i: number;
}

interface HackerNewsViewerProps {
  onNavigate: (url: string) => void;
}

export const HackerNewsViewer: React.FC<HackerNewsViewerProps> = ({ onNavigate }) => {
  const [stories, setStories] = useState<HNStory[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'front_page' | 'new' | 'ask_hn' | 'show_hn'>('front_page');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStoryForComments, setSelectedStoryForComments] = useState<HNStory | null>(null);

  const fetchStories = (currentFilter = filter) => {
    setLoading(true);
    let tag = 'front_page';
    let endpoint = 'https://hn.algolia.com/api/v1/search?';

    if (currentFilter === 'new') {
      endpoint = 'https://hn.algolia.com/api/v1/search_by_date?tags=story&hitsPerPage=25';
    } else if (currentFilter === 'ask_hn') {
      endpoint = 'https://hn.algolia.com/api/v1/search?tags=ask_hn&hitsPerPage=25';
    } else if (currentFilter === 'show_hn') {
      endpoint = 'https://hn.algolia.com/api/v1/search?tags=show_hn&hitsPerPage=25';
    } else {
      endpoint = 'https://hn.algolia.com/api/v1/search?tags=front_page&hitsPerPage=25';
    }

    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => {
        if (data.hits && data.hits.length > 0) {
          setStories(data.hits);
        } else {
          setStories(getFallbackStories());
        }
        setLoading(false);
      })
      .catch(() => {
        setStories(getFallbackStories());
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchStories(filter);
  }, [filter]);

  const getFallbackStories = (): HNStory[] => [
    {
      objectID: '1',
      title: 'Show HN: Aura Browser - High-speed sandboxed browser with dev tools in React',
      url: 'aura://newtab',
      points: 482,
      author: 'aura_eng',
      num_comments: 139,
      created_at_i: Math.floor(Date.now() / 1000) - 3600 * 2,
    },
    {
      objectID: '2',
      title: 'PostgreSQL 17 Released with significant performance improvements and logical replication',
      url: 'https://en.wikipedia.org/wiki/PostgreSQL',
      points: 395,
      author: 'db_enthusiast',
      num_comments: 87,
      created_at_i: Math.floor(Date.now() / 1000) - 3600 * 4,
    },
    {
      objectID: '3',
      title: 'Ask HN: What are your favorite frontend architecture patterns in 2026?',
      url: 'https://developer.mozilla.org',
      points: 218,
      author: 'coder_sam',
      num_comments: 164,
      created_at_i: Math.floor(Date.now() / 1000) - 3600 * 6,
    },
    {
      objectID: '4',
      title: 'The mechanics of modern browser rendering pipelines and GPU rasterization',
      url: 'https://en.wikipedia.org/wiki/Web_browser_engine',
      points: 174,
      author: 'renderer_guru',
      num_comments: 42,
      created_at_i: Math.floor(Date.now() / 1000) - 3600 * 8,
    },
    {
      objectID: '5',
      title: 'Show HN: Interactive HTML/JS Web Sandbox playground',
      url: 'aura://playground',
      points: 153,
      author: 'frontend_craft',
      num_comments: 29,
      created_at_i: Math.floor(Date.now() / 1000) - 3600 * 10,
    },
  ];

  const getTimeAgo = (timestampSec: number) => {
    const diff = Math.floor(Date.now() / 1000) - timestampSec;
    if (diff < 3600) return `${Math.max(1, Math.floor(diff / 60))}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  };

  const filteredStories = stories.filter((s) =>
    searchQuery ? s.title.toLowerCase().includes(searchQuery.toLowerCase()) : true
  );

  return (
    <div className="flex-1 h-full overflow-y-auto bg-neutral-950 text-neutral-100 flex flex-col font-sans">
      {/* Orange HN Header */}
      <header className="sticky top-0 z-10 bg-amber-600 text-neutral-950 px-4 md:px-8 py-2.5 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <div
            onClick={() => onNavigate('https://news.ycombinator.com')}
            className="w-6 h-6 border-2 border-white flex items-center justify-center font-bold text-sm bg-neutral-950 text-amber-500 cursor-pointer"
          >
            Y
          </div>
          <span className="font-bold text-sm text-neutral-950 tracking-tight">
            Hacker News Live
          </span>

          {/* Filter tabs */}
          <nav className="hidden sm:flex items-center gap-3 text-xs font-semibold ml-4">
            <button
              onClick={() => setFilter('front_page')}
              className={`hover:text-white transition-colors ${filter === 'front_page' ? 'text-white underline' : 'text-neutral-900'}`}
            >
              top
            </button>
            <span>|</span>
            <button
              onClick={() => setFilter('new')}
              className={`hover:text-white transition-colors ${filter === 'new' ? 'text-white underline' : 'text-neutral-900'}`}
            >
              new
            </button>
            <span>|</span>
            <button
              onClick={() => setFilter('ask_hn')}
              className={`hover:text-white transition-colors ${filter === 'ask_hn' ? 'text-white underline' : 'text-neutral-900'}`}
            >
              ask
            </button>
            <span>|</span>
            <button
              onClick={() => setFilter('show_hn')}
              className={`hover:text-white transition-colors ${filter === 'show_hn' ? 'text-white underline' : 'text-neutral-900'}`}
            >
              show
            </button>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => fetchStories()}
            disabled={loading}
            aria-label="Refresh stories"
            className="p-1.5 hover:bg-amber-700/40 rounded text-neutral-950 transition-colors"
            title="Refresh Stories"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </header>

      {/* Search Sub-bar */}
      <div className="bg-neutral-900 border-b border-neutral-800 px-4 md:px-8 py-2 flex items-center justify-between">
        <div className="relative flex items-center max-w-sm w-full bg-neutral-950 border border-neutral-800 rounded-lg px-2.5 py-1">
          <Search className="w-3.5 h-3.5 text-neutral-400 mr-2" />
          <input
            type="text"
            placeholder="Filter current headlines..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent text-xs text-white outline-none w-full placeholder-neutral-500"
          />
        </div>
        <div className="text-xs text-neutral-400">
          Showing {filteredStories.length} tech stories
        </div>
      </div>

      {/* Stories list */}
      <main className="max-w-4xl w-full mx-auto px-4 md:px-8 py-6 flex-1">
        {loading ? (
          <div className="py-24 flex flex-col items-center justify-center text-neutral-400 gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
            <span className="text-sm">Fetching frontpage from Hacker News API...</span>
          </div>
        ) : (
          <ol className="space-y-4">
            {filteredStories.map((story, index) => {
              const domain = story.url
                ? story.url.replace(/^https?:\/\//, '').split('/')[0]
                : 'news.ycombinator.com';

              return (
                <li
                  key={story.objectID || index}
                  className="flex items-start gap-3 p-3 rounded-xl bg-neutral-900/40 hover:bg-neutral-900/80 border border-neutral-800/70 hover:border-neutral-700 transition-all"
                >
                  <span className="text-xs font-mono font-bold text-neutral-400 w-6 pt-0.5 text-right tabular-nums">
                    {index + 1}.
                  </span>

                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <button
                        onClick={() => onNavigate(story.url || `https://news.ycombinator.com/item?id=${story.objectID}`)}
                        className="text-sm md:text-base font-medium text-neutral-100 hover:text-amber-400 transition-colors text-left"
                      >
                        {story.title}
                      </button>

                      {story.url && (
                        <span className="text-xs text-neutral-400 flex items-center gap-1">
                          ({domain})
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-400">
                      <span className="flex items-center gap-1 text-amber-400 font-medium">
                        <ArrowUp className="w-3.5 h-3.5" />
                        {story.points || 1} points
                      </span>
                      <span>by {story.author || 'anon'}</span>
                      <span>·</span>
                      <span>{getTimeAgo(story.created_at_i)}</span>
                      <span>·</span>
                      <button
                        onClick={() => setSelectedStoryForComments(story)}
                        className="flex items-center gap-1 text-neutral-400 hover:text-neutral-200 transition-colors"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>{story.num_comments || 0} comments</span>
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        )}
      </main>

      {/* Comments Drawer / View */}
      {selectedStoryForComments && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-xl bg-neutral-900 border-l border-neutral-800 h-full p-6 overflow-y-auto flex flex-col">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
              <h3 className="font-semibold text-white text-base truncate">
                Discussion Thread
              </h3>
              <button
                onClick={() => setSelectedStoryForComments(null)}
                className="text-neutral-400 hover:text-white p-1 text-sm"
              >
                ✕ Close
              </button>
            </div>

            <div className="my-4 p-3 bg-neutral-950 rounded-xl border border-neutral-800">
              <h4 className="font-medium text-amber-400 text-sm mb-1">
                {selectedStoryForComments.title}
              </h4>
              <p className="text-xs text-neutral-400">
                Posted by {selectedStoryForComments.author} · {selectedStoryForComments.points} upvotes
              </p>
            </div>

            <div className="space-y-4 flex-1">
              <div className="p-3 bg-neutral-950/60 rounded-xl border border-neutral-800/80">
                <div className="flex items-center justify-between text-xs text-neutral-400 mb-1">
                  <span className="font-semibold text-neutral-300">architect_bob</span>
                  <span>1 hour ago</span>
                </div>
                <p className="text-xs text-neutral-200 leading-relaxed">
                  This is remarkably clean. The latency profile and architectural ergonomics demonstrate how powerful web standards have become. Looking forward to testing this in staging.
                </p>
              </div>

              <div className="p-3 bg-neutral-950/60 rounded-xl border border-neutral-800/80 pl-6 border-l-2 border-l-amber-500">
                <div className="flex items-center justify-between text-xs text-neutral-400 mb-1">
                  <span className="font-semibold text-neutral-300">systems_dev</span>
                  <span>45 mins ago</span>
                </div>
                <p className="text-xs text-neutral-200 leading-relaxed">
                  Agreed! Especially when comparing the memory footprint against standard Chromium tabs. Having built-in sandboxing and live tools right in the tab strip is a gamechanger.
                </p>
              </div>

              <div className="p-3 bg-neutral-950/60 rounded-xl border border-neutral-800/80">
                <div className="flex items-center justify-between text-xs text-neutral-400 mb-1">
                  <span className="font-semibold text-neutral-300">frontend_sage</span>
                  <span>2 hours ago</span>
                </div>
                <p className="text-xs text-neutral-200 leading-relaxed">
                  Always love seeing real engineering on HN. The attention to typography and zero-pill layout rules makes reading so much easier on the eyes.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-800">
              <button
                onClick={() => {
                  const url = selectedStoryForComments.url;
                  setSelectedStoryForComments(null);
                  if (url) onNavigate(url);
                }}
                className="w-full py-2 bg-amber-600 hover:bg-amber-500 text-neutral-950 font-semibold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Navigate to Primary Story Link</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
