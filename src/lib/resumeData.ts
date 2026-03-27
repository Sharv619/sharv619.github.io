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
  professionalSummary: "Software Engineer with a 'Founding Engineer' mindset, specializing in high-performance infrastructure, AI integration, and system reliability. Proven track record of leading disaster recovery with 100% data restoration, optimizing load times by 88% (25s to 3s), and building open-source AI tools with 450+ downloads.",
  technicalSkills: {
    languages: ["JavaScript (ES6+)", "TypeScript", "Python", "Dart", "SQL"],
    frameworks: ["React.js", "Next.js", "Node.js", "Express.js", "Flutter", "GraphQL", "FastAPI"],
    cloudDevOps: ["AWS (EC2, S3, Lambda, RDS)", "Docker", "GitHub Actions", "CI/CD", "Nginx", "Redis"],
    aiData: ["Gemini API", "RAG Architecture", "Isolation Forests", "Shannon Entropy", "Machine Learning"]
  },
  experience: [
    {
      title: "Software Engineer",
      company: "Ask Jay Services",
      location: "Sydney",
      duration: "May 2025 – Oct 2025",
      achievements: [
        "Led disaster recovery of breached production system, restoring 100% functionality with zero data loss by provisioning new AWS infrastructure and implementing security hardening measures",
        "Achieved 88% performance improvement by reducing load times from 25s to <3s through infrastructure refactoring, backend optimization, and database query optimization",
        "Architected and developed three-sided Flutter marketplace from scratch, owning entire software development lifecycle from authentication to production deployment",
        "Engineered automated CI/CD pipelines using Docker and GitHub Actions, enabling one-command production deployments with zero downtime",
        "Launched 700+ SEO-optimized landing pages to drive regional expansion and organic traffic growth, improving search visibility"
      ]
    },
    {
      title: "Web Developer Intern",
      company: "Australian Computer Society",
      location: "Sydney, Australia",
      duration: "Sep 2023 – Feb 2024",
      achievements: [
        "Improved frontend performance by approximately 33% for MERN stack application serving 200+ active users through React optimization and code splitting",
        "Remediated 15+ high-priority security vulnerabilities based on OWASP Top 10 standards, strengthening application security posture",
        "Collaborated in Agile development sprints with QA engineers and product owners to deliver features on time with high quality standards"
      ]
    }
  ],
  projects: [
    {
      title: "Network Guardian AI",
      description: "AI-Powered Network Threat Detection System",
      techStack: ["Python", "FastAPI", "React", "Scikit-learn", "Gemini API", "Docker", "Machine Learning"],
      achievements: [
        "Built 3-stage machine learning detection pipeline using Shannon Entropy and Isolation Forests to identify and filter malicious network traffic, reducing API costs by approximately 90%",
        "Deployed containerized microservices architecture with Docker Compose and FastAPI for real-time network monitoring and threat analysis"
      ]
    },
    {
      title: "CodeFlow-Hook",
      description: "Multi-Agent AI Code Review Tool (Open Source)",
      techStack: ["Node.js", "TypeScript", "Gemini API", "RAG", "Vector Search", "Docker"],
      achievements: [
        "Designed multi-agent system orchestrating specialized Security and Architecture agents for parallel code analysis and automated code review",
        "Implemented Retrieval-Augmented Generation (RAG) with vector search for context-aware code reviews, achieving 450+ NPM downloads in first month"
      ]
    }
  ],
  education: [
    {
      degree: "Master of Computer Science",
      institution: "University of Wollongong",
      duration: "Sydney, Australia"
    },
    {
      degree: "Bachelor of Engineering in Computer Technology",
      institution: "Nagpur University",
      duration: "Nagpur, India"
    }
  ]
};