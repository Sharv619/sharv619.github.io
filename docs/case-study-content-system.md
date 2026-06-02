# Case Study Content System

Public case studies live in `content/case-studies/*.md`. They are recruiter-facing, prototype-safe engineering case studies with frontmatter metadata for title, slug, type, visibility, status, role, tags, source confidence, review date, featured state, and priority.

Internal RAG/admin notes live in `content/rag/internal/*.md`. These files can record source notes, open verification items, private repo/PAT notes, repo uncertainty, missing screenshots, and implementation caveats. They must not be imported into public pages.

The portfolio assistant uses curated Synthetic RAG entries in `src/lib/synthetic-rag-index.json`. Public assistant mode can use public case-study entries and approved project summaries. Internal/admin mode may use internal notes if that mode is implemented, but public answers must not reveal private repo uncertainty or verification tasks directly.

Vector databases are intentionally not used in v1. Do not add RDS, OpenSearch, Bedrock Knowledge Bases, Bedrock Agents, or managed vector databases for this content path.

Public claims must remain bounded. Do not invent users, revenue, uptime, production security impact, medical outcomes, usage numbers, or unverified metrics. Pilly / MediMate Voice must remain framed as a hackathon prototype and not medical advice.
