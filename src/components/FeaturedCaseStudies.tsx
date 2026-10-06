"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { FlagshipCaseStudy } from "@/lib/flagship-case-studies";

interface FeaturedCaseStudiesProps {
  caseStudies: FlagshipCaseStudy[];
  compact?: boolean;
}

export default function FeaturedCaseStudies({ caseStudies, compact = false }: FeaturedCaseStudiesProps) {
  return (
    <section id="case-studies" className="journal-page border-y border-[var(--journal-rule-strong)] py-20">
      <div className="mx-auto w-full max-w-[1500px] px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-10 grid gap-6 lg:grid-cols-[0.78fr_1.22fr] lg:items-end"
        >
          <div>
            <p className="journal-kicker mb-3">
              Real work / real constraints
            </p>
            <h2 className="font-journal-serif text-balance text-4xl font-semibold leading-tight text-[var(--journal-ink)] sm:text-6xl">
              {`${caseStudies.length} case studies with the constraints left in.`}
            </h2>
          </div>
          <p className="max-w-2xl border-l-2 border-[var(--journal-verification)] pl-5 font-journal-serif text-lg italic leading-8 text-[var(--journal-ink-muted)] lg:justify-self-end">
            Production recovery, responsible AI boundaries, and developer tooling. Each is labelled by what it is, what I owned, and what the evidence supports.
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
              className="journal-card group relative flex min-h-[500px] flex-col overflow-hidden rounded-md"
            >
              <div className="journal-grid relative overflow-hidden border-b border-[var(--journal-rule)] p-5 text-[var(--journal-ink)]">
                <div className="relative flex min-h-32 flex-col justify-between">
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-journal-mono text-xs font-bold uppercase tracking-[0.18em] text-[var(--journal-ink-muted)]">
                      0{index + 1}
                    </span>
                    <span className="rounded-sm border border-[var(--journal-rule-strong)] bg-[var(--journal-paper-raised)] px-3 py-1 font-journal-mono text-xs font-bold capitalize text-[var(--journal-ink)]">
                      {caseStudy.status}
                    </span>
                  </div>
                  <div>
                    <div className="mb-4 h-1 w-16 -rotate-1 bg-[var(--journal-verification)]" />
                    <p className="font-journal-mono text-sm font-bold uppercase tracking-[0.12em] text-[var(--journal-ink-muted)]">
                      {caseStudy.category}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <div className="absolute right-0 top-36 rounded-l-sm bg-[var(--journal-verification)] px-3 py-2 font-journal-mono text-[10px] font-bold uppercase tracking-wider text-white">
                  Evidence
                </div>
                <h3 className="font-journal-serif pr-16 text-2xl font-semibold leading-tight text-[var(--journal-ink)]">
                  {caseStudy.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-[var(--journal-ink-muted)]">
                  {caseStudy.oneLiner}
                </p>

                {!compact && (
                  <div className="mt-5 space-y-3">
                    {caseStudy.impact.slice(0, 1).map((impact) => (
                      <div key={impact} className="border-l-2 border-[var(--journal-verification)] pl-3 text-sm leading-6 text-[var(--journal-ink-muted)]">
                        {impact}
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-6 flex flex-wrap gap-2">
                  {caseStudy.techStack.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="rounded-sm border border-[var(--journal-rule)] bg-[var(--journal-paper)] px-3 py-1 font-journal-mono text-xs font-bold text-[var(--journal-ink-muted)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <p className="mt-5 font-journal-mono text-xs font-medium text-[var(--journal-ink-muted)]">
                  Role: {caseStudy.role.slice(0, 2).join(", ")}
                </p>

                <div className="mt-auto flex flex-wrap gap-3 pt-6">
                  <Link
                    href={`/case-studies/${caseStudy.slug}`}
                    aria-label={`Read case study: ${caseStudy.title}`}
                    className="inline-flex min-h-11 items-center rounded-md bg-[var(--journal-leather)] px-4 py-2 text-sm font-bold text-[#fffaf0] transition-transform hover:-translate-y-0.5"
                  >
                    Read case study
                  </Link>
                  {caseStudy.links?.github && (
                    <a
                      href={caseStudy.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open GitHub repository for ${caseStudy.title}`}
                      className="inline-flex min-h-11 items-center rounded-md border border-[var(--journal-rule-strong)] px-4 py-2 text-sm font-bold text-[var(--journal-ink)]"
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
                      className="inline-flex min-h-11 items-center rounded-md border border-[var(--journal-rule-strong)] px-4 py-2 text-sm font-bold text-[var(--journal-ink)]"
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
                      className="inline-flex min-h-11 items-center rounded-md border border-[var(--journal-rule-strong)] px-4 py-2 text-sm font-bold text-[var(--journal-ink)]"
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
