# Project Structure

## Directory Overview

```
sharv619.github.io/
├── src/
│   ├── app/                    # Next.js App Router pages
│   ├── components/             # React UI components
│   ├── hooks/                  # Custom React hooks
│   ├── lib/                    # Core business logic & data
│   ├── mcp/                    # MCP server (standalone)
│   └── services/               # External service clients
├── aws/
│   ├── lambda/rag-orchestrator/ # AWS Lambda RAG handler
│   └── scripts/                # Infrastructure deployment scripts
├── scripts/                    # Build-time data scripts
├── tests/                      # Vitest test suite
├── docs/                       # Internal documentation
├── public/                     # Static assets (resume PDF, images)
└── .github/workflows/          # CI/CD (GitHub Pages deploy)
```

## src/app/ — Next.js App Router Pages

| Route | Purpose |
|---|---|
| `/` | Home page (server component, fetches GitHub projects at build time) |
| `/projects/[slug]` | Individual project detail page |
| `/case-studies/[slug]` | Flagship case study detail page |
| `/resume` | Resume page with PDF download |
| `/chatbot` | Dedicated chatbot page |
| `/investments` | Investments section |
| `/admin/kb` | Internal admin panel for knowledge base management |

- `layout.tsx` wraps all pages with ThemeProvider, AvailabilityBanner, ChatbotProvider, and SEO metadata
- `page.tsx` (home) is an async server component that calls `getPortfolioProjects()` at build time

## src/components/ — UI Components

Key components:
- `HomePageClient.tsx` — client-side home page shell, receives pre-fetched projects as props
- `Navigation.tsx` — top nav with theme toggle
- `NeuralBackground.tsx` — animated canvas background (Three.js-style particle network)
- `ChatbotWidget.tsx` / `ChatbotProvider.tsx` — floating AI assistant widget, context provider
- `AssistantChat.tsx` — chat UI with source cards
- `FeaturedCaseStudies.tsx` — flagship case study cards
- `ProjectDetailClient.tsx` / `ProjectsPageClient.tsx` — project listing and detail views
- `ThemeProvider.tsx` / `ThemeToggle.tsx` — dark/light theme management
- `AvailabilityBanner.tsx` — open-to-work banner
- `SEOHead.tsx` — structured data / JSON-LD injection

## src/lib/ — Business Logic

| File | Purpose |
|---|---|
| `data.ts` | Static fallback data: personalInfo, experience, projects, skills, about |
| `github-projects.ts` | GitHub API fetching, repo normalization, technology label mapping |
| `github-evidence-enrichment.ts` | Enriches repos with evidence metadata from manifest files |
| `evidence-signals.ts` | Evidence signal types and scoring definitions |
| `evidence-report.ts` | Generates internal evidence report from GitHub API data |
| `project-credibility.ts` | Scores projects on 15 signals, assigns maturity labels |
| `claim-guardrails.ts` | Validates portfolio copy against overclaiming rules |
| `claim-source-of-truth.ts` | Single source of truth for approved claims |
| `flagship-case-studies.ts` | Curated case study data |
| `career-positioning.ts` | Career narrative and positioning copy |
| `certifications.ts` | Certifications data |
| `portfolio-recommendations.ts` | Recommendation types for project improvements |
| `project-skills.ts` | Skill extraction utilities |
| `resumeData.ts` | Resume-specific structured data |
| `knowledge-base.json` | Static knowledge base for RAG assistant |
| `synthetic-rag-index.json` | Pre-computed RAG index for demo mode |
| `assistant/` | Assistant routing, RAG client, smart routing logic |

## src/mcp/ — MCP Server

Standalone MCP server using `@modelcontextprotocol/sdk` over stdio transport.

```
src/mcp/
├── index.ts              # Server entry point, tool registration
├── tools/
│   ├── project-tools.ts          # Project state management
│   ├── knowledge-tools.ts        # Knowledge base access
│   ├── audit-tools.ts            # Portfolio audit report
│   ├── repo-context-tools.ts     # Repo tree scanning, file reading, reference search
│   ├── portfolio-audit-tools.ts  # GitHub automation, case study, positioning audits
│   ├── pilly-safety-audit-tools.ts # Medical safety claim auditing
│   ├── verification-runner-tools.ts # Run lint/test/build
│   ├── task-planner-tools.ts     # Task plan generation
│   └── evidence-report-tools.ts  # Evidence report generation
├── context/              # Shared context/state
├── resources/            # MCP resource definitions
└── shared/               # Shared utilities
```

Tool namespacing convention: `domain.tool_name` (e.g., `portfolio.audit_github_automation`, `verify.run_tests`)

## aws/ — AWS Infrastructure

```
aws/
├── lambda/rag-orchestrator/   # Lambda function for RAG queries
├── scripts/
│   ├── deploy-infrastructure.js  # CDK/SDK infrastructure provisioning
│   └── sync-knowledge-base.js    # Syncs knowledge-base.json to S3
└── lambda-trust-policy.json      # IAM trust policy for Lambda execution role
```

## tests/ — Test Suite

Vitest-based tests mirroring `src/lib/` structure:
- `lib/certifications.test.ts`
- `lib/evidence-report.test.ts`
- `lib/github-evidence-enrichment.test.ts`
- `lib/github-projects.test.ts`
- `lib/portfolio-intelligence-pipeline.test.ts`
- `lib/project-skills.test.ts`
- `lib/rag-client.test.ts`
- `lib/smart-routing.test.ts`

## Architectural Patterns

### Build-Time Data Fetching
The home page is a Next.js async server component. `getPortfolioProjects()` runs at build time (static export), fetching GitHub API data and enriching it. The result is passed as props to the client component.

### Static Export
`next.config.ts` sets `output: 'export'` — the entire site builds to a static `out/` directory deployed to GitHub Pages. No server-side runtime.

### Fallback Chain
GitHub API → enrichment pipeline → `normalizeRepositoryProject()` → sorted projects. On failure, falls back to curated `data.ts` projects array.

### Client/Server Component Split
- Server components: `app/page.tsx`, `app/projects/[slug]/page.tsx` (data fetching)
- Client components: all interactive UI (`"use client"` directive), chatbot, admin panel

### Theme System
Theme stored in `localStorage`. Inline script in `<head>` applies class before hydration to prevent flash. Default: dark after 18:00 local time.
