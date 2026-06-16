# Stage 1 — FIND

FIND is the discovery and research engine. It takes a prospect from the pool and produces a normalized dossier and a 6-dimension score that everything downstream reads.

## Ingests

- A `prospect` row (id, business name, vertical, city, website URL if any) from Postgres. The prospect pool is ordered by tier so the best opportunities are processed first.

## Activities

1. **Deep research** — pulls business data and credibility signals through the `scraper` and `research` adapters (multiple sources, cross-referenced). Writes the raw payload to `prospect.research_data`.
2. **Enhance images** — runs found photos through the `cdn` adapter (upload + transform). Runs in parallel with synthesis; the two don't depend on each other.
3. **Synthesize research** — analytical LLM call (`gemini.ts`). Structures the raw data and computes the **six scoring dimensions** (0–10 each), including the reversed `website_quality` (no site = 10).
4. **Compile dossier** — analytical LLM call. Normalizes everything into the single dossier document all downstream agents read; stored as a `dossier` artifact. Status → `dossier_compiled`.
5. **Disqualification check** — filters out do-not-contact, permanently-closed, and existing-client prospects before any expensive creative work begins.

## Emits

- A `dossier` artifact in the `artifacts` table.
- The 6-dimension `scoring` JSONB and `tier` on the prospect row.
- Prospect `status` advanced to `dossier_compiled` (or `disqualified`).

## Adapters & LLM

- **Adapters:** `scraper`, `research`, `cdn`.
- **LLM:** analytical only (research synthesis, scoring, dossier compilation) → cheap JSON-mode model via `gemini.ts`. No creative model in this stage.

## Design notes

*Gather everything, then synthesize.* FIND pulls from several sources and cross-references rather than trusting a single call. Independent steps (image enhancement, research synthesis) run in parallel for speed. The disqualification check runs *before* OUTFIT so creative effort is never spent on a prospect that can't be contacted or shouldn't be.
