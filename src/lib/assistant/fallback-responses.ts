/**
 * Fallback responses for demo/offline mode
 * Extracted for easy testing
 */

export const fallbackResponses: Record<string, string> = {
  greeting: "Hey there! I'm Assistant, Himanshu's AI career assistant. I can tell you about his projects, skills, experience, or anything else you're curious about!",
  projects: "I normally pull Himanshu's project list from his public GitHub repositories tagged with `portfolio`. Live GitHub data is unavailable in demo mode, but key curated examples include:\n\n• **Network Guardian AI** - AI-powered network threat detection\n• **CodeFlow-Hook** - Multi-agent AI code review tooling\n• **LifeOS** - Personal AI calendar and nudge engine",
  skills: "Himanshu's technical skills include:\n\n• **Languages:** JavaScript, TypeScript, Python, Dart, SQL\n• **Frameworks:** React, Next.js, Node.js, Flutter, FastAPI, GraphQL\n• **Cloud/DevOps:** AWS, Docker, GitHub Actions, CI/CD\n• **AI/ML:** RAG Architecture, Gemini API, Mistral AI, Machine Learning",
  experience: "Himanshu's experience includes:\n\n• **Ask Jay Services** (Founding Engineer): Led disaster recovery, achieved 88% performance improvement, built a Flutter marketplace, and launched 700+ SEO pages\n• **ACS** (Cloud Intern): Improved frontend performance by 33%, remediated 15+ security vulnerabilities",
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
