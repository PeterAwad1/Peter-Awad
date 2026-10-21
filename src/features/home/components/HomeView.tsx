import { AboutSection } from "@/components/sections/about-section";
import { ApproachSection } from "@/components/sections/approach-section";
import { ContactSection } from "@/components/sections/contact-section";
import { CraftSection } from "@/components/sections/craft-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { HeroSection } from "@/components/sections/hero-section";
import { MoreWorkSection } from "@/components/sections/more-work-section";
import { SelectedWorkSection } from "@/components/sections/selected-work-section";

export async function HomeView() {
  return (
    <main id="main-content">
      <HeroSection />
      <AboutSection />
      <SelectedWorkSection />
      <MoreWorkSection />
      <ExperienceSection />
      <ApproachSection />
      <CraftSection />
      <ContactSection />
    </main>
  );
}
