"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NeuralBackground from "./NeuralBackground";
import SourceCard from "./SourceCard";
import { sendChatMessageWithHistory } from "@/lib/assistant/rag-client";
import { getKnowledgeBaseResponse } from "@/lib/assistant/fallback-responses";
import { formatAssistantResponse } from "@/lib/assistant/response-style";
import { expandSyntheticRagQuery } from "@/lib/assistant/synthetic-rag";

interface Message {
  role: "user" | "assistant";
  content: string;
  sources?: Array<{ id: string; section: string; similarity?: number; url?: string; title?: string }>;
}

interface AssistantChatProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AssistantChat({ isOpen, onClose }: AssistantChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [useDemo, setUseDemo] = useState(!process.env.NEXT_PUBLIC_ASSISTANT_API);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const sessionIdRef = useRef<string>(crypto.randomUUID());

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const getLocalFirstResponse = (message: string) => {
    const normalized = message.toLowerCase().replace(/[^a-z0-9\s]/g, " ").trim();
    const compact = normalized.replace(/\s/g, "");

    if (["hi", "hey", "hello", "helo", "helloo"].includes(compact) || /\bhackathons?\b/.test(normalized)) {
      return getKnowledgeBaseResponse(message);
    }

    return null;
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput("");
    setIsLoading(true);
    setIsThinking(true);

    // Add user message
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);

    try {
      const localFirstResponse = getLocalFirstResponse(userMessage);

      if (localFirstResponse) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: formatAssistantResponse(userMessage, localFirstResponse.response),
            sources: localFirstResponse.sources,
          },
        ]);
      } else if (useDemo) {
        await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 1000));
        const expandedMessage = expandSyntheticRagQuery(userMessage, messages);
        const result = getKnowledgeBaseResponse(expandedMessage);
        
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: formatAssistantResponse(userMessage, result.response),
            sources: result.sources,
          },
        ]);
      } else {
        // Real RAG mode
        const result = await sendChatMessageWithHistory(userMessage, sessionIdRef.current, messages);
        
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: formatAssistantResponse(userMessage, result.response),
            sources: result.sources,
          },
        ]);
      }
    } catch (error) {
      console.error("Chat error:", error);
      // Fallback on error
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I'm having trouble connecting. Using demo mode instead.",
          sources: [],
        },
      ]);
      setUseDemo(true);
    } finally {
      setIsLoading(false);
      setIsThinking(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 20 }}
        transition={{ duration: 0.2 }}
      >
        <div className="w-96 h-[500px] bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-700/50 flex flex-col overflow-hidden">
          {/* Neural Background */}
          <NeuralBackground isThinking={isThinking} activeNodes={5} />

          {/* Header */}
          <div className="relative z-10 bg-gradient-to-r from-cyan-600 to-blue-600 p-4 flex items-center justify-between rounded-t-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-xl">🤖</span>
              </div>
              <div>
                <h3 className="font-semibold text-white">Assistant</h3>
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${useDemo ? "bg-yellow-400" : "bg-green-400"}`} />
                  <p className="text-xs text-white/70">
                    {useDemo ? "Demo Mode" : "RAG Active"}
                  </p>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="relative z-10 flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && (
              <div className="text-center text-gray-400 py-8">
                <p className="text-2xl mb-2">👋</p>
                <p className="font-medium text-gray-300">Hey! I&apos;m Assistant</p>
                <p className="text-sm mt-2">
                  Ask me about Himanshu&apos;s projects, skills, or experience!
                </p>
              </div>
            )}

            {messages.map((msg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2 ${
                    msg.role === "user"
                      ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
                      : "bg-gray-800/80 text-gray-100 border border-gray-700/50"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                  
                  {msg.role === "assistant" && msg.sources && (
                    <SourceCard sources={msg.sources} />
                  )}
                </div>
              </motion.div>
            ))}

            {isThinking && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="bg-gray-800/80 rounded-2xl px-4 py-3 border border-gray-700/50">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="relative z-10 p-4 border-t border-gray-700/50">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about Himanshu..."
                disabled={isLoading}
                className="flex-1 bg-gray-800/80 border border-gray-600/50 rounded-xl px-4 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500/50 transition-colors"
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
