"use client";

import { certifications, sortCertifications } from "@/lib/certifications";

export default function Certifications() {
  const sortedCertifications = sortCertifications(certifications);

  if (sortedCertifications.length === 0) {
    return null;
  }

  return (
    <section id="certifications" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Certifications
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sortedCertifications.map((certification) => (
            <article
              key={`${certification.issuer}-${certification.title}-${certification.issuedAt}`}
              className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 shadow-lg"
            >
              <div className="flex flex-col gap-2">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {certification.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {certification.issuer}
                  </p>
                </div>
                <time className="text-sm text-gray-500 dark:text-gray-400" dateTime={certification.issuedAt}>
                  {formatIssuedDate(certification.issuedAt)}
                </time>
              </div>

              {certification.skills && certification.skills.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {certification.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full"
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
                  className="inline-flex mt-5 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors duration-300"
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
