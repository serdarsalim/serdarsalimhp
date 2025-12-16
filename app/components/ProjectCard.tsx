'use client';

import { Project } from '../types';
import { useEffect, useRef, useState } from 'react';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const logoRef = useRef<HTMLAnchorElement | HTMLDivElement>(null);

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
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl shadow-[0_25px_60px_rgba(0,0,0,0.35)] transition-all duration-500">
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-white/20 via-transparent to-transparent opacity-60" aria-hidden="true" />
      <div className="relative p-3 pr-4 md:pr-6">
        <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-3 md:gap-1">
          {/* Left Column - Logo, Title, Links */}
          <div className="flex flex-col md:min-w-[180px] md:justify-center">
            <div className="flex flex-row md:flex-col items-center md:items-center gap-3 md:gap-3 mb-4 md:mb-0 text-left md:text-center">
              {/* Logo */}
              {project.image ? (
                project.demoUrl ? (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    ref={logoRef as any}
                    onMouseEnter={() => isCulturia && setIsHovered(true)}
                    className={`flex-shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-lg flex items-center justify-center bg-white/10 ${
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
                    ref={logoRef as any}
                    onMouseEnter={() => isCulturia && setIsHovered(true)}
                    className={`flex-shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-lg flex items-center justify-center bg-white/10 ${
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
                    className="flex-shrink-0 w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-2xl md:text-3xl font-bold group-hover:scale-105 transition-all duration-200 shadow-sm"
                  >
                    {project.letter}
                  </a>
                ) : (
                  <div className="flex-shrink-0 w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-2xl md:text-3xl font-bold group-hover:scale-105 transition-all duration-200 shadow-sm">
                    {project.letter}
                  </div>
                )
              )}

              {/* Title */}
              <div className="flex-1 flex items-center">
                {project.demoUrl ? (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg md:text-xl font-semibold text-white hover:text-purple-200 transition-colors"
                  >
                    {project.name}
                  </a>
                ) : (
                  <h3 className="text-lg md:text-xl font-semibold text-white">
                    {project.name}
                  </h3>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Description */}
          <div className="flex items-center">
            <div className="text-base md:text-lg text-white leading-relaxed w-full">
              <ul className="list-disc pl-5 space-y-2 marker:text-white/70">
                {project.shortDescription.split('\n').map((line, index) => (
                  <li key={index} className="pl-0">
                    {line.replace(/^•\s*/, '')}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
