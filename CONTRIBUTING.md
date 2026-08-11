# Contributing

Thanks for helping improve **manpage**. This project is a VS Code TextMate grammar for Unix/Linux man pages.

## How to contribute

1. Open an [issue](https://github.com/jmurowaniecki/manpages/issues) to discuss larger changes when unsure.
2. Fork the repository and create a feature branch from `main`.
3. Make your changes.
4. Run the test suite and ensure it passes.
5. Open a pull request against `main` with a short description of the change.

Pull requests are the preferred way to contribute. Issues are used for bugs and enhancement requests.

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

The external interface (file extensions and TextMate scopes) is described in [docs/INTERFACE.md](docs/INTERFACE.md). Update that document when you change associations or principal scopes.

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

### Policy: tests for new functionality

When you add or change major highlighting behavior (new macros, scopes, or file association rules), add or update fixtures under `test/syntax/` so the behavior is covered by `npm test`. CI runs this suite on every pull request and push to `main`.

## Coding standards

- Prefer small, focused pull requests.
- Keep TextMate patterns readable; comment non-obvious regex when helpful.
- Do not commit secrets, credentials, or personal access tokens.
- Match existing JSON indentation and style in `syntaxes/` and `language-configuration.json`.
- Update [CHANGELOG.md](CHANGELOG.md) under an `[Unreleased]` section when your change is user-visible.

## Reporting security issues

Do not open a public issue for security vulnerabilities. Follow [SECURITY.md](SECURITY.md).
