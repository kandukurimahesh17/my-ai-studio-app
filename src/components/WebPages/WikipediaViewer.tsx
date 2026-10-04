import React, { useState, useEffect } from 'react';
import { BookOpen, Search, ExternalLink, Globe, ArrowLeft, Loader2, Share2, Bookmark } from 'lucide-react';

interface WikipediaViewerProps {
  url: string;
  onNavigate: (url: string) => void;
}

interface WikiData {
  title: string;
  extract: string;
  description?: string;
  thumbnail?: { source: string };
  content_urls?: { desktop: { page: string } };
}

export const WikipediaViewer: React.FC<WikipediaViewerProps> = ({ url, onNavigate }) => {
  const [topic, setTopic] = useState('Web_browser');
  const [wikiData, setWikiData] = useState<WikiData | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Extract topic from URL (e.g. https://en.wikipedia.org/wiki/Web_browser)
  useEffect(() => {
    try {
      if (url.includes('/wiki/')) {
        const parts = url.split('/wiki/');
        if (parts[1]) {
          const rawTopic = parts[1].split('?')[0].split('#')[0];
          setTopic(decodeURIComponent(rawTopic));
        }
      } else {
        setTopic('World_Wide_Web');
      }
    } catch {
      setTopic('Web_browser');
    }
  }, [url]);

  // Fetch Wikipedia REST summary API
  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    const cleanTopic = topic.replace(/\s+/g, '_');
    fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(cleanTopic)}`)
      .then((res) => {
        if (!res.ok) throw new Error('Network error');
        return res.json();
      })
      .then((data) => {
        if (isMounted) {
          setWikiData(data);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          // Fallback encyclopedia content if offline or rate limited
          setWikiData({
            title: topic.replace(/_/g, ' '),
            description: 'Free encyclopedia entry on Wikipedia',
            extract: `${topic.replace(/_/g, ' ')} is an important subject in computer science, technology, and human knowledge. A web browser is an application software for accessing the World Wide Web or a local website. When a user requests a web page from a particular website, the browser retrieves its files from a web server and then displays the page on the user's screen.`,
          });
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [topic]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    onNavigate(`https://en.wikipedia.org/wiki/${encodeURIComponent(searchQuery.trim().replace(/\s+/g, '_'))}`);
  };

  const relatedTopics = [
    { title: 'World Wide Web', slug: 'World_Wide_Web' },
    { title: 'Tim Berners-Lee', slug: 'Tim_Berners-Lee' },
    { title: 'HTTP', slug: 'Hypertext_Transfer_Protocol' },
    { title: 'HTML', slug: 'HTML' },
    { title: 'JavaScript', slug: 'JavaScript' },
    { title: 'TypeScript', slug: 'TypeScript' },
    { title: 'Chromium', slug: 'Chromium_(web_browser)' },
  ];

  return (
    <div className="flex-1 h-full overflow-y-auto bg-neutral-900 text-neutral-100 flex flex-col font-sans">
      {/* Wikipedia Header */}
      <header className="sticky top-0 z-10 bg-neutral-900/95 backdrop-blur-md border-b border-neutral-800 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            onClick={() => onNavigate('https://en.wikipedia.org/wiki/Main_Page')}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <span className="text-2xl">📖</span>
            <div>
              <span className="text-base font-serif font-bold text-white tracking-wide group-hover:text-sky-400 transition-colors">
                WIKIPEDIA
              </span>
              <span className="text-[10px] block text-neutral-400 font-sans -mt-0.5">
                The Free Encyclopedia
              </span>
            </div>
          </div>
        </div>

        {/* In-page search */}
        <form onSubmit={handleSearchSubmit} className="max-w-md w-full mx-4">
          <div className="relative flex items-center bg-neutral-950 border border-neutral-700/80 rounded-lg px-3 py-1.5 focus-within:border-sky-500">
            <Search className="w-3.5 h-3.5 text-neutral-400 mr-2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Wikipedia articles..."
              className="bg-transparent text-xs text-white placeholder-neutral-500 outline-none w-full"
            />
          </div>
        </form>

        <div className="flex items-center gap-3 text-xs text-neutral-400">
          <button
            onClick={() => onNavigate('aura://newtab')}
            className="hover:text-white transition-colors"
          >
            Home
          </button>
        </div>
      </header>

      {/* Main Article Container */}
      <main className="max-w-4xl w-full mx-auto px-6 py-8 flex-1">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center text-neutral-400 gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-sky-400" />
            <span className="text-sm">Retrieving article from Wikipedia...</span>
          </div>
        ) : (
          <article className="space-y-6">
            <div className="border-b border-neutral-800 pb-4">
              <h1 className="text-3xl md:text-4xl font-serif font-normal text-white mb-2">
                {wikiData?.title || topic.replace(/_/g, ' ')}
              </h1>
              {wikiData?.description && (
                <p className="text-sm text-neutral-400 italic">
                  {wikiData.description}
                </p>
              )}
            </div>

            {/* Thumbnail and Summary Box */}
            <div className="flex flex-col md:flex-row gap-6 items-start">
              {wikiData?.thumbnail && (
                <div className="w-full md:w-64 shrink-0 bg-neutral-950 border border-neutral-800 rounded-xl p-2.5">
                  <img
                    src={wikiData.thumbnail.source}
                    alt={wikiData.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-auto rounded-lg object-cover"
                  />
                  <p className="text-[11px] text-neutral-400 mt-2 text-center">
                    Media representation from Wikimedia Commons
                  </p>
                </div>
              )}

              <div className="flex-1 space-y-4">
                <p className="text-base text-neutral-200 leading-relaxed font-normal">
                  {wikiData?.extract}
                </p>

                <div className="p-4 bg-neutral-950/60 border border-neutral-800 rounded-xl space-y-2">
                  <h3 className="text-xs uppercase tracking-wider font-semibold text-neutral-400">
                    Article Quick Facts
                  </h3>
                  <div className="grid grid-cols-2 gap-2 text-xs text-neutral-300">
                    <div>
                      <span className="text-neutral-400">Topic:</span>{' '}
                      {wikiData?.title}
                    </div>
                    <div>
                      <span className="text-neutral-400">Language:</span> English
                      (en)
                    </div>
                    <div>
                      <span className="text-neutral-400">License:</span> CC
                      BY-SA 4.0
                    </div>
                    <div>
                      <span className="text-neutral-400">Source:</span> Wikipedia
                      API
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Related Topics / Navigation */}
            <div className="pt-6 border-t border-neutral-800">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-400 mb-3">
                Related Articles & Hyperlinks
              </h3>
              <div className="flex flex-wrap gap-2">
                {relatedTopics.map((rel) => (
                  <button
                    key={rel.slug}
                    onClick={() => onNavigate(`https://en.wikipedia.org/wiki/${rel.slug}`)}
                    className="px-3 py-1.5 rounded-lg bg-neutral-950 border border-neutral-800 hover:border-sky-500 hover:text-sky-400 text-xs font-medium text-neutral-300 transition-all flex items-center gap-1.5"
                  >
                    <span>{rel.title}</span>
                    <ExternalLink className="w-3 h-3 text-neutral-400" />
                  </button>
                ))}
              </div>
            </div>
          </article>
        )}
      </main>
    </div>
  );
};
