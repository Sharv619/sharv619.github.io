"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import Navigation from "@/components/Navigation";

export default function Investments() {
  return (
    <main className="journal-shell min-h-screen">
      <Navigation />
      <section className="journal-grid px-4 pb-16 pt-32 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-4xl">
          <p className="journal-kicker">Archive / outside the main index</p>
          <h1 className="mt-4 font-journal-serif text-5xl font-semibold sm:text-7xl">Experimental Archive</h1>
          <p className="mt-6 max-w-3xl text-xl leading-8 text-[var(--journal-muted)]">This page is a parked archive for exploratory thinking and is not part of the main job-focused portfolio narrative.</p>
        </motion.div>
      </section>
      <section className="journal-page px-4 py-20 sm:px-6">
        <div className="journal-card mx-auto max-w-3xl border-l-4 border-l-[var(--journal-red)] p-8 sm:p-10">
          <p className="journal-kicker">Scope note</p>
          <h2 className="mt-3 font-journal-serif text-3xl font-semibold">Hiring portfolio focus</h2>
          <p className="mt-5 leading-7 text-[var(--journal-muted)]">The main portfolio focuses on software engineering evidence: production recovery, backend and cloud deployment work, responsible AI workflow prototypes, developer tooling, and public GitHub projects.</p>
          <p className="mt-4 leading-7 text-[var(--journal-muted)]">Investment, governance, or market research ideas remain personal exploratory notes unless separately documented with clear evidence and scope.</p>
          <div className="mt-8 flex flex-wrap gap-3"><Link href="/" className="rounded-full bg-[var(--journal-red)] px-5 py-3 text-sm font-semibold text-white">Back to portfolio</Link><Link href="/case-studies" className="rounded-full border border-[var(--journal-rule)] px-5 py-3 text-sm font-semibold">View case studies</Link></div>
        </div>
      </section>
    </main>
  );
}
