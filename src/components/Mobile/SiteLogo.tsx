import React, { useState } from 'react';
import { SiteItem } from '../../data/allSitesData';

interface SiteLogoProps {
  site: SiteItem;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const SiteLogo: React.FC<SiteLogoProps> = ({ site, size = 'md', className = '' }) => {
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  // Extract clean hostname for the Google Favicon CDN
  let domain = '';
  try {
    domain = new URL(site.url).hostname;
  } catch {
    domain = site.url;
  }

  // High-resolution real official favicon/logo from Google's global FaviconV2 CDN:
  const officialLogoUrl =
    site.logoUrl ||
    `https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://${domain}&size=128`;

  const sizeClasses = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-11 h-11',
  }[size];

  const imgSizeClasses = {
    sm: 'w-4.5 h-4.5',
    md: 'w-5.5 h-5.5',
    lg: 'w-6.5 h-6.5',
  }[size];

  return (
    <div
      className={`${sizeClasses} rounded-full bg-white border border-neutral-100 shadow-2xs flex items-center justify-center shrink-0 overflow-hidden relative ${className}`}
    >
      {!imgError ? (
        <>
          <img
            src={officialLogoUrl}
            alt={site.name}
            className={`${imgSizeClasses} object-contain transition-opacity duration-150 ${
              imgLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
            loading="lazy"
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgError(true)}
          />
          {/* While image loads, show fallback icon */}
          {!imgLoaded && (
            <div className="absolute inset-0 flex items-center justify-center scale-95">
              {site.renderIcon()}
            </div>
          )}
        </>
      ) : (
        /* If network offline or favicon not found, display vector icon */
        <div className="w-full h-full flex items-center justify-center">
          {site.renderIcon()}
        </div>
      )}
    </div>
  );
};
