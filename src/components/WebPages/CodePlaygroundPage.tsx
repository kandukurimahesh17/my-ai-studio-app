import React, { useState, useEffect } from 'react';
import { Play, Download, RefreshCw, Code2, Eye, Sparkles, Check } from 'lucide-react';

interface CodePlaygroundProps {
  onAddDownload: (filename: string, content: string, mimeType: string) => void;
}

const TEMPLATES = {
  counter: {
    html: `<div class="card">
  <h1>Lemon Playground</h1>
  <p>Interactive web application running directly in Lemon Browser engine.</p>
  <div class="counter-box">
    <button id="dec">-</button>
    <span id="count">0</span>
    <button id="inc">+</button>
  </div>
</div>`,
    css: `body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  background: #0f172a;
  color: #f8fafc;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}
.card {
  background: #1e293b;
  padding: 2.5rem;
  border-radius: 1rem;
  border: 1px solid #334155;
  text-align: center;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5);
  max-width: 400px;
}
h1 { margin-top: 0; color: #facc15; font-size: 1.5rem; }
p { color: #94a3b8; font-size: 0.875rem; margin-bottom: 2rem; }
.counter-box {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
}
button {
  background: #eab308;
  color: #0f172a;
  font-weight: bold;
  border: none;
  font-size: 1.5rem;
  width: 48px;
  height: 48px;
  border-radius: 0.75rem;
  cursor: pointer;
  transition: all 0.2s;
}
button:hover { background: #fde047; transform: translateY(-2px); }
#count { font-size: 2rem; font-weight: bold; font-family: monospace; min-width: 50px; }`,
    js: `let count = 0;
const countEl = document.getElementById('count');
document.getElementById('inc').addEventListener('click', () => {
  count++;
  countEl.innerText = count;
});
document.getElementById('dec').addEventListener('click', () => {
  count--;
  countEl.innerText = count;
});`,
  },
  particles: {
    html: `<canvas id="canvas"></canvas>
<div class="overlay">
  <h2>Interactive Canvas</h2>
  <p>Move mouse to spawn glowing nodes</p>
</div>`,
    css: `body { margin: 0; overflow: hidden; background: #050505; }
canvas { display: block; }
.overlay {
  position: absolute;
  top: 20px;
  left: 20px;
  color: #fff;
  font-family: sans-serif;
  pointer-events: none;
}
h2 { margin: 0; font-size: 1.25rem; color: #a855f7; }
p { margin: 4px 0 0; font-size: 0.75rem; color: #888; }`,
    js: `const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
window.addEventListener('mousemove', (e) => {
  for (let i = 0; i < 4; i++) {
    particles.push({
      x: e.clientX,
      y: e.clientY,
      vx: (Math.random() - 0.5) * 4,
      vy: (Math.random() - 0.5) * 4,
      radius: Math.random() * 4 + 2,
      alpha: 1,
      color: \`hsl(\${Math.random() * 60 + 260}, 100%, 70%)\`
    });
  }
});

function animate() {
  ctx.fillStyle = 'rgba(5, 5, 5, 0.2)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.x += p.vx;
    p.y += p.vy;
    p.alpha -= 0.02;
    if (p.alpha <= 0) {
      particles.splice(i, 1);
      continue;
    }
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.globalAlpha = p.alpha;
    ctx.fill();
  }
  ctx.globalAlpha = 1;
  requestAnimationFrame(animate);
}
animate();`,
  },
};

export const CodePlaygroundPage: React.FC<CodePlaygroundProps> = ({ onAddDownload }) => {
  const [activeTab, setActiveTab] = useState<'html' | 'css' | 'js'>('html');
  const [html, setHtml] = useState(TEMPLATES.counter.html);
  const [css, setCss] = useState(TEMPLATES.counter.css);
  const [js, setJs] = useState(TEMPLATES.counter.js);
  const [srcDoc, setSrcDoc] = useState('');
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const generateSourceDoc = (h: string, c: string, j: string) => {
    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>${c}</style>
</head>
<body>
  ${h}
  <script>${j}<\/script>
</body>
</html>`;
  };

  const handleRun = () => {
    setSrcDoc(generateSourceDoc(html, css, js));
  };

  useEffect(() => {
    handleRun();
  }, []);

  const handleLoadTemplate = (templateKey: keyof typeof TEMPLATES) => {
    const t = TEMPLATES[templateKey];
    setHtml(t.html);
    setCss(t.css);
    setJs(t.js);
    setSrcDoc(generateSourceDoc(t.html, t.css, t.js));
  };

  const handleDownload = () => {
    const fullCode = generateSourceDoc(html, css, js);
    onAddDownload('lemon-app.html', fullCode, 'text/html');
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2000);
  };

  return (
    <div className="flex-1 h-full overflow-hidden flex flex-col bg-neutral-950 text-neutral-100 font-sans">
      {/* Playground Header */}
      <header className="bg-neutral-900 border-b border-neutral-800 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-amber-400 font-bold text-sm">
            <Code2 className="w-4 h-4" />
            <span>Lemon Playground</span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 ml-4 bg-neutral-950 p-0.5 rounded-lg border border-neutral-800 text-xs">
            <button
              onClick={() => handleLoadTemplate('counter')}
              className="px-2.5 py-1 rounded text-neutral-300 hover:text-white hover:bg-neutral-800 transition-colors"
            >
              Counter App
            </button>
            <button
              onClick={() => handleLoadTemplate('particles')}
              className="px-2.5 py-1 rounded text-neutral-300 hover:text-white hover:bg-neutral-800 transition-colors"
            >
              Canvas Particles
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleRun}
            className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Run Code</span>
          </button>

          <button
            onClick={handleDownload}
            className="bg-neutral-800 hover:bg-neutral-700 text-neutral-200 px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors"
          >
            {downloadSuccess ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Downloaded</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5" />
                <span>Export .html</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* Main Split Body: Left Editor, Right Live Preview */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Left: Code Editor */}
        <div className="w-full md:w-1/2 flex flex-col border-b md:border-b-0 md:border-r border-neutral-800 h-1/2 md:h-full bg-neutral-900/60">
          {/* Editor Tabs */}
          <div className="flex items-center bg-neutral-950 border-b border-neutral-800 px-2 pt-1 text-xs">
            <button
              onClick={() => setActiveTab('html')}
              className={`px-3 py-1.5 font-mono rounded-t transition-colors ${
                activeTab === 'html'
                  ? 'bg-neutral-900 text-sky-400 border-t-2 border-sky-400 font-semibold'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              index.html
            </button>
            <button
              onClick={() => setActiveTab('css')}
              className={`px-3 py-1.5 font-mono rounded-t transition-colors ${
                activeTab === 'css'
                  ? 'bg-neutral-900 text-sky-400 border-t-2 border-sky-400 font-semibold'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              styles.css
            </button>
            <button
              onClick={() => setActiveTab('js')}
              className={`px-3 py-1.5 font-mono rounded-t transition-colors ${
                activeTab === 'js'
                  ? 'bg-neutral-900 text-sky-400 border-t-2 border-sky-400 font-semibold'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              main.js
            </button>
          </div>

          {/* Active text area */}
          <div className="flex-1 relative">
            {activeTab === 'html' && (
              <textarea
                value={html}
                onChange={(e) => setHtml(e.target.value)}
                aria-label="HTML code editor"
                className="w-full h-full bg-neutral-950 p-4 font-mono text-xs md:text-sm text-sky-200 outline-none resize-none leading-relaxed"
                spellCheck={false}
              />
            )}
            {activeTab === 'css' && (
              <textarea
                value={css}
                onChange={(e) => setCss(e.target.value)}
                aria-label="CSS code editor"
                className="w-full h-full bg-neutral-950 p-4 font-mono text-xs md:text-sm text-pink-200 outline-none resize-none leading-relaxed"
                spellCheck={false}
              />
            )}
            {activeTab === 'js' && (
              <textarea
                value={js}
                onChange={(e) => setJs(e.target.value)}
                aria-label="JavaScript code editor"
                className="w-full h-full bg-neutral-950 p-4 font-mono text-xs md:text-sm text-amber-200 outline-none resize-none leading-relaxed"
                spellCheck={false}
              />
            )}
          </div>
        </div>

        {/* Right: Live Preview */}
        <div className="w-full md:w-1/2 flex flex-col h-1/2 md:h-full bg-neutral-950">
          <div className="bg-neutral-950 border-b border-neutral-800 px-3 py-1.5 flex items-center justify-between text-xs text-neutral-400">
            <div className="flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-neutral-400" />
              <span>Live Render Engine Output</span>
            </div>
            <button
              onClick={handleRun}
              className="hover:text-neutral-200 text-xs flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Reload Frame</span>
            </button>
          </div>

          <div className="flex-1 w-full h-full relative bg-white">
            <iframe
              srcDoc={srcDoc}
              title="Aura Live Preview"
              sandbox="allow-scripts allow-modals"
              className="w-full h-full border-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
