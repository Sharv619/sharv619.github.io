"use client";

import { motion } from "framer-motion";
import { useState } from "react";
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
  const [activeIndex, setActiveIndex] = useState(0);
  const activePost = linkedinPosts[activeIndex];

  const showPreviousPost = () => {
    setActiveIndex((currentIndex) =>
      currentIndex === 0 ? linkedinPosts.length - 1 : currentIndex - 1
    );
  };

  const showNextPost = () => {
    setActiveIndex((currentIndex) =>
      currentIndex === linkedinPosts.length - 1 ? 0 : currentIndex + 1
    );
  };

  return (
    <section id="linkedin" className="border-t border-stone-200 bg-white py-16 dark:border-white/10 dark:bg-[#151513]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="overflow-hidden rounded-xl border border-stone-300 bg-[#f7f4ed] shadow-xl shadow-stone-950/5 dark:border-white/10 dark:bg-[#101010] dark:shadow-black/20 lg:grid lg:grid-cols-[0.8fr_1.2fr]"
        >
          <div className="flex flex-col justify-between bg-[#0a66c2] p-7 text-white sm:p-9">
            <div>
            <div className="flex items-center gap-3">
              <LinkedInMark />
              <p className="text-xs font-black uppercase tracking-[0.22em] text-white/75">
                Active on LinkedIn
              </p>
            </div>
            <h2 className="mt-6 text-3xl font-black tracking-tight text-white sm:text-4xl">
              Himanshu Lade
            </h2>
            <p className="mt-2 font-semibold text-white/75">Software Engineer · Sydney</p>
            <p className="mt-6 max-w-md leading-7 text-white/90">
              Build notes, lessons from the messy middle, and ideas that are still taking shape.
            </p>
            </div>
            <a
              href={linkedInActivityUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex min-h-11 w-fit items-center rounded-md border border-white/30 bg-white px-5 py-3 text-sm font-black text-[#0a66c2] transition-colors hover:bg-sky-50"
            >
              View LinkedIn profile
              <span aria-hidden="true" className="ml-2">↗</span>
            </a>
          </div>

          <div className="flex min-h-[390px] flex-col p-7 sm:p-9">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#0a66c2] dark:text-sky-300">
                  Latest posts
                </p>
                <p className="mt-2 text-sm font-semibold text-stone-500 dark:text-stone-400">
                  {activeIndex + 1} / {linkedinPosts.length}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={showPreviousPost}
                  aria-label="Show previous LinkedIn post"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-stone-300 bg-white text-xl font-bold text-stone-800 transition-colors hover:border-[#0a66c2] hover:text-[#0a66c2] dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:border-sky-300 dark:hover:text-sky-300"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={showNextPost}
                  aria-label="Show next LinkedIn post"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-stone-300 bg-white text-xl font-bold text-stone-800 transition-colors hover:border-[#0a66c2] hover:text-[#0a66c2] dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:border-sky-300 dark:hover:text-sky-300"
                >
                  →
                </button>
              </div>
            </div>

            <motion.article
              key={activePost.activityId}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-1 flex-col pt-8"
            >
              <div className="flex flex-wrap gap-2">
                {activePost.topics.map((topic) => (
                  <span
                    key={topic}
                    className="rounded-full border border-stone-300 bg-white px-3 py-1 text-xs font-bold text-stone-700 dark:border-white/15 dark:bg-white/5 dark:text-stone-300"
                  >
                    {topic}
                  </span>
                ))}
              </div>
              <h3 className="mt-5 text-2xl font-black leading-tight text-stone-950 dark:text-white sm:text-3xl">
                {activePost.title}
              </h3>
              <p className="mt-4 max-w-2xl leading-7 text-stone-700 dark:text-stone-300">
                {activePost.excerpt}
              </p>
              <a
                href={activePost.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Read ${activePost.title} on LinkedIn`}
                className="mt-auto inline-flex min-h-11 w-fit items-center pt-7 text-sm font-black text-[#0a66c2] underline-offset-4 hover:underline dark:text-sky-300"
              >
                Read this post on LinkedIn <span aria-hidden="true" className="ml-2">↗</span>
              </a>
            </motion.article>

            <div className="mt-7 flex gap-2" aria-label="LinkedIn post carousel">
              {linkedinPosts.map((post, index) => (
                <button
                  key={post.activityId}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Show LinkedIn post ${index + 1}`}
                  aria-current={index === activeIndex ? "true" : undefined}
                  className={`h-2 rounded-full transition-all ${
                    index === activeIndex
                      ? "w-8 bg-[#0a66c2]"
                      : "w-2 bg-stone-300 hover:bg-stone-400 dark:bg-stone-600"
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
