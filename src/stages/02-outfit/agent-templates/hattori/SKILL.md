# HATTORI Writing Process

Five steps. Execute in order. Do not skip. Each step writes to disk. Each step reads the prior step from disk.

---

## Step 01: Inventory

**Purpose:** Audit what data you have before you decide anything.

**Read:**
- `../shared/dossier.json`
- `../shared/scoring.json`
- `../shared/enhanced-images.json` (if present)
- `memory/learnings.md` (if present)

**Write `output/inventory.md` covering:**

1. **Dossier richness rating.** RICH, MODERATE, or THIN. Drives how much creative freedom you have versus how much you have to lean on what little is real.
2. **Business identity facts.** Name, owner, city, state, phone(s), email, years in business, team size, license number. Note every null. For null `city`, validate against `service_area.primary_city`, the `website_url` slug, and `region_label` to land on the real city.
3. **Credentials.** License, certifications. Be explicit about what is verified versus what is implied.
4. **Services.** List the dossier services. Discard generic-sounding entries ("Service Establishment"). Pull additional services confirmed by review text (e.g., reviews mention a service even if it is not in the services list). Note which services are "real" (in dossier or reviews) versus "inferred" (added from vertical defaults).
5. **Reviews.** Total count, star distribution, average rating from `trust_signals` if present, and the count of reviews with a quality_score of 7 or higher (these are your pull-quote candidates).
6. **Best pull-quote candidates.** List the top 3-5 reviews with author, what makes them strong (named technician, specific detail, loyalty statement, competitor comparison), and the rough trim length.
7. **Headline mining.** Phrases from reviews or the business name itself that could become headlines. Quote them verbatim.
8. **Service area.** All cities. Note the primary city.
9. **Visual assets.** Real photos count from `enhanced-images.json`. Usually zero. Flag for the builder.
10. **AI synthesis fields from dossier.** persona_tag, pitch_angle, copy_hooks, warm_start_hints. Quote them so they are easy to reference in Step 02.
11. **What is missing.** Explicit list of nulls and gaps. This list reappears in the design brief as the "per-gap treatments" section in Step 04.

12. **Visitor & Job-to-Be-Done.** Load-bearing for the rest of the package. Three short passages:
    - *Who lands here.* One or two visitor archetypes: EMERGENCY (an urgent failure that needs help today), PLANNER (a project they've been putting off), MIXED. Cite dossier evidence (emergency signals in reviews, service types, geography, hours).
    - *What job they hired the search engine for.* A single sentence in the visitor's voice. "Find someone who can get out here today and stop this." "Find an honest pro before the project I've been putting off blows up."
    - *Customer-language problem list.* Mine the reviews for the words customers used to describe their problem BEFORE they praised the business. 4-6 phrases minimum, quoted verbatim where possible. These feed headline and service-block writing in Step 03. Panic + specificity wins over polish.

13. **Three strategic picks.** One line each, no essays:
    - Visitor archetype: EMERGENCY / PLANNER / MIXED.
    - Voice tone: default WARM-PROFESSIONAL; override only if reviews push elsewhere (see Step 02 for the full menu).
    - Testimonial posture: STRONG (3+ qualifying quotes), MODERATE (1-2), NONE.

**Self-check:** Could a colleague read this file alone and understand the prospect well enough to start writing? If no, expand. The Visitor & JTBD section is present and specific; the customer-language phrase list has at least four entries.

---

## Step 02: Strategy

**Purpose:** Decide the creative direction before writing any words.

**Read:**
- `output/inventory.md`
- `references/voice-and-style.md`

**Write `output/strategy.md` covering:**

1. **Headline angle.** Default stance is CUSTOMER-POV: lead with the visitor's problem, desired outcome, or experience (pull directly from the customer-language problem list in Step 01). Choose a BRAND-POV angle (OUTCOME, CREDENTIAL, LOCALITY, DIFFERENTIATOR, or URGENCY) only when a specific dossier fact outperforms the customer frame. Acceptable overrides are rare: peer-pro endorsements, unusual longevity, a singular credential. Cite the evidence when you override the default. Do not use an owner-narrative angle; owner-story leads violate the name-ban rule.
2. **Voice tone.** Pick one: CONVERSATIONAL-CONFIDENT, WARM-PROFESSIONAL, GRITTY-FRIENDLY, EXECUTIVE-AUTHORITATIVE, EMERGENCY-CALMING. Cite evidence.
3. **About section strategy.** Pick one: CUSTOMER-PROBLEM-FIRST (open with the visitor's pain), OWNER-STORY (open with the founder's narrative if data supports it), TEAM-REPUTATION (lead with named technicians and team energy), CREDENTIALS-FIRST (lead with longevity/license for trust-anchored positioning).
4. **Testimonial strategy.** STRONG (5+ qualifying reviews, lean heavy), MODERATE (2-4 qualifying reviews, use selectively), THIN (1 or fewer, supplement with stats), or NONE (skip testimonials section, lean on stats and credentials).
5. **Thin data tactics.** For each gap from inventory, name the tactic. No email → phone-only conversion. No hours → "call us" framing. No emergency signal → no emergency banner. No bonded/insured confirmation → say "Licensed" only. No owner story → skip biographical narrative. No images → flag for the builder.
6. **Hero narrative direction.** Two-to-three sentences capturing the story the builder needs to feel when reading the brief. This becomes raw material for the design brief's Business Identity and Vibe Direction sections.
7. **Emergency/urgency signals.** Does the dossier indicate 24/7 service, after-hours, same-day-only, or no urgency signal at all? Decision: emergency_banner enabled or disabled.
8. **SEO keyword targets.** 3-4 primary keywords (city + service combinations) and 3-4 secondary keywords. Pull from `dossier.warm_start_hints` if present.

**Self-check:** Every decision cites at least one dossier data point. No decision says "TBD" or "will figure out in next step."

---

## Step 03: Content Package

**Purpose:** Write every word of website copy as a set of tagged content blocks. The builder reads this and decides what becomes a section on the page, what folds together, what sits in the hero, and what goes in the footer. HATTORI does not pre-structure the site.

**Read:**
- `output/inventory.md`
- `output/strategy.md`
- `references/voice-and-style.md`
- `references/content-package-format.md` (the authoritative spec for topic tags, block structure, and worked examples)

**Write `output/copy-package.md`** as a sequence of tagged content blocks separated by horizontal rules (`---`). Every block begins with a single-line topic tag of the form `{topic: <type>, ...attributes}`. No `##` or `###` section headers anywhere. The only markdown header in the file is the top-level `# [Business Name] — Content Package` title.

Topic types, in the rough order a human reader would expect them (the builder does not use this order to structure the site):

- `business-summary` (1) — 2-3 paragraphs of sales context for the builder, not website copy
- `headline-candidates` (1) — exactly 3 headline options, each 8 words or fewer, at least one customer-POV, flag the preferred one, plus a subheadline direction
- `about-prose` (1) — 2-4 short paragraphs of customer-facing about copy
- `section-header` (1 block per likely page section, 2-3 candidates each) — H2 candidates for services, about, process, testimonials, faq, contact. Max 5 words, no terminal punctuation, specific to this business. Short, impactful, creative. Without these, the builder invents narrative-sentence H2s and the site reads as instructions instead of curated copy.
- `service` (3-8 blocks) — one block per service the business actually does
- `process-step` (2-5 blocks, or omit entirely) — one block per genuine step. **Do not pad to three.** Two-step honest beats three-step padded. If the business's process is "call and we come out," write it as 2 steps or skip `process-step` altogether and let the about-prose carry the mechanics.
- `testimonial` (2-5 blocks) — one block per quote, anonymized to first name + last initial
- `faq` (3-7 blocks) — one block per question, self-contained answers, include at least one objection-surfacing question
- `stat` (3-5 blocks) — one-line attribute form, no body content
- `cta` (2-3 blocks) — `role: primary`, `role: secondary`, plus `role: emergency` only if strategy enabled it
- `contact` (1) — phone, alternate phone, service-area sentence
- `seo` (1) — title (<60ch), description (<155ch), keyword list

Service count, testimonial count, FAQ count, and step count are all determined by what the business actually does and what the dossier supports. No fixed targets. Read `references/content-package-format.md` for the full vocabulary, attribute specs, and worked examples before writing.

**Self-check:**
- Every content block begins with a single-line topic tag on its first line.
- No `##` or `###` headers in the file other than the top-level title.
- `headline-candidates` has exactly THREE candidates. At least ONE is CUSTOMER-POV (leads with the visitor's problem, outcome, or experience, not business identity). Preferred flagged with `(preferred)`.
- Every headline candidate is 8 words or fewer. Hard cap. Hyphenated compounds count as one word ("same-day" = 1).
- No real person's name appears in any block except `testimonial`. Grep the dossier's owner name and any first names from review text; if they appear in body copy, rewrite to "the owner," "a licensed pro," "the team," or the brand name.
- About-prose opens with the visitor's situation, not the business's founding year or credentials. A single credibility line sits in paragraph 2 or 3, not in paragraph 1.
- Service blocks open with the customer situation in customer language (phrases from Step 01's JTBD list), then state what the business does about it.
- Process steps are written as customer action plus business response ("You call. A licensed pro shows up."). Never "[Name] answers the phone."
- `section-header` blocks exist for every non-hero section the business warrants. Each block has 2-3 candidates, each candidate is max 5 words, no terminal punctuation, passes the swap-test.
- Subheadline is one sentence, 12-20 words, customer outcome plus a single credibility trim. Not two sentences of credibility.
- `process-step` block count is honest. If forced to three by default, audit step 05 will catch it.
- `service` block count matches what the business genuinely does, not a fixed 5-7.
- Customer-facing prose uses contractions throughout (`you've` not "you have", `we'll` not "we will", `don't` not "do not", `can't` not "cannot"). Applies across `headline-candidates`, `about-prose`, `service`, `process-step`, `faq`, `cta`, `section-header`, and `contact`. Does not apply to `business-summary` or `seo`. Never rewrite review quotes inside `testimonial` blocks; those stay as the customer wrote them.
- Phone number does NOT appear inside `about-prose`, `service`, or `faq` blocks.
- License number does NOT appear in `headline-candidates` or `about-prose` blocks.
- No review counts written into any prose block. Counts live only in `stat` blocks.
- No em dashes anywhere.

---

## Step 04: Design Brief

**Purpose:** Hand the builder a single-file prompt with everything it needs to make great visual decisions for THIS specific prospect.

**Read:**
- `output/inventory.md`
- `output/strategy.md`
- `output/copy-package.md`
- `references/design-brief-format.md` (the authoritative spec for the 7-section format)

**Write `output/design-brief.md` following the 7-section format defined in `references/design-brief-format.md` exactly.**

The 7 sections, briefly:

1. **Business Identity** (~50 words). Who this business IS. Specific enough that swapping the name would break it.
2. **Primary Conversion Job** (~15 words). The action the visitor must take.
3. **Visitor State of Mind** (~60 words). Who lands here, what they feel, what brought them.
4. **Vibe Direction** (~100 words). Sensory prose plus 3-6 vibe tags.
5. **What the Site Must NOT Do** (3-5 bullets, ~60 words). Failure modes specific to this business.
6. **Hero Strategy Hint** (~20 words). Which of the builder's hero strategies the brief points toward.
7. **Production Context** (~20 words). Tier from scoring.json plus effort calibration.

Total brief length: 400-550 words. One page when printed. Read `references/design-brief-format.md` for the full spec, examples, and anti-patterns.

**Do NOT suggest reference templates.** The builder picks the template directly from vibe tags in Section 4 against `template-library.json`. Your job is to set the vibe clearly; the template pick is the builder's.

**Do NOT include content or asset pointers.** No filepath references, no "pull verbatim from copy-package.md", no photo-strategy instructions, no per-gap treatments. The copy package is handed to the builder separately. The builder decides photo strategy and gap treatments from the dossier.

**Self-check:**
- Every section is present.
- Section 4 ends with a `**Tags:**` list of 3-6 vibe adjectives.
- Section 6 picks one of: `split-type-with-photo`, `full-bleed-photographic` (match the template-library vocabulary exactly, including hyphens). Type-first / centered-type are retired.
- Section 6 includes the anti-repetition note required by `references/design-brief-format.md` if the prior 3 builds all landed on `split-type-with-photo`.
- Section 7 names the tier from scoring.json.
- No em dashes.
- No template ids named anywhere in the brief.
- No filepath references, no "copy-package.md" / "stock-photos" / "assets" mentions.

---

## Step 05: Audit

**Purpose:** Catch everything before the builder sees the work.

**Read:**
- `output/copy-package.md`
- `output/design-brief.md`

**Run these checks. Write `output/audit.md` documenting each.**

### Specificity checks
- Headline references something concrete (business name, years, named technician, specific service). Headline passes the substitution test (swapping the business name breaks it).
- Every service description contains a detail specific to this business.
- About section does not invent biographical claims not in the dossier.
- Stats trace to actual dossier data.

### Voice and style checks
- Read `references/voice-and-style.md` if you have not in this session.
- No banned words (delve, leverage, robust, comprehensive, cutting-edge, streamline, unlock, elevate, empower, seamless).
- No AI openers ("In today's...", "It's worth noting that...", "When it comes to...").
- No paragraphs longer than 3 sentences.
- One clear idea per paragraph.

### Em dash check
Search both files for the em dash character. If any are found, replace each with a comma, period, or "and" depending on context. Re-search to confirm zero remain.

### Real-name placement audit

Extract `dossier.owner_name` and any first names mentioned inside review text (the names attributed in review quotes are fine; names the reviewer wrote in prose about the business are the ones to grep). Search copy-package.md AND design-brief.md for each name. Any appearance outside a `{topic: testimonial, ...}` block is a violation.

**Allowed:** brand names, including brands that contain a person's name ("Jake's Plumbing," "Taylor Electric") used as a full phrase. Testimonial author attributes and names inside verbatim review quotes.

**Rewrite pattern:** replace with "the owner," "a licensed pro," "the team," or the brand name as a full phrase. Never shorten a brand name to a bare first name. "Jake's Plumbing fixes leaks" is fine; "Jake fixes leaks" is not.

### Headline POV audit

Read the `{topic: headline-candidates}` block. Classify each candidate:

- **CUSTOMER-POV:** leads with the visitor's state (problem, desired outcome, or experience).
- **BRAND-POV:** leads with the business (identity, credential, longevity, locality).

At least one candidate must be CUSTOMER-POV. If all three are BRAND-POV, rewrite one.

Also verify:
- Exactly three candidates. Not two, not four.
- Each candidate is 8 words or fewer. Hyphenated compounds count as one word.
- Exactly one is marked `(preferred)`.
- If the preferred is BRAND-POV, confirm the strategy file cites specific dossier evidence justifying the override.

### Phone number placement audit
Search for the phone number digits and the formatted version in copy-package.md. Confirm every instance is inside a `{topic: cta, ...}` or `{topic: contact}` block. Any appearance inside `about-prose`, `service`, `faq`, `testimonial`, or `headline-candidates` blocks is a violation. Fix.

### License number placement audit
Search for the license number in copy-package.md. Confirm every instance is inside a `{topic: contact}` block or a `{topic: faq}` block whose `question:` attribute is about licensing. Any appearance in `headline-candidates`, `about-prose`, `service`, or `stat` blocks is a violation. Fix.

### Review count placement audit
Search copy-package.md for the review count number and the star rating. Confirm both appear ONLY in `{topic: stat, ...}` blocks. If they appear in any prose block (`headline-candidates`, `about-prose`, `service`, `faq`, `testimonial`), that is a violation. Fix.

### Section-header audit
Search copy-package.md for any line starting with `##` (a markdown h2 or h3). The only markdown header allowed in the file is the single top-level `# [Business Name] — Content Package` line. Any `##` header is a regression to the old section-based format. Fix by converting to the appropriate `{topic: ...}` block.

### Section-header presence and voice audit
Confirm `{topic: section-header, for: ...}` blocks exist for every non-hero page section the business warrants. For each candidate line in each block, verify:

- word count is 5 or fewer (hard ceiling)
- no terminal punctuation (period, question mark, exclamation point)
- not a full sentence, not a meta-description ("short answers to...", "things worth knowing..."), not a process instruction ("call and describe...")
- not a generic label ("Our Services", "About Us", "Contact") without a specific twist
- passes the swap-test (would break if the business name were replaced with a competitor)
- flagged `(preferred)` on the candidate the builder should use first

Any violation: rewrite the offending candidate in place.

### Contractions audit
Grep copy-package.md for the uncontracted forms below across customer-facing blocks (`headline-candidates`, `about-prose`, `service`, `process-step`, `faq`, `cta`, `section-header`, `contact`). Replace each hit with its contracted form unless the contracted form is awkward or the surrounding sentence deliberately emphasizes the uncontracted phrasing. Skip `testimonial` blocks (review quotes stay as written) and skip `business-summary` and `seo` blocks.

- "you are" → "you're"
- "you have" → "you've"
- "you will" → "you'll"
- "you would" → "you'd"
- "we are" → "we're"
- "we have" → "we've"
- "we will" → "we'll"
- "it is" → "it's"
- "that is" → "that's"
- "there is" → "there's"
- "here is" → "here's"
- "do not" → "don't"
- "does not" → "doesn't"
- "did not" → "didn't"
- "cannot" / "can not" → "can't"
- "will not" → "won't"
- "would not" → "wouldn't"
- "should not" → "shouldn't"
- "is not" → "isn't"
- "are not" → "aren't"
- "was not" → "wasn't"
- "were not" → "weren't"

Any violation: rewrite in place. Log the count fixed in `audit.md`.

### Step-count honesty audit
Count the `{topic: process-step, ...}` blocks. If there are exactly three and the dossier's actual process is either simpler (2 steps) or richer (4-5 steps), that is a violation. The old format hardcoded three steps and the builder built three cards in a row every time. Re-read the dossier and set the step count to what the business actually does, or remove `process-step` blocks entirely and let `about-prose` carry the mechanics.

### Design brief specific checks
- Section 4 has a vibe tag list of 3-6 adjectives.
- No template ids named in the brief (the builder picks the template from vibe tags, not from HATTORI).
- Section 6 names one of the two live hero strategies: `split-type-with-photo`, `full-bleed-photographic`. Type-first / centered-type are retired and must never appear in Section 6.
- Section 6 does not default to `split-type-with-photo` without specific justification if recent prior briefs already used it. See the anti-repetition note in `references/design-brief-format.md`.
- Section 7 (Production context) names the tier from scoring.json.
- No filepath references in the brief (no "copy-package.md", "stock-photos", "assets", etc).

### Resolution log
For each issue found, list it under "What Needed Fixing" with the original problem and the fix applied. If nothing was found, state "No issues found, copy package and design brief ready for the builder."

---

## When in doubt

- **Specificity beats polish.** A specific real detail in rough prose beats a smooth sentence that could be any business.
- **Omit beats invent.** When data is missing, leave it out. Never fabricate.
- **Read your own work out loud.** If a sentence sounds like a chatbot wrote it, rewrite it.
- **The brief is a prompt for the builder.** If the builder would still need to ask "what vibe?" or "which template?" after reading your brief, you have not done your job.
