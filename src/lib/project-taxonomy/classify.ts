import type { SkillCategory } from "./types";
import { getSkillDefinition } from "./registry";

const LANGUAGE_NAMES = new Set<string>([
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

export function classifySkill(
  skillKey: string,
  projectLanguageKeys: Set<string>
): SkillCategory {
  const def = getSkillDefinition(skillKey);
  if (def) {
    return def.category;
  }

  if (projectLanguageKeys.has(skillKey) || LANGUAGE_NAMES.has(skillKey)) {
    return "languages";
  }

  return "uncategorized";
}