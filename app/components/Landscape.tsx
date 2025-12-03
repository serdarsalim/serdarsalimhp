'use client';

import React, { useRef, useEffect, useState } from 'react';
import SwimFish from './SwimFish';
import SwimTurtle from './SwimTurtle';
import type { HeroHandle } from './Hero';
import styles from './Landscape.module.css';

interface LandscapeProps {
  heroRef: React.RefObject<HeroHandle | null>;
}

export default function Landscape({ heroRef }: LandscapeProps) {
  const [fishEyeOffset, setFishEyeOffset] = useState({ x: 0, y: 0 });
  const [turtleEyeOffset, setTurtleEyeOffset] = useState({ x: 0, y: 0 });
  const fishEyeRef = useRef<HTMLDivElement | null>(null);
  const turtleEyeRef = useRef<HTMLDivElement | null>(null);
  const landscapeRef = useRef<HTMLDivElement | null>(null);

  const handleFishClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    heroRef.current?.openCurious();
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const landscapeEl = landscapeRef.current;
    if (!landscapeEl) return;

    const handlePointerMove = (event: PointerEvent) => {
      const fishRect = fishEyeRef.current?.getBoundingClientRect();
      if (fishRect) {
        const centerX = fishRect.left + fishRect.width / 2;
        const centerY = fishRect.top + fishRect.height / 2;
        const dx = event.clientX - centerX;
        const dy = event.clientY - centerY;
        const maxX = Math.max(fishRect.width, 60);
        const maxY = Math.max(fishRect.height, 40);

        setFishEyeOffset({
          x: Math.max(-1, Math.min(1, dx / maxX)),
          y: Math.max(-1, Math.min(1, dy / maxY)),
        });
      }

      const turtleRect = turtleEyeRef.current?.getBoundingClientRect();
      if (turtleRect) {
        const centerX = turtleRect.left + turtleRect.width / 2;
        const centerY = turtleRect.top + turtleRect.height / 2;
        const dx = event.clientX - centerX;
        const dy = event.clientY - centerY;
        const maxX = Math.max(turtleRect.width, 60);
        const maxY = Math.max(turtleRect.height, 40);

        setTurtleEyeOffset({
          x: Math.max(-1, Math.min(1, dx / maxX)),
          y: Math.max(-1, Math.min(1, dy / maxY)),
        });
      }
    };

    const resetEye = () => {
      setFishEyeOffset({ x: 0, y: 0 });
      setTurtleEyeOffset({ x: 0, y: 0 });
    };

    landscapeEl.addEventListener('pointermove', handlePointerMove);
    landscapeEl.addEventListener('pointerleave', resetEye);

    return () => {
      landscapeEl.removeEventListener('pointermove', handlePointerMove);
      landscapeEl.removeEventListener('pointerleave', resetEye);
    };
  }, []);

  return (
    <div ref={landscapeRef} className={styles.landscape}>
      <div className={styles['connect-card']}>
        <h2 className={styles['connect-title']}>Let's Connect</h2>
        <div className={styles['connect-card-content']}>
          <div className={styles['connect-links']}>
            <a href="mailto:contact@serdarsalim.com" className={styles['connect-link']}>
              <svg className={styles['connect-icon']} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l8.21 5.14a2 2 0 002.16 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>contact@serdarsalim.com</span>
            </a>
            <div className={styles['connect-row']}>
              <a
                href="https://linkedin.com/in/domurcuk"
                target="_blank"
                rel="noopener noreferrer"
                className={styles['connect-link']}
              >
                <svg className={styles['connect-icon']} viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
                </svg>
                <span>LinkedIn</span>
              </a>
              <a
                href="https://tiktok.com/@salimspoke"
                target="_blank"
                rel="noopener noreferrer"
                className={styles['connect-link']}
              >
                <svg className={styles['connect-icon']} viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
                </svg>
                <span>TikTok</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <button type="button" className={styles['productivity-button']} onClick={() => heroRef.current?.openToolbox()}>
        <span>🐥</span>
      </button>
      <div className={styles.mountain}></div>
      <div className={`${styles.mountain} ${styles['mountain-2']}`}></div>
      <div className={`${styles.mountain} ${styles['mountain-3']}`}></div>
      <div className={`${styles['sun-container']} ${styles['sun-container-1']}`}></div>
      <div className={styles['sun-container']}>
        <div className={styles.sun}></div>
      </div>
      <div className={styles.cloud}></div>
      <div className={`${styles.cloud} ${styles['cloud-1']}`}></div>
      <div className={styles.light}></div>
      <div className={`${styles.light} ${styles['light-1']}`}></div>
      <div className={`${styles.light} ${styles['light-2']}`}></div>
      <div className={`${styles.light} ${styles['light-3']}`}></div>
      <div className={`${styles.light} ${styles['light-4']}`}></div>
      <div className={`${styles.light} ${styles['light-5']}`}></div>
      <div className={`${styles.light} ${styles['light-6']}`}></div>
      <div className={`${styles.light} ${styles['light-7']}`}></div>
      <div className={styles.water}></div>

      {/* Fish swimming in the pond */}
      <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
        <button
          type="button"
          className="pond-fish-orbit pointer-events-auto"
          aria-label="Open Curious quiz"
          onClick={handleFishClick}
        >
          <span className="pond-fish-bob">
            <span className="pond-fish-body" ref={fishEyeRef}>
              <SwimFish className="w-16 md:w-20 h-auto opacity-95" eyeOffset={fishEyeOffset} />
            </span>
          </span>
        </button>

        {/* Turtle swimming in the pond */}
        <div className="pond-turtle-orbit pointer-events-auto">
          <span className="pond-turtle-bob">
            <span className="pond-turtle-body" ref={turtleEyeRef}>
              <SwimTurtle className="w-12 md:w-16 h-auto opacity-90" eyeOffset={turtleEyeOffset} />
            </span>
          </span>
        </div>
      </div>

      <div className={styles.splash}></div>
      <div className={`${styles.splash} ${styles['delay-1']}`}></div>
      <div className={`${styles.splash} ${styles['delay-2']}`}></div>
      <div className={`${styles.splash} ${styles['splash-4']} ${styles['delay-2']}`}></div>
      <div className={`${styles.splash} ${styles['splash-4']} ${styles['delay-3']}`}></div>
      <div className={`${styles.splash} ${styles['splash-4']} ${styles['delay-4']}`}></div>
      <div className={`${styles.splash} ${styles['splash-stone']} ${styles['delay-3']}`}></div>
      <div className={`${styles.splash} ${styles['splash-stone']} ${styles['splash-4']}`}></div>
      <div className={`${styles.splash} ${styles['splash-stone']} ${styles['splash-5']}`}></div>
      <div className={`${styles.lotus} ${styles['lotus-1']}`}></div>
      <div className={`${styles.lotus} ${styles['lotus-2']}`}></div>
      <div className={`${styles.lotus} ${styles['lotus-3']}`}></div>
      <div className={styles.front}>
        <div className={styles.stone}></div>
        <div className={styles.grass}></div>
        <div className={`${styles.grass} ${styles['grass-1']}`}></div>
        <div className={`${styles.grass} ${styles['grass-2']}`}></div>
        <div className={styles.reed}></div>
        <div className={`${styles.reed} ${styles['reed-1']}`}></div>
      </div>

      <style jsx>{`
        .pond-fish-orbit {
          position: absolute;
          top: 0;
          left: 0;
          width: 0;
          height: 0;
          display: block;
          animation: pondFishSwim 22s ease-in-out infinite;
          touch-action: manipulation;
          background: transparent;
          border: none;
          padding: 0;
          cursor: pointer;
          line-height: 0;
        }

        .pond-fish-bob {
          animation: pondFishBob 3s ease-in-out infinite;
          display: inline-block;
          position: relative;
        }

        .pond-fish-body {
          transform-origin: center;
          animation: pondFishTilt 4s ease-in-out infinite;
          filter: drop-shadow(0 8px 16px rgba(15, 23, 42, 0.3));
          display: inline-block;
          pointer-events: auto;
        }

        .pond-fish-body svg {
          display: block;
          pointer-events: auto;
        }

        @keyframes pondFishSwim {
          0% {
            transform: translate3d(18vw, 70vh, 0) translate(-50%, -50%) rotate(6deg) scale(0.95);
          }
          25% {
            transform: translate3d(32vw, 64vh, 0) translate(-50%, -50%) rotate(-8deg) scale(1.05);
          }
          50% {
            transform: translate3d(55vw, 75vh, 0) translate(-50%, -50%) rotate(10deg) scale(0.9);
          }
          75% {
            transform: translate3d(78vw, 68vh, 0) translate(-50%, -50%) rotate(-5deg) scale(1.02);
          }
          100% {
            transform: translate3d(18vw, 70vh, 0) translate(-50%, -50%) rotate(6deg) scale(0.95);
          }
        }

        @keyframes pondFishBob {
          0% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-6px);
          }
          100% {
            transform: translateY(0);
          }
        }

        @keyframes pondFishTilt {
          0% {
            transform: rotate(-3deg);
          }
          50% {
            transform: rotate(3deg);
          }
          100% {
            transform: rotate(-3deg);
          }
        }

        .pond-turtle-orbit {
          position: absolute;
          top: 0;
          left: 0;
          width: 0;
          height: 0;
          display: block;
          animation: pondTurtleSwim 28s ease-in-out infinite;
          animation-delay: -8s;
        }

        .pond-turtle-bob {
          animation: pondTurtleBob 4s ease-in-out infinite;
          display: inline-block;
          position: relative;
        }

        .pond-turtle-body {
          transform-origin: center;
          animation: pondTurtleTilt 5s ease-in-out infinite;
          filter: drop-shadow(0 6px 12px rgba(15, 23, 42, 0.25));
          display: inline-block;
        }

        .pond-turtle-body svg {
          display: block;
        }

        @keyframes pondTurtleSwim {
          0% {
            transform: translate3d(65vw, 68vh, 0) translate(-50%, -50%) rotate(-10deg) scale(0.9);
          }
          25% {
            transform: translate3d(42vw, 73vh, 0) translate(-50%, -50%) rotate(8deg) scale(1);
          }
          50% {
            transform: translate3d(20vw, 66vh, 0) translate(-50%, -50%) rotate(-12deg) scale(0.85);
          }
          75% {
            transform: translate3d(40vw, 70vh, 0) translate(-50%, -50%) rotate(6deg) scale(0.95);
          }
          100% {
            transform: translate3d(65vw, 68vh, 0) translate(-50%, -50%) rotate(-10deg) scale(0.9);
          }
        }

        @keyframes pondTurtleBob {
          0% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-4px);
          }
          100% {
            transform: translateY(0);
          }
        }

        @keyframes pondTurtleTilt {
          0% {
            transform: rotate(-2deg);
          }
          50% {
            transform: rotate(2deg);
          }
          100% {
            transform: rotate(-2deg);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .pond-fish-orbit {
            animation: none;
            transform: translate(50%, 70%) translate(-50%, -50%);
          }
          .pond-fish-bob {
            animation: none;
          }
          .pond-fish-body {
            animation: none;
          }
          .pond-turtle-orbit {
            animation: none;
            transform: translate(30%, 70%) translate(-50%, -50%);
          }
          .pond-turtle-bob {
            animation: none;
          }
          .pond-turtle-body {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
