'use client';

import { useEffect, useState, useRef } from 'react';
import IslamicPattern from './IslamicPattern';

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHoveringPhoto, setIsHoveringPhoto] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Play/pause video based on photo hover/tap
  useEffect(() => {
    if (videoRef.current) {
      if (isHoveringPhoto) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0; // Reset to start
      }
    }
  }, [isHoveringPhoto]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Import statement will be at top of file */}
      {/* Mountain sunset gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-orange-100 via-purple-100 to-blue-200">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(147, 197, 253, 0.3), transparent 50%)`,
          }}
        />
      </div>

      {/* Subtle layered atmosphere */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-orange-200 to-transparent opacity-40" />
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-blue-300 to-transparent opacity-40" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 flex items-center min-h-screen py-20 md:py-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-end md:items-end w-full md:-ml-12 mx-auto">
          {/* Left side - Photo with video overlay */}
          <div className="flex relative animate-fade-in-up justify-center self-start -mt-48 md:-mt-64">
            <div
              className="relative cursor-pointer"
              onMouseEnter={() => setIsHoveringPhoto(true)}
              onMouseLeave={() => setIsHoveringPhoto(false)}
              onClick={() => setIsHoveringPhoto(!isHoveringPhoto)}
            >
              {/* Static image */}
              <img
                src="/profile.png"
                alt="Serdar Salim"
                className="w-full max-w-xs md:max-w-md object-contain drop-shadow-2xl"
                style={{
                  maskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)',
                  opacity: isHoveringPhoto ? 0 : 1,
                  transition: 'opacity 0ms'
                }}
              />

              {/* Video overlay - plays on hover */}
              <video
                ref={videoRef}
                src="/test3.mov"
                muted
                playsInline
                className="absolute inset-0 w-full max-w-xs md:max-w-md object-contain drop-shadow-2xl pointer-events-none"
                style={{
                  maskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)',
                  opacity: isHoveringPhoto ? 1 : 0,
                  transition: 'opacity 0ms'
                }}
              />
            </div>
          </div>

          {/* Right side - Text */}
          <div className="space-y-4 md:space-y-6 animate-fade-in-up animation-delay-200 text-center md:text-left md:-mt-48">
            {/* Title */}
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-gray-900">
              Portfolio
            </h1>

            {/* Name - casual handwriting style */}
            <p className="text-2xl sm:text-3xl md:text-4xl text-gray-700" style={{ fontFamily: 'var(--font-caveat)' }}>
              Serdar Salim
            </p>

            {/* Subtitle */}
            <div className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed space-y-1" style={{ fontFamily: 'var(--font-jetbrains)' }}>
              <p>Builds software that solves problems</p>
              <p>Creates content that inspires</p>
              <p>Dreamer of the day</p>
            </div>

            {/* Subtle CTA that matches the design */}
            <div className="pt-6 flex justify-center md:justify-start">
              <a
                href="#projects"
                className="group inline-flex items-center gap-3 px-6 py-3 bg-white/60 backdrop-blur-sm border border-teal-200 rounded-lg text-gray-700 hover:bg-teal-50 hover:border-teal-300 transition-all duration-300"
                style={{ fontFamily: 'var(--font-jetbrains)' }}
              >
                <span className="text-base md:text-lg font-medium">View my work</span>
                <svg className="w-5 h-5 transform group-hover:translate-y-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
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
