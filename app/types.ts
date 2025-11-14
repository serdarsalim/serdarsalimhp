export interface Project {
  id: string;
  name: string;
  letter: string;
  shortDescription: string;
  fullDescription: string;
  techStack: string[];
  image?: string;
  demoUrl?: string;
  githubUrl?: string;
  year: string;
  category: string;
}
