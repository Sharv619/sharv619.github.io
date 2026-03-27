"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface ProjectsSectionProps {
  projects: Array<{
    title: string;
    description: string;
    techStack: string[];
    achievements: string[];
  }>;
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
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
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
        <svg className="w-6 h-6 mr-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
        Notable Projects
      </h2>

      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {currentIndex + 1} of {projects.length}
          </span>
          <div className="flex space-x-2">
            <button
              onClick={prevSlide}
              className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
              aria-label="Previous project"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {currentProject.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 italic">
                {currentProject.description}
              </p>
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
        </motion.div>

        <div className="flex justify-center mt-6 space-x-2">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentIndex
                  ? 'bg-blue-600'
                  : 'bg-gray-300 dark:bg-gray-600 hover:bg-blue-400'
              }`}
              aria-label={`Go to project ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
