# Lessons

Short rules distilled from past builds. Read at step 1 before planning. Each rule exists because a real build failed without it.

This file holds process discipline and creative philosophy. Pattern rules for decoration, typography, and section-specific recipes live in their own references:

- Decoration patterns (accents, textures, dividers, service cards, glass, stats) → `visual-system.md`
- Display type and headline rules → `typography.md`
- SVG shape catalog → `shapes.md`
- Texture catalog → `textures.md`
- Structured data → `schema-examples.md`
- SEO checklist → `seo.md`

---

## Workbench register (industrial-signal palette family)

**Rule:** When the brief's vibe tags include `industrial`, `workwear`, `dispatch`, `service-urgency`, `blue-collar`, `stamp`, `workbench`, or the material posture reads as "workshop floor", "asphalt", "dark ink on a well-made business card", or "brushed steel on a workbench" — pick the `industrial-signal` palette family and follow this playbook. This register is the strongest proven hands-on-service aesthetic in the current system. Use it deliberately, not as a default for every service brief.

**The five moves:**

1. **Dark low-chroma ground + warm off-white + one saturated warm signal.** Proven palettes: asphalt `#17181A` + signal-orange `#E8591C` + bone `#E9E4D8`; deep-forest `#1F3A2C` + rust-amber `#C77A35` + bone `#F2EFE7`; ink `#15171C` + ember `#B43A1F` + steel `#7C8189` + bone `#E8E4DB`. Bone is warm, NOT cream. Never more than one accent. The signal is used sparingly on CTAs, numerals, and callouts, never as body color.

2. **Condensed, slab, or sign-painter display type. Never humanist-sans or editorial-serif.** Proven font pairings: Bitter + Inter, Barlow Condensed 800 + Archivo + IBM Plex Mono, Oswald + IBM Plex Sans. The display face should look stamped, stenciled, or hand-lettered on a truck panel. Do not reach for any serif-editorial pairing under this register.

3. **Monospace for dispatch details.** IBM Plex Mono (or similar) on Q## labels, stat labels, area chips, section rules, horizontal dividers, work-order-style metadata. This "dispatch log" treatment is where the register's personality lives. Three or four small mono elements across the page are enough.

4. **Stamped numerals for process, numbered services, or stats.** Large oversized process step numerals (01, 02) rendered in the signal color, treated as typographic objects rather than labels. The numeral does the work; do NOT add an eyebrow label above it (banned by `CLAUDE.md` hard rules). If the copy package has exactly 2 process steps, this treatment replaces the horizontal-3-card reflex — see `process.md` Step 2.

5. **Structural decoration, not decorative froth.** Block panels, horizontal rules, 3px top-border accents in the signal color, stamped diamond separators, caution-tape diagonals. No blobs, orbit rings, or cross-section overlap under this register. The register wants to feel built, not designed.

**How to check:** Before shipping, scan the page. Does the ground read as a workshop floor or an asphalt lot, not a gallery? Does the signal color appear on CTAs, stamped numerals, and no more than one or two other moments? Is at least one mono typographic element present somewhere (FAQ labels, dispatch row, stat band, section rules)? If any of those is no, the register is not honest.

---

## Hero recipe: full-bleed photo + gradient + texture + corner accents

**Rule:** This is the strongest hero treatment in the current system and the default for `full-bleed-photographic` strategy. A split-type-with-photo hero can use a stripped-down version on its photo side.

**Layer stack (bottom to top):**

```css
.hero {
  position: relative;
  min-height: min(88vh, 820px);
  overflow: hidden;
  isolation: isolate;
}
.hero-bg {
  position: absolute;
  inset: 0;
  z-index: -2;
  /* Over-sized for subtle parallax room: extend 15-30% past container */
  /* top:-15%; height:130%; when using JS parallax */
  background-image: url('assets/hero-photo.jpg');
  background-size: cover;
  background-position: center;
  filter: saturate(.85) contrast(1.02);
  will-change: transform;
}
.hero::before {
  /* Gradient overlay for legibility — 2 to 3 stacked layers */
  content: ""; position: absolute; inset: 0; pointer-events: none;
  background:
    linear-gradient(180deg, rgba(11,12,13,.48) 0%, rgba(11,12,13,.28) 38%, rgba(11,12,13,.94) 100%),
    linear-gradient(100deg, rgba(11,12,13,.78) 0%, rgba(11,12,13,.20) 52%, rgba(11,12,13,.08) 100%);
  z-index: -1;
}
.hero::after {
  /* Subtle texture overlay — 80px grid at low opacity on photo-led heroes */
  content: ""; position: absolute; inset: 0; pointer-events: none;
  background-image:
    linear-gradient(var(--texture-line) 1px, transparent 1px),
    linear-gradient(90deg, var(--texture-line) 1px, transparent 1px);
  background-size: 80px 80px;
  opacity: .04;
  z-index: -1;
}
.hero-corner-tr { /* 1-2 accent SVGs with slow drift or spin */
  position: absolute; top:-80px; right:-100px;
  width: clamp(320px, 34vw, 500px);
  opacity: .45; pointer-events: none; z-index: 2;
  animation: drift-slow 12s ease-in-out infinite;
}
```

**Optional parallax (recommended, keep subtle):**

```js
// Scroll-driven pan, ~0.3x scrollY on the bg layer. Cut on reduced motion.
if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const bg = document.querySelector('.hero-bg');
  addEventListener('scroll', () => {
    bg.style.transform = `translate3d(0, ${scrollY * 0.3}px, 0)`;
  }, { passive: true });
}
```

**Rules:**
- Gradient overlay: 2 or 3 linear-gradient layers stacked. One vertical darkening (lighter at top, dark at bottom where content sits). One directional gradient from the text-side edge for headline contrast. Optional third radial for warm glow from accent color.
- Texture `::after` opacity: `.04-.08` when the photo is carrying the hero; `.15-.55` when the hero uses a dark color field instead of a photo.
- Corner accent SVGs: 1 to 2 max. Opacity `.18-.55`. Use shapes from the chosen decoration family (geometric, blueprint-grid, wave, etc.). Animate with `drift-slow` or `spin-slow` at 8-12s duration.
- Content container sits at `z-index: 2+`. Hero minimum height: `min(88vh, 820px)` on desktop, `80vh` on mobile.
- `isolation: isolate` on `.hero` so `z-index:-1` stays contained and does not fight other stacking contexts.
- If the hero uses a color field instead of a photo, keep the same 4-layer stack but swap the photo for a deep color and crank the texture opacity to `.5+` so the surface still feels dimensional.

**This recipe is proven across multiple builds.** Default to it for `full-bleed-photographic` heroes. Do not reinvent.

---

## Hero treatment fidelity

**Rule:** Commit to a single hero strategy in step 2 and reproduce it faithfully in step 4. The two options are `split-type-with-photo` (split layout: headline and CTA on one side, photo on the other) and `full-bleed-photographic` (full-bleed background photo with headline/CTA overlay on a dark gradient or glass panel). Pick one. Do not mash them together. Do not default to split layout when the vibe calls for full-bleed. Type-first / centered-type magazine-lead heroes are retired.

**Why:** The most common failure mode is defaulting to a flat hero with an inline image box when the brief wanted full-bleed background with glassmorphism panels overlaid. The generic split layout is what the brain reaches for when tired. Name the hero strategy explicitly before building, and check your built hero against that named strategy.

**How to check:** In step 2, write one sentence: "This hero uses [strategy] because [vibe keyword]." In step 4, after building the hero, read that sentence and compare.

---

## Images must match what they sit next to

**Rule:** Every image must visually represent the specific thing next to it. A service card for one service cannot show an image of a different, unrelated service. A hero labeled "Emergency Response" cannot show a clean empty interior.

**Why:** Mismatched images are worse than no image. They signal that nobody was paying attention, which is the opposite of the premium feeling you are trying to create. Viewers notice within a quarter-second.

**How to check:** After placing any image, ask: "Would someone know what this section represents just by looking at the image, with the text covered?" If no, the image is wrong. Replace it, describe what you need in `build-notes.md` and use a labeled placeholder, or cut the image entirely.

---

## The hero is the biggest differentiation surface

**Rule:** The hero should communicate the specific thing this business does, for this specific audience, with the energy the vibe calls for. Not a generic "welcome" moment.

**Why:** The hero is the first thing a visitor sees and the thing they will remember. A hero that shows a professional actively doing the work beats a hero that shows a finished aspirational result, for service businesses. A hero that shows the product in use beats a hero that shows the product on a white background, for product businesses. Specificity wins.

**How to check:** Cover the business name in the built hero. Can you still tell what the business does and roughly who it serves? If no, the hero is generic.

---

## Count the content

**Rule:** When the client gives you content (copy, images, testimonials, service lists), count every item in the brief and verify every item made it into the build. Nothing gets dropped silently.

**Why:** Dropping a paragraph or a service is a trust failure that gets spotted on first review. It is also easy to prevent. Just count.

**How to check:** Before step 6, read the client's original prompt one more time and tick off every piece of content they mentioned. If any is missing, add it or flag it in `build-notes.md` with a reason.

---

## Every section deserves an image if the vibe supports imagery

**Rule:** If the vibe supports photography or illustration at all, every major section should have a visual anchor. Sites with zero images look like wireframes no matter how polished the type is.

**Why:** Visual hierarchy needs visual anchors. For most commercial sites, images do the heavy lifting of making a page feel real and trustworthy. The two live hero strategies (split, full-bleed) both include photography by default, so going image-less is rare and should be flagged explicitly.

**How to check:** Scroll the built page. Is any major section text-only when it would benefit from an image? If yes, either add one or confirm in `build-notes.md` that the bare-type treatment is intentional.

---

## The 95% template trap

**Rule:** If your built site looks 95% like a default template with the colors swapped, you have not done the creative work. The boldness checklist exists to catch this. Run it honestly, not hopefully.

**Why:** The failure mode is sneaky. You followed the process, you added some gradients, you swapped in a custom color, you shipped. And the result is still boring. The reason is that the process alone does not produce boldness. Boldness comes from deliberately pushing past the first acceptable version toward a second, more specific version.

**How to check:** After step 5, imagine swapping the business name for a different business in the same category. Would the site still work, unchanged? If yes, the site is generic. Specificity is the fix: specific palette, specific decorative language, specific hero treatment, specific copy.

---

## Micro-details compound

**Rule:** Focus states, hover states, keyboard outlines, scroll progress, transition easing, cursor treatments, these individually seem trivial. Collectively they are the difference between a site that feels cheap and a site that feels considered. Do not skip them in step 5.

**Why:** Users do not consciously notice micro-details when they are present. They absolutely notice when they are absent. A button with no hover state feels dead. A focus outline that is just the browser default feels unfinished. A scroll with no motion feels flat.

**How to check:** In step 5, tab through every interactive element with the keyboard. Hover every link and button. Scroll the page slowly. Anything that feels dead gets a treatment.

---

## Team member names: only in testimonial context

Never list team member names prominently in About, chip rows, "meet the team" pills, or any standalone display. Review-pulled team names go stale — if a named employee left last month and the site shows a rotating name-chip cloud, a prospect who knows that person left reads "this site isn't maintained."

**Safe places to show team names:**
- Inside testimonial quotes ("the technician provided exceptional service") — quoted context ages gracefully
- Inside dossier-sourced review signatures ("a local homeowner")

**Never-safe places:**
- Chip clouds under an About paragraph
- "Meet the team" pills on the homepage
- Hero badges
- Footer team lists

If you want to convey crew warmth in About, write prose: "The technicians our customers name in reviews are the same technicians who show up at your door." Do not bullet-list the names. The prose ages; the list doesn't.

---

## Writing rules

- No em dashes. Ever. Use commas, colons, or split the sentence.
- No AI tells in copy: delve, leverage, robust, comprehensive, cutting-edge, streamline, unlock, elevate, empower, seamless.
- No openers like "In today's...", "It's worth noting that...", "When it comes to...".
- One clear idea per paragraph. No hedged generalizations.
- Specific beats general. Numbers, names, and places signal real writing.
