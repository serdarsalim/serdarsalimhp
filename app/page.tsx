'use client';

import Hero from './components/Hero';
import ProjectCard from './components/ProjectCard';
import Experience from './components/Experience';
import Contact from './components/Contact';
import IslamicPattern from './components/IslamicPattern';
import { projects } from './data/projects';

export default function Home() {

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Islamic pattern decorations - left edge */}
      <div className="fixed left-0 top-0 bottom-0 w-32 pointer-events-none opacity-10 z-0">
        <svg className="w-full h-full" viewBox="0 0 100 400" preserveAspectRatio="xMinYMid slice">
          <pattern id="islamicPatternLeft" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M50 0 L65 35 L100 50 L65 65 L50 100 L35 65 L0 50 L35 35 Z" fill="currentColor" className="text-teal-600" opacity="0.3"/>
            <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="2" className="text-orange-400" opacity="0.4"/>
          </pattern>
          <rect width="100" height="400" fill="url(#islamicPatternLeft)" />
        </svg>
      </div>

      {/* Islamic pattern decorations - right edge */}
      <div className="fixed right-0 top-0 bottom-0 w-32 pointer-events-none opacity-10 z-0">
        <svg className="w-full h-full" viewBox="0 0 100 400" preserveAspectRatio="xMaxYMid slice">
          <pattern id="islamicPatternRight" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M50 0 L65 35 L100 50 L65 65 L50 100 L35 65 L0 50 L35 35 Z" fill="currentColor" className="text-teal-600" opacity="0.3"/>
            <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="2" className="text-orange-400" opacity="0.4"/>
          </pattern>
          <rect width="100" height="400" fill="url(#islamicPatternRight)" />
        </svg>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-teal-50/80 backdrop-blur-md border-b border-teal-200">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
          <div className="flex items-center justify-between">
            <a href="#" className="text-lg md:text-xl font-semibold text-gray-900">
              Serdar Salim
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
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
                className="px-4 py-2 bg-teal-600 text-white rounded-lg text-sm font-medium hover:bg-teal-700 transition-colors"
              >
                Contact
              </a>
            </div>

            {/* Mobile Menu - Simplified */}
            <div className="md:hidden flex items-center gap-4">
              <a
                href="#contact"
                className="px-3 py-2 bg-teal-600 text-white rounded-lg text-xs font-medium hover:bg-teal-700 transition-colors"
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
      <section id="projects" className="relative py-16 md:py-32 bg-gradient-to-b from-teal-50 to-orange-50">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
              Selected Projects
            </h2>
            <p className="text-base md:text-lg text-gray-600">
              Building forward not backward
            </p>
          </div>

          <div className="grid gap-6">
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
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
