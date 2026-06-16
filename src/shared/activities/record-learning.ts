import { log } from '@temporalio/activity';
import { query } from '../lib/postgres';

/**
 * Append-only intelligence. After a build/outreach completes, capture what was
 * learned so it can be mined later (which templates convert, which copy angles
 * land). Kept deliberately simple — one row per learning.
 */
export async function recordLearning(prospectId: number): Promise<void> {
  await query(
    `INSERT INTO agent_learnings (prospect_id, stage, note)
       VALUES ($1, $2, $3)`,
    [prospectId, 'outfit', `Build completed for prospect ${prospectId}`],
  );
  log.info('Learning recorded', { prospectId });
}
