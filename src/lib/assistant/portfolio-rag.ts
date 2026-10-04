import {
  getRepoRagConfidence,
  searchRepoRagIndex,
  type RepoRagConfidence,
} from "@/lib/assistant/repo-rag";
import {
  getSyntheticRagConfidence,
  searchSyntheticRagIndex,
  type SyntheticRagConfidence,
} from "@/lib/assistant/synthetic-rag";

export interface PortfolioRagEvidence {
  id: string;
  title: string;
  section: string;
  content: string;
  url?: string;
  score: number;
  authority: "verified" | "repository";
  evidenceType: "curated" | "metadata" | "readme";
  repositorySlug?: string;
}

export interface PortfolioRagRetrieval {
  evidence: PortfolioRagEvidence[];
  confidence: "high" | "medium" | "low";
  curatedConfidence: SyntheticRagConfidence;
  repositoryConfidence: RepoRagConfidence;
}

const VERIFIED_AUTHORITY_BOOST = 5;

function confidenceRank(confidence: PortfolioRagRetrieval["confidence"]): number {
  if (confidence === "high") {
    return 3;
  }

  if (confidence === "medium") {
    return 2;
  }

  return 1;
}

function mergeConfidence(
  curatedConfidence: SyntheticRagConfidence,
  repositoryConfidence: RepoRagConfidence
): PortfolioRagRetrieval["confidence"] {
  return confidenceRank(curatedConfidence) >= confidenceRank(repositoryConfidence)
    ? curatedConfidence
    : repositoryConfidence;
}

function deduplicateEvidence(evidence: PortfolioRagEvidence[]): PortfolioRagEvidence[] {
  const seenIds = new Set<string>();
  const seenContent = new Set<string>();

  return evidence.filter((item) => {
    const contentKey = item.content.toLowerCase().replace(/\s+/g, " ").trim();
    if (seenIds.has(item.id) || seenContent.has(contentKey)) {
      return false;
    }

    seenIds.add(item.id);
    seenContent.add(contentKey);
    return true;
  });
}

export function retrievePortfolioEvidence(message: string, limit = 6): PortfolioRagRetrieval {
  const curatedMatches = searchSyntheticRagIndex(message, 3);
  const repositoryMatches = searchRepoRagIndex(message, 5);
  const curatedConfidence = getSyntheticRagConfidence(curatedMatches);
  const repositoryConfidence = getRepoRagConfidence(repositoryMatches);

  const curatedEvidence: PortfolioRagEvidence[] = curatedMatches.map((match) => {
    const primarySource = match.entry.sources[0];
    return {
      id: `curated-${match.entry.id}`,
      title: match.entry.title,
      section: primarySource?.section || "Curated Portfolio",
      content: match.entry.answer,
      url: primarySource?.url,
      score: match.score + VERIFIED_AUTHORITY_BOOST,
      authority: "verified",
      evidenceType: "curated",
      repositorySlug: match.entry.relatedProjectSlug,
    };
  });

  const repositoryEvidence: PortfolioRagEvidence[] = repositoryMatches.map((match) => ({
    id: `repository-${match.document.id}`,
    title: match.document.repository,
    section: match.document.evidenceType === "readme" ? `README: ${match.document.heading}` : "GitHub Repository",
    content: match.document.content,
    url: match.document.sourceUrl,
    score: match.score,
    authority: "repository",
    evidenceType: match.document.evidenceType,
    repositorySlug: match.document.repositorySlug,
  }));

  const evidence = deduplicateEvidence([...curatedEvidence, ...repositoryEvidence])
    .sort((left, right) => {
      if (right.score !== left.score) {
        return right.score - left.score;
      }

      return left.authority === "verified" ? -1 : 1;
    })
    .slice(0, Math.max(1, limit));

  return {
    evidence,
    confidence: mergeConfidence(curatedConfidence, repositoryConfidence),
    curatedConfidence,
    repositoryConfidence,
  };
}
