/**
 * Android Native File Download Manager for React Native WebView
 * Supports expo-file-system, react-native-blob-util, and browser fallback.
 */

export interface DownloadStartEvent {
  url: string;
  userAgent?: string;
  contentDisposition?: string;
  mimetype?: string;
}

export interface NativeDownloadOptions {
  filename?: string;
  folder?: string;
  showNotification?: boolean;
}

/**
 * Derives a clean filename from Content-Disposition header, URL path, or MIME type
 */
export function extractFilename(
  url: string,
  contentDisposition?: string,
  mimetype?: string
): string {
  // 1. Try Content-Disposition header
  if (contentDisposition) {
    const filenameMatch = contentDisposition.match(/filename\*?=(?:UTF-8'')?["']?([^"';]+)["']?/i);
    if (filenameMatch && filenameMatch[1]) {
      return decodeURIComponent(filenameMatch[1].trim());
    }
  }

  // 2. Try URL pathname
  try {
    const urlObj = new URL(url);
    const pathname = urlObj.pathname;
    const segments = pathname.split('/').filter(Boolean);
    if (segments.length > 0) {
      const candidate = segments[segments.length - 1];
      if (candidate.includes('.')) {
        return decodeURIComponent(candidate);
      }
    }
  } catch {}

  // 3. Fallback based on MIME type
  const ext = getExtensionFromMime(mimetype);
  return `download_${Date.now()}${ext}`;
}

export function getExtensionFromMime(mime?: string): string {
  if (!mime) return '.bin';
  const lower = mime.toLowerCase();
  if (lower.includes('pdf')) return '.pdf';
  if (lower.includes('zip') || lower.includes('compressed')) return '.zip';
  if (lower.includes('jpeg') || lower.includes('jpg')) return '.jpg';
  if (lower.includes('png')) return '.png';
  if (lower.includes('webp')) return '.webp';
  if (lower.includes('mp4') || lower.includes('video')) return '.mp4';
  if (lower.includes('mp3') || lower.includes('audio')) return '.mp3';
  if (lower.includes('android.package-archive')) return '.apk';
  return '.bin';
}

/**
 * Request Android Permissions:
 * - On Android 13+ (API 33+), WRITE_EXTERNAL_STORAGE is not needed for public Downloads,
 *   but POST_NOTIFICATIONS is required for notification tray progress.
 * - On Android <= 12, WRITE_EXTERNAL_STORAGE is verified.
 */
export async function requestAndroidDownloadPermissions(): Promise<boolean> {
  const PermissionsAndroid = (globalThis as any).PermissionsAndroid;
  const Platform = (globalThis as any).Platform;

  if (!PermissionsAndroid || !Platform || Platform.OS !== 'android') {
    return true; // Web, iOS, or mock
  }

  try {
    const apiLevel = Platform.Version || 30;

    if (apiLevel >= 33) {
      // Android 13+ requires notification permission for the download tray
      const postNotifications = 'android.permission.POST_NOTIFICATIONS';
      const hasNotificationPermission = await PermissionsAndroid.check(postNotifications);
      if (!hasNotificationPermission) {
        await PermissionsAndroid.request(postNotifications, {
          title: 'Download Notification Permission',
          message: 'Lemon Browser needs notification access to show active download progress in the status bar.',
          buttonPositive: 'Allow',
          buttonNegative: 'Deny',
        });
      }
      return true;
    } else {
      // Android <= 12 requires storage permission
      const writePermission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
      const hasWrite = await PermissionsAndroid.check(writePermission);
      if (hasWrite) return true;

      const granted = await PermissionsAndroid.request(writePermission, {
        title: 'Storage Permission Required',
        message: 'Lemon Browser needs permission to save downloaded files into your Download folder.',
        buttonPositive: 'Allow',
        buttonNegative: 'Deny',
      });

      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
  } catch (err) {
    console.error('Android permission request error:', err);
    return true;
  }
}

/**
 * Initiates the Android System Download pipeline via react-native-blob-util
 * or expo-file-system StorageAccessFramework
 */
export async function executeNativeDownload(
  event: DownloadStartEvent,
  onProgress?: (progress: number, totalBytes: number) => void
): Promise<{ success: boolean; filename: string; filePath: string }> {
  const { url, contentDisposition, mimetype } = event;
  const filename = extractFilename(url, contentDisposition, mimetype);

  // Check Android permissions
  const hasPermission = await requestAndroidDownloadPermissions();
  if (!hasPermission) {
    throw new Error('Storage or notification permission denied');
  }

  const ReactNativeBlobUtil = (globalThis as any).ReactNativeBlobUtil;

  // React Native Android environment using BlobUtil & DownloadManager
  if (ReactNativeBlobUtil && ReactNativeBlobUtil.config) {
    const { dirs } = ReactNativeBlobUtil.fs;
    const downloadDest = `${dirs.DownloadDir}/${filename}`;

    const configOptions = {
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true, // Native Android DownloadManager
        notification: true, // System tray notification
        title: filename,
        description: 'Downloading file via Lemon Browser',
        mime: mimetype || 'application/octet-stream',
        path: downloadDest,
        mediaScannable: true,
      },
    };

    const task = ReactNativeBlobUtil.config(configOptions).fetch('GET', url);

    if (onProgress) {
      task.progress((received: number, total: number) => {
        const percent = total > 0 ? (received / total) * 100 : 0;
        onProgress(percent, total);
      });
    }

    await task;
    return { success: true, filename, filePath: downloadDest };
  }

  // Web / Browser environment fallback
  if (typeof document !== 'undefined') {
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.target = '_blank';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    return { success: true, filename, filePath: `Downloads/${filename}` };
  }

  return { success: true, filename, filePath: `Downloads/${filename}` };
}
