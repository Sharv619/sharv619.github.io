# Theme

## Compact token summary

- Framework: Next.js 16 App Router, React 19, Tailwind CSS v4.
- Light: background #f7f4ed, foreground #151515, primary #0f766e, accent #ebe5d8, border #d8d0c2.
- Dark: background #101010, foreground #f5f2ea, primary #2dd4bf, accent #1f1f1c, border #34342f.
- Font: Inter/system sans through next/font.
- Layout: max-width 7xl, responsive Tailwind breakpoints, desktop section snap.
- Motion: Framer Motion for navigation, cards, assistant, and in-view transitions.

## globals.css

```css
@import "tailwindcss";

:root {
  --color-background: #f7f4ed;
  --color-foreground: #151515;
  --color-primary: #0f766e;
  --color-primary-hover: #115e59;
  --color-secondary: #57534e;
  --color-accent: #ebe5d8;
  --color-border: #d8d0c2;
  --color-muted: #78716c;
  --color-background-dark: #101010;
  --color-foreground-dark: #f5f2ea;
  --color-primary-dark: #2dd4bf;
  --color-primary-hover-dark: #5eead4;
  --color-secondary-dark: #d6d3d1;
  --color-accent-dark: #1f1f1c;
  --color-border-dark: #34342f;
  --color-muted-dark: #a8a29e;
}

.light {
  --bg-primary: var(--color-background);
  --text-primary: var(--color-foreground);
  --text-secondary: var(--color-secondary);
  --bg-secondary: var(--color-accent);
  --border-color: var(--color-border);
  --button-primary: var(--color-primary);
  --button-primary-hover: var(--color-primary-hover);
}

.dark {
  --bg-primary: var(--color-background-dark);
  --text-primary: var(--color-foreground-dark);
  --text-secondary: var(--color-secondary-dark);
  --bg-secondary: var(--color-accent-dark);
  --border-color: var(--color-border-dark);
  --button-primary: var(--color-primary-dark);
  --button-primary-hover: var(--color-primary-hover-dark);
}

html {
  scroll-behavior: smooth;
  scroll-padding-top: 0;
}

body {
  background: var(--bg-primary);
  color: var(--text-primary);
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

::selection {
  background: #0f766e;
  color: #ffffff;
}

.text-balance {
  text-wrap: balance;
}

@media (min-width: 768px) {
  html {
    scroll-snap-type: y mandatory;
  }

  .portfolio-scroll-shell > section {
    min-height: 100svh;
    scroll-snap-align: start;
    scroll-snap-stop: always;
  }
}

.portfolio-grid {
  background-image:
    linear-gradient(to right, rgba(15, 118, 110, 0.08) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(15, 118, 110, 0.08) 1px, transparent 1px);
  background-size: 42px 42px;
}

.dark .portfolio-grid {
  background-image:
    linear-gradient(to right, rgba(45, 212, 191, 0.1) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(45, 212, 191, 0.1) 1px, transparent 1px);
}
```

## ThemeProvider

```tsx
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
```

