import { describe, expect, it } from "vitest";
import {
  buildGitHubEvidenceSignals,
  enrichGitHubProjectEvidence,
} from "../../src/lib/github-evidence-enrichment";
import { normalizeRepositoryProject } from "../../src/lib/github-projects";
import type { GitHubRepository } from "../../src/lib/github-projects";

const repo: GitHubRepository = {
  id: 123,
  name: "codeflow-hook",
  full_name: "Sharv619/codeflow-hook",
  private: false,
  fork: false,
  archived: false,
  description: "AI-assisted code review CLI with npm package evidence.",
  html_url: "https://github.com/Sharv619/codeflow-hook",
  homepage: "https://npmjs.com/package/codeflow-hook",
  language: "TypeScript",
  topics: ["developer-tools", "typescript", "git-hooks"],
  stargazers_count: 1,
  forks_count: 0,
  pushed_at: "2026-01-15T00:00:00Z",
  updated_at: "2026-01-16T00:00:00Z",
};

describe("github-evidence-enrichment", () => {
  it("builds evidence signals from GitHub repo metadata and enrichment inputs", () => {
    const signals = buildGitHubEvidenceSignals({
      slug: "codeflow-hook",
      repoName: "codeflow-hook",
      description: repo.description || "",
      readme: "## codeflow-hook\n\n![CLI screenshot](./screenshot.png)\n\nAPI docs and npm install instructions.",
      technologies: ["TypeScript", "Docker", "GitHub Actions", "Vitest"],
      topics: repo.topics,
      homepage: repo.homepage || "",
      githubUrl: repo.html_url,
      lastUpdated: repo.pushed_at || repo.updated_at,
      metadata: {
        packageManifestPresent: true,
        dockerPresent: true,
        githubActionsPresent: true,
        testsPresent: true,
        npmPackageEvidencePresent: true,
      },
    });

    expect(signalPresent(signals, "readme")).toBe(true);
    expect(signalPresent(signals, "tests")).toBe(true);
    expect(signalPresent(signals, "docker")).toBe(true);
    expect(signalPresent(signals, "github-actions")).toBe(true);
    expect(signalPresent(signals, "package-manifest")).toBe(true);
    expect(signalPresent(signals, "live-demo")).toBe(true);
    expect(signalPresent(signals, "screenshots")).toBe(true);
    expect(signalPresent(signals, "api-docs")).toBe(true);
    expect(signalPresent(signals, "npm-package")).toBe(true);
  });

  it("generates add-tests recommendation when tests are missing", () => {
    const enrichment = enrichGitHubProjectEvidence({
      slug: "backpocket-os",
      repoName: "backpocket-os",
      description: "AI-assisted admin workflow prototype.",
      readme: "BackPocket OS explores admin workflow automation.",
      topics: ["ai-workflows", "automation"],
      lastUpdated: "2026-01-15T00:00:00Z",
      metadata: {
        packageManifestPresent: true,
      },
    });

    expect(enrichment.profile.missingEvidence).toContain("Tests present");
    expect(enrichment.recommendations.some((recommendation) => recommendation.recommendationType === "add-tests")).toBe(true);
  });

  it("flags unsafe exact metric claims from repo text", () => {
    const enrichment = enrichGitHubProjectEvidence({
      slug: "network-guardian-ai",
      repoName: "network-guardian-ai",
      description: "Reduced API cost by 90% while running in production.",
      topics: ["network-security", "ai"],
      metadata: {
        packageManifestPresent: true,
      },
    });

    expect(enrichment.profile.claimWarnings.some((warning) => warning.includes("exact performance/cost/deployment metric"))).toBe(true);
    expect(enrichment.profile.claimWarnings.some((warning) => warning.includes("production status"))).toBe(true);
    expect(enrichment.recommendations.some((recommendation) => recommendation.recommendationType === "soften-claim")).toBe(true);
  });

  it("does not assign production maturity to a high-scoring GitHub repo without approval", () => {
    const enrichment = enrichGitHubProjectEvidence({
      slug: "codeflow-hook",
      repoName: "codeflow-hook",
      description: "Open-source AI-assisted code review CLI.",
      readme: "## codeflow-hook\n\n![demo](./demo.png)\n\nAPI docs, architecture docs, safety notes, and npm install instructions.",
      technologies: ["TypeScript", "Docker", "GitHub Actions", "Vitest"],
      topics: ["developer-tools", "typescript"],
      homepage: "https://npmjs.com/package/codeflow-hook",
      lastUpdated: "2026-01-15T00:00:00Z",
      metadata: {
        packageManifestPresent: true,
        dockerPresent: true,
        githubActionsPresent: true,
        testsPresent: true,
        docsPresent: true,
        apiDocsPresent: true,
        securitySafetyDocsPresent: true,
        deploymentConfigPresent: true,
        licensePresent: true,
        npmPackageEvidencePresent: true,
      },
    });

    expect(enrichment.profile.maturityScore).toBeGreaterThanOrEqual(85);
    expect(enrichment.profile.maturity).toBe("mvp");
  });

  it("allows Pilly-style safety-boundary wording", () => {
    const enrichment = enrichGitHubProjectEvidence({
      slug: "pilly-medimate-voice",
      repoName: "pilly-medimate-voice",
      description: "Firebase-backed responsible-AI medication support prototype with explicit safety boundaries.",
      readme: "Not a medical product. No diagnosis. No dosage advice. Not for real patient data.",
      topics: ["responsible-ai", "firebase"],
      metadata: {
        packageManifestPresent: true,
        securitySafetyDocsPresent: true,
      },
    });

    expect(enrichment.profile.claimWarnings).toEqual([]);
  });

  it("creates a missing demo recommendation", () => {
    const enrichment = enrichGitHubProjectEvidence({
      slug: "network-guardian-ai",
      repoName: "network-guardian-ai",
      description: "Explored AI-assisted network traffic analysis and anomaly detection.",
      readme: "Network Guardian AI prototype.",
      topics: ["network-security", "ai"],
    });

    expect(enrichment.profile.missingEvidence).toContain("Live demo link present");
    expect(enrichment.recommendations.some((recommendation) => recommendation.recommendationType === "add-demo-link")).toBe(true);
  });

  it("keeps generated recommendations draft-only on normalized GitHub projects", () => {
    const project = normalizeRepositoryProject(repo, {
      readme: "## codeflow-hook\n\nOpen-source AI code review CLI with npm install instructions.",
      languages: { TypeScript: 1000 },
      manifestSkills: ["TypeScript", "Vitest", "GitHub Actions"],
      evidenceMetadata: {
        packageManifestPresent: true,
        githubActionsPresent: true,
        testsPresent: true,
        npmPackageEvidencePresent: true,
      },
    });

    expect(project.evidenceProfile?.repoName).toBe("codeflow-hook");
    expect(project.evidenceRecommendations?.every((recommendation) => recommendation.draftOnly)).toBe(true);
  });
});

function signalPresent(signals: ReturnType<typeof buildGitHubEvidenceSignals>, key: string): boolean {
  return Boolean(signals.find((signal) => signal.key === key)?.present);
}
