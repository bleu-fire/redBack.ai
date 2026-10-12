import https from 'https';
import { VISION_CONFIG, GeminiMatchResult } from './vision.types';

export class GeminiVisionClient {
  async askGeminiVision(
    imageBuffer?: Buffer,
    mimeType = 'image/jpeg'
  ): Promise<GeminiMatchResult | null> {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey || !imageBuffer) {
      return null;
    }

    const base64Data = imageBuffer.toString('base64');
    const prompt = `You are an expert arachnologist. Identify this spider specimen.
Analyze morphological diagnostic traits (eye pattern, abdominal markings, color, leg spines).
Return valid JSON only with keys:
"scientificName": string (e.g. "Latrodectus tredecimguttatus" or "Latrodectus hasselti"),
"commonName": string,
"confidence": float between 0.50 and 0.99,
"visualEvidence": array of 2 short strings describing key visible markers.`;

    const payload = JSON.stringify({
      contents: [
        {
          parts: [
            { text: prompt },
            { inline_data: { mime_type: mimeType, data: base64Data } },
          ],
        },
      ],
      generationConfig: { response_mime_type: 'application/json' },
    });

    return new Promise((resolve) => {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${VISION_CONFIG.GEMINI_MODEL}:generateContent?key=${apiKey}`;
      const req = https.request(
        url,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(payload),
          },
          timeout: 20000,
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
                const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
                if (text) {
                  const cleanJson = text.replace(/```json\s*/gi, '').replace(/```\s*$/gi, '').trim();
                  resolve(JSON.parse(cleanJson));
                } else {
                  resolve(null);
                }
              } else {
                console.warn(`[VisionAI] Gemini API returned ${res.statusCode}: ${rawData.slice(0, 150)}`);
                resolve(null);
              }
            } catch (err) {
              console.warn('[VisionAI] Failed parsing response:', err);
              resolve(null);
            }
          });
        }
      );

      req.on('error', (err) => {
        console.warn('[VisionAI] Request error:', err.message);
        resolve(null);
      });

      req.on('timeout', () => {
        req.destroy();
        console.warn('[VisionAI] Request timed out');
        resolve(null);
      });

      req.write(payload);
      req.end();
    });
  }
}

export const geminiVisionClient = new GeminiVisionClient();
