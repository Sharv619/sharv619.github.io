"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import type { Project } from "@/lib/data";

interface ProjectsProps {
  selectedSkills: string[];
  projects: Project[];
}

function getProjectSlug(project: Project): string {
  return project.slug || project.title.toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/\([^)]*\)/g, "")
    .replace(/[&]/g, "")
    .replace(/-+/g, "-")
    .trim();
}

export default function Projects({ selectedSkills, projects }: ProjectsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleProjects = selectedSkills.length === 0
    ? projects
    : projects.filter((project) =>
        project.technologies.some((tech) =>
          selectedSkills.some((skill) => tech.toLowerCase().includes(skill.toLowerCase()))
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
            GitHub Project Lab
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Automated project cards generated from public GitHub repositories at build time. Use the skills below to filter projects by technology.
          </p>
          <div className="w-24 h-1 bg-blue-600 mx-auto mt-6" />
        </motion.div>

        {!hasProjects && (
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 text-center shadow-lg">
            <p className="text-gray-600 dark:text-gray-300">
              {projects.length === 0
                ? "No GitHub repositories are currently tagged for the portfolio project feed."
                : "No projects match the selected skills."}
            </p>
          </div>
        )}

        {hasProjects && (
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg">
            <div className="p-8">
              <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-wrap gap-3 text-sm text-gray-500 dark:text-gray-400">
                  <span>{visibleProjects.length} repositories</span>
                  <span>{activeIndex + 1} of {visibleProjects.length}</span>
                  <span>{selectedSkills.length} active filters</span>
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
          </div>
        )}
      </div>
    </section>
  );
}
