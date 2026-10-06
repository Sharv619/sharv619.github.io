"use client";

import { motion } from "framer-motion";
import { experience } from "@/lib/data";

export default function Experience() {
  return (
    <section id="experience" className="journal-page flex items-center py-20">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-[0.55fr_1.45fr] lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="lg:pt-8"
        >
          <p className="journal-kicker mb-3">
            Career ledger
          </p>
          <h2 className="font-journal-serif text-balance text-4xl font-semibold leading-tight text-[var(--journal-ink)] sm:text-5xl">
            Where the proof came from.
          </h2>
          <p className="mt-5 text-lg leading-8 text-[var(--journal-ink-muted)]">
            The story is not just titles. It is recovery, performance, public-facing audits, access boundaries, and delivery under constraints.
          </p>
        </motion.div>

        <div className="relative space-y-5">
          <div className="absolute left-4 top-0 hidden h-full border-l-2 border-dashed border-[var(--journal-rule-strong)] md:block" />
          {experience.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="journal-card relative rounded-md p-5"
            >
              <div className="absolute left-4 top-7 hidden h-3 w-3 -translate-x-1/2 rounded-full bg-[var(--journal-verification)] ring-4 ring-[var(--journal-paper)] md:block" />
              <div className="flex flex-col gap-3 md:pl-9 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="font-journal-serif text-xl font-semibold text-[var(--journal-ink)]">
                    {exp.position}
                  </h3>
                  <a
                    href={exp.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${exp.company} website`}
                    className="font-bold text-[var(--journal-verification)] underline-offset-4 hover:underline"
                  >
                    {exp.company}
                  </a>
                </div>
                <span className="rounded-sm border border-[var(--journal-rule)] bg-[var(--journal-paper)] px-3 py-1 font-journal-mono text-xs font-bold text-[var(--journal-ink-muted)]">
                  {exp.duration}
                </span>
              </div>
              <div className="mt-5 grid gap-3 text-[var(--journal-ink-muted)] md:grid-cols-2 md:pl-9">
                {exp.description.split('\n\n').map((item, index) => (
                  <p key={index} className="border-l-2 border-[var(--journal-rule-strong)] pl-3 text-sm leading-6">
                    {item}
                  </p>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
