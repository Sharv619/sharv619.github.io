"use client";

import dynamic from "next/dynamic";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import WeekendGrindSection from "@/components/WeekendGrindSection";
import { certifications } from "@/lib/certifications";
import { getOrderedFlagshipCaseStudies } from "@/lib/flagship-case-studies";
import type { Project } from "@/lib/data";

const Projects = dynamic(() => import("@/components/Projects"), {
  loading: () => <div className="py-20 text-center">Loading Projects...</div>,
});
const FeaturedCaseStudies = dynamic(() => import("@/components/FeaturedCaseStudies"), {
  loading: () => <div className="py-20 text-center">Loading Case Studies...</div>,
});
const Certifications = dynamic(() => import("@/components/Certifications"));

interface HomePageClientProps {
  projects: Project[];
}

export default function HomePageClient({ projects }: HomePageClientProps) {
  const certificationSkills = certifications.flatMap((certification) => certification.skills || []);
  const caseStudies = getOrderedFlagshipCaseStudies().slice(0, 3);

  return (
    <div className="portfolio-scroll-shell min-h-screen">
      <Navigation />
      <Hero />
      <FeaturedCaseStudies caseStudies={caseStudies} />
      <About />
      <Experience />
      <Projects
        projects={projects}
        supplementalSkills={certificationSkills}
      />
      <Certifications />
      <WeekendGrindSection />
      <Contact />
    </div>
  );
}
