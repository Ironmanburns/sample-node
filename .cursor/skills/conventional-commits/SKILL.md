---
name: conventional-commits
description: Write Conventional Commit PR titles and messages for sample apps.
---

# Conventional Commits

Use these types: `feat`, `fix`, `docs`, `chore`, `refactor`, `test`, `ci`, `build`.

- Patch: `fix:`
- Minor: `feat:`
- Major: `feat!:` or body/footer `BREAKING CHANGE:`

When squash-merging, the **PR title** is what release-please reads. Keep it clean:

```text
feat: expose build sha on /version
```

Do not put issue noise or WIP in the final merge title.
