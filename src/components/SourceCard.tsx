"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface Source {
  id: string;
  section: string;
  similarity?: number;
}

interface SourceCardProps {
  sources: Source[];
}

const sectionIcons: Record<string, string> = {
  "Personal Info": "👤",
  Experience: "💼",
  Projects: "🚀",
  Skills: "⚡",
  Values: "🎯",
  Education: "🎓",
  Chatbot: "🤖",
};

const sectionColors: Record<string, string> = {
  "Personal Info": "from-blue-500/20 to-blue-600/10 border-blue-500/30",
  Experience: "from-purple-500/20 to-purple-600/10 border-purple-500/30",
  Projects: "from-green-500/20 to-green-600/10 border-green-500/30",
  Skills: "from-orange-500/20 to-orange-600/10 border-orange-500/30",
  Values: "from-pink-500/20 to-pink-600/10 border-pink-500/30",
  Education: "from-cyan-500/20 to-cyan-600/10 border-cyan-500/30",
  Chatbot: "from-indigo-500/20 to-indigo-600/10 border-indigo-500/30",
};

export default function SourceCard({ sources }: SourceCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!sources || sources.length === 0) return null;

  const visibleSources = isExpanded ? sources : sources.slice(0, 3);

  return (
    <div className="mt-3">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs text-gray-400">📚 Sources:</span>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
        >
          {isExpanded ? "Show less" : `Show all (${sources.length})`}
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {visibleSources.map((source, idx) => {
          const icon = sectionIcons[source.section] || "📄";
          const colorClass = sectionColors[source.section] || "from-gray-500/20 to-gray-600/10 border-gray-500/30";
          
          return (
            <motion.div
              key={`${source.id}-${idx}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className={`
                px-3 py-1.5 rounded-lg border backdrop-blur-sm
                bg-gradient-to-r ${colorClass}
                flex items-center gap-1.5
              `}
            >
              <span className="text-sm">{icon}</span>
              <span className="text-xs text-gray-200 font-medium">
                {source.section}
              </span>
              {source.similarity && (
                <span className="text-xs text-gray-400 ml-1">
                  {Math.round(source.similarity * 100)}%
                </span>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
