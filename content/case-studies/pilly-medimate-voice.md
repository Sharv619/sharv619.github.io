---
title: "Pilly / MediMate Voice"
slug: "pilly-medimate-voice"
type: "case-study"
visibility: "public"
status: "hackathon prototype"
role: "team contributor"
tags:
  - "Firebase"
  - "Firestore"
  - "Cloud Functions"
  - "healthtech"
  - "senior-care"
  - "voice"
  - "responsible-ai"
sourceConfidence: "portfolio-source"
safetyBoundary: "not medical advice"
lastReviewed: "2026-06-03"
featured: true
priority: 5
<<<<<<< HEAD
aliases:
  - "build-wit-ai"
links:
  github: "https://github.com/Sharv619/Build_wit_AI"
  liveDemo: "https://medimate-voice-demo.web.app"
=======
>>>>>>> main
---

# Pilly / MediMate Voice

## Positioning

Responsible-AI medication support MVP with explicit safety boundaries.

## Short Version

Pilly / MediMate Voice is a Firebase-backed medication reminder and caregiver visibility MVP from a Google AI hackathon context. It explores event-based reminder responses, Cloud Function-first workflows, Firestore logs, Gemini response classification, and deterministic fallback behavior.

## Problem

Seniors and caregivers need lightweight support around reminders, refusals, snoozes, missed-dose visibility, and help requests. The hard part is keeping AI away from medical decisions while still making the reminder workflow useful.

## What I Built / Designed

I framed the MVP around Firestore medication logs, Cloud Function-first workflows, Gemini response classification, deterministic fallback behavior, and a Trusted Family Voice Reminder boundary.

The system can classify simple reminder responses and record events, but it does not diagnose, recommend dosage, or make clinical decisions.

## Technical Highlights

- Firestore medication logs and response records.
- Cloud Function-first workflow orchestration.
- Gemini response classification with deterministic fallback.
- Event states: missed dose, refusal, snooze, and help request.
- Caregiver visibility rather than medical decision-making.
- Explicit safety boundary: no diagnosis, no dosage advice, no real patient data.

## Impact Framing

The engineering signal is the safety architecture: classify simple responses, log events, notify caregivers, and fall back deterministically rather than generating medical advice.

## Interview Angle

The key decision was what the AI is not allowed to do. It can classify a reminder response, but it cannot diagnose, recommend dosage, or decide care. Ambiguous or urgent cases route to static safety guidance and caregiver visibility.

## Risks / Limitations

Pilly / MediMate Voice is a hackathon prototype. It is not medical advice, not a medical device, not for real patient data, and not a replacement for clinicians, pharmacists, emergency services, or prescribed care plans.

## Links

<<<<<<< HEAD
- GitHub: https://github.com/Sharv619/Build_wit_AI
- Live demo: https://medimate-voice-demo.web.app
=======
- Public source link: unavailable in current public portfolio content.
>>>>>>> main

## Screenshots

- TODO: Add workflow screenshot.
- TODO: Add architecture diagram.
- TODO: Add live demo screenshot.
