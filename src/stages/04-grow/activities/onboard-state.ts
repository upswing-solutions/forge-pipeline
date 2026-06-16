import { log } from '@temporalio/activity';
import { updateProspectStatus } from '../../../shared/activities/update-prospect-status';

export interface OnboardStep {
  step: 'welcomed' | 'site_live' | 'review_requested' | 'complete';
}

/**
 * Minimal onboarding state mutator. The GROW workflow drives the sequence
 * (welcome → site live → review request) using Temporal durable timers between
 * steps; this activity just records progress on the prospect row.
 */
export async function onboardState(prospectId: number, step: OnboardStep['step']): Promise<void> {
  if (step === 'complete') {
    await updateProspectStatus(prospectId, 'client_active');
  }
  log.info('Onboard state advanced', { prospectId, step });
}
