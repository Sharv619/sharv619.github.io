import { verifiedClaims } from "./claim-source-of-truth";

export type ClaimWarningSeverity = "low" | "medium" | "high";

export type ClaimGuardrailWarning = {
  phrase: string;
  severity: ClaimWarningSeverity;
  reason: string;
  suggestedRewrite?: string;
};

export type ClaimGuardrailResult = {
  safe: boolean;
  warnings: ClaimGuardrailWarning[];
};

type GuardrailPattern = {
  pattern: RegExp;
  phrase: string;
  severity: ClaimWarningSeverity;
  reason: string;
  suggestedRewrite?: string;
};

const GUARDRAIL_PATTERNS: GuardrailPattern[] = [
  {
    pattern: /\b(revenue|arr|mrr|profit|sales)\b/i,
    phrase: "revenue/business metric claim",
    severity: "high",
    reason: "Revenue or business outcome claims need explicit evidence before public use.",
  },
  {
    pattern: /\b\d{2,}[,\d]*\+?\s+(users|customers|clients)\b/i,
    phrase: "exact user/customer count",
    severity: "high",
    reason: "Exact user/customer counts must match the approved claim registry.",
  },
  {
    pattern: /\b\d+(\.\d+)?%\s+(uptime|availability)\b/i,
    phrase: "exact uptime claim",
    severity: "high",
    reason: "Uptime claims require operational evidence and are blocked unless explicitly approved.",
    suggestedRewrite: "Describe reliability work without exact uptime percentages.",
  },
  {
    pattern: /\b\d+[,\d]*\+?\s+(downloads|installs)\b/i,
    phrase: "exact download/install count",
    severity: "high",
    reason: "Download counts must be independently verified before public use.",
    suggestedRewrite: verifiedClaims.projects.codeflowHook.approvedClaim,
  },
  {
    pattern: /\bproduction[-\s]ready\b|\bproduction system\b|\bin production\b/i,
    phrase: "production status",
    severity: "medium",
    reason: "Production status must come from the approved claim registry or case-study status.",
  },
  {
    pattern: /\b(security breach|breach|security impact|zero loss|100%\s+(data|service)\s+recovery)\b/i,
    phrase: "security impact claim",
    severity: "high",
    reason: "Security incident details and exact recovery claims must stay NDA-safe and evidence-backed.",
    suggestedRewrite: "Supported production recovery after a security incident while keeping public details NDA-safe.",
  },
  {
    pattern: /\b(ai doctor|clinical assistant|emergency triage|prescription intelligence)\b/i,
    phrase: "unsafe medical positioning",
    severity: "high",
    reason: "Healthcare-adjacent projects must not imply clinical decision-making.",
    suggestedRewrite: verifiedClaims.projects.pilly.approvedClaim,
  },
  {
    pattern: /\b(diagnose|diagnosis|dosage advice|dosage recommendation|take extra|skip dose)\b/i,
    phrase: "medical diagnosis or dosage claim",
    severity: "high",
    reason: "Pilly and related healthcare prototypes must not provide diagnosis or dosage advice.",
    suggestedRewrite: "Not a medical product; no diagnosis or dosage advice.",
  },
  {
    pattern: /\b\d+(\.\d+)?%\s+(faster|improvement|reduction|cost reduction|deployment reduction)\b/i,
    phrase: "exact performance/cost/deployment metric",
    severity: "medium",
    reason: "Exact performance, cost, or deployment metrics must be approved before public use.",
  },
  {
    pattern: /\b(reduced|improved|cut|decreased|lowered|increased)[^.]{0,80}\bby\s+\d+(\.\d+)?%/i,
    phrase: "exact performance/cost/deployment metric",
    severity: "medium",
    reason: "Exact performance, cost, or deployment metrics must be approved before public use.",
  },
  {
    pattern: /\bzero[-\s]downtime\b/i,
    phrase: "zero-downtime",
    severity: "high",
    reason: "Zero-downtime deployment claims are explicitly unsupported.",
  },
  {
    pattern: /\b99\.99%?\b/i,
    phrase: "99.99% uptime",
    severity: "high",
    reason: "99.99% uptime is explicitly unsupported.",
  },
  {
    pattern: /\b10x\b/i,
    phrase: "10x",
    severity: "medium",
    reason: "10x language is inflated and unsupported.",
  },
  {
    pattern: /\bworld[-\s]class\b/i,
    phrase: "world-class",
    severity: "medium",
    reason: "World-class language is inflated and unsupported.",
  },
];

export function evaluateDraftClaims(text: string): ClaimGuardrailResult {
  const normalizedText = text.trim();

  if (!normalizedText) {
    return { safe: true, warnings: [] };
  }

  const warnings = GUARDRAIL_PATTERNS
    .filter((guardrail) => guardrail.pattern.test(normalizedText))
    .filter((guardrail) => !isApprovedUsage(normalizedText, guardrail))
    .map((guardrail) => ({
      phrase: guardrail.phrase,
      severity: guardrail.severity,
      reason: guardrail.reason,
      ...(guardrail.suggestedRewrite ? { suggestedRewrite: guardrail.suggestedRewrite } : {}),
    }));

  return {
    safe: warnings.length === 0,
    warnings,
  };
}

export function getApprovedClaimTexts(): string[] {
  return [
    verifiedClaims.profile.headline,
    verifiedClaims.profile.summary,
    verifiedClaims.experience.askJay.title,
    verifiedClaims.experience.askJay.duration,
    verifiedClaims.experience.askJay.summary,
    ...verifiedClaims.experience.askJay.approvedClaims,
    verifiedClaims.experience.acs.title,
    verifiedClaims.experience.acs.duration,
    verifiedClaims.experience.acs.summary,
    ...verifiedClaims.experience.acs.approvedClaims,
    verifiedClaims.projects.pilly.approvedClaim,
    ...verifiedClaims.projects.pilly.safetyBoundaries,
    verifiedClaims.projects.codeflowHook.approvedClaim,
    verifiedClaims.projects.backPocketOs.approvedClaim,
    verifiedClaims.projects.networkGuardianAi.approvedClaim,
    verifiedClaims.metrics.askJayPerformance,
    verifiedClaims.metrics.acsUsers,
    verifiedClaims.metrics.acsPageLoadReduction,
    verifiedClaims.metrics.acsAuthIssues,
  ];
}

function isApprovedUsage(text: string, guardrail: GuardrailPattern): boolean {
  const lowerText = text.toLowerCase();
  const approvedClaims = getApprovedClaimTexts().map((claim) => claim.toLowerCase());

  if (guardrail.phrase === "medical diagnosis or dosage claim") {
    return [
      "no diagnosis",
      "no dosage advice",
      "not a medical product",
    ].some((safeBoundary) => lowerText.includes(safeBoundary));
  }

  return approvedClaims.some((claim) => claim && lowerText.includes(claim));
}
