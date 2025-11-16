'use client';

interface IslamicPatternProps {
  position?: 'bottom' | 'top';
  variant?: 1 | 2;
}

export default function IslamicPattern({
  position = 'bottom',
  variant = 1
}: IslamicPatternProps) {
  const gradientDirection = position === 'bottom'
    ? 'linear-gradient(to top, black 0%, black 30%, transparent 100%)'
    : 'linear-gradient(to bottom, black 0%, black 30%, transparent 100%)';

  return (
    <>
      {/* Desktop: Bottom of section */}
      <div
        className={`hidden md:block absolute left-0 right-0 h-32 overflow-hidden z-10 ${
          position === 'bottom' ? 'bottom-0' : 'top-0'
        }`}
        style={{
          maskImage: gradientDirection,
          WebkitMaskImage: gradientDirection,
          opacity: 0.2
        }}
      >
      <svg
        className="w-full h-full"
        viewBox="0 0 1200 120"
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <style>
            {`
              @keyframes rotate-clockwise {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
              }
              @keyframes rotate-counter-clockwise {
                from { transform: rotate(0deg); }
                to { transform: rotate(-360deg); }
              }
              @keyframes rotate-counter-clockwise-45 {
                from { transform: rotate(45deg); }
                to { transform: rotate(-315deg); }
              }
              @keyframes rotate-clockwise-45 {
                from { transform: rotate(45deg); }
                to { transform: rotate(405deg); }
              }
              .square-teal {
                animation: rotate-clockwise 20s linear infinite;
                transform-origin: 40px 40px;
              }
              .square-orange {
                animation: rotate-clockwise-45 20s linear infinite;
                transform-origin: 40px 40px;
              }
            `}
          </style>
        </defs>

        {/* Single centered overlapping squares - no repeat */}
        <g transform="translate(560, 10)">
          {/* Horizontal square - rotates clockwise, reverses on hover */}
          <rect
            x="0"
            y="0"
            width="80"
            height="80"
            fill="none"
            stroke="currentColor"
            strokeWidth="6"
            className="text-purple-600 square-teal"
            opacity="0.6"
          />

          {/* Rotated 45 degree square - starts at 45deg, rotates with it */}
          <rect
            x="0"
            y="0"
            width="80"
            height="80"
            fill="none"
            stroke="currentColor"
            strokeWidth="6"
            className="text-orange-500 square-orange"
            opacity="0.6"
          />
        </g>
      </svg>
    </div>
  </>
  );
}
