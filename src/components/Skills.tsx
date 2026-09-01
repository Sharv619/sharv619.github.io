"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { deriveSkillCategories } from "@/lib/project-skills";
import type { Project } from "@/lib/data";

interface SkillsProps {
  projects: Project[];
  supplementalSkills?: string[];
  selectedSkills: string[];
  onSkillToggle: (skill: string) => void;
}

export default function Skills({ projects, supplementalSkills = [], selectedSkills, onSkillToggle }: SkillsProps) {
  const skillCategories = useMemo(
    () => deriveSkillCategories(projects, supplementalSkills),
    [projects, supplementalSkills]
  );

  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Skills & Technologies
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Select a skill to filter the GitHub project lab by the repositories where it appears.
          </p>
          <div className="w-24 h-1 bg-blue-600 mx-auto mt-6" />
        </motion.div>

        {selectedSkills.length > 0 && (
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 mb-8">
            <p className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
              Active filters
            </p>
            <p className="mt-2 text-lg font-semibold text-gray-900 dark:text-white">
              {selectedSkills.join(", ")}
            </p>
          </div>
        )}

        {skillCategories.length === 0 && (
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8 text-center">
            <p className="text-gray-600 dark:text-gray-300">
              No project technologies are currently available.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6"
            >
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 border-b-2 border-gray-200 dark:border-gray-700 pb-2 mb-4">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.items.map((skill) => {
                  const isSelected = selectedSkills.includes(skill);

                  return (
                    <button
                      key={skill}
                      onClick={() => onSkillToggle(skill)}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                        isSelected
                          ? "bg-blue-600 text-white hover:bg-blue-700"
                          : "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-800"
                      }`}
                    >
                      {skill}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
