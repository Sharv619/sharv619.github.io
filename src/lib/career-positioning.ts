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
  headline: "Full-stack systems and AI engineer building practical automation, reliable software, and local-first tools.",
  subheadline: "The live site is my public evidence layer. Localhost is where small utilities, local models, and infrastructure experiments begin.",
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
      title: "AI-Assisted Security Systems",
      description: "Building explainable network analysis workflows with local heuristics, selective AI escalation, tenant-aware history, and human review.",
      projectSlugs: ["network-guardian-ai"],
    },
    {
      title: "AI Developer Tooling",
      description: "Using AI to improve engineering workflows through CLI automation, structured review output, and code-quality feedback loops.",
      projectSlugs: ["codeflow-hook"],
    },
    {
      title: "Business Workflow Automation",
      description: "Turning fragmented operational inputs into practical systems for follow-up, records, and delivery.",
      projectSlugs: ["backpocket-os", "reliboard"],
    },
    {
      title: "Knowledge & Content Systems",
      description: "Organizing writing, project evidence, and reusable patterns from past builds into maintainable software surfaces.",
      projectSlugs: ["sharvilak-writes"],
    },
  ],
};
