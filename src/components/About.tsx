"use client";

import { FadeInView } from "@/components/FadeInView";
import { about, howIWork } from "@/lib/data";

export default function About() {
  return (
    <section
      id="about"
      className="border-y border-[var(--journal-rule)] bg-[var(--journal-leather-deep)] px-3 py-20 sm:px-6"
    >
      <div className="journal-page-stack journal-page-wear relative mx-auto grid w-full max-w-7xl overflow-hidden rounded-lg bg-[var(--journal-paper)] lg:grid-cols-2">
        <div className="journal-grid relative border-b border-[var(--journal-rule-strong)] p-7 sm:p-10 lg:min-h-[680px] lg:border-b-0 lg:border-r">
          <FadeInView delay={0} yOffset={16} duration={0.65} blur={10}>
            <p className="journal-kicker">About / field note</p>
            <h2 className="mt-5 max-w-xl font-journal-serif text-4xl font-semibold leading-[1.05] sm:text-6xl">
              {about.title}
            </h2>
          </FadeInView>

          <FadeInView delay={0.12} yOffset={18} duration={0.7} blur={8} className="mt-12 max-w-xl border-l-4 border-[var(--journal-verification)] pl-5 sm:pl-7">
            <p className="journal-kicker text-[var(--journal-verification)]">Human touch</p>
            <p className="mt-4 font-journal-serif text-xl font-semibold leading-8 sm:text-2xl sm:leading-9">
              I care about the awkward middle: incidents, handoffs, localhost experiments, and the tradeoffs between a clever idea and a useful system.
            </p>
          </FadeInView>

          <FadeInView delay={0.2} yOffset={14} duration={0.65} blur={7} className="mt-10 border-t-4 border-[var(--journal-brass)] bg-[var(--journal-leather)] p-6 text-[#fffaf0]">
            <p className="font-journal-mono text-xs font-bold uppercase tracking-[0.14em] text-[#e6b350]">Field method</p>
            <h3 className="mt-3 font-journal-serif text-2xl font-semibold">{howIWork.title}</h3>
            <p className="mt-3 text-base leading-7 text-[#f7ead0]">{howIWork.content}</p>
          </FadeInView>

          <FadeInView delay={0.28} yOffset={14} duration={0.65} blur={7} className="mt-6 flex justify-center">
            <div className="relative w-full max-w-sm rotate-[-1deg] border border-[#c39b3c] bg-[#f2cf6f] px-6 pb-5 pt-7 text-center text-[#2b2118] shadow-[4px_6px_0_rgba(43,33,24,0.16)]">
              <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rotate-[1deg] border border-[#c39b3c] bg-[#fff0a8] px-4 py-1 font-journal-mono text-[10px] font-bold uppercase tracking-[0.16em] shadow-sm">
                Availability
              </span>
              <p className="font-journal-serif text-xl font-bold">Australia-based</p>
              <p className="mt-1 text-sm font-semibold">Open to remote work anywhere in the world.</p>
            </div>
          </FadeInView>
        </div>

        <div className="relative p-7 sm:p-10 lg:min-h-[680px]">
          <p className="journal-kicker">Working record / selected notes</p>
          <div className="mt-7 divide-y divide-[var(--journal-rule)] border-y border-[var(--journal-rule)]">
            {about.content.split('\n\n').map((paragraph, index) => (
              <FadeInView key={paragraph} delay={0.08 + index * 0.07} yOffset={12} duration={0.6} blur={8} className="grid gap-3 py-5 sm:grid-cols-[2.5rem_1fr]">
                <span className="font-journal-mono text-xs font-bold text-[var(--journal-verification)]">{String(index + 1).padStart(2, "0")}</span>
                <p className="text-base leading-7 text-[var(--journal-ink-muted)] sm:text-lg sm:leading-8">{paragraph}</p>
              </FadeInView>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
