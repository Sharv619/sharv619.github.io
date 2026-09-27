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
