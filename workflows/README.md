---
title: workflows/ — repeatable procedures for agents
status: active
owner: Zsolt
created: 2026-09-21
created_by: claude-fable-5-1 (Claude Code session 4f946fee)
updated: 2026-09-21
updated_by: claude-fable-5-1 (Claude Code session 4f946fee)
sources: []
---

# workflows/

Step-by-step procedures an agent follows for recurring jobs. Each is written as a prompt: read
it, then do it. Add a new workflow when a job has been done by hand twice.

| Workflow | Use it when |
|---|---|
| [ingest-source.md](ingest-source.md) | Someone gives you anything new: a pasted chat thread, an email, a call transcript, a link, a document a team member wrote, a PDF or image. Also for "process the inbox". |

Under Claude Code, `/ingest-source` loads the ingest workflow directly.
