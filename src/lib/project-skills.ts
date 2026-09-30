import type { Project } from "./data";
import { getSkillDefinition } from "@/lib/project-taxonomy";

export interface SkillCategory {
  title: string;
  items: string[];
}

type SkillBucket = "languages" | "appStack" | "aiData" | "infraDataSecurity" | "quality" | "other";

interface SkillEntry {
  label: string;
  count: number;
}

const SKILL_ALIASES: Record<string, string> = {
  "ai code review": "AI-Assisted Code Review",
  "ai review": "AI-Assisted Code Review",
  "ai sdk": "Vercel AI SDK",
  "code review": "AI-Assisted Code Review",
  "gemini api": "Gemini",
  "google ai sdk": "Gemini",
  "testing library": "React Testing Library",
};

const HIDDEN_SKILL_KEYS = new Set([
  "ai",
  "ai chatbot",
  "developer tools",
  "full stack",
  "fullstack",
  "npm",
  "portfolio",
  "project management",
  "voice",
]);

const FLUTTER_SCAFFOLD_LANGUAGE_KEYS = new Set([
  "batchfile",
  "c",
  "c++",
  "cmake",
  "kotlin",
  "objective c",
  "objective-c",
  "swift",
  "vbscript",
]);

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
  "zod",
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
  "mcp",
  "mistral",
  "ml",
  "numpy",
  "ollama",
  "openai",
  "pandas",
  "prompt engineering",
  "pytorch",
  "rag",
  "scikit",
  "sentence transformers",
  "tensorflow",
  "vector",
  "entropy",
  "isolation forest",
];

const INFRA_DATA_SECURITY_TERMS = [
  "adguard",
  "aws",
  "ci/cd",
  "cloud functions",
  "docker",
  "docker compose",
  "firebase",
  "firestore",
  "github pages",
  "github actions",
  "jwt",
  "mongodb",
  "nginx",
  "owasp",
  "postgres",
  "security",
  "sqlite",
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
    // Filter first, then canonicalize to avoid turning hidden skills into non-hidden ones via canonicalization
    const projectSkills = new Set(
      project.technologies
        .filter((skill) => shouldShowProjectSkill(project, skill))
        .map(canonicalizeSkill)
    );

    projectSkills.forEach((skill) => {
      const bucket = classifySkill(skill, languageKeys);
      addSkillToBucket(buckets[bucket], skill);
    });
  });

  supplementalSkills.map(canonicalizeSkill).filter((skill) => skill && !isHiddenSkill(skill)).forEach((skill) => {
    const bucket = classifySkill(skill, new Set());
    addSkillToBucket(buckets[bucket], skill);
  });

  return BUCKET_ORDER.map((bucket) => ({
    title: CATEGORY_TITLES[bucket],
    items: sortSkills(buckets[bucket]),
  })).filter((category) => category.items.length > 0);
}

export function projectMatchesSkill(project: Project, selectedSkill: string): boolean {
  const selectedKey = normalizeSkillKey(canonicalizeSkill(selectedSkill));

  return project.technologies.some((technology) => (
    normalizeSkillKey(canonicalizeSkill(technology)) === selectedKey
  ));
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
  // First check if it's a hidden skill
  if (isHiddenSkill(skill)) {
    // Hidden skills should not appear in any category
    // We'll return a special value that will be filtered out later
    return "hidden" as SkillBucket;
  }

  // Try to get the definition from the taxonomy
  const normalized = normalizeSkillKey(skill);
  const def = getSkillDefinition(normalized);
  if (def) {
    // Ensure the category is one of our expected SkillBucket values
    // The taxonomy's category should match our SkillBucket strings
    // But first check if this definition's category corresponds to a hidden skill
    const category = def.category as SkillBucket;
    // Check if the skill label itself is hidden
    if (isHiddenSkill(def.label)) {
      return "hidden" as SkillBucket;
    }
    return category;
  }

  // Fallback to original classification
  const key = normalized; // Already normalized
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
  // Don't add hidden skills
  if (isHiddenSkill(skill)) {
    return;
  }
  
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

function canonicalizeSkill(skill: string): string {
  // First check our explicit aliases
  const normalized = normalizeSkillKey(skill);
  const alias = SKILL_ALIASES[normalized];
  if (alias) {
    return alias;
  }
  
  // Then check taxonomy
  const def = getSkillDefinition(normalized);
  if (def) {
    return def.label;
  }
  
  // Fallback to original skill
  return skill;
}

function shouldShowProjectSkill(project: Project, skill: string): boolean {
  if (!skill) {
    return false;
  }

  const skillKey = normalizeSkillKey(skill);
  
  // Check if it's explicitly hidden
  if (HIDDEN_SKILL_KEYS.has(skillKey)) {
    return false;
  }

  // Check Flutter-specific hiding
  const projectSkillKeys = new Set(project.technologies.map(normalizeSkillKey));
  const isFlutterProject = projectSkillKeys.has("flutter");
  const primaryLanguageKey = normalizeSkillKey(project.primaryLanguage || "");

  if (isFlutterProject && FLUTTER_SCAFFOLD_LANGUAGE_KEYS.has(skillKey) && skillKey !== primaryLanguageKey) {
    return false;
  }

  return true;
}

function isHiddenSkill(skill: string): boolean {
  return HIDDEN_SKILL_KEYS.has(normalizeSkillKey(skill));
}