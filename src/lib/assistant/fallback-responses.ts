/**
 * Fallback responses for demo/offline mode
 * Extracted for easy testing
 */

export const fallbackResponses: Record<string, string> = {
  greeting: "Hey there! I'm Assistant, Himanshu's AI career assistant. I can tell you about his projects, skills, experience, or anything else you're curious about!",
  projects: "I normally pull Himanshu's project list from his public GitHub repositories. Live GitHub data is unavailable in demo mode, but key curated examples include:\n\n• **Production Recovery & Performance Rebuild** - NDA-safe production recovery and performance case study\n• **Pilly / MediMate Voice** - responsible-AI medication support MVP, not a medical product\n• **codeflow-hook** - open-source AI-assisted code review CLI / npm package",
  skills: "Himanshu's technical skills include:\n\n• **Languages:** JavaScript, TypeScript, Python, Dart, SQL\n• **Frameworks:** React, Next.js, Node.js, Flutter, FastAPI, GraphQL\n• **Cloud/DevOps:** AWS, Docker, GitHub Actions, CI/CD\n• **AI-assisted workflows:** RAG Architecture, Gemini API, retrieval systems, developer tooling",
  experience: "Himanshu's experience includes:\n\n• **Ask Jay Services** (Founding Engineer / Principal Technical Lead): supported production recovery, improved load times from roughly 25s to under 3s, built platform features, and created Docker/GitHub Actions workflows\n• **ACS** (Web Developer Intern): worked on a MERN platform serving 10,000+ users, improved average page load time by 30%, and reviewed/resolved 15+ authentication issues",
  default: "That's a great question! Feel free to ask me about Himanshu's projects, skills, experience, or anything else you'd like to know.",
};

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
