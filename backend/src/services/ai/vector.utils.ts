import crypto from 'crypto';

/**
 * Normalizes any vector into a unit vector (L2 norm = 1.0) for Cosine Similarity
 */
export function normalizeUnitVector(vec: number[]): number[] {
  let mag = 0;
  for (let i = 0; i < vec.length; i++) {
    mag += vec[i] * vec[i];
  }
  mag = Math.sqrt(mag);
  if (mag === 0) return vec;
  return vec.map((v) => v / mag);
}

/**
 * Deterministically maps morphological text tokens into a D-dimensional unit vector
 * with cosine-similarity preserving properties.
 */
export function generateDeterministicVector(input: string, dim: number = 512): number[] {
  const vector = new Array<number>(dim).fill(0);
  const tokens = input
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(Boolean);

  if (tokens.length === 0) {
    tokens.push('spider', 'arachnid');
  }

  tokens.forEach((token, index) => {
    // Use crypto SHA-256 hash to project token into indices
    const hash = crypto.createHash('sha256').update(token).digest();
    for (let i = 0; i < 4; i++) {
      const val = hash.readInt16BE((i * 4) % 28);
      const targetIdx = Math.abs(hash.readUInt16BE((i * 4 + 2) % 30)) % dim;
      // Positional decay weighting
      const weight = 1 / (1 + index * 0.05);
      vector[targetIdx] += (val / 32768) * weight;
    }
  });

  return normalizeUnitVector(vector);
}

/**
 * Calculates cosine similarity between two vectors clamped between 0 and 1
 */
export function calculateCosineSimilarity(vecA: number[], vecB: number[]): number {
  if (vecA.length !== vecB.length || vecA.length === 0) return 0;
  let dot = 0;
  for (let i = 0; i < vecA.length; i++) {
    dot += vecA[i] * vecB[i];
  }
  return Math.max(0, Math.min(1, (dot + 1) / 2));
}
