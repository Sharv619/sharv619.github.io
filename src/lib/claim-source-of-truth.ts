export const verifiedClaims = {
  profile: {
    headline: "Software Engineer focused on backend systems, production reliability, cloud deployment, and AI-assisted workflow automation.",
    summary: "Himanshu builds practical software systems around backend workflows, production recovery, cloud deployment, and AI-assisted tooling.",
  },
  experience: {
    askJay: {
      title: "Founding Engineer / Principal Technical Lead",
      duration: "May-Aug 2025",
      summary: "Production recovery and marketplace platform work for a service marketplace.",
      approvedClaims: [
        "Restored production service functionality after a security incident.",
        "Improved load times from roughly 25 seconds to under 3 seconds.",
        "Built Docker and GitHub Actions CI/CD workflows.",
        "Built and deployed 700+ SEO-oriented landing pages.",
        "Deployment time reduction around 90% needs evidence before public use.",
      ],
    },
    acs: {
      title: "Web Developer Intern",
      duration: "Sep 2023-Feb 2024",
      summary: "MERN platform work serving 10,000+ users.",
      approvedClaims: [
        "Improved average page load time by 30%.",
        "Reviewed and resolved 15+ authentication issues using OWASP guidance.",
      ],
    },
  },
  projects: {
    pilly: {
      status: "MVP / prototype",
      approvedClaim: "Firebase-backed responsible-AI medication support prototype with explicit safety boundaries.",
      safetyBoundaries: [
        "Not a medical product.",
        "No diagnosis.",
        "No dosage advice.",
        "Not for real patient data.",
      ],
    },
    codeflowHook: {
      status: "Prototype / published npm package",
      approvedClaim: "Open-source AI-assisted code review CLI published as an npm package with early usage traction.",
    },
    backPocketOs: {
      status: "Prototype / experiment",
      approvedClaim: "AI-assisted admin workflow prototype for exploring small-business operational automation.",
    },
    networkGuardianAi: {
      status: "Prototype",
      approvedClaim: "Explored AI-assisted network traffic analysis and anomaly detection.",
    },
  },
  metrics: {
    askJayPerformance: "roughly 25s to under 3s",
    askJayDeploymentReduction: "needs evidence before public use",
    acsUsers: "10,000+ users",
    acsPageLoadReduction: "30% average page load time reduction",
    acsAuthIssues: "15+ authentication issues reviewed/resolved using OWASP guidance",
    codeflowDownloads: "do not use exact download count unless independently verified",
    networkGuardianCostReduction: "do not use exact cost reduction unless independently verified",
  },
  projectStatuses: {
    production: "Real client/employer system or deployed production work.",
    mvp: "Working demo with meaningful product workflow.",
    prototype: "Early technical proof, not production-ready.",
    experiment: "Exploratory or AI-assisted build with limited verification.",
  },
  unsafeOrUnsupportedClaimsToAvoid: [
    "99.99% uptime",
    "zero-downtime blue-green deployment",
    "world-class",
    "10x",
    "AI genius",
    "wizard",
    "revolutionary",
    "future of decentralized infrastructure",
    "exact npm download counts without source verification",
    "exact Network Guardian API cost reduction without source verification",
  ],
};
