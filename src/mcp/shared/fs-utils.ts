import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from "fs";
import { dirname, join, relative, resolve } from "path";

export const DEFAULT_IGNORES = [
  "node_modules",
  ".git",
  "dist",
  "build",
  ".next",
  "coverage",
  "out",
];

const SENSITIVE_FILES = new Set([
  ".env",
  ".env.local",
  ".env.production",
  ".env.development",
]);

const SENSITIVE_PATTERNS = [/\.pem$/i, /private[-_]?key/i, /secret/i];

export interface FilePreview {
  path: string;
  exists: boolean;
  contentPreview?: string;
  lineCount?: number;
  skipped?: boolean;
  reason?: string;
}

export interface TreeScanResult {
  files: string[];
  directories: string[];
  detectedFrameworks: string[];
  importantFiles: string[];
}

export function repoRoot(): string {
  return process.cwd();
}

export function toRepoPath(path: string): string {
  return relative(repoRoot(), path).replace(/\\/g, "/");
}

export function pathExists(path: string): boolean {
  return existsSync(resolveRepoPath(path));
}

export function resolveRepoPath(path: string): string {
  const root = repoRoot();
  const resolved = resolve(root, path);

  if (!resolved.startsWith(root)) {
    throw new Error(`Path escapes repository root: ${path}`);
  }

  return resolved;
}

export function isSensitivePath(path: string): boolean {
  const normalized = path.replace(/\\/g, "/");
  const basename = normalized.split("/").pop() || normalized;

  return SENSITIVE_FILES.has(basename) || SENSITIVE_PATTERNS.some((pattern) => pattern.test(normalized));
}

export function shouldIgnorePath(path: string, ignore: string[] = DEFAULT_IGNORES): boolean {
  const parts = path.replace(/\\/g, "/").split("/");
  return parts.some((part) => ignore.includes(part)) || isSensitivePath(path);
}

export function readJsonFile<T>(path: string, fallback: T): T {
  try {
    const content = readFileSync(resolveRepoPath(path), "utf8");
    return JSON.parse(content) as T;
  } catch {
    return fallback;
  }
}

export function readTextFile(path: string): string {
  return readFileSync(resolveRepoPath(path), "utf8");
}

export function readFilePreview(path: string, maxChars = 4000): FilePreview {
  if (isSensitivePath(path)) {
    return { path, exists: existsSync(resolveRepoPath(path)), skipped: true, reason: "sensitive file" };
  }

  if (!existsSync(resolveRepoPath(path))) {
    return { path, exists: false };
  }

  const content = readTextFile(path);
  const lineCount = content.split(/\r?\n/).length;
  return {
    path,
    exists: true,
    contentPreview: content.length > maxChars ? `${content.slice(0, maxChars)}\n...` : content,
    lineCount,
  };
}

export function writeRepoFile(path: string, content: string): void {
  if (isSensitivePath(path)) {
    throw new Error(`Refusing to write sensitive path: ${path}`);
  }

  const resolved = resolveRepoPath(path);
  const parent = dirname(resolved);
  if (!existsSync(parent)) {
    throw new Error(`Parent directory does not exist: ${toRepoPath(parent)}`);
  }

  writeFileSync(resolved, content);
}

export function scanTree(maxDepth = 4, ignore: string[] = DEFAULT_IGNORES): TreeScanResult {
  const files: string[] = [];
  const directories: string[] = [];

  function visit(currentPath: string, depth: number): void {
    if (depth > maxDepth) {
      return;
    }

    const relativePath = toRepoPath(currentPath);
    if (relativePath && shouldIgnorePath(relativePath, ignore)) {
      return;
    }

    const stat = statSync(currentPath);
    if (stat.isDirectory()) {
      if (relativePath) {
        directories.push(relativePath);
      }

      readdirSync(currentPath)
        .sort()
        .forEach((entry) => visit(join(currentPath, entry), depth + 1));
      return;
    }

    if (stat.isFile()) {
      files.push(relativePath);
    }
  }

  visit(repoRoot(), 0);

  return {
    files,
    directories,
    detectedFrameworks: detectFrameworks(files),
    importantFiles: files.filter((file) => isImportantFile(file)),
  };
}

function detectFrameworks(files: string[]): string[] {
  const frameworks = new Set<string>();

  if (files.includes("next.config.ts") || files.includes("next.config.js")) {
    frameworks.add("Next.js");
  }
  if (files.includes("package.json")) {
    frameworks.add("Node.js");
  }
  if (files.includes("tailwind.config.js") || files.includes("postcss.config.mjs")) {
    frameworks.add("Tailwind CSS");
  }
  if (files.includes("vitest.config.ts")) {
    frameworks.add("Vitest");
  }

  return [...frameworks];
}

function isImportantFile(path: string): boolean {
  return [
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
  ].includes(path);
}
