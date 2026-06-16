/**
 * forgeFindOutfit — the worked example workflow.
 *
 * FIND  : deep research → brand profile → (enhance images ‖ synthesize scoring)
 *         → compile dossier (with a disqualification gate)
 * OUTFIT: HATTORI copy → HANZO build → fingerprint → optional QA → screenshot
 *         → preview upload → checkout → notify → AWAIT operator approval
 *         → OG image → deploy → record learnings
 *
 * Everything here is deterministic; all I/O lives in the activities. The human
 * approval gate is a Temporal signal with a 14-day timeout.
 */
import {
  proxyActivities,
  defineSignal,
  defineQuery,
  setHandler,
  condition,
  patched,
  log,
} from '@temporalio/workflow';

import type * as deepenResearchActivities from '../stages/01-find/activities/deepen-research';
import type * as extractBrandProfileActivities from '../stages/01-find/activities/extract-brand-profile';
import type * as enhanceImagesActivities from '../stages/01-find/activities/enhance-images';
import type * as synthesizeResearchActivities from '../stages/01-find/activities/synthesize-research';
import type * as compileDossierActivities from '../stages/01-find/activities/compile-dossier';
import type * as hattoriActivities from '../stages/02-outfit/activities/hattori-write';
import type * as hanzoBuildActivities from '../stages/02-outfit/activities/hanzo-build';
import type * as recordBuildFingerprintActivities from '../stages/02-outfit/activities/record-build-fingerprint';
import type * as technicalAuditActivities from '../stages/02-outfit/activities/technical-audit';
import type * as visualQaActivities from '../stages/02-outfit/activities/visual-qa';
import type * as screenshotActivities from '../stages/02-outfit/activities/screenshot';
import type * as uploadPreviewActivities from '../stages/02-outfit/activities/upload-site-preview';
import type * as createCheckoutActivities from '../stages/02-outfit/activities/create-checkout-session';
import type * as notifyReviewActivities from '../stages/02-outfit/activities/notify-review';
import type * as generateOgActivities from '../stages/02-outfit/activities/generate-og-image';
import type * as uploadOgActivities from '../stages/02-outfit/activities/upload-og-image';
import type * as patchOgActivities from '../stages/02-outfit/activities/patch-og-meta';
import type * as deployActivities from '../stages/02-outfit/activities/deploy-preview';
import type * as learningActivities from '../shared/activities/record-learning';
import type * as statusActivities from '../shared/activities/update-prospect-status';

// Dashboard reads these without polling Postgres.
export const stageQuery = defineQuery<string>('stage');
export const tierQuery = defineQuery<number | undefined>('tier');
// Operator approves/rejects a built site from the dashboard.
export const approveSignal = defineSignal<[{ approved: boolean; feedback?: string }]>('approve');

// Per-activity timeout + retry policy. startToClose = max single attempt;
// scheduleToClose = max total including retries. Creative agents heartbeat.
const { deepenResearch } = proxyActivities<typeof deepenResearchActivities>({ startToCloseTimeout: '6 minutes', scheduleToCloseTimeout: '15 minutes', retry: { maximumAttempts: 3 } });
const { extractBrandProfile } = proxyActivities<typeof extractBrandProfileActivities>({ startToCloseTimeout: '8 minutes', scheduleToCloseTimeout: '20 minutes', heartbeatTimeout: '60 seconds', retry: { maximumAttempts: 2 } });
const { enhanceImages } = proxyActivities<typeof enhanceImagesActivities>({ startToCloseTimeout: '6 minutes', scheduleToCloseTimeout: '15 minutes', retry: { maximumAttempts: 3 } });
const { synthesizeResearch } = proxyActivities<typeof synthesizeResearchActivities>({ startToCloseTimeout: '6 minutes', scheduleToCloseTimeout: '15 minutes', retry: { maximumAttempts: 3 } });
const { compileDossier } = proxyActivities<typeof compileDossierActivities>({ startToCloseTimeout: '6 minutes', scheduleToCloseTimeout: '15 minutes', retry: { maximumAttempts: 3 } });

const { hattoriWrite } = proxyActivities<typeof hattoriActivities>({ startToCloseTimeout: '20 minutes', scheduleToCloseTimeout: '45 minutes', heartbeatTimeout: '60 seconds', retry: { maximumAttempts: 2 } });
const { hanzoBuild } = proxyActivities<typeof hanzoBuildActivities>({ startToCloseTimeout: '30 minutes', scheduleToCloseTimeout: '65 minutes', heartbeatTimeout: '60 seconds', retry: { maximumAttempts: 2 } });
const { recordBuildFingerprint } = proxyActivities<typeof recordBuildFingerprintActivities>({ startToCloseTimeout: '30 seconds', scheduleToCloseTimeout: '2 minutes', retry: { maximumAttempts: 3 } });
const { technicalAudit } = proxyActivities<typeof technicalAuditActivities>({ startToCloseTimeout: '2 minutes', scheduleToCloseTimeout: '5 minutes', retry: { maximumAttempts: 2 } });
const { visualQa } = proxyActivities<typeof visualQaActivities>({ startToCloseTimeout: '3 minutes', scheduleToCloseTimeout: '10 minutes', retry: { maximumAttempts: 3 } });
const { screenshot } = proxyActivities<typeof screenshotActivities>({ startToCloseTimeout: '2 minutes', scheduleToCloseTimeout: '5 minutes', retry: { maximumAttempts: 2 } });
const { uploadSitePreview } = proxyActivities<typeof uploadPreviewActivities>({ startToCloseTimeout: '5 minutes', scheduleToCloseTimeout: '12 minutes', retry: { maximumAttempts: 3 } });
const { createCheckoutSession } = proxyActivities<typeof createCheckoutActivities>({ startToCloseTimeout: '1 minute', scheduleToCloseTimeout: '4 minutes', retry: { maximumAttempts: 3 } });
const { notifyReviewReady } = proxyActivities<typeof notifyReviewActivities>({ startToCloseTimeout: '30 seconds', scheduleToCloseTimeout: '2 minutes', retry: { maximumAttempts: 3 } });
const { generateOgImage } = proxyActivities<typeof generateOgActivities>({ startToCloseTimeout: '2 minutes', scheduleToCloseTimeout: '5 minutes', retry: { maximumAttempts: 2 } });
const { uploadOgImage } = proxyActivities<typeof uploadOgActivities>({ startToCloseTimeout: '1 minute', scheduleToCloseTimeout: '3 minutes', retry: { maximumAttempts: 3 } });
const { patchOgMeta } = proxyActivities<typeof patchOgActivities>({ startToCloseTimeout: '30 seconds', scheduleToCloseTimeout: '2 minutes', retry: { maximumAttempts: 3 } });
const { deployPreview } = proxyActivities<typeof deployActivities>({ startToCloseTimeout: '3 minutes', scheduleToCloseTimeout: '8 minutes', retry: { maximumAttempts: 2 } });
const { recordLearning } = proxyActivities<typeof learningActivities>({ startToCloseTimeout: '30 seconds', scheduleToCloseTimeout: '2 minutes', retry: { maximumAttempts: 3 } });
const { updateProspectStatus } = proxyActivities<typeof statusActivities>({ startToCloseTimeout: '30 seconds', scheduleToCloseTimeout: '2 minutes', retry: { maximumAttempts: 3 } });

export async function forgeFindOutfit(prospectId: number): Promise<{ outcome: string; tier?: number }> {
  let currentStage = 'starting';
  let currentTier: number | undefined;
  setHandler(stageQuery, () => currentStage);
  setHandler(tierQuery, () => currentTier);

  // Register the signal handler EARLY, before any activity runs.
  let approved = false;
  let approvalReceived = false;
  let feedback = '';
  setHandler(approveSignal, (input) => {
    approved = input.approved;
    feedback = input.feedback ?? '';
    approvalReceived = true;
  });

  // === FIND ===
  currentStage = 'deep_research';
  await deepenResearch(prospectId);

  currentStage = 'brand_extraction';
  await extractBrandProfile(prospectId);

  currentStage = 'enrichment';
  const [, synthesis] = await Promise.all([enhanceImages(prospectId), synthesizeResearch(prospectId)]);
  currentTier = synthesis.tier;

  currentStage = 'dossier';
  const dossier = await compileDossier(prospectId);
  if (dossier.outcome === 'disqualified') {
    log.info('Prospect disqualified', { prospectId, reason: dossier.reason });
    return { outcome: 'disqualified' };
  }

  // === OUTFIT ===
  currentStage = 'copy_writing';
  await hattoriWrite(prospectId);
  await updateProspectStatus(prospectId, 'copy_written');

  currentStage = 'building';
  await hanzoBuild({ prospectId });
  await updateProspectStatus(prospectId, 'site_built');

  // Non-fatal: design-convergence telemetry.
  try {
    await recordBuildFingerprint({ prospectId });
  } catch (err) {
    log.warn('fingerprint failed (non-fatal)', { prospectId, err: String(err) });
  }

  // Optional QA — a second set of eyes for the operator. Never gates the build.
  currentStage = 'qa_audit';
  const [audit, qa] = await Promise.all([
    technicalAudit(prospectId).catch(() => null),
    visualQa(prospectId).catch(() => null),
  ]);

  currentStage = 'screenshotting';
  await screenshot(prospectId);

  currentStage = 'uploading_preview';
  let previewUrl: string | null = null;
  try {
    previewUrl = (await uploadSitePreview(prospectId)).url;
  } catch (err) {
    log.warn('preview upload failed (non-fatal)', { prospectId, err: String(err) });
  }

  currentStage = 'creating_checkout';
  try {
    await createCheckoutSession({ prospectId });
  } catch (err) {
    log.warn('checkout creation failed (non-fatal)', { prospectId, err: String(err) });
  }

  await updateProspectStatus(prospectId, 'qa_complete');

  try {
    await notifyReviewReady({
      prospectId,
      previewUrl,
      auditScore: audit?.score ?? null,
      visualScore: qa?.overallScore ?? null,
      topIssues: qa?.topIssues ?? [],
    });
  } catch (err) {
    log.warn('notify failed (non-fatal)', { prospectId, err: String(err) });
  }

  // === HUMAN-IN-THE-LOOP: await operator approval (14-day timeout) ===
  currentStage = 'awaiting_approval';
  const gotSignal = await condition(() => approvalReceived, '14 days');
  if (!gotSignal) {
    await updateProspectStatus(prospectId, 'archived');
    return { outcome: 'approval_timeout', tier: currentTier };
  }
  if (!approved) {
    log.info('Site rejected', { prospectId, feedback });
    await updateProspectStatus(prospectId, 'escalated');
    return { outcome: 'rejected', tier: currentTier };
  }

  // === POST-APPROVAL ===
  // patched() lets in-flight workflows that predate this block skip it on
  // replay — the standard Temporal way to evolve a running workflow safely.
  if (patched('og-image-v2')) {
    currentStage = 'og_image';
    await generateOgImage(prospectId);
    const og = await uploadOgImage(prospectId);
    await patchOgMeta(prospectId, og.url);
    try {
      await uploadSitePreview(prospectId);
    } catch (err) {
      log.warn('preview re-upload failed (non-fatal)', { prospectId, err: String(err) });
    }
  }

  currentStage = 'deploying';
  await deployPreview(prospectId);

  currentStage = 'recording_learnings';
  await recordLearning(prospectId);

  await updateProspectStatus(prospectId, 'approved');
  currentStage = 'complete';
  return { outcome: 'approved', tier: currentTier };
}
