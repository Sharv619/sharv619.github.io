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
    <section id="skills" className="flex items-center bg-[#f7f4ed] py-20 dark:bg-[#101010]">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-[0.58fr_1.42fr] lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="lg:self-center"
        >
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-teal-700 dark:text-teal-300">
            Skills
          </p>
          <h2 className="text-balance text-4xl font-black leading-tight text-stone-950 sm:text-5xl dark:text-white">
            Tools I have used in real work.
          </h2>
          <p className="mt-5 text-lg leading-8 text-stone-700 dark:text-stone-300">
            Click any skill to filter the project lab.
          </p>
          {selectedSkills.length > 0 && (
            <div className="mt-6 rounded-lg border border-teal-700/20 bg-white p-4 dark:border-teal-300/20 dark:bg-white/5">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-stone-500 dark:text-stone-400">
                Active filters
              </p>
              <p className="mt-2 text-lg font-black text-stone-950 dark:text-white">
                {selectedSkills.join(", ")}
              </p>
            </div>
          )}
        </motion.div>

        <div>
        {skillCategories.length === 0 && (
          <div className="rounded-lg border border-stone-300 bg-white p-8 text-center shadow-lg dark:border-white/10 dark:bg-white/5">
            <p className="text-stone-700 dark:text-stone-300">
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
                    className={`rounded-md px-3 py-2 text-sm font-bold transition-colors duration-300 ${selectedSkills.includes(skill) ? 'bg-teal-700 text-white hover:bg-teal-800 dark:bg-teal-300 dark:text-stone-950' : 'bg-[#f7f4ed] text-teal-900 hover:bg-teal-100 dark:bg-white/5 dark:text-teal-100 dark:hover:bg-teal-300/15'}`}
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
      </div>
    </section>
  );
}
