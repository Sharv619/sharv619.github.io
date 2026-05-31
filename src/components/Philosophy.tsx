"use client";

import { motion } from "framer-motion";

export default function Philosophy() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      viewport={{ once: true }}
      className="mt-12 prose prose-lg dark:prose-invert mx-auto"
    >
      <h3 className="text-center text-2xl font-bold text-gray-900 dark:text-white mb-6">
        My Philosophy
      </h3>

      <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
        Clean, maintainable code is the foundation of everything I build. I believe in writing modular, well-documented code with comprehensive test suites, ensuring that every deployment builds trust rather than introducing new risks. The goal isn&apos;t perfection—it&apos;s sustainable evolution.
      </p>

      <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
        User-centric design drives my approach. Every decision starts with understanding user needs, validated through iterative design and real-world testing. Performance matters, but it must never compromise usability, security, or maintainability.
      </p>

      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
        Continuous learning keeps me practical in a rapidly changing industry. I experiment with AI-assisted workflows and automation, then keep the public framing clear about what is production work, what is an MVP, and what is exploratory.
      </p>
    </motion.div>
  );
}
