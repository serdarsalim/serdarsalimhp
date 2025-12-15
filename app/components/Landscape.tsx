'use client';

import React from 'react';
import type { HeroHandle } from './Hero';

interface LandscapeProps {
  heroRef: React.RefObject<HeroHandle | null>;
}

export default function Landscape({ heroRef: _heroRef }: LandscapeProps) {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#0c0207]">
      {/* Space video overlay at top with fade downward */}
      <div className="absolute inset-x-0 top-0 h-[70%] overflow-hidden" style={{ zIndex: 0 }}>
        <video
          className="w-full h-full object-cover pointer-events-none opacity-50"
          src="/universe.mp4"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
          style={{
            maskImage: 'linear-gradient(to bottom, black 0%, rgba(0,0,0,0.8) 30%, rgba(0,0,0,0.4) 60%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 0%, rgba(0,0,0,0.8) 30%, rgba(0,0,0,0.4) 60%, transparent 100%)',
          }}
        />
      </div>

      {/* Sky gradient background with transparency to show video */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          background: 'linear-gradient(to bottom, rgba(94, 48, 217, 0.7) 0%, rgba(138, 101, 204, 0.7) 35%, rgba(61, 43, 95, 0.85) 70%, #0c0207 100%)',
          zIndex: 1,
        }}
      />

      {/* Moon */}
      <div
        className="absolute top-[12vh] right-[15%] w-[6vw] h-[6vw] min-w-[60px] min-h-[60px] max-w-[120px] max-h-[120px]"
        style={{
          borderRadius: '50%',
          boxShadow: '30px 10px 0 #F7F8E0',
          zIndex: 2,
        }}
      />

      {/* Animated buildings */}
      <div
        className="absolute bottom-[18vh] w-full h-[35vh]"
        style={{
          backgroundImage: 'url(https://res.cloudinary.com/pastelitos/image/upload/v1610526533/eva/edificiosOne_fsg7nx.svg)',
          backgroundPosition: 'bottom',
          backgroundRepeat: 'repeat-x',
          backgroundSize: 'auto 100%',
          animation: 'animarEdificios 120s linear infinite',
          zIndex: 3,
        }}
      />

      {/* Animated minaret wrapper */}
      <div
        className="absolute bottom-[18vh] w-full h-[35vh]"
        style={{
          animation: 'moveMinaretWrapper 120s linear infinite',
          zIndex: 2,
        }}
      >
        {/* Minaret Tower */}
        <div className="minaret-container" style={{ right: '10vw' }}>
          <section className="top-minaret">
          <div className="tige">
            <div className="croissant"></div>
            <div className="sphere1"></div>
            <div className="sphere2"></div>
            <div className="sphere3"></div>
            <div className="barre"></div>
          </div>
          <div className="pyramide"></div>
          <div className="base-pyramide"></div>
          <div className="cube">
            <div className="frize">
              {[...Array(6)].map((_, i) => (
                <div key={`top-frize-${i}`} className="motif-frize">
                  <div className="details-frize1"></div>
                  <div className="details-frize2"></div>
                  <div className="details-frize3"></div>
                  <div className="details-frize4"></div>
                  <div className="details-frize5"></div>
                  <div className="details-frize6"></div>
                </div>
              ))}
            </div>
            <div className="porte">
              <div className="arc-ext">
                <div className="arc-intern"></div>
                <div className="cadre"></div>
                <div className="motif-cadre">
                  <div className="motif-left"></div>
                  <div className="motif-right"></div>
                </div>
              </div>
              <div className="fill1"></div>
              <div className="fill2"></div>
              <div className="fill3"></div>
            </div>
            <div className="mini-arches">
              {[...Array(4)].map((_, i) => (
                <div key={`mini-arc-${i}`} className="mini-arc">
                  <div className="mini-arc-cercle"></div>
                  <div className="mini-arc-rectangle"></div>
                </div>
              ))}
            </div>
            <div className="motif-1"></div>
            <div className="motif-2"></div>
            <div className="arc"></div>
          </div>
          </section>
          <section className="body-minaret">
          <div className="frize">
            {[...Array(9)].map((_, i) => (
              <div key={`body-frize-${i}`} className="motif-frize">
                <div className="details-frize1"></div>
                <div className="details-frize2"></div>
                <div className="details-frize3"></div>
                <div className="details-frize4"></div>
                <div className="details-frize5"></div>
                <div className="details-frize6"></div>
              </div>
            ))}
          </div>
          <div className="motif-1">
            <div className="arcs">
              <div className="cadre-arc">
                {[...Array(4)].map((_, i) => (
                  <div key={`arc-${i}`} className="arc">
                    <div className="cercle"></div>
                    <div className="rectangle"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="motif-2"></div>
          <div className="motif-3">
            <div className="cadre-intern">
              <div className="motifs-intern">
                {[...Array(115)].map((_, i) => (
                  <div key={`carre-${i}`} className="carre"></div>
                ))}
              </div>
            </div>
          </div>
          </section>
        </div>
      </div>

      {/* Wall/ground gradient */}
      <div
        className="absolute bottom-0 w-full h-[18vh]"
        style={{
          background: 'linear-gradient(to bottom, #2a4442 0%, #1a2a29 40%, #0f1515 70%, #0c0207 100%)',
          zIndex: 4,
        }}
      />

      {/* Animated cat sprite - walking in place */}
      <div
        className="cat-sprite"
        style={{
          position: 'absolute',
          bottom: '17vh',
          left: '10%',
          width: '150px',
          height: '100px',
          zIndex: 5,
          backgroundImage: 'url(https://res.cloudinary.com/pastelitos/image/upload/v1610526571/eva/gatito_pushui.svg)',
          backgroundSize: '1600% 100%',
          backgroundPosition: '0 0',
        }}
      />

      {/* Connect Card */}
      <div
        className="absolute top-[15vh] left-1/2 -translate-x-1/2 w-[min(360px,90vw)] p-6 md:p-8 z-20"
      >
        <h2 className="text-xl md:text-2xl font-bold text-white mb-4 text-center uppercase tracking-wider drop-shadow-lg">
          Let's Connect
        </h2>
        <div className="flex flex-col gap-3">
          <a
            href="mailto:contact@serdarsalim.com"
            className="flex items-center justify-center gap-3 text-white hover:opacity-80 transition-opacity text-sm md:text-base drop-shadow"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l8.21 5.14a2 2 0 002.16 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span>contact@serdarsalim.com</span>
          </a>
          <div className="flex gap-6 justify-center">
            <a
              href="https://linkedin.com/in/domurcuk"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white hover:opacity-80 transition-opacity text-sm md:text-base drop-shadow"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
              </svg>
              <span>LinkedIn</span>
            </a>
            <a
              href="https://tiktok.com/@salimspoke"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white hover:opacity-80 transition-opacity text-sm md:text-base drop-shadow"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
              </svg>
              <span>TikTok</span>
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        .cat-sprite {
          animation: catWalk 1.6s steps(16) infinite;
        }

        @keyframes animarEdificios {
          from { background-position: 0 bottom; }
          to { background-position: -3000px bottom; }
        }

        @keyframes moveMinaretWrapper {
          from { transform: translateX(0); }
          to { transform: translateX(-3000px); }
        }

        @keyframes catWalk {
          from {
            background-position-x: 0;
          }
          to {
            background-position-x: -1600%;
          }
        }

        @keyframes chickSway {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(8px); }
        }

        @keyframes bookFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }

        @media (prefers-reduced-motion: reduce) {
          div[style*="animarEdificios"],
          div[style*="spriteAnimation"],
          button[style*="chickSway"],
          button[style*="bookFloat"] {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
