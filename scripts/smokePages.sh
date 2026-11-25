#!/usr/bin/env bash
# SPDX-FileCopyrightText: 2026 Marcel Petrick
# SPDX-License-Identifier: GPL-3.0-or-later
# Check that a deployed site serves the app built from this checkout's commit.
set -euo pipefail
cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.."

site=${1:?usage: smokePages.sh <site URL>}
revision=$(git rev-parse HEAD)
for attempt in 1 2 3 4 5 6; do
    page=$(curl -fsSL "$site") || page=""
    if grep -qF "<meta name=\"revision\" content=\"$revision\"" <<<"$page"; then
        printf 'Live site %s serves revision %s\n' "$site" "$revision"
        exit 0
    fi
    sleep $((attempt * 10))
done
printf 'Live site %s does not serve revision %s\n' "$site" "$revision" >&2
exit 1
