import { execFile } from "child_process";
import { promisify } from "util";
import { readJsonFile } from "./fs-utils";

const execFileAsync = promisify(execFile);

interface PackageJson {
  scripts?: Record<string, string>;
}

export interface CommandResult {
  command: string;
  success: boolean;
  stdout: string;
  stderr: string;
  error?: string;
}

export function getPackageScripts(): Record<string, string> {
  return readJsonFile<PackageJson>("package.json", {}).scripts || {};
}

export function resolveScriptCommand(scriptName: string): string | null {
  const scripts = getPackageScripts();
  return scripts[scriptName] ? `npm run ${scriptName}` : null;
}

export async function runNpmScript(scriptName: string, timeoutMs = 120000): Promise<CommandResult> {
  const command = resolveScriptCommand(scriptName);

  if (!command) {
    return {
      command: `npm run ${scriptName}`,
      success: false,
      stdout: "",
      stderr: "",
      error: `Script "${scriptName}" not found`,
    };
  }

  try {
    const result = await execFileAsync("npm", ["run", scriptName], {
      timeout: timeoutMs,
      maxBuffer: 1024 * 1024 * 4,
    });

    return {
      command,
      success: true,
      stdout: result.stdout,
      stderr: result.stderr,
    };
  } catch (error) {
    const execError = error as {
      stdout?: string;
      stderr?: string;
      message?: string;
      killed?: boolean;
      signal?: string;
    };

    return {
      command,
      success: false,
      stdout: execError.stdout || "",
      stderr: execError.stderr || "",
      error: execError.killed
        ? `Command timed out after ${timeoutMs}ms`
        : execError.message || "Command failed",
    };
  }
}
