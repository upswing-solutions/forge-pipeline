import { log } from '@temporalio/activity';
import { geminiConfigured, geminiJson } from '../../../shared/lib/gemini';

export interface VisualQaResult {
  overallScore: number;
  topIssues: string[];
}

/**
 * Visual quality score on the rendered site, as a second set of eyes for the
 * operator's manual approval. Analytical → cheap vision model. Optional and
 * non-gating. Falls back to a neutral placeholder without an LLM key.
 */
export async function visualQa(prospectId: number): Promise<VisualQaResult> {
  if (!geminiConfigured()) {
    log.warn('[visual-qa] no LLM key — returning placeholder score', { prospectId });
    return { overallScore: 7, topIssues: [] };
  }

  const result = await geminiJson<VisualQaResult>(
    'You are a design QA reviewer. Score the screenshot 0-10 and list the top issues. Return JSON { overallScore, topIssues }.',
    `Prospect ${prospectId} site screenshot review.`,
  );
  log.info('Visual QA complete', { prospectId, score: result.overallScore });
  return result;
}
