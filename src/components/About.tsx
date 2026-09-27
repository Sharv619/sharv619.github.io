"use client";

import { motion } from "framer-motion";
import { about, howIWork } from "@/lib/data";

export default function About() {
  return (
    <section id="about" className="flex items-center border-y border-stone-200 bg-white py-20 dark:border-white/10 dark:bg-[#151513]">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-[0.72fr_1.28fr] lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="lg:self-center"
        >
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-teal-700 dark:text-teal-300">
            About
          </p>
          <h2 className="text-balance text-4xl font-black leading-tight text-stone-950 sm:text-5xl dark:text-white">
            {about.title}
          </h2>
          <div className="mt-8 hidden border-l-2 border-rose-500 pl-5 lg:block">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-rose-700 dark:text-rose-300">
              Human touch
            </p>
            <p className="mt-3 text-lg font-semibold leading-7 text-stone-800 dark:text-stone-200">
              I want the portfolio to feel like someone who has been in the room during incidents, handoffs, and awkward production tradeoffs.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid gap-5 lg:grid-cols-2"
        >
          {about.content.split('\n\n').map((paragraph, index) => (
            <p key={index} className="rounded-lg border border-stone-200 bg-[#f7f4ed] p-5 text-lg leading-8 text-stone-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-stone-300">
              {paragraph}
            </p>
          ))}

          <div className="border-l-4 border-teal-700 bg-stone-950 p-6 text-white lg:col-span-2 dark:border-teal-300 dark:bg-white/5">
            <h3 className="mb-3 text-2xl font-black text-white">
              {howIWork.title}
            </h3>
            <p className="text-lg leading-8 text-stone-100 dark:text-stone-300">
              {howIWork.content}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
