'use client';

import { useEffect, useRef, useState } from 'react';
import Hero, { HeroHandle } from './components/Hero';
import ProjectCard from './components/ProjectCard';
import Experience from './components/Experience';
import IslamicPattern from './components/IslamicPattern';
import { projects } from './data/projects';
import BlogButton from './components/BlogButton';
import Landscape from './components/Landscape';
import SkyDay from './components/SkyDay';

export default function Home() {
  const [showNavBrand, setShowNavBrand] = useState(false);
  const [isNavHovered, setIsNavHovered] = useState(false);
  const heroRef = useRef<HeroHandle>(null);

  useEffect(() => {
    const heroTitle = document.getElementById('hero-title');
    if (!heroTitle) return;

    const observer = new IntersectionObserver(
      ([entry]) => setShowNavBrand(!entry.isIntersecting),
      { threshold: 0 }
    );

    observer.observe(heroTitle);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        background: `
          linear-gradient(to bottom,
            #87ceeb 0%,
            #5dade2 8%,
            #4a90d9 15%,
            #2d3d6f 22%,
            #1e2757 28%,
            #1a1f45 40%,
            #0f1b3d 55%,
            #0a0f1f 65%,
            transparent 75%
          ),
          linear-gradient(to bottom,
            transparent 50%,
            rgba(15, 10, 20, 0.2) 55%,
            rgba(18, 12, 25, 0.35) 60%,
            rgba(22, 15, 32, 0.5) 65%,
            rgba(28, 18, 40, 0.65) 70%,
            rgba(32, 20, 48, 0.8) 75%,
            rgba(38, 23, 55, 0.95) 80%,
            #2a1850 85%,
            #3b1895 90%,
            #5e30d9 96%,
            #8a65cc 100%
          )
        `
      }}
    >
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#556e8f]/80 backdrop-blur-2xl backdrop-saturate-150 border-b border-white/20 shadow-lg">
        <div className="max-w-7xl mx-auto px-3 md:px-5 py-2">
          <div className="flex items-center">
            <div className="inline-flex items-center gap-3">
              {/* Logo - always visible, scrolls to top */}
              <a
                href="#hero-section"
                className={`select-none cursor-pointer transition-opacity duration-300 ${showNavBrand ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('hero-section')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <img
                  src="/app-logo.png"
                  alt="Serdar Salim"
                  className="h-6 md:h-8 w-auto rounded-md"
                />
              </a>

              {/* Name - only visible when scrolled down, flips on click */}
              {showNavBrand && (
                <span
                  className="text-lg md:text-xl font-bold tracking-tight text-white transition-all duration-300 cursor-pointer select-none"
                  style={{
                    textShadow: '-1px 1px 0 #a855f7, -2px 2px 0 #7e22ce'
                  }}
                  onClick={() => setIsNavHovered(!isNavHovered)}
                >
                  {isNavHovered ? 'Salim Serdar' : 'Serdar Salim'}
                </span>
              )}
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6 ml-auto">
              <a
                href="#projects"
                className="text-xs font-semibold uppercase tracking-[0.4em] text-white transition-colors hover:text-white"
                style={{ color: '#fff' }}
              >
                Apps
              </a>
              <BlogButton
                href="https://blog.serdarsalim.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm"
                label="Blog"
              />
            </div>

            {/* Mobile Menu - Simplified */}
            <div className="md:hidden flex items-center gap-5 ml-auto">
              <a
                href="#projects"
                className="text-[10px] font-semibold uppercase tracking-[0.4em] text-white"
                style={{ color: '#fff' }}
              >
                Apps
              </a>
              <BlogButton
                href="https://blog.serdarsalim.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs"
                label="Blog"
              />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <Hero ref={heroRef} />

      {/* Unified background wrapper for About, Apps, and Experience */}
      <div className="relative overflow-hidden">
        <SkyDay />

        {/* About Section */}
        <section id="about" className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Content */}
          <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-16 lg:px-24 py-16 md:py-24 space-y-6">
          <h2 className="text-2xl md:text-4xl font-bold text-white/90 text-center tracking-[0.25em] uppercase drop-shadow-[0_8px_30px_rgba(0,0,0,0.35)]">
            About Me
          </h2>
          <div className="rounded-3xl border border-white/25 backdrop-blur-2xl shadow-[0_30px_80px_rgba(0,0,0,0.45)] overflow-hidden relative">
            <div className="absolute inset-0 pointer-events-none bg-linear-to-b from-black/40 from-40% to-black opacity-100" aria-hidden="true" />
            <div className="absolute inset-0 pointer-events-none bg-linear-to-br from-white/15 via-transparent to-transparent opacity-60" aria-hidden="true" />
            <div className="relative px-6 md:px-12 py-10 md:py-14 space-y-6">
              <div className="space-y-4 text-base md:text-lg text-white/90 leading-relaxed">
                <p>
                  I build web apps for everyday use and share my thoughts on living with purpose.
                </p>
                <p>
                  I grew up in a Turkish immigrant family in Austria, which taught me two things: adapt fast and aim higher. My dream back then was to live somewhere by choice, not necessity. I became the first in my family to graduate university and moved to Ireland, where I built a career leading international teams at a global tech company.
                </p>
              </div>

              <div className="space-y-4 text-base md:text-lg text-white/90 leading-relaxed">
                <p>
                  After living across five countries, I've now made Malaysia home. I'm married and have a daughter. My goal now is to help shape a future where Muslims are seen not just as immigrants, but as innovators.
                </p>
                <p className="pt-2">
                  Read more on my{' '}
                  <a
                    href="https://blog.serdarsalim.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/90 font-semibold underline hover:text-white/70 transition-colors"
                  >
                    blog
                  </a>
                  . Watch more on my{' '}
                  <a
                    href="https://tiktok.com/@salimspoke"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/90 font-semibold underline hover:text-white/70 transition-colors"
                  >
                    TikTok
                  </a>
                  .
                </p>
              </div>

              {/* Video - Closing seal */}
              <div className="flex justify-center pt-4 md:pt-8">
                <video
                  src="/owlio.MP4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="h-40 sm:h-48 md:h-56 w-auto rounded-md select-none"
                  style={{
                    filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1)) drop-shadow(0 2px 4px rgba(0, 0, 0, 0.06))'
                  }}
                />
              </div>
            </div>
          </div>

        </div>

        {/* Subtle Islamic pattern - fades upward */}
        <IslamicPattern position="bottom" variant={1} />
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        className="relative overflow-hidden pt-24 pb-12 md:pt-24 md:pb-24 scroll-mt-0 text-white"
      >
        {/* Floating clouds */}
        <div className="absolute top-10 left-10 w-20 h-6 bg-white/10 rounded-full blur-sm opacity-30 animate-[float_20s_ease-in-out_infinite]" />
        <div className="absolute top-32 right-16 w-24 h-7 bg-white/8 rounded-full blur-sm opacity-25 animate-[float_25s_ease-in-out_infinite_2s]" />
        <div className="absolute bottom-20 left-1/4 w-28 h-8 bg-white/12 rounded-full blur-sm opacity-20 animate-[float_30s_ease-in-out_infinite_5s]" />

        {/* Pleiades star cluster - right side */}
        <div className="pleiades-star" />
        <div className="pleiades-star pleiades-star-1" />
        <div className="pleiades-star pleiades-star-2" />
        <div className="pleiades-star pleiades-star-3" />
        <div className="pleiades-star pleiades-star-4" />
        <div className="pleiades-star pleiades-star-5" />
        <div className="pleiades-star pleiades-star-6" />

        <div className="relative max-w-6xl mx-auto px-4 md:px-6">
            <div className="text-center mb-8 md:mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 md:mb-4 tracking-[0.25em] uppercase drop-shadow-[0_8px_30px_rgba(0,0,0,0.25)]">
              My Apps
            </h2>
            <p className="text-sm md:text-base text-white/80" style={{ fontFamily: 'var(--font-jetbrains)' }}>
             These are webapps I created, free to use.
            </p>
          </div>

          <div className="grid gap-4 md:max-w-4xl md:mx-auto md:px-10 lg:px-18">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        </div>

        {/* Subtle Islamic pattern - fades upward */}
        <IslamicPattern position="bottom" variant={1} />
      </section>

      {/* Experience Section */}
      <Experience />

      </div>

      {/* Landscape Section */}
      <Landscape heroRef={heroRef} />
    </div>
  );
}
