import repoRagIndex from "@/lib/repo-rag-index.json";

export interface RepoRagDocument {
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

export interface RepoRagMatch {
  document: RepoRagDocument;
  score: number;
  matchedTerms: string[];
}

export type RepoRagConfidence = "high" | "medium" | "low";
export type RepoRagQueryIntent = "search" | "catalog" | "recent" | "count";

const STOP_WORDS = new Set([
  "about",
  "and",
  "are",
  "built",
  "does",
  "for",
  "from",
  "have",
  "himanshu",
  "how",
  "into",
  "project",
  "projects",
  "repo",
  "repository",
  "show",
  "tell",
  "that",
  "the",
  "this",
  "use",
  "uses",
  "using",
  "what",
  "which",
  "with",
]);

const TOKEN_ALIASES: Record<string, string[]> = {
  ai: ["artificial", "intelligence"],
  api: ["apis"],
  js: ["javascript"],
  ml: ["machine", "learning"],
  postgres: ["postgresql"],
  rag: ["retrieval", "augmented", "generation"],
  ts: ["typescript"],
};

const BM25_K1 = 1.5;
const BM25_B = 0.75;
const HIGH_CONFIDENCE_SCORE = 13;
const MEDIUM_CONFIDENCE_SCORE = 4;

function normalize(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9+#.\s-]/g, " ")
    .replace(/[-_/]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function tokenizeRepoRagQuery(value: string): string[] {
  const baseTokens = normalize(value)
    .split(" ")
    .filter((token) => token.length >= 2 && !STOP_WORDS.has(token));
  const expanded = baseTokens.flatMap((token) => [token, ...(TOKEN_ALIASES[token] || [])]);

  return [...new Set(expanded)];
}

function getDocumentText(document: RepoRagDocument): string {
  return normalize([
    document.repository,
    document.title,
    document.heading,
    document.content,
    document.primaryLanguage,
    ...document.technologies,
    ...document.topics,
  ].filter(Boolean).join(" "));
}

function countTerm(tokens: string[], term: string): number {
  return tokens.reduce((count, token) => count + (token === term ? 1 : 0), 0);
}

export function getRepoRagQueryIntent(message: string): RepoRagQueryIntent {
  const normalized = normalize(message);
  const repositoryTerms = "projects?|repos?|repositories";

  if (new RegExp(`\\b(how many|number of|total)\\b.{0,40}\\b(${repositoryTerms})\\b`).test(normalized)) {
    return "count";
  }

  if (
    new RegExp(`\\b(latest|newest|recent|recently|new)\\b.{0,40}\\b(${repositoryTerms}|builds?|work)\\b`).test(normalized)
    || /\bwhat\b.{0,30}\b(working on|building now)\b/.test(normalized)
  ) {
    return "recent";
  }

  if (/\b(use|uses|using|built with|written in)\b/.test(normalized)) {
    return "search";
  }

  if (
    new RegExp(`\\b(list|show|browse|all)\\b.{0,40}\\b(${repositoryTerms})\\b`).test(normalized)
    || new RegExp(`\\b(tell me about|what are|which are)\\b.{0,30}\\b(your|his|himanshu s)?\\s*(${repositoryTerms})\\b`).test(normalized)
    || /\bwhat\b.{0,30}\b(have you|has he|has himanshu)\b.{0,20}\b(built|made|created)\b/.test(normalized)
    || /\b(show me|tell me about)\b.{0,20}\b(your|his|himanshu s)\b.{0,10}\b(work|builds)\b/.test(normalized)
    || /\bkaunse\b.{0,20}\bprojects?\b/.test(normalized)
  ) {
    return "catalog";
  }

  return "search";
}

function getRepositoryCatalog(intent: Exclude<RepoRagQueryIntent, "search">): RepoRagMatch[] {
  const metadataDocuments = (repoRagIndex as RepoRagDocument[])
    .filter((document) => document.evidenceType === "metadata")
    .sort((left, right) => {
      if (intent !== "recent") {
        const featuredDelta = Number(right.featured) - Number(left.featured);
        if (featuredDelta !== 0) {
          return featuredDelta;
        }

        const priorityDelta = right.priority - left.priority;
        if (priorityDelta !== 0) {
          return priorityDelta;
        }
      }

      return Date.parse(right.updatedAt || "") - Date.parse(left.updatedAt || "");
    });

  return metadataDocuments.map((document, index) => ({
    document,
    score: Number((8 - Math.min(index, 20) * 0.05).toFixed(4)),
    matchedTerms: [intent],
  }));
}

function getExactMatchBoost(document: RepoRagDocument, normalizedQuery: string, queryTerms: string[]): number {
  const repository = normalize(document.repository);
  const repositorySlug = normalize(document.repositorySlug);
  const heading = normalize(document.heading);
  const technologies = document.technologies.map(normalize);
  const topics = document.topics.map(normalize);
  let boost = 0;

  if (repository && (normalizedQuery.includes(repository) || normalizedQuery.includes(repositorySlug))) {
    boost += 15;
  }

  if (repository.split(" ").filter(Boolean).every((term) => queryTerms.includes(term))) {
    boost += 6;
  }

  for (const term of queryTerms) {
    if (heading.split(" ").includes(term)) {
      boost += 3;
    }

    if (technologies.some((technology) => technology === term || technology.split(" ").includes(term))) {
      boost += 5;
    }

    if (topics.some((topic) => topic === term || topic.split(" ").includes(term))) {
      boost += 4;
    }
  }

  if (document.featured) {
    boost += 0.5;
  }

  return boost + Math.min(document.priority, 100) / 100;
}

export function searchRepoRagIndex(message: string, limit = 5): RepoRagMatch[] {
  const documents = repoRagIndex as RepoRagDocument[];
  const intent = getRepoRagQueryIntent(message);

  if (intent !== "search") {
    return getRepositoryCatalog(intent).slice(0, Math.max(1, limit));
  }

  const queryTerms = tokenizeRepoRagQuery(message);

  if (queryTerms.length === 0) {
    return [];
  }

  const tokenizedDocuments = documents.map((document) => {
    const tokens = getDocumentText(document).split(" ").filter(Boolean);
    return { document, tokens };
  });
  const averageDocumentLength = tokenizedDocuments.reduce((total, item) => total + item.tokens.length, 0)
    / Math.max(tokenizedDocuments.length, 1);
  const documentFrequencies = new Map<string, number>();

  for (const term of queryTerms) {
    documentFrequencies.set(
      term,
      tokenizedDocuments.filter(({ tokens }) => tokens.includes(term)).length
    );
  }

  const normalizedQuery = normalize(message);
  return tokenizedDocuments
    .map(({ document, tokens }) => {
      let score = getExactMatchBoost(document, normalizedQuery, queryTerms);
      const matchedTerms: string[] = [];

      for (const term of queryTerms) {
        const termFrequency = countTerm(tokens, term);
        if (termFrequency === 0) {
          continue;
        }

        matchedTerms.push(term);
        const documentFrequency = documentFrequencies.get(term) || 0;
        const inverseDocumentFrequency = Math.log(
          1 + (documents.length - documentFrequency + 0.5) / (documentFrequency + 0.5)
        );
        const lengthNormalization = termFrequency + BM25_K1 * (
          1 - BM25_B + BM25_B * (tokens.length / Math.max(averageDocumentLength, 1))
        );
        score += inverseDocumentFrequency * ((termFrequency * (BM25_K1 + 1)) / lengthNormalization);
      }

      return {
        document,
        score: Number(score.toFixed(4)),
        matchedTerms,
      };
    })
    .filter((match) => match.matchedTerms.length > 0)
    .sort((left, right) => right.score - left.score)
    .slice(0, Math.max(1, limit));
}

export function getRepoRagConfidence(matches: RepoRagMatch[]): RepoRagConfidence {
  const topScore = matches[0]?.score || 0;

  if (topScore >= HIGH_CONFIDENCE_SCORE) {
    return "high";
  }

  if (topScore >= MEDIUM_CONFIDENCE_SCORE) {
    return "medium";
  }

  return "low";
}

export function getRepoRagIndex(): RepoRagDocument[] {
  return repoRagIndex as RepoRagDocument[];
}

export function getRepoRagRepositoryCount(): number {
  return new Set(
    (repoRagIndex as RepoRagDocument[]).map((document) => document.repositorySlug)
  ).size;
}
