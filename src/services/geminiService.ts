import { experience, projects, skills, about } from "@/lib/data";

type PortfolioData = {
  experience: typeof experience;
  projects: typeof projects;
  skills: typeof skills;
  about: typeof about;
};

export class GeminiService {
  private conversationHistory: string[] = [];
  private portfolioData: PortfolioData;

  constructor() {
    // Pure mock implementation with portfolio data injection
    this.portfolioData = { experience, projects, skills, about };
    console.log("🚀 AI Career Co-Pilot: Mock Mode - Portfolio Data Injected (Real implementation: Private Repository)");
  }

  async sendMessage(message: string, _systemPrompt?: string): Promise<string> {
    void _systemPrompt;

    // Simulate processing delay for realism
    await new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 500));

    const messageLower = message.toLowerCase().trim();
    this.conversationHistory.push(message);

    if (messageLower.includes("hello") || messageLower.includes("hi") || messageLower.includes("hey")) {
      return "Hi there! I'm Himanshu's AI Career Co-Pilot - a demo showcasing full-stack engineering, cloud deployment, and AI-assisted workflow skills. What would you like to know?";
    }

    if (messageLower.includes("mock") || messageLower.includes("demo") || messageLower.includes("real")) {
      return "This is a mock/demo version of my AI Career Co-Pilot. The live implementation uses private API configuration, so this demo uses safe keyword responses and avoids exposing credentials or private data.";
    }

    if (messageLower.includes("experience") || messageLower.includes("work") || messageLower.includes("background")) {
      const latestExp = this.portfolioData.experience[0];
      return `Himanshu is a Software Engineer with experience including ${latestExp.company} as ${latestExp.position} (${latestExp.duration}). ${latestExp.description[0]} He focuses on backend systems, production reliability, cloud deployment, and AI-assisted workflows.`;
    }

    if (messageLower.includes("project") || messageLower.includes("portfolio") || messageLower.includes("codeflow")) {
      const projectNames = this.portfolioData.projects.slice(0, 3).map((project) => project.title).join(", ");
      return `Portfolio highlights include ${projectNames}. The portfolio separates production work, MVPs, prototypes, and GitHub-generated project cards so each project is framed accurately.`;
    }

    if (messageLower.includes("skills") || messageLower.includes("technology") || messageLower.includes("expertise")) {
      const primarySkills = this.portfolioData.skills.primary.slice(0, 3).join(", ");
      const infrastructureSkills = this.portfolioData.skills["infrastructure & delivery"].slice(0, 3).join(", ");
      const aiSkills = this.portfolioData.skills["ai & automation"].slice(0, 2).join(", ");
      return `Himanshu works across primary engineering (${primarySkills}), infrastructure (${infrastructureSkills}), and AI-assisted workflows (${aiSkills}).`;
    }

    if (messageLower.includes("career") || messageLower.includes("advice") || messageLower.includes("job")) {
      return "For career advice, focus on clear proof: shipped work, production debugging, tests, deployment, and honest labels for MVPs or prototypes.";
    }

    if (messageLower.includes("thanks") || messageLower.includes("thank you")) {
      return "You're welcome. Thanks for exploring the portfolio. Feel free to ask about experience, projects, skills, or case studies.";
    }

    return "Thanks for your message. This demo can answer questions about Himanshu's experience, projects, skills, and case studies.";
  }

  // Create a new chat session (for starting fresh conversations)
  resetChat() {
    this.conversationHistory = [];
    console.log("🤖 Chat session reset - Demo AI Career Co-Pilot");
  }
}

export const geminiService = new GeminiService();
