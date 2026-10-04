import React, { useRef, useState, useEffect } from 'react';
import { Palette, Download, Undo, Trash2, Brush, Circle, Square, Minus } from 'lucide-react';

interface PaintCanvasPageProps {
  onAddDownload: (filename: string, content: string, mimeType: string) => void;
}

export const PaintCanvasPage: React.FC<PaintCanvasPageProps> = ({ onAddDownload }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#38bdf8');
  const [lineWidth, setLineWidth] = useState(4);
  const [tool, setTool] = useState<'brush' | 'eraser' | 'line' | 'rect' | 'circle'>('brush');
  const [startPos, setStartPos] = useState<{ x: number; y: number } | null>(null);
  const [history, setHistory] = useState<ImageData[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    canvas.width = canvas.parentElement?.clientWidth || 900;
    canvas.height = canvas.parentElement?.clientHeight || 600;

    // Fill background with dark slate
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Initial greeting sketch
    ctx.fillStyle = '#facc15';
    ctx.font = '20px sans-serif';
    ctx.fillText('Lemon Web Whiteboard & Canvas', 40, 50);
    ctx.fillStyle = '#94a3b8';
    ctx.font = '14px sans-serif';
    ctx.fillText('Sketch ideas, annotate diagrams, or draw freely.', 40, 75);

    saveState();
  }, []);

  const saveState = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const state = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setHistory((prev) => [...prev.slice(-10), state]);
  };

  const handleUndo = () => {
    if (history.length <= 1) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const newHistory = [...history];
    newHistory.pop(); // remove current
    const previous = newHistory[newHistory.length - 1];
    ctx.putImageData(previous, 0, 0);
    setHistory(newHistory);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setIsDrawing(true);
    setStartPos({ x, y });

    if (tool === 'brush' || tool === 'eraser') {
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.strokeStyle = tool === 'eraser' ? '#0f172a' : color;
      ctx.lineWidth = lineWidth;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (tool === 'brush' || tool === 'eraser') {
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !startPos) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;

      if (tool === 'line') {
        ctx.beginPath();
        ctx.moveTo(startPos.x, startPos.y);
        ctx.lineTo(x, y);
        ctx.stroke();
      } else if (tool === 'rect') {
        ctx.strokeRect(startPos.x, startPos.y, x - startPos.x, y - startPos.y);
      } else if (tool === 'circle') {
        const radius = Math.sqrt(Math.pow(x - startPos.x, 2) + Math.pow(y - startPos.y, 2));
        ctx.beginPath();
        ctx.arc(startPos.x, startPos.y, radius, 0, 2 * Math.PI);
        ctx.stroke();
      }
    }

    setIsDrawing(false);
    setStartPos(null);
    saveState();
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    saveState();
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL('image/png');
    onAddDownload('lemon-drawing.png', dataUrl, 'image/png');
  };

  const COLORS = ['#facc15', '#38bdf8', '#34d399', '#f43f5e', '#fbbf24', '#a855f7', '#ffffff', '#94a3b8'];

  return (
    <div className="flex-1 h-full overflow-hidden flex flex-col bg-neutral-950 text-neutral-100">
      {/* Toolbar */}
      <header className="bg-neutral-900 border-b border-neutral-800 px-4 py-2 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
            <Palette className="w-4 h-4" />
            <span>Web Canvas</span>
          </div>

          {/* Tools */}
          <div className="flex items-center gap-1 bg-neutral-950 p-1 rounded-lg border border-neutral-800">
            <button
              onClick={() => setTool('brush')}
              className={`p-1.5 rounded ${tool === 'brush' ? 'bg-neutral-800 text-sky-400' : 'text-neutral-400 hover:text-white'}`}
              title="Brush"
            >
              <Brush className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setTool('line')}
              className={`p-1.5 rounded ${tool === 'line' ? 'bg-neutral-800 text-sky-400' : 'text-neutral-400 hover:text-white'}`}
              title="Line"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setTool('rect')}
              className={`p-1.5 rounded ${tool === 'rect' ? 'bg-neutral-800 text-sky-400' : 'text-neutral-400 hover:text-white'}`}
              title="Rectangle"
            >
              <Square className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setTool('circle')}
              className={`p-1.5 rounded ${tool === 'circle' ? 'bg-neutral-800 text-sky-400' : 'text-neutral-400 hover:text-white'}`}
              title="Circle"
            >
              <Circle className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setTool('eraser')}
              className={`p-1.5 rounded ${tool === 'eraser' ? 'bg-neutral-800 text-rose-400' : 'text-neutral-400 hover:text-white'}`}
              title="Eraser"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Colors */}
          <div className="flex items-center gap-1.5">
            {COLORS.map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                aria-label={`Select color ${c}`}
                className={`w-5 h-5 rounded-full transition-transform ${
                  color === c ? 'scale-125 ring-2 ring-white ring-offset-1 ring-offset-neutral-900' : 'hover:scale-110'
                }`}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>

          {/* Line width */}
          <div className="flex items-center gap-2 text-neutral-400 ml-2">
            <span>Size:</span>
            <input
              type="range"
              min="1"
              max="20"
              value={lineWidth}
              onChange={(e) => setLineWidth(Number(e.target.value))}
              aria-label="Stroke width"
              className="w-20 accent-sky-400 cursor-pointer"
            />
            <span className="tabular-nums font-mono text-[11px]">{lineWidth}px</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleUndo}
            disabled={history.length <= 1}
            className="px-2.5 py-1.5 bg-neutral-800 hover:bg-neutral-700 disabled:opacity-40 text-neutral-200 rounded-lg flex items-center gap-1 transition-colors"
          >
            <Undo className="w-3.5 h-3.5" />
            <span>Undo</span>
          </button>

          <button
            onClick={handleClear}
            className="px-2.5 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded-lg flex items-center gap-1 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear</span>
          </button>

          <button
            onClick={handleDownload}
            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-lg flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Save PNG</span>
          </button>
        </div>
      </header>

      {/* Canvas Viewport */}
      <div className="flex-1 w-full h-full relative cursor-crosshair overflow-hidden">
        <canvas
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={() => setIsDrawing(false)}
          className="absolute inset-0 block w-full h-full"
        />
      </div>
    </div>
  );
};
