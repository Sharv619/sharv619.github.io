import { getPortfolioProjects } from "../src/lib/github-projects";

interface ExportedGitHubProject {
  title: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
  status: "active" | "archived";
  primaryLanguage: string | null;
  topics: string[];
  stars: number;
  forks: number;
  updatedAt?: string;
  pushedAt?: string;
}

function readLimit(): number {
  const limitArg = process.argv.find((arg) => arg.startsWith("--limit="));
  const parsedLimit = Number(limitArg?.replace("--limit=", ""));

  return Number.isFinite(parsedLimit) && parsedLimit > 0 ? parsedLimit : 10;
}

async function main(): Promise<void> {
  const limit = readLimit();
  const projects = await getPortfolioProjects();
  const exportedProjects: ExportedGitHubProject[] = projects.slice(0, limit).map((project) => ({
    title: project.title,
    description: project.description,
    technologies: project.technologies,
    githubUrl: project.githubUrl,
    liveUrl: project.liveUrl,
    status: project.archived ? "archived" : "active",
    primaryLanguage: project.primaryLanguage || null,
    topics: project.topics || [],
    stars: project.stars || 0,
    forks: project.forks || 0,
    updatedAt: project.updatedAt,
    pushedAt: project.pushedAt,
  }));

  console.log(JSON.stringify({
    generatedAt: new Date().toISOString(),
    count: exportedProjects.length,
    projects: exportedProjects,
  }, null, 2));
}

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : "Unknown GitHub export error";
  console.error(message);
  process.exitCode = 1;
});
