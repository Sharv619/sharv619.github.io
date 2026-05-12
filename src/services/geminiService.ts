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
      return "Hi there! 👋 I'm Himanshu's AI Career Co-Pilot - a demo showcasing full-stack engineering and AI/ML integration skills. I'm here to help with any questions about career advice, technical projects, or development best practices. What would you like to know?";
    }

    if (messageLower.includes("mock") || messageLower.includes("demo") || messageLower.includes("real")) {
      return "🎭 This is a mock/demo version of my AI Career Co-Pilot! The full implementation is in a private repository with live Gemini API integration, RAG architecture, and advanced prompt engineering. Note: This demo doesn't have conversation memory - each response is generated fresh based on keywords. It demonstrates my ability to build production-grade AI chatbots, though the actual API keys and integrations are kept private for security. What else can I help with?";
    }

    if (messageLower.includes("experience") || messageLower.includes("work") || messageLower.includes("background")) {
      const latestExp = this.portfolioData.experience[0];
      return `Himanshu is a Software Engineer currently working at ${latestExp.company} as a ${latestExp.position} (${latestExp.duration}). ${latestExp.description[0]} He has experience in full-stack development, AI/ML integration, and DevOps, with previous roles including cloud engineering internships.`;
    }

    if (messageLower.includes("project") || messageLower.includes("portfolio") || messageLower.includes("codeflow")) {
      const projectNames = this.portfolioData.projects.slice(0, 3).map((project) => project.title).join(", ");
      return `Portfolio highlights include ${projectNames}. Each project showcases different technical skills - from AI-powered development tools to enterprise project management systems. Check out the Projects section for detailed technical specs and architectures!`;
    }

    if (messageLower.includes("skills") || messageLower.includes("technology") || messageLower.includes("expertise")) {
      const primarySkills = this.portfolioData.skills.primary.slice(0, 3).join(", ");
      const infrastructureSkills = this.portfolioData.skills["infrastructure & delivery"].slice(0, 3).join(", ");
      const aiSkills = this.portfolioData.skills["ai & automation"].slice(0, 2).join(", ");
      return `Himanshu specializes in: Primary engineering (${primarySkills}), Infrastructure (${infrastructureSkills}), AI/ML (${aiSkills}), and more. He particularly excels at integrating AI/ML into production applications and building resilient DevOps pipelines.`;
    }

    if (messageLower.includes("career") || messageLower.includes("advice") || messageLower.includes("job")) {
      return "For career advice, focus on building production-ready projects that solve real problems! Himanshu's approach emphasizes clean code, comprehensive testing, and showcasing both professional work and passion projects. Companies value engineers who can ship solutions that actually work and scale.";
    }

    if (messageLower.includes("thanks") || messageLower.includes("thank you")) {
      return "You're welcome! 🤝 Thanks for exploring my portfolio. This demo shows my AI integration capabilities - the real chatbot with live Gemini API is in a private repository for production use. Feel free to reach out anytime!";
    }

    return "Thanks for your message! 🤝 As a demo of React hooks & custom state management without API calls, I'd be happy to answer anything about how I implemented this ChatBot in my portfolio. Built with useState for message handling, useEffect for side effects, and custom logic for intelligent responses - no actual AI backend needed! 💭";
  }

  // Create a new chat session (for starting fresh conversations)
  resetChat() {
    this.conversationHistory = [];
    console.log("🤖 Chat session reset - Demo AI Career Co-Pilot");
  }
}

export const geminiService = new GeminiService();
