/**
 * User-Agent & Viewport Utilities for Desktop Site Mode in Mobile Browser
 */

// Modern Desktop User-Agent (Chrome on 64-bit Windows) to force desktop layouts on YouTube, Google, Reddit, etc.
export const DESKTOP_USER_AGENT =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36';

// Modern Android Mobile User-Agent
export const MOBILE_USER_AGENT =
  'Mozilla/5.0 (Linux; Android 14; Pixel 8 Pro) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Mobile Safari/537.36';

/**
 * Injected JavaScript to override viewport meta tag seamlessly,
 * preventing layout flashing or zoom jumps on Android screens.
 */
export const DESKTOP_VIEWPORT_INJECTION = `
  (function() {
    try {
      let meta = document.querySelector('meta[name="viewport"]');
      if (!meta) {
        meta = document.createElement('meta');
        meta.name = 'viewport';
        document.head.appendChild(meta);
      }
      meta.content = 'width=1280, initial-scale=0.35, maximum-scale=2.0, user-scalable=yes';
      document.documentElement.style.minWidth = '1280px';
      document.body.style.minWidth = '1280px';
      document.body.style.overflowX = 'auto';
    } catch(e) {}
  })();
  true;
`;

export const MOBILE_VIEWPORT_INJECTION = `
  (function() {
    try {
      let meta = document.querySelector('meta[name="viewport"]');
      if (meta) {
        meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes';
      }
      document.documentElement.style.minWidth = '';
      document.body.style.minWidth = '';
      document.body.style.overflowX = '';
    } catch(e) {}
  })();
  true;
`;
