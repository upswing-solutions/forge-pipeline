# Content Package Format

HATTORI writes `output/copy-package.md` as a set of tagged content blocks, not as a markdown document with predefined `##` section headers.

This format exists because the old `## Headlines / ## About / ## What We Do / ## How It Works / ## Quick Facts / ...` template was priming the builder to build one HTML section per markdown header. Every site ended up with the same 9-section skeleton regardless of what the business actually needed. The topic-tag format surfaces the CONTENT and lets the builder decide the site structure.

---

## Shape

- The file starts with a top-level `# [Business Name] — Content Package` title.
- Everything below is a sequence of content blocks separated by `---` (horizontal rule).
- Every content block begins with a single-line topic tag of the form `{topic: <type>, ...attributes}`.
- The content follows the topic tag, separated by one blank line.
- No `##` or `###` headers anywhere. Topic tags are the only structural markers.

Example:

```markdown
# Example Local Services — Content Package

---

{topic: business-summary, audience: builder-only, not-website-copy}

Example Local Services is a local service company operating under a state trade license for nine years...

---

{topic: headline-candidates}

- Got a problem? We're on it today. (preferred)
- Same-day service in your area.
- The pro other pros call.

Subheadline direction: Same-day local service across the metro. Licensed and insured.
```

---

## Topic vocabulary

Each topic type labels WHAT the content is. It does not dictate where or whether the content ends up as a page section. The builder decides that.

### business-summary (exactly 1)

Sales context for the builder, not website copy. 2-3 short paragraphs capturing who this business is and why they are specific. Attributes: `audience: builder-only, not-website-copy`.

### headline-candidates (exactly 1)

A bullet list of exactly THREE headline options plus a subheadline direction. Fewer options reduce decision paralysis downstream (Hick's Law) and force commitment to the three strongest framings.

**Hard rules:**
- Exactly 3 candidates. Not 2, not 4.
- Each candidate is **8 words or fewer**. Hyphenated compounds count as one word ("same-day" = 1).
- At least ONE candidate must be CUSTOMER-POV (leads with the visitor's problem, desired outcome, or experience). See `voice-and-style.md` "The reader is the subject" for definitions.
- Remaining candidates MAY be CUSTOMER-POV, BRAND-POV, or hybrid. Variety is encouraged so the builder has real alternatives.
- No candidate may contain a real person's name. Brand names fine; owner or employee first or last names forbidden.
- Flag the preferred candidate with `(preferred)` at the end of the line.
- If the preferred is BRAND-POV, the strategy file must contain a one-line dossier citation justifying the override.

**Subheadline direction** follows the candidate list on a line prefixed `Subheadline direction:`. One sentence, 12-20 words, leads with customer outcome, closes with one credibility trim. Never two sentences of credibility.

**Example:**

```markdown
{topic: headline-candidates}

- Got a problem? We're on it today. (preferred)
- Same-day service in your area.
- The pro other pros call.

Subheadline direction: Same-day service across the metro and surrounding towns. Licensed and insured.
```

### about-prose (exactly 1)

2-4 short paragraphs of actual customer-facing prose. Each paragraph 3 sentences or fewer. This is raw about material; the builder may use all of it, part of it, or fold it into other sections. Do not pre-structure it into sub-headings.

### section-header (1 block per likely section, 2-3 candidates each)

Every non-hero section the builder is likely to build needs a header. Do NOT leave the builder to improvise them — the failure mode is the builder writing descriptive full-sentence H2s ("Short answers to the things worth knowing before the phone rings.") that read like narration rather than curated headline copy.

One block per candidate section. The topic tag carries a `for:` attribute naming the section type (`services`, `about`, `process`, `testimonials`, `faq`, `contact`, or `trust` for stat strips). Provide 2-3 candidates per section so the builder can pick the one that sits best with the chosen template and layout. Flag the preferred option with `(preferred)`.

```markdown
{topic: section-header, for: services}

- Calls We Take (preferred)
- What We Fix
- Jobs We Show Up For

---

{topic: section-header, for: about}

- The Shop (preferred)
- One Pro, On Call

---

{topic: section-header, for: process}

- How the Call Goes (preferred)
- From Phone to Fixed

---

{topic: section-header, for: faq}

- Before You Call (preferred)
- The Usual Questions
```

Write only the sections the business warrants. If there are only 2 services, you probably still want a services header. If there is no process-step content, do not write a process header. If there is exactly one testimonial, skip the testimonials header and let the builder fold it into the hero or about.

Header voice rules:

- **Max 5 words. Hard ceiling.** Shorter is stronger. 2-3 words is often best.
- **Short, impactful, creative.** Generic ("Our Services", "About Us") fails.
- **No terminal punctuation.** No periods, no question marks, no em dashes (they are banned anyway), no exclamation points. Headers are labels, not sentences.
- **Specific to this business.** Swap-test: if the header could sit on a competitor's site unchanged, rewrite it. "What We Do" fails the test. "Calls We Take Today" passes (or any candidate that cites this business's verbs, geography, or vibe).
- **Contractions apply.** Same rule as every other block; see `voice-and-style.md`.
- **Not meta-descriptive.** Banned framings include "Short answers to...", "Everything you need to know about...", "The things worth knowing before...". Describe the section's content, not the fact that you wrote it.
- **Not a process instruction.** Do NOT write "Call and describe what is happening" as a section header (that is a step title, not a section header). Section headers frame the section; step titles label the step.
- **Optional subhead.** If a section benefits from a one-line subhead beneath the header, write it after the candidate list, prefixed with `Subhead direction:`. Same length discipline (≤ 15 words), same voice rules, may be a full sentence.

### service (3-8 blocks, one per service)

One block per service. The topic tag carries a `name:` attribute. Content is 2-3 sentences.

**Open with the customer situation in customer language** (use the phrases mined in inventory's Visitor & JTBD section from Step 01). Then state what the business does. Never use the owner's or a technician's name; the subject is "we," the brand name, or "a licensed pro."

```markdown
{topic: service, name: "Repair and Replacement"}

It quit overnight, it's leaking, or it's time to replace a twenty-year unit. We handle complex installs and straightforward swap-outs. You'll know what's wrong before the quote, and the quote before the work.
```

Pick the service count based on what the business actually does. Discard generic entries that the dossier does not support. Do not pad to a fixed count.

### process-step (2-5 blocks, or omit entirely)

One block per step. The topic tag carries a `step:` number and a `title:` attribute. Content is 1-2 sentences.

```markdown
{topic: process-step, step: 1, title: "Call or request a visit"}

You call the number or send a note. We schedule the visit, usually for the same day or the next morning.
```

**The step count must be honest.** If the business's process is really "call and we come out," write it as 2 steps (call, work happens on site) or omit process-step blocks entirely and let the `about-prose` carry the mechanics. Do not force a three-step process because three is the chatbot default. A 2-step honest answer beats a 3-step padded one, and 4-5 steps are fine when the business genuinely has that many distinct phases (e.g., inspection, quote, permit, install, follow-up).

### testimonial (2-5 blocks)

One block per testimonial. The topic tag carries an `author:` attribute. Content is a 2-4 sentence quote, anonymized to first name + last initial. Only use 5-star reviews from the dossier.

```markdown
{topic: testimonial, author: "Kathy W."}

They were recommended by a neighbor. The pro I usually call couldn't come for six weeks. This team came within a day and determined my problem very quickly.
```

### faq (3-7 blocks)

One block per question. The topic tag carries a `question:` attribute. Content is a 2-3 sentence self-contained answer that makes sense without the question being shown.

```markdown
{topic: faq, question: "How soon can you come out?"}

We schedule most service calls for the same day or the next morning. Call the office and we will tell you exactly when a technician can be at your door.
```

Include at least one objection-surfacing question like "What if the estimate is more than I expected?"

### stat (3-5 blocks)

One block per stat, all attributes on the tag line, no body content.

```markdown
{topic: stat, label: "Years in Business", value: "9+"}
{topic: stat, label: "Google Reviews", value: "1,200+"}
{topic: stat, label: "Average Rating", value: "4.8★"}
{topic: stat, label: "Cities Served", value: "10"}
```

Stats may appear on one line or with the full horizontal-rule separator between each; either is valid.

### cta (2-3 blocks)

One block per CTA. The topic tag carries a `role:` attribute (`primary`, `secondary`, `emergency`). Content is the CTA copy itself.

```markdown
{topic: cta, role: primary}

Call (555) 123-4567

---

{topic: cta, role: secondary}

Schedule a Visit
```

Only include `role: emergency` if the strategy enabled an emergency banner.

### contact (exactly 1)

Phone, alternate phone (if any), email (if in dossier), hours (if in dossier), and a service-area sentence naming the cities.

```markdown
{topic: contact}

Phone: (555) 123-4567
Alternate phone: (555) 765-4321

Serving the metro area and surrounding towns.
```

### seo (exactly 1)

Title (under 60 chars), description (under 155 chars), keyword list. One line each.

```markdown
{topic: seo}

Title: Example Local Services | Metro Pro | 4.8★
Description: Same-day and next-day service across the metro area. Licensed and insured, upfront quotes, clean work.
Keywords: metro service pro, local service company, same-day service, ...
```

---

## Ordering

The rough order above (business-summary first, SEO last) is a reading convenience, not a structural requirement. The builder does not build sections in the order HATTORI writes blocks. Group related blocks together for the sake of the human reader.

---

## What NOT to do

- Do not write `## Services`, `## About`, `## FAQ`, or any `##` header. Topic tags replace section headers entirely.
- Do not pre-structure `about-prose` into sub-headings or bullet lists unless the content genuinely is a list.
- Do not pad `service` blocks to 5-7 if the business only does 3. Honest count beats filled grid.
- Do not pad `process-step` to 3. Two-step honest, four-step honest, five-step honest, or no process-step blocks at all are all valid.
- Do not repeat the same fact across blocks expecting the builder to render it twice. One fact, one home.
- Do not write anything that is not in the topic vocabulary above. If you think the business needs content that does not fit one of the types, flag it in `audit.md` rather than inventing a new tag.
- Do not write the owner's or any employee's real name in any block except `testimonial`. Brand name as a full phrase only. See `voice-and-style.md` for rewrite patterns.
- Do not produce 2 or 4 headline candidates. Exactly 3.
- Do not exceed 8 words on any headline candidate. Hyphenated compounds count as one word.
- Do not lead `about-prose` with a credibility statement or the business's founding year. Lead with the customer's situation.

---

## Why this format

The goal is to hand the builder a bag of labeled content and let it decide site structure. Old format baked the site skeleton into the copy package: every `## Header` became a rendered section, every `1./2./3.` became a 3-card grid. Topic tags carry the same information (what kind of content this is) without the structural priming. The builder reads the content package, decides which content deserves its own section, which can fold together, which can sit in the hero, and which belongs in the footer.
