# Repository evidence contract

Public repositories are added to the portfolio automatically by the scheduled GitHub snapshot workflow. A repository can optionally add a root-level `portfolio-evidence.json` file to connect portfolio claims to exact files and commits.

```json
{
  "version": 1,
  "claims": [
    {
      "id": "static-ingestion",
      "label": "Static GitHub ingestion",
      "description": "Build-time ingestion keeps the public portfolio current without a runtime GitHub dependency.",
      "evidence": [
        {
          "type": "file",
          "path": "scripts/sync-projects.ts",
          "label": "Ingestion implementation"
        },
        {
          "type": "commit",
          "sha": "0123456789abcdef0123456789abcdef01234567",
          "label": "Feature commit"
        }
      ]
    }
  ],
  "architecture": [
    {
      "path": "docs/ARCHITECTURE.md",
      "title": "System architecture"
    }
  ]
}
```

## Behavior

- File paths must be relative to the repository root and cannot contain `..`.
- Commit references must be 7 to 40 hexadecimal characters.
- Files and commits are checked against GitHub before they become evidence tabs.
- `ARCHITECTURE.md`, `docs/ARCHITECTURE.md`, `docs/architecture.md`, and `docs/system-architecture.md` are discovered automatically even without a manifest.
- Architecture and system-design Markdown files linked from the README are discovered automatically, including repository-specific names such as `docs/NUDGEAI_ARCHITECTURE.md`.
- Top-level Markdown files in the repository `docs/` folder with architecture, system-design, or technical-design names are also discovered.
- Architecture Markdown becomes repository-aware RAG evidence.
- Mermaid fences in architecture documents are rendered when they begin with a supported diagram type.
- Every ingested public repository receives a generated `/projects/<slug>/case-study/` page. Curated entries keep their narrative and append repository architecture evidence; other repositories use GitHub metadata, build notes, evidence files, and architecture documents directly.
- Invalid manifests or missing evidence never break the wider repository feed.

After the repository is public, the next scheduled deployment runs `npm run github:snapshot` and `npm run repo-rag:generate`. No portfolio source edit is required.
