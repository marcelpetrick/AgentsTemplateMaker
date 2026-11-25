#!/usr/bin/env bash
# SPDX-FileCopyrightText: 2026 Marcel Petrick
# SPDX-License-Identifier: GPL-3.0-or-later
set -euo pipefail
cd -- "$(dirname -- "${BASH_SOURCE[0]}")"

npm ci
if [[ ${PLAYWRIGHT_INSTALL_SYSTEM_DEPS:-0} == 1 ]]; then
    npx --no-install playwright install --with-deps chromium firefox webkit
else
    npx --no-install playwright install chromium firefox webkit
fi
bash -n localPipeline.sh
for script in scripts/*.sh; do
    bash -n "$script"
done
npm run format:check
npm run lint
npm run lint:css
npm run lint:html
npm run diagrams
npm run knip
npm run duplicates
npm run typecheck
npm run coverage
npm run mutation
npm run build
npm run test:e2e
