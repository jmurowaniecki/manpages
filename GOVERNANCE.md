# Governance

This document describes how **manpage** makes decisions, who holds which roles,
and how the project can continue if a maintainer is unavailable.

## Decision making

- Day-to-day changes land via **pull requests** to `main`.
- The **Maintainer** reviews and merges PRs, triages issues, and publishes releases.
- Disagreements are resolved by discussion on the PR or issue. If consensus is
  not reached, the Maintainer decides.
- Security issues follow [SECURITY.md](SECURITY.md) and are not debated in public
  until a fix or advisory is ready.

## Roles and responsibilities

| Role | Who | Responsibilities |
|------|-----|------------------|
| Maintainer | [John Murowaniecki](https://github.com/jmurowaniecki) | Merge PRs; respond to issues; cut releases; publish to the VS Marketplace; manage GitHub settings and secrets (`VSCE_PAT`); enforce the Code of Conduct |
| Contributor | Anyone with merged non-trivial changes | Propose changes via PRs; follow [CONTRIBUTING.md](CONTRIBUTING.md); sign off commits (DCO) |

Additional Maintainers may be appointed by an existing Maintainer through a
public issue or PR updating this document.

## Access continuity

To keep the project operable if the primary Maintainer is unavailable:

1. **Repository:** GitHub organization/user settings should grant at least one
   other trusted person admin (or maintain) rights when a second maintainer
   joins, so issues can be closed and PRs merged within a week.
2. **Marketplace publishing:** The `VSCE_PAT` (or successor) secret and publisher
   access must be transferable to a successor Maintainer. Until a second
   Maintainer is appointed, the primary Maintainer keeps recovery instructions
   for publisher credentials in a personal emergency plan (password manager
   emergency access / documented handoff).
3. **DNS / external accounts:** Not used by this project beyond GitHub and the
   Visual Studio Marketplace.

**Current limitation:** the project has a single Maintainer (bus factor 1).
Recruiting a second Maintainer is an explicit goal on the [roadmap](docs/ROADMAP.md).
The Silver `bus_factor` criterion remains unmet until that happens.

## Two-factor authentication

Maintainers with permission to push to `main`, manage secrets, or access private
vulnerability reports MUST enable GitHub 2FA, preferably with a TOTP or hardware
key (not SMS-only). Repository administrators SHOULD require 2FA for sensitive
roles in GitHub settings when the hosting account supports it.
