import CaseStudyDetailClient from "@/components/CaseStudyDetailClient";
import { getFlagshipCaseStudy } from "@/lib/flagship-case-studies";

export default function BackPocketOsAiCaseStudyAliasPage() {
  const caseStudy = getFlagshipCaseStudy("backpocket-os-ai-offline");

  if (!caseStudy) {
    return null;
  }

  return <CaseStudyDetailClient caseStudy={caseStudy} />;
}
