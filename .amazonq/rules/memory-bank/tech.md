# Technology Stack

## Core Framework
- Next.js `^16.2.1` — App Router, static export (`output: 'export'`)
- React `19.2.0` / React DOM `19.2.0`
- TypeScript `^5` — strict mode, `ES2017` target, `bundler` module resolution
- Node.js `20` (CI), local development matches

## Styling
- Tailwind CSS `^4` with `@tailwindcss/postcss`
- Class-based dark mode (`darkMode: 'class'` in `tailwind.config.js`)
- `framer-motion ^12` for animations
- Inter font via `next/font/google`

## AI & LLM
- `@ai-sdk/google ^2` + `@google/generative-ai ^0.24` — Gemini API (demo mode)
- `ai ^5` — Vercel AI SDK
- `@aws-sdk/client-bedrock-runtime ^3` — AWS Bedrock guardrails and optional low-cost polish
- `@aws-sdk/client-s3 ^3` — S3 knowledge base storage
- Bedrock model polish is disabled by default. If re-enabled, `amazon.nova-micro-v1:0` is the safe fallback model; Anthropic models are blocked unless explicitly opted in.

## MCP
- `@modelcontextprotocol/sdk ^1.28` — MCP server over stdio transport
- `zod ^4` — input schema validation for all MCP tools

## Database (optional/future)
- `pg ^8` — PostgreSQL client (pgvector, not active in v1 synthetic RAG)

## Testing
- Vitest `^4.1.1` — test runner
- `@testing-library/react ^16` + `@testing-library/jest-dom ^6` — component testing
- `jsdom ^29` — browser environment simulation
- Coverage: v8 provider, text/json/html reporters
- Test files: `tests/**/*.test.ts` / `tests/**/*.test.tsx`
- Setup file: `tests/setup.ts`

## Build & Tooling
- `tsx ^4` — TypeScript execution for scripts and MCP server
- `eslint ^9` + `eslint-config-next 16.0.2`
- `postcss` via `@tailwindcss/postcss`
- Path alias: `@/*` → `./src/*`

## Deployment
- GitHub Pages via `actions/deploy-pages@v4`
- Static export to `out/` directory with `.nojekyll`
- `buildspec.yml` present for AWS CodeBuild (alternative pipeline)

## Environment Variables

| Variable | Purpose |
|---|---|
| `GITHUB_TOKEN` | GitHub API auth (CI secret) |
| `PORTFOLIO_GITHUB_USERNAME` | GitHub username to fetch repos from (default: `Sharv619`) |
| `PORTFOLIO_GITHUB_TOPIC` | Filter repos by topic (`all` = include everything) |
| `NEXT_PUBLIC_ASSISTANT_API` | RAG Lambda endpoint URL (GitHub Actions variable) |
| `NEXT_PUBLIC_DEMO_MODE` | `true` = use Gemini demo mode, skip AWS |
| `AWS_ACCESS_KEY_ID` / `AWS_SECRET_ACCESS_KEY` / `AWS_REGION` | AWS credentials |
| `KB_S3_BUCKET` | S3 bucket for knowledge base |
| `GUARDRAIL_ID` / `GUARDRAIL_VERSION` | Bedrock guardrail config |
| `SIMPLE_CHAT_MODEL` / `ENABLE_BEDROCK_POLISH` / `COST_GUARDRAIL_MODE` | Optional Bedrock polish config |
| `LAMBDA_FUNCTION_NAME` | Lambda function name |
| `DB_HOST` / `DB_PORT` / `DB_NAME` / `DB_USER` / `DB_PASSWORD` | PostgreSQL (not active in v1) |

## Development Commands

```bash
npm run dev              # Start Next.js dev server
npm run build            # Production static export → out/
npm run start            # Serve production build
npm run lint             # ESLint
npm run test             # Vitest (watch mode)
npm run test:run         # Vitest (single run)
npm run test:watch       # Vitest (explicit watch)
npm run test:ui          # Vitest UI
npm run github:scrape    # tsx scripts/export-github-projects.ts
npm run mcp:start        # tsx src/mcp/index.ts (stdio MCP server)
npm run mcp:inspect      # MCP Inspector UI for the server
```

## CI/CD Pipeline

GitHub Actions workflow (`.github/workflows/deploy.yml`):
- Triggers: push to `main`, `repository_dispatch` (type: `refresh-project-feed`), daily cron `17 18 * * *`, manual dispatch
- Steps: checkout → Node 20 setup → `npm ci` → `npm run build` → add `.nojekyll` → upload artifact → deploy to GitHub Pages
- Build env: `GITHUB_TOKEN`, `PORTFOLIO_GITHUB_USERNAME=Sharv619`, `PORTFOLIO_GITHUB_TOPIC=all`, `NEXT_PUBLIC_ASSISTANT_API` from vars
