# Build Process, 6 Steps

Execute these in order. Do not skip. Do not advance to the next step until the self-check passes.

---

## Step 1, Interpret

**Purpose:** Turn the client's single prompt into a clear working brief before touching any HTML. Every downstream decision flows from this step.

**Do:**

1. Read the client's prompt carefully. Slowly. Your prompt is two documents joined by a `---` separator: the design brief (the copywriter's creative orientation, vibe tags, hero strategy contract) followed by the content package (`copy-package.md` — a set of tagged content blocks, not a pre-sectioned document).

   **The content package is blocks of the form `{topic: <type>, ...attributes}` separated by horizontal rules.** Topic tags label what kind of content each block is. They do NOT tell you where to put content on the page. A `{topic: service, name: "..."}` block is a service description; it does not mean "render a Services section in position N of the HTML." Deciding what becomes a section is step 2's job, not the copywriter's. If you see old-style `## Headlines`, `## About`, `## What We Do` headers in the content package, treat them as a bug and map them to topic tags yourself before proceeding.
2. Extract what is explicit and write it down:
   - Business name and what they actually do.
   - Audience, who is this for.
   - Any named constraints (palette, font, existing brand, must-include content, forbidden elements).
3. Fill in what is implicit with sensible defaults, and flag each default so you can revisit it:
   - **Vibe keywords**, 3-to-6 adjectives. Examples: "confident, approachable, gritty-premium" or "kinetic, irreverent, confident" or "precise, corporate, tech-luxury."
   - **Color temperature**, warm, cool, or split.
   - **Motion energy**, still, gentle, lively, or kinetic.
   - **Material definition**, pick one. The four are equal-weight options. The material must match the brief, not your habit:
     - *Frosted glass*, high blur, thin borders, soft glow (cool or warm tint as the brief dictates)
     - *Deep canvas*, dark gradients (cobalt, forest, oxblood, graphite, ink), soft glowing edges
     - *Brushed metal*, cool highlights, tight shadows, industrial
     - *Saturated color field*, a single confident hue (mustard, emerald, cobalt, terracotta, plum) carrying the whole page
   - **Light origin**, e.g. "soft light from top-left" or "hard light from above." This dictates where highlights and shadows go everywhere on the page.
   - **Depth strategy**, flat high-contrast, layered glass, or cross-section overlap.
   - **Do-not-use list**, anything the vibe rules out. Examples: "no corporate navy", "no stock handshake imagery", "no rounded lg", "no Inter".
4. Read `references/lessons.md` before you plan.
5. **Pick a reference template.** If the client gave you their own screenshot reference, skip this and use theirs. Otherwise, pick from the library at `templates/` (supply your own reference set; the public template does not bundle one):
   - Read `template-library.json` at the root of this skill.
   - Scan every entry's `vibe_tags` and `style_summary` against your vibe keywords from above. Shortlist 3-to-5 candidates.
   - View the screenshots of the shortlisted candidates (`filepath` field). Look at the actual hero, palette, and layout, not just the description.
   - Pick ONE. Write the chosen template's `id` and a one-sentence reason in your notes. These are the shape of a good rationale:
     - "royalsplit, because the brief calls for corporate+confident and royalsplit anchors a split hero on cobalt with a chrome product shot"
     - "consultflow, because the brief calls for playful+corporate+friendly and consultflow pairs saturated blue with coral blob accents"
     - "startuper-v3, because the brief calls for tech-luxury+serious+premium and startuper-v3 runs a cinematic cityscape under a dark teal gradient"
     - "gardenview, because the brief calls for natural+premium+residential and gardenview runs a full-bleed garden photo with deep forest green"
     - "gridblock, because the brief calls for friendly+residential and gridblock anchors on cobalt with a blueprint grid and yellow pill CTAs"
   - **Anti-repetition check.** Before you commit, look at the five most recent build-notes in `../_prior-builds/` (if the directory exists — ignore if not). If three or more of them chose the same palette family (whether cobalt + steel, forest + bone, or any other), pick a different family. Warm-editorial cream + ink + copper is retired as a register — if you catch yourself reaching for it, stop and pick from cool-corporate, deep-canvas, saturated-color-field, or natural-earthy instead.
   - You will reference this template by name throughout the build to keep your decisions coherent. The template anchors the *visual language* (palette family, hero strategy, decoration, type rhythm), it is not a layout to copy 1:1.
   - **Hero strategy contract.** The chosen template has a `hero_strategy` field (one of `split-type-with-photo`, `full-bleed-photographic`). The design brief's Hero Strategy Hint (Section 6) also names one. If they agree, that is the hero strategy. If they disagree, THE BRIEF WINS and you must swap to a shortlisted template whose `hero_strategy` matches the brief. Do not build a split hero from a `full-bleed-photographic` brief by claiming you are still "inspired by the template." The contract is the field value, not the overall vibe. Note the chosen `hero_strategy` in build-notes. Type-first / centered-type magazine-lead heroes are retired — do not invent one.
   - **Anti-repetition check, hero strategies.** Also look at the last 3-5 builds in `../_prior-builds/` (ignore if absent). If 3 or more of them shipped `split-type-with-photo`, the default choice is probably wrong for this brief. The system's dominant failure mode has been defaulting to split on every service-business build. Pick a non-split template from your shortlist, or write an explicit justification in build-notes for why this prospect specifically needs split again.
6. Answer five comprehension questions for yourself:
   - What three adjectives would the owner want on day one?
   - What should feel strictly off-limits stylistically?
   - Which section deserves the most visual investment?
   - Where should motion draw the eye?
   - What is the single biggest mistake I could make here?

**If the prompt is missing critical information** (the business name, what they do, who it is for), ask the client one focused round of questions before proceeding. Do not invent the business itself. But do invent vibe, palette, and layout choices, that is your job.

**Self-check:** Can you recite the vibe keywords AND the chosen template id without looking back at your notes? If no, re-read your notes until you can. Do not proceed.

---

## Step 2, Plan

**Purpose:** Decide every section and every treatment before writing any HTML. Prevents drift and generic defaults.

**Do:**

1. Read `references/visual-system.md` to refresh on how accent shapes, textures, and dividers layer.
2. **Decide the section list from the content package, not from a template checklist.** Read `copy-package.md` (which is a bag of tagged content blocks, not a pre-sectioned document) and decide which content earns its own page section, which folds together, and which sits inside another section. The old pipeline converted every `##` header into its own section and shipped the same 9-section skeleton on every build. That is the failure mode this step is built to avoid.

   **Required on every site (non-negotiable):**
   - **Top nav bar**, anchor links to major sections, brand lockup (logo image if `dossier.logo_url` is present, else two-line wordmark per `references/wordmark.md`), primary CTA button, collapses to hamburger under 768px. Never invent an SVG badge or monogram to fill the logo slot.
   - **Inquiry form**, fields: Name, Phone, Email, Service address, "Anything else we should know?". See `SKILL.md` for full spec.
   - **Footer**

   **Every other section is a deliberate choice, not a checklist item.** Decide for each content type in the package:

   - `{topic: business-summary}` is sales context for you, never a rendered section. Never put it on the page.
   - `{topic: headline-candidates}` + `{topic: stat}` + `{topic: cta, role: primary}` compose the HERO. Whether stats sit inside the hero, beside it, or as a separate trust strip is your call and should follow from the chosen template's `hero_strategy`.
   - `{topic: about-prose}` may be its own section, may fold into the hero as a secondary panel, may sit as an inset inside a services section, or may become a footer-adjacent narrative. Not every build needs a dedicated about section. **When the about section is its own dedicated section, it carries a photo + an overlaid `Call (xxx) xxx-xxxx` CTA in the photo's bottom corner — never a caption, stamp, figcaption, or pull-quote on that photo. See CLAUDE.md hard rules for the full spec.**
   - `{topic: service}` blocks: if there are 5+ services, they probably earn a dedicated section. If there are 3, they might live inside a split "what we do / how to reach us" two-panel layout. If there are 7+ with strong visual differences, consider a bento.
   - `{topic: process-step}` blocks: if there are 2 steps, they probably sit inside the about section as inline bullets, not as a 3-across card row. If there are 4-5, a vertical timeline, numbered grid, or offset list beats a horizontal cardstrip. **Do not build three horizontal process cards as a reflex.** That is the single most-reported sameness in the current system. Look at the actual step count before choosing the layout.
   - `{topic: testimonial}` blocks: dedicated social proof section when you have 3+, folded into the hero or footer as a single pull-quote when you have 1-2.
   - `{topic: faq}` blocks: a standalone FAQ section when there are 4+, folded into the inquiry form as pre-filled "common questions" when there are fewer.
   - `{topic: stat}` blocks: as a dark trust strip between hero and services, or as corner accents in the hero, or inside the about section. One home per number; do not restate.
   - `{topic: cta, role: secondary}`: often inside the hero as a second button, or as a mid-page re-engagement band. If the build already has a strong primary CTA + the inquiry form, a mid-page CTA may be redundant.
   - `{topic: cta, role: emergency}`: a top banner above the nav, or an always-visible floating element, only if the strategy enabled it.

   **Section count discipline.** A 5-section site with a strong hero, services, inquiry form, and footer can beat a 9-section site that pads about, process, testimonials, mid-CTA, FAQ, and trust strip separately. Reject any section whose content would be served better folded into another. Plan which sections the nav links to.

   **Layout discipline, per section.** Once you know the section list, decide the layout for each. Explicitly reject the defaults:
   - Not every section is a 2-column `text | photo` split. About sections especially default to split in LLM priors; if your chosen template uses a different treatment for about (single column with margin-note, photo full-bleed with text overlay, asymmetric bento with multiple photos), match the template.
   - Services are a uniform grid by `visual-system.md` rule. Grid column count should match count of cards: 3 services = `grid-cols-3`, 4 = `grid-cols-2 md:grid-cols-4` or `grid-cols-2 lg:grid-cols-4`, 6 = `grid-cols-2 lg:grid-cols-3`, 8 = `grid-cols-2 md:grid-cols-4`. Picking the grid column count is a real decision, not always 3.
   - Process is the highest-risk section for sameness. If the copy package has 2 steps, do not build 3 cards. If it has 4 steps, a 2x2 grid or a vertical timeline beats four cramped horizontal cards. If it has 5, strongly consider a vertical numbered list or offset rhythm.
3. For each section, write one paragraph covering:
   - **Motion treatment**, reveal style, timing, trigger (e.g. IntersectionObserver fade-up with 0.1s stagger).
   - **Color treatment**, gradient, accent, overlay, background color. Reference your chosen template's palette as the starting point, then adjust for this specific business.
   - **Decoration**, which accent shapes or textures from `references/shapes.md` and `references/textures.md`. Match the decoration *family* the template uses (geometric vs blob vs blueprint vs wave vs minimal). Maximum 2-to-3 accent shapes per section at 0.04-to-0.08 opacity.
   - **Typography adjustments**, weight, size, tracking for headings and subheads. Match the template's typographic posture (serif-display vs grotesque vs hybrid).
   - **Layout**, full-bleed vs split vs centered vs bento vs cross-section overlap. Look at how the template handles this section type and start from there. Enforce minimum `py-32` desktop padding.
4. Every decision must cite at least one vibe keyword from step 1 AND reference the chosen template (e.g. "Coral CTA on cream, like consultflow's coral-on-blue treatment, vibe: playful-corporate"). No citation, no decision.
5. Explicitly write down the hero strategy. Pick ONE and commit. The chosen strategy is the one named in the brief's Section 6 (that is a contract, see step 1). The two live options, matched to the template-library vocabulary:
   - **`split-type-with-photo`** — Split layout. Headline and CTA on one side, a supporting photo or illustration on the other. Two-column desktop composition.
   - **`full-bleed-photographic`** — A single large photograph fills the hero. Headline and CTA overlay with a dark gradient or glass panel. The photo does most of the emotional work.

   Type-first / centered-type magazine-lead heroes are retired. Do not invent one. Do NOT default to `split-type-with-photo` unless the brief and the template both name it. That has been the system's dominant failure mode. If you catch yourself reaching for a two-column `text | photo` hero without explicit instruction, stop and re-read the brief's Section 6.

   **Verbatim-quote rule for hero overrides.** If you override either the template's `hero_strategy` OR the brief's Section 6 hint, your `swaps_from_plan:` entry in `build-notes.md` MUST include the verbatim quote from the brief (with section or line number) that justifies the swap. Paraphrases are disallowed — quote the exact text or do not swap. A brief that bans "luxury photography" or "stock handshake imagery" is banning photo **types**, not photography itself; do not read a full photo ban into a type ban.
6. Pick your typography. Choose a display + body pairing that matches the vibe. Pick from the full range of Google Fonts based on what this specific business needs:

   **Serif display** (established, warm, traditional): Playfair Display, DM Serif Display, Lora, Merriweather, Cormorant Garamond, Bitter, Libre Baskerville, Source Serif 4
   **Sans display** (clean, modern, direct): Space Grotesk, Outfit, Sora, Manrope, General Sans, Clash Display, Satoshi
   **Slab display** (industrial, bold): Roboto Slab, Zilla Slab, Arvo, Rockwell
   **Grotesque body** (pairs with any display): Inter, DM Sans, IBM Plex Sans, Archivo, Source Sans 3, Work Sans, Nunito Sans, Plus Jakarta Sans

   Match the type posture to the vibe: a "calm corporate" prospect wants a different display font than a "bold industrial" prospect. Two businesses in the same category should NOT get the same font pairing. Avoid Inter and system-sans for display headings. Use `clamp()` for fluid sizing.
7. Pick your palette. 2-to-4 colors, specific to this business. Use the chosen template's palette as a starting point, then adjust the hue, saturation, or accent color so the result is recognizably this business and not just a re-skin of the template. Write them as hex values. Reject anything that matches the Tailwind default palette without customization.

**Self-check:** Every section paragraph ends with `(vibe: <keyword>, template: <id>)`. The hero strategy is one of the two options, not a mashup. Every row has a named treatment, not "TBD" or "depends." If any row is vague, rewrite it before proceeding.

---

## Step 3, Scaffold

**Purpose:** Stand up the HTML skeleton with correct semantic structure, full SEO head, and JSON-LD schema, before any styling work.

**Do:**

1. Read `references/seo.md` for the head checklist.
2. Read `references/schema-examples.md` and pick the schema type(s) that fit this site. Most sites get one of:
   - `Organization` for a brand or company homepage
   - `LocalBusiness` for a local service business (include address, phone, hours, geo, services)
   - `Product` or `SoftwareApplication` for a product launch
   - `Article` or `BlogPosting` for a content piece
   - Add `FAQPage` schema if the site has an FAQ section.
3. Create `index.html` with:
   - Full `<head>` block: charset, viewport, title, meta description, canonical, OG tags, Twitter tags, favicon.
   - `html { scroll-behavior: smooth; }` in your base CSS for nav anchor scrolling.
   - The chosen JSON-LD `<script type="application/ld+json">` block (may be stub values at this point, fill in real data by step 5).
   - Tailwind CDN link OR a `<style>` block with your own CSS custom properties for colors, fonts, spacing. Either is fine, do not mix both.
   - `<body>` starting with a `<nav>` element (skeleton only for now, real styling in step 4).
   - One `<section>` per item from your plan, each with an `id` that matches a nav anchor, an `aria-label`, and a comment above it naming the treatment from step 2.
   - The inquiry form section (skeleton only for now, real styling in step 4) with the exact fields from `SKILL.md`: Name, Phone, Email, Service address, "Anything else we should know?". Every input has a real `<label>`. The form is wired live: `action="https://example.com/api/inquiry"` `method="POST"`, the hidden `site` field with the literal `__SITE_SLUG__` token, the `company_website` honeypot, and the field `name` attributes (`name`, `phone`, `email`, `service_address`, `message`) all per `SKILL.md`. Do not use `action="#"`.
   - Global `<style>` and `<script>` blocks at the bottom of `<body>` for keyframes, utilities, IntersectionObserver reveal logic, and the mobile nav hamburger toggle.
4. Inject the film grain SVG from the main agent instructions into the `<body>`.
5. Set up your CSS custom properties for the palette and fonts so every section can reference them.
6. List `stock-photos` to see what images are available:
   ```bash
   ls stock-photos
   ```
   Note which ones might match the sections you are building. You will place them in step 4.

**Self-check:**
- Does `index.html` open in a browser and render recognizable (if ugly) sections? It should.
- Does view-source show one `<h1>`, proper heading hierarchy, all head tags present, and a valid JSON-LD block? It should.
- Does every `<section>` have an `id` that matches a nav link's `href`? There should be no broken anchors.
- Is the inquiry form present with all five fields and real labels? It should be.

---

## Step 4, Execute section by section

**Purpose:** Apply the plan. One section at a time. Ship the section completely, self-check, then advance.

**For each section, in document order:**

1. Write the real copy. No placeholders past this step. Short, specific, human sentences. No AI tells.
2. Apply the plan's motion treatment, color treatment, decoration, typography, and layout for this section.
3. Read `references/shapes.md` and `references/textures.md` to grab the exact SVG for any accent shape or background texture you planned. Replace `{{PRIMARY}}` and `{{ACCENT}}` tokens with your palette hex values or CSS variables.
4. Use layered shadows, not `shadow-xl`. Use glassmorphism on cards where the material calls for it.
5. Respect the light origin. Highlights on top-left, shadows bottom-right (or wherever you committed).
6. Add at least one decorative element that was not in your baseline scaffold. Each section needs SOMETHING that makes it specific to this business. **For the about section, that decorative element is NEVER a caption / stamp / figcaption / pull-quote pinned to the photo. It is the overlaid Call CTA, plus the photo choice, plus shapes/textures from `references/`.** Captions on the about photo were the dominant past failure mode; do not invent one.
7. Place images from `stock-photos`. For any section that needs a photo, scan the `stock-photos` directory listing (you ran `ls stock-photos` in step 3), pick the best match, copy it into `assets/` in the project folder, and reference it with a relative path. Every image gets descriptive `alt` text. If no photo in the vertical folder fits, check the general folders before declaring a gap. **Minimum floor: 2 real photographs per site.** Both hero strategies (`split-type-with-photo`, `full-bleed-photographic`) involve hero photography by default; if for some reason the hero ships without a photo, the 2-photo floor must then be met elsewhere (about section, services section, gallery band, mid-CTA band). Placeholders (`IMAGE NEEDED:` divs) do NOT count. If you genuinely cannot find 2 matching photos, note prominently in `build-notes.md` and ship with honest placeholders rather than silently going image-less. Never ship a mismatched image just because it was available.

**Special handling for the nav bar and inquiry form:**

When you reach the nav bar (first in document order), apply the full premium treatment: sticky positioning, the right material for the vibe (glass with backdrop-blur, opaque paper, dark canvas), hover states on every link, a button-styled CTA. Confirm every anchor link's `href` matches an existing section `id`. Build the mobile hamburger toggle as vanilla JS at the bottom of `<body>`.

**Brand lockup (nav + footer).** Read `../shared/dossier.json` and check `logo_url`. If it is a URL, render the logo image at ~32-40px height. If it is `null`, render the two-line typographic wordmark from `references/wordmark.md` (business name in the display face, `CITY, STATE` in tracked caps below). **Never generate an SVG badge, monogram letter, emoji, or geometric primitive to fill the logo slot** — that was the dominant failure mode (random hexagons, glyphs, letter-in-a-circle stamps). Style line 2 as a real typographic element, not an afterthought: tracked 0.1-0.2em, ~60% opacity, a mono or small-caps face distinct from body copy.

When you reach the inquiry form (second-to-last before the footer), verify the exact five fields are present (Name, Phone, Email, Service address, "Anything else we should know?"). Style the form like a premium card: layered shadows or glassmorphism, custom focus states on every input (not the browser default outline), generous padding, a submit button that matches the hero CTA styling. The form heading and invitation copy should feel warm and specific, not "Contact Us".

**Make creative choices, not safe ones.** If the hero has one radial overlay, go further, layer a radial with an animated SVG path with a color tint. A subtle grain plus a minor gradient plus one accent color is not enough. Push it.

**Self-check (run after every section):**

### 1. Structural integrity
- [ ] The section has a unique `id` and a real heading with real copy.
- [ ] Heading hierarchy is correct, no skipped levels.
- [ ] The section is responsive. I resized the browser mentally, nothing breaks.
- [ ] All images have descriptive `alt` text. Not "image1" or "photo".

### 2. Premium guard
- [ ] I purged generic Tailwind colors (`blue-500`, `gray-200`, `indigo-600`) from this section.
- [ ] Corner radius is `rounded-3xl` (24px) or sharp (0px), not `rounded-lg` (8px).
- [ ] Cards use layered shadows or glassmorphism, not `shadow-xl` on a flat white background.
- [ ] Section padding is `py-32` minimum on desktop, increase padding rather than shrink content when things feel crowded.
- [ ] This section uses the vibe keyword I cited in step 2. A stranger looking at this section should be able to guess at least one of the vibe keywords.
- [ ] **About section only:** the about photo carries an overlaid `Call (xxx) xxx-xxxx` CTA in one bottom corner, `tel:`-linked to the prospect's primary phone. There is NO caption / stamp / figcaption / pull-quote on the about photo. (Hard rule in CLAUDE.md.)

### 3. Physics and grid
- [ ] Highlights and shadows respect the single light origin I committed to.
- [ ] This section avoids a uniformly centered 3-column grid. It uses asymmetry, bento, or cross-section overlap where the plan called for it.
- [ ] Glass elements use `backdrop-blur`, 1px semi-transparent borders, and pair with the film grain.

### 4. Choreography
- [ ] Child elements enter with a 0.1s stagger (heading → subtext → button), not all at once.
- [ ] Motion feels expensive. Minimal y offsets. Smooth opacity fades. No bouncy fast transitions unless the vibe is explicitly "kinetic" or "playful".

If any box is unchecked, fix the section before moving on. Do not accumulate debt across sections.

---

## Step 5, Global polish

**Purpose:** Tie sections together into one coherent experience. Choreography, not isolated moments.

**Do:**

0. **Run the boldness checklist** from `SKILL.md` before anything else in this step. All five items must pass. If any fails, go back to step 4 for the offending sections and add the missing palette color, animated SVG, texture override, asymmetry, or specificity. The checklist is the floor. Only proceed once every item is a real yes, not a hand-wave.
1. Add cross-section motion handoffs so scroll feels continuous, not like a series of independent slides.
2. Confirm the staggered entry pattern (heading → subtext → button at 0.1s intervals) is consistent across every section.
3. Add scroll-triggered background transforms where it fits, subtle scale or opacity shifts as elements enter the viewport. Do not overdo this.
4. For primary CTAs, consider a magnetic hover effect where the button subtly pulls toward the cursor. Use sparingly, usually just the hero CTA and the final CTA.
5. Make decorative language consistent. Same shape family across sections, not a grab bag. If the hero uses blobs, the CTA and testimonials should also use blobs, not suddenly switch to orbit rings.
6. Confirm the hero still reads as distinct at first glance, not just on close inspection.
7. Add micro-details: focus states on all interactive elements, visible keyboard outlines (never `outline: none` without a replacement), hover states on every link and button, a scroll progress indicator if the vibe supports it.
8. Confirm the color system reads consistently across the full scroll.
9. Check type rhythm. Headings feel massive on desktop and legible on mobile. Body copy has comfortable line-height (1.6-to-1.8). No orphans or widows in the hero.
10. Test in mobile viewport width (375px). Type scales down gracefully. Grids collapse to single column where needed. Touch targets are at least 44x44px.

**Self-check:** Close the file. Re-open. Scroll the full page top to bottom. Does it feel like ONE site built by ONE person for ONE business, or does it feel like a patchwork? If patchwork, identify the seams and return to step 4 for those sections.

---

## Step 6, Ship

**Purpose:** Final verification and handoff. Catch anything the earlier steps missed.

**Do:**

1. Run the anti-slop grep:

```bash
grep -nE "blue-500|blue-600|gray-200|gray-300|indigo-500|indigo-600|rounded-lg|shadow-xl\b" index.html
```

Every hit needs a justification or a replacement. Ideally the output is empty.

2. Validate the head block:
   - `<title>` is present, under 60 characters, includes business name and primary descriptor.
   - `<meta name="description">` is present, under 155 characters, value prop plus specificity.
   - `<link rel="canonical">` is present (use a placeholder URL if the live URL is unknown, note it in `build-notes.md`).
   - OG tags and Twitter tags are present with real values.
   - `<meta name="viewport" content="width=device-width, initial-scale=1">` is present.

3. Validate the JSON-LD schema:
   - The block parses as valid JSON.
   - All required fields for the chosen schema type are filled in (name, address, phone for LocalBusiness, etc.).
   - No stub values like "YOUR_BUSINESS_NAME" left over.

4. Validate alt text on every `<img>`. No empty alt, no "image", no filenames.

5. Validate the nav bar:
   - Every nav link's `href="#..."` points to an `id` that actually exists in the document.
   - The nav is sticky/fixed and visible on scroll.
   - The hamburger toggle works under 768px.
   - Clicking an anchor link scrolls smoothly (confirm `scroll-behavior: smooth` is set).

6. Validate the inquiry form:
   - All five fields present: Name, Phone, Email, Service address, "Anything else we should know?".
   - Every input has a real `<label>` linked via `for`/`id`, not just a placeholder.
   - Required fields have the `required` attribute and a visible indicator.
   - The form is styled to match the site's premium standards, not a default browser form.
   - The form is wired live: `action="https://example.com/api/inquiry"`, `method="POST"`. No `action="#"`. (Replace the endpoint with your own form handler.)
   - The hidden `<input type="hidden" name="site" value="__SITE_SLUG__">` is present with the literal token left in place.
   - The `company_website` honeypot is present as a real text input, visually hidden, `tabindex="-1"`, `aria-hidden="true"`, not focusable.
   - The five real fields use the exact `name` attributes `name`, `phone`, `email`, `service_address`, `message`.
   - The inline submit script is present, intercepts submit, sends `application/x-www-form-urlencoded`, swaps in a thank-you on `{ ok: true }`, and falls back to a plain POST on error.

7. Open `index.html` in a browser (or imagine doing so). Top-to-bottom scroll. Everything renders. No console errors. Motion works. Focus states work. Nav anchors jump correctly.

8. Write `build-notes.md` containing the sections below IN THIS ORDER. The first section ("Context Inheritance") and the last section ("Fingerprint") are non-negotiable contracts and are read by operator tooling — match the exact format.

   **Context Inheritance (REQUIRED, FIRST SECTION).** Write this BEFORE anything else in build-notes. For every load-bearing design decision, name the source. Format:

   ```
   ## Context Inheritance

   - **Template picked:** <id> — <1 line reason>
   - **Palette source:** [dossier brand colors | brief direction | template anatomy | atom <name> | my independent choice — <why>]
   - **Type pairing source:** [brief direction | template anatomy | atom <name> | my independent choice — <why>]
   - **Hero strategy source:** [brief Section 6 contract | template anatomy | my independent choice — <why>]
   - **Section structure source:** [content package block counts | template anatomy | my independent choice — <why>]
   - **Decisions I cannot trace to (a) copy-package, (b) design-brief, (c) template PNG anatomy, or (d) explicit reasoning in these notes:** <list each, or write "none">
   ```

   This is the single most important section of build-notes.md. If any design choice traces to nowhere, list it under the "cannot trace" bullet. Flagging is more valuable than hiding. Operator tooling reads this section and uses the "cannot trace" list to diagnose skill/plan/reference overrides. Do not omit, do not move, do not soften.

   **Then the remaining sections:**

   - **Brief interpretation**, the vibe keywords, audience, and material definition you landed on.
   - **Reference template**, which template id from `template-library.json` you chose (or "client-provided reference" if they gave you one), and a one-sentence reason. If you swapped templates mid-build, note both the original pick and the final pick with the reason for the swap.
   - **Palette**, the hex values and where each color is used.
   - **Type pairing**, the display and body fonts.
   - **Hero strategy**, which of the two strategies you picked and why.
   - **Section-by-section treatments**, one line per section with the treatment applied.
   - **Hero distinctiveness note**, why this hero could not be a different business.
   - **Images**, which `stock-photos` files you used and where, plus any placeholders you left with descriptions of what's needed.
   - **Form wiring note**, confirm the inquiry form ships wired to your form endpoint with the hidden `site` field (`__SITE_SLUG__` token, replaced by the build activity), the `company_website` honeypot, and the inline submit script. Note any selector or id you used so the script binding is traceable.
   - **Defaults and assumptions**, anything you invented because the prompt was silent. The client should know what to push back on.
   - **What would make it stronger**, any information you needed but did not have.

   **Fingerprint (REQUIRED, LAST SECTION).** Machine-readable fingerprint of the build, used by the convergence monitor to detect homogenization across recent builds. Use EXACTLY this format with these keys — the parser is strict:

   ```
   ## Fingerprint

   - template: <the chosen template id, e.g. fixflow>
   - palette_family: <one of: cool-corporate | deep-canvas | saturated-color-field | natural-earthy | industrial-signal>
   - primary_font: <display font name, e.g. Bitter>
   - secondary_font: <body font name, e.g. Inter>
   - hero_strategy: <one of: split-type-with-photo | full-bleed-photographic>
   - section_count: <integer, counting top-level <section> elements in index.html>
   ```

   Pick the palette family that best describes your palette choice. `industrial-signal` is the workbench register (dark ground + bone + one warm signal, condensed/slab type) — see `references/lessons.md`. `warm-editorial` is retired and no longer a valid value — if you find yourself wanting to use it, your palette choice is wrong for this pipeline.

**Self-check:**
- `index.html` exists and opens cleanly in a browser.
- `build-notes.md` exists and covers every item above.
- Anti-slop grep is clean or every hit is justified.
- The boldness checklist from `SKILL.md` still passes.
- You would send this to a paying client without flinching.

If any of those is not true, the site is not ready to ship. Go fix it.
