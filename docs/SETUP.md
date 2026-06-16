# Setup

This repo is an **architecture reference**. You can install it, typecheck it, start a Temporal worker, and trigger the demo workflow locally — but the external integrations are stubbed, so no real website is built, no real email sent, and no real charge made until you implement the adapters yourself. See [What's stubbed](#whats-stubbed-and-where-to-go-live) at the end.

## Prerequisites

- **Node 20+** (`"engines": { "node": ">=20" }`).
- **PostgreSQL** running locally (or reachable). Defaults: host `localhost`, port `5432`, db `forge`, user `forge`.
- **A local Temporal dev server.** This repo ships a script that runs `temporal server start-dev`, which requires the [Temporal CLI](https://docs.temporal.io/cli) installed.
- **The `claude` CLI** on your `PATH` — only needed if you want the creative agents (HATTORI / HANZO / BARD) to actually run. Without it, the orchestration still works; the agent activities will fail when they try to shell out.
- **A JSON-mode LLM API key** (`GEMINI_API_KEY`) — only needed if you want the analytical activities (research synthesis, scoring, QA) to actually call out.

## Install and configure

```bash
git clone <your-fork-url> forge-pipeline
cd forge-pipeline
npm install
cp .env.example .env
```

Open `.env` and fill in what you need. Most keys are only required once you wire a real adapter — Postgres and Temporal are the only ones you need for a local demo run:

```
TEMPORAL_ADDRESS=localhost:7233
TEMPORAL_NAMESPACE=default
TEMPORAL_TASK_QUEUE=forge-pipeline

POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=forge
POSTGRES_USER=forge
POSTGRES_PASSWORD=

# Analytical LLM (research synthesis, scoring, QA) — optional for a stub demo
GEMINI_API_KEY=

# Creative agents use the `claude` CLI with subscription auth, so no key here
# by default. Set ANTHROPIC_API_KEY only if you swap runClaudeMax() for a
# direct API call.
```

> Never commit a real `.env`. `.gitignore` already excludes it.

## Apply the schema

Create the database and apply the schema:

```bash
createdb forge          # or: psql -c 'CREATE DATABASE forge;'
psql forge -f docs/schema.sql
```

`docs/schema.sql` defines `prospects`, `artifacts`, `agent_learnings`, and the supporting tables the pipeline reads and writes.

Then seed one placeholder prospect so the demo workflow has something to run against:

```bash
psql forge -f docs/seed-demo.sql   # inserts prospect id 1 ("Example Service Co")
```

## Run it

You need three things running: Temporal, the worker, and a trigger.

**1. Start the local Temporal dev server** (in its own terminal):

```bash
npm run temporal
```

This runs `temporal server start-dev`. The Temporal Web UI comes up at `http://localhost:8233` and the gRPC endpoint at `localhost:7233`.

**2. Start the worker** (in a second terminal):

```bash
npm run worker
```

The worker hosts the workflow code and registers every activity on the `forge-pipeline` task queue. Leave it running.

> **No `claude` CLI installed?** Start the worker with `FORGE_STUB_AGENTS=1 npm run worker`. The creative agents (HATTORI / HANZO / BARD) then write placeholder output files instead of shelling out to the CLI, so the full FIND → OUTFIT flow runs end to end on stubs alone.

**3. Trigger the demo workflow** (in a third terminal):

```bash
npm run start
```

This runs `src/client.ts`, which starts a workflow (e.g. `forgeFindOutfit`). Watch the worker terminal and the Temporal UI to follow the event timeline. Because the adapters are stubbed, you'll see `[stub:…] returning fake data` warnings in the worker logs where a real external call would have happened.

## Typecheck

```bash
npm run typecheck   # tsc --noEmit
```

The whole repo is strict TypeScript and is expected to typecheck cleanly. CI runs this on every PR.

## What's stubbed, and where to go live

Every outward-facing integration is behind an interface in `src/shared/adapters/index.ts`, with a stub in `src/shared/adapters/stubs.ts`:

| Adapter | Production examples |
|---|---|
| `scraper` | Apify, Google Places, Yelp |
| `research` | Perplexity, Tavily, web search |
| `email` | Resend, Postmark, SES |
| `payments` | Stripe Checkout |
| `cdn` | Cloudinary, imgix |
| `blob` | Vercel Blob, S3 |
| `notify` | Slack / Discord webhook |
| `messaging` | SMS / iMessage (compliance-gated — stub is a no-op) |
| `deploy` | Vercel, Netlify, Cloudflare |

To go live with one service:

1. Implement its interface against a real provider.
2. Re-point that one export in `src/shared/adapters/index.ts`.

Activities only import from `index.ts`, so nothing else in the pipeline changes. Read [`src/shared/adapters/README.md`](../src/shared/adapters/README.md) for details, including the compliance note on `messaging`.
