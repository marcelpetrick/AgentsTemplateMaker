#!/usr/bin/env bash
# SPDX-FileCopyrightText: 2026 Marcel Petrick
# SPDX-License-Identifier: GPL-3.0-or-later
# Collect the release outputs for a version tag in release/: the built site,
# SHA-256 checksums, a CycloneDX SBOM, and a changelog of the Conventional
# Commits since the previous tag. Run after the build has written dist/.
set -euo pipefail

tag="${1:?usage: releaseAssets.sh vX.Y.Z}"
version="$(node -p 'require("./package.json").version')"
if [[ "$tag" != "v$version" ]]; then
  echo "Tag $tag does not match package version $version." >&2
  exit 1
fi
[[ -f dist/index.html ]] || { echo "Build dist/ first." >&2; exit 1; }

out=release
rm -rf "$out"
mkdir -p "$out"
archive="agent-maker-$version.tar.gz"
tar -czf "$out/$archive" -C dist .
npm sbom --sbom-format cyclonedx --omit dev > "$out/agent-maker-$version.cdx.json"

previous="$(git describe --tags --abbrev=0 "$tag^" 2>/dev/null || true)"
range="${previous:+$previous..}$tag"
{
  echo "# Agent Maker $version"
  echo
  echo "Changes since ${previous:-the first commit}:"
  echo
  git log --no-merges --format='- %s (%h)' "$range"
} > "$out/CHANGELOG.md"

(cd "$out" && sha256sum "$archive" "agent-maker-$version.cdx.json" > SHA256SUMS)
ls -1 "$out"
