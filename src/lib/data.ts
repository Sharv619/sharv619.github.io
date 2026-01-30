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
  title: "Software Engineer",
  email: "himanshulade@hotmail.com",
  location: "Sydney, Australia",
  bio: "I build and maintain real systems—from full-stack features to automation and reliability improvements. I learn by shipping, debugging, and improving things that run in production.",
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
    duration: "May 2025 - Sept 2025",
    description: "• Led complete disaster recovery following a critical security breach, restoring 100% of data and service functionality.\n\n• Re-architected the frontend to improve site performance by 88% (reducing load times from 25s to <3s).\n\n• Designed and implemented a full-stack Course Management System using React.js and Node.js.\n\n• Engineered a CI/CD pipeline from scratch using Docker and GitHub Actions, automating the entire deployment process.\n\n• Built and deployed over 700 SEO-optimized landing pages.",
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
    title: "Codeflow Hook (npm package)",
    description: "Problem: Manual code reviews were slow and inconsistent, causing bottlenecks in development workflows.\n\nSolution: Built a CLI tool supporting multiple AI providers (Gemini, GPT, Claude) for automated code analysis, git hook management, and AI-powered reviews.\n\nOutcome: Reduced code review time by 40% and enhanced quality through intelligent, context-aware feedback.",
    technologies: ["Node.js", "TypeScript", "AI APIs", "Git Hooks", "CLI Tool"],
    liveUrl: "https://codeflow-commander-nexus-gateway-si.vercel.app/",
    githubUrl: "https://github.com/Sharv619/codeflow-commander---nexus-gateway",
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
    technicalChallenge: "Implementing comprehensive RBAC with granular permissions while maintaining performance was challenging. I developed a hierarchical permission system that scaled efficiently while ensuring zero data leakage across different user roles.",
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

This project demonstrates production-ready application development with enterprise-grade security, testing, and deployment practices applicable to any large-scale SaaS platform.`,
  },
  {
    title: "Production Incident Response Case Study",
    description: "Problem: Critical security breach caused complete system failure, requiring immediate disaster recovery.\n\nSolution: Led incident response with standardized protocols, automated recovery procedures, and multi-system coordination.\n\nOutcome: Achieved 100% data restoration and minimal downtime through proactive incident management.",
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

This case study demonstrates systematic approaches to production incident management, providing templates and methodologies applicable to any large-scale software operation.`,
  },
  {
    title: "AI Career Co-Pilot (RAG Architecture)",
    description: "Problem: Generic career advice chatbots provided irrelevant responses due to lack of contextual understanding.\n\nSolution: Built a RAG-based system that embeds a 47-page knowledge base with intelligent document chunking and vector caching.\n\nOutcome: Enabled contextually accurate responses through real-time chat with sub-second response times.",
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
  content: `I build and maintain real systems—from full-stack features to automation and reliability improvements. I learn by shipping, debugging, and improving things that run in production.

My journey through tech has been anything but linear. After completing a Cloud Engineering internship at ACS, I dived headfirst into full-stack development, mastering React, Next.js, Node.js, and AWS. But it was the AI/ML space that truly captured my imagination. Building RAG architectures and integrating Gemini APIs taught me that the future isn't just automated—it's intelligent.

Today, I architect scalable solutions that don't just meet requirements—they exceed them. Whether leading disaster recovery for critical systems or pioneering AI-powered tools that streamline dev workflows, I thrive on the edge where innovation meets reliability. My portfolio isn't just a collection of projects; it's evidence of how I transform complex challenges into elegant, high-impact solutions.

When I'm not coding, you'll find me automating my life with n8n workflows, experimenting with Ollama for local AI, or exploring the latest in quantum computing. Because in this field, curiosity isn't optional—it's essential.`,
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
