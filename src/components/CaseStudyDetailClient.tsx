"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Contact from "@/components/Contact";
import type { FlagshipCaseStudy } from "@/lib/flagship-case-studies";

interface CaseStudyDetailClientProps {
  caseStudy: FlagshipCaseStudy;
}

export default function CaseStudyDetailClient({ caseStudy }: CaseStudyDetailClientProps) {
  return (
    <div className="min-h-screen">
      <Navigation />

      <section className="py-24 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="text-sm font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-300">
                {caseStudy.category}
              </span>
              <span className="text-sm px-3 py-1 rounded-full bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 shadow-sm">
                {caseStudy.status}
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              {caseStudy.title}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              {caseStudy.oneLiner}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <DetailSection title="Problem" body={caseStudy.problem} />
          <DetailSection title="Solution" body={caseStudy.solution} />
          <ListSection title="Impact" items={caseStudy.impact} />
          <ListSection title="Technical Highlights" items={caseStudy.technicalHighlights} />
          <ListSection title="Role" items={caseStudy.role} />
          <ListSection title="Proof" items={caseStudy.proof} />
          <ListSection title="Constraints" items={caseStudy.constraints} />
          <ListSection title="Limitations" items={caseStudy.limitations} />
          {caseStudy.roadmap && <ListSection title="Roadmap" items={caseStudy.roadmap} />}

          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Tech Stack
            </h2>
            <div className="flex flex-wrap gap-3">
              {caseStudy.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-4 pt-8 border-t border-gray-200 dark:border-gray-700">
            <Link
              href="/case-studies"
              className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-300"
            >
              All Case Studies
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-300"
            >
              GitHub Project Lab
            </Link>
            {caseStudy.links?.github && (
              <a
                href={caseStudy.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-300"
              >
                GitHub
              </a>
            )}
            {caseStudy.links?.npm && (
              <a
                href={caseStudy.links.npm}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-300"
              >
                npm
              </a>
            )}
          </div>
        </div>
      </section>

      <Contact />
    </div>
  );
}

function DetailSection({ title, body }: { title: string; body: string }) {
  return (
    <section>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        {title}
      </h2>
      <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
        {body}
      </p>
    </section>
  );
}

function ListSection({ title, items }: { title: string; items: string[] }) {
  return (
    <section>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        {title}
      </h2>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item} className="text-gray-600 dark:text-gray-300 leading-relaxed flex gap-3">
            <span className="mt-2 h-2 w-2 rounded-full bg-blue-600 flex-shrink-0"></span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
