import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Projects from "../../src/components/Projects";
import type { Project } from "../../src/lib/data";

const projects: Project[] = [
  {
    title: "Python Workflow",
    description: "A Python automation project.",
    technologies: ["Python", "FastAPI"],
    liveUrl: "",
    githubUrl: "https://github.com/Sharv619/python-workflow",
    architectureDetails: "Python workflow architecture.",
  },
  {
    title: "TypeScript Workflow",
    description: "A TypeScript automation project.",
    technologies: ["TypeScript", "Next.js"],
    liveUrl: "",
    githubUrl: "https://github.com/Sharv619/typescript-workflow",
    architectureDetails: "TypeScript workflow architecture.",
  },
];

describe("Projects", () => {
  it("keeps project filters, repository evidence, and personal workflows in one segment", () => {
    render(<Projects projects={projects} />);

    expect(screen.getByRole("heading", { name: "Projects, Skills & Weekend Builds" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Skills & Technologies" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "GitHub Project Lab" })).toBeInTheDocument();
    expect(screen.getByText("2 repositories")).toBeInTheDocument();
    expect(screen.getByText(/Select a skill to filter the GitHub projects/)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Weekend Build Sprints" })).toBeInTheDocument();
    expect(screen.getByText(/That build-and-verify rush keeps me sharp/)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Headphone -1 / +1 Control" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Telegram Bot Remote" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Tailscale + SSH Link" })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Python" }));

    expect(screen.getByText("1 repository")).toBeInTheDocument();
    expect(screen.getByText("1 active filter")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Python Workflow" })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "TypeScript" }));

    expect(screen.getByText("2 repositories")).toBeInTheDocument();
    expect(screen.getByText("2 active filters")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Clear 2 filters" }));

    expect(screen.getByText("2 repositories")).toBeInTheDocument();
    expect(screen.getByText("0 active filters")).toBeInTheDocument();
  });
});
