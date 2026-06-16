import * as fs from 'fs';
import * as path from 'path';
import { log } from '@temporalio/activity';
import { loadProspect, workspaceFor } from '../../../shared/lib/workspace';

/** Inject canonical + og:image / twitter:image meta tags into the built HTML. */
export async function patchOgMeta(prospectId: number, ogImageUrl: string): Promise<void> {
  const prospect = await loadProspect(prospectId);
  const sitePath = path.join(workspaceFor(prospect.slug, 'hanzo'), 'output', 'index.html');
  if (!fs.existsSync(sitePath)) {
    log.warn('[patch-og-meta] index.html not found; skipping', { prospectId });
    return;
  }

  const tags = `\n    <meta property="og:image" content="${ogImageUrl}">\n    <meta name="twitter:image" content="${ogImageUrl}">`;
  const html = fs.readFileSync(sitePath, 'utf-8').replace('</head>', `${tags}\n  </head>`);
  fs.writeFileSync(sitePath, html);
  log.info('OG meta tags patched', { prospectId });
}
