import React, { useState } from 'react';
import { X, ShieldAlert, Flag, Ban, CheckCircle, AlertTriangle } from 'lucide-react';

interface ReportSiteModalProps {
  isOpen: boolean;
  onClose: () => void;
  siteUrl: string;
  siteTitle: string;
  onBlockDomain?: (domain: string) => void;
}

export const ReportSiteModal: React.FC<ReportSiteModalProps> = ({
  isOpen,
  onClose,
  siteUrl,
  siteTitle,
  onBlockDomain,
}) => {
  const [reason, setReason] = useState<'phishing' | 'malware' | 'adult' | 'harassment' | 'other'>('phishing');
  const [details, setDetails] = useState('');
  const [isBlocked, setIsBlocked] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  let domain = 'current-page';
  try {
    domain = new URL(siteUrl).hostname;
  } catch {
    domain = siteUrl;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isBlocked && onBlockDomain) {
      onBlockDomain(domain);
    }
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-60 bg-black/75 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 select-none animate-in fade-in">
      <div className="bg-white text-neutral-900 rounded-t-3xl sm:rounded-3xl max-w-sm w-full p-5 shadow-2xl flex flex-col border-t sm:border border-neutral-100">
        <div className="w-10 h-1 bg-neutral-300 rounded-full mx-auto mb-3 sm:hidden" />

        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-rose-500 text-white flex items-center justify-center font-bold shadow-xs">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-neutral-900 leading-tight">
                Report & Safety Center
              </h3>
              <p className="text-[11px] text-neutral-500 font-medium">
                Google Play UGC & Web Protection
              </p>
            </div>
          </div>

          <button onClick={onClose} className="p-1.5 text-neutral-400 hover:text-neutral-700 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="py-10 text-center space-y-2 animate-in zoom-in-95">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-2">
              <CheckCircle className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div className="font-bold text-sm text-neutral-900">Report Received</div>
            <p className="text-xs text-neutral-500 px-6">
              Thank you for keeping Lemon Browser safe. Our automated safety engine has flagged {domain}.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3.5 mt-3">
            {/* Target URL Info */}
            <div className="bg-neutral-50 border border-neutral-200/80 rounded-2xl p-2.5 flex items-center gap-2.5 text-xs text-neutral-700">
              <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
              <div className="min-w-0 flex-1 truncate">
                <div className="font-bold truncate">{siteTitle || 'Reported Page'}</div>
                <div className="text-[10px] text-neutral-400 font-mono truncate">{siteUrl}</div>
              </div>
            </div>

            {/* Reason selector */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider px-1">
                Report Reason
              </label>
              <div className="grid grid-cols-2 gap-1.5 text-xs">
                {[
                  { key: 'phishing', label: '🎣 Phishing / Scam' },
                  { key: 'malware', label: '⚠️ Malware / Virus' },
                  { key: 'adult', label: '🔞 Inappropriate / Adult' },
                  { key: 'harassment', label: '🛑 Harassment / Hate' },
                ].map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setReason(item.key as any)}
                    className={`py-2 px-2.5 rounded-xl border text-left font-medium transition-all ${
                      reason === item.key
                        ? 'border-rose-500 bg-rose-50 text-rose-950 font-semibold'
                        : 'border-neutral-200 bg-neutral-50 text-neutral-700'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Optional details */}
            <div>
              <textarea
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Optional details or specific offensive content..."
                rows={2}
                className="w-full bg-neutral-50 border border-neutral-200 rounded-xl p-2.5 text-xs text-neutral-900 outline-none focus:border-rose-500 resize-none"
              />
            </div>

            {/* Block domain toggle */}
            <div
              onClick={() => setIsBlocked(!isBlocked)}
              className="p-2.5 bg-neutral-100 hover:bg-neutral-200/60 rounded-xl flex items-center justify-between cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-2">
                <Ban className="w-4 h-4 text-rose-600" />
                <span className="text-xs text-neutral-800 font-medium">
                  Block {domain} on this device
                </span>
              </div>
              <input
                type="checkbox"
                checked={isBlocked}
                onChange={() => {}}
                className="rounded text-rose-600 accent-rose-600"
              />
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2 text-xs font-semibold text-neutral-600 hover:bg-neutral-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-2 bg-rose-600 hover:bg-rose-700 active:scale-95 text-white font-bold text-xs rounded-xl shadow-xs flex items-center justify-center gap-1.5"
              >
                <Flag className="w-3.5 h-3.5 fill-current" />
                <span>Submit Report</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
