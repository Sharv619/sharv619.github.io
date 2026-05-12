"use client";

import AssistantChat from "./AssistantChat";

interface ChatbotWidgetProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export default function ChatbotWidget({ isOpen, onOpen, onClose }: ChatbotWidgetProps) {
  return (
    <>
      {!isOpen && (
        <button
          onClick={onOpen}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110"
          title="Chat with Assistant"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </button>
      )}

      <AssistantChat isOpen={isOpen} onClose={onClose} />
    </>
  );
}
