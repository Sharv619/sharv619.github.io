"use strict";

/**
 * Guardrail Enforcer Lambda.
 *
 * Re-applies the Lambda cost guardrail to the RAG orchestrator so a redeploy
 * or manual console edit cannot silently re-enable expensive Bedrock/Anthropic
 * models. Invoked on a schedule by EventBridge Scheduler.
 *
 * Idempotent: reads the target's current environment, computes the desired
 * guarded environment, and only calls UpdateFunctionConfiguration when they
 * differ. A no-drift run performs no writes.
 *
 * The guardrail spec below is the single source of truth and mirrors
 * aws/scripts/apply-lambda-cost-guardrail.js.
 */

const {
  LambdaClient,
  GetFunctionConfigurationCommand,
  UpdateFunctionConfigurationCommand,
} = require("@aws-sdk/client-lambda");

const TARGET_FUNCTION = process.env.TARGET_FUNCTION_NAME || "Assistant-RAG-Orchestrator";
const REGION = process.env.AWS_REGION || "us-east-1";

// Values the guardrail forces ON.
const FORCED_VARS = {
  ENABLE_BEDROCK_POLISH: "false",
  SIMPLE_CHAT_MODEL: "amazon.nova-micro-v1:0",
  COST_GUARDRAIL_MODE: "strict",
  MAX_POLISH_TOKENS: "200",
};

// Keys the guardrail forces OFF (must be absent).
const FORBIDDEN_KEYS = ["COMPLEX_CHAT_MODEL", "ALLOW_ANTHROPIC_MODELS"];

const client = new LambdaClient({ region: REGION });

function computeGuarded(current) {
  const guarded = { ...current, ...FORCED_VARS };
  for (const key of FORBIDDEN_KEYS) {
    delete guarded[key];
  }
  return guarded;
}

function diffKeys(current, guarded) {
  const drift = [];
  const keys = new Set([...Object.keys(current), ...Object.keys(guarded)]);
  for (const key of keys) {
    if (current[key] !== guarded[key]) {
      drift.push(key);
    }
  }
  return drift;
}

exports.handler = async () => {
  const config = await client.send(
    new GetFunctionConfigurationCommand({ FunctionName: TARGET_FUNCTION })
  );

  const current = (config.Environment && config.Environment.Variables) || {};
  const guarded = computeGuarded(current);
  const drift = diffKeys(current, guarded);

  if (drift.length === 0) {
    const msg = `Guardrail compliant on ${TARGET_FUNCTION}; no drift.`;
    console.log(msg);
    return { status: "compliant", target: TARGET_FUNCTION, drift: [] };
  }

  console.log(
    `Guardrail drift on ${TARGET_FUNCTION}: [${drift.join(", ")}] — re-applying.`
  );

  await client.send(
    new UpdateFunctionConfigurationCommand({
      FunctionName: TARGET_FUNCTION,
      Environment: { Variables: guarded },
    })
  );

  const msg = `Guardrail re-applied to ${TARGET_FUNCTION}. Corrected keys: ${drift.join(", ")}.`;
  console.log(msg);
  return { status: "corrected", target: TARGET_FUNCTION, drift };
};
