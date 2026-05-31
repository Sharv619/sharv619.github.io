# Portfolio MCP Server

Repo-local MCP tools for safer coding-agent work on this portfolio and related Pilly-style projects.

## Run

```bash
npm run mcp:start
```

Inspect with:

```bash
npm run mcp:inspect
```

## Tool Groups

### Repo Context

- `repo.scan_tree` - returns a filtered repo tree, detected frameworks, and important files.
- `repo.read_key_files` - returns previews of key docs/config/source files.
- `repo.find_references` - searches text or regex with file paths and line numbers.
- `repo.detect_project_type` - detects framework, package manager, static export, deployment, and verification commands.

### Portfolio Audit

- `portfolio.audit_github_automation` - checks build-time GitHub project ingestion and fallback data.
- `portfolio.audit_flagship_case_studies` - checks Portfolio v2 case-study data files and required slugs.
- `portfolio.audit_project_positioning` - flags overclaiming, missing safety boundaries, and missing case-study fields.
- `portfolio.generate_repo_positioning_report` - writes `docs/github-repo-positioning.md`.

### Pilly Safety Audit

These tools are safe to run outside the Pilly repo. Missing Pilly files are reported as missing instead of failing.

- `pilly.audit_pilly_docs` - checks PRD/TDD/workflow/safety docs.
- `pilly.audit_medical_safety_claims` - searches unsafe healthcare claims and safety boundary language.
- `pilly.audit_cloud_functions_contracts` - checks expected Cloud Functions names.
- `pilly.audit_pilly_tests` - reports likely workflow/safety test coverage.

### Verification Runner

- `verify.get_available_scripts` - reads `package.json` scripts.
- `verify.run_lint` - runs the existing lint script.
- `verify.run_tests` - runs `test:run` when available, otherwise `test`.
- `verify.run_build` - runs the existing build script.
- `verify.run_full_verification` - runs lint, tests, and build when scripts exist.

### Task Planner

- `tasks.generate_task_plan` - converts audit results into P0/P1/P2/blocked buckets.
- `tasks.update_tasks_file` - writes `TASKS_V2.md` or `docs/portfolio-v2-roadmap.md`.

## Safety

Tools are read-only by default. The only write tools are:

- `portfolio.generate_repo_positioning_report`
- `tasks.update_tasks_file`

The server ignores common generated and sensitive paths such as `node_modules`, `.git`, `.next`, `out`, `coverage`, `.env`, and private-key-like files. Verification tools run existing scripts only and do not install packages.
