import { careerPositioning } from "@/lib/career-positioning";
import { personalInfo } from "@/lib/data";

const PIPELINE_STEPS = [
  { label: "GitHub repositories", detail: "Metadata, READMEs, docs" },
  { label: "Evidence ingestion", detail: "Parse, normalize, index" },
  { label: "Portfolio + Repo RAG", detail: "Static pages, grounded answers" },
];

export default function Hero() {
  return (
    <section id="home" className="journal-shell px-3 pb-10 pt-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1500px] overflow-hidden rounded-[18px] border-[10px] border-[var(--journal-leather-deep)] bg-[var(--journal-leather-deep)] shadow-2xl">
        <div className="grid min-h-[720px] grid-cols-1 lg:grid-cols-[1fr_24px_1fr]">
          <div className="journal-page flex flex-col justify-between px-6 py-10 sm:px-10 lg:px-14 lg:py-14">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--journal-rule)] pb-4">
                <p className="journal-kicker">Technical field journal</p>
                <p className="font-journal-mono text-xs uppercase tracking-[0.14em] text-[var(--journal-ink-muted)]">
                  Sydney, Australia
                </p>
              </div>
              <div className="pt-10">
                <h1 className="font-journal-serif text-6xl font-semibold leading-[0.92] tracking-tight text-[var(--journal-ink)] sm:text-7xl lg:text-[5.5rem]">
                  {personalInfo.name}
                </h1>
                <p className="mt-5 font-journal-serif text-2xl font-medium text-[var(--journal-ink)] sm:text-3xl">
                  Full-Stack Systems &amp; AI Engineer
                </p>
                <div className="mt-5 h-1 w-20 -rotate-1 bg-[var(--journal-verification)]" />
                <h2 className="mt-8 font-journal-serif text-3xl font-semibold leading-tight text-[var(--journal-ink)] sm:text-4xl">
                  Public proof. Practical systems.
                </h2>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--journal-ink-muted)]">
                  {careerPositioning.subheadline}
                </p>
              </div>
            </div>

            <div className="mt-10">
              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href="#case-studies"
                  className="inline-flex items-center justify-center rounded-md bg-[var(--journal-leather)] px-6 py-4 font-journal-serif text-lg font-semibold text-[#fffaf0] shadow-md transition-transform hover:-translate-y-0.5"
                >
                  View field notes →
                </a>
                <a
                  href="/resume"
                  className="inline-flex items-center justify-center rounded-md border border-[var(--journal-rule-strong)] bg-[var(--journal-paper-raised)] px-6 py-4 font-semibold text-[var(--journal-ink)]"
                >
                  Open resume
                </a>
              </div>
              <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-3 border-t border-[var(--journal-rule)] pt-5 text-sm sm:grid-cols-4">
                {["Systems", "Data & AI", "Full-stack", "Delivery"].map((item) => (
                  <span key={item} className="font-journal-mono font-medium text-[var(--journal-ink-muted)]">
                    ○ {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="journal-binding hidden lg:block" aria-hidden="true" />

          <div className="journal-grid relative px-6 py-10 sm:px-10 lg:px-14 lg:py-14">
            <div className="flex items-center justify-between border-b border-[var(--journal-rule)] pb-4">
              <p className="journal-kicker">Evidence pipeline</p>
              <p className="journal-kicker">Build-time architecture</p>
            </div>

            <div className="mt-12 grid gap-6">
              {PIPELINE_STEPS.map((step, index) => (
                <div key={step.label} className="relative">
                  <div className="journal-card relative z-10 mx-auto max-w-md rounded-md p-6">
                    <p className="font-journal-mono text-xs font-bold text-[var(--journal-verification)]">
                      0{index + 1} / SOURCE PATH
                    </p>
                    <h3 className="mt-3 font-journal-serif text-2xl font-semibold text-[var(--journal-ink)]">
                      {step.label}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-[var(--journal-ink-muted)]">{step.detail}</p>
                  </div>
                  {index < PIPELINE_STEPS.length - 1 && (
                    <div className="mx-auto h-10 w-px border-l-2 border-dashed border-[var(--journal-ink-muted)]" aria-hidden="true" />
                  )}
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
              <span className="journal-stamp inline-flex px-4 py-2 text-sm">Repository grounded</span>
              <p className="max-w-xs -rotate-1 font-journal-serif text-sm italic leading-6 text-[var(--journal-ink-muted)]">
                New public projects enter this pipeline automatically on the next portfolio refresh.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
