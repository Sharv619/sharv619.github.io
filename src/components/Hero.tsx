"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { personalInfo, socialLinks } from "@/lib/data";
import { careerPositioning } from "@/lib/career-positioning";

export default function Hero() {
  const proofPoints = [
    { label: "Recovery", value: "NDA-safe production incident work" },
    { label: "Performance", value: "25s load path brought under 3s" },
    { label: "Shipping", value: "700+ regional landing pages deployed" },
  ];

  return (
    <section id="home" className="portfolio-grid relative flex items-center overflow-hidden bg-[#f7f4ed] pt-20 text-stone-950 dark:bg-[#101010] dark:text-white">
      <div className="absolute inset-x-0 top-0 h-2 bg-[linear-gradient(90deg,#0f766e,#f59e0b,#e11d48,#4f46e5)]" />
      <div className="absolute left-0 top-24 hidden h-[calc(100%-6rem)] w-16 border-r border-stone-200/80 bg-white/30 backdrop-blur-sm lg:block dark:border-white/10 dark:bg-white/[0.03]">
        <div className="flex h-full flex-col items-center justify-between py-8 text-[10px] font-black uppercase tracking-[0.24em] text-stone-500 dark:text-stone-400">
          <span className="[writing-mode:vertical-rl]">Portfolio OS</span>
          <span className="[writing-mode:vertical-rl]">Sydney</span>
        </div>
      </div>
      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 px-4 pb-10 pt-8 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-8 lg:pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-7"
        >
          <div className="space-y-4">
            <p className="inline-flex rounded-md border border-teal-700/20 bg-white/70 px-3 py-1 text-sm font-bold text-teal-900 shadow-sm dark:border-teal-300/20 dark:bg-white/5 dark:text-teal-200">
              Software Engineer in Sydney · backend, reliability, applied AI
            </p>
            <h1 className="max-w-4xl text-balance text-5xl font-black leading-[0.92] tracking-normal text-stone-950 sm:text-6xl lg:text-8xl dark:text-white">
              {personalInfo.name}
            </h1>
            <p className="max-w-3xl text-balance text-2xl font-semibold leading-tight text-stone-800 sm:text-3xl dark:text-stone-100">
              {careerPositioning.headline}
            </p>
            <p className="max-w-2xl text-lg leading-8 text-stone-600 dark:text-stone-300">
              {careerPositioning.subheadline}
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="space-y-6"
          >
            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-md bg-stone-950 px-6 py-4 text-base font-bold text-white shadow-lg shadow-stone-950/10 transition-colors duration-200 hover:bg-teal-800 dark:bg-white dark:text-stone-950 dark:hover:bg-teal-200"
              >
                <svg className="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Start a conversation
              </a>
              <a
                href="#projects"
                aria-label="View Himanshu Lade's GitHub project feed"
                className="inline-flex items-center justify-center rounded-md border border-stone-300 bg-white/60 px-6 py-4 text-base font-bold text-stone-900 transition-colors duration-200 hover:border-stone-950 hover:bg-stone-950 hover:text-white dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:bg-white dark:hover:text-stone-950"
              >
                View projects
              </a>
              <a
                href="/himanshu_lade_resume_v3.pdf"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open Himanshu Lade resume PDF"
                className="inline-flex items-center justify-center rounded-md border border-transparent px-4 py-4 text-base font-bold text-stone-700 transition-colors duration-200 hover:text-teal-800 dark:text-stone-300 dark:hover:text-teal-200"
              >
                Resume PDF
              </a>
            </div>

            <div className="flex flex-wrap gap-3 text-sm">
              {Object.entries(socialLinks).map(([key, url]) => (
                <a
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open Himanshu Lade ${key} profile`}
                  className="inline-flex min-h-11 items-center rounded-md border border-stone-300 bg-white/50 px-4 py-2 font-semibold capitalize text-stone-700 transition-colors duration-200 hover:border-teal-700 hover:text-teal-800 dark:border-white/10 dark:bg-white/5 dark:text-stone-300 dark:hover:border-teal-300 dark:hover:text-teal-200"
                >
                  {key}
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative"
        >
          <div className="relative overflow-hidden rounded-lg border border-stone-300 bg-stone-950 shadow-2xl shadow-stone-950/20 dark:border-white/10">
            <div className="grid grid-cols-1 gap-0 sm:grid-cols-[0.92fr_1.08fr] lg:grid-cols-1 xl:grid-cols-[0.92fr_1.08fr]">
              <div className="relative aspect-[4/5] min-h-[420px] overflow-hidden bg-stone-800">
              <Image
                src={personalInfo.avatar}
                alt="Himanshu Lade - Software Engineer"
                fill
                sizes="(min-width: 1280px) 470px, (min-width: 1024px) 42vw, 92vw"
                className="object-cover"
                priority
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0o MCUDBKRYGB0/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoK"
              />
              </div>
              <div className="flex flex-col justify-between p-5">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-teal-200">
                    What this site should prove
                  </p>
                  <p className="mt-4 text-2xl font-black leading-tight text-white">
                    Not just a list of projects. A record of systems, constraints, and work that survived contact with reality.
                  </p>
                </div>
                <div className="mt-6 grid grid-cols-1 gap-3">
                  {proofPoints.map((point) => (
                    <div key={point.label} className="border-l-2 border-teal-300 bg-white/[0.06] p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-200">{point.label}</p>
                      <p className="mt-2 text-sm font-bold leading-snug text-white">{point.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
