import { log } from '@temporalio/activity';
import { loadProspect } from '../../../shared/lib/workspace';
import { query } from '../../../shared/lib/postgres';
import { geminiConfigured, geminiJson } from '../../../shared/lib/gemini';
import type { Scoring, Tier } from '../../../types';

export interface SynthesisResult {
  tier: Tier;
  scoring: Scoring;
}

/** Map a 0–10 average to a 1–3 tier (higher score = better prospect). */
function tierFor(scoring: Scoring): Tier {
  const avg =
    (scoring.website_quality +
      scoring.social_proof +
      scoring.contact_confidence +
      scoring.market_opportunity +
      scoring.business_maturity +
      scoring.competitive_position) /
    6;
  if (avg >= 7) return 3;
  if (avg >= 4) return 2;
  return 1;
}

/**
 * Normalize research into the six 0–10 scoring dimensions and assign a tier.
 * website_quality is REVERSED (no site = 10). Analytical → cheap model.
 */
export async function synthesizeResearch(prospectId: number): Promise<SynthesisResult> {
  const prospect = await loadProspect(prospectId);

  let scoring: Scoring;
  if (!geminiConfigured()) {
    log.warn('[synthesize-research] no LLM key — returning placeholder scoring', { prospectId });
    scoring = {
      website_quality: prospect.website_url ? 4 : 10,
      social_proof: 6,
      contact_confidence: 5,
      market_opportunity: 7,
      business_maturity: 6,
      competitive_position: 5,
    };
  } else {
    scoring = await geminiJson<Scoring>(
      'Score this local service business as a prospect on six 0-10 dimensions. Return JSON with website_quality (REVERSED: no website = 10), social_proof, contact_confidence, market_opportunity, business_maturity, competitive_position.',
      JSON.stringify(prospect.research_data ?? {}),
    );
  }

  const tier = tierFor(scoring);
  await query('UPDATE prospects SET scoring = $1, tier = $2 WHERE id = $3', [
    JSON.stringify(scoring),
    tier,
    prospectId,
  ]);

  log.info('Research synthesized', { prospectId, tier });
  return { tier, scoring };
}
