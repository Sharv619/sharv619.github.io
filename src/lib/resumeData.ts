import { verifiedClaims } from "./claim-source-of-truth";

export interface ResumeData {
  personalInfo: {
    name: string;
    location: string;
    phone: string;
    email: string;
    linkedin: string;
    github: string;
  };
  professionalSummary: string;
  technicalSkills: {
    languages: string[];
    frameworks: string[];
    cloudDevOps: string[];
    aiData: string[];
  };
  experience: Array<{
    title: string;
    company: string;
    location: string;
    duration: string;
    achievements: string[];
  }>;
  projects: Array<{
    title: string;
    description: string;
    techStack: string[];
    achievements: string[];
  }>;
  education: Array<{
    degree: string;
    institution: string;
    duration: string;
  }>;
}

export const resumeData: ResumeData = {
  personalInfo: {
    name: "HIMANSHU LADE",
    location: "Sydney, Australia",
    phone: "+61 434 069 483",
    email: "himanshulade@hotmail.com",
    linkedin: "linkedin.com/in/himanshu-lade",
    github: "github.com/Sharv619"
  },
  professionalSummary: `${verifiedClaims.profile.headline} Experience includes production recovery, load-time improvement from ${verifiedClaims.metrics.askJayPerformance}, Docker/GitHub Actions CI/CD, and open-source AI-assisted developer tooling.`,
  technicalSkills: {
    languages: ["JavaScript (ES6+)", "TypeScript", "Python", "Dart", "SQL"],
    frameworks: ["React.js", "Next.js", "Node.js", "Express.js", "Flutter", "GraphQL", "FastAPI"],
    cloudDevOps: ["AWS (EC2, S3, Lambda, RDS)", "Docker", "GitHub Actions", "CI/CD", "Nginx", "Redis"],
    aiData: ["Gemini API", "RAG Architecture", "Isolation Forests", "Shannon Entropy", "Machine Learning"]
  },
  experience: [
    {
      title: verifiedClaims.experience.askJay.title,
      company: "Ask Jay Services",
      location: "Wollongong",
      duration: verifiedClaims.experience.askJay.duration,
      achievements: [
        "Supported production recovery after a security incident, restoring service functionality while keeping public details NDA-safe",
        "Improved load times from roughly 25s to under 3s through infrastructure, backend, frontend, and database-path optimization",
        "Built marketplace and course-management platform features across frontend and backend workflows",
        "Created Docker and GitHub Actions CI/CD workflows to make deployments more repeatable",
        "Built and deployed 700+ SEO-oriented landing pages while working across production recovery, platform features, and deployment workflows as a multi-hat engineering contributor"
      ]
    },
    {
      title: "Web Developer Intern",
      company: "Australian Computer Society",
      location: "Sydney, Australia",
      duration: "Sep 2023 – Feb 2024",
      achievements: [
        "Improved average page load time by 30% for MERN stack application serving 10,000+ users through React optimization and code splitting",
        "Reviewed and resolved 15+ authentication issues using OWASP guidance, strengthening application security posture",
        "Collaborated in Agile development sprints with QA engineers and product owners to deliver features on time with high quality standards"
      ]
    }
  ],
  projects: [
    {
      title: "Network Guardian AI",
      description: "AI-assisted network traffic analysis prototype",
      techStack: ["Python", "FastAPI", "React", "Scikit-learn", "Gemini API", "Docker", "Machine Learning"],
      achievements: [
        "Explored AI-assisted network traffic analysis and anomaly detection using Shannon Entropy and Isolation Forests",
        "Built containerized prototype services with Docker Compose and FastAPI for network monitoring and threat-summary workflows"
      ]
    },
    {
      title: "CodeFlow-Hook",
      description: "Multi-Agent AI Code Review Tool (Open Source)",
      techStack: ["Node.js", "TypeScript", "Gemini API", "RAG", "Vector Search", "Docker"],
      achievements: [
        "Designed multi-agent system orchestrating specialized Security and Architecture agents for parallel code analysis and automated code review",
        "Published an npm package for AI-assisted code review workflows with early usage traction"
      ]
    }
  ],
  education: [
    {
      degree: "Master of Computer Science",
      institution: "University of Wollongong",
      duration: "Wollongong, Australia"
    },
    {
      degree: "Bachelor of Engineering in Computer Technology",
      institution: "Nagpur University",
      duration: "Nagpur, India"
    }
  ]
};
