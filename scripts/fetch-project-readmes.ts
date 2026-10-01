import fs from "node:fs";
import path from "node:path";
import https from "node:https";

const ROOT_DIR = process.cwd();
const KB_PATH = path.join(ROOT_DIR, "src/lib/knowledge-base.json");
const OUTPUT_DIR = path.join(ROOT_DIR, "content/source");

function fetchReadme(repoUrl: string): Promise<string | null> {
  const match = repoUrl.match(/^https:\/\/github\.com\/([^\/]+)\/([^\/]+)/);
  if (!match) {
    console.warn(`Invalid GitHub URL: ${repoUrl}`);
    return Promise.resolve(null);
  }
  const [, owner, repo] = match;
  const apiUrl = `https://api.github.com/repos/${owner}/${repo}/readme`;

  return new Promise((resolve) => {
    const req = https.request(apiUrl, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        try {
          const parsed = JSON.parse(data);
          if (parsed.content && parsed.encoding === "base64") {
            const buffer = Buffer.from(parsed.content, "base64");
            resolve(buffer.toString("utf8"));
          } else {
            resolve(null);
          }
        } catch {
          resolve(null);
        }
      });
    });

    req.on("error", () => {
      resolve(null);
    });

    // Set headers
    req.setHeader("User-Agent", "Mozilla/5.0 (compatible; Sharv619PortfolioBot/1.0)");
    const token = process.env.GITHUB_TOKEN;
    if (token) {
      req.setHeader("Authorization", `token ${token}`);
    }

    req.end();
  });
}

async function main() {
  // Load knowledge base
  const kb = JSON.parse(fs.readFileSync(KB_PATH, "utf8"));

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const promises = [];

  for (const project of kb.projects) {
    const githubUrl = project.links?.github;
    if (!githubUrl) {
      console.log(`No GitHub URL for project: ${project.id}`);
      continue;
    }

    console.log(`Fetching README for ${project.id} from ${githubUrl}`);
    const promise = fetchReadme(githubUrl).then((readme) => {
      if (readme) {
        const projectDir = path.join(OUTPUT_DIR, project.id);
        if (!fs.existsSync(projectDir)) {
          fs.mkdirSync(projectDir, { recursive: true });
        }
        const readmePath = path.join(projectDir, "README.md");
        fs.writeFileSync(readmePath, readme, "utf8");
        console.log(`Saved README for ${project.id} to ${readmePath}`);
      } else {
        console.warn(`Could not fetch README for ${project.id}`);
      }
    });
    promises.push(promise);
  }

  await Promise.all(promises);
  console.log("Done.");
}

main().catch((err) => {
  console.error("Script failed:", err);
  process.exit(1);
});