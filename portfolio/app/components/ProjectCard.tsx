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
      className="flex items-center gap-6 p-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-zinc-900 transition-colors rounded-lg group"
    >
      {/* Letter Logo */}
      <div className="flex-shrink-0 w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-3xl font-bold shadow-lg group-hover:scale-105 transition-transform">
        {project.letter}
      </div>

      {/* Project Info */}
      <div className="flex-1">
        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-1">
          {project.name}
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          {project.shortDescription}
        </p>
      </div>
    </div>
  );
}
