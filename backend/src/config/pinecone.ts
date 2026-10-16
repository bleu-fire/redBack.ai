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
  namespace?: string;
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
    const { topK = 5, filter, includeMetadata = true, namespace } = options;

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
          ...(namespace ? { namespace } : {}),
        }),
      });

      if (!response.ok) {
        throw new Error(`Pinecone query failed with status: ${response.status}`);
      }

      const result: any = await response.json();
      return result.matches || [];
    } catch (error) {
      console.error('[Pinecone] Error querying vector index:', error);
      return [];
    }
  }

  /**
   * Upsert vectors with taxonomic metadata into Pinecone index
   */
  async upsertVectors(
    vectors: Array<{
      id: string;
      values: number[];
      metadata?: Record<string, any>;
    }>,
    namespace?: string
  ): Promise<boolean> {
    if (!this.isConfigured()) {
      console.warn('[Pinecone] PINECONE_API_KEY not configured, skipping vector upsert');
      return false;
    }

    try {
      const host = process.env.PINECONE_HOST || `https://${this.indexName}.svc.pinecone.io`;
      const response = await fetch(`${host}/vectors/upsert`, {
        method: 'POST',
        headers: {
          'Api-Key': this.apiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ vectors, ...(namespace ? { namespace } : {}) }),
      });

      if (!response.ok) {
        throw new Error(`Pinecone upsert failed with status: ${response.status}`);
      }

      console.log(`[Pinecone] Successfully upserted ${vectors.length} vectors to ${this.indexName}`);
      return true;
    } catch (error) {
      console.error('[Pinecone] Error upserting vectors:', error);
      return false;
    }
  }

  /** Embed image descriptions with the same 1024-D model used for the iNaturalist index. */
  async embedTexts(texts: string[], inputType: 'query' | 'passage' = 'passage'): Promise<number[][]> {
    if (!this.apiKey) throw new Error('PINECONE_API_KEY is not configured');
    if (texts.length === 0) return [];

    const response = await fetch('https://api.pinecone.io/embed', {
      method: 'POST',
      headers: {
        'Api-Key': this.apiKey,
        'Content-Type': 'application/json',
        'X-Pinecone-Api-Version': '2025-10',
      },
      body: JSON.stringify({
        model: 'llama-text-embed-v2',
        inputs: texts.map((text) => ({ text })),
        parameters: { input_type: inputType, truncate: 'END' },
      }),
    });

    if (!response.ok) {
      throw new Error(`Pinecone embedding failed with status ${response.status}: ${(await response.text()).slice(0, 200)}`);
    }

    const data: any = await response.json();
    const embeddings = data.data?.map((item: any) => item.values);
    if (!Array.isArray(embeddings) || embeddings.length !== texts.length) {
      throw new Error('Pinecone returned an unexpected embedding response');
    }
    return embeddings;
  }
}

export const pineconeService = new PineconeService();
export default pineconeService;
