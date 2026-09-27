import HomePageClient from "@/components/HomePageClient";
import { getPortfolioProjects } from "@/lib/github-projects";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Himanshu Lade - Software Engineer",
  description: "Software Engineer focused on backend systems, production reliability, cloud deployment, and AI-assisted workflow automation.",
  path: "/",
});

export default async function Home() {
  const projects = await getPortfolioProjects();

  return <HomePageClient projects={projects} />;
}
