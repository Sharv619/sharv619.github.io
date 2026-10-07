import { describe, expect, it } from "vitest";

import {
  extractMermaidDiagrams,
  extractLinkedArchitecturePaths,
  parsePortfolioEvidenceManifest,
  titleFromRepositoryPath,
} from "../../src/lib/repository-evidence";

describe("repository evidence manifest", () => {
  it("accepts exact repository files, commits, and architecture paths", () => {
    const manifest = parsePortfolioEvidenceManifest(JSON.stringify({
      version: 1,
      claims: [{
        id: "static-ingestion",
        label: "Static GitHub ingestion",
        evidence: [
          { type: "file", path: "scripts/sync.ts" },
          { type: "commit", sha: "abc1234" },
        ],
      }],
      architecture: [{ path: "docs/ARCHITECTURE.md", title: "System map" }],
    }));

    expect(manifest?.claims[0].evidence).toHaveLength(2);
    expect(manifest?.architecture[0].path).toBe("docs/ARCHITECTURE.md");
  });

  it("rejects paths that escape the repository", () => {
    const manifest = parsePortfolioEvidenceManifest(JSON.stringify({
      version: 1,
      claims: [{
        id: "unsafe",
        label: "Unsafe path",
        evidence: [{ type: "file", path: "../secret.txt" }],
      }],
      architecture: [],
    }));

    expect(manifest).toBeNull();
  });

  it("extracts supported Mermaid diagrams and ignores unsupported blocks", () => {
    const diagrams = extractMermaidDiagrams([
      "```mermaid",
      "flowchart LR",
      "  GitHub --> Portfolio",
      "```",
      "```mermaid",
      "unknownDiagram A",
      "```",
    ].join("\n"), "docs/ARCHITECTURE.md");

    expect(diagrams).toHaveLength(1);
    expect(diagrams[0].source).toContain("GitHub --> Portfolio");
    expect(titleFromRepositoryPath("docs/system-architecture.md")).toBe("System Architecture");
  });

  it("discovers architecture documents linked from a repository README", () => {
    const paths = extractLinkedArchitecturePaths([
      "- [Architecture](docs/NUDGEAI_ARCHITECTURE.md)",
      "- [System design](./docs/system-design.mdx#overview)",
      "- [Roadmap](docs/ROADMAP.md)",
      "- [Unsafe](../private/ARCHITECTURE.md)",
    ].join("\n"));

    expect(paths).toEqual([
      "docs/NUDGEAI_ARCHITECTURE.md",
      "docs/system-design.mdx",
    ]);
  });
});
