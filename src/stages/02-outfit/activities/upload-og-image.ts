import * as path from 'path';
import { log } from '@temporalio/activity';
import { loadProspect, workspaceFor } from '../../../shared/lib/workspace';
import { blob } from '../../../shared/adapters';

export interface UploadOgResult {
  url: string;
}

/** Upload the generated OG image to blob storage; returns the public URL. */
export async function uploadOgImage(prospectId: number): Promise<UploadOgResult> {
  const prospect = await loadProspect(prospectId);
  const localPath = path.join(workspaceFor(prospect.slug, 'hanzo'), 'output', 'og-image.png');
  const { url } = await blob.uploadFile({ localPath, key: `og/${prospect.slug}/og-image.png` });
  log.info('OG image uploaded', { prospectId, url });
  return { url };
}
