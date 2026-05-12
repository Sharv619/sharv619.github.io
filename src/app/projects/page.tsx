import ProjectsPageClient from "@/components/ProjectsPageClient";
import { getPortfolioProjects } from "@/lib/github-projects";

export default async function ProjectDetails() {
  const projects = await getPortfolioProjects();

  return <ProjectsPageClient projects={projects} />;
}
