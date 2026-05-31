import { readFilePreview, readJsonFile, readTextFile, scanTree } from "../shared/fs-utils";
import { findReferences } from "../shared/search-utils";

const DEFAULT_KEY_FILES = [
  "README.md",
  "package.json",
  "next.config.ts",
  "src/lib/data.ts",
  "src/lib/github-projects.ts",
  "src/lib/resumeData.ts",
  "src/app/page.tsx",
  "src/app/projects/page.tsx",
  ".github/workflows/deploy.yml",
  "PRD.md",
  "TDD.md",
  "WORKFLOWS.md",
  "TASKS_V2.md",
];

interface PackageJson {
  scripts?: Record<string, string>;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
}

export function scanTreeTool(maxDepth = 4, ignore?: string[]) {
  return scanTree(maxDepth, ignore);
}

export function readKeyFilesTool(files = DEFAULT_KEY_FILES) {
  return {
    files: files.map((file) => readFilePreview(file)),
  };
}

export function findReferencesTool(query: string, mode: "text" | "regex" = "text", ignore?: string[]) {
  return {
    query,
    mode,
    matches: findReferences(query, mode, ignore),
  };
}

export function detectProjectTypeTool() {
  const packageJson = readJsonFile<PackageJson>("package.json", {});
  const nextConfig = safeRead("next.config.ts");
  const deployWorkflow = safeRead(".github/workflows/deploy.yml");
  const scripts = packageJson.scripts || {};
  const dependencies = { ...packageJson.dependencies, ...packageJson.devDependencies };

  return {
    framework: dependencies.next ? "Next.js" : "Unknown",
    language: "TypeScript",
    packageManager: "npm",
    staticExport: nextConfig.includes("output: 'export'") || nextConfig.includes('output: "export"'),
    deployment: deployWorkflow.includes("deploy-pages") ? "GitHub Pages" : "Unknown",
    testCommand: scripts["test:run"] ? "npm run test:run" : scripts.test ? "npm test" : null,
    lintCommand: scripts.lint ? "npm run lint" : null,
    buildCommand: scripts.build ? "npm run build" : null,
  };
}

function safeRead(path: string): string {
  try {
    return readTextFile(path);
  } catch {
    return "";
  }
}
