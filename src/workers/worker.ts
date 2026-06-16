import { config as loadEnv } from 'dotenv';
loadEnv({ path: '.env' });
loadEnv({ path: '.env.local', override: true });

import { Worker, NativeConnection } from '@temporalio/worker';

// Register every activity the workflows call.
import * as deepenResearch from '../stages/01-find/activities/deepen-research';
import * as extractBrandProfile from '../stages/01-find/activities/extract-brand-profile';
import * as enhanceImages from '../stages/01-find/activities/enhance-images';
import * as synthesizeResearch from '../stages/01-find/activities/synthesize-research';
import * as compileDossier from '../stages/01-find/activities/compile-dossier';
import * as hattoriWrite from '../stages/02-outfit/activities/hattori-write';
import * as hanzoBuild from '../stages/02-outfit/activities/hanzo-build';
import * as recordBuildFingerprint from '../stages/02-outfit/activities/record-build-fingerprint';
import * as technicalAudit from '../stages/02-outfit/activities/technical-audit';
import * as visualQa from '../stages/02-outfit/activities/visual-qa';
import * as screenshot from '../stages/02-outfit/activities/screenshot';
import * as uploadSitePreview from '../stages/02-outfit/activities/upload-site-preview';
import * as createCheckout from '../stages/02-outfit/activities/create-checkout-session';
import * as notifyReview from '../stages/02-outfit/activities/notify-review';
import * as generateOgImage from '../stages/02-outfit/activities/generate-og-image';
import * as uploadOgImage from '../stages/02-outfit/activities/upload-og-image';
import * as patchOgMeta from '../stages/02-outfit/activities/patch-og-meta';
import * as deployPreview from '../stages/02-outfit/activities/deploy-preview';
import * as dncCheck from '../stages/03-reach/activities/dnc-check';
import * as bardOutreach from '../stages/03-reach/activities/bard-outreach';
import * as sendOutreach from '../stages/03-reach/activities/send-outreach';
import * as sendWelcomeEmail from '../stages/04-grow/activities/send-welcome-email';
import * as onboardState from '../stages/04-grow/activities/onboard-state';
import * as recordLearning from '../shared/activities/record-learning';
import * as updateProspectStatus from '../shared/activities/update-prospect-status';

async function run() {
  const connection = await NativeConnection.connect({
    address: process.env.TEMPORAL_ADDRESS || 'localhost:7233',
  });

  const taskQueue = process.env.TEMPORAL_TASK_QUEUE || 'forge-pipeline';

  const worker = await Worker.create({
    connection,
    namespace: process.env.TEMPORAL_NAMESPACE || 'default',
    workflowsPath: require.resolve('../workflows'),
    taskQueue,
    activities: {
      ...deepenResearch,
      ...extractBrandProfile,
      ...enhanceImages,
      ...synthesizeResearch,
      ...compileDossier,
      ...hattoriWrite,
      ...hanzoBuild,
      ...recordBuildFingerprint,
      ...technicalAudit,
      ...visualQa,
      ...screenshot,
      ...uploadSitePreview,
      ...createCheckout,
      ...notifyReview,
      ...generateOgImage,
      ...uploadOgImage,
      ...patchOgMeta,
      ...deployPreview,
      ...dncCheck,
      ...bardOutreach,
      ...sendOutreach,
      ...sendWelcomeEmail,
      ...onboardState,
      ...recordLearning,
      ...updateProspectStatus,
    },
    // The creative agents are memory-hungry — cap concurrency so a burst of
    // builds doesn't exhaust the host.
    maxConcurrentActivityTaskExecutions: 5,
    shutdownGraceTime: '30 seconds',
  });

  console.log(`FORGE worker started. Task queue: ${taskQueue}`);
  console.log('Temporal UI: http://localhost:8233');
  await worker.run();
}

run().catch((err) => {
  console.error('Worker failed:', err);
  process.exit(1);
});
