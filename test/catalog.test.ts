// SPDX-FileCopyrightText: 2026 Marcel Petrick
// SPDX-License-Identifier: GPL-3.0-or-later

import { describe, expect, it } from "vitest";
import { categories, rules, type Language, type Rule } from "../src/catalog";
import { ruleValues } from "./ruleValues";

function paragraph(id: string, language: Language, value = "") {
  const rule = rules.find((candidate) => candidate.id === id);
  expect(rule, id).toBeDefined();
  return rule!.paragraph(
    language,
    value === "" ? (rule!.setting?.initial ?? "") : value,
  );
}

describe("instruction catalog", () => {
  it("keeps unique identities and orders decisions from policy to verification", () => {
    expect(categories.map(({ id }) => id)).toEqual([
      "agent",
      "software",
      "repository",
      "verification",
    ]);
    expect(rules.map(({ id }) => id)).toEqual([
      "delegation",
      "model-choice",
      "advisor",
      "autonomy",
      "technologies",
      "languages",
      "open-source",
      "character-set",
      "versioning",
      "lint-format",
      "dependencies",
      "commits",
      "commit-limit",
      "credentials",
      "plain-language",
      "traceability",
      "review",
      "unit-tests",
      "integration-tests",
      "e2e-tests",
      "acceptance-tests",
      "automation",
      "mutation",
      "coverage",
      "clean-pipeline",
      "tdd",
      "c4",
      "mermaid",
    ]);
    const categoryIds = categories.map(({ id }) => id);
    const positions = rules.map(({ category }) =>
      categoryIds.indexOf(category),
    );
    expect(positions).not.toContain(-1);
    expect(positions).toEqual(
      positions.toSorted((left, right) => left - right),
    );
  });

  it("starts with the agreed repository basics and a strict limit under 300", () => {
    expect(
      rules
        .filter(({ defaultSelected }) => defaultSelected)
        .map(({ id }) => id),
    ).toEqual(["commits", "commit-limit", "credentials", "traceability"]);
    expect(paragraph("commits", "en")).toContain(
      "fix(parser): handle an empty field",
    );
    expect(paragraph("commit-limit", "en")).toMatch(
      /under 300.*subject.*body.*footers.*line breaks.*299/,
    );
    expect(paragraph("commit-limit", "en", "600")).toMatch(/under 600.*599/);
    expect(paragraph("commit-limit", "de", "600")).toMatch(
      /weniger als 600.*599/,
    );
    expect(paragraph("credentials", "en")).toMatch(
      /files.*messages.*examples.*logs.*artifacts.*placeholders/,
    );
    expect(paragraph("traceability", "en")).toMatch(
      /Markdown.*rationale.*requirement.*implementation.*acceptance.*evidence.*requirement ID.*commit message/,
    );
  });

  it("supplies a bilingual label, trade-off, and distinct paragraph for every option", () => {
    for (const rule of rules) {
      expect(rule.label.en).not.toBe(rule.label.de);
      expect(rule.help.en).not.toBe(rule.help.de);
      const setting = rule.setting;
      if (setting) expect(setting.label.en).not.toBe(setting.label.de);
      for (const value of ruleValues(rule)) {
        const en = rule.paragraph("en", value);
        const de = rule.paragraph("de", value);
        expect(en).not.toBe(de);
        for (const text of [en, de]) {
          expect(text.trim()).toBe(text);
          expect(text.length).toBeGreaterThan(60);
          expect(text).not.toMatch(/\n/);
        }
      }
    }
  });

  it("separates prohibited delegation, independent review, and parallel independent work", () => {
    const delegation = rules.find(({ id }) => id === "delegation");
    expect(delegation?.defaultSelected).toBeFalsy();
    expect(delegation?.help.en).toMatch(/time.*checking.*tokens/);
    expect(paragraph("delegation", "en", "prohibited")).toMatch(
      /Do not delegate/,
    );
    expect(paragraph("delegation", "en", "review")).toMatch(
      /independent review.*keep implementation/,
    );
    expect(paragraph("delegation", "en", "independent")).toMatch(
      /independent work.*in parallel/,
    );
  });

  it("defines limits on models and advisors while leaving conflict decisions to people", () => {
    expect(paragraph("model-choice", "en")).toMatch(/low-risk.*stronger model/);
    expect(paragraph("advisor", "en")).toMatch(
      /recommendation.*supported stable.*long-term support.*human/,
    );
    expect(paragraph("autonomy", "en", "routine")).toMatch(
      /reversible.*approval/,
    );
    expect(paragraph("autonomy", "en", "approval")).toMatch(/approval before/);
  });

  it("keeps project technology in the writer’s language and separates tooling and versions", () => {
    expect(paragraph("technologies", "en")).toMatch(
      /documented project technologies/,
    );
    expect(
      paragraph("technologies", "de", "  TypeScript und\n Vite  "),
    ).toContain("TypeScript und Vite");
    expect(paragraph("open-source", "en")).toMatch(
      /open-source.*explicit exceptions/,
    );
    expect(paragraph("versioning", "en", "semver")).toMatch(
      /MAJOR.*MINOR.*PATCH/,
    );
    expect(paragraph("versioning", "en", "calver")).toMatch(
      /YYYY\.MM\.PATCH.*UTC/,
    );
    expect(paragraph("lint-format", "en")).toMatch(
      /Ruff.*Black.*one formatter/,
    );
    expect(paragraph("dependencies", "en")).toMatch(
      /Pin.*compatible updates.*failing check/,
    );
  });

  it("lists common languages and frameworks and allows domain-specific ones", () => {
    const languages = rules.find(({ id }) => id === "languages")!;
    expect(languages.setting?.kind).toBe("multi");
    const values = languages.setting!.options!.map(({ value }) => value);
    for (const expected of [
      "shell",
      "python",
      "cpp",
      "cmake",
      "qt",
      "lvgl",
      "touchgfx",
      "esp-idf",
      "freertos",
      "zephyr",
      "typescript",
      "rust",
    ])
      expect(values).toContain(expected);
    expect(paragraph("languages", "en", "")).toMatch(
      /languages and frameworks the project already uses.*domain-specific language.*record why/,
    );
    expect(paragraph("languages", "en", "python,cpp,qt")).toMatch(
      /^Use these languages and frameworks: Python, C\+\+, Qt\. .*domain-specific/,
    );
    expect(paragraph("languages", "de", "cpp,python")).toMatch(
      /^Nutze diese Sprachen und Frameworks: Python, C\+\+\. /,
    );
  });

  it("offers Unicode-compliant code or an ASCII-only restriction", () => {
    expect(paragraph("character-set", "en", "unicode")).toMatch(
      /UTF-8.*code point.*grapheme.*normaliz/,
    );
    expect(paragraph("character-set", "en", "ascii")).toMatch(
      /identifiers.*comments.*file names.*ASCII.*exception/,
    );
  });

  it("asks for a review loop after each planning change and implementation iteration", () => {
    expect(paragraph("review", "en")).toMatch(
      /each planning change.*each implementation iteration.*still fits.*repeat/,
    );
    expect(paragraph("review", "de")).toMatch(
      /Planungsänderung.*Umsetzungsschritt.*wiederhole/,
    );
  });

  it("captures coverage scope and supported targets so missing evidence stays visible", () => {
    expect(paragraph("coverage", "en")).toMatch(
      /99%.*executable-line.*production.*exclusions.*without rounding/,
    );
    expect(paragraph("coverage", "de", "97")).toMatch(/97\s?%/);
    expect(paragraph("automation", "en")).toMatch(
      /supported build target.*CI jobs.*manual/,
    );
    expect(paragraph("clean-pipeline", "en")).toMatch(
      /clean clone.*pinned.*configure.*build.*pipeline.*results/,
    );
    expect(paragraph("mutation", "en")).toMatch(
      /surviving.*missing assertions.*equivalent/,
    );
  });
});

function ruleText(rule: Rule) {
  const setting = rule.setting;
  const lines = [
    `## ${rule.id}: ${rule.label.en} / ${rule.label.de}`,
    `Help (en): ${rule.help.en}`,
    `Help (de): ${rule.help.de}`,
  ];
  if (setting) {
    lines.push(
      `Setting (${setting.kind}, initial "${setting.initial}"): ${setting.label.en} / ${setting.label.de}`,
      ...(setting.options ?? []).map(
        ({ value, label }) => `- ${value}: ${label.en} / ${label.de}`,
      ),
    );
  }
  for (const value of ruleValues(rule)) {
    lines.push(
      `### Value "${value}" (en)\n\n${rule.paragraph("en", value)}`,
      `### Value "${value}" (de)\n\n${rule.paragraph("de", value)}`,
    );
  }
  return lines;
}

// The complete generated wording, reviewable in version control.
function catalogText() {
  const lines: string[] = [];
  for (const category of categories) {
    lines.push(`# ${category.id}: ${category.label.en} / ${category.label.de}`);
    const members = rules.filter((rule) => rule.category === category.id);
    for (const rule of members) lines.push(...ruleText(rule));
  }
  return lines.join("\n\n") + "\n";
}

describe("catalog wording", () => {
  // After an intended wording change, review and update the snapshot with
  // `npx vitest run -u`.
  it("matches the reviewed text of every rule, option, and translation", async () => {
    await expect(catalogText()).toMatchFileSnapshot("__snapshots__/catalog.md");
  });
});
