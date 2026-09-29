"use client";

import { FadeInView } from "@/components/FadeInView";
import { SectionHeader } from "@/components/SectionHeader";
import { about, howIWork } from "@/lib/data";

export default function About() {
  return (
    <section
      id="about"
      className="border-y border-stone-200 bg-white py-20 dark:border-white/10 dark:bg-[#151513]"
    >
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-[0.72fr_1.28fr] lg:px-8">
        <FadeInView delay={0} yOffset={20} duration={0.6} className="lg:self-center">
          <SectionHeader
            title="About"
            subtitle={about.title}
            description={
              <div className="border-l-2 border-rose-500 pl-5 lg:block hidden">
                <p className="text-sm font-black uppercase tracking-[0.18em] text-rose-700 dark:text-rose-300">
                  Human touch
                </p>
                <p className="mt-3 text-lg font-semibold leading-7 text-stone-800 dark:text-stone-200">
                  I care about the awkward middle: incidents, handoffs, localhost experiments, and the tradeoffs between a clever idea and a useful system.
                </p>
              </div>
            }
          />
        </FadeInView>

        <FadeInView delay={0.2} yOffset={20} duration={0.6} className="grid gap-5 lg:grid-cols-2">
          {about.content.split('\n\n').map((paragraph, index) => (
            <p key={index} className="rounded-lg border border-stone-200 bg-[#f7f4ed] p-5 text-lg leading-8 text-stone-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-stone-300">
              {paragraph}
            </p>
          ))}

          <div className="border-l-4 border-teal-700 bg-stone-950 p-6 text-white lg:col-span-2 dark:border-teal-300 dark:bg-white/5">
            <h3 className="mb-3 text-2xl font-black text-white">
              {howIWork.title}
            </h3>
            <p className="text-lg leading-8 text-stone-100 dark:text-stone-300">
              {howIWork.content}
            </p>
          </div>
        </FadeInView>
      </div>
    </section>
  );
}
