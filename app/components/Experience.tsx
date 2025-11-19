'use client';

import IslamicPattern from './IslamicPattern';

export default function Experience() {
  const experiences = [
    {
      company: 'Twitter',
      role: 'Training & Quality Program Manager',
      period: '2013 - 2023',
      description: 'Led crisis management initiatives for content moderation and online safety training during critical incidents. Managed training for new hires and policy changes across 100+ support policies. Built strong cross-functional relationships with Quality Teams, Vendor Partners, Engineering and Policy Owners. Facilitated the launch of multiple vendor sites in over 10 locations worldwide.',
    },
    {
      company: 'Webzen',
      role: 'Localisation and Support Specialist',
      period: '2012 - 2013',
      description: 'Translated, proofread, and tested video game content from English to Turkish. Provided customer support via email and organized events for the player community.',
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
    <section className="relative py-16 md:py-32 bg-gradient-to-b from-indigo-50 to-blue-100">
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        {/* Work Experience */}
        <div className="mb-12 md:mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 md:mb-12">Experience</h2>
          <div className="space-y-6 md:space-y-8">
            {experiences.map((exp, index) => (
              <div key={index} className="border-l-2 border-gray-200 pl-4 md:pl-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-2">
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold text-gray-900">{exp.role}</h3>
                    <p className="text-sm md:text-base text-gray-600">{exp.company}</p>
                  </div>
                  <span className="text-xs md:text-sm text-gray-500 mt-1 md:mt-0">{exp.period}</span>
                </div>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 md:mb-12">Education</h2>
          <div className="space-y-6 md:space-y-8">
            {education.map((edu, index) => (
              <div key={index} className="border-l-2 border-gray-200 pl-4 md:pl-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-2">
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold text-gray-900">{edu.degree}</h3>
                    <p className="text-sm md:text-base text-gray-600">{edu.school}</p>
                  </div>
                  <span className="text-xs md:text-sm text-gray-500 mt-1 md:mt-0">{edu.period}</span>
                </div>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed">{edu.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Subtle Islamic pattern - fades upward */}
      <IslamicPattern position="bottom" variant={1} />
    </section>
  );
}
