import type { SkillCategory } from "./types";

function normalizeKey(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[_\s]+/g, "-")
    .replace(/[^a-z0-9#+.-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const HIDDEN_SKILL_KEYS = new Set<string>([
  "ai",
  "ai chatbot",
  "developer tools",
  "full stack",
  "fullstack",
  "npm",
  "portfolio",
  "project management",
  "voice",
  "web",
].map(normalizeKey));

export const FLUTTER_SCAFFOLD_LANGUAGE_KEYS = new Set<string>([
  "batchfile",
  "c",
  "cpp",
  "c++",
  "cmake",
  "kotlin",
  "objective c",
  "objective-c",
  "swift",
  "vbscript",
]);

export function isHiddenSkill(key: string): boolean {
  return HIDDEN_SKILL_KEYS.has(normalizeKey(key));
}

export function isFlutterScaffoldLanguage(key: string): boolean {
  return FLUTTER_SCAFFOLD_LANGUAGE_KEYS.has(normalizeKey(key));
}

export function shouldShowProjectSkill(
  projectLanguageKeys: Set<string>,
  skillKey: string,
  skillCategory: SkillCategory,
  explicitPrimaryLanguage?: string
): boolean {
  if (isHiddenSkill(skillKey)) {
    return false;
  }

  const normalizedSkillKey = normalizeKey(skillKey);
  const isFlutterProject = projectLanguageKeys.has("flutter");
  const nonFlutterLanguages = Array.from(projectLanguageKeys).filter(
    (k) => k !== "flutter"
  );
  const primaryLanguageKey = explicitPrimaryLanguage
    ? normalizeKey(explicitPrimaryLanguage)
    : nonFlutterLanguages.find(
        (k) => !isFlutterScaffoldLanguage(k)
      );
  const hasNonScaffoldLanguage = nonFlutterLanguages.some(
    (k) => !isFlutterScaffoldLanguage(k)
  );

  if (isFlutterProject && isFlutterScaffoldLanguage(skillKey)) {
    if (skillCategory === "languages") {
      if (hasNonScaffoldLanguage && normalizedSkillKey !== primaryLanguageKey) {
        return false;
      }
    }
  }

  return true;
}