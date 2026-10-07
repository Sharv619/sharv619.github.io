import { describe, expect, it } from "vitest";

import {
  getRepoRagQueryIntent,
  getRepoRagRepositoryCount,
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

  it("returns the repository catalogue for generic project discovery questions", () => {
    const matches = searchRepoRagIndex("What projects have you built?");

    expect(getRepoRagQueryIntent("What projects have you built?")).toBe("catalog");
    expect(matches.length).toBeGreaterThan(0);
    expect(matches.every((match) => match.document.evidenceType === "metadata")).toBe(true);
    expect(getRepoRagConfidence(matches)).toBe("medium");
  });

  it("sorts recently updated repositories for latest-project questions", () => {
    const matches = searchRepoRagIndex("What are your latest projects?");
    const timestamps = matches.map((match) => Date.parse(match.document.updatedAt || ""));

    expect(getRepoRagQueryIntent("What are your latest projects?")).toBe("recent");
    expect(timestamps).toEqual([...timestamps].sort((left, right) => right - left));
  });

  it("derives the repository count from generated project evidence", () => {
    expect(getRepoRagQueryIntent("How many repositories do you have?")).toBe("count");
    expect(getRepoRagRepositoryCount()).toBeGreaterThan(0);
  });

  it("keeps technology-filter questions in semantic search", () => {
    expect(getRepoRagQueryIntent("Which repositories use Scikit-learn?")).toBe("search");
  });

  it("returns no results when a query has no indexed terms", () => {
    const matches = searchRepoRagIndex("zyxwv quuxplugh");

    expect(matches).toHaveLength(0);
    expect(getRepoRagConfidence(matches)).toBe("low");
  });
});
