import syntheticIndex from "@/lib/synthetic-rag-index.json";

export interface SyntheticRagSource {
  id: string;
  section: string;
  title: string;
  url?: string;
}

export interface SyntheticRagEntry {
  id: string;
  title: string;
  type?: "case-study" | "project" | "experience" | "skills" | "philosophy" | string;
  visibility?: "public" | "internal" | string;
  tags: string[];
  questions: string[];
  answer: string;
  sources: SyntheticRagSource[];
  confidence?: string;
  priority: number;
  relatedProjectSlug?: string;
  relatedCaseStudySlug?: string;
}

export interface SyntheticRagMatch {
  entry: SyntheticRagEntry;
  score: number;
}

export type SyntheticRagConfidence = "high" | "medium" | "low";

export interface SyntheticRagResult {
  confidence: SyntheticRagConfidence;
  matches: SyntheticRagMatch[];
  response: string;
  sources: SyntheticRagSource[];
}

const STOP_WORDS = new Set([
  "about",
  "after",
  "again",
  "can",
  "does",
  "give",
  "have",
  "him",
  "his",
  "himanshu",
  "into",
  "like",
  "made",
  "my",
  "tell",
  "that",
  "the",
  "this",
  "what",
  "when",
  "where",
  "which",
  "with",
  "work",
  "you",
]);

export const MAX_SYNTHETIC_RAG_INPUT_LENGTH = 1000;
export const HIGH_CONFIDENCE_THRESHOLD = 12;
export const MEDIUM_CONFIDENCE_THRESHOLD = 5;

export function validateSyntheticRagInput(message: string): { ok: true; message: string } | { ok: false; error: string } {
  const trimmed = message.trim();

  if (!trimmed) {
    return { ok: false, error: "Message is required" };
  }

  if (trimmed.length > MAX_SYNTHETIC_RAG_INPUT_LENGTH) {
    return { ok: false, error: `Message must be ${MAX_SYNTHETIC_RAG_INPUT_LENGTH} characters or fewer` };
  }

  return { ok: true, message: trimmed };
}

export function normalizeSyntheticQuery(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function tokenizeSyntheticQuery(value: string): string[] {
  const normalized = normalizeSyntheticQuery(value);
  const tokens = normalized
    .split(/[\s-]+/)
    .map((token) => token.trim())
    .filter((token) => token.length >= 3 && !STOP_WORDS.has(token));

  return [...new Set(tokens)];
}

export function searchSyntheticRagIndex(message: string, limit = 3): SyntheticRagMatch[] {
  const normalizedQuery = normalizeSyntheticQuery(message);
  const queryTokens = tokenizeSyntheticQuery(message);

  return (syntheticIndex as SyntheticRagEntry[])
    .map((entry) => ({
      entry,
      score: scoreSyntheticRagEntry(entry, normalizedQuery, queryTokens),
    }))
    .filter((match) => match.score > 0)
    .sort((left, right) => {
      if (right.score !== left.score) {
        return right.score - left.score;
      }

      return right.entry.priority - left.entry.priority;
    })
    .slice(0, limit);
}

export function scoreSyntheticRagEntry(entry: SyntheticRagEntry, normalizedQuery: string, queryTokens: string[]): number {
  const normalizedTitle = normalizeSyntheticQuery(entry.title);
  const normalizedQuestions = entry.questions.map(normalizeSyntheticQuery);
  const normalizedTags = entry.tags.map(normalizeSyntheticQuery);
  const normalizedAnswer = normalizeSyntheticQuery(entry.answer);

  let score = 0;
  let evidenceScore = 0;

  if (normalizedTitle && normalizedQuery.includes(normalizedTitle)) {
    evidenceScore += 12;
  }

  for (const question of normalizedQuestions) {
    if (question === normalizedQuery) {
      evidenceScore += 14;
    } else if (question.includes(normalizedQuery) || normalizedQuery.includes(question)) {
      evidenceScore += 8;
    }
  }

  for (const token of queryTokens) {
    if (normalizedTitle.includes(token)) {
      evidenceScore += 5;
    }

    if (normalizedTags.some((tag) => tag === token || tag.includes(token))) {
      evidenceScore += 4;
    }

    if (normalizedQuestions.some((question) => question.includes(token))) {
      evidenceScore += 3;
    }

    if (evidenceScore > 0 && normalizedAnswer.includes(token)) {
      score += 1;
    }
  }

  if (evidenceScore === 0) {
    return 0;
  }

  return score + evidenceScore + Math.min(entry.priority, 10) / 10;
}

export function getSyntheticRagConfidence(matches: SyntheticRagMatch[]): SyntheticRagConfidence {
  const topScore = matches[0]?.score ?? 0;

  if (topScore >= HIGH_CONFIDENCE_THRESHOLD) {
    return "high";
  }

  if (topScore >= MEDIUM_CONFIDENCE_THRESHOLD) {
    return "medium";
  }

  return "low";
}

export function getSyntheticRagResponse(message: string): SyntheticRagResult {
  const validation = validateSyntheticRagInput(message);

  if (!validation.ok) {
    return {
      confidence: "low",
      matches: [],
      response: validation.error,
      sources: [],
    };
  }

  const matches = searchSyntheticRagIndex(validation.message);
  const confidence = getSyntheticRagConfidence(matches);

  if (confidence === "low" || matches.length === 0) {
    return {
      confidence,
      matches,
      response: "I don't have enough portfolio context to answer that safely. Ask me about Himanshu's experience, projects, skills, AWS work, or AI workflow prototypes.",
      sources: [],
    };
  }

  const topEntry = matches[0].entry;

  return {
    confidence,
    matches,
    response: topEntry.answer,
    sources: topEntry.sources,
  };
}

export function getSyntheticRagIndex(): SyntheticRagEntry[] {
  return syntheticIndex as SyntheticRagEntry[];
}
