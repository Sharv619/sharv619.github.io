"use client";

import { motion } from "framer-motion";

const edges = [
  {
    title: "Full-Stack Agility",
    description: "From sketching system diagrams to pushing the final Docker image, I have engineered end‑to‑end solutions that scale. On a recent e‑commerce platform, I designed a modular monorepo, implemented serverless APIs, and integrated CI/CD pipelines, cutting time‑to‑market by 40% while maintaining strict security standards.",
    icon: "🏗️"
  },
  {
    title: "AI/ML Integration",
    description: "When the challenge was to turn static documentation into an intelligent assistant, I built a Retrieval‑Augmented Generation pipeline using Gemini’s embeddings, enabling users to ask natural‑language queries and receive context‑aware answers in under 300 ms. This proof‑of‑concept now powers internal knowledge bases, demonstrating the power of AI‑first design.",
    icon: "🤖"
  },
  {
    title: "DevOps & Performance Mastery",
    description: "I re‑architected a legacy Node.js service into a containerized microservice, introduced automated load testing, and tuned database indexes, delivering an 88% performance uplift and 99.99% uptime. The CI/CD workflow now deploys with zero‑downtime blue‑green releases, and observability dashboards alert before issues surface.",
    icon: "⚡"
  },
  {
    title: "Mission-Critical Resilience",
    description: "In a high‑stakes scenario where every second counted, I led a disaster‑recovery drill for a fintech platform, automating failover across regions. The plan restored 100% of services within minutes, with zero data loss, and earned commendation from senior leadership for building a rock‑solid, resilient architecture.",
    icon: "🛡️"
  }
];

export default function HimanshuEdge() {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            The Himanshu Edge
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {edges.map((edge, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-start space-x-4">
                <div className="text-3xl">{edge.icon}</div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {edge.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {edge.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
