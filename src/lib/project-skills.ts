import type { Project } from "./data";
import { getSkillDefinition } from "@/lib/project-taxonomy/registry";
import { normalizeProjectSkills } from "@/lib/project-taxonomy/normalize";
import { sortSkills, groupSkillsByCategory } from "@/lib/project-taxonomy/sort";
import type { ProjectSkill } from "./project-skill-types";

export interface SkillCategory {
  title: string;
  items: string[];
}

const CATEGORY_TITLES: Record<string, string> = {
  languages: "Languages",
  appStack: "Frameworks & App Stack",
  aiData: "AI & Data",
  infraDataSecurity: "Infrastructure, Data & Security",
  quality: "Testing & Quality",
  other: "Project Topics & Tools",
  uncategorized: "Other",
};

const CATEGORY_ORDER = ["languages", "appStack", "aiData", "infraDataSecurity", "quality", "other", "uncategorized"];

const SOURCE_STRENGTH: Record<ProjectSkill["sources"][0]["source"], number> = {
  override: 5,
  manifest: 4,
  "github-language": 3,
  curated: 3,
  "github-topic": 2,
  supplemental: 1,
};

function getMaxSourceStrength(sources: ProjectSkill["sources"]): number {
  return Math.max(...sources.map((s) => SOURCE_STRENGTH[s.source] || 0));
}

function deduplicateSkills(skills: ProjectSkill[]): ProjectSkill[] {
  const byKey = new Map<string, ProjectSkill>();
  for (const skill of skills) {
    const existing = byKey.get(skill.key);
    if (!existing || getMaxSourceStrength(skill.sources) > getMaxSourceStrength(existing.sources)) {
      byKey.set(skill.key, skill);
    }
  }
  return [...byKey.values()];
}

export function deriveSkillCategories(projects: Project[], supplementalSkills: string[] = []): SkillCategory[] {
  const allSkills: ProjectSkill[] = [];

  projects.forEach((project) => {
    if (project.skills && project.skills.length > 0) {
      allSkills.push(...project.skills);
    } else {
      const normalized = normalizeProjectSkills({
        primaryLanguage: project.primaryLanguage,
        languageBreakdown: project.languageBreakdown,
        topics: project.topics,
        manifestSkills: [],
        overrideSkills: project.technologies,
      });
      allSkills.push(...normalized);
    }
  });

  if (supplementalSkills.length > 0) {
    const supplemental = normalizeProjectSkills({}, supplementalSkills);
    allSkills.push(...supplemental);
  }

  const uniqueSkills = deduplicateSkills(allSkills);
  const sortedSkills = sortSkills(uniqueSkills);
  const grouped = groupSkillsByCategory(sortedSkills);

  return CATEGORY_ORDER
    .map((category) => {
      const skills = grouped.get(category as ProjectSkill["category"]) || [];
      return {
        title: CATEGORY_TITLES[category] || category,
        items: skills.map((s) => s.label),
      };
    })
    .filter((category) => category.items.length > 0);
}

function normalizeSkillKey(skill: string): string {
  return skill
    .trim()
    .toLowerCase()
    .replace(/[_\s]+/g, "-")
    .replace(/[^a-z0-9#+.-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getSkillKey(skillLabel: string): string {
  const def = getSkillDefinition(skillLabel);
  if (def) {
    return def.key;
  }
  return normalizeSkillKey(skillLabel);
}

export function projectMatchesSkill(project: Project, selectedSkill: string): boolean {
  const selectedKey = getSkillKey(selectedSkill);

  if (project.skills && project.skills.length > 0) {
    return project.skills.some((skill) => skill.key === selectedKey);
  }

  return project.technologies.some((technology) => {
    const techKey = getSkillKey(technology);
    return techKey === selectedKey;
  });
}