'use client';

import { useMemo, useEffect, useState } from 'react';

function generateStars(count: number, width: number, height: number): string {
  const stars = [];
  for (let i = 0; i < count; i++) {
    const x = Math.floor(Math.random() * width);
    const y = Math.floor(Math.random() * height);
    stars.push(`${x}px ${y}px #FFF`);
  }
  return stars.join(', ');
}

export default function Stars() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const starsSmall = useMemo(() =>
    mounted ? generateStars(700, window.innerWidth, window.innerHeight * 2) : '',
  [mounted]);
  const starsMedium = useMemo(() =>
    mounted ? generateStars(200, window.innerWidth, window.innerHeight * 2) : '',
  [mounted]);
  const starsBig = useMemo(() =>
    mounted ? generateStars(100, window.innerWidth, window.innerHeight * 2) : '',
  [mounted]);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <div className="stars-container">
        <div className="stars small"></div>
        <div className="stars medium"></div>
        <div className="stars big"></div>
      </div>
      <style jsx>{`
        .stars-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          z-index: 0;
          pointer-events: none;
          mask-image: linear-gradient(to bottom, black 0%, black 30%, transparent 60%);
          -webkit-mask-image: linear-gradient(to bottom, black 0%, black 30%, transparent 60%);
        }

        .stars {
          position: absolute;
          top: 0;
          left: 0;
          width: 1px;
          height: 1px;
        }

        .stars.small {
          width: 1px;
          height: 1px;
          background: transparent;
          box-shadow: ${starsSmall};
          animation: starsAnimation 50s linear infinite;
        }

        .stars.small:after {
          content: ' ';
          position: absolute;
          top: 100vh;
          width: 1px;
          height: 1px;
          background: transparent;
          box-shadow: ${starsSmall};
        }

        .stars.medium {
          width: 2px;
          height: 2px;
          background: transparent;
          box-shadow: ${starsMedium};
          animation: starsAnimation 100s linear infinite;
        }

        .stars.medium:after {
          content: ' ';
          position: absolute;
          top: 100vh;
          width: 2px;
          height: 2px;
          background: transparent;
          box-shadow: ${starsMedium};
        }

        .stars.big {
          width: 3px;
          height: 3px;
          background: transparent;
          box-shadow: ${starsBig};
          border-radius: 100%;
          animation: starsAnimation 150s linear infinite;
        }

        .stars.big:after {
          content: ' ';
          position: absolute;
          top: 100vh;
          width: 3px;
          height: 3px;
          background: transparent;
          box-shadow: ${starsBig};
          border-radius: 100%;
        }

        @keyframes starsAnimation {
          from {
            transform: translateY(-100vh);
          }
          to {
            transform: translateY(100vh);
          }
        }
      `}</style>
    </>
  );
}
