---
title: "BackPocket OS AI Offline"
slug: "backpocket-os-ai-offline"
type: "case-study"
visibility: "public"
status: "prototype / design pivot"
role: "solo builder / product architect"
tags:
  - "local-first-ai"
  - "FastAPI"
  - "Flutter"
  - "SQLite"
  - "Gmail"
  - "Ollama"
  - "Gemini"
  - "RAG"
  - "small-business"
sourceConfidence: "repo-reviewed"
lastReviewed: "2026-06-03"
featured: true
priority: 1
aliases:
  - "backpocket-os-ai"
links:
  github: "https://github.com/Sharv619/backpocket-os-ai"
  githubOffline: "https://github.com/Sharv619/backpocket-os-ai-offline"
---

# BackPocket OS AI Offline

## Positioning

Local-first AI operations assistant for small-business admin workflows.

## Short Version

BackPocket OS AI Offline is the local-first pivot direction for BackPocket OS: a voice-first, human-approved business OS where Pip helps draft quotes, triage messages, track leads, sync records, and keep the operator in control.

## Problem

Small operators lose time in admin work: quotes, invoices, Gmail follow-ups, job notes, payments, and paperwork. Existing tools can be expensive, cloud-first, keyboard-centric, and disconnected from how field work actually happens.

## What I Built / Designed

I designed the offline direction around an operator-owned business OS. Pip, the assistant concept, can draft, classify, and organize work, but the operator approves before anything leaves the system.

The prototype direction combines a FastAPI backend, SQLite/PostgreSQL storage direction, Flutter/PWA planning, Gmail/Sheets/Drive integrations, local-first constraints, and a Gemini plus Ollama fallback model plan.

## Technical Highlights

- Email triage pipeline: Gmail/IMAP input, AI classification, pending approvals, Gmail send/archive, and notification planning.
- Human-in-the-loop rule: no outbound email, quote, post, payment action, or destructive operation without approval.
- Local-first storage direction with SQLite first and PostgreSQL/self-hosted path later.
- AI fallback strategy: Ollama local first, OpenRouter fallback, Gemini fallback.
- Construction workflow modeling: leads, quotes, invoices, payments, job files, ABN/GST validation, and pipeline visibility.
- Voice command interface direction with screen context and confirmation cards.
- RAG/document intelligence direction using Google Drive sync and semantic search.
- Australian compliance awareness around ABN, GST, invoice fields, and record retention.

## Impact Framing

The strongest signal is domain modeling. Messy business inputs become auditable, structured workflows, while the system keeps privacy, local ownership, and operator approval central.

## Interview Angle

The pivot is away from a generic AI assistant and toward an operator-owned business OS. The important design decision is that AI can draft and classify, but the business owner approves before anything leaves the system.

## Risks / Limitations

BackPocket OS AI Offline is a prototype and product direction, not a verified production SaaS platform. It needs design partner validation, integration hardening, auth and multi-user work, rate limits, and clearer demo evidence before stronger product claims are appropriate.

## Links

- GitHub: https://github.com/Sharv619/backpocket-os-ai
- Offline repo: https://github.com/Sharv619/backpocket-os-ai-offline

## Screenshots

- TODO: Add workflow screenshot.
- TODO: Add architecture diagram.
- TODO: Add mobile/Flutter prototype screenshot.
