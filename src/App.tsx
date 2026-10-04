/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Tab, TabGroup, Bookmark, HistoryItem, DownloadItem, Extension, SearchEngineType } from './types/browser';
import {
  DEFAULT_BOOKMARKS,
  DEFAULT_EXTENSIONS,
} from './utils/browserConstants';
import { normalizeBrowserUrl, getFaviconForUrl, getTitleForUrl } from './utils/urlHelper';

// Mobile Chrome & UI
import { MobileStatusBar } from './components/Mobile/MobileStatusBar';
import { MobileBottomBar } from './components/Mobile/MobileBottomBar';
import { AndroidSystemNav } from './components/Mobile/AndroidSystemNav';
import { MobileTabSwitcher } from './components/Mobile/MobileTabSwitcher';
import { MobileMenuSheet } from './components/Mobile/MobileMenuSheet';
import { MobileBrowserHeader } from './components/Mobile/MobileBrowserHeader';
import { MobileHomeNewTab } from './components/WebPages/MobileHomeNewTab';
import { PrivateHomeNewTab } from './components/WebPages/PrivateHomeNewTab';
import { IncognitoNotificationBanner } from './components/Mobile/IncognitoNotificationBanner';
import { EdgeSwipeNavigation } from './components/Mobile/EdgeSwipeNavigation';

// Built-in Mobile Mini-Apps & Drawers
import { CleanModal } from './components/Mobile/Apps/CleanModal';
import { MusicPlayerDrawer } from './components/Mobile/Apps/MusicPlayerDrawer';
import { SportsScoresDrawer } from './components/Mobile/Apps/SportsScoresDrawer';
import { MoreAppsModal } from './components/Mobile/Apps/MoreAppsModal';
import { DownloadManagerDrawer } from './components/Mobile/Apps/DownloadManagerDrawer';
import { NewDownloadModal } from './components/Mobile/Apps/NewDownloadModal';
import { FilePreviewModal } from './components/Mobile/Apps/FilePreviewModal';
import { DownloadToast } from './components/Mobile/DownloadToast';
import { ScanModal } from './components/Mobile/Apps/ScanModal';
import { ToolsDrawer } from './components/Mobile/Apps/ToolsDrawer';
import { BookmarksDrawer } from './components/Mobile/Apps/BookmarksDrawer';
import { HistoryDrawer } from './components/Mobile/Apps/HistoryDrawer';
import { BookmarkToast } from './components/Mobile/BookmarkToast';
import { BrowserTabMenuModal } from './components/Mobile/BrowserTabMenuModal';
import { FindInPageBar } from './components/Mobile/FindInPageBar';
import { FeedbackModal } from './components/Mobile/FeedbackModal';
import { WhatsAppStatusSaverModal } from './components/Mobile/Apps/WhatsAppStatusSaverModal';
import { SmartVideoDownloaderModal } from './components/Mobile/Apps/SmartVideoDownloaderModal';
import { SmartVideoDetectorBadge } from './components/Mobile/SmartVideoDetectorBadge';
import { GoogleMobileNewTab } from './components/WebPages/GoogleMobileNewTab';
import { ChromeTabGroupBottomBar } from './components/Mobile/ChromeTabGroupBottomBar';
import { DataSaverModal } from './components/Mobile/Apps/DataSaverModal';
import { ReportSiteModal } from './components/Mobile/Apps/ReportSiteModal';
import { BrowserBottomNav } from './components/Mobile/BrowserBottomNav';
import { DESKTOP_USER_AGENT, MOBILE_USER_AGENT } from './utils/userAgentHelper';
import { getFileCategory, formatBytes } from './utils/downloadHelper';
import { extractFilename } from './services/nativeDownloadManager';

// Web Pages
import { GoogleSearchEngine } from './components/WebPages/GoogleSearchEngine';
import { WikipediaViewer } from './components/WebPages/WikipediaViewer';
import { HackerNewsViewer } from './components/WebPages/HackerNewsViewer';
import { RedditViewer } from './components/WebPages/RedditViewer';
import { CodePlaygroundPage } from './components/WebPages/CodePlaygroundPage';
import { NotesPage } from './components/WebPages/NotesPage';
import { PaintCanvasPage } from './components/WebPages/PaintCanvasPage';
import { RetroWeb90sPage } from './components/WebPages/RetroWeb90sPage';
import { GeneralWebEmbed } from './components/WebPages/GeneralWebEmbed';
import { ReaderMode } from './components/ReaderMode';

// Internal Pages
import { HistoryPage } from './components/InternalPages/HistoryPage';
import { BookmarksPage } from './components/InternalPages/BookmarksPage';

// Modals
import { CertificateModal } from './components/Modals/CertificateModal';
import { ExtensionsModal } from './components/Modals/ExtensionsModal';
import { DownloadsDrawer } from './components/Modals/DownloadsDrawer';
import { SettingsModal } from './components/Modals/SettingsModal';
import { ShortcutsModal } from './components/Modals/ShortcutsModal';
import { DevToolsDrawer } from './components/DevTools/DevToolsDrawer';
import { Smartphone, Monitor } from 'lucide-react';

export default function App() {
  // Tabs State (matching Phoenix browser open tabs state from user screenshot)
  const [tabs, setTabs] = useState<Tab[]>([
    {
      id: 'tab-1',
      title: 'hi - Google',
      url: 'https://www.google.com/search?q=hi',
      displayUrl: 'google.com/search?q=hi',
      favicon: '🔍',
      isLoading: false,
      canGoBack: false,
      canGoForward: false,
      history: ['https://www.google.com/search?q=hi'],
      historyIndex: 0,
      isPinned: false,
      isMuted: false,
      zoomLevel: 100,
      readerMode: false,
      groupId: 'grp-1',
    },
    {
      id: 'tab-2',
      title: 'google trends',
      url: 'https://www.google.com/search?q=google+trends',
      displayUrl: 'google.com/search?q=google+trends',
      favicon: '🔍',
      isLoading: false,
      canGoBack: false,
      canGoForward: false,
      history: ['https://www.google.com/search?q=google+trends'],
      historyIndex: 0,
      isPinned: false,
      isMuted: false,
      zoomLevel: 100,
      readerMode: false,
      groupId: 'grp-1',
    },
    {
      id: 'tab-3',
      title: 'iPhone 18 Pro Price Drops to Rs 64,900 with BytePe Exchange Offers',
      url: 'https://news.google.com/iphone-18-pro',
      displayUrl: 'techradar.com/news',
      favicon: '📱',
      isLoading: false,
      canGoBack: false,
      canGoForward: false,
      history: ['https://news.google.com/iphone-18-pro'],
      historyIndex: 0,
      isPinned: false,
      isMuted: false,
      zoomLevel: 100,
      readerMode: false,
    },
    {
      id: 'tab-4',
      title: 'browse and adopt pets remotely using React.js, Vite.js, and MongoDB',
      url: 'https://petfinder.org/adopt',
      displayUrl: 'petfinder.org/adopt',
      favicon: '🐶',
      isLoading: false,
      canGoBack: false,
      canGoForward: false,
      history: ['https://petfinder.org/adopt'],
      historyIndex: 0,
      isPinned: false,
      isMuted: false,
      zoomLevel: 100,
      readerMode: false,
    },
    {
      id: 'tab-5',
      title: 'Razorpay - ',
      url: 'https://razorpay.com',
      displayUrl: 'razorpay.com',
      favicon: '💳',
      isLoading: false,
      canGoBack: false,
      canGoForward: false,
      history: ['https://razorpay.com'],
      historyIndex: 0,
      isPinned: false,
      isMuted: false,
      zoomLevel: 100,
      readerMode: false,
    },
    {
      id: 'tab-6',
      title: 'donghuast ',
      url: 'https://donghuastream.com',
      displayUrl: 'donghuastream.com',
      favicon: '🎬',
      isLoading: false,
      canGoBack: false,
      canGoForward: false,
      history: ['https://donghuastream.com'],
      historyIndex: 0,
      isPinned: false,
      isMuted: false,
      zoomLevel: 100,
      readerMode: false,
    },
    {
      id: 'tab-7',
      title: 'Licenses — LibreOffice',
      url: 'https://libreoffice.org/licenses',
      displayUrl: 'libreoffice.org/licenses',
      favicon: '📄',
      isLoading: false,
      canGoBack: false,
      canGoForward: false,
      history: ['https://libreoffice.org/licenses'],
      historyIndex: 0,
      isPinned: false,
      isMuted: false,
      zoomLevel: 100,
      readerMode: false,
    },
  ]);
  const [activeTabId, setActiveTabId] = useState<string>('tab-1');

  // Currently focused Tab Group sheet (when opened via up arrow or switcher)
  const [groupSheetId, setGroupSheetId] = useState<string | null>(null);

  // Device view mode: Phone container vs Full Width
  const [deviceFrameMode, setDeviceFrameMode] = useState<boolean>(true);

  // Browser Settings & Preferences
  const [defaultEngine, setDefaultEngine] = useState<SearchEngineType>('google');
  const [isIncognito, setIsIncognito] = useState(false);

  // Tab Groups with persistent storage and color coding
  const [tabGroups, setTabGroups] = useState<TabGroup[]>(() => {
    try {
      const saved = localStorage.getItem('lemon_tab_groups_v2');
      return saved
        ? JSON.parse(saved)
        : [
            { id: 'grp-1', name: '2 tabs', color: '#D93025', isCollapsed: false, updatedAgo: 'Updated 4 minutes ago' },
            { id: 'grp-2', name: '2 tabs', color: '#5F6368', isCollapsed: false, updatedAgo: 'Updated 8 months ago' },
            { id: 'grp-3', name: '1 tab', color: '#0084FF', isCollapsed: false, updatedAgo: 'Updated 1 day ago' },
            { id: 'grp-4', name: '1 tab', color: '#5F6368', isCollapsed: false, updatedAgo: 'Updated 9 months ago' },
            { id: 'grp-5', name: '1 tab', color: '#5F6368', isCollapsed: false, updatedAgo: 'Updated 8 months ago' },
          ];
    } catch {
      return [
        { id: 'grp-1', name: '2 tabs', color: '#D93025', isCollapsed: false, updatedAgo: 'Updated 4 minutes ago' },
        { id: 'grp-2', name: '2 tabs', color: '#5F6368', isCollapsed: false, updatedAgo: 'Updated 8 months ago' },
        { id: 'grp-3', name: '1 tab', color: '#0084FF', isCollapsed: false, updatedAgo: 'Updated 1 day ago' },
        { id: 'grp-4', name: '1 tab', color: '#5F6368', isCollapsed: false, updatedAgo: 'Updated 9 months ago' },
        { id: 'grp-5', name: '1 tab', color: '#5F6368', isCollapsed: false, updatedAgo: 'Updated 8 months ago' },
      ];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('lemon_tab_groups_v2', JSON.stringify(tabGroups));
    } catch {}
  }, [tabGroups]);

  // Bookmarks & History
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(() => {
    try {
      const saved = localStorage.getItem('lemon_bookmarks') || localStorage.getItem('aura_bookmarks');
      return saved ? JSON.parse(saved) : DEFAULT_BOOKMARKS;
    } catch {
      return DEFAULT_BOOKMARKS;
    }
  });

  const INITIAL_HISTORY: HistoryItem[] = [
    {
      id: 'hist-1',
      title: 'Google Search: React Mobile Browser',
      url: 'https://www.google.com/search?q=React+Mobile+Browser',
      favicon: '🔍',
      timestamp: Date.now() - 1000 * 60 * 12,
      visitCount: 3,
    },
    {
      id: 'hist-2',
      title: 'Web browser - Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Web_browser',
      favicon: '📚',
      timestamp: Date.now() - 1000 * 60 * 45,
      visitCount: 2,
    },
    {
      id: 'hist-3',
      title: 'Hacker News - Tech & Startups',
      url: 'https://news.ycombinator.com',
      favicon: '🟧',
      timestamp: Date.now() - 1000 * 60 * 120,
      visitCount: 5,
    },
    {
      id: 'hist-4',
      title: 'Lemon Interactive Code Playground',
      url: 'lemon://playground',
      favicon: '⚡',
      timestamp: Date.now() - 1000 * 60 * 60 * 24,
      visitCount: 1,
    },
  ];

  const [history, setHistory] = useState<HistoryItem[]>(() => {
    try {
      const saved = localStorage.getItem('lemon_history') || localStorage.getItem('aura_history');
      return saved ? JSON.parse(saved) : INITIAL_HISTORY;
    } catch {
      return INITIAL_HISTORY;
    }
  });

  // Initial curated downloads
  const INITIAL_DOWNLOADS: DownloadItem[] = [
    {
      id: 'dl-preset-1',
      name: 'lemon-mobile-browser-v2.apk',
      url: 'https://cdn.lemonbrowser.app/releases/lemon-browser-v2.apk',
      size: '28.4 MB',
      totalBytes: 28400000,
      downloadedBytes: 28400000,
      progress: 100,
      status: 'completed',
      category: 'archive',
      completedAt: Date.now() - 3600000 * 2,
      mimeType: 'application/vnd.android.package-archive',
      content: 'Lemon Browser Android Package Payload',
    },
    {
      id: 'dl-preset-2',
      name: 'citrus-wallpaper-4k.png',
      url: 'https://images.unsplash.com/photo-1533038590840-1cde6e668a91?q=80&w=1200',
      size: '3.1 MB',
      totalBytes: 3150000,
      downloadedBytes: 3150000,
      progress: 100,
      status: 'completed',
      category: 'image',
      completedAt: Date.now() - 3600000 * 5,
      mimeType: 'image/png',
      content: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400"><rect width="100%" height="100%" fill="%23f59e0b"/><circle cx="200" cy="200" r="120" fill="%23fef08a"/></svg>',
    },
    {
      id: 'dl-preset-3',
      name: 'react-mobile-architecture.pdf',
      url: 'https://docs.lemon.dev/guides/react-mobile-architecture.pdf',
      size: '4.2 MB',
      totalBytes: 4200000,
      downloadedBytes: 4200000,
      progress: 100,
      status: 'completed',
      category: 'document',
      completedAt: Date.now() - 3600000 * 24,
      mimeType: 'application/pdf',
      content: '%PDF-1.5\nLemon Mobile Browser Architecture Specification & Design Guide',
    },
    {
      id: 'dl-preset-4',
      name: 'lemon-chillhop-radio.mp3',
      url: 'https://stream.lemonradio.fm/tracks/chillhop-citrus-breeze.mp3',
      size: '5.8 MB',
      totalBytes: 5800000,
      downloadedBytes: 5800000,
      progress: 100,
      status: 'completed',
      category: 'media',
      completedAt: Date.now() - 3600000 * 48,
      mimeType: 'audio/mpeg',
      content: 'Lemon FM Audio Stream',
    },
  ];

  // Downloads & Extensions
  const [downloads, setDownloads] = useState<DownloadItem[]>(() => {
    try {
      const saved = localStorage.getItem('lemon_downloads');
      return saved ? JSON.parse(saved) : INITIAL_DOWNLOADS;
    } catch {
      return INITIAL_DOWNLOADS;
    }
  });
  const [extensions, setExtensions] = useState<Extension[]>(DEFAULT_EXTENSIONS);

  // Mobile Drawers & Modals
  const [isTabSwitcherOpen, setIsTabSwitcherOpen] = useState(false);
  const [isMenuSheetOpen, setIsMenuSheetOpen] = useState(false);
  const [isFilesDrawerOpen, setIsFilesDrawerOpen] = useState(false);
  const [isBookmarksDrawerOpen, setIsBookmarksDrawerOpen] = useState(false);
  const [isHistoryDrawerOpen, setIsHistoryDrawerOpen] = useState(false);
  const [toastBookmark, setToastBookmark] = useState<Bookmark | null>(null);
  const [isTabMenuOpen, setIsTabMenuOpen] = useState(false);
  const [isFindInPageOpen, setIsFindInPageOpen] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [isDesktopSite, setIsDesktopSite] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Core Lemon Browser Feature States
  const [isStatusSaverOpen, setIsStatusSaverOpen] = useState(false);
  const [isVideoDownloaderOpen, setIsVideoDownloaderOpen] = useState(false);
  const [isDataSaverModalOpen, setIsDataSaverModalOpen] = useState(false);
  const [isDataSaverEnabled, setIsDataSaverEnabled] = useState(true);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  const [isNewDownloadModalOpen, setIsNewDownloadModalOpen] = useState(false);
  const [previewItem, setPreviewItem] = useState<DownloadItem | null>(null);
  const [toastDownload, setToastDownload] = useState<DownloadItem | null>(null);
  const [isScanModalOpen, setIsScanModalOpen] = useState(false);
  const [isToolsDrawerOpen, setIsToolsDrawerOpen] = useState(false);
  const [isCleanModalOpen, setIsCleanModalOpen] = useState(false);
  const [isMusicModalOpen, setIsMusicModalOpen] = useState(false);
  const [isSportsModalOpen, setIsSportsModalOpen] = useState(false);
  const [isMoreAppsModalOpen, setIsMoreAppsModalOpen] = useState(false);

  // Standard Modals
  const [isDevToolsOpen, setIsDevToolsOpen] = useState(false);
  const [isCertificateModalOpen, setIsCertificateModalOpen] = useState(false);
  const [isExtensionsModalOpen, setIsExtensionsModalOpen] = useState(false);
  const [isDownloadsDrawerOpen, setIsDownloadsDrawerOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isShortcutsModalOpen, setIsShortcutsModalOpen] = useState(false);

  // Persist Downloads
  useEffect(() => {
    try {
      // Don't save huge data URLs to localStorage to avoid quota issues
      const sanitized = downloads.map((d) => ({
        ...d,
        content: d.content && d.content.length > 50000 ? '[Large Content]' : d.content,
      }));
      localStorage.setItem('lemon_downloads', JSON.stringify(sanitized));
    } catch {
      // ignore storage quota error
    }
  }, [downloads]);

  // Real-time active download simulation
  useEffect(() => {
    const hasActiveDownloads = downloads.some((d) => d.status === 'downloading');
    if (!hasActiveDownloads) return;

    const timer = setInterval(() => {
      setDownloads((prev) =>
        prev.map((item) => {
          if (item.status !== 'downloading') return item;

          const increment = Math.floor(Math.random() * 15) + 12; // 12-26%
          const nextProgress = Math.min(item.progress + increment, 100);
          const total = item.totalBytes || 2400000;
          const downloaded = Math.round((nextProgress / 100) * total);
          const speeds = ['2.8 MB/s', '3.4 MB/s', '1.9 MB/s', '4.1 MB/s', '2.2 MB/s'];
          const randomSpeed = speeds[Math.floor(Math.random() * speeds.length)];

          if (nextProgress >= 100) {
            const finishedItem: DownloadItem = {
              ...item,
              progress: 100,
              downloadedBytes: total,
              status: 'completed',
              completedAt: Date.now(),
              speed: undefined,
            };
            setToastDownload(finishedItem);
            return finishedItem;
          }

          return {
            ...item,
            progress: nextProgress,
            downloadedBytes: downloaded,
            speed: randomSpeed,
          };
        })
      );
    }, 450);

    return () => clearInterval(timer);
  }, [downloads]);

  // Persist History (only if not incognito)
  useEffect(() => {
    if (!isIncognito) {
      localStorage.setItem('lemon_history', JSON.stringify(history));
    }
  }, [history, isIncognito]);

  const activeTab = tabs.find((t) => t.id === activeTabId) || tabs[0];
  const isHomePage = (activeTab.url === 'lemon://newtab' || activeTab.url === 'aura://newtab') && !activeTab.groupId;

  // Navigate a Tab
  const navigateTab = useCallback(
    (tabId: string, inputUrl: string) => {
      const normalizedUrl = normalizeBrowserUrl(inputUrl, defaultEngine);
      const title = getTitleForUrl(normalizedUrl);
      const favicon = getFaviconForUrl(normalizedUrl);

      setTabs((prevTabs) =>
        prevTabs.map((tab) => {
          if (tab.id !== tabId) return tab;

          const newHistory = tab.history.slice(0, tab.historyIndex + 1);
          newHistory.push(normalizedUrl);

          return {
            ...tab,
            url: normalizedUrl,
            displayUrl: normalizedUrl,
            title,
            favicon,
            isLoading: true,
            history: newHistory,
            historyIndex: newHistory.length - 1,
            canGoBack: newHistory.length > 1,
            canGoForward: false,
            readerMode: false,
          };
        })
      );

      // Stop loading after simulated render
      setTimeout(() => {
        setTabs((prev) =>
          prev.map((tab) => (tab.id === tabId ? { ...tab, isLoading: false } : tab))
        );
      }, 350);

      // Record to history if not incognito and not newtab (most recent at top)
      if (!isIncognito && normalizedUrl !== 'lemon://newtab' && normalizedUrl !== 'aura://newtab') {
        setHistory((prev) => {
          // Prevent adding identical back-to-back URLs
          if (prev.length > 0 && prev[0].url.toLowerCase() === normalizedUrl.toLowerCase()) {
            return prev;
          }
          const existing = prev.find((h) => h.url === normalizedUrl);
          const newItem: HistoryItem = {
            id: `hist-${Date.now()}`,
            title,
            url: normalizedUrl,
            favicon,
            timestamp: Date.now(),
            visitCount: (existing?.visitCount || 0) + 1,
          };
          // Filter out older instance and place new item at index 0 (most recent at top)
          return [newItem, ...prev.filter((h) => h.url !== normalizedUrl).slice(0, 199)];
        });
      }
    },
    [defaultEngine, isIncognito]
  );

  // New Tab with optional Group assignment and incognito support
  const handleNewTab = useCallback(
    (url: string = 'google://newtab', groupId?: string, forcedIncognito?: boolean) => {
      // When created in a group, it is ALWAYS a normal tab (never incognito!) as requested by user
      const tabIncognito = groupId ? false : (forcedIncognito !== undefined ? forcedIncognito : isIncognito);
      const newId = `tab-${Date.now()}`;
      const newTab: Tab = {
        id: newId,
        title: tabIncognito ? 'New Incognito' : (url === 'google://newtab' || url === 'lemon://newtab' ? 'New tab' : getTitleForUrl(url)),
        url,
        displayUrl: url,
        favicon: getFaviconForUrl(url),
        isLoading: false,
        canGoBack: false,
        canGoForward: false,
        history: [url],
        historyIndex: 0,
        isPinned: false,
        isMuted: false,
        zoomLevel: 100,
        readerMode: false,
        groupId,
        isIncognito: tabIncognito,
      };
      setTabs((prev) => [...prev, newTab]);
      setActiveTabId(newId);
      setIsIncognito(tabIncognito);
    },
    [isIncognito]
  );

  const handleNewIncognitoTab = useCallback(() => {
    setIsIncognito(true);
    handleNewTab('lemon://newtab', undefined, true);
  }, [handleNewTab]);

  const handleSelectTab = useCallback(
    (id: string) => {
      setActiveTabId(id);
      const target = tabs.find((t) => t.id === id);
      if (target) {
        setIsIncognito(!!target.isIncognito);
      }
    },
    [tabs]
  );

  // Tab Group Action Handlers
  const handleCreateTabGroup = useCallback((name: string, color: string) => {
    const newGroup: TabGroup = {
      id: `grp-${Date.now()}`,
      name,
      color,
      isCollapsed: false,
    };
    setTabGroups((prev) => [...prev, newGroup]);
    setToastMessage(`Created group "${name}" 📁`);
  }, []);

  const handleUpdateTabGroup = useCallback((id: string, name: string, color: string) => {
    setTabGroups((prev) =>
      prev.map((g) => (g.id === id ? { ...g, name, color } : g))
    );
    setToastMessage('Tab group updated ✏️');
  }, []);

  const handleDeleteTabGroup = useCallback((id: string) => {
    setTabGroups((prev) => prev.filter((g) => g.id !== id));
    setTabs((prev) => prev.map((t) => (t.groupId === id ? { ...t, groupId: undefined } : t)));
    setToastMessage('Tab group removed');
  }, []);

  const handleToggleGroupCollapse = useCallback((id: string) => {
    setTabGroups((prev) =>
      prev.map((g) => (g.id === id ? { ...g, isCollapsed: !g.isCollapsed } : g))
    );
  }, []);

  const handleAssignTabToGroup = useCallback(
    (tabId: string, groupId?: string) => {
      setTabs((prev) =>
        prev.map((t) => (t.id === tabId ? { ...t, groupId } : t))
      );
      const targetGroup = tabGroups.find((g) => g.id === groupId);
      setToastMessage(targetGroup ? `Added to "${targetGroup.name}" 📁` : 'Removed from group');
    },
    [tabGroups]
  );

  // Close Tab
  const handleCloseTab = useCallback(
    (tabId: string, e?: React.MouseEvent) => {
      e?.stopPropagation();
      const closedTab = tabs.find((t) => t.id === tabId);
      const remaining = tabs.filter((t) => t.id !== tabId);
      if (remaining.length === 0) {
        handleNewTab('lemon://newtab', undefined, false);
        return;
      }
      setTabs(remaining);

      if (activeTabId === tabId) {
        // If the closed tab belonged to a group, check if any other tabs remain in the same group
        if (closedTab?.groupId) {
          const sameGroupRemaining = remaining.filter((t) => t.groupId === closedTab.groupId);
          if (sameGroupRemaining.length > 0) {
            // Stay in the same group on another tab
            setActiveTabId(sameGroupRemaining[sameGroupRemaining.length - 1].id);
            return;
          }
        }

        // Try to stay in the same incognito mode if any remain
        const sameModeRemaining = remaining.filter((t) => !!t.isIncognito === isIncognito);
        const next = sameModeRemaining.length > 0 ? sameModeRemaining[sameModeRemaining.length - 1] : remaining[remaining.length - 1];
        setActiveTabId(next.id);
        setIsIncognito(!!next.isIncognito);
      }
    },
    [tabs, activeTabId, isIncognito, handleNewTab]
  );

  // Dynamic Incognito Purge: Discards all private tabs, sessionStorage, cookies & cache
  const handleExitIncognito = useCallback(() => {
    setTabs((prev) => {
      const regularTabs = prev.filter((t) => !t.isIncognito);
      if (regularTabs.length === 0) {
        const freshTab: Tab = {
          id: `tab-${Date.now()}`,
          title: 'New Tab',
          url: 'lemon://newtab',
          displayUrl: 'lemon://newtab',
          favicon: '🍋',
          isLoading: false,
          canGoBack: false,
          canGoForward: false,
          history: ['lemon://newtab'],
          historyIndex: 0,
          isPinned: false,
          isMuted: false,
          zoomLevel: 100,
          isIncognito: false,
          readerMode: false,
        };
        setActiveTabId(freshTab.id);
        return [freshTab];
      }
      setActiveTabId(regularTabs[0].id);
      return regularTabs;
    });

    setIsIncognito(false);
    try {
      sessionStorage.clear();
    } catch {}
    setToastMessage('Incognito closed: cookies & cache purged 🛡️');
  }, []);

  // Close All Tabs
  const handleCloseAllTabs = useCallback(() => {
    const freshId = `tab-${Date.now()}`;
    const freshTab: Tab = {
      id: freshId,
      title: 'New Tab',
      url: 'lemon://newtab',
      displayUrl: 'lemon://newtab',
      favicon: '🍋',
      isLoading: false,
      canGoBack: false,
      canGoForward: false,
      history: ['lemon://newtab'],
      historyIndex: 0,
      isPinned: false,
      isMuted: false,
      zoomLevel: 100,
      readerMode: false,
    };
    setTabs([freshTab]);
    setActiveTabId(freshId);
  }, []);

  // Auto dismiss toast notification
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 2500);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  // Check if current active page is a media/video site or contains video
  const isVideoPage = useMemo(() => {
    const url = activeTab.url.toLowerCase();
    return (
      url.includes('youtube.com') ||
      url.includes('facebook.com') ||
      url.includes('instagram.com') ||
      url.includes('tiktok.com') ||
      url.includes('reddit.com') ||
      url.includes('video') ||
      url.includes('mp4') ||
      url.includes('trailer') ||
      activeTab.title.toLowerCase().includes('video')
    );
  }, [activeTab.url, activeTab.title]);

  // WhatsApp Status Save handler
  const handleSaveStatus = useCallback((statusItem: any) => {
    const newDownload: DownloadItem = {
      id: `status-${Date.now()}`,
      name: `WhatsApp_Status_${statusItem.sender.replace(/[^a-zA-Z0-9]/g, '_')}_${Date.now()}.${statusItem.type === 'video' ? 'mp4' : 'jpg'}`,
      url: `lemon://whatsapp/status/${statusItem.id}`,
      size: statusItem.size,
      totalBytes: parseFloat(statusItem.size) * 1024 * 1024,
      downloadedBytes: parseFloat(statusItem.size) * 1024 * 1024,
      progress: 100,
      status: 'completed',
      category: statusItem.type === 'video' ? 'media' : 'image',
      completedAt: Date.now(),
      mimeType: statusItem.type === 'video' ? 'video/mp4' : 'image/jpeg',
      content: `WhatsApp Status from ${statusItem.sender}: ${statusItem.caption}`,
    };
    setDownloads((prev) => [newDownload, ...prev]);
    setToastDownload(newDownload);
  }, []);

  // Save to Real Device via Blob
  const handleSaveToDevice = useCallback((item: DownloadItem) => {
    const content = item.content || 'Downloaded file from Lemon Android Browser';
    const blob = new Blob([content], { type: item.mimeType || 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = item.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, []);

  // Save as PDF handler
  const handleSaveAsPdf = useCallback(() => {
    const safeTitle = (activeTab.title || 'Page').replace(/[^a-zA-Z0-9_-]/g, '_');
    const pdfContent = `%PDF-1.4\n1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj\n2 0 obj<</Type/Pages/Kids[3 0 R]/Count 1>>endobj\n3 0 obj<</Type/Page/MediaBox[0 0 612 792]/Parent 2 0 R/Contents 4 0 R>>endobj\n4 0 obj<</Length 140>>stream\nBT /F1 18 Tf 50 720 Td (${safeTitle}) Tj 0 -30 Td /F1 12 Tf (${activeTab.url}) Tj ET\nendstream\nendobj\nxref\n0 5\n0000000000 65535 f\n0000000010 00000 n\n0000000060 00000 n\n0000000115 00000 n\n0000000210 00000 n\ntrailer<</Size 5/Root 1 0 R>>\nstartxref\n380\n%%EOF`;

    const pdfItem: DownloadItem = {
      id: `pdf-${Date.now()}`,
      name: `${safeTitle}.pdf`,
      url: activeTab.url,
      size: '184 KB',
      totalBytes: 184000,
      downloadedBytes: 184000,
      progress: 100,
      status: 'completed',
      category: 'document',
      completedAt: Date.now(),
      mimeType: 'application/pdf',
      content: pdfContent,
    };
    setDownloads((prev) => [pdfItem, ...prev]);
    handleSaveToDevice(pdfItem);
    setToastMessage(`Page saved as "${pdfItem.name}" to Downloads 📄`);
  }, [activeTab, handleSaveToDevice]);

  // Create Shortcut handler
  const handleCreateShortcut = useCallback(() => {
    setToastMessage(`Shortcut "${activeTab.title}" pinned to home screen 📱`);
  }, [activeTab.title]);

  // Translate Page handler (Loads Google Translate proxy on web pages)
  const handleTranslatePage = useCallback(() => {
    if (activeTab.url.startsWith('http')) {
      const translateUrl = `https://translate.google.com/translate?sl=auto&tl=en&u=${encodeURIComponent(activeTab.url)}`;
      navigateTab(activeTabId, translateUrl);
      setToastMessage('Translating page via Google Translate 🌐');
    } else {
      setToastMessage('Page translated to English ✓');
    }
  }, [activeTab.url, activeTabId, navigateTab]);

  // Share handler (Native Web Share API with clipboard fallback)
  const handleShare = useCallback(() => {
    if (navigator.share) {
      navigator
        .share({
          title: activeTab.title,
          url: activeTab.url,
        })
        .catch(() => {
          if (navigator.clipboard) {
            navigator.clipboard.writeText(activeTab.url);
          }
          setToastMessage('Link copied to clipboard 📋');
        });
    } else {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(activeTab.url);
      }
      setToastMessage('Link copied to clipboard 📋');
    }
  }, [activeTab.title, activeTab.url]);

  // Toggle Desktop Site handler
  const handleToggleDesktopSite = useCallback(() => {
    setIsDesktopSite((prev) => {
      const next = !prev;
      setTabs((tabsList) =>
        tabsList.map((t) =>
          t.id === activeTabId
            ? {
                ...t,
                zoomLevel: next ? 75 : 100,
                isLoading: true,
              }
            : t
        )
      );

      // Clean reload avoiding layout flash
      setTimeout(() => {
        setTabs((tabsList) =>
          tabsList.map((t) =>
            t.id === activeTabId ? { ...t, isLoading: false } : t
          )
        );
      }, 450);

      setToastMessage(next ? 'Desktop site enabled (Chrome/Windows) 🖥️' : 'Mobile view enabled 📱');
      return next;
    });
  }, [activeTabId]);

  // Duplicate Tab
  const handleDuplicateTab = useCallback(
    (tabId: string) => {
      const source = tabs.find((t) => t.id === tabId);
      if (!source) return;

      const dupId = `tab-${Date.now()}`;
      const duplicate: Tab = {
        ...source,
        id: dupId,
        history: [...source.history],
      };
      setTabs((prev) => [...prev, duplicate]);
      setActiveTabId(dupId);
    },
    [tabs]
  );

  // Add Bookmark
  const handleAddBookmark = useCallback(
    (title: string, url: string, folder?: string) => {
      const newBm: Bookmark = {
        id: `bm-${Date.now()}`,
        title: title || 'Bookmarked Site',
        url,
        favicon: getFaviconForUrl(url),
        folder: folder || 'Favorites',
        createdAt: Date.now(),
      };
      setBookmarks((prev) => {
        const filtered = prev.filter((b) => b.url !== url);
        return [newBm, ...filtered];
      });
      setToastBookmark(newBm);
    },
    []
  );

  // Remove Bookmark
  const handleRemoveBookmark = useCallback((id: string) => {
    setBookmarks((prev) => prev.filter((b) => b.id !== id));
  }, []);

  // Toggle Bookmark for Current Tab
  const handleToggleBookmarkCurrentTab = useCallback(() => {
    const existing = bookmarks.find((b) => b.url === activeTab.url);
    if (existing) {
      handleRemoveBookmark(existing.id);
    } else {
      handleAddBookmark(activeTab.title, activeTab.url);
    }
  }, [bookmarks, activeTab, handleRemoveBookmark, handleAddBookmark]);

  // Go Back
  const handleGoBack = useCallback(() => {
    if (activeTab.historyIndex > 0) {
      const newIndex = activeTab.historyIndex - 1;
      const prevUrl = activeTab.history[newIndex];
      setTabs((prev) =>
        prev.map((t) => {
          if (t.id !== activeTabId) return t;
          return {
            ...t,
            url: prevUrl,
            title: getTitleForUrl(prevUrl),
            favicon: getFaviconForUrl(prevUrl),
            historyIndex: newIndex,
            canGoBack: newIndex > 0,
            canGoForward: true,
          };
        })
      );
    }
  }, [activeTab, activeTabId]);

  // Go Forward
  const handleGoForward = useCallback(() => {
    if (activeTab.historyIndex < activeTab.history.length - 1) {
      const newIndex = activeTab.historyIndex + 1;
      const nextUrl = activeTab.history[newIndex];
      setTabs((prev) =>
        prev.map((t) => {
          if (t.id !== activeTabId) return t;
          return {
            ...t,
            url: nextUrl,
            title: getTitleForUrl(nextUrl),
            favicon: getFaviconForUrl(nextUrl),
            historyIndex: newIndex,
            canGoBack: true,
            canGoForward: newIndex < t.history.length - 1,
          };
        })
      );
    }
  }, [activeTab, activeTabId]);

  // Reload
  const handleReload = useCallback(() => {
    setTabs((prev) =>
      prev.map((t) => (t.id === activeTabId ? { ...t, isLoading: true } : t))
    );
    setTimeout(() => {
      setTabs((prev) =>
        prev.map((t) => (t.id === activeTabId ? { ...t, isLoading: false } : t))
      );
    }, 400);
  }, [activeTabId]);

  // Handle Home Click: Returns to normal app home screen.
  // When clicked from a group tab: closes the group tab bottom bar, stores group tabs safely in the 4 boxes, and opens a normal tab so everything is normal!
  const handleGoAppHome = useCallback(() => {
    setIsToolsDrawerOpen(false);
    setIsScanModalOpen(false);
    setIsMenuSheetOpen(false);
    setIsTabMenuOpen(false);
    setIsTabSwitcherOpen(false);
    setGroupSheetId(null);

    // 1. If currently in Incognito mode:
    // User rule: "when you are in the incognito tab and you click on the home icon in the app top bar then it again creta new incognito tab yeahh just like image 4 yeah"
    // "rules are like yeah user have to select normal normal tab icon to use normal broswer and get out of the incognito mode yeah"
    if (isIncognito || activeTab.isIncognito) {
      setIsIncognito(true);
      handleNewTab('lemon://newtab', undefined, true);
      return;
    }

    // 2. Normal mode:
    setIsIncognito(false);

    // If active tab belongs to a group:
    // We preserve the active tab completely intact (so group tabs stay safely stored in the 4 boxes)!
    if (activeTab.groupId) {
      // Mark group as recently updated in the 4 boxes store
      setTabGroups((prev) =>
        prev.map((g) =>
          g.id === activeTab.groupId ? { ...g, updatedAgo: 'Updated just now' } : g
        )
      );

      // Check if there is already an existing normal (non-incognito, non-grouped) home tab
      const existingNormalHomeTab = tabs.find(
        (t) => !t.isIncognito && !t.groupId && (t.url === 'lemon://newtab' || t.url === 'aura://newtab')
      );

      if (existingNormalHomeTab) {
        setActiveTabId(existingNormalHomeTab.id);
      } else {
        const anyNormalUngroupedTab = tabs.find((t) => !t.isIncognito && !t.groupId);
        if (anyNormalUngroupedTab) {
          navigateTab(anyNormalUngroupedTab.id, 'lemon://newtab');
          setActiveTabId(anyNormalUngroupedTab.id);
        } else {
          // Create a fresh normal home tab so group tabs and incognito tabs remain completely untouched and stored in the 4 boxes / tab switcher
          const homeId = `tab-${Date.now()}`;
          const newHomeTab: Tab = {
            id: homeId,
            title: 'New tab',
            url: 'lemon://newtab',
            displayUrl: 'lemon://newtab',
            favicon: '🍋',
            isLoading: false,
            canGoBack: false,
            canGoForward: false,
            history: ['lemon://newtab'],
            historyIndex: 0,
            isPinned: false,
            isMuted: false,
            zoomLevel: 100,
            readerMode: false,
            isIncognito: false,
            groupId: undefined,
          };
          setTabs((prev) => [...prev, newHomeTab]);
          setActiveTabId(homeId);
        }
      }
    } else {
      // In normal mode without group: navigate active tab to app home
      navigateTab(activeTabId, 'lemon://newtab');
    }
  }, [isIncognito, activeTab, tabs, activeTabId, navigateTab, handleNewTab]);

  // Start a new download
  const handleStartDownload = useCallback(
    (filename: string, url: string, sizeBytes: number, mimeType: string, content?: string) => {
      const category = getFileCategory(filename);
      const newDownload: DownloadItem = {
        id: `dl-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        name: filename,
        url,
        size: formatBytes(sizeBytes),
        totalBytes: sizeBytes,
        downloadedBytes: 0,
        speed: '2.4 MB/s',
        progress: 5,
        status: 'downloading',
        category,
        startedAt: Date.now(),
        content: content || 'Downloaded asset payload',
        mimeType,
      };

      setDownloads((prev) => [newDownload, ...prev]);
      setIsFilesDrawerOpen(true);
    },
    []
  );

  // WebView onDownloadStart prop handler
  const handleWebViewDownloadStart = useCallback(
    (event: { url: string; userAgent?: string; contentDisposition?: string; mimetype?: string }) => {
      const filename = extractFilename(event.url, event.contentDisposition, event.mimetype);
      const approxSize = 1024 * 1024 * (Math.floor(Math.random() * 8) + 1);
      handleStartDownload(
        filename,
        event.url,
        approxSize,
        event.mimetype || 'application/octet-stream',
        `Payload of downloaded file: ${filename}`
      );
    },
    [handleStartDownload]
  );

  // Add Download from Internal Apps (Canvas, Scratchpad, Playground)
  const handleAddDownload = useCallback(
    (filename: string, content: string, mimeType: string) => {
      handleStartDownload(
        filename,
        activeTab.url,
        Math.max(content.length, 18000),
        mimeType,
        content
      );
    },
    [activeTab.url, handleStartDownload]
  );

  // Pause / Resume / Cancel Download
  const handlePauseDownload = useCallback((id: string) => {
    setDownloads((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status: 'paused', speed: undefined } : d))
    );
  }, []);

  const handleResumeDownload = useCallback((id: string) => {
    setDownloads((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status: 'downloading', speed: '2.1 MB/s' } : d))
    );
  }, []);

  const handleCancelDownload = useCallback((id: string) => {
    setDownloads((prev) => prev.filter((d) => d.id !== id));
  }, []);

  const handleDeleteDownload = useCallback((id: string) => {
    setDownloads((prev) => prev.filter((d) => d.id !== id));
  }, []);

  const handleClearCompleted = useCallback(() => {
    setDownloads((prev) => prev.filter((d) => d.status !== 'completed'));
  }, []);

  // Toggle Extension
  const handleToggleExtension = useCallback((id: string) => {
    setExtensions((prev) =>
      prev.map((ext) => (ext.id === id ? { ...ext, enabled: !ext.enabled } : ext))
    );
  }, []);

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isCmdOrCtrl = e.metaKey || e.ctrlKey;

      if (isCmdOrCtrl && e.key.toLowerCase() === 't') {
        e.preventDefault();
        handleNewTab();
      } else if (isCmdOrCtrl && e.key.toLowerCase() === 'w') {
        e.preventDefault();
        handleCloseTab(activeTabId);
      } else if (isCmdOrCtrl && e.key.toLowerCase() === 'r') {
        e.preventDefault();
        handleReload();
      } else if (isCmdOrCtrl && e.shiftKey && e.key.toLowerCase() === 'n') {
        e.preventDefault();
        setIsIncognito((prev) => !prev);
      } else if (e.key === 'F12') {
        e.preventDefault();
        setIsDevToolsOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNewTab, handleCloseTab, handleReload, activeTabId]);

  // Render Web Viewport for a Tab
  const renderTabContent = (tab: Tab) => {
    const url = tab.url;

    if (tab.readerMode) {
      return (
        <ReaderMode
          url={tab.url}
          title={tab.title}
          onClose={() => {
            setTabs((prev) =>
              prev.map((t) => (t.id === tab.id ? { ...t, readerMode: false } : t))
            );
          }}
        />
      );
    }

    if (url === 'google://newtab' || (url === 'lemon://newtab' && tab.groupId)) {
      return (
        <GoogleMobileNewTab
          onNavigate={(targetUrl) => navigateTab(tab.id, targetUrl)}
          onOpenIncognito={() => {
            setIsIncognito(true);
            navigateTab(tab.id, 'lemon://newtab');
          }}
        />
      );
    }

    if (url === 'lemon://newtab' || url === 'aura://newtab') {
      if (isIncognito) {
        return (
          <PrivateHomeNewTab
            onNavigate={(targetUrl) => navigateTab(tab.id, targetUrl)}
            onExitIncognito={() => setIsIncognito(false)}
            tabCount={tabs.length}
            onOpenTabSwitcher={() => setIsTabSwitcherOpen(true)}
            defaultEngine={defaultEngine}
          />
        );
      }

      return (
        <MobileHomeNewTab
          onNavigate={(targetUrl) => navigateTab(tab.id, targetUrl)}
          tabCount={tabs.length}
          onOpenTabSwitcher={() => setIsTabSwitcherOpen(true)}
          onOpenCleanModal={() => setIsCleanModalOpen(true)}
          onOpenMusicModal={() => setIsMusicModalOpen(true)}
          onOpenSportsModal={() => setIsSportsModalOpen(true)}
          onOpenMoreAppsModal={() => setIsMoreAppsModalOpen(true)}
          onOpenDownloadsModal={() => setIsFilesDrawerOpen(true)}
          onOpenStatusSaverModal={() => setIsStatusSaverOpen(true)}
          defaultEngine={defaultEngine}
          onSelectEngine={(eng) => setDefaultEngine(eng)}
          onOpenInNewTab={(targetUrl) => handleNewTab(targetUrl, undefined, false)}
          onOpenInIncognitoTab={(targetUrl) => handleNewTab(targetUrl, undefined, true)}
        />
      );
    }

    if (url === 'lemon://history' || url === 'aura://history') {
      return (
        <HistoryPage
          history={history}
          onNavigate={(targetUrl) => navigateTab(tab.id, targetUrl)}
          onRemoveItem={(id) => setHistory((prev) => prev.filter((h) => h.id !== id))}
          onClearAll={() => setHistory([])}
        />
      );
    }

    if (url === 'lemon://bookmarks' || url === 'aura://bookmarks') {
      return (
        <BookmarksPage
          bookmarks={bookmarks}
          onNavigate={(targetUrl) => navigateTab(tab.id, targetUrl)}
          onRemoveBookmark={(id) => setBookmarks((prev) => prev.filter((b) => b.id !== id))}
          onAddBookmark={(title, u) =>
            setBookmarks((prev) => [
              ...prev,
              { id: Date.now().toString(), title, url: u, favicon: '⭐', createdAt: Date.now() },
            ])
          }
        />
      );
    }

    if (url === 'lemon://playground' || url === 'aura://playground') {
      return <CodePlaygroundPage onAddDownload={handleAddDownload} />;
    }

    if (url === 'lemon://notes' || url === 'aura://notes') {
      return <NotesPage onAddDownload={handleAddDownload} />;
    }

    if (url === 'lemon://canvas' || url === 'aura://canvas') {
      return <PaintCanvasPage onAddDownload={handleAddDownload} />;
    }

    if (url === 'lemon://retro' || url === 'aura://retro') {
      return <RetroWeb90sPage onNavigate={(targetUrl) => navigateTab(tab.id, targetUrl)} />;
    }

    // Google Search Engine simulation
    if (
      url.includes('google.com/search') ||
      url === 'https://www.google.com' ||
      url === 'https://google.com'
    ) {
      let initialQuery = '';
      try {
        initialQuery = new URL(url).searchParams.get('q') || '';
      } catch {
        initialQuery = '';
      }
      return (
        <GoogleSearchEngine
          initialQuery={initialQuery}
          onNavigate={(targetUrl) => navigateTab(tab.id, targetUrl)}
          isDark={isIncognito}
        />
      );
    }

    // Wikipedia live explorer
    if (url.includes('wikipedia.org')) {
      return (
        <WikipediaViewer
          url={url}
          onNavigate={(targetUrl) => navigateTab(tab.id, targetUrl)}
        />
      );
    }

    // Hacker News live
    if (url.includes('news.ycombinator.com') || url.includes('ycombinator.com')) {
      return (
        <HackerNewsViewer onNavigate={(targetUrl) => navigateTab(tab.id, targetUrl)} />
      );
    }

    // Reddit explorer
    if (url.includes('reddit.com')) {
      return (
        <RedditViewer onNavigate={(targetUrl) => navigateTab(tab.id, targetUrl)} />
      );
    }

    // Default Web Embed
    return (
      <GeneralWebEmbed
        url={url}
        onOpenReaderMode={() => {
          setTabs((prev) =>
            prev.map((t) => (t.id === tab.id ? { ...t, readerMode: true } : t))
          );
        }}
        onOpenDevTools={() => setIsDevToolsOpen(true)}
      />
    );
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-neutral-900 select-none overflow-hidden font-sans">
      {/* Top Floating Viewport Switcher for Desktop Preview */}
      <div className="hidden md:flex items-center gap-2 absolute top-3 right-4 z-40 bg-neutral-950/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-neutral-800 text-xs text-neutral-300 shadow-lg">
        <span className="text-neutral-400">View:</span>
        <button
          onClick={() => setDeviceFrameMode(true)}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full font-medium transition-colors ${
            deviceFrameMode ? 'bg-amber-400 text-neutral-950' : 'hover:text-white'
          }`}
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>Mobile Device</span>
        </button>
        <button
          onClick={() => setDeviceFrameMode(false)}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full font-medium transition-colors ${
            !deviceFrameMode ? 'bg-amber-400 text-neutral-950' : 'hover:text-white'
          }`}
        >
          <Monitor className="w-3.5 h-3.5" />
          <span>Full Width</span>
        </button>
      </div>

      {/* Main App Container: Either Phone Frame or Fluid Full Width */}
      <div
        className={`flex flex-col bg-white text-neutral-900 overflow-hidden transition-all duration-300 relative shadow-2xl ${
          deviceFrameMode
            ? 'w-full max-w-[420px] h-full sm:h-[94vh] sm:rounded-[36px] sm:border-[8px] sm:border-neutral-950 sm:ring-1 sm:ring-neutral-700/50'
            : 'w-full h-full'
        }`}
      >
        {/* Status Bar (14:48, battery 17%) */}
        <MobileStatusBar currentTime="14:48" batteryLevel={17} isIncognito={isIncognito} />

        {/* Top Header Bar: ALWAYS shown on Home Screen (matching user screenshot with Home, K logo, tab counter, 3-dots), group tabs, and browsing */}
        <MobileBrowserHeader
          activeTab={activeTab}
          onNavigate={(url) => navigateTab(activeTabId, url)}
          onGoHome={handleGoAppHome}
          tabCount={tabs.filter((t) => (isIncognito ? t.isIncognito : !t.isIncognito)).length || 1}
          onOpenTabSwitcher={() => setIsTabSwitcherOpen(true)}
          onOpenMenu={() => setIsMenuSheetOpen(true)}
          onOpenCertificateModal={() => setIsCertificateModalOpen(true)}
          isIncognito={isIncognito}
        />

        {/* Find in Page Bar */}
        <FindInPageBar
          isOpen={isFindInPageOpen}
          onClose={() => setIsFindInPageOpen(false)}
        />

        {/* Loading Progress Bar */}
        {activeTab.isLoading && (
          <div className="h-0.5 w-full bg-neutral-100 overflow-hidden z-20">
            <div className="h-full bg-blue-500 animate-pulse w-3/4 transition-all" />
          </div>
        )}

        {/* Viewport Content: With edge-swipe gestures to go back and forward */}
        <main
          className={`flex-1 w-full h-full overflow-hidden relative flex flex-col ${
            isHomePage ? 'bg-[#F3ECE2]' : 'bg-white'
          }`}
        >
          <EdgeSwipeNavigation
            canGoBack={activeTab.canGoBack}
            canGoForward={activeTab.canGoForward}
            onGoBack={handleGoBack}
            onGoForward={handleGoForward}
            previousTitle={
              activeTab.historyIndex > 0 ? getTitleForUrl(activeTab.history[activeTab.historyIndex - 1]) : undefined
            }
            nextTitle={
              activeTab.historyIndex < activeTab.history.length - 1
                ? getTitleForUrl(activeTab.history[activeTab.historyIndex + 1])
                : undefined
            }
          >
            {tabs.map((tab) => {
              const isVisible = tab.id === activeTabId;
              return (
                <div
                  key={tab.id}
                  className={`w-full h-full flex flex-col ${isVisible ? 'block' : 'hidden'}`}
                  style={{
                    zoom: `${tab.zoomLevel}%`,
                    display: isVisible ? 'flex' : 'none',
                  }}
                >
                  {renderTabContent(tab)}
                </div>
              );
            })}
          </EdgeSwipeNavigation>

          {/* Floating Smart Video Downloader Badge (detects media on supported sites) */}
          <SmartVideoDetectorBadge
            isVisible={isVideoPage && !isHomePage}
            onOpenDownloader={() => setIsVideoDownloaderOpen(true)}
            videoTitle={activeTab.title}
          />
        </main>

        {/* If active tab belongs to a group, render Chrome Tab Group Bottom Strip (Image 2 & Image 3) */}
        {activeTab.groupId && !activeTab.readerMode ? (
          <ChromeTabGroupBottomBar
            group={tabGroups.find((g) => g.id === activeTab.groupId) || { id: activeTab.groupId, name: 'Group', color: '#D93025' }}
            tabsInGroup={tabs.filter((t) => t.groupId === activeTab.groupId)}
            activeTabId={activeTabId}
            onSelectTab={(tabId) => setActiveTabId(tabId)}
            onCloseTab={(tabId, e) => handleCloseTab(tabId, e)}
            onNewTabInGroup={() => handleNewTab('google://newtab', activeTab.groupId)}
            onOpenGroupSheet={() => {
              setGroupSheetId(activeTab.groupId || null);
              setIsTabSwitcherOpen(true);
            }}
          />
        ) : (
          <>
            {/* App Bottom Navigation Bar: Only shown on Home Screen for normal tabs without group */}
            {isHomePage && !isIncognito && !activeTab.readerMode && (
              <MobileBottomBar
                currentTabUrl={activeTab.url}
                onGoHome={handleGoAppHome}
                onOpenTools={() => {
                  setIsScanModalOpen(false);
                  setIsToolsDrawerOpen(true);
                }}
                onOpenScan={() => {
                  setIsToolsDrawerOpen(false);
                  setIsScanModalOpen(true);
                }}
                onOpenMenu={() => setIsMenuSheetOpen(true)}
                isIncognito={isIncognito}
                isToolsActive={isToolsDrawerOpen}
                isScanActive={isScanModalOpen}
              />
            )}

            {/* Browser Web Navigation Bar: Shown when browsing external web pages without group */}
            {!isHomePage && !activeTab.readerMode && (
              <BrowserBottomNav
                canGoBack={activeTab.canGoBack}
                canGoForward={activeTab.canGoForward}
                onBack={handleGoBack}
                onForward={handleGoForward}
                onHome={handleGoAppHome}
                tabCount={tabs.filter((t) => (isIncognito ? t.isIncognito : !t.isIncognito)).length || 1}
                onOpenTabSwitcher={() => setIsTabSwitcherOpen(true)}
                onOpenMenu={() => setIsMenuSheetOpen(true)}
                isIncognito={isIncognito}
              />
            )}
          </>
        )}

        {/* Android Phone System 3-Button Navigation (|||  ▢  ◁) */}
        <AndroidSystemNav
          onOpenTabSwitcher={() => setIsTabSwitcherOpen(true)}
          onGoHome={handleGoAppHome}
          onGoBack={handleGoBack}
          isDark={isIncognito}
        />

        {/* Developer Tools Drawer (if active) */}
        <DevToolsDrawer
          activeTab={activeTab}
          isOpen={isDevToolsOpen}
          onClose={() => setIsDevToolsOpen(false)}
        />

        {/* Mobile Tab Switcher with Tab Grouping */}
        <MobileTabSwitcher
          isOpen={isTabSwitcherOpen}
          onClose={() => {
            setIsTabSwitcherOpen(false);
            setGroupSheetId(null);
          }}
          tabs={tabs}
          activeTabId={activeTabId}
          onSelectTab={handleSelectTab}
          onCloseTab={handleCloseTab}
          onNewTab={(url, groupId, forcedIncognito) =>
            handleNewTab(
              url || 'lemon://newtab',
              groupId,
              forcedIncognito !== undefined ? forcedIncognito : (groupId ? false : isIncognito)
            )
          }
          onCloseAllTabs={handleCloseAllTabs}
          onDuplicateTab={handleDuplicateTab}
          isIncognito={isIncognito}
          onToggleIncognito={() => setIsIncognito(!isIncognito)}
          tabGroups={tabGroups}
          onCreateGroup={handleCreateTabGroup}
          onUpdateGroup={handleUpdateTabGroup}
          onDeleteGroup={handleDeleteTabGroup}
          onAssignTabToGroup={handleAssignTabToGroup}
          onToggleGroupCollapse={handleToggleGroupCollapse}
          initialGroupId={groupSheetId}
        />
      </div>

      {/* Mobile Drawers & Action Modals */}
      <MobileMenuSheet
        isOpen={isMenuSheetOpen}
        onClose={() => setIsMenuSheetOpen(false)}
        onNewTab={() => handleNewTab('lemon://newtab', undefined, false)}
        onNewIncognitoTab={handleNewIncognitoTab}
        onOpenDownloads={() => setIsFilesDrawerOpen(true)}
        onOpenBookmarks={() => setIsBookmarksDrawerOpen(true)}
        onOpenHistory={() => setIsHistoryDrawerOpen(true)}
        onOpenSettings={() => setIsSettingsModalOpen(true)}
        onOpenDevTools={() => setIsDevToolsOpen(!isDevToolsOpen)}
        isIncognito={isIncognito}
        onToggleIncognito={() => setIsIncognito(!isIncognito)}
        onReload={handleReload}
        onOpenClean={() => setIsCleanModalOpen(true)}
        isDesktopSite={activeTab.readerMode}
        onToggleDesktopSite={() =>
          setTabs((prev) =>
            prev.map((t) => (t.id === activeTabId ? { ...t, readerMode: !t.readerMode } : t))
          )
        }
        canGoForward={activeTab.canGoForward}
        onGoForward={handleGoForward}
      />

      <CleanModal
        isOpen={isCleanModalOpen}
        onClose={() => setIsCleanModalOpen(false)}
      />

      <MusicPlayerDrawer
        isOpen={isMusicModalOpen}
        onClose={() => setIsMusicModalOpen(false)}
      />

      <SportsScoresDrawer
        isOpen={isSportsModalOpen}
        onClose={() => setIsSportsModalOpen(false)}
      />

      {/* Android Download Manager Drawer */}
      <DownloadManagerDrawer
        isOpen={isFilesDrawerOpen}
        onClose={() => setIsFilesDrawerOpen(false)}
        downloads={downloads}
        onOpenNewDownload={() => setIsNewDownloadModalOpen(true)}
        onPauseDownload={handlePauseDownload}
        onResumeDownload={handleResumeDownload}
        onCancelDownload={handleCancelDownload}
        onDeleteDownload={handleDeleteDownload}
        onClearCompleted={handleClearCompleted}
        onPreviewFile={(item) => setPreviewItem(item)}
        onSaveToDevice={handleSaveToDevice}
      />

      {/* New Download Dialog */}
      <NewDownloadModal
        isOpen={isNewDownloadModalOpen}
        onClose={() => setIsNewDownloadModalOpen(false)}
        onStartDownload={handleStartDownload}
      />

      {/* File Previewer & Inspect Modal */}
      <FilePreviewModal
        item={previewItem}
        onClose={() => setPreviewItem(null)}
        onDelete={handleDeleteDownload}
        onSaveToDevice={handleSaveToDevice}
      />

      {/* Android Download Complete Toast Notification */}
      <DownloadToast
        item={toastDownload}
        onOpen={(item) => setPreviewItem(item)}
        onDismiss={() => setToastDownload(null)}
      />

      {/* Bookmarks Drawer & Toast */}
      <BookmarksDrawer
        isOpen={isBookmarksDrawerOpen}
        onClose={() => setIsBookmarksDrawerOpen(false)}
        bookmarks={bookmarks}
        onNavigate={(url) => navigateTab(activeTabId, url)}
        onRemoveBookmark={handleRemoveBookmark}
        onAddBookmark={handleAddBookmark}
        currentTabTitle={activeTab.title}
        currentTabUrl={activeTab.url}
      />

      <BookmarkToast
        bookmark={toastBookmark}
        onOpenBookmarks={() => setIsBookmarksDrawerOpen(true)}
        onDismiss={() => setToastBookmark(null)}
      />

      {/* Browsing History Drawer */}
      <HistoryDrawer
        isOpen={isHistoryDrawerOpen}
        onClose={() => setIsHistoryDrawerOpen(false)}
        history={history}
        onNavigate={(url) => navigateTab(activeTabId, url)}
        onRemoveItem={(id) => setHistory((prev) => prev.filter((h) => h.id !== id))}
        onClearAll={() => setHistory([])}
      />

      <ScanModal
        isOpen={isScanModalOpen}
        onClose={() => setIsScanModalOpen(false)}
        onNavigate={(url) => navigateTab(activeTabId, url)}
      />

      {/* User Feedback Modal */}
      <FeedbackModal
        isOpen={isFeedbackOpen}
        onClose={() => setIsFeedbackOpen(false)}
        onSubmit={() => setToastMessage('Feedback submitted. Thank you! ⭐')}
      />

      {/* WhatsApp Status Saver Plugin Modal */}
      <WhatsAppStatusSaverModal
        isOpen={isStatusSaverOpen}
        onClose={() => setIsStatusSaverOpen(false)}
        onSaveStatus={handleSaveStatus}
        onOpenFeedback={() => setIsFeedbackOpen(true)}
      />

      {/* Smart Video Downloader Modal */}
      <SmartVideoDownloaderModal
        isOpen={isVideoDownloaderOpen}
        onClose={() => setIsVideoDownloaderOpen(false)}
        videoTitle={activeTab.title}
        videoUrl={activeTab.url}
        platform={
          activeTab.url.includes('youtube')
            ? 'YouTube'
            : activeTab.url.includes('facebook')
            ? 'Facebook'
            : activeTab.url.includes('instagram')
            ? 'Instagram'
            : activeTab.url.includes('reddit')
            ? 'Reddit'
            : 'Web Video'
        }
        onStartDownload={(item) =>
          handleStartDownload(item.name, item.url, item.totalBytes || 14000000, item.mimeType || 'video/mp4', item.content)
        }
      />

      {/* Data Saver Mode Modal */}
      <DataSaverModal
        isOpen={isDataSaverModalOpen}
        onClose={() => setIsDataSaverModalOpen(false)}
        isEnabled={isDataSaverEnabled}
        onToggle={setIsDataSaverEnabled}
      />

      {/* Google Play UGC Policy Report & Block Site Modal */}
      <ReportSiteModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        siteUrl={activeTab.url}
        siteTitle={activeTab.title}
        onBlockDomain={(domain) => setToastMessage(`Domain ${domain} blocked 🚫`)}
      />

      {/* Floating Action Confirmation Toast */}
      {toastMessage && (
        <div className="fixed bottom-16 inset-x-6 z-50 flex items-center justify-center pointer-events-none animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="bg-neutral-900/90 backdrop-blur-md text-white text-xs font-medium px-4 py-2 rounded-2xl shadow-xl border border-neutral-700/60 max-w-xs text-center">
            {toastMessage}
          </div>
        </div>
      )}

      <ToolsDrawer
        isOpen={isToolsDrawerOpen}
        onClose={() => setIsToolsDrawerOpen(false)}
        onOpenClean={() => setIsCleanModalOpen(true)}
        onOpenScan={() => {
          setIsToolsDrawerOpen(false);
          setIsScanModalOpen(true);
        }}
        onOpenKeyVault={() => setIsExtensionsModalOpen(true)}
        onOpenDevTools={() => setIsDevToolsOpen(!isDevToolsOpen)}
        onOpenSettings={() => setIsSettingsModalOpen(true)}
        onNavigate={(url) => navigateTab(activeTabId, url)}
        adBlockEnabled={extensions.find((e) => e.id === 'adblock-shield')?.enabled || true}
        onToggleAdBlock={() => handleToggleExtension('adblock-shield')}
        darkReaderEnabled={extensions.find((e) => e.id === 'dark-reader')?.enabled || false}
        onToggleDarkReader={() => handleToggleExtension('dark-reader')}
        onOpenStatusSaver={() => setIsStatusSaverOpen(true)}
        onOpenDataSaver={() => setIsDataSaverModalOpen(true)}
        onOpenVideoDownloader={() => setIsVideoDownloaderOpen(true)}
        onOpenFiles={() => setIsFilesDrawerOpen(true)}
        onOpenMusic={() => setIsMusicModalOpen(true)}
      />

      <MoreAppsModal
        isOpen={isMoreAppsModalOpen}
        onClose={() => setIsMoreAppsModalOpen(false)}
        onNavigate={(url) => navigateTab(activeTabId, url)}
      />

      {/* Standard Security / Settings Dialogs */}
      <CertificateModal
        url={activeTab.url}
        isOpen={isCertificateModalOpen}
        onClose={() => setIsCertificateModalOpen(false)}
      />

      <ExtensionsModal
        extensions={extensions}
        onToggleExtension={handleToggleExtension}
        isOpen={isExtensionsModalOpen}
        onClose={() => setIsExtensionsModalOpen(false)}
      />

      <DownloadsDrawer
        downloads={downloads}
        isOpen={isDownloadsDrawerOpen}
        onClose={() => setIsDownloadsDrawerOpen(false)}
        onClearDownloads={() => setDownloads([])}
      />

      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        defaultEngine={defaultEngine}
        onSelectEngine={setDefaultEngine}
        tabLayout={'horizontal'}
        onSelectTabLayout={() => {}}
        showBookmarksBar={false}
        onToggleBookmarksBar={() => {}}
        isIncognito={isIncognito}
        onToggleIncognito={() => setIsIncognito((prev) => !prev)}
        onClearHistory={() => setHistory([])}
        onOpenShortcuts={() => setIsShortcutsModalOpen(true)}
      />

      <ShortcutsModal
        isOpen={isShortcutsModalOpen}
        onClose={() => setIsShortcutsModalOpen(false)}
      />
    </div>
  );
}
