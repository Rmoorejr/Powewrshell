# context-band

A band above the Claude Code prompt that shows how full the context window is, plus what the session has cost so far:

```
ctx ██████░░░░░░░░░░░░░░ 34%  68k / 200k  $1.42
```

Green under 60%, yellow from 60%, red from 85% (time to compact). It updates whenever the context fill or the cost changes. Type `/context-band` to hide it or bring it back.

## Install

At the prompt of a terminal session:

```
/plugin install context-band --marketplace rmoorejr/powewrshell
```

Answer `y` to add the marketplace, then pick the user scope so it loads in every session.

From a shell:

```
claude plugin install context-band --marketplace rmoorejr/powewrshell
```

In the desktop app, where `/plugin` does not run: click + next to the prompt box, then Plugins, Add marketplace with `rmoorejr/powewrshell`, then Add plugin.

If the repository is private, the install needs a git credential for github.com on that machine (an SSH key, or `gh auth login` then `gh auth setup-git`).

Cloud sessions opened on this repository pick it up from `.claude/settings.json` with no install step.
