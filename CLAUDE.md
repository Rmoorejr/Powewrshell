# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Status

This repository is newly initialized and contains no source code yet. The name "Powewrshell" suggests a PowerShell scripting project. As the codebase grows, this file should be updated to reflect actual build commands, test workflows, and architectural conventions.

## Getting Started

Once files are added, update this document with:

- **Build/lint commands** – e.g., how to run PSScriptAnalyzer or any CI checks
- **Test commands** – e.g., how to run Pester tests and how to run a single test file
- **Architecture overview** – module layout, shared utilities, naming conventions

## Plugins

- `context-band/` is a Claude Code mod (hooks module in `hooks/register.tsx`) listed in `.claude-plugin/marketplace.json`. Validate with `claude plugin validate context-band`.
- `.claude/settings.json` enables it for sessions opened on this repo.
