'use client';

import type { SVGProps } from 'react';

export type SwimTurtleProps = SVGProps<SVGSVGElement> & {
  glow?: boolean;
  eyeOffset?: {
    x: number;
    y: number;
  };
};

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

export default function SwimTurtle({ glow = true, eyeOffset, ...props }: SwimTurtleProps) {
  const offsetX = clamp(eyeOffset?.x ?? 0, -1, 1);
  const offsetY = clamp(eyeOffset?.y ?? 0, -1, 1);
  const pupilCx = 22 + offsetX * 3;
  const pupilCy = 43 + offsetY * 2;

  return (
    <svg
      viewBox="0 0 120 90"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        <linearGradient id="turtleShellGradient" x1="60" y1="20" x2="60" y2="70" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="50%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <linearGradient id="turtleBodyGradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#34d399" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#10b981" stopOpacity="0.85" />
        </linearGradient>
        <linearGradient id="turtleFlipperGradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#6ee7b7" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#34d399" stopOpacity="0.75" />
        </linearGradient>
        <filter id="turtleGlow" x="-25%" y="-35%" width="150%" height="170%" colorInterpolationFilters="sRGB">
          <feGaussianBlur stdDeviation="7" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g filter={glow ? 'url(#turtleGlow)' : undefined}>
        {/* Back left flipper - sticking out from bottom left */}
        <ellipse cx="72" cy="62" rx="16" ry="8" fill="url(#turtleFlipperGradient)" opacity="0.8" transform="rotate(55 72 62)" />

        {/* Back right flipper - sticking out from top right */}
        <ellipse cx="72" cy="28" rx="16" ry="8" fill="url(#turtleFlipperGradient)" opacity="0.8" transform="rotate(-55 72 28)" />

        {/* Front left flipper - sticking out from bottom left */}
        <ellipse cx="42" cy="60" rx="18" ry="9" fill="url(#turtleFlipperGradient)" opacity="0.85" transform="rotate(-35 42 60)" />

        {/* Front right flipper - sticking out from top right */}
        <ellipse cx="42" cy="30" rx="18" ry="9" fill="url(#turtleFlipperGradient)" opacity="0.85" transform="rotate(35 42 30)" />

        {/* Shell - darker border */}
        <ellipse cx="60" cy="45" rx="30" ry="24" fill="url(#turtleShellGradient)" opacity="0.95" />

        {/* Shell hexagon pattern with gradient overlay */}
        <g opacity="0.3">
          <circle cx="60" cy="38" r="6" fill="#ffffff" opacity="0.15" />
          <circle cx="52" cy="45" r="5" fill="#ffffff" opacity="0.12" />
          <circle cx="68" cy="45" r="5" fill="#ffffff" opacity="0.12" />
          <circle cx="56" cy="52" r="4" fill="#ffffff" opacity="0.1" />
          <circle cx="64" cy="52" r="4" fill="#ffffff" opacity="0.1" />
        </g>

        {/* Head */}
        <ellipse cx="25" cy="45" rx="12" ry="10" fill="url(#turtleBodyGradient)" opacity="0.95" />
        <circle cx="25" cy="45" r="11" fill="url(#turtleBodyGradient)" opacity="0.9" />

        {/* Eye socket shadow */}
        <circle cx="22" cy="44" r="3.5" fill="#0f172a" opacity="0.15" />

        {/* Eye white */}
        <circle cx="22" cy="43" r="3" fill="#ffffff" />

        {/* Pupil with tracking */}
        <circle cx={pupilCx} cy={pupilCy} r="1.5" fill="#0f172a" />

        {/* Eye shine */}
        <circle cx={pupilCx - 0.6} cy={pupilCy - 0.6} r="0.7" fill="#e0f2fe" opacity="0.9" />

        {/* Cute smile */}
        <path
          d="M 20 48 Q 25 50 30 48"
          stroke="#ffffff"
          strokeOpacity="0.5"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* Nostril marks */}
        <circle cx="20" cy="44" r="0.8" fill="#0f172a" opacity="0.3" />

        {/* Tail - small triangle with gradient */}
        <path d="M 88 45 L 95 42 L 95 48 Z" fill="url(#turtleBodyGradient)" opacity="0.75" />

        {/* Shell edge highlight */}
        <ellipse cx="60" cy="44" rx="26" ry="21" fill="none" stroke="#ffffff" strokeWidth="1.5" opacity="0.15" />
      </g>
    </svg>
  );
}
