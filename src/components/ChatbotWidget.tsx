"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePortfolioChat } from "@/hooks/usePortfolioChat";
// Using inline SVG icons instead of lucide-react

interface ChatbotWidgetProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChatbotWidget({ isOpen, onClose }: ChatbotWidgetProps) {
  const [input, setInput] = useState("");
  const { messages, sendMessage, isLoading } = usePortfolioChat();

  const handleSend = () => {
    if (input.trim()) {
      sendMessage(input);
      setInput("");
    }
  };

  if (!isOpen) {
    return (
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
      >
        <button
          onClick={() => onClose()} // Note: onClose actually opens it here
          className="w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center transition-colors"
          title="Career Co-Pilot preview"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </button>
      </motion.div>
    );
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
        <div className="w-80 h-96 bg-gray-900 text-white rounded-lg shadow-2xl flex flex-col overflow-hidden border border-gray-700">
          {/* Header */}
          <div className="bg-blue-600 text-white p-3 flex items-center justify-between rounded-t-lg">
            <div>
              <h3 className="font-semibold text-sm">Career Co-Pilot preview</h3>
              <p className="text-xs opacity-90">AI Career Assistant</p>
            </div>
            <button
              onClick={onClose}
              className="hover:bg-blue-700 rounded-full p-1 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-3 space-y-3 overflow-y-auto">
            {messages.length === 0 && (
              <div className="text-center text-gray-400 text-sm py-4">
                <p className="mb-2">👋 Welcome to Career Co-Pilot!</p>
                <div className="text-left max-w-full space-y-2 text-xs">
                  <p className="font-semibold text-gray-300">Hi! I am a preview of <strong>Career Co-Pilot</strong>, Himanshu Lade's personal AI knowledge base assistant.</p>
                  <p>This system demonstrates a private repository project for comprehensive career advice and technical insights.</p>
                  <p className="text-blue-400">🔧 Built as a RAG (Retrieval-Augmented Generation) chatbot using React, TypeScript, and Gemini API.</p>
                  <p className="text-green-400">📚 Leverages a 47-page knowledge base with advanced features.</p>
                  <p className="text-purple-400">⚡ Technical highlights: localStorage caching, multi-document processing, intelligent Q&A.</p>
                  <p className="text-yellow-400">🎯 Focus: Performance optimization for large document sets.</p>
                  <div className="border-t border-gray-600 pt-2 mt-3">
                    <p className="text-gray-300 font-medium">I offer: Personalized career guidance, Technical interview prep, Best practices, AI/ML recommendations, Learning roadmaps.</p>
                    <p className="text-red-400 italic">Note: This is a preview - ask about the project architecture or demo questions!</p>
                  </div>
                </div>
              </div>
            )}
            {messages.map((msg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: msg.role === "user" ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`text-sm ${msg.role === "user" ? "text-right" : "text-left"}`}
              >
                <div
                  className={`inline-block max-w-[85%] p-2 rounded-lg ${
                    msg.role === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-700 text-gray-100"
                  }`}
                >
                  <p>{msg.content}</p>
                </div>
              </motion.div>
            ))}
            {isLoading && (
              <motion.div
                className="text-left"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="inline-block bg-gray-700 text-gray-100 p-2 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-1 h-1 bg-gray-400 rounded-full animate-pulse"></div>
                    <div className="w-1 h-1 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: "0.1s" }}></div>
                    <div className="w-1 h-1 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Input */}
          <div className="p-3 border-t border-gray-700">
            <div className="flex space-x-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask about Career Co-Pilot..."
                className="flex-1 px-3 py-2 bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                disabled={isLoading}
              />
              <button
                onClick={handleSend}
                className="px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded-md disabled:opacity-50 transition-colors"
                disabled={isLoading || !input.trim()}
              >
                <svg
                  className="w-4 h-4 transform rotate-45"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
