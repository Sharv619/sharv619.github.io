"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useChatbot } from "./ChatbotProvider";
import ThemeToggle from "./ThemeToggle";

const NAV_ITEMS = [
  { name: "Home", href: "#home" },
  { name: "Case Studies", href: "#case-studies" },
  { name: "About", href: "#about" },
  { name: "Career", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { toggleChatbot } = useChatbot();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 36);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigateToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.assign(`/${href}`);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -72 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.45 }}
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
        isScrolled
          ? "border-[var(--journal-rule-strong)] bg-[color:var(--journal-paper)]/95 shadow-md backdrop-blur"
          : "border-transparent bg-[color:var(--journal-paper)]/90"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1500px] items-center justify-between border-x border-[var(--journal-rule)] px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigateToSection("#home")}
          className="font-journal-serif text-3xl font-bold tracking-tight text-[var(--journal-ink)]"
          aria-label="Go to homepage"
        >
          HL
        </button>

        <div className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.name}
              onClick={() => navigateToSection(item.href)}
              className="border-b-2 border-transparent px-3 py-2 text-sm font-semibold text-[var(--journal-ink-muted)] transition-colors hover:border-[var(--journal-verification)] hover:text-[var(--journal-ink)]"
            >
              {item.name}
            </button>
          ))}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <a
            href="/resume"
            className="rounded-md border border-[var(--journal-rule-strong)] px-4 py-2 text-sm font-semibold text-[var(--journal-ink)] transition-colors hover:bg-[var(--journal-leather)] hover:text-[#fffaf0]"
          >
            Resume
          </a>
          <button
            onClick={toggleChatbot}
            className="rounded-sm border border-[#d1ae54] bg-[#f3d57a] px-4 py-2 font-journal-mono text-sm font-bold text-[#332517] shadow-sm transition-transform hover:-translate-y-0.5"
          >
            Ask AI →
          </button>
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setIsMobileMenuOpen((value) => !value)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-[var(--journal-rule-strong)] text-[var(--journal-ink)]"
            aria-label="Toggle navigation"
          >
            <span className="font-journal-mono text-lg">{isMobileMenuOpen ? "×" : "≡"}</span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="journal-page border-t border-[var(--journal-rule)] md:hidden"
          >
            <div className="grid gap-1 px-4 py-4">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.name}
                  onClick={() => navigateToSection(item.href)}
                  className="border-b border-[var(--journal-rule)] px-3 py-3 text-left font-semibold text-[var(--journal-ink)]"
                >
                  {item.name}
                </button>
              ))}
              <button
                onClick={toggleChatbot}
                className="mt-3 rounded-sm bg-[#f3d57a] px-4 py-3 font-journal-mono font-bold text-[#332517]"
              >
                Open Repo RAG
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
