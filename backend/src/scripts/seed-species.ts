import mongoose from 'mongoose';
import { config } from '../config/env';
import Species from '../modules/species/species.model';
import { embeddingService } from '../services/ai/embedding.service';
import { pineconeService } from '../config/pinecone';
import { spiderDataset } from './data/australian-spiders';

async function seedSpecies() {
  try {
    console.log('[Seed] Connecting to MongoDB at', config.mongoUri);
    await mongoose.connect(config.mongoUri);
    console.log('[Seed] Connected to MongoDB.');

    console.log('[Seed] Seeding Australian Spider Species catalog...');
    const pineconeRecords: Array<{ id: string; values: number[]; metadata: any }> = [];

    for (const data of spiderDataset) {
      // 1. Generate 512-D deterministic taxonomic vector embedding
      const profileText = `${data.scientificName} ${data.commonName} ${data.family} ${data.genus} ${data.description} ${data.morphology.keyFeatures.join(' ')}`;
      const vector = embeddingService.generateDeterministicVector(profileText);

      // 2. Upsert into MongoDB
      const doc = await Species.findOneAndUpdate(
        { scientificName: data.scientificName },
        { ...data, vectorId: data.scientificName },
        { upsert: true, new: true }
      );

      console.log(`✅ Seeded species: ${doc.commonName} (${doc.scientificName})`);

      // 3. Prepare Pinecone record
      pineconeRecords.push({
        id: doc._id.toString(),
        values: vector,
        metadata: {
          speciesId: doc._id.toString(),
          scientificName: doc.scientificName,
          commonName: doc.commonName,
          family: doc.family,
          toxicityLevel: doc.toxicityLevel,
        },
      });
    }

    // 4. Upsert into Pinecone Vector DB (if PINECONE_API_KEY is configured)
    if (pineconeService.isConfigured()) {
      console.log('[Seed] Upserting species vectors into Pinecone...');
      await pineconeService.upsertVectors(pineconeRecords);
      console.log('[Seed] Pinecone vector index synchronized!');
    } else {
      console.log('[Seed] Notice: PINECONE_API_KEY not set in .env. Pinecone sync skipped (local cosine matcher active).');
    }

    console.log('[Seed] Completed successfully! Total species in catalog:', spiderDataset.length);
    process.exit(0);
  } catch (err) {
    console.error('[Seed] Error seeding species database:', err);
    process.exit(1);
  }
}

seedSpecies();
