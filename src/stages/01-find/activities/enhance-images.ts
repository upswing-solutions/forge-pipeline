import { log } from '@temporalio/activity';
import { loadProspect } from '../../../shared/lib/workspace';
import { cdn } from '../../../shared/adapters';

export interface EnhanceImagesResult {
  imageCount: number;
}

/**
 * Push the prospect's research photos through the CDN adapter (upload +
 * transform) so the builder agent has clean, hosted imagery to work with.
 */
export async function enhanceImages(prospectId: number): Promise<EnhanceImagesResult> {
  const prospect = await loadProspect(prospectId);
  const photoUrls = ((prospect.research_data?.photo_urls as string[]) ?? []);

  let imageCount = 0;
  for (const sourceUrl of photoUrls) {
    await cdn.uploadImage({ sourceUrl });
    imageCount += 1;
  }

  log.info('Images enhanced', { prospectId, imageCount });
  return { imageCount };
}
