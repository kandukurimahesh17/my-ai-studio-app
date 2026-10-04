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
  Download,
  Share2,
  Trash2,
  ExternalLink,
  X,
  SlidersHorizontal,
} from 'lucide-react';
import { PdfViewerModal } from './PdfViewerModal';

export interface DocumentItem {
  id: string;
  name: string;
  format: 'PDF' | 'Excel' | 'Docs' | 'PPT' | 'TXT';
  date: string;
  size: string;
  isFavorite?: boolean;
  url?: string;
}

interface DocumentsScreenProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenFile?: (fileName: string, url?: string) => void;
}

const INITIAL_DOCUMENTS: DocumentItem[] = [
  {
    id: 'doc-1',
    name: 'translated_page_1790754651723.pdf',
    format: 'PDF',
    date: 'Sept 30 2026',
    size: '186 KB',
    isFavorite: false,
  },
  {
    id: 'doc-2',
    name: 'hi-GoogleSearch_1790586471874.pdf',
    format: 'PDF',
    date: 'Sept 28 2026',
    size: '217 KB',
    isFavorite: true,
  },
  {
    id: 'doc-3',
    name: 'translated_page_1790508392110.pdf',
    format: 'PDF',
    date: 'Sept 27 2026',
    size: '185 KB',
    isFavorite: false,
  },
  {
    id: 'doc-4',
    name: 'translated_page_1790508194883.pdf',
    format: 'PDF',
    date: 'Sept 27 2026',
    size: '185 KB',
    isFavorite: false,
  },
  {
    id: 'doc-5',
    name: '750+ companies official career links.xlsx',
    format: 'Excel',
    date: 'Sept 21 2026',
    size: '233 KB',
    isFavorite: true,
  },
  {
    id: 'doc-6',
    name: 'Dividend_Report_968921301.pdf',
    format: 'PDF',
    date: 'Sept 15 2026',
    size: '43.42 KB',
    isFavorite: false,
  },
  {
    id: 'doc-7',
    name: 'Dividend_Report_968921300.pdf',
    format: 'PDF',
    date: 'Sept 15 2026',
    size: '43.42 KB',
    isFavorite: false,
  },
  {
    id: 'doc-8',
    name: 'christmasmovies.org_178129910.pdf',
    format: 'PDF',
    date: 'Sept 12 2026',
    size: '315 KB',
    isFavorite: false,
  },
  {
    id: 'doc-9',
    name: 'Quarterly_Financial_Review_Q3.docx',
    format: 'Docs',
    date: 'Sept 08 2026',
    size: '520 KB',
    isFavorite: false,
  },
  {
    id: 'doc-10',
    name: 'Product_Roadmap_2027.pptx',
    format: 'PPT',
    date: 'Sept 05 2026',
    size: '1.4 MB',
    isFavorite: false,
  },
  {
    id: 'doc-11',
    name: 'Server_Configuration_Notes.txt',
    format: 'TXT',
    date: 'Aug 30 2026',
    size: '18 KB',
    isFavorite: false,
  },
];

export const DocumentsScreen: React.FC<DocumentsScreenProps> = ({
  isOpen,
  onClose,
  onOpenFile,
}) => {
  const [documents, setDocuments] = useState<DocumentItem[]>(() => {
    try {
      const saved = localStorage.getItem('lemon_documents_list');
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_DOCUMENTS;
  });

  const [activeMainTab, setActiveMainTab] = useState<'All Files' | 'Recent' | 'Favorites'>('All Files');
  const [selectedFormat, setSelectedFormat] = useState<'ALL' | 'PDF' | 'Excel' | 'Docs' | 'PPT' | 'TXT'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [selectedPdfDoc, setSelectedPdfDoc] = useState<DocumentItem | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2000);
  };

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = documents.map((doc) =>
      doc.id === id ? { ...doc, isFavorite: !doc.isFavorite } : doc
    );
    setDocuments(updated);
    try {
      localStorage.setItem('lemon_documents_list', JSON.stringify(updated));
    } catch {}
    const target = updated.find((d) => d.id === id);
    showToast(target?.isFavorite ? 'Added to Favorites' : 'Removed from Favorites');
  };

  const deleteDocument = (id: string) => {
    const updated = documents.filter((d) => d.id !== id);
    setDocuments(updated);
    try {
      localStorage.setItem('lemon_documents_list', JSON.stringify(updated));
    } catch {}
    setActiveMenuId(null);
    showToast('File removed');
  };

  // Filter pipeline
  let filteredDocs = documents;

  // 1. Main tab filter
  if (activeMainTab === 'Favorites') {
    filteredDocs = filteredDocs.filter((d) => d.isFavorite);
  } else if (activeMainTab === 'Recent') {
    filteredDocs = filteredDocs.slice(0, 5);
  }

  // 2. Format tab filter
  if (selectedFormat !== 'ALL') {
    filteredDocs = filteredDocs.filter((d) => d.format === selectedFormat);
  }

  // 3. Search query filter
  if (searchQuery.trim()) {
    filteredDocs = filteredDocs.filter((d) =>
      d.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  const renderBadge = (format: DocumentItem['format']) => {
    switch (format) {
      case 'PDF':
        return (
          <div className="w-11 h-11 rounded-xl bg-[#E53935] text-white flex flex-col items-center justify-center p-0.5 shadow-xs shrink-0 select-none relative overflow-hidden">
            <span className="text-[10px] font-black tracking-tight leading-none mt-0.5">PDF</span>
            <div className="w-5 h-0.5 bg-white/90 rounded-full mt-1.5" />
            <div className="w-3.5 h-0.5 bg-white/70 rounded-full mt-0.5" />
          </div>
        );
      case 'Excel':
        return (
          <div className="w-11 h-11 rounded-xl bg-[#107C41] text-white flex items-center justify-center shadow-xs shrink-0 select-none font-bold text-sm">
            <FileSpreadsheet className="w-6 h-6 stroke-[2]" />
          </div>
        );
      case 'Docs':
        return (
          <div className="w-11 h-11 rounded-xl bg-[#185ABD] text-white flex items-center justify-center shadow-xs shrink-0 select-none font-bold text-sm">
            <FileText className="w-6 h-6 stroke-[2]" />
          </div>
        );
      case 'PPT':
        return (
          <div className="w-11 h-11 rounded-xl bg-[#C43E1C] text-white flex items-center justify-center shadow-xs shrink-0 select-none font-bold text-sm">
            <Presentation className="w-6 h-6 stroke-[2]" />
          </div>
        );
      case 'TXT':
      default:
        return (
          <div className="w-11 h-11 rounded-xl bg-[#6B645D] text-white flex items-center justify-center shadow-xs shrink-0 select-none font-bold text-xs">
            TXT
          </div>
        );
    }
  };

  const formats: ('ALL' | 'PDF' | 'Excel' | 'Docs' | 'PPT' | 'TXT')[] = [
    'ALL',
    'PDF',
    'Excel',
    'Docs',
    'PPT',
    'TXT',
  ];

  return (
    <div className="fixed inset-0 z-50 bg-[#F3ECE2] text-[#1F1D1A] flex flex-col font-sans select-none animate-in fade-in duration-150 overflow-hidden">
      {/* 1. Android Status Bar (Themed matching Tools Screen) */}
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

      {/* 2. Top App Bar (Title: Documents, Back button, Search) */}
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
            Documents
          </h1>
        </div>

        <div className="flex items-center gap-2 text-[#1F1D1A]">
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="p-1.5 rounded-full hover:bg-black/5 active:scale-95 transition-transform"
            title="Search documents"
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
            placeholder="Search documents by name..."
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

      {/* 3. Primary Navigation Tabs: All Files | Recent | Favorites + Right Icons */}
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
            onClick={() => showToast('Sorted by newest date')}
            className="p-1 rounded-md hover:text-[#1F1D1A] hover:bg-black/5 active:scale-95 transition-transform"
            title="Sort documents"
          >
            <ArrowDownUp className="w-4.5 h-4.5" />
          </button>
          <button
            onClick={() => showToast('Selection mode')}
            className="p-1 rounded-md hover:text-[#1F1D1A] hover:bg-black/5 active:scale-95 transition-transform"
            title="Select files"
          >
            <CheckSquare className="w-4.5 h-4.5" />
          </button>
        </div>
      </div>

      {/* 4. Format Categories Bar: ALL | PDF | Excel | Docs | PPT | TXT (Matches Screenshot) */}
      <div className="w-full px-4 py-2 flex items-center gap-2 overflow-x-auto scrollbar-none shrink-0 bg-[#F3ECE2] border-b border-[#E5DFD5]">
        {formats.map((fmt) => (
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

      {/* 5. Document List Cards (Styled with app theme: white cards on cream canvas) */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2.5 scrollbar-none">
        {filteredDocs.map((doc) => (
          <div
            key={doc.id}
            onClick={() => {
              if (doc.format === 'PDF' || doc.name.toLowerCase().endsWith('.pdf')) {
                setSelectedPdfDoc(doc);
              } else {
                onOpenFile?.(doc.name, doc.url);
              }
            }}
            className="bg-white rounded-[20px] p-3 border border-[#E5DFD5] hover:border-[#D8CFBF] hover:bg-[#FAF7F2] shadow-xs flex items-center justify-between gap-3 cursor-pointer group active:scale-[0.99] transition-all relative"
          >
            {/* Left: Format Icon Badge */}
            <div className="flex items-center gap-3.5 min-w-0 flex-1">
              {renderBadge(doc.format)}

              {/* Title & Date · Size */}
              <div className="min-w-0 flex-1 pr-1">
                <h3 className="text-sm font-bold text-[#1F1D1A] leading-snug truncate">
                  {doc.name}
                </h3>
                <span className="text-xs text-[#8A8279] block mt-0.5">
                  {doc.date} · {doc.size}
                </span>
              </div>
            </div>

            {/* Right: Bookmark / Favorite toggle & 3-dots */}
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
                        <span>Open Document</span>
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
                        onClick={() => deleteDocument(doc.id)}
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

        {filteredDocs.length === 0 && (
          <div className="py-20 text-center text-[#8A8279] text-xs">
            No {selectedFormat !== 'ALL' ? selectedFormat : ''} documents found.
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

      {/* 7. Exact PDF Viewer Modal */}
      <PdfViewerModal
        isOpen={!!selectedPdfDoc}
        onClose={() => setSelectedPdfDoc(null)}
        title={selectedPdfDoc?.name}
      />
    </div>
  );
};
