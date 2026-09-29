import ProjectsPageClient from "@/components/ProjectsPageClient";
import { getPortfolioProjects } from "@/lib/github-projects";
import { toPublicProjects } from "@/lib/public-project";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Software Projects & Proof-of-Work Lab | Himanshu Lade",
  description: "Public repositories, engineering case studies, local-first AI prototypes, workflow automation, and personal infrastructure by Sydney engineer Himanshu Lade.",
  path: "/projects/",
});

export default async function ProjectDetails() {
  const projects = await getPortfolioProjects();

  return <ProjectsPageClient projects={toPublicProjects(projects)} />;
}
