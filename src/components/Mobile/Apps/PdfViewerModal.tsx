import React, { useState } from 'react';
import {
  ChevronLeft,
  BookOpen,
  Search,
  Share2,
  Printer,
  MoreVertical,
  Sparkles,
  Wand2,
  X,
  Check,
  ZoomIn,
  ZoomOut,
  RotateCw,
} from 'lucide-react';

interface PdfViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  content?: string;
  onSaveToDevice?: (fileName: string) => void;
}

const DEFAULT_PDF_TEXT = `SS 313105 y Junta de Educación Serondarp Inglés Fecha de nacimiento Nonito de la Junta de Edoación Secundaria Certificado THT Kandukuri Mahesh Orafuundaeseonesa Educación SOART OP SEO R Nombre del padre: Kandukuri ArunachalamSegondAdInducation Boarn de la madre de SEO Nombre: Kandukuri Sujathar o Shcondary Eduoa a bordo de SEC Ndaryo Uon Board de SEOONDAR EDUCTONSOARB de SEG Rodamiento Roll Roll No. 1916112058 Oard Seonda Nboard GF Educaton Secundaria Soard of SEG Perteneciente a Sri Mallikarjuna HS Rajampalli, Prakasam Districtugation Board de SEC ha aparecido y aprobado el examen SSC celebrado en marzo de 2019 con GPA 9.3SEEO CONGAYDAWAUNON Board de SEO Primer idioma Certificado de la escuela secundaria Segunda lengua: (Tercer idioma Matemáticas Temas curriculares Socialstudios Dos cero cero tres El candidato aseguró los siguientes grados y puntos de grado en el área curricular: ciencia general: 16/03/2003 Área co-curricular: sujeto a Andhra Pradesh, India regular PCI16 / 15622/0313105 / K8 AS MEDIO DE INSTRUCCIONES. PUNTOS DE GRADO INGLÉS MEDIO (GPA) Herdor Telugu Valor Educación y habilidades de vida Educación cultural y cultural Hindi Fecha de emisión: 14.05.2019 con SSSPINNPRAKASAM DT SRI Mallikarjuha High School HeakaAmralbhvij & Post) Un seis 1) Un mole en el pecho A + A + Marcas de Identificatiano: 2) un lunar en la mano derecha`;

export const PdfViewerModal: React.FC<PdfViewerModalProps> = ({
  isOpen,
  onClose,
  title = 'SS 313105 y Junta de Educación.pdf',
  content,
  onSaveToDevice,
}) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [zoomLevel, setZoomLevel] = useState(100);
  const [showOptionsMenu, setShowOptionsMenu] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [aiSummaryModal, setAiSummaryModal] = useState(false);

  if (!isOpen) return null;

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title,
          text: 'PDF Document: ' + title,
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard?.writeText?.(window.location.href);
      showToast('Link copied to clipboard');
    }
  };

  const textToRender = content || DEFAULT_PDF_TEXT;

  return (
    <div className="fixed inset-0 z-50 bg-[#F4F4F6] text-[#1F1D1A] flex flex-col font-sans select-none animate-in fade-in duration-150 overflow-hidden">
      {/* 1. Android Status Bar (Exact Red Bar from Screenshot: 00:04 | Vibrate | WiFi | Cell | 59%⚡) */}
      <div className="w-full h-7 bg-[#E50914] px-4 flex items-center justify-between text-white text-xs font-semibold shrink-0 select-none">
        {/* Time */}
        <span className="text-[13px] font-bold tracking-tight">00:04</span>

        {/* Status Icons */}
        <div className="flex items-center gap-2">
          {/* Phone Vibration icon */}
          <div className="flex items-center">
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
              <path d="M16 19H8V5h8v14m0-16H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2m5 4h1v10h-1V7M3 7h1v10H3V7m19 2h1v6h-1V9M1 9h1v6H1V9z" />
            </svg>
          </div>

          {/* WiFi */}
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M12 4C7.31 4 3.07 5.9 0 8.98L12 21 24 8.98C20.93 5.9 16.69 4 12 4z" />
          </svg>

          {/* Cellular signal bars */}
          <div className="flex items-end gap-0.5 h-3">
            <div className="w-[2.5px] h-1 bg-white rounded-xs" />
            <div className="w-[2.5px] h-1.5 bg-white rounded-xs" />
            <div className="w-[2.5px] h-2 bg-white rounded-xs" />
            <div className="w-[2.5px] h-2.5 bg-white rounded-xs" />
          </div>

          {/* Battery 59% with lightning bolt */}
          <div className="flex items-center gap-0.5 border border-white/90 rounded-sm px-1 py-[0.5px] text-[10px] font-bold">
            <span>59</span>
            <svg viewBox="0 0 24 24" className="w-2.5 h-2.5 fill-current">
              <path d="M7 2v11h3v9l7-12h-4l4-8z" />
            </svg>
          </div>
        </div>
      </div>

      {/* 2. Top Action Bar (Light Grey Header with Spaced Icons from Screenshot) */}
      <div className="w-full h-14 bg-[#EFEFEF] border-b border-[#E0E0E2] px-3 flex items-center justify-between shrink-0 shadow-xs">
        {/* Left: Back Arrow */}
        <button
          onClick={onClose}
          className="p-2 -ml-1 text-[#1F1D1A] hover:bg-black/5 active:scale-90 transition-transform rounded-full"
          title="Back"
        >
          <ChevronLeft className="w-6 h-6 stroke-[2.2]" />
        </button>

        {/* Center / Right Action Icons */}
        <div className="flex items-center gap-4 sm:gap-6 pr-1">
          {/* Violet Open Book Icon */}
          <button
            onClick={() => showToast('Continuous reading mode enabled')}
            className="p-1.5 rounded-full hover:bg-black/5 active:scale-90 transition-transform text-[#5E35B1]"
            title="Reading Mode"
          >
            <BookOpen className="w-6 h-6 fill-[#5E35B1] stroke-[#5E35B1]" />
          </button>

          {/* Search Icon */}
          <button
            onClick={() => setIsSearching(!isSearching)}
            className="p-1.5 rounded-full hover:bg-black/5 active:scale-90 transition-transform text-[#1F1D1A]"
            title="Find in document"
          >
            <Search className="w-5 h-5 stroke-[2.2]" />
          </button>

          {/* Share Icon */}
          <button
            onClick={handleShare}
            className="p-1.5 rounded-full hover:bg-black/5 active:scale-90 transition-transform text-[#1F1D1A]"
            title="Share document"
          >
            <Share2 className="w-5 h-5 stroke-[2]" />
          </button>

          {/* Printer Icon */}
          <button
            onClick={handlePrint}
            className="p-1.5 rounded-full hover:bg-black/5 active:scale-90 transition-transform text-[#1F1D1A]"
            title="Print"
          >
            <Printer className="w-5 h-5 stroke-[2]" />
          </button>

          {/* 3 Vertical Dots Menu */}
          <div className="relative">
            <button
              onClick={() => setShowOptionsMenu(!showOptionsMenu)}
              className="p-1.5 rounded-full hover:bg-black/5 active:scale-90 transition-transform text-[#1F1D1A]"
              title="More options"
            >
              <MoreVertical className="w-5 h-5 stroke-[2.2]" />
            </button>

            {/* Dropdown Menu */}
            {showOptionsMenu && (
              <div className="absolute right-0 top-10 w-48 bg-white rounded-xl shadow-xl border border-neutral-200 py-1.5 z-50 text-xs font-semibold">
                <button
                  onClick={() => {
                    setZoomLevel((z) => Math.min(z + 20, 200));
                    setShowOptionsMenu(false);
                  }}
                  className="w-full px-4 py-2.5 text-left hover:bg-neutral-100 flex items-center justify-between"
                >
                  <span>Zoom In</span>
                  <ZoomIn className="w-4 h-4 text-neutral-500" />
                </button>
                <button
                  onClick={() => {
                    setZoomLevel((z) => Math.max(z - 20, 60));
                    setShowOptionsMenu(false);
                  }}
                  className="w-full px-4 py-2.5 text-left hover:bg-neutral-100 flex items-center justify-between"
                >
                  <span>Zoom Out</span>
                  <ZoomOut className="w-4 h-4 text-neutral-500" />
                </button>
                <button
                  onClick={() => {
                    showToast('Document rotated 90°');
                    setShowOptionsMenu(false);
                  }}
                  className="w-full px-4 py-2.5 text-left hover:bg-neutral-100 flex items-center justify-between"
                >
                  <span>Rotate</span>
                  <RotateCw className="w-4 h-4 text-neutral-500" />
                </button>
                <div className="h-px bg-neutral-100 my-1" />
                <button
                  onClick={() => {
                    onSaveToDevice?.(title);
                    showToast('Downloaded to device');
                    setShowOptionsMenu(false);
                  }}
                  className="w-full px-4 py-2.5 text-left hover:bg-neutral-100 text-[#1A73E8]"
                >
                  Save as PDF
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* In-Document Search Bar (Toggled) */}
      {isSearching && (
        <div className="w-full bg-white border-b border-neutral-200 px-4 py-2 flex items-center gap-2 shadow-xs shrink-0">
          <Search className="w-4 h-4 text-neutral-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search text in document..."
            className="flex-1 text-xs outline-none text-[#1F1D1A]"
            autoFocus
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="p-1 text-neutral-400 hover:text-neutral-700">
              <X className="w-3.5 h-3.5" />
            </button>
          )}
          <button
            onClick={() => setIsSearching(false)}
            className="text-xs font-bold text-[#1A73E8] px-2 py-1"
          >
            Done
          </button>
        </div>
      )}

      {/* Toast Feedback */}
      {toastMsg && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 px-4 py-2 bg-[#1F1D1A]/95 text-white text-xs font-semibold rounded-2xl shadow-xl animate-in fade-in duration-150">
          {toastMsg}
        </div>
      )}

      {/* 3. Document Canvas Viewport (Soft Grey Background + Pure White Sheet with Exact Text from Screenshot) */}
      <div className="flex-1 overflow-y-auto bg-[#ECECEE] p-0 sm:p-4 flex flex-col items-center">
        <div
          className="w-full max-w-[680px] bg-white min-h-full sm:min-h-[850px] px-5 pt-8 pb-14 sm:px-8 sm:py-10 shadow-xs sm:shadow-md transition-transform duration-200"
          style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
        >
          {/* Document Content */}
          <div className="text-[#202124] text-[13.5px] sm:text-[14px] leading-[1.65] font-sans text-left font-normal select-text tracking-normal">
            {searchQuery.trim() ? (
              // Highlight matched words
              textToRender.split(new RegExp(`(${searchQuery})`, 'gi')).map((part, idx) =>
                part.toLowerCase() === searchQuery.toLowerCase() ? (
                  <mark key={idx} className="bg-yellow-300 text-black px-0.5 rounded-xs font-bold">
                    {part}
                  </mark>
                ) : (
                  part
                )
              )
            ) : (
              <p className="whitespace-pre-line text-[#202124] font-normal leading-[1.65]">
                {textToRender}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* 4. Bottom Toolbar (Exact Icons from Screenshot: ⇅ | 🔖 | 📥 | Floating AI Purple Wand FAB - No a-z icon) */}
      <div className="w-full h-18 bg-white border-t border-[#F0F0F0] px-6 sm:px-8 flex items-center justify-between shrink-0 select-none shadow-[0_-2px_10px_rgba(0,0,0,0.02)] relative z-40">
        {/* Left 3 Action Icons (Generously spaced) */}
        <div className="flex items-center justify-between flex-1 max-w-[240px] sm:max-w-[280px]">
          {/* Sort / Reorder Vertical Arrows (⇅) */}
          <button
            onClick={() => showToast('Page order: 1 of 1')}
            className="p-2 text-[#202124] hover:bg-black/5 active:scale-90 transition-transform rounded-full"
            title="Page Order"
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-[#202124]" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 19V5M7 5L3 9M7 5L11 9M17 5V19M17 19L13 15M17 19L21 15" />
            </svg>
          </button>

          {/* Bookmark Ribbon */}
          <button
            onClick={() => {
              setIsBookmarked(!isBookmarked);
              showToast(isBookmarked ? 'Bookmark removed' : 'Page bookmarked');
            }}
            className={`p-2 transition-transform active:scale-90 rounded-full hover:bg-black/5 ${
              isBookmarked ? 'text-[#5E35B1]' : 'text-[#202124]'
            }`}
            title="Bookmark"
          >
            <svg
              viewBox="0 0 24 24"
              className={`w-6 h-6 ${isBookmarked ? 'fill-[#5E35B1] stroke-[#5E35B1]' : 'fill-none stroke-[#202124]'}`}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 21L12 16L5 21V5C5 3.89543 5.89543 3 7 3H17C18.1046 3 19 3.89543 19 5V21Z" />
            </svg>
          </button>

          {/* Download Tray Arrow (⤓) */}
          <button
            onClick={() => {
              onSaveToDevice?.(title);
              showToast('PDF saved to downloads folder');
            }}
            className="p-2 text-[#202124] hover:bg-black/5 active:scale-90 transition-transform rounded-full"
            title="Download PDF"
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-[#202124]" fill="none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3V15M12 15L7 10M12 15L17 10M4 20H20" />
            </svg>
          </button>
        </div>

        {/* Right: Floating Action Button (Soft Lavender Rounded Pill with Dark Purple Wand & Sparkles) */}
        <button
          onClick={() => setAiSummaryModal(true)}
          className="w-18 h-13.5 sm:w-20 sm:h-14 bg-[#EDE7F6] hover:bg-[#E1D8EE] active:scale-95 transition-all rounded-[22px] flex items-center justify-center text-[#5E35B1] shadow-xs group ml-4"
          title="AI Document Tools"
        >
          <div className="relative flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-7 h-7 fill-[#5E35B1]">
              {/* Magic Wand Body */}
              <path d="M7.5 5.6L4.2 8.9c-.4.4-.4 1 0 1.4l9.5 9.5c.4.4 1 .4 1.4 0l3.3-3.3c.4-.4.4-1 0-1.4L8.9 5.6c-.4-.4-1-.4-1.4 0z" />
              {/* Sparkles around tip */}
              <path d="M14.5 2.5l.7 1.6 1.6.7-1.6.7-.7 1.6-.7-1.6-1.6-.7 1.6-.7zM19.5 7.5l.5 1.1 1.1.5-1.1.5-.5 1.1-.5-1.1-1.1-.5 1.1-.5zM3 3l.5 1.1 1.1.5-1.1.5-.5 1.1-.5-1.1-1.1-.5 1.1-.5z" />
            </svg>
          </div>
        </button>
      </div>

      {/* 5. Android Bottom 3-Button System Navigation (Exact from Screenshot: 三  ▢  ◁) */}
      <div className="w-full h-11 bg-white border-t border-[#EAEAEA] flex items-center justify-around text-[#A0A0A0] select-none shrink-0 px-8">
        {/* Recent apps: 3 horizontal lines */}
        <button onClick={onClose} className="p-2 hover:text-[#1F1D1A] active:scale-90" title="Recent Apps">
          <div className="flex flex-col gap-[3px] items-center justify-center">
            <div className="w-4 h-[2px] bg-[#A0A0A0] rounded-full" />
            <div className="w-4 h-[2px] bg-[#A0A0A0] rounded-full" />
            <div className="w-4 h-[2px] bg-[#A0A0A0] rounded-full" />
          </div>
        </button>

        {/* Home: Rounded Square Outline */}
        <button onClick={onClose} className="p-2 hover:text-[#1F1D1A] active:scale-90" title="Home">
          <div className="w-3.5 h-3.5 border-2 border-[#A0A0A0] rounded-[4px]" />
        </button>

        {/* Back: Left-pointing outline triangle */}
        <button onClick={onClose} className="p-2 hover:text-[#1F1D1A] active:scale-90" title="Back">
          <svg className="w-3.5 h-3.5 stroke-[#A0A0A0] fill-none" strokeWidth="1.6" viewBox="0 0 24 24">
            <polygon points="18,5 6,12 18,19" />
          </svg>
        </button>
      </div>

      {/* AI Assistant Modal from Magic Wand FAB */}
      {aiSummaryModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-t-3xl sm:rounded-2xl max-w-md w-full p-5 shadow-2xl flex flex-col space-y-3 border-t sm:border border-neutral-200">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
              <div className="flex items-center gap-2 text-[#5E35B1]">
                <Wand2 className="w-5 h-5" />
                <h3 className="font-bold text-sm text-[#1F1D1A]">AI Document Assistant</h3>
              </div>
              <button
                onClick={() => setAiSummaryModal(false)}
                className="text-neutral-400 hover:text-neutral-700 p-1 rounded-full"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-neutral-600 leading-relaxed">
              This secondary school education certificate belongs to{' '}
              <strong className="text-[#1F1D1A]">Kandukuri Mahesh</strong>, son of Kandukuri Arunachalam & Kandukuri Sujatha, from Sri Mallikarjuna High School (Prakasam District). Examination completed in March 2019 with a GPA of <strong className="text-[#5E35B1]">9.3</strong>.
            </p>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                onClick={() => {
                  navigator.clipboard?.writeText?.(textToRender);
                  showToast('Full certificate text copied');
                  setAiSummaryModal(false);
                }}
                className="py-2 px-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 active:scale-95 transition-transform"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Copy Text</span>
              </button>

              <button
                onClick={() => {
                  showToast('Document translated to English');
                  setAiSummaryModal(false);
                }}
                className="py-2 px-3 bg-[#EDE7F6] hover:bg-[#E1D8EE] text-[#5E35B1] text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 active:scale-95 transition-transform"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Translate</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
