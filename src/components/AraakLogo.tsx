import React from 'react';

interface AraakLogoProps {
  className?: string;
  variant?: 'full' | 'icon' | 'light' | 'dark';
  height?: number | string;
  showSubtitle?: boolean;
}

export const AraakLogo: React.FC<AraakLogoProps> = ({
  className = '',
  variant = 'full',
  height = 44,
  showSubtitle = true,
}) => {
  // Official ARAAK Brand Colors
  const GOLD = '#C5A059';
  const GOLD_BRIGHT = '#D4AF37';
  const TEAL_DARK = '#0B7293';
  const TEAL_NAVY = '#1A4F63';

  if (variant === 'icon') {
    return (
      <svg
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ height }}
        className={`inline-block ${className}`}
      >
        {/* Geometric R Icon Body */}
        <path
          d="M20 20 L60 20 L95 55 L70 55 L45 30 L20 30 Z"
          fill={GOLD}
        />
        <path
          d="M10 40 L60 40 L100 80 L80 80 L45 45 L10 45 Z"
          fill={TEAL_DARK}
        />
        <path
          d="M10 85 L40 55 L65 55 L35 85 L10 85 Z"
          fill={GOLD}
        />
        <path
          d="M45 85 L85 45 L105 45 L65 85 Z"
          fill={TEAL_NAVY}
        />
      </svg>
    );
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* ARAAK Geometric Symbol */}
      <svg
        viewBox="0 0 130 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ height }}
        className="shrink-0 drop-shadow-md"
      >
        {/* Top Gold Parallelogram Bar */}
        <path d="M 68 10 L 114 10 L 86 40 L 40 40 Z" fill={GOLD_BRIGHT} />
        
        {/* Upper Teal Fold Horizontal Top */}
        <path d="M 8 26 L 74 26 L 48 54 L 8 54 Z" fill={TEAL_DARK} />
        
        {/* Main Teal Center Body & Diagonal Leg */}
        <path d="M 8 26 L 48 54 L 102 54 L 62 110 L 0 110 L 38 58 L 8 26 Z" fill={TEAL_DARK} />

        {/* Bottom-Right Gold Parallel Diagonal Bar */}
        <path d="M 54 72 L 92 72 L 116 110 L 78 110 Z" fill={GOLD} />

        {/* Bottom-Left Gold Corner Triangle */}
        <path d="M 0 82 L 28 110 L 0 110 Z" fill={GOLD} />
      </svg>

      {/* ARAAK Typography */}
      <div className="flex flex-col text-start">
        <span
          className={`font-extrabold tracking-tight font-serif leading-none ${
            variant === 'light' ? 'text-slate-900' : 'text-[#C5A059]'
          }`}
          style={{
            fontSize: typeof height === 'number' ? height * 0.45 : '1.25rem',
            color: variant === 'light' ? '#0F172A' : '#C5A059',
          }}
        >
          اراك الصناعية
        </span>
        {showSubtitle && (
          <span
            className="font-black font-mono tracking-wider uppercase leading-snug mt-0.5"
            style={{
              fontSize: typeof height === 'number' ? height * 0.28 : '0.75rem',
              color: variant === 'light' ? '#1A4F63' : '#38BDF8',
            }}
          >
            ARAAK INDUSTRY
          </span>
        )}
      </div>
    </div>
  );
};
