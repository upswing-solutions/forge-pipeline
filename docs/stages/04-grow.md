# Stage 4 — GROW

GROW handles everything after a business becomes a paying client. It starts when payment is confirmed and runs indefinitely.

## Ingests

- A `client_active` prospect (payment confirmed in REACH).

## Activities

1. **Onboard.** Promote the preview to a live site (`deploy` adapter), send a welcome sequence (`email` adapter), and complete initial setup.
2. **Monthly value loop.** Generate a periodic report, run health/quality checks, and surface proactive suggestions — the recurring touchpoint that justifies an ongoing subscription.
3. **Reset monthly.** The workflow uses Temporal's **Continue-As-New** to start a fresh execution each cycle, so its event history never grows unbounded.

## Emits

- A live, deployed site.
- Periodic client artifacts/reports.
- An ongoing `client_active` lifecycle (until churn/sunset).

## Adapters & LLM

- **Adapters:** `deploy`, `email`, `notify`.
- **LLM:** light analytical use for reporting; a future client-success agent (creative) is out of scope in this reference.

## Design notes

*Recurring value, not a one-time build.* A site that goes live and then goes silent invites cancellation. The monthly loop creates a deliberate, recurring touchpoint. **Continue-As-New** is the key Temporal pattern here: an indefinitely-running workflow would otherwise accumulate unbounded history, so GROW periodically "reincarnates" itself with a clean slate while preserving the durable client record in Postgres.
