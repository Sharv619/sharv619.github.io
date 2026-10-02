"use client";

import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Contact from "@/components/Contact";
import FeaturedCaseStudies from "@/components/FeaturedCaseStudies";
import type { Project } from "@/lib/data";
import { getOrderedFlagshipCaseStudies } from "@/lib/flagship-case-studies";

interface ProjectsPageClientProps {
  projects: Project[];
}

export default function ProjectsPageClient({ projects }: ProjectsPageClientProps) {
  const caseStudies = getOrderedFlagshipCaseStudies();

  return (
    <div className="min-h-screen">
      <Navigation />
      {/* Hero Section */}
      <section id="projects-hero" className="py-20 bg-gradient-to-br from-gray-50 to gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Proof-of-Work Lab
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Case studies explain the constraints and my contribution. The repository feed keeps the wider trail of prototypes, tools, and experiments connected to public evidence.
            </p>
          </motion.div>
        </div>
      </section>

      <FeaturedCaseStudies caseStudies={caseStudies} compact />

      <section id="projects-grid" className="py-20 bg-white dark:bg-gray-900">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                  <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                    Public repository evidence
                  </h2>
                  <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                    Generated from original public GitHub repositories at build time. Status labels keep prototypes, packages, archived work, and case studies distinct.
                  </p>
                  <div className="w-24 h-1 bg-blue-600 mx-auto mt-6"></div>
                </div>
                {projects.length === 0 ? (
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 text-center">
                    <p className="text-gray-600 dark:text-gray-300">
                      No GitHub repositories are currently tagged for the portfolio project feed.
                    </p>
                  </div>
                ) : (
                  <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4">
                    {projects.map((project, index) => (
                      <motion.div
                        key={project.githubUrl || project.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="w-[85vw] max-w-sm shrink-0 snap-center rounded-lg border border-stone-300 bg-white/70 p-4 shadow-sm dark:border-white/10 dark:bg-white/5 cursor-pointer hover:shadow-md transition-shadow duration-300"
                      >
                        <div className="space-y-4">
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                            {project.title}
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            <span className="px-2 py-0.5 text-xs rounded-full bg-teal-100 text-teal-900 dark:bg-teal-300/15 dark:text-teal-100">
                              {project.status || (project.archived ? "Archived repository" : "Public repository")}
                            </span>
                            {project.technologies.map((tech, techIndex) => (
                              <span key={techIndex} className="px-2 py-0.5 text-xs rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                                {tech}
                              </span>
                            ))}
                          </div>
                          <div className="flex flex-wrap gap-3 pt-4">
                            {project.liveUrl && (
                              <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`View live demo for ${project.title}`}
                                className="inline-flex items-center px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-sm text-xs hover:text-white"
                              >
                                Demo
                              </a>
                            )}
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`View source code for ${project.title}`}
                              className="inline-flex items-center px-3 py-1.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-sm hover:bg-gray-50 dark:hover:bg-gray-800 text-xs"
                              >
                                Source
                            </a>
                            {project.caseStudySlug && (
                              <a
                                href={`/case-studies/${project.caseStudySlug}`}
                                aria-label={`View case study for ${project.title}`}
                                className="inline-flex items-center px-3 py-1.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-sm hover:bg-gray-50 dark:hover:bg-gray-800 text-xs"
                                >
                                  Case Study
                              </a>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </section>
      <Contact />
    </div>
  );
}
