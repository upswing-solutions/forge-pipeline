/**
 * BARD (outreach). Reads the dossier + copy package and drafts personalized
 * outreach variants for operator review. Creative work → Claude. Output is
 * drafts only; nothing is sent here.
 */
import * as fs from 'fs';
import * as path from 'path';
import { ApplicationFailure, log } from '@temporalio/activity';
import { loadProspect, workspaceFor, copyTemplate, STUB_AGENTS } from '../../../shared/lib/workspace';
import { storeArtifact } from '../../../shared/lib/artifact';
import { runClaudeMax } from '../../../shared/lib/claude-max';

const TEMPLATE_DIR = path.join(__dirname, '..', 'agent-templates', 'bard');

export interface BardOutreachResult {
  variantsPath: string;
  durationMs: number;
}

export async function bardOutreach(prospectId: number): Promise<BardOutreachResult> {
  const start = Date.now();
  const prospect = await loadProspect(prospectId);
  const workspacePath = workspaceFor(prospect.slug, 'bard');
  const outputDir = path.join(workspacePath, 'output');

  copyTemplate(TEMPLATE_DIR, workspacePath);
  fs.mkdirSync(outputDir, { recursive: true });
  const variantsPath = path.join(outputDir, 'outreach-variants.md');

  if (STUB_AGENTS) {
    log.warn('[bard-outreach] FORGE_STUB_AGENTS — writing placeholder drafts', { prospectId });
    fs.writeFileSync(variantsPath, `# Outreach variants\nPlaceholder variants for ${prospect.business_name}.\n`);
  } else {
    const result = await runClaudeMax({
      workspacePath,
      prompt: 'Read CLAUDE.md, then SKILL.md. Draft 3 personalized outreach variants to output/outreach-variants.md.',
    });
    if (result.exitCode !== 0) {
      throw ApplicationFailure.retryable(`[bard-outreach] Claude exited ${result.exitCode}`);
    }
    if (!fs.existsSync(variantsPath)) {
      throw ApplicationFailure.nonRetryable('[bard-outreach] outreach-variants.md not produced');
    }
  }

  await storeArtifact({ prospectId, kind: 'outreach_drafts', data: { body: fs.readFileSync(variantsPath, 'utf-8') }, stage: 'reach', activity: 'bard-outreach', filePath: variantsPath });
  const durationMs = Date.now() - start;
  log.info('[bard-outreach] done', { prospectId, durationMs });
  return { variantsPath, durationMs };
}
