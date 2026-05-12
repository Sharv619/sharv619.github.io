import type { Project } from "./data";

export interface SkillCategory {
  title: string;
  items: string[];
}

type SkillBucket = "languages" | "appStack" | "aiData" | "infraDataSecurity" | "quality" | "other";

interface SkillEntry {
  label: string;
  count: number;
}

const CATEGORY_TITLES: Record<SkillBucket, string> = {
  languages: "Languages",
  appStack: "Frameworks & App Stack",
  aiData: "AI & Data",
  infraDataSecurity: "Infrastructure, Data & Security",
  quality: "Testing & Quality",
  other: "Project Topics & Tools",
};

const BUCKET_ORDER: SkillBucket[] = ["languages", "appStack", "aiData", "infraDataSecurity", "quality", "other"];

const LANGUAGE_NAMES = new Set([
  "c",
  "c#",
  "c++",
  "css",
  "dart",
  "go",
  "html",
  "java",
  "javascript",
  "kotlin",
  "php",
  "python",
  "ruby",
  "rust",
  "shell",
  "sql",
  "swift",
  "typescript",
]);

const APP_STACK_TERMS = [
  "api",
  "backend",
  "express",
  "fastapi",
  "framer",
  "frontend",
  "fullstack",
  "full stack",
  "flutter",
  "next",
  "node",
  "axios",
  "django",
  "flask",
  "pydantic",
  "pwa",
  "react",
  "streamlit",
  "tailwind",
  "ui",
  "uvicorn",
  "vite",
  "web",
];

const AI_DATA_TERMS = [
  "ai",
  "chromadb",
  "embedding",
  "faiss",
  "gemini",
  "langchain",
  "llamaindex",
  "llm",
  "machine learning",
  "mcp",
  "mistral",
  "ml",
  "numpy",
  "openai",
  "pandas",
  "prompt engineering",
  "pytorch",
  "rag",
  "scikit",
  "sentence transformers",
  "tensorflow",
  "vector",
];

const INFRA_DATA_SECURITY_TERMS = [
  "aws",
  "ci/cd",
  "docker",
  "docker compose",
  "github pages",
  "github actions",
  "jwt",
  "mongodb",
  "nginx",
  "owasp",
  "postgres",
  "security",
  "supabase",
  "terraform",
  "vercel",
];

const QUALITY_TERMS = [
  "eslint",
  "jest",
  "playwright",
  "prettier",
  "pytest",
  "react testing library",
  "testing library",
  "vitest",
];

export function deriveSkillCategories(projects: Project[], supplementalSkills: string[] = []): SkillCategory[] {
  const buckets = createBuckets();

  projects.forEach((project) => {
    const languageKeys = getProjectLanguageKeys(project);
    const projectSkills = new Set(project.technologies.map(normalizeSkill).filter(Boolean));

    projectSkills.forEach((skill) => {
      const bucket = classifySkill(skill, languageKeys);
      addSkillToBucket(buckets[bucket], skill);
    });
  });

  supplementalSkills.map(normalizeSkill).filter(Boolean).forEach((skill) => {
    const bucket = classifySkill(skill, new Set());
    addSkillToBucket(buckets[bucket], skill);
  });

  return BUCKET_ORDER.map((bucket) => ({
    title: CATEGORY_TITLES[bucket],
    items: sortSkills(buckets[bucket]),
  })).filter((category) => category.items.length > 0);
}

function createBuckets(): Record<SkillBucket, Map<string, SkillEntry>> {
  return {
    languages: new Map(),
    appStack: new Map(),
    aiData: new Map(),
    infraDataSecurity: new Map(),
    quality: new Map(),
    other: new Map(),
  };
}

function getProjectLanguageKeys(project: Project): Set<string> {
  return new Set([
    project.primaryLanguage,
    ...Object.keys(project.languageBreakdown || {}),
  ].filter((value): value is string => Boolean(value)).map(normalizeSkillKey));
}

function classifySkill(skill: string, languageKeys: Set<string>): SkillBucket {
  const key = normalizeSkillKey(skill);

  if (languageKeys.has(key) || LANGUAGE_NAMES.has(key)) {
    return "languages";
  }

  if (matchesAnyTerm(key, AI_DATA_TERMS)) {
    return "aiData";
  }

  if (matchesAnyTerm(key, INFRA_DATA_SECURITY_TERMS)) {
    return "infraDataSecurity";
  }

  if (matchesAnyTerm(key, QUALITY_TERMS)) {
    return "quality";
  }

  if (matchesAnyTerm(key, APP_STACK_TERMS)) {
    return "appStack";
  }

  return "other";
}

function matchesAnyTerm(key: string, terms: string[]): boolean {
  const tokens = new Set(key.split(/[^a-z0-9+#.]+/).filter(Boolean));

  return terms.some((term) => {
    if (term.length <= 2) {
      return tokens.has(term);
    }

    return key.includes(term);
  });
}

function addSkillToBucket(bucket: Map<string, SkillEntry>, skill: string): void {
  const key = normalizeSkillKey(skill);
  const existing = bucket.get(key);

  if (existing) {
    existing.count += 1;
    return;
  }

  bucket.set(key, { label: skill, count: 1 });
}

function sortSkills(bucket: Map<string, SkillEntry>): string[] {
  return [...bucket.values()]
    .sort((left, right) => right.count - left.count || left.label.localeCompare(right.label))
    .map((entry) => entry.label);
}

function normalizeSkill(skill: string): string {
  return skill.trim().replace(/\s+/g, " ");
}

function normalizeSkillKey(skill: string): string {
  return normalizeSkill(skill).toLowerCase();
}
