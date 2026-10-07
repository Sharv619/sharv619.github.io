import { z } from "zod";

export interface RepositoryEvidenceReference {
  id: string;
  label: string;
  kind: "file" | "commit";
  url: string;
  path?: string;
  sha?: string;
  description?: string;
}

export interface RepositoryArchitectureDocument {
  path: string;
  title: string;
  content: string;
  sourceUrl: string;
  diagrams: RepositoryMermaidDiagram[];
}

export interface RepositoryMermaidDiagram {
  id: string;
  title: string;
  source: string;
}

export interface PortfolioEvidenceManifest {
  version: 1;
  claims: Array<{
    id: string;
    label: string;
    description?: string;
    evidence: Array<
      | { type: "file"; path: string; label?: string }
      | { type: "commit"; sha: string; label?: string }
    >;
  }>;
  architecture: Array<{ path: string; title?: string }>;
}

const repositoryPathSchema = z.string().min(1).max(240).refine(
  (value) => !value.startsWith("/") && !value.split("/").includes(".."),
  "Repository paths must be relative and cannot traverse directories."
);

const fileEvidenceSchema = z.object({
  type: z.literal("file"),
  path: repositoryPathSchema,
  label: z.string().min(1).max(100).optional(),
});

const commitEvidenceSchema = z.object({
  type: z.literal("commit"),
  sha: z.string().regex(/^[a-f0-9]{7,40}$/i),
  label: z.string().min(1).max(100).optional(),
});

const portfolioEvidenceManifestSchema = z.object({
  version: z.literal(1),
  claims: z.array(z.object({
    id: z.string().regex(/^[a-z0-9][a-z0-9-]*$/i).max(80),
    label: z.string().min(1).max(140),
    description: z.string().max(400).optional(),
    evidence: z.array(z.discriminatedUnion("type", [fileEvidenceSchema, commitEvidenceSchema])).min(1).max(12),
  })).max(40).default([]),
  architecture: z.array(z.object({
    path: repositoryPathSchema,
    title: z.string().min(1).max(140).optional(),
  })).max(12).default([]),
});

const MERMAID_START = /^(?:flowchart|graph|sequenceDiagram|classDiagram|stateDiagram(?:-v2)?|erDiagram|journey|gantt|pie|mindmap|timeline|gitGraph)\b/;

export function parsePortfolioEvidenceManifest(content: string): PortfolioEvidenceManifest | null {
  try {
    const parsed: unknown = JSON.parse(content);
    const result = portfolioEvidenceManifestSchema.safeParse(parsed);
    return result.success ? result.data : null;
  } catch {
    return null;
  }
}

export function extractMermaidDiagrams(markdown: string, path: string): RepositoryMermaidDiagram[] {
  const diagrams: RepositoryMermaidDiagram[] = [];
  const pattern = /```mermaid\s*\n([\s\S]*?)```/gi;
  let match = pattern.exec(markdown);

  while (match && diagrams.length < 8) {
    const source = match[1].trim();
    if (source.length <= 12_000 && MERMAID_START.test(source)) {
      diagrams.push({
        id: `${slugifyPath(path)}-${diagrams.length + 1}`,
        title: `Architecture diagram ${diagrams.length + 1}`,
        source,
      });
    }
    match = pattern.exec(markdown);
  }

  return diagrams;
}

export function extractLinkedArchitecturePaths(markdown: string): string[] {
  const paths = new Set<string>();
  const linkPattern = /\[([^\]]+)\]\(([^)]+)\)/g;
  let match = linkPattern.exec(markdown);

  while (match && paths.size < 12) {
    const label = match[1].trim();
    const rawTarget = match[2].trim().split(/\s+["']/)[0];
    const target = rawTarget.split(/[?#]/)[0].replace(/^\.\//, "");
    const isMarkdown = /\.mdx?$/i.test(target);
    const isArchitecture = /(?:architecture|system[-_ ]?design|technical[-_ ]?design)/i.test(`${label} ${target}`);
    const isSafeRelativePath = !/^(?:https?:|\/)/i.test(target)
      && !target.split("/").includes("..")
      && target.length <= 240;

    if (isMarkdown && isArchitecture && isSafeRelativePath) {
      paths.add(target);
    }

    match = linkPattern.exec(markdown);
  }

  return [...paths];
}

export function titleFromRepositoryPath(path: string): string {
  const fileName = path.split("/").pop() || path;
  return fileName
    .replace(/\.(?:md|mdx)$/i, "")
    .split(/[-_.]+/)
    .filter(Boolean)
    .map((part) => `${part.charAt(0).toUpperCase()}${part.slice(1).toLowerCase()}`)
    .join(" ");
}

function slugifyPath(path: string): string {
  return path.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
