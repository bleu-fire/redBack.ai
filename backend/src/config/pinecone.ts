import { config } from './env';

export interface PineconeMatch {
  id: string;
  score: number;
  metadata?: {
    speciesId?: string;
    scientificName?: string;
    commonName?: string;
    family?: string;
    toxicityLevel?: string;
    region?: string[];
  };
}

export interface PineconeQueryOptions {
  topK?: number;
  filter?: Record<string, any>;
  includeMetadata?: boolean;
}

export class PineconeService {
  private apiKey: string;
  private indexName: string;

  constructor() {
    this.apiKey = process.env.PINECONE_API_KEY || '';
    this.indexName = process.env.PINECONE_INDEX || 'redback-spider-vision';
  }

  public isConfigured(): boolean {
    return Boolean(this.apiKey && this.indexName);
  }

  /**
   * Query Pinecone vector database for closest species embeddings
   */
  async queryVector(
    vector: number[],
    options: PineconeQueryOptions = {}
  ): Promise<PineconeMatch[]> {
    const { topK = 5, filter, includeMetadata = true } = options;

    if (!this.isConfigured()) {
      console.warn('[Pinecone] PINECONE_API_KEY not configured, skipping vector query');
      return [];
    }

    try {
      // Direct REST API call to Pinecone index host
      const host = process.env.PINECONE_HOST || `https://${this.indexName}.svc.pinecone.io`;
      const response = await fetch(`${host}/query`, {
        method: 'POST',
        headers: {
          'Api-Key': this.apiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          vector,
          topK,
          filter,
          includeMetadata,
        }),
      });

      if (!response.ok) {
        throw new Error(`Pinecone query failed with status: ${response.status}`);
      }

      const result = await response.json();
      return result.matches || [];
    } catch (error) {
      console.error('[Pinecone] Error querying vector index:', error);
      return [];
    }
  }
}

export const pineconeService = new PineconeService();
export default pineconeService;
