import React, { useState, useEffect } from 'react';
import { ArrowUp, MessageSquare, ExternalLink, RefreshCw, Loader2 } from 'lucide-react';

interface RedditPost {
  id: string;
  title: string;
  author: string;
  score: number;
  num_comments: number;
  url: string;
  permalink: string;
  selftext?: string;
  created_utc: number;
}

interface RedditViewerProps {
  onNavigate: (url: string) => void;
}

export const RedditViewer: React.FC<RedditViewerProps> = ({ onNavigate }) => {
  const [subreddit, setSubreddit] = useState('technology');
  const [posts, setPosts] = useState<RedditPost[]>([]);
  const [loading, setLoading] = useState(true);

  const subreddits = ['technology', 'webdev', 'programming', 'science'];

  const fetchRedditPosts = (sub: string) => {
    setLoading(true);
    fetch(`https://www.reddit.com/r/${sub}/hot.json?limit=20`)
      .then((res) => {
        if (!res.ok) throw new Error('Reddit API blocked');
        return res.json();
      })
      .then((data) => {
        if (data.data && data.data.children) {
          const list = data.data.children.map((c: any) => c.data);
          setPosts(list);
        } else {
          setPosts(getFallbackPosts(sub));
        }
        setLoading(false);
      })
      .catch(() => {
        setPosts(getFallbackPosts(sub));
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchRedditPosts(subreddit);
  }, [subreddit]);

  const getFallbackPosts = (sub: string): RedditPost[] => [
    {
      id: '1',
      title: `Breakthrough in next-generation WebAssembly garbage collection and performance in ${sub}`,
      author: 'wasm_dev',
      score: 1842,
      num_comments: 312,
      url: 'https://en.wikipedia.org/wiki/WebAssembly',
      permalink: '/r/technology/comments/wasm',
      created_utc: Date.now() / 1000 - 7200,
    },
    {
      id: '2',
      title: 'How modern browser sandboxing prevents arbitrary cross-site script execution',
      author: 'security_specialist',
      score: 934,
      num_comments: 147,
      url: 'https://en.wikipedia.org/wiki/Sandbox_(computer_security)',
      permalink: '/r/webdev/comments/sandbox',
      created_utc: Date.now() / 1000 - 14400,
    },
    {
      id: '3',
      title: 'State of Web Performance: Core Web Vitals, INP, and LCP benchmarks in 2026',
      author: 'perf_engineer',
      score: 621,
      num_comments: 89,
      url: 'https://developer.mozilla.org',
      permalink: '/r/programming/comments/perf',
      created_utc: Date.now() / 1000 - 21600,
    },
  ];

  return (
    <div className="flex-1 h-full overflow-y-auto bg-neutral-950 text-neutral-100 flex flex-col font-sans">
      {/* Reddit Header */}
      <header className="sticky top-0 z-10 bg-neutral-900 border-b border-neutral-800 px-6 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-full bg-orange-600 flex items-center justify-center font-bold text-white text-sm">
            🤖
          </div>
          <span className="font-bold text-sm tracking-tight text-white">
            Reddit Explorer
          </span>

          {/* Subreddit tabs */}
          <div className="flex items-center gap-1.5 ml-4 bg-neutral-950 p-1 rounded-lg border border-neutral-800 text-xs">
            {subreddits.map((sub) => (
              <button
                key={sub}
                onClick={() => setSubreddit(sub)}
                className={`px-3 py-1 rounded transition-colors ${
                  subreddit === sub
                    ? 'bg-neutral-800 text-orange-400 font-semibold'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                r/{sub}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => fetchRedditPosts(subreddit)}
          aria-label="Refresh subreddit posts"
          className="p-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded transition-colors"
          title="Refresh Feed"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </header>

      {/* Main Posts List */}
      <main className="max-w-3xl w-full mx-auto p-6 flex-1">
        {loading ? (
          <div className="py-24 flex flex-col items-center justify-center text-neutral-400 gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
            <span className="text-sm">Retrieving posts from r/{subreddit}...</span>
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <article
                key={post.id}
                className="flex items-start gap-4 p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 hover:border-neutral-700 transition-all"
              >
                {/* Upvotes */}
                <div className="flex flex-col items-center justify-center min-w-[44px] bg-neutral-950/80 rounded-lg p-1.5 border border-neutral-800">
                  <ArrowUp className="w-4 h-4 text-orange-500 mb-0.5" />
                  <span className="text-xs font-semibold text-neutral-200 tabular-nums">
                    {post.score > 999 ? `${(post.score / 1000).toFixed(1)}k` : post.score}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-[11px] text-neutral-400 mb-1">
                    <span className="font-semibold text-neutral-300">r/{subreddit}</span>
                    <span>·</span>
                    <span>Posted by u/{post.author}</span>
                  </div>

                  <h3 className="text-sm md:text-base font-medium text-neutral-100 hover:text-orange-400 transition-colors mb-2">
                    <button
                      onClick={() => onNavigate(post.url || `https://reddit.com${post.permalink}`)}
                      className="text-left hover:underline"
                    >
                      {post.title}
                    </button>
                  </h3>

                  <div className="flex items-center gap-4 text-xs text-neutral-400">
                    <span className="flex items-center gap-1">
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>{post.num_comments} comments</span>
                    </span>
                    <button
                      onClick={() => onNavigate(post.url)}
                      className="flex items-center gap-1 text-neutral-400 hover:text-white"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Direct Link</span>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};
