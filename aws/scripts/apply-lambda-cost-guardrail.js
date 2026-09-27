#!/usr/bin/env node

const { execFileSync } = require("node:child_process");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");

const FUNCTION_NAME = process.env.LAMBDA_FUNCTION_NAME || "Assistant-RAG-Orchestrator";
const REGION = process.env.AWS_REGION || "us-east-1";

function runAws(args, options = {}) {
  return execFileSync("aws", args, {
    encoding: "utf8",
    stdio: options.stdio || ["ignore", "pipe", "inherit"],
    env: {
      ...process.env,
      AWS_PAGER: "",
    },
  });
}

function waitForLambda() {
  runAws([
    "lambda",
    "wait",
    "function-updated",
    "--function-name",
    FUNCTION_NAME,
    "--region",
    REGION,
  ], { stdio: "inherit" });
}

function getEnvironmentVariables() {
  const raw = runAws([
    "lambda",
    "get-function-configuration",
    "--function-name",
    FUNCTION_NAME,
    "--region",
    REGION,
    "--query",
    "Environment.Variables",
    "--output",
    "json",
    "--no-cli-pager",
  ]).trim();

  return raw && raw !== "null" ? JSON.parse(raw) : {};
}

function printSummary() {
  runAws([
    "lambda",
    "get-function-configuration",
    "--function-name",
    FUNCTION_NAME,
    "--region",
    REGION,
    "--query",
    "{Runtime:Runtime,Status:LastUpdateStatus,Polish:Environment.Variables.ENABLE_BEDROCK_POLISH,SimpleModel:Environment.Variables.SIMPLE_CHAT_MODEL,ComplexModel:Environment.Variables.COMPLEX_CHAT_MODEL,CostGuardrail:Environment.Variables.COST_GUARDRAIL_MODE,AllowAnthropic:Environment.Variables.ALLOW_ANTHROPIC_MODELS}",
    "--output",
    "table",
    "--no-cli-pager",
  ], { stdio: "inherit" });
}

function main() {
  console.log(`Applying Lambda cost guardrail to ${FUNCTION_NAME} in ${REGION}...`);

  waitForLambda();

  const variables = getEnvironmentVariables();
  const guardedVariables = {
    ...variables,
    ENABLE_BEDROCK_POLISH: "false",
    SIMPLE_CHAT_MODEL: "amazon.nova-micro-v1:0",
    COST_GUARDRAIL_MODE: "strict",
    MAX_POLISH_TOKENS: "200",
  };

  delete guardedVariables.COMPLEX_CHAT_MODEL;
  delete guardedVariables.ALLOW_ANTHROPIC_MODELS;

  const envFile = path.join(os.tmpdir(), `${FUNCTION_NAME}-guarded-env.json`);
  fs.writeFileSync(envFile, JSON.stringify({ Variables: guardedVariables }, null, 2));

  runAws([
    "lambda",
    "update-function-configuration",
    "--function-name",
    FUNCTION_NAME,
    "--region",
    REGION,
    "--environment",
    `file://${envFile}`,
    "--no-cli-pager",
  ], { stdio: "inherit" });

  waitForLambda();
  printSummary();

  console.log("Cost guardrail applied: Bedrock polish disabled, Anthropic opt-in removed, Nova Micro kept as the only fallback polish model.");
}

main();
