import { careerPositioning } from "@/lib/career-positioning";
import { personalInfo } from "@/lib/data";

const CAPABILITIES = [
  ["⚙", "Systems"],
  ["◉", "Data & AI"],
  ["◇", "Full-stack"],
  ["↗", "Delivery"],
] as const;

export default function Hero() {
  return (
    <section id="home" className="journal-shell px-0 pb-14 pt-20 sm:px-4 lg:px-8">
      <div className="journal-leather-frame relative mx-auto max-w-[1500px] rounded-none sm:rounded-[22px]">
        <div className="journal-page-stack relative grid overflow-visible rounded-none sm:rounded-xl lg:grid-cols-[minmax(0,1fr)_28px_minmax(0,1fr)]">
          <article className="journal-page journal-page-wear relative flex min-h-[700px] flex-col justify-between overflow-hidden border-b border-[var(--journal-rule-strong)] px-6 py-9 sm:px-10 lg:border-b-0 lg:border-r lg:px-14 lg:py-12">
            <div className="absolute bottom-0 left-9 top-0 w-px bg-[var(--journal-verification)] opacity-25" />
            <div className="relative z-10">
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[var(--journal-rule)] pb-4">
                <p className="journal-kicker">Technical field journal</p>
                <div className="text-right font-journal-mono text-[10px] uppercase tracking-[0.12em] text-[var(--journal-ink-muted)]">
                  <p>Australia · Remote worldwide</p>
                  <p>33.8688° S, 151.2093° E</p>
                </div>
              </div>

              <div className="pt-9">
                <p className="font-journal-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--journal-verification)]">Identity / field record 001</p>
                <h1 className="mt-4 font-journal-serif text-5xl font-semibold leading-[0.92] tracking-tight text-[var(--journal-ink)] sm:text-7xl lg:text-[5.25rem]">{personalInfo.name}</h1>
                <p className="mt-4 font-journal-serif text-2xl font-medium leading-tight text-[var(--journal-ink)] sm:text-3xl">Full-Stack Systems &amp; AI Engineer</p>
                <p className="mt-4 flex items-center gap-2 text-base font-medium text-[var(--journal-ink-muted)]"><span className="text-[var(--journal-verification)]">●</span> Australia-based · Remote worldwide</p>
                <h2 className="journal-red-underline mt-10 font-journal-serif text-3xl font-semibold tracking-tight text-[var(--journal-ink)] sm:text-4xl">Public proof. Practical systems.</h2>
                <p className="mt-8 max-w-xl text-base leading-8 text-[var(--journal-ink-muted)] sm:text-lg">{careerPositioning.subheadline}</p>
              </div>
            </div>

            <div className="relative z-10 mt-10">
              <div className="flex flex-col gap-3 sm:flex-row">
                <a href="#case-studies" className="inline-flex min-h-12 items-center justify-center gap-3 rounded-md bg-[var(--journal-leather)] px-6 font-journal-serif text-lg font-semibold text-[#fffaf0] shadow-md transition-transform hover:-translate-y-0.5"><span aria-hidden="true">▣</span> View field notes <span aria-hidden="true">→</span></a>
                <a href="/resume" className="inline-flex min-h-12 items-center justify-center gap-3 rounded-md border border-[var(--journal-rule-strong)] bg-[var(--journal-paper-raised)] px-6 font-semibold text-[var(--journal-ink)]"><span aria-hidden="true">▤</span> Open resume</a>
              </div>
              <div className="mt-8 grid grid-cols-2 gap-3 border-t border-[var(--journal-rule)] pt-5 sm:grid-cols-4">
                {CAPABILITIES.map(([icon, label]) => <span key={label} className="flex items-center gap-2 font-journal-mono text-xs font-medium text-[var(--journal-ink-muted)]"><span aria-hidden="true">{icon}</span>{label}</span>)}
              </div>
            </div>
          </article>

          <div className="journal-gutter relative hidden flex-col items-center justify-around lg:flex" aria-hidden="true">
            {Array.from({ length: 7 }, (_, index) => <span key={index} className="journal-gutter-point" />)}
          </div>

          <article className="journal-grid journal-page-wear relative min-h-[700px] overflow-visible px-6 py-9 sm:px-10 lg:px-12 lg:py-12">
            <div className="relative z-10 flex h-full flex-col">
              <div className="flex flex-wrap items-start justify-between gap-3 border-b border-[var(--journal-rule)] pb-4">
                <div><p className="journal-kicker">System architecture / high level</p><h2 className="mt-2 font-journal-serif text-2xl font-semibold">Evidence-driven portfolio</h2></div>
                <p className="font-journal-mono text-[10px] uppercase tracking-[0.12em] text-[var(--journal-ink-muted)]">Build-time pipeline</p>
              </div>

              <div className="mt-8 grid flex-1 gap-5 md:grid-cols-[1fr_48px_1.1fr] md:items-center">
                <div className="space-y-4">
                  <SystemNode symbol="⌘" title="GitHub repositories" text="Metadata, READMEs, architecture documents and curated evidence." stacked />
                  <p className="journal-hand-note mx-auto max-w-[15rem] text-center text-sm leading-6 text-[var(--journal-ink-muted)]">Source material stays linked to its public repository.</p>
                </div>
                <div className="hidden items-center md:flex" aria-hidden="true"><span className="h-px flex-1 border-t-2 border-[var(--journal-ink)]" /><span className="text-2xl">→</span></div>
                <div className="space-y-5">
                  <div className="journal-card rounded-md p-5">
                    <div className="flex items-center justify-center gap-3"><span className="text-3xl" aria-hidden="true">⚙</span><h3 className="font-journal-serif text-xl font-semibold">Evidence ingestion</h3></div>
                    <ul className="mt-4 space-y-2 text-sm leading-5 text-[var(--journal-ink-muted)]"><li>• Fetch and normalize repository evidence</li><li>• Parse documentation and architecture</li><li>• Generate structured build-time data</li></ul>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-1 xl:grid-cols-2">
                    <SystemNode symbol="▤" title="Project pages" text="Static project notes generated from evidence." />
                    <SystemNode symbol="◉" title="Repo RAG" text="Browser-only search grounded in public docs." />
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col items-start justify-between gap-5 border-t border-[var(--journal-rule)] pt-5 sm:flex-row sm:items-center"><span className="journal-stamp inline-flex px-4 py-2 text-sm">Verified evidence</span><p className="journal-hand-note max-w-xs text-sm leading-6 text-[var(--journal-ink-muted)]">New public projects enter the pipeline on the next scheduled refresh.</p></div>
            </div>

            <div className="absolute -right-5 top-16 z-20 hidden flex-col gap-3 lg:flex">
              <EdgeTab label="Architecture" brass /><EdgeTab label="Source file" /><EdgeTab label="Verified context" />
            </div>
            <div className="mt-6 flex flex-wrap gap-2 lg:hidden"><EdgeTab label="Architecture" brass /><EdgeTab label="Source file" /><EdgeTab label="Verified context" /></div>
          </article>
        </div>
      </div>
    </section>
  );
}

interface SystemNodeProps {
  symbol: string;
  title: string;
  text: string;
  stacked?: boolean;
}

function SystemNode({ symbol, title, text, stacked = false }: SystemNodeProps) {
  return (
    <div className="journal-card relative rounded-md p-4 text-center">
      <span className="text-4xl" aria-hidden="true">{symbol}</span>
      <h3 className="mt-2 font-journal-serif text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-xs leading-5 text-[var(--journal-ink-muted)]">{text}</p>
      {stacked ? <><span className="absolute -bottom-1 -right-1 -z-10 h-full w-full rotate-1 border border-[var(--journal-rule-strong)]" /><span className="absolute -bottom-2 -right-2 -z-20 h-full w-full rotate-2 border border-[var(--journal-rule)]" /></> : null}
    </div>
  );
}

function EdgeTab({ label, brass = false }: { label: string; brass?: boolean }) {
  return <span className={`journal-edge-tab rounded-r-sm px-2 py-4 font-journal-mono text-[10px] font-semibold uppercase tracking-wider text-white ${brass ? "bg-[var(--journal-brass)]" : "bg-[var(--journal-verification)]"}`}>{label}</span>;
}
