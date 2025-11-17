"use client";

import { motion } from "framer-motion";
import { skills } from "@/lib/data";

interface SkillsProps {
  selectedSkills: string[];
  onSkillToggle: (skill: string) => void;
}

export default function Skills({ selectedSkills, onSkillToggle }: SkillsProps) {
  const skillCategories = [
    { title: "Languages", items: skills.languages },
    { title: "Frontend", items: skills.frontend },
    { title: "Backend", items: skills.backend },
    { title: "AI/ML", items: skills["ai/ml"] },
    { title: "DevOps & Cloud", items: skills["devops & cloud"] },
    { title: "Databases & Security", items: skills["databases & security"] },
  ];

  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Skills & Technologies
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-lg"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 text-center">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.items.map((skill, skillIndex) => (
                  <button
                    key={skill}
                    onClick={() => onSkillToggle(skill)}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${selectedSkills.includes(skill) ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-800'}`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
