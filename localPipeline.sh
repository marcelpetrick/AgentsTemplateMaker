#!/usr/bin/env bash
# SPDX-FileCopyrightText: 2026 Marcel Petrick
# SPDX-License-Identifier: GPL-3.0-or-later
set -euo pipefail
cd -- "$(dirname -- "${BASH_SOURCE[0]}")"

npm ci
npx --no-install playwright install chromium
npm run format:check
npm run lint
npm run typecheck
npm run coverage
npm run build
