#!/usr/bin/env bash
# SPDX-FileCopyrightText: 2026 Marcel Petrick
# SPDX-License-Identifier: GPL-3.0-or-later
set -euo pipefail
cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.."

git diff --cached --check
staged_tree=$(git write-tree)
scratch=$(mktemp -d)
trap 'rm -rf -- "$scratch"' EXIT
git archive "$staged_tree" | tar -x -C "$scratch"
"$scratch/localPipeline.sh"
test "$(git write-tree)" = "$staged_tree"
printf 'Verified staged tree %s\n' "$staged_tree"
