---
name: pr-workflow
description: Open PRs from feature branches; never push or merge to main as Hermes.
---

# PR workflow

1. Branch from up-to-date `main`: `feat/...` or `fix/...`.
2. Push the branch with the Hermes GitHub App installation token.
3. Open a PR; fill the PR template checklist.
4. Wait for required checks (`ci`, commitlint, Harness).
5. **Do not merge** unless the human/Copilot approval policy explicitly allows it.
6. After merge, release-please may open a release PR; merging that creates `v*`.
7. Harness stable deploy runs **only** on the tag — not on the merge commit alone.
