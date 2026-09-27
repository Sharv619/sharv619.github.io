# Current Hosting and AWS Architecture

This document is the source of truth for the portfolio's current hosting and AWS design.

## Website Hosting, Domain, and SEO

The public portfolio website is hosted with **GitHub Pages and Cloudflare**, not AWS.

- Public canonical domain: `https://www.himanshulade.com/`
- Source repository: `Sharv619/sharv619.github.io`
- Static site deployment: GitHub Pages workflow
- DNS/proxy layer: Cloudflare
- Canonical-domain and SEO corrections: PR #4

The AWS resources described below do not host the public website. The `sharv619-portfolio-site` S3 bucket appears to be an older or unused website-hosting artifact; the current GitHub workflow does not deploy the site to that bucket.

## Optional AWS Assistant Backend

AWS is used only for the optional portfolio assistant and its cost-control automation. The frontend can fall back to local curated responses when the live assistant API is unavailable.

```text
Browser on https://www.himanshulade.com/
  |
  | POST /assistant
  v
API Gateway: Assistant-API
  |
  | prod stage, expected route POST /assistant
  v
Lambda: Assistant-RAG-Orchestrator
  |
  +--> S3: sharv619-knowledge-base
  |      +--> knowledge-base.json
  |      +--> synthetic-rag-index.json
  |      +--> case-study Markdown files
  |      +--> Nova Act execution artifacts
  |
  +--> Bedrock Guardrail: Assistant-Guardrail
  |
  +--> Optional Nova Micro polishing

EventBridge Scheduler: Assistant-Guardrail-Enforcer-Schedule
  |
  | every 1 hour
  v
Lambda: Assistant-Guardrail-Enforcer
  |
  +--> keeps expensive Bedrock options disabled
```

Normal Synthetic RAG responses retrieve curated content from S3 and should not require a model call. Bedrock polishing is optional and must remain disabled by default to control cost.

## Resource Inventory

### API Gateway

- API: `Assistant-API`
- Stage: `prod`
- Expected route: `POST /assistant`
- Frontend configuration: `NEXT_PUBLIC_ASSISTANT_API`

### Lambda

- `Assistant-RAG-Orchestrator`
  - Validates assistant requests.
  - Reads Synthetic RAG and knowledge-base files from S3.
  - Applies Bedrock input/output guardrails when configured.
  - Uses optional Nova Micro polishing only when explicitly enabled and permitted by the cost guardrail.
- `Assistant-Guardrail-Enforcer`
  - Checks the orchestrator's cost-sensitive environment settings.
  - Reapplies safe defaults if configuration drift enables expensive options.

### S3

- `sharv619-knowledge-base`
  - `knowledge-base.json`
  - `synthetic-rag-index.json`
  - Case-study Markdown files
  - Nova Act execution artifacts
- `sharv619-portfolio-site`
  - Likely an older or unused website-hosting bucket.
  - Not used by the current GitHub Pages deployment workflow.

### Bedrock

- Guardrail: `Assistant-Guardrail`
- Recorded status: `READY`
- Recorded version: `DRAFT`
- Optional model: `amazon.nova-micro-v1:0`
- Bedrock polishing should remain disabled by default.
- Synthetic RAG should provide normal answers without invoking a model.

### EventBridge Scheduler

- Schedule: `Assistant-Guardrail-Enforcer-Schedule`
- Expected state: enabled
- Interval: every 1 hour
- Target: `Assistant-Guardrail-Enforcer`

### IAM

- User: `portfolio-deploy`
- Role: `Assistant-RAG-Orchestrator-Role`
- Role: `Assistant-Guardrail-Enforcer-Role`
- Role: `Assistant-Guardrail-Scheduler-Role`

IAM permissions should stay scoped to the required Lambda, S3, Bedrock guardrail, logging, and scheduler actions. Administrator access is not part of the intended current runtime design.

### CloudWatch Logs

- `/aws/lambda/Assistant-RAG-Orchestrator`
- `/aws/lambda/Assistant-Guardrail-Enforcer`
- A retention limit may not currently be configured and should be set during recovery.

### KMS

- The AWS-managed Lambda encryption key protects Lambda environment variables.
- Lambda currently cannot decrypt its environment because AWS reports that the resource owner's account is not active.

### AWS Budgets

- Budget: `My Zero-Spend Budget`
- Type: monthly cost budget

### Nova Act

- Local workflow code: `aws/nova-act/`
- Previous execution artifacts exist in S3.
- Nova Act is not required for the website or main assistant request path.
- It is intentionally not in active use.

## Current Broken or Blocked Items

- The AWS account/payment state must be restored before runtime verification. A direct Lambda invocation reported that the resource owner's account is not active.
- Local AWS access has been inconsistent: one check returned `InvalidClientTokenId`, while a later identity-only check succeeded. Do not assume credentials or runtime access work; begin recovery with `aws sts get-caller-identity`.
- The configured assistant API currently returns `404 Not Found` for both `/prod/assistant` and `/assistant`.
- The `Assistant-API` route, `prod` deployment, and Lambda integration must be verified after account access is restored.
- `NEXT_PUBLIC_ASSISTANT_API` is configured, but its current endpoint is not usable while it returns 404.
- The S3 knowledge artifacts were last synced around June 2026 and need a refresh.
- The GitHub Pages workflow does not automatically sync knowledge files to AWS.
- Branded-domain CORS defaults are updated in the current branch, but the live Lambda still needs redeployment and verification after account activation.
- The live website will continue serving the old robots and sitemap files until PR #4 is merged into `main` and deployed.
- The GitHub Pages custom-domain setting is currently empty. After PR #4 is merged, set it to `www.himanshulade.com` and enable HTTPS.

## Deployment and Recovery Checklist

- [ ] Restore AWS account/payment activation and confirm the account is active.
- [ ] Confirm local AWS access:

  ```bash
  aws sts get-caller-identity
  ```

- [ ] Verify API Gateway `Assistant-API` has a `prod` stage and the route `POST /assistant`.
- [ ] Redeploy the API Gateway `prod` stage if the current deployment does not contain the route.
- [ ] Verify the route integration targets `Assistant-RAG-Orchestrator`.
- [ ] Verify the Lambda is active and can decrypt its environment variables.
- [ ] Regenerate the Synthetic RAG index if its source content changed.
- [ ] Upload the current knowledge files:

  ```bash
  node aws/scripts/sync-knowledge-base.js
  ```

- [ ] Test the deployed API using its confirmed execute-api hostname:

  ```bash
  curl -i -X POST "https://<confirmed-api-host>/prod/assistant" \
    -H "Origin: https://www.himanshulade.com" \
    -H "Content-Type: application/json" \
    --data '{"message":"hi"}'
  ```

- [ ] Update the GitHub Actions variable `NEXT_PUBLIC_ASSISTANT_API` if the confirmed route or stage URL differs.
- [ ] Rebuild and redeploy the static website after changing `NEXT_PUBLIC_ASSISTANT_API`.
- [ ] Verify Lambda and API Gateway CORS allow both `https://www.himanshulade.com` and `https://himanshulade.com`.
- [ ] Set a CloudWatch retention period for both assistant Lambda log groups.
- [ ] Confirm `ENABLE_BEDROCK_POLISH=false` remains the default.
- [ ] Confirm expensive or Anthropic model options remain disabled unless deliberately approved.
- [ ] Confirm `Assistant-Guardrail-Enforcer-Schedule` is enabled and runs hourly.
- [ ] Confirm `Assistant-Guardrail-Enforcer` completes successfully after account activation.
- [ ] Merge PR #4, deploy `main`, configure the GitHub Pages custom domain as `www.himanshulade.com`, and enable HTTPS.

## Intentionally Not Used

The current lightweight architecture does not use:

- RDS or Aurora
- PostgreSQL or pgvector
- OpenSearch
- Bedrock Knowledge Bases
- Bedrock Agents
- DynamoDB
- VPC or NAT Gateway
- Provisioned Bedrock throughput
- Lambda provisioned concurrency

Do not add these services based on older setup notes without a new architecture decision, cost review, and explicit approval.

## Relevant Repository Files

- `docs/bedrock-rag-deployment.md` — detailed lightweight Synthetic RAG deployment guidance
- `aws/lambda/rag-orchestrator/index.js` — assistant runtime
- `aws/lambda/guardrail-enforcer/index.js` — scheduled cost guardrail
- `aws/scripts/sync-knowledge-base.js` — uploads knowledge artifacts to S3
- `aws/scripts/apply-lambda-cost-guardrail.js` — applies safe Lambda model settings
- `aws/scripts/deploy-guardrail-runner.js` — deploys the scheduled guardrail enforcer
- `.github/workflows/deploy.yml` — GitHub Pages deployment; it does not deploy or sync AWS resources
- `SEO_FIX_NOTES.md` — branded-domain and post-deployment SEO verification

## Historical Documentation

`AWS-SETUP.md` contains older setup exploration, including RDS, PostgreSQL/pgvector, VPC-connected Lambda, and alternative frontend hosting. Those sections are historical and are not instructions for the current deployment. This file and `docs/bedrock-rag-deployment.md` take precedence.
