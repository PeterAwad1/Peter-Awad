# Design Document: Portfolio Website Completion

## Overview

This design document outlines the technical architecture and implementation approach for completing Peter Elishea Abdelaty Awad's professional portfolio website. The portfolio will be built using Next.js 15, TypeScript, Tailwind CSS, and ShadCN/UI, maintaining a modern aesthetic with smooth animations powered by Framer Motion.

### Goals

- Create a professional, performant portfolio website showcasing Peter's skills and experience
- Implement a component-based architecture for maintainability and reusability
- Ensure responsive design across all device sizes (mobile, tablet, desktop)
- Achieve excellent performance (Lighthouse score >85) and accessibility compliance
- Provide smooth, engaging animations without compromising performance
- Centralize content management through TypeScript data structures

### Non-Goals

- Backend API development or database integration
- User authentication or admin panel
- Blog or CMS functionality
- E-commerce features
- Multi-language support (English only)

### Research Summary

Based on analysis of the existing codebase and modern portfolio best practices:


**Next.js 15 Features**: The project uses Next.js 15 with App Router, enabling server components by default, improved performance with Turbopack, and enhanced image optimization. We'll leverage these features for optimal loading times.

**Framer Motion Integration**: The existing setup includes Framer Motion 12.x, which provides declarative animations, gesture support, and layout animations. We'll use viewport-triggered animations for scroll effects and spring physics for natural motion.

**Component Architecture**: The existing structure uses a component-based approach with UI components in `/components/ui` and page-specific components in `/app/_components`. We'll maintain this pattern for consistency.

**Tailwind CSS 4**: The project uses Tailwind CSS 4 with custom configuration, providing utility-first styling with excellent performance through JIT compilation.

**Accessibility Standards**: Modern portfolios must meet WCAG 2.1 AA standards, including keyboard navigation, screen reader support, and proper semantic HTML structure.

**Performance Optimization**: Key strategies include code splitting, lazy loading, image optimization via Next.js Image component, and minimizing JavaScript bundle size through tree-shaking.

## Architecture

### System Architecture

The portfolio follows a client-side rendered (CSR) architecture with Next.js App Router, utilizing React Server Components where appropriate for improved performance.

```
┌─────────────────────────────────────────────────────────┐
│                     Browser (Client)                     │
│  ┌───────────────────────────────────────────────────┐  │
│  │           Next.js App Router (App)                │  │
│  │  ┌─────────────────────────────────────────────┐  │  │
│  │  │         Layout (Root Layout)                │  │  │
│  │  │  - Theme Provider                           │  │  │
│  │  │  - Floating Navigation                      │  │  │
│  │  └─────────────────────────────────────────────┘  │  │
│  │  ┌─────────────────────────────────────────────┐  │  │
│  │  │         Page (Home Page)                    │  │  │
│  │  │  - Hero Section                             │  │  │
│  │  │  - About Section                            │  │  │
│  │  │  - Experience Section                       │  │  │
│  │  │  - Projects Section                         │  │  │
│  │  │  - Skills Section                           │  │  │
│  │  │  - Contact Section                          │  │  │
│  │  │  - Footer                                   │  │  │
│  │  └─────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│                   Data Layer (Static)                    │
│  ┌───────────────────────────────────────────────────┐  │
│  │              data/index.ts                        │  │
│  │  - Personal Info                                  │  │
│  │  - Work Experience                                │  │
│  │  - Projects                                       │  │
│  │  - Skills                                         │  │
│  │  - Education                                      │  │
│  │  - Social Media                                   │  │
│  └───────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

### Component Hierarchy


```
App
├── RootLayout
│   ├── ThemeProvider (next-themes)
│   ├── FloatingNav
│   │   └── NavItem[]
│   └── Page (children)
│
└── HomePage
    ├── HeroSection
    │   ├── AnimatedText
    │   ├── TypewriterEffect (optional)
    │   └── CTAButton
    │
    ├── AboutSection
    │   ├── SectionHeading
    │   ├── ProfileImage
    │   ├── ProfessionalSummary
    │   └── EducationCard[]
    │
    ├── ExperienceSection
    │   ├── SectionHeading
    │   └── ExperienceCard[]
    │       ├── CompanyInfo
    │       ├── Timeline
    │       └── ResponsibilityList
    │
    ├── ProjectsSection
    │   ├── SectionHeading
    │   └── ProjectCard[]
    │       ├── ProjectImage
    │       ├── ProjectInfo
    │       ├── TechStack
    │       └── ProjectLinks
    │
    ├── SkillsSection
    │   ├── SectionHeading
    │   └── SkillCategory[]
    │       ├── CategoryTitle
    │       └── SkillBadge[]
    │
    ├── ContactSection
    │   ├── SectionHeading
    │   ├── ContactInfo
    │   └── ContactForm
    │       ├── FormField[]
    │       └── SubmitButton
    │
    └── Footer
        ├── SocialLinks[]
        └── Copyright
```

### Technology Stack

- **Framework**: Next.js 15.5.4 (App Router)
- **Language**: TypeScript 5.x
- **Styling**: Tailwind CSS 4.x
- **UI Components**: ShadCN/UI (Radix UI primitives)
- **Animations**: Framer Motion 12.x
- **Icons**: Lucide React, Tabler Icons
- **Theme**: next-themes (dark mode support)
- **3D Graphics**: Three.js, React Three Fiber (for hero section globe)
- **Build Tool**: Turbopack (Next.js 15 default)

## Components and Interfaces

### Core Page Components

#### 1. HeroSection Component

**Purpose**: Landing section that immediately captures attention with animated name, title, and call-to-action.

**Props Interface**:
```typescript
interface HeroSectionProps {
  personalInfo: PersonalInfo;
}
```

**Key Features**:
- Animated text reveal for name and title
- 3D globe background (existing implementation)
- Scroll indicator
- Primary CTA button
- Responsive typography scaling

**Animation Strategy**:
- Fade-in and slide-up animation on mount
- Staggered text animation for name/title
- Continuous subtle globe rotation
- Parallax effect on scroll


#### 2. AboutSection Component

**Purpose**: Presents professional summary, education, and personal background.

**Props Interface**:
```typescript
interface AboutSectionProps {
  summary: string;
  education: Education[];
  profileImage?: string;
}
```

**Key Features**:
- Professional summary with highlighted keywords
- Education timeline
- Profile image with hover effect
- Grid layout for education entries

**Animation Strategy**:
- Fade-in when scrolled into viewport
- Staggered animation for education cards
- Hover scale effect on profile image

#### 3. ExperienceSection Component

**Purpose**: Displays work history in reverse chronological order with detailed responsibilities.

**Props Interface**:
```typescript
interface ExperienceSectionProps {
  experiences: WorkExperience[];
}
```

**Key Features**:
- Timeline visualization
- Expandable/collapsible responsibility lists
- Company logos (if available)
- Duration calculation
- Location display

**Animation Strategy**:
- Staggered card entrance from left/right alternating
- Smooth expand/collapse transitions
- Timeline progress indicator

#### 4. ProjectsSection Component

**Purpose**: Showcases completed projects with descriptions, tech stacks, and links.

**Props Interface**:
```typescript
interface ProjectsSectionProps {
  projects: Project[];
}
```

**Key Features**:
- Responsive grid layout (1/2/3 columns)
- Project images with overlay
- Tech stack badges with icons
- External link indicators
- Production/development status labels
- Hover effects revealing more details

**Animation Strategy**:
- Staggered grid item entrance
- Hover scale and shadow effects
- Image zoom on hover
- Badge pulse animation


#### 5. SkillsSection Component

**Purpose**: Displays technical skills organized by category with visual icons.

**Props Interface**:
```typescript
interface SkillsSectionProps {
  skillCategories: SkillCategory[];
}
```

**Key Features**:
- Category-based grouping
- Icon representation for major technologies
- Visual hierarchy with badges
- Responsive grid layout
- Skill level indicators (optional)

**Animation Strategy**:
- Staggered badge entrance
- Hover glow effect
- Category fade-in sequence

#### 6. ContactSection Component

**Purpose**: Provides contact information and form for reaching out.

**Props Interface**:
```typescript
interface ContactSectionProps {
  contactInfo: ContactInfo;
  onSubmit?: (data: ContactFormData) => Promise<void>;
}
```

**Key Features**:
- Contact form with validation
- Direct contact links (email, phone)
- Form field validation
- Success/error states
- Loading states during submission

**Animation Strategy**:
- Form field focus animations
- Button hover effects
- Success message fade-in
- Error shake animation

#### 7. FloatingNav Component (Existing - Enhanced)

**Purpose**: Persistent navigation with active section highlighting.

**Props Interface**:
```typescript
interface FloatingNavProps {
  navItems: NavItem[];
}
```

**Key Features**:
- Smooth scroll to sections
- Active section indicator
- Mobile hamburger menu
- Backdrop blur effect
- Hide on scroll down, show on scroll up

**Animation Strategy**:
- Slide-in from top on mount
- Active indicator slide transition
- Mobile menu slide-in from side
- Backdrop blur fade


#### 8. Footer Component

**Purpose**: Bottom section with social links and copyright information.

**Props Interface**:
```typescript
interface FooterProps {
  socialMedia: SocialMediaLink[];
  copyright: string;
}
```

**Key Features**:
- Social media icon links
- Copyright notice
- Back to top button
- Minimal, clean design

**Animation Strategy**:
- Social icon hover scale
- Back to top button fade-in on scroll
- Icon hover color transitions

### Reusable UI Components

#### SectionHeading Component

```typescript
interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
}
```

Provides consistent section titles with optional subtitles and alignment options.

#### Card Component

```typescript
interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
  onClick?: () => void;
}
```

Base card component with hover effects and customizable styling.

#### Badge Component

```typescript
interface BadgeProps {
  text: string;
  icon?: React.ReactNode;
  variant?: 'default' | 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
}
```

Displays technology badges, status labels, and tags.

#### Button Component (ShadCN/UI)

Leverages existing ShadCN button component with custom variants for CTAs.

## Data Models

### TypeScript Interfaces


```typescript
// Personal Information
interface PersonalInfo {
  name: string;
  title: string;
  location: string;
  email: string;
  phone: string;
  summary: string;
  profileImage?: string;
}

// Work Experience
interface WorkExperience {
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
interface Project {
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
interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  graduationYear: string;
  gpa?: string;
  type: 'degree' | 'training' | 'certification';
}

// Skills
interface SkillCategory {
  id: string;
  category: string;
  skills: Skill[];
}

interface Skill {
  name: string;
  icon?: string;
  level?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

// Social Media
interface SocialMediaLink {
  id: string;
  platform: string;
  url: string;
  icon: string;
}

// Navigation
interface NavItem {
  name: string;
  link: string;
}

// Contact Form
interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

// CV Data Structure (Main Export)
interface CVData {
  personalInfo: PersonalInfo;
  workExperience: WorkExperience[];
  projects: Project[];
  education: Education[];
  skills: SkillCategory[];
  socialMedia: SocialMediaLink[];
  navItems: NavItem[];
}
```

### Data File Structure

The `data/index.ts` file will export all CV data following this structure:


```typescript
// data/index.ts
export const personalInfo: PersonalInfo = {
  name: "Peter Elishea Abdelaty Awad",
  title: "Frontend Developer",
  location: "Cairo, Egypt",
  email: "peterelishea@gmail.com",
  phone: "+201551635180",
  summary: "Frontend Developer with 4+ years of experience...",
};

export const workExperience: WorkExperience[] = [
  {
    id: "exp-1",
    company: "SB Technology",
    position: "Frontend Developer",
    location: "Remote",
    startDate: "Dec 2024",
    endDate: "Present",
    responsibilities: [...],
  },
  // ... more experiences
];

export const projects: Project[] = [
  {
    id: "proj-1",
    name: "Luca Stay",
    description: "...",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    link: "https://www.lucastay.it/en",
    status: "production",
  },
  // ... more projects
];

export const education: Education[] = [
  {
    id: "edu-1",
    degree: "Bachelor's Degree in Communications and Electronics Engineering",
    institution: "Modern Academy for Engineering and Technology",
    location: "Cairo, Egypt",
    graduationYear: "2020",
    gpa: "2.77 (Very Good)",
    type: "degree",
  },
  // ... more education
];

export const skills: SkillCategory[] = [
  {
    id: "cat-1",
    category: "Frontend",
    skills: [
      { name: "React", icon: "/icons/react.svg" },
      { name: "Next.js", icon: "/icons/nextjs.svg" },
      // ... more skills
    ],
  },
  // ... more categories
];

export const socialMedia: SocialMediaLink[] = [
  {
    id: "social-1",
    platform: "LinkedIn",
    url: "https://www.linkedin.com/in/peterawad2",
    icon: "/icons/linkedin.svg",
  },
  // ... more social links
];

export const navItems: NavItem[] = [
  { name: "Home", link: "#home" },
  { name: "About", link: "#about" },
  { name: "Experience", link: "#experience" },
  { name: "Projects", link: "#projects" },
  { name: "Skills", link: "#skills" },
  { name: "Contact", link: "#contact" },
];
```

## Animation System

### Framer Motion Configuration


#### Animation Variants

Create reusable animation variants in `lib/animations.ts`:

```typescript
// Fade in from bottom
export const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

// Fade in from left
export const fadeInLeft = {
  initial: { opacity: 0, x: -60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

// Fade in from right
export const fadeInRight = {
  initial: { opacity: 0, x: 60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

// Stagger children
export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Scale on hover
export const scaleOnHover = {
  whileHover: { scale: 1.05 },
  transition: { duration: 0.2 }
};

// Viewport animation trigger
export const viewportConfig = {
  once: true,
  amount: 0.3
};
```

#### Animation Patterns

1. **Section Entrance**: All sections use `fadeInUp` with viewport trigger
2. **Card Grids**: Use `staggerContainer` for parent, `fadeInUp` for children
3. **Hover Effects**: Apply `scaleOnHover` to interactive cards
4. **Navigation**: Smooth scroll with `behavior: 'smooth'`
5. **Form Interactions**: Focus animations and validation feedback

#### Performance Considerations

- Use `will-change` CSS property sparingly
- Prefer `transform` and `opacity` for animations (GPU-accelerated)
- Implement `IntersectionObserver` for viewport-triggered animations
- Limit simultaneous animations to maintain 60fps
- Use `layoutId` for shared element transitions

### Scroll-Based Animations

Implement scroll progress indicator and parallax effects:

```typescript
const { scrollYProgress } = useScroll();
const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
```

## Responsive Design Strategy

### Breakpoint System

Following Tailwind CSS default breakpoints:

- **Mobile**: < 640px (sm)
- **Tablet**: 640px - 1024px (sm to lg)
- **Desktop**: > 1024px (lg+)
- **Large Desktop**: > 1280px (xl+)

### Layout Adaptations


#### Navigation
- **Mobile**: Hamburger menu with slide-in drawer
- **Tablet/Desktop**: Horizontal floating nav bar

#### Hero Section
- **Mobile**: Single column, reduced font sizes, smaller globe
- **Tablet**: Larger typography, full-width globe
- **Desktop**: Maximum typography scale, full 3D globe

#### Projects Grid
- **Mobile**: 1 column (full width)
- **Tablet**: 2 columns
- **Desktop**: 3 columns

#### Skills Section
- **Mobile**: Stacked categories, 2-column badge grid
- **Tablet**: 2-column category layout
- **Desktop**: 3-4 column category layout

#### Typography Scale
- **Headings**: `text-4xl md:text-5xl lg:text-6xl`
- **Subheadings**: `text-2xl md:text-3xl lg:text-4xl`
- **Body**: `text-base md:text-lg`
- **Small**: `text-sm md:text-base`

#### Spacing
- **Section Padding**: `py-16 md:py-24 lg:py-32`
- **Container**: `px-4 sm:px-6 lg:px-8`
- **Max Width**: `max-w-7xl mx-auto`

### Touch Interactions

- Increase tap target sizes to minimum 44x44px
- Add touch feedback for interactive elements
- Disable hover effects on touch devices
- Implement swipe gestures for mobile navigation

## Performance Optimization

### Image Optimization

1. **Next.js Image Component**: Use for all images with automatic optimization
   ```typescript
   <Image
     src="/profile.jpg"
     alt="Peter Awad"
     width={400}
     height={400}
     priority={false} // true for above-fold images
     placeholder="blur"
   />
   ```

2. **Image Formats**: Serve WebP with fallback to JPEG/PNG
3. **Lazy Loading**: Implement for below-fold images
4. **Responsive Images**: Use `sizes` prop for responsive loading

### Code Splitting

1. **Dynamic Imports**: Lazy load heavy components
   ```typescript
   const Globe = dynamic(() => import('@/components/Globe'), {
     ssr: false,
     loading: () => <LoadingSpinner />
   });
   ```

2. **Route-Based Splitting**: Automatic with Next.js App Router
3. **Component-Based Splitting**: Split large sections into separate chunks

### Bundle Optimization

1. **Tree Shaking**: Remove unused code from libraries
2. **Minimize Dependencies**: Use only necessary packages
3. **Icon Optimization**: Import individual icons instead of entire libraries
   ```typescript
   import { Github, Linkedin } from 'lucide-react';
   ```


### Caching Strategy

1. **Static Assets**: Cache with long TTL (1 year)
2. **HTML**: Cache with short TTL or no-cache
3. **API Responses**: Not applicable (static site)
4. **Service Worker**: Consider for offline support (optional)

### Loading Strategy

1. **Critical CSS**: Inline critical styles
2. **Font Loading**: Use `font-display: swap` for web fonts
3. **JavaScript**: Defer non-critical scripts
4. **Preload**: Preload critical resources
   ```html
   <link rel="preload" as="image" href="/hero-bg.jpg" />
   ```

### Performance Metrics Targets

- **First Contentful Paint (FCP)**: < 1.8s
- **Largest Contentful Paint (LCP)**: < 2.5s
- **Time to Interactive (TTI)**: < 3.8s
- **Cumulative Layout Shift (CLS)**: < 0.1
- **Total Blocking Time (TBT)**: < 300ms
- **Lighthouse Score**: > 85

## Accessibility Implementation

### Semantic HTML

Use proper HTML5 semantic elements:

```html
<header>
  <nav aria-label="Main navigation">
    <!-- Navigation items -->
  </nav>
</header>

<main>
  <section id="hero" aria-labelledby="hero-heading">
    <h1 id="hero-heading">Peter Elishea Abdelaty Awad</h1>
  </section>
  
  <section id="about" aria-labelledby="about-heading">
    <h2 id="about-heading">About Me</h2>
  </section>
  
  <!-- More sections -->
</main>

<footer>
  <!-- Footer content -->
</footer>
```

### Keyboard Navigation

1. **Tab Order**: Logical tab sequence through all interactive elements
2. **Focus Indicators**: Visible focus rings with sufficient contrast
   ```css
   focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
   ```
3. **Skip Links**: Add skip-to-content link for screen readers
4. **Keyboard Shortcuts**: Document any custom keyboard shortcuts

### Screen Reader Support

1. **ARIA Labels**: Add descriptive labels for icon-only buttons
   ```typescript
   <button aria-label="Open navigation menu">
     <MenuIcon />
   </button>
   ```

2. **ARIA Landmarks**: Use landmark roles for major sections
3. **Alt Text**: Provide descriptive alt text for all images
4. **Live Regions**: Use `aria-live` for dynamic content updates
   ```typescript
   <div aria-live="polite" aria-atomic="true">
     {formStatus}
   </div>
   ```


### Color Contrast

Ensure WCAG AA compliance (4.5:1 for normal text, 3:1 for large text):

- **Text on Background**: Minimum 4.5:1 ratio
- **Interactive Elements**: Minimum 3:1 ratio
- **Focus Indicators**: Minimum 3:1 ratio against background
- **Dark Mode**: Maintain contrast ratios in dark theme

### Motion Preferences

Respect user's motion preferences:

```typescript
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

const animationVariants = prefersReducedMotion
  ? { initial: {}, animate: {} }
  : { initial: { opacity: 0 }, animate: { opacity: 1 } };
```

Or use CSS:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

## SEO Optimization

### Meta Tags

Implement comprehensive meta tags in `app/layout.tsx`:

```typescript
export const metadata: Metadata = {
  title: "Peter Elishea Abdelaty Awad - Frontend Developer",
  description: "Frontend Developer specializing in React, Next.js, and TypeScript. Building modern, performant web applications with Tailwind CSS and ShadCN/UI.",
  keywords: ["Frontend Developer", "React", "Next.js", "TypeScript", "Cairo", "Egypt"],
  authors: [{ name: "Peter Elishea Abdelaty Awad" }],
  creator: "Peter Elishea Abdelaty Awad",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://peterawad.com",
    title: "Peter Elishea Abdelaty Awad - Frontend Developer",
    description: "Frontend Developer specializing in React, Next.js, and TypeScript",
    siteName: "Peter Awad Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Peter Awad - Frontend Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Peter Elishea Abdelaty Awad - Frontend Developer",
    description: "Frontend Developer specializing in React, Next.js, and TypeScript",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};
```

### Structured Data

Add JSON-LD structured data for Person schema:


```typescript
// app/layout.tsx or app/page.tsx
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Peter Elishea Abdelaty Awad",
  jobTitle: "Frontend Developer",
  url: "https://peterawad.com",
  email: "peterelishea@gmail.com",
  telephone: "+201551635180",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Cairo",
    addressCountry: "Egypt",
  },
  sameAs: [
    "https://www.linkedin.com/in/peterawad2",
    "https://github.com/PeterAwad1",
  ],
  alumniOf: {
    "@type": "EducationalOrganization",
    name: "Modern Academy for Engineering and Technology",
  },
  knowsAbout: [
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Tailwind CSS",
    "Frontend Development",
  ],
};

// In component
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
/>
```

### Sitemap Generation

Create `app/sitemap.ts`:

```typescript
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://peterawad.com',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}
```

### Robots.txt

Create `app/robots.ts`:

```typescript
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://peterawad.com/sitemap.xml',
  };
}
```

### Canonical URLs

Add canonical URL to prevent duplicate content issues:

```typescript
// In metadata
alternates: {
  canonical: 'https://peterawad.com',
}
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*


### Property 1: Data Rendering Completeness

*For any* CV data object (personal info, work experience, projects, education, skills, social media), all fields defined in the data structure should be rendered in their corresponding UI sections.

**Validates: Requirements 2.1, 3.6, 4.1, 5.2, 14.4**

### Property 2: Required Fields Display

*For any* work experience or project entry, all required fields (company/name, position/description, dates, location, responsibilities/technologies) should be displayed in the rendered component.

**Validates: Requirements 3.2, 4.2**

### Property 3: Chronological Ordering

*For any* collection of work experience entries with dates, they should be displayed in reverse chronological order (most recent first).

**Validates: Requirements 3.1**

### Property 4: Skill Categorization

*For any* set of skills with category labels, they should be grouped and displayed under their respective category headings.

**Validates: Requirements 5.1**

### Property 5: Responsive Grid Adaptation

*For any* screen width, the projects grid should display in the appropriate number of columns: 1 column for widths < 768px, 2 columns for 768px-1024px, and 3 columns for widths > 1024px.

**Validates: Requirements 7.3, 7.4, 7.5**

### Property 6: Responsive Layout Integrity

*For any* screen width between 320px and 2560px, the website should display without horizontal scrolling, layout breaks, or overlapping elements.

**Validates: Requirements 7.1**

### Property 7: Minimum Font Size

*For any* text element at any screen size, the computed font size should be at least 14px.

**Validates: Requirements 7.7**

### Property 8: Navigation Completeness

*For any* navigation items defined in the data structure, they should be rendered as clickable links in the navigation component.

**Validates: Requirements 8.1**

### Property 9: Smooth Scroll Navigation

*For any* navigation link clicked, the page should smoothly scroll to the corresponding section identified by the link's target.

**Validates: Requirements 8.2**

### Property 10: Navigation Persistence

*For any* scroll position on the page, the navigation component should remain visible and accessible.

**Validates: Requirements 8.3, 8.5**

### Property 11: Active Section Highlighting

*For any* scroll position, the navigation should highlight the menu item corresponding to the section currently in the viewport.

**Validates: Requirements 8.4**


### Property 12: Viewport-Triggered Animations

*For any* section with scroll-triggered animations, when the section enters the viewport, the animation should be triggered exactly once.

**Validates: Requirements 9.2, 9.3, 9.4**

### Property 13: Hover Interaction Effects

*For any* interactive card element (project card, experience card), hovering should trigger a visual effect (scale, shadow, or elevation change).

**Validates: Requirements 9.5**

### Property 14: Animation Performance

*For any* animation sequence, the frame rate should remain at or above 30 frames per second during the animation.

**Validates: Requirements 9.6**

### Property 15: Link Attribute Correctness

*For any* email link, it should use the mailto: protocol; for any phone link, it should use the tel: protocol; and for any external link, it should include target="_blank" and rel="noopener noreferrer".

**Validates: Requirements 10.2, 10.3, 10.6**

### Property 16: Conditional Link Rendering

*For any* project with a defined link property, the project card should be clickable and open the link in a new tab; for any project without a link, the card should not be clickable.

**Validates: Requirements 4.10**

### Property 17: Technology Badge Rendering

*For any* project with a technologies array, each technology should be rendered as a visual badge or icon in the project card.

**Validates: Requirements 4.9, 5.3**

### Property 18: Lighthouse Performance Score

*For any* Lighthouse performance audit run on the deployed website, the performance score should be 85 or higher.

**Validates: Requirements 11.1**

### Property 19: Image Optimization

*For any* image element in the application, it should use the Next.js Image component with appropriate width, height, and optimization settings.

**Validates: Requirements 11.3**

### Property 20: Bundle Size Constraint

*For any* production build, the total gzipped JavaScript bundle size should be less than 300KB.

**Validates: Requirements 11.5**

### Property 21: Image Alt Text Completeness

*For any* image element rendered in the application, it should have a non-empty alt attribute providing descriptive alternative text.

**Validates: Requirements 12.1**

### Property 22: Color Contrast Compliance

*For any* text element on the page, the color contrast ratio between the text and its background should be at least 4.5:1 for normal text and 3:1 for large text.

**Validates: Requirements 12.2**

