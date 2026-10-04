import { describe, expect, it } from "vitest";

import {
  getRepoRagConfidence,
  searchRepoRagIndex,
  tokenizeRepoRagQuery,
} from "@/lib/assistant/repo-rag";

describe("repository RAG search", () => {
  it("ranks an exact repository name first", () => {
    const matches = searchRepoRagIndex("Explain Network Guardian AI");

    expect(matches[0].document.repositorySlug).toBe("network-guardian-ai");
    expect(getRepoRagConfidence(matches)).toBe("high");
  });

  it("finds repositories from README implementation evidence", () => {
    const matches = searchRepoRagIndex("Which project uses Isolation Forest and entropy analysis?");

    expect(matches[0].document.repositorySlug).toBe("network-guardian-ai");
    expect(matches[0].matchedTerms).toEqual(expect.arrayContaining(["isolation", "forest", "entropy"]));
  });

  it("boosts technology metadata matches", () => {
    const matches = searchRepoRagIndex("Which repositories use Scikit-learn?");

    expect(matches[0].document.repositorySlug).toBe("network-guardian-ai");
    expect(matches[0].score).toBeGreaterThan(4);
  });

  it("expands common technology aliases", () => {
    const tokens = tokenizeRepoRagQuery("TS and JS projects");

    expect(tokens).toEqual(expect.arrayContaining(["typescript", "javascript"]));
  });

  it("returns no results when a query has no indexed terms", () => {
    const matches = searchRepoRagIndex("zyxwv quuxplugh");

    expect(matches).toHaveLength(0);
    expect(getRepoRagConfidence(matches)).toBe("low");
  });
});
