import { DownloadCategory } from '../types/browser';

export function getFileCategory(filename: string): DownloadCategory {
  const ext = filename.split('.').pop()?.toLowerCase() || '';

  if (['png', 'jpg', 'jpeg', 'gif', 'svg', 'webp', 'avif', 'ico'].includes(ext)) {
    return 'image';
  }
  if (['mp3', 'wav', 'ogg', 'm4a', 'flac', 'mp4', 'webm', 'mov', 'mkv'].includes(ext)) {
    return 'media';
  }
  if (['pdf', 'doc', 'docx', 'txt', 'md', 'rtf', 'epub'].includes(ext)) {
    return 'document';
  }
  if (['html', 'htm', 'js', 'ts', 'jsx', 'tsx', 'json', 'css', 'py', 'java', 'c', 'cpp'].includes(ext)) {
    return 'code';
  }
  if (['zip', 'rar', '7z', 'tar', 'gz', 'apk', 'iso'].includes(ext)) {
    return 'archive';
  }

  return 'other';
}

export function formatBytes(bytes: number, decimals: number = 1): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export interface PresetDownload {
  name: string;
  sizeBytes: number;
  category: DownloadCategory;
  mimeType: string;
  url: string;
  description: string;
  generateSampleContent: () => string;
}

export const PRESET_DOWNLOADS: PresetDownload[] = [
  {
    name: 'lemon-mobile-browser-v2.apk',
    sizeBytes: 28400000,
    category: 'archive',
    mimeType: 'application/vnd.android.package-archive',
    url: 'https://cdn.lemonbrowser.app/releases/lemon-browser-v2.apk',
    description: 'Android App Package installer for Lemon Browser v2',
    generateSampleContent: () => 'PK\x03\x04LemonAndroidPackageBinaryPayload',
  },
  {
    name: 'react-mobile-architecture.pdf',
    sizeBytes: 4200000,
    category: 'document',
    mimeType: 'application/pdf',
    url: 'https://docs.lemon.dev/guides/react-mobile-architecture.pdf',
    description: 'Complete architecture whitepaper & design specifications',
    generateSampleContent: () => '%PDF-1.5\n1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj\nLemon Architecture Guide',
  },
  {
    name: 'citrus-wallpaper-4k.png',
    sizeBytes: 3150000,
    category: 'image',
    mimeType: 'image/png',
    url: 'https://images.unsplash.com/photo-1533038590840-1cde6e668a91?q=80&w=1200',
    description: 'High-resolution citrus fruit aesthetic wallpaper',
    generateSampleContent: () => 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400"><rect width="100%" height="100%" fill="%23f59e0b"/><circle cx="200" cy="200" r="120" fill="%23fef08a"/></svg>',
  },
  {
    name: 'lemon-chillhop-radio.mp3',
    sizeBytes: 5800000,
    category: 'media',
    mimeType: 'audio/mpeg',
    url: 'https://stream.lemonradio.fm/tracks/chillhop-citrus-breeze.mp3',
    description: 'Lo-Fi chill beats audio track with stereo master',
    generateSampleContent: () => 'ID3\x03\x00\x00\x00\x00\x00LemonFMChillhopBeats',
  },
  {
    name: 'mobile-web-template.zip',
    sizeBytes: 1450000,
    category: 'archive',
    mimeType: 'application/zip',
    url: 'https://github.com/lemon-browser/mobile-template/archive/main.zip',
    description: 'Complete React & Tailwind CSS starter template archive',
    generateSampleContent: () => 'PK\x03\x04LemonStarterTemplateArchive',
  },
  {
    name: 'interactive-canvas-demo.html',
    sizeBytes: 185000,
    category: 'code',
    mimeType: 'text/html',
    url: 'https://lemon.dev/examples/interactive-canvas.html',
    description: 'Standalone HTML5 Canvas particle animation playground',
    generateSampleContent: () => `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Lemon Particle Canvas</title>
  <style>
    body { margin: 0; background: #09090b; color: #facc15; font-family: sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; }
    h1 { font-size: 24px; }
  </style>
</head>
<body>
  <h1>🍋 Lemon Interactive Canvas</h1>
  <p>Standalone offline snapshot generated from Lemon Browser Download Manager</p>
</body>
</html>`,
  },
];
