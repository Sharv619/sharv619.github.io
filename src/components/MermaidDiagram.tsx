"use client";

import { useEffect, useId, useState } from "react";

interface MermaidDiagramProps {
  source: string;
  title: string;
  sourceUrl: string;
}

export default function MermaidDiagram({ source, title, sourceUrl }: MermaidDiagramProps) {
  const reactId = useId();
  const [svg, setSvg] = useState("");
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let active = true;

    async function renderDiagram(): Promise<void> {
      try {
        const { default: mermaid } = await import("mermaid");
        mermaid.initialize({
          startOnLoad: false,
          securityLevel: "strict",
          theme: document.documentElement.classList.contains("dark") ? "dark" : "neutral",
          fontFamily: "var(--font-plex-sans)",
        });
        const id = `mermaid-${reactId.replace(/[^a-z0-9]/gi, "")}`;
        const result = await mermaid.render(id, source);
        if (active) {
          setSvg(result.svg);
          setFailed(false);
        }
      } catch {
        if (active) {
          setFailed(true);
        }
      }
    }

    renderDiagram();
    return () => {
      active = false;
    };
  }, [reactId, source]);

  if (failed) {
    return (
      <a href={sourceUrl} target="_blank" rel="noopener noreferrer" className="journal-card block p-4 text-sm underline">
        Open {title} on GitHub
      </a>
    );
  }

  return (
    <figure className="journal-card overflow-x-auto p-4">
      <figcaption className="mb-4 font-journal-mono text-xs uppercase tracking-[0.14em] text-[var(--journal-muted)]">
        {title}
      </figcaption>
      {svg ? (
        <div className="min-w-[520px]" dangerouslySetInnerHTML={{ __html: svg }} />
      ) : (
        <div className="h-56 animate-pulse rounded-md bg-[var(--journal-rule)]/40" aria-label={`Rendering ${title}`} />
      )}
    </figure>
  );
}
