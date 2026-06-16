# Contributing

Thanks for your interest in FORGE. A few things up front, then the workflow.

## This is a reference, not a turnkey app

FORGE is a sanitized architecture reference. The orchestration core (Temporal, Postgres, the LLM runners, the agent/workspace pattern) is real, but every external integration is behind a **stub adapter**. **Do not expect end-to-end runs** — building a real site, sending real outreach, or taking real payment — without first wiring real adapters in `src/shared/adapters/`. Bug reports and PRs that assume a fully wired system may be closed with a pointer back here.

## Before you start

- File an **issue** first for anything beyond a trivial fix, so we can agree on direction before you write code. Use the issue templates.
- Read [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) and [`docs/DESIGN-DECISIONS.md`](docs/DESIGN-DECISIONS.md). The design rules are intentional; PRs that violate them (e.g. doing I/O in workflow code, or rebuilding something Temporal already provides) won't merge.

## Workflow

1. Fork and create a branch. Use a descriptive prefix: `feat/…`, `fix/…`, `docs/…`, `chore/…`, `refactor/…`.
2. Make your change. Keep workflows deterministic and all I/O in activities (see the design rules).
3. Run the typecheck:
   ```bash
   npm run typecheck
   ```
4. Open a PR against `main`. Fill out the PR template, link the issue, and describe what you changed and why.
5. **CI must be green** before review. CI runs `npm ci` and `npm run typecheck`.

## Code style

- Strict TypeScript. No `any` you can avoid.
- Activities log via `@temporalio/activity`'s `log`, never `console.log`. Workflows are deterministic — no `Date.now()`, `Math.random()`, or I/O.
- New external dependencies go behind an adapter interface in `src/shared/adapters/`, with a stub, never inline in an activity.

## Reporting security issues

Do **not** open a public issue for a vulnerability. See [`SECURITY.md`](SECURITY.md).
