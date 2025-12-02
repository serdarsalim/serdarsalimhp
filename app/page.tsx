'use client';

import { useEffect, useRef, useState } from 'react';
import Hero, { HeroHandle } from './components/Hero';
import ProjectCard from './components/ProjectCard';
import Experience from './components/Experience';
import Contact from './components/Contact';
import IslamicPattern from './components/IslamicPattern';
import { projects } from './data/projects';
import BlogButton from './components/BlogButton';
import Landscape from './components/Landscape';

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
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#bb94a5] border-b border-[#bba4b5]">
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
            <div className="hidden md:flex items-center gap-4 ml-auto">
              <BlogButton
                href="https://blog.serdarsalim.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm"
                label="Blog"
              />
            </div>

            {/* Mobile Menu - Simplified */}
            <div className="md:hidden flex items-center gap-3 ml-auto">
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

      {/* About Section */}
      <section id="about" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="/185366-875417525_small.mp4"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-black/40 pointer-events-none" aria-hidden="true" />

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-16 lg:px-24 py-16 md:py-24 space-y-6">
          <h2 className="text-2xl md:text-4xl font-bold text-white text-center tracking-[0.25em] uppercase drop-shadow-[0_8px_30px_rgba(0,0,0,0.35)]">
            About Me
          </h2>
          <div className="rounded-3xl border border-white/25 bg-white/10 backdrop-blur-2xl shadow-[0_30px_80px_rgba(0,0,0,0.45)] overflow-hidden">
            <div className="absolute inset-0 pointer-events-none bg-linear-to-br from-white/15 via-transparent to-transparent opacity-60" aria-hidden="true" />
            <div className="relative px-6 md:px-12 py-10 md:py-14 space-y-6">
              <div className="space-y-4 text-sm md:text-lg text-white leading-relaxed">
              <p>
                Hi wanderer! I build tools that solve problems and create content about a purposeful life. After living across five countries (🇹🇷 🇦🇹 🇮🇪 🇵🇭 🇸🇬), I have officially settled in Malaysia.
              </p>
            <p>
              I was born in Türkiye and migrated to Austria with the hope of a better future. There, I was expected to integrate into society as an immigrant by staying quiet and keeping the system running. I refused.
            </p>
            <p>
              I became the first in my family to graduate university, moving to Ireland to manage projects at Twitter. During that time, I traveled to more than 50 countries before leaving corporate life in 2023.
            </p>
            <p>
              Now married and raising a daughter, I am building a future here in Malaysia, where our lifestyle aligns with our Islamic values.
            </p>
            <p className="pt-2">
              Read more on my{' '}
              <a
                href="https://blog.serdarsalim.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white font-semibold underline hover:text-white/80 transition-colors"
              >
                blog
              </a>
              . Watch more on my{' '}
              <a
                href="https://tiktok.com/@salimspoke"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white font-semibold underline hover:text-white/80 transition-colors"
              >
                TikTok
              </a>
              .
            </p>
              </div>
            </div>
          </div>
          <div className="flex justify-center pt-6 relative z-10">
            <a
              href="#projects"
              className="group relative inline-flex items-center gap-3 px-6 py-3 rounded-xl text-white font-light bg-white/10 backdrop-blur-md border border-white/30 shadow-lg hover:bg-white/20 transition-all duration-300 overflow-hidden uppercase tracking-wide text-sm justify-center cursor-pointer"
              style={{ fontFamily: 'var(--font-jetbrains)' }}
              onClick={(event) => {
                event.preventDefault();
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span className="relative flex items-center gap-3 justify-center">
                <span>My Apps</span>
                <svg className="w-4 h-4 group-hover:translate-y-0.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v14m0 0l6-6m-6 6l-6-6" />
                </svg>
              </span>
            </a>
          </div>
        </div>

        {/* Subtle Islamic pattern - fades upward */}
        <IslamicPattern position="bottom" variant={1} />
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        className="relative overflow-hidden pt-24 pb-12 md:pt-24 md:pb-24 scroll-mt-0 text-white"
        style={{
          backgroundImage: 'url(/normalsunset.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/35 pointer-events-none" aria-hidden="true" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-black/55 via-black/25 to-transparent pointer-events-none" aria-hidden="true" />
        <div className="relative max-w-6xl mx-auto px-4 md:px-6">
          <div className="text-center mb-8 md:mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 md:mb-4 tracking-[0.25em] uppercase drop-shadow-[0_8px_30px_rgba(0,0,0,0.25)]">
              My Apps
            </h2>
            <p className="text-sm md:text-base text-white/80" style={{ fontFamily: 'var(--font-jetbrains)' }}>
              free to use
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

      {/* Landscape Section */}
      <Landscape heroRef={heroRef} />
    </div>
  );
}
