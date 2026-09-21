---
title: Instructions for agents (and humans) working in this repo
status: active
owner: Zsolt
created: 2026-09-21
created_by: claude-fable-5-1 (Claude Code session 4f946fee)
updated: 2026-09-21
updated_by: claude-fable-5-1 (Claude Code session 4f946fee)
sources: []
---

# AGENTS.md

You are editing a documents repo for organising a public AI-safety event in Munich. Read this
whole file before changing anything. It is short.

## 1. Orient first

1. Read [STATUS.md](STATUS.md). It says what phase we are in, what is blocked and what is next.
2. Read [TIMELINE.md](TIMELINE.md) if your task touches dates.
3. Find the right directory in the map in [README.md](README.md). Each directory's `README.md`
   says what belongs there. Put new files in the directory that owns the topic, never at the root.
4. Check [decisions/decision-log.md](decisions/decision-log.md) before re-opening anything that
   looks already decided.

## 2. Provenance: every file has a header

Every markdown file begins with this YAML frontmatter. Fill every field.

```yaml
---
title: <human-readable title>
status: draft | in-review | confirmed | archived
owner: <person responsible, or "unassigned">
created: YYYY-MM-DD
created_by: <agent name + session id, or human name>
updated: YYYY-MM-DD
updated_by: <agent name + session id, or human name>
sources: [S03, S07]      # IDs from sources/INDEX.md that the content relies on
---
```

Rules:
- When you edit a file, update `updated`, `updated_by` and, if you added facts, `sources`.
- Only a human sets `status: confirmed`. Agents may set `draft` or `in-review`.
- Every factual claim (dates, amounts, quotes, criteria) must be traceable to a source ID.
  If you cannot trace it, write it as an assumption: "ASSUMPTION: ..." or "TBC".
- Never invent venue names, prices, contact details, headcounts or people. Leave `TBC`.

## 3. Sources: how external content enters the repo

- New external content goes in `sources/<area>/` as its own note with fetch metadata
  (URL, fetched date, who fetched it, method, fidelity). Register it in `sources/INDEX.md`
  with the next free ID.
- State fidelity honestly. `verbatim` means the text is the page text. `extracted` means an
  AI-summarised extraction (for example from a fetch tool); verify against the URL before
  quoting it in anything that leaves the repo.
- `sources/originals/` is read-only. Never edit the seed or the BlueDot RFE copy.

## 4. Logging: every action is recorded

The provenance log is [log/actions.log](log/actions.log). It is append-only. Never edit or delete
lines. One line per action: `<UTC time> | <session or actor> | <event> | <detail>`.

- **Under Claude Code** the hooks in `.claude/settings.json` log session start, every file write
  or edit, every shell command, every web fetch or search and every browser navigation, and
  the end of each turn. You do not need to do anything for those.
- **Under any other agent, or as a human**, log manually:
  `LOG_ACTOR=<your-name> scripts/log.sh "what you did and why"`.
- **Everyone, at the end of a work session**, appends one summary line with the same command:
  what changed, what is still open. The automatic lines say *what* happened; the summary says
  *why*.
- If the hook is not firing (no lines appearing while you work), say so in your summary line and
  in your final message, and log your actions manually.

## 5. Where things go

| If you are producing... | Put it in... |
|---|---|
| Grant application text, budget numbers, funder correspondence | `grant/` |
| Framing, agenda, format, run sheet, follow-up plan | `event/` |
| Anything a speaker needs, talk outlines, bios | `speakers/` |
| Audience thinking, channel plans, post copy, promo schedule | `outreach/` (copy in `outreach/copy/`) |
| Venue requirements, candidates, booking status | `venue/` |
| Catering, AV, name tags, registration, insurance | `logistics/` |
| Who is doing what, availability, meeting notes (`team/meetings/YYYY-MM-DD-topic.md`) | `team/` |
| A decision (with reasoning) or a new open question | `decisions/` |
| An external page or document you read | `sources/` + `sources/INDEX.md` |
| A change to what is true right now | `STATUS.md` (edit in place, keep it short) |
| A new or changed date | `TIMELINE.md` |

## 6. Working rules

- Agents draft, humans confirm. Anything that leaves the repo (submitting the grant, publishing a
  listing, emailing a community or venue, posting on LinkedIn) is done by a named human. Prepare
  it, mark it `in-review`, name who should send it in STATUS.md.
- Smallest useful change. Do not restructure directories or rename files without recording the
  decision in `decisions/decision-log.md`.
- Keep STATUS.md current. If you finish a task, move it from "next actions" to "done" there.
- Do not create summaries of summaries. Link to the file instead.
- Use absolute dates (2026-10-04), never "next Friday".
- Money: state currency. Funder amounts are USD; local costs are EUR. Record the exchange rate
  assumption you used (see `grant/budget.md`).
- Names: kebab-case filenames. Meeting notes and dated artefacts start with `YYYY-MM-DD-`.

## 7. Humans on this project

See [team/organizers.md](team/organizers.md). Lead is Dave (per seed; confirm). Zsolt maintains
this repo and its conventions.
