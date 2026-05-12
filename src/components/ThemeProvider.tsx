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

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "light";
  
  const stored = localStorage.getItem("theme") as Theme;
  if (stored === "light" || stored === "dark") {
    return stored;
  }
  
  return getTimeBasedTheme();
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  const handleSetTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(newTheme);
  };

  const resetToAutoTheme = () => {
    const timeBasedTheme = getTimeBasedTheme();
    setTheme(timeBasedTheme);
    localStorage.removeItem("theme"); // Remove stored preference to use auto
  };

  const value = {
    theme,
    setTheme: handleSetTheme,
    resetToAutoTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}
