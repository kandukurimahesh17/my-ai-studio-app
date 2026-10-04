import React, { useState } from 'react';
import { X, Shield, Moon, KeyRound, Code2, Check, Copy, RefreshCw } from 'lucide-react';
import { Extension } from '../../types/browser';

interface ExtensionsModalProps {
  extensions: Extension[];
  onToggleExtension: (id: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const ExtensionsModal: React.FC<ExtensionsModalProps> = ({
  extensions,
  onToggleExtension,
  isOpen,
  onClose,
}) => {
  const [generatedPass, setGeneratedPass] = useState('');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const generateStrongPassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~';
    let result = '';
    for (let i = 0; i < 18; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setGeneratedPass(result);
  };

  const copyPassword = () => {
    if (!generatedPass) return;
    navigator.clipboard.writeText(generatedPass);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 select-none">
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl text-neutral-100 text-xs">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
          <div>
            <h3 className="font-semibold text-base text-white">Browser Extensions</h3>
            <p className="text-[11px] text-neutral-400">Manage security filters, aesthetics, and privacy tools</p>
          </div>
          <button onClick={onClose} className="text-neutral-400 hover:text-white p-1">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Extensions List */}
        <div className="py-4 space-y-3">
          {extensions.map((ext) => (
            <div
              key={ext.id}
              className="p-3.5 bg-neutral-950/70 border border-neutral-800 rounded-xl flex items-start justify-between gap-4"
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-sky-400 shrink-0">
                  {ext.icon === 'Shield' && <Shield className="w-4 h-4 text-emerald-400" />}
                  {ext.icon === 'Moon' && <Moon className="w-4 h-4 text-violet-400" />}
                  {ext.icon === 'KeyRound' && <KeyRound className="w-4 h-4 text-amber-400" />}
                  {ext.icon === 'Code2' && <Code2 className="w-4 h-4 text-sky-400" />}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-white text-xs">{ext.name}</span>
                    {ext.badge && (
                      <span className="text-[10px] text-neutral-400 px-1.5 py-0.5 rounded bg-neutral-800">
                        {ext.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-neutral-400 mt-0.5 leading-relaxed">
                    {ext.description}
                  </p>
                </div>
              </div>

              {/* Toggle switch */}
              <button
                onClick={() => onToggleExtension(ext.id)}
                aria-label={`Toggle ${ext.name}`}
                className={`w-10 h-5 flex items-center rounded-full p-0.5 transition-colors shrink-0 ${
                  ext.enabled ? 'bg-sky-500 justify-end' : 'bg-neutral-800 justify-start'
                }`}
              >
                <div className="w-4 h-4 rounded-full bg-white shadow-md transition-transform" />
              </button>
            </div>
          ))}

          {/* Quick Password Generator Tool in KeyVault */}
          <div className="p-3.5 bg-neutral-950/90 border border-neutral-800/80 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-white text-xs flex items-center gap-1.5">
                <KeyRound className="w-3.5 h-3.5 text-amber-400" />
                <span>Password Generator</span>
              </span>
              <button
                onClick={generateStrongPassword}
                className="text-[11px] text-sky-400 hover:text-sky-300 flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Generate</span>
              </button>
            </div>

            {generatedPass ? (
              <div className="flex items-center justify-between bg-neutral-900 px-3 py-2 rounded-lg border border-neutral-800 font-mono text-xs">
                <span className="text-emerald-400 font-medium select-all">{generatedPass}</span>
                <button
                  onClick={copyPassword}
                  className="p-1 hover:text-white text-neutral-400"
                  title="Copy password"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            ) : (
              <div className="text-[11px] text-neutral-500 italic">
                Click "Generate" to craft a cryptographically secure 18-character key.
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-neutral-800 text-right">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
