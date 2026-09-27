"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { FlagshipCaseStudy } from "@/lib/flagship-case-studies";

interface FeaturedCaseStudiesProps {
  caseStudies: FlagshipCaseStudy[];
  compact?: boolean;
}

const studyAccents = [
  {
    panel: "from-emerald-950 via-stone-950 to-teal-950",
    line: "bg-teal-300",
    chip: "bg-teal-100 text-teal-900 dark:bg-teal-300/15 dark:text-teal-100",
  },
  {
    panel: "from-indigo-950 via-stone-950 to-fuchsia-950",
    line: "bg-fuchsia-300",
    chip: "bg-fuchsia-100 text-fuchsia-900 dark:bg-fuchsia-300/15 dark:text-fuchsia-100",
  },
  {
    panel: "from-slate-950 via-stone-950 to-amber-950",
    line: "bg-amber-300",
    chip: "bg-amber-100 text-amber-900 dark:bg-amber-300/15 dark:text-amber-100",
  },
];

export default function FeaturedCaseStudies({ caseStudies, compact = false }: FeaturedCaseStudiesProps) {
  return (
    <section id="case-studies" className="flex items-center border-y border-stone-200 bg-[#f7f4ed] py-20 dark:border-white/10 dark:bg-[#101010]">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-10 grid gap-6 lg:grid-cols-[0.78fr_1.22fr] lg:items-end"
        >
          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-teal-700 dark:text-teal-300">
              Selected work
            </p>
            <h2 className="text-balance text-4xl font-black leading-tight text-stone-950 sm:text-5xl dark:text-white">
              Three pieces of proof, not three generic cards.
            </h2>
          </div>
          <p className="max-w-2xl text-lg leading-8 text-stone-700 lg:justify-self-end dark:text-stone-300">
            The important part is the shape of the work: messy production recovery, responsible AI boundaries, and developer tooling with real distribution paths.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {caseStudies.map((caseStudy, index) => (
            <motion.article
              key={caseStudy.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group flex min-h-[500px] flex-col overflow-hidden rounded-lg border border-stone-300 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-stone-900/10 dark:border-white/10 dark:bg-[#171715] dark:hover:shadow-black/30"
            >
              <div className={`relative overflow-hidden bg-gradient-to-br ${studyAccents[index % studyAccents.length].panel} p-5 text-white`}>
                <div className="absolute inset-0 opacity-20">
                  <div className="h-full w-full bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:28px_28px]" />
                </div>
                <div className="relative flex min-h-32 flex-col justify-between">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs font-bold uppercase tracking-[0.18em] text-white/70">
                      0{index + 1}
                    </span>
                    <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-bold capitalize text-white">
                      {caseStudy.status}
                    </span>
                  </div>
                  <div>
                    <div className={`mb-4 h-1 w-16 ${studyAccents[index % studyAccents.length].line}`} />
                    <p className="text-sm font-bold uppercase tracking-[0.12em] text-white/65">
                      {caseStudy.category}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-2xl font-black leading-tight text-stone-950 dark:text-white">
                  {caseStudy.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-stone-700 dark:text-stone-300">
                  {caseStudy.oneLiner}
                </p>

                {!compact && (
                  <div className="mt-5 space-y-3">
                    {caseStudy.impact.slice(0, 1).map((impact) => (
                      <div key={impact} className="border-l-2 border-stone-300 pl-3 text-sm leading-6 text-stone-700 dark:border-white/15 dark:text-stone-300">
                        {impact}
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-6 flex flex-wrap gap-2">
                  {caseStudy.techStack.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className={`rounded-full px-3 py-1 text-xs font-bold ${studyAccents[index % studyAccents.length].chip}`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <p className="mt-5 text-sm font-medium text-stone-500 dark:text-stone-400">
                  Role: {caseStudy.role.slice(0, 2).join(", ")}
                </p>

                <div className="mt-auto flex flex-wrap gap-3 pt-6">
                  <Link
                    href={`/case-studies/${caseStudy.slug}`}
                    aria-label={`Read case study: ${caseStudy.title}`}
                    className="inline-flex min-h-11 items-center rounded-md bg-stone-950 px-4 py-2 text-sm font-bold text-white transition-colors duration-200 hover:bg-teal-800 dark:bg-white dark:text-stone-950 dark:hover:bg-teal-200"
                  >
                    Read case study
                  </Link>
                  {caseStudy.links?.github && (
                    <a
                      href={caseStudy.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open GitHub repository for ${caseStudy.title}`}
                      className="inline-flex min-h-11 items-center rounded-md border border-stone-300 px-4 py-2 text-sm font-bold text-stone-800 transition-colors duration-200 hover:bg-stone-100 dark:border-white/15 dark:text-stone-200 dark:hover:bg-white/10"
                    >
                      GitHub
                    </a>
                  )}
                  {caseStudy.links?.githubOffline && (
                    <a
                      href={caseStudy.links.githubOffline}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open offline repository notes for ${caseStudy.title}`}
                      className="inline-flex min-h-11 items-center rounded-md border border-stone-300 px-4 py-2 text-sm font-bold text-stone-800 transition-colors duration-200 hover:bg-stone-100 dark:border-white/15 dark:text-stone-200 dark:hover:bg-white/10"
                    >
                      Offline repo
                    </a>
                  )}
                  {caseStudy.links?.npm && (
                    <a
                      href={caseStudy.links.npm}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open npm package for ${caseStudy.title}`}
                      className="inline-flex min-h-11 items-center rounded-md border border-stone-300 px-4 py-2 text-sm font-bold text-stone-800 transition-colors duration-200 hover:bg-stone-100 dark:border-white/15 dark:text-stone-200 dark:hover:bg-white/10"
                    >
                      npm
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
