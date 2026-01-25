import { HeroSection } from "../components/hero-section"

import { ProjectsSection } from "../components/projects-section"
import { CompetitionsSection } from "../components/competitions-section"
import { SkillsSection } from "../components/skills-section"
import { CertificationsSection } from "../components/certifications-section"
import { ContactSection } from "../components/contact-section"
import { Navigation } from "../components/navigation"
import { GridBackground } from "../components/grid-background"

export default function Page() {
  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      <GridBackground />
      <Navigation />
      <HeroSection />
      <ProjectsSection />
      <CompetitionsSection />
      <SkillsSection />
      <CertificationsSection />
      <ContactSection />
    </main>
  )
}
