import { describe, expect, it } from "vitest";

import { retrievePortfolioEvidence } from "@/lib/assistant/portfolio-rag";

describe("portfolio RAG evidence retrieval", () => {
  it("prioritizes verified evidence for career claims", () => {
    const result = retrievePortfolioEvidence("What did Himanshu do at Ask Jay?");

    expect(result.confidence).toBe("high");
    expect(result.evidence[0].authority).toBe("verified");
    expect(result.evidence[0].content).toContain("Ask Jay Services");
  });

  it("merges curated and repository evidence for a known project", () => {
    const result = retrievePortfolioEvidence("Explain Network Guardian AI and its Isolation Forest implementation");
    const authorities = new Set(result.evidence.map((item) => item.authority));

    expect(authorities.has("verified")).toBe(true);
    expect(authorities.has("repository")).toBe(true);
    expect(result.evidence.some((item) => item.repositorySlug === "network-guardian-ai")).toBe(true);
  });

  it("uses repository evidence for technology-specific questions", () => {
    const result = retrievePortfolioEvidence("Which repository uses Scikit-learn?");

    expect(result.repositoryConfidence).not.toBe("low");
    expect(result.evidence.some((item) => (
      item.authority === "repository" && item.repositorySlug === "network-guardian-ai"
    ))).toBe(true);
  });

  it("returns low confidence without evidence for unrelated terms", () => {
    const result = retrievePortfolioEvidence("zyxwv quuxplugh");

    expect(result.confidence).toBe("low");
    expect(result.evidence).toHaveLength(0);
  });

  it("respects the combined evidence limit", () => {
    const result = retrievePortfolioEvidence("TypeScript React Docker projects", 4);

    expect(result.evidence.length).toBeLessThanOrEqual(4);
  });
});
