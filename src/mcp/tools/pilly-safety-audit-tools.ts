import { findReferences } from "../shared/search-utils";
import { pathExists, readTextFile } from "../shared/fs-utils";

const REQUIRED_DOCS = [
  "PRD.md",
  "TDD.md",
  "WORKFLOWS.md",
  "TASKS_V2.md",
  "SAFETY_BOUNDARIES.md",
  "BUSINESS_DIRECTION.md",
  "README.md",
];

const EXPECTED_FUNCTIONS = [
  "classifyMedicationResponse",
  "recordMedicationResponse",
  "completeRoutineEvent",
  "simulateLeavingHome",
  "generateReminderCopy",
  "generateMissedDoseAlert",
  "processScriptUpload",
  "seedDemoData",
];

const UNSAFE_PHRASES = [
  "AI doctor",
  "diagnose",
  "dosage recommendation",
  "take extra",
  "skip dose",
  "clinical assistant",
  "emergency triage",
  "prescription intelligence",
];

export function auditPillyDocsTool() {
  const requiredDocs = Object.fromEntries(REQUIRED_DOCS.map((doc) => [doc, pathExists(doc)]));
  const typosFound = ["WORFLOWs.md"].filter((path) => pathExists(path));
  const missingDocs = REQUIRED_DOCS.filter((doc) => !pathExists(doc));

  return {
    requiredDocs,
    typosFound,
    missingDocs,
    recommendations: [
      ...(missingDocs.length > 0 ? ["Add missing Pilly planning/safety docs or run this tool from the Pilly repo root."] : []),
      ...(typosFound.length > 0 ? ["Rename WORFLOWs.md to WORKFLOWS.md."] : []),
    ],
  };
}

export function auditMedicalSafetyClaimsTool() {
  const unsafeClaims = UNSAFE_PHRASES.flatMap((phrase) =>
    findReferences(phrase, "text").map((match) => ({
      phrase,
      file: match.path,
      line: match.line,
      text: match.text,
    }))
  );
  const safetyMatches = [
    ...findReferences("not medical advice", "text"),
    ...findReferences("no diagnosis", "text"),
    ...findReferences("no dosage", "text"),
  ];

  return {
    unsafeClaims,
    safeBoundaryPresent: safetyMatches.length > 0,
    recommendations: [
      ...(unsafeClaims.length > 0 ? ["Review unsafe medical wording and replace it with reminder/support language."] : []),
      ...(safetyMatches.length === 0 ? ["Add explicit safety boundaries: no diagnosis, no dosage advice, no medical decision-making."] : []),
    ],
  };
}

export function auditCloudFunctionsContractsTool() {
  const source = readKnownSource();
  const functionsFound = EXPECTED_FUNCTIONS.filter((name) => source.includes(name));
  const functionsMissing = EXPECTED_FUNCTIONS.filter((name) => !source.includes(name));
  const testSource = readKnownTests();

  return {
    functionsFound,
    functionsMissing,
    testCoverageLikely: functionsFound.filter((name) => testSource.includes(name)),
    risks: functionsMissing.length > 0 ? ["Expected Cloud Functions were not found. This may be the wrong repo or the functions use different names."] : [],
    recommendations: functionsMissing.length > 0 ? ["Run this audit from the Pilly repo root or align function exports with the expected workflow contract."] : [],
  };
}

export function auditPillyTestsTool() {
  const testSource = readKnownTests().toLowerCase();
  const coverageAreas = {
    geminiFallbackWithoutApiKey: includesAny(testSource, ["fallback", "api key", "gemini"]),
    urgentPhraseStaticSafetyGuidance: includesAny(testSource, ["urgent", "emergency", "static safety"]),
    recordMedicationResponseLogWrites: includesAny(testSource, ["recordmedicationresponse", "log"]),
    refusalNotification: includesAny(testSource, ["refusal", "refused"]),
    helpRequestNotification: includesAny(testSource, ["help-request", "help request"]),
    missedDoseEventCompletion: includesAny(testSource, ["missed-dose", "missed dose", "complete"]),
    noDuplicateMissedDoseAlerts: includesAny(testSource, ["duplicate", "missed"]),
    leavingHomeNotification: includesAny(testSource, ["leaving home", "simulateleavinghome"]),
    seedDemoData: includesAny(testSource, ["seeddemodata", "seed demo"]),
  };
  const missingTests = Object.entries(coverageAreas)
    .filter(([, covered]) => !covered)
    .map(([area]) => area);

  return {
    coverageAreas,
    missingTests,
    recommendations: missingTests.length > 0 ? ["Add focused tests for missing medication workflow and safety coverage areas."] : [],
  };
}

function readKnownSource(): string {
  return [
    "functions/src/index.ts",
    "src/functions/index.ts",
    "src/index.ts",
    "functions/index.ts",
  ].map(safeRead).join("\n");
}

function readKnownTests(): string {
  return [
    "functions/src/index.test.ts",
    "functions/test/index.test.ts",
    "tests/functions.test.ts",
    "tests/pilly.test.ts",
    "src/__tests__/functions.test.ts",
  ].map(safeRead).join("\n");
}

function safeRead(path: string): string {
  try {
    return pathExists(path) ? readTextFile(path) : "";
  } catch {
    return "";
  }
}

function includesAny(content: string, terms: string[]): boolean {
  return terms.some((term) => content.includes(term));
}
