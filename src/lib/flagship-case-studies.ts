export type CaseStudyStatus = "production" | "mvp" | "prototype" | "case-study";

export interface FlagshipCaseStudy {
  slug: string;
  title: string;
  category: string;
  status: CaseStudyStatus;
  priority: number;
  oneLiner: string;
  problem: string;
  solution: string;
  impact: string[];
  technicalHighlights: string[];
  techStack: string[];
  role: string[];
  proof: string[];
  links?: {
    demo?: string;
    github?: string;
    npm?: string;
    caseStudy?: string;
  };
  constraints: string[];
  limitations: string[];
  roadmap?: string[];
}

export const flagshipCaseStudies: FlagshipCaseStudy[] = [
  {
    slug: "production-recovery-performance-rebuild",
    title: "Production Recovery & Performance Rebuild",
    category: "Production & Infrastructure",
    status: "case-study",
    priority: 1,
    oneLiner: "NDA-safe production recovery case study covering infrastructure restoration, database hardening, CI/CD setup, and performance optimization for a service marketplace.",
    problem: "A production service marketplace needed recovery after a security incident, safer access boundaries, and performance improvements without exposing internal client details.",
    solution: "Restored service functionality, rebuilt safer cloud access patterns, hardened database access, rotated credentials, introduced Docker and GitHub Actions deployment workflows, and tuned the application path that was causing slow page loads.",
    impact: [
      "Restored production service functionality after a security incident.",
      "Reduced load times from roughly 25 seconds to under 3 seconds.",
      "Moved deployment work toward repeatable Docker and GitHub Actions workflows.",
    ],
    technicalHighlights: [
      "AWS infrastructure restoration and access hardening",
      "MongoDB Atlas migration and safer network access controls",
      "Credential rotation and IP restriction boundaries",
      "Dockerized deployment path with GitHub Actions CI/CD",
      "Performance profiling across frontend, backend, and database query paths",
      "Non-technical incident communication for stakeholders",
    ],
    techStack: ["AWS", "MongoDB Atlas", "Docker", "GitHub Actions", "Node.js", "React", "CI/CD"],
    role: [
      "Incident recovery lead",
      "Infrastructure and deployment owner",
      "Performance optimization contributor",
      "Stakeholder communication support",
    ],
    proof: [
      "Ask Jay Services contract experience",
      "Resume-aligned production recovery and performance claims",
      "NDA-safe public case study only",
    ],
    constraints: [
      "No private client screenshots, credentials, database names, or proprietary workflows are published.",
      "Security incident details are intentionally summarized at a high level.",
      "Claims are limited to externally safe operational outcomes.",
    ],
    limitations: [
      "This case study is intentionally sanitized and does not include internal architecture diagrams.",
      "Some implementation details cannot be public because they relate to client operations and security posture.",
    ],
    roadmap: [
      "Add a generic incident-response diagram that avoids client-specific topology.",
      "Add a public runbook template for production recovery workflows.",
    ],
  },
  {
    slug: "pilly-medimate-voice",
    title: "Pilly / MediMate Voice",
    category: "Responsible AI / Firebase MVP",
    status: "mvp",
    priority: 2,
    oneLiner: "Firebase-backed responsible-AI medication support MVP helping seniors respond to event-based reminders while caregivers see missed-dose, refusal, snooze, and help-request visibility.",
    problem: "Seniors and caregivers need lightweight post-discharge medication support that can handle simple reminder responses without turning an AI prototype into a medical decision-maker.",
    solution: "Built a 12-hour Google AI hackathon MVP with Firestore-backed medication logs, Cloud Function-first workflows, Gemini response classification, deterministic fallback handling, and a Trusted Family Voice Reminder boundary.",
    impact: [
      "Demonstrated event-based reminder flows for seniors and caregiver visibility.",
      "Separated AI response classification from medical advice or dosage decisions.",
      "Created a Firebase MVP shape that can be tested and extended without a custom backend first.",
    ],
    technicalHighlights: [
      "Firestore medication logs and response records",
      "Cloud Function-first workflow orchestration",
      "Gemini response classification with deterministic fallback",
      "Missed-dose, refusal, snooze, and help-request event visibility",
      "Trusted Family Voice Reminder boundary",
      "Post-discharge medication support framing",
    ],
    techStack: ["Firebase", "Firestore", "Cloud Functions", "TypeScript", "Gemini API", "Responsible AI"],
    role: [
      "MVP product engineer",
      "Responsible-AI workflow designer",
      "Firebase backend implementer",
    ],
    proof: [
      "12-hour Google AI hackathon MVP context",
      "Public repo metadata and README direction",
      "Explicit safety boundary requirements",
    ],
    constraints: [
      "No diagnosis, dosage advice, or medical decision-making.",
      "Urgent or ambiguous responses must route to static safety guidance or caregiver visibility.",
      "AI classification is assistive and must have deterministic fallback behavior.",
    ],
    limitations: [
      "Prototype only and not a medical device.",
      "Requires clinical, caregiver, privacy, and accessibility review before real-world use.",
      "Does not replace pharmacists, clinicians, emergency services, or prescribed care plans.",
    ],
    roadmap: [
      "Add SAFETY_BOUNDARIES.md to the repo if missing.",
      "Add tests for fallback classification, urgent phrases, refusal, help requests, and missed-dose alerts.",
      "Add a short demo video showing the caregiver visibility flow.",
    ],
  },
  {
    slug: "codeflow-hook",
    title: "codeflow-hook",
    category: "AI Developer Tooling",
    status: "prototype",
    priority: 3,
    oneLiner: "Open-source AI code review CLI that runs pre-commit checks using specialized review agents for security, architecture, and quality feedback.",
    problem: "Developers need fast review feedback before commits, but generic AI chat workflows are hard to automate and easy to separate from the actual git workflow.",
    solution: "Built a CLI-oriented pre-commit workflow that can run AI-assisted review passes, structure feedback for automation, and frame review agents around security, architecture, and code quality concerns.",
    impact: [
      "Published as a public npm package and GitHub repo.",
      "Demonstrates AI-assisted engineering workflow design rather than a one-off chat prompt.",
      "Creates a foundation for local, privacy-oriented code review automation.",
    ],
    technicalHighlights: [
      "Git pre-commit hook workflow",
      "CLI-first developer experience",
      "Specialized review-agent framing",
      "Structured output suitable for automation",
      "RAG/vector context direction where repository context is available",
      "Multi-provider AI integration direction",
    ],
    techStack: ["Node.js", "TypeScript", "Git Hooks", "CLI", "Gemini API", "RAG", "npm"],
    role: [
      "Open-source tool author",
      "CLI workflow designer",
      "AI-assisted review system implementer",
    ],
    proof: [
      "Public npm package",
      "Public GitHub repository",
      "Portfolio and resume project alignment",
    ],
    links: {
      github: "https://github.com/Sharv619/codeflow-hook",
      npm: "https://www.npmjs.com/package/codeflow-hook",
    },
    constraints: [
      "AI review output should support human judgment, not replace code ownership.",
      "Secrets and private code should not be sent to providers without explicit user configuration.",
      "Automated checks should be transparent and reversible in developer workflows.",
    ],
    limitations: [
      "Prototype-stage developer tooling, not a replacement for CI, tests, or human review.",
      "Quality depends on repository context, provider availability, and prompt configuration.",
    ],
    roadmap: [
      "Add richer local-only mode documentation.",
      "Add examples for structured JSON output in CI.",
      "Add comparison docs for security, architecture, and quality review agents.",
    ],
  },
];

export function getFlagshipCaseStudy(slug: string): FlagshipCaseStudy | undefined {
  return flagshipCaseStudies.find((caseStudy) => caseStudy.slug === slug);
}

export function getOrderedFlagshipCaseStudies(): FlagshipCaseStudy[] {
  return [...flagshipCaseStudies].sort((left, right) => left.priority - right.priority);
}
