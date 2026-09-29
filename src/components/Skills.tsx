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
  onClearSkills: () => void;
}

export default function Skills({
  projects,
  supplementalSkills = [],
  selectedSkills,
  onSkillToggle,
  onClearSkills,
}: SkillsProps) {
  const skillCategories = useMemo(
    () => deriveSkillCategories(projects, supplementalSkills),
    [projects, supplementalSkills]
  );

  return (
    <div
      id="skills"
      className="max-h-[34rem] overflow-y-auto bg-stone-50 p-5 dark:bg-white/[0.03] sm:p-6 lg:max-h-[48rem]"
    >
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-700 dark:text-blue-300">
            Evidence filters
          </p>
          <h3 id="skills-heading" className="mt-2 text-2xl font-bold text-stone-950 dark:text-white">
            Skills & Technologies
          </h3>
          <p className="mt-2 text-sm text-stone-600 dark:text-stone-300">
            Select one or more skills to show the public repositories where they appear.
          </p>
        </div>
        {selectedSkills.length > 0 && (
          <button
            type="button"
            onClick={onClearSkills}
            className="w-fit rounded-md border border-stone-300 bg-white px-3 py-2 text-sm font-semibold text-stone-700 transition-colors hover:border-stone-950 hover:text-stone-950 dark:border-white/15 dark:bg-white/5 dark:text-stone-200 dark:hover:border-white dark:hover:text-white"
          >
            Clear {selectedSkills.length} {selectedSkills.length === 1 ? "filter" : "filters"}
          </button>
        )}
      </div>

      {skillCategories.length === 0 && (
        <div className="rounded-lg bg-white p-8 text-center shadow-sm dark:bg-gray-900">
          <p className="text-gray-600 dark:text-gray-300">
            No project technologies are currently available.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 gap-3">
        {skillCategories.map((category, categoryIndex) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: categoryIndex * 0.05 }}
            viewport={{ once: true }}
            className="rounded-lg border border-stone-200 bg-white p-4 dark:border-white/10 dark:bg-[#171715]"
          >
            <h4 className="mb-3 shrink-0 text-base font-bold text-stone-950 dark:text-white">
              {category.title}
            </h4>
            <div className="flex flex-wrap gap-2">
              {category.items.map((skill) => (
                <button
                  type="button"
                  key={skill}
                  onClick={() => onSkillToggle(skill)}
                  aria-pressed={selectedSkills.includes(skill)}
                  className={`rounded-md px-2.5 py-1.5 text-xs font-semibold transition-colors duration-200 ${
                    selectedSkills.includes(skill)
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-blue-50 text-blue-800 hover:bg-blue-100 dark:bg-blue-950 dark:text-blue-200 dark:hover:bg-blue-900"
                  }`}
                >
                  {skill}
                </button>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
