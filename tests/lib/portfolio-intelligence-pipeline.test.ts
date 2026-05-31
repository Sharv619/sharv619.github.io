import { describe, expect, it } from "vitest";
import { evaluateDraftClaims } from "../../src/lib/claim-guardrails";
import { createEvidenceSignal } from "../../src/lib/evidence-signals";
import {
  buildProjectEvidenceProfile,
  calculateMaturityScore,
  mapScoreToMaturity,
} from "../../src/lib/project-credibility";
import {
  DRAFT_ONLY_NOTICE,
  generateRecommendationsForProfile,
} from "../../src/lib/portfolio-recommendations";

const strongSignals = [
  createEvidenceSignal("readme", true, "github", "high"),
  createEvidenceSignal("tests", true, "repo-files", "high"),
  createEvidenceSignal("github-actions", true, "repo-files", "high"),
  createEvidenceSignal("docker", true, "repo-files", "high"),
  createEvidenceSignal("live-demo", true, "github", "medium"),
  createEvidenceSignal("screenshots", true, "readme", "medium"),
  createEvidenceSignal("docs-folder", true, "repo-files", "medium"),
  createEvidenceSignal("api-docs", true, "repo-files", "medium"),
  createEvidenceSignal("security-safety-docs", true, "repo-files", "medium"),
  createEvidenceSignal("package-manifest", true, "repo-files", "high"),
  createEvidenceSignal("license", true, "repo-files", "high"),
];

describe("Portfolio Intelligence Pipeline", () => {
  it("calculates maturity score from objective evidence signals", () => {
    const score = calculateMaturityScore({
      signals: strongSignals,
      topics: ["developer-tools", "typescript"],
      lastUpdated: "2026-01-15T00:00:00Z",
      now: new Date("2026-06-01T00:00:00Z"),
    });

    expect(score).toBe(100);
  });

  it("does not assign production maturity from score alone", () => {
    expect(mapScoreToMaturity(94, "codeflow-hook")).toBe("mvp");
    expect(mapScoreToMaturity(94, "production-recovery-performance-rebuild")).toBe("production");
  });

  it("builds an evidence profile with missing evidence and maturity", () => {
    const profile = buildProjectEvidenceProfile({
      slug: "network-guardian-ai",
      repoName: "network-guardian-ai",
      topics: ["security", "ai"],
      lastUpdated: "2026-01-15T00:00:00Z",
      signals: [
        createEvidenceSignal("readme", true, "github", "high"),
        createEvidenceSignal("tests", false, "repo-files", "medium"),
        createEvidenceSignal("live-demo", false, "github", "medium"),
      ],
      claimWarnings: ["Avoid production security-product framing."],
    });

    expect(profile.maturity).toBe("experiment");
    expect(profile.missingEvidence).toContain("Tests present");
    expect(profile.missingEvidence).toContain("Live demo link present");
    expect(profile.claimWarnings).toContain("Avoid production security-product framing.");
  });

  it("flags forbidden claims", () => {
    const result = evaluateDraftClaims("This production-ready tool has 99.99% uptime and 450+ downloads.");

    expect(result.safe).toBe(false);
    expect(result.warnings.map((warning) => warning.phrase)).toEqual(
      expect.arrayContaining(["exact uptime claim", "99.99% uptime", "exact download/install count"])
    );
  });

  it("allows approved Pilly safety wording", () => {
    const result = evaluateDraftClaims(
      "Firebase-backed responsible-AI medication support prototype with explicit safety boundaries. Not a medical product. No diagnosis. No dosage advice."
    );

    expect(result.safe).toBe(true);
  });

  it("flags unsafe medical wording", () => {
    const result = evaluateDraftClaims("An AI doctor that can diagnose missed doses and provide dosage advice.");

    expect(result.safe).toBe(false);
    expect(result.warnings.map((warning) => warning.phrase)).toEqual(
      expect.arrayContaining(["unsafe medical positioning", "medical diagnosis or dosage claim"])
    );
  });

  it("flags unsupported exact metric claims", () => {
    const result = evaluateDraftClaims("Reduced API cost by 90% and deployment reduction by 90%.");

    expect(result.safe).toBe(false);
    expect(result.warnings.some((warning) => warning.phrase === "exact performance/cost/deployment metric")).toBe(true);
  });

  it("marks recommendations as draft-only", () => {
    const profile = buildProjectEvidenceProfile({
      slug: "backpocket-os",
      repoName: "backpocket-os",
      signals: [
        createEvidenceSignal("readme", false, "github", "medium"),
        createEvidenceSignal("tests", false, "repo-files", "medium"),
        createEvidenceSignal("screenshots", false, "readme", "medium"),
        createEvidenceSignal("live-demo", false, "github", "medium"),
      ],
    });
    const recommendations = generateRecommendationsForProfile(profile);

    expect(DRAFT_ONLY_NOTICE).toContain("draft-only");
    expect(recommendations.length).toBeGreaterThan(0);
    expect(recommendations.every((recommendation) => recommendation.draftOnly)).toBe(true);
  });
});
