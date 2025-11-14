'use client';

import { useEffect, useState } from 'react';

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Mountain sunset gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-orange-100 via-teal-50 to-teal-200">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(45, 212, 191, 0.3), transparent 50%)`,
          }}
        />
      </div>

      {/* Subtle layered atmosphere */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-orange-100 to-transparent opacity-60" />
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-teal-300 to-transparent opacity-40" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 flex items-center min-h-screen py-20 md:py-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-end md:items-end w-full md:-ml-12 mx-auto">
          {/* Left side - Photo */}
          <div className="flex relative animate-fade-in-up justify-center self-start -mt-48 md:-mt-64">
            <div className="relative">
              <img
                src="/profile.png"
                alt="Serdar Salim"
                className="w-full max-w-xs md:max-w-md object-contain drop-shadow-2xl"
                style={{
                  maskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)'
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
              <p>Dreams by the day</p>
            </div>

            {/* CTA Button - Islamic Pattern */}
            <div className="pt-4 flex justify-center md:justify-start">
              <a
                href="#projects"
                className="group relative inline-flex items-center gap-3 px-6 py-3 md:px-8 md:py-4 bg-teal-600 text-white rounded-lg font-medium overflow-hidden shadow-lg shadow-teal-200 hover:shadow-xl transition-shadow text-sm md:text-base"
              >
                {/* 2 rotating squares Islamic pattern */}
                <div className="relative w-6 h-6 md:w-8 md:h-8 flex-shrink-0">
                  {/* Outer square - clockwise */}
                  <div className="absolute inset-0 border-2 border-white/40 transform group-hover:rotate-45 transition-transform duration-1000"></div>

                  {/* Inner square - counter-clockwise */}
                  <div className="absolute inset-2 border-2 border-white/60 transform group-hover:-rotate-45 transition-transform duration-1000"></div>
                </div>

                <span className="relative z-10">View My Work</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
