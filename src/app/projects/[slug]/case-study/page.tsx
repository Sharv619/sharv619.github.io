import { notFound } from "next/navigation";
import CaseStudyDetailClient from "@/components/CaseStudyDetailClient";
import { slugify } from "@/lib/data";
import { getFlagshipCaseStudy } from "@/lib/flagship-case-studies";
import { getPortfolioProjects } from "@/lib/github-projects";

export const dynamicParams = false;

export async function generateStaticParams() {
  const projects = await getPortfolioProjects();

  return projects
    .filter((project) => project.caseStudySlug)
    .map((project) => ({
      slug: project.slug || slugify(project.title),
    }));
}

interface ProjectCaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectCaseStudyPage({ params }: ProjectCaseStudyPageProps) {
  const { slug } = await params;
  const projects = await getPortfolioProjects();
  const project = projects.find((item) => (item.slug || slugify(item.title)) === slug);

  if (!project?.caseStudySlug) {
    notFound();
  }

  const caseStudy = getFlagshipCaseStudy(project.caseStudySlug);

  if (!caseStudy) {
    notFound();
  }

  return <CaseStudyDetailClient caseStudy={caseStudy} />;
}
