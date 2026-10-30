# context-band

A live band above the Claude Code prompt showing how much of the context window is used and how much is left:

```
██████░░░░░░░░░░░░░░ 34%  68.0k used · 132.0k left of 200.0k
```

Green under 60%, yellow from 60%, red from 85% (time to compact). It refreshes after every tool call, turn, compaction and at session start.

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
