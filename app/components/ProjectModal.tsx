'use client';

import { Project } from '../types';
import { useEffect } from 'react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleEsc);
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      {/* Modal Content */}
      <div
        className="fixed inset-0 overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="min-h-screen px-4 py-12 md:py-20 flex items-center justify-center">
          <div className="relative bg-white dark:bg-gray-900 rounded-2xl md:rounded-3xl shadow-2xl max-w-4xl w-full animate-scale-in border border-gray-200 dark:border-gray-800">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute -top-3 -right-3 md:-top-4 md:-right-4 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:scale-110 transition-transform shadow-lg z-10"
              aria-label="Close"
            >
              <svg
                className="w-5 h-5 md:w-6 md:h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="p-6 md:p-12">
              {/* Header */}
              <div className="flex flex-col md:flex-row items-start gap-4 md:gap-6 mb-6 md:mb-8">
                {/* Letter Logo */}
                <div className="flex-shrink-0 w-16 h-16 md:w-24 md:h-24 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl md:rounded-2xl flex items-center justify-center text-white text-2xl md:text-4xl font-bold shadow-xl">
                  {project.letter}
                </div>

                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-2">
                    <h1 className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white">
                      {project.name}
                    </h1>
                    <span className="px-2 md:px-3 py-1 text-xs md:text-sm bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full">
                      {project.year}
                    </span>
                  </div>
                  <p className="text-base md:text-lg text-gray-600 dark:text-gray-400">
                    {project.category}
                  </p>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6 md:mb-8">
                <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-2 md:mb-3">
                  About This Project
                </h2>
                <p className="text-sm md:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                  {project.fullDescription}
                </p>
              </div>

              {/* Tech Stack */}
              <div className="mb-6 md:mb-8">
                <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-2 md:mb-3">
                  Technologies Used
                </h2>
                <div className="flex flex-wrap gap-2 md:gap-3">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm font-medium bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 text-gray-700 dark:text-gray-300 rounded-lg border border-gray-300 dark:border-gray-600"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4 pt-4 md:pt-6 border-t border-gray-200 dark:border-gray-800">
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-5 md:px-6 py-2.5 md:py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg text-sm md:text-base font-semibold hover:scale-105 transition-transform shadow-lg hover:shadow-xl"
                  >
                    <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    View Live Demo
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-5 md:px-6 py-2.5 md:py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg text-sm md:text-base font-semibold hover:scale-105 transition-transform shadow-lg"
                  >
                    <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                    View Source Code
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
