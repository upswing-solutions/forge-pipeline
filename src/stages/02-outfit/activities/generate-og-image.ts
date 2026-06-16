import * as fs from 'fs';
import * as path from 'path';
import { log } from '@temporalio/activity';
import { loadProspect, workspaceFor } from '../../../shared/lib/workspace';

export interface OgImageResult {
  bytes: number;
  localPath: string;
}

/**
 * Generate the social-share (Open Graph) image from the approved hero.
 * Production renders the hero section to a 1200x630 PNG; this reference records
 * the intended path. Wire your renderer/image model here.
 */
export async function generateOgImage(prospectId: number): Promise<OgImageResult> {
  const prospect = await loadProspect(prospectId);
  const outDir = path.join(workspaceFor(prospect.slug, 'hanzo'), 'output');
  fs.mkdirSync(outDir, { recursive: true });
  const localPath = path.join(outDir, 'og-image.png');

  // TODO: render hero to a 1200x630 PNG. Placeholder writes an empty file.
  if (!fs.existsSync(localPath)) fs.writeFileSync(localPath, '');
  const bytes = fs.statSync(localPath).size;
  log.info('OG image step (stub — wire renderer)', { prospectId, bytes });
  return { bytes, localPath };
}
