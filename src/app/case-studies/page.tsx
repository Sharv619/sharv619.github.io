import Navigation from "@/components/Navigation";
import Contact from "@/components/Contact";
import FeaturedCaseStudies from "@/components/FeaturedCaseStudies";
import { getOrderedFlagshipCaseStudies } from "@/lib/flagship-case-studies";

export default function CaseStudiesPage() {
  const caseStudies = getOrderedFlagshipCaseStudies();

  return (
    <div className="min-h-screen">
      <Navigation />
      <section className="py-24 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Flagship Case Studies
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Curated engineering stories for the strongest hiring proof: production recovery, responsible AI, and AI developer tooling.
          </p>
        </div>
      </section>
      <FeaturedCaseStudies caseStudies={caseStudies} />
      <Contact />
    </div>
  );
}
