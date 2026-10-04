import { describe, expect, it } from "vitest";

import { getPortfolioAnswer } from "@/lib/assistant/portfolio-answer";

describe("portfolio answer templates", () => {
  it("keeps simple factual questions concise", () => {
    const result = getPortfolioAnswer("What is Network Guardian AI?");

    expect(result.confidence).not.toBe("low");
    expect(result.response).toContain("Network Guardian");
    expect(result.response).not.toContain("### How it works");
    expect(result.sources.some((source) => source.url?.includes("network-guardian-ai"))).toBe(true);
  });

  it("lists repository matches for technology questions", () => {
    const result = getPortfolioAnswer("Which repositories use Scikit-learn?");

    expect(result.response).toContain("Network Guardian AI");
    expect(result.response).toContain("strongest repository match");
  });

  it("uses four sections only for detailed questions", () => {
    const result = getPortfolioAnswer("Explain in detail how the Network Guardian AI architecture uses Isolation Forest and entropy analysis.");

    expect(result.response).toContain("### Direct answer");
    expect(result.response).toContain("### How it works");
    expect(result.response).toContain("### Evidence");
    expect(result.response).toContain("### Limits");
  });

  it("returns exact repository source links", () => {
    const result = getPortfolioAnswer("Explain the Network Guardian AI architecture in detail");
    const repositorySource = result.sources.find((source) => (
      source.section === "GitHub Projects"
      && source.url?.includes("github.com/Sharv619/network-guardian-ai")
    ));

    expect(repositorySource).toBeDefined();
    expect(repositorySource?.section).toBe("GitHub Projects");
  });

  it("refuses unrelated questions without evidence", () => {
    const result = getPortfolioAnswer("zyxwv quuxplugh");

    expect(result.confidence).toBe("low");
    expect(result.sources).toHaveLength(0);
    expect(result.response).toContain("couldn't find enough verified");
  });
});
