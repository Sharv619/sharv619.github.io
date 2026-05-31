export type EvidenceSignalSource = "github" | "readme" | "repo-files" | "manual" | "unknown";

export type EvidenceConfidence = "high" | "medium" | "low";

export type ProjectMaturity = "production" | "mvp" | "prototype" | "experiment" | "unknown";

export type EvidenceSignal = {
  key: string;
  label: string;
  present: boolean;
  source: EvidenceSignalSource;
  confidence: EvidenceConfidence;
  notes?: string;
};

export type ProjectEvidenceProfile = {
  slug: string;
  repoName: string;
  lastUpdated?: string;
  languages: string[];
  topics: string[];
  signals: EvidenceSignal[];
  maturityScore: number;
  maturity: ProjectMaturity;
  missingEvidence: string[];
  claimWarnings: string[];
};

export const evidenceSignalDefinitions = [
  { key: "readme", label: "README present" },
  { key: "tests", label: "Tests present" },
  { key: "docker", label: "Docker present" },
  { key: "github-actions", label: "GitHub Actions present" },
  { key: "package-manifest", label: "Package manifest present" },
  { key: "python-dependencies", label: "Python dependency file present" },
  { key: "live-demo", label: "Live demo link present" },
  { key: "screenshots", label: "Screenshots present" },
  { key: "docs-folder", label: "Docs folder present" },
  { key: "api-docs", label: "API docs present" },
  { key: "security-safety-docs", label: "Security/safety docs present" },
  { key: "npm-package", label: "npm package evidence present" },
  { key: "deployment-config", label: "Deployment config present" },
  { key: "license", label: "License present" },
  { key: "recent-update", label: "Recent update present" },
] as const;

export type EvidenceSignalKey = typeof evidenceSignalDefinitions[number]["key"];

export function createEvidenceSignal(
  key: EvidenceSignalKey,
  present: boolean,
  source: EvidenceSignalSource,
  confidence: EvidenceConfidence,
  notes?: string
): EvidenceSignal {
  const definition = evidenceSignalDefinitions.find((signal) => signal.key === key);

  return {
    key,
    label: definition?.label || key,
    present,
    source,
    confidence,
    ...(notes ? { notes } : {}),
  };
}

export function getMissingEvidence(signals: EvidenceSignal[]): string[] {
  return signals
    .filter((signal) => !signal.present)
    .map((signal) => signal.label);
}
