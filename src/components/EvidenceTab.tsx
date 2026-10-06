import type { RepositoryEvidenceReference } from "@/lib/repository-evidence";

interface EvidenceTabProps {
  evidence: RepositoryEvidenceReference;
}

export default function EvidenceTab({ evidence }: EvidenceTabProps) {
  return (
    <a
      href={evidence.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex min-h-11 max-w-full -rotate-1 items-center gap-3 rounded-md border border-[#c49a29] bg-[#f5d66f] px-4 py-3 font-journal-mono text-xs font-semibold text-[#2b2118] shadow-[0_3px_7px_rgba(43,33,24,0.16)] transition duration-200 hover:-translate-y-0.5 hover:rotate-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--journal-red)] dark:border-[#9d7822] dark:bg-[#f5deb3]"
    >
      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[var(--journal-red)] text-[10px] font-bold text-white">
        ✓
      </span>
      <span className="min-w-0">
        <span className="block truncate">{evidence.label}</span>
        <span className="mt-0.5 block truncate text-[10px] font-normal opacity-70">
          {evidence.kind === "commit" ? evidence.sha : evidence.path}
        </span>
      </span>
      <span aria-hidden="true" className="ml-auto transition-transform group-hover:translate-x-0.5">↗</span>
    </a>
  );
}
