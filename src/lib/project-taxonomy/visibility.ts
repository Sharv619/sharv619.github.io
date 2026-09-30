import type { SkillCategory } from "./types";

export const HIDDEN_SKILL_KEYS = new Set<string>([
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

export const FLUTTER_SCAFFOLD_LANGUAGE_KEYS = new Set<string>([
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

export function isHiddenSkill(key: string): boolean {
  return HIDDEN_SKILL_KEYS.has(key.toLowerCase());
}

export function isFlutterScaffoldLanguage(key: string): boolean {
  return FLUTTER_SCAFFOLD_LANGUAGE_KEYS.has(key.toLowerCase());
}

export function shouldShowProjectSkill(
  projectLanguageKeys: Set<string>,
  skillKey: string,
  skillCategory: SkillCategory
): boolean {
  if (isHiddenSkill(skillKey)) {
    return false;
  }

  const isFlutterProject = projectLanguageKeys.has("flutter");
  const nonFlutterLanguages = Array.from(projectLanguageKeys).filter(
    (k) => k !== "flutter"
  );
  const primaryLanguageKey = nonFlutterLanguages.find(
    (k) => !isFlutterScaffoldLanguage(k)
  );
  const hasNonScaffoldLanguage = nonFlutterLanguages.some(
    (k) => !isFlutterScaffoldLanguage(k)
  );

  if (isFlutterProject && isFlutterScaffoldLanguage(skillKey)) {
    if (skillCategory === "languages") {
      if (hasNonScaffoldLanguage && skillKey !== primaryLanguageKey) {
        return false;
      }
    }
  }

  return true;
}