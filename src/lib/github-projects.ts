import { projects as fallbackProjects, slugify } from "./data";
import { enrichGitHubProjectEvidence } from "./github-evidence-enrichment";
import type { Project } from "./data";
import type { GitHubEvidenceMetadata } from "./github-evidence-enrichment";

export const DEFAULT_GITHUB_USERNAME = process.env.PORTFOLIO_GITHUB_USERNAME || "Sharv619";
export const PORTFOLIO_TOPIC = process.env.PORTFOLIO_GITHUB_TOPIC || "all";

const GITHUB_API_BASE = "https://api.github.com";
const PAGE_SIZE = 100;
const ENRICHMENT_CONCURRENCY = 4;
const ALL_PROJECTS_TOPICS = new Set(["all", "*"]);
const HIDDEN_TECHNOLOGY_KEYS = new Set(["go template", "makefile", "mako", "perl", "smarty"]);

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
  const title = formatRepositoryTitle(repo.name);
  const technologies = mergeTechnologies(repo.language, enrichment.languages, repo.topics, topic, enrichment.manifestSkills);
  const description = repo.description?.trim() || readmeSummary || `${title} is a public GitHub project by Himanshu Lade.`;
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
    slug: slugify(title),
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
    liveUrl: repo.homepage?.trim() || "",
    githubUrl: repo.html_url,
    slug: slugify(title),
    architectureDetails: `${description}\n\nGitHub Signals:\n${githubSignals.map((line) => `• ${line}`).join("\n")}`,
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

  if (source === "fallback" || (source === "auto" && isProductionBuild())) {
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

  return Buffer.from(readme.content.replace(/\n/g, ""), "base64").toString("utf8");
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
