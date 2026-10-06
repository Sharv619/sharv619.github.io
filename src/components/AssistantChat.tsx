"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SourceCard from "./SourceCard";
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
  const messagesEndRef = useRef<HTMLDivElement>(null);

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

    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);

    try {
      const localFirstResponse = getLocalFirstResponse(userMessage);

      const expandedMessage = expandSyntheticRagQuery(userMessage, messages);
      const result = localFirstResponse || getKnowledgeBaseResponse(expandedMessage);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: formatAssistantResponse(userMessage, result.response, result.sources),
          sources: result.sources,
        }
      ]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I couldn't search the local portfolio index. Please try again.",
          sources: [],
        },
      ]);
    } finally {
      setIsLoading(false);
      setIsThinking(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
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
        className="fixed inset-x-3 bottom-20 z-50 sm:inset-x-auto sm:bottom-6 sm:right-6"
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 20 }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex h-[min(620px,72vh)] w-full flex-col overflow-hidden rounded-lg border border-[#c49a29] bg-[var(--journal-paper)] text-[var(--journal-ink)] shadow-[0_18px_45px_rgba(43,33,24,0.28)] sm:w-[420px]">
          <div className="flex items-center justify-between border-b border-[var(--journal-rule)] bg-[#f5d66f] p-4 text-[#2b2118] dark:bg-[#f5deb3]">
            <div className="flex items-center gap-3">
              <span className="journal-stamp">Verified</span>
              <div>
                <h3 className="font-journal-serif text-lg font-semibold">Field Assistant</h3>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[var(--journal-red)]" />
                  <p className="font-journal-mono text-[10px] uppercase tracking-[0.12em]"><span>Repo RAG</span><span aria-hidden="true"> · sources shown</span></p>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              aria-label="Close assistant"
              className="rounded-full p-2 transition-colors hover:bg-black/10"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="journal-grid flex-1 space-y-4 overflow-y-auto p-4">
            {messages.length === 0 && (
              <div className="journal-card py-8 px-5 text-center text-[var(--journal-muted)]">
                <p className="journal-kicker">Ask the archive</p>
                <p className="mt-3 font-journal-serif text-2xl font-semibold text-[var(--journal-ink)]">Project-aware, with receipts.</p>
                <p className="mt-3 text-sm leading-6">
                  Ask me about Himanshu&apos;s projects, skills, or experience. I search verified portfolio evidence and current public repository documentation; try &quot;What projects have you built?&quot;, &quot;What are your latest projects?&quot;, &quot;Which repos use React?&quot;, or ask about any repository by name.
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
                  className={`max-w-[88%] rounded-lg border px-4 py-3 ${
                    msg.role === "user"
                      ? "border-[var(--journal-red)] bg-[var(--journal-red)] text-white"
                      : "border-[var(--journal-rule)] bg-[var(--journal-surface)] text-[var(--journal-ink)] shadow-sm"
                  }`}
                >
                  <p className="whitespace-pre-wrap text-sm leading-6">{msg.content}</p>
                  
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
                <div className="rounded-lg border border-[var(--journal-rule)] bg-[var(--journal-surface)] px-4 py-3">
                  <div className="flex gap-1">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-[var(--journal-red)]" style={{ animationDelay: "0ms" }} />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-[var(--journal-red)]" style={{ animationDelay: "150ms" }} />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-[var(--journal-red)]" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="border-t border-[var(--journal-rule)] bg-[var(--journal-surface)] p-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about Himanshu..."
                disabled={isLoading}
                className="min-w-0 flex-1 rounded-md border border-[var(--journal-rule)] bg-[var(--journal-paper)] px-4 py-2 font-journal-mono text-sm text-[var(--journal-ink)] placeholder:text-[var(--journal-muted)] focus:border-[var(--journal-red)] focus:outline-none focus:ring-2 focus:ring-[var(--journal-red)]/20"
              />
              <button
                onClick={handleSend}
                aria-label="Send message"
                disabled={isLoading || !input.trim()}
                className="rounded-md bg-[var(--journal-red)] px-4 py-2 text-white transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
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
