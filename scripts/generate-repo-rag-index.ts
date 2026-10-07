import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

interface GitHubProjectSnapshot {
  title: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  slug: string;
  archived?: boolean;
  updatedAt?: string;
  pushedAt?: string;
  topics?: string[];
  primaryLanguage?: string | null;
  portfolioSummary?: string;
  readmeMarkdown?: string;
  readmeSourceUrl?: string;
  featured?: boolean;
  priority?: number;
  status?: string;
  evidenceReferences?: Array<{
    id: string;
    label: string;
    kind: "file" | "commit";
    url: string;
    path?: string;
    sha?: string;
    description?: string;
  }>;
  architectureDocuments?: Array<{
    path: string;
    title: string;
    content: string;
    sourceUrl: string;
  }>;
}

interface RepoRagDocument {
  id: string;
  repository: string;
  repositorySlug: string;
  repositoryUrl: string;
  sourceUrl: string;
  title: string;
  heading: string;
  content: string;
  technologies: string[];
  topics: string[];
  primaryLanguage: string | null;
  updatedAt: string | null;
  evidenceType: "metadata" | "readme" | "architecture" | "evidence";
  authority: "repository";
  featured: boolean;
  priority: number;
}

interface MarkdownSection {
  heading: string;
  content: string;
}

const SNAPSHOT_PATH = resolve(process.cwd(), "src/lib/generated-github-projects.json");
const OUTPUT_PATH = resolve(process.cwd(), "src/lib/repo-rag-index.json");
const MAX_CHUNK_LENGTH = 900;
const MIN_CHUNK_LENGTH = 80;

function normalizeWhitespace(value: string): string {
  return value
    .replace(/\r\n/g, "\n")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function sanitizeReadme(markdown: string): string {
  return normalizeWhitespace(markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/~~~[\s\S]*?~~~/g, " ")
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<!--([\s\S]*?)-->/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1")
    .replace(/^\s*[-*_]{3,}\s*$/gm, " "));
}

function slugifyHeading(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function splitMarkdownSections(markdown: string, fallbackHeading: string): MarkdownSection[] {
  const sanitized = sanitizeReadme(markdown);
  const sections: MarkdownSection[] = [];
  let heading = fallbackHeading;
  let content: string[] = [];

  const flush = (): void => {
    const sectionContent = normalizeWhitespace(content.join("\n"));
    if (sectionContent.length >= MIN_CHUNK_LENGTH) {
      sections.push({ heading, content: sectionContent });
    }
    content = [];
  };

  for (const line of sanitized.split("\n")) {
    const headingMatch = line.match(/^#{1,4}\s+(.+)$/);
    if (headingMatch) {
      flush();
      heading = headingMatch[1].replace(/[*_`]/g, "").trim();
    } else {
      content.push(line);
    }
  }

  flush();
  return sections;
}

function chunkSection(section: MarkdownSection): string[] {
  if (section.content.length <= MAX_CHUNK_LENGTH) {
    return [section.content];
  }

  const paragraphs = section.content.split(/\n{2,}/).map((value) => value.trim()).filter(Boolean);
  const chunks: string[] = [];
  let current = "";

  for (const paragraph of paragraphs) {
    if (!current) {
      current = paragraph;
      continue;
    }

    if (`${current}\n\n${paragraph}`.length <= MAX_CHUNK_LENGTH) {
      current = `${current}\n\n${paragraph}`;
      continue;
    }

    chunks.push(current.slice(0, MAX_CHUNK_LENGTH).trim());
    current = paragraph;
  }

  if (current) {
    for (let offset = 0; offset < current.length; offset += MAX_CHUNK_LENGTH) {
      const chunk = current.slice(offset, offset + MAX_CHUNK_LENGTH).trim();
      if (chunk.length >= MIN_CHUNK_LENGTH) {
        chunks.push(chunk);
      }
    }
  }

  return chunks;
}

function buildMetadataContent(project: GitHubProjectSnapshot): string {
  const details = [
    project.description,
    project.portfolioSummary,
    project.primaryLanguage ? `Primary language: ${project.primaryLanguage}.` : "",
    project.technologies.length > 0 ? `Technologies: ${project.technologies.join(", ")}.` : "",
    project.topics?.length ? `Topics: ${project.topics.join(", ")}.` : "",
    project.status ? `Status: ${project.status}.` : "",
    project.archived ? "This repository is archived." : "",
  ];

  return normalizeWhitespace(details.filter(Boolean).join("\n"));
}

function createBaseDocument(project: GitHubProjectSnapshot): Omit<RepoRagDocument, "id" | "sourceUrl" | "heading" | "content" | "evidenceType"> {
  return {
    repository: project.title,
    repositorySlug: project.slug,
    repositoryUrl: project.githubUrl,
    title: project.title,
    technologies: project.technologies,
    topics: project.topics || [],
    primaryLanguage: project.primaryLanguage || null,
    updatedAt: project.pushedAt || project.updatedAt || null,
    authority: "repository",
    featured: project.featured === true,
    priority: project.priority || 0,
  };
}

export function generateRepoRagDocuments(projects: GitHubProjectSnapshot[]): RepoRagDocument[] {
  const documents: RepoRagDocument[] = [];

  for (const project of projects) {
    if (!project.githubUrl.startsWith("https://github.com/Sharv619/")) {
      continue;
    }

    const base = createBaseDocument(project);
    documents.push({
      ...base,
      id: `${project.slug}-metadata`,
      sourceUrl: project.githubUrl,
      heading: "Repository overview",
      content: buildMetadataContent(project),
      evidenceType: "metadata",
    });

    if (project.readmeMarkdown?.trim()) {
      addMarkdownDocuments(documents, base, project, {
        markdown: project.readmeMarkdown,
        sourceUrl: project.readmeSourceUrl || project.githubUrl,
        evidenceType: "readme",
        idPrefix: project.slug,
      });
    }

    for (const architecture of project.architectureDocuments || []) {
      addMarkdownDocuments(documents, base, project, {
        markdown: architecture.content,
        sourceUrl: architecture.sourceUrl,
        evidenceType: "architecture",
        idPrefix: `${project.slug}-architecture-${slugifyHeading(architecture.path)}`,
        fallbackHeading: architecture.title,
      });
    }

    for (const evidence of project.evidenceReferences || []) {
      documents.push({
        ...base,
        id: `${project.slug}-evidence-${evidence.id}`,
        sourceUrl: evidence.url,
        heading: evidence.label,
        content: normalizeWhitespace([
          evidence.description,
          evidence.kind === "file" && evidence.path ? `Verified repository file: ${evidence.path}.` : "",
          evidence.kind === "commit" && evidence.sha ? `Verified repository commit: ${evidence.sha}.` : "",
        ].filter(Boolean).join("\n")),
        evidenceType: "evidence",
      });
    }
  }

  return documents;
}

function addMarkdownDocuments(
  documents: RepoRagDocument[],
  base: ReturnType<typeof createBaseDocument>,
  project: GitHubProjectSnapshot,
  options: {
    markdown: string;
    sourceUrl: string;
    evidenceType: "readme" | "architecture";
    idPrefix: string;
    fallbackHeading?: string;
  }
): void {
  const sections = splitMarkdownSections(options.markdown, options.fallbackHeading || project.title);
  for (const section of sections) {
    const headingSlug = slugifyHeading(section.heading) || options.evidenceType;
    const chunks = chunkSection(section);
    chunks.forEach((content, index) => {
      documents.push({
        ...base,
        id: `${options.idPrefix}-${headingSlug}-${index + 1}`,
        sourceUrl: options.evidenceType === "readme"
          ? `${options.sourceUrl}#${headingSlug}`
          : options.sourceUrl,
        heading: section.heading,
        content,
        evidenceType: options.evidenceType,
      });
    });
  }
}

async function main(): Promise<void> {
  const rawSnapshot = await readFile(SNAPSHOT_PATH, "utf8");
  const projects = JSON.parse(rawSnapshot) as GitHubProjectSnapshot[];
  const documents = generateRepoRagDocuments(projects);

  if (documents.length < projects.length) {
    throw new Error("Repository RAG generation produced fewer documents than repositories.");
  }

  await writeFile(OUTPUT_PATH, `${JSON.stringify(documents, null, 2)}\n`, "utf8");
  console.log(`Generated ${documents.length} repository RAG documents from ${projects.length} public repositories.`);
}

if (process.argv[1]?.endsWith("generate-repo-rag-index.ts")) {
  main().catch((error: unknown) => {
    const message = error instanceof Error ? error.message : "Unknown repository RAG generation error";
    console.error(message);
    process.exitCode = 1;
  });
}
