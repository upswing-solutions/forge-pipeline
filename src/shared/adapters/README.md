# Adapters

Every outward-facing integration the pipeline needs lives behind a small
interface here, with a **stub** implementation that returns deterministic fake
data and logs a `TODO`. This is what makes this repo a clean architecture
reference: the Temporal / Postgres / Claude core is real, but nothing reaches
out to a paid third-party service until *you* wire it.

To go live with one service, implement its interface against a real provider
and swap the export in `index.ts`. Nothing else in the pipeline changes — the
activities only ever import from `index.ts`.

| Adapter        | Interface             | Production examples            |
|----------------|-----------------------|--------------------------------|
| `scraper`      | `ScraperAdapter`      | Apify, Google Places, Yelp     |
| `research`     | `ResearchAdapter`     | Perplexity, Tavily, web search |
| `email`        | `EmailAdapter`        | Resend, Postmark, SES          |
| `payments`     | `PaymentsAdapter`     | Stripe Checkout                |
| `cdn`          | `CdnAdapter`          | Cloudinary, imgix              |
| `blob`         | `BlobAdapter`         | Vercel Blob, S3                |
| `notify`       | `NotifyAdapter`       | Discord/Slack webhook          |
| `messaging`    | `MessagingAdapter`    | iMessage (AppleScript), SMS    |
| `deploy`       | `DeployAdapter`       | Vercel, Netlify, Cloudflare    |

> The `messaging` stub intentionally ships as a no-op. Outbound person-to-person
> messaging carries consent/compliance obligations (TCPA, CAN-SPAM, local law).
> Implement it only against a compliant, opted-in channel.
