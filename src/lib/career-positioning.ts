export interface CareerPositioning {
  headline: string;
  subheadline: string;
  targetRoles: string[];
  proofThemes: Array<{
    title: string;
    description: string;
    projectSlugs: string[];
  }>;
}

export const careerPositioning: CareerPositioning = {
  headline: "Software Engineer focused on backend systems, production reliability, cloud deployment, and AI-assisted workflow automation.",
  subheadline: "I build practical software systems around messy real-world workflows, from production recovery and CI/CD hardening to responsible AI prototypes and developer tooling.",
  targetRoles: [
    "Software Engineer",
    "Full-Stack Developer",
    "Backend Developer",
    "DevOps Engineer",
    "Cloud Engineer",
    "Production Support Engineer",
    "Internal Tools Engineer",
    "AI Workflow Engineer",
    "Technical Product Engineer",
    "Solutions Engineer",
  ],
  proofThemes: [
    {
      title: "Production Recovery & Reliability",
      description: "Restoring services, hardening cloud access, improving performance, and communicating clearly during operational pressure.",
      projectSlugs: ["production-recovery-performance-rebuild"],
    },
    {
      title: "Responsible AI / Human-in-the-Loop Systems",
      description: "Building AI-assisted workflows with explicit safety boundaries, deterministic fallbacks, and operator visibility.",
      projectSlugs: ["pilly-medimate-voice"],
    },
    {
      title: "AI Developer Tooling",
      description: "Using AI to improve engineering workflows through CLI automation, structured review output, and code-quality feedback loops.",
      projectSlugs: ["codeflow-hook"],
    },
    {
      title: "Business Workflow Automation",
      description: "Turning fragmented operational inputs into clearer systems for follow-up, records, and delivery.",
      projectSlugs: ["backpocket-os", "reliboard"],
    },
    {
      title: "Knowledge & Content Systems",
      description: "Organizing writing, project evidence, and retrieval-friendly knowledge into maintainable software surfaces.",
      projectSlugs: ["sharvilak-writes"],
    },
  ],
};
