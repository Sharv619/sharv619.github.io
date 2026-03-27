# AGENTS.md - Developer Guide for AI Agents

## 1. Project Overview

**Project Name:** Himanshu Lade Portfolio  
**Type:** Personal portfolio website with AI chatbot  
**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS v4, Framer Motion, AWS Bedrock

This is Himanshu's portfolio showcasing his work as a Software Engineer in Sydney. The site includes a RAG-powered AI chatbot ("Assistant") that answers questions about his experience, projects, and skills.

## 2. Commands

### Development
```bash
npm run dev          # Start dev server (localhost:3000)
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Testing
```bash
npm test             # Run tests in watch mode
npm test:run         # Run tests once
npm test:watch      # Watch mode
npm test:ui          # Browser UI for tests
```

### MCP Server
```bash
npm run mcp:start        # Start MCP server (stdio transport)
npm run mcp:inspect      # Test MCP server with inspector
```

### AWS (for RAG chatbot)
```bash
node aws/scripts/deploy-infrastructure.js   # Deploy AWS resources
node aws/scripts/sync-knowledge-base.js     # Sync KB to vector DB
```

## 3. Code Style Guidelines

### Imports Order
1. React/core imports
2. External libraries
3. Internal components
4. Types/interfaces
5. Utilities

```typescript
// Good
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import AssistantChat from "./AssistantChat";
import { getFallbackResponse } from "@/lib/assistant/fallback-responses";
import type { Message } from "../types";
```

### TypeScript Rules
- Always use explicit types - never use `any`
- Use interfaces for objects, types for unions
- Enable strict mode in tsconfig

```typescript
// Good
interface Message {
  role: "user" | "assistant";
  content: string;
}

// Bad
const msg: any = {};
```

### Naming Conventions
- Components: PascalCase (`ChatbotWidget.tsx`)
- Hooks: camelCase starting with `use` (`usePortfolioChat.ts`)
- Utilities: camelCase (`getFallbackResponse.ts`)
- Constants: UPPER_SNAKE_CASE
- Files: kebab-case for utilities, PascalCase for components

### Component Structure
```typescript
// 1. "use client" directive if needed
"use client";

import { useState } from "react";

interface Props {
  title: string;
  onClose: () => void;
}

export default function ComponentName({ title, onClose }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <h1>{title}</h1>
    </div>
  );
}
```

### Error Handling
- Always wrap async operations in try/catch
- Provide user-friendly error messages
- Log errors for debugging

```typescript
// Good
try {
  const result = await fetchData();
  return result;
} catch (error) {
  console.error("Fetch failed:", error);
  return fallbackData;
}
```

### No Comments
- Don't add comments unless absolutely necessary
- Code should be self-documenting
- Complex logic should be extracted to named functions

## 4. Architecture

### Directory Structure
```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Home page
│   ├── resume/            # Resume page
│   ├── projects/          # Projects listing
│   ├── chatbot/           # Chatbot page
│   └── admin/kb/         # KB management UI
├── components/            # React components
│   ├── ChatbotWidget.tsx # Floating chat button
│   ├── AssistantChat.tsx # Chat UI with neural viz
│   ├── NeuralBackground.tsx
│   └── SourceCard.tsx
├── lib/                   # Utilities and data
│   ├── assistant/        # RAG client, fallback responses
│   ├── knowledge-base.json # Career data for RAG
│   ├── resumeData.ts
│   └── data.ts
├── hooks/                 # Custom React hooks
├── services/              # External API clients
└── mcp/                   # MCP server (gitignored)
    ├── index.ts
    ├── tools/             # MCP tools
    └── context/           # State tracking

aws/
├── lambda/rag-orchestrator/  # AWS Lambda function
└── scripts/               # Deployment scripts
```

### Key Files
| File | Purpose |
|------|---------|
| `src/lib/knowledge-base.json` | Single source of truth for career data |
| `src/components/AssistantChat.tsx` | Main chatbot UI |
| `src/lib/assistant/rag-client.ts` | RAG API client + smart routing |
| `aws/lambda/rag-orchestrator/` | AWS Lambda for RAG |

## 5. API Documentation

### RAG Client (`src/lib/assistant/rag-client.ts`)

**sendChatMessage(message: string, sessionId?: string): Promise<RAGResponse>**
```typescript
interface RAGResponse {
  response: string;
  sources: Array<{ id: string; section: string; similarity?: number }>;
  metadata?: { modelUsed: string; complexity: string; chunksRetrieved: number };
}
```

**analyzeQueryComplexity(message: string): QueryComplexity**
- Returns: `"simple" | "medium" | "complex"`
- Used for smart routing to optimize costs

**getFallbackResponse(message: string): string**
- Returns pre-defined responses when RAG API unavailable

### Knowledge Base Schema (`src/lib/knowledge-base.json`)

```json
{
  "version": "3.0.0",
  "personal": { "name", "title", "tagline", "bio", "contact" },
  "experience": [{ "company", "role", "duration", "achievements", "techStack" }],
  "projects": [{ "name", "tagline", "description", "techStack", "achievements" }],
  "skills": { "languages": [], "frameworks": [], "cloudDevOps": [], "aiData": [] }
}
```

## 6. MCP Tools

Available tools for project tracking:
- `get_project_state` - Get current phase and progress
- `update_phase` - Update project phase (audit → mcp-server → rag-chatbot → deployment)
- `add_decision` - Record architectural decisions
- `get_knowledge_base` - Retrieve career data
- `list_components` - List all components
- `check_component` - Check specific component status
- `get_audit_report` - Get security audit

## 7. Guardrails

### Must Do
- [ ] Run `npm run lint` before committing
- [ ] Run `npm test:run` before committing (if tests exist)
- [ ] Test changes in dev server before deploying

### Never Do
- [ ] Commit secrets or API keys
- [ ] Commit directly to main branch
- [ ] Break the build (`npm run build` must pass)
- [ ] Use `any` type in TypeScript
- [ ] Leave console.log statements in production code

### Pull Request Process
1. Create feature branch from main
2. Make changes
3. Run lint + tests
4. Build passes
5. Create PR
6. Review and merge

## 8. Testing

### Test Location
- All tests go in `/tests/` folder
- Mirror src structure: `tests/lib/rag-client.test.ts`

### Writing Tests
```typescript
import { describe, it, expect } from 'vitest';
import { getFallbackResponse } from '../../src/lib/assistant/fallback-responses';

describe('RAG Client', () => {
  it('returns greeting for hi message', () => {
    const response = getFallbackResponse('hi');
    expect(response).toContain('Assistant');
  });
});
```

### Running Tests
```bash
npm test:run    # Single run
npm test:watch  # Watch mode
npm test:ui     # Browser UI
```

## 9. Building for Production

```bash
# Build the project
npm run build

# The output is in .next/ folder
# Deploy to Vercel or Netlify
```

## 10. Common Tasks

### Add new skill to knowledge base
1. Edit `src/lib/knowledge-base.json`
2. Add skill to appropriate category
3. Run `npm run build` to verify
4. Commit changes

### Add new project
1. Add project to `knowledge-base.json` projects array
2. Include: name, tagline, description, techStack, achievements
3. Update the site

### Update chatbot responses
1. Edit `src/lib/assistant/fallback-responses.ts`
2. Run tests to verify

---

**Last Updated:** 2026-03-26
**Version:** 3.0.0

## 11. Advanced MCP & Research Tools

This project integrates specialized MCP tools for research, security, and automation.

### MMCP Core Tools (Smart Routing)

| Tool | Purpose | Status |
|------|---------|--------|
| mmcp-core | Auto-routes tasks to optimal model (Gemini/Claude/GPT) | Implemented in `rag-client.ts` |
| ccmp/cxmmp | Cross-agent sync for MCP server configs | Optional |
| mobile-mcp | Cross-app communication via WebSockets | Optional |

### Research & Knowledge Ingestion

| Tool | Purpose | Setup |
|------|---------|-------|
| Firecrawl | Turns URLs into LLM-ready Markdown | npm install firecrawl |
| Exa MCP | Neural search for similar projects | API key required |
| Tavily MCP | Real-time web search with citations | API key required |

**Usage Example - Add new project automatically:**
```bash
# Use Firecrawl to scrape a GitHub repo
npx firecrawl https://github.com/user/new-project
# Output → Add to knowledge-base.json → Regenerate embeddings
```

### Project Auditing Tools

| Tool | Purpose | Command |
|------|---------|---------|
| Git File Forensics | Deep file-level history analysis | Part of MCP server |
| Snyk MCP | Autonomous vulnerability scanning | npm install @snyk/cli |
| mcp-server-audit | Security audit for MCP tools | npm install |

**Security Audit:**
```bash
# Run Snyk vulnerability scan
npx snyk test

# Generate report
npx snyk report
```

### Infrastructure Tools

| Tool | Purpose |
|------|---------|
| Amazon Bedrock KB Server | Automate S3 + vector ingestion |
| Supabase MCP | Direct SQL queries for pgvector |
| mcp-pdf | Generate PDF from knowledge-base.json |

### Integration Commands

```bash
# Add new project to RAG
1. Edit src/lib/knowledge-base.json
2. Run: npm run mcp:start
3. Use: add_decision "Added new project X"
4. Run: node aws/scripts/sync-knowledge-base.js

# Security audit
1. npm run mcp:start
2. Use: get_audit_report
3. Run: npx snyk test

# Generate resume PDF
1. Use mcp-pdf tool
2. Output: Resume_Update_Report.pdf
```

---

**Version:** 4.0.0
