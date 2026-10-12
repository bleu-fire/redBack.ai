import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

import Species from '../modules/species/species.model';
import { embeddingService } from '../services/ai/embedding.service';

async function embedAllSpecies() {
  const mongoUri = process.env.MONGO_URI || 'mongodb://172.22.11.130:27017/redback_db';
  console.log('Connecting to MongoDB at:', mongoUri);
  await mongoose.connect(mongoUri);

  const speciesList = await Species.find().lean();
  console.log(`Found ${speciesList.length} species in database. Generating embeddings...`);

  const vectorIndex: Record<string, { scientificName: string; commonName: string; vector: number[] }> = {};

  for (const sp of speciesList) {
    const textToEmbed = `
      Species: ${sp.commonName} (${sp.scientificName})
      Family: ${sp.family} | Genus: ${sp.genus}
      Toxicity: ${sp.toxicityLevel || 'mild'}
      Habitat: ${sp.habitat}
      Distribution: ${sp.distribution}
      Behavior: ${sp.behavior}
      Key Morphology: ${sp.morphology?.keyFeatures?.join(', ') || ''}
      Colors: ${sp.morphology?.colors?.join(', ') || ''}
      Eye Pattern: ${sp.morphology?.eyePattern || ''}
    `.trim();

    const vector = await embeddingService.generateEmbedding(textToEmbed);
    vectorIndex[sp.scientificName] = {
      scientificName: sp.scientificName,
      commonName: sp.commonName,
      vector,
    };
    console.log(`  🕷️ Embedded: ${sp.commonName} (${sp.scientificName}) [${vector.length}-D]`);
  }

  const outDir = path.resolve(__dirname, '../../data');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const outPath = path.join(outDir, 'all-species-vectors.json');
  fs.writeFileSync(outPath, JSON.stringify(vectorIndex, null, 2), 'utf8');
  console.log(`Saved vector database to: ${outPath}`);

  await mongoose.disconnect();
  console.log('Done!');
}

embedAllSpecies().catch(console.error);
