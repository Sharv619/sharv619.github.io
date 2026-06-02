"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Contact from "@/components/Contact";
import type { FlagshipCaseStudy } from "@/lib/flagship-case-studies";

interface CaseStudyDetailClientProps {
  caseStudy: FlagshipCaseStudy;
}

export default function CaseStudyDetailClient({ caseStudy }: CaseStudyDetailClientProps) {
  const primaryImpact = caseStudy.impact[0];
  const secondaryImpact = caseStudy.impact[1];
  const proofCount = caseStudy.proof.length;

  return (
    <div className="min-h-screen bg-[#f7f4ed] dark:bg-[#101010]">
      <Navigation />

      <section className="relative overflow-hidden border-b border-stone-200 px-4 pb-16 pt-32 dark:border-white/10 sm:px-6 lg:px-8">
        <div className="absolute inset-0 opacity-[0.16] dark:opacity-[0.11]">
          <div className="h-full w-full bg-[linear-gradient(to_right,#78716c_1px,transparent_1px),linear-gradient(to_bottom,#78716c_1px,transparent_1px)] bg-[size:44px_44px]" />
        </div>
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-10 lg:grid-cols-[1fr_0.62fr] lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <span className="text-sm font-bold uppercase tracking-[0.18em] text-teal-700 dark:text-teal-300">
                {caseStudy.category}
              </span>
              <span className="rounded-full border border-stone-300 bg-white/70 px-3 py-1 text-sm font-bold capitalize text-stone-700 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-stone-300">
                {caseStudy.status}
              </span>
            </div>
            <h1 className="text-balance text-5xl font-black leading-[0.96] text-stone-950 sm:text-6xl dark:text-white">
              {caseStudy.title}
            </h1>
            <p className="mt-6 max-w-3xl text-xl leading-8 text-stone-700 dark:text-stone-300">
              {caseStudy.oneLiner}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="overflow-hidden rounded-lg border border-stone-300 bg-stone-950 p-5 text-white shadow-2xl shadow-stone-950/20 dark:border-white/10"
          >
            <div className="mb-6 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-teal-200">Case file</span>
              <span className="h-3 w-3 rounded-full bg-teal-300" />
            </div>
            <div className="space-y-4">
              <MetricBlock label="Main outcome" value={primaryImpact || "Documented engineering impact"} />
              <MetricBlock label="Secondary signal" value={secondaryImpact || caseStudy.role[0]} />
              <MetricBlock label="Evidence count" value={`${proofCount} proof points`} />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="border-b border-stone-200 bg-white py-16 dark:border-white/10 dark:bg-[#151513]">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
          <NarrativePanel eyebrow="01" title="Problem" body={caseStudy.problem} />
          <NarrativePanel eyebrow="02" title="Solution" body={caseStudy.solution} emphasized />
          <NarrativePanel eyebrow="03" title="Role" body={caseStudy.role.join(" · ")} />
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-[0.7fr_1.3fr] lg:px-8">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-teal-700 dark:text-teal-300">
              Technical readout
            </p>
            <h2 className="text-balance text-4xl font-black leading-tight text-stone-950 dark:text-white">
              What changed, what mattered, and what stayed bounded.
            </h2>
            <div className="mt-8 flex flex-wrap gap-2">
              {caseStudy.techStack.map((tech) => (
                <span key={tech} className="rounded-full border border-stone-300 bg-white px-3 py-2 text-xs font-bold text-stone-800 dark:border-white/10 dark:bg-white/5 dark:text-stone-200">
                  {tech}
                </span>
              ))}
            </div>
          </aside>

          <div className="space-y-6">
            <ListSection title="Impact" items={caseStudy.impact} tone="impact" />
            <ListSection title="Technical Highlights" items={caseStudy.technicalHighlights} tone="technical" />
            <ListSection title="Proof" items={caseStudy.proof} tone="proof" />
            <ListSection title="Constraints" items={caseStudy.constraints} tone="constraint" />
            <ListSection title="Limitations" items={caseStudy.limitations} tone="limitation" />
            {caseStudy.roadmap && <ListSection title="Roadmap" items={caseStudy.roadmap} tone="roadmap" />}
          </div>

          <div className="flex flex-wrap gap-4 border-t border-stone-300 pt-8 dark:border-white/10 lg:col-span-2">
            <Link
              href="/case-studies"
              aria-label="View all flagship case studies"
              className="inline-flex items-center rounded-md bg-stone-950 px-6 py-3 font-bold text-white transition-colors duration-200 hover:bg-teal-800 dark:bg-white dark:text-stone-950 dark:hover:bg-teal-200"
            >
              All Case Studies
            </Link>
            <Link
              href="/projects"
              aria-label="View GitHub project lab"
              className="inline-flex items-center rounded-md border border-stone-300 px-6 py-3 font-bold text-stone-800 transition-colors duration-200 hover:bg-white dark:border-white/15 dark:text-stone-200 dark:hover:bg-white/10"
            >
              GitHub Project Lab
            </Link>
            {caseStudy.links?.github && (
              <a
                href={caseStudy.links.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open GitHub repository for ${caseStudy.title}`}
                className="inline-flex items-center rounded-md border border-stone-300 px-6 py-3 font-bold text-stone-800 transition-colors duration-200 hover:bg-white dark:border-white/15 dark:text-stone-200 dark:hover:bg-white/10"
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
                className="inline-flex items-center rounded-md border border-stone-300 px-6 py-3 font-bold text-stone-800 transition-colors duration-200 hover:bg-white dark:border-white/15 dark:text-stone-200 dark:hover:bg-white/10"
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
                className="inline-flex items-center rounded-md border border-stone-300 px-6 py-3 font-bold text-stone-800 transition-colors duration-200 hover:bg-white dark:border-white/15 dark:text-stone-200 dark:hover:bg-white/10"
              >
                npm
              </a>
            )}
          </div>
        </div>
      </section>

      <Contact />
    </div>
  );
}

function MetricBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-white/10 bg-white/[0.06] p-4">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/50">{label}</p>
      <p className="mt-2 text-sm font-bold leading-6 text-white">{value}</p>
    </div>
  );
}

function NarrativePanel({ eyebrow, title, body, emphasized = false }: { eyebrow: string; title: string; body: string; emphasized?: boolean }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      viewport={{ once: true }}
      className={`rounded-lg border p-6 ${emphasized ? "border-stone-950 bg-stone-950 text-white dark:border-teal-300 dark:bg-teal-300 dark:text-stone-950" : "border-stone-300 bg-[#f7f4ed] text-stone-950 dark:border-white/10 dark:bg-white/5 dark:text-white"}`}
    >
      <p className={`mb-4 text-xs font-black uppercase tracking-[0.2em] ${emphasized ? "text-teal-200 dark:text-teal-950" : "text-teal-700 dark:text-teal-300"}`}>
        {eyebrow}
      </p>
      <h2 className="text-2xl font-black">
        {title}
      </h2>
      <p className={`mt-4 text-base leading-7 ${emphasized ? "text-white/80 dark:text-stone-800" : "text-stone-700 dark:text-stone-300"}`}>
        {body}
      </p>
    </motion.article>
  );
}

function ListSection({ title, items, tone }: { title: string; items: string[]; tone: string }) {
  const toneClasses: Record<string, string> = {
    impact: "border-teal-600 bg-teal-50 text-teal-950 dark:border-teal-300 dark:bg-teal-300/10 dark:text-teal-100",
    technical: "border-indigo-500 bg-indigo-50 text-indigo-950 dark:border-indigo-300 dark:bg-indigo-300/10 dark:text-indigo-100",
    proof: "border-amber-500 bg-amber-50 text-amber-950 dark:border-amber-300 dark:bg-amber-300/10 dark:text-amber-100",
    constraint: "border-stone-400 bg-white text-stone-900 dark:border-white/15 dark:bg-white/5 dark:text-stone-100",
    limitation: "border-rose-400 bg-rose-50 text-rose-950 dark:border-rose-300 dark:bg-rose-300/10 dark:text-rose-100",
    roadmap: "border-sky-500 bg-sky-50 text-sky-950 dark:border-sky-300 dark:bg-sky-300/10 dark:text-sky-100",
  };

  return (
    <section className={`rounded-lg border-l-4 p-6 shadow-sm ${toneClasses[tone] || toneClasses.constraint}`}>
      <h3 className="text-2xl font-black">{title}</h3>
      <ul className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2">
        {items.map((item) => (
          <li key={item} className="rounded-md bg-white/70 p-4 text-sm font-medium leading-6 text-current shadow-sm dark:bg-black/15">
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
