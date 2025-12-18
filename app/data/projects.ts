import { Project } from '../types';

export const projects: Project[] = [
  {
    id: 'simplify-budget',
    name: 'Simplify',
    letter: 'S',
    image: '/simplifybudget.png',
    shortDescription:
      '• Budget web app to manage your personal finances\n' +
      '• Stores transactions in a spreadsheet in your own Google Drive\n' +
      '• Integrated net worth view and subscription tracking',
    fullDescription:
      '• Budget web app to manage your personal finances\n' +
      '• Stores transactions in a spreadsheet in your own Google Drive\n' +
      '• Integrated net worth view and subscription tracking',
    techStack: ['Google Apps Script', 'Google Sheets API', 'HTML/CSS', 'JavaScript'],
    year: '2024',
    category: 'Web App',
    demoUrl: 'https://simplifybudget.com',
    githubUrl: 'https://github.com/yourusername/simplify-budget',
  },
  {
    id: 'culturia',
    name: 'Culturia',
    letter: 'C',
    image: '/culturia.png',
    shortDescription:
      '• Find country-specific videos from a curated world map \n' +
      '• Explore music, comedy, talks, and daily-life clips \n' +
      '• Create bookmark lists by country and topic',
    fullDescription:
      '• Find country-specific videos from a curated world map\n' +
      '• Explore music, comedy, talks, and daily-life clips\n' +
      '• Create bookmark lists by country and topic',
    techStack: ['React', 'TypeScript', 'Three.js', 'YouTube API', 'Mapbox'],
    year: '2025',
    category: 'Web App',
    demoUrl: 'https://culturia.xyz',
    githubUrl: 'https://github.com/yourusername/culturia',
  },
  {
    id: 'workout-tracker',
    name: 'Gym Tracker',
    letter: '🏋️',
    image: '/gymtracker4.png',
    shortDescription:
      '• Simple, no-bloat gym workout tracker for beginners and pros\n' +
      '• Build workout plans and track sets, reps, and weights\n' +
      '• Exercises include YouTube tutorial videos for quick reference',
    fullDescription:
      '• Simple, no-bloat gym tracker for beginners and pros\n' +
      '• Build workout plans and track sets, reps, and weights\n' +
      '• Exercises include YouTube tutorial videos for quick reference',
    techStack: ['Google Sheets', 'Google Apps Script'],
    year: '2023',
    category: 'Web App',
    demoUrl: 'https://gymtracker4.vercel.app/',
    githubUrl: '',
  },
  {
    id: 'okr-tracker',
    name: 'OKR Tracker',
    letter: 'O',
    image: '/slmtrack.png',
    shortDescription:
      '• Personal OKR tracker for weekly planning and self-scoring\n' +
      '• Set long-term goals, plan each week, and rate your execution\n' +
      '• Yearly calendar to spot patterns, stay accountable and course-correct',
    fullDescription:
      '• Personal OKR tracker for weekly planning and self-scoring\n' +
      '• Set long-term goals, plan each week, and rate your execution\n' +
      '• Yearly calendar to spot patterns, stay accountable and course-correct',
    techStack: ['Next.js', 'Supabase', 'Tailwind CSS'],
    year: '2025',
    category: 'Web App',
    demoUrl: 'https://slmtrack.vercel.app/',
    githubUrl: '',
  },
  {
    id: 'yummii',
    name: 'Yummii',
    letter: 'Y',
    image: '/yummii_logo.png',
    shortDescription:
      '• Helps you create a weekly personal cooking plan\n' +
      '• Add new recipes for private use or for community\n' +
      '• You can share meal plans with family members',
    fullDescription:
      '• Helps you create a weekly personal cooking plan\n' +
      '• Add new recipes for private use or for community\n' +
      '• You can share meal plans with family members',
    techStack: ['Next.js', 'PostgreSQL', 'Tailwind CSS', 'Clerk'],
    year: '2025',
    category: 'Web App',
    demoUrl: 'https://yummii.vercel.app/',
    githubUrl: '',
  },
];
