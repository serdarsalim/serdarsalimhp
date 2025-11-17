'use client';

import { useEffect, useState } from 'react';
import Hero from './components/Hero';
import ProjectCard from './components/ProjectCard';
import Experience from './components/Experience';
import Contact from './components/Contact';
import IslamicPattern from './components/IslamicPattern';
import { projects } from './data/projects';

export default function Home() {
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showNavBrand, setShowNavBrand] = useState(false);
  const [isNavHovered, setIsNavHovered] = useState(false);

  const taglines = [
    { text: "Building forward not backward", animation: "moveForward" },
    { text: "Building backwards and shipping forwards", animation: "moveBackward" },
    { text: "Actually sometimes building sideways", animation: "moveSideways" },
    { text: "Building in circles!", animation: "moveCircles" }
  ];

  const handleHover = () => {
    if (isAnimating) return; // Prevent multiple hovers during animation

    // Pick a random index (1-3, excluding the default 0)
    const randomIndex = Math.floor(Math.random() * 3) + 1;
    setTaglineIndex(randomIndex);
    setIsAnimating(true);

    // Stop animation after it completes, but keep the text
    setTimeout(() => {
      setIsAnimating(false);
    }, 2000);
  };

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
      {/* Islamic pattern decorations - left edge */}
      <div className="fixed left-0 top-0 bottom-0 w-32 pointer-events-none opacity-10 z-0">
        <svg className="w-full h-full" viewBox="0 0 100 400" preserveAspectRatio="xMinYMid slice">
          <pattern id="islamicPatternLeft" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M50 0 L65 35 L100 50 L65 65 L50 100 L35 65 L0 50 L35 35 Z" fill="currentColor" className="text-purple-600" opacity="0.3"/>
            <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="2" className="text-orange-400" opacity="0.4"/>
          </pattern>
          <rect width="100" height="400" fill="url(#islamicPatternLeft)" />
        </svg>
      </div>

      {/* Islamic pattern decorations - right edge */}
      <div className="fixed right-0 top-0 bottom-0 w-32 pointer-events-none opacity-10 z-0">
        <svg className="w-full h-full" viewBox="0 0 100 400" preserveAspectRatio="xMaxYMid slice">
          <pattern id="islamicPatternRight" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M50 0 L65 35 L100 50 L65 65 L50 100 L35 65 L0 50 L35 35 Z" fill="currentColor" className="text-purple-600" opacity="0.3"/>
            <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="2" className="text-orange-400" opacity="0.4"/>
          </pattern>
          <rect width="100" height="400" fill="url(#islamicPatternRight)" />
        </svg>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-purple-50/80 backdrop-blur-md border-b border-purple-200">
        <div className="max-w-7xl mx-auto px-3 md:px-5 py-3">
          <div className="flex items-center">
            {showNavBrand && (
              <a
                href="#"
                className="inline-flex items-center text-lg md:text-xl font-extrabold tracking-tight text-gray-900 transition-opacity select-none cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  setIsNavHovered(!isNavHovered);
                }}
              >
                <span className="leading-none transition-all duration-300">
                  {isNavHovered ? 'Salim Serdar' : 'Serdar Salim'}
                </span>
              </a>
            )}

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8 ml-auto">
              <a
                href="#projects"
                className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium"
              >
                Projects
              </a>
              <a
                href="https://halqa.co/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium"
              >
                Blog
              </a>
              <a
                href="#contact"
                className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium"
              >
                Contact
              </a>
            </div>

            {/* Mobile Menu - Simplified */}
            <div className="md:hidden flex items-center gap-4 ml-auto">
              <a
                href="#contact"
                className="px-3 py-2 bg-linear-to-r from-indigo-500 to-purple-600 text-white rounded-lg text-xs font-medium hover:brightness-110 transition-colors"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <Hero />

      {/* Projects Section */}
      <section
        id="projects"
        className="relative pt-24 pb-12 md:pt-24 md:pb-24 bg-linear-to-b from-purple-50 to-orange-50 scroll-mt-0"
      >
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="text-center mb-10 md:mb-6">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
              Selected Projects
            </h2>
            <div className="relative h-8 flex items-center justify-center overflow-visible">
              <p
                className="text-base md:text-lg text-gray-600 cursor-pointer inline-block"
                onMouseEnter={handleHover}
                style={{
                  animation: isAnimating ? `${taglines[taglineIndex].animation} 2s ease-in-out` : 'none'
                }}
              >
                {taglines[taglineIndex].text}
              </p>
            </div>
            <style jsx>{`
              @keyframes moveForward {
                0%, 100% { transform: translateX(0); }
                50% { transform: translateX(100px); }
              }
              @keyframes moveBackward {
                0%, 100% { transform: translateX(0); }
                50% { transform: translateX(-100px); }
              }
              @keyframes moveSideways {
                0%, 100% { transform: translate(0, 0); }
                50% { transform: translate(50px, 30px); }
              }
              @keyframes moveCircles {
                0% { transform: translate(0, 0); }
                25% { transform: translate(30px, -30px); }
                50% { transform: translate(0, -60px); }
                75% { transform: translate(-30px, -30px); }
                100% { transform: translate(0, 0); }
              }
            `}</style>
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
      <footer className="py-8 md:py-12 bg-white border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 md:px-6 text-center">
          <p className="text-gray-500 text-xs md:text-sm">
            © {new Date().getFullYear()} — All rights reserved, some lefts unreserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
