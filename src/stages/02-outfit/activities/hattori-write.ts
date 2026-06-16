/**
 * HATTORI (copywriter). Runs the agent in a per-prospect workspace: seed the
 * dossier as input, run the agent's SKILL, then read back the copy package +
 * design brief that the builder (HANZO) will consume. Creative work → Claude.
 */
import * as fs from 'fs';
import * as path from 'path';
import { ApplicationFailure, log } from '@temporalio/activity';
import { loadProspect, workspaceFor, copyTemplate, STUB_AGENTS } from '../../../shared/lib/workspace';
import { storeArtifact } from '../../../shared/lib/artifact';
import { runClaudeMax } from '../../../shared/lib/claude-max';

const TEMPLATE_DIR = path.join(__dirname, '..', 'agent-templates', 'hattori');
const REQUIRED_OUTPUTS = ['copy-package.md', 'design-brief.md'] as const;

export interface HattoriWriteOutput {
  copyPackagePath: string;
  designBriefPath: string;
  durationMs: number;
}

export async function hattoriWrite(prospectId: number): Promise<HattoriWriteOutput> {
  const start = Date.now();
  const prospect = await loadProspect(prospectId);
  const workspacePath = workspaceFor(prospect.slug, 'hattori');
  const outputDir = path.join(workspacePath, 'output');

  copyTemplate(TEMPLATE_DIR, workspacePath);
  fs.mkdirSync(path.join(workspacePath, 'shared'), { recursive: true });
  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(
    path.join(workspacePath, 'shared', 'dossier.json'),
    JSON.stringify({ business_name: prospect.business_name, vertical: prospect.vertical, scoring: prospect.scoring }, null, 2),
  );

  if (STUB_AGENTS) {
    log.warn('[hattori-write] FORGE_STUB_AGENTS — writing placeholder copy', { prospectId });
    fs.writeFileSync(path.join(outputDir, 'copy-package.md'), `{topic: business-summary}\n${prospect.business_name} placeholder copy package.\n`);
    fs.writeFileSync(path.join(outputDir, 'design-brief.md'), `# Design brief\nPlaceholder creative brief for ${prospect.business_name}.\n`);
  } else {
    const result = await runClaudeMax({
      workspacePath,
      prompt: 'Read CLAUDE.md, then SKILL.md, then execute the steps in order. Write copy-package.md and design-brief.md to output/.',
    });
    if (result.exitCode !== 0) {
      throw ApplicationFailure.retryable(`[hattori-write] Claude exited ${result.exitCode}: ${result.stderr.slice(0, 300)}`);
    }
  }

  const missing = REQUIRED_OUTPUTS.filter((n) => !fs.existsSync(path.join(outputDir, n)));
  if (missing.length) {
    throw ApplicationFailure.nonRetryable(`[hattori-write] missing outputs: ${missing.join(', ')}`);
  }

  const copyPackagePath = path.join(outputDir, 'copy-package.md');
  const designBriefPath = path.join(outputDir, 'design-brief.md');
  await storeArtifact({ prospectId, kind: 'copy_package', data: { body: fs.readFileSync(copyPackagePath, 'utf-8') }, stage: 'outfit', activity: 'hattori-write', filePath: copyPackagePath });
  await storeArtifact({ prospectId, kind: 'design_brief', data: { body: fs.readFileSync(designBriefPath, 'utf-8') }, stage: 'outfit', activity: 'hattori-write', filePath: designBriefPath });

  const durationMs = Date.now() - start;
  log.info('[hattori-write] done', { prospectId, durationMs });
  return { copyPackagePath, designBriefPath, durationMs };
}
