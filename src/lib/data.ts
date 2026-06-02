import type { ProjectEvidenceProfile } from "./evidence-signals";
import type { PortfolioRecommendation } from "./portfolio-recommendations";

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
  slug?: string;
  technicalChallenge?: string;
  architectureDetails: string;
  archived?: boolean;
  updatedAt?: string;
  pushedAt?: string;
  stars?: number;
  forks?: number;
  topics?: string[];
  primaryLanguage?: string | null;
  languageBreakdown?: Record<string, number>;
  evidenceProfile?: ProjectEvidenceProfile;
  evidenceRecommendations?: PortfolioRecommendation[];
  caseStudySlug?: string;
}

export const personalInfo: PersonalInfo = {
  name: "Himanshu Lade",
  title: "Software Engineer",
  email: "himanshulade@hotmail.com",
  location: "Sydney, Australia",
  bio: "Software Engineer focused on backend systems, production reliability, cloud deployment, and AI-assisted workflow automation.",
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
    position: "Founding Engineer / Principal Technical Lead",
    duration: "May 2025 - Aug 2025",
    description: "• Supported production recovery after a security incident, restoring service functionality while keeping public details NDA-safe.\n\n• Improved load times from roughly 25s to under 3s through frontend, backend, and database-path optimisation.\n\n• Built marketplace and course-management platform features across frontend and backend workflows.\n\n• Created Docker and GitHub Actions CI/CD workflows to make deployments more repeatable.\n\n• Built and deployed 700+ SEO-oriented landing pages for regional service coverage.",
    link: "https://askjay.com.au",
  },
  {
    company: "ACS Australian Computer Society",
    position: "Web Developer Intern",
    duration: "Sep 2023 - Feb 2024",
    description: "• Improved average page load time by 30% for a MERN + TypeScript platform serving 10,000+ users through React optimisation and code splitting.\n\n• Reviewed and resolved 15+ authentication issues using OWASP guidance, strengthening application security posture.\n\n• Collaborated in Agile development sprints with senior engineers, QA, and stakeholders to deliver scoped features.",
    link: "https://www.acs.org.au",
  },
];

export const projects = [
  {
    title: "Network Guardian AI",
    description: "Problem: Network traffic analysis can be difficult to interpret quickly without structured anomaly signals.\n\nSolution: Explored AI-assisted network traffic analysis using entropy scoring, anomaly detection, FastAPI, and a React interface.\n\nOutcome: Built a prototype for privacy-aware traffic intelligence and security summaries without presenting it as a production security product.",
    technologies: ["Python", "FastAPI", "React", "Scikit-learn", "Gemini API", "Docker", "Machine Learning"],
    liveUrl: "https://github.com/Sharv619/network-guardian-ai",
    githubUrl: "https://github.com/Sharv619/network-guardian-ai",
    caseStudySlug: "network-guardian-ai",
    technicalChallenge: "Exploring how entropy scoring and anomaly detection could surface suspicious traffic patterns while keeping the system understandable and prototype-safe.",
    architectureDetails: `AI-Powered Network Threat Detection System with 3-stage ML pipeline.

**Architecture Layers:**
• Data Collection: Real-time network packet capture
• Feature Extraction: Shannon Entropy calculation for anomaly detection
• ML Engine: Isolation Forests for identifying malicious traffic
• API Layer: FastAPI with async processing
• Deployment: Docker Compose microservices

**Key Features:**
• 3-stage detection pipeline
• Containerized microservices
• Real-time monitoring prototype
• Privacy-aware AI-assisted security summaries`,
  },
  {
    title: "LifeOS - Personal AI Calendar",
    description: "Problem: Missing important events and failing to act on opportunities due to poor personal organization.\n\nSolution: Built RAG pipeline ingesting Google Calendar, Fit, and Drive data using sentence-transformers and Mistral-7B.\n\nOutcome: Winner at Mistral AI x UNSW Founders Hackathon with geolocation-triggered alert system.",
    technologies: ["Python", "FastAPI", "React", "RAG", "Mistral AI", "Google APIs", "sentence-transformers"],
    liveUrl: "#",
    githubUrl: "#",
    technicalChallenge: "Integrating multiple Google APIs while ensuring data privacy. Built geolocation-triggered alert system based on free time windows.",
    architectureDetails: `Personal AI Calendar & Nudge Engine with context-aware recommendations.

**Architecture:**
• Data Ingestion: Google Calendar, Fit, Drive APIs
• Embedding Engine: sentence-transformers
• RAG Pipeline: Context-aware retrieval
• LLM Integration: Mistral-7B for nudges
• Location Service: Geolocation alerts`,
  },
  {
    title: "CodeFlow-Hook",
    description: "Problem: Developers need fast review feedback before commits, but generic AI chat workflows are hard to automate.\n\nSolution: Built an open-source AI-assisted code review CLI / npm package around git hook workflows and structured feedback.\n\nOutcome: Published a developer-tooling prototype with early usage traction.",
    technologies: ["Node.js", "TypeScript", "Gemini API", "RAG", "Vector Search", "Docker"],
    liveUrl: "https://www.npmjs.com/package/codeflow-hook",
    githubUrl: "https://github.com/Sharv619/codeflow-hook",
    caseStudySlug: "codeflow-hook",
    technicalChallenge: "Creating abstraction layer for multi-provider AI support while maintaining fast execution.",
    architectureDetails: `Multi-Agent AI Code Review Tool.

**Architecture:**
• CLI Interface with intuitive commands
• AI Abstraction Layer for multi-provider support
• Vector Store with RAG for context awareness
• Git Integration for pre-commit hooks`,
  },
  {
    title: "Codeflow Hook (npm package)",
    description: "Problem: Developers need fast review feedback before commits, but generic AI chat workflows are hard to automate.\n\nSolution: Built a CLI tool direction for AI-assisted code analysis, git hook management, and structured review feedback.\n\nOutcome: Published a developer-tooling prototype with early usage traction.",
    technologies: ["Node.js", "TypeScript", "AI APIs", "Git Hooks", "CLI Tool"],
    liveUrl: "https://codeflow-commander-nexus-gateway-si.vercel.app/",
    githubUrl: "https://github.com/Sharv619/codeflow-commander---nexus-gateway",
    caseStudySlug: "codeflow-commander",
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
    title: "ReliBoard",
    description: "Problem: Needed a secure, production-ready project management platform with proper access controls for team collaboration.\n\nSolution: Developed a full-stack application with JWT-based authentication, Role-Based Access Control (RBAC), and comprehensive testing.\n\nOutcome: Delivered an enterprise-grade platform with Docker containerization and 85%+ test coverage.",
    technologies: ["React", "Node.js", "MongoDB", "JWT", "Docker", "Jest", "Supertest"],
    liveUrl: "#",
    githubUrl: "https://github.com/Sharv619/reliboard",
    technicalChallenge: "Implementing RBAC with granular permissions while maintaining a clear API model was the main challenge. I focused on keeping role boundaries explicit and testable.",
    architectureDetails: `Enterprise-grade project management platform engineered with security-first design principles.

**Security Architecture:**
• **Multi-Layer Authentication:** JWT-based auth with refresh token rotation and secure session management
• **Role-Based Access Control:** Hierarchical permission system supporting organization, team, and individual level access controls
• **API Security:** RESTful API with rate limiting, request validation, and comprehensive error handling

**Application Architecture:**
• **Frontend:** React-based interface with real-time collaboration features and responsive design
• **Backend:** Node.js/Express API with MongoDB for scalable data persistence
• **Containerization:** Full-stack Docker deployment enabling seamless environment consistency

**Quality Assurance:**
• **Comprehensive Testing:** Jest & Supertest achieving 85%+ code coverage across all components
• **Security Testing:** Automated vulnerability scanning and penetration testing integration
• **Performance Testing:** Load testing and optimization ensuring scalability for growing teams

**DevOps Integration:**
• **CI/CD Pipeline:** Automated testing, building, and deployment workflows
• **Monitoring & Logging:** Centralized logging with performance metrics tracking
• **Backup & Recovery:** Automated database backup strategies with point-in-time recovery

This project demonstrates full-stack application development with authentication, role-based access, testing, and deployment practices.`,
  },
  {
    title: "Production Incident Response Case Study",
    description: "Problem: A production service needed recovery after a security incident, with safer access boundaries and performance improvements.\n\nSolution: Supported service restoration, cloud/database hardening, credential rotation, deployment workflow improvements, and stakeholder communication.\n\nOutcome: Restored service functionality and improved load times from roughly 25s to under 3s while keeping client details NDA-safe.",
    technologies: ["AWS EC2", "MongoDB Atlas", "Docker", "CI/CD", "Incident Management"],
    liveUrl: "#",
    githubUrl: "https://github.com/Sharv619/production-incident-response-case-study",
    technicalChallenge: "Coordinating multi-system recovery while maintaining data integrity across distributed services required precise timing and rollback procedures. I developed a phased recovery approach that minimized risks and ensured complete system restoration.",
    architectureDetails: `Comprehensive incident response framework designed for mission-critical production environments.

**Incident Response Phases:**
• **Detection & Assessment:** Automated monitoring with real-time alerting and incident classification
• **Containment:** Immediate isolation procedures preventing incident spread across systems
• **Recovery Execution:** Phased restoration process ensuring data integrity and service availability
• **Post-Incident Analysis:** Root cause analysis with comprehensive documentation and preventive measures

**Infrastructure Resilience:**
• **Multi-Region Deployment:** AWS infrastructure with automatic failover capabilities
• **Database Resilience:** MongoDB Atlas with automated backup, point-in-time recovery, and geo-redundancy
• **Automated Recovery:** Scripted recovery procedures reducing human error during critical incidents

**Security Considerations:**
• **Access Control:** Principle of least privilege during incident response operations
• **Data Protection:** Encrypted communications and secure data handling throughout recovery process
• **Audit Trail:** Complete logging of all incident response actions for compliance and analysis

**Process Improvements:**
• **Runbook Development:** Standardized incident response procedures with clear escalation paths
• **Team Coordination:** Cross-functional collaboration protocols ensuring rapid response times
• **Continuous Improvement:** Post-incident reviews driving iterative improvements to response capabilities

This case study uses NDA-safe language to demonstrate production recovery, reliability, and communication practices without exposing private client details.`,
  },
  {
    title: "AI Career Co-Pilot (RAG Architecture)",
    description: "Problem: Generic career advice chatbots provided irrelevant responses due to lack of contextual understanding.\n\nSolution: Built a RAG-based system that embeds a 47-page knowledge base with intelligent document chunking and vector caching.\n\nOutcome: Enabled contextually accurate responses through real-time chat with sub-second response times.",
    technologies: ["React", "TypeScript", "Gemini API", "RAG Architecture", "localStorage"],
    liveUrl: "https://ai-career-copilot.vercel.app",
    githubUrl: "https://github.com/Sharv619/ai-career-copilot",
    technicalChallenge: "Keeping retrieval useful and responsive in a browser-based RAG prototype was the main challenge. I explored vector caching, chunking, and context-window management to make the interaction smoother.",
    architectureDetails: `This system implements a production-grade RAG (Retrieval-Augmented Generation) architecture combining vector embeddings, document chunking, and context-aware LLM interactions.

**Key Components:**
• **Knowledge Ingestion:** Automated PDF/text processing pipeline with intelligent document chunking (500-1000 tokens) and metadata extraction
• **Vector Database:** Custom vector embeddings stored in localStorage with pre-computed similarity scores for fast retrieval
• **Context Window Management:** Sliding window approach maintaining conversation history while respecting LLM token limits
• **Prompt Engineering:** Multi-turn conversation design with retrieval-aware prompting to ensure contextually relevant responses
• **LLM Integration:** Seamless abstraction layer supporting Gemini API with fallback mechanisms and rate limiting

**Performance Optimizations:**
• Cached vector similarity calculations improve perceived response time in demo workflows
• Intelligent chunking maintains semantic coherence while maximizing information density
• Pre-processed knowledge base reduces computational overhead by 85%

The architecture demonstrates scalable AI integration patterns applicable to enterprise chatbot deployments and domain-specific knowledge systems.`,
  },
];

export const skills = {
  primary: ["TypeScript", "JavaScript", "React", "Node.js", "AWS", "Docker"],
  "ai & automation": ["Google Gemini API", "RAG Architecture", "Vector Embeddings", "Prompt Engineering", "n8n workflows"],
  "infrastructure & delivery": ["GitHub Actions", "CI/CD", "Docker", "AWS EC2", "Nginx"],
  "databases & security": ["MongoDB (Atlas)", "Mongoose", "OWASP Top 10", "JWT"],
  "additional": ["Python", "Dart", "SQL", "Next.js", "Vite", "HTML/CSS", "Tailwind CSS", "Framer Motion", "Express.js", "REST APIs", "GraphQL"],
};

export const about = {
  title: "About Me",
  content: `I build practical software systems around backend workflows, production reliability, cloud deployment, and AI-assisted automation.

My recent work includes production recovery and marketplace platform work at Ask Jay Services, where I helped restore service functionality after a security incident, improved load times from roughly 25 seconds to under 3 seconds, and built Docker + GitHub Actions deployment workflows.

At ACS, I worked on a MERN platform serving 10,000+ users, improving average page load time by 30% and reviewing 15+ authentication issues using OWASP guidance.

I also build prototypes and open-source tools around responsible AI workflows, code review automation, and small-business operations. I label these clearly as MVPs, prototypes, or experiments when they are not production systems.`,
};

export const howIWork = {
  title: "How I Work",
  content: `I approach engineering with a focus on learning through building and debugging. I'm comfortable owning small systems end-to-end and prefer reliability and clarity over cleverness. I believe in shipping early, iterating often, and always considering the production impact of my decisions. I'm particularly interested in AI as an assistive tool that enhances human judgment rather than replacing it.`,
};

export const slugify = (text: string) => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters except spaces and hyphens
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim() // Trim leading/trailing whitespace
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
};
