import React, { useEffect, useState } from 'react';
import { EyeOff, ShieldCheck, X } from 'lucide-react';

interface IncognitoNotificationBannerProps {
  isIncognito: boolean;
  onExitIncognito: () => void;
}

export const IncognitoNotificationBanner: React.FC<IncognitoNotificationBannerProps> = ({
  isIncognito,
  onExitIncognito,
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isIncognito) {
      setVisible(true);
      const timer = setTimeout(() => setVisible(false), 4500);
      return () => clearTimeout(timer);
    } else {
      setVisible(false);
    }
  }, [isIncognito]);

  if (!isIncognito || !visible) return null;

  return (
    <div className="absolute top-10 inset-x-3 z-50 flex items-center justify-between p-3 bg-purple-950/95 backdrop-blur-md text-white rounded-2xl border border-purple-500/40 shadow-xl animate-in fade-in slide-in-from-top-3 duration-300">
      <div className="flex items-center gap-2.5 min-w-0 flex-1">
        <div className="w-8 h-8 rounded-xl bg-purple-900 text-purple-300 border border-purple-700/60 flex items-center justify-center shrink-0">
          <EyeOff className="w-4 h-4" />
        </div>
        <div className="min-w-0 flex-1">
          <span className="text-[10px] text-purple-300 uppercase font-bold tracking-wider block">
            Private Browsing Active
          </span>
          <span className="text-xs text-neutral-200 block truncate">
            No history, cookies, or form data will be saved.
          </span>
        </div>
      </div>

      <div className="flex items-center gap-1.5 shrink-0">
        <button
          onClick={onExitIncognito}
          className="px-2.5 py-1 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-[11px] font-bold shadow-xs active:scale-95 transition-transform"
        >
          Exit
        </button>
        <button
          onClick={() => setVisible(false)}
          className="p-1 text-purple-300 hover:text-white rounded-lg"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
