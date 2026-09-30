import type { SkillCategory, SkillSource, SkillKind, SkillEvidence, ProjectSkill } from "../project-skill-types";

export type { SkillCategory, SkillSource, SkillKind, SkillEvidence, ProjectSkill };

export interface SkillDefinition {
  key: string;
  label: string;
  category: SkillCategory;
  aliases: string[];
  kind?: SkillKind;
}

export interface SkillCandidate {
  rawValue: string;
  source: SkillSource;
  projectLanguageKeys?: Set<string>;
}

export interface SkillNormalizationContext {
  primaryLanguage?: string | null;
}