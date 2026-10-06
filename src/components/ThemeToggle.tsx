"use client";

import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const nextTheme = theme === "light" ? "dark" : "light";

  return (
    <button
      onClick={() => setTheme(nextTheme)}
      className="group relative inline-flex h-10 min-w-10 items-center justify-center rounded-b-md border border-[var(--journal-rule-strong)] bg-[var(--journal-leather)] px-3 text-[#fffaf0] shadow-sm transition-transform hover:translate-y-0.5 dark:text-[var(--journal-brass)]"
      aria-label={`Switch to ${nextTheme} mode`}
      title={`Switch to ${nextTheme} mode`}
    >
      <span className="font-journal-mono text-xs font-bold uppercase tracking-[0.18em]">
        {theme === "light" ? "Night" : "Day"}
      </span>
    </button>
  );
}
