---
name: commit
description: Stage all changes and create a git commit with an auto-generated message
disable-model-invocation: true
allowed-tools: Bash, Read, Glob, Grep
---

Stage all changes and commit with a well-crafted message.

1. Run `git status` to see all changes
2. Run `git diff HEAD` to review what changed
3. Run `git log --oneline -5` to match the existing commit message style
4. Stage all changes with `git add .`
5. Analyze the diff and write a concise commit message in imperative mood (e.g. "Add feature", "Fix bug")
6. Commit with the message, appending `Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>`
7. Verify the commit succeeded with `git status`

Do NOT push to remote unless explicitly asked.
