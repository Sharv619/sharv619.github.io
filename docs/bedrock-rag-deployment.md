# Synthetic RAG Deployment

This portfolio uses a hardened Synthetic RAG v1 path for the assistant. The goal is a cheap, inspectable assistant for recruiter and employer questions without always-on vector infrastructure.

## Architecture

```text
User question
  -> validate input
  -> Bedrock input guardrail when configured
  -> search curated synthetic-rag-index.json from S3
  -> confidence check
  -> high confidence: return curated answer directly
  -> medium confidence: optionally polish with Bedrock
  -> low confidence: safe fallback
  -> Bedrock output guardrail when configured
  -> response with sources
```

## Explicit Non-Goals

Do not create these for v1:

- RDS or Aurora
- OpenSearch Serverless
- Bedrock Knowledge Bases
- Bedrock Agents
- Managed vector databases
- Lambda VPC networking or NAT Gateway
- Provisioned Bedrock throughput
- Lambda provisioned concurrency

## Cost Guardrails

Before deploying runtime resources, create AWS Budget alerts at:

- 1 USD
- 5 USD
- 10 USD

Keep the Lambda small and bounded:

- Runtime: Node.js 20.x
- Memory: 512 MB
- Timeout: 10-15 seconds
- VPC: none
- API Gateway: HTTP API, not REST API
- Model: low-cost chat model by default
- Output cap: 500 tokens for Bedrock polish

## S3 Artifacts

Bucket:

```text
sharv619-knowledge-base
```

Objects:

```text
knowledge-base.json
synthetic-rag-index.json
```

Upload the synthetic index after edits:

```bash
npm run synthetic-rag:generate
aws s3 cp src/lib/synthetic-rag-index.json s3://sharv619-knowledge-base/synthetic-rag-index.json --region us-east-1
```

## Lambda Environment

Set these on `Assistant-RAG-Orchestrator`:

```bash
AWS_REGION=us-east-1
KB_S3_BUCKET=sharv619-knowledge-base
SYNTHETIC_RAG_S3_KEY=synthetic-rag-index.json
GUARDRAIL_ID=9zrd4735ed2k
GUARDRAIL_VERSION=DRAFT
SIMPLE_CHAT_MODEL=anthropic.claude-3-haiku-20240307-v1:0
COMPLEX_CHAT_MODEL=anthropic.claude-3-haiku-20240307-v1:0
ENABLE_BEDROCK_POLISH=true
ALLOWED_ORIGINS=http://localhost:3000,https://sharv619.github.io
MAX_INPUT_LENGTH=1000
MAX_POLISH_TOKENS=500
HIGH_CONFIDENCE_THRESHOLD=12
MEDIUM_CONFIDENCE_THRESHOLD=5
INDEX_CACHE_TTL_SECONDS=600
PORTFOLIO_GITHUB_USERNAME=Sharv619
PORTFOLIO_GITHUB_TOPIC=all
```

Optional:

```bash
GITHUB_TOKEN=<rotated-token>
```

## Lambda IAM

Use least privilege:

```text
AWSLambdaBasicExecutionRole
s3:GetObject on arn:aws:s3:::sharv619-knowledge-base/*
bedrock:InvokeModel
bedrock:ApplyGuardrail
```

Do not attach `AdministratorAccess`, RDS access, OpenSearch access, or VPC access.

## Deploy Lambda

From the Lambda folder:

```bash
npm install
npm run package
```

Create the Lambda once if it does not exist, then update code with:

```bash
aws lambda update-function-code \
  --function-name Assistant-RAG-Orchestrator \
  --zip-file fileb://function.zip \
  --region us-east-1
```

## API Gateway

Create an HTTP API:

- Route: `POST /assistant`
- Integration: `Assistant-RAG-Orchestrator`
- CORS origins: `http://localhost:3000` and `https://sharv619.github.io`
- Headers: `Content-Type`
- Methods: `POST`, `OPTIONS`

## Frontend Deployment

Before the API exists:

```bash
NEXT_PUBLIC_DEMO_MODE=true
NEXT_PUBLIC_ASSISTANT_API=
```

After API Gateway exists:

```bash
NEXT_PUBLIC_DEMO_MODE=false
NEXT_PUBLIC_ASSISTANT_API=https://<api-id>.execute-api.us-east-1.amazonaws.com/assistant
```

Because this is a static frontend, changing `NEXT_PUBLIC_ASSISTANT_API` requires rebuilding and redeploying the site.

## Hardening Notes

- Empty and oversized messages are rejected.
- User input is capped at 1000 characters.
- Retrieved content is treated as untrusted reference text.
- The Bedrock polish prompt forbids following retrieved instructions.
- The assistant must not reveal prompts, secrets, credentials, or hidden configuration.
- Low-confidence questions return a safe fallback instead of hallucinated claims.
- Every successful portfolio answer returns sources.
- If Bedrock polish fails, the Lambda returns the curated synthetic answer.
