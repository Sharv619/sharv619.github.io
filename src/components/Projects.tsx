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
    .replace(/\s+/g, '-')
    .replace(/\([^)]*\)/g, '') // Remove parentheses
    .replace(/[&]/g, '') // Remove &
    .replace(/-+/g, '-') // Replace multiple hyphens with single
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

  const nextSlide = () => {
    setCurrentIndex(activeIndex === visibleProjects.length - 1 ? 0 : activeIndex + 1);
  };

  const prevSlide = () => {
    setCurrentIndex(activeIndex === 0 ? visibleProjects.length - 1 : activeIndex - 1);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const currentProject = visibleProjects[activeIndex];

  return (
    <section id="projects" className="flex items-center bg-white py-20 dark:bg-[#151513]">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-[0.62fr_1.38fr] lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="lg:self-center"
        >
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-indigo-700 dark:text-indigo-300">
            GitHub lab
          </p>
          <h2 className="text-balance text-4xl font-black leading-tight text-stone-950 sm:text-5xl dark:text-white">
            A workbench, not a trophy shelf.
          </h2>
          <p className="mt-5 text-lg leading-8 text-stone-700 dark:text-stone-300">
            Automated project cards generated from public GitHub repositories at build time. These show builder breadth; flagship case studies above provide deeper hiring proof.
          </p>
          {hasProjects && (
            <div className="mt-8 grid grid-cols-3 gap-3">
              <div className="border-l-2 border-indigo-500 bg-[#f7f4ed] p-3 dark:bg-white/5">
                <p className="text-2xl font-black text-stone-950 dark:text-white">{visibleProjects.length}</p>
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-stone-500 dark:text-stone-400">repos</p>
              </div>
              <div className="border-l-2 border-teal-500 bg-[#f7f4ed] p-3 dark:bg-white/5">
                <p className="text-2xl font-black text-stone-950 dark:text-white">{activeIndex + 1}</p>
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-stone-500 dark:text-stone-400">active</p>
              </div>
              <div className="border-l-2 border-rose-500 bg-[#f7f4ed] p-3 dark:bg-white/5">
                <p className="text-2xl font-black text-stone-950 dark:text-white">{selectedSkills.length}</p>
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-stone-500 dark:text-stone-400">filters</p>
              </div>
            </div>
          )}
        </motion.div>

        <div>
        {!hasProjects && (
          <div className="rounded-lg border border-stone-300 bg-[#f7f4ed] p-8 text-center dark:border-white/10 dark:bg-white/5">
            <p className="text-stone-700 dark:text-stone-300">
              {projects.length === 0
                ? "No GitHub repositories are currently tagged for the portfolio project feed."
                : "No projects match the selected skills."}
            </p>
          </div>
        )}

        {hasProjects && (
        <div className="relative">
          {/* Main Project Card */}
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="overflow-hidden rounded-lg border border-stone-300 bg-[#f7f4ed] shadow-lg dark:border-white/10 dark:bg-[#101010]"
          >
            <div className="p-6 sm:p-8">
              <div className="flex items-center justify-between mb-4">
                <span className="rounded-md bg-stone-950 px-3 py-1 text-sm font-black text-white dark:bg-white dark:text-stone-950">
                  {activeIndex + 1} of {visibleProjects.length}
                </span>
                <div className="flex space-x-2">
                  <button
                    onClick={prevSlide}
                    className="rounded-md bg-stone-950 p-2 text-white transition-colors duration-300 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-white dark:text-stone-950 dark:hover:bg-indigo-200"
                    aria-label="Previous project"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={nextSlide}
                    className="rounded-md bg-stone-950 p-2 text-white transition-colors duration-300 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-white dark:text-stone-950 dark:hover:bg-indigo-200"
                    aria-label="Next project"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>

              <h3 className="mb-4 text-3xl font-black leading-tight text-stone-950 dark:text-white">
                {currentProject.title}
                {currentProject.archived && (
                  <span className="ml-3 align-middle text-xs px-2 py-1 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200">
                    Archived
                  </span>
                )}
              </h3>
              <p className="mb-6 max-h-40 overflow-y-auto pr-2 text-lg leading-8 text-stone-700 dark:text-stone-300">
                {currentProject.description}
              </p>

              {currentProject.technicalChallenge && (
                <div className="mb-6">
                  <h4 className="mb-2 text-sm font-black uppercase tracking-[0.16em] text-stone-500 dark:text-stone-400">
                    Technical Challenge:
                  </h4>
                  <p className="border-l-2 border-indigo-500 pl-4 leading-7 text-stone-700 dark:text-stone-300">
                    {currentProject.technicalChallenge}
                  </p>
                </div>
              )}

              <div className="mb-6">
                <h4 className="mb-3 text-sm font-black uppercase tracking-[0.16em] text-stone-500 dark:text-stone-400">
                  Technologies:
                </h4>
                <div className="flex flex-wrap gap-3">
                  {currentProject.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="rounded-md bg-white px-3 py-2 text-sm font-bold text-indigo-800 shadow-sm dark:bg-white/10 dark:text-indigo-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href={`/projects/${getProjectSlug(currentProject)}`}
                  className="inline-block flex-1 rounded-md bg-stone-950 px-6 py-3 text-center font-bold text-white transition-colors duration-300 hover:bg-indigo-700 dark:bg-white dark:text-stone-950 dark:hover:bg-indigo-200"
                >
                  Read More
                </Link>
                <a
                  href={currentProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block flex-1 rounded-md border border-stone-300 px-6 py-3 text-center font-bold text-stone-700 transition-colors duration-300 hover:bg-white dark:border-white/15 dark:text-stone-300 dark:hover:bg-white/10"
                >
                  Source Code
                </a>
              </div>
            </div>
          </motion.div>

          {/* Dot Navigation */}
          <div className="mt-6 flex justify-center space-x-2">
            {visibleProjects.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  index === activeIndex
                    ? 'bg-indigo-600'
                    : 'bg-stone-300 hover:bg-indigo-400 dark:bg-white/20'
                }`}
                aria-label={`Go to project ${index + 1}`}
              />
            ))}
          </div>

          {/* Project List Preview */}
          <div className="mt-6 grid max-h-36 grid-cols-2 gap-2 overflow-y-auto pr-1 md:grid-cols-4">
            {visibleProjects.map((project, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`p-3 rounded-md text-xs font-medium transition-colors duration-300 ${
                  index === activeIndex
                    ? 'bg-indigo-700 text-white'
                    : 'bg-stone-100 text-stone-600 hover:bg-indigo-100 dark:bg-white/5 dark:text-stone-300 dark:hover:bg-indigo-900'
                }`}
              >
                {project.title.length > 20 ? `${project.title.substring(0, 20)}...` : project.title}
              </button>
            ))}
          </div>
        </div>
        )}
        </div>
      </div>
    </section>
  );
}
