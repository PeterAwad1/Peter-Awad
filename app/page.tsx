import Grid from './_components/Grid';
import HeroSection from './_components/HeroSection';
import WhyMeSection from './_components/WhyMe';
import AboutSection from './_components/AboutSection';
import ExperienceSection from './_components/ExperienceSection';
import { ProjectsSection } from './_components/ProjectsSection';
import { SkillsSection } from './_components/SkillsSection';
import { ContactSection } from './_components/ContactSection';
import { Footer } from './_components/Footer';
import { workExperience, projects, skills, personalInfo, socialMedia } from '@/data';

export default function Home() {
  return (
    <>
      {/* Skip to main content link for keyboard navigation */}
      <a
        href='#main-content'
        className='sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2'
      >
        Skip to main content
      </a>
      
      <main 
        id='main-content'
        className='relative bg-black-100 flex justify-center items-center flex-col overflow-x-hidden mx-auto sm:px-10 px-5'
      >
        <div className='max-w-7xl w-full'>
          <section id='home' aria-labelledby='hero-heading'>
            <HeroSection />
          </section>
          <section id='about' aria-labelledby='about-heading'>
            <AboutSection />
          </section>
          <section id='experience' aria-labelledby='experience-heading'>
            <ExperienceSection experiences={workExperience} />
          </section>
          <section id='projects' aria-labelledby='projects-heading'>
            <ProjectsSection projects={projects} />
          </section>
          <section id='skills' aria-labelledby='skills-heading'>
            <SkillsSection skillCategories={skills} />
          </section>
          <section id='contact' aria-labelledby='contact-heading'>
            <ContactSection contactInfo={personalInfo} />
          </section>
          <WhyMeSection />
          <Grid />
          <Footer socialMedia={socialMedia} />
        </div>
      </main>
    </>
  );
}
