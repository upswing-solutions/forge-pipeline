import { log } from '@temporalio/activity';
import { loadProspect } from '../../../shared/lib/workspace';
import { storeArtifact } from '../../../shared/lib/artifact';
import { updateProspectStatus } from '../../../shared/activities/update-prospect-status';

export interface DossierResult {
  outcome: 'compiled' | 'disqualified';
  reason?: string;
}

/**
 * Assemble the final dossier the creative agents consume, and run the
 * disqualification gate (e.g. on a do-not-contact match or permanently closed
 * business). Writes the dossier artifact.
 */
export async function compileDossier(prospectId: number): Promise<DossierResult> {
  const prospect = await loadProspect(prospectId);

  // Example gate: a real pipeline checks do_not_contact, "permanently closed",
  // etc. here and short-circuits the workflow.
  if (prospect.status === 'disqualified') {
    return { outcome: 'disqualified', reason: 'flagged before dossier compile' };
  }

  await storeArtifact({
    prospectId,
    kind: 'dossier',
    data: {
      business_name: prospect.business_name,
      vertical: prospect.vertical,
      tier: prospect.tier ?? null,
      scoring: prospect.scoring ?? null,
      research: prospect.research_data ?? null,
    },
    stage: 'find',
    activity: 'compile-dossier',
  });

  await updateProspectStatus(prospectId, 'dossier_compiled');
  log.info('Dossier compiled', { prospectId });
  return { outcome: 'compiled' };
}
