"use client";

import { motion } from "framer-motion";
import { linkedInActivityUrl, linkedinPosts } from "@/lib/linkedin-posts";

function LinkedInMark() {
  return (
    <span
      aria-hidden="true"
      className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-[#0a66c2] text-sm font-black text-white"
    >
      in
    </span>
  );
}

export default function LinkedInPosts() {
  return (
    <section id="linkedin" className="border-y border-stone-200 bg-[#e8f0ed] py-20 dark:border-white/10 dark:bg-[#111917]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,2.2fr)] lg:gap-14"
        >
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="flex items-center gap-3">
              <LinkedInMark />
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#0a66c2] dark:text-sky-300">
                LinkedIn presence
              </p>
            </div>
            <h2 className="mt-5 text-3xl font-black tracking-tight text-stone-950 dark:text-white sm:text-4xl">
              Notes from the build.
            </h2>
            <p className="mt-4 max-w-md leading-7 text-stone-700 dark:text-stone-300">
              The work-in-progress thoughts, lessons, and odd connections that do not fit inside a project card.
            </p>
            <a
              href={linkedInActivityUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex min-h-11 items-center rounded-md bg-stone-950 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#0a66c2] dark:bg-white dark:text-stone-950 dark:hover:bg-sky-300"
            >
              See every post on LinkedIn
              <span aria-hidden="true" className="ml-2">↗</span>
            </a>
          </div>

          <div className="divide-y divide-stone-300 border-y border-stone-300 dark:divide-white/15 dark:border-white/15">
            {linkedinPosts.map((post, index) => (
              <a
                key={post.activityId}
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Read ${post.title} on LinkedIn`}
                className="group grid gap-5 py-7 transition-colors first:pt-0 last:pb-0 sm:grid-cols-[3rem_minmax(0,1fr)_auto] sm:py-8"
              >
                <span className="font-mono text-sm font-bold text-stone-500 dark:text-stone-400">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>
                  <span className="block text-xl font-black leading-snug text-stone-950 transition-colors group-hover:text-[#0a66c2] dark:text-white dark:group-hover:text-sky-300 sm:text-2xl">
                    {post.title}
                  </span>
                  <span className="mt-3 block max-w-2xl leading-7 text-stone-700 dark:text-stone-300">
                    {post.excerpt}
                  </span>
                  <span className="mt-4 flex flex-wrap gap-2">
                    {post.topics.map((topic) => (
                      <span
                        key={topic}
                        className="rounded-full border border-stone-300 bg-white/50 px-3 py-1 text-xs font-bold text-stone-700 dark:border-white/15 dark:bg-white/5 dark:text-stone-300"
                      >
                        {topic}
                      </span>
                    ))}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className="text-2xl font-light text-stone-500 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#0a66c2] dark:text-stone-400 dark:group-hover:text-sky-300"
                >
                  ↗
                </span>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
