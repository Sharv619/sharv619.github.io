"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Investments() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section id="investments-hero" className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Strategic Assets & AI Governance
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Investments guided by technical due diligence, focused on acquiring governance influence in protocols that align with proprietary intellectual property development in AI and decentralized infrastructure.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Core Competencies */}
      <section id="competencies" className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Core Competencies
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* AI Governance & RAG Integration */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 shadow-lg"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
                AI Governance & RAG Integration
              </h3>
              <ul className="space-y-4 text-gray-600 dark:text-gray-300">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span><strong>RAG-Driven Policy Enforcement:</strong> Designing and deploying Retrieval-Augmented Generation (RAG) models to inform governance decisions and audit complex codebases.</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span><strong>Multi-Agent Orchestration:</strong> Expertise in using specialized AI agents (Security, Architecture) to analyze protocol health and risk profiles.</span>
                </li>
              </ul>
            </motion.div>

            {/* Technical Due Diligence */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 shadow-lg"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
                Technical Due Diligence
              </h3>
              <ul className="space-y-4 text-gray-600 dark:text-gray-300">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span><strong>Smart Contract Security Audit:</strong> Proven capacity to perform pre-deployment audits and vulnerability assessments on DLT protocols.</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span><strong>Decentralized Systems Analysis:</strong> Whitepaper deconstruction and technical validation to assess tokenomics, roadmap viability, and core system trust assumptions.</span>
                </li>
              </ul>
            </motion.div>

            {/* Platform & Asset Security */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 shadow-lg"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
                Platform & Asset Security
              </h3>
              <ul className="space-y-4 text-gray-600 dark:text-gray-300">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span><strong>Custody & Operational Security:</strong> Expertise in institutional-grade custody solutions (e.g., multi-sig wallets, time-lock contracts) and formal KYC/AML compliance frameworks.</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span><strong>Liability & Structural Mitigation:</strong> Deep understanding of DAC legal ambiguity and the necessity of structural wrappers for asset segregation.</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Project Integration */}
      <section id="project-integration" className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              AI Architecture Informing Governance
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              The concepts proven in engineering projects provide the exact frameworks used to assess architectural integrity before strategic positioning.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-900 rounded-lg p-8 shadow-lg"
          >
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  Codeflow Hook: RAG Architecture Applied to Protocol Assessment
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                  The RAG architecture and multi-agent systems demonstrated in Codeflow Hook represent the precise methodology used to analyze protocol health, assess security postures, and validate technical roadmaps. Investment decisions are fundamentally dictated by verifiable technical milestones, ensuring governance positions are acquired in protocols demonstrating genuine architectural integrity rather than market momentum.
                </p>
                <Link
                  href="/#projects"
                  className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors duration-300"
                >
                  More details →
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Strategy Outcome */}
      <section id="strategy-outcome" className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Building Influence, Not Just Capital
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-8 shadow-lg"
          >
            <div className="text-center">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                Self-Reinforcing Strategy: Technical Development & Strategic Positioning
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                The primary objective transcends capital accumulation—it's the acquisition of governance rights that enable steering protocols toward adoption of proprietary intellectual property. This includes integration of self-developed verification oracles, multi-agent governance systems, and AI-enhanced security frameworks, creating a virtuous cycle where technical innovation informs strategic positioning, and governance influence accelerates development velocity.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>IP-Driven Protocol Governance</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span>AI-Enhanced Security Frameworks</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <span>Accelerated Innovation Velocity</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="investments-cta" className="py-16 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Engineering Meets Strategic Governance
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              Bridging technical mastery with governance influence to shape the future of decentralized infrastructure.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-300"
              >
                Discuss Strategic Opportunities
              </Link>
              <Link
                href="/#projects"
                className="inline-flex items-center justify-center px-8 py-4 border border-white/30 hover:bg-white/10 text-white font-semibold rounded-lg transition-colors duration-300"
              >
                Explore Technical Projects
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
