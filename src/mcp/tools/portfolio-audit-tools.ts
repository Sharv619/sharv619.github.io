import { pathExists, readTextFile, writeRepoFile } from "../shared/fs-utils";

const REQUIRED_CASE_STUDIES = [
  "production-recovery-performance-rebuild",
  "pilly-medimate-voice",
  "codeflow-hook",
];

const POSITIONING_REPOS = [
  {
    name: "Pilly / MediMate Voice",
    description: "Firebase-backed responsible-AI medication support MVP for seniors and caregivers, featuring event-based reminders, caregiver alerts, voice-friendly responses, and strict safety boundaries.",
    topics: ["firebase", "cloud-functions", "firestore", "responsible-ai", "healthcare-prototype", "medication-support", "caregiver-tools", "typescript", "gemini-api", "hackathon"],
    direction: "Lead with the 12-hour hackathon MVP context, seniors/caregivers workflow, deterministic fallback behavior, and explicit non-medical safety boundaries.",
    priority: "Flagship",
  },
  {
    name: "codeflow-hook",
    description: "AI-assisted code review CLI that runs pre-commit checks with specialised agents for security, architecture, and code quality feedback.",
    topics: ["ai-code-review", "developer-tools", "cli", "git-hooks", "rag", "typescript", "nodejs", "pre-commit", "automation"],
    direction: "Open with the pre-commit workflow, supported providers, structured review output, local/privacy direction, and a short install/demo section.",
    priority: "Flagship",
  },
  {
    name: "Sharvilak Writes",
    description: "Personal writing archive and knowledge platform connecting long-form essays, blog content, and AI-assisted retrieval.",
    topics: ["django", "personal-knowledge-base", "writing-platform", "rag", "portfolio", "sqlite", "docker", "ai-assisted"],
    direction: "Explain the writing/archive problem, content model, retrieval plans, screenshots, and clear limitations.",
    priority: "Supporting",
  },
  {
    name: "BackPocket OS",
    description: "AI-assisted admin workflow prototype for turning messy small-business emails, quote requests, documents, and follow-ups into structured operations.",
    topics: ["ai-workflows", "small-business", "automation", "rag", "gmail", "google-drive", "admin-tools", "python", "fastapi", "local-first"],
    direction: "Show the messy-input to structured-workflow path, integrations, operator review points, and data/privacy constraints.",
    priority: "Supporting",
  },
  {
    name: "ReliBoard",
    description: "Full-stack project management app demonstrating authentication, role-based access, task workflows, and API-driven team collaboration.",
    topics: ["full-stack", "project-management", "rbac", "jwt", "react", "nodejs", "mongodb", "testing"],
    direction: "Emphasize auth, RBAC, API design, test coverage, and known production-readiness gaps.",
    priority: "Supporting",
  },
  {
    name: "Network Guardian AI",
    description: "Local network traffic intelligence prototype exploring privacy-first log analysis, anomaly detection, and AI-assisted security summaries.",
    topics: ["network-security", "traffic-analysis", "anomaly-detection", "privacy-first", "ai-assisted", "python", "fastapi", "cybersecurity"],
    direction: "Explain data inputs, anomaly detection approach, privacy model, false-positive limitations, and demo screenshots.",
    priority: "Supporting",
  },
];

export function auditGithubAutomationTool() {
  const githubProjects = safeRead("src/lib/github-projects.ts");
  const homePage = safeRead("src/app/page.tsx");
  const projectsPage = safeRead("src/app/projects/page.tsx");
  const deployWorkflow = safeRead(".github/workflows/deploy.yml");
  const nextConfig = safeRead("next.config.ts");
  const dataFile = safeRead("src/lib/data.ts");
  const risks: string[] = [];
  const recommendations: string[] = [];

  const result = {
    githubAutomationFound: githubProjects.includes("getPortfolioProjects") && githubProjects.includes("fetchPortfolioRepositories"),
    usesStaticExport: nextConfig.includes("output: 'export'") || nextConfig.includes('output: "export"'),
    usesFallbackData: githubProjects.includes("fallbackProjects") && dataFile.includes("export const projects"),
    homepageUsesGetPortfolioProjects: homePage.includes("getPortfolioProjects"),
    projectsPageUsesGetPortfolioProjects: projectsPage.includes("getPortfolioProjects"),
    dailyRefreshFound: deployWorkflow.includes("schedule:") && deployWorkflow.includes("cron:"),
    risks,
    recommendations,
  };

  if (!result.githubAutomationFound) {
    risks.push("GitHub project ingestion was not detected in src/lib/github-projects.ts.");
  }
  if (!result.usesFallbackData) {
    risks.push("Fallback project data was not detected.");
  }
  if (!result.dailyRefreshFound) {
    recommendations.push("Add a scheduled GitHub Pages workflow refresh if automated metadata freshness is required.");
  }

  return result;
}

export function auditFlagshipCaseStudiesTool() {
  const flagshipPath = "src/lib/flagship-case-studies.ts";
  const positioningPath = "src/lib/career-positioning.ts";
  const exists = pathExists(flagshipPath);
  const content = exists ? safeRead(flagshipPath) : "";
  const caseStudies = REQUIRED_CASE_STUDIES.filter((slug) => content.includes(slug));
  const missingCaseStudies = REQUIRED_CASE_STUDIES.filter((slug) => !content.includes(slug));
  const requiredFields = [
    "slug",
    "title",
    "category",
    "status",
    "oneLiner",
    "problem",
    "solution",
    "impact",
    "technicalHighlights",
    "techStack",
    "role",
    "proof",
    "constraints",
    "limitations",
  ];

  return {
    exists,
    careerPositioningExists: pathExists(positioningPath),
    caseStudies,
    missingCaseStudies,
    missingFields: exists ? requiredFields.filter((field) => !content.includes(field)) : requiredFields,
    risks: [
      ...(!exists ? ["Flagship case study data file is missing."] : []),
      ...(!pathExists(positioningPath) ? ["Career positioning data file is missing."] : []),
    ],
  };
}

export function auditProjectPositioningTool() {
  const candidateFiles = [
    "src/lib/flagship-case-studies.ts",
    "src/lib/data.ts",
    "src/lib/knowledge-base.json",
  ];
  const issues: Array<{ file: string; severity: "info" | "warning" | "error"; issue: string; recommendation: string }> = [];

  candidateFiles.forEach((file) => {
    if (!pathExists(file)) {
      return;
    }

    const content = safeRead(file);
    const lower = content.toLowerCase();

    if (/\b(ai genius|wizard|revolutionary|guaranteed|diagnose|dosage recommendation|take extra|skip dose)\b/i.test(content)) {
      issues.push({
        file,
        severity: "warning",
        issue: "Potential overclaiming or unsafe wording detected.",
        recommendation: "Replace inflated or medical-decision language with concrete engineering scope and safety boundaries.",
      });
    }

    if ((lower.includes("pilly") || lower.includes("medimate")) && !lower.includes("no diagnosis") && !lower.includes("not medical advice")) {
      issues.push({
        file,
        severity: "warning",
        issue: "Healthcare-adjacent project copy lacks an explicit medical safety boundary.",
        recommendation: "State that the project does not diagnose, recommend dosage, or make medical decisions.",
      });
    }

    if (file.endsWith("flagship-case-studies.ts")) {
      ["role", "proof", "limitations", "techStack"].forEach((field) => {
        if (!content.includes(field)) {
          issues.push({
            file,
            severity: "warning",
            issue: `Missing expected case study field: ${field}.`,
            recommendation: `Add ${field} to the case study schema and entries.`,
          });
        }
      });
    }
  });

  return { issues };
}

export function generateRepoPositioningReportTool() {
  const content = `# GitHub Repo Positioning

This report improves upstream GitHub metadata because the portfolio reads repo descriptions, topics, READMEs, languages, manifests, Docker files, and workflows at build time.

${POSITIONING_REPOS.map((repo) => `## ${repo.name}

**Portfolio priority:** ${repo.priority}

**Recommended GitHub description:**  
${repo.description}

**Recommended topics:**  
${repo.topics.join(", ")}

**README improvement direction:**  
${repo.direction}

**Screenshots needed:** Add a clear first-screen screenshot or terminal demo where applicable.

**Demo link needed:** Add a live demo, npm package, or recorded walkthrough if the project cannot run publicly.

**Limitations section needed:** Yes. State what is prototype-only, what is not production-ready, and any safety/privacy boundary.
`).join("\n")}
`;

  writeRepoFile("docs/github-repo-positioning.md", content);
  return {
    path: "docs/github-repo-positioning.md",
    updated: true,
    repos: POSITIONING_REPOS.map((repo) => repo.name),
  };
}

function safeRead(path: string): string {
  try {
    return readTextFile(path);
  } catch {
    return "";
  }
}
