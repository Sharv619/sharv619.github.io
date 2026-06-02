import Navigation from "@/components/Navigation";

const RESUME_PDF_PATH = "/himanshu_lade_resume_v3.pdf";

export const metadata = {
  title: "Himanshu Lade - Resume PDF",
  description: "PDF resume for Himanshu Lade, Software Engineer focused on backend systems, production reliability, cloud deployment, and AI-assisted workflow automation.",
  keywords: ["resume", "CV", "Himanshu Lade", "Software Engineer", "portfolio", "developer"],
};

export default function ResumePage() {
  return (
    <main className="min-h-screen bg-[#f7f4ed] text-stone-950 dark:bg-[#101010] dark:text-white">
      <Navigation />

      <section className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 pb-6 pt-24 sm:px-6 lg:px-8">
        <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.18em] text-teal-700 dark:text-teal-300">
              Resume
            </p>
            <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
              Himanshu Lade Resume
            </h1>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href={RESUME_PDF_PATH}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border border-stone-300 bg-white px-4 py-2 text-center text-sm font-bold text-stone-900 transition-colors hover:bg-stone-950 hover:text-white dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:bg-white dark:hover:text-stone-950"
            >
              Open PDF
            </a>
            <a
              href={RESUME_PDF_PATH}
              download
              className="rounded-md bg-teal-700 px-4 py-2 text-center text-sm font-bold text-white transition-colors hover:bg-teal-800 dark:bg-teal-300 dark:text-stone-950 dark:hover:bg-teal-200"
            >
              Download
            </a>
          </div>
        </div>

        <div className="min-h-[72vh] flex-1 overflow-hidden rounded-lg border border-stone-300 bg-white shadow-sm dark:border-white/10 dark:bg-white/5">
          <object
            data={`${RESUME_PDF_PATH}#view=FitH`}
            type="application/pdf"
            className="h-[78vh] w-full"
            aria-label="Himanshu Lade resume PDF"
          >
            <div className="flex h-[78vh] flex-col items-center justify-center gap-4 p-6 text-center">
              <p className="max-w-md text-stone-700 dark:text-stone-300">
                Your browser could not display the PDF inline.
              </p>
              <a
                href={RESUME_PDF_PATH}
                className="rounded-md bg-teal-700 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-teal-800 dark:bg-teal-300 dark:text-stone-950"
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
