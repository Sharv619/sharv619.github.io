"use client";

import { motion, useReducedMotion } from "framer-motion";

interface FadeInViewProps {
  children: React.ReactNode;
  delay?: number;
  yOffset?: number;
  duration?: number;
  blur?: number;
  className?: string;
}

export function FadeInView({
  children,
  delay = 0,
  yOffset = 20,
  duration = 0.6,
  blur = 0,
  className,
}: FadeInViewProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: yOffset, filter: blur > 0 ? `blur(${blur}px)` : "blur(0px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration, delay }}
      viewport={{ once: true, margin: "-100px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
