import type { MetadataRoute } from "next";
import { slugify } from "@/lib/data";
import { getOrderedFlagshipCaseStudies } from "@/lib/flagship-case-studies";
import { getPortfolioProjects } from "@/lib/github-projects";
import { canonicalUrl } from "@/lib/seo";

export const dynamic = "force-static";

const STATIC_ROUTES = [
  "/",
  "/resume/",
  "/projects/",
  "/case-studies/",
  "/chatbot/",
  "/investments/",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();
  const projects = await getPortfolioProjects();
  const projectRoutes = projects.map(
    (project) => `/projects/${project.slug || slugify(project.title)}/`
  );
  const caseStudyRoutes = getOrderedFlagshipCaseStudies().map(
    (caseStudy) => `/case-studies/${caseStudy.slug}/`
  );

  return [...STATIC_ROUTES, ...projectRoutes, ...caseStudyRoutes].map((route) => ({
    url: canonicalUrl(route),
    lastModified,
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.8,
  }));
}
