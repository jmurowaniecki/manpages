# External interface

This document describes the external interface of the **manpage** VS Code extension: what files it recognizes, what it contributes to the editor, and the main TextMate scopes themes and tools can target.

## Inputs

### File associations

When a file uses one of these extensions, VS Code should activate language id `manpage` (aliases: `manpage`, `manpages`, `man`):

| Extension | Typical use |
|-----------|-------------|
| `.man` | Generic man-page source |
| `.manpage` | Explicit man-page source |
| `.1` … `.8` | Manual sections (user commands through system administration) |

You can also select **manpage** manually from the editor language mode picker.

### Source content

Input is plain text in man/roff style (for example `.TH`, `.SH`, `.B`, comments starting with `.\"`). The extension does not compile or render pages; it only tokenizes text for highlighting.

## Outputs

### Editor contributions

| Contribution | Location | Effect |
|--------------|----------|--------|
| Language definition | `package.json` → `contributes.languages` | Language id, aliases, extensions |
| TextMate grammar | `syntaxes/manpage.tmLanguage.json` | Token scopes under `source.man` |
| Language configuration | `language-configuration.json` | Line comment `.\"`, auto-closing and surrounding pairs for `{}` `[]` `()` `""` `''` |

### Grammar root scope

- **scopeName:** `source.man`

### Principal TextMate scopes

| Scope | Meaning |
|-------|---------|
| `comment.line.roff` | Roff comment lines (`.\" …`) |
| `keyword.control.macro.th.man` | `.TH` macro |
| `entity.name.title.man` | Title name in `.TH` |
| `constant.numeric.section.man` | Manual section number in `.TH` |
| `string.unquoted.date.man` | Date field in `.TH` |
| `entity.name.provider.man` | Provider/source field in `.TH` |
| `meta.documentation.manual.man` | Manual name field in `.TH` |
| `keyword.control.header.man` | Header macros such as `.SH` / `.TH` (simple form) |
| `markup.heading.man` | Section heading text |
| `keyword.control.macro.man` | Formatting and generic macros (`.B`, `.I`, …) |
| `markup.formated.man` | Macro argument text |
| `variable.parameter.flag.man` | CLI-style flags (`-v`, `--verbose`) |
| `markup.bold.mandatory.man` | Bracket groups `[…]` |
| `markup.italic.optional.man` | Chevron groups `<…>` |
| `punctuation.definition.*.man` | Bracket / chevron / brace delimiters |
| `keyword.operator.logical.man` | Alternation `|` |
| `variable.other.value.man` | Uppercase value tokens |
| `string.quoted.double.man` | Double-quoted strings |
| `constant.character.escape.man` / `constant.character.escape.roff.man` | Escape sequences |

Themes map these scopes to colors. Tests under `test/syntax/` assert many of these scopes with `vscode-tmgrammar-test`.

## Non-goals

- No command palette commands, settings schema, or webviews.
- No network access or execution of man-page content.
- No stable programmatic API beyond the VS Code contribution points and TextMate scopes above.
