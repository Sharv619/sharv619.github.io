import HomePageClient from "@/components/HomePageClient";
import { getPortfolioProjects } from "@/lib/github-projects";

export default async function Home() {
  const projects = await getPortfolioProjects();

  return <HomePageClient projects={projects} />;
}
