"use client";

import { useState } from "react";
import { geminiService } from "@/services/geminiService";

interface Message {
  role: "user" | "assistant";
  content: string;
}

// Detect if running on GitHub Pages (static hosting)
const isDemoMode = typeof window !== 'undefined' &&
  (window.location.hostname.includes('sharv619.github.io') ||
   window.location.hostname.includes('github.io') ||
   !process.env.NEXT_PUBLIC_API_KEY ||
   process.env.NEXT_PUBLIC_API_KEY === '');

const demoResponses: { [key: string]: string } = {
  // Technical RAG explanations
  rag: "The RAG (Retrieval-Augmented Generation) architecture I implemented combines vector embeddings, document chunking, and intelligent context retrieval. I used Gemini API with pre-chunked knowledge (500-1000 tokens) and localStorage vector caching to reduce response times from 3-5s to under 300ms! Pretty cool optimization, right? 🤓",

  architecture: "My RAG system uses a modular architecture: document ingestion with metadata extraction, vector similarity search, context window management, and multi-turn conversation design. The production-worthy implementation handles 47 pages of knowledge with intelligent chunking and response ranking. It's basically a mini-knowledge base wrapped in a chat interface! 🚀",

  vector: "Vector embeddings are fascinating! I implemented similarity scoring where each document chunk gets converted into vectors (numerical representations). When you ask a question, I find the most similar chunks using cosine similarity - similar to how recommendation algorithms work. Pre-computed scores make it blazing fast for real-time chat! ⚡",

  // Project discussions
  project: "My projects demonstrate scalable AI integration! From the RAG chatbot you see here to the Codeflow Hook CLI tool that automates code reviews with multiple AI providers. Each one showcases different facets of AI/ML implementation - want details on any specific project? 🎯",

  codeflow: "Codeflow Hook is amazing! It's a CLI tool with multi-agent architecture - one agent for security analysis, another for performance, and one for style consistency. It supports Gemini, GPT, and Claude APIs with intelligent model selection based on task complexity. Reduces code review time by 40% while ensuring quality gates are passed! 🛠️",

  knowledge: "The knowledge management pipeline was built around ETL principles - Extract (from PDFs/Markdown), Transform (into D3.js knowledge graphs), Load (for offline-first PWA access). I implemented XSS protection with DOMPurify and mathematical equation rendering for technical documentation. It converts scattered info into navigable visualizations! 📊",

  // Career/Programming advice
  interview: "For technical interviews, focus on three things: 1) System design patterns (like the microservices in my Flutter marketplace), 2) AI/ML fundamentals you've demonstrated, and 3) Real-world problem-solving from your mission-critical data recovery experience. Practicing explaining complex topics simply is key! 💪",

  career: "Your career path is looking strong! From Flutter marketplace development with three user portals to prod-level disaster recovery, you have production experience most candidates lack. Next step: Highlight your RAG architecture expertise - that's the cutting edge of AI implementation. The demand for that skill is only growing! 📈",

  learn: "For AI/ML development, I recommend: 1) Master Python/vector databases, 2) Study RAG patterns with practical projects, 3) Build production PWA apps (like my offline-first knowledge system), 4) Learn cloud infrastructure (your AWS work), and 5) Practice explaining complex concepts. Start with Google's GenAI docs - they're excellent! 📚",

  // Default responses
  default: "That's an interesting question! This demo showcases the RAG chatbot architecture I built for personalized career guidance. It would normally analyze your query, retrieve relevant information from the knowledge base, and provide contextual responses. Want to hear about my approach to technical challenges or project architecture? 🤖"
};

// Determine which demo response to show based on user input
function getDemoResponse(userMessage: string): string {
  const message = userMessage.toLowerCase();

  if (message.includes('rag') || message.includes('retrieval') || message.includes('augmented')) {
    return demoResponses.rag;
  }
  if (message.includes('architecture') || message.includes('system') || message.includes('design')) {
    return demoResponses.architecture;
  }
  if (message.includes('vector') || message.includes('embedding') || message.includes('similarity')) {
    return demoResponses.vector;
  }
  if (message.includes('project') || message.includes('portfolio') || message.includes('work')) {
    return demoResponses.project;
  }
  if (message.includes('codeflow') || message.includes('cli') || message.includes('automate') || message.includes('git')) {
    return demoResponses.codeflow;
  }
  if (message.includes('knowledge') || message.includes('pipeline') || message.includes('graph') || message.includes('pwa')) {
    return demoResponses.knowledge;
  }
  if (message.includes('interview') || message.includes('prep') || message.includes('technical') || message.includes('hire')) {
    return demoResponses.interview;
  }
  if (message.includes('career') || message.includes('job') || message.includes('path') || message.includes('future')) {
    return demoResponses.career;
  }
  if (message.includes('learn') || message.includes('study') || message.includes('skill') || message.includes('train')) {
    return demoResponses.learn;
  }

  return demoResponses.default;
}

export function usePortfolioChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (userMessage: string) => {
    setIsLoading(true);
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);

    // Add placeholder for assistant response
    setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

    // Simulate realistic typing delay (1-2 seconds)
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

    if (isDemoMode) {
      // Demo mode: Use pre-written responses
      const demoResponse = getDemoResponse(userMessage);
      setMessages((prev) =>
        prev.map((msg, idx) =>
          idx === prev.length - 1
            ? { ...msg, content: demoResponse }
            : msg
        )
      );
    } else {
      // Full API mode (when environment allows)
      try {
        const systemPrompt = `You are a helpful, friendly career assistant chatting naturally about Himanshu Lade's experience.

RESPONSE STYLE: Chat like a real person - use casual language, "Hey there!", "That's interesting!", "Definitely!", "I think..." etc.

REFER TO HIMANSHU: Talk about him in context like "Himanshu mentioned..." or "Based on his projects..." but keep it conversational.

HUMAN-LIKE: Show personality, be encouraging, add thinking phrases occasionally.

KEEP BRIEF: Responses 20-30 words max.
TOPICS: Career advice, interviews, software development, AI/ML projects.

This is Career Co-Pilot - a preview of his private knowledge system.`;

        const response = await geminiService.sendMessage(userMessage, systemPrompt);
        setMessages((prev) =>
          prev.map((msg, idx) =>
            idx === prev.length - 1
              ? { ...msg, content: response }
              : msg
          )
        );
      } catch (error) {
        console.error("Chat error:", error);
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: "Sorry, I'm having trouble connecting. Please try again." },
        ]);
      }
    }

    setIsLoading(false);
  };

  return { messages, sendMessage, isLoading };
}
