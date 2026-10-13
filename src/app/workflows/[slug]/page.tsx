import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Contact from "@/components/Contact";
import Navigation from "@/components/Navigation";
import {
  getPersonalAutomationWorkflow,
  getPersonalWorkflowSlug,
  personalAutomationWorkflows,
} from "@/lib/personal-workflows";
import type { PersonalWorkflowCaseFile } from "@/lib/personal-workflows";
import { createPageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return personalAutomationWorkflows
    .filter((workflow) => !workflow.projectSlug)
    .map((workflow) => ({
      slug: getPersonalWorkflowSlug(workflow.title),
    }));
}

interface WorkflowPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: WorkflowPageProps): Promise<Metadata> {
  const { slug } = await params;
  const workflow = getPersonalAutomationWorkflow(slug);

  if (!workflow || workflow.projectSlug) {
    return {};
  }

  return createPageMetadata({
    title: `${workflow.title} - Himanshu Lade`,
    description: workflow.detail,
    path: `/workflows/${slug}/`,
  });
}

export default async function WorkflowPage({ params }: WorkflowPageProps) {
  const { slug } = await params;
  const workflow = getPersonalAutomationWorkflow(slug);

  if (!workflow || workflow.projectSlug) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[var(--journal-paper)] text-[var(--journal-ink)]">
      <Navigation />
      <article className="journal-page pt-28 pb-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/#workflows"
            className="font-journal-mono text-xs font-bold uppercase tracking-wider text-[var(--journal-verification)] hover:underline"
          >
            ← Weekend Build Sprints
          </Link>

          <header className="mt-8 border-b border-[var(--journal-rule-strong)] pb-10">
            <div className="flex flex-wrap items-center gap-3 font-journal-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--journal-ink-muted)]">
              <span>Field note</span>
              <span aria-hidden="true">·</span>
              <span className="text-[var(--journal-verification)]">{workflow.label}</span>
            </div>
            <h1 className="mt-4 max-w-4xl font-journal-serif text-5xl font-semibold leading-tight sm:text-7xl">
              {workflow.title}
            </h1>
            <p className="mt-6 max-w-3xl text-xl leading-9 text-[var(--journal-ink-muted)]">
              {workflow.detail}
            </p>
            {workflow.caseFile ? (
              <dl className="mt-8 grid gap-4 sm:grid-cols-3">
                <CaseFileMetric label="Main outcome" value={workflow.detail} />
                <CaseFileMetric label="Secondary signal" value={workflow.caseFile.secondarySignal} />
                <CaseFileMetric label="Evidence count" value={`${workflow.caseFile.proof.length} proof points`} />
              </dl>
            ) : null}
          </header>

          {workflow.caseFile ? (
            <WorkflowCaseFile
              caseFile={workflow.caseFile}
              description={workflow.description}
              technologies={workflow.technologies}
            />
          ) : (
            <div className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              <section className="journal-card p-6 sm:p-8">
                <p className="journal-kicker">Problem</p>
                <h2 className="mt-3 font-journal-serif text-3xl font-semibold">The repeated friction</h2>
                <p className="mt-5 text-lg leading-8 text-[var(--journal-ink-muted)]">
                  {workflow.description}
                </p>
              </section>

              <aside className="border-l-4 border-l-[var(--journal-brass)] bg-[var(--journal-paper-raised)] p-6 shadow-sm">
                <p className="journal-kicker">Technical readout</p>
                <h2 className="mt-3 font-journal-serif text-2xl font-semibold">Working parts</h2>
                <ul className="mt-6 divide-y divide-[var(--journal-rule)] border-y border-[var(--journal-rule)]">
                  {workflow.technologies.map((technology) => (
                    <li key={technology} className="py-3 font-journal-mono text-sm text-[var(--journal-ink-muted)]">
                      {technology}
                    </li>
                  ))}
                </ul>
              </aside>
            </div>
          )}
        </div>
      </article>
      <Contact />
    </main>
  );
}

function CaseFileMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-[var(--journal-rule-strong)] bg-[var(--journal-paper-raised)] p-4">
      <dt className="font-journal-mono text-[10px] font-bold uppercase tracking-wider text-[var(--journal-verification)]">
        {label}
      </dt>
      <dd className="mt-2 text-sm leading-6 text-[var(--journal-ink-muted)]">{value}</dd>
    </div>
  );
}

function WorkflowCaseFile({
  caseFile,
  description,
  technologies,
}: {
  caseFile: PersonalWorkflowCaseFile;
  description: string;
  technologies: string[];
}) {
  return (
    <div className="mt-10 space-y-8">
      <div className="grid gap-4 lg:grid-cols-3">
        <NarrativeCard index="01" title="Problem" body={description} />
        <NarrativeCard index="02" title="Solution" body={caseFile.solution} />
        <NarrativeCard index="03" title="Role" body={caseFile.role} />
      </div>

      <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
        <aside>
          <p className="journal-kicker">Technical readout</p>
          <h2 className="mt-3 font-journal-serif text-3xl font-semibold">
            What changed, what mattered, and what stayed bounded.
          </h2>
          <TechnologyReadout technologies={technologies} />
        </aside>

        <div className="space-y-5">
          <CaseFileList title="Impact" items={caseFile.impact} />
          <CaseFileList title="Technical Highlights" items={caseFile.technicalHighlights} />
          <CaseFileList title="Proof" items={caseFile.proof} />
          <CaseFileList title="Constraints" items={caseFile.constraints} />
          <CaseFileList title="Limitations" items={caseFile.limitations} />
          <CaseFileList title="Roadmap" items={caseFile.roadmap} />
        </div>
      </div>
    </div>
  );
}

function NarrativeCard({ index, title, body }: { index: string; title: string; body: string }) {
  return (
    <section className="journal-card p-6">
      <p className="font-journal-mono text-xs font-bold text-[var(--journal-verification)]">{index}</p>
      <h2 className="mt-3 font-journal-serif text-2xl font-semibold">{title}</h2>
      <p className="mt-4 text-sm leading-7 text-[var(--journal-ink-muted)]">{body}</p>
    </section>
  );
}

function TechnologyReadout({ technologies }: { technologies: string[] }) {
  return (
    <div className="mt-6 border-l-4 border-l-[var(--journal-brass)] bg-[var(--journal-paper-raised)] p-6 shadow-sm">
      <p className="journal-kicker">Working parts</p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {technologies.map((technology) => (
          <li key={technology} className="rounded-sm border border-[var(--journal-rule-strong)] px-3 py-2 font-journal-mono text-xs text-[var(--journal-ink-muted)]">
            {technology}
          </li>
        ))}
      </ul>
    </div>
  );
}

function CaseFileList({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="journal-card p-6">
      <h2 className="font-journal-serif text-2xl font-semibold">{title}</h2>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item} className="border-l-2 border-[var(--journal-rule-strong)] pl-4 text-sm leading-7 text-[var(--journal-ink-muted)]">
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
