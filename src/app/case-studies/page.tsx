import Navigation from "@/components/Navigation";
import Contact from "@/components/Contact";
import FeaturedCaseStudies from "@/components/FeaturedCaseStudies";
import { getOrderedFlagshipCaseStudies } from "@/lib/flagship-case-studies";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Engineering Case Studies | Himanshu Lade Australia",
  description: "Evidence-based engineering case studies covering production recovery, reliability, responsible AI, workflow automation, and developer tooling.",
  path: "/case-studies/",
});

export default function CaseStudiesPage() {
  const caseStudies = getOrderedFlagshipCaseStudies();

  return (
    <div className="journal-shell min-h-screen">
      <Navigation />
      <section className="journal-grid relative overflow-hidden border-b border-[var(--journal-rule)] px-4 pb-16 pt-32 sm:px-6 lg:px-8">
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-10 lg:grid-cols-[1fr_0.7fr] lg:items-end">
          <div>
            <p className="journal-kicker mb-4">
              Engineering evidence
            </p>
            <h1 className="text-balance font-journal-serif text-5xl font-semibold leading-[0.96] sm:text-6xl lg:text-7xl">
              Engineering under real constraints
            </h1>
            <p className="mt-6 max-w-3xl text-xl leading-8 text-[var(--journal-muted)]">
              Evidence-based stories about production recovery, responsible AI boundaries, and developer tooling, without sanding away the limitations.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {caseStudies.map((caseStudy, index) => (
              <div key={caseStudy.slug} className="journal-card p-4">
                <p className="font-journal-serif text-3xl font-semibold">0{index + 1}</p>
                <p className="journal-kicker mt-2">
                  {caseStudy.status}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <FeaturedCaseStudies caseStudies={caseStudies} />
      <Contact />
    </div>
  );
}
