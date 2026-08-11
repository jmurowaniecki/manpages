# Quick start

Get highlighting for a man page in under a minute.

## Install

In VS Code Quick Open (`Ctrl+P` / `Cmd+P`):

```text
ext install CompilouIT.manpage
```

## Try it

1. Create a file named `hello.1` (or open an existing man source).
2. Paste:

```roff
.TH HELLO 1 "2026-08-11" "1.0" "Hello Manual"
.SH NAME
hello \- example page
.SH SYNOPSIS
.B hello
.I [options]
.SH DESCRIPTION
A short example for the manpage extension.
```

3. Confirm the status bar language mode is **manpage**.
4. Titles, section headers, and macros should be highlighted by your theme.

## Next steps

- Author real pages using standard roff/man macros.
- See [INTERFACE.md](INTERFACE.md) for scopes and file associations.
- See the root [README.md](../README.md) for development setup and contribution links.
