import { execFile } from 'child_process';
import { heartbeat, CancelledFailure } from '@temporalio/activity';

/**
 * runClaudeMax — the creative-agent runner.
 *
 * Spawns the `claude` CLI in a prospect's agent workspace and lets it run a
 * full agentic session (read CLAUDE.md/SKILL.md, do the work, write output
 * files). The activity heartbeats every 30s so Temporal knows a long session
 * (HANZO builds can run 15–30 min) is alive and does not assume a crash.
 *
 * This is the heart of the "creative work → Claude, analytical work → cheap
 * model" routing. Swap the execFile call for a direct API call if you prefer
 * API auth over CLI subscription auth.
 */

// Default model + effort for all creative agents (HATTORI, HANZO, BARD).
// Change here to upgrade every agent at once. Override per-call via options.
export const DEFAULT_CLAUDE_MAX_MODEL = 'claude-opus-4-8';
export const DEFAULT_CLAUDE_MAX_EFFORT = 'high'; // low | medium | high | xhigh | max

export interface ClaudeMaxOptions {
  workspacePath: string;
  prompt: string;
  heartbeatIntervalMs?: number; // Default: 30000 (30s)
  mcpConfig?: string; // Path to MCP config JSON file
  model?: string; // Defaults to DEFAULT_CLAUDE_MAX_MODEL
  effort?: 'low' | 'medium' | 'high' | 'xhigh' | 'max';
}

export interface ClaudeMaxResult {
  exitCode: number;
  stdout: string;
  stderr: string;
}

export async function runClaudeMax(options: ClaudeMaxOptions): Promise<ClaudeMaxResult> {
  const {
    workspacePath,
    prompt,
    heartbeatIntervalMs = 30000,
    mcpConfig,
    model = DEFAULT_CLAUDE_MAX_MODEL,
    effort = DEFAULT_CLAUDE_MAX_EFFORT,
  } = options;

  let cancelledError: CancelledFailure | undefined;

  // Strip ANTHROPIC_API_KEY from the child env so the Claude CLI uses
  // subscription auth (OAuth/keychain) rather than a possibly-stale API key
  // that dotenv may have loaded from .env.
  const childEnv = { ...process.env };
  delete childEnv.ANTHROPIC_API_KEY;

  const result = await new Promise<ClaudeMaxResult>((resolve, reject) => {
    const args = ['-p', prompt, '--model', model, '--effort', effort, '--dangerously-skip-permissions'];
    if (mcpConfig) {
      args.push('--mcp-config', mcpConfig);
    }

    const proc = execFile(
      'claude',
      args,
      { maxBuffer: 10 * 1024 * 1024, cwd: workspacePath, env: childEnv },
      (error, stdout, stderr) => {
        clearInterval(hbInterval);
        if (error && error.code !== undefined) {
          resolve({ exitCode: typeof error.code === 'number' ? error.code : 1, stdout, stderr });
        } else if (error) {
          reject(error);
        } else {
          resolve({ exitCode: 0, stdout, stderr });
        }
      },
    );

    // Close stdin immediately so the CLI doesn't wait for piped input.
    proc.stdin?.end();

    const hbInterval = setInterval(() => {
      try {
        heartbeat(`alive at ${new Date().toISOString()}`);
      } catch (err) {
        // heartbeat() throws outside an activity context (e.g. local smoke
        // tests) — treat that as a no-op. Only kill the child if Temporal
        // actually told us to cancel.
        if (err instanceof CancelledFailure) {
          cancelledError = err;
          proc.kill();
          clearInterval(hbInterval);
        }
      }
    }, heartbeatIntervalMs);
  });

  // Propagate cancellation as cancellation (not a failure) so Temporal records
  // it correctly.
  if (cancelledError) {
    throw cancelledError;
  }

  return result;
}
