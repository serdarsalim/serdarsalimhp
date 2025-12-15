'use client';

interface GeometricPatternProps {
  opacity?: number;
  color?: string;
}

export default function GeometricPattern({ opacity = 0.15, color = '#d4af37' }: GeometricPatternProps) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg className="w-full h-full" style={{ opacity }}>
        <defs>
          {/* Islamic geometric star pattern */}
          <pattern
            id="islamic-pattern"
            x="0"
            y="0"
            width="200"
            height="200"
            patternUnits="userSpaceOnUse"
          >
            {/* 8-pointed star */}
            <path
              d="M100,40 L110,70 L140,70 L115,90 L125,120 L100,105 L75,120 L85,90 L60,70 L90,70 Z"
              fill="none"
              stroke={color}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Outer hexagon */}
            <path
              d="M100,20 L130,35 L130,65 L100,80 L70,65 L70,35 Z"
              fill="none"
              stroke={color}
              strokeWidth="1.5"
              opacity="0.6"
            />

            {/* Inner geometric details */}
            <circle
              cx="100"
              cy="50"
              r="15"
              fill="none"
              stroke={color}
              strokeWidth="1"
              opacity="0.4"
            />

            {/* Connecting lines */}
            <line x1="100" y1="20" x2="100" y2="35" stroke={color} strokeWidth="1" opacity="0.5" />
            <line x1="130" y1="35" x2="115" y2="42" stroke={color} strokeWidth="1" opacity="0.5" />
            <line x1="130" y1="65" x2="115" y2="58" stroke={color} strokeWidth="1" opacity="0.5" />
            <line x1="100" y1="80" x2="100" y2="65" stroke={color} strokeWidth="1" opacity="0.5" />
            <line x1="70" y1="65" x2="85" y2="58" stroke={color} strokeWidth="1" opacity="0.5" />
            <line x1="70" y1="35" x2="85" y2="42" stroke={color} strokeWidth="1" opacity="0.5" />

            {/* Corner ornaments */}
            <path
              d="M0,0 L20,0 L10,10 Z"
              fill="none"
              stroke={color}
              strokeWidth="1"
              opacity="0.3"
            />
            <path
              d="M200,0 L180,0 L190,10 Z"
              fill="none"
              stroke={color}
              strokeWidth="1"
              opacity="0.3"
            />
            <path
              d="M0,200 L20,200 L10,190 Z"
              fill="none"
              stroke={color}
              strokeWidth="1"
              opacity="0.3"
            />
            <path
              d="M200,200 L180,200 L190,190 Z"
              fill="none"
              stroke={color}
              strokeWidth="1"
              opacity="0.3"
            />
          </pattern>
        </defs>

        <rect width="100%" height="100%" fill="url(#islamic-pattern)" />
      </svg>
    </div>
  );
}
