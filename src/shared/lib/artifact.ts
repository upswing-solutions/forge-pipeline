import { createHash } from 'crypto';
import { query } from './postgres';
import type { ArtifactKind } from '../../types';

/**
 * artifact.ts — hash-addressed pipeline output store.
 *
 * Every stage writes its output (dossier, copy package, built site, etc.) to
 * the `artifacts` table keyed by a content hash. This keeps Postgres the
 * single record of "what the pipeline produced" without duplicating it into
 * Temporal history. The content hash makes writes idempotent on retry.
 */
export interface StoreArtifactInput {
  prospectId: number;
  kind: ArtifactKind;
  /** Arbitrary JSON payload (markdown body, parsed dossier, notes, etc.). */
  data: Record<string, unknown>;
  stage: string;
  activity: string;
  /** Optional pointer to where the bytes live on disk (the workspace). */
  filePath?: string;
}

export interface StoredArtifact {
  artifactId: number;
  contentHash: string;
}

export async function storeArtifact(input: StoreArtifactInput): Promise<StoredArtifact> {
  const { prospectId, kind, data, stage, activity, filePath } = input;
  const json = JSON.stringify(data);
  const contentHash = createHash('sha256').update(`${kind}:${json}`).digest('hex');

  const rows = await query<{ id: number }>(
    `INSERT INTO artifacts (prospect_id, kind, content_hash, data, stage, activity, file_path)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
     ON CONFLICT (content_hash) DO UPDATE SET data = EXCLUDED.data
     RETURNING id`,
    [prospectId, kind, contentHash, json, stage, activity, filePath ?? null],
  );

  return { artifactId: rows[0].id, contentHash };
}
