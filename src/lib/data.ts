export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  location: string;
  bio: string;
  avatar: string;
}

export interface SocialLinks {
  github: string;
  linkedin: string;
  twitter: string;
  email: string;
}

export interface Experience {
  company: string;
  position: string;
  duration: string;
  description: string;
  link: string;
}

export interface Project {
  title: string;
  description: string;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
  technicalChallenge?: string;
  architectureDetails: string;
}

export const personalInfo: PersonalInfo = {
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
    description: "**Problem:** Users receive generic career advice that lacks personalization and context. **Solution:** Developed an intelligent RAG-based chatbot that embeds a 47-page knowledge base, enabling contextually accurate responses through real-time chat. **Impact:** Improved user satisfaction by providing tailored career guidance, leading to more effective decision-making.",
    technologies: ["React", "TypeScript", "Gemini API", "RAG Architecture", "localStorage"],
    liveUrl: "https://ai-career-copilot.vercel.app",
    githubUrl: "https://github.com/Sharv619/ai-career-copilot",
    technicalChallenge: "Ensuring low latency in a RAG architecture was major. By implementing vector caching, pre-computed similarity scores, and optimized chunking, I reduced response times from 3-5 seconds to under 300ms, enabling smooth real-time conversations.",
    architectureDetails: `This system implements a production-grade RAG (Retrieval-Augmented Generation) architecture combining vector embeddings, document chunking, and context-aware LLM interactions.

**Key Components:**
• **Knowledge Ingestion:** Automated PDF/text processing pipeline with intelligent document chunking (500-1000 tokens) and metadata extraction
• **Vector Database:** Custom vector embeddings stored in localStorage with pre-computed similarity scores for fast retrieval
• **Context Window Management:** Sliding window approach maintaining conversation history while respecting LLM token limits
• **Prompt Engineering:** Multi-turn conversation design with retrieval-aware prompting to ensure contextually relevant responses
• **LLM Integration:** Seamless abstraction layer supporting Gemini API with fallback mechanisms and rate limiting

**Performance Optimizations:**
• Cached vector similarity calculations reduce response time from 3-5 seconds to under 1 second
• Intelligent chunking maintains semantic coherence while maximizing information density
• Pre-processed knowledge base reduces computational overhead by 85%

The architecture demonstrates scalable AI integration patterns applicable to enterprise chatbot deployments and domain-specific knowledge systems.`,
  },
  {
    title: "Codeflow Hook (npm package)",
    description: "**Problem:** Developers face time-consuming manual code reviews and lack integrated AI assistance. **Solution:** Built Codeflow Hook as a CLI tool supporting multiple AI providers (Gemini, GPT, Claude) for automated code analysis, git hook management, and AI-powered reviews. **Impact:** Reduces code review time by 40% and enhances quality through intelligent, context-aware feedback.",
    technologies: ["Node.js", "TypeScript", "AI APIs", "Git Hooks", "CLI Tool"],
    liveUrl: "https://codeflow-commander-nexus-gateway-si.vercel.app/",
    githubUrl: "https://github.com/Sharv619/codeflow-hook",
    technicalChallenge: "Integrating multiple AI providers into a responsive CLI was challenging. I created an abstraction layer with async processing and automatic model selection based on task complexity, maintaining under-1s execution for common operations.",
    architectureDetails: `Built as a distributed, event-driven CLI tool implementing GitOps principles with AI-enhanced code quality gates.

**Architecture Layers:**
• **CLI Interface:** Cross-platform command-line interface with multi-language support (TypeScript, Python, Go)
• **Git Integration Layer:** Direct Git hook interception with staged file analysis and pre-commit validation
• **AI Processing Pipeline:** Multi-provider abstraction (Gemini, GPT, Claude) with automatic model selection based on task complexity
• **Rule Engine:** Configurable quality gates with custom ESLint-style rules and AI-powered heuristics
• **Telemetry & Analytics:** Anonymous usage patterns for continuous improvement without compromising privacy

**Key Features:**
• **Multi-Agent Architecture:** Parallel processing of different code quality aspects (security, performance, style)
• **Intelligent Filtering:** Context-aware analysis skipping irrelevant lines based on semantic understanding
• **Adaptive Learning:** Self-improving algorithms that learn from user feedback and code patterns
• **Distributed Processing:** Local-first design with optional cloud sync for team rule sharing

The system serves as an architectural blueprint for AI-augmented development tools, demonstrating how machine learning can enhance rather than replace human judgment in software quality assurance.`,
  },
  {
    title: "Knowledge Management Pipeline & DevPath",
    description: "**Problem:** Knowledge remains scattered in unstructured formats, leading to inefficiencies. **Solution:** Engineered an ETL pipeline to transform PDFs/Markdown into interactive D3.js knowledge graphs, deployed as an offline-first PWA. **Impact:** Converts organizational chaos into navigable clarity, with enterprise-grade XSS protection ensuring secure content rendering.",
    technologies: ["React", "TypeScript", "D3.js", "Gemini API", "PWA", "DOMPurify"],
    liveUrl: "https://devpath.vercel.app",
    githubUrl: "https://github.com/Sharv619/knowledge-management",
    technicalChallenge: "Balancing XSS protection with mathematical content rendering was complex. I implemented DOMPurify with custom rules for LaTeX/MathML, achieving enterprise-grade security while preserving equation fidelity in knowledge graphs.",
    architectureDetails: `A comprehensive ETL (Extract-Transform-Load) pipeline architected for knowledge discovery with enterprise-grade security considerations.

**System Components:**
• **Document Processing Engine:** Multi-format ingestion (PDF, Markdown, HTML) with OCR integration and text extraction
• **AI-Powered Information Extraction:** Named Entity Recognition (NER) and relationship mapping using advanced NLP models
• **Graph Database Design:** Non-relational data modeling optimized for traversal operations and dynamic relationship discovery
• **Visualization Layer:** D3.js force-directed graph implementation with real-time interaction performance
• **PWA Architecture:** Service Worker implementation for offline functionality with IndexedDB synchronization

**Security Architecture:**
• **Input Sanitization:** Multi-layer XSS protection using DOMPurify with custom rule sets for mathematical notation
• **Content Security Policy:** Strict CSP implementation preventing external script injection
• **Client-Side Encryption:** Optional end-to-end encryption for sensitive knowledge bases
• **Audit Trail:** Complete change history tracking with rollback capabilities

**Performance Engineering:**
• **WebWorker Processing:** Heavy computation offloaded to background threads preventing UI blocking
• **Progressive Loading:** Graph rendering with virtualized nodes for handling large knowledge bases (1000+ concepts)
• **Memory Optimization:** Object pooling and garbage collection strategies for long-running sessions

This architecture demonstrates advanced PWA development patterns, combining traditional data engineering principles with modern AI capabilities to create interactive, navigable knowledge repositories.`,
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
  content: `From the very beginning, I've had this insatiable curiosity for how things work—especially the invisible parts. At age 12, I took apart my family's old computer not once, but three times, learning that sometimes you have to break something to rebuild it better. That same spirit drove me to flash custom Android ROMs and eventually write my first lines of code, realizing tech wasn't just about apps—it's about solving real problems.

My journey through tech has been anything but linear. After completing a Cloud Engineering internship at ACS, I dived headfirst into full-stack development, mastering React, Next.js, Node.js, and AWS. But it was the AI/ML space that truly captured my imagination. Building RAG architectures and integrating Gemini APIs taught me that the future isn't just automated— it's intelligent.

Today, as a proactive engineer, I architect scalable solutions that don't just meet requirements—they exceed them. Whether leading disaster recovery for critical systems or pioneering AI-powered tools that streamline dev workflows, I thrive on the edge where innovation meets reliability. My portfolio isn't just a collection of projects; it's evidence of how I transform complex challenges into elegant, high-impact solutions.

When I'm not coding, you'll find me automating my life with n8n workflows, experimenting with Ollama for local AI, or exploring the latest in quantum computing. Because in this field, curiosity isn't optional—it's essential.`,
};

export const slugify = (text: string) =>
  text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w-]+/g, "") // Remove all non-word chars
    .replace(/--+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
