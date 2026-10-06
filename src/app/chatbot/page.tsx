"use client";

import { useState } from "react";

import Navigation from "@/components/Navigation";
import { usePortfolioChat } from "@/hooks/usePortfolioChat";

export default function ChatbotPage() {
  const [input, setInput] = useState("");
  const { messages, sendMessage, isLoading } = usePortfolioChat();

  const handleSend = (): void => {
    const message = input.trim();
    if (!message) return;
    sendMessage(message);
    setInput("");
  };

  return (
    <main className="journal-shell min-h-screen">
      <Navigation />
      <section className="journal-grid min-h-screen px-4 pb-10 pt-28 sm:px-6">
        <div className="mx-auto flex min-h-[calc(100vh-9rem)] max-w-5xl flex-col overflow-hidden rounded-lg border border-[var(--journal-rule)] bg-[var(--journal-paper)] shadow-[var(--journal-shadow)]">
          <header className="border-b border-[var(--journal-rule)] bg-[#f5d66f] px-5 py-4 text-[#2b2118] dark:bg-[#f5deb3]">
            <div className="flex flex-wrap items-center justify-between gap-3"><div><p className="font-journal-mono text-[10px] font-bold uppercase tracking-[0.16em]">Repository desk</p><h1 className="mt-1 font-journal-serif text-3xl font-semibold">Ask the field archive</h1></div><span className="journal-stamp px-3 py-1 text-[10px]">Repo aware</span></div>
          </header>
          <div className="flex-1 space-y-4 overflow-y-auto p-5 sm:p-8">
            {messages.length === 0 ? <div className="journal-card mx-auto max-w-xl p-7 text-center"><p className="journal-kicker">Start with a project</p><p className="mt-3 text-sm leading-6 text-[var(--journal-muted)]">Ask what Himanshu built, which repositories use a technology, or how a system is structured.</p></div> : null}
            {messages.map((message, index) => <div key={`${message.role}-${index}`} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}><p className={`max-w-2xl rounded-lg border px-4 py-3 text-sm leading-6 ${message.role === "user" ? "border-[var(--journal-red)] bg-[var(--journal-red)] text-white" : "border-[var(--journal-rule)] bg-[var(--journal-surface)]"}`}>{message.content}</p></div>)}
            {isLoading ? <p className="font-journal-mono text-xs text-[var(--journal-muted)]">Searching field notes…</p> : null}
          </div>
          <div className="border-t border-[var(--journal-rule)] bg-[var(--journal-surface)] p-4 sm:p-5"><div className="flex gap-2"><input value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={(event) => event.key === "Enter" && handleSend()} placeholder="Ask about a project, skill, or architecture…" className="min-w-0 flex-1 rounded-md border border-[var(--journal-rule)] bg-[var(--journal-paper)] px-4 py-3 font-journal-mono text-sm" disabled={isLoading} /><button onClick={handleSend} className="rounded-md bg-[var(--journal-red)] px-5 py-3 font-semibold text-white disabled:opacity-50" disabled={isLoading || !input.trim()}>Send</button></div></div>
        </div>
      </section>
    </main>
  );
}
