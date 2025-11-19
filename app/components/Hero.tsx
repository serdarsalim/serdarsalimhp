'use client';

import { useState } from 'react';
import IslamicPattern from './IslamicPattern';

export default function Hero() {
  const [isHoveringName, setIsHoveringName] = useState(false);
  const [isHoveringQuote, setIsHoveringQuote] = useState(false);
  const [showOrigin, setShowOrigin] = useState(false);

  return (
    <section id="hero-section" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Subtle space video anchored at bottom with fade upward */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 overflow-hidden">
        <video
          className="w-full h-full object-cover pointer-events-none"
          src="/universe.mp4"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
          style={{
            maskImage: 'linear-gradient(to top, black 30%, black 30%, transparent 70%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to top, black 30%, black 30%, transparent 70%, transparent 100%)',
          }}
        />
      </div>

      {/* Mountain sunset gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-orange-100/70 via-purple-100/70 to-blue-200/70" />

      {/* Subtle layered atmosphere */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-orange-200 to-transparent opacity-40" />
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-blue-300 to-transparent opacity-40" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 flex items-center min-h-screen py-20 md:py-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-end md:items-end w-full md:-ml-12 mx-auto">
          {/* Left side - Photo */}
          <div className="flex relative animate-fade-in-up justify-center self-start -mt-40 md:-mt-96">
            <div className="relative">
              <img
                src="/profile.png"
                alt="Serdar Salim"
                className="w-full max-w-xs md:max-w-lg object-contain drop-shadow-2xl"
                style={{
                  maskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)',
                }}
              />
            </div>
          </div>

          {/* Right side - Text */}
          <div className="space-y-4 md:space-y-6 animate-fade-in-up animation-delay-200 text-center md:text-left md:-mt-32">
            {/* Title */}
            <h1
              id="hero-title"
              className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 select-none cursor-pointer transition-all duration-300"
              onClick={() => setIsHoveringName(!isHoveringName)}
            >
              {isHoveringName ? 'Salim Serdar' : 'Serdar Salim'}
            </h1>

            {/* Location - casual handwriting style */}
            <p
              className="text-lg sm:text-xl md:text-2xl text-gray-600 font-semibold cursor-pointer select-none transition-all duration-300"
              style={{ fontFamily: 'var(--font-caveat)' }}
              onClick={() => setShowOrigin(!showOrigin)}
            >
              {showOrigin ? 'From Türkiye 🇹🇷' : 'Based in Malaysia 🇲🇾'}
            </p>

            {/* Subtitle */}
            <div className="text-sm sm:text-base md:text-lg text-gray-800 leading-relaxed space-y-1" style={{ fontFamily: 'var(--font-jetbrains)' }}>
              <p className="font-semibold">Builds software that solves problems</p>
              <p className="font-semibold">Creates content that inspires</p>
              <div
                className="relative cursor-pointer select-none"
                onClick={() => setIsHoveringQuote(!isHoveringQuote)}
              >
                {/* English - always rendered to maintain layout space */}
                <p
                  className={`font-semibold transition-opacity duration-300 ${isHoveringQuote ? 'opacity-100' : 'opacity-0'}`}
                >
                  Be in this world as if you are a<br />
                  stranger or a wayfarer
                </p>
                {/* Arabic - absolute positioned overlay */}
                <p
                  className={`absolute inset-0 font-semibold transition-opacity duration-300 ${isHoveringQuote ? 'opacity-0' : 'opacity-100'}`}
                  style={{ fontFamily: 'var(--font-reem-kufi)' }}
                >
                  كن في الدنيا كأنك غريب أو عابر سبيل
                </p>
              </div>
            </div>

            {/* Subtle CTA that matches the design */}
            <div className="pt-6 flex justify-center md:justify-start">
              <a
                href="#about"
                className="group relative inline-flex items-center gap-3 px-6 py-3 rounded-xl text-gray-900 font-medium bg-white/10 backdrop-blur-md border border-white/30 shadow-lg hover:bg-white/20 transition-all duration-300 overflow-hidden"
                style={{ fontFamily: 'var(--font-jetbrains)' }}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-indigo-200/0 via-white/20 to-purple-200/0 translate-x-[-120%] group-hover:translate-x-[120%] transition-transform duration-700" aria-hidden="true" />
                <span className="relative text-base md:text-lg font-semibold flex items-center gap-3 uppercase tracking-wide">
                  <span>About me</span>
                  <svg className="w-5 h-5 group-hover:translate-y-0.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v14m0 0l6-6m-6 6l-6-6" />
                  </svg>
                </span>
              </a>
            </div>

          </div>
        </div>
      </div>

      {/* Subtle Islamic pattern - fades upward */}
      <IslamicPattern position="bottom" variant={1} />
    </section>
  );
}
