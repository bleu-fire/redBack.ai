import { embeddingService } from '../services/ai/embedding.service';

async function testEmbeddings() {
  console.log('========================================================');
  console.log('🕷️ redBack.ai - Gemini Vector Embedding Demonstration');
  console.log('========================================================\n');

  const redback1 =
    'Mediterranean black widow spider Latrodectus tredecimguttatus. Spherical glossy black abdomen with 13 distinctive red and orange spots. Highly neurotoxic venom alpha-latrotoxin.';

  const redback2 =
    'Black widow female spider with prominent red dots on dark globular body. Irregular tangled cobweb in dry grassland.';

  const recluse =
    'Mediterranean recluse spider Loxosceles rufescens. Violin-shaped mark on cephalothorax, six eyes in three dyads, cytotoxic necrotic venom.';

  console.log('1. Generating Vector Embedding for: "Mediterranean Black Widow #1"...');
  const vec1 = await embeddingService.generateEmbedding(redback1);
  console.log(`   ✅ Vector generated! Dimension: ${vec1.length} floats.`);
  console.log(`   Sample vector values: [${vec1.slice(0, 5).map((v) => v.toFixed(4)).join(', ')}, ...]`);

  console.log('\n2. Generating Vector Embedding for: "Mediterranean Black Widow #2"...');
  const vec2 = await embeddingService.generateEmbedding(redback2);
  console.log(`   ✅ Vector generated! Dimension: ${vec2.length} floats.`);

  console.log('\n3. Generating Vector Embedding for: "Mediterranean Recluse Spider"...');
  const vec3 = await embeddingService.generateEmbedding(recluse);
  console.log(`   ✅ Vector generated! Dimension: ${vec3.length} floats.`);

  console.log('\n4. Calculating Vector Cosine Similarities:');
  const simBlackWidows = embeddingService.calculateCosineSimilarity(vec1, vec2);
  const simWidowAndRecluse = embeddingService.calculateCosineSimilarity(vec1, vec3);

  console.log(`   🔗 Similarity (Black Widow #1 vs Black Widow #2): ${(simBlackWidows * 100).toFixed(2)}%`);
  console.log(`   ⚡ Similarity (Black Widow #1 vs Recluse Spider): ${(simWidowAndRecluse * 100).toFixed(2)}%`);

  if (simBlackWidows > simWidowAndRecluse) {
    console.log('\n🎯 SUCCESS: Vector space successfully clusters matching species closer together!');
  }

  console.log('\n========================================================');
}

testEmbeddings();
