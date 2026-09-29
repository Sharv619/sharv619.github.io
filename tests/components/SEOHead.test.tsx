import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import SEOHead from "../../src/components/SEOHead";

interface StructuredDataNode {
  "@type": string;
  jobTitle?: string;
  address?: {
    addressCountry?: string;
  };
  knowsAbout?: string[];
}

interface StructuredDataGraph {
  "@graph": StructuredDataNode[];
}

describe("SEOHead", () => {
  it("publishes an Australia-aware ProfilePage and Person graph", () => {
    const { container } = render(<SEOHead />);
    const script = container.querySelector('script[type="application/ld+json"]');
    const structuredData = JSON.parse(script?.textContent || "{}") as StructuredDataGraph;
    const person = structuredData["@graph"].find((node) => node["@type"] === "Person");

    expect(structuredData["@graph"].some((node) => node["@type"] === "ProfilePage")).toBe(true);
    expect(person?.jobTitle).toBe("Full-Stack Systems & AI Engineer");
    expect(person?.address?.addressCountry).toBe("AU");
    expect(person?.knowsAbout).toContain("Local-first AI");
  });
});
