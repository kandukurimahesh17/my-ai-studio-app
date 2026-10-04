import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Plus, Check, ChevronRight, ChevronUp } from 'lucide-react';
import { SITE_CATEGORIES, ALL_SITES, SiteItem } from '../../data/allSitesData';
import { MobileShortcut } from './mobileShortcutsData';
import { SiteLogo } from './SiteLogo';

interface AllSitesScreenProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (url: string) => void;
  existingShortcutIds: string[];
  onAddShortcut: (shortcut: MobileShortcut) => void;
}

export const AllSitesScreen: React.FC<AllSitesScreenProps> = ({
  isOpen,
  onClose,
  onNavigate,
  existingShortcutIds,
  onAddShortcut,
}) => {
  // By default, 'download' is selected
  const [activeCategory, setActiveCategory] = useState<string>('download');
  const [addedIds, setAddedIds] = useState<Set<string>>(new Set(existingShortcutIds));
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isCategoryPickerOpen, setIsCategoryPickerOpen] = useState(false);

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const pillContainerRef = useRef<HTMLDivElement | null>(null);
  const categorySectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const pillRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const isManualScrollingRef = useRef<boolean>(false);
  const manualScrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Sync added IDs if existing shortcuts change
  useEffect(() => {
    setAddedIds(new Set(existingShortcutIds));
  }, [existingShortcutIds]);

  // Whenever activeCategory changes, automatically scroll the top horizontal pill bar
  // so the active pill stays visible and centered as requested by user
  useEffect(() => {
    if (!isOpen) return;
    const activePill = pillRefs.current[activeCategory];
    if (activePill && pillContainerRef.current) {
      activePill.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });
    }
  }, [activeCategory, isOpen]);

  if (!isOpen) return null;

  // Scroll spy: Detect which category section is currently in view while scrolling down
  const handleScroll = () => {
    if (isManualScrollingRef.current || !scrollContainerRef.current) return;

    const containerTop = scrollContainerRef.current.getBoundingClientRect().top;
    let matchingCategory = SITE_CATEGORIES[0].id;

    for (const cat of SITE_CATEGORIES) {
      const el = categorySectionRefs.current[cat.id];
      if (el) {
        const rect = el.getBoundingClientRect();
        // Check if section top has reached or passed near the top threshold
        if (rect.top - containerTop <= 65) {
          matchingCategory = cat.id;
        }
      }
    }

    if (matchingCategory !== activeCategory) {
      setActiveCategory(matchingCategory);
    }
  };

  // When user clicks a category pill, smoothly scroll the main content to that section
  const scrollToCategory = (categoryId: string) => {
    if (manualScrollTimeoutRef.current) {
      clearTimeout(manualScrollTimeoutRef.current);
    }

    isManualScrollingRef.current = true;
    setActiveCategory(categoryId);

    const targetElement = categorySectionRefs.current[categoryId];
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    manualScrollTimeoutRef.current = setTimeout(() => {
      isManualScrollingRef.current = false;
    }, 600);
  };

  const handleAdd = (e: React.MouseEvent, site: SiteItem) => {
    e.stopPropagation();

    const newShortcut: MobileShortcut = {
      id: site.id,
      name: site.name,
      url: site.url,
      type: 'web',
      renderIcon: () => (
        <div className="w-full h-full flex items-center justify-center">
          <SiteLogo site={site} size="lg" />
        </div>
      ),
    };

    onAddShortcut(newShortcut);
    setAddedIds((prev) => new Set([...prev, site.id]));

    setToastMessage(`Added "${site.name}" to Home`);
    setTimeout(() => {
      setToastMessage(null);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#F7F8FA] flex flex-col font-sans select-none animate-in fade-in duration-150 overflow-hidden">
      {/* ============================================================== */}
      {/* 1. TOP HEADER (Pixel-matched to Images 2, 3, 4, 5)             */}
      {/* ============================================================== */}
      <header className="w-full h-12 bg-white border-b border-neutral-100 px-3 flex items-center justify-between shrink-0 z-20">
        <button
          type="button"
          onClick={onClose}
          className="w-9 h-9 rounded-full flex items-center justify-center text-[#1F1D1A] hover:bg-neutral-100 active:scale-90 transition-all cursor-pointer"
          title="Back to Home"
        >
          <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
        </button>

        <h1 className="text-base font-bold text-[#1F1D1A]">All sites</h1>

        <div className="w-9" />
      </header>

      {/* ============================================================== */}
      {/* 2. HORIZONTAL CATEGORY PILL FILTER BAR WITH AUTO-SCROLLING      */}
      {/* ============================================================== */}
      <div className="w-full bg-white border-b border-neutral-100 px-3 py-2.5 shrink-0 z-10 shadow-2xs flex items-center gap-1.5">
        <div
          ref={pillContainerRef}
          className="flex-1 flex items-center gap-2 overflow-x-auto scrollbar-none py-0.5 scroll-smooth"
        >
          {SITE_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                ref={(el) => {
                  pillRefs.current[cat.id] = el;
                }}
                type="button"
                onClick={() => scrollToCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-[13px] font-medium whitespace-nowrap flex items-center gap-1.5 transition-all cursor-pointer active:scale-95 shrink-0 ${
                  isActive
                    ? cat.activeBg + ' shadow-xs font-semibold scale-102'
                    : 'bg-white border border-neutral-200 text-[#444746] hover:bg-neutral-50'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Right Arrow Circular Button (Images 1 & 2) */}
        <button
          type="button"
          onClick={() => setIsCategoryPickerOpen(true)}
          className="w-7 h-7 rounded-full bg-[#EEEEEE] hover:bg-[#E0E0E0] active:scale-90 flex items-center justify-center text-[#333333] transition-all shrink-0 shadow-2xs cursor-pointer ml-1"
          title="All categories"
        >
          <ChevronRight className="w-4 h-4 stroke-[2.5]" />
        </button>
      </div>

      {/* ============================================================== */}
      {/* 2b. EXPANDED CATEGORY PICKER SHEET (Pixel-matched to Image-3)   */}
      {/* ============================================================== */}
      {isCategoryPickerOpen && (
        <div
          onClick={() => setIsCategoryPickerOpen(false)}
          className="fixed inset-0 top-12 z-40 bg-black/40 backdrop-blur-2xs flex flex-col justify-start animate-in fade-in duration-150"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full bg-white rounded-b-3xl shadow-2xl px-4 pt-3 pb-3 flex flex-col animate-in slide-in-from-top-3 duration-200 border-b border-neutral-200"
          >
            {/* All Category Pills in wrapping layout matching Image-3 */}
            <div className="flex flex-wrap gap-2.5 max-h-[62vh] overflow-y-auto scrollbar-none py-1">
              {SITE_CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      scrollToCategory(cat.id);
                      setIsCategoryPickerOpen(false);
                    }}
                    className={`px-3.5 py-1.5 rounded-full text-[13px] font-medium whitespace-nowrap flex items-center gap-1.5 transition-all cursor-pointer active:scale-95 ${
                      isActive
                        ? cat.activeBg + ' shadow-xs font-semibold'
                        : 'bg-white border border-neutral-200 text-[#444746] hover:bg-neutral-50'
                    }`}
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Bottom Center Circular Up Arrow to Close (Matching User Image-3) */}
            <div className="w-full flex justify-center pt-3 pb-1">
              <button
                type="button"
                onClick={() => setIsCategoryPickerOpen(false)}
                className="w-7 h-7 rounded-full bg-[#EEEEEE] hover:bg-[#E0E0E0] active:scale-90 flex items-center justify-center text-[#333333] transition-all shadow-2xs cursor-pointer"
                title="Close categories"
              >
                <ChevronUp className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 3. MAIN SITES CONTENT: Grouped by Category in 2-Column Grid    */}
      {/* ============================================================== */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex-1 w-full overflow-y-auto px-3.5 py-4 space-y-6 scrollbar-none scroll-smooth"
      >
        {SITE_CATEGORIES.map((category) => {
          const sitesInCategory = ALL_SITES.filter((s) => s.category === category.id);
          if (sitesInCategory.length === 0) return null;

          return (
            <div
              key={category.id}
              ref={(el) => {
                categorySectionRefs.current[category.id] = el;
              }}
              className="scroll-mt-3"
            >
              {/* Category Header */}
              <div className="flex items-center gap-2 mb-3">
                <span className="text-base">{category.icon}</span>
                <h2 className="text-[15px] font-bold text-[#1F1D1A]">{category.name}</h2>
              </div>

              {/* 2-Column Card Grid (Matching User Screenshots) */}
              <div className="grid grid-cols-2 gap-2.5">
                {sitesInCategory.map((site) => {
                  const isAdded = addedIds.has(site.id) || existingShortcutIds.includes(site.id);

                  return (
                    <div
                      key={site.id}
                      onClick={() => onNavigate(site.url)}
                      className="bg-white rounded-[14px] p-2.5 flex items-center justify-between border border-neutral-100 shadow-2xs hover:shadow-xs hover:border-neutral-200 active:scale-[0.98] transition-all cursor-pointer group"
                    >
                      {/* Logo and Name */}
                      <div className="flex items-center gap-2.5 min-w-0 flex-1 pr-1">
                        <SiteLogo site={site} size="md" />
                        <span className="text-[13px] font-medium text-[#1F1D1A] truncate">
                          {site.name}
                        </span>
                      </div>

                      {/* Add (+) Button (Images 2, 3, 4, 5) */}
                      <button
                        type="button"
                        onClick={(e) => handleAdd(e, site)}
                        className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 active:scale-90 transition-all ${
                          isAdded
                            ? 'bg-emerald-50 text-emerald-600'
                            : 'text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100'
                        }`}
                        title={isAdded ? 'Added to Home' : 'Add to Home'}
                      >
                        {isAdded ? (
                          <Check className="w-4 h-4 stroke-[2.5]" />
                        ) : (
                          <Plus className="w-4 h-4 stroke-[2.2]" />
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-14 left-1/2 -translate-x-1/2 z-50 bg-[#1F1D1A]/90 text-white text-xs font-medium px-4 py-2 rounded-full shadow-lg backdrop-blur-xs flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-150">
          <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[3]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Android 3-Button System Nav Bar (|||  ▢  ◁) */}
      <div className="w-full h-9 bg-white border-t border-neutral-100 flex items-center justify-around text-[#70757A] px-10 shrink-0">
        <div className="flex items-center gap-1">
          <div className="w-0.5 h-3.5 bg-[#70757A] rounded-full" />
          <div className="w-0.5 h-3.5 bg-[#70757A] rounded-full" />
          <div className="w-0.5 h-3.5 bg-[#70757A] rounded-full" />
        </div>
        <div className="w-3.5 h-3.5 border-2 border-[#70757A] rounded-[3px]" />
        <button
          type="button"
          onClick={onClose}
          className="p-1 active:scale-90 transition-transform"
          title="Back"
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-[#70757A] stroke-[2.5]">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
      </div>
    </div>
  );
};
