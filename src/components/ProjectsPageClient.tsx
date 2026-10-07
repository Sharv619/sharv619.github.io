"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import Contact from "@/components/Contact";
import EvidenceTab from "@/components/EvidenceTab";
import FeaturedCaseStudies from "@/components/FeaturedCaseStudies";
import Navigation from "@/components/Navigation";
import { slugify, type Project } from "@/lib/data";
import { getOrderedFlagshipCaseStudies } from "@/lib/flagship-case-studies";

interface ProjectsPageClientProps {
  projects: Project[];
}

export default function ProjectsPageClient({ projects }: ProjectsPageClientProps) {
  const caseStudies = getOrderedFlagshipCaseStudies();

  return (
    <div className="journal-shell min-h-screen">
      <Navigation />
      <section id="projects-hero" className="journal-grid border-b border-[var(--journal-rule)] px-4 pb-16 pt-32 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_0.65fr] lg:items-end">
          <div>
            <p className="journal-kicker">Field index / automatically refreshed</p>
            <h1 className="mt-4 max-w-4xl font-journal-serif text-5xl font-semibold leading-[0.98] sm:text-7xl">Public work, indexed from the source.</h1>
            <p className="mt-6 max-w-3xl text-xl leading-8 text-[var(--journal-muted)]">Case studies explain the constraints. The repository feed keeps the wider trail of prototypes, tools, architecture notes, and exact evidence connected to GitHub.</p>
          </div>
          <div className="journal-card p-6">
            <p className="journal-kicker">Ingestion route</p>
            <div className="mt-5 space-y-3 font-journal-mono text-sm">
              <p>GitHub repositories</p><p className="text-[var(--journal-red)]">↓</p><p>README + manifests + architecture</p><p className="text-[var(--journal-red)]">↓</p><p>Portfolio + Repo RAG</p>
            </div>
          </div>
        </div>
      </section>

      <FeaturedCaseStudies caseStudies={caseStudies} compact />

      <section id="projects-grid" className="journal-page py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col gap-4 border-b border-[var(--journal-rule)] pb-7 sm:flex-row sm:items-end sm:justify-between">
            <div><p className="journal-kicker">Repository ledger</p><h2 className="mt-3 font-journal-serif text-4xl font-semibold">Every public entry</h2></div>
            <p className="font-journal-mono text-xs text-[var(--journal-muted)]">{projects.length} records · generated at build time</p>
          </div>
          {projects.length === 0 ? (
            <div className="journal-card p-8 text-center text-[var(--journal-muted)]">No public repositories are currently available in the project feed.</div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {projects.map((project, index) => (
                <motion.article key={project.githubUrl || project.title} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: Math.min(index * 0.03, 0.18) }} viewport={{ once: true }} className="journal-card flex flex-col border-l-4 border-l-[var(--journal-red)] p-6">
                  <div className="flex items-start justify-between gap-3"><p className="journal-kicker">Entry {String(index + 1).padStart(2, "0")}</p><span className="journal-stamp px-2 py-1 text-[9px]">{project.archived ? "Archived" : "Public"}</span></div>
                  <h3 className="mt-4 font-journal-serif text-2xl font-semibold">{project.title}</h3>
                  <p className="mt-4 line-clamp-4 flex-1 text-sm leading-6 text-[var(--journal-muted)]">{project.description}</p>
                  <div className="mt-5 flex flex-wrap gap-2">{project.technologies.slice(0, 5).map((tech) => <span key={tech} className="rounded border border-[var(--journal-rule)] px-2 py-1 font-journal-mono text-[10px]">{tech}</span>)}</div>
                  {project.evidenceReferences?.[0] ? <div className="mt-5"><EvidenceTab evidence={project.evidenceReferences[0]} /></div> : null}
                  <div className="mt-6 flex flex-wrap gap-3 border-t border-[var(--journal-rule)] pt-4 font-journal-mono text-xs font-semibold">
                    <Link href={`/projects/${project.slug}`} className="underline underline-offset-4">Field note</Link>
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">GitHub ↗</a>
                    <Link href={`/projects/${project.slug || slugify(project.title)}/case-study`} className="underline underline-offset-4">Case study</Link>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>
      <Contact />
    </div>
  );
}
