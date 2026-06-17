# Design decisions

The "why" behind FORGE, written as generalizable rules you could apply to any durable agentic pipeline. Each rule is a constraint that paid for itself by *removing* code or failure modes.

## 1. Workflows are deterministic; all I/O lives in activities

Workflow code is replayed against its event history to recover after a crash, so it must be deterministic — no `Date.now()`, no `Math.random()`, no file or network I/O, no direct `console.log`. Every side effect (DB access, LLM call, adapter call, file write) goes in an activity. This is what makes the pipeline crash-safe: kill the host mid-build and the workflow resumes from its last checkpoint, replaying the deterministic logic and re-issuing only the activities that hadn't completed.

**Rule:** if a line of orchestration logic touches the outside world, it belongs in an activity, not a workflow.

## 2. Don't rebuild what the orchestrator already gives you

Temporal provides state persistence, retry-with-backoff, durable timers, signal-based human approval, queryable workflow state, and Continue-As-New. FORGE therefore builds **none** of: an event ledger, an outbox worker, a state machine, a scheduler, an approval table, or a dead-letter queue. Each of those was a custom subsystem in an earlier non-Temporal design; each is now one Temporal primitive.

**Rule:** before writing infrastructure, check whether the orchestrator already provides it. If you're building a retry loop, a timer table, or a queue, stop.

## 3. Creative work → capable model; analytical work → cheap model

There is exactly one LLM-routing rule. Creative tasks (writing copy, designing/building a site, drafting outreach) go to a capable model via the `claude` CLI at a flat subscription cost. Analytical tasks (research synthesis, scoring against a rubric, QA) go to a cheap JSON-mode model. Mixing them is the failure mode: routing everything to the capable model creates a sequential bottleneck and burns the subscription's effective throughput; routing everything to the cheap model tanks creative quality.

**Rule:** classify each LLM call as creative or analytical at design time, and route by class, not by convenience.

## 4. Postgres is the source of truth for business data; Temporal owns workflow state

Business data that outlives any single workflow — prospect rows, artifacts, learnings — lives in Postgres. "Where is this workflow and what step is it on" lives in Temporal. Neither is duplicated into the other. An earlier design that tried to keep workflow state in the database needed custom state machines and event tables; moving that responsibility to Temporal collapsed the schema dramatically.

**Rule:** durable *business* facts in your database; durable *execution* state in your orchestrator. Don't mirror one into the other.

## 5. Per-prospect persistent agent workspaces, separate from templates

Each creative agent is a **template** directory (its `CLAUDE.md`, `SKILL.md`, references) that is copied into a **per-prospect workspace** at run time. The agent runs in the workspace, reading inputs and writing outputs as files; the workspace persists for auditing. Two payoffs: (a) editing a template improves every *future* build without retroactively altering in-progress or past ones, and (b) when a build looks wrong you can open its workspace and see exactly what the agent was given and produced.

**Rule:** separate the thing you edit (template) from the thing the agent runs in (workspace), and keep workspaces around for forensics. Everything durable still lives in the database, so workspaces are disposable.

## 6. Human approval via signal + timeout, not polling

The build-to-deploy gate is a Temporal signal handler plus a `condition()` with a mandatory timeout (14 days). The operator approves from a dashboard; if they never do, the timer fires and the prospect is archived. No polling loop, no approval table, no cron job chasing stale rows.

**Rule:** model human-in-the-loop waits as durable signals with a bounded `condition()` timeout. A `condition()` without a timeout waits forever — always bound it.

## 7. Classify every error as retryable or non-retryable

Activities throw `ApplicationFailure.nonRetryable(...)` for deterministic failures a retry can't fix (missing input, missing row, empty/invalid LLM output) and let transient failures (timeouts, rate limits, CLI crashes) retry by default. This keeps Temporal from hammering a permanently-broken activity and from giving up on a flaky one.

**Rule:** decide, per failure, whether *trying again unchanged* could succeed. If not, mark it non-retryable.

## 8. Idempotent writes survive retries

Because activities can run more than once (that's the point of retries), their writes are idempotent. Artifacts are content-hash-addressed with `ON CONFLICT (content_hash) DO UPDATE`, so a retried build doesn't create duplicate rows. Status updates are plain idempotent mutations.

**Rule:** assume every activity can execute twice. Make its writes safe under that assumption.

## 9. Stub the edges; keep the core real

Every external integration sits behind a one-method interface with a deterministic stub. The orchestration core (Temporal, Postgres, the LLM runners, the workspace pattern) is fully real and runs without credentials. Going live is "implement one interface, swap one export." This keeps the architecture legible as a reference and makes the cost of wiring each service explicit and isolated.

**Rule:** put each third-party dependency behind a narrow interface with a working fake. The system should compile and run end-to-end with every edge stubbed.

## 10. One process, folders not microservices

The entire pipeline is one TypeScript project with one worker process. Each stage is a folder of activities. There is no inter-service network layer. For a single-operator pipeline this gives all the organizational benefit of services with none of the deployment, network-hop, or debugging overhead.

**Rule:** don't reach for microservices until something actually forces a process boundary. Folders and a single worker scale a long way.

## 11. Take automation out when it stops earning its place

An earlier version of OUTFIT scored each built site with an automated numeric QA
gate and looped on it: if the score missed a threshold, the site went back for an
automated revision and was rescored. In practice that loop churned. It produced
repeated revisions that homogenized output toward a safe average without reliably
improving what actually mattered, and it added latency and cost for little gain.
So the gate was removed. What replaced it is single-pass generation from a strong
brief, the technical and visual audits kept as informational, non-gating second
opinions, and exactly one real gate: a human approval signal. The audits inform
the operator; they never block a build.

**Rule:** measure whether an automated quality step actually improves the outcome
it gates. If it does not, delete it and move the judgment to a human or to a
cheaper informational check. Knowing when to remove an automated step is as much
a part of the design as knowing when to add one.
