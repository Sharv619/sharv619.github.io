import ProjectsPageClient from "@/components/ProjectsPageClient";
import { getPortfolioProjects } from "@/lib/github-projects";
import { toPublicProjects } from "@/lib/public-project";

export default async function ProjectDetails() {
  const projects = await getPortfolioProjects();

  return <ProjectsPageClient projects={toPublicProjects(projects)} />;
}
