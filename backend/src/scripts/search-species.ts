import fs from 'fs';
import path from 'path';
import { embeddingService } from '../services/ai/embedding.service';

interface IndexedSpecies {
  scientificName: string;
  commonName: string;
  toxicity: string;
  vector: number[];
}

const vectorFilePath = path.resolve(__dirname, '../../data/morocco-species-vectors.json');
const rawData: Record<string, IndexedSpecies> = JSON.parse(fs.readFileSync(vectorFilePath, 'utf8'));
const speciesList = Object.values(rawData);

async function findClosestSpecies(userQuery: string, topK = 3) {
  console.log(`\n🔍 Searching: "${userQuery}"`);
  const queryVector = await embeddingService.generateEmbedding(userQuery);

  const scores = speciesList.map((species) => {
    const similarity = embeddingService.calculateCosineSimilarity(queryVector, species.vector);
    return {
      scientificName: species.scientificName,
      commonName: species.commonName,
      toxicity: species.toxicity,
      similarityScore: (similarity * 100).toFixed(1) + '%',
      rawScore: similarity,
    };
  });

  scores.sort((a, b) => b.rawScore - a.rawScore);

  console.log('🏆 Top Matches:');
  scores.slice(0, topK).forEach((match, idx) => {
    console.log(`  ${idx + 1}. [${match.similarityScore}] ${match.commonName} (${match.scientificName})`);
    console.log(`     Toxicity: ${match.toxicity}`);
  });
}

async function runDemo() {
  console.log('========================================================');
  console.log('🇲🇦 redBack.ai - Moroccan Spider Vector Search Engine');
  console.log('========================================================');

  // Test 1: User spotted a black spider with red spots
  await findClosestSpecies('3enkabout k7el f dhero no9at 7omr f jerdan black spider red spots orange spots');

  // Test 2: User found a spider with violin shape inside house
  await findClosestSpecies('Brown spider behind furniture inside house bedroom violin mark 6 eyes');

  // Test 3: Very fast huntsman at night
  await findClosestSpecies('Large flat huntsman spider running sideways fast on wall in Casablanca at night');

  console.log('\n========================================================');
}

runDemo();
