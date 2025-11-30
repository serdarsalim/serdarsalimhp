'use client';

import { useEffect, useState } from 'react';
import Hero from './components/Hero';
import ProjectCard from './components/ProjectCard';
import Experience from './components/Experience';
import Contact from './components/Contact';
import IslamicPattern from './components/IslamicPattern';
import { projects } from './data/projects';
import BlogButton from './components/BlogButton';

export default function Home() {
  const [showNavBrand, setShowNavBrand] = useState(false);
  const [isNavHovered, setIsNavHovered] = useState(false);

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
      <nav className="fixed top-0 left-0 right-0 z-50 bg-purple-50/80 backdrop-blur-md border-b border-purple-200">
        <div className="max-w-7xl mx-auto px-3 md:px-5 py-3">
          <div className="flex items-center">
            <div className="inline-flex items-center gap-3">
              {/* Logo - always visible, scrolls to top */}
              <a
                href="#hero-section"
                className="select-none cursor-pointer"
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
                  className="text-lg md:text-xl font-extrabold tracking-tight text-gray-900 transition-all duration-300 cursor-pointer select-none"
                  onClick={() => setIsNavHovered(!isNavHovered)}
                >
                  {isNavHovered ? 'Salim Serdar' : 'Serdar Salim'}
                </span>
              )}
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8 ml-auto">
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
      <Hero />

      {/* About Section */}
      <section id="about" className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
        {/* Video Background */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="/stars.mp4"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
          style={{ filter: 'blur(0px)' }}
        />

        {/* Blue Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/75 via-indigo-900/70 to-blue-800/75"></div>

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-16 lg:px-24 py-16 md:py-24">
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-6 md:mb-8 text-center" style={{ textShadow: '2px 2px 8px rgba(0, 0, 0, 0.8)' }}>
            About Me
          </h2>
          <div className="space-y-4 text-sm md:text-lg text-white leading-relaxed" style={{ textShadow: '1px 1px 4px rgba(0, 0, 0, 0.8)' }}>
            <p>
              I'm Serdar Salim. I build tools that solve problems and create content about a purposeful life. After living across five countries (🇹🇷 🇦🇹 🇮🇪 🇵🇭 🇸🇬), I have officially settled in Malaysia.
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
                className="text-purple-400 hover:text-purple-300 font-medium underline"
              >
                blog
              </a>
              . Watch more on my{' '}
              <a
                href="https://tiktok.com/@salimspoke"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400 hover:text-purple-300 font-medium underline"
              >
                TikTok
              </a>
              .
            </p>

            {/* View my work button */}
            <div className="pt-8 flex justify-center">
              <a
                href="#projects"
                className="group relative inline-flex items-center gap-3 px-6 py-3 rounded-xl text-white font-medium bg-white/10 backdrop-blur-md border border-white/30 shadow-lg hover:bg-white/20 transition-all duration-300 overflow-hidden"
                style={{ fontFamily: 'var(--font-jetbrains)' }}
              >
                <span className="absolute inset-0 bg-linear-to-r from-indigo-200/0 via-white/20 to-purple-200/0 translate-x-[-120%] group-hover:translate-x-[120%] transition-transform duration-700" aria-hidden="true" />
                <span className="relative text-base md:text-lg font-semibold flex items-center gap-3 uppercase tracking-wide">
                  <span>View my apps</span>
                  <svg className="w-5 h-5 group-hover:translate-y-0.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v14m0 0l6-6m-6 6l-6-6" />
                  </svg>
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Subtle Islamic pattern - fades upward */}
        <IslamicPattern position="bottom" variant={1} />
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        className="relative pt-24 pb-12 md:pt-24 md:pb-24 bg-gradient-to-b from-sky-100 to-blue-50 scroll-mt-0"
      >
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="text-center mb-10 md:mb-6">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
              Apps I Developed
            </h2>
            <p className="text-sm md:text-base text-gray-600" style={{ fontFamily: 'var(--font-jetbrains)' }}>
              free to use
            </p>
          </div>

          <div className="grid gap-6 md:max-w-4xl md:mx-auto">
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

      {/* Contact Section */}
      <Contact />

      {/* Footer */}
      <footer className="py-8 md:py-12 bg-gradient-to-b from-purple-100 to-purple-50 border-t border-purple-200/50">
        <div className="max-w-6xl mx-auto px-4 md:px-6 text-center">
          <p className="text-gray-500 text-xs md:text-sm">
            © {new Date().getFullYear()} Serdar Salim Domurcuk
          </p>
          <p className="text-gray-500 text-xs md:text-sm mt-1">
            All rights reserved, some lefts unreserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
