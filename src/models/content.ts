export type ExperienceProject = {
  role: string;
  dates: string;
  description: string[];
  skills: string[];
};

export type ExperienceCompany = {
  company: string;
  duration: string;
  location: string;
  image?: {
    alt?: string;
    height?: number;
    src?: string;
    width?: number;
  };
  projects: ExperienceProject[];
};

export type EducationItem = {
  type: string;
  title: string;
  where: string;
  country: string;
  date: string;
  score: string;
  thesis: string;
  link: string;
};

export type ProjectItem = {
  description: string[];
  name: string;
  status: string;
  statusType: string;
  technologies: Record<string, string>;
  url: string | null;
};
