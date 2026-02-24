# erode playground

Demo project for [erode](https://github.com/erode-app/core) — a tool that detects architecture erosion in PRs by comparing code changes against a LikeC4 architecture model.

## Architecture

```
frontend → api-gateway → user-service    → database
                       → product-service  → database
```

- **frontend** — Express server serving pages, fetches from api-gateway via HTTP
- **api-gateway** — Express server proxying to user-service and product-service via HTTP
- **user-service** — Express server managing users, imports database directly
- **product-service** — Express server managing products, imports database directly
- **database** — In-memory Map store (library, no server)

## Setup

```bash
npm install
npm run build
```

## Verifying with erode CLI

Test that the model is set up correctly before opening a PR:

```bash
# Parse and validate the LikeC4 model
npx likec4 export json -o /tmp/model.json likec4/

# List all components erode finds in the model
npx erode components /tmp/model.json

# Dry-run drift analysis on the current branch
npx erode analyze --model /tmp/model.json --diff "$(git diff main)"
```

## Architecture drift examples

These are the kinds of violations erode should catch:

- `frontend` adds `fetch("http://user-service:3001/users")` — bypasses api-gateway
- `api-gateway` adds `import { findAll } from "@playground/database"` — bypasses services
- `product-service` adds `fetch("http://user-service:3001/users")` — no relationship in model
