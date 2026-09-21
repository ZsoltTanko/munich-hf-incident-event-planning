#!/usr/bin/env bash
# Manual provenance entry. Usage: scripts/log.sh "what you did and why"
# Set LOG_ACTOR to name yourself (e.g. LOG_ACTOR=codex or LOG_ACTOR=zsolt).
set -euo pipefail
cd "$(dirname "$0")/.."
python3 scripts/log_action.py --note "$*"
