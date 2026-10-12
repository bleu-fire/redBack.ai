import https from 'https';

export interface GroqVisionResult {
  isSpider: boolean;
  detectedSubject?: string;
  scientificName?: string;
  commonName?: string;
  confidence: number;
  visualEvidence: string[];
  rejectionReason?: string;
}

export class GroqClient {
  private getApiKey(): string {
    return process.env.GROQ_API_KEY || '';
  }

  private getModel(type: 'vision' | 'chat'): string {
    if (type === 'vision') {
      return process.env.GROQ_VISION_MODEL || 'qwen/qwen3.8-27b';
    }
    return process.env.GROQ_CHAT_MODEL || 'qwen/qwen3.8-27b';
  }

  /**
   * Multimodal Vision Analysis using Groq
   * Strictly distinguishes between spiders (Araneae) and humans/objects/animals.
   */
  async identifySpiderImage(
    imageBuffer: Buffer,
    mimeType: string = 'image/jpeg'
  ): Promise<GroqVisionResult | null> {
    const apiKey = this.getApiKey();
    if (!apiKey || !imageBuffer) return null;

    const base64Img = imageBuffer.toString('base64');
    const prompt = `You are a strict computer vision and arachnid classification specialist for redBack.ai.
STEP 1 - CLASSIFY SUBJECT:
Determine whether this image actually contains a SPIDER (order Araneae), or if it is a HUMAN (person, face, skin, hand, fingers, body), PET, INSECT (fly, bee, ant), or INANIMATE OBJECT.

CASE A: If the image is a HUMAN (face, hand, selfie, person, skin) or any NON-SPIDER object:
Return:
{
  "isSpider": false,
  "detectedSubject": "Human face" (or "Human hand", "Person", "Domestic object"),
  "confidence": 0.98,
  "visualEvidence": [
    "Human skin texture and anatomical features observed",
    "No chelicerae fangs, ocular arrangement, or 8-legged arachnid morphology"
  ],
  "rejectionReason": "This image contains a human/non-spider subject, not an arachnid."
}

CASE B: If the image DOES contain a SPIDER:
Return:
{
  "isSpider": true,
  "detectedSubject": "Spider",
  "scientificName": "Scientific binomial name",
  "commonName": "Standard English common name",
  "confidence": 0.94,
  "visualEvidence": [
    "Specific trait observed (e.g. fangs, ocular layout, dorsal marking)",
    "Another diagnostic marker"
  ]
}

Respond in valid JSON only.`;

    const payload = JSON.stringify({
      model: this.getModel('vision'),
      messages: [
        {
          role: 'user',
          content: [
            { type: 'text', text: prompt },
            {
              type: 'image_url',
              image_url: {
                url: `data:${mimeType};base64,${base64Img}`,
              },
            },
          ],
        },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.1,
      max_tokens: 500,
    });

    return new Promise((resolve) => {
      const req = https.request(
        {
          hostname: 'api.groq.com',
          path: '/openai/v1/chat/completions',
          method: 'POST',
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(payload),
          },
          timeout: 12000,
        },
        (res) => {
          let rawData = '';
          res.on('data', (chunk) => (rawData += chunk));
          res.on('end', () => {
            try {
              if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
                const data = JSON.parse(rawData);
                const content = data?.choices?.[0]?.message?.content;
                if (content) {
                  const parsed = JSON.parse(content);
                  const conf = typeof parsed.confidence === 'number' 
                    ? parsed.confidence 
                    : parseFloat(parsed.confidence) || 0.90;
                  
                  const isSpider = Boolean(parsed.isSpider);

                  resolve({
                    isSpider,
                    detectedSubject: parsed.detectedSubject || (isSpider ? 'Spider' : 'Non-spider'),
                    scientificName: parsed.scientificName || undefined,
                    commonName: parsed.commonName || undefined,
                    confidence: Math.min(0.99, Math.max(0.6, conf > 1 ? conf / 100 : conf)),
                    visualEvidence: Array.isArray(parsed.visualEvidence) ? parsed.visualEvidence : [],
                    rejectionReason: parsed.rejectionReason || undefined,
                  });
                  return;
                }
              } else {
                console.warn(`[GroqClient] Vision error ${res.statusCode}: ${rawData.slice(0, 150)}`);
              }
            } catch (err) {
              console.warn('[GroqClient] Parse error:', err);
            }
            resolve(null);
          });
        }
      );

      req.on('error', (err) => {
        console.warn('[GroqClient] Request error:', err.message);
        resolve(null);
      });

      req.on('timeout', () => {
        req.destroy();
        console.warn('[GroqClient] Vision request timed out');
        resolve(null);
      });

      req.write(payload);
      req.end();
    });
  }

  /**
   * Fast Naturalist AI Chat with Groq
   */
  async generateChatReply(
    systemPrompt: string,
    userMessage: string,
    history?: { role: string; content: string }[]
  ): Promise<string | null> {
    const apiKey = this.getApiKey();
    if (!apiKey) return null;

    const messages: any[] = [{ role: 'system', content: systemPrompt }];

    if (history && Array.isArray(history)) {
      for (const msg of history.slice(-6)) {
        messages.push({
          role: msg.role === 'assistant' ? 'assistant' : 'user',
          content: msg.content,
        });
      }
    }

    messages.push({ role: 'user', content: userMessage });

    const payload = JSON.stringify({
      model: this.getModel('chat'),
      messages,
      temperature: 0.6,
      max_tokens: 600,
    });

    return new Promise((resolve) => {
      const req = https.request(
        {
          hostname: 'api.groq.com',
          path: '/openai/v1/chat/completions',
          method: 'POST',
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(payload),
          },
          timeout: 10000,
        },
        (res) => {
          let rawData = '';
          res.on('data', (chunk) => (rawData += chunk));
          res.on('end', () => {
            try {
              if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
                const data = JSON.parse(rawData);
                const text = data?.choices?.[0]?.message?.content;
                resolve(text ? text.trim() : null);
                return;
              }
            } catch (err) {
              console.warn('[GroqClient] Chat parse error:', err);
            }
            resolve(null);
          });
        }
      );

      req.on('error', (err) => {
        console.warn('[GroqClient] Chat request error:', err.message);
        resolve(null);
      });

      req.on('timeout', () => {
        req.destroy();
        console.warn('[GroqClient] Chat request timed out');
        resolve(null);
      });

      req.write(payload);
      req.end();
    });
  }
}

export const groqClient = new GroqClient();
export default groqClient;
