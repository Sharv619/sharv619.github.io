import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { updatePhaseTool, getProjectStateTool, addDecisionTool } from "./tools/project-tools.js";
import { getKnowledgeBaseTool, listComponentsTool, checkComponentTool } from "./tools/knowledge-tools.js";
import { getAuditReportTool } from "./tools/audit-tools.js";

const server = new McpServer({
  name: "portfolio-mcp-server",
  version: "1.0.0",
  description: "MCP server for Himanshu's Portfolio - tracks project state, knowledge base, and audit info"
});

server.registerTool(
  "get_project_state",
  {
    title: "Get Project State",
    description: "Returns the current state of the portfolio project including phase, progress, and recent decisions"
  },
  async () => {
    const result = await getProjectStateTool();
    return {
      content: [{ type: "text", text: JSON.stringify(result, null, 2) }]
    };
  }
);

server.registerTool(
  "update_phase",
  {
    title: "Update Phase",
    description: "Update the current project phase and progress",
    inputSchema: {
      phase: z.string().describe("Phase name: audit, mcp-server, rag-chatbot, deployment"),
      status: z.string().describe("Status: pending, in_progress, completed, blocked"),
      notes: z.string().optional().describe("Additional notes about the current phase")
    }
  },
  async ({ phase, status, notes }) => {
    const result = await updatePhaseTool(phase, status, notes);
    return {
      content: [{ type: "text", text: JSON.stringify(result, null, 2) }]
    };
  }
);

server.registerTool(
  "add_decision",
  {
    title: "Add Decision",
    description: "Add a new architectural decision to the project context",
    inputSchema: {
      decision: z.string().describe("The decision to record")
    }
  },
  async ({ decision }) => {
    const result = await addDecisionTool(decision);
    return {
      content: [{ type: "text", text: JSON.stringify(result, null, 2) }]
    };
  }
);

server.registerTool(
  "get_knowledge_base",
  {
    title: "Get Knowledge Base",
    description: "Returns the current knowledge base structure including personal info, experience, projects, and skills"
  },
  async () => {
    const result = await getKnowledgeBaseTool();
    return {
      content: [{ type: "text", text: JSON.stringify(result, null, 2) }]
    };
  }
);

server.registerTool(
  "list_components",
  {
    title: "List Components",
    description: "Lists all frontend components in the portfolio with their status"
  },
  async () => {
    const result = await listComponentsTool();
    return {
      content: [{ type: "text", text: JSON.stringify(result, null, 2) }]
    };
  }
);

server.registerTool(
  "check_component",
  {
    title: "Check Component",
    description: "Check the status of a specific component",
    inputSchema: {
      component: z.string().describe("Component name to check")
    }
  },
  async ({ component }) => {
    const result = await checkComponentTool(component);
    return {
      content: [{ type: "text", text: JSON.stringify(result, null, 2) }]
    };
  }
);

server.registerTool(
  "get_audit_report",
  {
    title: "Get Audit Report",
    description: "Returns the latest portfolio audit report including security issues, orphaned code, and recommendations"
  },
  async () => {
    const result = await getAuditReportTool();
    return {
      content: [{ type: "text", text: JSON.stringify(result, null, 2) }]
    };
  }
);

const transport = new StdioServerTransport();

server.connect(transport).then(() => {
  console.error("Portfolio MCP Server started on stdio");
}).catch((err) => {
  console.error("Failed to start MCP server:", err);
  process.exit(1);
});
