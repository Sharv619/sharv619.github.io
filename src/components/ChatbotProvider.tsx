"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import ChatbotWidget from "./ChatbotWidget";

interface ChatbotContextType {
  isChatbotOpen: boolean;
  openChatbot: () => void;
  closeChatbot: () => void;
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

  const openChatbot = () => setIsChatbotOpen(true);
  const closeChatbot = () => setIsChatbotOpen(false);
  const toggleChatbot = () => setIsChatbotOpen((prev) => !prev);

  useEffect(() => {
    const handleToggle = () => {
      setIsChatbotOpen((prev) => !prev);
    };

    window.addEventListener("toggle-chatbot", handleToggle);
    return () => window.removeEventListener("toggle-chatbot", handleToggle);
  }, []);

  return (
    <ChatbotContext.Provider value={{ isChatbotOpen, openChatbot, closeChatbot, toggleChatbot }}>
      {children}
      <ChatbotWidget isOpen={isChatbotOpen} onOpen={openChatbot} onClose={closeChatbot} />
    </ChatbotContext.Provider>
  );
}
