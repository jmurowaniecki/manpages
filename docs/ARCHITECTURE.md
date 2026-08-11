# Architecture

High-level design of the **manpage** VS Code extension.

## Purpose

Provide TextMate-based syntax highlighting and light editor language
configuration for Unix/Linux manual page sources inside VS Code.

## Components

```text
┌─────────────────────────────────────────────────────────┐
│                   VS Code / Marketplace                 │
│  package.json contributes: languages + grammars         │
└─────────────┬───────────────────────────┬───────────────┘
              │                           │
              ▼                           ▼
┌─────────────────────────┐   ┌───────────────────────────┐
│ language-configuration  │   │ manpage.tmLanguage.json   │
│ · line comment `.\"`    │   │ · scopeName: source.man   │
│ · auto-closing pairs    │   │ · patterns / repository   │
└─────────────────────────┘   └─────────────┬─────────────┘
                                            │
                                            ▼
                              ┌───────────────────────────┐
                              │ Editor tokenizer / themes │
                              │ map scopes → colors       │
                              └───────────────────────────┘
```

| Piece | Role |
|-------|------|
| `package.json` | Extension manifest: language id, file extensions, grammar path, scripts |
| `syntaxes/manpage.tmLanguage.json` | Declarative TextMate grammar (comments, macros, flags, strings) |
| `language-configuration.json` | Comment and bracket pairing behavior |
| `test/syntax/*.man` | Grammar fixtures for `vscode-tmgrammar-test` |
| `scripts/analyze.js` | Static validation of JSON manifests and grammar metadata |
| CI (`.github/workflows/`) | `analyze`, `audit`, and `test` on PR/`main`; publish on `main` |

## Data flow

1. User opens a file with a registered extension (`.man`, `.manpage`, `.1`–`.8`).
2. VS Code selects language `manpage` and loads the TextMate grammar.
3. The tokenizer assigns scopes (see [INTERFACE.md](INTERFACE.md)).
4. The active color theme styles those scopes. No project code runs on the
   document content beyond editor tokenization.

## Trust boundary

The extension runs in the VS Code extension host as contributed language data.
It does not spawn processes, evaluate man-page content, or open network
connections. See [ASSURANCE-CASE.md](ASSURANCE-CASE.md) for threats and
expectations.
