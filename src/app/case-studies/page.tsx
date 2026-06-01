import Navigation from "@/components/Navigation";
import Contact from "@/components/Contact";
import FeaturedCaseStudies from "@/components/FeaturedCaseStudies";
import { getOrderedFlagshipCaseStudies } from "@/lib/flagship-case-studies";

export default function CaseStudiesPage() {
  const caseStudies = getOrderedFlagshipCaseStudies();

  return (
    <div className="min-h-screen bg-[#f7f4ed] dark:bg-[#101010]">
      <Navigation />
      <section className="relative overflow-hidden border-b border-stone-200 px-4 pb-16 pt-32 dark:border-white/10 sm:px-6 lg:px-8">
        <div className="absolute inset-0 opacity-[0.18] dark:opacity-[0.12]">
          <div className="h-full w-full bg-[linear-gradient(to_right,#78716c_1px,transparent_1px),linear-gradient(to_bottom,#78716c_1px,transparent_1px)] bg-[size:44px_44px]" />
        </div>
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-10 lg:grid-cols-[1fr_0.7fr] lg:items-end">
          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-teal-700 dark:text-teal-300">
              Engineering evidence
            </p>
            <h1 className="text-balance text-5xl font-black leading-[0.96] text-stone-950 sm:text-6xl lg:text-7xl dark:text-white">
            Flagship Case Studies
            </h1>
            <p className="mt-6 max-w-3xl text-xl leading-8 text-stone-700 dark:text-stone-300">
              Curated engineering stories for the strongest hiring proof: production recovery, responsible AI, and AI developer tooling.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {caseStudies.map((caseStudy, index) => (
              <div key={caseStudy.slug} className="rounded-lg border border-stone-300 bg-white/70 p-4 shadow-sm dark:border-white/10 dark:bg-white/5">
                <p className="text-3xl font-black text-stone-950 dark:text-white">0{index + 1}</p>
                <p className="mt-2 text-xs font-bold uppercase tracking-[0.14em] text-stone-500 dark:text-stone-400">
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
