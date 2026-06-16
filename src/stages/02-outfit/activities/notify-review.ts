import { log } from '@temporalio/activity';
import { notify } from '../../../shared/adapters';

export interface NotifyReviewInput {
  prospectId: number;
  previewUrl: string | null;
  auditScore: number | null;
  visualScore: number | null;
  topIssues: string[];
}

/** Ping the operator's review channel that a build is ready for approval. */
export async function notifyReviewReady(input: NotifyReviewInput): Promise<void> {
  const { prospectId, previewUrl, auditScore, visualScore } = input;
  await notify.notify({
    text: `Build ready for review — prospect ${prospectId} | preview: ${previewUrl ?? 'n/a'} | audit: ${auditScore ?? 'n/a'} | visual: ${visualScore ?? 'n/a'}`,
  });
  log.info('Review notification sent', { prospectId });
}
