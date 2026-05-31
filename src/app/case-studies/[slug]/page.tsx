import { notFound } from "next/navigation";
import CaseStudyDetailClient from "@/components/CaseStudyDetailClient";
import { getFlagshipCaseStudy, getOrderedFlagshipCaseStudies } from "@/lib/flagship-case-studies";

export const dynamicParams = false;

export async function generateStaticParams() {
  return getOrderedFlagshipCaseStudies().map((caseStudy) => ({
    slug: caseStudy.slug,
  }));
}

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const caseStudy = getFlagshipCaseStudy(slug);

  if (!caseStudy) {
    notFound();
  }

  return <CaseStudyDetailClient caseStudy={caseStudy} />;
}
