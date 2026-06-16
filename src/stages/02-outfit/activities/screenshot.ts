import * as fs from 'fs';
import * as path from 'path';
import { log } from '@temporalio/activity';
import { loadProspect, workspaceFor } from '../../../shared/lib/workspace';

export interface ScreenshotResult {
  desktopPath: string;
  mobilePath: string;
}

/**
 * Capture desktop + mobile screenshots of the local index.html. Production uses
 * a headless browser (Playwright); this reference records the intended output
 * paths so the workflow's contract holds without bundling a browser. Wire
 * Playwright here to produce real images.
 */
export async function screenshot(prospectId: number): Promise<ScreenshotResult> {
  const prospect = await loadProspect(prospectId);
  const outDir = path.join(workspaceFor(prospect.slug, 'hanzo'), 'output', 'screenshots');
  fs.mkdirSync(outDir, { recursive: true });
  const desktopPath = path.join(outDir, 'desktop.png');
  const mobilePath = path.join(outDir, 'mobile.png');

  // TODO: render workspace .../output/index.html with Playwright and write PNGs.
  log.info('Screenshot step (stub — wire Playwright)', { prospectId });
  return { desktopPath, mobilePath };
}
