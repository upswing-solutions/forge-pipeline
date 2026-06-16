# Visual System

Three layered decoration systems. Zero dependencies, pure CSS and inline SVG. Use all three together for a premium feel.

> **Palette-neutrality note.** The CSS snippets below show example hex values and variable names. These are illustrative only — the code had to compile with something. When you build, rename the variables to fit your chosen palette (`--cobalt`, `--ivory`, `--mustard`, `--forest`, `--plum`, `--sage`, etc.) and swap every hex value to yours. Copy-pasting the examples verbatim drags every build into the same aesthetic regardless of the brief. Do not do that. Warm-editorial (cream + ink + copper) is retired in this pipeline — do not reinstate it under a different variable name.

---

## The layer stack

From bottom to top, every section can have up to four decorative layers:

1. **Background color or gradient** (the section base)
2. **Background texture** (tiling SVG pattern like paper grain or crosshatch)
3. **Accent shapes** (large floating SVG elements, 0.04-0.08 opacity)
4. **Section dividers** (waves or angled shapes between sections)
5. **Content** (text, images, cards)

These do not compete, they layer. Pick at least two of the four decorative layers for every major section.

---

## Accent shapes (floating SVG elements)

Large decorative shapes, circles, orbit rings, blobs, waves, absolutely positioned behind content with slow CSS animations. They peek from section edges and add a premium, modern feel.

**When to use:** Hero, CTA, about, testimonials. Any section with breathing room.

### Shape categories

| Category | Feel | Best for |
|---|---|---|
| **Floating circles** | Clean, geometric | Minimalist and corporate vibes |
| **Orbit rings** | Tech, dynamic | Modern and innovative vibes |
| **Blobs** | Organic, friendly | Warm and approachable vibes |
| **Grid dots** | Structured, precise | Professional and reliable vibes |
| **Wave lines** | Flowing, calm | Relaxed and natural vibes |

Pick one shape family and stick with it across the site. Mixing blobs and orbit rings in the same site feels incoherent. Consistency in decorative language is what separates premium from busy.

> **Override:** Service-card sections do not use accent shapes at all. Variety on service cards comes from rotating background textures and palette colors only. See the **Service-card section playbook** below.

### Implementation pattern

```css
/* Add once per page, in the global <style> block */
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}
@keyframes spin-slow {
  from { transform: rotate(0); }
  to { transform: rotate(360deg); }
}
@keyframes drift {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(30px, -15px); }
}

/* Every section that hosts accent shapes */
.section-with-shapes {
  position: relative;
  overflow: hidden;
}

/* Each shape */
.accent-shape {
  position: absolute;
  z-index: 0;
  opacity: 0.06;
  pointer-events: none;
  animation: float 8s ease-in-out infinite;
}

/* Content sits above shapes */
.section-with-shapes > .content {
  position: relative;
  z-index: 1;
}
```

**Rules:**
- Maximum 2-to-3 shapes per section. More reads as noise.
- Opacity 0.04-to-0.08. Barely visible is the goal.
- Hide shapes on mobile under 768px with `@media (max-width: 768px) { .accent-shape { display: none; } }`. They clutter small screens.
- Use the site's primary or accent color, not a random new color.
- Vary the animation duration across shapes (6s, 8s, 10s) so they do not pulse in sync.

For full SVG code for each shape, read `shapes.md`.

---

## Background textures (tiling SVG patterns)

Subtle repeating patterns applied as `background-image`, dots, crosshatches, waves, paper grain. Like paper grain on a printed page: adds depth without drawing attention.

**When to use:** Any flat section, especially ones without accent shapes. Stats bars, FAQ, service areas, footers, mid-page CTAs.

### Texture categories

| Category | Feel | Opacity range |
|---|---|---|
| **Dot grids** | Clean, modern | 0.03-0.06 |
| **Crosshatches** | Crafted, artisanal | 0.02-0.05 |
| **Wave patterns** | Flowing, organic | 0.03-0.05 |
| **Paper grain** | Tactile, warm | Applied via SVG filter |
| **Blueprint lines** | Technical, precise | 0.04-0.08 |
| **Topographic contours** | Natural, earthy | 0.03-0.06 |

### Implementation

```css
.textured-section {
  background-color: #f8f9fa; /* base color */
  background-image: url("data:image/svg+xml,..."); /* inline SVG pattern */
  background-size: 20px 20px; /* tile size */
}
```

Tile size matters. Small tiles (8-16px) read as noise. Medium tiles (20-40px) read as texture. Large tiles (60-120px) read as pattern. Pick based on how prominent you want the texture to feel.

For full SVG texture code, read `textures.md`.

---

## Section dividers

SVG shapes that bridge between two sections, usually waves, curves, or angled slopes. They turn hard section boundaries into soft transitions.

### When to use

Section dividers are **only** for transitions between a light-background section and a dark-background section (or vice versa). They exist to make the light-to-dark contrast feel intentional and carved rather than abrupt.

**Use a divider between:**
- hero (light) → services (dark)
- services (light) → testimonials (dark)
- about (light) → mid-CTA (dark)
- any other light-to-dark or dark-to-light boundary

**Do NOT use a divider between:**
- Two sections that share a base color (light → light, dark → dark). Just let the section padding do the work.
- Two sections whose backgrounds differ by tone but not contrast (e.g., `--putty` to `--paper` — these are sibling light values). Dividers on same-family transitions look decorative and pointless.

### How many per page

**Maximum 3 section dividers per page.** More than that and the dividers become the site's most visible design language instead of supporting the contrast rhythm. Pick your 2-3 most important light-dark transitions and divider only those.

### Placement rule: divider always lives INSIDE the DARK section, filled with the LIGHT color

This is counter-intuitive but critical. Place the SVG divider inside the DARK section (either its top or its bottom, depending on transition direction), fill the shape with the LIGHT color (matching the adjacent light section), and let the dark section's texture flow around the light-colored wavy shape.

**Why not the reverse.** If you put the divider inside the light section filled with the dark color, the shape becomes a flat-colored rectangle with a wavy cut. The flat portion of that rectangle has NO texture, so it appears as a plain dark band stripping across the page — visibly different from the textured dark section next to it. Visitors read it as a broken color gap.

Placing the divider inside the DARK section with a LIGHT fill eliminates the artifact: the dark section's texture flows uninterrupted right up to the wavy edge of the light shape. No un-textured band ever appears.

### Implementation

**Light section above, dark section below:**

```html
<section class="light-above">...</section>
<section class="dark-below">
  <svg class="sdiv sdiv-top" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true">
    <!-- flat top (aligns with light section above), wavy bottom (eats into dark) -->
    <!-- fill MUST be the hex of your palette's light section, not #F2E9D8 verbatim -->
    <path d="M0,0 L1440,0 L1440,40 C1080,80 360,0 0,40 Z" fill="var(--section-light)"/>
  </svg>
  <!-- content ... -->
</section>
```

**Dark section above, light section below:**

```html
<section class="dark-above">
  <!-- content ... -->
  <svg class="sdiv sdiv-bottom" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true">
    <!-- wavy top (eats upward into dark), flat bottom (aligns with light section below) -->
    <!-- fill MUST be the hex of your palette's light section, not #FBF6EA verbatim -->
    <path d="M0,0 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="var(--section-light)"/>
  </svg>
</section>
<section class="light-below">...</section>
```

**Shared CSS:**

```css
.sdiv{position:absolute; left:0; width:100%; height:clamp(40px, 5vw, 80px); display:block; pointer-events:none; z-index:2}
.sdiv-top{top:-1px}
.sdiv-bottom{bottom:-1px}
/* -1px offset defeats sub-pixel seams at the section boundary. */
```

The dark section needs `position:relative; overflow:hidden`. Dark sections that get a divider on both sides (trapped between two light sections) can carry BOTH `.sdiv-top` and `.sdiv-bottom` with different light fills matching each neighbor.

**Fill color must match the adjacent light section exactly.** Use the CSS var or hex, not an approximation. A close-but-wrong color creates a visible seam.

### Style rules

- One divider style per site. Waves or angles or ragged edges, not a mix.
- Height clamped 40-90px. Taller dividers become their own design element, which is a choice you can make but usually do not want.
- `preserveAspectRatio="none"` lets the SVG stretch to full width.
- `bottom:-1px` instead of `bottom:0` to defeat sub-pixel seams.
- No drop-shadows on the divider. The contrast between the two section backgrounds is the depth.

---

## Shapes vs textures vs dividers, side by side

These are DIFFERENT systems and they coexist:

- **Accent shapes** float behind content within a section, decorative
- **Textures** apply to section backgrounds, subtle pattern
- **Dividers** bridge between sections, structural

You can layer all three in a single section. A hero can have a textured background, two accent shapes floating behind the headline, and a wave divider connecting it to the services section below.

---

## Every section earns either a texture OR a large corner accent shape

Every `<section>` (including hero, about, area, faq, mid-CTA, contact, plus any custom sections) must have at least ONE of:

- **A background texture** (grid, weave, grain, blueprint lines — rendered via `::before` or `::after`), OR
- **A large corner accent shape** (280-500px wide SVG placed in one of the four corners, opacity ~.55-.75, behind the content)

If a section has neither, it reads as unfinished empty space. Sections with dense imagery (services bento, testimonials with glass cards) can skip the corner accent because the content itself carries visual weight — but they should still have a texture.

### Large corner accent spec

```css
.corner-accent{position:absolute; pointer-events:none; z-index:0; opacity:.6}
.corner-accent.tr{top:-80px; right:-120px; width:clamp(280px, 30vw, 460px)}
.corner-accent.br{bottom:-100px; right:-100px; width:clamp(280px, 32vw, 500px)}
.corner-accent.bl{bottom:-120px; left:-140px; width:clamp(280px, 30vw, 460px)}
.corner-accent.tl{top:-90px; left:-120px; width:clamp(260px, 28vw, 440px)}
/* Section content needs z-index:1 to stay above the accent */
.hero > .wrap, .about > .wrap{position:relative; z-index:1}
```

### Corner rotation + shape family rotation

Across a multi-section page, vary BOTH the corner placement AND the shape family. If hero has a solid blob in top-right, the next un-textured section should have a line-based shape in a different corner (e.g., orbit rings bottom-left). This supports the 50/50 line-vs-solid rule and prevents all four accents from clustering in the same corner.

**Target distribution across 4 un-textured sections:**
- 2 line-based, 2 solid
- 4 different corners (TR, BL, BR, TL — one each is ideal)
- No two adjacent un-textured sections with the same corner or same shape family

---

## Balanced distribution of line and solid accent shapes

A page with only line-based accents (orbit rings, concentric circles, dashed dots, hairline arcs) reads as uniformly spindly and loses visual rhythm. A page with only solid shapes (filled blobs, polygons, filled circles) reads heavy and bloblike. A premium page uses roughly equal parts of both.

**Line-based accents** (feels: architectural, precise, refined):
- Orbit rings (nested `<circle fill="none" stroke="...">`)
- Concentric arcs
- Dashed dot orbits
- Hairline polygons (triangles, diamonds)
- Crosshatch patches
- Wave paths

**Solid accents** (feels: grounded, confident, dimensional):
- Blob paths with `fill="..."`
- Filled polygons
- Filled offset circles
- Tile grids
- Soft radial gradient "spots"

**Target ratio:** across all accent shapes on the page, aim for 50/50 line vs solid. If you have 10 accent shapes total, 5 should be line-based and 5 should be solid. Distribute them so no 3 consecutive sections use the same family. Mix shape families too (don't use orbit rings in 4 different sections — vary: orbit ring here, dashed dot there, hairline polygon elsewhere).

**Organic flowing lines** (curved `<path>` strokes that feel hand-drawn, e.g. soft S-curves, meandering splines) pair well on "artisan" or "process" sections and count as line accents. Use at least one on a page that needs warmth.

Before shipping, list every decorative SVG on the page and label it `line` or `solid`. If the ratio is 80/20 or worse, swap at least two accents to balance.

---

## Dark contrast bands get texture, always

Any dark-background section (trust strip, testimonials, mid-CTA, inquiry, footer) should carry at least one texture layer on top of its radial-gradient color field. Without texture, dark bands read flat and cheap. The radial gradient alone is not enough.

Cheap, high-impact textures that layer cleanly on dark backgrounds. The `rgba(...)` values below are illustrative; swap the tint channel to match your chosen palette family — cool-corporate use `rgba(230,240,255,...)`, forest/canvas use `rgba(210,230,215,...)`, saturated mustard use `rgba(255,240,200,...)`, saturated plum use `rgba(240,220,255,...)`:

```css
/* Grid */
.section::after{
  content:""; position:absolute; inset:0; pointer-events:none;
  background-image:
    repeating-linear-gradient(0deg, var(--texture-line) 0 1px, transparent 1px 14px),
    repeating-linear-gradient(90deg, var(--texture-line-soft) 0 1px, transparent 1px 14px);
  opacity:.7;
}

/* Diagonal weave */
.section::after{
  content:""; position:absolute; inset:0; pointer-events:none;
  background-image:
    repeating-linear-gradient(45deg, var(--texture-line) 0 1px, transparent 1px 9px),
    repeating-linear-gradient(-45deg, var(--texture-line-soft) 0 1px, transparent 1px 9px);
  opacity:.8;
}

/* Example token definitions — pick the family that fits your palette */
/* Cool corporate:    --texture-line: rgba(225,240,255,.05);  --texture-line-soft: rgba(225,240,255,.03);  */
/* Deep forest:       --texture-line: rgba(200,225,205,.05);  --texture-line-soft: rgba(200,225,205,.03);  */
/* Saturated mustard: --texture-line: rgba(255,235,180,.06);  --texture-line-soft: rgba(255,235,180,.035); */
/* Saturated plum:    --texture-line: rgba(240,210,255,.05);  --texture-line-soft: rgba(240,210,255,.03);  */
/* Natural sage:      --texture-line: rgba(215,225,210,.05);  --texture-line-soft: rgba(215,225,210,.03);  */
```

Use `::after` when `::before` is already carrying the color gradient so both layers compose cleanly. Keep total texture opacity under `.1` so it stays subtle.

---

## Footer always gets a background texture

The footer is the lowest-credibility section on the page. If it's flat solid ink with no visual treatment, it reads as an afterthought, and the rest of the site's polish gets retroactively cheapened by its last impression.

Always layer a subtle texture on the footer. Rename the token to whatever your dark color is — this example uses `--section-dark` for the ground and `--footer-text` for fine type:

```css
footer{
  background:var(--section-dark); color:var(--footer-text);
  position:relative; overflow:hidden;
}
footer::before{
  content:""; position:absolute; inset:0; pointer-events:none;
  background-image:
    repeating-linear-gradient(45deg, var(--texture-line) 0 1px, transparent 1px 11px),
    repeating-linear-gradient(-45deg, var(--texture-line-soft) 0 1px, transparent 1px 11px);
  opacity:.7;
}
footer > *{position:relative; z-index:1}
```

Diagonal weave or grid, <.1 opacity. The footer's content must bump its own z-index so it sits above the texture layer. Never ship a texture-less footer.

---

## Glassmorphism depth: go further than the default

The common mistake is glass cards with a flat border + single box-shadow. Reads as a paint-by-numbers implementation. Premium glass has *layered* depth. The rgba values below are illustrative — swap the tint channel to match your chosen palette family (see comment block below the snippet):

```css
.glass-card{
  background:linear-gradient(145deg, var(--glass-tint-strong), var(--glass-tint-soft));
  backdrop-filter:blur(22px) saturate(140%);
  border-radius:28px;
  /* No border. The shadow stack does the edge work. */
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,.12),        /* top edge highlight */
    inset 0 -1px 0 rgba(0,0,0,.25),              /* bottom edge shadow */
    0 30px 60px -30px rgba(0,0,0,.65),           /* deep cast shadow */
    0 10px 30px -15px var(--glass-accent-shadow); /* accent-color shadow, uses your primary brand accent */
}
.glass-card::before{
  content:""; position:absolute; inset:0; border-radius:inherit; pointer-events:none;
  background:linear-gradient(145deg, rgba(255,255,255,.14), transparent 55%);
  opacity:.6; mix-blend-mode:overlay;
}

/* Example tokens — pick ONE family */
/* Cool corporate (ivory tint):  --glass-tint-strong: rgba(235,245,255,.10);  --glass-tint-soft: rgba(235,245,255,.03);   --glass-accent-shadow: rgba(40,90,200,.22);   */
/* Deep canvas (pale sheen):     --glass-tint-strong: rgba(255,255,255,.07);  --glass-tint-soft: rgba(255,255,255,.02);   --glass-accent-shadow: rgba(200,160,60,.2);    */
/* Forest / sage (mint tint):    --glass-tint-strong: rgba(210,230,215,.10);  --glass-tint-soft: rgba(210,230,215,.03);   --glass-accent-shadow: rgba(80,140,90,.22);    */
/* Plum / oxblood (rose tint):   --glass-tint-strong: rgba(240,215,225,.09);  --glass-tint-soft: rgba(240,215,225,.03);   --glass-accent-shadow: rgba(130,40,60,.22);    */
/* Saturated mustard (warm):     --glass-tint-strong: rgba(255,235,180,.10);  --glass-tint-soft: rgba(255,235,180,.03);   --glass-accent-shadow: rgba(180,130,40,.22);   */
```

Four box-shadow layers (two inset edge highlights, one deep cast, one accent tint) plus a `::before` pseudo for the diagonal sheen. The border disappears because the inset highlights do the work. On a textured dark background, this reads as real glass, not a flat rectangle.

---

## Stats display: one treatment, not two

Pick ONE stats treatment between the hero and the services section. Not both. A past build put an inline `.hero-trust` row inside the hero (stars, review count, years in business, license number) AND a full-width `.strip` section immediately after the hero with the same numbers. The visitor scrolls two inches and sees the same four stats restated, which reads as padding and breaks the rhythm.

**Default: use the full-width trust strip** (dark contrast band right after hero with 3-4 columns). It gives stats their own visual moment, anchors the transition from hero to services, and accepts texture/decoration more generously than an in-hero row.

Only use an in-hero trust row instead if the site has zero other dark contrast bands and needs the stats close to the CTA for conversion priming.

Never do both.

Use the same rule for sidebar trust cards: if the trust strip shows review count, the inquiry-form sidebar should not restate it. One spot per number across the whole page is the target; two spots max in rare cases (e.g., a strip count + a footer count) where the distance is great enough that the repetition reads as reinforcement rather than redundancy. Three or more is a bug.

---

## Service-card section playbook

These rules apply to every services / features / "what we do" / pricing-tier section, anywhere a row of comparable offerings appears as a card grid. The principle: **the cards are siblings of one component, not six different components.** Express variety through two levers only: a rotating **background texture** and a rotating **palette color**. No decorative SVG accents, no icons, no corner shapes. The card's content (tag, heading, paragraph) is the foreground; texture + color is the entire background vocabulary.

**Why this matters:** A past build mixed five different card styles inside one services bento (full-bleed image+overlay, split with image right, solid-color text-only, top-photo/bottom-text on white, solid color with accent shape). The desktop grid felt energetic but the section read as six unrelated components, and on mobile, where the grid collapses to a single column, the inconsistency was unmissable. Separately, bento-style varied card sizes pulled the eye around the section instead of letting each service register equally.

### 1. One container recipe, applied uniformly

Pick one card recipe in step 2 (Plan) and reuse it exactly on every card. The recipe locks: background treatment, text placement (top vs bottom vs split), corner radius, shadow, and padding scale. Don't vary any of these card-to-card.

### 2. Uniform footprint — no bento sizing

Every card is the same size on desktop. Bento/kanban varied column/row spans are banned for service-card sections — varied sizes pull the eye around instead of letting services register equally. The one allowed exception: a single flagship/most-called-service card may receive ONE subtle differentiation (a palette pull to the primary accent color, a small "MOST CALLED" inline mark beside the service name, or one extra line of copy). Do NOT use a stacked eyebrow label on the card — eyebrows are banned site-wide per `CLAUDE.md`. No size variation. No footprint variation.

### 3. No stock photos, no SVG accents in card backgrounds

Service cards do not use photography as background, and they do not carry decorative SVG accents (no corner shapes, no floating marks, no icons, literal or abstract). Variety comes from two levers only: **background texture** (rule 3 below) and **palette color** (rule 4). Keeping the card chrome this quiet is what lets the service names themselves read as the strongest element on the section.

Each card gets a **rotating background texture** — a subtle repeating pattern that gives each card its own tactile surface without trying to depict the service. Don't map textures to literal meanings ("crosshatch because it looks like a grate"); pick textures for visual rhythm and pattern variety across the grid. Good pool:

- Fine dot grid
- Diagonal crosshatch (45° strokes)
- Horizontal bands of varied thickness
- Vertical channel lines
- Soft radial gradient (darker center or darker edge)
- Dense woven pattern
- Topographic contour lines
- Diagonal weave (two crossed crosshatches)
- Scattered tick marks

Rotate the texture so adjacent cards don't repeat. Textures are LOW contrast (8-15% over the card base color) so text stays fully legible. No photos in the card body. Photography lives in hero, about, or gallery sections.

### 4. Rotate palette across the grid

Don't overlay every card in the same color. Pull from the established palette and rotate so adjacent cards don't repeat. For a 6-card section with 3 palette colors, two of each, no neighbors matching, is the target. Texture + color rotation together is the entire visual language for this section — if it feels too quiet, let the typography and spacing do the lift; don't reach for accent shapes.

If you're tempted to introduce a new color just for one or two cards, don't — see rule 9.

### 5. Typographic hierarchy: tag is a label, heading is the subject

Three text elements per card, in this order:

1. **Gold all-caps tag** (small, ~0.7rem, letter-spaced ~0.22em): a category, qualifier, or attribute. Examples: "MOST-CALLED SERVICE", "SAME-DAY", "FULLY INSURED", "FREE ESTIMATE".
2. **Large serif heading** (~1.65 to 2.85rem, fluid clamp): the *subject* of the card, the service name itself. "Repairs", "Installs", "Maintenance".
3. **Body paragraph**: the description / what we actually do.

**Contrast rule:** Before committing the card color scheme, check that the heading color passes 4.5:1 contrast against the card background texture at its darkest pixel. A past build used dark serif headings over dark palette tints — the headings disappeared. Pair dark text with light-palette cards and light text with dark-palette cards. Don't split the difference with a mid-tone heading.

**Reading-order failure mode:** putting the subject in the small tag and the action in the large heading flips reading order (tag = "Main unit", heading = "Repair & Install" — eye lands on the action, subject gets lost). Reverse it: tag = "REPAIR & INSTALL", heading = the equipment or service name itself. The visitor's eye should land on the service name within a quarter-second.

### 6. Mobile: equal heights

When the grid collapses to a single column on mobile, force every card to the same height (around 240 to 280px depending on content density). Stacked cards of obviously different heights expose the variety as inconsistency.

### 7. Don't introduce a color that doesn't appear elsewhere

If you reach for a fourth palette color just to differentiate two cards (e.g. moss green for "eco" services), stop. A color that only appears in two cards and nowhere else on the site reads as a mistake, not a system. Either commit to that color and weave it into the rest of the page (process accents, footer tints, stat numbers), or drop it and redistribute the existing palette. Three colors held tightly beats four held loosely.

**How to check (run after step 4):**
- Screenshot the section at desktop. Are all cards identical in size and chrome?
- Screenshot the section at mobile single-column. Do all cards read as siblings of one component, equal height?
- Cover the gold tags. Does the eye land on the service-name heading first on every card?
- Check contrast: heading color passes 4.5:1 against the card's darkest texture pixel?
- Check the palette: is every color in the card rotation also visible somewhere else on the page?
- Check the cards for decoration: zero SVG accents, zero icons, zero corner shapes. The only background vocabulary is texture + color. If you see a decorative mark, remove it.
