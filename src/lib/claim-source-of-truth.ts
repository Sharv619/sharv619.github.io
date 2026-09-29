export const verifiedClaims = {
  profile: {
    headline: "Software Engineer focused on backend systems, production reliability, cloud deployment, and AI-assisted workflow automation.",
    summary: "Himanshu builds practical software systems around backend workflows, production recovery, cloud deployment, and AI-assisted tooling.",
  },
  experience: {
    askJay: {
      title: "Software Engineer",
      duration: "May-Oct 2025",
      summary: "Production recovery, automation, and marketplace engineering for a service marketplace.",
      approvedClaims: [
        "Recovered a production system from ransomware within three weeks of starting the engagement.",
        "Restored 100% of the data with zero loss.",
        "Reduced page load time from 25 seconds to 3 seconds over 30 hours.",
        "Built a shift-booking automation bot and a three-sided Flutter marketplace.",
        "Established CI/CD pipelines, GitHub Actions workflows, and production deployment practices.",
      ],
    },
    acs: {
      title: "Web Developer Intern",
      duration: "Sep 2023-Feb 2024",
      summary: "Frontend performance, security remediation, and internal tooling for a MERN application.",
      approvedClaims: [
        "Improved frontend performance by 33% across a production application serving 200+ active users.",
        "Remediated 15+ OWASP Top 10 web application security vulnerabilities before production release.",
        "Built internal tooling with React, Node.js, Express, and MongoDB.",
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
    askJayPerformance: "25s to 3s",
    askJayDeploymentReduction: "not publicly quantified",
    acsUsers: "200+ active users",
    acsPageLoadReduction: "33% frontend performance improvement",
    acsAuthIssues: "15+ OWASP Top 10 vulnerabilities remediated",
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
