'use client';

import { useState } from 'react';
import Hero from './components/Hero';
import ProjectCard from './components/ProjectCard';
import ProjectModal from './components/ProjectModal';
import Experience from './components/Experience';
import Contact from './components/Contact';
import { projects } from './data/projects';
import { Project } from './types';

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-teal-50/80 backdrop-blur-md border-b border-teal-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <a href="#" className="text-xl font-semibold text-gray-900">
              Serdar Salim
            </a>
            <div className="flex items-center gap-8">
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
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <Hero />

      {/* Projects Section */}
      <section id="projects" className="py-32 bg-gradient-to-b from-teal-50 to-orange-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Featured Projects
            </h2>
            <p className="text-lg text-gray-600">
              Building experiences that matter
            </p>
          </div>

          <div className="grid gap-6">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ProjectCard
                  project={project}
                  onClick={() => setSelectedProject(project)}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <Experience />

      {/* Contact Section */}
      <Contact />

      {/* Footer */}
      <footer className="py-12 bg-white border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </footer>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
