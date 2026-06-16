/**
 * HANZO (builder). Reads HATTORI's design brief + copy package, picks a
 * reference template, and writes a complete index.html from scratch — every
 * word baked in, no build step. Single creative Claude session.
 */
import * as fs from 'fs';
import * as path from 'path';
import { ApplicationFailure, log } from '@temporalio/activity';
import { loadProspect, workspaceFor, copyTemplate, STUB_AGENTS } from '../../../shared/lib/workspace';
import { storeArtifact } from '../../../shared/lib/artifact';
import { runClaudeMax } from '../../../shared/lib/claude-max';

const TEMPLATE_DIR = path.join(__dirname, '..', 'agent-templates', 'hanzo');

export interface HanzoBuildInput {
  prospectId: number;
}
export interface HanzoBuildOutput {
  bytes: number;
  durationMs: number;
}

function placeholderSite(name: string): string {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${name}</title></head>
<body><header><nav>${name}</nav></header><main><h1>${name}</h1>
<form method="POST" action="https://example.com/api/inquiry">
<input type="hidden" name="site" value="__SITE_SLUG__">
<input name="name" placeholder="Name"><input name="phone" placeholder="Phone">
<input name="email" placeholder="Email"><button>Request a quote</button></form></main></body></html>`;
}

export async function hanzoBuild({ prospectId }: HanzoBuildInput): Promise<HanzoBuildOutput> {
  const start = Date.now();
  const prospect = await loadProspect(prospectId);
  const hattoriOut = path.join(workspaceFor(prospect.slug, 'hattori'), 'output');
  const workspacePath = workspaceFor(prospect.slug, 'hanzo');
  const outputDir = path.join(workspacePath, 'output');

  if (!fs.existsSync(path.join(hattoriOut, 'design-brief.md'))) {
    throw ApplicationFailure.nonRetryable('[hanzo-build] HATTORI design-brief.md not found');
  }

  copyTemplate(TEMPLATE_DIR, workspacePath);
  fs.mkdirSync(outputDir, { recursive: true });

  const sitePath = path.join(outputDir, 'index.html');
  if (STUB_AGENTS) {
    log.warn('[hanzo-build] FORGE_STUB_AGENTS — writing placeholder site', { prospectId });
    fs.writeFileSync(sitePath, placeholderSite(prospect.business_name));
    fs.writeFileSync(path.join(outputDir, 'build-notes.md'), `# Build notes\nPlaceholder build for ${prospect.business_name}.\n`);
  } else {
    const result = await runClaudeMax({
      workspacePath,
      prompt: `Read CLAUDE.md, SKILL.md, process.md. Read ../hattori/output/design-brief.md and copy-package.md. Build a complete index.html in output/ from scratch with all sections and every word of copy. Also write build-notes.md.`,
    });
    if (result.exitCode !== 0) {
      throw ApplicationFailure.retryable(`[hanzo-build] Claude exited ${result.exitCode}: ${result.stderr.slice(0, 300)}`);
    }
    if (!fs.existsSync(sitePath)) {
      throw ApplicationFailure.nonRetryable('[hanzo-build] index.html not produced');
    }
  }

  // Deterministic slug injection: the agent writes a literal __SITE_SLUG__
  // token; we replace it here so the value is correct regardless of model output.
  const html = fs.readFileSync(sitePath, 'utf-8').replace(/__SITE_SLUG__/g, prospect.slug);
  fs.writeFileSync(sitePath, html);

  await storeArtifact({ prospectId, kind: 'built_site', data: { bytes: html.length }, stage: 'outfit', activity: 'hanzo-build', filePath: sitePath });

  const durationMs = Date.now() - start;
  log.info('[hanzo-build] done', { prospectId, bytes: html.length, durationMs });
  return { bytes: html.length, durationMs };
}
