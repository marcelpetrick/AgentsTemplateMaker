#!/usr/bin/env bash
# SPDX-FileCopyrightText: 2026 Marcel Petrick
# SPDX-License-Identifier: GPL-3.0-or-later
# Check that a deployed site serves the app built from this checkout.
set -euo pipefail
cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.."

site=${1:?usage: smokePages.sh <site URL>}
version=$(node -p 'require("./package.json").version')
for attempt in 1 2 3 4 5 6; do
    page=$(curl -fsSL "$site") || page=""
    script=$(grep -oE 'assets/index-[A-Za-z0-9_-]+\.js' <<<"$page" | head -n 1 || true)
    bundle=""
    [[ -n $script ]] && bundle=$(curl -fsSL "$site$script" || true)
    if grep -qE "[^0-9.]${version//./\\.}[^0-9.]" <<<"$bundle"; then
        printf 'Live site %s serves version %s\n' "$site" "$version"
        exit 0
    fi
    sleep $((attempt * 10))
done
printf 'Live site %s does not serve version %s\n' "$site" "$version" >&2
exit 1
