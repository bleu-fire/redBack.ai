import https from 'https';
import { ChatMessage } from './ai.types';

export class GeminiChatClient {
  async generateChatReply(
    apiKey: string,
    systemContext: string,
    message: string,
    history?: ChatMessage[]
  ): Promise<string | null> {
    const contents: any[] = [];

    if (history && Array.isArray(history) && history.length > 0) {
      for (const msg of history.slice(-6)) {
        contents.push({
          role: msg.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: msg.content }],
        });
      }
    }

    const userPrompt = `${systemContext}\n\nUser Question: ${message}\n\nPlease keep the response clear, engaging, educational, and under 3 paragraphs. Always remind the user to seek immediate emergency medical care if bitten by a venomous spider.`;

    contents.push({
      role: 'user',
      parts: [{ text: userPrompt }],
    });

    const payload = JSON.stringify({ contents });

    return new Promise((resolve) => {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=${apiKey}`;
      const req = https.request(
        url,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(payload),
          },
          timeout: 5000,
        },
        (res) => {
          let rawData = '';
          res.on('data', (chunk) => {
            rawData += chunk;
          });
          res.on('end', () => {
            try {
              if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
                const data = JSON.parse(rawData);
                const replyText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
                resolve(replyText ? replyText.trim() : null);
              } else {
                console.warn(`[GeminiChat] API error ${res.statusCode}: ${rawData.slice(0, 150)}`);
                resolve(null);
              }
            } catch (err) {
              console.warn('[GeminiChat] Failed parsing response:', err);
              resolve(null);
            }
          });
        }
      );

      req.on('error', (err) => {
        console.warn('[GeminiChat] Network request error:', err.message);
        resolve(null);
      });

      req.on('timeout', () => {
        req.destroy();
        console.warn('[GeminiChat] Request timed out');
        resolve(null);
      });

      req.write(payload);
      req.end();
    });
  }
}

export const geminiChatClient = new GeminiChatClient();
