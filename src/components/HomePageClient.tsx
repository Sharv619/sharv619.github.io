"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import { certifications } from "@/lib/certifications";
import { getOrderedFlagshipCaseStudies } from "@/lib/flagship-case-studies";
import type { Project } from "@/lib/data";

const Projects = dynamic(() => import("@/components/Projects"), {
  loading: () => <div className="py-20 text-center">Loading Projects...</div>
});
const FeaturedCaseStudies = dynamic(() => import("@/components/FeaturedCaseStudies"), {
  loading: () => <div className="py-20 text-center">Loading Case Studies...</div>
});
const Skills = dynamic(() => import("@/components/Skills"), {
  loading: () => <div className="py-20 text-center">Loading Skills...</div>
});
const Certifications = dynamic(() => import("@/components/Certifications"));
const LinkedInPosts = dynamic(() => import("@/components/LinkedInPosts"));

interface HomePageClientProps {
  projects: Project[];
}

export default function HomePageClient({ projects }: HomePageClientProps) {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const certificationSkills = certifications.flatMap((certification) => certification.skills || []);
  const caseStudies = getOrderedFlagshipCaseStudies().slice(0, 3);

  const handleSkillToggle = (skill: string) => {
    setSelectedSkills(prev =>
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  return (
    <div className="portfolio-scroll-shell min-h-screen">
      <Navigation />
      <Hero />
      <FeaturedCaseStudies caseStudies={caseStudies} />
      <About />
      <Experience />
      <Projects selectedSkills={selectedSkills} projects={projects} />
      <Skills
        projects={projects}
        supplementalSkills={certificationSkills}
        selectedSkills={selectedSkills}
        onSkillToggle={handleSkillToggle}
      />
      <Certifications />
      <LinkedInPosts />
      <Contact />
    </div>
  );
}
