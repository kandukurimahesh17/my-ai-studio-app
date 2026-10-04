import React from 'react';

interface IncognitoIconProps {
  className?: string;
  size?: number;
}

export const IncognitoIcon: React.FC<IncognitoIconProps> = ({
  className = 'w-5 h-5',
  size,
}) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      style={size ? { width: size, height: size } : undefined}
    >
      {/* Fedora Hat Crown */}
      <path d="M12 2.5C9.6 2.5 7.8 4 7.5 6.2h9C16.2 4 14.4 2.5 12 2.5z" />
      {/* Hat Brim */}
      <path d="M20.5 7.5H3.5C2.7 7.5 2 8.2 2 9s.7 1.5 1.5 1.5h17c.8 0 1.5-.7 1.5-1.5s-.7-1.5-1.5-1.5z" />
      {/* Glasses Left Frame */}
      <circle cx="8" cy="15.5" r="3" fill="none" stroke="currentColor" strokeWidth="1.8" />
      {/* Glasses Right Frame */}
      <circle cx="16" cy="15.5" r="3" fill="none" stroke="currentColor" strokeWidth="1.8" />
      {/* Glasses Bridge */}
      <path d="M11 15.5h2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
};
