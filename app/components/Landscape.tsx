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
  const [isDraggingTurtle, setIsDraggingTurtle] = useState(false);
  const [turtlePosition, setTurtlePosition] = useState({ x: 0, y: 0 });
  const [placementCount, setPlacementCount] = useState(0);
  const [showSpeechBubble, setShowSpeechBubble] = useState(false);
  const [fishClickCount, setFishClickCount] = useState(0);
  const [showFishBubble, setShowFishBubble] = useState(false);
  const fishEyeRef = useRef<HTMLDivElement | null>(null);
  const turtleEyeRef = useRef<HTMLDivElement | null>(null);
  const landscapeRef = useRef<HTMLDivElement | null>(null);
  const dragOffsetRef = useRef({ x: 0, y: 0 });
  const hasMoved = useRef(false);

  const turtleQuotes = [
    "Hey there! 👋",
    "Oh, we're moving now? 🐢",
    "This is kinda fun! 😊",
    "Okay, I'll stay here... 🐢",
    "Can you stop moving me? 😅",
    "Seriously? Again? 🙄",
    "Why don't you just mess with the fish? 😤",
    "My cousin is Donatello, you know! 🐢",
  ];

  const handleFishClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFishClickCount((prev) => prev + 1);
    setShowFishBubble(true);
    setTimeout(() => setShowFishBubble(false), 2000);
  };

  const handleBookClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    heroRef.current?.openCurious();
  };

  const handleTurtlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!landscapeRef.current) return;

    const target = e.currentTarget as HTMLElement;
    const landscapeRect = landscapeRef.current.getBoundingClientRect();

    // Calculate the pointer position relative to landscape
    const pointerX = ((e.clientX - landscapeRect.left) / landscapeRect.width) * 100;
    const pointerY = ((e.clientY - landscapeRect.top) / landscapeRect.height) * 100;

    // If turtle has been moved before, use its position; otherwise it's at animated position
    const currentTurtleX = hasMoved.current ? turtlePosition.x : pointerX;
    const currentTurtleY = hasMoved.current ? turtlePosition.y : pointerY;

    dragOffsetRef.current = {
      x: pointerX - currentTurtleX,
      y: pointerY - currentTurtleY,
    };

    setIsDraggingTurtle(true);

    // Capture pointer for smooth dragging on mobile
    target.setPointerCapture(e.pointerId);
  };

  const handleTurtlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingTurtle || !landscapeRef.current) return;

    e.preventDefault();

    const landscapeRect = landscapeRef.current.getBoundingClientRect();
    const x = ((e.clientX - landscapeRect.left) / landscapeRect.width) * 100 - dragOffsetRef.current.x;
    const y = ((e.clientY - landscapeRect.top) / landscapeRect.height) * 100 - dragOffsetRef.current.y;

    // Keep turtle in water area when dragging
    const clampedY = Math.max(50, Math.min(95, y));
    setTurtlePosition({ x, y: clampedY });
    hasMoved.current = true;
  };

  const handleTurtlePointerUp = (e: React.PointerEvent) => {
    setIsDraggingTurtle(false);

    // Release pointer capture
    (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);

    // Increment placement count (for speech bubble progression)
    const newCount = placementCount + 1;
    setPlacementCount(newCount);

    // Show speech bubble from first interaction (even on tap), persist it
    setShowSpeechBubble(true);

    // Hide after 3 seconds
    setTimeout(() => setShowSpeechBubble(false), 3000);
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const landscapeEl = landscapeRef.current;
    if (!landscapeEl) return;

    const handlePointerMove = (event: PointerEvent) => {
      // Eye tracking for fish
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

      // Eye tracking for turtle
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

    const resetState = () => {
      setFishEyeOffset({ x: 0, y: 0 });
      setTurtleEyeOffset({ x: 0, y: 0 });
    };

    landscapeEl.addEventListener('pointermove', handlePointerMove);
    landscapeEl.addEventListener('pointerleave', resetState);

    return () => {
      landscapeEl.removeEventListener('pointermove', handlePointerMove);
      landscapeEl.removeEventListener('pointerleave', resetState);
    };
  }, []);


  return (
    <div ref={landscapeRef} className={styles.landscape}>
      {/* Space video overlay at top with fade downward */}
      <div className="absolute inset-x-0 top-0 h-1/2 overflow-hidden" style={{ zIndex: 1 }}>
        <video
          className="w-full h-full object-cover pointer-events-none opacity-70"
          src="/universe.mp4"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
          style={{
            maskImage: 'linear-gradient(to bottom, black 0%, rgba(0,0,0,0.95) 10%, rgba(0,0,0,0.85) 20%, rgba(0,0,0,0.7) 35%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.3) 65%, rgba(0,0,0,0.15) 80%, rgba(0,0,0,0.05) 90%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 0%, rgba(0,0,0,0.95) 10%, rgba(0,0,0,0.85) 20%, rgba(0,0,0,0.7) 35%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.3) 65%, rgba(0,0,0,0.15) 80%, rgba(0,0,0,0.05) 90%, transparent 100%)',
          }}
        />
      </div>

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
      <button type="button" className={styles['book-button']} onClick={handleBookClick}>
        <span>📖</span>
      </button>
      <div className={styles.mountain}></div>
      <div className={`${styles.mountain} ${styles['mountain-2']}`}></div>
      <div className={`${styles.mountain} ${styles['mountain-3']}`}></div>
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
          aria-label="Click the fish"
          onClick={handleFishClick}
        >
          <span className="pond-fish-bob">
            <span className="pond-fish-body" ref={fishEyeRef}>
              <SwimFish className="w-16 md:w-20 h-auto opacity-95" eyeOffset={fishEyeOffset} />
            </span>
          </span>

          {/* Fish speech bubble */}
          {showFishBubble && (
            <div className="fish-speech-bubble">
              {fishClickCount === 1 ? "I'm just a fish... 🐟" : "Blub.. blub.. blub.. 💧"}
            </div>
          )}
        </button>

        {/* Turtle swimming in the pond */}
        <div
          className={`pond-turtle-orbit ${isDraggingTurtle ? 'dragging' : ''} ${hasMoved.current && (turtlePosition.x !== 0 || turtlePosition.y !== 0) ? 'positioned' : ''}`}
          style={(hasMoved.current && (isDraggingTurtle || (turtlePosition.x !== 0 || turtlePosition.y !== 0))) ? {
            left: `${turtlePosition.x}%`,
            top: `${turtlePosition.y}%`,
            animation: 'none'
          } : {}}
          onPointerDown={handleTurtlePointerDown}
          onPointerMove={handleTurtlePointerMove}
          onPointerUp={handleTurtlePointerUp}
        >
          <span className="pond-turtle-bob">
            <span className="pond-turtle-body" ref={turtleEyeRef}>
              <SwimTurtle className="w-12 md:w-16 h-auto opacity-90" eyeOffset={turtleEyeOffset} />
            </span>
          </span>

          {/* Speech bubble */}
          {showSpeechBubble && (
            <div className="turtle-speech-bubble">
              {turtleQuotes[Math.min(placementCount - 1, turtleQuotes.length - 1)]}
            </div>
          )}
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
          display: block;
          animation: pondTurtleSwim 28s ease-in-out infinite;
          animation-delay: -8s;
          touch-action: none;
          cursor: grab;
        }

        .pond-turtle-orbit.dragging {
          cursor: grabbing;
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

        .pond-turtle-orbit {
          cursor: grab;
          pointer-events: auto;
        }

        .pond-turtle-orbit.dragging {
          cursor: grabbing;
          z-index: 100;
        }

        .pond-turtle-orbit.positioned {
          z-index: 100;
        }

        .pond-turtle-bob {
          pointer-events: auto;
        }

        .pond-turtle-body,
        .pond-turtle-body svg {
          pointer-events: auto;
        }

        .turtle-speech-bubble {
          position: absolute;
          bottom: 120%;
          left: 50%;
          transform: translateX(-50%);
          background: white;
          color: #1f2937;
          padding: 8px 12px;
          border-radius: 12px;
          font-size: 14px;
          white-space: nowrap;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          pointer-events: none;
          animation: speechBubblePop 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          z-index: 1000;
        }

        .turtle-speech-bubble::after {
          content: '';
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          border: 8px solid transparent;
          border-top-color: white;
        }

        @keyframes speechBubblePop {
          0% {
            opacity: 0;
            transform: translateX(-50%) scale(0.8);
          }
          100% {
            opacity: 1;
            transform: translateX(-50%) scale(1);
          }
        }

        .fish-speech-bubble {
          position: absolute;
          bottom: 120%;
          left: 50%;
          transform: translateX(-50%);
          background: white;
          color: #1f2937;
          padding: 8px 12px;
          border-radius: 12px;
          font-size: 14px;
          white-space: nowrap;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          pointer-events: none;
          animation: speechBubblePop 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          z-index: 1000;
        }

        .fish-speech-bubble::after {
          content: '';
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          border: 8px solid transparent;
          border-top-color: white;
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
