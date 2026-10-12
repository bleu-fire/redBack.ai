import Species from '../species/species.model';
import { geminiChatClient } from './gemini-chat.client';
import { AskNaturalistInput } from './ai.types';

export class AIService {
  private getApiKey(): string {
    return process.env.GEMINI_API_KEY || process.env.AI_API_KEY || '';
  }

  async askNaturalist(
    message: string,
    context?: AskNaturalistInput['context'],
    history?: AskNaturalistInput['history']
  ): Promise<string> {
    // 1. RAG Retrieval: Search database for relevant species and taxonomic knowledge
    const retrievedSpecies = await this.retrieveRelevantSpecies(message, context);

    let systemContext =
      'You are Naturalist AI (Reddy), a friendly, authoritative arachnologist and spider educator for the redBack.ai application. Provide educational guidance on spider species, habitat, behavior, morphology, and bite safety. Format your responses clearly with concise bullet points where appropriate.';

    if (context?.name || context?.scientific) {
      systemContext += ` The user is specifically asking about ${context.name || ''} (${context.scientific || ''}).`;
    }

    if (retrievedSpecies.length > 0) {
      systemContext += '\n\n=== RETRIEVED FIELD KNOWLEDGE (RAG) ===\n';
      for (const sp of retrievedSpecies) {
        systemContext += `• Specimen: ${sp.commonName} (${sp.scientificName})
  Family: ${sp.family} | Toxicity: ${sp.toxicityLevel || 'documented'}
  Venom Profile: ${sp.venomInfo || 'Non-venomous to humans'}
  First Aid Protocol: ${sp.firstAid || 'Wash bite area, apply ice pack, seek medical evaluation if symptoms develop'}
  Habitat: ${sp.habitat || 'Varied'} | Distribution: ${sp.distribution || 'Wide'}
  Key Diagnostic Markers: ${sp.morphology?.keyFeatures?.join(', ') || 'Characteristic body shape'}
\n`;
      }
      systemContext += 'Use the retrieved facts above as the ground truth for your explanation. If asked about danger or first aid, emphasize the exact medical safety protocols.';
    }

    // 1. Try Official DeepSeek AI for Chat
    try {
      const { deepseekClient } = await import('../../services/ai/deepseek.client');
      const dsReply = await deepseekClient.generateChatReply(systemContext, message, history);
      if (dsReply) {
        return dsReply;
      }
    } catch (err) {
      console.warn('[AIService] DeepSeek chat attempt failed:', err);
    }

    // 2. Try Groq (Ultra-speed fallback)
    try {
      const { groqClient } = await import('../../services/ai/groq.client');
      const groqReply = await groqClient.generateChatReply(systemContext, message, history);
      if (groqReply) {
        return groqReply;
      }
    } catch (err) {
      console.warn('[AIService] Groq chat attempt failed:', err);
    }

    const apiKey = this.getApiKey();
    if (apiKey) {
      try {
        const reply = await geminiChatClient.generateChatReply(
          apiKey,
          systemContext,
          message,
          history
        );
        if (reply) {
          return reply;
        }
      } catch (err) {
        console.warn('[AIService] Gemini request failed, using database RAG fallback:', err);
      }
    }

    return this.buildRagFallbackAnswer(message, retrievedSpecies, context);
  }

  private async retrieveRelevantSpecies(
    message: string,
    context?: AskNaturalistInput['context']
  ): Promise<any[]> {
    try {
      const candidates: any[] = [];

      // 1. Direct match on context if supplied
      if (context?.scientific || context?.name) {
        const query: any = { $or: [] };
        if (context.scientific) {
          query.$or.push({ scientificName: new RegExp(context.scientific.trim(), 'i') });
        }
        if (context.name) {
          query.$or.push({ commonName: new RegExp(context.name.trim(), 'i') });
        }
        const direct = await Species.findOne(query).lean();
        if (direct) {
          candidates.push(direct);
        }
      }

      // 2. Keyword-based search against MongoDB
      const keywords = message
        .replace(/[?.,!;:'"()]/g, ' ')
        .split(/\s+/)
        .filter((w) => w.length >= 3);

      if (keywords.length > 0) {
        const regexes = keywords.map((k) => new RegExp(k, 'i'));
        const matches = await Species.find({
          $or: [
            { scientificName: { $in: regexes } },
            { commonName: { $in: regexes } },
            { family: { $in: regexes } },
            { genus: { $in: regexes } },
            { habitat: { $in: regexes } },
            { description: { $in: regexes } },
          ],
        })
          .limit(3)
          .lean();

        for (const m of matches) {
          if (!candidates.some((c) => c._id?.toString() === m._id?.toString())) {
            candidates.push(m);
          }
        }
      }

      // 3. Fallback to default catalog species if nothing matched
      if (candidates.length === 0) {
        const defaults = await Species.find().limit(2).lean();
        candidates.push(...defaults);
      }

      return candidates.slice(0, 3);
    } catch (err) {
      console.warn('[AIService] Error retrieving species for RAG:', err);
      return [];
    }
  }

  private buildRagFallbackAnswer(
    message: string,
    retrievedSpecies: any[],
    context?: AskNaturalistInput['context']
  ): string {
    const mainSpecies = retrievedSpecies[0];
    const qLower = message.toLowerCase();

    if (!mainSpecies) {
      return `Hello! I'm your Naturalist AI assistant. I'm connected to the redBack.ai species database. You can ask me about spider identification, bite first aid, venom potency, habitats, or compare look-alikes.`;
    }

    const nameStr = `${mainSpecies.commonName} (*${mainSpecies.scientificName}*)`;

    // Danger / Venom / Bite query
    if (qLower.includes('danger') || qLower.includes('venom') || qLower.includes('toxic') || qLower.includes('bite') || qLower.includes('hurt') || qLower.includes('poison')) {
      const isDangerous = mainSpecies.toxicityLevel === 'deadly' || mainSpecies.toxicityLevel === 'danger';
      const triage = isDangerous
        ? `⚠️ **Clinical Danger Level**: High toxicity (${mainSpecies.toxicityLevel?.toUpperCase()}).`
        : `✅ **Clinical Danger Level**: Mild/Low toxicity (${mainSpecies.toxicityLevel || 'harmless'}).`;

      const firstAid = mainSpecies.firstAid || 'Clean wound with antiseptic. Apply cool pack. Seek medical advice if pain or systemic symptoms develop.';

      return `${triage}\n\nRegarding ${nameStr}:\n${mainSpecies.venomInfo}\n\n**First Aid Protocol:**\n- ${firstAid}\n\n*Tip: Never squeeze or attempt to crush a venomous spider with bare hands. Seek urgent emergency care if bitten.*`;
    }

    // Anatomy / Identification / Morphology query
    if (qLower.includes('identif') || qLower.includes('anatomy') || qLower.includes('feature') || qLower.includes('look') || qLower.includes('marker') || qLower.includes('recognize')) {
      const markers = mainSpecies.morphology?.keyFeatures?.length > 0
        ? mainSpecies.morphology.keyFeatures.map((f: string) => `- ${f}`).join('\n')
        : `- Family: ${mainSpecies.family}\n- Eye Pattern: ${mainSpecies.morphology?.eyePattern || 'Diagnostic arrangement'}\n- Body Length: ${mainSpecies.morphology?.bodyLengthMm || 'Variable'}`;

      return `Key diagnostic traits for ${nameStr}:\n\n${markers}\n\n**Habitat & Behavior:**\nFound in ${mainSpecies.habitat}. ${mainSpecies.behavior || ''}\n\n*Tip: Inspect abdominal dorsal markings and web scaffolding from a safe 30 cm distance.*`;
    }

    // Lookalike query
    if (qLower.includes('compare') || qLower.includes('look-alike') || qLower.includes('similar') || qLower.includes('confus')) {
      return `Comparing ${nameStr} with common look-alikes:\n\n- **Identified Specimen:** ${mainSpecies.commonName} (${mainSpecies.scientificName}) has distinct diagnostic markers: ${mainSpecies.morphology?.keyFeatures?.[0] || 'unique abdominal pattern'}.\n- **Look-Alike Distinction:** Common confusion species often differ in web architecture, dorsal stripe saturation, and leg spines.\n- **Safety Profile:** ${mainSpecies.venomInfo}\n\n*Tip: Take photos from multiple angles (dorsal and lateral) to distinguish subtle taxonomic differences.*`;
    }

    // General query grounded in DB
    return `Regarding **${mainSpecies.commonName}** (*${mainSpecies.scientificName}*):\n\n- **Taxonomy:** Family ${mainSpecies.family}, Genus ${mainSpecies.genus}\n- **Habitat & Range:** ${mainSpecies.habitat} (${mainSpecies.distribution})\n- **Venom & Behavior:** ${mainSpecies.venomInfo || 'Non-venomous'}. ${mainSpecies.behavior || ''}\n\n*Tip: Feel free to ask about specific bite protocols, morphology keys, or look-alike comparisons.*`;
  }
}

export const aiService = new AIService();
