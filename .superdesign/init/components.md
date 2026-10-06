# Shared UI Components

## ThemeToggle
- Source: `src/components/ThemeToggle.tsx`
- Purpose: persistent light/dark theme control.

```tsx
"use client";

import { useEffect, useState } from "react";
import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const timeoutId = window.setTimeout(() => setMounted(true), 0);
    return () => window.clearTimeout(timeoutId);
  }, []);

  const isDark = mounted && theme === "dark";
  const nextTheme = isDark ? "light" : "dark";

  const toggleTheme = () => {
    setTheme(nextTheme);
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      disabled={!mounted}
      aria-label={`Switch to ${nextTheme} mode`}
      title={`Switch to ${nextTheme} mode`}
      className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-stone-300 bg-white/80 text-stone-800 shadow-sm backdrop-blur transition-colors duration-200 hover:border-stone-950 hover:bg-stone-950 hover:text-white disabled:pointer-events-none disabled:opacity-60 dark:border-white/15 dark:bg-white/5 dark:text-stone-100 dark:hover:bg-white dark:hover:text-stone-950"
    >
      {isDark ? (
        <svg aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.36 6.36-.7-.7M6.34 6.34l-.7-.7m12.72 0-.7.7M6.34 17.66l-.7.7M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" />
        </svg>
      ) : (
        <svg aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.35 15.35A9 9 0 0 1 8.65 3.65 9 9 0 1 0 20.35 15.35Z" />
        </svg>
      )}
    </button>
  );
}
```

## SourceCard
- Source: `src/components/SourceCard.tsx`
- Purpose: assistant evidence links.

```tsx
"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface Source {
  id: string;
  section: string;
  similarity?: number;
  url?: string;
  title?: string;
}

interface SourceCardProps {
  sources: Source[];
}

const sectionIcons: Record<string, string> = {
  "Personal Info": "👤",
  Experience: "💼",
  Projects: "🚀",
  "GitHub Projects": "💻",
  "GitHub README": "📖",
  Skills: "⚡",
  Values: "🎯",
  Education: "🎓",
  Chatbot: "🤖",
};

const sectionColors: Record<string, string> = {
  "Personal Info": "from-blue-500/20 to-blue-600/10 border-blue-500/30",
  Experience: "from-purple-500/20 to-purple-600/10 border-purple-500/30",
  Projects: "from-green-500/20 to-green-600/10 border-green-500/30",
  "GitHub Projects": "from-green-500/20 to-emerald-600/10 border-green-500/30",
  "GitHub README": "from-emerald-500/20 to-cyan-600/10 border-emerald-500/30",
  Skills: "from-orange-500/20 to-orange-600/10 border-orange-500/30",
  Values: "from-pink-500/20 to-pink-600/10 border-pink-500/30",
  Education: "from-cyan-500/20 to-cyan-600/10 border-cyan-500/30",
  Chatbot: "from-indigo-500/20 to-indigo-600/10 border-indigo-500/30",
};

export default function SourceCard({ sources }: SourceCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!sources || sources.length === 0) return null;

  const visibleSources = isExpanded ? sources : sources.slice(0, 3);
  const formatSimilarity = (similarity: number): string | null => {
    if (similarity <= 0 || similarity > 1) {
      return null;
    }

    return `${Math.round(similarity * 100)}%`;
  };

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
          const sourceLabel = source.title || source.section;
          const similarityLabel = source.similarity ? formatSimilarity(source.similarity) : null;
          const sourceContent = (
            <>
              <span className="text-sm">{icon}</span>
              <span className="text-xs text-gray-200 font-medium">
                {sourceLabel}
              </span>
              {similarityLabel && (
                <span className="text-xs text-gray-400 ml-1">
                  {similarityLabel}
                </span>
              )}
            </>
          );
          
          const className = `
            px-3 py-1.5 rounded-lg border backdrop-blur-sm
            bg-gradient-to-r ${colorClass}
            flex items-center gap-1.5
          `;

          return source.url ? (
            <motion.a
              key={`${source.id}-${idx}`}
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className={className}
            >
              {sourceContent}
            </motion.a>
          ) : (
            <motion.div
              key={`${source.id}-${idx}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className={className}
            >
              {sourceContent}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
```

