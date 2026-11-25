// Copyright (C) 2026 Marcel Petrick
// SPDX-License-Identifier: GPL-3.0-or-later

export const strings = {
  en: {
    copy: {
      skipLink: "Skip to workspace",
      interfaceLanguage: "Interface",
      theme: "Dark mode",
      heading: "Build your AGENTS.md",
      intro:
        "Choose how coding agents work in your project, then edit and export their instructions.",
      rulesHeading: "Project rules",
      sourceLicense: "Source code · GPLv3 or later",
      copy: "Copy",
      download: "Download",
      documentLanguage: "Document language",
      recommendation: "English recommended",
      editorHelp: "Type anywhere. Your edits are underlined.",
      confirmHeading: "Keep your edited text?",
      confirmDetail:
        "These rules contain your edits. Applying the change keeps that text as written.",
      cancel: "Cancel",
      apply: "Apply change",
    },
    keptRule: (label: string) =>
      `Kept your edited text for “${label}” as custom text.`,
    editWarning:
      "Unchecking an edited rule keeps your text as a custom instruction.",
    copied: "Copied AGENTS.md to the clipboard.",
    copyFailed: "Clipboard access failed. You can still download AGENTS.md.",
    downloaded: "Downloaded AGENTS.md.",
    editedRule: (label: string) => `Edited rule: ${label}`,
    ruleHelp: (label: string) => `About this rule: ${label}`,
    selected: (count: number) => `${count} selected`,
    documentTitle: "# Project instructions",
    changeWarning:
      "Applying the change keeps your edits as written. The new choice applies to untouched text and future insertions.",
    switchLight: "Light mode",
    switchDark: "Dark mode",
    editorLabel: "AGENTS.md Markdown editor",
  },
  de: {
    copy: {
      skipLink: "Zum Arbeitsbereich springen",
      interfaceLanguage: "Oberfläche",
      theme: "Dunkler Modus",
      heading: "Erstelle deine AGENTS.md",
      intro:
        "Lege fest, wie Programmieragenten in deinem Projekt arbeiten. Bearbeite und exportiere dann ihre Anweisungen.",
      rulesHeading: "Projektregeln",
      sourceLicense: "Quellcode · GPLv3 oder neuer",
      copy: "Kopieren",
      download: "Herunterladen",
      documentLanguage: "Dokumentsprache",
      recommendation: "Englisch empfohlen",
      editorHelp:
        "Du kannst überall schreiben. Deine Änderungen sind unterstrichen.",
      confirmHeading: "Bearbeiteten Text behalten?",
      confirmDetail:
        "Du hast diese Regeln bearbeitet. Wenn du die Änderung anwendest, bleibt dein Text erhalten.",
      cancel: "Abbrechen",
      apply: "Änderung anwenden",
    },
    keptRule: (label: string) =>
      `Dein bearbeiteter Text für „${label}“ bleibt als eigene Anweisung erhalten.`,
    editWarning:
      "Wenn du eine bearbeitete Regel abwählst, bleibt dein Text als eigene Anweisung erhalten.",
    copied: "AGENTS.md wurde in die Zwischenablage kopiert.",
    copyFailed:
      "Die Zwischenablage ist nicht verfügbar. Du kannst AGENTS.md herunterladen.",
    downloaded: "AGENTS.md wurde heruntergeladen.",
    editedRule: (label: string) => `Bearbeitete Regel: ${label}`,
    ruleHelp: (label: string) => `Über diese Regel: ${label}`,
    selected: (count: number) => `${count} ausgewählt`,
    documentTitle: "# Projektanweisungen",
    changeWarning:
      "Deine Änderungen bleiben erhalten. Die neue Auswahl gilt für unveränderten und künftig eingefügten Text.",
    switchLight: "Heller Modus",
    switchDark: "Dunkler Modus",
    editorLabel: "Markdown-Editor für AGENTS.md",
  },
} as const;
