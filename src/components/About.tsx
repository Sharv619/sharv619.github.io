"use client";

import { motion } from "framer-motion";
import { about } from "@/lib/data";
import Philosophy from "./Philosophy";

export default function About() {
  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {about.title}
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="prose prose-lg dark:prose-invert mx-auto text-center"
        >
          {about.content.split('\n\n').map((paragraph, index) => (
            <p key={index} className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </motion.div>

        <Philosophy />
      </div>
    </section>
  );
}
