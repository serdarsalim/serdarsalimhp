'use client';

import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

export default function ProjectCard({ project, onClick }: ProjectCardProps) {
  return (
    <div
      onClick={onClick}
      className="group relative cursor-pointer overflow-hidden rounded-xl md:rounded-2xl bg-white border border-gray-200 hover:border-purple-300 transition-all duration-500 hover:scale-[1.01] hover:shadow-xl"
    >
      <div className="p-5 md:p-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-4 md:mb-6">
          <div className="flex items-center gap-3 md:gap-4">
            {/* Letter Logo */}
            <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-teal-600 to-teal-700 rounded-lg flex items-center justify-center text-white text-lg md:text-xl font-bold group-hover:scale-105 transition-all duration-200 shadow-sm">
              {project.letter}
            </div>

            {/* Title & Category */}
            <div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-1">
                {project.name}
              </h3>
              <p className="text-xs md:text-sm text-gray-500">
                {project.category} · {project.year}
              </p>
            </div>
          </div>

          {/* Arrow */}
          <div className="opacity-0 group-hover:opacity-100 transition-all duration-200 transform group-hover:translate-x-1">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6 leading-relaxed">
          {project.shortDescription}
        </p>

        {/* Links */}
        <div className="flex flex-wrap gap-3 md:gap-4">
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              onClick={(e) => e.stopPropagation()}
              className="text-xs md:text-sm text-gray-900 hover:text-gray-600 font-medium flex items-center gap-1 transition-colors"
            >
              View Project
              <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              onClick={(e) => e.stopPropagation()}
              className="text-xs md:text-sm text-gray-500 hover:text-gray-900 font-medium flex items-center gap-1 transition-colors"
            >
              GitHub
              <svg className="w-3 h-3 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
