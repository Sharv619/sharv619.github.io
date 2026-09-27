import knowledgeBase from "@/lib/knowledge-base.json";
import { getSyntheticRagResponse } from "@/lib/assistant/synthetic-rag";

interface KnowledgeBaseSource {
  id: string;
  section: string;
  title?: string;
  url?: string;
}

interface KnowledgeBaseResponse {
  response: string;
  sources: KnowledgeBaseSource[];
}

type KnowledgeProject = typeof knowledgeBase.projects[number];
type KnowledgeExperience = typeof knowledgeBase.experience[number];

export const fallbackResponses: Record<string, string> = {
  greeting: "Hey there! I'm Assistant, Himanshu's AI career assistant. I can tell you about his projects, skills, experience, or anything else you're curious about!",
  projects: "I normally pull Himanshu's project list from his public GitHub repositories. Live GitHub data is unavailable in demo mode, but key curated examples include:\n\n• **Production Recovery & Performance Rebuild** - NDA-safe production recovery and performance case study\n• **Pilly / MediMate Voice** - responsible-AI medication support MVP, not a medical product\n• **codeflow-hook** - open-source AI-assisted code review CLI / npm package",
  skills: "Himanshu's technical skills include:\n\n• **Languages:** JavaScript, TypeScript, Python, Dart, SQL\n• **Frameworks:** React, Next.js, Node.js, Flutter, FastAPI, GraphQL\n• **Cloud/DevOps:** AWS, Docker, GitHub Actions, CI/CD\n• **AI-assisted workflows:** RAG Architecture, Gemini API, retrieval systems, developer tooling",
  experience: "Himanshu's experience includes:\n\n• **Ask Jay Services** (Founding Engineer / Principal Technical Lead): supported production recovery, improved load times from roughly 25s to under 3s, built platform features, and created Docker/GitHub Actions workflows\n• **ACS** (Web Developer Intern): worked on a MERN platform serving 10,000+ users, improved average page load time by 30%, and reviewed/resolved 15+ authentication issues",
  default: "That's a great question! Feel free to ask me about Himanshu's projects, skills, experience, or anything else you'd like to know.",
};

function matchesAny(message: string, keywords: string[]): boolean {
  return keywords.some((keyword) => {
    if (keyword.includes(" ")) {
      return message.includes(keyword);
    }

    return new RegExp(`\\b${keyword}\\b`, "i").test(message);
  });
}

function isGreeting(message: string): boolean {
  const compact = message.toLowerCase().replace(/[^a-z]/g, "");
  const normalized = message.toLowerCase().replace(/[^a-z0-9\s]/g, " ");

  return (
    ["hi", "hey", "hello", "helo", "helloo"].includes(compact) ||
    /\b(hi|hey|hello|helo)\b/i.test(normalized)
  );
}

function isProfileIntent(message: string): boolean {
  return matchesAny(message, [
    "who are you",
    "what do you do",
    "what are you",
    "your name",
    "about himanshu",
    "tell me about himanshu",
    "profile",
    "summary",
    "contact",
    "available",
  ]);
}

function isProjectIntent(message: string): boolean {
  return matchesAny(message, [
    "project",
    "projects",
    "built",
    "build",
    "github",
    "case study",
    "case studies",
    "hackathon",
    "hackathons",
    "ai projects",
    "ml projects",
    "ai ml",
    "network",
    "guardian",
    "codeflow",
    "pilly",
    "medimate",
    "backpocket",
    "launchpad",
    "sharvilak",
    "portfolio",
    "chatbot",
    "assistant",
    "mistral",
    "deepmind",
    "unsw",
  ]);
}

function isBroadSkillsIntent(message: string): boolean {
  return matchesAny(message, [
    "skill",
    "skills",
    "tech stack",
    "technology",
    "technologies",
    "language",
    "languages",
    "framework",
    "frameworks",
    "devops skills",
    "security skills",
  ]);
}

function formatList(items: string[], limit = 4): string {
  return items.slice(0, limit).map((item) => `• ${item}`).join("\n");
}

function projectMatches(project: KnowledgeProject, message: string): boolean {
  const searchableText = [
    project.id,
    project.name,
    project.tagline,
    project.description,
    project.type,
    project.status,
    ...(project.techStack || []),
    ...(project.keywords || []),
  ].join(" ").toLowerCase();

  return message
    .split(/\W+/)
    .filter((word) => word.length > 2)
    .some((word) => searchableText.includes(word));
}

function buildProjectResponse(projects: KnowledgeProject[]): KnowledgeBaseResponse {
  const selectedProjects = projects.slice(0, 3);
  const response = selectedProjects.map((project) => {
    const achievements = project.achievements?.length
      ? `\n${formatList(project.achievements, 2)}`
      : "";
    const links = project.links?.github ? `\nGitHub: ${project.links.github}` : "";

    return `**${project.name}** — ${project.description}\nStack: ${project.techStack.slice(0, 6).join(", ")}${achievements}${links}`;
  }).join("\n\n");

  return {
    response,
    sources: selectedProjects.map((project) => ({
      id: project.id,
      section: "Knowledge Base: Projects",
      title: project.name,
      url: project.links?.github || project.links?.live || undefined,
    })),
  };
}

function buildExperienceResponse(experience: KnowledgeExperience[]): KnowledgeBaseResponse {
  const response = experience.map((item) => (
    `**${item.company}** — ${item.role} (${item.duration})\n${formatList(item.achievements, 3)}`
  )).join("\n\n");

  return {
    response,
    sources: experience.map((item) => ({
      id: item.id,
      section: "Knowledge Base: Experience",
      title: item.company,
    })),
  };
}

function buildSkillsResponse(): KnowledgeBaseResponse {
  const { skills } = knowledgeBase;

  return {
    response: [
      "**Languages:** " + skills.languages.join(", "),
      "**Frameworks:** " + skills.frameworks.join(", "),
      "**Cloud / DevOps:** " + skills.cloudDevOps.join(", "),
      "**AI / Data:** " + skills.aiData.join(", "),
    ].join("\n\n"),
    sources: [{ id: "skills", section: "Knowledge Base: Skills", title: "Skills" }],
  };
}

function buildPersonalResponse(): KnowledgeBaseResponse {
  const { personal } = knowledgeBase;

  return {
    response: `I'm Assistant, Himanshu's portfolio assistant. Himanshu is a ${personal.title} in ${personal.location}. ${personal.bio}\n\nAvailability: ${personal.availability}\nEmail: ${personal.contact.email}`,
    sources: [{ id: "personal", section: "Knowledge Base: Personal", title: personal.name }],
  };
}

function buildEducationResponse(): KnowledgeBaseResponse {
  const response = knowledgeBase.education.map((item) => (
    `**${item.degree}** — ${item.institution}, ${item.location} (${item.year})`
  )).join("\n\n");

  return {
    response,
    sources: [{ id: "education", section: "Knowledge Base: Education", title: "Education" }],
  };
}

export function getKnowledgeBaseResponse(message: string): KnowledgeBaseResponse {
  const lower = message.toLowerCase();

  if (isGreeting(lower)) {
    return {
      response: fallbackResponses.greeting,
      sources: [{ id: "profile-himanshu-lade", section: "Synthetic RAG", title: "Himanshu Lade Profile" }],
    };
  }

  if (isProfileIntent(lower)) {
    return buildPersonalResponse();
  }

  if (isProjectIntent(lower)) {
    const syntheticResult = getSyntheticRagResponse(message);
    if (syntheticResult.confidence !== "low") {
      return {
        response: syntheticResult.response,
        sources: syntheticResult.sources,
      };
    }

    const matchedProjects = knowledgeBase.projects.filter((project) => projectMatches(project, lower));
    return buildProjectResponse(matchedProjects.length > 0 ? matchedProjects : knowledgeBase.projects);
  }

  if (matchesAny(lower, ["experience", "job", "work", "career", "ask jay", "acs", "intern"])) {
    return buildExperienceResponse(knowledgeBase.experience);
  }

  if (matchesAny(lower, ["education", "degree", "university", "study", "master", "bachelor"])) {
    return buildEducationResponse();
  }

  if (isBroadSkillsIntent(lower)) {
    return buildSkillsResponse();
  }

  const syntheticResult = getSyntheticRagResponse(message);
  if (syntheticResult.confidence !== "low") {
    return {
      response: syntheticResult.response,
      sources: syntheticResult.sources,
    };
  }

  return {
    response: `${fallbackResponses.default}\n\nI can answer from the local knowledge base about projects, skills, experience, education, and contact details.`,
    sources: [{ id: "knowledge-base", section: "Knowledge Base", title: knowledgeBase.metadata.title }],
  };
}

export function getFallbackResponse(message: string): string {
  const lower = message.toLowerCase();
  
  // Check for greetings first (most common)
  if (lower.match(/^(hi|hey|hello|who are you|what is your name)$/) || 
      lower.startsWith('hi ') || lower.startsWith('hey') || lower.startsWith('hello')) {
    return fallbackResponses.greeting;
  }
  
  // Check for projects
  if (lower.includes('project')) {
    return fallbackResponses.projects;
  }
  
  // Check for skills
  if (lower.includes('skill') || lower.includes('tech stack')) {
    return fallbackResponses.skills;
  }
  
  // Check for experience/work
  if (lower.includes('experience') || lower.includes('job') || lower.includes('work') || lower.includes('career')) {
    return fallbackResponses.experience;
  }
  
  return fallbackResponses.default;
}
