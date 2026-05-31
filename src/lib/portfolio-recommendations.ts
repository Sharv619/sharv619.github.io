import type { ProjectEvidenceProfile } from "./evidence-signals";

export type PortfolioRecommendationType =
  | "improve-readme"
  | "add-tests"
  | "add-screenshots"
  | "add-demo-link"
  | "soften-claim"
  | "promote-to-featured"
  | "keep-as-experiment"
  | "needs-human-review";

export type PortfolioRecommendation = {
  projectSlug: string;
  recommendationType: PortfolioRecommendationType;
  severity: "low" | "medium" | "high";
  recommendation: string;
  reason: string;
  draftOnly: true;
};

export const DRAFT_ONLY_NOTICE = "Recommendations are draft-only and require human approval before being published.";

export function generatePortfolioRecommendations(
  profiles: ProjectEvidenceProfile[]
): PortfolioRecommendation[] {
  return profiles.flatMap(generateRecommendationsForProfile);
}

export function generateRecommendationsForProfile(
  profile: ProjectEvidenceProfile
): PortfolioRecommendation[] {
  const recommendations: PortfolioRecommendation[] = [];

  if (isMissing(profile, "readme")) {
    recommendations.push(createRecommendation(
      profile.slug,
      "improve-readme",
      "high",
      "Improve the README with problem, solution, setup, screenshots, and limitations.",
      "The README is the strongest public context source for automated portfolio cards."
    ));
  }

  if (isMissing(profile, "tests")) {
    recommendations.push(createRecommendation(
      profile.slug,
      "add-tests",
      "medium",
      "Add or document tests that validate the main project workflow.",
      "Tests increase project credibility and reduce the risk of overclaiming maturity."
    ));
  }

  if (isMissing(profile, "screenshots")) {
    recommendations.push(createRecommendation(
      profile.slug,
      "add-screenshots",
      "medium",
      "Add screenshots or a short demo GIF to make the project easier to evaluate.",
      "Visual proof helps reviewers understand what was actually built."
    ));
  }

  if (isMissing(profile, "live-demo")) {
    recommendations.push(createRecommendation(
      profile.slug,
      "add-demo-link",
      "medium",
      "Add a live demo link or clearly explain why the project is repository-only.",
      "A reachable demo is useful evidence, but missing demos should be explained instead of hidden."
    ));
  }

  if (profile.claimWarnings.length > 0) {
    recommendations.push(createRecommendation(
      profile.slug,
      "soften-claim",
      "high",
      "Soften or remove claims flagged by the guardrail before publishing.",
      profile.claimWarnings.join(" ")
    ));
  }

  if (profile.maturity === "mvp" && profile.maturityScore >= 75 && profile.claimWarnings.length === 0) {
    recommendations.push(createRecommendation(
      profile.slug,
      "promote-to-featured",
      "low",
      "Consider human review for a featured project slot.",
      "The evidence score is strong, but promotion still requires manual judgment."
    ));
  }

  if (profile.maturity === "experiment") {
    recommendations.push(createRecommendation(
      profile.slug,
      "keep-as-experiment",
      "low",
      "Keep this project framed as an experiment until stronger evidence exists.",
      "The current evidence score does not support MVP or production framing."
    ));
  }

  if (profile.maturity === "production") {
    recommendations.push(createRecommendation(
      profile.slug,
      "needs-human-review",
      "high",
      "Review production framing before publishing or promoting.",
      "Production claims require explicit source-of-truth approval and human review."
    ));
  }

  return recommendations;
}

function createRecommendation(
  projectSlug: string,
  recommendationType: PortfolioRecommendationType,
  severity: PortfolioRecommendation["severity"],
  recommendation: string,
  reason: string
): PortfolioRecommendation {
  return {
    projectSlug,
    recommendationType,
    severity,
    recommendation,
    reason,
    draftOnly: true,
  };
}

function isMissing(profile: ProjectEvidenceProfile, signalKey: string): boolean {
  return profile.signals.some((signal) => signal.key === signalKey && !signal.present);
}
