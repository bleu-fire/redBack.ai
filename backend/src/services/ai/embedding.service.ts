import crypto from 'crypto';
import { pineconeService } from '../../config/pinecone';
import {
  normalizeUnitVector,
  generateDeterministicVector,
  calculateCosineSimilarity,
} from './vector.utils';

export { normalizeUnitVector, generateDeterministicVector, calculateCosineSimilarity };

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
    return generateDeterministicVector(text, this.dimension);
  }

  // Reference benchmarks for non-spider subjects
  private nonSpiderBenchmarks: Record<string, number[]> = {
    'Human Person / Face': generateDeterministicVector('human person face skin eyes nose mouth hair portrait selfie smile'),
    'Human Hand / Limb': generateDeterministicVector('human hand skin fingers palm thumb nails wrist arm forearm leg foot'),
    'Indoor Object / Room': generateDeterministicVector('indoor wall floor room furniture table chair screen computer device shoe paper'),
    'Domestic Pet / Animal': generateDeterministicVector('domestic dog cat fur snout whiskers puppy kitten pet mammal bird'),
  };

  /**
   * Vector-space classifier that differentiates between Human/Object subspace and Spider subspace
   */
  classifySubjectVector(
    queryVector: number[],
    spiderVectors: Record<string, { scientificName: string; commonName?: string; vector: number[] }>
  ): { isSpider: boolean; detectedSubject: string; bestMatch?: string; confidence: number } {
    let highestSpiderScore = -1;
    let bestSpiderMatch: string | undefined;

    for (const [key, sp] of Object.entries(spiderVectors)) {
      const sim = calculateCosineSimilarity(queryVector, sp.vector);
      if (sim > highestSpiderScore) {
        highestSpiderScore = sim;
        bestSpiderMatch = sp.scientificName || key;
      }
    }

    let highestNonSpiderScore = -1;
    let bestNonSpiderSubject = 'Non-Spider';

    for (const [subject, refVec] of Object.entries(this.nonSpiderBenchmarks)) {
      const sim = calculateCosineSimilarity(queryVector, refVec);
      if (sim > highestNonSpiderScore) {
        highestNonSpiderScore = sim;
        bestNonSpiderSubject = subject;
      }
    }

    if (highestNonSpiderScore >= highestSpiderScore || highestSpiderScore < 0.65) {
      return {
        isSpider: false,
        detectedSubject: highestNonSpiderScore > 0.55 ? bestNonSpiderSubject : 'Non-Arachnid / Inconclusive',
        confidence: Math.max(0.85, highestNonSpiderScore),
      };
    }

    return {
      isSpider: true,
      detectedSubject: 'Spider',
      bestMatch: bestSpiderMatch,
      confidence: highestSpiderScore,
    };
  }

  /**
   * Generates a vector embedding from a spider image using AI Vision or visual token extraction:
   */
  async generateImageEmbedding(params: {
    imageBuffer: Buffer;
    mimeType?: string;
  }): Promise<number[]> {
    const { imageBuffer, mimeType = 'image/jpeg' } = params;

    const groqKey = process.env.GROQ_API_KEY;
    let embeddingText = 'Unclassified spider photograph from the redBack.ai scanner.';
    if (groqKey && imageBuffer) {
      try {
        const { groqClient } = await import('./groq.client');
        const visionResult = await groqClient.identifySpiderImage(imageBuffer, mimeType);
        if (visionResult) {
          if (!visionResult.isSpider) {
            embeddingText = `Non-spider image: ${visionResult.detectedSubject || 'unknown subject'}. ${visionResult.visualEvidence.join('; ')}`;
          } else {
            embeddingText = `Spider photograph. Species: ${visionResult.commonName || 'spider'} (${visionResult.scientificName || 'Araneae'}). Visual features: ${visionResult.visualEvidence.join('; ')}.`;
          }
        }
      } catch {
        // Keep a generic description if the vision service is unavailable.
      }
    }

    if (pineconeService.isConfigured()) {
      const [embedding] = await pineconeService.embedTexts([embeddingText], 'query');
      return embedding;
    }

    const hash = crypto.createHash('sha256').update(imageBuffer).digest('hex');
    return generateDeterministicVector(`${embeddingText} ${hash}`, this.dimension);
  }

  async generateBatchEmbeddings(texts: string[]): Promise<number[][]> {
    return Promise.all(texts.map((t) => this.generateEmbedding(t)));
  }

  generateDeterministicVector(input: string, dim: number = 512): number[] {
    return generateDeterministicVector(input, dim);
  }

  calculateCosineSimilarity(vecA: number[], vecB: number[]): number {
    return calculateCosineSimilarity(vecA, vecB);
  }

  private async fetchGeminiEmbedding(text: string, apiKey: string): Promise<number[] | null> {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-embedding-001:embedContent?key=${apiKey}`;

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: { parts: [{ text: text.slice(0, 2048) }] },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.warn(`[EmbeddingService] Gemini API returned ${response.status}: ${errorText}`);
      return null;
    }

    const data: any = await response.json();
    const values: number[] = data?.embedding?.values;
    if (!values || !Array.isArray(values)) return null;

    const targetSlice = values.slice(0, this.dimension);
    return normalizeUnitVector(targetSlice);
  }
}

export const embeddingService = new EmbeddingService();
export default embeddingService;
