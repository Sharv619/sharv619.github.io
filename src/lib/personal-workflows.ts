export interface PersonalAutomationWorkflow {
  title: string;
  label: string;
  description: string;
  technologies: string[];
  detail: string;
  projectSlug?: string;
  caseFile?: PersonalWorkflowCaseFile;
}

export interface PersonalWorkflowCaseFile {
  secondarySignal: string;
  solution: string;
  role: string;
  impact: string[];
  technicalHighlights: string[];
  proof: string[];
  constraints: string[];
  limitations: string[];
  roadmap: string[];
}

export const personalAutomationWorkflows: PersonalAutomationWorkflow[] = [
  {
    title: "Linux Headset Call Fix",
    label: "Small tool, daily use",
    description: "Audio calls were forcing my headset into a degraded call mode, making the microphone so quiet that I had to shout to be heard.",
    technologies: ["Bash", "Linux", "Audio routing", "Headset profiles"],
    detail: "Four Bash commands reset the headset's audio and microphone state, restoring normal call volume without another application.",
  },
  {
    title: "Telegram AI Agent Harness",
    label: "AI agent from anywhere",
    description: "After enough homelab experiments and builds, remembering what I had already made—and where—became its own source of friction.",
    technologies: ["Telegram Bot", "Local AI models", "Homelab", "Python"],
    detail: "A Telegram bot connects my phone to local AI models running in my homelab, letting me search, research, and recall past project work so I can keep developing away from my desk.",
  },
  {
    title: "Termux + Tailscale SSH Path",
    label: "Personal infrastructure",
    description: "Termux gives me the remote terminal, while SSH reaches my main laptop through its private Tailscale network.",
    technologies: ["Termux", "Tailscale", "SSH", "Private network"],
    detail: "Termux → SSH over Tailscale → main laptop terminal → local Python utility.",
  },
  {
    title: "Screenshot Flutter ML",
    label: "Small tool, daily use",
    description: "A Flutter app that uses on-device ML to process screenshots for text extraction or UI element detection.",
    technologies: ["Flutter", "Dart", "TensorFlow Lite", "ML Kit"],
    detail: "Built to quickly extract information from screenshots without sending data to the cloud, keeping processing local and private.",
    caseFile: {
      secondarySignal: "Demonstrates small-tool, daily-use workflow design rather than a one-off chat prompt.",
      solution: "Built a small, daily-use Flutter tool that extracts information from screenshots locally without sending data to the cloud.",
      role: "Personal tool builder · Infrastructure minimalist · Workflow interruption eliminator",
      impact: [
        "Built to quickly extract information from screenshots without sending data to the cloud, keeping processing local and private.",
        "Demonstrates small-tool, daily-use workflow design rather than a one-off chat prompt.",
        "Creates a foundation for local, privacy-oriented automation.",
      ],
      technicalHighlights: [
        "Flutter implementation for a small, daily-use workflow",
      ],
      proof: [
        "Personal workflows repository",
        "Live usage across devices",
        "Portfolio and resume project alignment",
      ],
      constraints: [
        "Automation output should support human judgment, not replace manual control.",
        "Screenshots should remain on-device unless the user explicitly chooses otherwise.",
        "Extraction should be transparent, user-initiated, and reversible.",
      ],
      limitations: [
        "Prototype-stage personal tooling, not a replacement for full-featured OCR or accessibility applications.",
        "Results depend on screenshot quality and on-device model support.",
      ],
      roadmap: [
        "Add richer local-only mode documentation.",
        "Add structured extraction examples.",
        "Compare on-device OCR and UI-element detection approaches.",
      ],
    },
  },
  {
    title: "Stock Price Alerts",
    label: "Small tool, daily use",
    description: "A simple script that checks stock prices and sends alerts when thresholds are crossed.",
    technologies: ["Python", "Requests", "Twilio"],
    detail: "Runs periodically to monitor watchlist and sends SMS notifications via Twilio when price moves beyond set limits.",
    projectSlug: "stock-price-alerts",
  },
  {
    title: "Reli Board",
    label: "Project management tool",
    description: "A lightweight kanban board for personal task management with JWT auth and Docker containerization.",
    technologies: ["React", "Node.js", "MongoDB", "JWT", "Docker"],
    detail: "Provides a simple interface for tracking tasks and projects, used for daily workflow organization.",
  },
  {
    title: "RAG Practice",
    label: "Learning experiment",
    description: "A small project to practice Retrieval-Augmented Generation techniques with local vector storage.",
    technologies: ["Python", "FAISS", "Sentence Transformers"],
    detail: "Experimented with chunking, embedding, and retrieval to build a context-aware Q&A system over personal notes.",
  },
  {
    title: "Localhost Playground",
    label: "Experimental sandbox",
    description: "A temporary repo for testing new ideas, configurations, or code snippets before integrating elsewhere.",
    technologies: ["Various"],
    detail: "Used as a safe space to try out new libraries, frameworks, or architectural patterns without affecting main projects.",
  },
];

export function getPersonalWorkflowSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/\+/g, "plus")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function getPersonalAutomationWorkflow(slug: string): PersonalAutomationWorkflow | undefined {
  return personalAutomationWorkflows.find(
    (workflow) => getPersonalWorkflowSlug(workflow.title) === slug
  );
}

export function getPersonalWorkflowHref(workflow: PersonalAutomationWorkflow): string {
  return workflow.projectSlug
    ? `/projects/${workflow.projectSlug}/`
    : `/workflows/${getPersonalWorkflowSlug(workflow.title)}/`;
}
