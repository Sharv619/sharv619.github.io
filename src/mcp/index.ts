import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { updatePhaseTool, getProjectStateTool, addDecisionTool } from "./tools/project-tools.js";
import { getKnowledgeBaseTool, listComponentsTool, checkComponentTool } from "./tools/knowledge-tools.js";
import { getAuditReportTool } from "./tools/audit-tools.js";
import {
  detectProjectTypeTool,
  findReferencesTool,
  readKeyFilesTool,
  scanTreeTool,
} from "./tools/repo-context-tools.js";
import {
  auditFlagshipCaseStudiesTool,
  auditGithubAutomationTool,
  auditProjectPositioningTool,
  generateRepoPositioningReportTool,
} from "./tools/portfolio-audit-tools.js";
import {
  auditCloudFunctionsContractsTool,
  auditMedicalSafetyClaimsTool,
  auditPillyDocsTool,
  auditPillyTestsTool,
} from "./tools/pilly-safety-audit-tools.js";
import {
  getAvailableScriptsTool,
  runBuildTool,
  runFullVerificationTool,
  runLintTool,
  runTestsTool,
} from "./tools/verification-runner-tools.js";
import {
  generateTaskPlanTool,
  updateTasksFileTool,
} from "./tools/task-planner-tools.js";

const server = new McpServer({
  name: "portfolio-mcp-server",
  version: "1.0.0",
  description: "MCP server for Himanshu's Portfolio - tracks project state, knowledge base, and audit info"
});

function textResult(result: unknown) {
  return {
    content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }]
  };
}

server.registerTool(
  "get_project_state",
  {
    title: "Get Project State",
    description: "Returns the current state of the portfolio project including phase, progress, and recent decisions"
  },
  async () => {
    const result = await getProjectStateTool();
    return textResult(result);
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
    return textResult(result);
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
    return textResult(result);
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
    return textResult(result);
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
    return textResult(result);
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
    return textResult(result);
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
    return textResult(result);
  }
);

server.registerTool(
  "repo.scan_tree",
  {
    title: "Scan Repo Tree",
    description: "Returns a filtered repository tree with detected frameworks and important files",
    inputSchema: {
      maxDepth: z.number().int().min(1).max(10).optional(),
      ignore: z.array(z.string()).optional()
    }
  },
  async ({ maxDepth, ignore }) => textResult(scanTreeTool(maxDepth, ignore))
);

server.registerTool(
  "repo.read_key_files",
  {
    title: "Read Key Files",
    description: "Reads previews of key repo files without dumping huge or sensitive content",
    inputSchema: {
      files: z.array(z.string()).optional()
    }
  },
  async ({ files }) => textResult(readKeyFilesTool(files))
);

server.registerTool(
  "repo.find_references",
  {
    title: "Find References",
    description: "Searches for a text string or regex and returns file paths with line numbers",
    inputSchema: {
      query: z.string(),
      mode: z.enum(["text", "regex"]).default("text"),
      ignore: z.array(z.string()).optional()
    }
  },
  async ({ query, mode, ignore }) => textResult(findReferencesTool(query, mode, ignore))
);

server.registerTool(
  "repo.detect_project_type",
  {
    title: "Detect Project Type",
    description: "Detects framework, language, package manager, deployment, and verification commands"
  },
  async () => textResult(detectProjectTypeTool())
);

server.registerTool(
  "portfolio.audit_github_automation",
  {
    title: "Audit GitHub Automation",
    description: "Audits the build-time GitHub project feed and fallback portfolio data"
  },
  async () => textResult(auditGithubAutomationTool())
);

server.registerTool(
  "portfolio.audit_flagship_case_studies",
  {
    title: "Audit Flagship Case Studies",
    description: "Checks for flagship case study and career positioning data files"
  },
  async () => textResult(auditFlagshipCaseStudiesTool())
);

server.registerTool(
  "portfolio.audit_project_positioning",
  {
    title: "Audit Project Positioning",
    description: "Checks portfolio copy for overclaiming, missing safety boundaries, and missing case study fields"
  },
  async () => textResult(auditProjectPositioningTool())
);

server.registerTool(
  "portfolio.generate_repo_positioning_report",
  {
    title: "Generate Repo Positioning Report",
    description: "Creates or updates docs/github-repo-positioning.md with repo metadata recommendations"
  },
  async () => textResult(generateRepoPositioningReportTool())
);

server.registerTool(
  "pilly.audit_pilly_docs",
  {
    title: "Audit Pilly Docs",
    description: "Checks for Pilly planning and safety docs, and reports safely when run outside the Pilly repo"
  },
  async () => textResult(auditPillyDocsTool())
);

server.registerTool(
  "pilly.audit_medical_safety_claims",
  {
    title: "Audit Medical Safety Claims",
    description: "Searches for unsafe healthcare wording and explicit safety boundaries"
  },
  async () => textResult(auditMedicalSafetyClaimsTool())
);

server.registerTool(
  "pilly.audit_cloud_functions_contracts",
  {
    title: "Audit Cloud Functions Contracts",
    description: "Checks expected Pilly Cloud Functions exports when run from the Pilly repo"
  },
  async () => textResult(auditCloudFunctionsContractsTool())
);

server.registerTool(
  "pilly.audit_pilly_tests",
  {
    title: "Audit Pilly Tests",
    description: "Reports likely medication workflow and safety test coverage"
  },
  async () => textResult(auditPillyTestsTool())
);

server.registerTool(
  "verify.get_available_scripts",
  {
    title: "Get Available Scripts",
    description: "Reads package.json scripts"
  },
  async () => textResult(getAvailableScriptsTool())
);

server.registerTool(
  "verify.run_lint",
  {
    title: "Run Lint",
    description: "Runs the existing lint script without installing dependencies or modifying files"
  },
  async () => textResult(await runLintTool())
);

server.registerTool(
  "verify.run_tests",
  {
    title: "Run Tests",
    description: "Runs the existing test:run or test script without installing dependencies"
  },
  async () => textResult(await runTestsTool())
);

server.registerTool(
  "verify.run_build",
  {
    title: "Run Build",
    description: "Runs the existing build script without installing dependencies"
  },
  async () => textResult(await runBuildTool())
);

server.registerTool(
  "verify.run_full_verification",
  {
    title: "Run Full Verification",
    description: "Runs lint, tests, and build when scripts exist"
  },
  async () => textResult(await runFullVerificationTool())
);

server.registerTool(
  "tasks.generate_task_plan",
  {
    title: "Generate Task Plan",
    description: "Converts audit results into P0/P1/P2/blocked task buckets",
    inputSchema: {
      goal: z.string(),
      auditResults: z.unknown().optional()
    }
  },
  async ({ goal, auditResults }) => textResult(generateTaskPlanTool(goal, auditResults))
);

server.registerTool(
  "tasks.update_tasks_file",
  {
    title: "Update Tasks File",
    description: "Creates or updates TASKS_V2.md or docs/portfolio-v2-roadmap.md from audit results",
    inputSchema: {
      goal: z.string(),
      auditResults: z.unknown().optional()
    }
  },
  async ({ goal, auditResults }) => {
    const result = updateTasksFileTool(goal, auditResults);
    return textResult(result);
  }
);

const transport = new StdioServerTransport();

server.connect(transport).then(() => {
  console.error("Portfolio MCP Server started on stdio");
}).catch((err) => {
  console.error("Failed to start MCP server:", err);
  process.exit(1);
});
