/**
 * src/shared/adapters/index.ts
 *
 * Interfaces for every external integration + the active implementation the
 * pipeline uses. Ships with stubs (see ./stubs) so the whole system compiles
 * and runs without any third-party credentials. Replace a stub with a real
 * implementation and re-point the export below — activities never change.
 */
import type { RawBusiness } from '../../types';
import * as stubs from './stubs';

export interface ScraperAdapter {
  /** Discover businesses in a vertical + geography. */
  fetchBusinesses(vertical: string, geo: string, limit: number): Promise<RawBusiness[]>;
}

export interface ResearchAdapter {
  /** Deep research a single business for the dossier. */
  deepResearch(input: { businessName: string; websiteUrl?: string | null }): Promise<{
    summary: string;
    sources: string[];
    photoUrls: string[];
  }>;
}

export interface EmailAdapter {
  sendEmail(input: { to: string; subject: string; html: string; from?: string }): Promise<{ id: string }>;
}

export interface PaymentsAdapter {
  createCheckoutSession(input: {
    prospectId: number;
    metadata?: Record<string, string>;
  }): Promise<{ sessionId: string; url: string; metadata: Record<string, string> }>;
}

export interface CdnAdapter {
  /** Upload/transform an image by source URL; returns the hosted URL. */
  uploadImage(input: { sourceUrl: string }): Promise<{ url: string }>;
}

export interface BlobAdapter {
  /** Upload local bytes to blob storage under a key; returns the public URL. */
  uploadFile(input: { localPath: string; key: string }): Promise<{ url: string }>;
}

export interface NotifyAdapter {
  /** Post a short message to the operator's review channel. */
  notify(input: { text: string }): Promise<void>;
}

export interface MessagingAdapter {
  /** Person-to-person outreach. Stub is a no-op — see ./README.md. */
  sendMessage(input: { to: string; body: string }): Promise<{ id: string }>;
}

export interface DeployAdapter {
  /** Deploy a built site directory; returns the live URL. */
  deploySite(input: { slug: string; dir: string }): Promise<{ url: string }>;
}

// --- Active implementations (swap these to go live) -------------------------
export const scraper: ScraperAdapter = stubs.stubScraper;
export const research: ResearchAdapter = stubs.stubResearch;
export const email: EmailAdapter = stubs.stubEmail;
export const payments: PaymentsAdapter = stubs.stubPayments;
export const cdn: CdnAdapter = stubs.stubCdn;
export const blob: BlobAdapter = stubs.stubBlob;
export const notify: NotifyAdapter = stubs.stubNotify;
export const messaging: MessagingAdapter = stubs.stubMessaging;
export const deploy: DeployAdapter = stubs.stubDeploy;
