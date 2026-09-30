import type { SkillCandidate, SkillEvidence, ProjectSkill } from "./types";
import { getSkillDefinition } from "./registry";
import { classifySkill } from "./classify";
import { isHiddenSkill, shouldShowProjectSkill } from "./visibility";
import { sortSkills } from "./sort";

function normalizeKey(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[_\s]+/g, "-")
    .replace(/[^a-z0-9#+.-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function cleanLabel(value: string): string {
  return value
    .trim()
    .replace(/[_\s]+/g, " ")
    .replace(/\s+/g, " ")
    .replace(/\b(\w)/g, (m) => m.toUpperCase());
}

function deduplicateCandidates(candidates: SkillCandidate[]): Map<string, SkillCandidate[]> {
  const groups = new Map<string, SkillCandidate[]>();

  for (const candidate of candidates) {
    const def = getSkillDefinition(candidate.rawValue);
    const key = def ? def.key : normalizeKey(candidate.rawValue);

    const existing = groups.get(key) || [];
    existing.push(candidate);
    groups.set(key, existing);
  }

  return groups;
}

function mergeSources(candidates: SkillCandidate[]): SkillEvidence[] {
  const seen = new Set<string>();
  const evidence: SkillEvidence[] = [];

  for (const candidate of candidates) {
    const sig = `${candidate.source}:${candidate.rawValue}`;
    if (!seen.has(sig)) {
      seen.add(sig);
      evidence.push({ source: candidate.source, rawValue: candidate.rawValue });
    }
  }

  return evidence;
}

export function normalizeCandidates(
  candidates: SkillCandidate[],
  projectLanguageKeys: Set<string> = new Set()
): ProjectSkill[] {
  const groups = deduplicateCandidates(candidates);
  const results: ProjectSkill[] = [];

  for (const [key, groupCandidates] of groups) {
    const primaryCandidate = groupCandidates[0];
    const def = getSkillDefinition(primaryCandidate.rawValue);

    const mergedSources = mergeSources(groupCandidates);

    const category = def ? def.category : classifySkill(key, projectLanguageKeys);

    if (isHiddenSkill(key)) {
      continue;
    }

    if (!shouldShowProjectSkill(projectLanguageKeys, key, category)) {
      continue;
    }

    const label = def ? def.label : cleanLabel(primaryCandidate.rawValue);

    results.push({
      key,
      label,
      category,
      sources: mergedSources,
      kind: def?.kind,
    });
  }

  return sortSkills(results);
}

export function normalizeProjectSkills(
  project: {
    primaryLanguage?: string | null;
    languageBreakdown?: Record<string, number>;
    topics?: string[];
    manifestSkills?: string[];
    overrideSkills?: string[];
  },
  supplementalSkills: string[] = []
): ProjectSkill[] {
  const candidates: SkillCandidate[] = [];

  const languageKeys = new Set<string>();
  if (project.primaryLanguage) {
    languageKeys.add(normalizeKey(project.primaryLanguage));
    candidates.push({ rawValue: project.primaryLanguage, source: "github-language" });
  }
  for (const [lang] of Object.entries(project.languageBreakdown || {})) {
    languageKeys.add(normalizeKey(lang));
    candidates.push({ rawValue: lang, source: "github-language" });
  }

  for (const topic of project.topics || []) {
    candidates.push({ rawValue: topic, source: "github-topic" });
  }

  for (const skill of project.manifestSkills || []) {
    candidates.push({ rawValue: skill, source: "manifest" });
  }

  for (const skill of project.overrideSkills || []) {
    candidates.push({ rawValue: skill, source: "override" });
  }

  for (const skill of supplementalSkills) {
    candidates.push({ rawValue: skill, source: "supplemental" });
  }

  return normalizeCandidates(candidates, languageKeys);
}