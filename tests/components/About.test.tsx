import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import About from "../../src/components/About";

describe("About", () => {
  it("renders grounded personal workflows without making the eyebrow interactive", () => {
    const { container } = render(<About />);

    expect(screen.queryByRole("button", { name: "About" })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "About" })).not.toBeInTheDocument();
    expect(screen.getByText("Human touch")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "How I Work" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Personal Workflow" })).not.toBeInTheDocument();
    expect(container.querySelector("#about")).toHaveClass("dark:bg-[#151513]");
  });
});
