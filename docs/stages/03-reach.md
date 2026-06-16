# Stage 3 — REACH

REACH handles outreach and payment collection. It runs as its own workflow because, unlike FIND+OUTFIT (well under an hour), it spans days or weeks — keeping it separate stops a single workflow's history from bloating with idle waiting.

## Ingests

- An `approved` prospect with a deployed preview site.
- The `dossier` (and the high-value copy blocks from OUTFIT) for personalization.

## Activities

1. **BARD — draft outreach** (creative model). Reads the dossier and the staged site and drafts personalized messages (multiple variants + a short brief). Stored as an `outreach_drafts` artifact. Status → `outreach_drafted`.
2. **Operator review + send.** The operator picks a variant and sends from the dashboard. Send goes through the `messaging` and/or `email` adapter, gated by a do-not-contact check. Status → `outreach_sent`.
3. **Await payment.** The workflow waits on a payment signal with its own timeout. Payment → hand off to GROW (status `client_active`). Timeout → archive.

## Emits

- An `outreach_drafts` artifact.
- A delivery record (idempotent: one per channel per prospect).
- Prospect `status` advanced through `outreach_drafted` → `outreach_sent` → (`client_active` | `archived`).

## Adapters & LLM

- **Adapters:** `messaging`, `email`, `payments`, `notify`. Note the `messaging` stub is intentionally a no-op — person-to-person outreach carries consent/compliance obligations (see `src/shared/adapters/README.md`).
- **LLM:** creative model via `runClaudeMax()` for BARD drafting.

## Design notes

*Human-in-the-loop on first contact.* The first impression with a potential client is too important to fully automate, so the operator reviews every message before it sends. The payment wait is modeled as a durable signal with a timeout, not a polling loop — the workflow can sit idle for weeks and resume instantly when the payment event arrives.
