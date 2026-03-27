/**
 * RAG Assistant Client
 * 
 * Frontend client for connecting to the AWS Lambda RAG endpoint
 */

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface Source {
  id: string;
  section: string;
  similarity?: number;
}

interface RAGResponse {
  response: string;
  sources: Source[];
  metadata?: {
    modelUsed: string;
    complexity: string;
    chunksRetrieved: number;
  };
}

interface UseAssistantChatReturn {
  messages: Message[];
  sendMessage: (message: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

const API_ENDPOINT = process.env.NEXT_PUBLIC_ASSISTANT_API || 
  "https://your-api-id.execute-api.us-east-1.amazonaws.com/prod/assistant";

/**
 * Smart Routing Logic - mmcp-core inspired
 * 
 * Analyzes query complexity and routes to appropriate model:
 * - Simple queries -> Claude 3 Haiku (fast, cheap)
 * - Complex queries -> Claude 3.5 Sonnet (reasoning depth)
 * 
 * This reduces costs while maintaining quality for simple questions.
 */

type QueryComplexity = "simple" | "medium" | "complex";

const SIMPLE_PATTERNS = [
  /^(hi|hey|hello|who are you|what is your name|tell me about yourself)$/i,
  /^(what does he do|what is his background|introduce him)$/i,
  /^(list|show).*(skill|project|experience)/i,
  /^how many/i,
  /^(yes|no|okay|thanks|thank you)/i,
];

const COMPLEX_PATTERNS = [
  /explain.*detail/i,
  /how.*implement/i,
  /architecture/i,
  /compare.*vs.*/i,
  /deep dive/i,
  /technical.*spec/i,
  /optimization.*how/i,
  /scale.*how/i,
  /why.*choose/i,
  /what.*recommend/i,
];

export function analyzeQueryComplexity(message: string): QueryComplexity {
  const lower = message.toLowerCase().trim();
  
  // Check for simple patterns
  for (const pattern of SIMPLE_PATTERNS) {
    if (pattern.test(lower)) {
      return "simple";
    }
  }
  
  // Check for complex patterns
  for (const pattern of COMPLEX_PATTERNS) {
    if (pattern.test(lower)) {
      return "complex";
    }
  }
  
  // Default to medium
  return "medium";
}

export function getModelForComplexity(complexity: QueryComplexity): string {
  switch (complexity) {
    case "simple":
      return "claude-3-haiku"; // Fast, cheap
    case "complex":
      return "claude-3-5-sonnet"; // Reasoning depth
    case "medium":
    default:
      return "claude-3-haiku"; // Balance
  }
}

/**
 * Send message to RAG assistant with smart routing
 */
export async function sendChatMessage(message: string, sessionId?: string): Promise<RAGResponse> {
  // Analyze complexity for smart routing
  const complexity = analyzeQueryComplexity(message);
  const preferredModel = getModelForComplexity(complexity);
  
  const response = await fetch(API_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message,
      sessionId: sessionId || crypto.randomUUID(),
      // Smart routing hints sent to backend
      complexity,
      preferredModel,
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: "Request failed" }));
    throw new Error(error.error || error.response || "Request failed");
  }

  return response.json();
}

/**
 * Create a React hook for the assistant chat
 */
export function createUseAssistantChat(): () => UseAssistantChatReturn {
  return function useAssistantChat(): UseAssistantChatReturn {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const sendMessage = async (userMessage: string) => {
      setIsLoading(true);
      setError(null);
      
      // Add user message
      setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
      
      // Add placeholder for assistant
      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      try {
        const result = await sendChatMessage(userMessage);
        
        setMessages((prev) =>
          prev.map((msg, idx) =>
            idx === prev.length - 1
              ? { ...msg, content: result.response }
              : msg
          )
        );
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to send message";
        setError(errorMessage);
        setMessages((prev) =>
          prev.map((msg, idx) =>
            idx === prev.length - 1
              ? { ...msg, content: "Sorry, I'm having trouble connecting. Please try again." }
              : msg
          )
        );
      } finally {
        setIsLoading(false);
      }
    };

    return { messages, sendMessage, isLoading, error };
  };
}

/**
 * Fallback responses for demo/offline mode
 */
const fallbackResponses: Record<string, string> = {
  greeting: "Hey there! I'm Assistant, Himanshu's AI career assistant. I can tell you about his projects, skills, experience, or anything else you're curious about!",
  projects: "Himanshu has built several impressive projects! His main ones are:\n\n• **Network Guardian AI** - An AI-powered network threat detection system using ML\n• **CodeFlow-Hook** - An open-source multi-agent code review tool (450+ NPM downloads!)\n• **His Portfolio** - This very site with the RAG-powered assistant you're talking to!",
  skills: "Himanshu's technical skills include:\n\n• **Languages:** JavaScript, TypeScript, Python, Dart, SQL\n• **Frameworks:** React, Next.js, Node.js, Flutter, GraphQL, FastAPI\n• **Cloud/DevOps:** AWS, Docker, GitHub Actions, CI/CD\n• **AI/ML:** RAG Architecture, Gemini API, Machine Learning",
  experience: "Himanshu's experience includes:\n\n• **Ask Jay Services** (Software Engineer): Led disaster recovery, achieved 88% performance improvement, built a Flutter marketplace, and launched 700+ SEO pages\n• **ACS** (Web Developer Intern): Improved frontend performance by 33%, remediated 15+ security vulnerabilities",
  default: "That's a great question! Feel free to ask me about Himanshu's projects, skills, experience, or anything else you'd like to know.",
};

export function getFallbackResponse(message: string): string {
  const lower = message.toLowerCase();
  
  if (lower.includes("who") || lower.includes("hi") || lower.includes("hello") || lower.includes("hey")) {
    return fallbackResponses.greeting;
  }
  if (lower.includes("project")) {
    return fallbackResponses.projects;
  }
  if (lower.includes("skill")) {
    return fallbackResponses.skills;
  }
  if (lower.includes("experience") || lower.includes("job") || lower.includes("work")) {
    return fallbackResponses.experience;
  }
  
  return fallbackResponses.default;
}

import { useState } from "react";
