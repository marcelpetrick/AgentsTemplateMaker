#!/usr/bin/env bash
# SPDX-FileCopyrightText: 2026 Marcel Petrick
# SPDX-License-Identifier: GPL-3.0-or-later
set -euo pipefail

cd "$(dirname "${BASH_SOURCE[0]}")/.."
npm run build
AGENT_MAKER_SCREENSHOT=1 npm exec -- playwright test --project=chromium --grep 'README screenshot'
