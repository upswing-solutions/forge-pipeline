# BARD Generation Process

Five steps. Execute in order. Do not skip. Each step writes state you can re-read. Stop if any validation step fails.

---

## Step 01: Load context

**Read:**
- `input/prospect-context.json` (required)
- `../shared/dossier.json` (optional but preferred)
- `../shared/scoring.json` (optional)
- `memory/learnings.md` (if present, skim only)

From `prospect-context.json` you will see a shape like this (field names illustrative):

```
{
  "prospect_id": 123,
  "slug": "example-business",
  "persona": "default",
  "cohort": 1,
  "approved": false,
  "merge_fields": {
    "owner_first_name": "Jordan",
    "business_name": "Example Services LLC",
    "license_year": 2019,
    "license_years": 7,
    "service_county": "Example",
    "rating": 4.6,
    "review_count": 11,
    "website_status": "none",
    "spec_site_url": "https://example-business.example.com"
  },
  "template_version": "v1.0.0"
}
```

**Self-check:** Confirm `persona` is present. Any unexpected value is a caller bug.

---

## Step 02: Validate required merge fields

The persona file lists which merge fields are REQUIRED. A typical required set is:

- `owner_first_name`
- `business_name`
- `license_year`
- `service_county`
- `spec_site_url`

If any required field is null, empty string, zero-when-a-positive-int-is-required, or otherwise invalid, halt. Do not write the output file. The caller handles the halt path by throwing `MergeFieldMissing` and dropping the prospect from the send queue.

Valid fields pass this check. Proceed to Step 03.

---

## Step 03: Render locked templates

Open the persona file at `personas/{persona}.md`. It contains locked templates, one per variant. Each has `{{field}}` placeholders.

For each variant (first touch, follow-up, onboarding, pre-call, post-call template, conditional check-in, and any lifecycle email variants):

1. Start from the verbatim template.
2. Substitute each `{{field}}` with the value from `prospect-context.json -> merge_fields`.
3. If the variant is a post-call template, leave its `{{change_1}}`, `{{change_2}}`, and `{{change_3}}` tokens unresolved. Those are filled later by the dashboard when the operator enters the post-call changes.
4. Never modify the template's prose outside the merge fields. The persona copy is locked. If a sentence feels stiff with the prospect's name substituted, that is the template author's problem, not yours.

After rendering, you should have one string per output key.

---

## Step 04: Self-audit each message

For every rendered message, run these checks in order. A failing check means you rewrite until the message passes, EXCEPT: if a persona template itself contains a banned word or em dash, do not rewrite. Flag it and stop. The template is the bug, not your output.

### 4.1 Em-dash check

Search each message for:
- the em-dash character (U+2014)
- the two-hyphen-space substitute ` -- `
- the three-hyphen sequence `---` if mid-sentence

Zero allowed. Replace with commas, periods, or `and`.

### 4.2 Banned-word check

Case-insensitive grep for the full banned-vocabulary list in `references/language-map.md` (agency-speak and marketing jargon). Zero allowed in any variant. If a rendered message trips one, stop and investigate. The persona file is probably at fault.

### 4.3 First-message character-count check

Measure the first message's length after merge. It must be within the cap defined in `references/copy-rules.md`. If the rendered first message is over the cap, you cannot ship. Halt. This usually means the prospect's name or business name is unusually long. The caller handles the halt path.

### 4.4 Plan/tier-name check

Search every message for internal plan or tier names. Zero allowed.

### 4.5 Price-in-first-message check

Search the first message for any dollar figure or digit-adjacent `$`. Zero allowed in the first touch.

### 4.6 Real-name check

Search every message EXCEPT the first touch and follow-up for fabricated customer names (e.g., "a happy customer named ..."). The cold touches legitimately reference the prospect's own first name. Other variants may use the prospect's first name once at the start. No other names should appear.

### 4.7 Meta-language check

Search every message for self-referential agency phrases ("we use ...", "our platform", "our technology"). Zero allowed.

If all checks pass for all strings, proceed to Step 05.

---

## Step 05: Write output

Write `output/outreach-drafts.json` with exactly the keys defined in `CLAUDE.md`. No extra keys. No comments. Valid JSON.

After writing, re-read the file from disk and run the Step 04 checks one more time against the serialized content. Paranoia pays. If anything fails on re-read, overwrite and re-verify.

---

## When in doubt

- **Persona templates are locked copy.** Your job is to merge fields correctly and audit the output, not to workshop the prose.
- **Omit beats invent.** If a merge field is missing, halt. Never fabricate a substitute.
- **Trust the rules file.** `references/copy-rules.md` beats the persona file when they disagree.
- **The dashboard gates sending.** Your output is drafts, not sends. Even a perfect run does not dispatch anything until the operator flips the approval flag.
