/**
 * forgeOnboard — post-payment client onboarding.
 *
 * Welcome → (durable timer) → mark site live → (durable timer) → request a
 * review → complete. The `sleep()` calls are Temporal durable timers: the
 * workflow can wait days without holding a process open.
 */
import { proxyActivities, sleep, log } from '@temporalio/workflow';

import type * as welcomeActivities from '../stages/04-grow/activities/send-welcome-email';
import type * as onboardStateActivities from '../stages/04-grow/activities/onboard-state';

const { sendWelcomeEmail } = proxyActivities<typeof welcomeActivities>({ startToCloseTimeout: '1 minute', retry: { maximumAttempts: 3 } });
const { onboardState } = proxyActivities<typeof onboardStateActivities>({ startToCloseTimeout: '30 seconds', retry: { maximumAttempts: 3 } });

export async function forgeOnboard(prospectId: number): Promise<{ outcome: string }> {
  await sendWelcomeEmail(prospectId);
  await onboardState(prospectId, 'welcomed');

  // Durable wait — days pass with no process running.
  await sleep('2 days');
  await onboardState(prospectId, 'site_live');

  await sleep('5 days');
  await onboardState(prospectId, 'review_requested');

  await onboardState(prospectId, 'complete');
  log.info('Onboarding complete', { prospectId });
  return { outcome: 'onboarded' };
}
