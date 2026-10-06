"use client";

import { FadeInView } from "@/components/FadeInView";
import { SectionHeader } from "@/components/SectionHeader";
import { about, howIWork } from "@/lib/data";

export default function About() {
  return (
    <section
      id="about"
      className="journal-page border-y border-[var(--journal-rule)] py-20 dark:bg-[#151513]"
    >
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-[0.72fr_1.28fr] lg:px-8">
        <FadeInView delay={0} yOffset={20} duration={0.6} className="lg:self-center">
          <SectionHeader
            title="About"
            subtitle={about.title}
            description={
              <div className="border-l-2 border-rose-500 pl-5 lg:block hidden">
                <p className="journal-kicker text-[var(--journal-verification)]">
                  Human touch
                </p>
                <p className="mt-3 font-journal-serif text-lg font-semibold leading-7 text-[var(--journal-ink)]">
                  I care about the awkward middle: incidents, handoffs, localhost experiments, and the tradeoffs between a clever idea and a useful system.
                </p>
              </div>
            }
          />
        </FadeInView>

        <FadeInView delay={0.2} yOffset={20} duration={0.6} className="grid gap-5 lg:grid-cols-2">
          {about.content.split('\n\n').map((paragraph, index) => (
            <p key={index} className="journal-card rounded-md border-l-4 border-l-[var(--journal-verification)] p-5 text-lg leading-8 text-[var(--journal-ink-muted)]">
              {paragraph}
            </p>
          ))}

          <div className="border-l-4 border-[var(--journal-brass)] bg-[var(--journal-leather)] p-6 text-[#fffaf0] lg:col-span-2">
            <h3 className="mb-3 font-journal-serif text-2xl font-semibold">
              {howIWork.title}
            </h3>
            <p className="text-lg leading-8 text-[#f7ead0]">
              {howIWork.content}
            </p>
          </div>
        </FadeInView>
      </div>
    </section>
  );
}
