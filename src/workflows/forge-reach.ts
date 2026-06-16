/**
 * forgeReach — outreach for an approved prospect.
 *
 * DNC gate → draft variants (BARD) → AWAIT operator's "send" decision (which
 * variant, or skip) → send over the chosen channel. Demonstrates a second
 * human-in-the-loop signal and a suppression gate.
 */
import { proxyActivities, defineSignal, setHandler, condition, log } from '@temporalio/workflow';

import type * as dncActivities from '../stages/03-reach/activities/dnc-check';
import type * as bardActivities from '../stages/03-reach/activities/bard-outreach';
import type * as sendActivities from '../stages/03-reach/activities/send-outreach';
import type * as statusActivities from '../shared/activities/update-prospect-status';

export const sendDecisionSignal = defineSignal<[{ send: boolean; channel: 'email' | 'sms'; body: string; subject?: string }]>('sendDecision');

const { dncCheck } = proxyActivities<typeof dncActivities>({ startToCloseTimeout: '30 seconds', retry: { maximumAttempts: 3 } });
const { bardOutreach } = proxyActivities<typeof bardActivities>({ startToCloseTimeout: '10 minutes', scheduleToCloseTimeout: '25 minutes', heartbeatTimeout: '60 seconds', retry: { maximumAttempts: 2 } });
const { sendOutreach } = proxyActivities<typeof sendActivities>({ startToCloseTimeout: '1 minute', retry: { maximumAttempts: 3 } });
const { updateProspectStatus } = proxyActivities<typeof statusActivities>({ startToCloseTimeout: '30 seconds', retry: { maximumAttempts: 3 } });

export async function forgeReach(prospectId: number): Promise<{ outcome: string }> {
  let decision: { send: boolean; channel: 'email' | 'sms'; body: string; subject?: string } | null = null;
  setHandler(sendDecisionSignal, (input) => {
    decision = input;
  });

  const dnc = await dncCheck(prospectId);
  if (dnc.blocked) {
    await updateProspectStatus(prospectId, 'archived');
    return { outcome: 'suppressed' };
  }

  await bardOutreach(prospectId);
  await updateProspectStatus(prospectId, 'outreach_drafted');

  // Wait for the operator to pick a variant and hit send (30-day window).
  const got = await condition(() => decision !== null, '30 days');
  if (!got || !decision!.send) {
    log.info('Outreach not sent', { prospectId });
    return { outcome: 'not_sent' };
  }

  await sendOutreach({ prospectId, channel: decision!.channel, subject: decision!.subject, body: decision!.body });
  await updateProspectStatus(prospectId, 'outreach_sent');
  return { outcome: 'sent' };
}
