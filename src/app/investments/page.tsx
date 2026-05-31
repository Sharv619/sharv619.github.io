"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Investments() {
  return (
    <div className="min-h-screen">
      <section className="py-24 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Experimental Archive
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              This page is a parked archive for exploratory thinking and is not part of the main job-focused portfolio narrative.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Hiring Portfolio Note
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
              The main portfolio focuses on software engineering evidence: production recovery, backend and cloud deployment work, responsible AI workflow prototypes, developer tooling, and public GitHub projects.
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
              Any investment, governance, or market research ideas should be treated as personal exploratory notes unless they are separately documented with clear evidence and scope.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/"
                className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-300"
              >
                Back to Portfolio
              </Link>
              <Link
                href="/case-studies"
                className="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-300"
              >
                View Case Studies
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
