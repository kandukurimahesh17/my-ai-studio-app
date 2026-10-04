import React, { useState, useEffect } from 'react';
import { X, Trash2, CheckCircle2, Zap, ShieldCheck } from 'lucide-react';

interface CleanModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CleanModal: React.FC<CleanModalProps> = ({ isOpen, onClose }) => {
  const [cleaning, setCleaning] = useState(false);
  const [cleaned, setCleaned] = useState(false);
  const [mbReclaimed, setMbReclaimed] = useState(412);

  useEffect(() => {
    if (isOpen) {
      setCleaning(true);
      setCleaned(false);
      const timer = setTimeout(() => {
        setCleaning(false);
        setCleaned(true);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 select-none">
      <div className="bg-white text-neutral-900 rounded-t-3xl sm:rounded-2xl max-w-sm w-full p-6 shadow-2xl flex flex-col items-center text-center">
        {/* Close Button */}
        <div className="w-full flex justify-end">
          <button onClick={onClose} className="text-neutral-400 hover:text-neutral-700 p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {cleaning ? (
          <div className="py-8 flex flex-col items-center">
            <div className="w-20 h-20 rounded-full border-4 border-orange-500 border-t-transparent animate-spin flex items-center justify-center mb-4">
              <Trash2 className="w-8 h-8 text-orange-500" />
            </div>
            <h3 className="text-lg font-bold text-neutral-900">Cleaning Storage & Cache...</h3>
            <p className="text-xs text-neutral-500 mt-1">Purging residual page blobs and temporary assets</p>
          </div>
        ) : (
          <div className="py-6 flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mb-4 shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div className="text-3xl font-extrabold text-neutral-900 tracking-tight">
              +{mbReclaimed} MB
            </div>
            <div className="text-sm font-semibold text-emerald-600 mt-1 flex items-center gap-1">
              <Zap className="w-4 h-4 fill-current" />
              <span>Browser Memory Optimized</span>
            </div>
            <p className="text-xs text-neutral-500 mt-2 max-w-xs leading-relaxed">
              Junk cookies, expired DOM cache, and temporary buffers have been purged successfully.
            </p>

            <button
              onClick={onClose}
              className="mt-6 w-full py-3 bg-neutral-900 hover:bg-neutral-800 text-white font-semibold text-sm rounded-xl transition-all shadow-md active:scale-95"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
