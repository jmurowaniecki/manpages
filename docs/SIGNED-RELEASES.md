# Verifying releases

## Marketplace packages

Widespread installs come from the [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=CompilouIT.manpage) as publisher **CompilouIT**, extension id **manpage** (`CompilouIT.manpage`). Prefer installing from that listing or:

```text
ext install CompilouIT.manpage
```

VS Code/Marketplace transport uses HTTPS. Publisher identity is whatever Microsoft’s Marketplace shows for CompilouIT; treat sideloaded VSIX files from unknown sources as untrusted.

## Git tags

Release versions are tagged in git as `vMAJOR.MINOR.PATCH` (see [CHANGELOG.md](../CHANGELOG.md)). Maintainers SHOULD sign important tags with GPG/SSH (`git tag -s`) when keys are available:

```sh
git tag -v v0.1.3
```

Public signing keys for tag verification will be linked here when maintainers publish them. Until then, prefer Marketplace installs over ad-hoc VSIX files.

Publish automation uses a GitHub Actions secret (`VSCE_PAT`) that is **not** stored on the Marketplace download path; the private publish credential is separate from what users download.
