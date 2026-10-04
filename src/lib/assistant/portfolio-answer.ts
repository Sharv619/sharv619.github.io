import { retrievePortfolioEvidence, type PortfolioRagEvidence } from "@/lib/assistant/portfolio-rag";
import { isLongQuestion } from "@/lib/assistant/response-style";

export interface PortfolioAnswerSource {
  id: string;
  section: string;
  title: string;
  url?: string;
}

export interface PortfolioAnswer {
  response: string;
  sources: PortfolioAnswerSource[];
  confidence: "high" | "medium" | "low";
}

function cleanContent(value: string): string {
  return value
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/\*\*/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function truncateAtBoundary(value: string, limit: number): string {
  const cleaned = cleanContent(value);
  if (cleaned.length <= limit) {
    return cleaned;
  }

  const candidate = cleaned.slice(0, limit + 1);
  const sentenceBoundary = Math.max(
    candidate.lastIndexOf(". "),
    candidate.lastIndexOf("? "),
    candidate.lastIndexOf("! ")
  );
  const wordBoundary = candidate.lastIndexOf(" ");
  const boundary = sentenceBoundary > limit * 0.55 ? sentenceBoundary + 1 : wordBoundary;

  return `${candidate.slice(0, Math.max(boundary, limit - 20)).trim()}...`;
}

function getRepositoryEvidence(evidence: PortfolioRagEvidence[]): PortfolioRagEvidence[] {
  return evidence.filter((item) => item.authority === "repository");
}

function getUniqueRepositories(evidence: PortfolioRagEvidence[]): string[] {
  return [...new Set(getRepositoryEvidence(evidence).map((item) => item.title))];
}

function isRepositoryListQuestion(message: string): boolean {
  return /\b(which|list|show|what)\b.*\b(repo|repos|repositories|projects)\b/i.test(message)
    || /\b(which|what)\b.*\b(use|uses|using|built with)\b/i.test(message);
}

function isBroadTechnologyQuestion(message: string): boolean {
  const terms = message.toLowerCase().match(/[a-z0-9+#.]+/g) || [];
  return terms.length <= 3 && terms.some((term) => [
    "ai",
    "ml",
    "rag",
    "react",
    "python",
    "typescript",
  ].includes(term));
}

function buildSimpleAnswer(message: string, evidence: PortfolioRagEvidence[]): string {
  const isBroadQuestion = isBroadTechnologyQuestion(message);
  const repositories = getUniqueRepositories(evidence);
  const projectLabels = isBroadQuestion
    ? [...new Set(evidence.map((item) => item.title))]
    : repositories;
  if ((isRepositoryListQuestion(message) || isBroadQuestion) && projectLabels.length > 0) {
    const labels = projectLabels.slice(0, 4);
    const list = labels.length === 1
      ? labels[0]
      : `${labels.slice(0, -1).join(", ")} and ${labels.at(-1)}`;
    return `${list} ${labels.length === 1 ? "is the strongest repository match" : "are the strongest repository matches"} in the current public evidence.`;
  }

  return truncateAtBoundary(evidence[0].content, 360);
}

function buildDetailedAnswer(evidence: PortfolioRagEvidence[]): string {
  const primary = evidence[0];
  const repositoryEvidence = getRepositoryEvidence(evidence).slice(0, 2);
  const implementation = repositoryEvidence.length > 0
    ? repositoryEvidence
      .map((item) => `- **${item.title} — ${item.section.replace(/^README:\s*/, "")}**: ${truncateAtBoundary(item.content, 320)}`)
      .join("\n")
    : "- The current public repositories do not provide additional implementation detail for this question.";
  const evidenceSummary = evidence
    .slice(0, 4)
    .map((item) => `- ${item.title} (${item.authority === "verified" ? "verified portfolio evidence" : item.section})`)
    .join("\n");

  return `### Direct answer

${truncateAtBoundary(primary.content, 520)}

### How it works

${implementation}

### Evidence

${evidenceSummary}

### Limits

This answer is limited to the current verified portfolio data and public repository documentation. It does not infer private implementation details or unsupported outcomes.`;
}

function buildSources(evidence: PortfolioRagEvidence[]): PortfolioAnswerSource[] {
  const seen = new Set<string>();
  const sources: PortfolioAnswerSource[] = [];

  for (const item of evidence) {
    const key = item.url || item.id;
    if (seen.has(key)) {
      continue;
    }

    seen.add(key);
    sources.push({
      id: item.id,
      section: item.authority === "repository" ? "GitHub Projects" : item.section,
      title: item.authority === "repository"
        ? `${item.title} — ${item.section.replace(/^README:\s*/, "")}`
        : item.title,
      url: item.url,
    });
  }

  return sources.slice(0, 5);
}

export function getPortfolioAnswer(message: string): PortfolioAnswer {
  const retrieval = retrievePortfolioEvidence(message);

  if (retrieval.confidence === "low" || retrieval.evidence.length === 0) {
    return {
      response: "I couldn't find enough verified portfolio or public repository evidence to answer that reliably. Try asking about a specific project, technology, skill, or role.",
      sources: [],
      confidence: "low",
    };
  }

  return {
    response: isLongQuestion(message)
      ? buildDetailedAnswer(retrieval.evidence)
      : buildSimpleAnswer(message, retrieval.evidence),
    sources: buildSources(retrieval.evidence),
    confidence: retrieval.confidence,
  };
}
