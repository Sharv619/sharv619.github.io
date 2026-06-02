import { describe, expect, it } from "vitest";

import {
  getSyntheticRagResponse,
  searchSyntheticRagIndex,
  validateSyntheticRagInput,
} from "@/lib/assistant/synthetic-rag";

describe("Synthetic RAG", () => {
  it("answers a known project question", () => {
    const result = getSyntheticRagResponse("What is codeflow-hook?");

    expect(result.confidence).toBe("high");
    expect(result.response).toContain("codeflow-hook");
    expect(result.response).toContain("code review CLI");
    expect(result.sources.some((source) => source.id === "codeflow-hook")).toBe(true);
  });

  it("answers Network Guardian case study questions with prototype-safe language", () => {
    const result = getSyntheticRagResponse("What ML techniques did Himanshu use in Network Guardian?");

    expect(result.confidence).toBe("high");
    expect(result.response).toContain("Isolation Forest");
    expect(result.response).toContain("prototype");
    expect(result.sources.some((source) => source.id === "case-study-network-guardian-ai")).toBe(true);
  });

  it("answers BackPocket Offline case study questions", () => {
    const result = getSyntheticRagResponse("Has Himanshu built local-first AI tools?");

    expect(result.confidence).toBe("high");
    expect(result.response).toContain("BackPocket OS AI Offline");
    expect(result.response).toContain("operator");
    expect(result.sources.some((source) => source.id === "case-study-backpocket-os-ai-offline")).toBe(true);
  });

  it("keeps Pilly healthcare answers safety-bounded", () => {
    const result = getSyntheticRagResponse("Does Himanshu understand responsible AI in healthcare contexts?");

    expect(result.confidence).toBe("high");
    expect(result.response).toContain("not medical advice");
    expect(result.response).toContain("does not provide diagnosis");
    expect(result.sources.some((source) => source.id === "case-study-pilly-medimate-voice")).toBe(true);
  });

  it("answers an Ask Jay experience question", () => {
    const result = getSyntheticRagResponse("What did Himanshu do at Ask Jay?");

    expect(result.confidence).toBe("high");
    expect(result.response).toContain("Ask Jay Services");
    expect(result.response).toContain("25 seconds");
    expect(result.sources.some((source) => source.id === "ask-jay")).toBe(true);
  });

  it("answers an AWS Bedrock assistant question", () => {
    const result = getSyntheticRagResponse("How does the AWS Bedrock RAG assistant work?");

    expect(result.confidence).toBe("high");
    expect(result.response).toContain("AWS Bedrock");
    expect(result.response).toContain("Synthetic RAG");
    expect(result.sources.some((source) => source.id === "portfolio")).toBe(true);
  });

  it("returns a safe fallback for unknown unrelated questions", () => {
    const result = getSyntheticRagResponse("Can you plan my vacation itinerary in Japan?");

    expect(result.confidence).toBe("low");
    expect(result.response).toContain("I don't have enough portfolio context");
    expect(result.sources).toHaveLength(0);
  });

  it("rejects oversized input", () => {
    const validation = validateSyntheticRagInput("a".repeat(1001));

    expect(validation.ok).toBe(false);
    if (!validation.ok) {
      expect(validation.error).toContain("1000");
    }
  });

  it("includes sources for matched answers", () => {
    const result = getSyntheticRagResponse("Tell me about Pilly MediMate Voice");

    expect(result.sources.length).toBeGreaterThan(0);
    expect(result.sources[0]).toMatchObject({
      id: expect.any(String),
      section: expect.any(String),
      title: expect.any(String),
    });
  });

  it("returns top 3 entries from local retrieval", () => {
    const matches = searchSyntheticRagIndex("AI workflow automation local-first RAG");

    expect(matches.length).toBeLessThanOrEqual(3);
    expect(matches[0].score).toBeGreaterThanOrEqual(matches[matches.length - 1].score);
  });
});
