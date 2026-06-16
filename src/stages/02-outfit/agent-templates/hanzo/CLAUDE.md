# CLAUDE.md

This folder is a self-contained web design agent. When you are invoked inside this directory, you are building a premium, production-ready website from a single client prompt.

## Start here

1. Read `SKILL.md` for the agent's role, deliverables, boldness checklist, anti-slop rules, and premium visual standards. This is the authoritative spec.
2. Read `process.md` for the six-step build flow. Follow it in order. Do not skip steps.
3. Read `references/lessons.md` before you plan. It is short and every rule is there because a past build failed without it.

Your inputs are two files: `design-brief.md` (the copywriter's creative orientation) and `copy-package.md` (a tagged content package, NOT a pre-sectioned document). The content package uses `{topic: <type>, ...}` tags to label content; topic tags are not section headers. Deciding which content becomes a section on the page is your job in step 2, not the copywriter's. See `process.md` step 1 for how to parse the content package.

The other files in this folder are loaded on demand as the process calls for them:

- `template-library.json` at step 1 (Interpret) for picking a reference template. (NOTE: the screenshot library this manifest points at is NOT bundled in this public template. The textual picking workflow is preserved so you can adapt it to your own reference set.)
- `references/visual-system.md` at step 2 (Plan) and step 4 (Execute) — includes service-card playbook, dark-band texture, stats, glass, and corner-accent rules
- `references/typography.md` at step 2 (Plan) and step 4 (Execute) — hero headline, line-break, eyebrow, and CTA rules
- `references/shapes.md` and `references/textures.md` at step 4 when you need decoration
- `references/seo.md` at step 3 (Scaffold) and step 6 (Ship)
- `references/schema-examples.md` at step 3 when building the JSON-LD block
- `references/wordmark.md` at step 4 when building the nav — the two-line wordmark rule for prospects without a real logo

## What you deliver

A single folder containing `index.html` (complete site, all inline), optional `assets/`, and `build-notes.md` explaining the creative decisions. No build tooling, no frameworks, no `package.json`. If the client cannot open `index.html` in a browser and see the whole site working, you have not finished.

## Hard rules

- **Every site has a top nav bar** with anchor links to the major sections. Sticky, mobile hamburger under 768px, smooth scroll.
- **Brand lockup is a logo OR a two-line wordmark. Never both, never neither, never an invented mark.** Check `dossier.logo_url`: if present, use the image; if null, render the two-line typographic wordmark (business name + CITY, STATE) per `references/wordmark.md`. No inline SVG badges, monogram letters, emojis, or geometric primitives to fill the logo slot. That was the old failure mode.
- **Every site has an inquiry form** at the bottom with exactly these fields: Name, Phone, Email, Service address, "Anything else we should know?". The form ships WIRED to a live endpoint: `action="https://example.com/api/inquiry"` `method="POST"`, a hidden `<input type="hidden" name="site" value="__SITE_SLUG__">` (literal token, the build activity replaces it), a `company_website` honeypot (real hidden text input), exact field `name` attributes, and a tiny inline submit script. No `action="#"`, no "wire it later" note. See `SKILL.md` for the full spec. (Replace the endpoint with your own form handler.)
- **Pick a reference template at step 1.** Read `template-library.json`, shortlist 3-to-5 candidates by vibe tags, view the screenshots at `templates/<id>.png`, pick one and commit. Skip only if the client provided their own screenshot reference. The template anchors visual language, it is not a layout to copy 1:1. (The screenshot library is not bundled in this public template; supply your own.)
- **The template's `hero_strategy` is a contract.** It must agree with the design brief's Section 6. The only two live strategies are `split-type-with-photo` and `full-bleed-photographic`. If they disagree, the brief wins and you swap to a template whose `hero_strategy` matches. Do not default to `split-type-with-photo`. Historical failure mode: picking a full-bleed-photographic template then building a split hero anyway. Explicitly reject that reflex.
- **Stock photos live at `stock-photos`.** Run `ls stock-photos` at step 3 to see what's available. Copy used photos into the project's `assets/` folder. Never ship a mismatched image, use a labeled placeholder instead. (The stock-photo library is not bundled in this public template; supply your own.)
- **Mandatory photography floor: 2 real photos per site, minimum.** Every shipped site contains at least 2 real photographs drawn from `stock-photos/{vertical}/` or from the prospect's `enhanced-images.json`. Both hero strategies (`split-type-with-photo`, `full-bleed-photographic`) involve hero photography by default; if for some reason the hero ships without a photo, the 2-photo floor must be met elsewhere (about, services, gallery, mid-CTA band). Placeholders (`IMAGE NEEDED:` divs) do NOT count toward the floor. This is a ship gate. If a brief's "what the site must NOT do" bans *luxury photography* or *stock handshake imagery*, it is banning photo **types**, not photography itself — do not read a full photo ban into a type ban.
- **No em dashes.** Ever. Use commas, colons, or split the sentence. Applies to copy, build notes, and anything else you write.
- **No default Tailwind palette.** `blue-500`, `gray-200`, `indigo-600` are banned unless the brief explicitly demands them.
- **No editorial / magazine-lead aesthetic.** Cream + ink + copper + serif-lead "editorial paper" is banned as a register in this pipeline. It has been overused and is retired. Pick from cool corporate, deep canvas, saturated color field, forest, plum, oxblood, or natural earthy instead. Hero strategies are `split-type-with-photo` or `full-bleed-photographic`; no type-first or centered-type magazine leads. The example hex values in `references/visual-system.md` are illustrative for any palette, not a warm-editorial target.
- **No section eyebrows.** Banned across the entire site: the small uppercase kicker label above an H2 (or above a step card, form, stats strip, services list, FAQ block, contact band, etc.). No `eyebrow`, `section-eyebrow`, `sec-eyebrow`, `step-eyebrow`, `form-eyebrow`, `process-eyebrow`, `about-eyebrow`, `trust-eyebrow`, `service-eyebrow`, `mono-eyebrow`, `kicker`, or any variant. They make the page look templated and AI-built. Section headers carry their own weight via the H2 + accent word treatment, the deck/subhead, and (where useful) a small numeric or icon mark inline with the H2 itself, not as a separate label above it. The ONE permitted exception is the **hero trust chip row** above the H1 (city, license #, years licensed, "family-owned since YYYY" — short, factual, comma- or dot-separated credibility marks). Class it `hero-eyebrow` and hide it under 760px per `references/typography.md`. Nothing else gets an eyebrow.
- **No `rounded-lg`.** The premium corner radius is `rounded-3xl` or sharp.
- **About section is photo + overlaid Call CTA, no caption.** Every about section has a product/result-focused photo from `stock-photos/` AND a single overlaid `Call (xxx) xxx-xxxx` CTA in one of the photo's bottom corners, `tel:`-linked to the prospect's primary phone, mirroring the site's primary CTA visual language (color, type, hover, optional phone SVG). Mobile tap target 44px+. NO caption, figcaption, stamp, badge, sticker, rotated quote card, plate, or pull-quote attached to the about photo. Captions on hero, services, gallery, or process photos remain allowed; this scope is the about section only. If the about section is text-only (rare), the Call CTA sits inline at the end of the about prose, mirroring the site's primary button style. The about photo should be product/result-focused (the work, not an owner portrait or job-site action shot).
- **Run the boldness checklist before shipping.** If any item fails, go back to step 4. The checklist is the floor, not the ceiling.
- **`build-notes.md` MUST start with `## Context Inheritance` and end with `## Fingerprint`.** The inheritance section traces every load-bearing decision to its source; the fingerprint is machine-readable and parsed by a convergence monitor. Exact format in `process.md` Step 6. Both are contracts with operator tooling, not optional prose.

## How to invoke

The client's prompt is the entire brief. Interpret it in step 1, fill sensible defaults for anything unspecified, and flag those defaults in `build-notes.md` so the client knows what to push back on. Only ask clarifying questions when something critical is missing (business name, what they actually do, who it is for). Vibe, palette, and layout are your job to decide, not theirs.

---

*This is a sanitized reference template. Identifying details (brand, owner, prices, vertical, contacts, private form endpoint) have been removed or replaced with placeholders; the methodology is intact.*
