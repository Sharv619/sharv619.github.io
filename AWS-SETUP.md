# 🚀 AWS SETUP CHECKLIST - Deployment Phase

> [!IMPORTANT]
> This file contains historical setup notes for an older, heavier architecture. Sections covering RDS, PostgreSQL/pgvector, VPC-connected Lambda, Vercel, or Netlify do not describe the current deployment. The current website is hosted by GitHub Pages + Cloudflare, and AWS is used only for the optional lightweight Synthetic RAG assistant. Use [`AWS_CURRENT_ARCHITECTURE.md`](./AWS_CURRENT_ARCHITECTURE.md) as the source of truth and [`docs/bedrock-rag-deployment.md`](./docs/bedrock-rag-deployment.md) for current deployment guidance.

The historical steps below are preserved for context. Do not provision their resources unless a new architecture decision explicitly requires them.

## Phase 1: AWS Account Setup

### 1.1 Create AWS Account (if not already)
- Go to https://aws.amazon.com
- Complete sign-up with payment method (free tier available)

### 1.2 Create IAM User (Recommended)
```bash
# Run in terminal
aws iam create-user --user-name portfolio-deploy

# Create access key
aws iam create-access-key --user-name portfolio-deploy

# The historical draft used AdministratorAccess here. Do not attach it.
# Define a least-privilege deployment policy for the required resources instead.
```

**Never use root credentials for deployment.**

---

## Phase 2: Enable Bedrock Models

### 2.1 Go to Amazon Bedrock Console
https://console.aws.amazon.com/bedrock/home?region=us-east-1#/model-access

### 2.2 Enable These Models:
- [ ] **Claude 3 Haiku** (Fast, cheap - for simple queries)
- [ ] **Claude 3.5 Sonnet** (Better reasoning - for complex queries)
- [ ] **Titan Text Embeddings v2** (For vectorizing your KB)

### 2.3 Create Guardrail (Security)
- Go to Amazon Bedrock → Guardrails
- Create new guardrail with:
  - Prompt attack filter: BLOCK (Medium)
  - Content filters: BLOCK hate/violence/sexual (Medium/High)
  - PII redaction: MASK email/phone

---

## Phase 3: Create S3 Bucket

### 3.1 Via Console
1. Go to S3 → Create bucket
2. Name: `sharv619-knowledge-base` (must be unique)
3. Keep "Block all public access" enabled because the knowledge artifacts are private backend inputs
4. Enable "Versioning"

### 3.2 Or via CLI
```bash
aws s3 mb s3://sharv619-knowledge-base --region us-east-1
```

---

## Phase 4: Create RDS Database (pgvector)

> Historical only. RDS and pgvector are not part of the current architecture and should not be provisioned for this project.

### 4.1 Go to RDS Console
https://console.aws.amazon.com/rds/home?region=us-east-1#/create

### 4.2 Configuration:
- **Engine**: PostgreSQL
- **Version**: 15.3 or latest
- **Template**: Free tier
- **DB Instance Identifier**: `assistant-kb`
- **Master Username**: `admin`
- **Password**: (create secure password)

### 4.3 After Creation:
1. Go to Parameter Groups → Create
2. Set `shared_preload_libraries = 'vector'`
3. Reboot DB to apply

### 4.4 Connect and enable vector:
```sql
CREATE EXTENSION IF NOT EXISTS vector;
```

---

## Phase 5: Deploy Lambda

### 5.1 Create Function
1. Go to Lambda → Create function
2. Name: `Assistant-RAG-Orchestrator`
3. Runtime: Node.js 22.x
4. Create

### 5.2 Add Environment Variables:
```
AWS_REGION=us-east-1
KB_S3_BUCKET=sharv619-knowledge-base
DB_HOST=your-rds-endpoint.amazonaws.com
DB_PORT=5432
DB_NAME=assistant_kb
DB_USER=admin
DB_PASSWORD=your_password
GUARDRAIL_ID=your-guardrail-id
ENABLE_BEDROCK_POLISH=false
COST_GUARDRAIL_MODE=strict
SIMPLE_CHAT_MODEL=amazon.nova-micro-v1:0
```

### 5.3 Upload Code
```bash
cd aws/lambda/rag-orchestrator
zip -r function.zip .
# Upload via Lambda console or:
aws lambda update-function-code --function-name Assistant-RAG-Orchestrator --zip-file fileb://function.zip
```

Apply the no-console cost guardrail:

```bash
npm run aws:lambda:guardrail
```

### 5.4 Add Permissions
- S3 read access
- Bedrock invoke access
- RDS connection (VPC)

---

## Phase 6: Create API Gateway

### 6.1 Via Console
1. API Gateway → Create API → HTTP API
2. Name: `Assistant-API`
3. Add route: `POST /assistant`
4. Integrate with Lambda function
5. Deploy to `prod` stage

### 6.2 Copy Endpoint
Example: `https://abc123.execute-api.us-east-1.amazonaws.com/prod/assistant`

---

## Phase 7: Sync Knowledge Base

### 7.1 Update .env.local with all values
```bash
# Copy .env.example to .env.local and fill in:
NEXT_PUBLIC_ASSISTANT_API=https://your-api-id.execute-api-us-east-1.amazonaws.com/prod/assistant
DB_HOST=your-rds-endpoint.amazonaws.com
# ... other values
```

### 7.2 Run Sync Script
```bash
node aws/scripts/sync-knowledge-base.js
```

---

## Phase 8: Deploy Frontend (Historical)

> The current frontend deploys through GitHub Pages and Cloudflare. The Vercel and Netlify options below are retained only as historical alternatives.

### 8.1 Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### 8.2 Or Netlify
```bash
# Connect via GitHub and deploy automatically
```

---

## ✅ Quick Setup Order

| Step | Action | Time |
|------|--------|------|
| 1 | Enable Bedrock models | 5 min |
| 2 | Create S3 bucket | 2 min |
| 3 | Create RDS (free tier) | 10 min |
| 4 | Enable pgvector on RDS | 5 min |
| 5 | Deploy Lambda | 10 min |
| 6 | Create API Gateway | 5 min |
| 7 | Sync KB | 2 min |
| 8 | Deploy frontend | 5 min |

**Total: ~44 minutes**

---

## 🔧 Troubleshooting

### "Access Denied" Errors
- Check IAM user has proper policies
- Verify Lambda has S3/Bedrock permissions

### "Connection Refused" to RDS
- Ensure RDS is in same VPC as Lambda
- Check security group allows connections

### "Model Not Found"
- Re-verify Bedrock model access is enabled
- Check region matches

---

**Need help?** Ask me and I'll guide you through each step!
