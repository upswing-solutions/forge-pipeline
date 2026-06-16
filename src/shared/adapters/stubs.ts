/**
 * src/shared/adapters/stubs.ts
 *
 * Stub implementations of every adapter interface. Each returns deterministic
 * placeholder data and logs a one-line TODO so it's obvious in the console
 * that no real call happened. These let the pipeline compile and run
 * end-to-end with zero credentials. Replace per-service in ../index.ts.
 */
import type {
  ScraperAdapter,
  ResearchAdapter,
  EmailAdapter,
  PaymentsAdapter,
  CdnAdapter,
  BlobAdapter,
  NotifyAdapter,
  MessagingAdapter,
  DeployAdapter,
} from './index';

function todo(service: string, detail = ''): void {
  // eslint-disable-next-line no-console
  console.warn(`[stub:${service}] returning fake data — wire a real adapter ${detail}`.trim());
}

export const stubScraper: ScraperAdapter = {
  async fetchBusinesses(vertical, geo, limit) {
    todo('scraper', `(${vertical} in ${geo})`);
    return Array.from({ length: Math.min(limit, 3) }, (_, i) => ({
      business_name: `Example ${vertical} ${i + 1}`,
      vertical,
      city: geo,
      phone: '000-000-0000',
      website_url: i === 0 ? null : `https://example-${i}.test`,
      review_count: 10 * (i + 1),
      review_average: 4.5,
    }));
  },
};

export const stubResearch: ResearchAdapter = {
  async deepResearch({ businessName }) {
    todo('research', `(${businessName})`);
    return {
      summary: `Placeholder research summary for ${businessName}.`,
      sources: ['https://example.test/source-1'],
      photoUrls: ['https://example.test/photo-1.jpg'],
    };
  },
};

export const stubEmail: EmailAdapter = {
  async sendEmail({ to, subject }) {
    todo('email', `(to=${to} subject="${subject}")`);
    return { id: `stub-email-${Date.now()}` };
  },
};

export const stubPayments: PaymentsAdapter = {
  async createCheckoutSession({ prospectId, metadata }) {
    todo('payments', `(prospect=${prospectId})`);
    return {
      sessionId: `stub-cs-${prospectId}`,
      url: `https://checkout.example.test/stub-cs-${prospectId}`,
      metadata: { operator_approved: 'false', ...(metadata ?? {}) },
    };
  },
};

export const stubCdn: CdnAdapter = {
  async uploadImage({ sourceUrl }) {
    todo('cdn');
    return { url: `https://cdn.example.test/${encodeURIComponent(sourceUrl)}` };
  },
};

export const stubBlob: BlobAdapter = {
  async uploadFile({ key }) {
    todo('blob', `(key=${key})`);
    return { url: `https://blob.example.test/${key}` };
  },
};

export const stubNotify: NotifyAdapter = {
  async notify({ text }) {
    todo('notify', `("${text.slice(0, 40)}...")`);
  },
};

export const stubMessaging: MessagingAdapter = {
  async sendMessage({ to }) {
    todo('messaging', `(to=${to}) — intentionally a no-op, see README`);
    return { id: `stub-msg-${Date.now()}` };
  },
};

export const stubDeploy: DeployAdapter = {
  async deploySite({ slug }) {
    todo('deploy', `(${slug})`);
    return { url: `https://${slug}.example.test` };
  },
};
