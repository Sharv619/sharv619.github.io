import ProjectsPageClient from "@/components/ProjectsPageClient";
import { getPortfolioProjects } from "@/lib/github-projects";
import { toPublicProjects } from "@/lib/public-project";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Projects & Case Studies - Himanshu Lade",
  description: "GitHub-backed software engineering projects and curated case studies by Himanshu Lade.",
  path: "/projects/",
});

export default async function ProjectDetails() {
  const projects = await getPortfolioProjects();

  return <ProjectsPageClient projects={toPublicProjects(projects)} />;
}
