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
    <section id="projects" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Projects
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </motion.div>

        {!hasProjects && (
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 text-center">
            <p className="text-gray-600 dark:text-gray-300">
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
            className="bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg"
          >
            <div className="p-8">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {activeIndex + 1} of {visibleProjects.length}
                </span>
                <div className="flex space-x-2">
                  <button
                    onClick={prevSlide}
                    className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Previous project"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={nextSlide}
                    className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Next project"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                {currentProject.title}
                {currentProject.archived && (
                  <span className="ml-3 align-middle text-xs px-2 py-1 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200">
                    Archived
                  </span>
                )}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed text-lg">
                {currentProject.description}
              </p>

              {currentProject.technicalChallenge && (
                <div className="mb-6">
                  <h4 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Technical Challenge:
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {currentProject.technicalChallenge}
                  </p>
                </div>
              )}

              <div className="mb-6">
                <h4 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Technologies:
                </h4>
                <div className="flex flex-wrap gap-3">
                  {currentProject.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex space-x-4">
                <Link
                  href={`/projects/${getProjectSlug(currentProject)}`}
                  className="flex-1 text-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300 inline-block font-medium"
                >
                  Read More
                </Link>
                <a
                  href={currentProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-300 inline-block font-medium"
                >
                  Source Code
                </a>
              </div>
            </div>
          </motion.div>

          {/* Dot Navigation */}
          <div className="flex justify-center mt-8 space-x-2">
            {visibleProjects.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  index === activeIndex
                    ? 'bg-blue-600'
                    : 'bg-gray-300 dark:bg-gray-600 hover:bg-blue-400'
                }`}
                aria-label={`Go to project ${index + 1}`}
              />
            ))}
          </div>

          {/* Project List Preview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-8">
            {visibleProjects.map((project, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`p-3 rounded-md text-xs font-medium transition-colors duration-300 ${
                  index === activeIndex
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900'
                }`}
              >
                {project.title.length > 20 ? `${project.title.substring(0, 20)}...` : project.title}
              </button>
            ))}
          </div>
        </div>
        )}
      </div>
    </section>
  );
}
