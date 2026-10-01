"use client";

import { personalAutomationWorkflows } from "@/lib/personal-workflows";
import { FadeInView } from "@/components/FadeInView";
import { SectionHeader } from "@/components/SectionHeader";

export default function WeekendGrindSection() {
  // Filter for small tools, daily use
  const weekendGrinds = personalAutomationWorkflows.filter(
    (workflow) => workflow.label === "Small tool, daily use"
  );

  if (weekendGrinds.length === 0) {
    return null;
  }

  return (
    <section className="py-20">
      <FadeInView>
        <SectionHeader
          title="Weekend Grind"
          subtitle="Small tools, daily use"
          description="These are tiny utilities I built to smooth out repetitive tasks—each one deliberately small enough to stay useful."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {weekendGrinds.map((workflow) => (
            <div
              key={workflow.title}
              className="bg-card hover:bg-card/90 transition-colors duration-200 rounded-xl p-6 border border-border"
            >
              <h3 className="font-semibold mb-2">{workflow.title}</h3>
              <p className="text-muted mb-4">{workflow.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {workflow.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 text-xs font-medium bg-muted/20 rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <p className="text-sm text-muted">{workflow.detail}</p>
            </div>
          ))}
        </div>
      </FadeInView>
    </section>
  );
}
