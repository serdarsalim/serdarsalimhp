'use client';

import { Project } from '../types';
import { useEffect, useRef, useState } from 'react';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const logoRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Only run mobile animation for Culturia
    if (project.id !== 'culturia') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.5 }
    );

    if (logoRef.current) {
      observer.observe(logoRef.current);
    }

    return () => observer.disconnect();
  }, [project.id, hasAnimated]);

  const isCulturia = project.id === 'culturia';

  return (
    <div className="group relative overflow-hidden rounded-xl md:rounded-2xl bg-white border border-gray-200 hover:border-purple-300 transition-all duration-500">
      <div className="p-3 pr-4 md:pr-6">
        <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-4 md:gap-6">
          {/* Left Column - Logo, Title, Links */}
          <div className="flex flex-col md:min-w-[220px]">
            <div className="flex flex-row md:flex-col items-center md:items-center gap-3 md:gap-3 mb-4 text-left md:text-center">
              {/* Logo */}
              {project.image ? (
                project.demoUrl ? (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    ref={logoRef}
                    onMouseEnter={() => isCulturia && setIsHovered(true)}
                    className={`flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-lg flex items-center justify-center ${
                      isCulturia && isHovered
                        ? 'rotate-[-360deg] md:transition-transform md:duration-[1500ms]'
                        : isCulturia
                        ? 'md:transition-transform md:duration-[1500ms]'
                        : 'group-hover:scale-105 transition-all duration-200'
                    }`}
                  >
                    <img
                      src={project.image}
                      alt={`${project.name} logo`}
                      className={`w-full h-full object-contain ${
                        isCulturia && hasAnimated ? 'md:!animate-none animate-spin-once' : ''
                      }`}
                      style={isCulturia && hasAnimated ? { animation: 'spin-once 2s ease-in-out forwards' } : {}}
                    />
                  </a>
                ) : (
                  <div
                    ref={logoRef}
                    onMouseEnter={() => isCulturia && setIsHovered(true)}
                    className={`flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-lg flex items-center justify-center ${
                      isCulturia && isHovered
                        ? 'rotate-[-360deg] md:transition-transform md:duration-[1500ms]'
                        : isCulturia
                        ? 'md:transition-transform md:duration-[1500ms]'
                        : 'group-hover:scale-105 transition-all duration-200'
                    }`}
                  >
                    <img
                      src={project.image}
                      alt={`${project.name} logo`}
                      className={`w-full h-full object-contain ${
                        isCulturia && hasAnimated ? 'md:!animate-none animate-spin-once' : ''
                      }`}
                      style={isCulturia && hasAnimated ? { animation: 'spin-once 2s ease-in-out forwards' } : {}}
                    />
                  </div>
                )
              ) : (
                project.demoUrl ? (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-2xl md:text-3xl font-bold group-hover:scale-105 transition-all duration-200 shadow-sm"
                  >
                    {project.letter}
                  </a>
                ) : (
                  <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-2xl md:text-3xl font-bold group-hover:scale-105 transition-all duration-200 shadow-sm">
                    {project.letter}
                  </div>
                )
              )}

              {/* Title & Category */}
              <div className="flex-1">
                {project.demoUrl ? (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg md:text-xl font-semibold text-gray-900 hover:text-purple-600 mb-1 inline-block transition-colors"
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
            <div className="text-sm md:text-base text-gray-600 leading-relaxed space-y-2">
              {project.shortDescription.split('\n').map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
