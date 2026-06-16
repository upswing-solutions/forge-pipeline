import { log } from '@temporalio/activity';
import { loadProspect } from '../../../shared/lib/workspace';
import { query } from '../../../shared/lib/postgres';
import { payments } from '../../../shared/adapters';

export interface CheckoutResult {
  sessionId: string;
  url: string;
  metadata: Record<string, string>;
}

/**
 * Create a payment checkout session for the prospect ahead of outreach. The
 * `operator_approved` metadata flag starts false and gates any real send until
 * the operator approves the cohort from the dashboard.
 */
export async function createCheckoutSession({ prospectId }: { prospectId: number }): Promise<CheckoutResult> {
  await loadProspect(prospectId);
  const session = await payments.createCheckoutSession({
    prospectId,
    metadata: { operator_approved: 'false' },
  });

  await query('UPDATE prospects SET status = $1 WHERE id = $2', ['qa_complete', prospectId]);
  log.info('Checkout session created', { prospectId, sessionId: session.sessionId });
  return session;
}
