# Design Brief Format

This document defines the format for the design brief that HATTORI writes as Step 04. The brief is consumed by the builder agent to understand the emotional and narrative context behind the copy package, AND to give the builder a head start on the creative direction decisions the builder would otherwise have to make from scratch.

## Purpose

The copy-package gives the builder structured data: headlines, service descriptions, CTAs, FAQs. But it cannot convey WHY those words were chosen, who the visitor is, or how the site should make someone FEEL. The design brief fills that gap.

The brief gives the builder vibe tags, hero strategy hints, and gap treatments. It does NOT suggest reference templates. The builder picks the template directly from vibe tags against `template-library.json`. Template choice is the builder's taste, not HATTORI's.

## Seven Sections

### 1. Business Identity (2-3 sentences, ~50 words)

Who this business IS. Not what they do (the builder has the service list). The identity must be specific enough that swapping the business name for a competitor's would break the description.

**Good:** "This is a one-person operation run by a veteran tradesperson who built their reputation on same-day response and personal accountability. Their name is on the truck, and that's the point."

**Bad:** "This is a professional services company serving the area with quality service."

### 2. Primary Conversion Job (1 sentence, ~15 words)

What the visitor must DO. Not "learn about the business", the specific action.

**Good:** "Call the phone number to schedule an emergency or same-day visit."

**Bad:** "Contact the business for more information about their services."

### 3. Visitor State of Mind (2-3 sentences, ~60 words)

Who lands on this page, what they're feeling, and what brought them here. Emergency vs planned. Anxious vs browsing. This shapes everything from headline urgency to CTA language.

**Good:** "The typical visitor has an urgent failure they need fixed today. They found this business through a frantic search. They're stressed, need help within hours, and will call the first business that looks competent and available."

Pull this directly from the Visitor & Job-to-Be-Done section of `inventory.md` (Step 01 item 12). Do not re-invent the visitor framing here; it was decided upstream. Summarize in 2-3 sentences; keep the specific customer-language phrases from the inventory for use in copy blocks, not the brief.

### 4. Vibe Direction (2-4 sentences PLUS a tag list, ~100 words total)

How the site should FEEL. Use sensory language. Describe the emotional impression, not the visual implementation. End with 3-6 vibe tags the builder can match against the template library.

**Anti-patterns (DO NOT USE in the prose):**
- Layout terms: "hero section," "card grid," "sidebar," "above the fold"
- Color specs: "#FF0000," "navy blue," "warm tones"
- Font names: "sans-serif," "bold headers"
- CSS terms: "glassmorphism," "gradient overlay," "backdrop-filter"
- UI patterns: "floating CTA," "hamburger menu," "accordion FAQ"

**Material posture is OK** in sensory framing. "This should read as deep canvas, not glass", "the ground should feel like brushed steel on a workbench", or "this wants a single saturated color doing all the work" all describe creative postures, not CSS properties. The builder does the implementation. The warm-editorial "editorial paper" posture (cream + ink + copper + serif-lead) is retired in this pipeline — do not use it in Section 4 prose and do not imply it through tags.

**Good prose (cool-corporate example):** "The site should feel like walking into a clean, well-lit office where every question has already been anticipated. Precise, calm, and a little cool to the touch. The surface should read as brushed steel or frosted glass, not paper."

**Good prose (saturated-field example):** "The site should feel like one confident color doing all the work, a single hue carrying the whole brand without apology. Bold but not loud. The surface should feel like a painted sign on a corner store."

**Good prose (deep-canvas example):** "The site should feel like standing in a quiet room at dusk, the kind of place where competence is assumed and doesn't need to announce itself. Grounded and cinematic. The surface should read as deep canvas, soft glowing edges, not a bright-lit catalog."

**Good prose (industrial-signal / workbench example):** "The site should feel like a workbench, not a magazine page. Hands-on, stamped, signal-coloured. The kind of place where a work order is pinned to a clipboard and the phone is the first thing that rings. Dark asphalt ground, one hi-viz accent, bone-warm off-white for quiet moments. Condensed caps and stamped numerals, like signage on the side of a truck." Use for hands-on service briefs where the owner is phone-forward, emergency-ready, generations-deep, or the visitor state of mind is "I need this fixed now and I want to know who is coming."

**Vibe tags:** End the section with something like `**Tags:** precise, corporate, tech-luxury, cool-canvas` or `**Tags:** bold, saturated-field, direct, small-business` or `**Tags:** grounded, deep-canvas, premium, cinematic` or `**Tags:** industrial, workwear, dispatch, service-urgency, industrial-signal`. Pull these from your prose and keep them honest. They feed the builder's template selection. Do NOT use `warm-editorial`, `editorial`, `magazine`, or `editorial-paper` as tags — they are retired. Palette families in play are cool-corporate, deep-canvas, saturated-color-field, natural-earthy, and industrial-signal (workbench register — see the builder's `references/lessons.md`).

### 5. What the Site Must NOT Do (3-5 bullets, ~60 words)

Failure modes specific to THIS business. Not generic web design don'ts.

**Good:**
- Must not feel like a corporate franchise (this is a local one-person operation)
- Must not bury the phone number (emergency visitors need it immediately)
- Must not oversell credentials they don't have (no team photos when it's one person)
- Must not use the owner's or team members' names in copy (applied upstream at write time; design-time reminder only)

**Bad:**
- Must not have slow load times
- Must not use placeholder text
- Must not have broken links
- Must not use stock photography (stock is the placeholder; do not ban the whole category — see Section 6)

### 6. Hero Strategy Hint (1 sentence, ~20 words)

Pick ONE of the two hero strategies below and note it by id. This is a contract. The builder reads the chosen template's `hero_strategy` field against this hint and, if they disagree, the brief wins and the builder swaps templates. Do not default to `split-type-with-photo` unless the brief genuinely calls for it.

- **`split-type-with-photo`** — headline and CTA on one side, a supporting photo or illustration on the other. Sibling-of-two-columns composition. Default for corporate, approachable, conversion-first service businesses.
- **`full-bleed-photographic`** — a single large photograph fills the hero, headline and CTA overlay on top with a dark gradient or glass panel. The photo does most of the emotional work. Default for emergency-first, high-trust, or when the business has a genuine "look at this crew at work" asset.

Type-first / centered-type magazine-lead heroes are retired in this pipeline. Do not recommend them.

**Good:** "Points toward `full-bleed-photographic` with the phone CTA overlaid on a single photo, given the emergency-first visitor state of mind."

**Good:** "Points toward `split-type-with-photo`, pairing headline and CTA left with a portrait of the owner right."

**Bad:** "Whatever the builder thinks is best."

**Imagery availability is not a hero-strategy filter.** Real photography of the actual business (from `enhanced-images.json`) is preferred but not required. When enhanced images are empty or thin, stock photos from the builder's `stock-photos/` library are the expected placeholder. Do NOT:

- write "no real photography available" or equivalent phrasing into Section 6 (the builder reads that as a ban on all imagery and ships a photo-less site)
- bar stock photos as a category in Section 5 (see Section 5 anti-patterns)
- downgrade from `full-bleed-photographic` or `split-type-with-photo` just because `enhanced-images.json` is empty

Pick the hero strategy on vibe, audience, and voice grounds. Photo availability is the builder's problem, not a constraint on the brief. Flag in Section 5 only the specific image types that would misrepresent the business (e.g., "no luxury imagery for a blue-collar service brand," "no team photos of anonymous hands for a solo operator"), never stock photography in general.

**Anti-repetition check.** Before you commit to a hero strategy, look at the last 3-5 briefs in the workspace tree (or, if you can see them, the shipped hero strategies from prior builds). If three or more of them landed on `split-type-with-photo`, the default choice is probably wrong for this brief. Either pick `full-bleed-photographic` if it genuinely fits, or write an explicit one-sentence justification in the brief for why this prospect needs split again. The system's dominant failure mode has been defaulting to split on every service-business build, even when the vibe called for full-bleed.

### 7. Production Context (1 sentence, ~20 words)

Tier and effort calibration from scoring.json. Tells the builder whether this is a flagship build or a "ship something solid" build.

**Good:** "Tier 3, high market opportunity, no existing website. Invest the time, this is a strong lead."

**Good:** "Tier 0, prospect already has a working site. Make it strong but do not burn the day optimizing micro-interactions."

## Total Length

400-550 words. One page when printed. This is a brief, not an essay.

## What This Is NOT

- Not a wireframe or layout suggestion
- Not a color palette recommendation (the builder picks the palette in step 2)
- Not a font pairing guide (the builder picks typography in step 2)
- Not a list of sections the site should have (the builder decides section list in step 2)
- Not a creative brief for the copy (that's strategy.md)

HATTORI writes copy and provides creative orientation. The builder designs sites. The design brief bridges the gap by explaining the HUMAN CONTEXT structured data cannot convey, AND by giving the builder a vibe-tagged starting point for the decisions the builder would otherwise make from scratch.
