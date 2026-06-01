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
    githubOffline?: string;
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
      "Post-discharge medication support workflow",
    ],
    techStack: ["Firebase", "Firestore", "Cloud Functions", "TypeScript", "Gemini API", "Responsible AI"],
    role: [
      "MVP product engineer",
      "Responsible-AI workflow designer",
      "Firebase backend implementer",
    ],
    proof: [
      "12-hour Google AI hackathon MVP context",
      "Public repo metadata and README notes",
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
      "Specialized review agents for security, architecture, and quality checks",
      "Structured output suitable for automation",
      "RAG/vector context experiments where repository context is available",
      "Multi-provider AI integration experiments",
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
  {
    slug: "backpocket-os",
    title: "BackPocket OS",
    category: "AI Workflow Automation",
    status: "prototype",
    priority: 4,
    oneLiner: "AI-assisted admin workflow prototype that turns messy small-business emails, quote requests, documents, and follow-ups into structured operational tasks with human review built in.",
    problem: "Small-business admin work often arrives as unstructured email threads, documents, quote requests, and follow-ups, making it easy for important actions to get missed or handled inconsistently.",
    solution: "Designed a workflow prototype that frames messy inputs as structured operational records, explores RAG-assisted context retrieval, and keeps human review visible before actions become business decisions.",
    impact: [
      "Tested how AI can reduce repetitive admin work while keeping a person in control of final actions.",
      "Defined a clearer path from messy inbox/document inputs to structured follow-up tasks.",
      "Kept privacy, review, and local-first constraints visible in the workflow design.",
    ],
    technicalHighlights: [
      "Messy-input to structured-workflow modeling",
      "RAG experiments for retrieving business context",
      "Gmail and Google Drive integration planning",
      "Operator review points before external action",
      "Local-first workflow constraints",
      "Small-business admin automation domain modeling",
    ],
    techStack: ["Python", "FastAPI", "RAG", "Google APIs", "Automation", "Local-first"],
    role: [
      "Prototype product engineer",
      "Workflow automation designer",
      "AI-assisted operations system designer",
    ],
    proof: [
      "Portfolio positioning and repo-audit source of truth",
      "Public GitHub repositories for online and offline prototype versions",
      "Explicit prototype status and limitations",
    ],
    links: {
      github: "https://github.com/Sharv619/backpocket-os-ai",
      githubOffline: "https://github.com/Sharv619/backpocket-os-ai-offline",
    },
    constraints: [
      "Not production SaaS yet; it needs verified real workflow usage before being described that way.",
      "External actions need explicit operator approval and clear auditability.",
      "Business data privacy and integration permissions must stay central to the design.",
    ],
    limitations: [
      "Prototype / experiment, not a verified production operations platform.",
      "Needs clearer demo evidence, screenshots, and integration walkthroughs before being treated as flagship production work.",
      "Automation quality depends on source data quality, permission boundaries, and human review.",
    ],
    roadmap: [
      "Add a walkthrough showing messy email or document input becoming a structured task.",
      "Add screenshots or a recorded demo of the operator review flow.",
      "Document privacy boundaries, supported integrations, and non-goals.",
    ],
  },
  {
    slug: "network-guardian-ai",
    title: "Network Guardian AI",
    category: "AI-Assisted Security Prototype",
    status: "prototype",
    priority: 5,
    oneLiner: "AdGuard-connected network security prototype that polls DNS traffic, runs local heuristics before AI escalation, stores tenant-aware analysis history, and exposes the results through a FastAPI + React dashboard.",
    problem: "AdGuard can block domains, but the raw query log does not explain what happened, why a domain looks suspicious, or how patterns change over time. I wanted a system that made DNS activity easier to review without sending every domain straight to an LLM.",
    solution: "Built a FastAPI service around an AdGuard poller, SQLite-backed domain history, tenant middleware, JWT/API-key authentication, local entropy and anomaly scoring, optional Gemini/Ollama analysis, websocket updates, and a React dashboard for manual scans, stats, usage, and threat review.",
    impact: [
      "Moved from passive DNS blocking toward an explainable review workflow with domain history, risk categories, summaries, and anomaly fields.",
      "Reduced unnecessary AI calls by checking cache, metadata patterns, entropy features, and Isolation Forest scores before cloud analysis.",
      "Built product-grade surfaces around the prototype: auth, tenant context, developer/API routes, usage screens, billing routes, and a 12-panel dashboard.",
    ],
    technicalHighlights: [
      "AdGuard query-log polling with deduplication and configurable polling interval",
      "Five-tier analysis path: cache, metadata classifier, ML heuristics, Isolation Forest, AI escalation",
      "FastAPI routes for health, domain analysis, history, manual history, chat, stats, auth, tenants, alerts, and developer APIs",
      "JWT sessions, API keys, RBAC roles, rate limiting, CORS, and security headers documented in the auth guide",
      "SQLite domain persistence with tenant-aware repository access and migration files",
      "React/TypeScript dashboard with stats, admin, usage, pricing, tenant selection, and manual analysis components",
      "Docker Compose setup for Network Guardian plus AdGuard Home",
      "Pytest suite covering heuristics, anomaly engine, auth, websocket, repository, cache, validation, alerting, and integrations",
    ],
    techStack: ["Python", "FastAPI", "React", "TypeScript", "SQLite", "AdGuard Home", "Docker", "Scikit-learn", "Gemini API"],
    role: [
      "Full-stack prototype builder",
      "Backend/API and analysis-pipeline implementer",
      "Security dashboard and tenant workflow designer",
    ],
    proof: [
      "README documents AdGuard interception, multi-layer analysis, tenant management, billing routes, developer API, and dashboard components",
      "Architecture docs describe the AdGuard → FastAPI → cache/heuristics/anomaly/AI → React dashboard data flow",
      "Authentication docs cover JWT, API keys, RBAC roles, rate limiting, CORS, and production hardening checklist",
      "Sample data docs show domain analysis records with risk score, category, entropy, anomaly score, AdGuard metadata, and analysis source",
      "Repository includes backend routes, tenant middleware, database models, Docker Compose, React components, and Tests_AI pytest coverage",
    ],
    links: {
      github: "https://github.com/Sharv619/network-guardian-ai",
    },
    constraints: [
      "Security results are review signals, not final incident-response decisions.",
      "Default credentials and demo settings must be replaced before any real deployment.",
      "AdGuard, Gemini/Ollama, Google Sheets, Stripe, and tenant settings depend on environment configuration.",
    ],
    limitations: [
      "The repo reads like an ambitious prototype and needs clearer deployment evidence before being described as a live commercial SaaS.",
      "Detection quality depends on traffic samples, feature choices, threshold tuning, and validation against realistic network data.",
      "Some docs mention target metrics and commercial-readiness language; public claims should stick to implemented architecture and repo evidence.",
    ],
    roadmap: [
      "Add a short demo video showing AdGuard logs becoming dashboard analysis records.",
      "Add screenshots for the stats dashboard, manual analysis flow, tenant selector, and auth screens.",
      "Add a README section that separates implemented features from future SaaS/billing goals.",
    ],
  },
];

export function getFlagshipCaseStudy(slug: string): FlagshipCaseStudy | undefined {
  return flagshipCaseStudies.find((caseStudy) => caseStudy.slug === slug);
}

export function getOrderedFlagshipCaseStudies(): FlagshipCaseStudy[] {
  return [...flagshipCaseStudies].sort((left, right) => left.priority - right.priority);
}
