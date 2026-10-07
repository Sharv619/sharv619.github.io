"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { FlagshipCaseStudy } from "@/lib/flagship-case-studies";

interface FeaturedCaseStudiesProps {
  caseStudies: FlagshipCaseStudy[];
  compact?: boolean;
}

export function getSwipeSpreadDelta(offsetX: number): -1 | 0 | 1 {
  if (offsetX < -70) return 1;
  if (offsetX > 70) return -1;
  return 0;
}

export default function FeaturedCaseStudies({ caseStudies, compact = false }: FeaturedCaseStudiesProps) {
  const [spreadIndex, setSpreadIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const reduceMotion = useReducedMotion();
  const totalSpreads = Math.ceil(caseStudies.length / 2);
  const visibleCaseStudies = caseStudies.slice(spreadIndex * 2, spreadIndex * 2 + 2);
  const leftCaseStudy = visibleCaseStudies[0];
  const rightCaseStudy = visibleCaseStudies[1];
  const firstVisible = spreadIndex * 2 + 1;
  const lastVisible = Math.min(firstVisible + visibleCaseStudies.length - 1, caseStudies.length);

  function turnTo(nextIndex: number): void {
    const boundedIndex = Math.max(0, Math.min(nextIndex, totalSpreads - 1));
    if (boundedIndex === spreadIndex) {
      return;
    }
    setDirection(boundedIndex > spreadIndex ? 1 : -1);
    setSpreadIndex(boundedIndex);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLElement>): void {
    if (event.key === "ArrowRight") {
      turnTo(spreadIndex + 1);
    }
    if (event.key === "ArrowLeft") {
      turnTo(spreadIndex - 1);
    }
  }

  return (
    <section
      id="case-studies"
      className="journal-page border-y border-[var(--journal-rule-strong)] py-20"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      aria-label="Featured case-study book"
    >
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
              Featured Case Studies
            </h2>
            <p className="mt-3 font-journal-mono text-xs text-[var(--journal-ink-muted)]">{caseStudies.length} field reports · constraints included</p>
          </div>
          <p className="max-w-2xl border-l-2 border-[var(--journal-verification)] pl-5 font-journal-serif text-lg italic leading-8 text-[var(--journal-ink-muted)] lg:justify-self-end">
            Production recovery, responsible AI boundaries, and developer tooling. Each is labelled by what it is, what I owned, and what the evidence supports.
          </p>
        </motion.div>

        <div className="journal-leather-frame relative rounded-none sm:rounded-[22px]">
          <div className="journal-page-stack relative overflow-hidden rounded-none sm:rounded-xl [perspective:1800px]">
            <AnimatePresence mode="wait" custom={direction} initial={false}>
              <motion.div
                key={spreadIndex}
                custom={direction}
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: direction * 50, rotateY: direction * 7 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: direction * -50, rotateY: direction * -7 }}
                transition={{ duration: reduceMotion ? 0.08 : 0.52, ease: [0.22, 1, 0.36, 1] }}
                drag={reduceMotion ? false : "x"}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.16}
                onDragEnd={(_, info) => {
                  turnTo(spreadIndex + getSwipeSpreadDelta(info.offset.x));
                }}
                className="grid cursor-grab select-none lg:grid-cols-[minmax(0,1fr)_28px_minmax(0,1fr)] active:cursor-grabbing"
              >
                {leftCaseStudy ? (
                  <CaseStudyPage
                    key={leftCaseStudy.slug}
                    caseStudy={leftCaseStudy}
                    index={spreadIndex * 2}
                    compact={compact}
                    side="left"
                  />
                ) : null}
                <div className="journal-gutter relative z-20 hidden flex-col items-center justify-around lg:flex" aria-hidden="true">
                  {Array.from({ length: 7 }, (_, index) => <span key={index} className="journal-gutter-point" />)}
                </div>
                {rightCaseStudy ? (
                  <CaseStudyPage
                    key={rightCaseStudy.slug}
                    caseStudy={rightCaseStudy}
                    index={spreadIndex * 2 + 1}
                    compact={compact}
                    side="right"
                  />
                ) : null}
              </motion.div>
            </AnimatePresence>

            {spreadIndex < totalSpreads - 1 ? (
              <button
                type="button"
                onClick={() => turnTo(spreadIndex + 1)}
                className="absolute bottom-0 right-0 z-30 h-16 w-16 overflow-hidden text-transparent before:absolute before:bottom-0 before:right-0 before:h-0 before:w-0 before:border-b-[64px] before:border-l-[64px] before:border-b-[var(--journal-brass)] before:border-l-transparent before:opacity-80 hover:before:opacity-100 focus-visible:text-transparent"
                aria-label="Turn to the next case-study spread"
              >
                Next spread
              </button>
            ) : null}
          </div>
        </div>

        <div className="mt-7 flex flex-col items-center justify-between gap-5 sm:flex-row">
          <button
            type="button"
            onClick={() => turnTo(spreadIndex - 1)}
            disabled={spreadIndex === 0}
            className="inline-flex min-h-11 min-w-32 items-center justify-center rounded-md border border-[var(--journal-rule-strong)] bg-[var(--journal-paper-raised)] px-5 font-journal-mono text-xs font-bold uppercase tracking-[0.1em] disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Show previous case-study spread"
          >
            ← Previous
          </button>

          <div className="flex flex-col items-center gap-3">
            <p className="font-journal-mono text-xs font-semibold text-[var(--journal-ink-muted)]" aria-live="polite">
              Showing {firstVisible}–{lastVisible} of {caseStudies.length}
            </p>
            <div className="flex gap-2" aria-label="Choose a case-study spread">
              {Array.from({ length: totalSpreads }, (_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => turnTo(index)}
                  className={`h-3 w-8 rounded-full border border-[var(--journal-rule-strong)] transition-colors ${index === spreadIndex ? "bg-[var(--journal-verification)]" : "bg-[var(--journal-paper-raised)]"}`}
                  aria-label={`Show case-study spread ${index + 1}`}
                  aria-current={index === spreadIndex ? "page" : undefined}
                />
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => turnTo(spreadIndex + 1)}
            disabled={spreadIndex === totalSpreads - 1}
            className="inline-flex min-h-11 min-w-32 items-center justify-center rounded-md bg-[var(--journal-leather)] px-5 font-journal-mono text-xs font-bold uppercase tracking-[0.1em] text-[#fffaf0] disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Show next case-study spread"
          >
            Next →
          </button>
        </div>
        <p className="mt-4 text-center font-journal-mono text-[10px] uppercase tracking-[0.12em] text-[var(--journal-ink-muted)]">Swipe or use arrow keys to turn the pages</p>
      </div>
    </section>
  );
}

function CaseStudyPage({ caseStudy, index, compact, side }: { caseStudy: FlagshipCaseStudy; index: number; compact: boolean; side: "left" | "right" }) {
  const hasPublicSource = Boolean(caseStudy.links?.github || caseStudy.links?.githubOffline || caseStudy.links?.npm);

  return (
    <article className={`journal-page journal-page-wear relative flex min-h-[590px] flex-col overflow-hidden p-6 sm:p-9 ${side === "left" ? "border-b border-[var(--journal-rule-strong)] lg:border-b-0 lg:border-r lg:pr-12" : "lg:pl-12"}`}>
      <div className="absolute bottom-0 left-9 top-0 w-px bg-[var(--journal-verification)] opacity-20" aria-hidden="true" />
      <div className="relative z-10 flex items-start justify-between gap-4 border-b border-[var(--journal-rule)] pb-5">
        <div>
          <p className="journal-kicker">Case file {String(index + 1).padStart(2, "0")}</p>
          <p className="mt-2 font-journal-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--journal-verification)]">{caseStudy.category}</p>
        </div>
        <div className="journal-sketch flex h-24 w-32 shrink-0 items-center justify-center border border-[var(--journal-rule)] text-[var(--journal-ink-muted)]">
          <CaseStudySketch index={index} />
        </div>
      </div>

      <div className="relative z-10 flex flex-1 flex-col">
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <span className={`rounded-sm px-3 py-2 font-journal-mono text-[10px] font-semibold uppercase tracking-wider text-white shadow-sm ${hasPublicSource ? "bg-[var(--journal-verification)]" : "bg-[var(--journal-brass)]"}`}>
            {hasPublicSource ? "Verified source" : "NDA-safe notes"}
          </span>
          <span className="font-journal-mono text-[10px] font-semibold uppercase text-[var(--journal-ink-muted)]">{caseStudy.status}</span>
        </div>
        <h3 className="mt-4 font-journal-serif text-3xl font-semibold leading-tight text-[var(--journal-ink)]">{caseStudy.title}</h3>
        <p className="mt-4 text-sm leading-7 text-[var(--journal-ink-muted)]">{caseStudy.oneLiner}</p>

        {!compact ? (
          <p className="mt-5 border-l-2 border-[var(--journal-verification)] pl-4 text-sm font-medium leading-6 text-[var(--journal-ink-muted)]">
            {caseStudy.impact[0]}
          </p>
        ) : null}

        <p className="journal-hand-note mt-5 border-l border-[var(--journal-rule-strong)] pl-4 text-sm leading-6 text-[var(--journal-ink-muted)]">{caseStudy.constraints[0]}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {caseStudy.techStack.slice(0, 4).map((tech) => (
            <span key={tech} className="rounded-sm border border-[var(--journal-rule)] bg-[var(--journal-paper-raised)] px-3 py-1 font-journal-mono text-xs font-bold text-[var(--journal-ink-muted)]">{tech}</span>
          ))}
        </div>
        <p className="mt-5 font-journal-mono text-xs font-medium text-[var(--journal-ink-muted)]">Role: {caseStudy.role.slice(0, 2).join(", ")}</p>

        <div className="mt-auto flex flex-wrap gap-3 pt-6">
          <Link href={`/case-studies/${caseStudy.slug}`} aria-label={`Read case study: ${caseStudy.title}`} className="inline-flex min-h-11 items-center rounded-md bg-[var(--journal-leather)] px-4 py-2 text-sm font-bold text-[#fffaf0] transition-transform hover:-translate-y-0.5">
            Read case study
          </Link>
          <CaseStudySourceLink caseStudy={caseStudy} />
        </div>
      </div>
    </article>
  );
}

function CaseStudySourceLink({ caseStudy }: { caseStudy: FlagshipCaseStudy }) {
  const href = caseStudy.links?.github || caseStudy.links?.githubOffline || caseStudy.links?.npm;
  if (!href) {
    return null;
  }

  const label = caseStudy.links?.github ? "GitHub" : caseStudy.links?.githubOffline ? "Offline repo" : "npm";
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={`Open source for ${caseStudy.title}`} className="inline-flex min-h-11 items-center rounded-md border border-[var(--journal-rule-strong)] px-4 py-2 text-sm font-bold text-[var(--journal-ink)]">
      {label}
    </a>
  );
}

function CaseStudySketch({ index }: { index: number }) {
  if (index % 3 === 0) {
    return (
      <svg viewBox="0 0 120 80" className="h-20 w-28" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
        <rect x="18" y="13" width="84" height="54" rx="2" />
        <path d="M18 25h84M31 20h2M38 20h2M45 20h2M29 36h27M29 44h42M29 52h33M82 34v22M76 40h12M76 49h12" />
        <path d="m14 70 15-7M91 71l16-8" strokeDasharray="3 3" />
      </svg>
    );
  }

  if (index % 3 === 1) {
    return (
      <svg viewBox="0 0 120 80" className="h-20 w-28" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
        <path d="M18 58h24V35h25V17h34v41z" />
        <path d="M30 35V24h21v11M42 58V45h15v13M67 30h34M78 17v41" />
        <circle cx="30" cy="66" r="3" /><circle cx="60" cy="66" r="3" /><circle cx="91" cy="66" r="3" />
        <path d="M33 66h24M63 66h25" strokeDasharray="3 3" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 120 80" className="h-20 w-28" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
      <rect x="12" y="20" width="28" height="40" /><rect x="47" y="11" width="28" height="49" /><rect x="82" y="27" width="26" height="33" />
      <path d="M40 39h7M75 39h7M26 20V12h57v15M18 31h16M18 40h16M18 49h16M53 23h16M53 32h16M53 41h16M88 38h14M88 47h14" />
      <path d="m36 17 4-5 4 5M78 23l4 5 4-5" />
    </svg>
  );
}
