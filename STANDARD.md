# Sample app contract

This file is copied into each generated repo. The platform master copy is
`platform/sample-apps/STANDARD.md` in **local-platform-demo**.

## Runtime

- Listens on `PORT` (default `8080`)
- `GET /healthz` → `200` with `"ok"`
- `GET /version` → `{"version":"...","service":"sample-node"}`
- Non-root container user

## Delivery

- Stable Harness deploy: **tag `v*` only** (`harness/pipeline-deploy-tag.yaml`)
- PR preview + teardown pipelines for ephemeral namespaces
- release-please on `main` creates the tag; **do not** deploy from bare `main` pushes
- Branch protection: PR + required checks; no force-push

## Forbidden

- Secrets in git
- Moving/deleting published `v*` tags
- Using `latest` as the stable production tag
