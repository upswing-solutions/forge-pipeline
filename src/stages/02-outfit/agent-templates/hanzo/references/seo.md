# SEO Reference

Read this at step 3 (Scaffold) when building the `<head>` block, and again at step 6 (Ship) as a final checklist.

---

## Head tag checklist

Every site needs all of these. Missing any one is a ship-blocker.

```html
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <title>Business Name | Primary Descriptor</title>
  <meta name="description" content="One sentence value prop with the single most important keyword and a hint of specificity. Under 155 characters.">

  <link rel="canonical" href="https://<slug>.example.com/">

  <!-- Open Graph -->
  <meta property="og:type" content="website">
  <meta property="og:title" content="Business Name | Primary Descriptor">
  <meta property="og:description" content="Same or tighter version of the meta description.">
  <meta property="og:image" content="https://<slug>.example.com/og-image.png">
  <meta property="og:url" content="https://<slug>.example.com/">
  <meta property="og:site_name" content="Business Name">

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Business Name | Primary Descriptor">
  <meta name="twitter:description" content="Same or tighter version of the meta description.">
  <meta name="twitter:image" content="https://<slug>.example.com/og-image.png">

  <!-- Favicon -->
  <link rel="icon" href="/favicon.ico">
</head>
```

**Rules:**
- `<title>` under 60 characters. Format: `[Business Name] | [Descriptor]` or `[Business Name], [Descriptor]`.
- Meta description under 155 characters. Lead with value, not with "Welcome to" or "We are".
- **Canonical and `og:url` always point to your own staging/preview URL**, not the prospect's real business domain. Pattern: `https://<slug>.example.com/` where `<slug>` is the workspace folder name (the directory this builder folder sits inside). This is critical: messaging apps and mobile browsers' share sheets read `og:url` and `canonical` to decide what URL to display in link previews. If either points at the prospect's real domain, your staged preview gets replaced by the prospect's existing (usually ugly) site in the preview card. You can find the slug by looking at the parent directory of your working folder.
- **`og:image` and `twitter:image`** use the same staging-relative path (`https://<slug>.example.com/og-image.png`). The real image URL gets patched in at approval time by downstream tooling, so you can write the staging-relative value as a placeholder. It will be overwritten.
- OG image should be 1200x630 minimum. Downstream tooling captures your hero at 1200x630 post-approval, so design the hero so the key content reads at that aspect ratio.

---

## Heading hierarchy

- **One and only one `<h1>`** per page. It should contain the primary descriptor (business name, product name, or headline value prop).
- `<h2>` for section headings.
- `<h3>` for subsections within a section.
- Never skip levels. `<h1>` to `<h3>` with no `<h2>` in between breaks assistive tech and semantic parsing.
- Headings carry meaning, not just styling. If you want a big piece of text that is not a heading, use a `<p>` or `<div>` with large type, not an `<h2>`.

---

## Schema.org markup

Every site gets at least one JSON-LD block in the `<head>` or at the top of `<body>`. Pick the type that matches the site:

- **Organization** for brand or company homepages
- **LocalBusiness** (or a subtype like `Plumber`, `Restaurant`, `Dentist`) for local service businesses, include address, phone, hours, geo coordinates, services, and aggregateRating if review data exists
- **Product** or **SoftwareApplication** for product launches
- **Article** or **BlogPosting** for content pieces
- **Event** for event pages
- **FAQPage** on any site with an FAQ section, wrapping each Q and A as a `Question` with an `acceptedAnswer`

You can (and often should) include multiple schema types on a single page, each in its own `<script type="application/ld+json">` block. A local service business homepage with an FAQ gets both a `LocalBusiness` block and a `FAQPage` block.

See `schema-examples.md` for copy-paste templates of every common type.

---

## Image SEO

- Every `<img>` needs descriptive `alt` text. Not "image1.jpg", not "photo", not empty.
- Hero images should include the business name or primary keyword in the alt text.
- Below-the-fold images get `loading="lazy"`. Above-the-fold images do not (lazy loading them hurts LCP).
- Use `width` and `height` attributes on every `<img>` to prevent layout shift.
- Real photos of the actual business or product outperform stock. When no real photo exists, describe what you need in `build-notes.md` and use a placeholder rather than shipping a misleading stock image.

---

## AI search extractability

AI search engines (ChatGPT, Perplexity, Google AI Overviews, Claude) extract passages, not pages. Structure content so key answers work as standalone statements:

- **FAQ answers** should be self-contained. Each answer makes sense without reading the question. Aim for 40-to-60 words, the sweet spot for snippet extraction.
- **Service or feature descriptions** lead with what the customer gets, not what the business does. "Same-day service for problems under the kitchen sink" beats "We provide services".
- **Headings** match how people search. "How much does a service call cost?" beats "Our Pricing". "What makes our process different" beats "Our Process".
- **Definition blocks**, for any "What is X?" question, put the answer in the first sentence of that section. AI extractors grab the first sentence first.

---

## Local SEO signals (for location-based businesses only)

Skip this section for global or digital-only businesses.

- **NAP consistency.** Name, Address, Phone must be identical in the footer, in the `LocalBusiness` JSON-LD block, and in any contact section. Even a mismatched suite number or a `(555) 123-4567` vs `555-123-4567` format difference counts as an inconsistency.
- **Service area.** Mention served cities naturally in content, and list them in the JSON-LD `areaServed` field.
- **Location-qualified keywords.** Weave "[service] in [city]" phrases into headings and body copy where natural. Never keyword-stuff.

---

## Writing quality (avoid AI tells)

Search engines increasingly penalize content that reads as machine-generated. Strip these markers:

- **No em dashes.** Use commas, colons, or split the sentence.
- **Avoid overused words:** delve, leverage, robust, comprehensive, cutting-edge, streamline, unlock, elevate, empower, seamless, navigate (as a verb for concepts), landscape (as a metaphor).
- **Avoid AI openers:** "In today's...", "It's worth noting that...", "When it comes to...", "In the world of...", "Imagine a...".
- **One clear idea per paragraph.** No hedged generalizations. No "many businesses struggle with" filler.
- **Specific beats general.** "Service calls from $89" beats "Affordable service". Numbers, names, and places signal real writing.
