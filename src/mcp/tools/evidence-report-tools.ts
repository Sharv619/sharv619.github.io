import { generateEvidenceReport } from "../../lib/evidence-report.js";
import { projects as fallbackProjects } from "../../lib/data.js";
import { getPortfolioProjects } from "../../lib/github-projects.js";
import { writeRepoFile } from "../shared/fs-utils.js";
import type { EvidenceReportSource } from "../../lib/evidence-report.js";
import type { Project } from "../../lib/data.js";

const OUTPUT_PATH = "docs/internal-evidence-report.md";

export async function generateEvidenceReportTool() {
  const { projects, source } = await getProjectsWithSource();
  const report = generateEvidenceReport({
    projects,
    source,
  });

  writeRepoFile(OUTPUT_PATH, report.markdown);

  return {
    path: OUTPUT_PATH,
    updated: true,
    source,
    projectsAnalysed: report.projects.length,
    draftOnly: true,
    warning: "Internal/private report. Recommendations require human approval before publishing.",
  };
}

async function getProjectsWithSource(): Promise<{ projects: Project[]; source: EvidenceReportSource }> {
  try {
    return {
      projects: await getPortfolioProjects({ useFallback: false }),
      source: "GitHub API",
    };
  } catch {
    return {
      projects: fallbackProjects,
      source: "fallback data",
    };
  }
}
