/**
 * src/types.ts — shared domain types.
 *
 * Postgres is the source of truth for business data; Temporal owns workflow
 * state. These types describe the business rows and the pipeline outputs that
 * flow between activities. Extend `Prospect` to match your own schema.
 */

/** Priority tier. 3 = best prospect (e.g. no website + strong reviews). */
export type Tier = 1 | 2 | 3;

/**
 * Six scoring dimensions, each 0–10. Stored as JSONB on the prospect row.
 * NOTE: `website_quality` is REVERSED — a business with NO website scores 10
 * (high opportunity), a polished modern site scores 0.
 */
export interface Scoring {
  website_quality: number;
  social_proof: number;
  contact_confidence: number;
  market_opportunity: number;
  business_maturity: number;
  competitive_position: number;
}

/** Pipeline status progression (plus terminal/edge states). */
export type ProspectStatus =
  | 'discovered'
  | 'researching'
  | 'dossier_compiled'
  | 'copy_written'
  | 'site_built'
  | 'qa_complete'
  | 'approved'
  | 'outreach_drafted'
  | 'outreach_sent'
  | 'payment_pending'
  | 'client_active'
  | 'disqualified'
  | 'escalated'
  | 'archived';

/** A discovered/enriched business. Mirror your own columns here. */
export interface Prospect {
  id: number;
  slug: string;
  business_name: string;
  vertical: string;
  city?: string;
  phone?: string;
  email?: string;
  owner_name?: string;
  website_url?: string | null;
  status: ProspectStatus;
  tier?: Tier;
  scoring?: Scoring;
  /** Free-form research payload accumulated by the FIND stage. */
  research_data?: Record<string, unknown>;
}

/** Kinds of hash-addressed pipeline output stored in the `artifacts` table. */
export type ArtifactKind =
  | 'dossier'
  | 'copy_package'
  | 'design_brief'
  | 'built_site'
  | 'build_notes'
  | 'brand_profile'
  | 'outreach_drafts';

/** Raw business record returned by a discovery/scraper adapter. */
export interface RawBusiness {
  business_name: string;
  vertical: string;
  city?: string;
  phone?: string;
  website_url?: string | null;
  review_count?: number;
  review_average?: number;
}
