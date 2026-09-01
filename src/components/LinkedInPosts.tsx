"use client";

import { motion } from "framer-motion";
import { linkedinPosts } from "@/lib/linkedin-posts";
import { socialLinks } from "@/lib/data";

/**
 * Renders LinkedIn's official post embed iframe.
 * `activityId` is the numeric id at the end of a post URL, e.g.
 * https://www.linkedin.com/posts/himanshu-lade_some-slug-activity-7182736451234567890-ab12
 *                                                                    ^^^^^^^^^^^^^^^^^^^^ this part
 */
function embedSrc(activityId: string) {
  return `https://www.linkedin.com/embed/feed/update/urn:li:activity:${activityId}`;
}

export default function LinkedInPosts() {
  if (linkedinPosts.length === 0) return null;

  return (
    <section id="linkedin" className="bg-gray-50 py-20 dark:bg-gray-900">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-10 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
            From LinkedIn
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-gray-600 dark:text-gray-300">
            Recent posts and updates.{" "}
            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-blue-600 underline-offset-4 hover:underline dark:text-blue-400"
            >
              Follow along on LinkedIn
            </a>
            .
          </p>
          <div className="mx-auto mt-6 h-1 w-24 bg-blue-600" />
        </motion.div>

        <div className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {linkedinPosts.map((post) => (
            <div
              key={post.activityId}
              className="w-[300px] shrink-0 snap-start overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800 sm:w-[400px]"
            >
              <iframe
                src={embedSrc(post.activityId)}
                height="500"
                width="100%"
                title={post.title}
                loading="lazy"
                className="block"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
