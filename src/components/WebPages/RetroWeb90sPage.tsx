import React, { useState } from 'react';
import { Sparkles, Heart } from 'lucide-react';

interface RetroWeb90sPageProps {
  onNavigate: (url: string) => void;
}

export const RetroWeb90sPage: React.FC<RetroWeb90sPageProps> = ({ onNavigate }) => {
  const [visitorCount, setVisitorCount] = useState(4289);
  const [guestbookName, setGuestbookName] = useState('');
  const [guestbookMessage, setGuestbookMessage] = useState('');
  const [entries, setEntries] = useState([
    { name: 'CyberDave_95', msg: 'Radical homepage! Bookmarked in Netscape Navigator.', date: '11/04/1996' },
    { name: 'NeoSurfer', msg: 'Best viewed with 800x600 resolution and 256 colors!!', date: '08/19/1997' },
  ]);

  const handleGuestbookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestbookName || !guestbookMessage) return;
    setEntries([
      { name: guestbookName, msg: guestbookMessage, date: '10/02/1998' },
      ...entries,
    ]);
    setGuestbookName('');
    setGuestbookMessage('');
    setVisitorCount((v) => v + 1);
  };

  return (
    <div className="flex-1 h-full overflow-y-auto bg-black text-white p-6 font-mono selection:bg-yellow-400 selection:text-black">
      {/* 90s Marquee */}
      <div className="bg-blue-900 border-2 border-yellow-400 py-1 px-4 mb-6 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap text-yellow-300 font-bold text-sm tracking-widest">
          *** WELCOME TO THE CYBERSPACE HIGHWAY! *** BEST VIEWED IN NETSCAPE NAVIGATOR 2.0 AT 800x600 RESOLUTION *** UNDER CONSTRUCTION ***
        </div>
      </div>

      <div className="max-w-2xl mx-auto border-4 border-double border-yellow-400 p-6 bg-neutral-950 shadow-2xl">
        {/* Header */}
        <div className="text-center border-b-2 border-dashed border-red-500 pb-4 mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-yellow-400 tracking-wider uppercase animate-pulse">
            ★ Galaxy Net: The Retro Portal ★
          </h1>
          <p className="text-xs text-green-400 mt-1">
            "Connecting Cyberspace Geeks Since 1995"
          </p>
        </div>

        {/* Animated Under Construction */}
        <div className="flex items-center justify-center gap-3 bg-yellow-950/40 border border-yellow-600 p-3 mb-6">
          <span className="text-2xl animate-bounce">🚧</span>
          <span className="text-yellow-400 text-xs font-bold uppercase tracking-wider">
            Warning: This Section is Under Construction! Check back soon!
          </span>
          <span className="text-2xl animate-bounce">🚧</span>
        </div>

        {/* Counter */}
        <div className="text-center my-6">
          <div className="text-xs text-neutral-400 mb-1">YOU ARE CYBER-VISITOR NUMBER:</div>
          <div className="inline-block bg-black border-2 border-neutral-600 px-4 py-1.5 font-mono text-xl text-green-400 tracking-widest font-black shadow-inner">
            {visitorCount.toString().padStart(6, '0')}
          </div>
        </div>

        {/* Hot Web Links */}
        <div className="my-6">
          <h3 className="text-sm font-bold text-cyan-400 underline mb-3 uppercase">
            🔥 Cool Cyberspace Bookmarks 🔥
          </h3>
          <ul className="space-y-2 text-xs">
            <li>
              👉{' '}
              <button
                onClick={() => onNavigate('https://en.wikipedia.org/wiki/World_Wide_Web')}
                className="text-blue-400 underline hover:text-red-400"
              >
                The History of HTML & Tim Berners-Lee
              </button>
            </li>
            <li>
              👉{' '}
              <button
                onClick={() => onNavigate('https://news.ycombinator.com')}
                className="text-blue-400 underline hover:text-red-400"
              >
                Hacker News (Silicon Valley Tech Discussions)
              </button>
            </li>
            <li>
              👉{' '}
              <button
                onClick={() => onNavigate('lemon://playground')}
                className="text-blue-400 underline hover:text-red-400"
              >
                Launch Modern Code Sandbox in Lemon Browser
              </button>
            </li>
          </ul>
        </div>

        {/* Guestbook */}
        <div className="mt-8 border-t-2 border-neutral-800 pt-6">
          <h3 className="text-sm font-bold text-pink-400 mb-3 uppercase">
            📝 Sign My Cyber-Guestbook!
          </h3>
          <form onSubmit={handleGuestbookSubmit} className="space-y-3 mb-6">
            <div>
              <input
                type="text"
                placeholder="Your Cyber Handle"
                value={guestbookName}
                onChange={(e) => setGuestbookName(e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-700 px-3 py-1.5 text-xs text-white outline-none focus:border-yellow-400"
                required
              />
            </div>
            <div>
              <textarea
                placeholder="Leave your message for all cyber-travelers..."
                value={guestbookMessage}
                onChange={(e) => setGuestbookMessage(e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-700 px-3 py-1.5 text-xs text-white outline-none focus:border-yellow-400 h-16 resize-none"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold text-xs px-4 py-1.5 border border-white uppercase shadow"
            >
              Post to Guestbook!
            </button>
          </form>

          <div className="space-y-3">
            {entries.map((entry, idx) => (
              <div key={idx} className="bg-neutral-900/80 border border-neutral-800 p-2.5 text-xs">
                <div className="text-yellow-300 font-bold mb-1 flex justify-between">
                  <span>{entry.name}</span>
                  <span className="text-neutral-500 font-normal">{entry.date}</span>
                </div>
                <p className="text-neutral-300">{entry.msg}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Webring badge */}
        <div className="mt-8 pt-4 border-t border-neutral-800 text-center text-xs text-neutral-400">
          <div>[ Prev Site | Next Site | Random Cyberspace Page ]</div>
          <div className="text-[10px] text-neutral-600 mt-2">
            Proud member of the WebRing Consortium (1995-1998)
          </div>
        </div>
      </div>
    </div>
  );
};
