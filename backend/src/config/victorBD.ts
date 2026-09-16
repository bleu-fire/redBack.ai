import { Pinecone } from '@pinecone-database/pinecone';
import { config } from './env';

const apiKey = process.env.PINECONE_API_KEY || config.pineconeApiKey;
const indexName = process.env.PINECONE_INDEX || 'spider-rag';

export const pc = new Pinecone({
  apiKey: apiKey || 'dummy-key-for-build',
});

export const index = pc.index(indexName);

export interface SpiderRecord {
  id: string;
  family?: string;
  common_names: string[];
  doc_type: 'family_profile' | 'key' | 'ipm' | 'faq';
  eye_count?: number;
  web_type?: string;
  is_medically_significant?: boolean;
  page_start: number;
  page_end: number;
  text: string;
}


export async function upsertSpiderData(
  records: SpiderRecord[],
  getEmbedding: (text: string) => Promise<number[]>
) {
  if (!apiKey || apiKey === 'dummy-key-for-build') {
    console.warn('PINECONE_API_KEY is not configured in .env. Skipping Pinecone indexing.');
    return;
  }

  if (records.length === 0) {
    console.log('No spider records provided to index.');
    return;
  }

  const vectors = await Promise.all(
    records.map(async (record) => {
      const embedding = await getEmbedding(record.text);

      return {
        id: record.id,
        values: embedding,
        metadata: {
          family: record.family || '',
          common_names: record.common_names,
          doc_type: record.doc_type,
          eye_count: record.eye_count ?? -1,
          web_type: record.web_type || 'none',
          is_medically_significant: record.is_medically_significant ?? false,
          page_start: record.page_start,
          page_end: record.page_end,
          text: record.text,
        },
      };
    })
  );

  // Pinecone recommends upserting in batches (e.g. 50-100 per call)
  const batchSize = 100;
  for (let i = 0; i < vectors.length; i += batchSize) {
    const batch = vectors.slice(i, i + batchSize);
    await index.upsert({
      records: batch,
    });
  }

  console.log(`Successfully indexed ${vectors.length} records in Pinecone index "${indexName}".`);
}

export async function querySpiderData(
  vector: number[],
  topK: number = 5,
  filter?: Record<string, any>
) {
  if (!apiKey || apiKey === 'dummy-key-for-build') {
    console.warn('⚠️ PINECONE_API_KEY is not configured in .env. Returning empty search results.');
    return [];
  }

  const queryResponse = await index.query({
    vector,
    topK,
    includeMetadata: true,
    filter,
  });

  return queryResponse.matches || [];
}