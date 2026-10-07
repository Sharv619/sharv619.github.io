"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface Source {
  id: string;
  section: string;
  similarity?: number;
  url?: string;
  title?: string;
}

interface SourceCardProps {
  sources: Source[];
}

export default function SourceCard({ sources }: SourceCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  if (sources.length === 0) return null;

  const visibleSources = isExpanded ? sources : sources.slice(0, 3);

  return (
    <div className="mt-4 border-t border-[var(--journal-rule)] pt-3">
      <div className="mb-3 flex items-center justify-between gap-3">
        <span className="font-journal-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--journal-muted)]">Evidence ledger</span>
        {sources.length > 3 && (
          <button onClick={() => setIsExpanded((value) => !value)} className="font-journal-mono text-[10px] font-semibold underline">
            {isExpanded ? "Show less" : `Show all ${sources.length}`}
          </button>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {visibleSources.map((source, index) => {
          const content = (
            <>
              <span className="grid h-5 w-5 place-items-center rounded-full bg-[var(--journal-red)] text-[9px] text-white">✓</span>
              <span className="max-w-44 truncate">{source.title || source.section}</span>
              {source.similarity && source.similarity > 0 && source.similarity <= 1 ? <span className="opacity-60">{Math.round(source.similarity * 100)}%</span> : null}
            </>
          );
          const className = "inline-flex min-h-9 -rotate-1 items-center gap-2 rounded-md border border-[#c49a29] bg-[#f5d66f] px-3 py-2 font-journal-mono text-[10px] font-semibold text-[#2b2118] shadow-sm transition hover:-translate-y-0.5 hover:rotate-0 dark:bg-[#f5deb3]";
          return source.url ? (
            <motion.a key={`${source.id}-${index}`} href={source.url} target="_blank" rel="noopener noreferrer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={className}>{content}<span aria-hidden="true">↗</span></motion.a>
          ) : (
            <motion.span key={`${source.id}-${index}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={className}>{content}</motion.span>
          );
        })}
      </div>
    </div>
  );
}
