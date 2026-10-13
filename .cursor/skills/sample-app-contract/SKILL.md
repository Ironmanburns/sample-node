---
name: sample-app-contract
description: Keep /healthz, /version, Dockerfile, Helm, and tag-only Harness intact.
---

# Sample app contract

Before finishing a change, verify:

- `GET /healthz` still returns ok
- `GET /version` still returns JSON with `version` and `service`
- Dockerfile still multi-stage / non-root
- Helm probes still hit `/healthz`
- `harness/pipeline-deploy-tag.yaml` still documents/triggers on **tags only**
- No credentials added to the tree

If you change the listen port, update Deployment containerPort, Service, and probes together.
