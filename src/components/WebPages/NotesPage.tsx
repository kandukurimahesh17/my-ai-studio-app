import React, { useState, useEffect } from 'react';
import { FileText, Download, Copy, Check, Trash2, Eye, Edit3 } from 'lucide-react';

interface NotesPageProps {
  onAddDownload: (filename: string, content: string, mimeType: string) => void;
}

export const NotesPage: React.FC<NotesPageProps> = ({ onAddDownload }) => {
  const [content, setContent] = useState<string>(() => {
    return (
      localStorage.getItem('lemon_notes') ||
      localStorage.getItem('aura_notes') ||
      `# Lemon Web Research Scratchpad

Welcome to your built-in Lemon Browser scratchpad! Use this tab to jot down snippets, links, quotes, and research notes while browsing.

## Key Insights
- The Web began in 1989 at CERN by Sir Tim Berners-Lee.
- Modern browsers combine HTML parsing, CSSOM construction, and multi-threaded JavaScript engines (V8 / SpiderMonkey / JavaScriptCore).
- Sandboxed iframes isolate untrusted third-party scripts.

## Ideas & Next Steps
- [ ] Explore Wikipedia articles on distributed systems
- [ ] Test CSS grid layout in Lemon Playground
- [ ] Export research paper notes to Markdown
`
    );
  });

  const [copied, setCopied] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  useEffect(() => {
    localStorage.setItem('lemon_notes', content);
  }, [content]);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    onAddDownload('lemon-research-notes.md', content, 'text/markdown');
  };

  const words = content.trim() ? content.trim().split(/\s+/).length : 0;
  const chars = content.length;

  return (
    <div className="flex-1 h-full overflow-y-auto bg-neutral-950 text-neutral-100 flex flex-col font-sans">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-neutral-900 border-b border-neutral-800 px-6 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-amber-400 font-bold text-sm">
            <FileText className="w-4 h-4" />
            <span>Lemon Scratchpad</span>
          </div>

          <div className="text-xs text-neutral-400 border-l border-neutral-800 pl-3">
            Auto-saved to local browser storage
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setPreviewMode(!previewMode)}
            className="px-2.5 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-xs rounded-lg text-neutral-200 transition-colors flex items-center gap-1"
          >
            {previewMode ? (
              <>
                <Edit3 className="w-3.5 h-3.5" />
                <span>Editor</span>
              </>
            ) : (
              <>
                <Eye className="w-3.5 h-3.5" />
                <span>Preview</span>
              </>
            )}
          </button>

          <button
            onClick={handleCopy}
            className="px-2.5 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-xs rounded-lg text-neutral-200 transition-colors flex items-center gap-1"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>

          <button
            onClick={handleDownload}
            className="px-3 py-1.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export .md</span>
          </button>

          <button
            onClick={() => {
              if (window.confirm('Clear all notes?')) setContent('');
            }}
            className="p-1.5 text-neutral-500 hover:text-rose-400 rounded transition-colors"
            title="Clear all"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Editor / Preview Area */}
      <main className="max-w-4xl w-full mx-auto p-6 flex-1 flex flex-col">
        {previewMode ? (
          <div className="p-6 bg-neutral-900/50 border border-neutral-800 rounded-2xl flex-1 text-neutral-200 prose prose-invert max-w-none">
            <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
              {content}
            </pre>
          </div>
        ) : (
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Type your notes, paste links, or write thoughts..."
            aria-label="Research notes editor"
            className="w-full flex-1 min-h-[450px] bg-transparent outline-none text-neutral-200 font-mono text-sm leading-relaxed resize-none p-4 rounded-xl border border-neutral-800 focus:border-rose-500/60"
          />
        )}

        <div className="flex items-center justify-between text-xs text-neutral-400 mt-4 border-t border-neutral-900 pt-3">
          <div className="flex items-center gap-4 tabular-nums">
            <span>{words} words</span>
            <span>·</span>
            <span>{chars} characters</span>
            <span>·</span>
            <span>~{Math.ceil(words / 200)} min read</span>
          </div>
          <div>Markdown supported</div>
        </div>
      </main>
    </div>
  );
};
