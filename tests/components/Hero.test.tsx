import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Hero from "../../src/components/Hero";

describe("Hero", () => {
  it("renders the field journal identity and evidence architecture", () => {
    const { container } = render(<Hero />);

    expect(screen.getByRole("heading", { name: "Himanshu Lade" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Evidence-driven portfolio" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "GitHub repositories" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Evidence ingestion" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Repo RAG" })).toBeInTheDocument();
    expect(screen.getAllByText("Verified context").length).toBeGreaterThan(0);
    expect(container.querySelector(".journal-leather-frame")).toBeInTheDocument();
    expect(container.querySelectorAll(".journal-gutter-point")).toHaveLength(7);
  });
});
