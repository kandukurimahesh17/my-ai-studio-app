import React, { useState } from 'react';
import {
  User,
  ShieldCheck,
  Bookmark,
  Download,
  History,
  Settings,
  Moon,
  Shield,
  Trash2,
  HelpCircle,
  ChevronRight,
  Sparkles,
  Lock,
  Cloud,
  Check,
  ExternalLink,
  Smartphone,
  Info,
  Wrench,
  Home,
  QrCode,
} from 'lucide-react';

interface MeScreenProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenHome?: () => void;
  onOpenTools?: () => void;
  onOpenScan?: () => void;
  onOpenBookmarks?: () => void;
  onOpenDownloads?: () => void;
  onOpenHistory?: () => void;
  onOpenSettings?: () => void;
  onOpenClean?: () => void;
}

export const MeScreen: React.FC<MeScreenProps> = ({
  isOpen,
  onClose,
  onOpenHome,
  onOpenTools,
  onOpenScan,
  onOpenBookmarks,
  onOpenDownloads,
  onOpenHistory,
  onOpenSettings,
  onOpenClean,
}) => {
  const [cloudSyncEnabled, setCloudSyncEnabled] = useState(true);
  const [adBlockEnabled, setAdBlockEnabled] = useState(true);
  const [biometricsEnabled, setBiometricsEnabled] = useState(true);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#F3ECE2] text-[#1F1D1A] flex flex-col font-sans select-none animate-in fade-in duration-150 overflow-hidden">
      {/* 1. Android Status Bar (Themed) */}
      <div className="w-full h-8 px-6 pt-1 flex items-center justify-between text-[#1F1D1A] text-xs font-semibold shrink-0 bg-[#F3ECE2]">
        <div className="flex items-center gap-2">
          <span className="text-[13px] font-bold tracking-tight">19:02</span>
          <div className="w-1.5 h-1.5 rounded-full bg-[#E53935]" />
          <div className="w-3 h-3 rounded-full bg-emerald-500 flex items-center justify-center text-[7px] text-white">
            <svg viewBox="0 0 24 24" className="w-2 h-2 fill-current">
              <path d="M12 2C6.48 2 2 6.48 2 12c0 1.89.52 3.66 1.44 5.17L2 22l4.98-1.35A9.96 9.96 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2z" />
            </svg>
          </div>
          <div className="w-1.5 h-1.5 rounded-full bg-[#1A73E8]" />
        </div>

        <div className="flex items-center gap-1.5 text-[#1F1D1A]">
          <div className="flex items-end gap-0.5 h-3">
            <div className="w-0.5 h-1 bg-[#1F1D1A] rounded-xs" />
            <div className="w-0.5 h-1.5 bg-[#1F1D1A] rounded-xs" />
            <div className="w-0.5 h-2 bg-[#1F1D1A] rounded-xs" />
            <div className="w-0.5 h-2.5 bg-[#1F1D1A] rounded-xs" />
          </div>
          <svg className="w-3.5 h-3.5 fill-[#1F1D1A]" viewBox="0 0 24 24">
            <path d="M12 4C7.31 4 3.07 5.9 0 8.98L12 21 24 8.98C20.93 5.9 16.69 4 12 4z" />
          </svg>
          <div className="flex items-center border border-[#6B645D] rounded-md px-1 py-0.2 text-[9px] font-bold font-mono ml-0.5 bg-white/60">
            <span>17</span>
          </div>
        </div>
      </div>

      {/* 2. Top Bar */}
      <div className="w-full px-5 py-3 flex items-center justify-between shrink-0 bg-[#F3ECE2] border-b border-[#E5DFD5]">
        <h1 className="text-xl font-bold tracking-tight text-[#1F1D1A]">Me</h1>
        <button
          onClick={onOpenSettings}
          className="p-2 rounded-full hover:bg-black/5 active:scale-90 transition-transform text-[#1F1D1A]"
          title="Settings"
        >
          <Settings className="w-5 h-5 stroke-[2]" />
        </button>
      </div>

      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-12 left-1/2 -translate-x-1/2 z-50 px-4 py-2 bg-[#1F1D1A]/95 text-white text-xs font-semibold rounded-2xl shadow-xl animate-in fade-in duration-150">
          {toastMsg}
        </div>
      )}

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-none pb-24">
        {/* CARD 1: User Profile Header */}
        <div className="bg-white rounded-[24px] p-5 shadow-xs border border-[#E5DFD5] flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#1A73E8] to-[#4285F4] text-white flex items-center justify-center font-bold text-2xl shadow-sm shrink-0 border-2 border-white">
            M
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-[#1F1D1A] truncate">Mahesh Kandukuri</h2>
              <span className="px-2 py-0.5 bg-[#E53935]/10 text-[#E53935] text-[10px] font-bold rounded-full border border-[#E53935]/20">
                PRO
              </span>
            </div>
            <p className="text-xs text-[#6B645D] truncate mt-0.5">kandukurimahesh17@gmail.com</p>
            <div className="flex items-center gap-1.5 mt-2 text-[11px] text-emerald-600 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Google Account Active</span>
            </div>
          </div>
        </div>

        {/* CARD 2: Quick Metrics Row (Bookmarks, Downloads, History) */}
        <div className="grid grid-cols-3 gap-3">
          <button
            onClick={() => {
              onClose();
              onOpenBookmarks?.();
            }}
            className="bg-white rounded-[20px] p-3.5 border border-[#E5DFD5] shadow-xs flex flex-col items-center justify-center group active:scale-95 transition-all hover:bg-[#FAF7F2]"
          >
            <div className="w-10 h-10 rounded-full bg-[#1A73E8]/10 text-[#1A73E8] flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <Bookmark className="w-5 h-5 fill-current" />
            </div>
            <span className="text-sm font-bold text-[#1F1D1A]">12</span>
            <span className="text-[11px] font-medium text-[#6B645D]">Bookmarks</span>
          </button>

          <button
            onClick={() => {
              onClose();
              onOpenDownloads?.();
            }}
            className="bg-white rounded-[20px] p-3.5 border border-[#E5DFD5] shadow-xs flex flex-col items-center justify-center group active:scale-95 transition-all hover:bg-[#FAF7F2]"
          >
            <div className="w-10 h-10 rounded-full bg-[#E53935]/10 text-[#E53935] flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <Download className="w-5 h-5 stroke-[2.2]" />
            </div>
            <span className="text-sm font-bold text-[#1F1D1A]">24</span>
            <span className="text-[11px] font-medium text-[#6B645D]">Downloads</span>
          </button>

          <button
            onClick={() => {
              onClose();
              onOpenHistory?.();
            }}
            className="bg-white rounded-[20px] p-3.5 border border-[#E5DFD5] shadow-xs flex flex-col items-center justify-center group active:scale-95 transition-all hover:bg-[#FAF7F2]"
          >
            <div className="w-10 h-10 rounded-full bg-[#FBBC05]/15 text-[#B78103] flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <History className="w-5 h-5 stroke-[2.2]" />
            </div>
            <span className="text-sm font-bold text-[#1F1D1A]">89</span>
            <span className="text-[11px] font-medium text-[#6B645D]">History</span>
          </button>
        </div>

        {/* CARD 3: Account & Sync Services */}
        <div className="bg-white rounded-[24px] p-4 shadow-xs border border-[#E5DFD5] space-y-1">
          <div className="px-2 py-1 text-xs font-bold uppercase tracking-wider text-[#6B645D] mb-1">
            Account & Security
          </div>

          <div className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#FAF7F2] transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#1A73E8]/10 text-[#1A73E8] flex items-center justify-center">
                <Cloud className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#1F1D1A]">Google Cloud Sync</h4>
                <p className="text-[10px] text-[#6B645D]">Sync tabs, history & bookmarks</p>
              </div>
            </div>
            <button
              onClick={() => {
                setCloudSyncEnabled(!cloudSyncEnabled);
                showToast(cloudSyncEnabled ? 'Sync paused' : 'Sync enabled');
              }}
              className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                cloudSyncEnabled ? 'bg-[#1A73E8]' : 'bg-[#D8CFBF]'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-xs transition-transform ${
                  cloudSyncEnabled ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#FAF7F2] transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#34A853]/10 text-[#34A853] flex items-center justify-center">
                <Lock className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#1F1D1A]">Biometric App Lock</h4>
                <p className="text-[10px] text-[#6B645D]">Require Fingerprint or FaceID</p>
              </div>
            </div>
            <button
              onClick={() => {
                setBiometricsEnabled(!biometricsEnabled);
                showToast(biometricsEnabled ? 'Biometrics disabled' : 'Biometrics enabled');
              }}
              className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                biometricsEnabled ? 'bg-[#1A73E8]' : 'bg-[#D8CFBF]'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-xs transition-transform ${
                  biometricsEnabled ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#FAF7F2] transition-colors cursor-pointer"
            onClick={() => {
              showToast('AdBlock Engine: Active (99.8% protected)');
            }}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#E53935]/10 text-[#E53935] flex items-center justify-center">
                <Shield className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#1F1D1A]">AdBlock & Privacy Engine</h4>
                <p className="text-[10px] text-[#6B645D]">Blocks ads, trackers & phishing</p>
              </div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setAdBlockEnabled(!adBlockEnabled);
                showToast(adBlockEnabled ? 'AdBlock paused' : 'AdBlock active');
              }}
              className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                adBlockEnabled ? 'bg-[#E53935]' : 'bg-[#D8CFBF]'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-xs transition-transform ${
                  adBlockEnabled ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* CARD 4: Storage & Maintenance */}
        <div className="bg-white rounded-[24px] p-4 shadow-xs border border-[#E5DFD5] space-y-1">
          <div className="px-2 py-1 text-xs font-bold uppercase tracking-wider text-[#6B645D] mb-1">
            Storage & Maintenance
          </div>

          <button
            onClick={() => {
              onClose();
              onOpenClean?.();
            }}
            className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-[#FAF7F2] transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#FBBC05]/15 text-[#B78103] flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#1F1D1A]">Storage Cleaner</h4>
                <p className="text-[10px] text-[#6B645D]">Scan & clean 1.34 GB junk</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-[#6B645D]" />
          </button>

          <button
            onClick={() => showToast('Browser cache cleared (312 MB freed)')}
            className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-[#FAF7F2] transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#E53935]/10 text-[#E53935] flex items-center justify-center">
                <Trash2 className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#1F1D1A]">Clear Browsing Cache</h4>
                <p className="text-[10px] text-[#6B645D]">Cookies, cache & site data</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-[#6B645D]" />
          </button>
        </div>

        {/* CARD 5: About App & Support */}
        <div className="bg-white rounded-[24px] p-4 shadow-xs border border-[#E5DFD5] space-y-1">
          <div className="px-2 py-1 text-xs font-bold uppercase tracking-wider text-[#6B645D] mb-1">
            About Browser
          </div>

          <button
            onClick={() => showToast('Browser is up to date: v4.2.0 (2026.10)')}
            className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-[#FAF7F2] transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#1F1D1A]/5 text-[#1F1D1A] flex items-center justify-center">
                <Info className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#1F1D1A]">Lemon Browser v4.2.0</h4>
                <p className="text-[10px] text-[#6B645D]">Latest Material You Build 2026.10</p>
              </div>
            </div>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              Latest
            </span>
          </button>
        </div>
      </div>

      {/* 4. Bottom Navigation Bar (Home | Tools | Me) */}
      <footer className="w-full h-15 bg-white border-t border-[#E5DFD5] flex items-center justify-around px-2 z-40 select-none shadow-xs shrink-0">
        {/* Home */}
        <button
          onClick={() => {
            onClose();
            onOpenHome?.();
          }}
          className="flex flex-col items-center justify-center flex-1 h-full text-[#6B645D] hover:text-[#1F1D1A] active:scale-95 transition-transform"
        >
          <Home className="w-6 h-6 stroke-[1.8]" />
          <span className="text-[11px] font-medium mt-1 tracking-tight">Home</span>
        </button>

        {/* Tools */}
        <button
          onClick={() => {
            onClose();
            onOpenTools?.();
          }}
          className="flex flex-col items-center justify-center flex-1 h-full text-[#6B645D] hover:text-[#1F1D1A] active:scale-95 transition-transform"
        >
          <div className="relative flex items-center justify-center">
            <svg className="w-6 h-6 fill-none stroke-[#6B645D]" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.8"
                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
              />
            </svg>
            <Wrench className="w-2.5 h-2.5 text-[#6B645D] absolute inset-0 m-auto" />
          </div>
          <span className="text-[11px] font-medium mt-1 tracking-tight text-[#6B645D]">
            Tools
          </span>
        </button>

        {/* Scan */}
        <button
          onClick={() => {
            onClose();
            onOpenScan?.();
          }}
          className="flex flex-col items-center justify-center flex-1 h-full text-[#6B645D] hover:text-[#1F1D1A] active:scale-95 transition-transform"
          title="QR Scanner"
        >
          <QrCode className="w-6 h-6 stroke-[1.8]" />
          <span className="text-[11px] font-medium mt-1 tracking-tight">Scan</span>
        </button>

        {/* Me (Active with Blue Highlight) */}
        <button
          className="flex flex-col items-center justify-center flex-1 h-full text-[#1A73E8] active:scale-95 transition-transform"
        >
          <User className="w-6 h-6 stroke-[2.2] text-[#1A73E8]" />
          <span className="text-[11px] font-bold mt-1 tracking-tight text-[#1A73E8]">Me</span>
        </button>
      </footer>

      {/* 5. Android Bottom 3-Button Navigation Bar (|||  ▢  ◁) */}
      <div className="w-full h-11 bg-[#F3ECE2] border-t border-[#E5DFD5] flex items-center justify-around text-[#6B645D] select-none shrink-0 px-8">
        <button onClick={onClose} className="p-2 hover:text-[#1F1D1A] active:scale-90" title="Recent Apps">
          <div className="flex items-center gap-[3px]">
            <div className="w-[2px] h-3.5 bg-[#6B645D] rounded-full" />
            <div className="w-[2px] h-3.5 bg-[#6B645D] rounded-full" />
            <div className="w-[2px] h-3.5 bg-[#6B645D] rounded-full" />
          </div>
        </button>
        <button onClick={onClose} className="p-2 hover:text-[#1F1D1A] active:scale-90" title="Home">
          <div className="w-3.5 h-3.5 border-2 border-[#6B645D] rounded-[4px]" />
        </button>
        <button onClick={onClose} className="p-2 hover:text-[#1F1D1A] active:scale-90" title="Back">
          <svg className="w-4 h-4 fill-[#6B645D]" viewBox="0 0 24 24">
            <polygon points="18,5 6,12 18,19" />
          </svg>
        </button>
      </div>
    </div>
  );
};
