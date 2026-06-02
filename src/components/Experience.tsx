"use client";

import { motion } from "framer-motion";
import { experience } from "@/lib/data";

export default function Experience() {
  return (
    <section id="experience" className="flex items-center bg-[#f7f4ed] py-20 dark:bg-[#101010]">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-[0.55fr_1.45fr] lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="lg:pt-8"
        >
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-amber-700 dark:text-amber-300">
            Work history
          </p>
          <h2 className="text-balance text-4xl font-black leading-tight text-stone-950 sm:text-5xl dark:text-white">
            Where the proof came from.
          </h2>
          <p className="mt-5 text-lg leading-8 text-stone-700 dark:text-stone-300">
            The story is not just titles. It is recovery, performance, access boundaries, and delivery under constraints.
          </p>
        </motion.div>

        <div className="relative space-y-5">
          <div className="absolute left-4 top-0 hidden h-full w-px bg-stone-300 md:block dark:bg-white/15" />
          {experience.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative rounded-lg border border-stone-300 bg-white p-5 shadow-sm transition-shadow duration-300 hover:shadow-xl dark:border-white/10 dark:bg-[#171715]"
            >
              <div className="absolute left-4 top-7 hidden h-3 w-3 -translate-x-1/2 rounded-full bg-amber-500 ring-4 ring-[#f7f4ed] md:block dark:ring-[#101010]" />
              <div className="flex flex-col gap-3 md:pl-9 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="text-xl font-black text-stone-950 dark:text-white">
                    {exp.position}
                  </h3>
                  <a
                    href={exp.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-teal-700 hover:text-teal-900 dark:text-teal-300 dark:hover:text-teal-200"
                  >
                    {exp.company}
                  </a>
                </div>
                <span className="rounded-md border border-stone-200 bg-[#f7f4ed] px-3 py-1 text-sm font-bold text-stone-600 dark:border-white/10 dark:bg-white/5 dark:text-stone-300">
                  {exp.duration}
                </span>
              </div>
              <div className="mt-5 grid gap-3 text-stone-700 md:grid-cols-2 md:pl-9 dark:text-stone-300">
                {exp.description.split('\n\n').map((item, index) => (
                  <p key={index} className="border-l-2 border-stone-300 pl-3 text-sm leading-6 dark:border-white/15">
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
