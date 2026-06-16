import { ApplicationFailure, log } from '@temporalio/activity';
import { loadProspect } from '../../../shared/lib/workspace';
import { query } from '../../../shared/lib/postgres';
import { email, messaging } from '../../../shared/adapters';

export interface SendResult {
  sendId: number;
  channel: 'email' | 'sms';
}

/**
 * Send a chosen outreach variant over a channel and record it in `sends` (one
 * row per channel per prospect = idempotency). Honors the DNC gate upstream in
 * the workflow. The messaging adapter is a no-op stub by default.
 */
export async function sendOutreach(input: {
  prospectId: number;
  channel: 'email' | 'sms';
  subject?: string;
  body: string;
}): Promise<SendResult> {
  const prospect = await loadProspect(input.prospectId);
  const to = input.channel === 'email' ? prospect.email : prospect.phone;
  // 'sms' is recorded as the channel; the messaging adapter is the transport.
  if (!to) {
    throw ApplicationFailure.nonRetryable(`No ${input.channel} address for prospect ${input.prospectId}`);
  }

  if (input.channel === 'email') {
    await email.sendEmail({ to, subject: input.subject ?? 'Hello', html: input.body });
  } else {
    await messaging.sendMessage({ to, body: input.body });
  }

  const rows = await query<{ id: number }>(
    'INSERT INTO sends (prospect_id, channel, to_address, status) VALUES ($1, $2, $3, $4) RETURNING id',
    [input.prospectId, input.channel, to, 'sent'],
  );
  log.info('Outreach sent', { prospectId: input.prospectId, channel: input.channel });
  return { sendId: rows[0].id, channel: input.channel };
}
