'use client';

import type { SVGProps } from 'react';

export type SwimFishProps = SVGProps<SVGSVGElement> & {
  glow?: boolean;
  eyeOffset?: {
    x: number;
    y: number;
  };
};

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

const SwimFish = ({ glow = true, eyeOffset, ...props }: SwimFishProps) => {
  const offsetX = clamp(eyeOffset?.x ?? 0, -1, 1);
  const offsetY = clamp(eyeOffset?.y ?? 0, -1, 1);
  const pupilCx = 60 + offsetX * 3.5;
  const pupilCy = 52 + offsetY * 2.5;
  return (
  <svg viewBox="0 0 220 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <defs>
      <linearGradient id="swimFishBodyGradient" x1="20" y1="50" x2="180" y2="50" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#22d3ee" />
        <stop offset="50%" stopColor="#a78bfa" />
        <stop offset="100%" stopColor="#f472b6" />
      </linearGradient>
      <linearGradient id="swimFishFinGradient" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#fde047" stopOpacity="0.85" />
        <stop offset="100%" stopColor="#fb923c" stopOpacity="0.75" />
      </linearGradient>
      <filter id="swimFishGlow" x="-25%" y="-35%" width="150%" height="170%" colorInterpolationFilters="sRGB">
        <feGaussianBlur stdDeviation="7" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <g filter={glow ? 'url(#swimFishGlow)' : undefined}>
      {/* Main body - smooth fish body using bezier curve */}
      <path
        d="M30 50 Q30 30 50 28 Q90 25 130 30 Q155 33 165 50 Q155 67 130 70 Q90 75 50 72 Q30 70 30 50 Z"
        fill="url(#swimFishBodyGradient)"
        opacity="0.95"
      />

      {/* Tail fin - classic fish tail */}
      <path
        d="M165 50 L200 30 Q205 50 200 70 Z"
        fill="url(#swimFishBodyGradient)"
        opacity="0.88"
      />

      {/* Top dorsal fin */}
      <path
        d="M100 30 Q95 15 105 18 L108 30 Z"
        fill="url(#swimFishFinGradient)"
        opacity="0.75"
      />

      {/* Bottom anal fin */}
      <path
        d="M100 70 Q95 85 105 82 L108 70 Z"
        fill="url(#swimFishFinGradient)"
        opacity="0.75"
      />

      {/* Side pectoral fin */}
      <path
        d="M55 60 Q38 68 35 76 Q42 70 55 65 Z"
        fill="url(#swimFishFinGradient)"
        opacity="0.7"
      />

      {/* Eye white with shadow */}
      <circle cx="55" cy="50" r="11" fill="#0f172a" opacity="0.12" />
      <circle cx="55" cy="49" r="9" fill="#ffffff" opacity="0.98" />

      {/* Pupil with tracking */}
      <circle cx={pupilCx} cy={pupilCy} r="4" fill="#0f172a" />

      {/* Eye shine */}
      <circle cx={pupilCx - 1.3} cy={pupilCy - 1.2} r="1.5" fill="#e0f2fe" opacity="0.95" />

      {/* Simple cute smile */}
      <path
        d="M42 62 Q55 66 68 62"
        stroke="#ffffff"
        strokeOpacity="0.5"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />

      {/* Subtle gill mark */}
      <path
        d="M70 45 Q72 50 70 55"
        stroke="#ffffff"
        strokeOpacity="0.2"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />

      {/* Body scale highlights */}
      <ellipse cx="95" cy="48" rx="10" ry="12" fill="#ffffff" opacity="0.06" />
      <ellipse cx="120" cy="50" rx="10" ry="12" fill="#ffffff" opacity="0.05" />
      <ellipse cx="140" cy="52" rx="8" ry="10" fill="#ffffff" opacity="0.04" />
    </g>
  </svg>
  );
};

export default SwimFish;
