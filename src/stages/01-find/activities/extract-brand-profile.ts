import { log } from '@temporalio/activity';
import { loadProspect } from '../../../shared/lib/workspace';
import { geminiConfigured, geminiJson } from '../../../shared/lib/gemini';

export interface BrandProfileResult {
  logoUrl?: string;
  paletteCount: number;
  photoCount: number;
  serviceCount: number;
  confidence: number;
}

/**
 * Extract a brand profile (palette, fonts, services, logo) from the prospect's
 * existing web presence. Analytical work → cheap JSON-mode model. Falls back to
 * a deterministic placeholder when no LLM key is configured.
 */
export async function extractBrandProfile(prospectId: number): Promise<BrandProfileResult> {
  const prospect = await loadProspect(prospectId);

  if (!geminiConfigured()) {
    log.warn('[extract-brand-profile] no LLM key — returning placeholder', { prospectId });
    return { paletteCount: 3, photoCount: 4, serviceCount: 5, confidence: 0.5 };
  }

  const profile = await geminiJson<BrandProfileResult>(
    'You extract a structured brand profile from a local service business. Return JSON with logoUrl, paletteCount, photoCount, serviceCount, confidence (0-1).',
    `Business: ${prospect.business_name}\nWebsite: ${prospect.website_url ?? 'none'}`,
  );

  log.info('Brand profile extracted', { prospectId, confidence: profile.confidence });
  return profile;
}
