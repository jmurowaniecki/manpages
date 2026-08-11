# Security review

**Date:** 2026-08-11  
**Reviewer:** John Murowaniecki (Maintainer)  
**Scope:** manpage VS Code extension sources, contribution surface, CI publish path

## Method

Human review of:

- Extension contributions in `package.json` (languages, grammars only)
- `syntaxes/manpage.tmLanguage.json` and `language-configuration.json`
- GitHub Actions workflows (test + publish)
- Documented security requirements and assurance case

No memory-unsafe languages are present in project results. Dynamic analysis aimed
at memory safety is therefore not applicable; grammar behavior is exercised by
the FLOSS suite `vscode-tmgrammar-test` in CI.

## Findings

1. **Contribution surface is minimal** — no commands, webviews, or tasks that
   execute user document content.
2. **Primary residual risks** are supply-chain (npm/Actions) and compromise of
   the Marketplace publish secret — addressed with lockfile installs, audit,
   Dependabot, and secret hygiene.
3. **Bus factor / access continuity** remain organizational risks (single
   Maintainer); tracked in governance and roadmap, not a code defect.

## Conclusion

Security requirements in the assurance case are met for the current design.
Re-review when adding commands, network access, custom editors, or native code,
or within five years—whichever comes first.
