import { writeRepoFile } from "../shared/fs-utils";

interface TaskPlan {
  p0: string[];
  p1: string[];
  p2: string[];
  blocked: string[];
}

export function generateTaskPlanTool(goal: string, auditResults: unknown): TaskPlan {
  const serialized = JSON.stringify(auditResults || {}).toLowerCase();
  const p0: string[] = [];
  const p1: string[] = [];
  const p2: string[] = [];
  const blocked: string[] = [];

  if (serialized.includes("githubautomationfound\":false")) {
    p0.push("Restore or repair GitHub project ingestion before changing portfolio presentation.");
  }
  if (serialized.includes("missingcasestudies") || serialized.includes("flagship case study data file is missing")) {
    p1.push("Add curated flagship case study data for production recovery, Pilly/MediMate Voice, and codeflow-hook.");
  }
  if (serialized.includes("safe boundary") || serialized.includes("unsafe medical")) {
    p0.push("Add explicit healthcare safety boundaries before publishing Pilly/MediMate copy.");
  }
  if (serialized.includes("script") && serialized.includes("not found")) {
    blocked.push("Verification is blocked until missing package scripts are added or the command mapping is updated.");
  }

  if (goal === "portfolio-v2") {
    p1.push("Render flagship case studies before the automated GitHub project feed.");
    p1.push("Add a repo positioning report so upstream GitHub metadata improves portfolio cards.");
    p2.push("Add screenshots and demo links for the highest-priority public repos.");
  }

  if (goal === "pilly") {
    p0.push("Verify medication support copy avoids diagnosis, dosage advice, and emergency triage claims.");
    p1.push("Audit Cloud Functions contracts against reminder, response, missed-dose, and seed-data workflows.");
  }

  if (p0.length === 0 && p1.length === 0 && p2.length === 0 && blocked.length === 0) {
    p1.push("No urgent audit issues detected. Continue with minimal scoped edits and run verification.");
  }

  return { p0: unique(p0), p1: unique(p1), p2: unique(p2), blocked: unique(blocked) };
}

export function updateTasksFileTool(goal: string, auditResults: unknown) {
  const plan = generateTaskPlanTool(goal, auditResults);
  const path = goal === "portfolio-v2" ? "docs/portfolio-v2-roadmap.md" : "TASKS_V2.md";
  const content = `# ${goal} Task Plan

Last updated: ${new Date().toISOString()}

## Current Status

Generated from MCP audit results. Future agents should refresh this file after meaningful audit or implementation changes.

## P0

${formatTasks(plan.p0)}

## P1

${formatTasks(plan.p1)}

## P2

${formatTasks(plan.p2)}

## Blocked

${formatTasks(plan.blocked)}

## Verification Requirements

- Run lint if available.
- Run tests if available.
- Run build if available.
- Report command failures with stdout/stderr summary.
`;

  writeRepoFile(path, content);

  return {
    path,
    updated: true,
    plan,
  };
}

function formatTasks(tasks: string[]): string {
  return tasks.length > 0 ? tasks.map((task) => `- [ ] ${task}`).join("\n") : "- None";
}

function unique(values: string[]): string[] {
  return [...new Set(values)];
}
