---
title: HF Incident Event — Munich public briefing (working repo)
status: active
owner: Dave (lead, per seed) — confirm
created: 2026-09-21
created_by: claude-fable-5-1 (Claude Code session 4f946fee)
updated: 2026-09-21
updated_by: claude-fable-5-1 (Claude Code session 4f946fee)
sources: [S01, S02]
---

# HF Incident Event — Munich

We are organising a public, non-expert-facing evening event in Munich about the July 2026
OpenAI / Hugging Face agent-swarm incident and the wider "AI safety moment" of summer 2026.
Two short talks (technical: Stan; governance: Corvin), moderated discussion, then a networking
mixer. Target audience 50–100: industry AI leads, the startup scene, TUM students, EA/ACX/PauseAI
communities. Funding is being sought from BlueDot's **Request for Events** (Rapid Grants);
**applications close 2026-10-04** and BlueDot prefers events **by 2026-10-18**.

This repo holds every document needed to plan, fund, promote, run and report on the event.
It is a documents repo, not a code repo.

## Start here

| Read this | To learn |
|---|---|
| [STATUS.md](STATUS.md) | Where things stand right now, next actions, blockers |
| [TIMELINE.md](TIMELINE.md) | Every hard date and the working-backwards plan |
| [AGENTS.md](AGENTS.md) | The rules for anyone (AI agent or human) editing this repo |
| [log/actions.log](log/actions.log) | Append-only provenance log of every agent action |
| [decisions/open-questions.md](decisions/open-questions.md) | What we still have to decide |

## Map of the repo

| Directory | What lives there | Go here when you need to... |
|---|---|---|
| `sources/` | Every input document and every external page we read, with fetch metadata. `sources/INDEX.md` lists them by ID (S01, S02, ...). | ...cite a fact, check what BlueDot actually said, or read the incident material |
| `grant/` | The BlueDot application draft (field by field), budget, fit checklist, completion-report template | ...work on the funding application or the money |
| `event/` | Concept and framing, agenda, format options, day-of run sheet, follow-up plan | ...define what the event is |
| `speakers/` | Speaker briefs, talk outlines, the shared briefing pack of incident facts | ...prepare or support a speaker |
| `outreach/` | Audience analysis, channels, promotion timeline, ready-to-post copy | ...get people to come |
| `venue/` | Requirements and candidate venues | ...find or book the room |
| `logistics/` | Catering, AV and materials, registration | ...handle the practical stuff |
| `team/` | Organisers, roles, availability, meeting notes | ...find out who does what |
| `decisions/` | Open questions and the decision log | ...record or look up a decision |
| `log/` | The provenance log | ...see who did what, when |
| `inbox/` | Drop zone for new material from the team (pastes, emails, transcripts, files) | ...hand something to an agent to file and integrate |
| `workflows/` | Step-by-step procedures for recurring agent jobs; start with `ingest-source.md` | ...ingest a new source the standard way |
| `scripts/` | Logging helpers used by the hook and by humans | ...log an action manually |

Every directory has its own `README.md` saying what belongs there.

## Conventions in one paragraph

Every file starts with a provenance header (title, status, owner, created/updated by whom,
sources). Every fact traces to a source ID in `sources/INDEX.md`. Every agent action lands in
`log/actions.log`, automatically under Claude Code and via `scripts/log.sh` otherwise. Agents
draft; humans confirm. Nothing leaves this repo (grant submission, listings, emails) without a
named human sending it. Details in [AGENTS.md](AGENTS.md).
