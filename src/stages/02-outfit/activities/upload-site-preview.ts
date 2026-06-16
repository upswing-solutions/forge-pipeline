import * as path from 'path';
import { log } from '@temporalio/activity';
import { loadProspect, workspaceFor } from '../../../shared/lib/workspace';
import { blob } from '../../../shared/adapters';

export interface UploadPreviewResult {
  url: string;
}

/** Upload the built index.html to blob storage so the dashboard iframe can reach it. */
export async function uploadSitePreview(prospectId: number): Promise<UploadPreviewResult> {
  const prospect = await loadProspect(prospectId);
  const sitePath = path.join(workspaceFor(prospect.slug, 'hanzo'), 'output', 'index.html');

  const { url } = await blob.uploadFile({ localPath: sitePath, key: `previews/${prospect.slug}/index.html` });
  log.info('Site preview uploaded', { prospectId, url });
  return { url };
}
