import HomePageClient from "@/components/HomePageClient";
import { getPortfolioProjects } from "@/lib/github-projects";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Himanshu Lade | Full-Stack AI & Systems Engineer Australia",
  description: "Sydney-based full-stack AI and systems engineer building local-first AI, workflow automation, production recovery, technical SEO, and practical software.",
  path: "/",
});

export default async function Home() {
  const projects = await getPortfolioProjects();

  return <HomePageClient projects={projects} />;
}
