'use client';

import SkyMorning from './SkyMorning';

export default function Experience() {
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

  return (
    <section className="relative py-16 md:py-32 text-white overflow-hidden">
      <SkyMorning />

      <div className="relative max-w-4xl mx-auto px-4 md:px-6">
        {/* Work Experience */}
        <div className="mb-12 md:mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 md:mb-12 tracking-[0.3em] uppercase drop-shadow-[0_8px_30px_rgba(0,0,0,0.25)]">Experience</h2>
          <div className="space-y-6 md:space-y-8">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-2xl border border-white/25 bg-black/40 backdrop-blur-xl px-5 py-6 md:px-8 md:py-8 shadow-[0_25px_60px_rgba(95,39,87,0.35)]"
              >
                <div className="absolute inset-0 pointer-events-none bg-linear-to-r from-white/20 via-transparent to-transparent opacity-60" aria-hidden="true" />
                <div className="relative flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-2">
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold text-white">{exp.role}</h3>
                    <p className="text-sm md:text-base text-white/80">{exp.company}</p>
                  </div>
                  <span className="text-xs md:text-sm text-white/70 mt-1 md:mt-0">{exp.period}</span>
                </div>
                <p className="relative text-sm md:text-base text-white leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div className="education-sunset">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 md:mb-12 tracking-[0.3em] uppercase drop-shadow-[0_8px_30px_rgba(0,0,0,0.25)]">Education</h2>
          <div className="space-y-6 md:space-y-8">
            {education.map((edu, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-2xl border border-white/25 bg-black/40 backdrop-blur-xl px-5 py-6 md:px-8 md:py-8 shadow-[0_25px_60px_rgba(95,39,87,0.35)]"
              >
                <div className="absolute inset-0 pointer-events-none bg-linear-to-r from-white/20 via-transparent to-transparent opacity-60" aria-hidden="true" />
                <div className="relative flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-2">
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold text-white">{edu.degree}</h3>
                    <p className="text-sm md:text-base text-white/80">{edu.school}</p>
                  </div>
                  <span className="text-xs md:text-sm text-white/70 mt-1 md:mt-0">{edu.period}</span>
                </div>
                <p className="relative text-sm md:text-base text-white leading-relaxed">{edu.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}

