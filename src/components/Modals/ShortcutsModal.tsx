import React from 'react';
import { X, Keyboard } from 'lucide-react';

interface ShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShortcutsModal: React.FC<ShortcutsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const shortcuts = [
    { key: 'Ctrl / ⌘ + T', action: 'Open a new browser tab' },
    { key: 'Ctrl / ⌘ + W', action: 'Close active tab' },
    { key: 'Ctrl / ⌘ + L', action: 'Focus address bar & select URL' },
    { key: 'Ctrl / ⌘ + R', action: 'Reload current tab' },
    { key: 'Ctrl / ⌘ + D', action: 'Bookmark current page' },
    { key: 'Ctrl / ⌘ + B', action: 'Toggle Bookmarks toolbar' },
    { key: 'Ctrl / ⌘ + Shift + N', action: 'Open Incognito private window' },
    { key: 'F12', action: 'Open Developer Tools (Console, Network)' },
    { key: 'Alt + Left Arrow', action: 'Navigate back in tab history' },
    { key: 'Alt + Right Arrow', action: 'Navigate forward in tab history' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 select-none">
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl max-w-md w-full p-6 shadow-2xl text-neutral-100 text-xs">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
          <div className="flex items-center gap-2">
            <Keyboard className="w-4 h-4 text-sky-400" />
            <h3 className="font-semibold text-base text-white">Keyboard Shortcuts</h3>
          </div>
          <button onClick={onClose} className="text-neutral-400 hover:text-white p-1">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Shortcuts list */}
        <div className="py-4 space-y-2">
          {shortcuts.map((sc, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-neutral-950/60"
            >
              <span className="text-neutral-300 font-normal">{sc.action}</span>
              <kbd className="px-2 py-1 bg-neutral-950 border border-neutral-700/80 rounded font-mono text-[11px] text-sky-300 shadow-inner">
                {sc.key}
              </kbd>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-neutral-800 text-right">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl font-medium transition-colors"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};
