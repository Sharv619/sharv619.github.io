import { verifiedClaims } from "./claim-source-of-truth";
import { getMissingEvidence } from "./evidence-signals";
import type { EvidenceSignal, ProjectEvidenceProfile, ProjectMaturity } from "./evidence-signals";

const SIGNAL_WEIGHTS: Record<string, number> = {
  readme: 10,
  tests: 15,
  "github-actions": 10,
  docker: 8,
  "live-demo": 12,
  screenshots: 8,
  "docs-folder": 6,
  "api-docs": 4,
  "security-safety-docs": 8,
  "package-manifest": 6,
  "python-dependencies": 6,
  "deployment-config": 6,
  license: 4,
  "npm-package": 6,
};

export type CredibilityScoreInput = {
  slug: string;
  repoName: string;
  lastUpdated?: string;
  languages?: string[];
  topics?: string[];
  signals: EvidenceSignal[];
  claimWarnings?: string[];
  approvedProductionSlugs?: string[];
};

export function calculateMaturityScore(input: {
  signals: EvidenceSignal[];
  lastUpdated?: string;
  topics?: string[];
  now?: Date;
}): number {
  const signalScore = input.signals.reduce((score, signal) => {
    if (!signal.present) {
      return score;
    }

    return score + (SIGNAL_WEIGHTS[signal.key] || 0);
  }, 0);
  const recentUpdateScore = isRecentlyUpdated(input.lastUpdated, input.now) ? 8 : 0;
  const clearTopicScore = input.topics && input.topics.length >= 2 ? 5 : 0;

  return Math.min(100, signalScore + recentUpdateScore + clearTopicScore);
}

export function mapScoreToMaturity(
  score: number,
  slug: string,
  approvedProductionSlugs: string[] = []
): ProjectMaturity {
  if (score >= 85) {
    return isProductionApproved(slug, approvedProductionSlugs) ? "production" : "mvp";
  }

  if (score >= 70) {
    return "mvp";
  }

  if (score >= 50) {
    return "prototype";
  }

  if (score >= 0) {
    return "experiment";
  }

  return "unknown";
}

export function buildProjectEvidenceProfile(input: CredibilityScoreInput): ProjectEvidenceProfile {
  const maturityScore = calculateMaturityScore({
    signals: input.signals,
    lastUpdated: input.lastUpdated,
    topics: input.topics,
  });

  return {
    slug: input.slug,
    repoName: input.repoName,
    ...(input.lastUpdated ? { lastUpdated: input.lastUpdated } : {}),
    languages: input.languages || [],
    topics: input.topics || [],
    signals: input.signals,
    maturityScore,
    maturity: mapScoreToMaturity(maturityScore, input.slug, input.approvedProductionSlugs),
    missingEvidence: getMissingEvidence(input.signals),
    claimWarnings: input.claimWarnings || [],
  };
}

export function isProductionApproved(slug: string, approvedProductionSlugs: string[] = []): boolean {
  if (approvedProductionSlugs.includes(slug)) {
    return true;
  }

  return slug === "production-recovery-performance-rebuild"
    && verifiedClaims.projectStatuses.production.includes("Real client/employer system");
}

function isRecentlyUpdated(lastUpdated?: string, now: Date = new Date()): boolean {
  if (!lastUpdated) {
    return false;
  }

  const updatedAt = Date.parse(lastUpdated);

  if (Number.isNaN(updatedAt)) {
    return false;
  }

  const daysSinceUpdate = (now.getTime() - updatedAt) / (1000 * 60 * 60 * 24);

  return daysSinceUpdate >= 0 && daysSinceUpdate <= 365;
}
