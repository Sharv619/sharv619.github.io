"use client";

import { useState } from "react";
import { geminiService } from "@/services/geminiService";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const systemPrompt = `You are a helpful, friendly career assistant chatting naturally about Himanshu Lade's experience.

RESPONSE STYLE: Chat like a real person - use casual language, "Hey there!", "That's interesting!", "Definitely!", "I think..." etc.

REFER TO HIMANSHU: Talk about him in context like "Himanshu mentioned..." or "Based on his projects..." but keep it conversational.

HUMAN-LIKE: Show personality, be encouraging, add thinking phrases occasionally.

KEEP BRIEF: Responses 20-30 words max.
TOPICS: Career advice, interviews, software development, AI/ML projects.

This is Career Co-Pilot - a preview of his private knowledge system.`;

export function usePortfolioChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (userMessage: string) => {
    setIsLoading(true);
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);

    setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

    try {
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
    } finally {
      setIsLoading(false);
    }
  };

  return { messages, sendMessage, isLoading };
}
