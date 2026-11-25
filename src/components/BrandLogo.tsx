import React from 'react';

interface BrandLogoProps {
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ className = 'w-7 h-7' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <rect
        x="1"
        y="1"
        width="30"
        height="30"
        rx="6"
        className="fill-theme-inset stroke-theme-border-strong"
        strokeWidth="1.5"
      />
      <rect x="6.5" y="7.5" width="5.5" height="17" rx="1.2" className="fill-theme-text" />
      <rect x="20" y="7.5" width="5.5" height="17" rx="1.2" className="fill-theme-text" />
      <path
        d="M12 10.5L16 15.5L20 10.5V16.5L16 21.5L12 16.5V10.5Z"
        className="fill-theme-brand"
      />
    </svg>
  );
};
