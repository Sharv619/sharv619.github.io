"use client";

import { useState } from "react";
import { usePortfolioChat } from "@/hooks/usePortfolioChat";

export default function ChatbotPage() {
  const [input, setInput] = useState("");
  const { messages, sendMessage, isLoading } = usePortfolioChat();

  const handleSend = () => {
    if (input.trim()) {
      sendMessage(input);
      setInput("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        {messages.map((msg, idx) => (
          <div key={idx} className={`p-3 rounded-lg ${msg.role === "user" ? "bg-blue-600 ml-12" : "bg-gray-700 mr-12"}`}>
            <p>{msg.content}</p>
          </div>
        ))}
        {isLoading && <div className="p-3 bg-gray-700 rounded-lg mr-12">Thinking...</div>}
      </div>
      <div className="p-4 border-t border-gray-700">
        <div className="flex">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask about Himanshu's experience..."
            className="flex-1 p-2 bg-gray-800 border border-gray-600 rounded-l-md focus:outline-none"
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-r-md disabled:opacity-50"
            disabled={isLoading || !input.trim()}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
