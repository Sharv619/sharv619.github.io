export const personalInfo = {
  name: "Himanshu Lade",
  title: "Full-Stack Engineer & AI/ML Specialist",
  email: "himanshulade@hotmail.com",
  location: "Sydney, Australia",
  bio: "I'm a tech nerd who automates everything with n8n workflows and runs Ollama locally for AI experimentation. I architect solutions that scale, perform, and leverage cutting-edge AI. From rescuing mission-critical databases to engineering AI-powered solutions that actually solve real problems, I deliver production-ready applications with a focus on CI/CD, AI/ML integration, and robust full-stack deployment.",
  avatar: "/avatar.png", // Add your photo to public/
};

export const socialLinks = {
  github: "https://github.com/Sharv619",
  linkedin: "https://linkedin.com/in/himanshu-lade",
  twitter: "https://twitter.com/lifeofhimanshoe",
  email: "mailto:himanshulade@hotmail.com",
};

export const experience = [
  {
    company: "Ask Jay Services",
    position: "Software Engineer (Contract)",
    duration: "May 2025 - Oct 2025",
    description: "• Architected and built a Flutter marketplace application from scratch with three user portals (Client, Subcontractor, Admin), implementing robust authentication and state management.\n\n• Gained 6 months of intensive hands-on experience with AWS (EC2, S3, RDS), provisioning infrastructure and managing deployments for production applications.\n\n• Successfully led mission-critical disaster recovery efforts, restoring 100% application services with zero data loss following a major database failure via secure AWS EC2 provisioning and MongoDB Atlas.\n\n• Boosted application performance by 88% (from 25s to 3s load times) through advanced Next.js server-side rendering and intelligent caching strategies.\n\n• Engineered a complete CI/CD pipeline using Docker and GitHub Actions, enabling reliable one-command deployments and automated testing.",
    link: "https://askjay.com.au",
  },
  {
    company: "Innovation Lab Lead & Applied Research",
    position: "Professional Development",
    duration: "Feb 2024 - May 2025",
    description: "• Pioneered AI/ML engineering & RAG architecture implementations, transforming theoretical concepts into deployable solutions.\n\n• Led the development of a portfolio of 6+ production-grade applications, demonstrating advanced proficiency in React, Next.js, Flutter, Gemini API, AWS, and Docker.\n\n• Mastered advanced state management patterns, CI/CD pipelines, and offline-first PWA architectures through hands-on development and experimentation.",
    link: "#",
  },
  {
    company: "ACS Australian Computer Society",
    position: "Cloud Engineering Intern",
    duration: "Sep 2023 - Feb 2024",
    description: "• Optimized frontend performance for a MERN + TypeScript platform serving 10,000+ users, achieving 30% faster page load times through strategic React component optimization.\n\n• Executed comprehensive security testing based on OWASP Top 10 guidelines, implementing critical fixes that significantly strengthened application security posture.\n\n• Collaborated effectively in an Agile development team with senior engineers, QA, and stakeholders to consistently deliver features on sprint schedules and meet project milestones.",
    link: "https://www.acs.org.au",
  },
];

export const projects = [
  {
    title: "AI Career Co-Pilot (RAG Architecture)",
    description: "Tired of generic career advice? I engineered an AI Career Co-Pilot utilizing a RAG Architecture to embed a comprehensive 47-page knowledge base, delivering contextually accurate and personalized career guidance with a real-time chat interface.",
    technologies: ["React", "TypeScript", "Gemini API", "RAG Architecture", "localStorage"],
    liveUrl: "https://ai-career-copilot.vercel.app",
    githubUrl: "https://github.com/Sharv619/ai-career-copilot",
  },
  {
    title: "Codeflow Hook (npm package)",
    description: "Streamline your dev workflow with AI: Introducing Codeflow Hook, a lightweight CLI tool leveraging Gemini, OpenAI GPT, or Claude AI for intelligent code analysis, automated Git hook management, and enhanced code review capabilities.",
    technologies: ["Node.js", "TypeScript", "AI APIs", "Git Hooks", "CLI Tool"],
    liveUrl: "https://www.npmjs.com/package/codeflow-hook",
    githubUrl: "https://github.com/Sharv619/codeflow-hook",
  },
  {
    title: "Knowledge Management Pipeline & DevPath",
    description: "Transform chaos into clarity: Created an automated pipeline that converts unstructured notes (PDF, Markdown) into interactive D3.js knowledge graphs, delivered as an offline-first PWA with enterprise-grade XSS protection.",
    technologies: ["React", "TypeScript", "D3.js", "Gemini API", "PWA", "DOMPurify"],
    liveUrl: "https://devpath.vercel.app",
    githubUrl: "https://github.com/Sharv619/knowledge-management",
  },
];

export const skills = {
  languages: ["JS/TS", "Dart", "HTML/CSS"],
  frameworks: ["React / Next.js", "Flutter", "Node.js / Express.js", "Tailwind CSS", "Material-UI"],
  databases: ["MongoDB / Atlas", "RESTful APIs", "Authentication (JWT)", "SSR & Perf. Optimization"],
  cloud: ["AWS (EC2, S3)", "Docker", "CI/CD (GitHub Actions)", "Nginx & Security"],
  tools: ["Git / GitHub", "Agile/Scrum", "Technical Documentation", "Testing & Code Review"],
};

export const about = {
  title: "About Me",
  content: `I'm a software engineer who doesn't just write code—I architect solutions that turn complex problems into elegant, scalable realities. Ever since flashing my first custom Android ROM back in 2016, I've been obsessed with understanding how things work under the hood and finding ways to make them work better.

My journey isn't about following trends; it's about pushing boundaries. I thrive in high-pressure environments where every decision matters, and I've proven I can deliver when it counts—from rescuing mission-critical systems to engineering AI-powered solutions that actually solve real problems.

Beyond the professional realm, I'm constantly tinkering and experimenting. I automate my entire life with n8n workflows, run Ollama locally for AI experimentation, and treat every challenge as an opportunity to build something smarter, faster, and more resilient.`,
};
