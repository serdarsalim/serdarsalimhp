'use client';

import type { SVGProps } from 'react';

export type SwimFishProps = SVGProps<SVGSVGElement> & {
  glow?: boolean;
};

const SwimFish = ({ glow = true, ...props }: SwimFishProps) => (
  <svg viewBox="0 0 240 120" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <defs>
      <linearGradient id="swimFishBodyGradient" x1="20" y1="60" x2="220" y2="60" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#67e8f9" />
        <stop offset="45%" stopColor="#a855f7" />
        <stop offset="100%" stopColor="#f472b6" />
      </linearGradient>
      <linearGradient id="swimFishFinGradient" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#fef3c7" stopOpacity="0.95" />
        <stop offset="100%" stopColor="#fbcfe8" stopOpacity="0.8" />
      </linearGradient>
      <filter id="swimFishGlow" x="-20%" y="-40%" width="140%" height="200%" colorInterpolationFilters="sRGB">
        <feGaussianBlur stdDeviation="8" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <g filter={glow ? 'url(#swimFishGlow)' : undefined}>
      <path
        d="M30 60c0-22.091 35.817-40 80-40s80 17.909 80 40-35.817 40-80 40-80-17.909-80-40Z"
        fill="url(#swimFishBodyGradient)"
        opacity="0.95"
      />
      <path
        d="M190 30c16 12 34 17 46 29-12 12-30 17-46 29l-22-29 22-29Z"
        fill="url(#swimFishBodyGradient)"
        opacity="0.8"
      />
      <path
        d="M100 36c-10-8-24-18-34-16s-18 14-20 25c14-10 28-11 54-9Z"
        fill="url(#swimFishFinGradient)"
        opacity="0.65"
      />
      <path
        d="M108 87c-10 8-24 18-34 16s-18-14-20-25c14 10 28 11 54 9Z"
        fill="url(#swimFishFinGradient)"
        opacity="0.65"
      />
      <ellipse cx="70" cy="60" rx="12" ry="8" fill="#0f172a" opacity="0.4" />
      <circle cx="64" cy="56" r="8" fill="#0f172a" />
      <circle cx="62" cy="54" r="3" fill="#f1f5f9" />
      <path
        d="M76 74c6 4 18 6 30 6s24-2 30-6"
        stroke="#fdf4ff"
        strokeOpacity="0.5"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </g>
  </svg>
);

export default SwimFish;
