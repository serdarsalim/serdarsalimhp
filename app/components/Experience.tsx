'use client';

import { useEffect, useRef, useState } from 'react';

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const experiences = [
    {
      company: 'Independent',
      role: 'Web Developer',
      period: '2023 - Present',
      description: 'Designing and building multi-user web apps and content sites using Next.js, Supabase, Google Cloud, Google Apps Script, and AI-assisted tooling like Codex CLI and Claude Code.',
    },
    {
      company: 'Twitter',
      role: 'Training & Quality Program Manager',
      period: '2013 - 2023',
      description: 'Led crisis management initiatives for content moderation and online safety training during critical incidents. Managed training for new hires and policy changes across 100+ support policies. Built strong cross-functional relationships with Quality Teams, Vendor Partners, Engineering and Policy Owners. Facilitated the launch of multiple vendor sites in over 10 locations worldwide.',
    },
  ];

  const education = [
    {
      school: 'University of Graz',
      degree: 'Bachelor of Arts in Transcultural Communication',
      period: '2008 - 2012',
      description: 'Studied communication across cultures, languages, and systems.',
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = rect.height;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / sectionHeight));

      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="relative py-16 md:py-32 text-white overflow-hidden">
      {/* Floating clouds */}
      <div className="absolute top-16 right-12 w-32 h-8 bg-white/10 rounded-full blur-sm opacity-25 animate-[float_28s_ease-in-out_infinite]" />
      <div className="absolute top-48 left-8 w-24 h-7 bg-white/8 rounded-full blur-sm opacity-20 animate-[float_22s_ease-in-out_infinite_3s]" />
      <div className="absolute bottom-40 right-1/4 w-28 h-7 bg-white/12 rounded-full blur-sm opacity-30 animate-[float_26s_ease-in-out_infinite_6s]" />

      {/* Parallax color transition - multi-layer gradients moving at different speeds */}
      <div className="absolute bottom-0 left-0 right-0 h-[120vh] pointer-events-none overflow-hidden">
        {/* Layer 1 - Slowest (background purple) */}
        <div
          className="absolute bottom-0 left-0 right-0 h-full"
          style={{
            transform: `translateY(${(1 - scrollProgress) * 80}vh)`,
            opacity: Math.min(0.6, scrollProgress * 1.2),
          }}
        >
          <div className="w-full h-full bg-gradient-to-b from-transparent via-[#8a65cc]/20 to-[#5e30d9]/40" />
        </div>

        {/* Layer 2 - Medium speed (mid purple/pink) */}
        <div
          className="absolute bottom-0 left-0 right-0 h-full"
          style={{
            transform: `translateY(${(1 - scrollProgress) * 50}vh)`,
            opacity: Math.min(0.5, scrollProgress * 1.5),
          }}
        >
          <div className="w-full h-full bg-gradient-to-b from-transparent via-[#be91c6]/15 to-[#8a65cc]/35" />
        </div>

        {/* Layer 3 - Fastest (foreground warm tones) */}
        <div
          className="absolute bottom-0 left-0 right-0 h-full"
          style={{
            transform: `translateY(${(1 - scrollProgress) * 30}vh)`,
            opacity: Math.min(0.4, scrollProgress * 1.8),
          }}
        >
          <div className="w-full h-full bg-gradient-to-b from-transparent via-[#fea798]/10 to-[#be91c6]/30" />
        </div>
      </div>
      <div className="relative max-w-6xl mx-auto px-4 md:px-6">
        {/* Work Experience */}
        <div className="pt-14 md:pt-14 mb-12 md:mb-20 md:max-w-4xl md:mx-auto md:px-6 lg:px-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 md:mb-12 tracking-[0.3em] uppercase drop-shadow-[0_8px_30px_rgba(0,0,0,0.25)] text-center">Experience</h2>
          <div className="space-y-6 md:space-y-8">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl px-5 py-6 md:px-8 md:py-8 shadow-[0_25px_60px_rgba(0,0,0,0.35)]"
              >
                <div className="absolute inset-0 pointer-events-none bg-linear-to-r from-white/20 via-transparent to-transparent opacity-60" aria-hidden="true" />
                <div className="relative flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-2">
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold text-white">{exp.role}</h3>
                    <p className="text-sm md:text-base text-white/80">{exp.company}</p>
                  </div>
                  <span className="text-xs md:text-sm text-white/70 mt-1 md:mt-0">{exp.period}</span>
                </div>
                <p className="relative text-base md:text-lg text-white leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div className="education-sunset md:max-w-4xl md:mx-auto md:px-6 lg:px-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 md:mb-12 tracking-[0.3em] uppercase drop-shadow-[0_8px_30px_rgba(0,0,0,0.25)] text-center">Education</h2>
          <div className="space-y-6 md:space-y-8">
            {education.map((edu, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl px-5 py-6 md:px-8 md:py-8 shadow-[0_25px_60px_rgba(0,0,0,0.35)]"
              >
                <div className="absolute inset-0 pointer-events-none bg-linear-to-r from-white/20 via-transparent to-transparent opacity-60" aria-hidden="true" />
                <div className="relative flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-2">
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold text-white">{edu.degree}</h3>
                    <p className="text-sm md:text-base text-white/80">{edu.school}</p>
                  </div>
                  <span className="text-xs md:text-sm text-white/70 mt-1 md:mt-0">{edu.period}</span>
                </div>
                <p className="relative text-base md:text-lg text-white leading-relaxed">{edu.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
