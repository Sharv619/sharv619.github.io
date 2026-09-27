import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { getPortfolioProjects } from "../src/lib/github-projects";

const SNAPSHOT_PATH = resolve(process.cwd(), "src/lib/generated-github-projects.json");

async function main(): Promise<void> {
  const projects = await getPortfolioProjects({
    source: "github",
    useFallback: false,
  });

  if (projects.length === 0) {
    throw new Error("GitHub returned no public portfolio repositories.");
  }

  await writeFile(SNAPSHOT_PATH, `${JSON.stringify(projects, null, 2)}\n`, "utf8");
  console.log(`Generated GitHub project snapshot with ${projects.length} repositories.`);
}

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : "Unknown GitHub snapshot error";
  console.error(message);
  process.exitCode = 1;
});
