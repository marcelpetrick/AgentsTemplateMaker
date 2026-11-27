# Architecture

## C4 system context

```mermaid
C4Context
    title AgentsTemplateMaker system context
    Person(maintainer, "Project maintainer", "Composes a project's agent instructions.")
    System(agentsTemplateMaker, "AgentsTemplateMaker", "Builds and exports AGENTS.md in the browser.")
    System_Ext(pages, "GitHub Pages", "Publishes the static build.")
    System_Ext(repository, "Project repository", "Stores the maintainer's exported instructions.")
    Rel(maintainer, agentsTemplateMaker, "Chooses rules and edits Markdown")
    Rel(pages, agentsTemplateMaker, "Serves HTML, CSS and JavaScript over HTTPS")
    Rel(maintainer, repository, "Adds the exported AGENTS.md")
```

## C4 containers

```mermaid
C4Container
    title AgentsTemplateMaker containers
    Person(maintainer, "Project maintainer")
    System_Boundary(system, "AgentsTemplateMaker") {
        Container(site, "Browser application", "TypeScript, CodeMirror, HTML, CSS", "Renders policies, tracks authorship and exports Markdown.")
    }
    System_Ext(actions, "GitHub Actions", "Runs the full pipeline, keeps the tested build, deploys it, and smoke-checks the live site.")
    System_Ext(pages, "GitHub Pages", "Serves static assets.")
    System_Ext(browser, "Browser export APIs", "Clipboard and file download.")
    Rel(maintainer, site, "Changes controls and edits the draft")
    Rel(actions, pages, "Deploys the build CI tested on green main")
    Rel(pages, site, "Delivers the application over HTTPS")
    Rel(site, browser, "Copies or downloads the current draft")
```

The browser app holds the draft in memory and keeps a copy in the browser's local
storage. It has no API server or database. GitHub
renders the Mermaid source in this file.

## C4 components of the browser application

```mermaid
C4Component
    title Browser application components
    Person(maintainer, "Project maintainer")
    Container_Boundary(site, "Browser application") {
        Component(workspace, "Workspace controller", "app.ts", "Owns selection, settings, and languages. Connects form and editor.")
        Component(form, "Form controls", "ruleControls.ts, settingControls.ts, helpTooltips.ts", "Render categories, rules, settings, bulk selection, and help.")
        Component(dialog, "Confirmation dialog", "confirmDialog.ts", "Asks before a change touches edited rules.")
        Component(catalog, "Catalog", "catalog.ts", "Rule IDs, bilingual paragraphs, help, and settings.")
        Component(draft, "Draft model", "draft.ts", "Tracks generated ranges and authored text through edits.")
        Component(editor, "Editor", "editor.ts, CodeMirror 6", "Holds the draft in state, marks authorship, and keeps undo history.")
        Component(texts, "Interface texts", "strings.ts, messages.ts, stats.ts, about.ts", "Labels, status messages, word count, and About.")
        Component(export, "Export", "exportDraft.ts", "Copies or downloads the current draft.")
    }
    Rel(maintainer, form, "Selects rules and settings")
    Rel(maintainer, editor, "Types in the draft")
    Rel(form, workspace, "Reports changes")
    Rel(workspace, dialog, "Asks for confirmation")
    Rel(workspace, catalog, "Reads paragraphs")
    Rel(workspace, draft, "Replaces rule paragraphs")
    Rel(workspace, editor, "Applies drafts and reads text")
    Rel(editor, draft, "Maps edits")
    Rel(workspace, texts, "Renders labels and counts")
    Rel(workspace, export, "Exports the draft")
```

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
- [Workspace controller](../src/app.ts) also lets the document language follow
  the interface language while the draft has no authored text. Once the user
  edits, an interface language change leaves the editor text, output language,
  and selection in place.
- [Interface strings](../src/strings.ts) and
  [status messages](../src/messages.ts) hold every visible English and German
  text. [Text statistics](../src/stats.ts) count words and user-perceived
  characters and fall back when `Intl.Segmenter` is missing.
  [About](../src/about.ts) lists the runtime libraries from `package.json`.
- [DOM helpers](../src/dom.ts) look up typed page elements and create controls.
