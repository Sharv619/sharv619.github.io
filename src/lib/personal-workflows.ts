export interface PersonalAutomationWorkflow {
  title: string;
  label: string;
  description: string;
  technologies: string[];
  detail: string;
}

export const personalAutomationWorkflows: PersonalAutomationWorkflow[] = [
  {
    title: "Headphone Step Control",
    label: "Small tool, daily use",
    description: "A few lines of Python turn a repeated headphone adjustment into a direct -1 / +1 command.",
    technologies: ["Python", "-1 / +1", "Local automation"],
    detail: "The script stays deliberately small because the repeated action did not need another full application.",
  },
  {
    title: "Telegram Command Bridge",
    label: "Chat as the interface",
    description: "A Telegram bot exposes the command through a familiar chat window instead of adding another dashboard.",
    technologies: ["Telegram Bot", "Python", "Commands"],
    detail: "The bot translates a small command into the local action and keeps the interface lightweight.",
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
  },
  {
    title: "Stock Price Alerts",
    label: "Small tool, daily use",
    description: "A simple script that checks stock prices and sends alerts when thresholds are crossed.",
    technologies: ["Python", "Requests", "Twilio"],
    detail: "Runs periodically to monitor watchlist and sends SMS notifications via Twilio when price moves beyond set limits.",
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