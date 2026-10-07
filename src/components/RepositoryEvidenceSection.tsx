import EvidenceTab from "@/components/EvidenceTab";
import MermaidDiagram from "@/components/MermaidDiagram";
import type { Project } from "@/lib/data";

interface RepositoryEvidenceSectionProps {
  project: Project;
  heading?: string;
}

export default function RepositoryEvidenceSection({ project, heading = "Architecture from the repository" }: RepositoryEvidenceSectionProps) {
  const documents = project.architectureDocuments || [];
  const evidence = project.evidenceReferences || [];

  if (documents.length === 0 && evidence.length === 0) {
    return null;
  }

  return (
    <section className="journal-grid border-y border-[var(--journal-rule)] py-16" aria-labelledby="repository-evidence-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[300px_1fr]">
          <aside>
            <p className="journal-kicker">Repository evidence</p>
            <h2 id="repository-evidence-heading" className="mt-3 font-journal-serif text-4xl font-semibold">{heading}</h2>
            <p className="mt-4 leading-7 text-[var(--journal-muted)]">
              Architecture notes and diagrams are read from the repository at build time, keeping this case study tied to its source.
            </p>
            <div className="mt-6 flex flex-col items-start gap-3">
              {evidence.map((item) => (
                <EvidenceTab key={item.id} evidence={item} />
              ))}
            </div>
          </aside>

          <div className="space-y-8">
            {documents.map((document) => (
              <article key={document.path} className="journal-card p-5 sm:p-8">
                <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="journal-kicker">Architecture note</p>
                    <h3 className="mt-2 font-journal-serif text-3xl font-semibold">{document.title}</h3>
                  </div>
                  <a href={document.sourceUrl} target="_blank" rel="noopener noreferrer" className="font-journal-mono text-xs font-semibold underline underline-offset-4">
                    {document.path} ↗
                  </a>
                </div>
                {document.diagrams.length > 0 ? (
                  <div className="space-y-5">
                    {document.diagrams.map((diagram) => (
                      <MermaidDiagram
                        key={diagram.id}
                        source={diagram.source}
                        title={diagram.title}
                        sourceUrl={document.sourceUrl}
                      />
                    ))}
                  </div>
                ) : (
                  <p className="rounded-md border border-dashed border-[var(--journal-rule-strong)] p-4 text-sm leading-6 text-[var(--journal-muted)]">
                    This architecture document is available as evidence, but it does not contain a supported Mermaid diagram yet.
                  </p>
                )}
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
