"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import HimanshuEdge from "@/components/HimanshuEdge";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import { certifications } from "@/lib/certifications";
import type { Project } from "@/lib/data";

const Projects = dynamic(() => import("@/components/Projects"), {
  ssr: false,
  loading: () => <div className="py-20 text-center">Loading Projects...</div>
});
const Skills = dynamic(() => import("@/components/Skills"), {
  ssr: false,
  loading: () => <div className="py-20 text-center">Loading Skills...</div>
});
const Certifications = dynamic(() => import("@/components/Certifications"), {
  ssr: false,
});

interface HomePageClientProps {
  projects: Project[];
}

export default function HomePageClient({ projects }: HomePageClientProps) {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const certificationSkills = certifications.flatMap((certification) => certification.skills || []);

  const handleSkillToggle = (skill: string) => {
    setSelectedSkills(prev =>
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <HimanshuEdge />
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
      <Contact />
    </div>
  );
}
