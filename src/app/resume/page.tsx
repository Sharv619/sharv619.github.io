import Navigation from "@/components/Navigation";
import { createPageMetadata } from "@/lib/seo";

const RESUME_PDF_PATH = "/himanshu_lade_resume_v3.pdf";

export const metadata = createPageMetadata({
  title: "Himanshu Lade Resume | Full-Stack AI Engineer Sydney",
  description: "Resume for Australia-based full-stack systems and AI engineer Himanshu Lade, open to remote work worldwide and covering production recovery, automation, technical SEO, and software delivery.",
  path: "/resume/",
});

export default function ResumePage() {
  return (
    <main className="journal-shell min-h-screen">
      <Navigation />

      <section className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 pb-6 pt-24 sm:px-6 lg:px-8">
        <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="journal-kicker mb-2">
              Resume
            </p>
            <h1 className="font-journal-serif text-3xl font-semibold tracking-tight sm:text-4xl">
              Himanshu Lade Resume
            </h1>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href={RESUME_PDF_PATH}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border border-[var(--journal-rule)] bg-[var(--journal-surface)] px-4 py-2 text-center text-sm font-semibold transition hover:-translate-y-0.5"
            >
              Open PDF
            </a>
            <a
              href={RESUME_PDF_PATH}
              download
              className="rounded-md bg-[var(--journal-red)] px-4 py-2 text-center text-sm font-semibold text-white transition hover:-translate-y-0.5"
            >
              Download
            </a>
          </div>
        </div>

        <div className="journal-card min-h-[72vh] flex-1 overflow-hidden rounded-lg">
          <object
            data={`${RESUME_PDF_PATH}#view=FitH`}
            type="application/pdf"
            className="h-[78vh] w-full"
            aria-label="Himanshu Lade resume PDF"
          >
            <div className="flex h-[78vh] flex-col items-center justify-center gap-4 p-6 text-center">
              <p className="max-w-md text-[var(--journal-muted)]">
                Your browser could not display the PDF inline.
              </p>
              <a
                href={RESUME_PDF_PATH}
                className="rounded-md bg-[var(--journal-red)] px-4 py-2 text-sm font-semibold text-white"
              >
                Open resume PDF
              </a>
            </div>
          </object>
        </div>
      </section>
    </main>
  );
}
