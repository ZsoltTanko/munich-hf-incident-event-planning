---
title: The provenance log
status: active
owner: Zsolt
created: 2026-09-21
created_by: claude-fable-5-1 (Claude Code session 4f946fee)
updated: 2026-09-25
updated_by: claude-opus-5-5 (Claude Code session 4f946fee)
sources: []
---

# log/

`actions.log` is the append-only record of every agent action in this repo. Never edit or
delete lines. Never rotate or truncate it.

Line format: `<UTC time> | <session id or actor> | <event> | <detail>`

- Automatic lines come from the Claude Code hooks in `.claude/settings.json`, which call
  `scripts/log_action.py` on session start, after every Write/Edit/Bash/WebFetch/WebSearch/
  browser-navigation tool call, and when a turn ends. The session id is the first 8 characters
  of the Claude Code session.
- Codex lines come from `.codex/hooks.json`, which calls the same script with `--agent codex`,
  so the session column reads `codex:<first 8 characters of the session id>`. The Codex hooks
  find the script through `git rev-parse --show-toplevel`, because Codex does not set
  `CLAUDE_PROJECT_DIR`.
- Manual lines (`event = note`) come from `scripts/log.sh "message"`; set `LOG_ACTOR` to name
  yourself. Any agent not running under Claude Code, and every human, logs this way.
- Git history is the second layer of provenance: commit whenever a piece of work is coherent.

The first block of lines (2026-09-21, session 4f946fee) was written by hand by the agent that
created the repo, because the hook did not exist until the end of that session.
