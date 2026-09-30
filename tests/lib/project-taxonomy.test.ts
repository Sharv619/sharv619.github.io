import { describe, expect, it } from "vitest";
import {
  normalizeProjectSkills,
  normalizeCandidates,
  sortSkills,
  groupSkillsByCategory,
  getSkillDefinition,
  getAllSkillDefinitions,
  classifySkill,
  isHiddenSkill,
  shouldShowProjectSkill,
} from "../../src/lib/project-taxonomy";

describe("project-taxonomy registry", () => {
  it("has definitions for core languages", () => {
    expect(getSkillDefinition("typescript")).toBeDefined();
    expect(getSkillDefinition("python")).toBeDefined();
    expect(getSkillDefinition("go")).toBeDefined();
    expect(getSkillDefinition("rust")).toBeDefined();
  });

  it("has definitions for core frameworks", () => {
    expect(getSkillDefinition("react")).toBeDefined();
    expect(getSkillDefinition("nextjs")).toBeDefined();
    expect(getSkillDefinition("fastapi")).toBeDefined();
    expect(getSkillDefinition("flutter")).toBeDefined();
    expect(getSkillDefinition("django")).toBeDefined();
  });

  it("has definitions for AI/data tools with aliases", () => {
    const gemini = getSkillDefinition("gemini");
    expect(gemini).toBeDefined();
    expect(gemini?.aliases).toContain("gemini api");
    expect(gemini?.aliases).toContain("google ai sdk");
    expect(gemini?.aliases).toContain("@google/generative-ai");

    expect(getSkillDefinition("ollama")).toBeDefined();
    expect(getSkillDefinition("langchain")).toBeDefined();
    expect(getSkillDefinition("rag")).toBeDefined();
  });

  it("has definitions for infrastructure tools", () => {
    expect(getSkillDefinition("docker")).toBeDefined();
    expect(getSkillDefinition("aws")).toBeDefined();
    expect(getSkillDefinition("vercel")).toBeDefined();
    expect(getSkillDefinition("github-actions")).toBeDefined();
    expect(getSkillDefinition("terraform")).toBeDefined();
  });

  it("has definitions for quality tools", () => {
    expect(getSkillDefinition("vitest")).toBeDefined();
    expect(getSkillDefinition("jest")).toBeDefined();
    expect(getSkillDefinition("playwright")).toBeDefined();
    expect(getSkillDefinition("testing-library")).toBeDefined();
    expect(getSkillDefinition("eslint")).toBeDefined();
  });

  it("returns undefined for unknown keys", () => {
    expect(getSkillDefinition("unknown-skill-xyz")).toBeUndefined();
  });

  it("getAllSkillDefinitions returns all definitions", () => {
    const all = getAllSkillDefinitions();
    expect(all.length).toBeGreaterThan(80);
  });
});

describe("normalizeCandidates", () => {
  it("normalizes a simple language candidate", () => {
    const result = normalizeCandidates([
      { rawValue: "TypeScript", source: "github-language" },
    ]);

    expect(result).toHaveLength(1);
    expect(result[0].key).toBe("typescript");
    expect(result[0].label).toBe("TypeScript");
    expect(result[0].category).toBe("languages");
    expect(result[0].sources).toHaveLength(1);
  });

  it("collapses aliases to canonical key", () => {
    const result = normalizeCandidates([
      { rawValue: "Gemini API", source: "manifest" },
      { rawValue: "Google AI SDK", source: "github-topic" },
      { rawValue: "@google/generative-ai", source: "manifest" },
    ]);

    expect(result).toHaveLength(1);
    expect(result[0].key).toBe("gemini");
    expect(result[0].label).toBe("Gemini");
    expect(result[0].category).toBe("aiData");
    expect(result[0].sources).toHaveLength(3);
  });

  it("deduplicates same source and raw value", () => {
    const result = normalizeCandidates([
      { rawValue: "React", source: "github-language" },
      { rawValue: "React", source: "github-language" },
      { rawValue: "React", source: "manifest" },
    ]);

    expect(result).toHaveLength(1);
    expect(result[0].sources).toHaveLength(2);
  });

  it("assigns category from registry for known skills", () => {
    const result = normalizeCandidates([
      { rawValue: "Docker", source: "manifest" },
      { rawValue: "Vitest", source: "manifest" },
    ]);

    const docker = result.find((s) => s.key === "docker");
    const vitest = result.find((s) => s.key === "vitest");

    expect(docker?.category).toBe("infraDataSecurity");
    expect(vitest?.category).toBe("quality");
  });

  it("falls back to language classification for known languages", () => {
    const result = normalizeCandidates([
      { rawValue: "TypeScript", source: "github-language" },
      { rawValue: "Python", source: "github-language" },
    ], new Set(["typescript", "python"]));

    expect(result.find((s) => s.key === "typescript")?.category).toBe("languages");
    expect(result.find((s) => s.key === "python")?.category).toBe("languages");
  });

  it("places unknown skills in uncategorized", () => {
    const result = normalizeCandidates([
      { rawValue: "SomeUnknownTool", source: "manifest" },
    ]);

    expect(result[0].category).toBe("uncategorized");
    expect(result[0].label).toBe("SomeUnknownTool");
  });

  it("filters hidden skills", () => {
    const result = normalizeCandidates([
      { rawValue: "AI", source: "github-topic" },
      { rawValue: "Portfolio", source: "github-topic" },
      { rawValue: "TypeScript", source: "github-language" },
    ]);

    const keys = result.map((s) => s.key);
    expect(keys).not.toContain("ai");
    expect(keys).not.toContain("portfolio");
    expect(keys).toContain("typescript");
  });

  it("filters Flutter scaffold languages when not primary", () => {
    const result = normalizeCandidates([
      { rawValue: "Kotlin", source: "github-language" },
      { rawValue: "C++", source: "github-language" },
      { rawValue: "Dart", source: "github-language" },
      { rawValue: "Python", source: "github-language" },
    ], new Set(["kotlin", "c++", "dart", "python", "flutter"]));

    const keys = result.map((s) => s.key);
    expect(keys).not.toContain("kotlin");
    expect(keys).not.toContain("c++");
    expect(keys).toContain("dart");
    expect(keys).toContain("python");
  });

it("keeps Flutter scaffold language if it IS the primary non-Flutter language", () => {
    const result = normalizeCandidates([
      { rawValue: "Kotlin", source: "github-language" },
      { rawValue: "Dart", source: "github-language" },
    ], new Set(["kotlin", "dart", "flutter"]));

    const keys = result.map((s) => s.key);
    expect(keys).toContain("dart");
    expect(keys).not.toContain("kotlin");
  });

  it("keeps explicitly set primary language even if scaffold", () => {
    const result = normalizeProjectSkills({
      primaryLanguage: "Kotlin",
      languageBreakdown: { Kotlin: 500, Dart: 300 },
      topics: ["flutter"],
      manifestSkills: [],
      overrideSkills: [],
    });

    const keys = result.map((s) => s.key);
    expect(keys).toContain("kotlin");
    expect(keys).toContain("dart");
  });

  it("tracks all evidence sources with raw values", () => {
    const result = normalizeCandidates([
      { rawValue: "TypeScript", source: "github-language" },
      { rawValue: "ts", source: "manifest" },
      { rawValue: "TS", source: "override" },
    ]);

    const ts = result.find((s) => s.key === "typescript");
    expect(ts?.sources).toHaveLength(3);
    expect(ts?.sources.map((s) => s.source)).toEqual(["github-language", "manifest", "override"]);
    expect(ts?.sources.map((s) => s.rawValue)).toEqual(["TypeScript", "ts", "TS"]);
  });
});

describe("normalizeProjectSkills", () => {
  it("normalizes all project skill sources", () => {
    const result = normalizeProjectSkills({
      primaryLanguage: "Python",
      languageBreakdown: { Python: 1000, TypeScript: 100 },
      topics: ["fastapi", "ai", "portfolio"],
      manifestSkills: ["Docker", "Pytest"],
      overrideSkills: ["Gemini API"],
    }, ["AWS", "Prompt Engineering"]);

    const keys = result.map((s) => s.key);
    expect(keys).toContain("python");
    expect(keys).toContain("typescript");
    expect(keys).toContain("fastapi");
    expect(keys).toContain("docker");
    expect(keys).toContain("pytest");
    expect(keys).toContain("gemini");
    expect(keys).toContain("aws");
    expect(keys).toContain("prompt-engineering");

    expect(keys).not.toContain("ai");
    expect(keys).not.toContain("portfolio");
  });

  it("preserves source attribution for each skill", () => {
    const result = normalizeProjectSkills({
      primaryLanguage: "TypeScript",
      languageBreakdown: { TypeScript: 100 },
      topics: ["react"],
      manifestSkills: ["Vitest"],
      overrideSkills: ["Tailwind CSS"],
    });

    const ts = result.find((s) => s.key === "typescript");
    expect(ts?.sources.some((src) => src.source === "github-language")).toBe(true);

    const react = result.find((s) => s.key === "react");
    expect(react?.sources.some((src) => src.source === "github-topic")).toBe(true);

    const vitest = result.find((s) => s.key === "vitest");
    expect(vitest?.sources.some((src) => src.source === "manifest")).toBe(true);

    const tailwind = result.find((s) => s.key === "tailwind");
    expect(tailwind?.sources.some((src) => src.source === "override")).toBe(true);
  });
});

describe("sortSkills", () => {
  it("sorts by category order first", () => {
    const skills = [
      { key: "docker", label: "Docker", category: "infraDataSecurity" as const, sources: [{ source: "manifest" as const, rawValue: "Docker" }] },
      { key: "typescript", label: "TypeScript", category: "languages" as const, sources: [{ source: "github-language" as const, rawValue: "TypeScript" }] },
      { key: "vitest", label: "Vitest", category: "quality" as const, sources: [{ source: "manifest" as const, rawValue: "Vitest" }] },
    ];

    const sorted = sortSkills(skills);
    expect(sorted[0].key).toBe("typescript");
    expect(sorted[1].key).toBe("docker");
    expect(sorted[2].key).toBe("vitest");
  });

  it("sorts by evidence strength within category", () => {
    const skills = [
      { key: "tool-a", label: "Tool A", category: "quality" as const, sources: [{ source: "supplemental" as const, rawValue: "Tool A" }] },
      { key: "tool-b", label: "Tool B", category: "quality" as const, sources: [{ source: "manifest" as const, rawValue: "Tool B" }] },
      { key: "tool-c", label: "Tool C", category: "quality" as const, sources: [{ source: "override" as const, rawValue: "Tool C" }] },
    ];

    const sorted = sortSkills(skills);
    expect(sorted[0].key).toBe("tool-c");
    expect(sorted[1].key).toBe("tool-b");
    expect(sorted[2].key).toBe("tool-a");
  });

  it("sorts alphabetically by label when category and strength equal", () => {
    const skills = [
      { key: "zebra", label: "Zebra", category: "quality" as const, sources: [{ source: "manifest" as const, rawValue: "Zebra" }] },
      { key: "alpha", label: "Alpha", category: "quality" as const, sources: [{ source: "manifest" as const, rawValue: "Alpha" }] },
    ];

    const sorted = sortSkills(skills);
    expect(sorted[0].key).toBe("alpha");
    expect(sorted[1].key).toBe("zebra");
  });
});

describe("groupSkillsByCategory", () => {
  it("groups skills by category in sort order", () => {
    const skills = [
      { key: "docker", label: "Docker", category: "infraDataSecurity" as const, sources: [{ source: "manifest" as const, rawValue: "Docker" }] },
      { key: "typescript", label: "TypeScript", category: "languages" as const, sources: [{ source: "github-language" as const, rawValue: "TypeScript" }] },
      { key: "python", label: "Python", category: "languages" as const, sources: [{ source: "github-language" as const, rawValue: "Python" }] },
      { key: "vitest", label: "Vitest", category: "quality" as const, sources: [{ source: "manifest" as const, rawValue: "Vitest" }] },
    ];

    const groups = groupSkillsByCategory(skills);

    expect(groups.get("languages")?.map((s) => s.key)).toEqual(["python", "typescript"]);
    expect(groups.get("infraDataSecurity")?.map((s) => s.key)).toEqual(["docker"]);
    expect(groups.get("quality")?.map((s) => s.key)).toEqual(["vitest"]);
    expect(groups.has("appStack")).toBe(false);
  });
});

describe("classifySkill", () => {
  it("uses registry category for known skills", () => {
    expect(classifySkill("docker", new Set())).toBe("infraDataSecurity");
    expect(classifySkill("vitest", new Set())).toBe("quality");
    expect(classifySkill("gemini", new Set())).toBe("aiData");
  });

  it("falls back to language classification", () => {
    expect(classifySkill("typescript", new Set(["typescript"]))).toBe("languages");
    expect(classifySkill("python", new Set())).toBe("languages");
    expect(classifySkill("go", new Set())).toBe("languages");
  });

  it("returns uncategorized for unknown", () => {
    expect(classifySkill("unknown-xyz", new Set())).toBe("uncategorized");
  });
});

describe("visibility", () => {
  it("identifies hidden skills", () => {
    expect(isHiddenSkill("ai")).toBe(true);
    expect(isHiddenSkill("portfolio")).toBe(true);
    expect(isHiddenSkill("full stack")).toBe(true);
    expect(isHiddenSkill("typescript")).toBe(false);
  });

  it("identifies Flutter scaffold languages", () => {
    expect(shouldShowProjectSkill(new Set(["flutter", "kotlin", "dart"]), "kotlin", "languages", undefined)).toBe(false);
    expect(shouldShowProjectSkill(new Set(["flutter", "kotlin", "dart"]), "c++", "languages", undefined)).toBe(false);
    expect(shouldShowProjectSkill(new Set(["flutter", "dart"]), "dart", "languages", undefined)).toBe(true);
    expect(shouldShowProjectSkill(new Set(["kotlin", "dart"]), "kotlin", "languages", undefined)).toBe(true);
  });
});