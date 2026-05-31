import { describe, expect, it } from "vitest";
import { createEvidenceSignal } from "../../src/lib/evidence-signals";
import { generateEvidenceReport } from "../../src/lib/evidence-report";
import { buildProjectEvidenceProfile } from "../../src/lib/project-credibility";
import { generateRecommendationsForProfile } from "../../src/lib/portfolio-recommendations";
import type { Project } from "../../src/lib/data";

const baseProject: Project = {
  title: "codeflow-hook",
  description: "Reduced API cost by 90% while running in production.",
  technologies: ["TypeScript", "Docker", "GitHub Actions", "Vitest"],
  liveUrl: "",
  githubUrl: "https://github.com/Sharv619/codeflow-hook",
  slug: "codeflow-hook",
  architectureDetails: "Open-source AI-assisted code review CLI.",
};

describe("evidence-report", () => {
  it("includes draft-only disclaimer, source, project scores, and warnings", () => {
    const report = generateEvidenceReport({
      source: "fallback data",
      generatedAt: new Date("2026-06-01T00:00:00Z"),
      projects: [baseProject],
    });

    expect(report.markdown).toContain("Internal/private");
    expect(report.markdown).toContain("Recommendations are draft-only");
    expect(report.markdown).toContain("Source: fallback data");
    expect(report.markdown).toContain("Credibility score:");
    expect(report.markdown).toContain("exact performance/cost/deployment metric");
    expect(report.markdown).toContain("production status");
  });

  it("does not mark unapproved high-score projects as production", () => {
    const profile = buildProjectEvidenceProfile({
      slug: "codeflow-hook",
      repoName: "codeflow-hook",
      lastUpdated: "2026-01-15T00:00:00Z",
      topics: ["developer-tools", "typescript"],
      signals: [
        createEvidenceSignal("readme", true, "github", "high"),
        createEvidenceSignal("tests", true, "repo-files", "high"),
        createEvidenceSignal("github-actions", true, "repo-files", "high"),
        createEvidenceSignal("docker", true, "repo-files", "high"),
        createEvidenceSignal("live-demo", true, "github", "high"),
        createEvidenceSignal("screenshots", true, "readme", "medium"),
        createEvidenceSignal("docs-folder", true, "repo-files", "high"),
        createEvidenceSignal("api-docs", true, "repo-files", "high"),
        createEvidenceSignal("security-safety-docs", true, "repo-files", "high"),
        createEvidenceSignal("package-manifest", true, "repo-files", "high"),
        createEvidenceSignal("deployment-config", true, "repo-files", "high"),
        createEvidenceSignal("license", true, "repo-files", "high"),
      ],
    });
    const project: Project = {
      ...baseProject,
      description: "Open-source AI-assisted code review CLI.",
      evidenceProfile: profile,
      evidenceRecommendations: generateRecommendationsForProfile(profile),
    };
    const report = generateEvidenceReport({
      source: "GitHub API",
      generatedAt: new Date("2026-06-01T00:00:00Z"),
      projects: [project],
    });

    expect(profile.maturityScore).toBeGreaterThanOrEqual(85);
    expect(profile.maturity).toBe("mvp");
    expect(report.markdown).toContain("**Maturity:** mvp");
    expect(report.markdown).not.toContain("**Maturity:** production");
  });
});
