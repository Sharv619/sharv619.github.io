import { notFound } from "next/navigation";
import ProjectDetailClient from "@/components/ProjectDetailClient";
import { slugify } from "@/lib/data";
import { getPortfolioProjects } from "@/lib/github-projects";
import { toPublicProject } from "@/lib/public-project";

export const dynamicParams = false;

export async function generateStaticParams() {
  const projects = await getPortfolioProjects();

  return projects.map((project) => ({
    slug: project.slug || slugify(project.title),
  }));
}

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const projects = await getPortfolioProjects();
  const project = projects.find((item) => (item.slug || slugify(item.title)) === slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetailClient project={toPublicProject(project)} />;
}
