# Wordmark Rule (Nav + Footer)

When the prospect has a real logo, use it. When they don't, render a typographic wordmark. **Never invent an SVG badge, monogram letter, emoji, or geometric primitive to fill the logo slot.** That was the old failure mode (random hexagons, glyphs, letter-in-a-circle stamps). It reads as AI slop and the owner notices.

## Decision

Read `../shared/dossier.json` at step 4 when you build the nav. Check the `logo_url` field:

- **`logo_url` is a string (URL):** use the image. Constrain height to ~32-40px in the nav. No text beside it unless the logo itself is mark-only (no wordmark baked in).
- **`logo_url` is `null`:** render the two-line typographic wordmark described below. This is the case for most prospects.

## Two-line wordmark pattern

```
[Business Name]      ← display face, title case, weight 600-700
CITY, STATE          ← mono/caps, tracked 0.1-0.2em, ~60% opacity, ~11-12px
```

Line 1 is the business name (`dossier.business_name`) set in the site's **display typeface**, not the body font. Match the typographic posture of the chosen template: condensed slab for industrial, serif caps for premium, wide grotesque for tech-confident. Title case unless the template clearly calls for ALL CAPS on the brand line.

Line 2 is `"{CITY}, {STATE}"` from `dossier.city` + `dossier.state`. ALL CAPS, letter-spacing around 0.12em, smaller (11-12px), muted (usually ~60% opacity of the nav text color, or a distinct mono/small-caps font). It anchors the brand in local identity, which reinforces the "local business in [town]" pitch. This is factual information, not placeholder text.

## Edge cases

- **Long business names** ("Example Plumbing, Heating, and Drain Services"): shorten sensibly on line 1 ("Example Plumbing"). The full legal name lives in the footer and schema.
- **No clear city** (multi-city service area with no HQ): replace line 2 with a short factual caps tagline like `"LICENSED AND INSURED"` or `"ESTABLISHED 2018"`. Do not fabricate a city.
- **No `logo_url` AND no city:** ship a single-line wordmark. No line 2.
- **Footer:** the same rule applies. If the nav uses a wordmark, the footer uses the same wordmark (possibly larger or with additional tagline lines). Consistency matters more than variation here.

## Why this pattern

Typography-only wordmarks are legitimate design (many of the world's best-known brands use a wordmark, not a symbol). A wordmark set with intent in the right typeface at the right weight reads as a brand. A generic icon SVG reads as "agency filled the slot with a cliche." When the owner signs up, their real logo replaces the wordmark, and the conversation is "we designed around your brand identity" not "we invented a placeholder logo for you."
