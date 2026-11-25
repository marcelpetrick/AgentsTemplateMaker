# Architecture

## C4 system context

```mermaid
C4Context
    title Agent Maker system context
    Person(maintainer, "Project maintainer", "Composes a project's agent instructions.")
    System(agentMaker, "Agent Maker", "Builds and exports AGENTS.md in the browser.")
    System_Ext(pages, "GitHub Pages", "Publishes the static build.")
    System_Ext(repository, "Project repository", "Stores the maintainer's exported instructions.")
    Rel(maintainer, agentMaker, "Chooses rules and edits Markdown")
    Rel(pages, agentMaker, "Serves HTML, CSS and JavaScript over HTTPS")
    Rel(maintainer, repository, "Adds the exported AGENTS.md")
```

## C4 containers

```mermaid
C4Container
    title Agent Maker containers
    Person(maintainer, "Project maintainer")
    System_Boundary(system, "Agent Maker") {
        Container(site, "Browser application", "TypeScript, CodeMirror, HTML, CSS", "Renders policies, tracks authorship and exports Markdown.")
    }
    System_Ext(actions, "GitHub Actions", "Checks a clean checkout and builds the Pages artifact.")
    System_Ext(pages, "GitHub Pages", "Serves static assets.")
    System_Ext(browser, "Browser export APIs", "Clipboard and file download.")
    Rel(maintainer, site, "Changes controls and edits the draft")
    Rel(actions, pages, "Deploys a static build from green main")
    Rel(pages, site, "Delivers the application over HTTPS")
    Rel(site, browser, "Copies or downloads the current draft")
```

The browser app holds the draft in memory. It has no API server or database. GitHub
renders the Mermaid source in this file.

## Browser application responsibilities

- [Catalog](../src/catalog.ts) defines stable category and rule IDs, paired
  translations, explanatory text, defaults, and optional setting metadata.
- [Draft model](../src/draft.ts) tracks generated contributions and separators by
  range. A rule's identity is independent of its wording. CodeMirror change sets
  map offsets through direct edits and form changes. Detached and independent
  text survives later rule operations.
- [Editor](../src/editor.ts) stores the draft model in a CodeMirror state field
  and derives authorship decorations. CodeMirror handles keyboard input,
  selection, and undo for direct edits. History records the affected rule IDs
  and relative offsets of generated text removed by a selection. Exact inverse
  edits can restore those ranges while keeping form choices and authored copies.
- [Workspace controller](../src/app.ts) connects the form and editor. It stages
  a setting or output-language change that affects edited rules until the user
  confirms in the [confirmation dialog](../src/confirmDialog.ts).
  [Copy and download](../src/exportDraft.ts) read the same current draft.
- [Rule controls](../src/ruleControls.ts) and
  [setting controls](../src/settingControls.ts) render the form.
  [Help tooltips](../src/helpTooltips.ts) show one rule explanation at a time.
- [Interface strings](../src/strings.ts) carry the output language along while
  the draft has no authored text. Once the user edits, UI localization leaves the
  editor text, output language, and selection in place.
