import { getPackageScripts, runNpmScript } from "../shared/command-utils";

export function getAvailableScriptsTool() {
  return {
    scripts: getPackageScripts(),
  };
}

export async function runLintTool() {
  return runNpmScript("lint");
}

export async function runTestsTool() {
  const scripts = getPackageScripts();
  return runNpmScript(scripts["test:run"] ? "test:run" : "test", 120000);
}

export async function runBuildTool() {
  return runNpmScript("build", 180000);
}

export async function runFullVerificationTool() {
  const scripts = getPackageScripts();
  const lint = scripts.lint ? await runLintTool() : null;
  const test = scripts["test:run"] || scripts.test ? await runTestsTool() : null;
  const build = scripts.build ? await runBuildTool() : null;
  const results = [lint, test, build].filter((result) => result !== null);

  return {
    lint,
    test,
    build,
    overallSuccess: results.every((result) => result.success),
    recommendations: results.some((result) => !result.success)
      ? ["Review failed command output before editing unrelated files."]
      : [],
  };
}
