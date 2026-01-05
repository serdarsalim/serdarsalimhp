'use client';

import { Project } from '../types';
import { useEffect, useRef, useState } from 'react';

interface ProjectCardProps {
  project: Project;
  index: number;
  shouldAnimate: boolean;
}

export default function ProjectCard({ project, index, shouldAnimate }: ProjectCardProps) {
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const logoRef = useRef<HTMLAnchorElement | HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    cardRef.current.style.setProperty('--mouse-x', `${x}%`);
    cardRef.current.style.setProperty('--mouse-y', `${y}%`);
  };

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
  const animationDelay = shouldAnimate ? `${index * 140}ms` : '0ms';

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`project-card group relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg transition-all duration-500 hover:border-gray-300 hover:shadow-xl ${
        shouldAnimate ? 'project-card-visible' : ''
      }`}
      style={{ transitionDelay: animationDelay }}
    >
      {project.demoUrl ? (
        <a
          href={project.demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0 z-10"
          aria-label={`Visit ${project.name}`}
        />
      ) : null}
      <div className="relative p-3 pr-4 md:pr-6">
        <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-3 md:gap-1">
          {/* Left Column - Logo, Title, Links */}
          <div className="flex flex-col md:min-w-[180px] md:justify-center">
            <div className="flex flex-row md:flex-col items-center md:items-center gap-3 md:gap-3 mb-4 md:mb-0 text-left md:text-center">
              {/* Logo */}
              {project.image ? (
                <div
                  ref={logoRef as any}
                  onMouseEnter={() => isCulturia && setIsHovered(true)}
                  className={`shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-lg flex items-center justify-center bg-gray-100 ${
                    isCulturia && isHovered
                      ? 'rotate-[-360deg] md:transition-transform md:duration-1500'
                      : isCulturia
                      ? 'md:transition-transform md:duration-1500'
                      : 'group-hover:scale-105 transition-all duration-200'
                  }`}
                >
                  <img
                    src={project.image}
                    alt={`${project.name} logo`}
                    className={`w-full h-full object-contain ${
                      isCulturia && hasAnimated ? 'md:animate-none! animate-spin-once' : ''
                    }`}
                    style={isCulturia && hasAnimated ? { animation: 'spin-once 2s ease-in-out forwards' } : {}}
                  />
                </div>
              ) : (
                <div className="shrink-0 w-14 h-14 md:w-16 md:h-16 bg-linear-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-2xl md:text-3xl font-bold group-hover:scale-105 transition-all duration-200 shadow-sm">
                  {project.letter}
                </div>
              )}

              {/* Title */}
              <div className="flex-1 flex items-center">
                <h3 className="text-lg md:text-xl font-semibold text-gray-900">
                  {project.name}
                </h3>
              </div>
            </div>
          </div>

          {/* Right Column - Description */}
          <div className="flex items-center">
            <div className="text-base md:text-lg text-gray-800 leading-relaxed w-full space-y-2">
              {project.shortDescription.split('\n').map((line, index) => (
                <p key={index}>
                  {line.replace(/^•\s*/, '')}
                </p>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
