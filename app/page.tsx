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
    <div className="min-h-screen bg-white relative overflow-hidden">
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
                  className="text-lg md:text-xl font-extrabold tracking-tight text-white transition-all duration-300 cursor-pointer select-none"
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
                className="text-xs font-semibold uppercase tracking-[0.4em] text-white/70 transition-colors hover:text-white"
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
                className="text-[10px] font-semibold uppercase tracking-[0.4em] text-white/70"
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
          <div className="rounded-3xl border border-white/25 bg-black/40 backdrop-blur-2xl shadow-[0_30px_80px_rgba(0,0,0,0.45)] overflow-hidden">
            <div className="absolute inset-0 pointer-events-none bg-linear-to-br from-white/15 via-transparent to-transparent opacity-60" aria-hidden="true" />
            <div className="relative px-6 md:px-12 py-10 md:py-14 space-y-6">
              <div className="space-y-4 text-sm md:text-lg text-white/90 leading-relaxed">
              <p>
                I build web apps for everyday use and share my perspective about a purposeful life. 
              </p>
            <p>
              My family immigrated from Türkiye to Austria when I was a child. Growing up with a migration background, I had one goal: Choose where I live not because of circumstances, but because of my own free will.
            </p>
            <p>
              I became the first in my family to graduate university, moved to Ireland to manage projects at a global tech company, led international teams.
            </p>
            After living across five countries (🇹🇷 🇦🇹 🇮🇪 🇵🇭 🇸🇬), I have now made malaysia home.
              I'm married and raising a daughter. 
              
              <p></p>My goal now? To contribute to a future where Muslims are the innovators, not the immigrants.
          <p>  </p>
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
