export * from "./types";
export * from "./registry";
export * from "./normalize";
export * from "./classify";
export * from "./visibility";
export * from "./sort";

import { normalizeProjectSkills, normalizeCandidates } from "./normalize";
import { sortSkills, groupSkillsByCategory } from "./sort";
import type { ProjectSkill, SkillCategory } from "./types";

export { normalizeProjectSkills, normalizeCandidates, sortSkills, groupSkillsByCategory };
export type { ProjectSkill, SkillCategory };