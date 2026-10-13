# Harness wiring (sample-node pilot)

Stable deploy is **tag-only** (`v*`). Release tagging runs on push to `main`.

## Prerequisites

- Org `default` / project `default_project` (or your samples project)
- K8s connector `local_kind_k8s`, delegate selector `local-kind`
- Docker connectors: `local_zot` (if used), `dockerhub_public`
- GitHub connector **`github_sample_apps`** with API access to `Ironmanburns/sample-node`
- Namespace `harness-ci` on kind; Zot reachable as in local-platform-demo
- CD: service `sample_node`, env `local_kind`, infra `kind_infra_samples` (ns `samples`)
- Secret `github_release_token` for the release pipeline (PAT or GitHub App installation token)

## Pipelines (Git Experience)

| File | Identifier | Trigger |
|------|------------|---------|
| `harness/pipeline-release-main.yaml` | `Release_sample_node_Main` | Push to branch `main` |
| `harness/pipeline-deploy-tag.yaml` | `Deploy_sample_node_Tag` | Tag push `v*` only |
| `harness/pipeline-pr-preview.yaml` | `PR_Preview_sample_node` | PR open/sync |
| `harness/pipeline-pr-teardown.yaml` | `PR_Teardown_sample_node` | PR close |

Import YAML via Harness Git Experience pointing at this repo. Confirm:

- Push to `main` starts **Release** (creates `v*`), not stable deploy
- Tag `v*` starts **Deploy**
- Bare `main` push does **not** start the stable deploy pipeline

## Smoke test

1. Merge a conventional `feat:` / `fix:` PR to `main`.
2. Release pipeline runs `scripts/harness-semver-release.sh` → annotated tag `v0.x.x`.
3. Tag pipeline builds, Trivy-gates, Helm-deploys to `samples`.
4. `curl` NodePort `30101` or `https://node-sample.burnsy.me` `/version`.
