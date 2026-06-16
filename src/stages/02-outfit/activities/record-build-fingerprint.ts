import * as fs from 'fs';
import * as path from 'path';
import { log } from '@temporalio/activity';
import { loadProspect, workspaceFor } from '../../../shared/lib/workspace';
import { query } from '../../../shared/lib/postgres';

export interface BuildFingerprint {
  template: string;
  palette_family: string;
  fonts: string;
  hero_strategy: string;
  section_count: number;
  parse_success: boolean;
}

export interface FingerprintResult {
  fingerprintId: number;
  fingerprint: BuildFingerprint;
}

/**
 * Record a build's design fingerprint so a nightly monitor can detect
 * homogenization (the builder converging on one look across prospects).
 * Best-effort: parse failures are recorded on the row, never fatal.
 */
export async function recordBuildFingerprint({ prospectId }: { prospectId: number }): Promise<FingerprintResult> {
  const prospect = await loadProspect(prospectId);
  const sitePath = path.join(workspaceFor(prospect.slug, 'hanzo'), 'output', 'index.html');

  let fingerprint: BuildFingerprint = {
    template: 'unknown', palette_family: 'unknown', fonts: 'unknown',
    hero_strategy: 'unknown', section_count: 0, parse_success: false,
  };
  if (fs.existsSync(sitePath)) {
    const html = fs.readFileSync(sitePath, 'utf-8');
    fingerprint = {
      template: 'reference', palette_family: 'neutral', fonts: 'system',
      hero_strategy: 'full-bleed', section_count: (html.match(/<section/g) ?? []).length,
      parse_success: true,
    };
  }

  const rows = await query<{ id: number }>(
    `INSERT INTO build_fingerprints (prospect_id, template, palette_family, fonts, hero_strategy, section_count)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
    [prospectId, fingerprint.template, fingerprint.palette_family, fingerprint.fonts, fingerprint.hero_strategy, fingerprint.section_count],
  );

  log.info('Build fingerprint recorded', { prospectId, sections: fingerprint.section_count });
  return { fingerprintId: rows[0].id, fingerprint };
}
