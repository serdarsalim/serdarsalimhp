'use client';

import { useRef } from 'react';

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const allExperience = [
    {
      title: 'Web Developer',
      organization: 'Independent',
      period: '2023 - Present',
      description: 'Designing and building multi-user web apps and content sites using Next.js, Supabase, Google Cloud, Google Apps Script, and AI-assisted tooling like Codex CLI and Claude Code.',
    },
    {
      title: 'Program Manager',
      organization: 'Twitter',
      period: '2013 - 2023',
      description: 'Led cross-functional teams to operationalize content moderation policies at scale, impacting millions of users. Built and oversaw global training programs that consistently achieved 95%+ quality on complex policy enforcement. Managed a distributed training and quality organization across 12 locations globally.',
    },
    {
      title: 'BA in Transcultural Communication',
      organization: 'University of Graz',
      period: '2008 - 2012',
      description: 'Bridging languages and cultures through translation, interpretation, strategic communication, and cross-cultural analysis.',
    },
  ];

  return (
    <section ref={sectionRef} className="relative py-16 md:py-32 overflow-hidden">
      <div className="relative max-w-6xl mx-auto px-4 md:px-6">
        <div className="pt-14 md:pt-14 md:max-w-4xl md:mx-auto md:px-6 lg:px-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 md:mb-12 tracking-[0.3em] uppercase text-center">Experience</h2>
          <div className="space-y-6 md:space-y-8">
            {allExperience.map((item, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white px-5 py-6 md:px-8 md:py-8 shadow-lg"
              >
                <div className="relative flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-2">
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold text-gray-900">{item.title}</h3>
                    <div className="flex flex-wrap items-center gap-2 md:block">
                      <p className="text-sm md:text-base text-gray-700">{item.organization}</p>
                      <span className="text-xs text-gray-600 md:hidden">{item.period}</span>
                    </div>
                  </div>
                  <span className="hidden md:inline text-xs md:text-sm text-gray-600 mt-1 md:mt-0">{item.period}</span>
                </div>
                <p className="relative text-base md:text-lg text-gray-800 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
