"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { FlagshipCaseStudy } from "@/lib/flagship-case-studies";

interface FeaturedCaseStudiesProps {
  caseStudies: FlagshipCaseStudy[];
  compact?: boolean;
}

export default function FeaturedCaseStudies({ caseStudies, compact = false }: FeaturedCaseStudiesProps) {
  return (
    <section id="case-studies" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Flagship Case Studies
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Curated proof points that explain production impact, constraints, tradeoffs, and personal contribution beyond raw GitHub metadata.
          </p>
          <div className="w-24 h-1 bg-blue-600 mx-auto mt-6"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {caseStudies.map((caseStudy, index) => (
            <motion.article
              key={caseStudy.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col"
            >
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="text-xs font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-300">
                  {caseStudy.category}
                </span>
                <span className="text-xs px-2 py-1 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                  {caseStudy.status}
                </span>
              </div>

              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {caseStudy.title}
              </h3>

              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-5">
                {caseStudy.oneLiner}
              </p>

              {!compact && (
                <ul className="space-y-2 mb-5">
                  {caseStudy.impact.slice(0, 3).map((impact) => (
                    <li key={impact} className="text-sm text-gray-600 dark:text-gray-300 flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-blue-600 flex-shrink-0"></span>
                      <span>{impact}</span>
                    </li>
                  ))}
                </ul>
              )}

              <div className="flex flex-wrap gap-2 mb-6">
                {caseStudy.techStack.slice(0, 5).map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                Role: {caseStudy.role.slice(0, 2).join(", ")}
              </p>

              <div className="mt-auto flex flex-wrap gap-3">
                <Link
                  href={`/case-studies/${caseStudy.slug}`}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-md transition-colors duration-300"
                >
                  Read Case Study
                </Link>
                {caseStudy.links?.github && (
                  <a
                    href={caseStudy.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-sm font-semibold rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
                  >
                    GitHub
                  </a>
                )}
                {caseStudy.links?.npm && (
                  <a
                    href={caseStudy.links.npm}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-sm font-semibold rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
                  >
                    npm
                  </a>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
