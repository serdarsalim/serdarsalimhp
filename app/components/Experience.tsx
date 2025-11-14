'use client';

export default function Experience() {
  const experiences = [
    {
      company: 'Twitter',
      role: 'Program Manager, Global Training',
      period: '2013 - 2023',
      description: 'Led global training programs and content localization across 50+ countries. Started as localization specialist and grew into program management role.',
    },
    {
      company: 'Webzen',
      role: 'Community Manager',
      period: '2012 - 2013',
      description: 'Managed community engagement and player relations for international gaming community.',
    },
  ];

  const education = [
    {
      school: 'University',
      degree: 'Transcultural Communication',
      period: '2007 - 2011',
      description: 'Studied communication across cultures, languages, and systems.',
    },
  ];

  return (
    <section className="py-32 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        {/* Work Experience */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-gray-900 mb-12">Experience</h2>
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div key={index} className="border-l-2 border-gray-200 pl-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-2">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{exp.role}</h3>
                    <p className="text-gray-600">{exp.company}</p>
                  </div>
                  <span className="text-sm text-gray-500 mt-1 md:mt-0">{exp.period}</span>
                </div>
                <p className="text-gray-600 leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div>
          <h2 className="text-4xl font-bold text-gray-900 mb-12">Education</h2>
          <div className="space-y-8">
            {education.map((edu, index) => (
              <div key={index} className="border-l-2 border-gray-200 pl-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-2">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{edu.degree}</h3>
                    <p className="text-gray-600">{edu.school}</p>
                  </div>
                  <span className="text-sm text-gray-500 mt-1 md:mt-0">{edu.period}</span>
                </div>
                <p className="text-gray-600 leading-relaxed">{edu.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
