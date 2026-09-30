export type SkillCategory =
  | "languages"
  | "appStack"
  | "aiData"
  | "infraDataSecurity"
  | "quality"
  | "other"
  | "uncategorized";

export type SkillSource =
  | "github-language"
  | "github-topic"
  | "manifest"
  | "override"
  | "curated"
  | "supplemental";

export type SkillKind =
  | "language"
  | "framework"
  | "tool"
  | "platform"
  | "concept"
  | "runtime"
  | "library"
  | "protocol";

export interface SkillEvidence {
  source: SkillSource;
  rawValue: string;
}

export interface ProjectSkill {
  key: string;
  label: string;
  category: SkillCategory;
  sources: SkillEvidence[];
  kind?: SkillKind;
}

export interface SkillCandidate {
  rawValue: string;
  source: SkillSource;
}

export interface SkillNormalizationContext {
  primaryLanguage?: string | null;
}

export interface SkillDefinition {
  key: string;
  label: string;
  category: SkillCategory;
  kind: SkillKind;
  aliases?: string[];
  manifestAliases?: string[];
}
