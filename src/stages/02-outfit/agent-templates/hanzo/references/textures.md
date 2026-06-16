# Background Textures Reference

Subtle tiling SVG patterns applied as `background-image` on sections. These use inline data URIs, zero external requests, works everywhere.

## Texture Drift Animations

Inject once alongside the accent shape keyframes in `implementation.md`:

```css
/* === TEXTURE DRIFT ANIMATIONS === */
@keyframes drift-right  { from { background-position: 0 0; } to { background-position: 200px 0; } }
@keyframes drift-left   { from { background-position: 0 0; } to { background-position: -200px 0; } }
@keyframes drift-up     { from { background-position: 0 0; } to { background-position: 0 -200px; } }
@keyframes drift-down   { from { background-position: 0 0; } to { background-position: 0 200px; } }
@keyframes drift-diag   { from { background-position: 0 0; } to { background-position: 200px 200px; } }
@keyframes drift-diag-rev { from { background-position: 0 0; } to { background-position: -200px 200px; } }

@media (prefers-reduced-motion: reduce) {
  .stats, .features, .services, .about, .process,
  .testimonials, .service-area, .faq, .contact, .footer {
    animation: none !important;
  }
}
```

Adjust the selector list in the `prefers-reduced-motion` block to match the actual class names on the site.

## How to Apply a Texture

Replace the section's `background` shorthand with `background-color` + `background-image`:

```css
/* BEFORE */
.stats { background: #F6F7F9; }

/* AFTER, with texture + optional drift */
.stats {
  background-color: #F6F7F9;
  background-image: url("data:image/svg+xml,...");
  animation: drift-left 70s linear infinite;  /* optional */
}
```

## Color Tokens in Textures

Textures use URL-encoded hex values inside the SVG data URI:

- `%23000` = `#000` (black, for light section backgrounds)
- `%23fff` = `#fff` (white, for dark section backgrounds)
- `%23` + hex value = any brand color (e.g., `%231B7BE9` for `#1B7BE9`)

To change a texture's color, find the `stroke='%23000'` or `fill='%23000'` in the data URI and replace with the desired URL-encoded hex.

---

## Textures for Light Sections

Use these on white or light gray backgrounds. Stroke/fill color: `%23000` (black) at low opacity.

---

### 1. micro-dots

Evenly spaced tiny dots. Paper-like tactility, extremely versatile.

**Best for:** Any light section, cards, stats bars, FAQ

```css
background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16'%3E%3Ccircle cx='8' cy='8' r='0.6' fill='%23000' opacity='0.07'/%3E%3C/svg%3E");
```

Suggested drift: `drift-left 70s` or none

---

### 2. diagonal-pinstripe

Ultra-fine angled lines. Adds subtle directionality.

**Best for:** Hero overlays, trust sections, feature grids

```css
background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Cpath d='M-1,1 l2,-2 M0,8 l8,-8 M7,9 l2,-2' stroke='%23000' stroke-width='0.5' opacity='0.04'/%3E%3C/svg%3E");
```

Suggested drift: `drift-diag 85s` or none

---

### 3. chevron-zigzag

Repeating V-shapes pointing upward. Clean, modern energy.

**Best for:** Features section, trust bar, light content areas

```css
background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='20'%3E%3Cpath d='M0,16 L12,6 L24,16' fill='none' stroke='%23000' stroke-width='0.5' opacity='0.035'/%3E%3C/svg%3E");
```

Suggested drift: `drift-up 90s`

---

### 4. outlined-triangles

Small outlined triangles in a grid. Geometric, technical.

**Best for:** Services section, process/steps

```css
background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='28'%3E%3Cpath d='M14,4 L24,24 L4,24 Z' fill='none' stroke='%23000' stroke-width='0.45' opacity='0.035'/%3E%3C/svg%3E");
```

Suggested drift: `drift-diag 85s`

---

### 5. plus-grid

Small + symbols in a grid. Clean, professional.

**Best for:** FAQ section, light content areas

```css
background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24'%3E%3Cpath d='M12,9 L12,15 M9,12 L15,12' stroke='%23000' stroke-width='0.6' opacity='0.045' stroke-linecap='round'/%3E%3C/svg%3E");
```

Suggested drift: `drift-diag-rev 90s` or none

---

### 6. staggered-brick

Offset horizontal dashes. Subtle architectural rhythm.

**Best for:** Stats bar, light content sections

```css
background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='12'%3E%3Cline x1='2' y1='3' x2='10' y2='3' stroke='%23000' stroke-width='0.6' opacity='0.05' stroke-linecap='round'/%3E%3Cline x1='12' y1='9' x2='18' y2='9' stroke='%23000' stroke-width='0.6' opacity='0.05' stroke-linecap='round'/%3E%3C/svg%3E");
```

Suggested drift: `drift-left 70s`

---

### 7. dashed-circles

Dashed concentric circles. Cross-section / target feel.

**Best for:** Process section, mechanical or technical sites

```css
background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='44' height='44'%3E%3Ccircle cx='22' cy='22' r='8' fill='none' stroke='%23000' stroke-width='0.5' opacity='0.035' stroke-dasharray='3 3'/%3E%3Ccircle cx='22' cy='22' r='17' fill='none' stroke='%23000' stroke-width='0.4' opacity='0.025' stroke-dasharray='4 4'/%3E%3C/svg%3E");
```

Suggested drift: `drift-right 65s`

---

### 8. fish-scale

Overlapping arcs creating a scallop pattern. Organic yet structured.

**Best for:** Service area, about section

```css
background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='36' height='18'%3E%3Cpath d='M0,18 A18,18 0 0,1 18,0 A18,18 0 0,1 36,18' fill='none' stroke='%23000' stroke-width='0.45' opacity='0.04'/%3E%3C/svg%3E");
```

Suggested drift: `drift-up 80s`

---

### 9. asterisk-scatter

Small 8-pointed asterisk marks. Sparkle-like.

**Best for:** FAQ section, light content areas

```css
background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20'%3E%3Cpath d='M10,6 L10,14 M6,10 L14,10 M7,7 L13,13 M13,7 L7,13' stroke='%23000' stroke-width='0.35' opacity='0.035' stroke-linecap='round'/%3E%3C/svg%3E");
```

Suggested drift: `drift-diag-rev 90s`

---

### 10. honeycomb

Hexagonal grid. Technical, precise.

**Best for:** Services section, process/steps, engineering sites

```css
background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='48'%3E%3Cpath d='M14,0 L28,0 L35,12 L28,24 L14,24 L7,12 Z' fill='none' stroke='%23000' stroke-width='0.5' opacity='0.04'/%3E%3Cpath d='M42,24 L56,24 L63,36 L56,48 L42,48 L35,36 Z' fill='none' stroke='%23000' stroke-width='0.5' opacity='0.04'/%3E%3Cpath d='M-14,24 L0,24 L7,36 L0,48 L-14,48 L-21,36 Z' fill='none' stroke='%23000' stroke-width='0.5' opacity='0.04'/%3E%3C/svg%3E");
```

Suggested drift: none (static works best for hexagons)

---

## Textures for Dark Sections

Use these on black, dark gray, navy, or dark brand-colored backgrounds. Stroke/fill color: `%23fff` (white) at very low opacity.

---

### 11. fine-crosshatch

Overlapping diagonal lines forming an X pattern. Industrial.

**Best for:** Dark testimonials, contact forms, dark about sections

```css
background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12'%3E%3Cpath d='M0,0 l12,12' stroke='%23fff' stroke-width='0.4' opacity='0.04'/%3E%3Cpath d='M12,0 l-12,12' stroke='%23fff' stroke-width='0.4' opacity='0.04'/%3E%3C/svg%3E");
```

Suggested drift: `drift-diag 60s`

---

### 12. diamond-lattice

Rotated squares forming a diamond mesh. Architectural.

**Best for:** Footer, dark testimonials, dark CTA sections

```css
background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20'%3E%3Crect x='5' y='5' width='10' height='10' transform='rotate(45 10 10)' fill='none' stroke='%23fff' stroke-width='0.4' opacity='0.035'/%3E%3C/svg%3E");
```

Suggested drift: `drift-left 75s`

---

### 13. scattered-constellation

Randomly placed dots of varying sizes. Starfield effect.

**Best for:** Dark hero overlays, dark about sections

```css
background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Ccircle cx='8' cy='6' r='0.9' fill='%23fff' opacity='0.05'/%3E%3Ccircle cx='28' cy='22' r='0.6' fill='%23fff' opacity='0.04'/%3E%3Ccircle cx='16' cy='34' r='0.5' fill='%23fff' opacity='0.035'/%3E%3Ccircle cx='36' cy='10' r='0.7' fill='%23fff' opacity='0.04'/%3E%3C/svg%3E");
```

Suggested drift: `drift-diag 80s`

---

### 14. topographic-flow

Flowing contour lines. Water/terrain movement.

**Best for:** Dark hero sections, dark testimonials, especially flowing/organic brands

```css
background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Cpath d='M0,40 Q20,20 40,40 T80,40' fill='none' stroke='%23fff' stroke-width='0.6' opacity='0.06'/%3E%3Cpath d='M0,55 Q20,35 40,55 T80,55' fill='none' stroke='%23fff' stroke-width='0.6' opacity='0.06'/%3E%3Cpath d='M0,25 Q20,5 40,25 T80,25' fill='none' stroke='%23fff' stroke-width='0.6' opacity='0.06'/%3E%3Cpath d='M0,70 Q20,50 40,70 T80,70' fill='none' stroke='%23fff' stroke-width='0.6' opacity='0.06'/%3E%3Cpath d='M0,10 Q20,-10 40,10 T80,10' fill='none' stroke='%23fff' stroke-width='0.6' opacity='0.06'/%3E%3C/svg%3E");
```

Suggested drift: `drift-right 55s`

---

### 15. basket-weave

Alternating horizontal/vertical dashes in a checkerboard offset.

**Best for:** Contact section, dark footer

```css
background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16'%3E%3Cpath d='M0,4 L8,4 M4,0 L4,8' stroke='%23fff' stroke-width='0.5' opacity='0.04'/%3E%3Cpath d='M8,12 L16,12 M12,8 L12,16' stroke='%23fff' stroke-width='0.5' opacity='0.04'/%3E%3C/svg%3E");
```

Suggested drift: `drift-diag 60s`

---

### 16. circuit-trace

Stepped right-angle paths. Technical, PCB-like.

**Best for:** Dark footer, contact section, tech sites

```css
background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Cpath d='M0,20 L10,20 L10,10 L30,10 L30,20 L40,20' fill='none' stroke='%23fff' stroke-width='0.4' opacity='0.03'/%3E%3Cpath d='M20,0 L20,10' fill='none' stroke='%23fff' stroke-width='0.4' opacity='0.03'/%3E%3Cpath d='M20,40 L20,30 L30,30 L30,40' fill='none' stroke='%23fff' stroke-width='0.4' opacity='0.03'/%3E%3C/svg%3E");
```

Suggested drift: `drift-left 75s`

---

### 17. sine-wave

Smooth sinusoidal curve. Flowing, continuous.

**Best for:** Dark testimonials, dark CTA bands, especially flow-oriented brands

```css
background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='28'%3E%3Cpath d='M0,14 C15,4 30,4 45,14 C60,24 75,24 90,14 C105,4 120,14 120,14' fill='none' stroke='%23fff' stroke-width='0.5' opacity='0.045'/%3E%3C/svg%3E");
```

Suggested drift: `drift-right 55s`

---

## Textures for Accent-Colored Sections

Use these on sections with the site's accent/brand color as background. Stroke color: `%23000` (black) at low opacity.

---

### 18. wave-ripple

Concentric circles. Water ripple / radio wave.

**Best for:** Yellow/gold CTA bands, accent about sections

```css
background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Ccircle cx='30' cy='30' r='10' fill='none' stroke='%23000' stroke-width='0.4' opacity='0.06'/%3E%3Ccircle cx='30' cy='30' r='18' fill='none' stroke='%23000' stroke-width='0.4' opacity='0.06'/%3E%3Ccircle cx='30' cy='30' r='26' fill='none' stroke='%23000' stroke-width='0.4' opacity='0.06'/%3E%3C/svg%3E");
```

Suggested drift: none (static ripples feel intentional)

---

### 19. water-drops

Teardrop outlines. Liquid / fluid brand tie-in.

**Best for:** Accent CTA bands on cleaning, water-related, or fluid-themed sites

```css
background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='36'%3E%3Cpath d='M16,6 Q21,18 16,28 Q11,18 16,6 Z' fill='none' stroke='%23000' stroke-width='0.5' opacity='0.055'/%3E%3C/svg%3E");
```

Suggested drift: `drift-down 75s`

---

### 20. conduit-grid

Rounded right-angle connectors. Conduit / joint pattern.

**Best for:** Accent sections on mechanical or technical-trade sites

```css
background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48'%3E%3Cpath d='M12,0 L12,12 Q12,24 24,24 L48,24' fill='none' stroke='%23000' stroke-width='0.8' opacity='0.04' stroke-linecap='round'/%3E%3Cpath d='M36,48 L36,36 Q36,24 24,24' fill='none' stroke='%23000' stroke-width='0.8' opacity='0.04' stroke-linecap='round'/%3E%3C/svg%3E");
```

Suggested drift: `drift-right 65s`
