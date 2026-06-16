import * as path from 'path';
import { log } from '@temporalio/activity';
import { loadProspect, workspaceFor } from '../../../shared/lib/workspace';
import { deploy } from '../../../shared/adapters';

export interface DeployResult {
  previewUrl: string;
}

/** Deploy the approved site via the deploy adapter. Only runs after approval. */
export async function deployPreview(prospectId: number): Promise<DeployResult> {
  const prospect = await loadProspect(prospectId);
  const dir = path.join(workspaceFor(prospect.slug, 'hanzo'), 'output');
  const { url } = await deploy.deploySite({ slug: prospect.slug, dir });
  log.info('Deployed', { prospectId, url });
  return { previewUrl: url };
}
