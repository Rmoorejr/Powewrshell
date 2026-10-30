# context-band

A live band above the Claude Code prompt showing how much of the context window is used and how much is left:

```
██████░░░░░░░░░░░░░░ 34%  68.0k used · 132.0k left of 200.0k
```

Green under 60%, yellow from 60%, red from 85% (time to compact). It refreshes after every tool call, turn, compaction and at session start.

`/context-band off` hides it, `/context-band on` brings it back, and `/context-band` alone flips it.

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

### Cloud sessions

`.claude/settings.json` enables the plugin for this repo, but cloud sessions start without the prompt that installs a repo's plugins, so it never loads there on its own. Install it from the environment's setup script instead, which runs before Claude Code starts. Open the cloud environment menu in the session title bar, then Edit, and add to Setup script:

```
claude plugin marketplace add rmoorejr/powewrshell
claude plugin install context-band@powewrshell --scope user
```

New sessions on that environment get the band hooks and `/context-band`. The band itself draws above the terminal prompt, so the Claude app may not show it.
