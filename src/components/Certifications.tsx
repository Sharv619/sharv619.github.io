"use client";

import { certifications, sortCertifications } from "@/lib/certifications";

export default function Certifications() {
  const sortedCertifications = sortCertifications(certifications);

  if (sortedCertifications.length === 0) {
    return null;
  }

  return (
    <section id="certifications" className="flex items-center bg-white py-20 dark:bg-[#151513]">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-[0.58fr_1.42fr] lg:px-8">
        <div className="lg:self-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-rose-700 dark:text-rose-300">
            Credentials
          </p>
          <h2 className="text-balance text-4xl font-black leading-tight text-stone-950 sm:text-5xl dark:text-white">
            Signals that back the stack.
          </h2>
          <p className="mt-5 text-lg leading-8 text-stone-700 dark:text-stone-300">
            Useful where they add context, secondary to shipped work and public repositories.
          </p>
        </div>

        <div className="grid max-h-[68svh] grid-cols-1 gap-4 overflow-y-auto pr-1 md:grid-cols-2">
          {sortedCertifications.map((certification) => (
            <article
              key={`${certification.issuer}-${certification.title}-${certification.issuedAt}`}
              className="rounded-lg border border-stone-300 bg-[#f7f4ed] p-5 shadow-sm dark:border-white/10 dark:bg-white/5"
            >
              <div className="flex flex-col gap-2">
                <div>
                  <h3 className="text-xl font-black text-stone-950 dark:text-white">
                    {certification.title}
                  </h3>
                  <p className="font-semibold text-stone-700 dark:text-stone-300">
                    {certification.issuer}
                  </p>
                </div>
                <time className="text-sm font-bold text-stone-500 dark:text-stone-400" dateTime={certification.issuedAt}>
                  {formatIssuedDate(certification.issuedAt)}
                </time>
              </div>

              {certification.skills && certification.skills.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {certification.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-md bg-white px-3 py-1 text-sm font-bold text-rose-800 dark:bg-white/10 dark:text-rose-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}

              {certification.credentialUrl && (
                <a
                  href={certification.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex font-bold text-rose-700 transition-colors duration-300 hover:text-rose-900 dark:text-rose-300 dark:hover:text-rose-200"
                >
                  View Credential
                </a>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function formatIssuedDate(date: string): string {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}
