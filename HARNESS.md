# Harness wiring (sample-node pilot)

Stable deploy is **tag-only** (`v*`). Do not add a push-to-`main` trigger.

## Prerequisites

- Org `default` / project `default_project` (or your samples project)
- K8s connector `local_kind_k8s`, delegate selector `local-kind`
- Docker connectors: `local_zot` (if used), `dockerhub_public`
- GitHub connector **`github_sample_node`** with API access to `Ironmanburns/sample-node`
- Namespace `harness-ci` on kind; Zot reachable as in local-platform-demo
- CD: service `sample_node`, env `local_kind`, infra `kind_infra_samples` (ns `samples`)

## Pipelines (Git Experience)

| File | Identifier | Trigger |
|------|------------|---------|
| `harness/pipeline-deploy-tag.yaml` | `Deploy_sample_node_Tag` | Tag push `v*` only |
| `harness/pipeline-pr-preview.yaml` | `PR_Preview_sample_node` | PR open/sync |
| `harness/pipeline-pr-teardown.yaml` | `PR_Teardown_sample_node` | PR close |

Import YAML via Harness Git Experience pointing at this repo, then create the
tag trigger with pattern `v*` (or `refs/tags/v*`). Confirm a push to `main`
does **not** start the stable deploy pipeline.

## Smoke test

1. Merge a conventional `feat:` PR → release-please opens a release PR.
2. Merge the release PR → annotated tag `v0.x.x`.
3. Tag pipeline builds, Trivy-gates, Helm-deploys to `samples`.
4. `curl` NodePort `30101` or `https://node-sample.burnsy.me` `/version`.
