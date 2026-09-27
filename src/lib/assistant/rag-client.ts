import { useState } from "react";
import { getFallbackResponse } from "./fallback-responses";
import { formatAssistantResponse } from "./response-style";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface Source {
  id: string;
  section: string;
  similarity?: number;
  url?: string;
  title?: string;
}

interface RAGResponse {
  response: string;
  sources: Source[];
  metadata?: {
    modelUsed: string;
    complexity: string;
    chunksRetrieved: number;
    githubProjectsRetrieved?: number;
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
 * Query complexity is kept as metadata only. The Lambda uses Synthetic RAG by
 * default and blocks accidental paid model polishing unless explicitly enabled.
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
    case "complex":
    case "medium":
    default:
      return "synthetic-rag";
  }
}

/**
 * Send message to RAG assistant with smart routing
 */
export async function sendChatMessage(message: string, sessionId?: string): Promise<RAGResponse> {
  return sendChatMessageWithHistory(message, sessionId);
}

export async function sendChatMessageWithHistory(
  message: string,
  sessionId?: string,
  history: Message[] = []
): Promise<RAGResponse> {
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
      history: history.slice(-6),
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
              ? { ...msg, content: formatAssistantResponse(userMessage, result.response) }
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

export { getFallbackResponse };
