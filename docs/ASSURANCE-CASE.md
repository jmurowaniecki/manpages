# Assurance case

This document justifies why the security expectations of **manpage** are met.
It is intended for the OpenSSF Best Practices `assurance_case` criterion.

## Security requirements (what users can and cannot expect)

**Users can expect:**

- The extension contributes only language configuration and a TextMate grammar
  for highlighting man-page sources in the editor.
- Normal use does not require granting the extension network access or executing
  document content.
- Vulnerabilities in dependencies used for development/publish tooling are
  monitored (`npm audit` in CI, Dependabot).

**Users cannot expect:**

- Protection against malicious man-page *content* beyond ordinary editor text
  handling (treat untrusted files like any untrusted text).
- Sandboxing beyond what VS Code already applies to extensions.
- Cryptographic services, authentication, or secure transport implemented by
  this project (none are provided).

Details: [SECURITY.md](../SECURITY.md) and the “Secure use” section of the README.

## Threat model

| Threat | Boundary | Mitigation |
|--------|----------|------------|
| Malicious `.man` content executes code via the extension | Document → extension | Grammar is declarative JSON; no evaluator of page content |
| Supply-chain compromise of npm deps / Actions | Maintainer toolchain | Pin lockfile; `npm ci`; Dependabot; `npm audit` in CI |
| Leaked Marketplace publish token | CI secrets | Store only as GitHub Actions secret; rotate if exposed; limit workflow permissions |
| Typo-squatting / fake extension | Users installing software | Official publisher `CompilouIT.manpage` on Marketplace; install from known URL |
| Maintainer account takeover | GitHub / Marketplace | 2FA for maintainers ([GOVERNANCE.md](../GOVERNANCE.md)) |

## Trust boundaries

1. **Untrusted input:** file contents opened by the user in the editor.
2. **Trusted project artifacts:** grammar and language config shipped in the VSIX.
3. **Trusted platforms:** VS Code, GitHub, Visual Studio Marketplace (hardening
   headers and TLS are provided by those hosts).
4. **Maintainer secrets:** `VSCE_PAT` and GitHub credentials stay outside the
   distributed extension.

## Secure design principles applied

- **Least privilege:** no commands, no filesystem writers, no network client in
  the extension contribution surface.
- **Economy of mechanism:** small declarative grammar rather than a custom parser
  runtime.
- **Fail safe:** invalid grammar/metadata fails CI (`npm run analyze`) rather than
  shipping silently broken manifests when checks run.
- **Open design:** sources, tests, and security policy are public.

## Common implementation weaknesses countered

| Weakness class | Relevance | Countermeasure |
|----------------|-----------|----------------|
| Injection / RCE via document | High impact if present | No interpreter of man macros at runtime |
| XSS / web bugs | N/A (no web UI) | — |
| Memory unsafety | N/A (no C/C++ in project results) | — |
| Crypto misuse | N/A (no crypto in project results) | — |
| Secret leakage in repo | Possible | Policy in CONTRIBUTING; no credentials in tree; CI secret for publish |
| Dependency CVEs | Possible in dev/publish tooling | audit + Dependabot |

## Security review

A maintainer security review of this threat model and trust boundary was recorded
in [SECURITY-REVIEW.md](SECURITY-REVIEW.md) (2026-08).
