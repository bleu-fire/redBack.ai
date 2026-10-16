import Species from '../species/species.model';
import { geminiChatClient } from './gemini-chat.client';
import { AskNaturalistInput, AskNaturalistResult, SourceReference } from './ai.types';
import { Conversation } from './conversation.model';
import { AppError } from '../../middlewares/error.middleware';

export class AIService {
  private getApiKey(): string {
    return process.env.GEMINI_API_KEY || process.env.AI_API_KEY || '';
  }

  async askNaturalist(
    message: string,
    context?: AskNaturalistInput['context'],
    history?: AskNaturalistInput['history']
  ): Promise<AskNaturalistResult> {
    // 1. RAG Retrieval: Search database for relevant species and taxonomic knowledge
    const retrievedSpecies = await this.retrieveRelevantSpecies(message, context);
    const sources = this.buildSourceReferences(retrievedSpecies, context);

    let systemContext =
      'You are Naturalist AI (Reddy), an authoritative, friendly arachnologist and spider educator for the redBack.ai application.\n\n' +
      '### STRICT INSTRUCTIONS:\n' +
      '1. LANGUAGE: You MUST communicate EXCLUSIVELY in professional, scientific, authoritative English. NEVER use Moroccan Darija (Moroccan Arabic), Arabic, French, or slang under any circumstances, even if the user writes in Darija or another language. Understand the question and answer purely in English.\n' +
      '2. RESPONSE STRUCTURE (MARKDOWN):\n' +
      '   - Structure your response cleanly using concise Markdown headings (e.g., "### Specimen Overview", "### Identification & Morphology", "### Venom & Safety Protocol").\n' +
      '   - Use bullet points (- item) for clear readability.\n' +
      '   - Highlight key diagnostic traits, danger levels, or clinical markers using double plus: ++key feature++ (e.g. ++Red longitudinal stripe++, ++High toxicity++, ++Apply cold pack++). Our mobile UI renders ++text++ as an elegant green highlight badge.\n' +
      '   - Emphasize important terms using bold (**term**).\n' +
      '   - NEVER output ugly delimiter symbols like ||, ~, ~~, or corrupt table lines.\n' +
      '   - Keep the tone authoritative, educational, reassuring, and concise.';

    if (context?.name || context?.scientific) {
      systemContext += `\nThe user is specifically asking about ${context.name || ''} (${context.scientific || ''}).`;
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
      systemContext += 'Use the retrieved facts above as the ground truth for your explanation. If asked about danger or first aid, emphasize the exact medical safety protocols. Ground all claims strictly in the retrieved field and catalog knowledge. Avoid presenting unsupported document-specific claims when context is insufficient.';
    }

    // 1. Try Official DeepSeek AI for Chat
    try {
      const { deepseekClient } = await import('../../services/ai/deepseek.client');
      const dsReply = await deepseekClient.generateChatReply(systemContext, message, history);
      if (dsReply) {
        return { reply: this.cleanAiReply(dsReply), sources };
      }
    } catch (err) {
      console.warn('[AIService] DeepSeek chat attempt failed:', err);
    }

    // 2. Try Groq (Ultra-speed fallback)
    try {
      const { groqClient } = await import('../../services/ai/groq.client');
      const groqReply = await groqClient.generateChatReply(systemContext, message, history);
      if (groqReply) {
        return { reply: this.cleanAiReply(groqReply), sources };
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
          return { reply: this.cleanAiReply(reply), sources };
        }
      } catch (err) {
        console.warn('[AIService] Gemini request failed, using database RAG fallback:', err);
      }
    }

    const fallbackReply = this.buildRagFallbackAnswer(message, retrievedSpecies, context);
    return { reply: this.cleanAiReply(fallbackReply), sources };
  }

  /**
   * Sanitizes AI responses into clean Markdown and normalizes highlight tokens.
   */
  cleanAiReply(rawReply: string): string {
    if (!rawReply) return '';
    let text = rawReply;

    // Convert ||text|| or ~~text~~ or ~text~ to ++text++ (green highlight)
    text = text.replace(/\|\|([^|\n]+)\|\|/g, '++$1++');
    text = text.replace(/~~([^~\n]+)~~/g, '++$1++');
    text = text.replace(/~([^~\n]+)~/g, '++$1++');

    // Strip stray unclosed pipes or tildes
    text = text.replace(/\|{2,}/g, '');
    text = text.replace(/(?<!\w)~{1,}(?!\w)/g, '');

    // Normalize multiple newlines
    text = text.replace(/\n{3,}/g, '\n\n').trim();

    return text;
  }

  buildSourceReferences(
    retrievedSpecies: any[],
    context?: AskNaturalistInput['context']
  ): SourceReference[] {
    if (!retrievedSpecies || retrievedSpecies.length === 0) {
      if (context?.name || context?.scientific) {
        return [
          {
            title: context.name || 'Specimen Query',
            scientificName: context.scientific,
            sourceType: 'field_guide',
            section: 'Observation Context',
            pageOrChunk: 'chunk-1',
            citation: `redBack.ai Field Guide [${context.scientific || context.name}]`,
            snippet: context.venomInfo || context.habitat,
          },
        ];
      }
      return [];
    }

    return retrievedSpecies.map((sp, idx) => {
      const section = sp.toxicityLevel
        ? `Toxicity & Venom Profile (${String(sp.toxicityLevel).toUpperCase()})`
        : 'Morphology & Field Notes';
      const pageOrChunk = `chunk-${idx + 1}`;
      const citation = `redBack.ai Catalog [Family ${sp.family || 'Araneae'}] §${idx + 1}`;

      return {
        id: sp._id?.toString() || `src-${idx + 1}`,
        title: sp.commonName || sp.scientificName || 'Arachnid Specimen',
        scientificName: sp.scientificName,
        family: sp.family,
        sourceType: 'species_catalog',
        section,
        pageOrChunk,
        citation,
        snippet: sp.venomInfo || sp.description || sp.behavior || undefined,
      };
    });
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
      return `### Specimen Inquiry\nI am Naturalist AI (Reddy), your field arachnologist connected directly to the **redBack.ai** species database.\n\nYou can ask me about ++spider identification++, clinical bite first aid, venom potency, field habitats, or look-alike distinctions.\n\nTip: Submit a field photo or select a species from the catalog to ground our discussion.`;
    }

    const nameStr = `${mainSpecies.commonName} (*${mainSpecies.scientificName}*)`;

    // Danger / Venom / Bite query
    if (qLower.includes('danger') || qLower.includes('venom') || qLower.includes('toxic') || qLower.includes('bite') || qLower.includes('hurt') || qLower.includes('poison')) {
      const isDangerous = mainSpecies.toxicityLevel === 'deadly' || mainSpecies.toxicityLevel === 'danger';
      const triage = isDangerous
        ? `### Clinical Danger Level\n⚠️ **Assessment**: ++High Toxicity++ (${String(mainSpecies.toxicityLevel).toUpperCase()}).`
        : `### Clinical Danger Level\n✅ **Assessment**: ++Mild / Low Toxicity++ (${mainSpecies.toxicityLevel || 'harmless'}).`;

      const firstAid = mainSpecies.firstAid || 'Clean wound with antiseptic. Apply cool pack. Seek medical advice if pain or systemic symptoms develop.';

      return `${triage}\n\n### Specimen Notes\nRegarding **${nameStr}**:\n${mainSpecies.venomInfo}\n\n### First Aid Protocol\n- ++${firstAid}++\n\nTip: Never squeeze or attempt to crush a venomous spider with bare hands. Seek urgent emergency care if bitten.`;
    }

    // Anatomy / Identification / Morphology query
    if (qLower.includes('identif') || qLower.includes('anatomy') || qLower.includes('feature') || qLower.includes('look') || qLower.includes('marker') || qLower.includes('recognize')) {
      const markers = mainSpecies.morphology?.keyFeatures?.length > 0
        ? mainSpecies.morphology.keyFeatures.map((f: string) => `- ++${f}++`).join('\n')
        : `- **Family:** ${mainSpecies.family}\n- **Eye Pattern:** ++${mainSpecies.morphology?.eyePattern || 'Diagnostic arrangement'}++\n- **Body Length:** ${mainSpecies.morphology?.bodyLengthMm || 'Variable'}`;

      return `### Diagnostic Morphology\nKey field identification markers for **${nameStr}**:\n\n${markers}\n\n### Habitat & Distribution\nFound in ${mainSpecies.habitat}. ${mainSpecies.behavior || ''}\n\nTip: Inspect abdominal dorsal markings and web scaffolding from a safe 30 cm distance.`;
    }

    // Lookalike query
    if (qLower.includes('compare') || qLower.includes('look-alike') || qLower.includes('similar') || qLower.includes('confus')) {
      return `### Comparative Identification\nComparing **${nameStr}** with common confusion look-alikes:\n\n- **Identified Specimen:** ${mainSpecies.commonName} (${mainSpecies.scientificName}) has distinct diagnostic markers: ++${mainSpecies.morphology?.keyFeatures?.[0] || 'unique abdominal pattern'}++.\n- **Look-Alike Distinction:** Common confusion species often differ in web architecture, dorsal stripe saturation, and leg spines.\n- **Safety Profile:** ${mainSpecies.venomInfo}\n\nTip: Take photos from multiple angles (dorsal and lateral) to distinguish subtle taxonomic differences.`;
    }

    // General query grounded in DB
    return `### Specimen Overview\nRegarding **${mainSpecies.commonName}** (*${mainSpecies.scientificName}*):\n\n- **Taxonomy:** Family ${mainSpecies.family}, Genus ${mainSpecies.genus}\n- **Habitat & Range:** ${mainSpecies.habitat} (${mainSpecies.distribution})\n- **Venom & Behavior:** ++${mainSpecies.venomInfo || 'Non-venomous'}++. ${mainSpecies.behavior || ''}\n\nTip: Feel free to ask about specific bite protocols, morphology keys, or look-alike comparisons.`;
  }

  // === Persistent Conversation Management (RAB-11) ===

  async createConversation(
    userId: string,
    title?: string,
    speciesContext?: { name?: string; scientific?: string; family?: string },
    initialMessage?: string
  ) {
    const defaultTitle =
      title ||
      (speciesContext?.name
        ? `Discussion: ${speciesContext.name}`
        : 'Naturalist AI Consultation');

    const conversation = new Conversation({
      userId,
      title: defaultTitle,
      speciesContext,
      messages: [],
    });

    if (initialMessage && initialMessage.trim()) {
      conversation.messages.push({
        role: 'user',
        content: initialMessage.trim(),
        timestamp: new Date(),
      });

      const aiResult = await this.askNaturalist(
        initialMessage,
        speciesContext,
        []
      );

      conversation.messages.push({
        role: 'assistant',
        content: aiResult.reply,
        sources: aiResult.sources,
        timestamp: new Date(),
      });
    }

    await conversation.save();
    return conversation;
  }

  async getUserConversations(userId: string) {
    return Conversation.find({ userId })
      .select('title speciesContext messages createdAt updatedAt')
      .sort({ updatedAt: -1 })
      .lean();
  }

  async getConversationById(conversationId: string, userId: string) {
    const conversation = await Conversation.findOne({ _id: conversationId, userId });
    if (!conversation) {
      throw new AppError('Conversation not found or access denied', 404);
    }
    return conversation;
  }

  async addMessageToConversation(conversationId: string, userId: string, message: string) {
    const conversation = await Conversation.findOne({ _id: conversationId, userId });
    if (!conversation) {
      throw new AppError('Conversation not found or access denied', 404);
    }

    // Convert previous messages to chat history format
    const history: AskNaturalistInput['history'] = conversation.messages.map((m) => ({
      role: m.role,
      content: m.content,
    }));

    // Record user message
    conversation.messages.push({
      role: 'user',
      content: message.trim(),
      timestamp: new Date(),
    });

    // Generate AI response grounded in retrieved knowledge
    const aiResult = await this.askNaturalist(
      message,
      conversation.speciesContext,
      history
    );

    // Record assistant response with source references
    conversation.messages.push({
      role: 'assistant',
      content: aiResult.reply,
      sources: aiResult.sources,
      timestamp: new Date(),
    });

    await conversation.save();

    return {
      conversation,
      reply: aiResult.reply,
      sources: aiResult.sources,
    };
  }

  async deleteConversation(conversationId: string, userId: string) {
    const result = await Conversation.findOneAndDelete({ _id: conversationId, userId });
    if (!result) {
      throw new AppError('Conversation not found or access denied', 404);
    }
    return true;
  }
}

export const aiService = new AIService();
