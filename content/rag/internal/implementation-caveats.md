---
title: "Implementation Caveats"
type: "rag-note"
visibility: "internal"
lastReviewed: "2026-06-03"
---

# Implementation Caveats

These notes are internal RAG support material and must not be imported into public pages.

- The portfolio uses curated Synthetic RAG in v1. Do not add vector databases, RDS, OpenSearch, Bedrock Knowledge Bases, or Bedrock Agents for this ingestion.
- Public assistant mode can use public case-study entries only.
- Internal/admin assistant mode can use internal notes, verification tasks, missing screenshots, private repo checks, and source-confidence gaps.
- Public answers must not reveal internal verification concerns directly.
- Public answers must keep prototype status visible for Network Guardian AI, BackPocket OS AI Offline, CodeFlow Commander / Nexus Gateway, codeflow-hook, and Pilly / MediMate Voice.
- Pilly answers must include the safety boundary when healthcare or medication context is relevant: hackathon prototype, not medical advice, no diagnosis, no dosage advice, no real patient data.
