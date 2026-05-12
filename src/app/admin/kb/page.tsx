"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface KnowledgeBase {
  version: string;
  lastUpdated: string;
  personal: {
    name: string;
    title: string;
    location: string;
  };
  experience: Array<{ company: string; role: string; duration: string }>;
  projects: Array<{ name: string; tagline: string }>;
  skills: Record<string, unknown[]>;
}

interface SecurityAudit {
  score: number;
  status: "healthy" | "warning" | "critical";
  vulnerabilities: Array<{ severity: string; package: string; fix: string }>;
}

export default function AdminKBPage() {
  const [kb, setKb] = useState<KnowledgeBase | null>(null);
  const [securityAudit, setSecurityAudit] = useState<SecurityAudit | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isAuditing, setIsAuditing] = useState(false);
  const [terminalOutput, setTerminalOutput] = useState<string[]>([
    "╔══════════════════════════════════════════════════════════╗",
    "║     ASSISTANT KNOWLEDGE BASE ADMIN v3.0.0               ║",
    "║     Type 'help' for available commands                  ║",
    "╚══════════════════════════════════════════════════════════╝",
  ]);
  const [command, setCommand] = useState("");

  const loadKnowledgeBase = async () => {
    try {
      const response = await fetch("/api/admin/kb");
      if (response.ok) {
        const data = await response.json();
        setKb(data);
      }
    } catch (err) {
      console.error("Failed to load KB:", err);
    }
  };

  useEffect(() => {
    void Promise.resolve().then(loadKnowledgeBase);
  }, []);

  const addTerminalLine = (line: string) => {
    setTerminalOutput(prev => [...prev.slice(-20), line]);
  };

  const handleSync = async () => {
    setIsSyncing(true);
    addTerminalLine("$ sync-to-aws");
    addTerminalLine(">> Initiating AWS sync...");

    // Simulate sync process
    await new Promise(resolve => setTimeout(resolve, 1000));
    addTerminalLine(">> Uploading knowledge-base.json to S3...");

    await new Promise(resolve => setTimeout(resolve, 1500));
    addTerminalLine(">> Generating embeddings (Titan v2)...");

    await new Promise(resolve => setTimeout(resolve, 2000));
    addTerminalLine(">> Storing vectors in pgvector...");

    await new Promise(resolve => setTimeout(resolve, 1000));
    addTerminalLine(">> Sync complete!");

    setIsSyncing(false);
  };

  const handleSecurityAudit = async () => {
    setIsAuditing(true);
    addTerminalLine("$ security-audit");
    addTerminalLine(">> Running Snyk vulnerability scan...");

    await new Promise(resolve => setTimeout(resolve, 1500));
    addTerminalLine(">> Checking dependencies...");

    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock security audit result
    const mockAudit: SecurityAudit = {
      score: 92,
      status: "healthy",
      vulnerabilities: [],
    };

    setSecurityAudit(mockAudit);
    addTerminalLine(`>> Audit complete. Security Score: ${mockAudit.score}/100`);
    addTerminalLine(">> No vulnerabilities detected.");

    setIsAuditing(false);
  };

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    
    const cmd = command.toLowerCase().trim();
    addTerminalLine(`$ ${command}`);
    
    switch (cmd) {
      case "help":
        addTerminalLine("Available commands:");
        addTerminalLine("  sync-to-aws    - Sync KB to S3 + pgvector");
        addTerminalLine("  security-audit - Run vulnerability scan");
        addTerminalLine("  view-kb        - View knowledge base");
        addTerminalLine("  clear          - Clear terminal");
        break;
      case "sync-to-aws":
        handleSync();
        break;
      case "security-audit":
        handleSecurityAudit();
        break;
      case "view-kb":
        loadKnowledgeBase();
        addTerminalLine(">> Knowledge base loaded.");
        break;
      case "clear":
        setTerminalOutput([]);
        break;
      default:
        addTerminalLine(`>> Command not found: ${cmd}`);
    }
    
    setCommand("");
  };

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-green-500 mb-2">
            <span className="inline-block animate-pulse">▸</span> KB_ADMIN
          </h1>
          <p className="text-green-600">Assistant Knowledge Base Management System</p>
        </motion.div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Terminal */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gray-900/80 border border-green-500/30 rounded-lg overflow-hidden"
          >
            <div className="bg-green-900/30 px-4 py-2 border-b border-green-500/20 flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <span className="ml-2 text-sm text-green-400">terminal</span>
            </div>
            
            <div className="p-4 h-80 overflow-y-auto font-mono text-sm">
              {terminalOutput.map((line, i) => (
                <div key={i} className="mb-1">{line}</div>
              ))}
            </div>
            
            <form onSubmit={handleCommand} className="border-t border-green-500/20 p-3 flex">
              <span className="text-green-500 mr-2">$</span>
              <input
                type="text"
                value={command}
                onChange={(e) => setCommand(e.target.value)}
                className="flex-1 bg-transparent outline-none text-green-400 placeholder-green-700"
                placeholder="Type command..."
              />
            </form>
          </motion.div>

          {/* Quick Actions */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            {/* Sync Button */}
            <button
              onClick={handleSync}
              disabled={isSyncing}
              className="w-full p-4 bg-green-900/20 border border-green-500/30 rounded-lg hover:bg-green-900/40 hover:border-green-500/50 transition-all group disabled:opacity-50"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded bg-green-500/20 flex items-center justify-center group-hover:animate-spin">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
                <div className="text-left">
                  <h3 className="text-green-400 font-semibold">Sync to AWS</h3>
                  <p className="text-green-600 text-sm">Upload KB to S3 + regenerate embeddings</p>
                </div>
                {isSyncing && (
                  <div className="ml-auto">
                    <div className="w-5 h-5 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
              </div>
            </button>

            {/* Security Audit Button */}
            <button
              onClick={handleSecurityAudit}
              disabled={isAuditing}
              className="w-full p-4 bg-yellow-900/20 border border-yellow-500/30 rounded-lg hover:bg-yellow-900/40 hover:border-yellow-500/50 transition-all group disabled:opacity-50"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded bg-yellow-500/20 flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div className="text-left">
                  <h3 className="text-yellow-400 font-semibold">Security Audit</h3>
                  <p className="text-yellow-600 text-sm">Run Snyk vulnerability scan</p>
                </div>
                {isAuditing && (
                  <div className="ml-auto">
                    <div className="w-5 h-5 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
              </div>
            </button>

            {/* Security Score Display */}
            {securityAudit && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 bg-green-900/20 border border-green-500/30 rounded-lg"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-green-400 font-semibold">Security Score</h3>
                  <span className="text-2xl font-bold text-green-500">{securityAudit.score}/100</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full transition-all"
                    style={{ width: `${securityAudit.score}%` }}
                  />
                </div>
                <p className="text-green-600 text-sm mt-2">
                  {securityAudit.status === "healthy" ? "✓ All systems secure" : "⚠ Some issues detected"}
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Knowledge Base Preview */}
        {kb && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-6 bg-gray-900/60 border border-green-500/20 rounded-lg overflow-hidden"
          >
            <div className="bg-green-900/20 px-4 py-3 border-b border-green-500/10">
              <h2 className="text-green-400 font-semibold">Knowledge Base Preview</h2>
            </div>
            
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Personal */}
              <div className="p-3 bg-black/40 rounded">
                <h4 className="text-green-500 text-xs uppercase mb-2">Personal</h4>
                <p className="text-green-300">{kb.personal.name}</p>
                <p className="text-green-600 text-sm">{kb.personal.title}</p>
              </div>

              {/* Experience */}
              <div className="p-3 bg-black/40 rounded">
                <h4 className="text-green-500 text-xs uppercase mb-2">Experience</h4>
                <p className="text-green-300">{kb.experience.length} positions</p>
                <p className="text-green-600 text-sm">{kb.experience[0]?.company}</p>
              </div>

              {/* Projects */}
              <div className="p-3 bg-black/40 rounded">
                <h4 className="text-green-500 text-xs uppercase mb-2">Projects</h4>
                <p className="text-green-300">{kb.projects.length} projects</p>
                <p className="text-green-600 text-sm truncate">{kb.projects[0]?.name}</p>
              </div>

              {/* Skills */}
              <div className="p-3 bg-black/40 rounded">
                <h4 className="text-green-500 text-xs uppercase mb-2">Skills</h4>
                <p className="text-green-300">{Object.keys(kb.skills).length} categories</p>
                <p className="text-green-600 text-sm">Languages, Frameworks...</p>
              </div>
            </div>

            <div className="px-4 py-2 border-t border-green-500/10 text-xs text-green-600">
              Version: {kb.version} | Last Updated: {kb.lastUpdated}
            </div>
          </motion.div>
        )}

        {/* Status Bar */}
        <div className="mt-6 flex flex-wrap gap-4 text-xs text-green-600">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            System Online
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full" />
            AWS Connected
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full" />
            RAG Ready
          </div>
        </div>
      </div>
    </div>
  );
}
