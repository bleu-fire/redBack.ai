import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { config } from '../config/env';
import Species from '../modules/species/species.model';
import { embeddingService } from '../services/ai/embedding.service';
import { pineconeService } from '../config/pinecone';
import { moroccanSpiders } from './data/moroccan-spiders';

async function seedMoroccanSpecies() {
  console.log('========================================================');
  console.log('🇲🇦 redBack.ai - Moroccan Spider Species Indexer');
  console.log('Gemini Embedder: gemini-embedding-001 (512-D)');
  console.log('========================================================\n');

  try {
    // 1. Connect MongoDB
    console.log('[1/4] Connecting to MongoDB...');
    await mongoose.connect(config.mongoUri);
    console.log('      ✅ Connected to MongoDB at', config.mongoUri);

    const vectorIndexMap: Record<string, { scientificName: string; commonName: string; vector: number[]; toxicity: string }> = {};

    console.log('\n[2/4] Generating Gemini Vector Embeddings & Indexing Species...');
    for (const spider of moroccanSpiders) {
      // Build rich descriptive semantic profile
      const profile = `${spider.commonName} (${spider.scientificName}) ${spider.family} ${spider.genus}. ${spider.description} Habitat: ${spider.habitat}. Features: ${spider.morphology.keyFeatures.join(', ')}. Colors: ${spider.morphology.colors.join(', ')}.`;

      process.stdout.write(`  🕷️ Embedding "${spider.commonName}"... `);
      const vector = await embeddingService.generateEmbedding(profile);
      console.log(`✅ [${vector.length}-D]`);

      // Upsert into MongoDB
      const doc = await Species.findOneAndUpdate(
        { scientificName: spider.scientificName },
        { ...spider, vectorId: spider.scientificName },
        { upsert: true, new: true }
      );

      vectorIndexMap[spider.scientificName] = {
        scientificName: spider.scientificName,
        commonName: spider.commonName,
        toxicity: spider.toxicityLevel,
        vector,
      };
    }

    // 3. Save local vector index file for sub-millisecond in-memory lookups
    console.log('\n[3/4] Saving Local In-Memory Vector Index...');
    const dataDir = path.resolve(__dirname, '../../data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    const vectorFilePath = path.join(dataDir, 'morocco-species-vectors.json');
    fs.writeFileSync(vectorFilePath, JSON.stringify(vectorIndexMap, null, 2));
    console.log('      ✅ Saved vector index to:', vectorFilePath);

    // 4. Pinecone Sync (if configured)
    console.log('\n[4/4] Checking Pinecone Vector Database synchronization...');
    if (pineconeService.isConfigured()) {
      console.log('      Syncing with Pinecone cloud index...');
      const pineconeRecords = Object.values(vectorIndexMap).map((item) => ({
        id: item.scientificName,
        values: item.vector,
        metadata: {
          scientificName: item.scientificName,
          commonName: item.commonName,
          toxicityLevel: item.toxicity,
          region: ['Morocco', 'North Africa'],
        },
      }));
      await pineconeService.upsertVectors(pineconeRecords);
      console.log('      ✅ Pinecone synchronized!');
    } else {
      console.log('      ℹ️ Pinecone not configured in .env. Local vector matcher active.');
    }

    console.log('\n========================================================');
    console.log('🎉 Moroccan Spider Knowledge Base & Vector Index Ready!');
    console.log(`Indexed: ${moroccanSpiders.length} species with Gemini Embeddings.`);
    console.log('========================================================');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error indexing Moroccan spider species:', err);
    process.exit(1);
  }
}

seedMoroccanSpecies();
