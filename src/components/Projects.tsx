"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import Skills from "@/components/Skills";
import { personalAutomationWorkflows } from "@/lib/personal-workflows";
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

export default function Projects({ projects, supplementalSkills = [] }: ProjectsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const visibleProjects = selectedSkills.length === 0
    ? projects
    : projects.filter((project) =>
        project.technologies.some((tech) =>
          selectedSkills.some((skill) => tech.toLowerCase() === skill.toLowerCase())
        )
      );
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
    <section id="projects" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Projects, Skills & Weekend Builds
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Explore public GitHub work, filter it by the technologies behind it, and see the random weekend builds I ship when momentum hits.
          </p>
          <div className="w-24 h-1 bg-blue-600 mx-auto mt-6" />
        </motion.div>

        <div className="overflow-hidden rounded-xl border border-stone-200 bg-white shadow-lg dark:border-white/10 dark:bg-gray-900">
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
              className="border-t border-stone-200 bg-gray-50 p-5 dark:border-white/10 dark:bg-gray-800 sm:p-6 lg:border-l lg:border-t-0"
              aria-labelledby="repository-evidence-heading"
            >
              <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-700 dark:text-blue-300">
                    Repository evidence
                  </p>
                  <h3 id="repository-evidence-heading" className="mt-2 text-2xl font-bold text-stone-950 dark:text-white">
                    GitHub Project Lab
                  </h3>
                </div>
                <p className="max-w-xs text-sm text-stone-500 dark:text-stone-400 sm:text-right">
                  Generated from public, original repositories at build time.
                </p>
              </div>

              {!hasProjects && (
                <div className="rounded-lg border border-gray-200 bg-white p-8 text-center dark:border-gray-700 dark:bg-gray-900">
                  <p className="text-gray-600 dark:text-gray-300">
                    {projects.length === 0
                      ? "No GitHub repositories are currently tagged for the portfolio project feed."
                      : "No projects match the selected skills."}
                  </p>
                </div>
              )}

              {hasProjects && (
                <div>
              <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-wrap gap-3 text-sm text-gray-500 dark:text-gray-400">
                  <span>{visibleProjects.length} {visibleProjects.length === 1 ? "repository" : "repositories"}</span>
                  <span>{activeIndex + 1} of {visibleProjects.length}</span>
                  <span>{selectedSkills.length} active {selectedSkills.length === 1 ? "filter" : "filters"}</span>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={prevSlide}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Previous project"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={nextSlide}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 bg-white dark:bg-gray-900"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
                  <div>
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
                        {currentProject.title}
                      </h3>
                      {currentProject.archived && (
                        <span className="rounded-full bg-amber-100 px-2 py-1 text-xs font-semibold text-amber-800 dark:bg-amber-900 dark:text-amber-200">
                          Archived
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {currentProject.description}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 lg:justify-end">
                    {currentProject.technologies.slice(0, 10).map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {currentProject.technicalChallenge && (
                  <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <h4 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-700 dark:text-gray-200">
                      Technical Challenge
                    </h4>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                      {currentProject.technicalChallenge}
                    </p>
                  </div>
                )}

                <div className="mt-5 flex flex-wrap gap-3">
                  <Link
                    href={`/projects/${getProjectSlug(currentProject)}`}
                    aria-label={`Read more about ${currentProject.title}`}
                    className="inline-flex items-center rounded-md bg-gray-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
                  >
                    Read More
                  </Link>
                  <a
                    href={currentProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open source code for ${currentProject.title}`}
                    className="inline-flex items-center rounded-md border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-800 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-800"
                  >
                    Source Code
                  </a>
                </div>
              </motion.div>

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
                          ? "bg-blue-600"
                          : "bg-gray-300 hover:bg-blue-400 dark:bg-gray-600"
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
                        ? "bg-blue-600 text-white"
                        : "bg-white text-gray-600 hover:bg-blue-50 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-700"
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

          <div className="border-t border-stone-200 bg-white px-5 py-4 dark:border-white/10 dark:bg-gray-900 sm:px-6">
            <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-300">
              <span className="font-bold text-stone-900 dark:text-white">How it works:</span>{" "}
              Select a skill to filter the GitHub projects. Pick multiple to broaden results, then open a project to explore its full stack and implementation details.
            </p>
          </div>
        </div>

        <div id="workflows" className="mt-12">
          <div className="mb-5 max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-teal-700 dark:text-teal-300">
              Weekend grind
            </p>
            <h3 className="mt-2 text-2xl font-bold text-stone-950 dark:text-white">
              Weekend Build Sprints
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-stone-600 dark:text-stone-300">
              Small weekend sprints are my work mode: find one annoying task, wire together a practical fix, and ship it while the momentum is there. That build-and-verify rush keeps me sharp.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {personalAutomationWorkflows.map((workflow, workflowIndex) => (
              <motion.article
                key={workflow.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: workflowIndex * 0.08 }}
                viewport={{ once: true }}
                className="flex h-full flex-col rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900"
              >
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-teal-700 dark:text-teal-300">
                  {workflow.label}
                </p>
                <h4 className="text-lg font-bold text-stone-950 dark:text-white">
                  {workflow.title}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-stone-600 dark:text-stone-300">
                  {workflow.description}
                </p>
                <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${workflow.title} technologies`}>
                  {workflow.technologies.map((technology) => (
                    <li
                      key={technology}
                      className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                    >
                      {technology}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-300">
                    How it works
                  </p>
                  <p className="mt-2 text-sm font-medium leading-relaxed text-gray-800 dark:text-gray-100">
                    {workflow.detail}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
