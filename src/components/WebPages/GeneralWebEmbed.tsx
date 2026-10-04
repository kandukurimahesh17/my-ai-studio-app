import React, { useState } from 'react';
import { Shield, BookOpen, ExternalLink, Code2, AlertCircle } from 'lucide-react';

interface GeneralWebEmbedProps {
  url: string;
  onOpenReaderMode: () => void;
  onOpenDevTools: () => void;
}

export const GeneralWebEmbed: React.FC<GeneralWebEmbedProps> = ({
  url,
  onOpenReaderMode,
  onOpenDevTools,
}) => {
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [showSecurityInfo, setShowSecurityInfo] = useState(true);

  return (
    <div className="flex-1 h-full w-full flex flex-col bg-neutral-950 text-neutral-100 overflow-hidden">
      {/* Sandboxed notice bar */}
      {showSecurityInfo && (
        <div className="bg-neutral-900 border-b border-neutral-800 px-4 py-2 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-neutral-300">
            <Shield className="w-4 h-4 text-emerald-400" />
            <span className="font-medium">Sandboxed Security Container:</span>
            <span className="text-neutral-400 truncate max-w-sm">{url}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenReaderMode}
              className="text-sky-400 hover:text-sky-300 flex items-center gap-1 font-medium"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Reader Mode</span>
            </button>
            <span className="text-neutral-700">|</span>
            <button
              onClick={onOpenDevTools}
              className="text-neutral-300 hover:text-white flex items-center gap-1"
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Inspect Elements</span>
            </button>
            <span className="text-neutral-700">|</span>
            <button
              onClick={() => setShowSecurityInfo(false)}
              className="text-neutral-500 hover:text-neutral-300"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Frame Container */}
      <div className="flex-1 w-full h-full relative bg-neutral-900">
        <iframe
          src={url}
          title="Lemon Web Engine Viewport"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          className="w-full h-full border-none bg-white"
          onLoad={() => setIframeLoaded(true)}
        />

        {/* Fallback prompt overlay for sites that enforce X-Frame-Options */}
        {!iframeLoaded && (
          <div className="absolute inset-0 bg-neutral-950/80 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center z-10 pointer-events-none">
            <div className="max-w-md p-6 bg-neutral-900 border border-neutral-800 rounded-2xl shadow-xl pointer-events-auto">
              <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto mb-3 text-xl">
                🍋
              </div>
              <h3 className="font-semibold text-white text-base mb-1">
                Loading Web Resource
              </h3>
              <p className="text-xs text-neutral-400 mb-4 leading-relaxed">
                Lemon Browser is rendering <span className="text-neutral-200">{url}</span>. If this external host specifies strict cross-origin framing policies (X-Frame-Options: SAMEORIGIN), switch to Reader Mode or built-in Lemon apps.
              </p>
              <div className="flex justify-center gap-2">
                <button
                  onClick={onOpenReaderMode}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Switch to Reader Mode</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
