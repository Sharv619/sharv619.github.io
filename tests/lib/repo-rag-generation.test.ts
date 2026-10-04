import { describe, expect, it } from "vitest";

import { generateRepoRagDocuments } from "../../scripts/generate-repo-rag-index";

const project = {
  title: "Example Repository",
  description: "A public example project.",
  technologies: ["TypeScript", "React"],
  githubUrl: "https://github.com/Sharv619/example-repository",
  slug: "example-repository",
  primaryLanguage: "TypeScript",
  readmeMarkdown: `# Example Repository

This project demonstrates repository-aware retrieval for a public portfolio assistant.

## Architecture

The application generates a static search index during the deployment workflow and queries it in the browser.`,
};

describe("repository RAG generation", () => {
  it("creates repository metadata and README documents with provenance", () => {
    const documents = generateRepoRagDocuments([project]);

    expect(documents.some((document) => document.evidenceType === "metadata")).toBe(true);
    expect(documents.some((document) => document.heading === "Architecture")).toBe(true);
    expect(documents.every((document) => document.repositoryUrl === project.githubUrl)).toBe(true);
    expect(documents.find((document) => document.heading === "Architecture")?.sourceUrl)
      .toBe("https://github.com/Sharv619/example-repository#architecture");
  });

  it("excludes repositories outside the approved public owner", () => {
    const documents = generateRepoRagDocuments([{
      ...project,
      githubUrl: "https://github.com/example/private-project",
    }]);

    expect(documents).toHaveLength(0);
  });

  it("removes fenced source code from README evidence", () => {
    const documents = generateRepoRagDocuments([{
      ...project,
      readmeMarkdown: `${project.readmeMarkdown}\n\n## Usage\n\nUseful usage instructions for the published package.\n\n\`\`\`ts\nconst secret = process.env.API_KEY;\n\`\`\``,
    }]);

    expect(documents.some((document) => document.content.includes("process.env.API_KEY"))).toBe(false);
  });
});
