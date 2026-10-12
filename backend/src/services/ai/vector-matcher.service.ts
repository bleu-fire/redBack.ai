import fs from 'fs';
import path from 'path';
import { embeddingService } from './embedding.service';
import { pineconeService } from '../../config/pinecone';

export interface VectorMatchResult {
  isSpider: boolean;
  detectedSubject?: string;
  scientificName?: string;
  score: number;
}

export class VectorMatcherService {
  async matchWithVectorDatabase(
    imageBuffer: Buffer,
    mimeType = 'image/jpeg'
  ): Promise<VectorMatchResult | null> {
    try {
      const queryVector = await embeddingService.generateImageEmbedding({ imageBuffer, mimeType });

      if (pineconeService.isConfigured()) {
        const matches = await pineconeService.queryVector(queryVector, { topK: 1 });
        if (matches.length > 0 && matches[0].metadata?.scientificName) {
          return {
            isSpider: true,
            scientificName: matches[0].metadata.scientificName,
            score: matches[0].score || 0.88,
          };
        }
      }

      const allVectorsPath = path.resolve(__dirname, '../../data/all-species-vectors.json');
      const moroccoVectorsPath = path.resolve(__dirname, '../../data/morocco-species-vectors.json');
      const targetPath = fs.existsSync(allVectorsPath) ? allVectorsPath : moroccoVectorsPath;

      if (fs.existsSync(targetPath)) {
        const localIndex: Record<string, { scientificName: string; commonName?: string; vector: number[] }> =
          JSON.parse(fs.readFileSync(targetPath, 'utf8'));

        const classification = embeddingService.classifySubjectVector(queryVector, localIndex);
        if (!classification.isSpider) {
          return {
            isSpider: false,
            detectedSubject: classification.detectedSubject,
            score: classification.confidence,
          };
        }

        return {
          isSpider: true,
          scientificName: classification.bestMatch,
          score: classification.confidence,
        };
      }
    } catch (err) {
      console.warn('[VectorMatcher] Vector database lookup failed:', err);
    }
    return null;
  }
}

export const vectorMatcherService = new VectorMatcherService();
