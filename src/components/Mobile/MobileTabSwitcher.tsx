import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Plus,
  MoreVertical,
  Globe,
  ArrowLeft,
  Pencil,
  Palette,
  SquareX,
  Trash2,
  CheckSquare,
  Check,
} from 'lucide-react';
import { Tab, TabGroup } from '../../types/browser';
import { IncognitoIcon } from './IncognitoIcon';

interface MobileTabSwitcherProps {
  isOpen: boolean;
  onClose: () => void;
  tabs: Tab[];
  activeTabId: string;
  onSelectTab: (id: string) => void;
  onCloseTab: (id: string, e?: React.MouseEvent) => void;
  onNewTab: (url?: string, groupId?: string, isIncognito?: boolean) => void;
  onCloseAllTabs: () => void;
  onDuplicateTab?: (id: string) => void;
  isIncognito: boolean;
  onToggleIncognito: () => void;
  tabGroups?: TabGroup[];
  onCreateGroup?: (name: string, color: string) => void;
  onUpdateGroup?: (id: string, name: string, color: string) => void;
  onDeleteGroup?: (id: string) => void;
  onAssignTabToGroup?: (tabId: string, groupId?: string) => void;
  onToggleGroupCollapse?: (id: string) => void;
  initialGroupId?: string | null;
}

// 10 Chrome Tab Group Colors (matching Image 3 exactly: Row 1 = 5, Row 2 = 4)
const CHROME_GROUP_COLORS_ROW1 = [
  { id: 'gray', hex: '#5F6368', bg: '#F1F3F4' },
  { id: 'blue', hex: '#0084FF', bg: '#E8F0FE' },
  { id: 'red', hex: '#D93025', bg: '#FCE8E6' }, // selected in Image 3
  { id: 'yellow', hex: '#F9AB00', bg: '#FEF7E0' },
  { id: 'green', hex: '#1E8E3E', bg: '#E6F4EA' },
];

const CHROME_GROUP_COLORS_ROW2 = [
  { id: 'pink', hex: '#D01884', bg: '#FCE4EC' },
  { id: 'purple', hex: '#8430CE', bg: '#F3E8FD' },
  { id: 'teal', hex: '#007B83', bg: '#E0F2F1' },
  { id: 'orange', hex: '#E37400', bg: '#FEEDDC' },
];

export const MobileTabSwitcher: React.FC<MobileTabSwitcherProps> = ({
  isOpen,
  onClose,
  tabs,
  activeTabId,
  onSelectTab,
  onCloseTab,
  onNewTab,
  onCloseAllTabs,
  isIncognito,
  onToggleIncognito,
  tabGroups = [],
  onCreateGroup,
  onUpdateGroup,
  onDeleteGroup,
  initialGroupId,
}) => {
  // Top Segment: normal (tab counter) | incognito | 4 boxes
  const [activeSegment, setActiveSegment] = useState<'normal' | 'incognito' | 'groups'>(
    isIncognito ? 'incognito' : 'normal'
  );

  const [searchQuery, setSearchQuery] = useState('');
  const [showTopMenu, setShowTopMenu] = useState(false);

  // Group Expanded Modal (Image 2 & 4)
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(
    initialGroupId || null
  );

  useEffect(() => {
    if (initialGroupId) {
      setSelectedGroupId(initialGroupId);
    }
  }, [initialGroupId, isOpen]);

  // Color Picker Popover (Image 3)
  const [showColorPicker, setShowColorPicker] = useState(false);

  // Group 3-Dots Menu Popover (Image 4)
  const [showGroupMenu, setShowGroupMenu] = useState(false);

  // Group Row 3-Dots Menu in 4-boxes screen (New Image 1 & 2)
  const [groupRowMenuId, setGroupRowMenuId] = useState<string | null>(null);

  // Inline editing group name
  const [isEditingGroupName, setIsEditingGroupName] = useState(false);
  const [groupNameInput, setGroupNameInput] = useState('');
  const groupNameInputRef = useRef<HTMLInputElement>(null);

  // Select tabs mode
  const [isSelectMode, setIsSelectMode] = useState(false);
  const [selectedTabIds, setSelectedTabIds] = useState<string[]>([]);

  useEffect(() => {
    if (isOpen) {
      if (isIncognito) {
        setActiveSegment('incognito');
      } else if (!initialGroupId) {
        setActiveSegment('normal');
      }
    }
  }, [isOpen, isIncognito, initialGroupId]);

  if (!isOpen) return null;

  const normalTabs = tabs.filter((t) => !t.isIncognito);
  const incognitoTabs = tabs.filter((t) => t.isIncognito);

  const filterTab = (tab: Tab) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return tab.title.toLowerCase().includes(q) || tab.url.toLowerCase().includes(q);
  };

  const filteredNormalTabs = normalTabs.filter(filterTab);
  const filteredIncognitoTabs = incognitoTabs.filter(filterTab);

  // Non-grouped normal tabs
  const ungroupedNormalTabs = filteredNormalTabs.filter((t) => !t.groupId);

  // Active group data
  const activeGroup = tabGroups.find((g) => g.id === selectedGroupId) || null;
  const activeGroupTabs = activeGroup
    ? tabs.filter((t) => t.groupId === activeGroup.id)
    : [];

  const handleOpenGroupModal = (group: TabGroup, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedGroupId(group.id);
    setGroupNameInput(group.name);
    setShowColorPicker(false);
    setShowGroupMenu(false);
    setIsEditingGroupName(false);
    setIsSelectMode(false);
    setSelectedTabIds([]);
  };

  const handleBackFromGroup = () => {
    setShowColorPicker(false);
    setShowGroupMenu(false);
    if (initialGroupId) {
      onClose();
    } else {
      setSelectedGroupId(null);
    }
  };

  const handleSaveGroupName = () => {
    if (!selectedGroupId || !activeGroup) return;
    const newName = groupNameInput.trim() || activeGroup.name;
    if (onUpdateGroup) {
      onUpdateGroup(activeGroup.id, newName, activeGroup.color);
    }
    setIsEditingGroupName(false);
  };

  const handleSelectGroupColor = (colorHex: string) => {
    if (!activeGroup || !onUpdateGroup) return;
    onUpdateGroup(activeGroup.id, activeGroup.name, colorHex);
    setShowColorPicker(false);
  };

  const handleCloseGroup = () => {
    setShowGroupMenu(false);
    handleBackFromGroup();
  };

  const handleDeleteGroup = () => {
    if (!activeGroup) return;
    setShowGroupMenu(false);
    if (onDeleteGroup) {
      onDeleteGroup(activeGroup.id);
    }
    handleBackFromGroup();
  };

  const handleAddTabToActiveGroup = () => {
    if (!selectedGroupId) return;
    onNewTab('google://newtab', selectedGroupId);
    setSelectedGroupId(null);
    onClose();
  };

  const handleCreateNewGroup = () => {
    const newName = `${tabGroups.length + 1} tab`;
    const randomColor = CHROME_GROUP_COLORS_ROW1[2].hex; // #D93025
    if (onCreateGroup) {
      onCreateGroup(newName, randomColor);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col font-sans select-none animate-in fade-in duration-150 overflow-hidden bg-[#EDF3F0] text-[#1F1F1F]">
      {/* ============================================================== */}
      {/* 1. TOP BAR HEADER (Pixel-matching Image 1)                      */}
      {/* ============================================================== */}
      <div className="w-full h-16 px-3.5 pt-3 pb-2 flex items-center justify-between shrink-0 bg-[#EDF3F0] z-20">
        {/* Left: Plus (+) Button in rounded dark teal container */}
        <button
          onClick={() => {
            if (activeSegment === 'incognito') {
              onNewTab('lemon://newtab', undefined, true);
            } else {
              onNewTab('lemon://newtab', undefined, false);
            }
            onClose();
          }}
          className="w-11 h-11 rounded-[18px] bg-[#004F4B] hover:bg-[#003E3A] text-white flex items-center justify-center shadow-xs active:scale-95 transition-all shrink-0"
          title="New tab"
        >
          <Plus className="w-5 h-5 stroke-[2.2]" />
        </button>

        {/* Center: Material 3 Pill Segmented Switcher */}
        <div className="bg-[#DFE5E2] p-1 rounded-full flex items-center gap-1 shadow-2xs">
          {/* Tab 1: Normal Tabs Counter Badge */}
          <button
            onClick={() => {
              setActiveSegment('normal');
              if (isIncognito) onToggleIncognito();
            }}
            className={`flex items-center justify-center rounded-full transition-all ${
              activeSegment === 'normal'
                ? 'bg-white text-[#1F1F1F] shadow-[0_1px_3px_rgba(0,0,0,0.12)] px-3.5 py-1.5'
                : 'text-[#444746] hover:text-[#1F1F1F] px-2.5 py-1.5'
            }`}
            title="Tabs"
          >
            <div className="w-5.5 h-5.5 rounded-[7px] border-[2px] border-[#1F1F1F] flex items-center justify-center font-bold text-[11px] leading-none">
              {normalTabs.length}
            </div>
          </button>

          {/* Tab 2: Incognito Hat & Glasses */}
          <button
            onClick={() => {
              setActiveSegment('incognito');
              if (!isIncognito) onToggleIncognito();
            }}
            className={`flex items-center justify-center rounded-full transition-all ${
              activeSegment === 'incognito'
                ? 'bg-white text-[#1F1F1F] shadow-[0_1px_3px_rgba(0,0,0,0.12)] px-3.5 py-1.5'
                : 'text-[#444746] hover:text-[#1F1F1F] px-2.5 py-1.5'
            }`}
            title="Incognito tabs"
          >
            <IncognitoIcon className="w-5 h-5" />
          </button>

          {/* Tab 3: 4 Boxes / Grid (Tab Groups) */}
          <button
            onClick={() => setActiveSegment('groups')}
            className={`flex items-center justify-center rounded-full transition-all ${
              activeSegment === 'groups'
                ? 'bg-white text-[#1F1F1F] shadow-[0_1px_3px_rgba(0,0,0,0.12)] px-3.5 py-1.5'
                : 'text-[#444746] hover:text-[#1F1F1F] px-2.5 py-1.5'
            }`}
            title="Tab Groups"
          >
            <div className="w-5 h-5 grid grid-cols-2 gap-0.5 p-0.5 items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-[1.5px] bg-[#1F1F1F]" />
              <div className="w-1.5 h-1.5 rounded-[1.5px] bg-[#1F1F1F]" />
              <div className="w-1.5 h-1.5 rounded-[1.5px] bg-[#1F1F1F]" />
              <div className="w-1.5 h-1.5 rounded-[1.5px] bg-[#1F1F1F]" />
            </div>
          </button>
        </div>

        {/* Right: 3-Dots Button */}
        <div className="relative">
          <button
            onClick={() => setShowTopMenu(!showTopMenu)}
            className="w-10 h-10 rounded-full flex items-center justify-center text-[#1F1F1F] hover:bg-black/5 active:scale-95 transition-all"
            title="More options"
          >
            <MoreVertical className="w-5 h-5 stroke-[2]" />
          </button>

          {showTopMenu && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowTopMenu(false)} />
              <div className="absolute right-0 top-12 bg-white rounded-2xl shadow-xl border border-neutral-100 p-1.5 w-48 z-50 text-xs font-medium animate-in zoom-in-95 duration-100">
                <button
                  onClick={() => {
                    setShowTopMenu(false);
                    handleCreateNewGroup();
                  }}
                  className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-neutral-100 text-neutral-800 flex items-center justify-between"
                >
                  <span>New group</span>
                  <Plus className="w-4 h-4 text-neutral-500" />
                </button>
                <button
                  onClick={() => {
                    setShowTopMenu(false);
                    onCloseAllTabs();
                  }}
                  className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-neutral-100 text-rose-600 flex items-center justify-between"
                >
                  <span>Close all tabs</span>
                  <Trash2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    setShowTopMenu(false);
                    onClose();
                  }}
                  className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-neutral-100 text-neutral-700"
                >
                  Done
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* ============================================================== */}
      {/* 2. SEARCH PILL BAR: "Search your tabs" (Image 1)               */}
      {/* ============================================================== */}
      <div className="px-3.5 pt-1 pb-3 shrink-0 bg-[#EDF3F0]">
        <div className="w-full h-12 bg-[#DFE5E2] hover:bg-[#D5DCD8] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#004F4B] rounded-full px-5 flex items-center transition-all shadow-inner">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search your tabs"
            className="w-full bg-transparent text-[15px] text-[#1F1F1F] placeholder-[#444746] outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="p-1 text-neutral-400 hover:text-neutral-700"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* ============================================================== */}
      {/* 3. TAB CARDS GRID (Matches Image 1 cards exactly)               */}
      {/* ============================================================== */}
      <div className="flex-1 overflow-y-auto px-3.5 py-1 max-w-2xl mx-auto w-full">
        {activeSegment === 'normal' && (
          <div className="grid grid-cols-2 gap-3.5 pb-20">
            {/* Standalone Tabs */}
            {ungroupedNormalTabs.map((tab) => {
              const isActive = tab.id === activeTabId;

              // Check specific tabs from Image 1
              const isIPhoneNews = tab.url.includes('iphone-18-pro');
              const isPetsCard = tab.url.includes('adopt') || tab.title.includes('adopt pets');
              const isRazorpay = tab.url.includes('razorpay');
              const isDonghuast = tab.url.includes('donghuastream') || tab.title.includes('donghuast');
              const isLicenses = tab.url.includes('licenses') || tab.title.includes('Licenses');

              return (
                <div
                  key={tab.id}
                  onClick={() => {
                    onSelectTab(tab.id);
                    onClose();
                  }}
                  className={`rounded-[24px] border transition-all cursor-pointer flex flex-col overflow-hidden shadow-xs relative aspect-[3/4] bg-white ${
                    isActive
                      ? 'border-[#007B83] ring-2 ring-[#007B83]/30'
                      : 'border-neutral-200/80 hover:border-neutral-300'
                  }`}
                >
                  {/* Card Header */}
                  <div
                    className={`w-full px-3 py-2 flex items-center justify-between gap-1.5 shrink-0 ${
                      isLicenses
                        ? 'bg-[#00676C] text-white'
                        : isRazorpay || isDonghuast
                        ? 'bg-[#2D2F31] text-white'
                        : 'bg-white text-neutral-800 border-b border-neutral-100'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 min-w-0 flex-1">
                      {isLicenses ? (
                        <span className="text-xs">📄</span>
                      ) : isRazorpay || isDonghuast ? (
                        <Globe className="w-3.5 h-3.5 shrink-0 text-neutral-300" />
                      ) : isIPhoneNews ? (
                        <span className="text-xs">📱</span>
                      ) : isPetsCard ? (
                        <span className="text-xs">🐶</span>
                      ) : (
                        <Globe className="w-3.5 h-3.5 shrink-0 text-neutral-500" />
                      )}
                      <span className="text-xs font-medium truncate">
                        {tab.title}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onCloseTab(tab.id, e);
                      }}
                      className={`p-1 rounded-full transition-transform active:scale-90 ${
                        isLicenses || isRazorpay || isDonghuast
                          ? 'text-neutral-300 hover:text-white hover:bg-white/20'
                          : 'text-neutral-600 hover:bg-neutral-100'
                      }`}
                      title="Close tab"
                    >
                      <X className="w-3.5 h-3.5 stroke-[2.4]" />
                    </button>
                  </div>

                  {/* Card Body - Realistic Content matching Image 1 */}
                  {isIPhoneNews ? (
                    // 1. iPhone 18 Pro News Preview (Image 1 top-left)
                    <div className="flex-1 w-full p-2.5 flex flex-col justify-between bg-white text-left select-none">
                      <p className="text-[10px] font-bold text-neutral-900 leading-tight">
                        iPhone 18 Pro Price Drops to Rs 64,900 with BytePe Exchange Offers: Check Specs, Buyback, and Pre-Booking Details
                      </p>
                      <div className="flex items-center justify-center gap-2 py-2">
                        <div className="w-10 h-16 bg-neutral-900 rounded-lg border border-neutral-300 shadow-xs flex items-center justify-center text-[8px] text-white">
                          📱
                        </div>
                        <div className="w-10 h-16 bg-neutral-200 rounded-lg border border-neutral-400 shadow-xs flex items-center justify-center text-[8px] text-neutral-600">
                          📱
                        </div>
                      </div>
                    </div>
                  ) : isPetsCard ? (
                    // 2. Browse and adopt pets preview (Image 1 top-right)
                    <div className="flex-1 w-full p-2.5 flex flex-col justify-between bg-white text-left select-none">
                      <div>
                        <p className="text-[9px] text-neutral-700 leading-snug">
                          browse and adopt pets remotely using React.js, Vite.js, and MongoDB.
                        </p>
                        <div className="flex items-center gap-1 mt-1.5 flex-wrap">
                          <span className="text-[8px] font-medium bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded-md border border-blue-200">
                            React.js
                          </span>
                          <span className="text-[8px] font-medium bg-purple-50 text-purple-700 px-1.5 py-0.5 rounded-md border border-purple-200">
                            Vite.js
                          </span>
                          <span className="text-[8px] font-medium bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded-md border border-emerald-200">
                            MongoDB
                          </span>
                        </div>
                      </div>
                      {/* Golden Retriever Puppies Photo */}
                      <div className="w-full h-16 rounded-xl bg-emerald-700 overflow-hidden relative shadow-xs flex items-center justify-center">
                        <img
                          src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400&auto=format&fit=crop&q=80"
                          alt="Puppies"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  ) : isRazorpay ? (
                    // 3. Razorpay Preview (Image 1 middle-left)
                    <div className="flex-1 w-full p-2.5 flex flex-col justify-between bg-white text-left select-none">
                      <div className="p-1 bg-blue-50 rounded-lg border border-blue-200 text-[8px] text-blue-900 leading-tight">
                        <span className="font-bold block">Accept International Payments ›</span>
                        <span>Global cards, Apple Pay, Google Pay at lower fee.</span>
                      </div>
                      <div className="flex items-center justify-between py-1">
                        <span className="text-[11px] font-bold text-blue-800">Razorpay</span>
                        <span className="text-[8px] font-semibold text-blue-600 border border-blue-500 rounded px-1.5 py-0.5">
                          Login
                        </span>
                      </div>
                      <p className="text-[10px] font-bold text-neutral-900 leading-tight">
                        This festive season get <span className="text-blue-700">Razorpay for FREE</span>
                      </p>
                      <button className="w-full py-1 bg-blue-600 text-white text-[9px] font-bold rounded-md shadow-xs">
                        Get Started Now
                      </button>
                    </div>
                  ) : isDonghuast ? (
                    // 4. donghuast / German Chancellor News Preview (Image 1 middle-right)
                    <div className="flex-1 w-full p-2.5 flex flex-col justify-between bg-white text-left select-none">
                      <span className="text-[8px] text-blue-600 font-semibold">Uncategorized</span>
                      <p className="text-[10px] font-bold text-neutral-900 leading-snug">
                        German Chancellor Merz calls state election a 'disaster' for his party but vows to stay on
                      </p>
                      <span className="text-[7px] text-neutral-400">
                        kandukurimahesh17@gmail.com / September 20, 2026
                      </span>
                      <p className="text-[8px] text-neutral-600 leading-tight line-clamp-2">
                        Merz delivered a statement shortly after exit polls were announced from Berlin and Mecklenburg...
                      </p>
                    </div>
                  ) : isLicenses ? (
                    // 5. LibreOffice Licenses Preview (Image 1 bottom-left)
                    <div className="flex-1 w-full p-2.5 flex flex-col justify-between bg-white text-left select-none">
                      <div className="p-1 bg-neutral-100 rounded text-[8px] text-neutral-700">
                        Language: English (US)
                      </div>
                      <div className="py-1">
                        <span className="text-[10px] font-bold text-neutral-900 block">LibreOffice</span>
                        <span className="text-[7px] text-neutral-500">The Document Foundation</span>
                      </div>
                      <div className="flex items-center justify-between text-[8px] text-neutral-600">
                        <span>Download</span>
                        <span>About Us</span>
                        <span>Community</span>
                      </div>
                      <div className="flex items-center justify-between pt-1">
                        <div className="h-4 bg-neutral-100 rounded w-1/2" />
                        <span className="text-[8px] font-bold bg-[#1E8E3E] text-white px-2 py-0.5 rounded">
                          DONATE
                        </span>
                      </div>
                      <p className="text-[10px] font-bold text-neutral-900 mt-1">Licenses</p>
                    </div>
                  ) : (
                    // Default Fallback Preview
                    <div className="flex-1 w-full p-3 flex flex-col justify-between bg-white select-none">
                      <div className="space-y-1.5">
                        <div className="h-3 bg-neutral-100 rounded-sm w-3/4" />
                        <div className="h-2 bg-neutral-100 rounded-sm w-full" />
                      </div>
                      <div className="text-[10px] text-neutral-400 truncate">
                        {tab.displayUrl || tab.url}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* TAB GROUP CARDS (Image 1 bottom-right card!) */}
            {tabGroups.map((group) => {
              const groupTabs = tabs.filter((t) => t.groupId === group.id);

              return (
                <div
                  key={group.id}
                  onClick={(e) => handleOpenGroupModal(group, e)}
                  className="rounded-[26px] bg-[#FCE8E6] border border-[#F7C5C0] p-3 transition-all cursor-pointer flex flex-col justify-between shadow-xs aspect-[3/4] relative hover:shadow-md"
                >
                  {/* Header: Color Dot + "1 tab" + 3 Dots (Image 1) */}
                  <div className="flex items-center justify-between w-full mb-2 px-0.5">
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                      {/* Pink/Red Dot ● */}
                      <div
                        style={{ backgroundColor: group.color }}
                        className="w-4 h-4 rounded-full shrink-0 shadow-xs"
                      />
                      <span className="text-[15px] font-medium text-[#1F1F1F] truncate">
                        {group.name || `${groupTabs.length} tab`}
                      </span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenGroupModal(group, e);
                        setShowGroupMenu(true);
                      }}
                      className="p-1 rounded-full text-[#444746] hover:bg-black/5"
                    >
                      <MoreVertical className="w-4.5 h-4.5 stroke-[2]" />
                    </button>
                  </div>

                  {/* 2x2 Mini Quadrants Preview (Image 1) */}
                  <div className="flex-1 w-full grid grid-cols-2 gap-2 p-0.5 overflow-hidden">
                    {/* Top-Left Quadrant: White card with Chrome logo and 3 rose lines */}
                    <div className="bg-white rounded-[16px] p-2 flex flex-col justify-between shadow-2xs overflow-hidden border border-neutral-100">
                      <div className="w-5.5 h-5.5 rounded-full bg-neutral-100 flex items-center justify-center p-0.5 shadow-xs">
                        <svg viewBox="0 0 24 24" className="w-4 h-4">
                          <circle cx="12" cy="12" r="10" fill="#4285F4" />
                          <circle cx="12" cy="12" r="4.5" fill="#FFFFFF" />
                        </svg>
                      </div>
                      <div className="space-y-1.5 my-auto pl-0.5">
                        <div className="h-2 bg-[#F8D7D5] rounded-full w-full" />
                        <div className="h-2 bg-[#F8D7D5] rounded-full w-4/5" />
                        <div className="h-2 bg-[#F8D7D5] rounded-full w-1/2" />
                      </div>
                    </div>

                    {/* Top-Right Quadrant: Soft pink tile */}
                    <div className="bg-[#FAD2CF]/45 rounded-[16px]" />

                    {/* Bottom-Left Quadrant: Soft pink tile */}
                    <div className="bg-[#FAD2CF]/45 rounded-[16px]" />

                    {/* Bottom-Right Quadrant: Soft pink tile */}
                    <div className="bg-[#FAD2CF]/45 rounded-[16px]" />
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Incognito View */}
        {activeSegment === 'incognito' && (
          <div className="grid grid-cols-2 gap-3.5 pb-20">
            {filteredIncognitoTabs.length === 0 ? (
              <div className="col-span-2 flex flex-col items-center justify-center py-20 text-center select-none">
                <div className="w-16 h-16 rounded-full bg-[#35363A] flex items-center justify-center mb-4 shadow-md">
                  <IncognitoIcon className="w-9 h-9 text-neutral-300" />
                </div>
                <h3 className="text-base font-medium text-neutral-200 mb-1">No incognito tabs open</h3>
                <p className="text-xs text-[#9AA0A6] max-w-xs mb-6">
                  Tabs you open in incognito won't be saved in your history.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    onNewTab('lemon://newtab', undefined, true);
                    onClose();
                  }}
                  className="px-5 py-2.5 rounded-full bg-[#8AB4F8] hover:bg-[#7aa7ef] text-[#202124] font-medium text-xs shadow-sm active:scale-95 transition-all"
                >
                  New incognito tab
                </button>
              </div>
            ) : (
              filteredIncognitoTabs.map((tab) => {
              const isActive = tab.id === activeTabId;
              return (
                <div
                  key={tab.id}
                  onClick={() => {
                    onSelectTab(tab.id);
                    onClose();
                  }}
                  className={`rounded-[24px] border transition-all cursor-pointer flex flex-col overflow-hidden shadow-xs relative aspect-[3/4] bg-[#2D2F31] ${
                    isActive
                      ? 'border-[#8AB4F8] ring-2 ring-[#8AB4F8]/50'
                      : 'border-[#3C4043] hover:border-neutral-500'
                  }`}
                >
                  <div className="w-full px-3 py-2 flex items-center justify-between gap-1.5 shrink-0 bg-[#35363A] text-white border-b border-[#3C4043]">
                    <div className="flex items-center gap-1.5 min-w-0 flex-1">
                      <IncognitoIcon className="w-3.5 h-3.5 text-neutral-300 shrink-0" />
                      <span className="text-xs font-medium text-white truncate">
                        {tab.title || 'New Incognito'}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onCloseTab(tab.id, e);
                      }}
                      className="p-1 rounded-full bg-[#494A4E] hover:bg-[#5A5C61] text-neutral-200 transition-transform active:scale-90"
                      title="Close tab"
                    >
                      <X className="w-3.5 h-3.5 stroke-[2.4]" />
                    </button>
                  </div>

                  <div className="flex-1 w-full p-3 flex flex-col items-center justify-center bg-[#202124] text-center select-none">
                    <div className="w-10 h-10 rounded-full bg-[#35363A] flex items-center justify-center mb-2 shadow-xs">
                      <IncognitoIcon className="w-5 h-5 text-neutral-300" />
                    </div>
                    <span className="text-xs text-neutral-300 font-medium truncate w-full">
                      {tab.title}
                    </span>
                  </div>
                </div>
              );
            })
          )}
          </div>
        )}

        {/* ============================================================== */}
        {/* 4 Boxes (Tab Groups List Screen - Pixel-matching Image 1 & 2)  */}
        {/* ============================================================== */}
        {activeSegment === 'groups' && (
          <div className="pb-20">
            {/* Unified Vertical Stacked Card Container (Image 1) */}
            <div className="rounded-[28px] bg-[#E3E9E6] border border-neutral-200/50 overflow-hidden divide-y divide-[#D7DDD9] shadow-xs">
              {tabGroups.map((group, idx) => {
                const groupTabs = tabs.filter((t) => t.groupId === group.id);
                const isMenuOpen = groupRowMenuId === group.id;

                // Tab counts & updated ago matching screenshot
                const tabCountText = group.name || `${groupTabs.length || 1} tab${(groupTabs.length || 1) > 1 ? 's' : ''}`;
                const updatedAgoText = group.updatedAgo || (idx === 0 ? 'Updated 4 minutes ago' : idx === 1 ? 'Updated 8 months ago' : idx === 2 ? 'Updated 1 day ago' : idx === 3 ? 'Updated 9 months ago' : 'Updated 8 months ago');

                return (
                  <div
                    key={group.id}
                    onClick={() => {
                      setGroupRowMenuId(null);
                      handleOpenGroupModal(group);
                    }}
                    className="w-full px-4 py-3.5 flex items-center justify-between gap-3.5 hover:bg-[#DCE2DF]/60 transition-colors cursor-pointer relative"
                  >
                    {/* Left: 2x2 Miniature Quadrant Square (Image 1) */}
                    <div className="w-[66px] h-[66px] rounded-[18px] bg-[#DFE5E2] p-1.5 grid grid-cols-2 gap-1 shrink-0 shadow-2xs">
                      {/* Quadrant 1 */}
                      <div className="bg-white rounded-[7px] flex items-center justify-center p-0.5 shadow-2xs overflow-hidden">
                        {idx === 0 || idx === 1 || idx === 4 ? (
                          <span className="text-[11px] font-bold text-[#4285F4]">G</span>
                        ) : idx === 2 ? (
                          <div className="w-3.5 h-3.5 rounded-full bg-neutral-800 flex items-center justify-center text-[7px] text-white">
                            ⚙
                          </div>
                        ) : idx === 3 ? (
                          <span className="text-xs">🍺</span>
                        ) : (
                          <span className="text-xs">📄</span>
                        )}
                      </div>

                      {/* Quadrant 2 */}
                      <div className="bg-white rounded-[7px] flex items-center justify-center p-0.5 shadow-2xs overflow-hidden">
                        {idx === 0 ? (
                          <div className="w-3.5 h-3.5 rounded-full bg-neutral-800 flex items-center justify-center text-[7px] text-white">
                            ⚙
                          </div>
                        ) : idx === 1 ? (
                          <span className="text-[11px] font-bold text-[#EA4335]">G</span>
                        ) : (
                          <div className="w-full h-full bg-[#E5EBE8] rounded-[6px]" />
                        )}
                      </div>

                      {/* Quadrant 3 */}
                      <div className="bg-[#E5EBE8] rounded-[6px]" />

                      {/* Quadrant 4 */}
                      <div className="bg-[#E5EBE8] rounded-[6px]" />
                    </div>

                    {/* Middle: Color Dot + Tab Count/Name + "Updated ... ago" (Image 1) */}
                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                      <div className="flex items-center gap-2 mb-0.5">
                        <div
                          style={{ backgroundColor: group.color }}
                          className="w-3.5 h-3.5 rounded-full shrink-0 shadow-xs"
                        />
                        <span className="text-[16px] font-medium text-[#1F1F1F] truncate">
                          {tabCountText}
                        </span>
                      </div>
                      <span className="text-[13px] text-[#5F6368] font-normal truncate">
                        {updatedAgoText}
                      </span>
                    </div>

                    {/* Right: 3-Dots Button (Image 1) */}
                    <div className="relative shrink-0">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setGroupRowMenuId(isMenuOpen ? null : group.id);
                        }}
                        className="w-10 h-10 rounded-full flex items-center justify-center text-[#1F1F1F] hover:bg-black/5 active:scale-95 transition-all"
                        title="Options"
                      >
                        <MoreVertical className="w-5 h-5 stroke-[2]" />
                      </button>

                      {/* Floating Popup Menu: Open | Delete (Pixel-matching Image 2) */}
                      {isMenuOpen && (
                        <>
                          <div
                            className="fixed inset-0 z-40"
                            onClick={(e) => {
                              e.stopPropagation();
                              setGroupRowMenuId(null);
                            }}
                          />
                          <div
                            onClick={(e) => e.stopPropagation()}
                            className="absolute right-0 top-10 z-50 bg-white rounded-[24px] shadow-[0_12px_40px_rgba(0,0,0,0.18)] border border-neutral-100/90 py-2 px-1 w-[150px] animate-in zoom-in-95 duration-100 text-[#1F1F1F]"
                          >
                            <button
                              type="button"
                              onClick={() => {
                                setGroupRowMenuId(null);
                                handleOpenGroupModal(group);
                              }}
                              className="w-full text-left px-4 py-2.5 hover:bg-neutral-100/80 rounded-xl text-[15px] font-normal text-[#1F1F1F] transition-colors"
                            >
                              Open
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setGroupRowMenuId(null);
                                if (onDeleteGroup) {
                                  onDeleteGroup(group.id);
                                }
                              }}
                              className="w-full text-left px-4 py-2.5 hover:bg-neutral-100/80 rounded-xl text-[15px] font-normal text-[#1F1F1F] transition-colors"
                            >
                              Delete
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* ============================================================== */}
      {/* 4. EXPANDED TAB GROUP MODAL SHEET (Pixel-matching Image 2)      */}
      {/* ============================================================== */}
      {selectedGroupId && activeGroup && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/40 backdrop-blur-[1px] animate-in fade-in duration-150">
          <div
            className="w-full max-w-lg mx-auto h-[88vh] bg-white rounded-t-[36px] shadow-2xl flex flex-col overflow-hidden relative animate-in slide-in-from-bottom-8 duration-200"
            onClick={() => {
              setShowColorPicker(false);
              setShowGroupMenu(false);
            }}
          >
            {/* Header: Back arrow + Color Dot + "1 tab" underline + Plus + 3-Dots (Image 2) */}
            <div className="w-full h-16 px-4 flex items-center justify-between shrink-0 bg-white border-b border-neutral-100 relative z-30">
              <div className="flex items-center gap-3.5 min-w-0 flex-1">
                {/* Back Arrow Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleBackFromGroup();
                  }}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-[#1F1F1F] hover:bg-neutral-100 transition-colors"
                  title="Back"
                >
                  <ArrowLeft className="w-6 h-6 stroke-[2]" />
                </button>

                {/* Color Dot Button (Tapping opens Image 3!) */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowGroupMenu(false);
                    setShowColorPicker(!showColorPicker);
                  }}
                  style={{ backgroundColor: activeGroup.color }}
                  className="w-5 h-5 rounded-full shrink-0 shadow-xs hover:scale-110 active:scale-95 transition-transform"
                  title="Change group colour"
                />

                {/* Group Title: Editable with Underline (Image 2 & 4) */}
                <div
                  className="min-w-0 flex-1 relative pr-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  {isEditingGroupName ? (
                    <input
                      ref={groupNameInputRef}
                      type="text"
                      value={groupNameInput}
                      onChange={(e) => setGroupNameInput(e.target.value)}
                      onBlur={handleSaveGroupName}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSaveGroupName();
                      }}
                      autoFocus
                      className="w-full text-[19px] font-normal text-[#1F1F1F] border-b-2 border-[#004F4B] outline-none bg-transparent py-0.5"
                    />
                  ) : (
                    <div
                      onClick={() => setIsEditingGroupName(true)}
                      className="flex items-center cursor-pointer group"
                    >
                      <span className="text-[19px] font-normal text-[#1F1F1F] truncate pb-0.5 border-b border-[#C4C7C5] group-hover:border-neutral-700 transition-colors">
                        {activeGroup.name && !activeGroup.name.includes('tab')
                          ? activeGroup.name
                          : `${activeGroupTabs.length} tab${activeGroupTabs.length !== 1 ? 's' : ''}`}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Right: Plus (+) & 3-Dots (Image 2) */}
              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddTabToActiveGroup();
                  }}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-[#1F1F1F] hover:bg-neutral-100 active:scale-95 transition-transform"
                  title="Add tab to group"
                >
                  <Plus className="w-6 h-6 stroke-[2.2]" />
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowColorPicker(false);
                    setShowGroupMenu(!showGroupMenu);
                  }}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-[#1F1F1F] hover:bg-neutral-100 active:scale-95 transition-transform"
                  title="More options"
                >
                  <MoreVertical className="w-5.5 h-5.5 stroke-[2]" />
                </button>
              </div>

              {/* ============================================================== */}
              {/* 5. COLOR PICKER PALETTE POPOVER (Pixel-matching Image 3)        */}
              {/* ============================================================== */}
              {showColorPicker && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="absolute top-16 left-6 z-50 bg-white rounded-[28px] shadow-[0_12px_45px_rgba(0,0,0,0.18)] border border-neutral-100/90 p-4.5 w-[285px] animate-in zoom-in-95 duration-150"
                >
                  {/* Row 1: 5 Colors (Image 3) */}
                  <div className="flex items-center justify-between mb-3.5">
                    {CHROME_GROUP_COLORS_ROW1.map((c) => {
                      const isSelected =
                        activeGroup.color.toLowerCase() === c.hex.toLowerCase();
                      return (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => handleSelectGroupColor(c.hex)}
                          className={`w-9 h-9 flex items-center justify-center transition-all ${
                            isSelected
                              ? 'border-[2.5px] border-[#D93025] rounded-[13px] p-0.5'
                              : 'p-0.5'
                          }`}
                        >
                          <div
                            style={{ backgroundColor: c.hex }}
                            className="w-7 h-7 rounded-full shadow-2xs hover:scale-105 active:scale-95 transition-transform"
                          />
                        </button>
                      );
                    })}
                  </div>

                  {/* Row 2: 4 Colors (Image 3) */}
                  <div className="flex items-center justify-start gap-3">
                    {CHROME_GROUP_COLORS_ROW2.map((c) => {
                      const isSelected =
                        activeGroup.color.toLowerCase() === c.hex.toLowerCase();
                      return (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => handleSelectGroupColor(c.hex)}
                          className={`w-9 h-9 flex items-center justify-center transition-all ${
                            isSelected
                              ? 'border-[2.5px] border-[#D93025] rounded-[13px] p-0.5'
                              : 'p-0.5'
                          }`}
                        >
                          <div
                            style={{ backgroundColor: c.hex }}
                            className="w-7 h-7 rounded-full shadow-2xs hover:scale-105 active:scale-95 transition-transform"
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ============================================================== */}
              {/* 6. GROUP 3-DOTS POPUP MENU (Pixel-matching Image 4)             */}
              {/* ============================================================== */}
              {showGroupMenu && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="absolute top-14 right-4 z-50 bg-white rounded-[28px] shadow-[0_16px_50px_rgba(0,0,0,0.18)] border border-neutral-100/80 py-3 px-2 w-[240px] animate-in zoom-in-95 duration-150 text-[#1F1F1F]"
                >
                  {/* 1. Select tabs */}
                  <button
                    onClick={() => {
                      setShowGroupMenu(false);
                      setIsSelectMode(!isSelectMode);
                    }}
                    className="w-full flex items-center gap-3.5 px-3 py-2.5 rounded-2xl hover:bg-neutral-100/80 text-left transition-colors"
                  >
                    <CheckSquare className="w-5 h-5 text-[#444746] stroke-[1.8] shrink-0" />
                    <span className="text-[15px] font-normal text-[#1F1F1F]">
                      Select tabs
                    </span>
                  </button>

                  {/* 2. Edit group name */}
                  <button
                    onClick={() => {
                      setShowGroupMenu(false);
                      setIsEditingGroupName(true);
                      setTimeout(() => groupNameInputRef.current?.focus(), 50);
                    }}
                    className="w-full flex items-center gap-3.5 px-3 py-2.5 rounded-2xl hover:bg-neutral-100/80 text-left transition-colors"
                  >
                    <Pencil className="w-5 h-5 text-[#444746] stroke-[1.8] shrink-0" />
                    <span className="text-[15px] font-normal text-[#1F1F1F]">
                      Edit group name
                    </span>
                  </button>

                  {/* 3. Edit group colour */}
                  <button
                    onClick={() => {
                      setShowGroupMenu(false);
                      setShowColorPicker(true);
                    }}
                    className="w-full flex items-center gap-3.5 px-3 py-2.5 rounded-2xl hover:bg-neutral-100/80 text-left transition-colors"
                  >
                    <Palette className="w-5 h-5 text-[#444746] stroke-[1.8] shrink-0" />
                    <span className="text-[15px] font-normal text-[#1F1F1F]">
                      Edit group colour
                    </span>
                  </button>

                  {/* 4. Close group */}
                  <button
                    onClick={handleCloseGroup}
                    className="w-full flex items-center gap-3.5 px-3 py-2.5 rounded-2xl hover:bg-neutral-100/80 text-left transition-colors"
                  >
                    <SquareX className="w-5 h-5 text-[#444746] stroke-[1.8] shrink-0" />
                    <span className="text-[15px] font-normal text-[#1F1F1F]">
                      Close group
                    </span>
                  </button>

                  {/* 5. Delete group */}
                  <button
                    onClick={handleDeleteGroup}
                    className="w-full flex items-center gap-3.5 px-3 py-2.5 rounded-2xl hover:bg-neutral-100/80 text-left transition-colors"
                  >
                    <Trash2 className="w-5 h-5 text-[#444746] stroke-[1.8] shrink-0" />
                    <span className="text-[15px] font-normal text-[#1F1F1F]">
                      Delete group
                    </span>
                  </button>
                </div>
              )}
            </div>

            {/* Modal Body: Cards in Group (Image 2 - hi Google card) */}
            <div className="flex-1 overflow-y-auto p-4 bg-white">
              {activeGroupTabs.length > 0 ? (
                <div className="grid grid-cols-2 gap-3.5">
                  {activeGroupTabs.map((tab) => {
                    const isSelected = selectedTabIds.includes(tab.id);
                    const isNewTab = tab.url === 'google://newtab' || tab.url === 'lemon://newtab' || tab.title.toLowerCase().includes('new tab');
                    const isTrends = tab.title.toLowerCase().includes('trends') || tab.url.includes('trends');

                    return (
                      <div
                        key={tab.id}
                        onClick={() => {
                          if (isSelectMode) {
                            setSelectedTabIds((prev) =>
                              prev.includes(tab.id)
                                ? prev.filter((id) => id !== tab.id)
                                : [...prev, tab.id]
                            );
                          } else {
                            onSelectTab(tab.id);
                            setSelectedGroupId(null);
                            onClose();
                          }
                        }}
                        className={`rounded-[22px] border transition-all cursor-pointer flex flex-col overflow-hidden shadow-xs relative aspect-[3/4] bg-white ${
                          isSelected
                            ? 'ring-2 ring-[#00676C] border-[#00676C]'
                            : 'border-[#00676C]'
                        }`}
                      >
                        {/* Card Header (Teal container with icon, title, and close X) */}
                        <div className="w-full px-3 py-2 flex items-center justify-between gap-1.5 shrink-0 bg-[#00676C] text-white">
                          <div className="flex items-center gap-1.5 min-w-0 flex-1">
                            {isNewTab ? (
                              <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0">
                                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5">
                                  <circle cx="12" cy="12" r="10" fill="#4285F4" />
                                  <circle cx="12" cy="12" r="7" fill="#EA4335" />
                                  <circle cx="12" cy="12" r="5" fill="#FBBC05" />
                                  <circle cx="12" cy="12" r="3.5" fill="#34A853" />
                                  <circle cx="12" cy="12" r="2.2" fill="#FFFFFF" />
                                  <circle cx="12" cy="12" r="1.5" fill="#1A73E8" />
                                </svg>
                              </div>
                            ) : (
                              <div className="w-4 h-4 rounded-full bg-white flex items-center justify-center shrink-0 shadow-xs">
                                <span className="text-[10px] font-bold text-[#4285F4]">G</span>
                              </div>
                            )}
                            <span className="text-xs font-medium text-white truncate">
                              {isTrends ? 'google tr...' : tab.title}
                            </span>
                          </div>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onCloseTab(tab.id, e);
                              if (activeGroupTabs.length <= 1) {
                                setSelectedGroupId(null);
                              }
                            }}
                            className="p-1 rounded-full text-white/80 hover:text-white hover:bg-white/20 transition-transform active:scale-90"
                            title="Close tab"
                          >
                            <X className="w-3.5 h-3.5 stroke-[2.4]" />
                          </button>
                        </div>

                        {/* Card Body (Matching Image 4: New tab, google trends, hi - Google) */}
                        {isNewTab ? (
                          // 1. Google New Tab Preview (Image 4 bottom-left)
                          <div className="flex-1 w-full p-2 flex flex-col justify-between bg-[#EDF3F0] text-left select-none relative overflow-hidden">
                            {/* Google Logo */}
                            <div className="flex items-center justify-center pt-1 pb-1">
                              <span className="text-[10px] font-bold tracking-tight text-[#4285F4]">G</span>
                              <span className="text-[10px] font-bold tracking-tight text-[#EA4335]">o</span>
                              <span className="text-[10px] font-bold tracking-tight text-[#FBBC05]">o</span>
                              <span className="text-[10px] font-bold tracking-tight text-[#4285F4]">g</span>
                              <span className="text-[10px] font-bold tracking-tight text-[#34A853]">l</span>
                              <span className="text-[10px] font-bold tracking-tight text-[#EA4335]">e</span>
                            </div>

                            {/* Search Pill */}
                            <div className="w-full h-4.5 rounded-full bg-[#DFE5E2] flex items-center justify-between px-2 text-[7px] text-[#444746] mb-1">
                              <span>Search Google or ty...</span>
                              <span>🎙️</span>
                            </div>

                            {/* AI Mode & Incognito Pills */}
                            <div className="flex items-center gap-1 mb-1">
                              <span className="flex-1 bg-[#DFE5E2] rounded-full py-0.5 text-[6.5px] text-center font-semibold text-neutral-700">
                                ✦ AI Mode
                              </span>
                              <span className="flex-1 bg-[#DFE5E2] rounded-full py-0.5 text-[6.5px] text-center font-semibold text-neutral-700">
                                🕵️ Incognito
                              </span>
                            </div>

                            {/* 4 Shortcuts */}
                            <div className="bg-white rounded-xl p-1 grid grid-cols-4 gap-1 text-center shadow-2xs mb-1">
                              <div className="flex flex-col items-center">
                                <div className="w-4 h-4 rounded-full bg-[#18233C] text-white text-[7px] flex items-center justify-center font-bold">n</div>
                                <span className="text-[5.5px] text-neutral-500">NewTube</span>
                              </div>
                              <div className="flex flex-col items-center">
                                <div className="w-4 h-4 rounded-full bg-neutral-600 text-white text-[7px] flex items-center justify-center font-bold">F</div>
                                <span className="text-[5.5px] text-neutral-500">family</span>
                              </div>
                              <div className="flex flex-col items-center">
                                <div className="w-4 h-4 rounded-full bg-red-600 text-white text-[7px] flex items-center justify-center">▶</div>
                                <span className="text-[5.5px] text-neutral-500">YouTube</span>
                              </div>
                              <div className="flex flex-col items-center">
                                <div className="w-4 h-4 rounded-full bg-neutral-100 text-neutral-800 text-[7px] font-serif flex items-center justify-center font-bold">W</div>
                                <span className="text-[5.5px] text-neutral-500">Wikipedia</span>
                              </div>
                            </div>

                            {/* Discover Card: GitHub MiniMax */}
                            <div className="bg-white rounded-xl p-1 shadow-2xs text-[6.5px]">
                              <p className="font-semibold text-neutral-800 line-clamp-1">GitHub - MiniMax-AI/OpenAgentCore</p>
                              <span className="text-[6px] text-neutral-400">GitHub · 1d</span>
                            </div>
                          </div>
                        ) : isTrends ? (
                          // 2. Google Trends Search Preview (Image 4 top-right)
                          <div className="flex-1 w-full p-2.5 flex flex-col justify-between bg-white text-left select-none relative">
                            {/* Top: Google logo, notification bell, user avatar K */}
                            <div className="flex items-center justify-between pb-1">
                              <span className="text-[11px] font-bold text-[#4285F4]">Google</span>
                              <div className="flex items-center gap-1">
                                <span className="text-[9px]">🔔</span>
                                <div className="w-3.5 h-3.5 rounded-full bg-[#00676C] text-white flex items-center justify-center text-[7px] font-bold ring-1 ring-emerald-500">
                                  K
                                </div>
                              </div>
                            </div>

                            {/* Search Pill: "google trends" */}
                            <div className="w-full h-5 rounded-full bg-neutral-100 flex items-center justify-between px-2 text-[8px] text-neutral-700 mb-1">
                              <div className="flex items-center gap-1">
                                <span>🔍</span>
                                <span className="font-medium">google trends</span>
                              </div>
                              <span>🎙️</span>
                            </div>

                            {/* Navigation Tabs */}
                            <div className="flex items-center gap-1.5 text-[7px] text-neutral-600 border-b border-neutral-100 pb-1 mb-1">
                              <span>AI Mode</span>
                              <span className="font-bold text-blue-600 border-b-2 border-blue-600 pb-0.5">All</span>
                              <span>News</span>
                              <span>Images</span>
                              <span>Forums</span>
                            </div>

                            {/* Google Trends Result Box */}
                            <div className="p-1.5 bg-neutral-50 rounded-lg border border-neutral-200 text-[7.5px] leading-tight">
                              <span className="text-[7px] text-neutral-500 block">Google Trends</span>
                              <span className="font-bold text-blue-700 block">Google Trends</span>
                              <span className="text-[6.5px] text-neutral-500 block">https://trends.google.com</span>
                              <span className="text-[7px] text-neutral-600 block mt-0.5">Explore search interest of terms and topics...</span>
                              <div className="mt-1 flex items-center justify-between text-blue-600 font-medium border-t border-neutral-100 pt-0.5">
                                <span>Explore</span>
                                <span>Trending Now</span>
                              </div>
                            </div>
                          </div>
                        ) : (
                          // 3. hi - Google Search Preview (Image 4 top-left)
                          <div className="flex-1 w-full p-2.5 flex flex-col justify-between bg-white text-left select-none relative">
                            {/* Top: Google logo, notification bell, user avatar K */}
                            <div className="flex items-center justify-between pb-1">
                              <span className="text-[11px] font-bold text-[#4285F4]">Google</span>
                              <div className="flex items-center gap-1">
                                <span className="text-[9px]">🔔</span>
                                <div className="w-3.5 h-3.5 rounded-full bg-[#00676C] text-white flex items-center justify-center text-[7px] font-bold ring-1 ring-emerald-500">
                                  K
                                </div>
                              </div>
                            </div>

                            {/* Search Pill: "hi" */}
                            <div className="w-full h-5 rounded-full bg-neutral-100 flex items-center justify-between px-2 text-[8px] text-neutral-700 mb-1">
                              <div className="flex items-center gap-1">
                                <span>🔍</span>
                                <span className="font-medium">hi</span>
                              </div>
                              <span>🎙️</span>
                            </div>

                            {/* Navigation Tabs */}
                            <div className="flex items-center gap-1.5 text-[7px] text-neutral-600 border-b border-neutral-100 pb-1 mb-1">
                              <span>AI Mode</span>
                              <span className="font-bold text-blue-600 border-b-2 border-blue-600 pb-0.5">All</span>
                              <span>Images</span>
                              <span>Videos</span>
                              <span>Shopping</span>
                            </div>

                            {/* AI Overview Box */}
                            <div className="p-1.5 bg-[#E8F0FE]/70 rounded-lg border border-[#D2E3FC] text-[8px] text-[#174EA6] leading-tight mb-1">
                              <div className="flex items-center gap-1 font-bold text-[8px] mb-0.5">
                                <span>✦ AI Overview</span>
                              </div>
                              <div className="flex items-center gap-1 text-[7px] text-neutral-700">
                                <span>🔊 hi</span>
                                <span className="text-neutral-400">/haɪ/</span>
                              </div>
                              <p className="text-[7.5px] text-[#174EA6] mt-0.5 line-clamp-2">
                                Hi! "Hi" is a short, informal word used as a greeting to say hello to someone.
                              </p>
                            </div>

                            {/* Meaning and Usage */}
                            <div className="text-[7.5px] text-neutral-600 pt-0.5">
                              <span className="font-bold block text-neutral-800">Meaning and Usage</span>
                              <span className="text-neutral-500 line-clamp-1">
                                • Definition: An expression used to catch attention or greet people you know.
                              </span>
                            </div>
                          </div>
                        )}

                        {/* Selection Checkmark */}
                        {isSelectMode && (
                          <div
                            className={`absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center border shadow-xs ${
                              isSelected
                                ? 'bg-[#004F4B] text-white border-[#004F4B]'
                                : 'bg-white text-transparent border-neutral-300'
                            }`}
                          >
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="w-full h-48 flex flex-col items-center justify-center text-center text-neutral-400">
                  <p className="text-sm font-medium">No tabs in this group</p>
                  <button
                    onClick={handleAddTabToActiveGroup}
                    className="mt-3 px-4 py-2 bg-[#004F4B] text-white rounded-full text-xs font-semibold shadow-xs"
                  >
                    Add a tab
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Android 3-button System Navigation Bar at bottom (|||  ▢  ◁) */}
      <div className="w-full h-11 bg-[#EDF3F0] flex items-center justify-around shrink-0 border-t border-neutral-200/40 text-neutral-500 z-10">
        <button className="p-2 hover:text-neutral-800 text-sm">|||</button>
        <button onClick={onClose} className="p-2 hover:text-neutral-800 text-base">▢</button>
        <button onClick={onClose} className="p-2 hover:text-neutral-800 text-sm">◁</button>
      </div>
    </div>
  );
};
