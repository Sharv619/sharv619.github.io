"use client";

import { motion } from "framer-motion";
import { about, howIWork } from "@/lib/data";

export default function About() {
  return (
    <section id="about" className="border-y border-stone-200 bg-white py-20 dark:border-white/10 dark:bg-[#151513]">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="lg:sticky lg:top-28 lg:self-start"
        >
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-teal-700 dark:text-teal-300">
            About
          </p>
          <h2 className="text-balance text-4xl font-black leading-tight text-stone-950 sm:text-5xl dark:text-white">
            {about.title}
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          {about.content.split('\n\n').map((paragraph, index) => (
            <p key={index} className="text-lg leading-8 text-stone-650 text-stone-700 dark:text-stone-300">
              {paragraph}
            </p>
          ))}

          <div className="border-l-4 border-teal-700 bg-[#f7f4ed] p-6 dark:border-teal-300 dark:bg-white/5">
            <h3 className="mb-3 text-2xl font-black text-stone-950 dark:text-white">
              {howIWork.title}
            </h3>
            <p className="text-lg leading-8 text-stone-700 dark:text-stone-300">
              {howIWork.content}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
