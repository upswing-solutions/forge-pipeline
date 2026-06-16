import { log } from '@temporalio/activity';
import { loadProspect } from '../../../shared/lib/workspace';
import { query } from '../../../shared/lib/postgres';
import { research } from '../../../shared/adapters';

export interface DeepenResearchResult {
  sourcesCompleted: number;
  photoUrls: string[];
}

/**
 * Deep research a prospect via the research adapter (Perplexity/Tavily/etc.),
 * persist the findings on the prospect row, and return source + photo counts.
 */
export async function deepenResearch(prospectId: number): Promise<DeepenResearchResult> {
  const prospect = await loadProspect(prospectId);

  const result = await research.deepResearch({
    businessName: prospect.business_name,
    websiteUrl: prospect.website_url,
  });

  await query(
    'UPDATE prospects SET research_data = $1, status = $2 WHERE id = $3',
    [
      JSON.stringify({ summary: result.summary, sources: result.sources, photo_urls: result.photoUrls }),
      'researching',
      prospectId,
    ],
  );

  log.info('Deep research complete', { prospectId, sources: result.sources.length });
  return { sourcesCompleted: result.sources.length, photoUrls: result.photoUrls };
}
