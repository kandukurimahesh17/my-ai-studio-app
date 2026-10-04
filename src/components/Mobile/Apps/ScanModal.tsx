import React, { useState, useRef, useEffect, useCallback } from 'react';
import jsQR from 'jsqr';
import {
  X,
  QrCode,
  Flashlight,
  Camera,
  ExternalLink,
  Copy,
  Check,
  Upload,
  RefreshCw,
  Sparkles,
  SwitchCamera,
  AlertCircle,
  Globe,
} from 'lucide-react';

interface ScanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (url: string) => void;
}

export const ScanModal: React.FC<ScanModalProps> = ({ isOpen, onClose, onNavigate }) => {
  const [flashlight, setFlashlight] = useState(false);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
  const [scannedResult, setScannedResult] = useState<string | null>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [autoOpen, setAutoOpen] = useState(true);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameId = useRef<number | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Stop camera stream
  const stopCamera = useCallback(() => {
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
      animationFrameId.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  }, []);

  // Continuous frame scanning loop with jsQR
  const scanFrame = useCallback(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (video && video.readyState === video.HAVE_ENOUGH_DATA && canvas) {
      const width = video.videoWidth;
      const height = video.videoHeight;

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (ctx) {
        ctx.drawImage(video, 0, 0, width, height);
        const imageData = ctx.getImageData(0, 0, width, height);

        // Run jsQR decoder
        const code = jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: 'dontInvert',
        });

        if (code && code.data) {
          const rawData = code.data.trim();
          setScannedResult(rawData);

          // If auto-open is enabled and it is a valid web URL, open directly
          if (autoOpen && (rawData.startsWith('http://') || rawData.startsWith('https://') || rawData.startsWith('lemon://'))) {
            stopCamera();
            onClose();
            onNavigate(rawData);
            return;
          }
        }
      }
    }

    if (!scannedResult) {
      animationFrameId.current = requestAnimationFrame(scanFrame);
    }
  }, [scannedResult, autoOpen, onNavigate, onClose, stopCamera]);

  // Start camera stream
  const startCamera = useCallback(async () => {
    stopCamera();
    setCameraError(null);

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera access is not supported by your browser.');
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: facingMode },
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.setAttribute('playsinline', 'true');
        await videoRef.current.play();
        setCameraActive(true);
        animationFrameId.current = requestAnimationFrame(scanFrame);
      }
    } catch (err: unknown) {
      console.warn('Camera stream error:', err);
      setCameraActive(false);
      setCameraError('Camera access unavailable. You can upload a QR image or select a sample below.');
    }
  }, [facingMode, scanFrame, stopCamera]);

  useEffect(() => {
    if (isOpen) {
      setScannedResult(null);
      startCamera();
    } else {
      stopCamera();
    }

    return () => {
      stopCamera();
    };
  }, [isOpen, startCamera, stopCamera]);

  if (!isOpen) return null;

  // Process uploaded image file for QR code
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new window.Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          const imageData = ctx.getImageData(0, 0, img.width, img.height);
          const code = jsQR(imageData.data, imageData.width, imageData.height);
          if (code && code.data) {
            setScannedResult(code.data.trim());
          } else {
            alert('No valid QR code was detected in this image.');
          }
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleOpenUrl = (urlToOpen?: string) => {
    const target = urlToOpen || scannedResult;
    if (target) {
      let finalUrl = target.trim();
      if (!finalUrl.startsWith('http://') && !finalUrl.startsWith('https://') && !finalUrl.startsWith('lemon://')) {
        finalUrl = `https://www.google.com/search?q=${encodeURIComponent(finalUrl)}`;
      }
      stopCamera();
      onClose();
      onNavigate(finalUrl);
    }
  };

  const handleCopy = () => {
    if (scannedResult) {
      navigator.clipboard.writeText(scannedResult);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const sampleQRCodes = [
    { name: 'Google Official Blog', url: 'https://blog.google' },
    { name: 'Wikipedia', url: 'https://en.wikipedia.org' },
    { name: 'YouTube Music', url: 'https://music.youtube.com' },
    { name: 'Hacker News', url: 'https://news.ycombinator.com' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col justify-between p-4 text-white select-none animate-in fade-in duration-150">
      {/* Hidden canvas for video frame extraction */}
      <canvas ref={canvasRef} className="hidden" />
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="hidden"
      />

      {/* 1. Top Header */}
      <div className="flex items-center justify-between pt-2 px-2 z-20 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#1A73E8] flex items-center justify-center text-white shadow-xs">
            <QrCode className="w-4 h-4 stroke-[2.2]" />
          </div>
          <div>
            <h2 className="font-bold text-sm text-white leading-tight">QR Code Scanner</h2>
            <span className="text-[10px] text-neutral-400">Scan URLs & websites</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Upload image button */}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="p-2 rounded-full bg-neutral-800/80 hover:bg-neutral-700 text-neutral-200 transition-colors"
            title="Scan from Photo"
          >
            <Upload className="w-4 h-4" />
          </button>

          {/* Switch Camera */}
          <button
            onClick={() => setFacingMode((prev) => (prev === 'environment' ? 'user' : 'environment'))}
            className="p-2 rounded-full bg-neutral-800/80 hover:bg-neutral-700 text-neutral-200 transition-colors"
            title="Switch Camera"
          >
            <SwitchCamera className="w-4 h-4" />
          </button>

          {/* Close */}
          <button
            onClick={() => {
              stopCamera();
              onClose();
            }}
            className="p-2 rounded-full bg-neutral-800/80 hover:bg-neutral-700 text-neutral-200 hover:text-white transition-colors"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* 2. Main Viewfinder Area */}
      <div className="flex-1 flex flex-col items-center justify-center my-4 relative">
        <div className="relative w-72 h-72 sm:w-80 sm:h-80 rounded-[32px] overflow-hidden border-2 border-[#1A73E8]/80 shadow-[0_0_30px_rgba(26,115,232,0.3)] flex items-center justify-center bg-neutral-950">
          {/* Live Video Camera Stream */}
          <video
            ref={videoRef}
            playsInline
            muted
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              cameraActive ? 'opacity-100' : 'opacity-0'
            }`}
          />

          {/* Placeholder if camera stream is loading or denied */}
          {!cameraActive && (
            <div className="absolute inset-0 bg-neutral-900 flex flex-col items-center justify-center p-6 text-center">
              <Camera className="w-12 h-12 text-neutral-600 mb-3 animate-pulse" />
              <p className="text-xs text-neutral-400 leading-relaxed font-medium">
                {cameraError || 'Initializing camera for real-time QR scanning...'}
              </p>
              <button
                onClick={() => startCamera()}
                className="mt-3 px-3.5 py-1.5 rounded-full bg-[#1A73E8] text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm active:scale-95 transition-transform"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Retry Camera</span>
              </button>
            </div>
          )}

          {/* Animated Laser Scanning Line */}
          {cameraActive && !scannedResult && (
            <div className="absolute inset-x-4 top-0 h-1 bg-gradient-to-r from-transparent via-[#1A73E8] to-transparent shadow-[0_0_12px_#1A73E8] animate-pulse" />
          )}

          {/* Corner Guides (Chrome / Google Material styling) */}
          <div className="absolute top-4 left-4 w-7 h-7 border-t-[3.5px] border-l-[3.5px] border-[#1A73E8] rounded-tl-xl pointer-events-none" />
          <div className="absolute top-4 right-4 w-7 h-7 border-t-[3.5px] border-r-[3.5px] border-[#1A73E8] rounded-tr-xl pointer-events-none" />
          <div className="absolute bottom-4 left-4 w-7 h-7 border-b-[3.5px] border-l-[3.5px] border-[#1A73E8] rounded-bl-xl pointer-events-none" />
          <div className="absolute bottom-4 right-4 w-7 h-7 border-b-[3.5px] border-r-[3.5px] border-[#1A73E8] rounded-br-xl pointer-events-none" />
        </div>

        {/* 3. Scanned Result Card */}
        {scannedResult ? (
          <div className="mt-5 w-full max-w-sm bg-neutral-900/95 border border-neutral-800 rounded-3xl p-4 shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 mb-1">
              <Sparkles className="w-4 h-4" />
              <span>QR Code Successfully Detected</span>
            </div>

            <div className="bg-black/50 border border-neutral-800 rounded-xl p-2.5 my-2">
              <p className="text-xs text-neutral-200 font-mono break-all line-clamp-2 select-all">
                {scannedResult}
              </p>
            </div>

            <div className="flex items-center gap-2 mt-3">
              <button
                onClick={() => handleOpenUrl()}
                className="flex-1 py-2 rounded-xl bg-[#1A73E8] hover:bg-blue-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-transform"
              >
                <span>Open in Browser</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={handleCopy}
                className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 transition-colors"
                title="Copy link"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>

              <button
                onClick={() => {
                  setScannedResult(null);
                  startCamera();
                }}
                className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 transition-colors"
                title="Scan again"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          /* Test Sample QR Code chips */
          <div className="mt-4 flex flex-col items-center">
            <span className="text-[11px] text-neutral-400 mb-2 font-medium">
              Or tap a sample link to simulate scan:
            </span>
            <div className="flex flex-wrap gap-2 justify-center max-w-xs">
              {sampleQRCodes.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => handleOpenUrl(s.url)}
                  className="px-3 py-1 bg-neutral-900/90 hover:bg-neutral-800 text-[11px] text-neutral-300 rounded-full border border-neutral-800 hover:border-neutral-700 active:scale-95 transition-all"
                >
                  {s.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 4. Bottom Controls */}
      <div className="flex items-center justify-between px-4 py-2 border-t border-neutral-900/80 z-20">
        <label className="flex items-center gap-2 cursor-pointer text-xs text-neutral-400">
          <input
            type="checkbox"
            checked={autoOpen}
            onChange={(e) => setAutoOpen(e.target.checked)}
            className="rounded border-neutral-700 text-[#1A73E8] focus:ring-0"
          />
          <span>Auto-open scanned URLs</span>
        </label>

        <button
          onClick={() => fileInputRef.current?.click()}
          className="text-xs font-semibold text-[#1A73E8] hover:underline flex items-center gap-1"
        >
          <Upload className="w-3.5 h-3.5" />
          <span>Select Photo</span>
        </button>
      </div>
    </div>
  );
};
