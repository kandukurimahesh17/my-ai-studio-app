import { useState, useEffect, useCallback } from 'react';

export interface HistoryItem {
  id: string;
  url: string;
  title: string;
  timestamp: number;
}

export interface BookmarkItem {
  id: string;
  url: string;
  title: string;
  createdAt: number;
}

const STORAGE_KEYS = {
  HISTORY: '@lemon_browser_history_v1',
  BOOKMARKS: '@lemon_browser_bookmarks_v1',
};

/**
 * Storage adapter:
 * Dynamically resolves @react-native-async-storage/async-storage in React Native / Expo environments,
 * while safely falling back to window.localStorage in web previews and Jest environments.
 */
interface StorageDriver {
  getItem: (key: string) => Promise<string | null>;
  setItem: (key: string, value: string) => Promise<void>;
  removeItem: (key: string) => Promise<void>;
}

const getStorageDriver = (): StorageDriver => {
  // If global AsyncStorage is available (e.g. injected or React Native runtime)
  if (typeof (globalThis as any).AsyncStorage !== 'undefined') {
    return (globalThis as any).AsyncStorage;
  }

  // Web / DOM environment fallback
  if (typeof window !== 'undefined' && window.localStorage) {
    return {
      getItem: async (key: string) => window.localStorage.getItem(key),
      setItem: async (key: string, value: string) => {
        window.localStorage.setItem(key, value);
      },
      removeItem: async (key: string) => {
        window.localStorage.removeItem(key);
      },
    };
  }

  // Memory fallback
  const memory = new Map<string, string>();
  return {
    getItem: async (key: string) => memory.get(key) || null,
    setItem: async (key: string, value: string) => {
      memory.set(key, value);
    },
    removeItem: async (key: string) => {
      memory.delete(key);
    },
  };
};

const storage = getStorageDriver();

export function useBrowserStorage() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // 1. Fetch Bookmarks
  const getBookmarks = useCallback(async (): Promise<BookmarkItem[]> => {
    try {
      const raw = await storage.getItem(STORAGE_KEYS.BOOKMARKS);
      const parsed: BookmarkItem[] = raw ? JSON.parse(raw) : [];
      setBookmarks(parsed);
      return parsed;
    } catch (err) {
      console.error('Failed to load bookmarks:', err);
      return [];
    }
  }, []);

  // 2. Fetch History
  const getHistory = useCallback(async (): Promise<HistoryItem[]> => {
    try {
      const raw = await storage.getItem(STORAGE_KEYS.HISTORY);
      const parsed: HistoryItem[] = raw ? JSON.parse(raw) : [];
      setHistory(parsed);
      return parsed;
    } catch (err) {
      console.error('Failed to load history:', err);
      return [];
    }
  }, []);

  // Initial load
  useEffect(() => {
    const loadInitialData = async () => {
      setIsLoading(true);
      await Promise.all([getBookmarks(), getHistory()]);
      setIsLoading(false);
    };
    loadInitialData();
  }, [getBookmarks, getHistory]);

  // 3. Add History Entry (Prevents identical back-to-back URLs)
  const addHistoryEntry = useCallback(
    async (url: string, title?: string) => {
      const trimmedUrl = url.trim();
      if (!trimmedUrl || trimmedUrl.startsWith('lemon://newtab') || trimmedUrl === 'about:blank') {
        return;
      }

      try {
        const raw = await storage.getItem(STORAGE_KEYS.HISTORY);
        const currentList: HistoryItem[] = raw ? JSON.parse(raw) : [];

        // Check if the most recent entry is identical to this URL (prevent duplicate consecutive entries)
        if (currentList.length > 0 && currentList[0].url.toLowerCase() === trimmedUrl.toLowerCase()) {
          return;
        }

        const newEntry: HistoryItem = {
          id: `${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
          url: trimmedUrl,
          title: title?.trim() || trimmedUrl,
          timestamp: Date.now(),
        };

        // Prepend to list and cap at 200 items to maintain high performance
        const updatedList = [newEntry, ...currentList].slice(0, 200);

        await storage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(updatedList));
        setHistory(updatedList);
      } catch (err) {
        console.error('Error saving history entry:', err);
      }
    },
    []
  );

  // 4. Toggle Bookmark
  const toggleBookmark = useCallback(
    async (url: string, title?: string): Promise<boolean> => {
      const trimmedUrl = url.trim();
      if (!trimmedUrl) return false;

      try {
        const raw = await storage.getItem(STORAGE_KEYS.BOOKMARKS);
        const currentList: BookmarkItem[] = raw ? JSON.parse(raw) : [];

        const existingIndex = currentList.findIndex(
          (b) => b.url.toLowerCase() === trimmedUrl.toLowerCase()
        );

        let updatedList: BookmarkItem[];
        let isNowBookmarked = false;

        if (existingIndex >= 0) {
          // Remove from bookmarks
          updatedList = currentList.filter((_, idx) => idx !== existingIndex);
          isNowBookmarked = false;
        } else {
          // Add to bookmarks
          const newBookmark: BookmarkItem = {
            id: `bm-${Date.now()}`,
            url: trimmedUrl,
            title: title?.trim() || trimmedUrl,
            createdAt: Date.now(),
          };
          updatedList = [newBookmark, ...currentList];
          isNowBookmarked = true;
        }

        await storage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(updatedList));
        setBookmarks(updatedList);
        return isNowBookmarked;
      } catch (err) {
        console.error('Error toggling bookmark:', err);
        return false;
      }
    },
    []
  );

  // 5. Remove Single Bookmark
  const removeBookmark = useCallback(async (id: string) => {
    try {
      const raw = await storage.getItem(STORAGE_KEYS.BOOKMARKS);
      const currentList: BookmarkItem[] = raw ? JSON.parse(raw) : [];
      const updatedList = currentList.filter((b) => b.id !== id);

      await storage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(updatedList));
      setBookmarks(updatedList);
    } catch (err) {
      console.error('Error removing bookmark:', err);
    }
  }, []);

  // 6. Remove Single History Item
  const removeHistoryItem = useCallback(async (id: string) => {
    try {
      const raw = await storage.getItem(STORAGE_KEYS.HISTORY);
      const currentList: HistoryItem[] = raw ? JSON.parse(raw) : [];
      const updatedList = currentList.filter((h) => h.id !== id);

      await storage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(updatedList));
      setHistory(updatedList);
    } catch (err) {
      console.error('Error removing history entry:', err);
    }
  }, []);

  // 7. Clear All History
  const clearHistory = useCallback(async () => {
    try {
      await storage.removeItem(STORAGE_KEYS.HISTORY);
      setHistory([]);
    } catch (err) {
      console.error('Error clearing history:', err);
    }
  }, []);

  // Helper: check if a URL is currently bookmarked
  const isUrlBookmarked = useCallback(
    (url: string) => {
      if (!url) return false;
      return bookmarks.some((b) => b.url.toLowerCase() === url.toLowerCase());
    },
    [bookmarks]
  );

  return {
    history,
    bookmarks,
    isLoading,
    addHistoryEntry,
    toggleBookmark,
    removeBookmark,
    removeHistoryItem,
    clearHistory,
    getBookmarks,
    getHistory,
    isUrlBookmarked,
  };
}
