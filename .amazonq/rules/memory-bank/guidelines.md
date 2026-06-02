# Development Guidelines

## Code Quality Standards

### TypeScript Conventions
- Strict mode is enabled — no implicit `any`, no loose null checks
- Prefer `type` aliases over `interface` for union types and simple shapes; use `interface` for extendable object shapes (both patterns appear in the codebase)
- Use `as const` for readonly literal arrays (e.g., `evidenceSignalDefinitions`)
- Export types alongside their related functions in the same file
- Use `Record<string, T>` for typed dictionaries, not plain `object`
- Avoid `!` non-null assertions; use early returns or optional chaining instead

### Naming Conventions
- Files: `kebab-case.ts` / `PascalCase.tsx` for components
- Functions: `camelCase`, descriptive verb-noun (e.g., `getPortfolioProjects`, `normalizeRepositoryProject`, `evaluateDraftClaims`)
- Constants: `SCREAMING_SNAKE_CASE` for module-level config objects and pattern arrays (e.g., `GUARDRAIL_PATTERNS`, `CONFIG`, `TECHNOLOGY_LABELS`)
- Types/interfaces: `PascalCase` (e.g., `ProjectEvidenceProfile`, `ClaimGuardrailResult`)
- Boolean variables: `is*` / `has*` prefix (e.g., `isThinking`, `isSyncing`, `isPortfolioRepository`)

### Function Design
- Pure utility functions are preferred — side-effect-free helpers grouped at the bottom of files (e.g., `safeRead`, `uniqueTechnologies`, `normalizeTechnologyLabel`)
- Private helpers are unexported and placed after the exported API in the same file
- Functions that can fail gracefully use try/catch with empty-string or empty-object fallbacks rather than propagating errors to callers
- Async functions use `async/await` throughout; no `.then()` chains except in `Promise.all` patterns

### Error Handling
- Infrastructure scripts: `try/catch` with named error checks (e.g., `err.name === 'BucketAlreadyOwnedByYou'`) to handle idempotent re-runs
- Library code: catch and return safe defaults; log warnings with `console.warn` not `console.error` for expected fallbacks
- MCP tools: all tool handlers are wrapped in `async () =>` and return `textResult(result)` — errors bubble to the MCP SDK
- React components: no error boundaries present; errors surface as empty states

## Structural Conventions

### React Components
- All interactive components use `"use client"` directive at the top
- Server components (data fetching) have no directive and are `async` functions
- Props interfaces are defined inline above the component, not exported unless reused
- Default exports for page/component files; named exports for utilities
- `useEffect` cleanup always returns a cleanup function when adding event listeners or starting animations
- Canvas/animation components manage their own resize listeners and animation frame IDs inside `useEffect`

### State Management
- Local `useState` for component-level state; no global state library
- `ChatbotProvider` uses React Context for chatbot open/close state across the app
- Custom hooks (`usePortfolioChat`) encapsulate async message state and loading flags

### Data Flow Pattern
```
GitHub API (build time)
  → fetchPortfolioRepositories()
  → enrichment (README, languages, manifest)
  → normalizeRepositoryProject()
  → sortPortfolioProjects()
  → passed as props to HomePageClient
  → fallback: src/lib/data.ts projects array
```

### MCP Tool Pattern
Every MCP tool follows this structure:
```typescript
server.registerTool(
  "namespace.tool_name",
  {
    title: "Human Readable Title",
    description: "What this tool does",
    inputSchema: { param: z.string().describe("description") }  // omit if no input
  },
  async ({ param }) => textResult(await toolFunction(param))
);
```
- Tool names use `domain.snake_case` namespacing: `portfolio.*`, `verify.*`, `tasks.*`, `pilly.*`, `repo.*`
- All tool results are serialized via `textResult()` which wraps in `{ content: [{ type: "text", text: JSON.stringify(...) }] }`
- Input schemas use Zod v4 with `.describe()` on every field

### AWS Script Pattern (deploy-infrastructure.js)
- CommonJS (`require`) not ESM — these are Node.js scripts, not bundled
- Single `CONFIG` object at top for all configurable values, reading from `process.env` with defaults
- Each AWS resource creation is a separate `async function` with a descriptive JSDoc comment
- Idempotency: check if resource exists before creating; handle `EntityAlreadyExists` / `BucketAlreadyOwnedByYou` errors
- Colored terminal output via ANSI codes with `log()`, `success()`, `error()` helpers

## Semantic Patterns

### Evidence-Based Credibility System
The codebase has a first-class concept of "evidence signals" for honest project framing:
- 15 defined signal keys in `evidenceSignalDefinitions` (as const tuple)
- Each signal has: `key`, `label`, `present`, `source`, `confidence`
- `createEvidenceSignal()` factory function ensures consistent shape
- Maturity labels: `experiment` → `prototype` → `mvp` → `production`
- Never invent signals — only mark `present: true` when evidence is confirmed

### Claim Guardrails Pattern
`claim-guardrails.ts` implements a regex-based content safety layer:
```typescript
const GUARDRAIL_PATTERNS: GuardrailPattern[] = [
  { pattern: /regex/i, phrase: "label", severity: "high"|"medium"|"low", reason: "...", suggestedRewrite?: "..." }
];
evaluateDraftClaims(text) → { safe: boolean, warnings: ClaimGuardrailWarning[] }
```
- Always check portfolio copy through `evaluateDraftClaims()` before publishing
- Approved claims live in `claim-source-of-truth.ts` as `verifiedClaims`
- Medical/healthcare copy must include explicit safety boundaries ("no diagnosis", "not a medical product")
- NDA-safe language for production incident work: never name the client or describe the breach

### Technology Label Normalization
`github-projects.ts` maintains two lookup maps:
- `TECHNOLOGY_LABELS`: topic/language string → display label
- `PACKAGE_DEPENDENCY_SKILLS`: npm package name → display label
- `PYTHON_DEPENDENCY_SKILLS`: pip package name → display label
- Always add new technologies to these maps rather than letting raw strings through
- `uniqueTechnologies()` deduplicates by lowercase key while preserving display casing

### Demo Mode / Live Mode Split
The chatbot has two runtime modes detected at the hook level:
```typescript
const isDemoMode = typeof window !== 'undefined' &&
  (window.location.hostname.includes('github.io') || !process.env.NEXT_PUBLIC_API_KEY);
```
- Demo mode: keyword-matched static responses from `demoResponses` dictionary
- Live mode: calls `geminiService` or the RAG Lambda endpoint
- Always guard `window` access with `typeof window !== 'undefined'` for SSR safety

### Concurrency Pattern
`mapWithConcurrency()` in `github-projects.ts` is the standard pattern for bounded parallel async work:
```typescript
await mapWithConcurrency(items, CONCURRENCY_LIMIT, async (item) => { ... });
```
Use this instead of `Promise.all` when the array could be large (avoids rate-limit bursts).

### Framer Motion Animation Pattern
Components use entry animations with staggered delays:
```tsx
<motion.div
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.1 }}
>
```
- `x: -20` for left-entry, `x: 20` for right-entry, `y: -20` for top-entry
- Delays increment by `0.1` per sibling element
- `scale: 0.9` for pop-in effects on conditional renders

## Portfolio Integrity Rules

These are non-negotiable constraints enforced by the MCP audit tools and guardrails:

1. Never claim exact uptime percentages, download counts, or revenue figures without entries in `verifiedClaims`
2. Healthcare-adjacent projects (Pilly/MediMate) must always include: "Not a medical product; no diagnosis, dosage advice, or real patient data"
3. Production incident work must use NDA-safe language: "supported production recovery after a security incident"
4. Projects must be labelled with their actual maturity: experiment, prototype, MVP — not "production-ready" unless the evidence score supports it
5. The `PORTFOLIO_GITHUB_TOPIC` env var controls which repos appear; default `all` includes everything public and non-fork
6. Run `npm run mcp:start` + `portfolio.audit_project_positioning` before publishing new portfolio copy
