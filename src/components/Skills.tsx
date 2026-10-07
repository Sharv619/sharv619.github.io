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
      className="max-h-[34rem] overflow-y-auto bg-[var(--journal-paper-raised)] p-5 sm:p-6 lg:max-h-[48rem]"
    >
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="journal-kicker text-[var(--journal-verification)]">
            Project mapping
          </p>
          <h3 id="skills-heading" className="mt-2 font-journal-serif text-2xl font-semibold text-[var(--journal-ink)]">
            Skills mapped to work
          </h3>
          <p className="mt-2 text-sm text-[var(--journal-ink-muted)]">
            Choose a technology to see the public repositories where it appears in the code or project evidence.
          </p>
        </div>
        {selectedSkills.length > 0 && (
          <button
            type="button"
            onClick={onClearSkills}
            className="w-fit rounded-md border border-[var(--journal-rule-strong)] px-3 py-2 text-sm font-semibold text-[var(--journal-ink)]"
          >
            Clear {selectedSkills.length} {selectedSkills.length === 1 ? "filter" : "filters"}
          </button>
        )}
      </div>

      {skillCategories.length === 0 && (
        <div className="journal-card rounded-md p-8 text-center">
          <p className="text-[var(--journal-ink-muted)]">
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
            className="journal-card rounded-md p-4"
          >
            <h4 className="mb-3 shrink-0 font-journal-serif text-base font-semibold text-[var(--journal-ink)]">
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
                      ? "bg-[var(--journal-verification)] text-white"
                      : "border border-[var(--journal-rule)] bg-[var(--journal-paper)] text-[var(--journal-ink-muted)] hover:border-[var(--journal-rule-strong)]"
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
