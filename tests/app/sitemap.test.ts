import { describe, expect, it } from "vitest";

import sitemap from "../../src/app/sitemap";
import { getPortfolioProjects } from "../../src/lib/github-projects";
import { canonicalUrl } from "../../src/lib/seo";

describe("sitemap", () => {
  it("omits project case-study aliases for curated studies", async () => {
    const projects = await getPortfolioProjects({ source: "snapshot" });
    const curatedProject = projects.find((project) => project.caseStudySlug);
    const repositoryProject = projects.find((project) => !project.caseStudySlug);
    const entries = await sitemap();
    const urls = entries.map((entry) => entry.url);

    expect(curatedProject).toBeDefined();
    expect(repositoryProject).toBeDefined();
    expect(urls).not.toContain(canonicalUrl(`/projects/${curatedProject?.slug}/case-study/`));
    expect(urls).toContain(canonicalUrl(`/case-studies/${curatedProject?.caseStudySlug}/`));
    expect(urls).toContain(canonicalUrl(`/projects/${repositoryProject?.slug}/case-study/`));
  });
});
