"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import ChatbotWidget from "./ChatbotWidget";

interface ChatbotContextType {
  isChatbotOpen: boolean;
  toggleChatbot: () => void;
}

const ChatbotContext = createContext<ChatbotContextType | undefined>(undefined);

export function useChatbot() {
  const context = useContext(ChatbotContext);
  if (context === undefined) {
    throw new Error("useChatbot must be used within a ChatbotProvider");
  }
  return context;
}

interface ChatbotProviderProps {
  children: ReactNode;
}

export default function ChatbotProvider({ children }: ChatbotProviderProps) {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const toggleChatbot = () => setIsChatbotOpen(prev => !prev);

  return (
    <ChatbotContext.Provider value={{ isChatbotOpen, toggleChatbot }}>
      {children}
      <ChatbotWidget />
    </ChatbotContext.Provider>
  );
}
