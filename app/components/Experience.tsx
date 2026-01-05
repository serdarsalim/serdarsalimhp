'use client';

import { useRef } from 'react';

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const experiences = [
    {
      company: 'Independent',
      role: 'Web Developer',
      period: '2023 - Present',
      description: 'Designing and building multi-user web apps and content sites using Next.js, Supabase, Google Cloud, Google Apps Script, and AI-assisted tooling like Codex CLI and Claude Code.',
    },
    {
      company: 'Twitter',
      role: 'Program Manager',
      period: '2013 - 2023',
      description: 'Led crisis management initiatives for content moderation and online safety training during critical incidents. Managed training for new hires and policy changes across 100+ support policies. Built strong cross-functional relationships with Quality Teams, Vendor Partners, Engineering and Policy Owners. Facilitated the launch of multiple vendor sites in over 10 locations worldwide.',
    },
  ];

  const education = [
    {
      school: 'University of Graz',
      degree: 'BA in Transcultural Communication',
      period: '2008 - 2012',
      description: 'Bridging languages and cultures through translation, interpretation, strategic communication, and cross-cultural analysis.',
    },
  ];

  return (
    <section ref={sectionRef} className="relative py-16 md:py-32 overflow-hidden">
      <div className="relative max-w-6xl mx-auto px-4 md:px-6">
        {/* Work Experience */}
        <div className="pt-14 md:pt-14 mb-12 md:mb-20 md:max-w-4xl md:mx-auto md:px-6 lg:px-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 md:mb-12 tracking-[0.3em] uppercase text-center">Experience</h2>
          <div className="space-y-6 md:space-y-8">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white px-5 py-6 md:px-8 md:py-8 shadow-lg"
              >
                <div className="relative flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-2">
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold text-gray-900">{exp.role}</h3>
                    <div className="flex flex-wrap items-center gap-2 md:block">
                      <p className="text-sm md:text-base text-gray-700">{exp.company}</p>
                      <span className="text-xs text-gray-600 md:hidden">{exp.period}</span>
                    </div>
                  </div>
                  <span className="hidden md:inline text-xs md:text-sm text-gray-600 mt-1 md:mt-0">{exp.period}</span>
                </div>
                <p className="relative text-base md:text-lg text-gray-800 leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div className="md:max-w-4xl md:mx-auto md:px-6 lg:px-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 md:mb-12 tracking-[0.3em] uppercase text-center">Education</h2>
          <div className="space-y-6 md:space-y-8">
            {education.map((edu, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white px-5 py-6 md:px-8 md:py-8 shadow-lg"
              >
                <div className="relative flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-2">
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold text-gray-900">{edu.degree}</h3>
                    <div className="flex flex-wrap items-center gap-2 md:block">
                      <p className="text-sm md:text-base text-gray-700">{edu.school}</p>
                      <span className="text-xs text-gray-600 md:hidden">{edu.period}</span>
                    </div>
                  </div>
                  <span className="hidden md:inline text-xs md:text-sm text-gray-600 mt-1 md:mt-0">{edu.period}</span>
                </div>
                <p className="relative text-base md:text-lg text-gray-800 leading-relaxed">{edu.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
