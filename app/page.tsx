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
  const [projectsVisible, setProjectsVisible] = useState(false);
  const heroRef = useRef<HeroHandle>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (projectsVisible) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setProjectsVisible(true);
          if (projectsRef.current) observer.unobserve(projectsRef.current);
        }
      },
      { threshold: 0.2 }
    );

    if (projectsRef.current) {
      observer.observe(projectsRef.current);
    }

    return () => observer.disconnect();
  }, [projectsVisible]);

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        background: `
          linear-gradient(to bottom,
            #7ac5d9 0%,
            #5daed9 8%,
            #4a98b8 15%,
            #3d7589 22%,
            #435878 28%,
            #4a5c88 40%,
            #4a5080 55%,
            #2d4560 65%,
            #405580 72%,
            #5560a0 78%,
            #6b5cc0 84%,
            #7d58d8 90%,
            #6d45c8 96%,
            #5e30d9 100%
          )
        `
      }}
    >
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#5882a5] border-b border-white/20 shadow-lg">
        <div className="max-w-7xl mx-auto px-3 md:px-5 py-3">
          <div className="flex items-center">
            <div className="inline-flex items-center gap-3">
              {/* Name - only visible when scrolled down, flips on click */}
              {showNavBrand && (
                <a
                  href="#hero-section"
                  className="select-none cursor-pointer transition-opacity duration-300"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('hero-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <span
                    className="text-lg md:text-xl font-bold tracking-tight text-white transition-all duration-300"
                    style={{
                      textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsNavHovered(!isNavHovered);
                    }}
                  >
                    {isNavHovered ? 'Salim Serdar' : 'Serdar Salim'}
                  </span>
                </a>
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
          <div className="rounded-3xl border border-white/10 backdrop-blur-2xl shadow-[0_30px_80px_rgba(0,0,0,0.45)] overflow-hidden relative">
            <div className="absolute inset-0 pointer-events-none bg-linear-to-b from-black/40 from-40% to-black opacity-100" aria-hidden="true" />
            <div className="absolute inset-0 pointer-events-none bg-linear-to-br from-white/15 via-transparent to-transparent opacity-60" aria-hidden="true" />
            <div className="relative px-5 md:px-10 pt-6 md:pt-8 pb-10 md:pb-14 space-y-6">
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
              </div>

              {/* Video - Closing seal */}
              <div className="flex justify-center pt-2 md:pt-4">
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
        <div className="relative max-w-6xl mx-auto px-4 md:px-6">
            <div className="text-center mb-8 md:mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 md:mb-4 tracking-[0.25em] uppercase drop-shadow-[0_8px_30px_rgba(0,0,0,0.25)]">
              Web Apps
            </h2>
            <p className="text-sm md:text-base text-white/80" style={{ fontFamily: 'var(--font-jetbrains)' }}>
             These are webapps I created, free to use.
            </p>
          </div>

          <div ref={projectsRef} className="grid gap-4 md:max-w-4xl md:mx-auto md:px-10 lg:px-18">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} shouldAnimate={projectsVisible} />
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
