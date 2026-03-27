"use client";

import { motion } from "framer-motion";

interface TechnicalSkillsProps {
  skills: {
    languages: string[];
    frameworks: string[];
    cloudDevOps: string[];
    aiData: string[];
  };
}

export default function TechnicalSkills({ skills }: TechnicalSkillsProps) {
  const skillCategories = [
    { title: "Languages", items: skills.languages, color: "from-blue-500 to-blue-600" },
    { title: "Frameworks & Libraries", items: skills.frameworks, color: "from-green-500 to-green-600" },
    { title: "Cloud & DevOps", items: skills.cloudDevOps, color: "from-purple-500 to-purple-600" },
    { title: "AI & Data Science", items: skills.aiData, color: "from-orange-500 to-orange-600" }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8"
    >
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
        <svg className="w-6 h-6 mr-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
        Technical Skills
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {skillCategories.map((category, index) => (
          <div key={index} className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 border-b-2 border-gray-200 dark:border-gray-700 pb-2">
              {category.title}
            </h3>
            <div className="space-y-3">
              {category.items.map((skill, skillIndex) => (
                <div key={skillIndex} className="group">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {skill}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300">
                      Advanced
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "90%" }}
                      transition={{ duration: 0.8, delay: skillIndex * 0.1 }}
                      className={`h-2 rounded-full bg-gradient-to-r ${category.color} shadow-md`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      {/* Skill Tags */}
      <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
        <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3 uppercase tracking-wider">
          Key Technologies
        </h4>
        <div className="flex flex-wrap gap-2">
          {skillCategories.flatMap(category => 
            category.items.map(skill => (
              <span
                key={skill}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
              >
                {skill}
              </span>
            ))
          )}
        </div>
      </div>
    </motion.div>
  );
}