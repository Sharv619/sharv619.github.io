"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface ProjectsSectionProps {
  projects: Array<{
    title: string;
    description: string;
    techStack: string[];
    achievements: string[];
    githubUrl?: string;
    liveUrl?: string;
    updatedAt?: string;
    status?: string;
    stats?: string;
  }>;
  sourceLabel?: string;
}

function formatDate(value?: string): string {
  if (!value) {
    return "";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat("en-AU", {
    month: "short",
    year: "numeric",
  }).format(date);
}

export default function ProjectsSection({ projects, sourceLabel = "Curated resume projects" }: ProjectsSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  };

  const currentProject = projects[currentIndex];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8"
    >
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
          <svg className="w-6 h-6 mr-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          Current GitHub Projects
        </h2>
        <span className="w-fit rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800 dark:bg-green-900/40 dark:text-green-200">
          {sourceLabel}
        </span>
      </div>

      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {currentIndex + 1} of {projects.length}
          </span>
          <div className="flex space-x-2">
            <button
              onClick={prevSlide}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 text-white transition-colors hover:bg-blue-700"
              aria-label="Previous project"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 text-white transition-colors hover:bg-blue-700"
              aria-label="Next project"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="border border-gray-200 dark:border-gray-700 rounded-lg p-6"
        >
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
            <div>
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {currentProject.title}
                </h3>
                {currentProject.status && (
                  <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-700 dark:bg-gray-700 dark:text-gray-200">
                    {currentProject.status}
                  </span>
                )}
              </div>
              <p className="text-gray-600 dark:text-gray-300 italic">
                {currentProject.description}
              </p>
              <div className="mt-3 flex flex-wrap gap-3 text-sm text-gray-500 dark:text-gray-400">
                {currentProject.updatedAt && (
                  <span>Updated {formatDate(currentProject.updatedAt)}</span>
                )}
                {currentProject.stats && (
                  <span>{currentProject.stats}</span>
                )}
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {currentProject.techStack.map((tech, techIndex) => (
                <span
                  key={techIndex}
                  className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentProject.achievements.map((achievement, achievementIndex) => (
              <div
                key={achievementIndex}
                className="flex items-start space-x-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <div className="flex-shrink-0 w-2 h-2 bg-green-600 dark:bg-green-400 rounded-full mt-2" />
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                  {achievement}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            {currentProject.githubUrl && currentProject.githubUrl !== "#" && (
              <a
                href={currentProject.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open GitHub repository for ${currentProject.title}`}
                className="inline-flex items-center rounded-md bg-gray-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
              >
                GitHub
              </a>
            )}
            {currentProject.liveUrl && currentProject.liveUrl !== "#" && (
              <a
                href={currentProject.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open live project for ${currentProject.title}`}
                className="inline-flex items-center rounded-md border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-800 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
              >
                Live
              </a>
            )}
          </div>
        </motion.div>

        <div className="flex justify-center mt-6 space-x-2">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full"
              aria-label={`Go to project ${index + 1}`}
            >
              <span
                className={`block h-3 w-3 rounded-full transition-colors ${
                  index === currentIndex
                    ? 'bg-blue-600'
                    : 'bg-gray-300 hover:bg-blue-400 dark:bg-gray-600'
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
