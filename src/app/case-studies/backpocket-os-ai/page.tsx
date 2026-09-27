import CaseStudyDetailClient from "@/components/CaseStudyDetailClient";
import { getFlagshipCaseStudy } from "@/lib/flagship-case-studies";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "BackPocket OS AI Offline - Himanshu Lade",
  description: "Offline-first BackPocket OS case study covering operator-owned AI workflows, local data, and approval gates.",
  path: "/case-studies/backpocket-os-ai-offline/",
});

export default function BackPocketOsAiCaseStudyAliasPage() {
  const caseStudy = getFlagshipCaseStudy("backpocket-os-ai-offline");

  if (!caseStudy) {
    return null;
  }

  return <CaseStudyDetailClient caseStudy={caseStudy} />;
}
