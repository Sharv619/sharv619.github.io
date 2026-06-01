/**
 * Sync Synthetic RAG artifacts to S3.
 *
 * v1 intentionally avoids RDS, OpenSearch, Bedrock Knowledge Bases, Bedrock
 * Agents, and managed vector databases. This script uploads the curated
 * knowledge artifacts used by the Lambda Synthetic RAG orchestrator.
 */

const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

for (const envFile of [".env.local", ".env"]) {
  dotenv.config({ path: path.join(__dirname, "../..", envFile), quiet: true });
}

const AWS_REGION = process.env.AWS_REGION || "us-east-1";
const S3_BUCKET = process.env.KB_S3_BUCKET || "sharv619-knowledge-base";
const SYNTHETIC_RAG_S3_KEY = process.env.SYNTHETIC_RAG_S3_KEY || "synthetic-rag-index.json";
const ROOT_DIR = path.join(__dirname, "../..");
const ARTIFACTS = [
  {
    key: "knowledge-base.json",
    file: path.join(ROOT_DIR, "src/lib/knowledge-base.json"),
  },
  {
    key: SYNTHETIC_RAG_S3_KEY,
    file: path.join(ROOT_DIR, "src/lib/synthetic-rag-index.json"),
  },
];

const s3 = new S3Client({ region: AWS_REGION });

async function uploadArtifact({ key, file }) {
  if (!fs.existsSync(file)) {
    throw new Error(`Missing artifact: ${file}`);
  }

  const body = fs.readFileSync(file);
  await s3.send(new PutObjectCommand({
    Bucket: S3_BUCKET,
    Key: key,
    Body: body,
    ContentType: "application/json",
  }));

  console.log(`Uploaded ${key} (${body.length} bytes)`);
}

async function sync() {
  console.log("=== Synthetic RAG S3 Sync ===");
  console.log(`Bucket: ${S3_BUCKET}`);
  console.log(`Region: ${AWS_REGION}`);

  for (const artifact of ARTIFACTS) {
    await uploadArtifact(artifact);
  }

  console.log("Sync complete");
}

sync().catch((error) => {
  console.error("Sync failed:", error);
  process.exit(1);
});
