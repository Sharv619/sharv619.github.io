import type { ProjectSkill, SkillCategory } from "./types";

const CATEGORY_ORDER: SkillCategory[] = [
  "languages",
  "appStack",
  "aiData",
  "infraDataSecurity",
  "quality",
  "other",
  "uncategorized",
];

const CATEGORY_RANK = new Map(CATEGORY_ORDER.map((cat, i) => [cat, i]));

function evidenceStrength(sources: ProjectSkill["sources"]): number {
  const strength: Record<string, number> = {
    override: 5,
    manifest: 4,
    "github-language": 3,
    curated: 3,
    "github-topic": 2,
    supplemental: 1,
  };

  return Math.max(...sources.map((s) => strength[s.source] || 0));
}

export function sortSkills(skills: ProjectSkill[]): ProjectSkill[] {
  return [...skills].sort((a, b) => {
    const catRankA = CATEGORY_RANK.get(a.category) ?? 99;
    const catRankB = CATEGORY_RANK.get(b.category) ?? 99;

    if (catRankA !== catRankB) {
      return catRankA - catRankB;
    }

    const strengthA = evidenceStrength(a.sources);
    const strengthB = evidenceStrength(b.sources);

    if (strengthA !== strengthB) {
      return strengthB - strengthA;
    }

    return a.label.localeCompare(b.label);
  });
}

export function groupSkillsByCategory(skills: ProjectSkill[]): Map<SkillCategory, ProjectSkill[]> {
  const groups = new Map<SkillCategory, ProjectSkill[]>();

  for (const skill of sortSkills(skills)) {
    const existing = groups.get(skill.category) || [];
    existing.push(skill);
    groups.set(skill.category, existing);
  }

  return groups;
}