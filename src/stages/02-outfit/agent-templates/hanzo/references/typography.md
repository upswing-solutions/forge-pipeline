# Typography

Rules for display type, headlines, and any other typographic element that carries weight on the page. Read at step 2 (Plan) for any section with a headline. This file evolves over time; add rules as builds surface new failure modes.

---

## Hero headline: 2-3 lines max, never a single-word line

The hero headline is the single biggest typographic element on the page, and wrapping mistakes are immediately visible. Two hard rules:

1. **Never more than 3 lines.** A 4-line hero headline reads as sprawl and pushes the CTAs below the fold on mobile. If your draft breaks to 4 lines at your target desktop width, rework. Options: shorten the copy, reduce hero font-size clamp max, tighten the `<br>` structure, or use `text-wrap:balance` to let the browser distribute words evenly.
2. **Never a single word on a line**, explicit or wrapped. Applies equally to forced `<br>` lines and to natural wrap points at responsive widths.

### Required CSS on every hero headline

```css
.hero-copy h1{
  text-wrap:balance;           /* browser redistributes words to avoid orphans */
  line-height:1;               /* or tighter — prevents excess vertical sprawl */
  font-size:clamp(2.2rem, 1.8rem + 3.5vw, 4.6rem);  /* cap max around 4.6rem */
}
```

Cap the hero font-size clamp max at ~4.6rem (74px). Going bigger (5.4rem+) looks dramatic in mockups but consistently breaks the 3-line rule on mid-width viewports (1280-1440px) when the middle line has 4+ words.

### Desktop-only `<br>` sculpting

When you do want explicit line breaks for deliberate headline rhythm on desktop, tag the `<br>` elements with a class and hide them below mobile breakpoint so mobile wraps naturally:

```html
<h1 class="display">
  Local pros<br class="brd">
  who get it <span style="white-space:nowrap"><em>done right</em></span><br class="brd">
  the first time.
</h1>
```

```css
@media (max-width: 760px){ .hero-copy h1 br.brd{display:none} }
```

This gives you: desktop renders 3 deliberate lines; mobile renders 2-3 natural lines that won't orphan words because `text-wrap:balance` is on.

### Mental simulation before shipping

For every hero headline, simulate three viewport widths:

- **Desktop 1440px** — target 3 lines, each line with 2+ words, emphasis `<em>` word not alone.
- **Tablet 820px** — target 2-3 lines.
- **Mobile 375px** — target 2-3 lines (desktop-only `<br>` removed), no single-word lines.

If any one width produces a 4+ line headline or a single-word line, fix before shipping.

---

## Headline line breaks: never orphan any word, ever

Two rules. Both apply to hero headlines, sub-headlines, mid-CTA headlines, and any other multi-line display type.

**Rule 1: Never end a line on a connector word.** Subordinating conjunctions (who, that, which, when, where, while, because) and prepositions (of, in, at, for, with, on, from, to) create a dangling orphan when they end a line.

**Rule 2: Never leave a single word alone on a visual line.** This applies to both explicit `<br>` splits and natural wrapping at narrow viewports. If an `<em>` emphasized word lands at the end of an explicit line, responsive wrapping at common breakpoints can strand the emphasis word on its own line as viewport width decreases. The eye reads single-word lines as bugs even when the whole layout is deliberate.

**The technique for emphasis words:** wrap the `<em>` plus its nearest neighbor in a `<span style="white-space:nowrap">` so the emphasis word never wraps alone.

**Bad:**
```
Local pros<br>
who get it done <em>right</em><br>
the first time.
```
(At narrow viewport, `right` wraps to its own line and looks orphaned.)

**Good:**
```
Local pros<br>
who get it <span style="white-space:nowrap"><em>done right</em></span><br>
the first time.
```

**Good (alternate — reshape so emphasis lands mid-line with neighbors):**
```
Local pros who get it<br>
done <em>right</em> the first time.
```

Verify by mentally simulating the headline at three viewport widths: desktop 1440px, tablet 820px, mobile 375px. If any word is alone on its line at any width, rework it.

When in doubt, remove the `<br>` entirely and let the browser wrap naturally.

---

## Eyebrows: hero trust chip only, nothing else

The only eyebrow permitted on the site is the **hero trust chip row** above the H1: a short, factual, dot- or comma-separated string of credibility marks (city, license #, years licensed, "family-owned since YYYY"). Class it `hero-eyebrow`. Everything else — `section-eyebrow`, `step-eyebrow`, `form-eyebrow`, `process-eyebrow`, `about-eyebrow`, `trust-eyebrow`, `service-eyebrow`, `mono-eyebrow`, `kicker`, and every variant — is banned. See the hard rule in `CLAUDE.md`.

Section headers carry their own weight via the H2 + accent-word treatment plus the deck/subhead beneath it. If a section truly needs an inline marker (a numeral, an icon), put it inline with the H2, not stacked above it as a label.

The hero trust chip is great credibility on desktop and wasted vertical space on mobile (under 760px it pushes the headline and CTAs below the fold). Always hide it under 760px:

```css
@media (max-width: 760px){ .hero-copy .hero-eyebrow{display:none} }
```

The content in the chip should already appear elsewhere (trust strip, about section, hero subheadline), so hiding it on mobile costs zero information and saves ~70px of above-the-fold real estate.

---

## Write headlines like a person, not a press release

Contractions in headlines and subheadlines, always. "That's the job" beats "That is the job." "We'll take care of it" beats "We will take care of it." "Here's how" beats "Here is how." The contracted version sounds like an owner's voice; the expanded version sounds like an AI draft.

Expand contractions only inside body prose when the rhythm calls for it, or in legal/formal copy. Headlines, sub-headlines, the hero trust chip, and CTAs default to contractions.

---

## CTAs with label + number: stack them, not inline

When a CTA pills together a small uppercase label ("CALL FOR SAME-DAY ESTIMATE") with a phone number ("(555) 123-4567"), always render them stacked (`display:flex; flex-direction:column;`), label on top in small caps, number below in display serif. A past build let the inner text span default to `display:inline`, so the label and number ran on one line as a cramped sentence. The stacked version reads like a card, not a run-on.
