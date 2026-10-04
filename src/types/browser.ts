export type SearchEngineType = 'google' | 'bing' | 'yahoo' | 'duckduckgo' | 'yandex' | 'aol' | 'wikipedia' | 'github';

export type BrowserTheme = 'dark' | 'light' | 'midnight' | 'arc' | 'emerald';

export type TabLayoutStyle = 'horizontal' | 'vertical';

export interface TabGroup {
  id: string;
  name: string;
  color: string;
  isCollapsed?: boolean;
  updatedAgo?: string;
}

export interface Tab {
  id: string;
  title: string;
  url: string;
  displayUrl: string;
  favicon?: string;
  isLoading: boolean;
  canGoBack: boolean;
  canGoForward: boolean;
  history: string[];
  historyIndex: number;
  isPinned: boolean;
  isMuted: boolean;
  zoomLevel: number; // in percent, e.g. 100
  readerMode: boolean;
  isIncognito?: boolean;
  groupId?: string;
  customHtmlContent?: string;
  contentType?: 'web' | 'aura' | 'reader' | 'playground' | 'hackerNews' | 'wikipedia' | 'reddit' | 'notes' | 'canvas' | 'retro';
}

export interface Bookmark {
  id: string;
  title: string;
  url: string;
  favicon: string;
  folder?: string;
  createdAt: number;
}

export interface HistoryItem {
  id: string;
  title: string;
  url: string;
  favicon: string;
  timestamp: number;
  visitCount: number;
}

export type DownloadStatus = 'completed' | 'downloading' | 'paused' | 'failed';
export type DownloadCategory = 'document' | 'image' | 'media' | 'code' | 'archive' | 'other';

export interface DownloadItem {
  id: string;
  name: string;
  url: string;
  size: string;
  totalBytes?: number;
  downloadedBytes?: number;
  speed?: string;
  progress: number; // 0 - 100
  status: DownloadStatus;
  category?: DownloadCategory;
  completedAt?: number;
  startedAt?: number;
  content?: string;
  mimeType?: string;
  errorReason?: string;
}

export interface Extension {
  id: string;
  name: string;
  description: string;
  icon: string;
  enabled: boolean;
  badge?: string;
  actionType: 'adblock' | 'darkreader' | 'passwords' | 'translate' | 'customcss';
}

export interface NetworkRequest {
  id: string;
  url: string;
  method: 'GET' | 'POST' | 'PUT';
  status: number;
  statusText: string;
  type: 'document' | 'xhr' | 'fetch' | 'stylesheet' | 'script' | 'image';
  size: string;
  time: number;
  timestamp: number;
}

export interface ConsoleLog {
  id: string;
  type: 'log' | 'info' | 'warn' | 'error';
  message: string;
  timestamp: number;
}
