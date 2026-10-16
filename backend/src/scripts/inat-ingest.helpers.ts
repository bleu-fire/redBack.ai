import fs from 'fs';
import path from 'path';
import { pineconeService } from '../config/pinecone';

export interface InatPhoto {
  id: number;
  url: string;
  attribution?: string;
  license_code?: string | null;
}

export interface InatObservation {
  id: number;
  observed_on?: string;
  place_guess?: string;
  user?: { login?: string };
  taxon?: { id?: number; name?: string; preferred_common_name?: string };
  photos?: InatPhoto[];
}

export interface Checkpoint {
  completedPhotoIds: string[];
}

export interface PendingPhoto {
  id: string;
  text: string;
  metadata: Record<string, string | number | string[]>;
}

export class VisualDescriptionError extends Error {}

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchWithRetry(url: string, init?: RequestInit, attempts = 5): Promise<Response> {
  let lastError: unknown;
  for (let attempt = 0; attempt < attempts; attempt++) {
    try {
      const response = await fetch(url, init);
      if (response.ok || (response.status < 500 && response.status !== 429)) return response;
      lastError = new Error(`HTTP ${response.status}`);
    } catch (error) {
      lastError = error;
    }
    await sleep(Math.min(15000, 750 * 2 ** attempt));
  }
  throw lastError instanceof Error ? lastError : new Error('Request failed after retries');
}

export function imageUrl(url: string): string {
  return url.replace(/\/square\.(jpg|jpeg|png)(?=[?#]|$)/i, '/medium.$1');
}

export function loadCheckpoint(checkpointPath: string): Checkpoint {
  if (!fs.existsSync(checkpointPath)) return { completedPhotoIds: [] };
  return JSON.parse(fs.readFileSync(checkpointPath, 'utf8')) as Checkpoint;
}

export function saveCheckpoint(checkpointPath: string, checkpoint: Checkpoint): void {
  fs.mkdirSync(path.dirname(checkpointPath), { recursive: true });
  const tempPath = `${checkpointPath}.tmp`;
  fs.writeFileSync(tempPath, JSON.stringify(checkpoint));
  fs.renameSync(tempPath, checkpointPath);
}

export async function embedAndUpsert(params: {
  pending: PendingPhoto[];
  checkpoint: Checkpoint;
  checkpointPath: string;
  completed: Set<string>;
  namespace: string;
  batchSize: number;
  upsertSize: number;
}): Promise<number> {
  const { pending, checkpoint, checkpointPath, completed, namespace, batchSize, upsertSize } = params;
  let imported = 0;

  for (let offset = 0; offset < pending.length; offset += batchSize) {
    const batch = pending.slice(offset, offset + batchSize);
    const vectors = await pineconeService.embedTexts(batch.map((item) => item.text));
    if (vectors.some((vector) => vector.length !== 1024)) {
      throw new Error('Embedding dimension does not match the Pinecone index (expected 1024)');
    }

    for (let start = 0; start < batch.length; start += upsertSize) {
      const records = batch.slice(start, start + upsertSize).map((item, index) => ({
        id: item.id,
        values: vectors[start + index],
        metadata: { ...item.metadata, description: item.text },
      }));
      const ok = await pineconeService.upsertVectors(records, namespace);
      if (!ok) throw new Error('Pinecone upsert failed; checkpoint kept for safe resume');
      records.forEach((record) => {
        checkpoint.completedPhotoIds.push(record.id);
        completed.add(record.id);
      });
      saveCheckpoint(checkpointPath, checkpoint);
      imported += records.length;
    }
  }
  return imported;
}
