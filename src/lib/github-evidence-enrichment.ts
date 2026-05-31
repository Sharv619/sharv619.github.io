import { evaluateDraftClaims } from "./claim-guardrails";
import { createEvidenceSignal } from "./evidence-signals";
import { buildProjectEvidenceProfile } from "./project-credibility";
import { generateRecommendationsForProfile } from "./portfolio-recommendations";
import type { EvidenceSignal, ProjectEvidenceProfile } from "./evidence-signals";
import type { PortfolioRecommendation } from "./portfolio-recommendations";

export type GitHubEvidenceMetadata = {
  packageManifestPresent?: boolean;
  pythonDependencyFilePresent?: boolean;
  dockerPresent?: boolean;
  githubActionsPresent?: boolean;
  testsPresent?: boolean;
  docsPresent?: boolean;
  apiDocsPresent?: boolean;
  securitySafetyDocsPresent?: boolean;
  screenshotsPresent?: boolean;
  deploymentConfigPresent?: boolean;
  licensePresent?: boolean;
  npmPackageEvidencePresent?: boolean;
};

export type GitHubEvidenceInput = {
  slug: string;
  repoName: string;
  description?: string;
  readme?: string;
  readmeSummary?: string;
  languages?: string[];
  topics?: string[];
  technologies?: string[];
  homepage?: string;
  githubUrl?: string;
  lastUpdated?: string;
  metadata?: GitHubEvidenceMetadata;
};

export type GitHubEvidenceEnrichment = {
  profile: ProjectEvidenceProfile;
  recommendations: PortfolioRecommendation[];
};

export function enrichGitHubProjectEvidence(input: GitHubEvidenceInput): GitHubEvidenceEnrichment {
  const claimWarnings = evaluateProjectClaims(input).warnings.map((warning) => (
    `${warning.phrase}: ${warning.reason}`
  ));
  const profile = buildProjectEvidenceProfile({
    slug: input.slug,
    repoName: input.repoName,
    lastUpdated: input.lastUpdated,
    languages: input.languages,
    topics: input.topics,
    signals: buildGitHubEvidenceSignals(input),
    claimWarnings,
  });

  return {
    profile,
    recommendations: generateRecommendationsForProfile(profile),
  };
}

export function buildGitHubEvidenceSignals(input: GitHubEvidenceInput): EvidenceSignal[] {
  const metadata = input.metadata || {};
  const readme = input.readme || "";
  const description = input.description || "";
  const topics = input.topics || [];
  const technologies = input.technologies || [];

  return [
    createEvidenceSignal(
      "readme",
      Boolean(readme.trim() || input.readmeSummary?.trim()),
      readme ? "readme" : "unknown",
      readme ? "high" : "low"
    ),
    createEvidenceSignal(
      "tests",
      Boolean(metadata.testsPresent || hasAnyTechnology(technologies, ["Vitest", "Jest", "Playwright", "Testing Library", "React Testing Library", "Pytest"])),
      metadata.testsPresent ? "repo-files" : "unknown",
      metadata.testsPresent ? "high" : "low"
    ),
    createEvidenceSignal(
      "docker",
      Boolean(metadata.dockerPresent || hasAnyTechnology(technologies, ["Docker", "Docker Compose"])),
      metadata.dockerPresent ? "repo-files" : "unknown",
      metadata.dockerPresent ? "high" : "low"
    ),
    createEvidenceSignal(
      "github-actions",
      Boolean(metadata.githubActionsPresent || hasAnyTechnology(technologies, ["GitHub Actions"])),
      metadata.githubActionsPresent ? "repo-files" : "unknown",
      metadata.githubActionsPresent ? "high" : "low"
    ),
    createEvidenceSignal(
      "package-manifest",
      Boolean(metadata.packageManifestPresent),
      metadata.packageManifestPresent ? "repo-files" : "unknown",
      metadata.packageManifestPresent ? "high" : "low"
    ),
    createEvidenceSignal(
      "python-dependencies",
      Boolean(metadata.pythonDependencyFilePresent),
      metadata.pythonDependencyFilePresent ? "repo-files" : "unknown",
      metadata.pythonDependencyFilePresent ? "high" : "low"
    ),
    createEvidenceSignal(
      "live-demo",
      Boolean(input.homepage?.trim()),
      input.homepage?.trim() ? "github" : "unknown",
      input.homepage?.trim() ? "high" : "low"
    ),
    createEvidenceSignal(
      "screenshots",
      Boolean(metadata.screenshotsPresent || hasScreenshotEvidence(readme)),
      metadata.screenshotsPresent || hasScreenshotEvidence(readme) ? "readme" : "unknown",
      metadata.screenshotsPresent || hasScreenshotEvidence(readme) ? "medium" : "low"
    ),
    createEvidenceSignal(
      "docs-folder",
      Boolean(metadata.docsPresent || hasDocsEvidence(readme, description, topics)),
      metadata.docsPresent ? "repo-files" : hasDocsEvidence(readme, description, topics) ? "readme" : "unknown",
      metadata.docsPresent ? "high" : hasDocsEvidence(readme, description, topics) ? "medium" : "low"
    ),
    createEvidenceSignal(
      "api-docs",
      Boolean(metadata.apiDocsPresent || hasApiDocsEvidence(readme, description, topics)),
      metadata.apiDocsPresent ? "repo-files" : hasApiDocsEvidence(readme, description, topics) ? "readme" : "unknown",
      metadata.apiDocsPresent ? "high" : hasApiDocsEvidence(readme, description, topics) ? "medium" : "low"
    ),
    createEvidenceSignal(
      "security-safety-docs",
      Boolean(metadata.securitySafetyDocsPresent || hasSecuritySafetyEvidence(readme, description, topics)),
      metadata.securitySafetyDocsPresent ? "repo-files" : hasSecuritySafetyEvidence(readme, description, topics) ? "readme" : "unknown",
      metadata.securitySafetyDocsPresent ? "high" : hasSecuritySafetyEvidence(readme, description, topics) ? "medium" : "low"
    ),
    createEvidenceSignal(
      "npm-package",
      Boolean(metadata.npmPackageEvidencePresent || hasNpmEvidence(input.githubUrl, input.homepage, readme, description)),
      metadata.npmPackageEvidencePresent || hasNpmEvidence(input.githubUrl, input.homepage, readme, description) ? "github" : "unknown",
      metadata.npmPackageEvidencePresent || hasNpmEvidence(input.githubUrl, input.homepage, readme, description) ? "medium" : "low"
    ),
    createEvidenceSignal(
      "deployment-config",
      Boolean(metadata.deploymentConfigPresent || hasAnyTechnology(technologies, ["GitHub Pages", "Vercel", "AWS"])),
      metadata.deploymentConfigPresent ? "repo-files" : "unknown",
      metadata.deploymentConfigPresent ? "high" : "low"
    ),
    createEvidenceSignal(
      "license",
      Boolean(metadata.licensePresent),
      metadata.licensePresent ? "repo-files" : "unknown",
      metadata.licensePresent ? "high" : "low"
    ),
    createEvidenceSignal(
      "recent-update",
      isRecentlyUpdated(input.lastUpdated),
      input.lastUpdated ? "github" : "unknown",
      input.lastUpdated ? "high" : "low"
    ),
  ];
}

function evaluateProjectClaims(input: GitHubEvidenceInput) {
  return evaluateDraftClaims([
    input.description,
    input.readmeSummary,
    input.readme,
  ].filter(Boolean).join("\n\n"));
}

function hasAnyTechnology(technologies: string[], expected: string[]): boolean {
  const normalizedTechnologies = technologies.map((technology) => technology.toLowerCase());

  return expected.some((technology) => normalizedTechnologies.includes(technology.toLowerCase()));
}

function hasScreenshotEvidence(readme: string): boolean {
  return /!\[[^\]]*]\([^)]*\)|\b(screenshot|screenshots|demo gif|preview image)\b/i.test(readme);
}

function hasDocsEvidence(readme: string, description: string, topics: string[]): boolean {
  return /\b(docs|documentation|guide|architecture)\b/i.test(`${readme}\n${description}\n${topics.join(" ")}`);
}

function hasApiDocsEvidence(readme: string, description: string, topics: string[]): boolean {
  return /\b(api docs|openapi|swagger|endpoint|endpoints|rest api|graphql)\b/i.test(`${readme}\n${description}\n${topics.join(" ")}`);
}

function hasSecuritySafetyEvidence(readme: string, description: string, topics: string[]): boolean {
  return /\b(security|safety|privacy|owasp|threat model|not medical|no diagnosis|no dosage)\b/i.test(`${readme}\n${description}\n${topics.join(" ")}`);
}

function hasNpmEvidence(...values: Array<string | undefined>): boolean {
  return values.some((value) => Boolean(value && /npmjs\.com|npm install|npx\s+/i.test(value)));
}

function isRecentlyUpdated(lastUpdated?: string): boolean {
  if (!lastUpdated) {
    return false;
  }

  const updatedAt = Date.parse(lastUpdated);

  if (Number.isNaN(updatedAt)) {
    return false;
  }

  const daysSinceUpdate = (Date.now() - updatedAt) / (1000 * 60 * 60 * 24);

  return daysSinceUpdate >= 0 && daysSinceUpdate <= 365;
}
