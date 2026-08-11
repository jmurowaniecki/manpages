# Contributing

Thanks for helping improve **manpage**. This project is a VS Code TextMate grammar for Unix/Linux man pages.

Please follow the [Code of Conduct](CODE_OF_CONDUCT.md). Project decision-making and roles are described in [GOVERNANCE.md](GOVERNANCE.md).

## How to contribute

1. Open an [issue](https://github.com/jmurowaniecki/manpages/issues) to discuss larger changes when unsure.
2. Fork the repository and create a feature branch from `main`.
3. Make your changes.
4. Run static analysis and the test suite; ensure they pass.
5. Open a pull request against `main` with a short description of the change.
6. Sign off your commits (Developer Certificate of Origin — see below).

Pull requests are the preferred way to contribute. Issues are used for bugs and enhancement requests.

### Small tasks for new contributors

Issues suitable for newcomers are labeled **`good first issue`** and/or **`help wanted`**:

- [good first issue](https://github.com/jmurowaniecki/manpages/labels/good%20first%20issue)
- [help wanted](https://github.com/jmurowaniecki/manpages/labels/help%20wanted)

Typical starter work: add a syntax fixture, fix a scope assertion, or improve docs.

## Developer Certificate of Origin (DCO)

By contributing, you certify that you have the right to submit the work under the
project license, as described in the [Developer Certificate of Origin](https://developercertificate.org/).

Each commit MUST include a sign-off line:

```text
Signed-off-by: Your Name <your.email@example.com>
```

Use `git commit -s` to add it automatically.

## Development setup

```sh
git clone https://github.com/YOUR_USER/manpages.git
cd manpages
npm install
npm run analyze
npm run audit
npm test
```

To try the extension interactively, open this folder in VS Code and press `F5` (Extension Development Host).

Quick user path: [docs/QUICKSTART.md](docs/QUICKSTART.md).  
External interface (extensions and scopes): [docs/INTERFACE.md](docs/INTERFACE.md).  
Architecture: [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).

Update those docs when you change associations, principal scopes, or structure.

## Static analysis

Before opening a pull request, run:

```sh
npm run analyze   # validate JSON / extension metadata
npm run audit     # npm audit at high severity and above
npm test
```

CI runs the same checks on every pull request and push to `main`.

## Tests

Syntax coverage is checked with [`vscode-tmgrammar-test`](https://github.com/PanAeon/vscode-tmgrammar-test):

```sh
npm test
```

Tests live under `test/syntax/` as `.man` fixtures. Each fixture starts with:

```text
// SYNTAX TEST "source.man"
```

Assertion lines use `//` comments with `^` / `^^^…` markers under tokens, naming the expected TextMate scopes (for example `comment.line.roff`, `markup.heading.man`). See existing files such as `test/syntax/common-use-cases.man` for patterns.

### Policy: tests for new functionality (mandatory)

As **major new functionality** is added to the software (new macros, scopes, or file association rules), tests for that functionality **MUST** be added to the automated suite under `test/syntax/` so the behavior is covered by `npm test`. This is a formal project policy. Pull requests that add major highlighting behavior without tests will not be merged.

CI runs this suite on every pull request and push to `main`. When fixing a user-visible highlighting bug, add a regression fixture when practical (target: regression coverage for at least half of such fixes).

## Coding standards

Primary languages/artifacts: **JSON** (TextMate grammar, language configuration, `package.json`) and small **JavaScript** (`scripts/`).

| Area | Standard |
|------|----------|
| Grammar / language JSON | Valid JSON; keep structure and indentation consistent with existing files in `syntaxes/` (tabs) and `language-configuration.json` (spaces). Prefer readable patterns; comment non-obvious regex via TextMate `"comment"` fields. |
| JavaScript | Match existing `scripts/analyze.js` style (CommonJS, clear early exits, no secrets). |
| Commits / PRs | Small, focused changes; no credentials in the tree; update [CHANGELOG.md](CHANGELOG.md) `[Unreleased]` for user-visible changes. |

### Enforcement

- `npm run analyze` enforces parseable JSON and required extension metadata (FLOSS check run in CI).
- `npm test` enforces grammar behavior against fixtures.
- There is no separate JSON pretty-printer mandated; invalid JSON fails CI. Contributions that break formatting consistency may be asked to align with neighboring files before merge.

## Code review

### Requirements

- Pull requests SHOULD be reviewed before merge when a second person is available.
- The Maintainer may self-merge routine maintenance (Dependabot, typo fixes) after CI is green.
- For substantive changes, review checks:
  - Intent and scope are clear; change matches the issue/PR description.
  - Tests added or updated for major new highlighting behavior.
  - `npm run analyze`, `npm run audit`, and `npm test` pass in CI.
  - No secrets or unrelated files.
  - Docs updated when the external interface or architecture changes.
  - Commits are DCO signed-off.

Until a second Maintainer regularly reviews PRs, the project cannot claim a 50% two-person review rate (Gold `two_person_review`). Documenting this standard is still required for Silver `code_review_standards`.

## Reporting security issues

Do not open a public issue for security vulnerabilities. Follow [SECURITY.md](SECURITY.md).
