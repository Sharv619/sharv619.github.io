import { experience } from "@/lib/data";

export default function Experience() {
  return (
    <section id="experience" className="border-y border-[var(--journal-rule-strong)] bg-[var(--journal-leather-deep)] px-3 py-20 sm:px-6" aria-labelledby="experience-heading">
      <div className="journal-page-stack journal-page-wear relative mx-auto w-full max-w-7xl overflow-hidden rounded-lg bg-[var(--journal-paper)]">
        <div className="journal-grid border-b border-[var(--journal-rule-strong)] p-7 sm:p-10">
          <div className="grid gap-6 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
            <div>
              <p className="journal-kicker mb-3">Career ledger / verified work</p>
              <h2 id="experience-heading" className="font-journal-serif text-balance text-4xl font-semibold leading-tight text-[var(--journal-ink)] sm:text-6xl">
                Where the proof came from.
              </h2>
            </div>
            <p className="border-l-2 border-[var(--journal-verification)] pl-5 text-lg leading-8 text-[var(--journal-ink-muted)]">
              The story is not just titles. It is recovery, performance, public-facing audits, access boundaries, and delivery under constraints.
            </p>
          </div>
        </div>

        <div className="relative p-6 sm:p-10">
          <div className="absolute bottom-10 left-[3.25rem] top-10 hidden border-l-2 border-dashed border-[var(--journal-rule-strong)] md:block" aria-hidden="true" />
          <div className="relative space-y-6">
            {experience.map((exp, index) => (
              <article key={`${exp.company}-${exp.position}`} className="journal-card relative rounded-md border-l-4 border-l-[var(--journal-verification)] p-5 sm:p-7 md:ml-8">
                <span className="absolute -left-[2.85rem] top-7 hidden h-4 w-4 rounded-full border-2 border-[var(--journal-verification)] bg-[var(--journal-paper)] ring-4 ring-[var(--journal-paper)] md:block" aria-hidden="true" />
                <div className="flex flex-col gap-4 border-b border-[var(--journal-rule)] pb-5 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="font-journal-mono text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--journal-verification)]">Career entry {String(index + 1).padStart(2, "0")}</p>
                    <h3 className="mt-2 font-journal-serif text-2xl font-semibold text-[var(--journal-ink)]">{exp.position}</h3>
                    <a href={exp.link} target="_blank" rel="noopener noreferrer" aria-label={`Open ${exp.company} website`} className="mt-1 inline-flex min-h-11 items-center font-bold text-[var(--journal-verification)] underline underline-offset-4">
                      {exp.company}
                    </a>
                  </div>
                  <span className="self-start rounded-sm border border-[var(--journal-rule-strong)] bg-[var(--journal-paper)] px-3 py-2 font-journal-mono text-xs font-bold text-[var(--journal-ink-muted)]">{exp.duration}</span>
                </div>
                <div className="mt-5 grid gap-4 text-[var(--journal-ink-muted)] lg:grid-cols-3">
                  {exp.description.split('\n\n').map((item) => (
                    <p key={item} className="border-l-2 border-[var(--journal-rule-strong)] pl-4 text-sm leading-6">{item}</p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
