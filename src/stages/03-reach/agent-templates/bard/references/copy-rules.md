# BARD Copy Rules (Operator Overrides)

These overrides take precedence over the persona draft. They capture the structural and voice decisions that govern every outreach message, independent of the specific locked copy.

> NOTE: This is a sanitized public reference. The original file embedded the verbatim locked message templates (with real prices, channel links, and the operator's name). Those proprietary assets are removed. What remains is the teachable craft: the per-variant content boundaries, the cadence, and the voice discipline. Plug your own locked templates into `personas/`.

---

## Timeline

- No same-day go-live promise anywhere in any message. Set an honest expectation for time-to-live (account for revision rounds plus any DNS or setup steps).
- The activation call happens in the first couple of days post-conversion. Going live happens later, after revisions.
- The full onboarding timeline lives in the welcome email (sent by a separate system, not BARD-authored). The BARD onboarding message just nudges booking.

## First message (cold touch 1)

The core shape: a short, peer-to-peer note that states the site was already built, drops the URL, and closes with the collaborative-invitation ask. Rules:

- Past-tense build statement ("Built you a site for ...").
- The URL goes LAST in the message so messaging apps render the link preview (any text after a URL suppresses the unfurl).
- No price. No second CTA. No calendar link.
- Keep within the character cap. If a specific prospect pushes over the cap, HALT. Do not trim the load-bearing pieces (build statement, URL, the ask).

The collaborative-invitation ask is the universal closer across every persona's first message. Do not paraphrase, swap clauses, or split it across sentences. Both halves are required. See `language-map.md` for the exact phrasing.

## Follow-up message (cold touch 2)

Single touch: soft re-ask + takedown offer + price + refund line. Price context first appears here (never in the first message). State the price plainly, note there is no contract, and offer a refund window so the ask carries no risk. No third cold touch after this.

## Onboarding message (post-conversion)

The welcome email covers the full onboarding process. The onboarding message just books the activation call. The booking link is a runtime merge field the dashboard fills at dispatch time; BARD leaves the placeholder intact.

## Pre-call message (24h before the activation call)

Confirm tomorrow, state the time, set the expectation that nothing needs to be prepared. The call time is a runtime merge field filled at dispatch from the booking row.

## Post-call message template (filled at dispatch)

This one stays as a template with `{{change_1}}`, `{{change_2}}`, `{{change_3}}` tokens unresolved. The dashboard prompts the operator for the changes after the call, then fills them in and dispatches. BARD writes the template with placeholders intact.

## Conditional check-in message

Only fires if there has been zero inbound contact since early in the relationship. The dashboard runs a query before dispatching. Keep it a low-pressure gut check, not a pitch.

## Lifecycle emails

Later lifecycle emails (a check-in around the first renewal, a quieter one further out) are quiet, relationship-maintaining touches. They state the renewal plainly, optionally offer a referral path and a single upgrade option, and otherwise stay out of the way. Stop upselling after the second lifecycle email; from there it is relationship maintenance.

---

## Copy-only rules (hard)

- No specific service-call dollar figures. Use a soft comparison ("less than a service call") only if the phrase is ever needed.
- No marketing jargon (see `language-map.md` banned list). On websites, describe the benefit plainly; in messages, omit entirely.
- No fabricated customer names. If a variant wants social proof, pull only from a curated, real review source.
- No named fictional peer-businesses. Specificity belongs to the prospect's own data, not imagined neighbors.
- Reply channel: messages say "text me back" without restating a phone number, because the number is already in the reply thread.
- Domain selection/transfer is handled in the welcome email. Do not mention domain names in the follow-up, onboarding, or pre-call messages.

---

## Run-time context BARD does not fill

These merge fields are filled by the dashboard at dispatch time, not by BARD during drafting:

- the booking link (onboarding)
- the call time (pre-call)
- the post-call change tokens (`{{change_1}}` / `{{change_2}}` / `{{change_3}}`)
- the renewal date (lifecycle email)
- any curated review quote + author (lifecycle email P.S.)

BARD leaves these tokens intact in the drafts. The dashboard substitutes them at send time. BARD's self-audit does NOT treat these as missing merge fields; they are placeholders, not data gaps.
