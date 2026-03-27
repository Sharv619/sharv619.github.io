import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";

interface ProjectPhase {
  phase: string;
  status: "pending" | "in_progress" | "completed" | "blocked";
  notes?: string;
  updatedAt: string;
}

interface ProjectState {
  project: string;
  version: string;
  currentPhase: string;
  phases: ProjectPhase[];
  recentDecisions: string[];
  lastUpdated: string;
}

const CONTEXT_FILE = join(process.cwd(), "mcp-context.json");

function getDefaultState(): ProjectState {
  return {
    project: "Himanshu Portfolio",
    version: "2.0.0",
    currentPhase: "audit",
    phases: [
      {
        phase: "audit",
        status: "in_progress",
        notes: "Running portfolio audit using MCP tools",
        updatedAt: new Date().toISOString()
      },
      {
        phase: "mcp-server",
        status: "pending",
        notes: "Building MCP server for context tracking",
        updatedAt: ""
      },
      {
        phase: "rag-chatbot",
        status: "pending",
        notes: "Building RAG chatbot with neural visualization",
        updatedAt: ""
      },
      {
        phase: "deployment",
        status: "pending",
        notes: "Deploying to production",
        updatedAt: ""
      }
    ],
    recentDecisions: [
      "Using pgvector on RDS instead of OpenSearch (free tier)",
      "Using HuggingFace Inference API for embeddings + LLM (free)",
      "Neural visualization: mix of 2D canvas + 3D elements",
      "Admin UI for knowledge base management",
      "Name: Assistant (not Career Co-Pilot)"
    ],
    lastUpdated: new Date().toISOString()
  };
}

function readContext(): ProjectState {
  try {
    if (existsSync(CONTEXT_FILE)) {
      const data = readFileSync(CONTEXT_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch (error) {
    console.error("Error reading context:", error);
  }
  return getDefaultState();
}

function writeContext(state: ProjectState): void {
  try {
    writeFileSync(CONTEXT_FILE, JSON.stringify(state, null, 2));
  } catch (error) {
    console.error("Error writing context:", error);
  }
}

export async function getProjectStateTool(): Promise<ProjectState> {
  return readContext();
}

export async function updatePhaseTool(
  phase: string, 
  status: string, 
  notes?: string
): Promise<{ success: boolean; state: ProjectState }> {
  const state = readContext();
  
  const phaseIndex = state.phases.findIndex(p => p.phase === phase);
  if (phaseIndex !== -1) {
    const validStatuses = ["pending", "in_progress", "completed", "blocked"];
    if (validStatuses.includes(status)) {
      state.phases[phaseIndex].status = status as ProjectPhase["status"];
    }
    state.phases[phaseIndex].updatedAt = new Date().toISOString();
    if (notes) {
      state.phases[phaseIndex].notes = notes;
    }
  }
  
  state.currentPhase = phase;
  state.lastUpdated = new Date().toISOString();
  
  writeContext(state);
  
  return { success: true, state };
}

export async function addDecisionTool(decision: string): Promise<{ success: boolean }> {
  const state = readContext();
  state.recentDecisions.push(decision);
  state.lastUpdated = new Date().toISOString();
  writeContext(state);
  return { success: true };
}
