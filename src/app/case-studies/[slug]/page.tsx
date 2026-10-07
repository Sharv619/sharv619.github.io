import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CaseStudyDetailClient from "@/components/CaseStudyDetailClient";
import { getFlagshipCaseStudy, getOrderedFlagshipCaseStudies } from "@/lib/flagship-case-studies";
import { getPortfolioProjects } from "@/lib/github-projects";
import { toPublicProject } from "@/lib/public-project";
import { createPageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export async function generateStaticParams() {
  return getOrderedFlagshipCaseStudies().map((caseStudy) => ({
    slug: caseStudy.slug,
  }));
}

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = getFlagshipCaseStudy(slug);

  if (!caseStudy) {
    return {};
  }

  return createPageMetadata({
    title: `${caseStudy.title} - Himanshu Lade`,
    description: caseStudy.oneLiner,
    path: `/case-studies/${slug}/`,
  });
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const caseStudy = getFlagshipCaseStudy(slug);

  if (!caseStudy) {
    notFound();
  }

  const projects = await getPortfolioProjects();
  const project = projects.find((item) => item.caseStudySlug === caseStudy.slug);

  return <CaseStudyDetailClient caseStudy={caseStudy} project={project ? toPublicProject(project) : undefined} />;
}
