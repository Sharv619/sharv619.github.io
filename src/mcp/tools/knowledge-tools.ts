import { existsSync } from "fs";
import { join } from "path";

interface KnowledgeBase {
  personal: {
    name: string;
    title: string;
    location: string;
    contact: {
      email: string;
      phone: string;
      linkedin: string;
      github: string;
    };
  };
  experience: Array<{
    company: string;
    role: string;
    duration: string;
    achievements: string[];
  }>;
  projects: Array<{
    name: string;
    description: string;
    techStack: string[];
    achievements: string[];
  }>;
  skills: {
    languages: string[];
    frameworks: string[];
    cloudDevOps: string[];
    aiData: string[];
  };
  values: string[];
}

interface Component {
  name: string;
  path: string;
  status: "active" | "in_progress" | "pending" | "unused";
  description: string;
}

const DEFAULT_KB: KnowledgeBase = {
  personal: {
    name: "Himanshu Lade",
    title: "Software Engineer",
    location: "Sydney, Australia",
    contact: {
      email: "himanshulade@hotmail.com",
      phone: "+61 434 069 483",
      linkedin: "linkedin.com/in/himanshu-lade",
      github: "github.com/Sharv619"
    }
  },
  experience: [
    {
      company: "Ask Jay Services",
      role: "Software Engineer",
      duration: "May 2025 - Oct 2025",
      achievements: [
        "Led disaster recovery of breached production system, restoring 100% functionality",
        "Achieved 88% performance improvement (25s to <3s load time)",
        "Built Flutter marketplace from scratch",
        "Engineered CI/CD pipelines with Docker and GitHub Actions"
      ]
    },
    {
      company: "Australian Computer Society",
      role: "Web Developer Intern",
      duration: "Sep 2023 - Feb 2024",
      achievements: [
        "Improved frontend performance by 33% for MERN stack app",
        "Remediated 15+ security vulnerabilities (OWASP Top 10)",
        "Collaborated in Agile development sprints"
      ]
    }
  ],
  projects: [
    {
      name: "Network Guardian AI",
      description: "AI-Powered Network Threat Detection System",
      techStack: ["Python", "FastAPI", "React", "Scikit-learn", "Gemini API", "Docker"],
      achievements: [
        "Built 3-stage ML detection pipeline using Shannon Entropy and Isolation Forests",
        "Reduced API costs by ~90%"
      ]
    },
    {
      name: "CodeFlow-Hook",
      description: "Multi-Agent AI Code Review Tool (Open Source)",
      techStack: ["Node.js", "TypeScript", "Gemini API", "RAG", "Vector Search"],
      achievements: [
        "Designed multi-agent system for parallel code analysis",
        "450+ NPM downloads in first month"
      ]
    }
  ],
  skills: {
    languages: ["JavaScript (ES6+)", "TypeScript", "Python", "Dart", "SQL"],
    frameworks: ["React.js", "Next.js", "Node.js", "Express.js", "Flutter", "GraphQL", "FastAPI"],
    cloudDevOps: ["AWS (EC2, S3, Lambda, RDS)", "Docker", "GitHub Actions", "CI/CD", "Nginx", "Redis"],
    aiData: ["Gemini API", "RAG Architecture", "Isolation Forests", "Shannon Entropy", "Machine Learning"]
  },
  values: [
    "Open source philosophy",
    "Security-first approach",
    "Production reliability"
  ]
};

const COMPONENTS: Component[] = [
  { name: "Home", path: "src/app/page.tsx", status: "active", description: "Main landing page" },
  { name: "Resume", path: "src/app/resume/page.tsx", status: "active", description: "Resume page with sections" },
  { name: "Projects", path: "src/app/projects/page.tsx", status: "active", description: "Projects listing" },
  { name: "Chatbot", path: "src/components/ChatbotWidget.tsx", status: "in_progress", description: "Demo mode - needs RAG upgrade" },
  { name: "Navigation", path: "src/components/Navigation.tsx", status: "active", description: "Navigation component" },
  { name: "Hero", path: "src/components/Hero.tsx", status: "active", description: "Hero section" },
  { name: "About", path: "src/components/About.tsx", status: "active", description: "About section" },
  { name: "Experience", path: "src/components/Experience.tsx", status: "active", description: "Experience section" },
  { name: "Skills", path: "src/components/Skills.tsx", status: "active", description: "Skills section" },
  { name: "Contact", path: "src/components/Contact.tsx", status: "active", description: "Contact section" },
  { name: "ThemeProvider", path: "src/components/ThemeProvider.tsx", status: "active", description: "Dark/light theme context" },
  { name: "ThemeToggle", path: "src/components/ThemeToggle.tsx", status: "active", description: "Theme switch button" },
  { name: "ProjectsSection", path: "src/components/ProjectsSection.tsx", status: "active", description: "Resume projects section" },
  { name: "ExperienceSection", path: "src/components/ExperienceSection.tsx", status: "active", description: "Resume experience section" },
  { name: "EducationSection", path: "src/components/EducationSection.tsx", status: "active", description: "Resume education section" },
  { name: "TechnicalSkills", path: "src/components/TechnicalSkills.tsx", status: "active", description: "Resume skills section" },
  { name: "ResumeHeader", path: "src/components/ResumeHeader.tsx", status: "active", description: "Resume header" },
  { name: "ProfessionalSummary", path: "src/components/ProfessionalSummary.tsx", status: "active", description: "Resume summary" },
  { name: "ChatbotProvider", path: "src/components/ChatbotProvider.tsx", status: "active", description: "Chatbot context" },
  { name: "SEOHead", path: "src/components/SEOHead.tsx", status: "active", description: "SEO meta tags" },
  { name: "AvailabilityBanner", path: "src/components/AvailabilityBanner.tsx", status: "active", description: "Job availability banner" },
  { name: "Philosophy", path: "src/components/Philosophy.tsx", status: "active", description: "Personal philosophy section" },
  { name: "HimanshuEdge", path: "src/components/HimanshuEdge.tsx", status: "active", description: "Unique value proposition" },
  { name: "geminiService", path: "src/services/geminiService.ts", status: "unused", description: "Google Gemini service (demo mode unused)" }
];

function getKnowledgeBase(): KnowledgeBase {
  try {
    const kbPath = join(process.cwd(), "src/lib/resumeData.ts");
    if (existsSync(kbPath)) {
      return DEFAULT_KB;
    }
  } catch (error) {
    console.error("Error reading knowledge base:", error);
  }
  return DEFAULT_KB;
}

export async function getKnowledgeBaseTool(): Promise<KnowledgeBase> {
  return getKnowledgeBase();
}

export async function listComponentsTool(): Promise<{ components: Component[]; total: number }> {
  return { components: COMPONENTS, total: COMPONENTS.length };
}

export async function checkComponentTool(componentName: string): Promise<Component | { error: string }> {
  const component = COMPONENTS.find(c => 
    c.name.toLowerCase() === componentName.toLowerCase()
  );
  
  if (component) {
    const fileExists = existsSync(join(process.cwd(), component.path));
    return { ...component, status: fileExists ? component.status : "unused" };
  }
  
  return { error: `Component "${componentName}" not found` };
}
