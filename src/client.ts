/**
 * Trigger client. Starts a forgeFindOutfit workflow for one prospect.
 *
 *   npm run start -- --prospect-id 1
 *
 * Use FORGE_STUB_AGENTS=1 (on the worker) to run the full flow without the
 * `claude` CLI installed.
 */
import { config as loadEnv } from 'dotenv';
loadEnv({ path: '.env' });
loadEnv({ path: '.env.local', override: true });

import { Connection, Client } from '@temporalio/client';
import { forgeFindOutfit } from './workflows';

function arg(name: string, fallback?: string): string | undefined {
  const i = process.argv.indexOf(`--${name}`);
  return i >= 0 ? process.argv[i + 1] : fallback;
}

async function run() {
  const prospectId = parseInt(arg('prospect-id', '1')!, 10);

  const connection = await Connection.connect({
    address: process.env.TEMPORAL_ADDRESS || 'localhost:7233',
  });
  const client = new Client({ connection, namespace: process.env.TEMPORAL_NAMESPACE || 'default' });

  const handle = await client.workflow.start(forgeFindOutfit, {
    args: [prospectId],
    taskQueue: process.env.TEMPORAL_TASK_QUEUE || 'forge-pipeline',
    workflowId: `forge-${prospectId}`,
  });

  console.log(`Started workflow ${handle.workflowId}`);
  console.log('Watch it at http://localhost:8233');
  const result = await handle.result();
  console.log('Result:', result);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
