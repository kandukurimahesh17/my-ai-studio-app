import React, { useState } from 'react';
import { X, Type, Sun, Moon, Coffee, ZoomIn, ZoomOut, BookOpen, Clock } from 'lucide-react';

interface ReaderModeProps {
  url: string;
  title: string;
  onClose: () => void;
}

export const ReaderMode: React.FC<ReaderModeProps> = ({ url, title, onClose }) => {
  const [theme, setTheme] = useState<'dark' | 'sepia' | 'light'>('dark');
  const [fontFamily, setFontFamily] = useState<'serif' | 'sans' | 'mono'>('serif');
  const [fontSize, setFontSize] = useState(18);

  const themeClasses = {
    dark: 'bg-neutral-950 text-neutral-200',
    sepia: 'bg-[#fbf0d9] text-[#433422]',
    light: 'bg-[#ffffff] text-[#1a1a1a]',
  };

  const fontClasses = {
    serif: 'font-serif',
    sans: 'font-sans',
    mono: 'font-mono',
  };

  return (
    <div className={`flex-1 h-full overflow-y-auto ${themeClasses[theme]} transition-colors duration-200 flex flex-col`}>
      {/* Top Floating Reader Toolbar */}
      <header className="sticky top-0 z-20 backdrop-blur-md bg-opacity-90 border-b border-black/10 dark:border-white/10 px-6 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-medium opacity-80">
          <BookOpen className="w-4 h-4 text-sky-400" />
          <span>Reader View</span>
          <span>·</span>
          <span className="truncate max-w-xs">{url}</span>
        </div>

        {/* Reader Controls */}
        <div className="flex items-center gap-4 text-xs">
          {/* Font Family */}
          <div className="flex items-center gap-1 border-r border-black/10 dark:border-white/10 pr-3">
            <button
              onClick={() => setFontFamily('serif')}
              className={`px-2 py-1 rounded font-serif ${fontFamily === 'serif' ? 'font-bold underline' : 'opacity-60'}`}
            >
              Serif
            </button>
            <button
              onClick={() => setFontFamily('sans')}
              className={`px-2 py-1 rounded font-sans ${fontFamily === 'sans' ? 'font-bold underline' : 'opacity-60'}`}
            >
              Sans
            </button>
            <button
              onClick={() => setFontFamily('mono')}
              className={`px-2 py-1 rounded font-mono ${fontFamily === 'mono' ? 'font-bold underline' : 'opacity-60'}`}
            >
              Mono
            </button>
          </div>

          {/* Font Size */}
          <div className="flex items-center gap-2 border-r border-black/10 dark:border-white/10 pr-3">
            <button
              onClick={() => setFontSize((s) => Math.max(14, s - 2))}
              aria-label="Decrease font size"
              className="p-1 hover:opacity-100 opacity-60"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="tabular-nums font-mono text-[11px]">{fontSize}px</span>
            <button
              onClick={() => setFontSize((s) => Math.min(26, s + 2))}
              aria-label="Increase font size"
              className="p-1 hover:opacity-100 opacity-60"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Theme */}
          <div className="flex items-center gap-1 border-r border-black/10 dark:border-white/10 pr-3">
            <button
              onClick={() => setTheme('dark')}
              className={`p-1.5 rounded ${theme === 'dark' ? 'bg-neutral-800 text-white' : 'opacity-60'}`}
              title="Dark Theme"
            >
              <Moon className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setTheme('sepia')}
              className={`p-1.5 rounded ${theme === 'sepia' ? 'bg-[#ebd8b7] text-[#433422]' : 'opacity-60'}`}
              title="Sepia Theme"
            >
              <Coffee className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setTheme('light')}
              className={`p-1.5 rounded ${theme === 'light' ? 'bg-neutral-200 text-neutral-900' : 'opacity-60'}`}
              title="Light Theme"
            >
              <Sun className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Close Reader Mode */}
          <button
            onClick={onClose}
            className="p-1.5 hover:opacity-100 opacity-70 transition-opacity"
            title="Exit Reader View"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Reader Article Content */}
      <main className="max-w-2xl w-full mx-auto px-6 py-12 flex-1">
        <header className="mb-8 border-b border-black/10 dark:border-white/10 pb-6">
          <h1
            className={`text-3xl md:text-4xl font-normal mb-3 ${fontClasses[fontFamily]}`}
            style={{ fontSize: `${fontSize * 1.6}px` }}
          >
            {title || 'Web Architecture & Modern Browser Systems'}
          </h1>
          <div className="flex items-center gap-2 text-xs opacity-60">
            <Clock className="w-3.5 h-3.5" />
            <span>4 min read</span>
            <span>·</span>
            <span>{new URL(url.startsWith('http') ? url : 'https://aura.local').hostname}</span>
          </div>
        </header>

        <article
          className={`space-y-6 leading-relaxed ${fontClasses[fontFamily]}`}
          style={{ fontSize: `${fontSize}px`, lineHeight: 1.7 }}
        >
          <p>
            The modern web browser is one of the most sophisticated distributed computing systems ever constructed. At its core, the software translates declarative HTML text markup, Cascading Style Sheets, and asynchronous JavaScript into reactive pixel buffers painted to the user display at 60 to 120 frames per second.
          </p>

          <h2
            className="font-medium mt-8 mb-2"
            style={{ fontSize: `${fontSize * 1.25}px` }}
          >
            The Rendering Pipeline Lifecycle
          </h2>

          <p>
            When a user requests a URL, the networking stack resolves the domain via DNS, establishes a TLS 1.3 encrypted handshake, and streams HTTP data packets. The parsing engine tokens the incoming byte stream into the Document Object Model (DOM) tree while simultaneously calculating style rules into the CSSOM.
          </p>

          <p>
            Once both trees are synthesized into the unified render tree, layout algorithms calculate the exact geometric dimensions and coordinates of each element box. Finally, the paint subsystem generates display lists executed across multi-core GPU rasterizers.
          </p>

          <h2
            className="font-medium mt-8 mb-2"
            style={{ fontSize: `${fontSize * 1.25}px` }}
          >
            Sandboxing & Security Isolation
          </h2>

          <p>
            Security is paramount in contemporary user agents. Modern architecture enforces strict process isolation: network processes, GPU compositors, and renderer sandboxes operate in isolated security privileges to defend against cross-site scripting and unauthorized local hardware access.
          </p>
        </article>
      </main>
    </div>
  );
};
