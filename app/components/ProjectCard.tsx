'use client';

import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div
      className="group relative overflow-hidden rounded-xl md:rounded-2xl bg-white border border-gray-200 hover:border-purple-300 transition-all duration-500 hover:shadow-xl"
    >
      <div className="p-5 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-4 md:gap-6">
          {/* Left Column - Logo, Title, Links */}
          <div className="flex flex-col md:min-w-[280px]">
            <div className="flex items-center gap-3 md:gap-4 mb-4">
              {/* Logo */}
              {project.image ? (
                <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-lg flex items-center justify-center group-hover:scale-105 transition-all duration-200">
                  <img src={project.image} alt={`${project.name} logo`} className="w-full h-full object-contain" />
                </div>
              ) : (
                <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-teal-600 to-teal-700 rounded-lg flex items-center justify-center text-white text-lg md:text-xl font-bold group-hover:scale-105 transition-all duration-200 shadow-sm">
                  {project.letter}
                </div>
              )}

              {/* Title & Category */}
              <div>
                {project.demoUrl ? (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg md:text-xl font-semibold text-gray-900 hover:text-teal-600 mb-1 inline-block transition-colors"
                  >
                    {project.name}
                  </a>
                ) : (
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-1">
                    {project.name}
                  </h3>
                )}
                <p className="text-xs md:text-sm text-gray-500">
                  {project.category} · {project.year}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Description */}
          <div className="flex items-center">
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              {project.shortDescription}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
