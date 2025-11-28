import { Project } from '../types';

export const projects: Project[] = [
  {
    id: 'yummii',
    name: 'Yummii',
    letter: 'Y',
    image: '/yummii_logo.png',
    shortDescription:
      '• Weekly meal board that keeps breakfast, lunch, and dinner in one timeline\n' +
      '• Pick meals from a growing library of recipes or add private family favorites\n' +
      '• Share meal plans with your spouse or helper so everyone stays aligned\n' +
      '• Built-in shopping list view keeps ingredients grouped and editable',
    fullDescription:
      '• Weekly meal board that keeps breakfast, lunch, and dinner in one timeline\n' +
      '• Pick meals from a growing library of recipes or add private family favorites\n' +
      '• Share meal plans with your spouse or helper so everyone stays aligned\n' +
      '• Built-in shopping list view keeps ingredients grouped and editable',
    techStack: ['Next.js', 'PostgreSQL', 'Tailwind CSS', 'Clerk'],
    year: '2025',
    category: 'Web App',
    demoUrl: 'https://yummii.vercel.app/',
    githubUrl: '',
  },
  {
    id: 'culturia',
    name: 'Culturia',
    letter: 'C',
    image: '/culturia.png',
    shortDescription: '• For curious people seeking great YouTube videos from around the world\n• Explore music, comedy, talks, and daily-life clips on a world map\n• Create bookmark lists by country and topic\n• Keep collections private or share with others',
    fullDescription: '• For curious people seeking great YouTube videos from around the world\n• Explore music, comedy, talks, and daily-life clips on a world map\n• Create bookmark lists by country and topic\n• Keep collections private or share with others',
    techStack: ['React', 'TypeScript', 'Three.js', 'YouTube API', 'Mapbox'],
    year: '2025',
    category: 'Web App',
    demoUrl: 'https://culturia.xyz',
    githubUrl: 'https://github.com/yourusername/culturia',
  },
  {
    id: 'simplify-budget',
    name: 'Simplify',
    letter: 'S',
    image: '/simplifybudget.png',
    shortDescription: "• Budget web app to manage your finances and save more money\n• Stores every transaction in a Google Sheet in your own Google Drive\n• Calendar-based expense tracking for quick daily entries\n• Integrated net worth view and subscription tracking",
    fullDescription: "• Budget web app to manage your finances and save more money\n• Stores every transaction in a Google Sheet in your own Google Drive\n• Calendar-based expense tracking for quick daily entries\n• Integrated net worth view and subscription tracking",
    techStack: ['Google Apps Script', 'Google Sheets API', 'HTML/CSS', 'JavaScript'],
    year: '2024',
    category: 'Web App',
    demoUrl: 'https://simplifybudget.com',
    githubUrl: 'https://github.com/yourusername/simplify-budget',
  },
  {
    id: 'workout-tracker',
    name: 'SLMFIT',
    letter: '🏋️',
    shortDescription: '• Simple, no-bloat gym tracker for beginners and pros\n• Build workout plans and track sets, reps, and weights\n• Each exercise includes a YouTube form video so you never have to search again\n• Web app that works across devices with the same account',
    fullDescription: '• Simple, no-bloat gym tracker for beginners and pros\n• Build workout plans and track sets, reps, and weights\n• Each exercise includes a YouTube form video so you never have to search again\n• Web app that works across devices with the same account',
    techStack: ['Google Sheets', 'Google Apps Script'],
    year: '2023',
    category: 'Web App',
    demoUrl: 'https://slmfit.vercel.app/',
    githubUrl: '',
  },
];
