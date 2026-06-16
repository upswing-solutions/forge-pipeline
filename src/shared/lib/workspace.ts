import * as fs from 'fs';
import * as path from 'path';
import { ApplicationFailure } from '@temporalio/activity';
import { queryOne } from './postgres';
import type { Prospect } from '../../types';

/**
 * workspace.ts — per-prospect agent workspace helpers.
 *
 * Each creative agent (HATTORI/HANZO/BARD) runs in a copy of its template,
 * placed in a per-prospect directory under data/workspaces/<slug>/. The
 * workspace persists after the run for auditing and reuse. Override the base
 * with the WORKSPACE_ROOT env var.
 */
export const WORKSPACE_ROOT = process.env.WORKSPACE_ROOT || path.resolve('data', 'workspaces');

/**
 * When set (FORGE_STUB_AGENTS=1), the creative-agent activities skip the
 * `claude` CLI and write placeholder output files instead. Lets the whole
 * workflow be demoed end-to-end without the CLI installed. Unset for real runs.
 */
export const STUB_AGENTS = process.env.FORGE_STUB_AGENTS === '1';

export function workspaceFor(slug: string, agent?: string): string {
  return agent
    ? path.join(WORKSPACE_ROOT, slug, agent)
    : path.join(WORKSPACE_ROOT, slug);
}

/** Load a prospect row or fail non-retryably. */
export async function loadProspect(prospectId: number): Promise<Prospect> {
  const prospect = await queryOne<Prospect>('SELECT * FROM prospects WHERE id = $1', [prospectId]);
  if (!prospect) {
    throw ApplicationFailure.nonRetryable(`Prospect ${prospectId} not found`);
  }
  return prospect;
}

/** Recursively copy an agent template into a fresh workspace directory. */
export function copyTemplate(templateDir: string, destDir: string): void {
  if (fs.existsSync(destDir)) {
    fs.rmSync(destDir, { recursive: true, force: true });
  }
  fs.mkdirSync(destDir, { recursive: true });
  for (const entry of fs.readdirSync(templateDir, { withFileTypes: true })) {
    if (entry.name === '.DS_Store') continue;
    const s = path.join(templateDir, entry.name);
    const d = path.join(destDir, entry.name);
    if (entry.isDirectory()) copyTemplate(s, d);
    else fs.copyFileSync(s, d);
  }
}
