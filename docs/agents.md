# Agents

FORGE has three creative agents — **HATTORI**, **HANZO**, and **BARD**. All three run on the capable model via `runClaudeMax()` and all three follow the same template-vs-workspace pattern.

## The template-vs-workspace pattern

Each agent exists in two forms:

- **A template** — a directory checked into the repo containing the agent's `CLAUDE.md` (instructions), `SKILL.md` (procedure), and `references/`. **This is what you edit to improve the agent.** Changes apply to all *future* builds.
- **A per-prospect workspace** — at run time, `copyTemplate()` (`src/shared/lib/workspace.ts`) recursively copies the template into `data/workspaces/<slug>/<agent>/`. The activity writes the prospect-specific inputs into the workspace, calls `runClaudeMax({ workspacePath, prompt })`, then reads the output files back and stores them as artifacts.

```
data/workspaces/<slug>/
  shared/      # dossier, scoring, enhanced images — readable by all agents
  hattori/     # copy of the HATTORI template + its output/
  hanzo/       # copy of the HANZO template + its output/
  bard/        # copy of the BARD template + its output/
```

Why split them:

- **Editing a template is forward-only.** Improving the copywriter improves every future prospect; already-built workspaces keep their snapshot, so a template change never corrupts in-progress work.
- **Workspaces are forensic.** If a build looks wrong, open its workspace and see exactly what the agent was given and what it produced.
- **Workspaces are disposable.** Everything durable lives in Postgres (artifacts, status). A workspace can be deleted without losing pipeline records; it persists by default only for auditing.

The runner (`runClaudeMax`) spawns the `claude` CLI in the workspace directory, heartbeats every 30 seconds so a long session isn't mistaken for a crash, and strips `ANTHROPIC_API_KEY` from the child env so the CLI uses subscription auth.

## HATTORI — copywriter

| | |
|---|---|
| **Stage** | OUTFIT |
| **Input** | the `dossier` and `scoring` from FIND |
| **Output** | a **copy package** (labeled content blocks) and a **design brief** (the builder's creative prompt) |
| **Artifacts** | `copy_package`, `design_brief` |
| **LLM** | creative → capable model via `runClaudeMax()` |

HATTORI is a copywriter and creative director. It produces a bag of labeled content plus a brief; it does **not** pre-structure the page or emit JSON. Section structure is the builder's decision.

## HANZO — builder

| | |
|---|---|
| **Stage** | OUTFIT |
| **Input** | the design brief, the copy package, the reference-template library, enhanced images |
| **Output** | a complete `index.html` written from scratch, plus `build-notes.md` |
| **Artifacts** | `built_site`, `build_notes` |
| **LLM** | creative → capable model via `runClaudeMax()` |

HANZO is a builder, not a stylist. It picks one reference template for visual language, then writes the entire site in raw HTML/CSS — all sections, motion, every word baked in, no build step. The reference anchors the look; the brief sets direction; everything else is the agent's call. There is no assembler upstream and no automated re-build loop.

## BARD — outreach

| | |
|---|---|
| **Stage** | REACH |
| **Input** | the `dossier`, the staged site, the high-value copy blocks from OUTFIT |
| **Output** | personalized outreach drafts (multiple variants + a short brief) |
| **Artifacts** | `outreach_drafts` |
| **LLM** | creative → capable model via `runClaudeMax()` |

BARD drafts the outreach the operator reviews and sends. Because outreach is the sales pitch, it must read as personal rather than templated — hence a creative-model agent rather than a string template.
