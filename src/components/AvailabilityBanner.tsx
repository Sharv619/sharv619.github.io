"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AvailabilityBanner() {
  const [isVisible, setIsVisible] = useState(true);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem("availability-banner-dismissed");
    if (dismissed) {
      window.setTimeout(() => {
        setIsVisible(false);
        setIsDismissed(true);
      }, 0);
    }
  }, []);

  const dismissBanner = () => {
    setIsVisible(false);
    setIsDismissed(true);
    localStorage.setItem("availability-banner-dismissed", "true");
  };

  if (isDismissed) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed top-16 left-0 right-0 z-40 bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">
                    <strong>Available for software engineering roles</strong> - backend systems, production reliability, cloud deployment, and AI-assisted workflows.
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <a
                  href="#contact"
                  aria-label="Contact Himanshu Lade about availability"
                  className="inline-flex min-h-11 items-center rounded-md border border-white/30 px-3 py-2 text-xs font-medium text-white transition-colors duration-200 hover:bg-white/10"
                  onClick={dismissBanner}
                >
                  Connect
                </a>
                <button
                  onClick={dismissBanner}
                  className="inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-md transition-colors duration-200 hover:bg-white/10"
                  aria-label="Dismiss"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
