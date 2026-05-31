import { enrichGitHubProjectEvidence } from "./github-evidence-enrichment";
import { DRAFT_ONLY_NOTICE } from "./portfolio-recommendations";
import type { Project } from "./data";
import type { ProjectEvidenceProfile } from "./evidence-signals";
import type { PortfolioRecommendation } from "./portfolio-recommendations";

export type EvidenceReportSource = "GitHub API" | "fallback data";

export type EvidenceReportProject = {
  project: Project;
  profile: ProjectEvidenceProfile;
  recommendations: PortfolioRecommendation[];
};

export type EvidenceReportInput = {
  projects: Project[];
  source: EvidenceReportSource;
  generatedAt?: Date;
};

export type EvidenceReportResult = {
  markdown: string;
  source: EvidenceReportSource;
  projects: EvidenceReportProject[];
};

export function generateEvidenceReport(input: EvidenceReportInput): EvidenceReportResult {
  const generatedAt = input.generatedAt || new Date();
  const projects = input.projects.map((project) => ({
    project,
    ...getProjectEvidence(project),
  }));
  const markdown = `# Internal Evidence Report

**Internal/private:** This report is for portfolio maintenance and human review only. Do not publish it directly on the public portfolio.

**Generated:** ${generatedAt.toISOString()}

Source: ${input.source}

${DRAFT_ONLY_NOTICE}

This report uses objective repository and project metadata. It must not be used to invent users, revenue, downloads, uptime, production status, exact metrics, security impact, or medical claims.

## Projects Analysed

${projects.map(({ project }) => `- ${project.title}`).join("\n") || "- None"}

## Project Evidence

${projects.map(formatProjectEvidence).join("\n\n")}

## Human Review Checklist

- Confirm source is GitHub API before trusting freshness-sensitive repo signals.
- Review every claim warning before publishing any copy.
- Verify exact metrics against source-of-truth evidence.
- Keep recommendations draft-only until manually approved.
- Do not promote projects to production without explicit source-of-truth approval.
- Re-check healthcare-adjacent copy for no diagnosis, no dosage advice, and no real patient data boundaries.
`;

  return {
    markdown,
    source: input.source,
    projects,
  };
}

function getProjectEvidence(project: Project): {
  profile: ProjectEvidenceProfile;
  recommendations: PortfolioRecommendation[];
} {
  if (project.evidenceProfile && project.evidenceRecommendations) {
    return {
      profile: project.evidenceProfile,
      recommendations: project.evidenceRecommendations,
    };
  }

  const enrichment = enrichGitHubProjectEvidence({
    slug: project.slug || project.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
    repoName: project.githubUrl.split("/").pop() || project.title,
    description: project.description,
    readmeSummary: project.architectureDetails,
    languages: project.primaryLanguage ? [project.primaryLanguage] : [],
    topics: project.topics || [],
    technologies: project.technologies,
    homepage: project.liveUrl && project.liveUrl !== "#" ? project.liveUrl : "",
    githubUrl: project.githubUrl,
    lastUpdated: project.pushedAt || project.updatedAt,
  });

  return enrichment;
}

function formatProjectEvidence({ project, profile, recommendations }: EvidenceReportProject): string {
  return `### ${project.title}

**Repository:** ${profile.repoName}  
**Slug:** ${profile.slug}  
**Credibility score:** ${profile.maturityScore}  
**Maturity:** ${profile.maturity}  
**Last updated:** ${profile.lastUpdated || "Unknown"}

**Evidence signals:**
${profile.signals.map((signal) => `- ${signal.present ? "Present" : "Missing"}: ${signal.label} (${signal.source}, ${signal.confidence})${signal.notes ? ` — ${signal.notes}` : ""}`).join("\n")}

**Missing evidence:**
${profile.missingEvidence.length > 0 ? profile.missingEvidence.map((item) => `- ${item}`).join("\n") : "- None detected"}

**Claim warnings:**
${profile.claimWarnings.length > 0 ? profile.claimWarnings.map((warning) => `- ${warning}`).join("\n") : "- None detected"}

**Draft-only recommendations:**
${recommendations.length > 0 ? recommendations.map((recommendation) => `- [${recommendation.severity}] ${recommendation.recommendationType}: ${recommendation.recommendation} Reason: ${recommendation.reason} Draft-only: ${recommendation.draftOnly ? "yes" : "no"}`).join("\n") : "- None generated"}`;
}
