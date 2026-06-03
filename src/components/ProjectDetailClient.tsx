"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown, { type Components } from "react-markdown";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";
import Contact from "@/components/Contact";
import Navigation from "@/components/Navigation";
import type { Project } from "@/lib/data";
import { resolveGitHubReadmeImage, resolveGitHubReadmeUrl } from "@/lib/github-readme";

interface ProjectDetailClientProps {
  project: Project;
}

interface DetailSection {
  title: string;
  lines: string[];
}

export default function ProjectDetailClient({ project }: ProjectDetailClientProps) {
  const projectSlug = project.slug || project.title.toLowerCase().replace(/\s+/g, "-").replace(/\([^)]*\)/g, "").trim();
  const sections = parseArchitectureDetails(project.architectureDetails);
  const overview = project.portfolioSummary || sections.overview || project.description;
  const statusLabel = project.status || (project.archived ? "Archived" : project.caseStudySlug ? "Prototype" : "Active");
  const metadata = [
    ["Primary language", project.primaryLanguage || "Not specified"],
    ["Updated", formatDate(project.pushedAt || project.updatedAt)],
    ["Role", project.role || "GitHub project"],
    ["Source", project.caseStudySlug ? "Curated + GitHub" : "GitHub-backed"],
  ];
  const markdownComponents = createMarkdownComponents(project.githubUrl);

  return (
    <div className="min-h-screen bg-[#f7f4ed] text-stone-950 dark:bg-[#101010] dark:text-white">
      <Navigation />

      <section className="relative overflow-hidden border-b border-stone-200 px-4 pb-14 pt-32 dark:border-white/10 sm:px-6 lg:px-8">
        <div className="absolute inset-0 opacity-[0.14] dark:opacity-[0.1]">
          <div className="h-full w-full bg-[linear-gradient(to_right,#78716c_1px,transparent_1px),linear-gradient(to_bottom,#78716c_1px,transparent_1px)] bg-[size:44px_44px]" />
        </div>
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-10 lg:grid-cols-[1fr_420px] lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <span className="text-sm font-black uppercase tracking-[0.18em] text-teal-700 dark:text-teal-300">
                GitHub project
              </span>
              <span className="rounded-full border border-stone-300 bg-white/70 px-3 py-1 text-sm font-bold capitalize text-stone-700 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-stone-300">
                {statusLabel}
              </span>
            </div>
            <h1 className="text-balance text-5xl font-black leading-[0.96] sm:text-6xl">
              {project.title}
            </h1>
            <p className="mt-6 max-w-3xl text-xl leading-8 text-stone-700 dark:text-stone-300">
              {project.description}
            </p>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08 }}
            className="rounded-lg border border-stone-300 bg-stone-950 p-5 text-white shadow-2xl shadow-stone-950/20 dark:border-white/10"
          >
            <div className="mb-5 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-teal-200">Project file</span>
              <span className="h-3 w-3 rounded-full bg-teal-300" />
            </div>
            <div className="grid grid-cols-1 gap-3">
              {metadata.map(([label, value]) => (
                <div key={label} className="rounded-md border border-white/10 bg-white/[0.06] p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/50">{label}</p>
                  <p className="mt-2 text-sm font-bold leading-6 text-white">{value}</p>
                </div>
              ))}
            </div>
          </motion.aside>
        </div>
      </section>

      <section className="border-b border-stone-200 bg-white py-6 dark:border-white/10 dark:bg-[#151513]">
        <div className="mx-auto flex max-w-7xl flex-wrap gap-3 px-4 sm:px-6 lg:px-8">
          {project.caseStudySlug && (
            <Link
              href={`/projects/${projectSlug}/case-study`}
              aria-label={`View case study for ${project.title}`}
              className="inline-flex min-h-11 items-center rounded-md bg-stone-950 px-5 py-2 text-sm font-bold text-white transition-colors duration-200 hover:bg-teal-800 dark:bg-white dark:text-stone-950 dark:hover:bg-teal-200"
            >
              View Case Study
            </Link>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View live demo for ${project.title}`}
              className="inline-flex min-h-11 items-center rounded-md border border-stone-300 px-5 py-2 text-sm font-bold text-stone-800 transition-colors duration-200 hover:bg-stone-100 dark:border-white/15 dark:text-stone-200 dark:hover:bg-white/10"
            >
              Live Demo
            </a>
          )}
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View source code for ${project.title}`}
            className="inline-flex min-h-11 items-center rounded-md border border-stone-300 px-5 py-2 text-sm font-bold text-stone-800 transition-colors duration-200 hover:bg-stone-100 dark:border-white/15 dark:text-stone-200 dark:hover:bg-white/10"
          >
            GitHub
          </a>
          <Link
            href="/projects"
            aria-label="View all GitHub-powered portfolio projects"
            className="inline-flex min-h-11 items-center rounded-md border border-stone-300 px-5 py-2 text-sm font-bold text-stone-800 transition-colors duration-200 hover:bg-stone-100 dark:border-white/15 dark:text-stone-200 dark:hover:bg-white/10"
          >
            All Projects
          </Link>
        </div>
      </section>

      <section className="py-18">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[360px_1fr] lg:px-8">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-teal-700 dark:text-teal-300">
              Project readout
            </p>
            <h2 className="text-balance text-4xl font-black leading-tight">
              Repository signal, shaped into a portfolio page.
            </h2>
            <p className="mt-5 text-base leading-7 text-stone-700 dark:text-stone-300">
              {overview}
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-stone-300 bg-white px-3 py-2 text-xs font-bold text-stone-800 dark:border-white/10 dark:bg-white/5 dark:text-stone-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </aside>

          <div className="space-y-5">
            {sections.details.map((section, index) => (
              <ReadoutSection key={`${section.title}-${index}`} section={section} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-stone-200 bg-white py-16 dark:border-white/10 dark:bg-[#151513]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-teal-700 dark:text-teal-300">
                Screenshots
              </p>
              <h2 className="text-3xl font-black leading-tight">Visual proof from the project.</h2>
            </div>
            {project.caseStudySlug && (
              <Link
                href={`/projects/${projectSlug}/case-study`}
                className="inline-flex min-h-11 items-center rounded-md border border-stone-300 px-5 py-2 text-sm font-bold text-stone-800 transition-colors duration-200 hover:bg-stone-100 dark:border-white/15 dark:text-stone-200 dark:hover:bg-white/10"
              >
                Open Curated Case Study
              </Link>
            )}
          </div>
          {project.screenshots && project.screenshots.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
              {project.screenshots.map((screenshot) => (
                <figure key={screenshot.src} className="overflow-hidden rounded-lg border border-stone-200 bg-[#f7f4ed] dark:border-white/10 dark:bg-white/5">
                  <Image
                    src={screenshot.src}
                    alt={screenshot.alt}
                    width={1200}
                    height={760}
                    className="h-auto w-full object-cover"
                  />
                  <figcaption className="border-t border-stone-200 px-4 py-3 text-sm font-medium text-stone-700 dark:border-white/10 dark:text-stone-300">
                    {screenshot.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-stone-300 bg-[#f7f4ed] p-6 text-sm font-medium text-stone-700 dark:border-white/15 dark:bg-white/5 dark:text-stone-300">
              Screenshots are not attached yet. The repository README below is rendered as raw repo proof, while the case study remains the curated hiring narrative.
            </div>
          )}
        </div>
      </section>

      <section className="border-t border-stone-200 py-16 dark:border-white/10">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-[300px_1fr] lg:px-8">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-teal-700 dark:text-teal-300">
              Repository README
            </p>
            <h2 className="text-3xl font-black leading-tight">Raw documentation proof.</h2>
            <p className="mt-4 text-base leading-7 text-stone-700 dark:text-stone-300">
              This section renders the public GitHub README safely. It does not replace the curated case study.
            </p>
            {project.readmeSourceUrl && (
              <a
                href={project.readmeSourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex min-h-11 items-center rounded-md border border-stone-300 px-5 py-2 text-sm font-bold text-stone-800 transition-colors duration-200 hover:bg-stone-100 dark:border-white/15 dark:text-stone-200 dark:hover:bg-white/10"
              >
                View on GitHub
              </a>
            )}
          </aside>
          {project.readmeMarkdown ? (
            <article className="overflow-hidden rounded-lg border border-stone-200 bg-white p-5 text-stone-900 shadow-sm dark:border-white/10 dark:bg-white/[0.04] dark:text-stone-100 sm:p-8">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeSanitize]}
                components={markdownComponents}
                skipHtml
              >
                {project.readmeMarkdown}
              </ReactMarkdown>
            </article>
          ) : (
            <div className="rounded-lg border border-dashed border-stone-300 bg-white p-6 text-sm font-medium text-stone-700 dark:border-white/15 dark:bg-white/[0.04] dark:text-stone-300">
              README content is not available for this repository right now. The curated portfolio summary and GitHub metadata are still shown above.
            </div>
          )}
        </div>
      </section>

      <Contact />
    </div>
  );
}

function createMarkdownComponents(githubUrl: string): Components {
  return {
    h1: ({ children }) => <h2 className="mb-5 text-3xl font-black leading-tight">{children}</h2>,
    h2: ({ children }) => <h3 className="mb-4 mt-8 text-2xl font-black leading-tight">{children}</h3>,
    h3: ({ children }) => <h4 className="mb-3 mt-6 text-xl font-black leading-tight">{children}</h4>,
    p: ({ children }) => <p className="mb-4 text-base leading-7 text-stone-700 dark:text-stone-300">{children}</p>,
    ul: ({ children }) => <ul className="mb-5 list-disc space-y-2 pl-6 text-stone-700 dark:text-stone-300">{children}</ul>,
    ol: ({ children }) => <ol className="mb-5 list-decimal space-y-2 pl-6 text-stone-700 dark:text-stone-300">{children}</ol>,
    li: ({ children }) => <li className="leading-7">{children}</li>,
    a: ({ href, children }) => (
      <a
        href={resolveGitHubReadmeUrl(href, githubUrl)}
        target={href?.startsWith("#") ? undefined : "_blank"}
        rel={href?.startsWith("#") ? undefined : "noopener noreferrer"}
        className="font-bold text-teal-700 underline decoration-teal-700/30 underline-offset-4 hover:text-teal-900 dark:text-teal-300 dark:hover:text-teal-100"
      >
        {children}
      </a>
    ),
    img: ({ src, alt }) => {
      const resolvedSrc = resolveGitHubReadmeImage(typeof src === "string" ? src : undefined, githubUrl);

      if (!resolvedSrc) {
        return null;
      }

      return (
        <Image
          src={resolvedSrc}
          alt={alt || "Repository README image"}
          width={1100}
          height={680}
          className="my-6 h-auto w-full rounded-lg border border-stone-200 object-contain dark:border-white/10"
          unoptimized
        />
      );
    },
    code: ({ children }) => (
      <code className="rounded bg-stone-100 px-1.5 py-0.5 text-sm font-bold text-stone-900 dark:bg-white/10 dark:text-stone-100">
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="mb-5 overflow-x-auto rounded-lg bg-stone-950 p-4 text-sm leading-6 text-stone-100">
        {children}
      </pre>
    ),
    blockquote: ({ children }) => (
      <blockquote className="mb-5 border-l-4 border-teal-600 bg-teal-50 px-4 py-3 text-stone-800 dark:border-teal-300 dark:bg-teal-300/10 dark:text-stone-200">
        {children}
      </blockquote>
    ),
    table: ({ children }) => (
      <div className="mb-6 overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm">{children}</table>
      </div>
    ),
    th: ({ children }) => <th className="border border-stone-300 bg-stone-100 px-3 py-2 font-black dark:border-white/10 dark:bg-white/10">{children}</th>,
    td: ({ children }) => <td className="border border-stone-300 px-3 py-2 align-top dark:border-white/10">{children}</td>,
  };
}

function ReadoutSection({ section, index }: { section: DetailSection; index: number }) {
  const tones = [
    "border-teal-600 bg-teal-50 text-teal-950 dark:border-teal-300 dark:bg-teal-300/10 dark:text-teal-100",
    "border-indigo-500 bg-indigo-50 text-indigo-950 dark:border-indigo-300 dark:bg-indigo-300/10 dark:text-indigo-100",
    "border-amber-500 bg-amber-50 text-amber-950 dark:border-amber-300 dark:bg-amber-300/10 dark:text-amber-100",
    "border-stone-400 bg-white text-stone-900 dark:border-white/15 dark:bg-white/5 dark:text-stone-100",
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      viewport={{ once: true }}
      className={`rounded-lg border-l-4 p-6 shadow-sm ${tones[index % tones.length]}`}
    >
      <h3 className="text-2xl font-black">{section.title}</h3>
      <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2">
        {section.lines.map((line) => (
          <p key={line} className="rounded-md bg-white/70 p-4 text-sm font-medium leading-6 text-current shadow-sm dark:bg-black/15">
            {line}
          </p>
        ))}
      </div>
    </motion.section>
  );
}

function parseArchitectureDetails(details: string): { overview: string; details: DetailSection[] } {
  const blocks = details.split(/\n{2,}/).map((block) => block.trim()).filter(Boolean);
  const overview = blocks[0] || "";
  const parsed = blocks.slice(1).map((block) => {
    const lines = block.split("\n").map((line) => cleanLine(line)).filter(Boolean);
    const firstLine = lines[0] || "Details";
    const isHeading = firstLine.endsWith(":") || !firstLine.startsWith("•");
    const title = cleanTitle(isHeading ? firstLine : "Details");
    const sectionLines = (isHeading ? lines.slice(1) : lines).map((line) => line.replace(/^•\s*/, "")).filter(Boolean);

    return {
      title,
      lines: sectionLines.length > 0 ? sectionLines : [firstLine],
    };
  });

  return {
    overview,
    details: parsed.length > 0 ? parsed : [{ title: "Details", lines: [overview] }],
  };
}

function cleanLine(line: string): string {
  return line.replace(/\*\*(.*?)\*\*/g, "$1").trim();
}

function cleanTitle(title: string): string {
  return title.replace(/:$/, "").replace(/^•\s*/, "");
}

function formatDate(value?: string): string {
  if (!value) {
    return "Not specified";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}
