"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

// Check time-based theme preference (6 AM - 6 PM = light, 6 PM - 6 AM = dark)
function getTimeBasedTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light";

  const now = new Date();
  const hour = now.getHours();

  // Light mode: 6:00 AM to 5:59 PM
  // Dark mode: 6:00 PM to 5:59 AM
  return (hour >= 6 && hour < 18) ? "light" : "dark";
}

// Fallback to system preference (old method)
function getSystemTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light";

  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return prefersDark ? "dark" : "light";
}

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resetToAutoTheme: () => void; // Reset to time-based theme
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

interface ThemeProviderProps {
  children: React.ReactNode;
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Get initial theme from localStorage first
    const stored = localStorage.getItem("theme") as Theme;
    if (stored === "light" || stored === "dark") {
      setTheme(stored);
      return;
    }

    // If no stored theme, use time-based intelligent theme
    const timeBasedTheme = getTimeBasedTheme();
    setTheme(timeBasedTheme);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const root = window.document.documentElement;

    // Remove existing theme classes and add the new one
    root.classList.remove('light', 'dark');
    root.classList.add(theme);

    // Store in localStorage
    localStorage.setItem("theme", theme);
  }, [theme, mounted]);

  const resetToAutoTheme = () => {
    const timeBasedTheme = getTimeBasedTheme();
    setTheme(timeBasedTheme);
    localStorage.removeItem("theme"); // Remove stored preference to use auto
  };

  const value = {
    theme,
    setTheme,
    resetToAutoTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}
