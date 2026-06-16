# Stage 2 — OUTFIT

OUTFIT builds the website. It is the highest-stakes stage because site quality is what makes the offer worth paying for. Two creative agents run in sequence, then QA, then the workflow waits for human approval.

## Ingests

- The `dossier` artifact and `scoring` from FIND.
- Enhanced images from FIND.
- A library of reference templates (vibe-tagged screenshots) the builder picks from.

## Activities

1. **HATTORI — write copy** (creative model). Reads the dossier and writes a copy package (labeled content blocks) plus a design brief that serves as the builder's creative prompt. Stored as `copy_package` and `design_brief` artifacts. Status → `copy_written`.
2. **HANZO — build** (creative model). Reads the brief and copy, picks one reference template, and writes a complete `index.html` from scratch — all sections, motion, every word baked in, no build step. Stored as `built_site` and `build_notes` artifacts. Status → `site_built`.
3. **Technical audit + visual QA** (analytical model, parallel). A second set of eyes for the operator. **Informational only** — wrapped so failures are logged but never gate the workflow. Status → `qa_complete`.
4. **Approval wait.** The workflow registers an `approve` signal handler and blocks on `condition(() => approved, '14 days')`. On approval → deploy (`deploy` adapter) + record learning, status `approved`. On timeout → archive.

## Emits

- `copy_package`, `design_brief`, `built_site`, `build_notes` artifacts.
- A built `index.html` in the prospect workspace.
- Prospect `status` advanced through `copy_written` → `site_built` → `qa_complete` → (`approved` | `archived`).

## Adapters & LLM

- **Adapters:** `deploy` (only after approval); `blob`/`cdn` as needed for preview hosting and assets.
- **LLM:** creative model via `runClaudeMax()` for HATTORI and HANZO; analytical model via `gemini.ts` for QA.

## Design notes

*Copy before design.* HATTORI writes the full copy package first so HANZO knows exactly how much text it's working with and how the page should flow — no lorem-ipsum rectangles. The builder gets maximum creative freedom: the reference template anchors the visual language and the brief sets direction, but section structure and layout are the agent's call. QA is deliberately non-fatal — it informs the human reviewer rather than blocking the build. There is no automated re-build loop: if a build needs work, the operator rejects it and a fresh run is triggered.
