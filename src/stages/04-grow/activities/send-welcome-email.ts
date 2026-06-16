import { ApplicationFailure, log } from '@temporalio/activity';
import { loadProspect } from '../../../shared/lib/workspace';
import { query } from '../../../shared/lib/postgres';
import { email } from '../../../shared/adapters';

export interface WelcomeResult {
  sendId: number;
}

/** First onboarding email after a prospect converts to a paying client. */
export async function sendWelcomeEmail(prospectId: number): Promise<WelcomeResult> {
  const prospect = await loadProspect(prospectId);
  if (!prospect.email) {
    throw ApplicationFailure.nonRetryable(`No email for prospect ${prospectId}`);
  }

  await email.sendEmail({
    to: prospect.email,
    subject: `Welcome, ${prospect.business_name}`,
    html: `<p>Welcome aboard! Your site is live and we're getting you set up.</p>`,
  });
  const rows = await query<{ id: number }>(
    'INSERT INTO sends (prospect_id, channel, to_address, status) VALUES ($1, $2, $3, $4) RETURNING id',
    [prospectId, 'email', prospect.email, 'sent'],
  );
  log.info('Welcome email sent', { prospectId });
  return { sendId: rows[0].id };
}
