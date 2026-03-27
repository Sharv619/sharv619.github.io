"use client";

import { motion } from "framer-motion";

interface ProfessionalSummaryProps {
  summary: string;
}

export default function ProfessionalSummary({ summary }: ProfessionalSummaryProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8"
    >
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
        <svg className="w-6 h-6 mr-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        Professional Summary
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Achievement Badges */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold">100%</div>
              <div className="text-sm opacity-90">Data Recovery</div>
            </div>
            <div className="text-4xl">🛡️</div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold">88%</div>
              <div className="text-sm opacity-90">Performance Boost</div>
            </div>
            <div className="text-4xl">⚡</div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold">450+</div>
              <div className="text-sm opacity-90">Downloads</div>
            </div>
            <div className="text-4xl">📊</div>
          </div>
        </div>
      </div>
      
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          {summary}
        </p>
      </div>
    </motion.div>
  );
}