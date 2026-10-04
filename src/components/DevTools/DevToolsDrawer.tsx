import React, { useState } from 'react';
import { X, Terminal, Code2, Wifi, Database, Gauge, Play, Trash2, CheckCircle2, ChevronRight, ChevronDown } from 'lucide-react';
import { Tab, NetworkRequest, ConsoleLog } from '../../types/browser';

interface DevToolsDrawerProps {
  activeTab: Tab;
  isOpen: boolean;
  onClose: () => void;
}

export const DevToolsDrawer: React.FC<DevToolsDrawerProps> = ({ activeTab, isOpen, onClose }) => {
  const [activeSubTab, setActiveSubTab] = useState<'elements' | 'console' | 'network' | 'application' | 'lighthouse'>('console');
  const [consoleInput, setConsoleInput] = useState('');
  const [consoleLogs, setConsoleLogs] = useState<ConsoleLog[]>([
    { id: '1', type: 'info', message: 'Lemon Browser DevEngine v2.4 initialized.', timestamp: Date.now() - 10000 },
    { id: '2', type: 'log', message: `Active context: ${activeTab.url}`, timestamp: Date.now() - 5000 },
  ]);

  // Network requests list
  const [networkRequests, setNetworkRequests] = useState<NetworkRequest[]>([
    {
      id: 'net-1',
      url: activeTab.url,
      method: 'GET',
      status: 200,
      statusText: 'OK',
      type: 'document',
      size: '24.8 kB',
      time: 38,
      timestamp: Date.now() - 2000,
    },
    {
      id: 'net-2',
      url: 'https://cdn.lemon.net/assets/fonts/inter.woff2',
      method: 'GET',
      status: 200,
      statusText: 'OK',
      type: 'stylesheet',
      size: '18.2 kB',
      time: 14,
      timestamp: Date.now() - 1800,
    },
    {
      id: 'net-3',
      url: 'https://api.lemon.net/telemetry/v1/ping',
      method: 'POST',
      status: 204,
      statusText: 'No Content',
      type: 'fetch',
      size: '0.4 kB',
      time: 22,
      timestamp: Date.now() - 1200,
    },
  ]);

  // Elements tree expandable state
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({
    html: true,
    head: false,
    body: true,
    main: true,
  });

  // Lighthouse run state
  const [lighthouseRunning, setLighthouseRunning] = useState(false);
  const [lighthouseScores, setLighthouseScores] = useState<{
    performance: number;
    accessibility: number;
    bestPractices: number;
    seo: number;
  } | null>({
    performance: 98,
    accessibility: 100,
    bestPractices: 96,
    seo: 100,
  });

  if (!isOpen) return null;

  const handleRunConsole = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consoleInput.trim()) return;

    const input = consoleInput.trim();
    const newLogs: ConsoleLog[] = [
      ...consoleLogs,
      { id: Date.now().toString(), type: 'log', message: `> ${input}`, timestamp: Date.now() },
    ];

    try {
      // Evaluate command in safe context
      let result: any;
      if (input === 'document.title') {
        result = activeTab.title;
      } else if (input === 'window.location.href' || input === 'location.href') {
        result = activeTab.url;
      } else if (input === 'navigator.userAgent') {
        result = 'Mozilla/5.0 (LemonBrowser/2.4; WebKit/605.1.15; React 19; TypeScript)';
      } else if (input.startsWith('console.log(')) {
        result = input.slice(12, -1);
      } else {
        // eslint-disable-next-line no-eval
        result = Function(`'use strict'; return (${input})`)();
      }

      newLogs.push({
        id: (Date.now() + 1).toString(),
        type: 'info',
        message: typeof result === 'object' ? JSON.stringify(result, null, 2) : String(result),
        timestamp: Date.now(),
      });
    } catch (err: any) {
      newLogs.push({
        id: (Date.now() + 1).toString(),
        type: 'error',
        message: `Uncaught EvalError: ${err?.message || 'Syntax error'}`,
        timestamp: Date.now(),
      });
    }

    setConsoleLogs(newLogs);
    setConsoleInput('');
  };

  const handleRunLighthouse = () => {
    setLighthouseRunning(true);
    setLighthouseScores(null);
    setTimeout(() => {
      setLighthouseScores({
        performance: Math.floor(Math.random() * 5 + 95),
        accessibility: 100,
        bestPractices: 96,
        seo: 100,
      });
      setLighthouseRunning(false);
    }, 1200);
  };

  const toggleNode = (node: string) => {
    setExpandedNodes((prev) => ({ ...prev, [node]: !prev[node] }));
  };

  return (
    <div className="h-72 w-full bg-neutral-950 border-t border-neutral-800 flex flex-col font-mono text-xs select-text z-30 shadow-2xl">
      {/* DevTools Top Navigation Bar */}
      <div className="flex items-center justify-between bg-neutral-900 border-b border-neutral-800 px-3 py-1.5 select-none">
        <div className="flex items-center gap-1">
          <button
            onClick={() => setActiveSubTab('elements')}
            className={`px-3 py-1 rounded font-medium transition-colors flex items-center gap-1.5 ${
              activeSubTab === 'elements' ? 'bg-neutral-800 text-sky-400' : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Elements</span>
          </button>

          <button
            onClick={() => setActiveSubTab('console')}
            className={`px-3 py-1 rounded font-medium transition-colors flex items-center gap-1.5 ${
              activeSubTab === 'console' ? 'bg-neutral-800 text-sky-400' : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Console</span>
          </button>

          <button
            onClick={() => setActiveSubTab('network')}
            className={`px-3 py-1 rounded font-medium transition-colors flex items-center gap-1.5 ${
              activeSubTab === 'network' ? 'bg-neutral-800 text-sky-400' : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Wifi className="w-3.5 h-3.5" />
            <span>Network</span>
          </button>

          <button
            onClick={() => setActiveSubTab('application')}
            className={`px-3 py-1 rounded font-medium transition-colors flex items-center gap-1.5 ${
              activeSubTab === 'application' ? 'bg-neutral-800 text-sky-400' : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>Application</span>
          </button>

          <button
            onClick={() => setActiveSubTab('lighthouse')}
            className={`px-3 py-1 rounded font-medium transition-colors flex items-center gap-1.5 ${
              activeSubTab === 'lighthouse' ? 'bg-neutral-800 text-sky-400' : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Gauge className="w-3.5 h-3.5" />
            <span>Lighthouse</span>
          </button>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[11px] text-neutral-400">Context: top</span>
          <button
            onClick={onClose}
            className="p-1 text-neutral-400 hover:text-white rounded"
            title="Close DevTools"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* DevTools Body Content */}
      <div className="flex-1 overflow-y-auto p-3">
        {/* ELEMENTS TAB */}
        {activeSubTab === 'elements' && (
          <div className="text-neutral-300 leading-relaxed text-xs">
            <div className="text-neutral-400">&lt;!DOCTYPE html&gt;</div>
            <div>
              <div
                onClick={() => toggleNode('html')}
                className="cursor-pointer hover:bg-neutral-900 flex items-center gap-1 py-0.5"
              >
                {expandedNodes.html ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
                <span className="text-purple-400">&lt;html <span className="text-amber-300">lang</span>="en"&gt;</span>
              </div>

              {expandedNodes.html && (
                <div className="pl-4 border-l border-neutral-800/80">
                  <div
                    onClick={() => toggleNode('head')}
                    className="cursor-pointer hover:bg-neutral-900 flex items-center gap-1 py-0.5"
                  >
                    {expandedNodes.head ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
                    <span className="text-purple-400">&lt;head&gt;</span>
                  </div>
                  {expandedNodes.head && (
                    <div className="pl-4 text-neutral-400">
                      <div>&lt;title&gt;{activeTab.title}&lt;/title&gt;</div>
                      <div>&lt;meta charset="UTF-8" /&gt;</div>
                    </div>
                  )}

                  <div
                    onClick={() => toggleNode('body')}
                    className="cursor-pointer hover:bg-neutral-900 flex items-center gap-1 py-0.5"
                  >
                    {expandedNodes.body ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
                    <span className="text-purple-400">&lt;body <span className="text-amber-300">class</span>="aura-viewport"&gt;</span>
                  </div>
                  {expandedNodes.body && (
                    <div className="pl-4">
                      <div className="text-sky-300">&lt;main id="root" data-url="{activeTab.url}"&gt;</div>
                      <div className="pl-4 text-neutral-400">
                        &lt;div class="content-container"&gt;...rendered viewport content&lt;/div&gt;
                      </div>
                      <div className="text-sky-300">&lt;/main&gt;</div>
                    </div>
                  )}
                  <div className="text-purple-400">&lt;/body&gt;</div>
                </div>
              )}
              <div className="text-purple-400">&lt;/html&gt;</div>
            </div>
          </div>
        )}

        {/* CONSOLE TAB */}
        {activeSubTab === 'console' && (
          <div className="flex flex-col h-full">
            <div className="flex-1 space-y-1 overflow-y-auto mb-2">
              {consoleLogs.map((log) => (
                <div
                  key={log.id}
                  className={`flex items-start gap-2 py-0.5 ${
                    log.type === 'error'
                      ? 'text-rose-400 bg-rose-950/20 px-2 rounded'
                      : log.type === 'warn'
                      ? 'text-amber-400'
                      : log.type === 'info'
                      ? 'text-sky-400'
                      : 'text-neutral-300'
                  }`}
                >
                  <span className="text-neutral-400 text-[10px] select-none pt-0.5 tabular-nums">
                    {new Date(log.timestamp).toLocaleTimeString([], { hour12: false })}
                  </span>
                  <span className="whitespace-pre-wrap flex-1">{log.message}</span>
                </div>
              ))}
            </div>

            {/* Console Input */}
            <form onSubmit={handleRunConsole} className="flex items-center gap-2 border-t border-neutral-800 pt-2">
              <span className="text-sky-400 select-none">&gt;</span>
              <input
                type="text"
                value={consoleInput}
                onChange={(e) => setConsoleInput(e.target.value)}
                placeholder="Evaluate JavaScript expression (e.g. document.title, 2 + 2)..."
                className="flex-1 bg-transparent text-white outline-none"
              />
              <button
                type="button"
                onClick={() => setConsoleLogs([])}
                className="text-neutral-500 hover:text-neutral-300 p-1"
                title="Clear console"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        )}

        {/* NETWORK TAB */}
        {activeSubTab === 'network' && (
          <div className="w-full">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-neutral-800 text-neutral-400 text-[11px]">
                  <th className="py-1 px-2 font-medium">Name</th>
                  <th className="py-1 px-2 font-medium">Status</th>
                  <th className="py-1 px-2 font-medium">Type</th>
                  <th className="py-1 px-2 font-medium text-right">Size</th>
                  <th className="py-1 px-2 font-medium text-right">Time</th>
                </tr>
              </thead>
              <tbody>
                {networkRequests.map((req) => (
                  <tr key={req.id} className="hover:bg-neutral-900 border-b border-neutral-900/60">
                    <td className="py-1.5 px-2 text-sky-400 truncate max-w-xs">{req.url}</td>
                    <td className="py-1.5 px-2">
                      <span className="text-emerald-400">{req.status}</span>
                    </td>
                    <td className="py-1.5 px-2 text-neutral-400">{req.type}</td>
                    <td className="py-1.5 px-2 text-right tabular-nums text-neutral-300">{req.size}</td>
                    <td className="py-1.5 px-2 text-right tabular-nums text-neutral-400">{req.time} ms</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* APPLICATION TAB */}
        {activeSubTab === 'application' && (
          <div className="space-y-4 text-xs">
            <div>
              <h4 className="text-neutral-400 font-semibold mb-2">Storage Overview</h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <div className="p-3 bg-neutral-900 rounded-lg border border-neutral-800">
                  <div className="text-neutral-400 text-[11px]">Local Storage</div>
                  <div className="text-sm font-bold text-white mt-1">2 keys</div>
                </div>
                <div className="p-3 bg-neutral-900 rounded-lg border border-neutral-800">
                  <div className="text-neutral-400 text-[11px]">Session Storage</div>
                  <div className="text-sm font-bold text-white mt-1">0 bytes</div>
                </div>
                <div className="p-3 bg-neutral-900 rounded-lg border border-neutral-800">
                  <div className="text-neutral-400 text-[11px]">Cookies</div>
                  <div className="text-sm font-bold text-white mt-1">3 cookies</div>
                </div>
                <div className="p-3 bg-neutral-900 rounded-lg border border-neutral-800">
                  <div className="text-neutral-400 text-[11px]">Cache Storage</div>
                  <div className="text-sm font-bold text-white mt-1">1.2 MB</div>
                </div>
              </div>
            </div>

            <div>
              <button
                onClick={() => alert('Site data & caches successfully purged.')}
                className="px-3 py-1.5 bg-rose-950 hover:bg-rose-900 border border-rose-800 text-rose-300 rounded-lg transition-colors"
              >
                Clear Site Data & Cache
              </button>
            </div>
          </div>
        )}

        {/* LIGHTHOUSE TAB */}
        {activeSubTab === 'lighthouse' && (
          <div className="flex flex-col items-center justify-center p-4">
            {lighthouseRunning ? (
              <div className="flex flex-col items-center gap-2 py-6 text-neutral-400">
                <Gauge className="w-8 h-8 animate-spin text-sky-400" />
                <span>Auditing page performance & accessibility standards...</span>
              </div>
            ) : lighthouseScores ? (
              <div className="w-full max-w-lg">
                <div className="grid grid-cols-4 gap-4 text-center mb-4">
                  <div className="flex flex-col items-center">
                    <div className="w-14 h-14 rounded-full border-4 border-emerald-500 flex items-center justify-center text-sm font-bold text-emerald-400 mb-1">
                      {lighthouseScores.performance}
                    </div>
                    <span className="text-[11px] text-neutral-400">Performance</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-14 h-14 rounded-full border-4 border-emerald-500 flex items-center justify-center text-sm font-bold text-emerald-400 mb-1">
                      {lighthouseScores.accessibility}
                    </div>
                    <span className="text-[11px] text-neutral-400">Accessibility</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-14 h-14 rounded-full border-4 border-emerald-500 flex items-center justify-center text-sm font-bold text-emerald-400 mb-1">
                      {lighthouseScores.bestPractices}
                    </div>
                    <span className="text-[11px] text-neutral-400">Practices</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-14 h-14 rounded-full border-4 border-emerald-500 flex items-center justify-center text-sm font-bold text-emerald-400 mb-1">
                      {lighthouseScores.seo}
                    </div>
                    <span className="text-[11px] text-neutral-400">SEO</span>
                  </div>
                </div>

                <div className="text-center">
                  <button
                    onClick={handleRunLighthouse}
                    className="px-4 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg text-xs font-medium transition-colors"
                  >
                    Re-run Audit
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};
