import { projects as fallbackProjects, slugify } from "./data";
import { enrichGitHubProjectEvidence } from "./github-evidence-enrichment";
import { decodeGitHubBase64Content, getReadmeSourceUrl } from "./github-readme";
import type { Project } from "./data";
import type { GitHubEvidenceMetadata } from "./github-evidence-enrichment";

export const DEFAULT_GITHUB_USERNAME = process.env.PORTFOLIO_GITHUB_USERNAME || "Sharv619";
export const PORTFOLIO_TOPIC = process.env.PORTFOLIO_GITHUB_TOPIC || "all";

const GITHUB_API_BASE = "https://api.github.com";
const PAGE_SIZE = 100;
const ENRICHMENT_CONCURRENCY = 4;
const ALL_PROJECTS_TOPICS = new Set(["all", "*"]);
const HIDDEN_TECHNOLOGY_KEYS = new Set(["go template", "makefile", "mako", "perl", "smarty"]);
const CASE_STUDY_SLUG_BY_REPO_NAME: Record<string, string> = {
<<<<<<< HEAD
  "Build_wit_AI": "pilly-medimate-voice",
=======
>>>>>>> main
  "backpocket-os-ai": "backpocket-os-ai-offline",
  "backpocket-os-ai-offline": "backpocket-os-ai-offline",
  "codeflow-commander---nexus-gateway": "codeflow-commander",
  "codeflow-hook": "codeflow-hook",
  "network-guardian-ai": "network-guardian-ai",
};
<<<<<<< HEAD

const PROJECT_PAGE_OVERRIDES_BY_REPO_NAME: Record<string, Partial<Project>> = {
  "Build_wit_AI": {
    title: "Pilly / MediMate Voice",
    description: "Firebase-backed hackathon prototype for responsible medication reminders, senior-friendly responses, caregiver visibility, and deterministic AI fallback behavior.",
    portfolioSummary: "Hackathon prototype for senior-friendly medication reminder workflows with Firebase, caregiver visibility, and explicit responsible-AI safety boundaries.",
    technologies: ["Firebase", "Firestore", "Cloud Functions", "TypeScript", "HTML", "Tailwind CSS", "Gemini", "Voice", "Responsible AI"],
    slug: "build-wit-ai",
    liveUrl: "https://medimate-voice-demo.web.app",
    status: "Hackathon prototype",
    role: "Team contributor",
    featured: true,
    priority: 80,
    architectureDetails: `Pilly / MediMate Voice is a hackathon MVP for medication reminder support with explicit safety boundaries.

Problem:
• Seniors and caregivers need simple visibility around reminders, snoozes, refusals, missed-dose states, and help requests.
• The AI boundary matters because the system must not diagnose, recommend dosage, or make medical decisions.

What I built / designed:
• A Firebase-backed reminder workflow around event-based medication prompts such as breakfast, dinner, bedtime, leaving home, and post-discharge check-ins.
• A senior-friendly response flow using large controls, typed input, and voice input.
• Caregiver-facing visibility into medication logs, notifications, refusal reasons, and help requests.
• Trusted Family Voice Reminder support using caregiver-provided audio with explicit consent messaging.

Technical highlights:
• Firebase Hosting frontend with HTML, Tailwind CDN, and vanilla JavaScript.
• Firestore collections for households, users, medications, logs, routine events, notifications, script uploads, and voice reminder metadata.
• Cloud Function-first workflows for medication response recording, event completion, leaving-home simulation, and response classification.
• Gemini response classification from Cloud Functions only, with deterministic fallback when no API key is configured.
• Firebase Storage for caregiver-uploaded or recorded family reminder audio.

Safety boundary:
• Hackathon prototype only. Not medical advice, not a medical device, not for real patient data, and not a replacement for clinicians, pharmacists, emergency services, or prescribed care plans.`,
  },
  "backpocket-os-ai": {
    title: "BackPocket OS AI",
    description: "Local-first AI operations assistant prototype for small-business admin workflows, focused on email triage, quotes, records, and human-approved actions.",
    portfolioSummary: "Small-business AI operating-system prototype focused on turning admin inputs into structured, human-approved workflows.",
    technologies: ["Python", "FastAPI", "Flutter", "SQLite", "Gmail", "Ollama", "Gemini", "RAG", "Docker"],
    status: "Prototype / design pivot",
    role: "Solo builder / product architect",
    featured: true,
    priority: 95,
    architectureDetails: `BackPocket OS AI explores a practical business operating system for small operators who need help turning messy admin inputs into structured work.

Problem:
• Small businesses lose time across quotes, invoices, Gmail follow-ups, job notes, payments, documents, and lead tracking.
• Generic AI assistants are too disconnected from the operational workflow and too risky if they act without review.

What I built / designed:
• A local-first assistant direction where Pip can draft, classify, and organize work while the operator approves outbound or destructive actions.
• Backend workflow direction around FastAPI, local storage, Gmail/Drive-style integrations, and structured business records.
• A product pivot toward offline-first ownership, privacy, and human-in-the-loop review instead of a generic cloud chatbot.

Technical highlights:
• Email triage pipeline direction for classify, draft, approve, send/archive, and notify.
• Local-first storage direction using SQLite first, with a self-hosted PostgreSQL path later.
• AI fallback strategy across local Ollama, hosted model fallback, and Gemini.
• Workflow modeling for leads, quotes, invoices, payments, job files, ABN/GST checks, and document search.
• RAG/document intelligence direction for retrieving relevant business context before drafting.

Status:
• Prototype / design pivot. This page avoids production, revenue, uptime, or usage claims until they are verified.`,
  },
  "backpocket-os-ai-offline": {
    title: "BackPocket OS AI Offline",
    description: "Offline-first BackPocket OS pivot for operator-owned AI workflows, with local data ownership, approval gates, and small-business admin automation.",
    portfolioSummary: "Offline-first product pivot for operator-owned AI workflows, local records, approval gates, and small-business admin automation.",
    technologies: ["Python", "FastAPI", "Flutter", "SQLite", "Gmail", "Ollama", "Gemini", "RAG", "Docker"],
    status: "Prototype / design pivot",
    role: "Solo builder / product architect",
    featured: true,
    priority: 100,
    architectureDetails: `BackPocket OS AI Offline is the local-first pivot direction for BackPocket OS.

Problem:
• Small operators need admin leverage without handing business context fully to a cloud-only assistant.
• The important workflow is not just chat; it is turning requests, documents, reminders, and follow-ups into approved operational actions.

What I built / designed:
• A voice-first and approval-first assistant concept for quotes, email triage, lead tracking, job notes, and document search.
• A local storage direction where sensitive workflow context can remain operator-owned.
• A fallback AI design using local inference first where possible, then hosted providers when needed.

Technical highlights:
• FastAPI backend direction with local persistence.
• SQLite-first storage model with later PostgreSQL/self-hosted path.
• Gmail/Drive/Sheets integration planning.
• Human approval boundaries before emails, quotes, payments, or destructive updates.
• RAG-assisted document context for business records.

Status:
• Prototype / design pivot. It should be discussed as a product exploration, not a verified production SaaS platform.`,
  },
  "network-guardian-ai": {
    title: "Network Guardian AI",
    description: "AI-assisted network traffic review prototype using anomaly signals, entropy-style scoring, FastAPI, React, SQLite, and local/hosted AI summaries.",
    portfolioSummary: "Network-security prototype that makes traffic signals easier to inspect with anomaly detection, entropy-style features, and grounded AI summaries.",
    technologies: ["Python", "FastAPI", "React", "SQLite", "AdGuard", "Ollama", "Gemini", "Isolation Forest", "Entropy"],
    status: "Prototype",
    role: "Solo builder",
    featured: true,
    priority: 90,
    architectureDetails: `Network Guardian AI is a prototype for making network traffic easier to inspect and explain.

Problem:
• Network events can be noisy, difficult to prioritize, and hard to explain quickly without structured signals.
• AI summaries are useful only when they stay grounded in observable data and avoid overstating security impact.

What I built / designed:
• A FastAPI and React prototype for reviewing traffic signals and producing AI-assisted summaries.
• A detection direction using anomaly-style scoring, entropy-oriented features, and structured event storage.
• A privacy-aware AI path that can use local models such as Ollama, with hosted model fallback where appropriate.

Technical highlights:
• FastAPI backend for ingestion and analysis endpoints.
• React interface for reviewing network and security signals.
• SQLite-backed prototype storage.
• Isolation Forest-style anomaly detection direction.
• Entropy-style scoring for suspicious or unusual patterns.
• Local/hosted AI summary boundary using Ollama and Gemini.

Status:
• Prototype. It should not be described as a production security control or a verified threat-detection system.`,
  },
  "codeflow-commander---nexus-gateway": {
    title: "CodeFlow Commander / Nexus Gateway",
    description: "Developer-tooling prototype exploring AI-assisted code review workflows, git hook automation, security checks, CLI ergonomics, and review orchestration.",
    portfolioSummary: "Developer-tooling prototype for AI-assisted review orchestration across git hook workflows, CLI commands, and security-oriented feedback.",
    technologies: ["Node.js", "TypeScript", "CLI", "Git Hooks", "AI Review", "Security", "Developer Tools"],
    status: "Prototype / platform exploration",
    role: "Solo builder",
    featured: true,
    priority: 85,
    architectureDetails: `CodeFlow Commander / Nexus Gateway explores AI-assisted developer tooling around review workflows.

Problem:
• Developers need fast pre-commit and review feedback, but generic AI chat workflows are hard to integrate into normal git habits.
• Automated review needs clear boundaries so AI assists judgment without pretending to replace engineering ownership.

What I built / designed:
• A developer-tooling prototype around git hook workflows, review orchestration, and structured code feedback.
• A platform direction for connecting CLI commands, review rules, security checks, and AI-assisted analysis.
• A safer review flow where generated findings are framed as suggestions requiring developer review.

Technical highlights:
• Node.js / TypeScript CLI direction.
• Git hook integration and staged-file analysis.
• AI review orchestration for code quality, security, and maintainability prompts.
• Provider-agnostic review direction for future model flexibility.
• Nexus Gateway framing for routing review tasks through a consistent command surface.

Status:
• Prototype / platform exploration. It should not be described as a mature production review platform without further verification.`,
  },
  "codeflow-hook": {
    title: "codeflow-hook",
    description: "NPM package and CLI direction for AI-assisted git hook code review, with source verification pending for the public repository.",
    portfolioSummary: "Package-facing CLI direction for AI-assisted git hook review, framed as developer support rather than automated production judgment.",
    technologies: ["Node.js", "TypeScript", "npm", "CLI", "Git Hooks", "AI Code Review", "Developer Tools"],
    status: "npm package / source verification pending",
    role: "Solo builder",
    featured: true,
    priority: 75,
    architectureDetails: `codeflow-hook is the package-facing developer-tooling project for AI-assisted review in git workflows.

Problem:
• Developers often want review feedback before commit, but manual AI prompting is slow and detached from staged changes.
• A useful tool needs to fit inside existing CLI and git habits while keeping final judgment with the developer.

What I built / designed:
• A git hook / CLI package direction for running structured AI-assisted review around local code changes.
• A package-facing workflow that can be installed and invoked from normal development environments.
• A review boundary where findings are assistive suggestions, not automatic production decisions.

Technical highlights:
• npm package distribution direction.
• CLI commands for developer workflow integration.
• Git hook positioning for pre-commit or local review flows.
• AI-assisted code review prompts with source verification still required for the public repo.

Status:
• npm package / source verification pending. Avoid exact usage, download, or source claims until verified.`,
  },
};
=======
>>>>>>> main

const TECHNOLOGY_LABELS: Record<string, string> = {
  "@ai-sdk/google": "Google AI SDK",
  "@google/generative-ai": "Gemini API",
  "@modelcontextprotocol/sdk": "MCP",
  "@playwright/test": "Playwright",
  "@prisma/client": "Prisma",
  "@tailwindcss/postcss": "Tailwind CSS",
  "@testing-library/jest-dom": "Testing Library",
  "@testing-library/react": "React Testing Library",
  ai: "AI",
  "ai sdk": "AI SDK",
  api: "API",
  aws: "AWS",
  axios: "Axios",
  bcrypt: "Authentication",
  chatbotai: "AI Chatbot",
  "ci cd": "CI/CD",
  "ci/cd": "CI/CD",
  cli: "CLI",
  "code review": "Code Review",
  "code-review": "Code Review",
  css: "CSS",
  "developer tools": "Developer Tools",
  "developer-tools": "Developer Tools",
  django: "Django",
  docker: "Docker",
  "docker compose": "Docker Compose",
  "docker-compose": "Docker Compose",
  dockerfile: "Docker",
  eslint: "ESLint",
  express: "Express.js",
  "express.js": "Express.js",
  fastapi: "FastAPI",
  flask: "Flask",
  "framer motion": "Framer Motion",
  "framer-motion": "Framer Motion",
  fullstack: "Full-stack",
  "gemini api": "Gemini API",
  "github actions": "GitHub Actions",
  "github pages": "GitHub Pages",
  "git hooks": "Git Hooks",
  "git-hooks": "Git Hooks",
  "google ai sdk": "Google AI SDK",
  graphql: "GraphQL",
  hcl: "Terraform",
  html: "HTML",
  javascript: "JavaScript",
  jest: "Jest",
  jwt: "JWT",
  langchain: "LangChain",
  llm: "LLM",
  "lucide react": "Lucide",
  "machine learning": "Machine Learning",
  mcp: "MCP",
  ml: "ML",
  mongodb: "MongoDB",
  mongoose: "Mongoose",
  next: "Next.js",
  "next-auth": "NextAuth.js",
  "next.js": "Next.js",
  nextjs: "Next.js",
  node: "Node.js",
  "node.js": "Node.js",
  nodejs: "Node.js",
  playwright: "Playwright",
  prettier: "Prettier",
  prisma: "Prisma",
  "project management": "Project Management",
  "project-management": "Project Management",
  "prompt engineering": "Prompt Engineering",
  pwa: "PWA",
  rag: "RAG",
  react: "React",
  "react router": "React Router",
  "react testing library": "React Testing Library",
  "scikit learn": "Scikit-learn",
  "scikit-learn": "Scikit-learn",
  supabase: "Supabase",
  "tailwind css": "Tailwind CSS",
  "tailwind-css": "Tailwind CSS",
  terraform: "Terraform",
  "testing library": "Testing Library",
  "three.js": "Three.js",
  typescript: "TypeScript",
  vercel: "Vercel",
  vite: "Vite",
  vitest: "Vitest",
  zod: "Zod",
};

const PACKAGE_DEPENDENCY_SKILLS: Record<string, string> = {
  "@ai-sdk/google": "Google AI SDK",
  "@google/generative-ai": "Gemini API",
  "@modelcontextprotocol/sdk": "MCP",
  "@playwright/test": "Playwright",
  "@prisma/client": "Prisma",
  "@tailwindcss/postcss": "Tailwind CSS",
  "@testing-library/jest-dom": "Testing Library",
  "@testing-library/react": "React Testing Library",
  ai: "AI SDK",
  axios: "Axios",
  bcrypt: "Authentication",
  eslint: "ESLint",
  express: "Express.js",
  "framer-motion": "Framer Motion",
  graphql: "GraphQL",
  jsonwebtoken: "JWT",
  "lucide-react": "Lucide",
  mongodb: "MongoDB",
  mongoose: "Mongoose",
  next: "Next.js",
  "next-auth": "NextAuth.js",
  playwright: "Playwright",
  prettier: "Prettier",
  prisma: "Prisma",
  react: "React",
  "react-dom": "React",
  "react-router-dom": "React Router",
  supabase: "Supabase",
  tailwindcss: "Tailwind CSS",
  three: "Three.js",
  typescript: "TypeScript",
  vite: "Vite",
  vitest: "Vitest",
  zod: "Zod",
};

const PYTHON_DEPENDENCY_SKILLS: Record<string, string> = {
  chromadb: "ChromaDB",
  django: "Django",
  "faiss-cpu": "FAISS",
  fastapi: "FastAPI",
  flask: "Flask",
  "google-generativeai": "Gemini API",
  langchain: "LangChain",
  "llama-index": "LlamaIndex",
  mistralai: "Mistral AI",
  numpy: "NumPy",
  openai: "OpenAI API",
  pandas: "Pandas",
  pydantic: "Pydantic",
  pytest: "Pytest",
  "scikit-learn": "Scikit-learn",
  "sentence-transformers": "Sentence Transformers",
  streamlit: "Streamlit",
  tensorflow: "TensorFlow",
  torch: "PyTorch",
  uvicorn: "Uvicorn",
};

export interface GitHubRepository {
  id: number;
  name: string;
  full_name: string;
  private: boolean;
  fork: boolean;
  archived: boolean;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  topics?: string[];
  stargazers_count: number;
  forks_count: number;
  pushed_at: string | null;
  updated_at: string;
}

interface GitHubReadme {
  content?: string;
  encoding?: string;
}

interface GitHubContentItem {
  content?: string;
  encoding?: string;
  path: string;
  type: "file" | "dir" | string;
}

type GitHubLanguages = Record<string, number>;
type GitHubContentResponse = GitHubContentItem | GitHubContentItem[];

interface ProjectEnrichment {
  readme?: string;
  languages?: GitHubLanguages;
  manifestSkills?: string[];
  evidenceMetadata?: GitHubEvidenceMetadata;
  topic?: string;
}

interface GetPortfolioProjectsOptions {
  username?: string;
  topic?: string;
  useFallback?: boolean;
  source?: "auto" | "github" | "fallback";
}

const githubProjectCache = new Map<string, Promise<Project[]>>();

export function isPortfolioRepository(repo: GitHubRepository, topic = PORTFOLIO_TOPIC): boolean {
  if (repo.private || repo.fork) {
    return false;
  }

  if (shouldIncludeAllProjects(topic)) {
    return true;
  }

  return Boolean(repo.topics?.includes(topic));
}

export function summarizeReadme(readme?: string): string {
  if (!readme) {
    return "";
  }

  const paragraph = readme
    .replace(/```[\s\S]*?```/g, " ")
    .split(/\n{2,}/)
    .map((block) => block
      .replace(/^#+\s+/gm, "")
      .replace(/!\[[^\]]*]\([^)]*\)/g, "")
      .replace(/\[[^\]]+]\([^)]*\)/g, (match) => match.replace(/^\[([^\]]+)].*$/, "$1"))
      .replace(/[*_`>#]/g, "")
      .replace(/\s+/g, " ")
      .trim())
    .find((block) => block.length >= 80);

  if (!paragraph) {
    return "";
  }

  return paragraph.length > 520 ? `${paragraph.slice(0, 517).trim()}...` : paragraph;
}

export function formatRepositoryTitle(name: string): string {
  return name
    .split(/[-_.]+/)
    .filter(Boolean)
    .map((part) => {
      const lower = part.toLowerCase();
      const special: Record<string, string> = {
        ai: "AI",
        api: "API",
        aws: "AWS",
        cli: "CLI",
        llm: "LLM",
        mcp: "MCP",
        ml: "ML",
        os: "OS",
        rag: "RAG",
        ui: "UI",
      };

      return special[lower] || `${part.charAt(0).toUpperCase()}${part.slice(1)}`;
    })
    .join(" ");
}

export function formatTopic(topic: string): string {
  return normalizeTechnologyLabel(topic
    .split("-")
    .filter(Boolean)
    .map((part) => TECHNOLOGY_LABELS[part.toLowerCase()] || `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
    .join(" "));
}

export function mergeTechnologies(
  primaryLanguage: string | null,
  languages: GitHubLanguages = {},
  topics: string[] = [],
  portfolioTopic = PORTFOLIO_TOPIC,
  manifestSkills: string[] = []
): string[] {
  const orderedLanguages = Object.entries(languages)
    .sort(([, leftBytes], [, rightBytes]) => rightBytes - leftBytes)
    .map(([language]) => language);
  const formattedTopics = topics
    .filter((topic) => shouldIncludeAllProjects(portfolioTopic) || topic !== portfolioTopic)
    .map(formatTopic);

  return uniqueTechnologies([
    primaryLanguage || undefined,
    ...orderedLanguages,
    ...formattedTopics,
    ...manifestSkills,
  ]);
}

export function normalizeRepositoryProject(
  repo: GitHubRepository,
  enrichment: ProjectEnrichment = {}
): Project {
  const topic = enrichment.topic || PORTFOLIO_TOPIC;
  const readmeSummary = summarizeReadme(enrichment.readme);
  const override = PROJECT_PAGE_OVERRIDES_BY_REPO_NAME[repo.name];
  const title = override?.title || formatRepositoryTitle(repo.name);
  const detectedTechnologies = mergeTechnologies(repo.language, enrichment.languages, repo.topics, topic, enrichment.manifestSkills);
  const technologies = override?.technologies
    ? uniqueTechnologies([...override.technologies, ...detectedTechnologies])
    : detectedTechnologies;
  const description = override?.description || repo.description?.trim() || readmeSummary || `${title} is a public GitHub project by Himanshu Lade.`;
  const topics = repo.topics?.filter((repoTopic) => shouldIncludeAllProjects(topic) || repoTopic !== topic) || [];
  const formattedTopics = topics.map(formatTopic);
  const lastUpdated = repo.pushed_at || repo.updated_at;
  const githubSignals = [
    `Primary language: ${repo.language || "Not specified"}`,
    `Technologies: ${technologies.length > 0 ? technologies.join(", ") : "Not specified"}`,
    `Topics: ${formattedTopics.length > 0 ? formattedTopics.join(", ") : "Not specified"}`,
    `Last updated: ${lastUpdated}`,
    `Stars: ${repo.stargazers_count}`,
    `Forks: ${repo.forks_count}`,
    repo.archived ? "Status: Archived" : "Status: Active",
  ];
  const evidence = enrichGitHubProjectEvidence({
    slug: override?.slug || slugify(title),
    repoName: repo.name,
    description,
    readme: enrichment.readme,
    readmeSummary,
    languages: Object.keys(enrichment.languages || {}),
    topics,
    technologies,
    homepage: repo.homepage?.trim() || "",
    githubUrl: repo.html_url,
    lastUpdated,
    metadata: enrichment.evidenceMetadata,
  });

  return {
    title,
    description,
    technologies,
    liveUrl: override?.liveUrl || repo.homepage?.trim() || "",
    githubUrl: repo.html_url,
    slug: override?.slug || slugify(title),
    architectureDetails: `${override?.architectureDetails || description}\n\nGitHub Signals:\n${githubSignals.map((line) => `• ${line}`).join("\n")}`,
    archived: repo.archived,
    updatedAt: repo.updated_at,
    pushedAt: repo.pushed_at || undefined,
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    topics,
    primaryLanguage: repo.language,
    languageBreakdown: enrichment.languages,
    evidenceProfile: evidence.profile,
    evidenceRecommendations: evidence.recommendations,
<<<<<<< HEAD
    caseStudySlug: override?.caseStudySlug || CASE_STUDY_SLUG_BY_REPO_NAME[repo.name],
    portfolioSummary: override?.portfolioSummary,
    readmeMarkdown: enrichment.readme,
    readmeSourceUrl: getReadmeSourceUrl(repo.html_url),
    screenshots: override?.screenshots,
    featured: override?.featured,
    priority: override?.priority,
    status: override?.status,
    role: override?.role,
=======
    caseStudySlug: CASE_STUDY_SLUG_BY_REPO_NAME[repo.name],
>>>>>>> main
  };
}

function shouldIncludeAllProjects(topic: string): boolean {
  return ALL_PROJECTS_TOPICS.has(topic.trim().toLowerCase());
}

function uniqueTechnologies(values: Array<string | undefined>): string[] {
  const technologies = new Map<string, string>();

  values.forEach((value) => {
    const label = normalizeTechnologyLabel(value || "");
    const key = label.toLowerCase();

    if (!label || HIDDEN_TECHNOLOGY_KEYS.has(key) || technologies.has(key)) {
      return;
    }

    technologies.set(key, label);
  });

  return [...technologies.values()];
}

function normalizeTechnologyLabel(value: string): string {
  const cleaned = value.trim().replace(/[_-]+/g, " ").replace(/\s+/g, " ");
  const key = cleaned.toLowerCase();

  if (!cleaned) {
    return "";
  }

  return TECHNOLOGY_LABELS[key] || cleaned;
}

export function sortPortfolioProjects(projects: Project[]): Project[] {
  return [...projects].sort((left, right) => {
    const featuredDelta = Number(Boolean(right.featured)) - Number(Boolean(left.featured));

    if (featuredDelta !== 0) {
      return featuredDelta;
    }

    const priorityDelta = (right.priority || 0) - (left.priority || 0);

    if (priorityDelta !== 0) {
      return priorityDelta;
    }

    const rightDate = Date.parse(right.pushedAt || right.updatedAt || "");
    const leftDate = Date.parse(left.pushedAt || left.updatedAt || "");

    return (Number.isNaN(rightDate) ? 0 : rightDate) - (Number.isNaN(leftDate) ? 0 : leftDate);
  });
}

export async function getPortfolioProjects(options: GetPortfolioProjectsOptions = {}): Promise<Project[]> {
  const username = options.username || DEFAULT_GITHUB_USERNAME;
  const topic = options.topic || PORTFOLIO_TOPIC;
  const useFallback = options.useFallback ?? true;
  const source = options.source || getPortfolioProjectSource();

  if (source === "fallback" || (source === "auto" && isProductionBuild() && !process.env.GITHUB_TOKEN)) {
    return fallbackProjects;
  }

  try {
    return await getCachedGitHubProjects(username, topic);
  } catch (error) {
    if (!useFallback) {
      throw error;
    }

    console.warn("GitHub project feed unavailable, using curated fallback projects.", error);
    return fallbackProjects;
  }
}

function getCachedGitHubProjects(username: string, topic: string): Promise<Project[]> {
  const cacheKey = `${username.toLowerCase()}:${topic.toLowerCase()}`;
  const cachedProjects = githubProjectCache.get(cacheKey);

  if (cachedProjects) {
    return cachedProjects;
  }

  const projectsPromise = fetchGitHubProjects(username, topic).catch((error: unknown) => {
    githubProjectCache.delete(cacheKey);
    throw error;
  });
  githubProjectCache.set(cacheKey, projectsPromise);

  return projectsPromise;
}

async function fetchGitHubProjects(username: string, topic: string): Promise<Project[]> {
  const repos = await fetchPortfolioRepositories(username, topic);
  const projects = await mapWithConcurrency(repos, ENRICHMENT_CONCURRENCY, async (repo) => {
    const [readme, languages, manifestEvidence] = await Promise.all([
      fetchRepositoryReadme(username, repo.name).catch(() => ""),
      fetchRepositoryLanguages(username, repo.name).catch(() => ({})),
      fetchRepositoryManifestEvidence(username, repo.name).catch(() => ({
        manifestSkills: [],
        metadata: {},
      })),
    ]);

    return normalizeRepositoryProject(repo, {
      readme,
      languages,
      manifestSkills: manifestEvidence.manifestSkills,
      evidenceMetadata: manifestEvidence.metadata,
      topic,
    });
  });

  return sortPortfolioProjects(projects);
}

function getPortfolioProjectSource(): "auto" | "github" | "fallback" {
  const source = process.env.PORTFOLIO_GITHUB_SOURCE?.trim().toLowerCase();

  if (source === "github" || source === "fallback") {
    return source;
  }

  return "auto";
}

function isProductionBuild(): boolean {
  return process.env.NEXT_PHASE === "phase-production-build"
    || process.env.npm_lifecycle_event === "build";
}

async function fetchPortfolioRepositories(username: string, topic: string): Promise<GitHubRepository[]> {
  const repos: GitHubRepository[] = [];

  for (let page = 1; page <= 10; page += 1) {
    const pageRepos = await fetchGitHubJson<GitHubRepository[]>(
      `${GITHUB_API_BASE}/users/${encodeURIComponent(username)}/repos?type=owner&sort=updated&per_page=${PAGE_SIZE}&page=${page}`
    );

    repos.push(...pageRepos);

    if (pageRepos.length < PAGE_SIZE) {
      break;
    }
  }

  return repos.filter((repo) => isPortfolioRepository(repo, topic));
}

async function fetchRepositoryReadme(username: string, repoName: string): Promise<string> {
  const readme = await fetchGitHubJson<GitHubReadme>(
    `${GITHUB_API_BASE}/repos/${encodeURIComponent(username)}/${encodeURIComponent(repoName)}/readme`
  );

  if (!readme.content || readme.encoding !== "base64") {
    return "";
  }

  return decodeGitHubBase64Content(readme);
}

async function fetchRepositoryLanguages(username: string, repoName: string): Promise<GitHubLanguages> {
  return fetchGitHubJson<GitHubLanguages>(
    `${GITHUB_API_BASE}/repos/${encodeURIComponent(username)}/${encodeURIComponent(repoName)}/languages`
  );
}

async function fetchRepositoryManifestEvidence(
  username: string,
  repoName: string
): Promise<{ manifestSkills: string[]; metadata: GitHubEvidenceMetadata }> {
  const [packageJson, requirements, pyproject, dockerfile, dockerCompose, workflows] = await Promise.all([
    fetchOptionalRepositoryFile(username, repoName, "package.json"),
    fetchOptionalRepositoryFile(username, repoName, "requirements.txt"),
    fetchOptionalRepositoryFile(username, repoName, "pyproject.toml"),
    fetchOptionalRepositoryFile(username, repoName, "Dockerfile"),
    fetchFirstRepositoryFile(username, repoName, [
      "docker-compose.yml",
      "docker-compose.yaml",
      "compose.yml",
      "compose.yaml",
    ]),
    fetchRepositoryWorkflowSkills(username, repoName),
  ]);
  const packageSkills = extractPackageJsonSkills(packageJson);
  const pythonSkills = [
    ...extractPythonDependencySkills(requirements),
    ...extractPyprojectSkills(pyproject),
  ];
  const manifestSkills = uniqueTechnologies([
    ...packageSkills,
    ...pythonSkills,
    ...(dockerfile ? ["Docker"] : []),
    ...(dockerCompose ? ["Docker", "Docker Compose"] : []),
    ...workflows,
  ]);
  const metadata: GitHubEvidenceMetadata = {
    packageManifestPresent: Boolean(packageJson),
    pythonDependencyFilePresent: Boolean(requirements || pyproject),
    dockerPresent: Boolean(dockerfile || dockerCompose),
    githubActionsPresent: workflows.includes("GitHub Actions"),
    testsPresent: hasTestEvidence(packageJson, manifestSkills),
    deploymentConfigPresent: workflows.length > 0 || Boolean(dockerfile || dockerCompose),
  };

  return { manifestSkills, metadata };
}

function hasTestEvidence(packageJson: string, manifestSkills: string[]): boolean {
  if (manifestSkills.some((skill) => ["Vitest", "Jest", "Playwright", "Testing Library", "React Testing Library", "Pytest"].includes(skill))) {
    return true;
  }

  return /\b(test|test:run|vitest|jest|playwright|pytest)\b/i.test(packageJson);
}

async function fetchFirstRepositoryFile(username: string, repoName: string, paths: string[]): Promise<string> {
  for (const path of paths) {
    const content = await fetchOptionalRepositoryFile(username, repoName, path);

    if (content) {
      return content;
    }
  }

  return "";
}

async function fetchOptionalRepositoryFile(username: string, repoName: string, path: string): Promise<string> {
  try {
    return await fetchRepositoryFile(username, repoName, path);
  } catch {
    return "";
  }
}

async function fetchRepositoryFile(username: string, repoName: string, path: string): Promise<string> {
  const item = await fetchGitHubJson<GitHubContentResponse>(
    `${GITHUB_API_BASE}/repos/${encodeURIComponent(username)}/${encodeURIComponent(repoName)}/contents/${encodeRepositoryPath(path)}`
  );

  if (Array.isArray(item) || item.type !== "file" || item.encoding !== "base64" || !item.content) {
    return "";
  }

  return Buffer.from(item.content.replace(/\n/g, ""), "base64").toString("utf8");
}

async function fetchRepositoryWorkflowSkills(username: string, repoName: string): Promise<string[]> {
  try {
    const workflows = await fetchGitHubJson<GitHubContentResponse>(
      `${GITHUB_API_BASE}/repos/${encodeURIComponent(username)}/${encodeURIComponent(repoName)}/contents/.github/workflows`
    );

    if (!Array.isArray(workflows)) {
      return [];
    }

    const workflowFiles = workflows
      .filter((item) => item.type === "file" && /\.(ya?ml)$/i.test(item.path))
      .slice(0, 20);
    const contents = await Promise.all(
      workflowFiles.map((item) => fetchRepositoryFile(username, repoName, item.path).catch(() => ""))
    );

    return extractWorkflowSkills(contents);
  } catch {
    return [];
  }
}

export function extractPackageJsonSkills(content: string): string[] {
  const packageJson = parseJsonRecord(content);
  const dependencyNames = [
    ...Object.keys(readStringRecord(packageJson.dependencies)),
    ...Object.keys(readStringRecord(packageJson.devDependencies)),
    ...Object.keys(readStringRecord(packageJson.optionalDependencies)),
    ...Object.keys(readStringRecord(packageJson.peerDependencies)),
  ];
  const scriptSkills = Object.values(readStringRecord(packageJson.scripts)).flatMap(extractScriptSkills);
  const packageManager = typeof packageJson.packageManager === "string"
    ? mapPackageDependency(packageJson.packageManager.split("@")[0])
    : undefined;

  return uniqueTechnologies([
    ...dependencyNames.map(mapPackageDependency),
    ...scriptSkills,
    packageManager,
  ]);
}

export function extractPythonDependencySkills(content: string): string[] {
  const dependencyNames = content
    .split(/\r?\n/)
    .map((line) => line.replace(/#.*/, "").trim())
    .filter(Boolean)
    .map((line) => line.split(/[<>=~!;\[\s]/)[0])
    .map((dependency) => dependency.toLowerCase().replace(/_/g, "-"));

  return uniqueTechnologies(dependencyNames.map(mapPythonDependency));
}

export function extractPyprojectSkills(content: string): string[] {
  const normalizedContent = content.toLowerCase().replace(/_/g, "-");
  const skills = Object.entries(PYTHON_DEPENDENCY_SKILLS)
    .filter(([dependency]) => {
      const pattern = new RegExp(`(^|[^a-z0-9-])${escapeRegExp(dependency)}([^a-z0-9-]|$)`);
      return pattern.test(normalizedContent);
    })
    .map(([, skill]) => skill);

  return uniqueTechnologies(skills);
}

export function extractWorkflowSkills(contents: string[]): string[] {
  const workflowContent = contents.filter(Boolean).join("\n").toLowerCase();

  if (!workflowContent) {
    return [];
  }

  const skills = ["GitHub Actions"];

  if (workflowContent.includes("deploy-pages") || workflowContent.includes("configure-pages")) {
    skills.push("GitHub Pages");
  }

  if (workflowContent.includes("aws-actions") || workflowContent.includes("amazonaws")) {
    skills.push("AWS");
  }

  if (workflowContent.includes("docker/") || workflowContent.includes("docker build")) {
    skills.push("Docker");
  }

  if (workflowContent.includes("vercel")) {
    skills.push("Vercel");
  }

  if (workflowContent.includes("vitest")) {
    skills.push("Vitest");
  }

  if (workflowContent.includes("playwright")) {
    skills.push("Playwright");
  }

  return uniqueTechnologies(skills);
}

function extractScriptSkills(script: string): string[] {
  const lowerScript = script.toLowerCase();
  const skills: string[] = [];

  if (lowerScript.includes("eslint")) {
    skills.push("ESLint");
  }

  if (lowerScript.includes("jest")) {
    skills.push("Jest");
  }

  if (lowerScript.includes("next")) {
    skills.push("Next.js");
  }

  if (lowerScript.includes("playwright")) {
    skills.push("Playwright");
  }

  if (lowerScript.includes("vite")) {
    skills.push("Vite");
  }

  if (lowerScript.includes("vitest")) {
    skills.push("Vitest");
  }

  return skills;
}

function mapPackageDependency(packageName: string | undefined): string | undefined {
  if (!packageName) {
    return undefined;
  }

  return PACKAGE_DEPENDENCY_SKILLS[packageName.toLowerCase()];
}

function mapPythonDependency(packageName: string | undefined): string | undefined {
  if (!packageName) {
    return undefined;
  }

  return PYTHON_DEPENDENCY_SKILLS[packageName.toLowerCase()];
}

function parseJsonRecord(content: string): Record<string, unknown> {
  try {
    const parsed: unknown = JSON.parse(content);
    return isRecord(parsed) ? parsed : {};
  } catch {
    return {};
  }
}

function readStringRecord(value: unknown): Record<string, string> {
  if (!isRecord(value)) {
    return {};
  }

  return Object.fromEntries(
    Object.entries(value).filter((entry): entry is [string, string] => typeof entry[1] === "string")
  );
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function encodeRepositoryPath(path: string): string {
  return path.split("/").map(encodeURIComponent).join("/");
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

async function fetchGitHubJson<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    headers: {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
    },
  });

  if (!response.ok) {
    throw new Error(`GitHub request failed: ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}

async function mapWithConcurrency<T, Result>(
  items: T[],
  concurrency: number,
  mapper: (item: T) => Promise<Result>
): Promise<Result[]> {
  const results: Result[] = [];
  let nextIndex = 0;

  async function worker(): Promise<void> {
    while (nextIndex < items.length) {
      const currentIndex = nextIndex;
      nextIndex += 1;
      results[currentIndex] = await mapper(items[currentIndex]);
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(concurrency, items.length) }, () => worker())
  );

  return results;
}
