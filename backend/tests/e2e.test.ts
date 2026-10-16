/**
 * redBack.ai — Comprehensive End-to-End (E2E) Test Suite
 * Validating the complete lifecycle:
 * - Server Health
 * - Authentication (Register, Login, Profile)
 * - Species Catalog & Retrieval
 * - Learning Modules & Field Guides
 * - AI Image Identification & Toxicity Triage
 * - Naturalist AI Chat (English enforcement, Markdown & Green Highlights)
 * - Persistent Conversations & History (RAB-11)
 */

const BASE_URL = process.env.TEST_API_URL || 'http://localhost:3000';

interface StepResult {
  step: string;
  passed: boolean;
  durationMs: number;
  details?: any;
}

const results: StepResult[] = [];

async function step(name: string, fn: () => Promise<any>) {
  const start = Date.now();
  process.stdout.write(`⏳ [E2E] ${name}... `);
  try {
    const details = await fn();
    const durationMs = Date.now() - start;
    results.push({ step: name, passed: true, durationMs, details });
    console.log(`✅ PASSED (${durationMs}ms)`);
  } catch (err: any) {
    const durationMs = Date.now() - start;
    results.push({ step: name, passed: false, durationMs, details: err.message });
    console.log(`❌ FAILED (${durationMs}ms)`);
    console.error(`   Error details: ${err.message}`);
    throw err;
  }
}

function assert(condition: boolean, msg: string) {
  if (!condition) {
    throw new Error(`Assertion failed: ${msg}`);
  }
}

async function runE2E() {
  console.log('\n======================================================');
  console.log('🚀 STARTING REDBACK.AI FULL END-TO-END (E2E) TEST SUITE');
  console.log(`   Target Server: ${BASE_URL}`);
  console.log('======================================================\n');

  let authToken = '';
  let testUserId = '';
  let sampleSpeciesId = '';
  let sampleSpeciesName = '';
  let createdConversationId = '';
  const testEmail = `e2e_tester_${Date.now()}@redback.ai`;
  const testPassword = 'Password123!';

  // STEP 1: Health Check
  await step('1. Server Health Check (/health)', async () => {
    const res = await fetch(`${BASE_URL}/health`);
    assert(res.status === 200, `Expected 200, got ${res.status}`);
    const data: any = await res.json();
    assert(data.status === 'success', 'Expected data.status to be success');
    return data;
  });

  // STEP 2: User Registration
  await step('2. User Registration (POST /api/auth/register)', async () => {
    const res = await fetch(`${BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'E2E Naturalist Explorer',
        email: testEmail,
        password: testPassword,
      }),
    });
    assert(res.status === 201 || res.status === 200, `Expected 201/200, got ${res.status}`);
    const data: any = await res.json();
    assert(Boolean(data.token || data.data?.token), 'Expected JWT token in registration response');
    authToken = data.token || data.data?.token;
    testUserId = data.user?._id || data.data?.user?._id;
    return { testEmail, tokenReceived: Boolean(authToken) };
  });

  // STEP 3: User Login
  await step('3. User Authentication Login (POST /api/auth/login)', async () => {
    const res = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: testEmail,
        password: testPassword,
      }),
    });
    assert(res.status === 200, `Expected 200, got ${res.status}`);
    const data: any = await res.json();
    assert(Boolean(data.token || data.data?.token), 'Expected token in login response');
    authToken = data.token || data.data?.token;
    return { loggedIn: true };
  });

  // STEP 4: User Catalog Verification
  await step('4. User Verification (GET /api/auth/users)', async () => {
    const res = await fetch(`${BASE_URL}/api/auth/users`);
    assert(res.status === 200, `Expected 200, got ${res.status}`);
    const data: any = await res.json();
    const users = data.data?.users || [];
    assert(users.length > 0, 'Expected at least 1 registered user');
    return { registeredUsersCount: users.length };
  });

  // STEP 5: Species Catalog Exploration
  await step('5. Species Catalog Retrieval (GET /api/species)', async () => {
    const res = await fetch(`${BASE_URL}/api/species`);
    assert(res.status === 200, `Expected 200, got ${res.status}`);
    const data: any = await res.json();
    const list = Array.isArray(data) ? data : data.data || data.species || [];
    assert(list.length > 0, 'Expected at least 1 species in catalog');
    const first = list[0];
    sampleSpeciesId = first._id;
    sampleSpeciesName = first.commonName || first.scientificName;
    assert(Boolean(first.scientificName), 'Species must have scientificName');
    return { totalCount: list.length, sample: sampleSpeciesName };
  });

  // STEP 6: Single Species Detail
  await step('6. Species Detail & Toxicity Profile (GET /api/species/:id)', async () => {
    const res = await fetch(`${BASE_URL}/api/species/${sampleSpeciesId}`);
    assert(res.status === 200, `Expected 200, got ${res.status}`);
    const data: any = await res.json();
    const sp = data.data || data;
    assert(sp.scientificName !== undefined, 'Expected scientificName');
    assert(sp.toxicityLevel !== undefined, 'Expected toxicityLevel');
    return {
      commonName: sp.commonName,
      scientificName: sp.scientificName,
      toxicityLevel: sp.toxicityLevel,
      hasFirstAid: Boolean(sp.firstAid),
    };
  });

  // STEP 7: Learning Modules
  await step('7. Educational Learning Modules (GET /api/learning/modules)', async () => {
    const res = await fetch(`${BASE_URL}/api/learning/modules`);
    assert(res.status === 200, `Expected 200, got ${res.status}`);
    const data: any = await res.json();
    const modules = data.data || data.modules || (Array.isArray(data) ? data : []);
    assert(modules.length > 0, 'Expected learning modules');
    return { modulesCount: modules.length, firstModuleTitle: modules[0]?.title };
  });

  // STEP 8: Naturalist AI Grounded Chat & Markdown Verification
  await step('8. Naturalist AI Chat & Markdown Formatting (POST /api/ai/chat)', async () => {
    const res = await fetch(`${BASE_URL}/api/ai/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        message: 'Is the Redback spider dangerous? Explain key anatomy and first aid.',
        context: { name: 'Redback Spider', scientific: 'Latrodectus hasselti' },
      }),
    });
    assert(res.status === 200, `Expected 200, got ${res.status}`);
    const data: any = await res.json();
    assert(data.status === 'success', 'Expected success status');
    assert(Boolean(data.reply), 'Expected non-empty AI reply');

    const reply = data.reply;

    // Verify language requirement: Must be English
    const isEnglish = !reply.includes('kayna') && !reply.includes('dyal') && !reply.includes('bzaf');
    assert(isEnglish, 'AI must respond strictly in English');

    // Verify NO corrupt delimiters (||, ~~)
    assert(!reply.includes('||'), 'AI reply must not contain raw || delimiters');
    assert(!reply.includes('~~'), 'AI reply must not contain raw ~~ delimiters');

    // Verify structured formatting (Markdown headers or bullet points)
    const hasStructure = reply.includes('#') || reply.includes('- ') || reply.includes('**');
    assert(hasStructure, 'AI reply must contain structured Markdown formatting');

    return {
      replySnippet: reply.slice(0, 150) + '...',
      containsHighlightTokens: reply.includes('++'),
      sourcesCount: data.sources?.length || 0,
    };
  });

  // STEP 9: Persistent Conversation Creation (RAB-11)
  await step('9. Persistent Conversation Creation (POST /api/ai/conversations)', async () => {
    const res = await fetch(`${BASE_URL}/api/ai/conversations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        title: 'E2E Specimen Consultation',
        speciesContext: { name: 'Redback Spider', scientific: 'Latrodectus hasselti' },
        initialMessage: 'What does this spider eat?',
      }),
    });
    assert(res.status === 201, `Expected 201, got ${res.status}`);
    const data: any = await res.json();
    assert(data.status === 'success', 'Expected success status');
    const conv = data.data;
    assert(Boolean(conv._id), 'Expected conversation _id');
    createdConversationId = conv._id;
    assert(conv.messages?.length >= 2, 'Expected user and assistant messages');
    return { conversationId: createdConversationId, messageCount: conv.messages.length };
  });

  // STEP 10: Continue Persistent Conversation
  await step('10. Add Message to Conversation (POST /api/ai/conversations/:id/messages)', async () => {
    const res = await fetch(`${BASE_URL}/api/ai/conversations/${createdConversationId}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        message: 'Where can I observe them in the wild safely?',
      }),
    });
    assert(res.status === 200, `Expected 200, got ${res.status}`);
    const data: any = await res.json();
    const convData = data.data || data.conversation;
    assert(convData?.messages?.length >= 4, 'Expected at least 4 messages in thread');
    return { totalMessages: convData.messages.length, aiReplySnippet: data.reply.slice(0, 80) + '...' };
  });

  // STEP 11: List User Conversations
  await step('11. Retrieve User Conversations (GET /api/ai/conversations)', async () => {
    const res = await fetch(`${BASE_URL}/api/ai/conversations`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    assert(res.status === 200, `Expected 200, got ${res.status}`);
    const data: any = await res.json();
    assert(data.results >= 1, 'Expected at least 1 conversation for user');
    return { conversationsFound: data.results };
  });

  // STEP 12: Delete Conversation Cleanup
  await step('12. Delete Conversation Lifecycle (DELETE /api/ai/conversations/:id)', async () => {
    const res = await fetch(`${BASE_URL}/api/ai/conversations/${createdConversationId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${authToken}` },
    });
    assert(res.status === 200, `Expected 200, got ${res.status}`);
    const data: any = await res.json();
    assert(data.status === 'success', 'Expected success status on deletion');
    return { deleted: true };
  });

  // STEP 13: Multimodal Vision AI Image Identification
  await step('13. Vision AI Spider Image Analysis (POST /api/identification/analyze)', async () => {
    const fs = await import('fs');
    const path = await import('path');
    const candidatePaths = [
      path.resolve(__dirname, '../../mobile/assets/images/spider-3d.png'),
      path.resolve(process.cwd(), 'mobile/assets/images/spider-3d.png'),
      path.resolve(process.cwd(), '../mobile/assets/images/spider-3d.png'),
    ];
    const imagePath = candidatePaths.find(p => fs.existsSync(p)) || candidatePaths[0];
    const imageBuffer = fs.readFileSync(imagePath);
    const blob = new Blob([imageBuffer], { type: 'image/png' });

    const formData = new FormData();
    formData.append('image', blob, 'spider-3d.png');
    formData.append('userNotes', 'Redback spider observation in garden shed');

    const res = await fetch(`${BASE_URL}/api/identification/analyze`, {
      method: 'POST',
      body: formData,
    });
    assert(res.status === 200 || res.status === 201, `Expected 200 or 201, got ${res.status}`);
    const data: any = await res.json();
    assert(data.status === 'success', 'Expected success status');
    const top = data.data?.topPrediction;
    assert(Boolean(top), 'Expected topPrediction in analysis data');
    assert(top.confidence > 0.5, 'Expected confidence > 0.5');
    return {
      identifiedAs: top.commonName,
      scientificName: top.scientificName,
      confidencePercent: `${Math.round(top.confidence * 100)}%`,
      toxicityLevel: data.data?.speciesDetails?.toxicityLevel || 'documented',
    };
  });

  console.log('\n======================================================');
  console.log('🎉 ALL END-TO-END (E2E) TESTS PASSED SUCCESSFULLY! (13/13)');
  console.log('======================================================\n');
}

runE2E().catch(() => {
  console.error('\n❌ E2E SUITE TERMINATED WITH ERRORS.\n');
  process.exit(1);
});
