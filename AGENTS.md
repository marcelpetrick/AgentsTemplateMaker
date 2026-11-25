# Project instructions

Read [plan.md](plan.md), the [vision](<vision(20261125-195509).md>), and
[docs/decisions.md](docs/decisions.md) before changing product behavior.
Record new decisions, their reasons, and links to requirements and checks in
version-controlled Markdown under `docs/`.

Work on `main`. Keep commits atomic and use Conventional Commits. Refer to
the affected requirement IDs where applicable. Keep the full message under
300 characters. Bump the package version for every commit. Use a minor bump
for a major feature and a patch bump for other changes.

Write a failing test for new behavior or a reported defect. Run it to confirm
the failure, then implement the change. Run `./localPipeline.sh` before each
commit and push. Maintain at least 95% executable-line coverage and keep the
hosted pipeline green.

Use the pinned Node.js release and exact dependency versions. Check updates
against the full pipeline. Keep credentials out of project content and Git
history. Use synthetic placeholders in tests and examples.

Use plain language and keep both interface and generated instruction
translations current. Preserve the exact text a user writes. Keep C4
architecture views as Mermaid source in repository Markdown.
