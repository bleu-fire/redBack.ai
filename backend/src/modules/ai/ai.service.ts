import Species from '../species/species.model';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || process.env.AI_API_KEY || '';

export class AIService {
  async askNaturalist(message: string, context?: { name?: string; scientific?: string }): Promise<string> {
    let systemContext =
      'You are Naturalist AI, a friendly and expert arachnologist and spider educator for the redBack.ai application. Answer questions accurately, concisely, and provide educational guidance on spider species, habitat, behavior, and bite safety.';

    if (context?.name || context?.scientific) {
      systemContext += ` The user is currently inquiring about ${context.name || ''} (${context.scientific || ''}).`;
    }

    if (GEMINI_API_KEY) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [
                {
                  role: 'user',
                  parts: [
                    {
                      text: `${systemContext}\n\nUser Question: ${message}\n\nPlease keep the response clear, engaging, and under 3 paragraphs. Always remind the user to seek immediate medical attention if bitten by a venomous spider.`,
                    },
                  ],
                },
              ],
            }),
          }
        );

        if (response.ok) {
          const data: any = await response.json();
          const replyText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (replyText) {
            return replyText.trim();
          }
        }
      } catch (geminiError) {
        console.warn('[AIChat] Gemini request error, falling back to local catalog:', geminiError);
      }
    }

    // Local Catalog Fallback
    const matched = await Species.findOne({
      $or: [
        { commonName: new RegExp(message, 'i') },
        { scientificName: new RegExp(message, 'i') },
        { family: new RegExp(message, 'i') },
      ],
    }).lean();

    if (matched) {
      return `Regarding **${matched.commonName}** (*${matched.scientificName}*): It belongs to the family ${matched.family}. Habitat: ${matched.habitat}. Venom info: ${matched.venomInfo || 'Non-venomous'}.`;
    }

    return `Hello! I'm your Naturalist AI assistant. I'm ready to answer any questions about spiders, bite safety, habitats, or taxonomy! If you've been bitten by an unidentified spider, please seek immediate emergency medical care.`;
  }
}

export const aiService = new AIService();
