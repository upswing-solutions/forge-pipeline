import { log } from '@temporalio/activity';
import { loadProspect } from '../../../shared/lib/workspace';
import { query } from '../../../shared/lib/postgres';

export interface DncResult {
  blocked: boolean;
}

/** Suppression check: is this prospect's phone/email on the do-not-contact list? */
export async function dncCheck(prospectId: number): Promise<DncResult> {
  const prospect = await loadProspect(prospectId);
  const rows = await query<{ id: number }>(
    'SELECT id FROM do_not_contact WHERE ($1 <> \'\' AND phone = $1) OR ($2 <> \'\' AND email = $2) LIMIT 1',
    [prospect.phone ?? '', prospect.email ?? ''],
  );
  const blocked = rows.length > 0;
  log.info('DNC check complete', { prospectId, blocked });
  return { blocked };
}
