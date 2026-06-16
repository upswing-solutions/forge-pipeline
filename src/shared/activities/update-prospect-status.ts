import { ApplicationFailure, log } from '@temporalio/activity';
import { query } from '../lib/postgres';
import type { ProspectStatus } from '../../types';

/** Idempotent status mutation. Non-retryable if the prospect doesn't exist. */
export async function updateProspectStatus(
  prospectId: number,
  status: ProspectStatus,
): Promise<void> {
  const rows = await query<{ id: number }>(
    'UPDATE prospects SET status = $1 WHERE id = $2 RETURNING id',
    [status, prospectId],
  );
  if (rows.length === 0) {
    throw ApplicationFailure.nonRetryable(`Prospect ${prospectId} not found`);
  }
  log.info('Prospect status updated', { prospectId, status });
}
