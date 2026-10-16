import https from 'https';
import { GroqVisionResult, GROQ_VISION_PROMPT } from './groq.types';

export { GroqVisionResult };

function postGroq(apiKey: string, payload: string, timeoutMs: number): Promise<{ statusCode?: number; headers: any; body: string }> {
  return new Promise((resolve, reject) => {
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
        timeout: timeoutMs,
      },
      (res) => {
        let body = '';
        res.on('data', (c) => (body += c));
        res.on('end', () => resolve({ statusCode: res.statusCode, headers: res.headers, body }));
      }
    );
    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Groq request timed out'));
    });
    req.write(payload);
    req.end();
  });
}

export class GroqClient {
  private getApiKey(): string {
    return process.env.GROQ_API_KEY || '';
  }

  private getModel(type: 'vision' | 'chat'): string {
    if (type === 'vision') return process.env.GROQ_VISION_MODEL || 'qwen/qwen3.8-27b';
    return process.env.GROQ_CHAT_MODEL || 'qwen/qwen3.8-27b';
  }

  /**
   * Multimodal Vision Analysis using Groq
   */
  async identifySpiderImage(
    imageBuffer: Buffer,
    mimeType: string = 'image/jpeg',
    throwOnRateLimit = false
  ): Promise<GroqVisionResult | null> {
    const apiKey = this.getApiKey();
    if (!apiKey || !imageBuffer) return null;

    const base64Img = imageBuffer.toString('base64');
    const payload = JSON.stringify({
      model: this.getModel('vision'),
      messages: [
        {
          role: 'user',
          content: [
            { type: 'text', text: GROQ_VISION_PROMPT },
            { type: 'image_url', image_url: { url: `data:${mimeType};base64,${base64Img}` } },
          ],
        },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.1,
      max_tokens: 500,
    });

    try {
      const res = await postGroq(apiKey, payload, 12000);
      if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
        const data = JSON.parse(res.body);
        const content = data?.choices?.[0]?.message?.content;
        if (content) {
          const parsed = JSON.parse(content);
          const conf = typeof parsed.confidence === 'number'
            ? parsed.confidence
            : parseFloat(parsed.confidence) || 0.9;
          const isSpider = Boolean(parsed.isSpider);

          return {
            isSpider,
            detectedSubject: parsed.detectedSubject || (isSpider ? 'Spider' : 'Non-spider'),
            scientificName: parsed.scientificName || undefined,
            commonName: parsed.commonName || undefined,
            confidence: Math.min(0.99, Math.max(0.6, conf > 1 ? conf / 100 : conf)),
            visualEvidence: Array.isArray(parsed.visualEvidence) ? parsed.visualEvidence : [],
            rejectionReason: parsed.rejectionReason || undefined,
          };
        }
      } else if (res.statusCode === 429 && throwOnRateLimit) {
        const retryAfter = Number(res.headers['retry-after']);
        const error: any = new Error('Groq vision rate limit reached');
        error.retryAfterMs = Number.isFinite(retryAfter) && retryAfter > 0 ? retryAfter * 1000 : undefined;
        throw error;
      }
    } catch (err: any) {
      if (throwOnRateLimit && err?.retryAfterMs) throw err;
      console.warn('[GroqClient] Vision request failed:', err?.message || err);
    }
    return null;
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

    try {
      const res = await postGroq(apiKey, payload, 10000);
      if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
        const data = JSON.parse(res.body);
        const text = data?.choices?.[0]?.message?.content;
        return text ? text.trim() : null;
      }
    } catch (err: any) {
      console.warn('[GroqClient] Chat request error:', err?.message || err);
    }
    return null;
  }
}

export const groqClient = new GroqClient();
export default groqClient;
