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
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Skills & Technologies
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Select a skill to see the GitHub repositories where I used it.
          </p>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </motion.div>

        {skillCategories.length === 0 && (
          <div className="bg-white dark:bg-gray-900 rounded-lg p-8 text-center shadow-lg">
            <p className="text-gray-600 dark:text-gray-300">
              No project technologies are currently available.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
              className="flex h-72 flex-col rounded-lg border border-stone-300 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#171715]"
            >
              <h3 className="mb-4 shrink-0 text-xl font-black text-stone-950 dark:text-white">
                {category.title}
              </h3>
              <div className="min-h-0 flex-1 overflow-y-auto pr-1">
                <div className="flex flex-wrap gap-2">
                {category.items.map((skill) => (
                  <button
                    key={skill}
                    onClick={() => onSkillToggle(skill)}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${selectedSkills.includes(skill) ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-800'}`}
                  >
                    {skill}
                  </button>
                ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
