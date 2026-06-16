# Shape SVG Templates

All shapes use placeholder tokens. Before pasting into HTML, replace:

- `{{PRIMARY}}` → site's main brand color (e.g., `#1B7BE9`)
- `{{ACCENT}}` → site's highlight/secondary color (e.g., `#FFE227`)

Or use CSS variables directly: replace `{{PRIMARY}}` with `var(--color-primary)` etc. CSS variables work in inline SVG embedded directly in HTML.

Each shape has a default size. Scale by changing the `width` and `height` attributes.

---

## solidCircle

Large filled circle. Partially clipped by overflow:hidden for a color wash effect.

```svg
<svg width="320" height="320" viewBox="0 0 320 320" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="160" cy="160" r="160" fill="{{ACCENT}}" opacity="0.18"/>
</svg>
```

---

## solidCircleStrong

Same as solidCircle but higher opacity. Use when you want one bold anchor shape.

```svg
<svg width="280" height="280" viewBox="0 0 280 280" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="140" cy="140" r="140" fill="{{ACCENT}}" opacity="0.3"/>
</svg>
```

---

## halfCircle

Semi-circle. Good for anchoring a bottom edge or creating a horizon line.

```svg
<svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M200,100 A100,100 0 0,1 0,100" fill="{{ACCENT}}" opacity="0.15"/>
</svg>
```

---

## orbitRings

Concentric circles, the "Jupiter" effect. The signature shape of this system.

```svg
<svg width="300" height="300" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="150" cy="150" r="60" stroke="{{PRIMARY}}" stroke-width="1.5" opacity="0.2" fill="none"/>
  <circle cx="150" cy="150" r="95" stroke="{{PRIMARY}}" stroke-width="1.5" opacity="0.15" fill="none"/>
  <circle cx="150" cy="150" r="130" stroke="{{PRIMARY}}" stroke-width="1.5" opacity="0.1" fill="none"/>
  <circle cx="150" cy="150" r="148" stroke="{{PRIMARY}}" stroke-width="1" opacity="0.07" fill="none"/>
</svg>
```

---

## squiggleRing

Wavy-edged circle outline. Organic feel, pairs well with orbit rings.

```svg
<svg width="260" height="260" viewBox="0 0 260 260" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M130,10 C155,15 170,5 185,20 C200,35 210,55 215,75 C220,95 230,110 240,130 C250,150 245,170 235,185 C225,200 215,220 195,230 C175,240 155,250 130,250 C105,250 85,240 65,230 C45,220 35,200 25,185 C15,170 10,150 20,130 C30,110 40,95 45,75 C50,55 60,35 75,20 C90,5 105,15 130,10 Z" stroke="{{PRIMARY}}" stroke-width="1.8" opacity="0.18" fill="none"/>
</svg>
```

---

## dottedOrbit

16 dots arranged in a circle. Astronomical, particle-like.

```svg
<svg width="240" height="240" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="208.0" cy="120.0" r="4" fill="{{PRIMARY}}" opacity="0.15"/>
  <circle cx="193.6" cy="154.9" r="2.5" fill="{{PRIMARY}}" opacity="0.19"/>
  <circle cx="161.7" cy="181.7" r="2.5" fill="{{PRIMARY}}" opacity="0.23"/>
  <circle cx="120.0" cy="192.0" r="4" fill="{{PRIMARY}}" opacity="0.15"/>
  <circle cx="78.3" cy="181.7" r="2.5" fill="{{PRIMARY}}" opacity="0.19"/>
  <circle cx="46.4" cy="154.9" r="2.5" fill="{{PRIMARY}}" opacity="0.23"/>
  <circle cx="32.0" cy="120.0" r="4" fill="{{PRIMARY}}" opacity="0.15"/>
  <circle cx="46.4" cy="85.1" r="2.5" fill="{{PRIMARY}}" opacity="0.19"/>
  <circle cx="78.3" cy="58.3" r="2.5" fill="{{PRIMARY}}" opacity="0.23"/>
  <circle cx="120.0" cy="48.0" r="4" fill="{{PRIMARY}}" opacity="0.15"/>
  <circle cx="161.7" cy="58.3" r="2.5" fill="{{PRIMARY}}" opacity="0.19"/>
  <circle cx="193.6" cy="85.1" r="2.5" fill="{{PRIMARY}}" opacity="0.23"/>
  <circle cx="205.5" cy="109.0" r="4" fill="{{PRIMARY}}" opacity="0.15"/>
  <circle cx="198.0" cy="140.0" r="2.5" fill="{{PRIMARY}}" opacity="0.19"/>
  <circle cx="175.0" cy="170.0" r="2.5" fill="{{PRIMARY}}" opacity="0.23"/>
  <circle cx="140.0" cy="189.0" r="4" fill="{{PRIMARY}}" opacity="0.15"/>
</svg>
```

---

## dashedRing

Two concentric dashed circles. Technical, instrumentation feel.

```svg
<svg width="220" height="220" viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="110" cy="110" r="80" stroke="{{PRIMARY}}" stroke-width="2" stroke-dasharray="12 8" opacity="0.15" fill="none"/>
  <circle cx="110" cy="110" r="105" stroke="{{PRIMARY}}" stroke-width="1.5" stroke-dasharray="8 12" opacity="0.1" fill="none"/>
</svg>
```

---

## spiralSwoosh

Three curved arcs suggesting upward motion or a spiral path.

```svg
<svg width="280" height="280" viewBox="0 0 280 280" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M60,220 C60,120 120,60 200,60" stroke="{{PRIMARY}}" stroke-width="2" opacity="0.15" stroke-linecap="round" fill="none"/>
  <path d="M80,240 C80,130 140,40 240,40" stroke="{{PRIMARY}}" stroke-width="1.5" opacity="0.1" stroke-linecap="round" fill="none"/>
  <path d="M40,200 C40,110 100,80 160,80" stroke="{{PRIMARY}}" stroke-width="1" opacity="0.08" stroke-linecap="round" fill="none"/>
</svg>
```

---

## crossScatter

Six small + marks scattered randomly. Adds sprinkle-like energy.

```svg
<svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g opacity="0.12"><line x1="34" y1="30" x2="46" y2="30" stroke="{{PRIMARY}}" stroke-width="1.5" stroke-linecap="round"/><line x1="40" y1="24" x2="40" y2="36" stroke="{{PRIMARY}}" stroke-width="1.5" stroke-linecap="round"/></g>
  <g opacity="0.17"><line x1="114" y1="50" x2="126" y2="50" stroke="{{PRIMARY}}" stroke-width="1.5" stroke-linecap="round"/><line x1="120" y1="44" x2="120" y2="56" stroke="{{PRIMARY}}" stroke-width="1.5" stroke-linecap="round"/></g>
  <g opacity="0.22"><line x1="64" y1="130" x2="76" y2="130" stroke="{{PRIMARY}}" stroke-width="1.5" stroke-linecap="round"/><line x1="70" y1="124" x2="70" y2="136" stroke="{{PRIMARY}}" stroke-width="1.5" stroke-linecap="round"/></g>
  <g opacity="0.12"><line x1="154" y1="110" x2="166" y2="110" stroke="{{PRIMARY}}" stroke-width="1.5" stroke-linecap="round"/><line x1="160" y1="104" x2="160" y2="116" stroke="{{PRIMARY}}" stroke-width="1.5" stroke-linecap="round"/></g>
  <g opacity="0.17"><line x1="24" y1="170" x2="36" y2="170" stroke="{{PRIMARY}}" stroke-width="1.5" stroke-linecap="round"/><line x1="30" y1="164" x2="30" y2="176" stroke="{{PRIMARY}}" stroke-width="1.5" stroke-linecap="round"/></g>
  <g opacity="0.22"><line x1="144" y1="170" x2="156" y2="170" stroke="{{PRIMARY}}" stroke-width="1.5" stroke-linecap="round"/><line x1="150" y1="164" x2="150" y2="176" stroke="{{PRIMARY}}" stroke-width="1.5" stroke-linecap="round"/></g>
</svg>
```

---

## blob

Soft amorphous fill shape. The most organic option.

```svg
<svg width="300" height="300" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M150,30 C210,30 270,70 280,140 C290,210 240,270 170,280 C100,290 40,250 25,180 C10,110 90,30 150,30Z" fill="{{ACCENT}}" opacity="0.1"/>
</svg>
```

---

## gridDots

5×5 grid of small dots with varying opacity. Subtle texture.

```svg
<svg width="180" height="180" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="20" cy="20" r="2.5" fill="{{PRIMARY}}" opacity="0.1"/>
  <circle cx="55" cy="20" r="2.5" fill="{{PRIMARY}}" opacity="0.15"/>
  <circle cx="90" cy="20" r="2.5" fill="{{PRIMARY}}" opacity="0.1"/>
  <circle cx="125" cy="20" r="2.5" fill="{{PRIMARY}}" opacity="0.15"/>
  <circle cx="160" cy="20" r="2.5" fill="{{PRIMARY}}" opacity="0.1"/>
  <circle cx="20" cy="55" r="2.5" fill="{{PRIMARY}}" opacity="0.15"/>
  <circle cx="55" cy="55" r="2.5" fill="{{PRIMARY}}" opacity="0.1"/>
  <circle cx="90" cy="55" r="2.5" fill="{{PRIMARY}}" opacity="0.15"/>
  <circle cx="125" cy="55" r="2.5" fill="{{PRIMARY}}" opacity="0.1"/>
  <circle cx="160" cy="55" r="2.5" fill="{{PRIMARY}}" opacity="0.15"/>
  <circle cx="20" cy="90" r="2.5" fill="{{PRIMARY}}" opacity="0.1"/>
  <circle cx="55" cy="90" r="2.5" fill="{{PRIMARY}}" opacity="0.15"/>
  <circle cx="90" cy="90" r="2.5" fill="{{PRIMARY}}" opacity="0.1"/>
  <circle cx="125" cy="90" r="2.5" fill="{{PRIMARY}}" opacity="0.15"/>
  <circle cx="160" cy="90" r="2.5" fill="{{PRIMARY}}" opacity="0.1"/>
  <circle cx="20" cy="125" r="2.5" fill="{{PRIMARY}}" opacity="0.15"/>
  <circle cx="55" cy="125" r="2.5" fill="{{PRIMARY}}" opacity="0.1"/>
  <circle cx="90" cy="125" r="2.5" fill="{{PRIMARY}}" opacity="0.15"/>
  <circle cx="125" cy="125" r="2.5" fill="{{PRIMARY}}" opacity="0.1"/>
  <circle cx="160" cy="125" r="2.5" fill="{{PRIMARY}}" opacity="0.15"/>
  <circle cx="20" cy="160" r="2.5" fill="{{PRIMARY}}" opacity="0.1"/>
  <circle cx="55" cy="160" r="2.5" fill="{{PRIMARY}}" opacity="0.15"/>
  <circle cx="90" cy="160" r="2.5" fill="{{PRIMARY}}" opacity="0.1"/>
  <circle cx="125" cy="160" r="2.5" fill="{{PRIMARY}}" opacity="0.15"/>
  <circle cx="160" cy="160" r="2.5" fill="{{PRIMARY}}" opacity="0.1"/>
</svg>
```

---

## angularBrackets

Three layered chevron/bracket shapes. Code-like, technical.

```svg
<svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M40,60 L80,100 L40,140" stroke="{{PRIMARY}}" stroke-width="2" opacity="0.12" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  <path d="M100,40 L140,80 L100,120" stroke="{{PRIMARY}}" stroke-width="1.5" opacity="0.09" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  <path d="M140,80 L180,120 L140,160" stroke="{{PRIMARY}}" stroke-width="1" opacity="0.06" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
</svg>
```

---

## tidalWaves

Three sinusoidal lines. Water/ocean/flow energy.

```svg
<svg width="320" height="200" viewBox="0 0 320 200" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M0,100 C40,60 80,60 120,100 C160,140 200,140 240,100 C280,60 320,60 360,100" stroke="{{PRIMARY}}" stroke-width="1.8" opacity="0.14" fill="none"/>
  <path d="M0,130 C40,90 80,90 120,130 C160,170 200,170 240,130 C280,90 320,90 360,130" stroke="{{PRIMARY}}" stroke-width="1.4" opacity="0.1" fill="none"/>
  <path d="M0,70 C40,30 80,30 120,70 C160,110 200,110 240,70 C280,30 320,30 360,70" stroke="{{PRIMARY}}" stroke-width="1" opacity="0.07" fill="none"/>
</svg>
```

---

## zigzagLine

Three parallel zigzag lines. Electric, sharp energy.

```svg
<svg width="260" height="260" viewBox="0 0 260 260" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M20,200 L60,160 L100,200 L140,160 L180,200 L220,160 L260,200" stroke="{{ACCENT}}" stroke-width="2" opacity="0.13" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  <path d="M20,170 L60,130 L100,170 L140,130 L180,170 L220,130 L260,170" stroke="{{ACCENT}}" stroke-width="1.4" opacity="0.09" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  <path d="M20,230 L60,190 L100,230 L140,190 L180,230 L220,190 L260,230" stroke="{{ACCENT}}" stroke-width="1" opacity="0.06" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
</svg>
```

---

## diamond

Nested rotated squares forming a diamond. Crystalline, precise.

```svg
<svg width="220" height="220" viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="60" y="60" width="100" height="100" rx="4" transform="rotate(45 110 110)" stroke="{{ACCENT}}" stroke-width="1.8" opacity="0.15" fill="none"/>
  <rect x="75" y="75" width="70" height="70" rx="3" transform="rotate(45 110 110)" stroke="{{ACCENT}}" stroke-width="1.2" opacity="0.1" fill="none"/>
  <rect x="90" y="90" width="40" height="40" rx="2" transform="rotate(45 110 110)" fill="{{ACCENT}}" opacity="0.06"/>
</svg>
```

---

## dotCloud

20 randomly scattered dots of varying sizes. Particle field.

```svg
<svg width="280" height="280" viewBox="0 0 280 280" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="40" cy="80" r="1.5" fill="{{PRIMARY}}" opacity="0.07"/>
  <circle cx="90" cy="30" r="2.7" fill="{{PRIMARY}}" opacity="0.10"/>
  <circle cx="150" cy="60" r="1.5" fill="{{PRIMARY}}" opacity="0.13"/>
  <circle cx="210" cy="40" r="3.9" fill="{{PRIMARY}}" opacity="0.07"/>
  <circle cx="250" cy="90" r="1.5" fill="{{PRIMARY}}" opacity="0.10"/>
  <circle cx="60" cy="150" r="2.7" fill="{{PRIMARY}}" opacity="0.13"/>
  <circle cx="130" cy="130" r="1.5" fill="{{PRIMARY}}" opacity="0.07"/>
  <circle cx="200" cy="140" r="3.9" fill="{{PRIMARY}}" opacity="0.10"/>
  <circle cx="240" cy="170" r="1.5" fill="{{PRIMARY}}" opacity="0.13"/>
  <circle cx="80" cy="210" r="2.7" fill="{{PRIMARY}}" opacity="0.07"/>
  <circle cx="160" cy="200" r="1.5" fill="{{PRIMARY}}" opacity="0.10"/>
  <circle cx="220" cy="220" r="3.9" fill="{{PRIMARY}}" opacity="0.13"/>
  <circle cx="30" cy="250" r="1.5" fill="{{PRIMARY}}" opacity="0.07"/>
  <circle cx="130" cy="250" r="2.7" fill="{{PRIMARY}}" opacity="0.10"/>
  <circle cx="190" cy="260" r="1.5" fill="{{PRIMARY}}" opacity="0.13"/>
  <circle cx="260" cy="250" r="3.9" fill="{{PRIMARY}}" opacity="0.07"/>
  <circle cx="50" cy="40" r="2.7" fill="{{PRIMARY}}" opacity="0.10"/>
  <circle cx="170" cy="20" r="1.5" fill="{{PRIMARY}}" opacity="0.13"/>
  <circle cx="100" cy="100" r="3.9" fill="{{PRIMARY}}" opacity="0.07"/>
  <circle cx="200" cy="100" r="1.5" fill="{{PRIMARY}}" opacity="0.10"/>
</svg>
```

---

## parallelLines

Six evenly spaced vertical lines. Structural, column-like.

```svg
<svg width="240" height="240" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
  <line x1="30" y1="20" x2="30" y2="220" stroke="{{PRIMARY}}" stroke-width="1.2" opacity="0.12" stroke-linecap="round"/>
  <line x1="66" y1="20" x2="66" y2="220" stroke="{{PRIMARY}}" stroke-width="1.1" opacity="0.105" stroke-linecap="round"/>
  <line x1="102" y1="20" x2="102" y2="220" stroke="{{PRIMARY}}" stroke-width="1.0" opacity="0.09" stroke-linecap="round"/>
  <line x1="138" y1="20" x2="138" y2="220" stroke="{{PRIMARY}}" stroke-width="0.9" opacity="0.075" stroke-linecap="round"/>
  <line x1="174" y1="20" x2="174" y2="220" stroke="{{PRIMARY}}" stroke-width="0.8" opacity="0.06" stroke-linecap="round"/>
  <line x1="210" y1="20" x2="210" y2="220" stroke="{{PRIMARY}}" stroke-width="0.7" opacity="0.045" stroke-linecap="round"/>
</svg>
```

---

## hexCluster

Four interlocking hexagons. Molecular, honeycomb, scientific.

```svg
<svg width="240" height="240" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
  <polygon points="105,49.7 135,49.7 150,75.7 135,101.7 105,101.7 90,75.7" stroke="{{PRIMARY}}" stroke-width="1.5" opacity="0.14" fill="none"/>
  <polygon points="65,109.7 95,109.7 110,135.7 95,161.7 65,161.7 50,135.7" stroke="{{PRIMARY}}" stroke-width="1.5" opacity="0.11" fill="none"/>
  <polygon points="145,109.7 175,109.7 190,135.7 175,161.7 145,161.7 130,135.7" stroke="{{PRIMARY}}" stroke-width="1.5" opacity="0.11" fill="none"/>
  <polygon points="105,169.7 135,169.7 150,195.7 135,221.7 105,221.7 90,195.7" stroke="{{PRIMARY}}" stroke-width="1.2" opacity="0.08" fill="none"/>
</svg>
```

---

## arcFan

Three concentric quarter-circle arcs. Radiating from a corner.

```svg
<svg width="260" height="260" viewBox="0 0 260 260" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M130,260 A130,130 0 0,1 0,130" stroke="{{PRIMARY}}" stroke-width="1.8" opacity="0.15" fill="none"/>
  <path d="M130,260 A100,100 0 0,1 30,160" stroke="{{PRIMARY}}" stroke-width="1.4" opacity="0.11" fill="none"/>
  <path d="M130,260 A70,70 0 0,1 60,190" stroke="{{PRIMARY}}" stroke-width="1" opacity="0.08" fill="none"/>
</svg>
```

---

## starBurst

12 lines radiating from center at varying lengths. Radial energy.

```svg
<svg width="240" height="240" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
  <line x1="150" y1="120" x2="210" y2="120" stroke="{{ACCENT}}" stroke-width="1.2" opacity="0.08" stroke-linecap="round"/>
  <line x1="145" y1="133" x2="193" y2="162" stroke="{{ACCENT}}" stroke-width="1.2" opacity="0.11" stroke-linecap="round"/>
  <line x1="133" y1="145" x2="155" y2="195" stroke="{{ACCENT}}" stroke-width="1.2" opacity="0.14" stroke-linecap="round"/>
  <line x1="120" y1="150" x2="120" y2="225" stroke="{{ACCENT}}" stroke-width="1.2" opacity="0.08" stroke-linecap="round"/>
  <line x1="107" y1="145" x2="72" y2="199" stroke="{{ACCENT}}" stroke-width="1.2" opacity="0.11" stroke-linecap="round"/>
  <line x1="95" y1="133" x2="47" y2="162" stroke="{{ACCENT}}" stroke-width="1.2" opacity="0.14" stroke-linecap="round"/>
  <line x1="90" y1="120" x2="15" y2="120" stroke="{{ACCENT}}" stroke-width="1.2" opacity="0.08" stroke-linecap="round"/>
  <line x1="95" y1="107" x2="47" y2="78" stroke="{{ACCENT}}" stroke-width="1.2" opacity="0.11" stroke-linecap="round"/>
  <line x1="107" y1="95" x2="85" y2="45" stroke="{{ACCENT}}" stroke-width="1.2" opacity="0.14" stroke-linecap="round"/>
  <line x1="120" y1="90" x2="120" y2="15" stroke="{{ACCENT}}" stroke-width="1.2" opacity="0.08" stroke-linecap="round"/>
  <line x1="133" y1="95" x2="168" y2="41" stroke="{{ACCENT}}" stroke-width="1.2" opacity="0.11" stroke-linecap="round"/>
  <line x1="145" y1="107" x2="193" y2="78" stroke="{{ACCENT}}" stroke-width="1.2" opacity="0.14" stroke-linecap="round"/>
</svg>
```

---

## cornerTriangle

Large triangle filling a corner. Creates a strong geometric plane.

```svg
<svg width="300" height="300" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M0,0 L300,0 L0,300 Z" fill="{{ACCENT}}" opacity="0.08"/>
</svg>
```

---

## ringSlice

Pie-wedge shape with an arc outline. Directional, like a spotlight cone.

```svg
<svg width="260" height="260" viewBox="0 0 260 260" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M130,130 L260,50 A150,150 0 0,1 260,210 Z" fill="{{PRIMARY}}" opacity="0.07"/>
  <path d="M130,130 L250,70 A130,130 0 0,1 250,190 Z" stroke="{{PRIMARY}}" stroke-width="1" opacity="0.1" fill="none"/>
</svg>
```
