#!/usr/bin/env python3
"""Append one provenance line to log/actions.log.

Two ways in:
  1. As a hook (SessionStart / PostToolUse / Stop) under Claude Code
     (.claude/settings.json) or Codex (.codex/hooks.json, which passes
     `--agent codex`): the hook payload arrives as JSON on stdin and is
     summarised into one line.
  2. Manually: `python3 scripts/log_action.py --note "what you did"` (or the
     `scripts/log.sh` wrapper). Use this from any agent or human that is not
     running under Claude Code hooks.

Line format (pipe-separated, one action per line, append-only):
  <UTC timestamp> | <session or actor> | <event> | <detail>
"""
import datetime
import json
import os
import re
import sys

ROOT = os.environ.get("CLAUDE_PROJECT_DIR") or os.path.dirname(
    os.path.dirname(os.path.abspath(__file__))
)
LOG = os.path.join(ROOT, "log", "actions.log")


def now():
    return datetime.datetime.now(datetime.timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")


def rel(path):
    try:
        return os.path.relpath(path, ROOT)
    except ValueError:
        return path


def write(line):
    os.makedirs(os.path.dirname(LOG), exist_ok=True)
    with open(LOG, "a", encoding="utf-8") as f:
        f.write(line.rstrip("\n") + "\n")


def manual(note):
    actor = os.environ.get("LOG_ACTOR") or os.environ.get("USER") or "unknown"
    write(f"{now()} | {actor} | note | {note}")


PATCH_FILE = re.compile(r"^\*\*\* (?:Add|Update|Delete) File: (.+)$", re.M)


def command_text(ti):
    """Shell command from a Claude Code (string) or Codex (string or argv list) payload."""
    cmd = ti.get("command") or ti.get("cmd") or ""
    if isinstance(cmd, list):
        cmd = " ".join(str(c) for c in cmd)
    return " ".join(str(cmd).split())


def patched_files(ti, cwd=None):
    """File paths named in a Codex apply_patch payload, relative to the repo root.

    Relative patch paths are relative to the session's working directory
    (the payload's `cwd`), not to wherever this script happens to run.
    """
    text = " ".join(v for v in ti.values() if isinstance(v, str)) if isinstance(ti, dict) else str(ti)
    base = cwd or ROOT
    return [rel(os.path.join(base, p.strip())) for p in PATCH_FILE.findall(text)]


def from_hook(payload, agent=None):
    event = payload.get("hook_event_name", "hook")
    session = (payload.get("session_id") or "unknown")[:8]
    if agent:
        session = f"{agent}:{session}"
    tool = payload.get("tool_name") or ""
    ti = payload.get("tool_input") or {}

    if event == "SessionStart":
        detail = f"session started (source={payload.get('source', '?')})"
    elif event == "Stop":
        detail = "agent turn ended"
    elif tool in ("Write", "Edit", "MultiEdit", "NotebookEdit"):
        p = ti.get("file_path") or ti.get("notebook_path") or ""
        detail = rel(p) if p else "(no path)"
    elif tool == "apply_patch" or (isinstance(ti, dict) and patched_files(ti)):
        files = patched_files(ti, payload.get("cwd")) if isinstance(ti, dict) else []
        detail = ", ".join(files) or json.dumps(ti)[:240]
    elif tool == "Bash" or (isinstance(ti, dict) and (ti.get("command") or ti.get("cmd"))):
        cmd = command_text(ti)
        if "scripts/log.sh" in cmd or "log_action.py" in cmd:
            return  # the manual entry already recorded this
        detail = cmd[:240]
    elif not isinstance(ti, dict):
        detail = str(ti)[:240]
    elif tool in ("WebFetch", "WebSearch") or "url" in ti or "query" in ti:
        detail = ti.get("url") or ti.get("query") or json.dumps(ti)[:240]
    else:
        detail = json.dumps(ti)[:240]

    label = f"{event}:{tool}" if tool else event
    write(f"{now()} | {session} | {label} | {detail}")


def main(argv):
    if len(argv) >= 2 and argv[1] == "--note":
        manual(" ".join(argv[2:]).strip() or "(empty note)")
        return
    agent = argv[argv.index("--agent") + 1] if "--agent" in argv[:-1] else None
    try:
        payload = json.load(sys.stdin)
    except Exception:
        payload = {}
    from_hook(payload, agent)


if __name__ == "__main__":
    main(sys.argv)
