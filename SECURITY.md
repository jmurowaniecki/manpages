# Security Policy

## Supported versions

Security fixes are applied to the latest published release on the [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=CompilouIT.manpage) and to the `main` branch of this repository.

| Version | Supported |
| ------- | --------- |
| Latest Marketplace release | Yes |
| Older releases | No — please upgrade |

## Reporting a vulnerability

Please report security issues **privately**. Do not open a public GitHub issue for vulnerabilities.

Preferred options:

1. **GitHub private vulnerability reporting** — use [Report a vulnerability](https://github.com/jmurowaniecki/manpages/security/advisories/new) on this repository (Security → Advisories → Report a vulnerability), when enabled.
2. **Email** — contact the maintainer at [jmurowaniecki@gmail.com](mailto:jmurowaniecki@gmail.com) with a description of the issue, steps to reproduce, and impact. You may encrypt sensitive details if you prefer.

We aim to acknowledge vulnerability reports within **14 days**.

## Scope notes

This project is a syntax-highlighting extension (TextMate grammar and language configuration). It does not execute man-page content and does not perform network I/O as part of normal operation. Relevant concerns typically include supply-chain issues in dependencies, publishing credentials, or unexpected behavior in the grammar/editor integration.
