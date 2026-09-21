---
title: sources/ — inputs and everything we read
status: active
owner: Zsolt
created: 2026-09-21
created_by: claude-fable-5-1 (Claude Code session 4f946fee)
updated: 2026-09-21
updated_by: claude-fable-5-1 (Claude Code session 4f946fee)
sources: []
---

# sources/

Everything external lives here, one note per source, registered in [INDEX.md](INDEX.md) with an
ID (S01, S02, ...). Cite the ID in any file that relies on the source.

- `originals/` — the two input documents exactly as received. Read-only.
- `funder/` — BlueDot's Rapid Grants terms and the application form fields.
- `incident/` — primary accounts of the Hugging Face incident and Stan's paper.
- `context/` — the wider summer-2026 moment: resignations, the pacing debate, agi.wtf, and a
  derived consolidated timeline.

Each note's header records `url`, `fetched`, `fetched_by`, `method` and `fidelity`.
`fidelity: verbatim` is page text captured in a browser. `fidelity: extracted` is an
AI-summarised extraction from a fetch tool: correct in outline, but re-check the URL before
quoting a number or a sentence externally.
