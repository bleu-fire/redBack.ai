import { embeddingService } from './embedding.service';
import { visionAIService } from './vision.service';
import mongoose from 'mongoose';
import { config } from '../../config/env';

async function testAIService() {
  console.log('🧪 Testing AI Vector & Vision Services...');

  // 1. Test Deterministic Vector Embedding
  const vec1 = embeddingService.generateDeterministicVector('Latrodectus hasselti redback spider danger venom');
  const vec2 = embeddingService.generateDeterministicVector('Latrodectus redback female black red stripe');
  const vec3 = embeddingService.generateDeterministicVector('Huntsman spider harmless grey tree bark');

  console.log(`Generated vectors with dimension: ${vec1.length}`);

  const simRelated = embeddingService.calculateCosineSimilarity(vec1, vec2);
  const simUnrelated = embeddingService.calculateCosineSimilarity(vec1, vec3);

  console.log(`Cosine similarity (Redback vs Redback variant): ${(simRelated * 100).toFixed(1)}%`);
  console.log(`Cosine similarity (Redback vs Huntsman): ${(simUnrelated * 100).toFixed(1)}%`);

  if (simRelated <= simUnrelated) {
    throw new Error('Vector similarity test failed: related specimens should have higher similarity!');
  }
  console.log('✅ Embedding similarity ranking passed.');

  // 2. Test Vision AI Analysis with DB
  await mongoose.connect(config.mongoUri);
  const result = await visionAIService.analyzeSpiderImage({
    userNotes: 'Found a glossy black spider with a red stripe in the garden shed',
  });

  console.log('\n🔍 Vision Analysis Result:');
  console.log(`Top Prediction: ${result.topPrediction.commonName} (${result.topPrediction.scientificName})`);
  console.log(`Confidence: ${(result.topPrediction.confidence * 100).toFixed(1)}% (${result.topPrediction.confidenceBand})`);
  console.log(`Uncertainty Level: ${result.uncertaintyLevel}`);
  console.log(`Medical Disclaimer: ${result.disclaimer}`);
  console.log(`Visual Evidence: ${result.topPrediction.visualEvidence?.join('; ')}`);

  if (!result.topPrediction.scientificName) {
    throw new Error('Vision analysis did not return a valid top prediction');
  }

  console.log('✅ AI Vision Analysis pipeline passed!');
  await mongoose.disconnect();
  process.exit(0);
}

testAIService().catch((err) => {
  console.error('❌ Test failed:', err);
  process.exit(1);
});
