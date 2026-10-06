import crypto from 'crypto';

export class EmbeddingService {
  private dimension = 512;

  /**
   * Generates a normalized vector embedding using Google Gemini (text-embedding-004)
   * if GEMINI_API_KEY is present; otherwise falls back gracefully to deterministic taxonomic vector space.
   */
  async generateEmbedding(text: string): Promise<number[]> {
    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey) {
      try {
        const geminiVector = await this.fetchGeminiEmbedding(text, apiKey);
        if (geminiVector && geminiVector.length > 0) {
          return geminiVector;
        }
      } catch (err) {
        console.warn('[EmbeddingService] Gemini embedding call failed, using deterministic fallback:', err);
      }
    }

    // High-performance deterministic fallback
    return this.generateDeterministicVector(text, this.dimension);
  }

  /**
   * Generates a vector embedding from a spider image using Gemini Multimodal Vision:
   * 1. Uses Gemini Vision to extract fine-grained morphological features (eyes, markings, legs, colors).
   * 2. Encodes those visual features into a dense vector via Gemini Embedder.
   */
  async generateImageEmbedding(params: {
    imageBuffer: Buffer;
    mimeType?: string;
  }): Promise<number[]> {
    const { imageBuffer, mimeType = 'image/jpeg' } = params;
    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey && imageBuffer) {
      try {
        // Step 1: Extract visual features using Gemini Vision
        const base64Data = imageBuffer.toString('base64');
        const visionPrompt =
          'Analyze this spider specimen. Describe key morphological diagnostic traits: eye pattern, cephalothorax shape, abdomen color and markings, leg spines, and spinnerets in 2-3 concise sentences.';

        const visionRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [
                {
                  parts: [
                    { text: visionPrompt },
                    { inline_data: { mime_type: mimeType, data: base64Data } },
                  ],
                },
              ],
            }),
          }
        );

        if (visionRes.ok) {
          const visionData: any = await visionRes.json();
          const description = visionData?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (description) {
            // Step 2: Convert visual feature description to embedding
            return await this.generateEmbedding(description);
          }
        }
      } catch (err) {
        console.warn('[EmbeddingService] Gemini image embedding failed, falling back:', err);
      }
    }

    // Fallback: Hash image bytes deterministically into vector space
    const hash = crypto.createHash('sha256').update(imageBuffer || Buffer.from('spider')).digest('hex');
    return this.generateDeterministicVector(hash, this.dimension);
  }

  /**
   * Batch generates embeddings for multiple text profiles
   */
  async generateBatchEmbeddings(texts: string[]): Promise<number[][]> {
    return Promise.all(texts.map((t) => this.generateEmbedding(t)));
  }

  /**
   * Helper: Calls Google Gemini gemini-embedding-001 REST endpoint
   */
  private async fetchGeminiEmbedding(text: string, apiKey: string): Promise<number[] | null> {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-embedding-001:embedContent?key=${apiKey}`;

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: {
          parts: [{ text: text.slice(0, 2048) }],
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.warn(`[EmbeddingService] Gemini API returned ${response.status}: ${errorText}`);
      return null;
    }

    const data: any = await response.json();
    const values: number[] = data?.embedding?.values;

    if (!values || !Array.isArray(values)) {
      return null;
    }

    // Slice to our target vector space dimension (512) and normalize
    const targetSlice = values.slice(0, this.dimension);
    return this.normalizeUnitVector(targetSlice);
  }

  /**
   * Normalizes any vector into a unit vector (L2 norm = 1.0) for Cosine Similarity
   */
  private normalizeUnitVector(vec: number[]): number[] {
    let mag = 0;
    for (let i = 0; i < vec.length; i++) {
      mag += vec[i] * vec[i];
    }
    mag = Math.sqrt(mag);
    if (mag === 0) return vec;
    return vec.map((v) => v / mag);
  }

  /**
   * Deterministically maps morphological text tokens into a 512-D unit vector
   * with cosine-similarity preserving properties.
   */
  generateDeterministicVector(input: string, dim: number = 512): number[] {
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

    return this.normalizeUnitVector(vector);
  }

  /**
   * Calculates cosine similarity between two vectors
   */
  calculateCosineSimilarity(vecA: number[], vecB: number[]): number {
    if (vecA.length !== vecB.length || vecA.length === 0) return 0;
    let dot = 0;
    for (let i = 0; i < vecA.length; i++) {
      dot += vecA[i] * vecB[i];
    }
    // Clamped between 0 and 1
    return Math.max(0, Math.min(1, (dot + 1) / 2));
  }
}

export const embeddingService = new EmbeddingService();
export default embeddingService;
