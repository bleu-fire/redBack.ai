import https from 'https';

export class DeepSeekClient {
  private getApiKey(): string {
    return process.env.DEEPSEEK_API_KEY || '';
  }

  private getModel(): string {
    return process.env.DEEPSEEK_MODEL || 'deepseek-chat';
  }

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
      model: this.getModel(),
      messages,
      temperature: 0.7,
      max_tokens: 600,
    });

    return new Promise((resolve) => {
      const req = https.request(
        {
          hostname: 'api.deepseek.com',
          path: '/chat/completions',
          method: 'POST',
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(payload),
          },
          timeout: 15000,
        },
        (res) => {
          let rawData = '';
          res.on('data', (chunk) => (rawData += chunk));
          res.on('end', () => {
            try {
              if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
                const data = JSON.parse(rawData);
                const reply = data?.choices?.[0]?.message?.content;
                resolve(reply ? reply.trim() : null);
                return;
              } else {
                console.warn(`[DeepSeekClient] Error ${res.statusCode}: ${rawData.slice(0, 150)}`);
              }
            } catch (err) {
              console.warn('[DeepSeekClient] Parse error:', err);
            }
            resolve(null);
          });
        }
      );

      req.on('error', (err) => {
        console.warn('[DeepSeekClient] Request error:', err.message);
        resolve(null);
      });

      req.on('timeout', () => {
        req.destroy();
        console.warn('[DeepSeekClient] Request timed out');
        resolve(null);
      });

      req.write(payload);
      req.end();
    });
  }
}

export const deepseekClient = new DeepSeekClient();
export default deepseekClient;
