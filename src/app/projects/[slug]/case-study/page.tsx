import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import RepositoryCaseStudyClient from "@/components/RepositoryCaseStudyClient";
import { slugify } from "@/lib/data";
import { getFlagshipCaseStudy } from "@/lib/flagship-case-studies";
import { getPortfolioProjects } from "@/lib/github-projects";
import { toPublicProject } from "@/lib/public-project";
import { createPageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export async function generateStaticParams() {
  const projects = await getPortfolioProjects();

  return projects.map((project) => ({
    slug: project.slug || slugify(project.title),
  }));
}

interface ProjectCaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProjectCaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const projects = await getPortfolioProjects();
  const project = projects.find((item) => (item.slug || slugify(item.title)) === slug);
  const curatedCaseStudy = project?.caseStudySlug
    ? getFlagshipCaseStudy(project.caseStudySlug)
    : undefined;

  if (!project) {
    return {};
  }

  return createPageMetadata({
    title: `${curatedCaseStudy?.title || project.title} Case Study - Himanshu Lade`,
    description: curatedCaseStudy?.oneLiner || project.portfolioSummary || project.description,
    path: curatedCaseStudy
      ? `/case-studies/${curatedCaseStudy.slug}/`
      : `/projects/${slug}/case-study/`,
  });
}

export default async function ProjectCaseStudyPage({ params }: ProjectCaseStudyPageProps) {
  const { slug } = await params;
  const projects = await getPortfolioProjects();
  const project = projects.find((item) => (item.slug || slugify(item.title)) === slug);

  if (!project) {
    notFound();
  }

  const caseStudy = project.caseStudySlug
    ? getFlagshipCaseStudy(project.caseStudySlug)
    : undefined;

  if (caseStudy) {
    redirect(`/case-studies/${caseStudy.slug}/`);
  }

  return <RepositoryCaseStudyClient project={toPublicProject(project)} />;
}
