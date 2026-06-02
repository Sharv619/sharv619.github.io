"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useChatbot } from "./ChatbotProvider";
import ThemeToggle from "./ThemeToggle";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { toggleChatbot } = useChatbot();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "Work", href: "#case-studies" },
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Contact", href: "#contact" },
  ];

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
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "border-b border-stone-200/80 bg-[#f7f4ed]/90 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-[#101010]/90"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center"
          >
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-stone-300 bg-white/70 text-sm font-black tracking-tight text-stone-950 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-white">
              HL
            </span>
          </motion.div>

          <div className="hidden md:flex items-center gap-1 rounded-md border border-stone-200/80 bg-white/55 p-1 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => navigateToSection(item.href)}
                className="rounded px-3 py-2 text-sm font-medium text-stone-700 transition-colors duration-200 hover:bg-stone-950 hover:text-white dark:text-stone-300 dark:hover:bg-white dark:hover:text-stone-950"
              >
                {item.name}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <a
              href="/resume"
              aria-label="Open Himanshu Lade resume page"
              className="rounded-md border border-stone-300 bg-white/70 px-4 py-2 text-sm font-semibold text-stone-900 transition-colors duration-200 hover:border-stone-950 hover:bg-stone-950 hover:text-white dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:bg-white dark:hover:text-stone-950"
            >
              Resume
            </a>

            <button
              onClick={toggleChatbot}
              className="rounded-md bg-teal-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-teal-800 dark:bg-teal-400 dark:text-stone-950 dark:hover:bg-teal-300"
            >
              Ask AI
            </button>

            <ThemeToggle />
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-stone-300 bg-white/70 text-stone-800 dark:border-white/10 dark:bg-white/5 dark:text-stone-200"
              aria-label="Toggle navigation"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-stone-200 bg-[#f7f4ed] md:hidden dark:border-white/10 dark:bg-[#101010]"
          >
            <div className="px-4 py-4 space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => navigateToSection(item.href)}
                  className="block w-full rounded-md px-3 py-2 text-left font-medium text-stone-700 transition-colors duration-200 hover:bg-stone-900 hover:text-white dark:text-stone-300 dark:hover:bg-white dark:hover:text-stone-950"
                >
                  {item.name}
                </button>
              ))}

              <button
                onClick={toggleChatbot}
                className="w-full rounded-md bg-teal-700 px-4 py-3 text-sm font-semibold text-white dark:bg-teal-400 dark:text-stone-950"
              >
                Ask AI
              </button>

              <a
                href="/resume"
                aria-label="Open Himanshu Lade resume page"
                className="block w-full rounded-md border border-stone-300 bg-white/70 px-4 py-3 text-center text-sm font-semibold text-stone-900 dark:border-white/15 dark:bg-white/5 dark:text-white"
              >
                Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
