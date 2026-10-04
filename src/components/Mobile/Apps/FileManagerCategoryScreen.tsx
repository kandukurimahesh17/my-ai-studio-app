import React, { useState } from 'react';
import {
  ChevronLeft,
  Search,
  Bookmark,
  MoreVertical,
  ArrowDownUp,
  CheckSquare,
  FileText,
  FileSpreadsheet,
  Presentation,
  Play,
  Music2,
  Image as ImageIcon,
  Package,
  FolderArchive,
  Globe,
  Smartphone,
  ExternalLink,
  Share2,
  Trash2,
  X,
  HardDrive,
  Film,
} from 'lucide-react';

export interface CategoryFileItem {
  id: string;
  name: string;
  category: string;
  format: string;
  date: string;
  size: string;
  isFavorite?: boolean;
  thumbnailUrl?: string;
  url?: string;
}

interface FileManagerCategoryScreenProps {
  categoryId: string;
  title: string;
  isOpen: boolean;
  onClose: () => void;
  onOpenFile?: (fileName: string, url?: string) => void;
}

// Preset datasets for each individual category
const CATEGORY_DATA_MAP: Record<
  string,
  {
    formats: string[];
    items: CategoryFileItem[];
  }
> = {
  downloads: {
    formats: ['ALL', 'APK', 'PDF', 'Audio', 'Video', 'Zip'],
    items: [
      { id: 'dl-1', name: 'LemonBrowser_v4.2.0_arm64.apk', category: 'downloads', format: 'APK', date: 'Today, 14:20', size: '28.4 MB' },
      { id: 'dl-2', name: 'Financial_Quarterly_Statement_2026.pdf', category: 'downloads', format: 'PDF', date: 'Yesterday', size: '1.4 MB' },
      { id: 'dl-3', name: 'Synthwave_Sunset_Master.wav', category: 'downloads', format: 'Audio', date: 'Sep 29 2026', size: '34.2 MB' },
      { id: 'dl-4', name: 'Product_Demo_4K_H265.mp4', category: 'downloads', format: 'Video', date: 'Sep 27 2026', size: '112 MB' },
      { id: 'dl-5', name: 'Web_Icons_Asset_Bundle.zip', category: 'downloads', format: 'Zip', date: 'Sep 24 2026', size: '18.9 MB' },
    ],
  },
  music: {
    formats: ['ALL', 'MP3', 'M4A', 'WAV', 'Recordings', 'Ringtones'],
    items: [
      { id: 'mus-1', name: 'AUD-20260706-WA0001.m4a', category: 'music', format: 'M4A', date: 'Sep 27 2026', size: '3.4 MB', isFavorite: true },
      { id: 'mus-2', name: 'Midnight_City_Echoes.mp3', category: 'music', format: 'MP3', date: 'Sep 22 2026', size: '7.8 MB' },
      { id: 'mus-3', name: 'Voice_Note_Meeting_Discussion.wav', category: 'music', format: 'Recordings', date: 'Sep 18 2026', size: '12.1 MB' },
      { id: 'mus-4', name: 'Pixel_Horizon_Ringtone.m4a', category: 'music', format: 'Ringtones', date: 'Sep 10 2026', size: '820 KB' },
    ],
  },
  videos: {
    formats: ['ALL', 'MP4', 'Movies', 'Camera', 'WhatsApp', 'Screen Record'],
    items: [
      { id: 'vid-1', name: 'VID_20260930_183420.mp4', category: 'videos', format: 'Camera', date: 'Sep 30 2026', size: '48.2 MB', isFavorite: true },
      { id: 'vid-2', name: 'ScreenRecording_20260928_102015.mp4', category: 'videos', format: 'Screen Record', date: 'Sep 28 2026', size: '24.5 MB' },
      { id: 'vid-3', name: 'WhatsApp_Video_20260926_0912.mp4', category: 'videos', format: 'WhatsApp', date: 'Sep 26 2026', size: '14.1 MB' },
      { id: 'vid-4', name: 'SciFi_ShortFilm_Trailer_1080p.mp4', category: 'videos', format: 'Movies', date: 'Sep 19 2026', size: '185 MB' },
    ],
  },
  whatsapp: {
    formats: ['ALL', 'Documents', 'Images', 'Audio', 'Videos', 'Statuses'],
    items: [
      { id: 'wa-1', name: 'Doc_Project_Specifications.pdf', category: 'whatsapp', format: 'Documents', date: 'Today, 10:15', size: '420 KB', isFavorite: true },
      { id: 'wa-2', name: 'IMG-20261001-WA0032.jpg', category: 'whatsapp', format: 'Images', date: 'Yesterday', size: '2.1 MB' },
      { id: 'wa-3', name: 'AUD-20260929-WA0014.opus', category: 'whatsapp', format: 'Audio', date: 'Sep 29 2026', size: '850 KB' },
      { id: 'wa-4', name: 'VID-20260928-WA0009.mp4', category: 'whatsapp', format: 'Videos', date: 'Sep 28 2026', size: '9.8 MB' },
      { id: 'wa-5', name: 'Status_Sunset_Story.jpg', category: 'whatsapp', format: 'Statuses', date: 'Sep 27 2026', size: '1.2 MB' },
    ],
  },
  images: {
    formats: ['ALL', 'Camera', 'Screenshots', 'WhatsApp', 'Wallpapers', 'Downloads'],
    items: [
      { id: 'img-1', name: 'IMG_20261002_094512.jpg', category: 'images', format: 'Camera', date: 'Today, 09:45', size: '4.8 MB', isFavorite: true },
      { id: 'img-2', name: 'Screenshot_20261001-213045.png', category: 'images', format: 'Screenshots', date: 'Yesterday', size: '1.1 MB' },
      { id: 'img-3', name: 'Abstract_Geometric_OLED.png', category: 'images', format: 'Wallpapers', date: 'Sep 25 2026', size: '6.4 MB', isFavorite: true },
      { id: 'img-4', name: 'Receipt_Supermarket_Proof.jpg', category: 'images', format: 'Downloads', date: 'Sep 21 2026', size: '750 KB' },
    ],
  },
  apps: {
    formats: ['ALL', 'APKs', 'Installed', 'System', 'Updates'],
    items: [
      { id: 'app-1', name: 'LemonBrowser_v4.2.0.apk', category: 'apps', format: 'APKs', date: 'Oct 01 2026', size: '28.4 MB' },
      { id: 'app-2', name: 'Telegram_v10.14.2.apk', category: 'apps', format: 'APKs', date: 'Sep 28 2026', size: '64.1 MB' },
      { id: 'app-3', name: 'Retro_Emulator_Pro.apk', category: 'apps', format: 'APKs', date: 'Sep 15 2026', size: '18.0 MB' },
      { id: 'app-4', name: 'Spotify_Music_Player.apk', category: 'apps', format: 'Updates', date: 'Sep 12 2026', size: '52.7 MB' },
    ],
  },
  zips: {
    formats: ['ALL', 'ZIP', 'RAR', '7Z', 'TAR'],
    items: [
      { id: 'zip-1', name: 'Project_Design_Source_Code.zip', category: 'zips', format: 'ZIP', date: 'Sep 29 2026', size: '42.6 MB', isFavorite: true },
      { id: 'zip-2', name: 'HighRes_Textures_Pack.7z', category: 'zips', format: '7Z', date: 'Sep 20 2026', size: '184 MB' },
      { id: 'zip-3', name: 'Ubuntu_Server_Backup.tar.gz', category: 'zips', format: 'TAR', date: 'Sep 14 2026', size: '92.1 MB' },
      { id: 'zip-4', name: 'Client_Photo_Delivery.rar', category: 'zips', format: 'RAR', date: 'Sep 05 2026', size: '310 MB' },
    ],
  },
  pages: {
    formats: ['ALL', 'Offline', 'Articles', 'MHTML', 'HTML'],
    items: [
      { id: 'pg-1', name: 'Google_Keyword_Gemini_Nano.mhtml', category: 'pages', format: 'MHTML', date: 'Oct 01 2026', size: '3.4 MB', isFavorite: true },
      { id: 'pg-2', name: 'TypeScript_5_Release_Notes.html', category: 'pages', format: 'HTML', date: 'Sep 27 2026', size: '820 KB' },
      { id: 'pg-3', name: 'Wikipedia_Quantum_Computing.mhtml', category: 'pages', format: 'Offline', date: 'Sep 21 2026', size: '4.9 MB' },
    ],
  },
  instagram: {
    formats: ['ALL', 'Reels', 'Photos', 'Carousels', 'Stories'],
    items: [
      { id: 'ig-1', name: 'Reel_Motion_Graphics_Tutorial.mp4', category: 'instagram', format: 'Reels', date: 'Oct 01 2026', size: '12.4 MB', isFavorite: true },
      { id: 'ig-2', name: 'Architectural_Photography_Grid.jpg', category: 'instagram', format: 'Photos', date: 'Sep 29 2026', size: '2.8 MB' },
      { id: 'ig-3', name: 'Travel_Japan_CherryBlossom.mp4', category: 'instagram', format: 'Stories', date: 'Sep 24 2026', size: '8.1 MB' },
    ],
  },
  others: {
    formats: ['ALL', 'Logs', 'Configs', 'Cache', 'Backup'],
    items: [
      { id: 'oth-1', name: 'system_log_dump_20261002.txt', category: 'others', format: 'Logs', date: 'Today, 06:12', size: '340 KB' },
      { id: 'oth-2', name: 'network_proxy_config.json', category: 'others', format: 'Configs', date: 'Sep 26 2026', size: '14 KB' },
      { id: 'oth-3', name: 'browser_indexeddb_snapshot.bin', category: 'others', format: 'Backup', date: 'Sep 18 2026', size: '5.2 MB' },
    ],
  },
  storage: {
    formats: ['ALL', 'Large Files', 'Duplicates', 'Apps Data', 'Cache'],
    items: [
      { id: 'st-1', name: 'System Cache & Temporary Logs', category: 'storage', format: 'Cache', date: 'Real-time', size: '2.4 GB' },
      { id: 'st-2', name: 'Duplicate Photos & Media', category: 'storage', format: 'Duplicates', date: 'Scanned today', size: '1.1 GB' },
      { id: 'st-3', name: 'Offline Map Cache Data', category: 'storage', format: 'Large Files', date: 'Sep 28 2026', size: '840 MB' },
      { id: 'st-4', name: 'App Installation Packages', category: 'storage', format: 'Apps Data', date: 'Sep 20 2026', size: '620 MB' },
    ],
  },
};

export const FileManagerCategoryScreen: React.FC<FileManagerCategoryScreenProps> = ({
  categoryId,
  title,
  isOpen,
  onClose,
  onOpenFile,
}) => {
  const categoryConfig = CATEGORY_DATA_MAP[categoryId] || {
    formats: ['ALL', 'Recent', 'Archive', 'Misc'],
    items: [],
  };

  const [items, setItems] = useState<CategoryFileItem[]>(() => {
    try {
      const saved = localStorage.getItem(`lemon_files_${categoryId}`);
      if (saved) return JSON.parse(saved);
    } catch {}
    return categoryConfig.items;
  });

  const [activeMainTab, setActiveMainTab] = useState<'All Files' | 'Recent' | 'Favorites'>('All Files');
  const [selectedFormat, setSelectedFormat] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2000);
  };

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = items.map((item) =>
      item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
    );
    setItems(updated);
    try {
      localStorage.setItem(`lemon_files_${categoryId}`, JSON.stringify(updated));
    } catch {}
    const target = updated.find((d) => d.id === id);
    showToast(target?.isFavorite ? 'Added to Favorites' : 'Removed from Favorites');
  };

  const deleteItem = (id: string) => {
    const updated = items.filter((d) => d.id !== id);
    setItems(updated);
    try {
      localStorage.setItem(`lemon_files_${categoryId}`, JSON.stringify(updated));
    } catch {}
    setActiveMenuId(null);
    showToast('File removed');
  };

  // Filter pipeline
  let filteredItems = items;

  if (activeMainTab === 'Favorites') {
    filteredItems = filteredItems.filter((d) => d.isFavorite);
  } else if (activeMainTab === 'Recent') {
    filteredItems = filteredItems.slice(0, 3);
  }

  if (selectedFormat !== 'ALL') {
    filteredItems = filteredItems.filter(
      (d) => d.format.toLowerCase() === selectedFormat.toLowerCase()
    );
  }

  if (searchQuery.trim()) {
    filteredItems = filteredItems.filter((d) =>
      d.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  const renderBadge = (format: string, cat: string) => {
    const f = format.toUpperCase();
    if (f === 'PDF') {
      return (
        <div className="w-11 h-11 rounded-xl bg-[#E53935] text-white flex flex-col items-center justify-center p-0.5 shadow-xs shrink-0 select-none">
          <span className="text-[10px] font-black tracking-tight leading-none mt-0.5">PDF</span>
          <div className="w-5 h-0.5 bg-white/90 rounded-full mt-1.5" />
          <div className="w-3.5 h-0.5 bg-white/70 rounded-full mt-0.5" />
        </div>
      );
    }
    if (cat === 'music' || f === 'MP3' || f === 'M4A' || f === 'AUDIO' || f === 'WAV') {
      return (
        <div className="w-11 h-11 rounded-xl bg-[#FF3B62] text-white flex items-center justify-center shadow-xs shrink-0 select-none">
          <Music2 className="w-5 h-5 fill-current stroke-[1.5]" />
        </div>
      );
    }
    if (cat === 'videos' || f === 'VIDEO' || f === 'MP4' || f === 'REELS' || f === 'MOVIES') {
      return (
        <div className="w-11 h-11 rounded-xl bg-[#8A3FFC] text-white flex items-center justify-center shadow-xs shrink-0 select-none">
          <Play className="w-5 h-5 fill-current" />
        </div>
      );
    }
    if (cat === 'images' || f === 'IMAGES' || f === 'PHOTOS' || f === 'WALLPAPERS') {
      return (
        <div className="w-11 h-11 rounded-xl bg-[#00B4D8] text-white flex items-center justify-center shadow-xs shrink-0 select-none">
          <ImageIcon className="w-5 h-5" />
        </div>
      );
    }
    if (cat === 'apps' || f === 'APK' || f === 'APKS') {
      return (
        <div className="w-11 h-11 rounded-xl bg-[#3DDC84] text-white flex items-center justify-center shadow-xs shrink-0 select-none font-bold text-[10px]">
          <Package className="w-5 h-5" />
        </div>
      );
    }
    if (cat === 'zips' || f === 'ZIP' || f === 'RAR' || f === '7Z' || f === 'TAR') {
      return (
        <div className="w-11 h-11 rounded-xl bg-[#FF9500] text-white flex items-center justify-center shadow-xs shrink-0 select-none font-bold text-[10px]">
          <FolderArchive className="w-5 h-5" />
        </div>
      );
    }
    if (cat === 'pages' || f === 'HTML' || f === 'MHTML') {
      return (
        <div className="w-11 h-11 rounded-xl bg-[#4361EE] text-white flex items-center justify-center shadow-xs shrink-0 select-none font-bold text-[10px]">
          <Globe className="w-5 h-5" />
        </div>
      );
    }
    if (cat === 'storage') {
      return (
        <div className="w-11 h-11 rounded-xl bg-[#2F80ED] text-white flex items-center justify-center shadow-xs shrink-0 select-none font-bold text-[10px]">
          <HardDrive className="w-5 h-5" />
        </div>
      );
    }
    return (
      <div className="w-11 h-11 rounded-xl bg-[#6B645D] text-white flex items-center justify-center shadow-xs shrink-0 select-none font-bold text-[10px]">
        {format.slice(0, 3).toUpperCase()}
      </div>
    );
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

      {/* 2. Top App Bar (Title: Category Name, Back button, Search) */}
      <div className="w-full px-4 py-3 flex items-center justify-between shrink-0 bg-[#F3ECE2] border-b border-[#E5DFD5]">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="p-1.5 -ml-1 text-[#1F1D1A] hover:text-black rounded-full hover:bg-black/5 active:scale-95 transition-transform"
            title="Back to Tools"
          >
            <ChevronLeft className="w-6 h-6 stroke-[2.2]" />
          </button>
          <h1 className="text-xl font-bold tracking-tight text-[#1F1D1A]">
            {title}
          </h1>
        </div>

        <div className="flex items-center gap-2 text-[#1F1D1A]">
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="p-1.5 rounded-full hover:bg-black/5 active:scale-95 transition-transform"
            title={`Search ${title}`}
          >
            <Search className="w-5 h-5 stroke-[2]" />
          </button>
        </div>
      </div>

      {/* Search Input Bar (Expandable) */}
      {isSearchOpen && (
        <div className="px-4 py-2 border-b border-[#E5DFD5] bg-[#FAF7F2] flex items-center gap-2 animate-in fade-in duration-100">
          <Search className="w-4 h-4 text-[#6B645D]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Search ${title.toLowerCase()}...`}
            className="w-full bg-transparent text-xs text-[#1F1D1A] outline-none"
            autoFocus
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="p-1 text-[#6B645D]">
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      )}

      {/* 3. Primary Navigation Tabs: All Files | Recent | Favorites + Right Action Icons */}
      <div className="w-full px-4 pt-2.5 pb-1 flex items-center justify-between shrink-0 bg-[#F3ECE2]">
        <div className="flex items-center gap-5">
          {(['All Files', 'Recent', 'Favorites'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveMainTab(tab)}
              className={`text-sm font-bold pb-2 relative transition-colors ${
                activeMainTab === tab ? 'text-[#1F1D1A]' : 'text-[#8A8279] hover:text-[#1F1D1A]'
              }`}
            >
              <span>{tab}</span>
              {activeMainTab === tab && (
                <div className="absolute bottom-0 inset-x-0 h-0.5 bg-[#1F1D1A] rounded-full" />
              )}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 text-[#6B645D] pb-2">
          <button
            onClick={() => showToast('Sorted by date')}
            className="p-1 rounded-md hover:text-[#1F1D1A] hover:bg-black/5 active:scale-95 transition-transform"
            title="Sort"
          >
            <ArrowDownUp className="w-4.5 h-4.5" />
          </button>
          <button
            onClick={() => showToast('Selection mode')}
            className="p-1 rounded-md hover:text-[#1F1D1A] hover:bg-black/5 active:scale-95 transition-transform"
            title="Select items"
          >
            <CheckSquare className="w-4.5 h-4.5" />
          </button>
        </div>
      </div>

      {/* 4. Format Categories Bar: Tailored to Category (e.g. ALL, APK, PDF, Video, Audio, etc.) */}
      <div className="w-full px-4 py-2 flex items-center gap-2 overflow-x-auto scrollbar-none shrink-0 bg-[#F3ECE2] border-b border-[#E5DFD5]">
        {categoryConfig.formats.map((fmt) => (
          <button
            key={fmt}
            onClick={() => setSelectedFormat(fmt)}
            className={`px-3.5 py-1 rounded-full text-xs font-bold transition-all shrink-0 ${
              selectedFormat === fmt
                ? 'bg-[#1F1D1A] text-white shadow-xs'
                : 'bg-white/80 text-[#6B645D] hover:bg-white hover:text-[#1F1D1A] border border-[#E5DFD5]'
            }`}
          >
            {fmt}
          </button>
        ))}
      </div>

      {/* Toast Notification */}
      {toastMsg && (
        <div className="mx-4 mt-2 p-2.5 bg-[#1F1D1A]/95 text-white text-xs font-semibold rounded-2xl text-center shadow-lg animate-in fade-in duration-150">
          {toastMsg}
        </div>
      )}

      {/* 5. Item Cards List (App Theme: White cards on cream canvas with badges) */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2.5 scrollbar-none">
        {filteredItems.map((doc) => (
          <div
            key={doc.id}
            onClick={() => onOpenFile?.(doc.name, doc.url)}
            className="bg-white rounded-[20px] p-3 border border-[#E5DFD5] hover:border-[#D8CFBF] hover:bg-[#FAF7F2] shadow-xs flex items-center justify-between gap-3 cursor-pointer group active:scale-[0.99] transition-all relative"
          >
            {/* Left: Badge */}
            <div className="flex items-center gap-3.5 min-w-0 flex-1">
              {renderBadge(doc.format, categoryId)}

              {/* Title & Metadata */}
              <div className="min-w-0 flex-1 pr-1">
                <h3 className="text-sm font-bold text-[#1F1D1A] leading-snug truncate">
                  {doc.name}
                </h3>
                <span className="text-xs text-[#8A8279] block mt-0.5">
                  {doc.date} · {doc.size}
                </span>
              </div>
            </div>

            {/* Right: Favorite toggle & 3-dots */}
            <div className="flex items-center gap-1.5 shrink-0 text-[#6B645D]">
              <button
                type="button"
                onClick={(e) => toggleFavorite(doc.id, e)}
                className={`p-2 rounded-full hover:bg-black/5 transition-transform active:scale-90 ${
                  doc.isFavorite ? 'text-[#E53935]' : 'text-[#8A8279] hover:text-[#1F1D1A]'
                }`}
                title={doc.isFavorite ? 'Remove Favorite' : 'Add to Favorites'}
              >
                <Bookmark className={`w-4.5 h-4.5 ${doc.isFavorite ? 'fill-current' : ''}`} />
              </button>

              <div className="relative">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveMenuId(activeMenuId === doc.id ? null : doc.id);
                  }}
                  className="p-2 rounded-full hover:bg-black/5 hover:text-[#1F1D1A] transition-colors"
                  title="More actions"
                >
                  <MoreVertical className="w-4.5 h-4.5" />
                </button>

                {/* Popover Menu */}
                {activeMenuId === doc.id && (
                  <>
                    <div
                      className="fixed inset-0 z-30"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveMenuId(null);
                      }}
                    />
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="absolute right-0 top-10 w-44 bg-white rounded-2xl shadow-xl border border-[#E5DFD5] p-1.5 z-40 animate-in zoom-in-95 duration-100"
                    >
                      <button
                        onClick={() => {
                          setActiveMenuId(null);
                          onOpenFile?.(doc.name, doc.url);
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-[#1F1D1A] hover:bg-neutral-100 rounded-xl text-left"
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-[#1A73E8]" />
                        <span>Open</span>
                      </button>
                      <button
                        onClick={() => {
                          setActiveMenuId(null);
                          showToast(`Sharing ${doc.name}`);
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-[#1F1D1A] hover:bg-neutral-100 rounded-xl text-left"
                      >
                        <Share2 className="w-3.5 h-3.5 text-neutral-600" />
                        <span>Share</span>
                      </button>
                      <button
                        onClick={() => deleteItem(doc.id)}
                        className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-[#E53935] hover:bg-rose-50 rounded-xl text-left border-t border-[#F0EAE0] mt-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}

        {filteredItems.length === 0 && (
          <div className="py-20 text-center text-[#8A8279] text-xs">
            No {selectedFormat !== 'ALL' ? selectedFormat : ''} files found in {title}.
          </div>
        )}
      </div>

      {/* 6. Android Bottom 3-Button Navigation Bar (|||  ▢  ◁) */}
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
