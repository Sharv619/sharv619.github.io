import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import FeaturedCaseStudies, { getSwipeSpreadDelta } from "../../src/components/FeaturedCaseStudies";
import { getOrderedFlagshipCaseStudies } from "../../src/lib/flagship-case-studies";

describe("FeaturedCaseStudies", () => {
  it("maps left swipes forward and right swipes backward", () => {
    expect(getSwipeSpreadDelta(-71)).toBe(1);
    expect(getSwipeSpreadDelta(71)).toBe(-1);
    expect(getSwipeSpreadDelta(70)).toBe(0);
  });

  it("shows two case studies per spread and turns to the next pair", async () => {
    const caseStudies = getOrderedFlagshipCaseStudies();
    render(<FeaturedCaseStudies caseStudies={caseStudies} />);

    expect(screen.getByText(caseStudies[0].title)).toBeInTheDocument();
    expect(screen.getByText(caseStudies[1].title)).toBeInTheDocument();
    expect(screen.queryByText(caseStudies[2].title)).not.toBeInTheDocument();
    expect(screen.getByText("Showing 1–2 of 6")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Show next case-study spread" }));

    expect(await screen.findByText(caseStudies[2].title)).toBeInTheDocument();
    expect(screen.getByText(caseStudies[3].title)).toBeInTheDocument();
    expect(screen.getByText("Showing 3–4 of 6")).toBeInTheDocument();
  });
});
