"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";

import { personalInfo, socialLinks } from "@/lib/data";

const EMAIL_USER = "hl";
const EMAIL_DOMAIN = "himanshulade.com";

const LINK_LABELS: Record<keyof typeof socialLinks, string> = {
  github: "GitHub",
  linkedin: "LinkedIn",
  twitter: "X / Twitter",
  email: "Email",
};

export default function Contact() {
  useEffect(() => {
    const href = `mailto:${EMAIL_USER}@${EMAIL_DOMAIN}`;
    document.querySelectorAll<HTMLAnchorElement>("a[data-email-href]").forEach((element) => {
      element.setAttribute("href", href);
    });
  }, []);

  return (
    <section id="contact" className="journal-grid border-t border-[var(--journal-rule)] py-20">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-8">
        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="journal-card p-7 sm:p-10">
          <p className="journal-kicker">Next field note</p>
          <h2 className="mt-4 max-w-3xl font-journal-serif text-4xl font-semibold leading-tight sm:text-6xl">Let&apos;s make the next system less fragile.</h2>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--journal-muted)]">Open to software engineering roles across full-stack systems, platform and reliability work, workflow automation, and applied AI.</p>
          <a data-email-href="" aria-label="Email Himanshu Lade" className="mt-8 inline-flex min-h-12 items-center rounded-full bg-[var(--journal-red)] px-6 py-3 font-semibold text-white transition hover:-translate-y-0.5">
            Write to {personalInfo.name} →
          </a>
        </motion.div>

        <motion.aside initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 }} className="journal-card p-7 sm:p-10">
          <p className="journal-kicker">Coordinates</p>
          <p className="mt-4 font-journal-serif text-2xl font-semibold">{personalInfo.location}</p>
          <p className="mt-2 font-journal-mono text-sm text-[var(--journal-muted)]">{personalInfo.email}</p>
          <div className="mt-8 divide-y divide-[var(--journal-rule)] border-y border-[var(--journal-rule)]">
            {Object.entries(socialLinks).map(([key, url]) => {
              const socialKey = key as keyof typeof socialLinks;
              return (
                <a key={key} href={socialKey === "email" ? undefined : url} data-email-href={socialKey === "email" ? "" : undefined} target={socialKey === "email" ? undefined : "_blank"} rel={socialKey === "email" ? undefined : "noopener noreferrer"} className="group flex min-h-14 items-center justify-between font-journal-mono text-sm font-semibold">
                  {LINK_LABELS[socialKey]}<span className="transition-transform group-hover:translate-x-1">↗</span>
                </a>
              );
            })}
          </div>
        </motion.aside>
      </div>
    </section>
  );
}
