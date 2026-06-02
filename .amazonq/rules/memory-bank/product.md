# Product Overview

## Project Purpose
Personal portfolio website for Himanshu Lade, a Software Engineer based in Sydney, Australia. The site serves as a professional showcase combining a static Next.js portfolio with an AI-powered assistant, automated GitHub project feed, AWS-backed RAG chatbot, and an MCP (Model Context Protocol) server for AI tooling integrations.

## Value Proposition
- Automated project feed pulled live from GitHub API (no manual updates needed)
- AI chatbot assistant backed by AWS Bedrock RAG or Gemini API (demo mode fallback)
- Evidence-based project credibility scoring system to avoid overclaiming
- MCP server exposing portfolio data as tools for AI agents
- Daily scheduled GitHub Actions rebuild keeps project metadata fresh

## Key Features

### Portfolio & Content
- Home page with hero, about, experience, projects, skills, and contact sections
- Dedicated project detail pages with architecture breakdowns
- Flagship case studies section (NDA-safe production recovery narrative)
- Resume page with downloadable PDF
- Dark/light theme with time-based auto-detection (dark after 18:00)
- Availability banner for open-to-work signalling

### Automated GitHub Project Feed
- Fetches all public non-fork repos from `Sharv619` GitHub account at build time
- Enriches each repo with README summary, language breakdown, and manifest-derived skills
- Controlled by `PORTFOLIO_GITHUB_TOPIC` env var (`all` = include everything, or filter by topic)
- Falls back to curated `src/lib/data.ts` project list if GitHub API is unavailable
- Daily cron rebuild + `repository_dispatch` webhook for push-triggered refreshes

### AI Chatbot Assistant
- Floating chatbot widget on all pages via `ChatbotProvider`
- Two modes: live RAG mode (AWS Bedrock Lambda endpoint via `NEXT_PUBLIC_ASSISTANT_API`) and demo mode (Gemini API direct)
- `usePortfolioChat` hook manages conversation state and routing
- Source cards displayed with AI responses for transparency

### Evidence & Credibility System
- `project-credibility.ts` scores each project on 15 evidence signals (README, tests, Docker, CI, live demo, etc.)
- Maturity labels: `experiment`, `prototype`, `mvp`, `production`
- `claim-guardrails.ts` enforces honest framing; prevents overclaiming
- Internal evidence report generated from GitHub API metadata

### MCP Server
- Standalone MCP server (`src/mcp/index.ts`) exposable via `npm run mcp:start`
- Tools: portfolio audit, project analysis, career positioning, evidence scoring
- Resources: project data, resume, knowledge base
- Inspectable via `npm run mcp:inspect`

### AWS Infrastructure
- Lambda RAG orchestrator (`aws/lambda/rag-orchestrator/`)
- S3 knowledge base storage
- Bedrock integration for embeddings and generation
- Infrastructure deployment scripts in `aws/scripts/`

## Target Users
- Recruiters and hiring managers evaluating Himanshu's background
- Engineers exploring the open-source portfolio tooling
- AI agents consuming portfolio data via MCP tools
- Himanshu himself for portfolio maintenance and project tracking
