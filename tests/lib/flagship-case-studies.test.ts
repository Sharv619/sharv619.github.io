import { describe, expect, it } from "vitest";

import { getOrderedFlagshipCaseStudies } from "../../src/lib/flagship-case-studies";

describe("flagship case study ordering", () => {
  it("features Network Guardian AI instead of Pilly on the homepage", () => {
    const featuredSlugs = getOrderedFlagshipCaseStudies()
      .slice(0, 3)
      .map((caseStudy) => caseStudy.slug);

    expect(featuredSlugs).toEqual([
      "production-recovery-performance-rebuild",
      "network-guardian-ai",
      "codeflow-hook",
    ]);
    expect(featuredSlugs).not.toContain("pilly-medimate-voice");
  });
});
