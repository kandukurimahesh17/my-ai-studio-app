/**
 * Find in Page Injected JavaScript & DOM Highlight Utility for React Native WebView
 */

/**
 * Generates stringified JavaScript for webview.injectJavaScript().
 * Safely parses the DOM tree, highlights matches with custom CSS,
 * and scrolls the active match into view.
 */
export function generateFindInPageScript(query: string, activeIndex: number = 0): string {
  const sanitizedQuery = JSON.stringify(query);

  return `
  (function() {
    try {
      const query = ${sanitizedQuery};
      const activeIdx = ${activeIndex};

      // 1. Remove previous highlights safely
      const prevMarks = document.querySelectorAll('mark.__lemon_find_mark');
      prevMarks.forEach(mark => {
        const parent = mark.parentNode;
        if (parent) {
          parent.replaceChild(document.createTextNode(mark.textContent || ''), mark);
          parent.normalize();
        }
      });

      if (!query || query.trim().length === 0) {
        if (window.ReactNativeWebView && window.ReactNativeWebView.postMessage) {
          window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'FIND_MATCHES_RESULT', count: 0, activeIndex: 0 }));
        }
        return true;
      }

      // 2. Traverse Text Nodes with TreeWalker (skipping scripts, styles, textareas, inputs)
      const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        {
          acceptNode: function(node) {
            const parent = node.parentElement;
            if (!parent) return NodeFilter.FILTER_REJECT;
            const tag = parent.tagName.toLowerCase();
            if (['script', 'style', 'noscript', 'textarea', 'input'].includes(tag)) {
              return NodeFilter.FILTER_REJECT;
            }
            if (parent.classList && parent.classList.contains('__lemon_find_mark')) {
              return NodeFilter.FILTER_REJECT;
            }
            return NodeFilter.FILTER_ACCEPT;
          }
        },
        false
      );

      const textNodes = [];
      let currentNode;
      while ((currentNode = walker.nextNode())) {
        textNodes.push(currentNode);
      }

      const lowerQuery = query.toLowerCase();
      const matches = [];

      // 3. Highlight matches without breaking tags
      textNodes.forEach(node => {
        const text = node.nodeValue || '';
        let lowerText = text.toLowerCase();
        let startIndex = lowerText.indexOf(lowerQuery);

        if (startIndex === -1) return;

        const fragment = document.createDocumentFragment();
        let lastIndex = 0;

        while (startIndex !== -1) {
          // Preceding text
          if (startIndex > lastIndex) {
            fragment.appendChild(document.createTextNode(text.substring(lastIndex, startIndex)));
          }

          // Matched text wrapped in mark
          const mark = document.createElement('mark');
          mark.className = '__lemon_find_mark';
          mark.style.backgroundColor = '#FDE047'; // Soft yellow
          mark.style.color = '#18181B';
          mark.style.padding = '1px 2px';
          mark.style.borderRadius = '3px';
          mark.style.fontWeight = '600';
          mark.textContent = text.substring(startIndex, startIndex + query.length);

          fragment.appendChild(mark);
          matches.push(mark);

          lastIndex = startIndex + query.length;
          startIndex = lowerText.indexOf(lowerQuery, lastIndex);
        }

        if (lastIndex < text.length) {
          fragment.appendChild(document.createTextNode(text.substring(lastIndex)));
        }

        if (node.parentNode) {
          node.parentNode.replaceChild(fragment, node);
        }
      });

      const totalMatches = matches.length;
      const targetIdx = totalMatches > 0 ? (activeIdx % totalMatches + totalMatches) % totalMatches : 0;

      // 4. Style active match and smooth scroll into view
      if (totalMatches > 0 && matches[targetIdx]) {
        const activeElem = matches[targetIdx];
        activeElem.style.backgroundColor = '#F59E0B'; // Vivid amber/orange
        activeElem.style.color = '#FFFFFF';
        activeElem.style.boxShadow = '0 0 0 2px #D97706';
        activeElem.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
      }

      // 5. Notify React Native
      const payload = JSON.stringify({
        type: 'FIND_MATCHES_RESULT',
        count: totalMatches,
        activeIndex: totalMatches > 0 ? targetIdx + 1 : 0
      });

      if (window.ReactNativeWebView && window.ReactNativeWebView.postMessage) {
        window.ReactNativeWebView.postMessage(payload);
      } else {
        window.postMessage(payload, '*');
      }
    } catch(err) {
      console.error('FindInPage error:', err);
    }
  })();
  true;
  `;
}

/**
 * Script to clean up all highlight marks
 */
export function generateClearFindInPageScript(): string {
  return `
  (function() {
    try {
      const marks = document.querySelectorAll('mark.__lemon_find_mark');
      marks.forEach(mark => {
        const parent = mark.parentNode;
        if (parent) {
          parent.replaceChild(document.createTextNode(mark.textContent || ''), mark);
          parent.normalize();
        }
      });
    } catch(e) {}
  })();
  true;
  `;
}
