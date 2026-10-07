import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Experience from "../../src/components/Experience";
import { experience } from "../../src/lib/data";

describe("Experience", () => {
  it("renders every career entry immediately in the homepage ledger", () => {
    render(<Experience />);

    expect(screen.getByRole("heading", { name: "Where the proof came from." })).toBeInTheDocument();
    experience.forEach((entry) => {
      expect(screen.getByRole("heading", { name: entry.position })).toBeInTheDocument();
      expect(screen.getByRole("link", { name: `Open ${entry.company} website` })).toBeInTheDocument();
    });
  });
});
