"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import Skills from "@/components/Skills";
import { personalAutomationWorkflows } from "@/lib/personal-workflows";
import { projectMatchesSkill } from "@/lib/project-skills";
import type { Project } from "@/lib/data";

interface ProjectsProps {
  projects: Project[];
  supplementalSkills?: string[];
}

function getProjectSlug(project: Project): string {
  return project.slug || project.title.toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/\([^)]*\)/g, "")
    .replace(/[&]/g, "")
    .replace(/-+/g, "-")
    .trim();
}

function formatProjectDate(value?: string): string {
  if (!value) return "Not recorded";
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? value
    : new Intl.DateTimeFormat("en-AU", { month: "short", year: "numeric" }).format(date);
}

export default function Projects({ projects, supplementalSkills = [] }: ProjectsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [entryScope, setEntryScope] = useState<"all" | "repositories" | "automations">("all");
  const normalizedQuery = searchQuery.trim().toLowerCase();
  const visibleProjects = projects.filter((project) => {
    const matchesSkills = selectedSkills.length === 0
      || selectedSkills.some((skill) => projectMatchesSkill(project, skill));
    const matchesQuery = !normalizedQuery || [
      project.title,
      project.description,
      project.status,
      ...(project.technologies || []),
      ...(project.topics || []),
    ].filter(Boolean).join(" ").toLowerCase().includes(normalizedQuery);

    return matchesSkills && matchesQuery;
  });
  const visibleAutomations = personalAutomationWorkflows.filter((workflow) => (
    !normalizedQuery || [
      workflow.title,
      workflow.description,
      workflow.detail,
      ...workflow.technologies,
    ].join(" ").toLowerCase().includes(normalizedQuery)
  ));
  const showRepositories = entryScope !== "automations";
  const showAutomations = entryScope !== "repositories";
  const hasProjects = visibleProjects.length > 0;
  const activeIndex = hasProjects ? Math.min(currentIndex, visibleProjects.length - 1) : 0;
  const currentProject = visibleProjects[activeIndex];

  const nextSlide = () => {
    setCurrentIndex(activeIndex === visibleProjects.length - 1 ? 0 : activeIndex + 1);
  };

  const prevSlide = () => {
    setCurrentIndex(activeIndex === 0 ? visibleProjects.length - 1 : activeIndex - 1);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const handleSkillToggle = (skill: string) => {
    setSelectedSkills((currentSkills) =>
      currentSkills.includes(skill)
        ? currentSkills.filter((currentSkill) => currentSkill !== skill)
        : [...currentSkills, skill]
    );
    setCurrentIndex(0);
  };

  return (
    <section id="projects" className="journal-page py-20">
      <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-10 grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end"
        >
          <div>
            <p className="journal-kicker mb-3">Open source / continuously building</p>
            <h2 className="font-journal-serif text-5xl font-semibold text-[var(--journal-ink)] sm:text-6xl">
              Field Index
            </h2>
            <p className="mt-3 font-journal-mono text-xs uppercase tracking-[0.14em] text-[var(--journal-ink-muted)]">Projects · skills · automations</p>
          </div>
          <div className="lg:justify-self-end">
            <p className="max-w-2xl text-lg leading-8 text-[var(--journal-ink-muted)]">
              One evidence system for public repositories, project-mapped skills, case-study context, and the small tools I use in daily work.
            </p>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--journal-ink-muted)]">
              <span className="font-bold text-[var(--journal-ink)]">How it works:</span>{" "}
              Skills are evidence filters, not self-rated badges. Select one or more to see the repositories where they appear, then open a project for its implementation notes and status.
            </p>
          </div>
        </motion.div>

        <div className="journal-card mb-6 grid gap-3 rounded-md p-3 md:grid-cols-[1fr_auto]">
          <label className="flex min-h-12 items-center gap-3 rounded-md border border-[var(--journal-rule)] bg-[var(--journal-paper)] px-4">
            <span aria-hidden="true" className="font-journal-mono text-[var(--journal-ink-muted)]">⌕</span>
            <span className="sr-only">Search projects and automations</span>
            <input
              type="search"
              value={searchQuery}
              onChange={(event) => {
                setSearchQuery(event.target.value);
                setCurrentIndex(0);
              }}
              placeholder="Search projects, technologies, or topics..."
              className="w-full bg-transparent py-3 text-sm text-[var(--journal-ink)] placeholder:text-[var(--journal-ink-muted)] focus:outline-none"
            />
          </label>
          <div className="flex flex-wrap gap-2" aria-label="Field index scope">
            {([
              ["all", "All entries"],
              ["repositories", "Public repos"],
              ["automations", "Alter Ego Builds"],
            ] as const).map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => setEntryScope(value)}
                aria-pressed={entryScope === value}
                className={`rounded-md border px-4 py-3 font-journal-mono text-xs font-bold transition-colors ${
                  entryScope === value
                    ? "border-[var(--journal-leather)] bg-[var(--journal-leather)] text-[#fffaf0]"
                    : "border-[var(--journal-rule)] text-[var(--journal-ink-muted)] hover:border-[var(--journal-rule-strong)]"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {showRepositories && <div className="journal-card overflow-hidden rounded-md">
          <div className="hidden grid-cols-[80px_1fr_1fr_160px] gap-4 border-b border-[var(--journal-rule-strong)] bg-[var(--journal-paper)] px-5 py-4 font-journal-mono text-[10px] font-semibold uppercase tracking-wider text-[var(--journal-ink-muted)] lg:grid">
            <span>Source</span><span>Capability filter</span><span>Selected field note</span><span>Provenance</span>
          </div>
          <div className="grid lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
            <Skills
              projects={projects}
              supplementalSkills={supplementalSkills}
              selectedSkills={selectedSkills}
              onSkillToggle={handleSkillToggle}
              onClearSkills={() => {
                setSelectedSkills([]);
                setCurrentIndex(0);
              }}
            />

            <div
              className="journal-grid border-t border-[var(--journal-rule)] p-5 sm:p-6 lg:border-l lg:border-t-0"
              aria-labelledby="repository-evidence-heading"
            >
              <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="journal-kicker text-[var(--journal-verification)]">
                    Public repository evidence
                  </p>
                  <h3 id="repository-evidence-heading" className="mt-2 font-journal-serif text-3xl font-semibold text-[var(--journal-ink)]">
                    Proof-of-Work Lab
                  </h3>
                </div>
                <p className="max-w-xs font-journal-mono text-xs text-[var(--journal-ink-muted)] sm:text-right">
                  Generated from public, original repositories at build time.
                </p>
              </div>

              {!hasProjects && (
                <div className="journal-card rounded-md p-8 text-center">
                  <p className="text-[var(--journal-ink-muted)]">
                    {projects.length === 0
                      ? "No GitHub repositories are currently tagged for the portfolio project feed."
                      : "No projects match the selected skills."}
                  </p>
                </div>
              )}

              {hasProjects && (
                <div>
              <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-wrap gap-3 font-journal-mono text-xs text-[var(--journal-ink-muted)]">
                  <span>{visibleProjects.length} {visibleProjects.length === 1 ? "repository" : "repositories"}</span>
                  <span>{activeIndex + 1} of {visibleProjects.length}</span>
                  <span>{selectedSkills.length} active {selectedSkills.length === 1 ? "filter" : "filters"}</span>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={prevSlide}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-md bg-[var(--journal-leather)] text-[#fffaf0] transition-transform hover:-translate-y-0.5"
                    aria-label="Previous project"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={nextSlide}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-md bg-[var(--journal-leather)] text-[#fffaf0] transition-transform hover:-translate-y-0.5"
                    aria-label="Next project"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>

              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="journal-card relative rounded-md border-l-4 border-l-[var(--journal-verification)] p-6"
              >
                <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-[var(--journal-rule)] pb-4 font-journal-mono text-[10px] uppercase tracking-[0.12em] text-[var(--journal-ink-muted)]">
                  <span>GitHub source / record {String(activeIndex + 1).padStart(2, "0")}</span>
                  <span>{currentProject.pushedAt || currentProject.updatedAt ? `Updated ${formatProjectDate(currentProject.pushedAt || currentProject.updatedAt)}` : "Public repository"}</span>
                </div>
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
                  <div>
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <h3 className="font-journal-serif text-xl font-semibold text-[var(--journal-ink)] sm:text-2xl">
                        {currentProject.title}
                      </h3>
                      <span className="rounded-sm border border-[var(--journal-rule)] px-2 py-1 font-journal-mono text-xs font-semibold text-[var(--journal-ink-muted)]">
                        {currentProject.status || (currentProject.archived ? "Archived repository" : "Public repository")}
                      </span>
                    </div>
                    <p className="leading-relaxed text-[var(--journal-ink-muted)]">
                      {currentProject.description}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 lg:justify-end">
                    {currentProject.technologies.slice(0, 10).map((tech) => (
                      <span
                        key={tech}
                        className="rounded-sm border border-[var(--journal-rule)] bg-[var(--journal-paper)] px-3 py-1 font-journal-mono text-xs font-medium text-[var(--journal-ink-muted)]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {currentProject.technicalChallenge && (
                  <div className="mt-6 rounded-md border border-dashed border-[var(--journal-rule-strong)] bg-[var(--journal-paper)] p-4">
                    <h4 className="mb-2 font-journal-mono text-xs font-semibold uppercase tracking-wide text-[var(--journal-ink)]">
                      Technical Challenge
                    </h4>
                    <p className="text-sm leading-relaxed text-[var(--journal-ink-muted)]">
                      {currentProject.technicalChallenge}
                    </p>
                  </div>
                )}

                <div className="mt-5 flex flex-wrap gap-3">
                  <Link
                    href={`/projects/${getProjectSlug(currentProject)}`}
                    aria-label={`Read project notes for ${currentProject.title}`}
                    className="inline-flex items-center rounded-md bg-[var(--journal-leather)] px-4 py-2 text-sm font-semibold text-[#fffaf0] transition-transform hover:-translate-y-0.5"
                  >
                    Read {currentProject.title}
                  </Link>
                  <a
                    href={currentProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open source code for ${currentProject.title}`}
                    className="inline-flex items-center rounded-md border border-[var(--journal-rule-strong)] px-4 py-2 text-sm font-semibold text-[var(--journal-ink)]"
                  >
                    Source Code
                  </a>
                </div>
              </motion.div>

              <div className="mt-4 flex flex-col justify-between gap-2 border-y border-[var(--journal-rule)] bg-[var(--journal-paper)] px-4 py-3 font-journal-mono text-[10px] uppercase tracking-[0.1em] text-[var(--journal-ink-muted)] sm:flex-row">
                <span>Provenance: public original repository</span>
                <span>{currentProject.stars ?? 0} stars · {currentProject.forks ?? 0} forks</span>
              </div>

              <div className="flex justify-center mt-6 space-x-2">
                {visibleProjects.map((project, index) => (
                  <button
                    key={project.githubUrl || project.title}
                    onClick={() => goToSlide(index)}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full"
                    aria-label={`Go to project ${index + 1}`}
                  >
                    <span
                      className={`block h-3 w-3 rounded-full transition-colors ${
                        index === activeIndex
                          ? "bg-[var(--journal-verification)]"
                          : "bg-[var(--journal-rule-strong)] hover:bg-[var(--journal-brass)]"
                      }`}
                    />
                  </button>
                ))}
              </div>

              <div className="mt-6 grid max-h-36 grid-cols-2 gap-2 overflow-y-auto pr-1 md:grid-cols-4">
                {visibleProjects.map((project, index) => (
                  <button
                    key={project.githubUrl || project.title}
                    onClick={() => goToSlide(index)}
                    className={`min-h-11 rounded-md p-3 text-xs font-medium transition-colors ${
                      index === activeIndex
                        ? "bg-[var(--journal-leather)] text-[#fffaf0]"
                        : "bg-[var(--journal-paper-raised)] text-[var(--journal-ink-muted)] hover:bg-[var(--journal-paper)]"
                    }`}
                    aria-label={`Show ${project.title}`}
                  >
                    {project.title.length > 20 ? `${project.title.substring(0, 20)}...` : project.title}
                  </button>
                ))}
              </div>
                </div>
              )}
            </div>
          </div>
        </div>}

        {showAutomations && <div id="workflows" className="mt-12 border-t border-[var(--journal-rule-strong)] pt-10">
          <div className="mb-5 max-w-3xl">
            <p className="journal-kicker text-[var(--journal-verification)]">
              Alter Ego Builds
            </p>
            <h3 className="mt-2 font-journal-serif text-3xl font-semibold text-[var(--journal-ink)]">
              Weekend Build Sprints
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--journal-ink-muted)]">
              Small tools, daily use. Most start as a weekend build sprint: find one repeated annoyance, make the smallest reliable fix, and keep it close to the workflow it supports.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {visibleAutomations.map((workflow, workflowIndex) => (
              <motion.article
                key={workflow.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: workflowIndex * 0.08 }}
                viewport={{ once: true }}
                className="journal-card flex h-full flex-col rounded-md border-l-4 border-l-[var(--journal-brass)] p-6"
              >
                <p className="font-journal-mono text-xs font-bold uppercase tracking-[0.16em] text-[var(--journal-verification)]">
                  {workflow.label}
                </p>
                <h4 className="font-journal-serif text-xl font-semibold text-[var(--journal-ink)]">
                  {workflow.title}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-[var(--journal-ink-muted)]">
                  {workflow.description}
                </p>
                <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${workflow.title} technologies`}>
                  {workflow.technologies.map((technology) => (
                    <li
                      key={technology}
                      className="rounded-sm border border-[var(--journal-rule)] px-3 py-1 font-journal-mono text-xs font-semibold text-[var(--journal-ink-muted)]"
                    >
                      {technology}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 rounded-md border border-dashed border-[var(--journal-rule-strong)] bg-[var(--journal-paper)] p-4">
                  <p className="font-journal-mono text-xs font-semibold uppercase tracking-wide text-[var(--journal-ink-muted)]">
                    How it works
                  </p>
                  <p className="mt-2 text-sm font-medium leading-relaxed text-[var(--journal-ink)]">
                    {workflow.detail}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>}
      </div>
    </section>
  );
}
