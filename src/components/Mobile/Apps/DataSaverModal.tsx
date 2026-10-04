import React, { useState } from 'react';
import {
  X,
  Gauge,
  Zap,
  TrendingDown,
  Layers,
  Image,
  Wifi,
  CheckCircle,
  ToggleLeft,
  ToggleRight,
  ShieldAlert,
} from 'lucide-react';

interface DataSaverModalProps {
  isOpen: boolean;
  onClose: () => void;
  isEnabled: boolean;
  onToggle: (enabled: boolean) => void;
}

export const DataSaverModal: React.FC<DataSaverModalProps> = ({
  isOpen,
  onClose,
  isEnabled,
  onToggle,
}) => {
  const [compressImages, setCompressImages] = useState(true);
  const [blockWebFonts, setBlockWebFonts] = useState(true);
  const [textOnlyMode, setTextOnlyMode] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 select-none animate-in fade-in">
      <div className="bg-white text-neutral-900 rounded-t-3xl sm:rounded-3xl max-w-sm w-full p-5 shadow-2xl flex flex-col border-t sm:border border-neutral-100">
        <div className="w-10 h-1 bg-neutral-300 rounded-full mx-auto mb-3 sm:hidden" />

        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-bold shadow-xs">
              <Gauge className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-neutral-900 leading-tight">Data Saver Mode</h3>
              <p className="text-[11px] text-neutral-500 font-medium">
                Transsion Ultra Compression Engine
              </p>
            </div>
          </div>

          <button onClick={onClose} className="p-1.5 text-neutral-400 hover:text-neutral-700 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Master Switch Banner */}
        <div
          onClick={() => onToggle(!isEnabled)}
          className={`my-3 p-3.5 rounded-2xl border transition-all flex items-center justify-between cursor-pointer ${
            isEnabled
              ? 'bg-amber-50 border-amber-300/80 text-amber-950'
              : 'bg-neutral-100 border-neutral-200 text-neutral-600'
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                isEnabled ? 'bg-amber-500 text-white' : 'bg-neutral-300 text-neutral-600'
              }`}
            >
              <Zap className="w-5 h-5 fill-current" />
            </div>
            <div>
              <div className="text-xs font-bold leading-tight">
                Data Saver is {isEnabled ? 'Active' : 'Disabled'}
              </div>
              <div className="text-[10px] text-neutral-500">
                {isEnabled ? 'Compressing web pages & images' : 'Standard full-resolution browsing'}
              </div>
            </div>
          </div>

          <button className="text-2xl text-amber-600">
            {isEnabled ? (
              <ToggleRight className="w-8 h-8 fill-amber-500 text-amber-500" />
            ) : (
              <ToggleLeft className="w-8 h-8 text-neutral-400" />
            )}
          </button>
        </div>

        {/* Live Data Savings Metrics */}
        <div className="grid grid-cols-3 gap-2 mb-3 text-center">
          <div className="bg-neutral-50 border border-neutral-200/80 rounded-2xl p-2.5">
            <div className="text-[10px] text-neutral-400 font-bold uppercase">Saved</div>
            <div className="text-sm font-bold text-amber-600 font-mono mt-0.5">142.6 MB</div>
            <div className="text-[9px] text-neutral-400">Total data saved</div>
          </div>

          <div className="bg-neutral-50 border border-neutral-200/80 rounded-2xl p-2.5">
            <div className="text-[10px] text-neutral-400 font-bold uppercase">Reduction</div>
            <div className="text-sm font-bold text-emerald-600 font-mono mt-0.5">68%</div>
            <div className="text-[9px] text-neutral-400">Bandwidth saved</div>
          </div>

          <div className="bg-neutral-50 border border-neutral-200/80 rounded-2xl p-2.5">
            <div className="text-[10px] text-neutral-400 font-bold uppercase">Speed</div>
            <div className="text-sm font-bold text-blue-600 font-mono mt-0.5">2.4x</div>
            <div className="text-[9px] text-neutral-400">Faster load time</div>
          </div>
        </div>

        {/* Compression Options */}
        <div className="space-y-2 mb-3">
          <div className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider px-1">
            Compression Rules
          </div>

          <div className="bg-neutral-50 border border-neutral-200/80 rounded-2xl p-3 space-y-2.5 text-xs">
            {/* Rule 1 */}
            <div
              onClick={() => setCompressImages(!compressImages)}
              className="flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Image className="w-4 h-4 text-neutral-500" />
                <span className="text-neutral-800 font-medium">Compress images to WebP</span>
              </div>
              <div
                className={`w-4 h-4 rounded border flex items-center justify-center ${
                  compressImages ? 'bg-amber-500 border-amber-500 text-white' : 'border-neutral-300'
                }`}
              >
                {compressImages && <CheckCircle className="w-3 h-3 stroke-[3]" />}
              </div>
            </div>

            {/* Rule 2 */}
            <div
              onClick={() => setBlockWebFonts(!blockWebFonts)}
              className="flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-neutral-500" />
                <span className="text-neutral-800 font-medium">Defer web fonts & heavy styles</span>
              </div>
              <div
                className={`w-4 h-4 rounded border flex items-center justify-center ${
                  blockWebFonts ? 'bg-amber-500 border-amber-500 text-white' : 'border-neutral-300'
                }`}
              >
                {blockWebFonts && <CheckCircle className="w-3 h-3 stroke-[3]" />}
              </div>
            </div>

            {/* Rule 3 */}
            <div
              onClick={() => setTextOnlyMode(!textOnlyMode)}
              className="flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Wifi className="w-4 h-4 text-neutral-500" />
                <span className="text-neutral-800 font-medium">Extreme 2G/3G Text-Only</span>
              </div>
              <div
                className={`w-4 h-4 rounded border flex items-center justify-center ${
                  textOnlyMode ? 'bg-amber-500 border-amber-500 text-white' : 'border-neutral-300'
                }`}
              >
                {textOnlyMode && <CheckCircle className="w-3 h-3 stroke-[3]" />}
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs"
        >
          Done
        </button>
      </div>
    </div>
  );
};
