"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { projects } from "@/lib/data";

interface ProjectsProps {
  selectedSkills: string[];
}

function generateSlug(projectTitle: string): string {
  return projectTitle.toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/\([^)]*\)/g, '') // Remove parentheses
    .replace(/[&]/g, '') // Remove &
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim();
}

export default function Projects({ selectedSkills }: ProjectsProps) {
  return (
    <section id="projects" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                  {project.description}
                </p>

                {project.technicalChallenge && (
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Technical Challenge:
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {project.technicalChallenge}
                    </p>
                  </div>
                )}

                {/* Diagram placeholder: Add architecture diagram here
                <div className="mb-4">
                  <Image
                    src={`/diagrams/${generateSlug(project.title)}.png`}
                    alt={`${project.title} architecture diagram`}
                    width={400}
                    height={200}
                    className="rounded-md"
                  />
                </div>
                */}

                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Technologies:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Link
                    href={`/projects/${generateSlug(project.title)}`}
                    className="flex-1 text-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300 inline-block"
                  >
                    Read More
                  </Link>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-300 inline-block"
                  >
                    Source Code
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
