# Security Policy

## Supported versions

Security fixes are applied to the latest published release on the [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=CompilouIT.manpage) and to the `main` branch of this repository.

| Version | Supported |
| ------- | --------- |
| Latest Marketplace release | Yes |
| Older releases | No — please upgrade |

Older Marketplace installs should upgrade in place via VS Code; there is no separate migration tool.

## Security requirements

What you **can** and **cannot** expect from this software is summarized in
[docs/ASSURANCE-CASE.md](docs/ASSURANCE-CASE.md). In short: highlighting only; no
execution of man-page content; no network features from the extension itself.

## Reporting a vulnerability

Please report security issues **privately**. Do not open a public GitHub issue for vulnerabilities.

Preferred options:

1. **GitHub private vulnerability reporting** — use [Report a vulnerability](https://github.com/jmurowaniecki/manpages/security/advisories/new) on this repository (Security → Advisories → Report a vulnerability), when enabled.
2. **Email** — contact the maintainer at [jmurowaniecki@gmail.com](mailto:jmurowaniecki@gmail.com) with a description of the issue, steps to reproduce, and impact. You may encrypt sensitive details if you prefer.

We aim to acknowledge vulnerability reports within **14 days**.

## Vulnerability response process

1. **Acknowledge** the report (target ≤ 14 days) and confirm whether it is in scope.
2. **Assess** severity and whether a Marketplace release is required.
3. **Fix** on a private branch when needed; add a regression test under `test/syntax/` if the issue relates to grammar/editor behavior that tests can catch.
4. **Release** a patched version and describe the fix in [CHANGELOG.md](CHANGELOG.md). If a CVE (or similar) was assigned before release, name it in the release notes.
5. **Credit** reporters in the advisory and/or changelog unless anonymity is requested.
6. **Disclose** via GitHub Security Advisory (and Marketplace release notes as appropriate) once a fix is available or the issue is rejected as out of scope.

If no vulnerabilities were resolved in the last 12 months, credit criteria are N/A until the first resolved report.

## Scope notes

This project is a syntax-highlighting extension (TextMate grammar and language configuration). It does not execute man-page content and does not perform network I/O as part of normal operation. Relevant concerns typically include supply-chain issues in dependencies, publishing credentials, or unexpected behavior in the grammar/editor integration.
