# sample-node

Public **node** sample Docker app for the local platform fleet.

- Contract: [STANDARD.md](./STANDARD.md)
- Agents: [AGENTS.md](./AGENTS.md)
- Harness: [HARNESS.md](./HARNESS.md)
- Release: Harness on `main` → `v*` (`harness/pipeline-release-main.yaml` + `scripts/harness-semver-release.sh`)
- Stable deploy: **git tag `v*` only** (Harness `harness/pipeline-deploy-tag.yaml`)
- PR previews: `harness/pipeline-pr-preview.yaml` / teardown on close

## Local run

See language-specific notes below (filled by template). Default listen port `8080`.

```bash
docker build -t sample-node:dev .
docker run --rm -p 8080:8080 sample-node:dev
curl -s localhost:8080/healthz
curl -s localhost:8080/version
```

## Versioning

Conventional Commits on PR titles → merge to `main` → Harness release pipeline
computes the next semver, bumps `package.json` when applicable, pushes an annotated
`vX.Y.Z` tag (and optional GitHub Release) → deploy pipeline runs on that tag.
Merging to `main` alone does **not** ship to the stable environment.

## URLs (kind)

- Stable: `https://node-sample.burnsy.me` (NodePort `30101`)
- Preview: `https://sample-node-pr-<n>.burnsy.me` (when wired)
