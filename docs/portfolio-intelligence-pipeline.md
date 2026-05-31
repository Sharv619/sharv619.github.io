# Portfolio Intelligence Pipeline

The Portfolio Intelligence Pipeline is a guardrailed evidence workflow for turning public engineering activity into verified portfolio signals.

It is not an AI copywriter and it does not replace the existing GitHub automation, flagship case studies, or claim source of truth.

## Architecture

```text
GitHub / npm / repo metadata
        ↓
Evidence extractor
        ↓
Claim guardrails
        ↓
Portfolio-safe summaries
        ↓
Cloud AI workflow later
        ↓
Ollama/local model pivot later
```

## What It Does

- Collects objective project evidence from public repo signals.
- Scores project credibility using deterministic rules.
- Maps projects to production, MVP, prototype, experiment, or unknown maturity.
- Blocks or flags risky claims before they become public copy.
- Generates draft-only recommendations for README, demo, screenshot, testing, and claim cleanup.
- Respects the approved claim registry in `src/lib/claim-source-of-truth.ts`.

## What It Does Not Do

- It does not invent claims.
- It does not publish copy automatically.
- It does not replace human review.
- It does not add cloud AI integration yet.
- It does not add Ollama or local model integration yet.
- It does not mark a project as production purely from GitHub metadata.

## Evidence Signals

The first version tracks these objective signals:

- README present
- Tests present
- Docker present
- GitHub Actions present
- Package manifest present
- Python dependency file present
- Live demo link present
- Screenshots present
- Docs folder present
- API docs present
- Security/safety docs present
- npm package evidence present
- Deployment config present
- License present

Each signal records:

- key
- label
- present or missing
- source
- confidence
- optional notes

## Maturity Scoring

The score is deterministic:

- README present: +10
- Tests present: +15
- CI present: +10
- Docker present: +8
- Live demo: +12
- Screenshots: +8
- Docs/API docs: +10 combined
- Safety/security docs: +8
- Package/dependency manifests: +6
- Recent update: +8
- Clear topics: +5

Maturity mapping:

- 85-100: production only when explicitly approved by the claim source of truth
- 70-84: MVP
- 50-69: prototype
- 0-49: experiment

Production status cannot be assigned from score alone. It must be supported by approved claim-source data and human review.

## Claim Guardrails

The guardrails flag public copy that mentions unsupported or sensitive claims, including:

- revenue
- users
- uptime
- downloads
- production status
- security impact
- medical claims
- clinical claims
- exact performance metrics
- exact cost reduction
- exact deployment reduction
- AI doctor
- diagnosis
- dosage advice
- zero-downtime
- 99.99% uptime
- 10x
- world-class

Approved wording lives in:

```text
src/lib/claim-source-of-truth.ts
docs/claim-source-of-truth.md
```

The pipeline should prefer approved wording for Ask Jay, ACS, Pilly, codeflow-hook, BackPocket OS, Network Guardian AI, and project status definitions.

## Human Approval Requirement

Recommendations are draft-only and require human approval before being published.

The pipeline can suggest that a project needs a better README, screenshots, tests, demo link, or softer wording. It cannot publish those changes automatically.

## GitHub Evidence Enrichment

`src/lib/github-evidence-enrichment.ts` connects the existing GitHub project ingestion flow to the evidence pipeline.

The enrichment layer consumes metadata already collected by `src/lib/github-projects.ts`, including:

- repo name and slug
- repo description
- README text and README summary
- languages
- topics
- detected package and Python dependency files
- detected Docker and Docker Compose files
- detected GitHub Actions workflows
- homepage/demo URL
- GitHub URL
- last updated date

The enrichment layer converts those facts into `ProjectEvidenceProfile` records. If a signal cannot be determined from available metadata, it is marked missing with `source: "unknown"` and `confidence: "low"`.

The generated signals include README, tests, Docker, GitHub Actions, package manifests, Python dependencies, live demo links, screenshots, docs, API docs, safety/security docs, npm package evidence, deployment config, license, and recent update evidence.

Scoring remains deterministic and uses `src/lib/project-credibility.ts`. A high-scoring GitHub repo still cannot become `production` unless the claim source of truth explicitly allows that framing.

Claim guardrails run against repo description, README summary, and README-derived text. Any warnings become evidence profile warnings and produce draft-only `soften-claim` recommendations.

Recommendations from GitHub evidence enrichment are still draft-only. They are not rendered publicly and they do not rewrite project cards automatically.

Cloud AI and Ollama/local model integration remain future work. Any future model must consume evidence profiles, obey claim guardrails, and require human approval before publishing.

## Internal Evidence Report

The MCP tool `portfolio.generate_evidence_report` creates or updates:

```text
docs/internal-evidence-report.md
```

This report is internal/private and is only for portfolio maintenance. It is not rendered on the public site and must not be treated as publish-ready copy.

The report includes:

- generated timestamp
- data source: GitHub API or fallback data
- draft-only disclaimer
- projects analysed
- evidence signals per project
- credibility score
- maturity label
- missing evidence
- claim warnings
- draft-only recommendations
- human review checklist

If live GitHub API access fails, the report uses fallback project data and clearly marks `Source: fallback data`. This prevents agents from hiding uncertainty about where evidence came from.

The report uses the same claim guardrails as the rest of the pipeline and must not invent users, revenue, downloads, uptime, production status, exact metrics, security impact, or medical claims.

## Future Cloud AI Workflow

A future cloud AI workflow can consume evidence profiles and guardrail results to draft recommendations, but it must:

- use retrieved evidence as input
- cite the evidence source
- mark output as draft-only
- run claim guardrails before any copy is shown publicly
- require human approval before commit or deploy

## Future Ollama / Local Model Pivot

A later local model workflow can use Ollama for private drafting and repo analysis. The same guardrails still apply:

- no invented metrics
- no sensitive client details
- no unsupported production claims
- no medical or security overclaiming
- human approval before publishing
