"use client";

import { motion } from "framer-motion";

interface EducationSectionProps {
  education: Array<{
    degree: string;
    institution: string;
    duration: string;
  }>;
}

export default function EducationSection({ education }: EducationSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8"
    >
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
        <svg className="w-6 h-6 mr-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
        Education
      </h2>
      
      <div className="space-y-6">
        {education.map((edu, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
            className="relative pl-8 border-l-4 border-green-500 dark:border-green-400"
          >
            {/* Timeline Dot */}
            <div className="absolute left-[-12px] top-0 w-6 h-6 bg-green-500 dark:bg-green-400 rounded-full shadow-lg" />
            
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {edu.degree}
              </h3>
              <p className="text-lg text-green-600 dark:text-green-400 font-medium">
                {edu.institution}
              </p>
              <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm font-medium inline-block">
                {edu.duration}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Additional Certifications */}
      <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Additional Certifications
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="w-3 h-3 bg-blue-600 dark:bg-blue-400 rounded-full" />
            <span className="text-gray-700 dark:text-gray-300">AWS Cloud Practitioner (In Progress)</span>
          </div>
          <div className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="w-3 h-3 bg-purple-600 dark:bg-purple-400 rounded-full" />
            <span className="text-gray-700 dark:text-gray-300">Google Cloud AI/ML Fundamentals</span>
          </div>
          <div className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="w-3 h-3 bg-green-600 dark:bg-green-400 rounded-full" />
            <span className="text-gray-700 dark:text-gray-300">OWASP Security Best Practices</span>
          </div>
          <div className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="w-3 h-3 bg-orange-600 dark:bg-orange-400 rounded-full" />
            <span className="text-gray-700 dark:text-gray-300">Docker & Kubernetes Essentials</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}