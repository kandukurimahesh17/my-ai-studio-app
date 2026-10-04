import React, { useState } from 'react';
import {
  ArrowLeft,
  MoreVertical,
  ChevronRight,
  Download,
  Share2,
  Check,
  CheckCircle,
  X,
  Sparkles,
  Trash2,
} from 'lucide-react';

export interface WhatsAppStatusItem {
  id: string;
  sender: string;
  avatar: string;
  type: 'image' | 'video';
  imageUrl: string;
  timeAgo: string;
  size: string;
  saved: boolean;
}

const DEFAULT_STATUS_LIST: WhatsAppStatusItem[] = [
  {
    id: 'status-1',
    sender: 'Family Wedding',
    avatar: '💍',
    type: 'image',
    imageUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=400',
    timeAgo: '2h ago',
    size: '1.2 MB',
    saved: false,
  },
  {
    id: 'status-2',
    sender: 'Temple Darshan',
    avatar: '🪔',
    type: 'image',
    imageUrl: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=400',
    timeAgo: '4h ago',
    size: '1.6 MB',
    saved: false,
  },
  {
    id: 'status-3',
    sender: 'Siddhi Tiffin Items',
    avatar: '🍛',
    type: 'image',
    imageUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=400',
    timeAgo: '6h ago',
    size: '2.1 MB',
    saved: false,
  },
];

interface WhatsAppStatusSaverModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveStatus?: (item: WhatsAppStatusItem) => void;
  onOpenFeedback?: () => void;
}

export const WhatsAppStatusSaverModal: React.FC<WhatsAppStatusSaverModalProps> = ({
  isOpen,
  onClose,
  onSaveStatus,
  onOpenFeedback,
}) => {
  // Navigation views: 'main' (Image 1), 'notifications' (Image 3)
  const [currentView, setCurrentView] = useState<'main' | 'notifications' | 'saved_list'>('main');

  // 3-dots popup menu state (Image 2)
  const [showMenu, setShowMenu] = useState(false);

  // Status items
  const [statuses, setStatuses] = useState<WhatsAppStatusItem[]>(DEFAULT_STATUS_LIST);
  const [savedStatuses, setSavedStatuses] = useState<WhatsAppStatusItem[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Selected status for full preview
  const [selectedStatus, setSelectedStatus] = useState<WhatsAppStatusItem | null>(null);

  // Notification toggles (Image 3)
  const [breakingNewsNotify, setBreakingNewsNotify] = useState(true);
  const [newsBarNotify, setNewsBarNotify] = useState(true);
  const [statusSaverNotify, setStatusSaverNotify] = useState(true);

  // Clean WhatsApp state
  const [whatsAppJunkSize, setWhatsAppJunkSize] = useState('Clean 1.5 GB');

  if (!isOpen) return null;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2400);
  };

  // Save all statuses action (Image 1)
  const handleSaveAll = () => {
    const unsaved = statuses.filter((s) => !s.saved);
    if (unsaved.length === 0) {
      showToast('All statuses are already saved! ✓');
      return;
    }

    unsaved.forEach((item) => onSaveStatus?.(item));
    setStatuses((prev) => prev.map((s) => ({ ...s, saved: true })));
    setSavedStatuses((prev) => [...prev, ...unsaved]);
    showToast(`Saved ${unsaved.length} statuses to File Manager! 🎉`);
  };

  // Save single status
  const handleSaveSingle = (item: WhatsAppStatusItem) => {
    if (item.saved) return;
    onSaveStatus?.(item);
    setStatuses((prev) => prev.map((s) => (s.id === item.id ? { ...s, saved: true } : s)));
    setSavedStatuses((prev) => [...prev, item]);
    showToast(`Saved status to File Manager! ✓`);
  };

  // Clean WhatsApp Junk
  const handleCleanWhatsApp = () => {
    if (whatsAppJunkSize === 'Cleaned ✓') {
      showToast('WhatsApp cache is already clean!');
      return;
    }
    setWhatsAppJunkSize('Cleaning...');
    setTimeout(() => {
      setWhatsAppJunkSize('Cleaned ✓');
      showToast('Freed 1.5 GB of temporary WhatsApp cached files! 🚀');
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-[80] bg-[#F7F8FA] flex flex-col font-sans select-none overflow-hidden animate-in fade-in duration-150">
      {/* ============================================================== */}
      {/* VIEW 1: NOTIFICATIONS SCREEN (Pixel-matched to Image-3)         */}
      {/* ============================================================== */}
      {currentView === 'notifications' && (
        <div className="flex-1 flex flex-col bg-white overflow-y-auto">
          {/* Top Bar */}
          <header className="w-full h-14 bg-white border-b border-neutral-150 px-3 flex items-center justify-between shrink-0">
            <button
              type="button"
              onClick={() => setCurrentView('main')}
              className="w-10 h-10 rounded-full flex items-center justify-center text-neutral-800 hover:bg-neutral-100 active:scale-90 transition-all cursor-pointer"
              title="Back"
            >
              <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
            </button>
            <h1 className="text-base font-bold text-neutral-900">Notifications</h1>
            <div className="w-10" />
          </header>

          {/* List of Notification Settings */}
          <div className="px-4 py-4 space-y-6 flex-1">
            {/* 1. Breaking news */}
            <div className="flex items-start justify-between gap-4 pb-5 border-b border-neutral-100">
              <div className="flex-1 pr-2">
                <h3 className="text-[15px] font-semibold text-neutral-900 mb-1">Breaking news</h3>
                <p className="text-[12px] text-neutral-400 leading-relaxed font-normal">
                  Turn on push notifications to receive breaking news, top stories and local headlines. Turn off this button if you don't want news alerts on your notification center.
                </p>
              </div>

              {/* Toggle Switch */}
              <button
                type="button"
                onClick={() => setBreakingNewsNotify(!breakingNewsNotify)}
                className={`w-12 h-6.5 rounded-full p-0.5 transition-colors duration-200 ease-in-out cursor-pointer shrink-0 mt-0.5 ${
                  breakingNewsNotify ? 'bg-[#3F51B5]' : 'bg-neutral-300'
                }`}
              >
                <div
                  className={`w-5.5 h-5.5 rounded-full bg-white shadow-md transform transition-transform duration-200 ease-in-out ${
                    breakingNewsNotify ? 'translate-x-5.5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* 2. News bar */}
            <div className="flex items-start justify-between gap-4 pb-5 border-b border-neutral-100">
              <div className="flex-1 pr-2">
                <h3 className="text-[15px] font-semibold text-neutral-900 mb-1">News bar</h3>
                <p className="text-[12px] text-neutral-400 leading-relaxed font-normal">
                  Turn on news bar, make sure you never miss any important news.
                </p>
              </div>

              {/* Toggle Switch */}
              <button
                type="button"
                onClick={() => setNewsBarNotify(!newsBarNotify)}
                className={`w-12 h-6.5 rounded-full p-0.5 transition-colors duration-200 ease-in-out cursor-pointer shrink-0 mt-0.5 ${
                  newsBarNotify ? 'bg-[#3F51B5]' : 'bg-neutral-300'
                }`}
              >
                <div
                  className={`w-5.5 h-5.5 rounded-full bg-white shadow-md transform transition-transform duration-200 ease-in-out ${
                    newsBarNotify ? 'translate-x-5.5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* 3. Status saver */}
            <div className="flex items-start justify-between gap-4 pb-5">
              <div className="flex-1 pr-2">
                <h3 className="text-[15px] font-semibold text-neutral-900 mb-1">Status saver</h3>
                <p className="text-[12px] text-neutral-400 leading-relaxed font-normal">
                  Enable WhatsApp Status notifications, you won't miss friend's status updates.
                </p>
              </div>

              {/* Toggle Switch */}
              <button
                type="button"
                onClick={() => setStatusSaverNotify(!statusSaverNotify)}
                className={`w-12 h-6.5 rounded-full p-0.5 transition-colors duration-200 ease-in-out cursor-pointer shrink-0 mt-0.5 ${
                  statusSaverNotify ? 'bg-[#3F51B5]' : 'bg-neutral-300'
                }`}
              >
                <div
                  className={`w-5.5 h-5.5 rounded-full bg-white shadow-md transform transition-transform duration-200 ease-in-out ${
                    statusSaverNotify ? 'translate-x-5.5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* VIEW 2: SAVED STATUSES LIST VIEW                               */}
      {/* ============================================================== */}
      {currentView === 'saved_list' && (
        <div className="flex-1 flex flex-col bg-white overflow-y-auto">
          <header className="w-full h-14 bg-white border-b border-neutral-150 px-3 flex items-center justify-between shrink-0">
            <button
              type="button"
              onClick={() => setCurrentView('main')}
              className="w-10 h-10 rounded-full flex items-center justify-center text-neutral-800 hover:bg-neutral-100 active:scale-90 transition-all cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
            </button>
            <h1 className="text-base font-bold text-neutral-900">Saved Statuses</h1>
            <div className="w-10" />
          </header>

          <div className="p-4 flex-1">
            {savedStatuses.length === 0 ? (
              <div className="h-64 flex flex-col items-center justify-center text-neutral-400">
                <span className="text-4xl mb-2">📁</span>
                <p className="text-sm font-medium">No saved statuses yet</p>
                <p className="text-xs text-neutral-400 mt-1">Tap "Save all" on the main screen to save them.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {savedStatuses.map((s) => (
                  <div
                    key={s.id}
                    onClick={() => setSelectedStatus(s)}
                    className="relative rounded-2xl overflow-hidden shadow-xs border border-neutral-200 aspect-square group cursor-pointer"
                  >
                    <img src={s.imageUrl} alt={s.sender} className="w-full h-full object-cover group-hover:scale-105 transition-all" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-2.5">
                      <span className="text-xs font-semibold text-white truncate">{s.sender}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* VIEW 3: MAIN STATUS SAVER SCREEN (Pixel-matched to Image-1 & 2) */}
      {/* ============================================================== */}
      {currentView === 'main' && (
        <div className="flex-1 flex flex-col bg-white overflow-y-auto relative">
          {/* 1. EMERALD GREEN HERO SECTION (Image 1) */}
          <div className="w-full bg-[#00A884] text-white pt-2 pb-6 px-4 shrink-0 relative flex flex-col">
            {/* Header: Back button, Title, 3-dots */}
            <div className="w-full h-12 flex items-center justify-between relative mb-2">
              <button
                type="button"
                onClick={onClose}
                className="w-10 h-10 rounded-full flex items-center justify-center text-white hover:bg-white/10 active:scale-90 transition-all cursor-pointer"
                title="Back"
              >
                <ArrowLeft className="w-6 h-6 stroke-[2.2]" />
              </button>

              <h1 className="text-lg font-bold text-white tracking-wide">Status saver</h1>

              <button
                type="button"
                onClick={() => setShowMenu((prev) => !prev)}
                className="w-10 h-10 rounded-full flex items-center justify-center text-white hover:bg-white/10 active:scale-90 transition-all cursor-pointer relative"
                title="Options"
              >
                <MoreVertical className="w-5 h-5 stroke-[2.2]" />
              </button>

              {/* ====================================================== */}
              {/* 3-DOTS DROPDOWN MENU (Pixel-matched to Image-2)        */}
              {/* ====================================================== */}
              {showMenu && (
                <>
                  {/* Backdrop to close menu on outside tap */}
                  <div
                    onClick={() => setShowMenu(false)}
                    className="fixed inset-0 z-40"
                  />

                  <div className="absolute right-1 top-12 z-50 bg-white rounded-2xl shadow-2xl border border-neutral-100 py-2 min-w-[200px] text-neutral-900 animate-in fade-in zoom-in-95 duration-100">
                    <button
                      type="button"
                      onClick={() => {
                        setShowMenu(false);
                        setCurrentView('notifications');
                      }}
                      className="w-full px-4 py-3 text-left text-[14px] font-medium text-neutral-800 hover:bg-neutral-50 active:bg-neutral-100 flex items-center justify-between cursor-pointer"
                    >
                      <span>Status notification</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setShowMenu(false);
                        if (onOpenFeedback) {
                          onOpenFeedback();
                        } else {
                          showToast('Opening Feedback...');
                        }
                      }}
                      className="w-full px-4 py-3 text-left text-[14px] font-medium text-neutral-800 hover:bg-neutral-50 active:bg-neutral-100 flex items-center justify-between cursor-pointer"
                    >
                      <span>Feedback</span>
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Unsaved Status Heading */}
            <div className="text-center px-4 mt-2">
              <h2 className="text-lg sm:text-xl font-bold text-white leading-tight">
                You have {statuses.filter((s) => !s.saved).length || 3} unsaved Status
              </h2>
              <p className="text-[12px] sm:text-[13px] text-white/90 leading-relaxed font-normal mt-1.5 max-w-xs mx-auto">
                If not saved, the status will automatically disappear after 24 hours and cannot be viewed again.
              </p>
            </div>

            {/* 3 Status Thumbnails Side-by-Side (Image 1) */}
            <div className="flex items-center justify-center gap-3 my-5">
              {statuses.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedStatus(item)}
                  className="w-22 h-22 sm:w-24 sm:h-24 rounded-lg overflow-hidden border border-white/40 shadow-md relative group cursor-pointer active:scale-95 transition-transform bg-neutral-800"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.sender}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                  {item.saved && (
                    <div className="absolute top-1 right-1 w-5 h-5 rounded-full bg-[#00A884] text-white flex items-center justify-center shadow-xs">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* "Save all" Button (Image 1) */}
            <div className="w-full flex justify-center mt-1">
              <button
                type="button"
                onClick={handleSaveAll}
                className="w-full max-w-[290px] sm:max-w-xs py-3.5 bg-white text-[#00A884] font-bold text-base rounded-full shadow-lg text-center hover:bg-neutral-50 active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Save all</span>
              </button>
            </div>
          </div>

          {/* 2. WHITE CONTENT LIST (Pixel-matched to Image-1) */}
          <div className="flex-1 flex flex-col bg-white">
            {/* Row 1: Status within 24 hours */}
            <div
              onClick={() => {
                if (statuses.length > 0) setSelectedStatus(statuses[0]);
              }}
              className="w-full px-4 py-4 flex items-center justify-between border-b border-neutral-100 hover:bg-neutral-50/80 active:bg-neutral-100 cursor-pointer transition-colors"
            >
              <span className="text-[14px] sm:text-[15px] font-semibold text-[#1F1D1A]">
                Status within 24 hours
              </span>

              <div className="flex items-center gap-2">
                {/* 3 Overlapping Avatar Circles (Image 1) */}
                <div className="flex items-center -space-x-2">
                  {statuses.map((item) => (
                    <div
                      key={item.id}
                      className="w-8 h-8 rounded-full border-2 border-white overflow-hidden shadow-2xs bg-neutral-200"
                    >
                      <img
                        src={item.imageUrl}
                        alt={item.sender}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <ChevronRight className="w-4 h-4 text-neutral-400 stroke-[2]" />
              </div>
            </div>

            {/* Row 2: Saved status */}
            <div
              onClick={() => setCurrentView('saved_list')}
              className="w-full px-4 py-4 flex items-center justify-between border-b border-neutral-100 hover:bg-neutral-50/80 active:bg-neutral-100 cursor-pointer transition-colors"
            >
              <span className="text-[14px] sm:text-[15px] font-semibold text-[#1F1D1A]">
                Saved status
              </span>

              <div className="flex items-center gap-2">
                <span className="text-[14px] font-medium text-neutral-400">
                  {savedStatuses.length}
                </span>
                <ChevronRight className="w-4 h-4 text-neutral-400 stroke-[2]" />
              </div>
            </div>

            {/* Grey Divider Section Bar (Image 1) */}
            <div className="h-3 bg-[#F4F5F7] w-full border-y border-neutral-150/60 shrink-0" />

            {/* Row 3: Clean up WhatsApp */}
            <div
              onClick={handleCleanWhatsApp}
              className="w-full px-4 py-4 flex items-center justify-between border-b border-neutral-100 hover:bg-neutral-50/80 active:bg-neutral-100 cursor-pointer transition-colors"
            >
              <span className="text-[14px] sm:text-[15px] font-semibold text-[#1F1D1A]">
                Clean up WhatsApp
              </span>

              <div className="flex items-center gap-2">
                <span
                  className={`text-[13px] font-semibold transition-colors ${
                    whatsAppJunkSize.includes('Cleaned')
                      ? 'text-emerald-600'
                      : 'text-[#FF4D4F]'
                  }`}
                >
                  {whatsAppJunkSize}
                </span>
                <ChevronRight className="w-4 h-4 text-neutral-400 stroke-[2]" />
              </div>
            </div>

            {/* Row 4: WhatsApp files */}
            <div
              onClick={() => {
                showToast('WhatsApp files: 3,691 media & doc items');
              }}
              className="w-full px-4 py-4 flex items-center justify-between border-b border-neutral-100 hover:bg-neutral-50/80 active:bg-neutral-100 cursor-pointer transition-colors"
            >
              <span className="text-[14px] sm:text-[15px] font-semibold text-[#1F1D1A]">
                WhatsApp files
              </span>

              <div className="flex items-center gap-2">
                <span className="text-[14px] font-medium text-neutral-400">3691</span>
                <ChevronRight className="w-4 h-4 text-neutral-400 stroke-[2]" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* STATUS DETAIL VIEWER MODAL                                     */}
      {/* ============================================================== */}
      {selectedStatus && (
        <div
          onClick={() => setSelectedStatus(null)}
          className="fixed inset-0 z-60 bg-black/90 flex flex-col justify-between p-4 animate-in fade-in select-none"
        >
          {/* Top Bar */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full flex items-center justify-between text-white pt-2"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-lg">
                {selectedStatus.avatar}
              </div>
              <div>
                <h3 className="font-bold text-sm text-white">{selectedStatus.sender}</h3>
                <span className="text-xs text-white/70">{selectedStatus.timeAgo} · {selectedStatus.size}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setSelectedStatus(null)}
              className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/30"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Centered Image */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex-1 flex items-center justify-center p-2"
          >
            <img
              src={selectedStatus.imageUrl}
              alt={selectedStatus.sender}
              className="max-h-[70vh] max-w-full rounded-2xl object-contain shadow-2xl"
            />
          </div>

          {/* Bottom Action Bar */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full flex items-center justify-center gap-3 pb-4"
          >
            <button
              type="button"
              onClick={() => handleSaveSingle(selectedStatus)}
              className={`px-6 py-3 rounded-full font-bold text-sm flex items-center gap-2 shadow-lg active:scale-95 transition-all ${
                selectedStatus.saved
                  ? 'bg-neutral-800 text-emerald-400 border border-emerald-500/50'
                  : 'bg-[#00A884] text-white hover:bg-[#009676]'
              }`}
            >
              {selectedStatus.saved ? (
                <>
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>Saved</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Save to Gallery</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => showToast('Sharing status...')}
              className="px-5 py-3 rounded-full bg-white/20 backdrop-blur-md text-white font-medium text-sm flex items-center gap-2 hover:bg-white/30 active:scale-95"
            >
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </button>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TOAST NOTIFICATION                                             */}
      {/* ============================================================== */}
      {toastMessage && (
        <div className="fixed bottom-10 inset-x-0 mx-auto w-max max-w-[90%] bg-neutral-900/90 backdrop-blur-md text-white px-4 py-2.5 rounded-full text-xs font-semibold shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 z-70 border border-white/10">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};
