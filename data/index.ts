import type {
  PersonalInfo,
  WorkExperience,
  Project,
  Education,
  SkillCategory,
  SocialMediaLink,
  NavItem,
} from './types';

// Navigation Items
export const navItems: NavItem[] = [
  { name: 'Home', link: '#home' },
  { name: 'About', link: '#about' },
  { name: 'Experience', link: '#experience' },
  { name: 'Projects', link: '#projects' },
  { name: 'Skills', link: '#skills' },
  { name: 'Contact', link: '#contact' },
];

// Personal Information
export const personalInfo: PersonalInfo = {
  name: 'Peter Elishea Abdelaty Awad',
  title: 'Frontend Developer',
  location: 'Cairo, Egypt',
  email: 'peterelishea@gmail.com',
  phone: '+201551635180',
  summary:
    'Frontend Developer with 4+ years of experience specializing in React, Next.js, and TypeScript. Proven track record of building production-ready web applications with modern technologies including Tailwind CSS and ShadCN/UI. Experienced in state management, API integration, and creating responsive, user-friendly interfaces. Strong background in communications engineering with military service experience.',
};

// Work Experience
export const workExperience: WorkExperience[] = [
  {
    id: 'exp-1',
    company: 'SB Technology',
    position: 'Frontend Developer',
    location: 'Remote',
    startDate: 'Dec 2024',
    endDate: 'Present',
    responsibilities: [
      'Developing and maintaining responsive web applications using React, Next.js, and TypeScript',
      'Implementing modern UI components with Tailwind CSS and ShadCN/UI',
      'Collaborating with cross-functional teams to deliver high-quality features',
      'Optimizing application performance and ensuring code quality',
    ],
  },
  {
    id: 'exp-2',
    company: 'Freelance',
    position: 'Freelance Developer',
    location: 'Remote',
    startDate: 'June 2024',
    endDate: 'Present',
    responsibilities: [
      'Built multiple production-ready web applications for international clients',
      'Developed Luca Stay booking platform with Next.js and TypeScript',
      'Created PASS Citizenship & Residency website with modern UI/UX',
      'Implemented PASS Wealth Management website with responsive design',
      'Delivered custom admin dashboards and ERP solutions',
    ],
  },
  {
    id: 'exp-3',
    company: 'Egyptian Armed Forces',
    position: 'Military Officer & Communications Engineer',
    location: 'Egypt',
    startDate: 'Oct 2020',
    endDate: 'Apr 2023',
    responsibilities: [
      'Managed communications systems and technical infrastructure',
      'Led technical teams in maintaining and troubleshooting communication networks',
      'Developed problem-solving and leadership skills in high-pressure environments',
      'Coordinated cross-functional projects and ensured operational efficiency',
    ],
  },
];

// Projects
export const projects: Project[] = [
  {
    id: 'proj-1',
    name: 'Luca Stay',
    description:
      'A comprehensive booking platform for vacation rentals in Italy, featuring property listings, booking management, and user authentication.',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'React Query', 'Zustand'],
    link: 'https://www.lucastay.it/en',
    status: 'production',
    image: '/p1.svg',
  },
  {
    id: 'proj-2',
    name: 'PASS Citizenship & Residency',
    description:
      'Professional website for citizenship and residency services, showcasing programs and providing consultation booking functionality.',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'ShadCN/UI'],
    link: 'https://www.passresidency.com/en',
    status: 'production',
    image: '/p2.svg',
  },
  {
    id: 'proj-3',
    name: 'PASS Wealth Management Website',
    description:
      'Corporate website for wealth management services with elegant design, service showcases, and client portal integration.',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    link: 'https://www.passwm.com/en',
    status: 'production',
    image: '/p3.svg',
  },
  {
    id: 'proj-4',
    name: 'Homes & Admin Dashboard',
    description:
      'Real estate management dashboard with property listings, analytics, and administrative tools for property managers.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'React Query', 'Zustand'],
    status: 'development',
    image: '/p4.svg',
    features: [
      'Property management system',
      'Analytics dashboard',
      'User role management',
      'Real-time notifications',
    ],
  },
  {
    id: 'proj-5',
    name: 'Academies ERP Dashboard',
    description:
      'Enterprise Resource Planning system for educational institutions with student management, course scheduling, and reporting.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Redux', 'RESTful APIs'],
    status: 'completed',
    image: '/p1.svg',
    features: [
      'Student enrollment management',
      'Course and schedule management',
      'Grade tracking and reporting',
      'Parent-teacher communication portal',
    ],
  },
  {
    id: 'proj-6',
    name: 'G2G Educational Dashboard',
    description:
      'Government-to-Government educational platform facilitating international student exchanges and program management.',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'React Hook Form', 'Zod'],
    status: 'completed',
    image: '/p2.svg',
    features: [
      'International program management',
      'Student application processing',
      'Document verification system',
      'Multi-language support',
    ],
  },
];

// Education
export const education: Education[] = [
  {
    id: 'edu-1',
    degree: "Bachelor's Degree in Communications and Electronics Engineering",
    institution: 'Modern Academy for Engineering and Technology',
    location: 'Cairo, Egypt',
    graduationYear: '2020',
    gpa: '2.77 (Very Good)',
    type: 'degree',
  },
  {
    id: 'edu-2',
    degree: 'Training Program',
    institution: 'National Telecommunication Institute (NTI)',
    location: 'New Capital, Egypt',
    graduationYear: '2023',
    type: 'training',
  },
];

// Skills
export const skills: SkillCategory[] = [
  {
    id: 'cat-1',
    category: 'Frontend',
    skills: [
      { name: 'React', level: 'expert' },
      { name: 'Next.js', level: 'expert' },
      { name: 'TypeScript', level: 'advanced' },
      { name: 'JavaScript (ES6+)', level: 'expert' },
      { name: 'Tailwind CSS', level: 'expert' },
      { name: 'ShadCN/UI', level: 'advanced' },
      { name: 'React Hook Form', level: 'advanced' },
      { name: 'Zod', level: 'advanced' },
    ],
  },
  {
    id: 'cat-2',
    category: 'State Management & Data',
    skills: [
      { name: 'React Query', level: 'advanced' },
      { name: 'Zustand', level: 'advanced' },
      { name: 'Context API', level: 'expert' },
      { name: 'Redux', level: 'intermediate' },
      { name: 'RESTful APIs', level: 'advanced' },
      { name: 'JSON', level: 'expert' },
    ],
  },
  {
    id: 'cat-3',
    category: 'Tools & Workflow',
    skills: [
      { name: 'Git', level: 'advanced' },
      { name: 'GitHub', level: 'advanced' },
      { name: 'VS Code', level: 'expert' },
      { name: 'npm/yarn', level: 'advanced' },
      { name: 'Agile Methodologies', level: 'intermediate' },
      { name: 'Debugging & Performance Optimization', level: 'advanced' },
    ],
  },
  {
    id: 'cat-4',
    category: 'Other',
    skills: [
      { name: 'Responsive Design', level: 'expert' },
      { name: 'Web Accessibility', level: 'intermediate' },
      { name: 'SEO Optimization', level: 'intermediate' },
      { name: 'Framer Motion', level: 'advanced' },
    ],
  },
];

// Social Media
export const socialMedia: SocialMediaLink[] = [
  {
    id: 'social-1',
    platform: 'LinkedIn',
    url: 'https://www.linkedin.com/in/peterawad2',
    icon: '/link.svg',
  },
  {
    id: 'social-2',
    platform: 'GitHub',
    url: 'https://github.com/PeterAwad1',
    icon: '/git.svg',
  },
];

// Legacy exports for backward compatibility (can be removed later)
export const gridItems = [
  {
    id: 1,
    title: 'I prioritize client collaboration, fostering open communication ',
    description: '',
    className: 'lg:col-span-3 md:col-span-6 md:row-span-4 lg:min-h-[60vh]',
    imgClassName: 'w-full h-full',
    titleClassName: 'justify-end',
    img: '/b1.svg',
    spareImg: '',
  },
  {
    id: 2,
    title: "I'm very flexible with time zone communications",
    description: '',
    className: 'lg:col-span-2 md:col-span-3 md:row-span-2',
    imgClassName: '',
    titleClassName: 'justify-start',
    img: '',
    spareImg: '',
  },
  {
    id: 3,
    title: 'My tech stack',
    description: 'I constantly try to improve',
    className: 'lg:col-span-2 md:col-span-3 md:row-span-2',
    imgClassName: '',
    titleClassName: 'justify-center',
    img: '',
    spareImg: '',
  },
  {
    id: 4,
    title: 'Tech enthusiast with a passion for development.',
    description: '',
    className: 'lg:col-span-2 md:col-span-3 md:row-span-1',
    imgClassName: '',
    titleClassName: 'justify-start',
    img: '/grid.svg',
    spareImg: '/b4.svg',
  },
  {
    id: 5,
    title: 'Currently crafting a modern UI component library',
    description: 'React, Tailwind, and shadcn/ui',
    className: 'md:col-span-3 md:row-span-2',
    imgClassName: 'absolute right-0 bottom-0 md:w-96 w-60',
    titleClassName: 'justify-center md:justify-start lg:justify-center',
    img: '/b5.svg',
    spareImg: '/grid.svg',
  },
  {
    id: 6,
    title: 'Do you want to start a project together?',
    description: '',
    className: 'lg:col-span-2 md:col-span-3 md:row-span-1',
    imgClassName: '',
    titleClassName: 'justify-center md:max-w-full max-w-60 text-center',
    img: '',
    spareImg: '',
  },
];
