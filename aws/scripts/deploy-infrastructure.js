/**
 * Synthetic RAG deployment guard.
 *
 * The previous version of this script targeted RDS/pgvector and broader AWS
 * infrastructure. v1 of the portfolio assistant intentionally avoids RDS,
 * OpenSearch, Bedrock Knowledge Bases, Bedrock Agents, VPC Lambda, and NAT
 * Gateway resources.
 */

console.log(`
Synthetic RAG v1 does not use this infrastructure deploy script.

Use docs/bedrock-rag-deployment.md for the current low-cost architecture:

1. Create AWS Budget alerts before runtime deployment.
2. Upload src/lib/synthetic-rag-index.json to S3.
3. Deploy only:
   - S3 artifacts
   - Lambda Assistant-RAG-Orchestrator
   - API Gateway HTTP API POST /assistant

Do not create RDS, OpenSearch, Bedrock Knowledge Bases, Bedrock Agents, VPC
Lambda networking, NAT Gateway, or provisioned model throughput for v1.
`);
