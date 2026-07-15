#!/usr/bin/env node
"use strict";

/**
 * Deploys the Guardrail Enforcer runner into AWS.
 *
 * Stands up, idempotently (create-or-update):
 *   1. IAM role for the enforcer Lambda (read/update the target's config).
 *   2. The Assistant-Guardrail-Enforcer Lambda (code from
 *      aws/lambda/guardrail-enforcer).
 *   3. IAM role that lets EventBridge Scheduler invoke the enforcer.
 *   4. An EventBridge Scheduler schedule that fires the enforcer on an interval.
 *
 * Result: the RAG orchestrator's cost guardrail is re-applied automatically, so
 * a redeploy or console edit that reverts it is corrected within one interval.
 *
 * Env overrides:
 *   AWS_REGION            (default us-east-1)
 *   TARGET_FUNCTION_NAME  (default Assistant-RAG-Orchestrator)
 *   SCHEDULE_EXPRESSION   (default "rate(1 hour)")
 */

const { execFileSync } = require("node:child_process");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");

const REGION = process.env.AWS_REGION || "us-east-1";
const TARGET_FUNCTION = process.env.TARGET_FUNCTION_NAME || "Assistant-RAG-Orchestrator";
const SCHEDULE_EXPRESSION = process.env.SCHEDULE_EXPRESSION || "rate(1 hour)";

const ENFORCER_NAME = "Assistant-Guardrail-Enforcer";
const ENFORCER_ROLE = "Assistant-Guardrail-Enforcer-Role";
const SCHEDULER_ROLE = "Assistant-Guardrail-Scheduler-Role";
const SCHEDULE_NAME = "Assistant-Guardrail-Enforcer-Schedule";
const RUNTIME = "nodejs22.x";
const SOURCE_DIR = path.join(__dirname, "..", "lambda", "guardrail-enforcer");

function aws(args, options = {}) {
  return execFileSync("aws", args, {
    encoding: "utf8",
    stdio: options.stdio || ["ignore", "pipe", "pipe"],
    env: { ...process.env, AWS_PAGER: "" },
  });
}

/** Run an AWS command that may legitimately fail; return null on error. */
function awsSoft(args) {
  try {
    return aws(args);
  } catch (_err) {
    return null;
  }
}

function sleep(ms) {
  const until = Date.now() + ms;
  while (Date.now() < until) {
    /* busy wait — deploy script, runs rarely */
  }
}

function writeTempJson(name, value) {
  const file = path.join(os.tmpdir(), name);
  fs.writeFileSync(file, JSON.stringify(value, null, 2));
  return file;
}

function getAccountId() {
  return aws([
    "sts",
    "get-caller-identity",
    "--query",
    "Account",
    "--output",
    "text",
  ]).trim();
}

function ensureRole(roleName, trustPolicy, inlinePolicyName, inlinePolicy) {
  const trustFile = writeTempJson(`${roleName}-trust.json`, trustPolicy);
  const existing = awsSoft(["iam", "get-role", "--role-name", roleName]);

  if (existing) {
    console.log(`Role ${roleName} exists; updating trust + policy.`);
    aws([
      "iam",
      "update-assume-role-policy",
      "--role-name",
      roleName,
      "--policy-document",
      `file://${trustFile}`,
    ]);
  } else {
    console.log(`Creating role ${roleName}.`);
    aws([
      "iam",
      "create-role",
      "--role-name",
      roleName,
      "--assume-role-policy-document",
      `file://${trustFile}`,
    ]);
  }

  const policyFile = writeTempJson(`${roleName}-policy.json`, inlinePolicy);
  aws([
    "iam",
    "put-role-policy",
    "--role-name",
    roleName,
    "--policy-name",
    inlinePolicyName,
    "--policy-document",
    `file://${policyFile}`,
  ]);

  return aws([
    "iam",
    "get-role",
    "--role-name",
    roleName,
    "--query",
    "Role.Arn",
    "--output",
    "text",
  ]).trim();
}

function zipSource() {
  const zipPath = path.join(os.tmpdir(), `${ENFORCER_NAME}.zip`);
  if (fs.existsSync(zipPath)) {
    fs.rmSync(zipPath);
  }
  // Zip only the handler + manifest; @aws-sdk/client-lambda ships with the runtime.
  execFileSync("zip", ["-j", zipPath, "index.js", "package.json"], {
    cwd: SOURCE_DIR,
    stdio: "inherit",
  });
  return zipPath;
}

function ensureLambda(roleArn, zipPath) {
  const exists = awsSoft([
    "lambda",
    "get-function",
    "--function-name",
    ENFORCER_NAME,
    "--region",
    REGION,
  ]);

  const envVars = `Variables={TARGET_FUNCTION_NAME=${TARGET_FUNCTION}}`;

  if (exists) {
    console.log(`Updating ${ENFORCER_NAME} code + config.`);
    aws([
      "lambda",
      "update-function-code",
      "--function-name",
      ENFORCER_NAME,
      "--zip-file",
      `fileb://${zipPath}`,
      "--region",
      REGION,
    ]);
    aws([
      "lambda",
      "wait",
      "function-updated",
      "--function-name",
      ENFORCER_NAME,
      "--region",
      REGION,
    ], { stdio: "inherit" });
    aws([
      "lambda",
      "update-function-configuration",
      "--function-name",
      ENFORCER_NAME,
      "--role",
      roleArn,
      "--handler",
      "index.handler",
      "--runtime",
      RUNTIME,
      "--timeout",
      "60",
      "--environment",
      envVars,
      "--region",
      REGION,
    ]);
  } else {
    console.log(`Creating ${ENFORCER_NAME}. Waiting for IAM role propagation...`);
    // IAM role creation is eventually consistent; retry create on propagation errors.
    let created = false;
    for (let attempt = 1; attempt <= 8 && !created; attempt += 1) {
      const result = awsSoft([
        "lambda",
        "create-function",
        "--function-name",
        ENFORCER_NAME,
        "--runtime",
        RUNTIME,
        "--role",
        roleArn,
        "--handler",
        "index.handler",
        "--timeout",
        "60",
        "--environment",
        envVars,
        "--zip-file",
        `fileb://${zipPath}`,
        "--region",
        REGION,
      ]);
      if (result) {
        created = true;
      } else {
        console.log(`  create attempt ${attempt} failed; retrying in 5s.`);
        sleep(5000);
      }
    }
    if (!created) {
      throw new Error(`Failed to create ${ENFORCER_NAME} after retries.`);
    }
  }

  aws([
    "lambda",
    "wait",
    "function-updated",
    "--function-name",
    ENFORCER_NAME,
    "--region",
    REGION,
  ], { stdio: "inherit" });

  return aws([
    "lambda",
    "get-function-configuration",
    "--function-name",
    ENFORCER_NAME,
    "--region",
    REGION,
    "--query",
    "FunctionArn",
    "--output",
    "text",
  ]).trim();
}

function ensureSchedule(enforcerArn, schedulerRoleArn) {
  const target = {
    Arn: enforcerArn,
    RoleArn: schedulerRoleArn,
  };
  const targetFile = writeTempJson(`${SCHEDULE_NAME}-target.json`, target);

  const exists = awsSoft([
    "scheduler",
    "get-schedule",
    "--name",
    SCHEDULE_NAME,
    "--region",
    REGION,
  ]);

  const common = [
    "--name",
    SCHEDULE_NAME,
    "--schedule-expression",
    SCHEDULE_EXPRESSION,
    "--flexible-time-window",
    "Mode=OFF",
    "--target",
    `file://${targetFile}`,
    "--region",
    REGION,
  ];

  if (exists) {
    console.log(`Updating schedule ${SCHEDULE_NAME} (${SCHEDULE_EXPRESSION}).`);
    aws(["scheduler", "update-schedule", ...common]);
  } else {
    console.log(`Creating schedule ${SCHEDULE_NAME} (${SCHEDULE_EXPRESSION}).`);
    aws(["scheduler", "create-schedule", ...common]);
  }
}

function main() {
  const accountId = getAccountId();
  const targetArn = `arn:aws:lambda:${REGION}:${accountId}:function:${TARGET_FUNCTION}`;
  console.log(`Deploying guardrail runner for ${targetArn}\n`);

  const enforcerRoleArn = ensureRole(
    ENFORCER_ROLE,
    {
      Version: "2012-10-17",
      Statement: [
        {
          Effect: "Allow",
          Principal: { Service: "lambda.amazonaws.com" },
          Action: "sts:AssumeRole",
        },
      ],
    },
    "GuardrailEnforcerPolicy",
    {
      Version: "2012-10-17",
      Statement: [
        {
          Sid: "EnforceGuardrail",
          Effect: "Allow",
          Action: [
            "lambda:GetFunctionConfiguration",
            "lambda:UpdateFunctionConfiguration",
          ],
          Resource: targetArn,
        },
        {
          Sid: "Logs",
          Effect: "Allow",
          Action: [
            "logs:CreateLogGroup",
            "logs:CreateLogStream",
            "logs:PutLogEvents",
          ],
          Resource: `arn:aws:logs:${REGION}:${accountId}:log-group:/aws/lambda/${ENFORCER_NAME}:*`,
        },
      ],
    }
  );

  const zipPath = zipSource();
  const enforcerArn = ensureLambda(enforcerRoleArn, zipPath);

  const schedulerRoleArn = ensureRole(
    SCHEDULER_ROLE,
    {
      Version: "2012-10-17",
      Statement: [
        {
          Effect: "Allow",
          Principal: { Service: "scheduler.amazonaws.com" },
          Action: "sts:AssumeRole",
          Condition: {
            StringEquals: { "aws:SourceAccount": accountId },
          },
        },
      ],
    },
    "GuardrailSchedulerInvokePolicy",
    {
      Version: "2012-10-17",
      Statement: [
        {
          Sid: "InvokeEnforcer",
          Effect: "Allow",
          Action: "lambda:InvokeFunction",
          Resource: enforcerArn,
        },
      ],
    }
  );

  // Give the scheduler role a moment to propagate before the schedule references it.
  sleep(8000);
  ensureSchedule(enforcerArn, schedulerRoleArn);

  console.log(`
Guardrail runner deployed.
  Enforcer Lambda : ${ENFORCER_NAME}
  Schedule        : ${SCHEDULE_NAME} (${SCHEDULE_EXPRESSION})
  Target          : ${TARGET_FUNCTION}

The enforcer re-applies the cost guardrail on every run and only writes when it
detects drift. Invoke it now to verify:

  aws lambda invoke --function-name ${ENFORCER_NAME} --region ${REGION} /dev/stdout
`);
}

main();
