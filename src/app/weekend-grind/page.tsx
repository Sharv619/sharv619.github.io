import Navigation from "@/components/Navigation";
import Contact from "@/components/Contact";
import { personalAutomationWorkflows } from "@/lib/personal-workflows";
import WeekendGrindList from "@/components/WeekendGrindList";

export const metadata = {
  title: "Weekend Build Sprints | Himanshu Lade",
  description: "All small tools, daily use, and personal infrastructure projects showcased in the Weekend Build Sprints section.",
};

export default function WeekendGrindPage() {
  // Filter for the three labels we want to show
  const weekendGrinds = personalAutomationWorkflows.filter(
    (workflow) =>
      workflow.label === "Small tool, daily use" ||
      workflow.label === "Personal infrastructure" ||
      workflow.label === "Learning experiment"
  );

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
              Personal infrastructure
            </p>
            <h1 className="text-balance text-5xl font-black leading-[0.96] text-stone-950 sm:text-6xl lg:text-7xl dark:text-white">
              All Weekend Build Sprints
            </h1>
            <p className="mt-6 max-w-3xl text-xl leading-8 text-stone-700 dark:text-stone-300">
              A collection of small tools, daily use utilities, and personal infrastructure projects that started as weekend build sprints.
            </p>
          </div>
          {/* We don't have a preview grid like case studies, so we leave this empty for now */}
        </div>
      </section>
      <div className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          <WeekendGrindList weekendGrinds={weekendGrinds} />
        </div>
      </div>
      <Contact />
    </div>
  );
}