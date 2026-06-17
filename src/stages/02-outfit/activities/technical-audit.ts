import * as fs from 'fs';
import * as path from 'path';
import { log } from '@temporalio/activity';
import { loadProspect, workspaceFor } from '../../../shared/lib/workspace';

export interface TechnicalAuditResult {
  score: number;
  issues: string[];
}

/**
 * Pure, deterministic HTML sanity checks. Exported for unit testing.
 * Each missing signal docks 2 points from a starting 10 (floored at 0).
 */
export function auditHtml(html: string): TechnicalAuditResult {
  const issues: string[] = [];
  if (!/<title>/.test(html)) issues.push('missing <title>');
  if (!/<meta[^>]+viewport/.test(html)) issues.push('missing viewport meta');
  if (!/<form/.test(html)) issues.push('no inquiry form found');
  if (!/lang=/.test(html)) issues.push('html missing lang attribute');
  const score = Math.max(0, 10 - issues.length * 2);
  return { score, issues };
}

/**
 * Lightweight, deterministic HTML sanity checks on the built site. Optional and
 * informational — the workflow wraps this in .catch() so failures never gate a
 * build. A production version might run a headless validator or Lighthouse.
 */
export async function technicalAudit(prospectId: number): Promise<TechnicalAuditResult> {
  const prospect = await loadProspect(prospectId);
  const sitePath = path.join(workspaceFor(prospect.slug, 'hanzo'), 'output', 'index.html');
  const html = fs.existsSync(sitePath) ? fs.readFileSync(sitePath, 'utf-8') : '';
  const result = auditHtml(html);
  log.info('Technical audit complete', { prospectId, score: result.score, issues: result.issues.length });
  return result;
}
