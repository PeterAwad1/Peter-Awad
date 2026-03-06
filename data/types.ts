// Personal Information
export interface PersonalInfo {
  name: string;
  title: string;
  location: string;
  email: string;
  phone: string;
  summary: string;
  profileImage?: string;
}

// Work Experience
export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string; // ISO format or "MMM YYYY"
  endDate: string | 'Present';
  responsibilities: string[];
  logo?: string;
}

// Project
export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  link?: string;
  status: 'production' | 'development' | 'completed';
  image?: string;
  features?: string[];
  githubLink?: string;
}

// Education
export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  graduationYear: string;
  gpa?: string;
  type: 'degree' | 'training' | 'certification';
}

// Skills
export interface SkillCategory {
  id: string;
  category: string;
  skills: Skill[];
}

export interface Skill {
  name: string;
  icon?: string;
  level?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

// Social Media
export interface SocialMediaLink {
  id: string;
  platform: string;
  url: string;
  icon: string;
}

// Navigation
export interface NavItem {
  name: string;
  link: string;
}

// Contact Form
export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

// CV Data Structure (Main Export)
export interface CVData {
  personalInfo: PersonalInfo;
  workExperience: WorkExperience[];
  projects: Project[];
  education: Education[];
  skills: SkillCategory[];
  socialMedia: SocialMediaLink[];
  navItems: NavItem[];
}
