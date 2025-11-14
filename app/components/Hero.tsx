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
      <div className="relative z-10 max-w-7xl mx-auto px-6 flex items-center min-h-screen">
        <div className="grid md:grid-cols-2 gap-12 items-end w-full -ml-12">
          {/* Left side - Photo */}
          <div className="relative animate-fade-in-up flex justify-center self-start -mt-64">
            <div className="relative">
              <img
                src="/profile.png"
                alt="Serdar Salim"
                className="w-full max-w-md object-contain drop-shadow-2xl"
                style={{
                  maskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)'
                }}
              />
            </div>
          </div>

          {/* Right side - Text */}
          <div className="space-y-6 animate-fade-in-up animation-delay-200">
            {/* Title */}
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900">
              Portfolio
            </h1>

            {/* Name - casual handwriting style */}
            <p className="text-3xl md:text-4xl text-gray-700" style={{ fontFamily: 'var(--font-caveat)' }}>
              Serdar Salim
            </p>

            {/* Subtitle */}
            <div className="text-base md:text-lg text-gray-600 leading-relaxed space-y-1" style={{ fontFamily: 'var(--font-jetbrains)' }}>
              <p>Product Manager & Developer</p>
              <p>Building software that solves problems</p>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <a
                href="#projects"
                className="inline-block px-8 py-4 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700 transition-all duration-200 shadow-lg shadow-teal-200"
              >
                View My Work
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
