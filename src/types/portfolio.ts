export type PortfolioProject = {
  id: string;
  name: string;
  subtitle: string;
  status: "production" | "in-progress" | string;
  featured: boolean;
  url: string | null;
  image: string | null;
  tech: string[];
  description: string;
  highlights: string[];
};

export type PortfolioExperience = {
  id: string;
  role: string;
  company: string;
  employmentType: string;
  location: string;
  startDate: string;
  endDate: string | null;
  current: boolean;
  highlights: string[];
};

export type PortfolioEducation = {
  id: string;
  degree: string;
  institution: string;
  location: string;
  startDate: string | null;
  endDate: string | null;
  status: string;
};

export type PortfolioData = {
  profile: {
    name: string;
    title: string;
    tagline: string;
    location: string;
    summary: string;
    availability: string;
    languages: string[];
  };
  contact: {
    email: string;
    phone: string;
    linkedin: string;
    github: string;
    cv: string;
  };
  skills: {
    core: string[];
    uiAndForms: string[];
    stateAndData: string[];
    tools: string[];
  };
  experience: PortfolioExperience[];
  projects: PortfolioProject[];
  education: PortfolioEducation[];
  militaryService: {
    role: string;
    organization: string;
    startDate: string;
    endDate: string;
    status: string;
  };
  navigation: Array<{
    id: string;
    label: string;
    href: string;
  }>;
};
