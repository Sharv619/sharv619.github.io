import Link from "next/link";

import Contact from "@/components/Contact";
import Navigation from "@/components/Navigation";
import RepositoryEvidenceSection from "@/components/RepositoryEvidenceSection";
import { slugify, type Project } from "@/lib/data";
import { parseArchitectureDetails } from "@/lib/project-journal";

interface RepositoryCaseStudyClientProps {
  project: Project;
}

export default function RepositoryCaseStudyClient({ project }: RepositoryCaseStudyClientProps) {
  const projectSlug = project.slug || slugify(project.title);
  const journal = parseArchitectureDetails(project.architectureDetails);
  const architectureCount = project.architectureDocuments?.length || 0;
  const diagramCount = project.architectureDocuments?.reduce((count, document) => count + document.diagrams.length, 0) || 0;
  const evidenceCount = project.evidenceReferences?.length || 0;

  return (
    <div className="journal-shell min-h-screen">
      <Navigation />

      <header className="journal-grid border-b border-[var(--journal-rule)] px-4 pb-16 pt-32 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_360px] lg:items-end">
          <div>
            <div className="mb-5 flex flex-wrap items-center gap-3">
              <span className="journal-kicker">Generated repository case study</span>
              <span className="journal-stamp px-3 py-1 text-[10px]">Source linked</span>
            </div>
            <h1 className="max-w-4xl font-journal-serif text-5xl font-semibold leading-[0.98] sm:text-7xl">{project.title}</h1>
            <p className="mt-6 max-w-3xl text-xl leading-8 text-[var(--journal-muted)]">
              {project.portfolioSummary || project.description}
            </p>
          </div>

          <aside className="journal-card p-5" aria-label="Repository case study summary">
            <p className="journal-kicker">Evidence readout</p>
            <dl className="mt-5 grid grid-cols-3 gap-3 text-center">
              <EvidenceCount label="Docs" value={architectureCount} />
              <EvidenceCount label="Diagrams" value={diagramCount} />
              <EvidenceCount label="Sources" value={evidenceCount} />
            </dl>
          </aside>
        </div>
      </header>

      <nav className="journal-page border-b border-[var(--journal-rule)] py-5" aria-label="Case study actions">
        <div className="mx-auto flex max-w-7xl flex-wrap gap-3 px-4 sm:px-6 lg:px-8">
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="rounded-md bg-[var(--journal-leather)] px-5 py-3 text-sm font-bold text-white dark:bg-[var(--journal-brass)] dark:text-[#1a1a1a]">
            Open repository
          </a>
          <Link href={`/projects/${projectSlug}`} className="rounded-md border border-[var(--journal-rule-strong)] px-5 py-3 text-sm font-bold">
            Project field note
          </Link>
          <Link href="/projects" className="rounded-md border border-[var(--journal-rule-strong)] px-5 py-3 text-sm font-bold">
            All projects
          </Link>
        </div>
      </nav>

      <main className="journal-page py-18">
        <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[300px_1fr] lg:px-8" aria-labelledby="build-record-heading">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <p className="journal-kicker">Build record</p>
            <h2 id="build-record-heading" className="mt-3 font-journal-serif text-4xl font-semibold">What the repository establishes.</h2>
            <p className="mt-5 text-base leading-7 text-[var(--journal-muted)]">{journal.overview || project.description}</p>
            <div className="mt-7 flex flex-wrap gap-2">
              {project.technologies.map((technology) => (
                <span key={technology} className="rounded border border-[var(--journal-rule)] px-2 py-1 font-journal-mono text-xs">{technology}</span>
              ))}
            </div>
          </aside>

          <ol className="overflow-hidden rounded-lg border border-[var(--journal-rule-strong)] bg-[var(--journal-paper-raised)]">
            {journal.details.map((section, index) => (
              <li key={`${section.title}-${index}`} className="grid gap-4 border-b border-[var(--journal-rule)] p-6 last:border-b-0 md:grid-cols-[3rem_12rem_1fr]">
                <span className="font-journal-mono text-sm font-bold text-[var(--journal-verification)]">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="font-journal-serif text-xl font-semibold">{section.title}</h3>
                <ul className="space-y-3">
                  {section.lines.map((line) => (
                    <li key={line} className="grid grid-cols-[0.75rem_1fr] gap-3 text-sm leading-6 text-[var(--journal-muted)]">
                      <span className="text-[var(--journal-verification)]" aria-hidden="true">•</span>
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </section>

        <RepositoryEvidenceSection project={project} />

        {architectureCount === 0 && evidenceCount === 0 ? (
          <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8" aria-labelledby="documentation-gap-heading">
            <div className="rounded-lg border border-dashed border-[var(--journal-rule-strong)] bg-[var(--journal-paper-raised)] p-6 sm:p-8">
              <p className="journal-kicker">Documentation gap</p>
              <h2 id="documentation-gap-heading" className="mt-3 font-journal-serif text-3xl font-semibold">No architecture evidence published yet.</h2>
              <p className="mt-4 max-w-3xl leading-7 text-[var(--journal-muted)]">
                Add a Mermaid diagram to a linked architecture document in the repository docs folder, or declare the file in portfolio-evidence.json. The next portfolio refresh will attach it here automatically.
              </p>
            </div>
          </section>
        ) : null}
      </main>

      <Contact />
    </div>
  );
}

function EvidenceCount({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-md border border-[var(--journal-rule)] p-3">
      <dt className="font-journal-mono text-[10px] uppercase tracking-[0.12em] text-[var(--journal-muted)]">{label}</dt>
      <dd className="mt-2 font-journal-serif text-2xl font-bold">{value}</dd>
    </div>
  );
}
