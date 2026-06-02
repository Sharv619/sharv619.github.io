---
title: "Network Guardian AI"
slug: "network-guardian-ai"
type: "case-study"
visibility: "public"
status: "prototype"
role: "solo builder"
tags:
  - "network-security"
  - "FastAPI"
  - "React"
  - "SQLite"
  - "AdGuard"
  - "Ollama"
  - "Gemini"
  - "Isolation Forest"
  - "entropy"
sourceConfidence: "repo-reviewed"
lastReviewed: "2026-06-03"
featured: true
priority: 2
links:
  github: "https://github.com/Sharv619/network-guardian-ai"
---

# Network Guardian AI

## Positioning

AI-assisted network traffic review prototype.

## Short Version

Network Guardian AI turns AdGuard DNS activity into an explainable security review workflow. Instead of sending every domain to an LLM, it runs cache checks, metadata patterns, Shannon entropy, and anomaly scoring before optional Gemini/Ollama escalation.

## Problem

AdGuard can block traffic, but raw DNS logs are hard to interpret. A useful review workflow needs to explain why a domain looks suspicious, show how patterns change over time, and avoid treating an AI model as the only security decision-maker.

## What I Built / Designed

I built a FastAPI backend connected to AdGuard query logs, SQLite persistence, tenant context, JWT/API-key authentication, rate limiting, local heuristic analysis, optional Gemini/Ollama escalation, websocket updates, and a React dashboard.

The design keeps the LLM late in the pipeline. Cache checks, metadata patterns, Shannon entropy, and anomaly scoring narrow the review set before cloud analysis is used.

## Technical Highlights

- AdGuard query-log polling with configurable intervals and fallback URLs.
- Five-tier analysis path: cache, metadata classifier, local heuristics, anomaly detection, AI escalation.
- Shannon entropy for DGA-like domain signals and Isolation Forest for anomaly scoring.
- SQLite-backed history with risk score, category, summary, entropy, anomaly score, AdGuard metadata, and analysis source.
- JWT/API-key auth, RBAC roles, security headers, CORS, rate limiting, and production-hardening notes.
- React/TypeScript dashboard for stats, manual analysis, tenant selection, usage, pricing, and threat review.
- Docker Compose setup for the app plus AdGuard Home.

## Impact Framing

The useful engineering signal is architectural restraint. The project explores how local deterministic checks and local ML can reduce unnecessary AI calls while keeping security results framed as review signals.

## Interview Angle

I wanted the LLM to be the last step, not the first step. So I built a layered pipeline where cheap deterministic checks and local ML narrow the problem before AI is asked for semantic analysis.

## Risks / Limitations

Network Guardian AI is a prototype, not a production security product. Detection quality depends on real traffic samples, threshold tuning, and validation against realistic network data. Public claims should avoid exact cost-reduction numbers or production security impact.

## Links

- GitHub: https://github.com/Sharv619/network-guardian-ai

## Screenshots

- TODO: Add dashboard screenshot.
- TODO: Add architecture diagram.
- TODO: Add live demo screenshot.
