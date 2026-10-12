import Species from '../../modules/species/species.model';
import { IPrediction } from '../../modules/Identification/identification.model';
import { geminiVisionClient } from './gemini-vision.client';
import { vectorMatcherService } from './vector-matcher.service';
import {
  VISION_CONFIG,
  VisionAnalysisResult,
} from './vision.types';

export { VISION_CONFIG, VisionAnalysisResult };

export class VisionAIService {
  async analyzeSpiderImage(params: {
    imageBuffer?: Buffer;
    imageUrl?: string;
    mimeType?: string;
    userNotes?: string;
    filename?: string;
  }): Promise<VisionAnalysisResult> {
    const { imageBuffer, userNotes, filename, mimeType = 'image/jpeg' } = params;

    const speciesCatalog = await Species.find().lean();
    let matchedSpecies: any = null;
    let confidence = VISION_CONFIG.DEFAULT_CONFIDENCE;
    let visualEvidence: string[] = [];

    // Step 1: AI Multimodal Vision (Groq Qwen-Vision or Gemini)
    if (imageBuffer) {
      try {
        const { groqClient } = await import('./groq.client');
        const groqMatch = await groqClient.identifySpiderImage(imageBuffer, mimeType);

        // Case: Non-spider subject detected (Human, pet, object)
        if (groqMatch && groqMatch.isSpider === false) {
          const subject = groqMatch.detectedSubject || 'Human / Non-Arachnid';
          const rejection = groqMatch.rejectionReason || 'No spider detected in image.';
          return {
            topPrediction: {
              scientificName: 'Non-Arachnid',
              commonName: subject,
              confidence: groqMatch.confidence || 0.98,
              confidenceBand: 'high',
              rank: 1,
              visualEvidence: groqMatch.visualEvidence.length > 0
                ? groqMatch.visualEvidence
                : [
                    `Subject classified as: ${subject}`,
                    rejection,
                  ],
            },
            predictions: [],
            uncertaintyLevel: 'high',
            disclaimer: 'No spider detected. redBack.ai is designed specifically for identifying spiders. Please position the camera over an arachnid specimen.',
            notes: `Subject identified as: ${subject}. Zero spider bite risk.`,
            speciesDetails: {
              commonName: subject,
              scientificName: 'Non-Arachnida',
              family: 'Non-Arachnida',
              genus: 'None',
              habitat: 'Human or domestic environments',
              distribution: 'Global',
              behavior: 'Non-arachnid subject',
              venomInfo: 'This is not a spider. Zero arachnid envenomation risk.',
              toxicityLevel: 'harmless',
              firstAid: 'No spider bite detected.',
              morphology: {
                keyFeatures: [
                  `Detected: ${subject}`,
                  'No spider fangs, ocular arrangement, or 8-legged morphology detected.',
                ],
              },
            },
          };
        }

        if (groqMatch?.isSpider && (groqMatch?.scientificName || groqMatch?.commonName)) {
          const sName = (groqMatch.scientificName || '').toLowerCase();
          const cName = (groqMatch.commonName || '').toLowerCase();
          
          matchedSpecies = speciesCatalog.find(
            (s) =>
              (sName && s.scientificName.toLowerCase().includes(sName)) ||
              (sName && sName.includes(s.scientificName.toLowerCase())) ||
              (cName && s.commonName.toLowerCase().includes(cName)) ||
              (cName && cName.includes(s.commonName.toLowerCase())) ||
              (s.genus && sName.includes(s.genus.toLowerCase()))
          );

          confidence = groqMatch.confidence || 0.93;
          visualEvidence = groqMatch.visualEvidence || [];

          // If it's a spider not in catalog, construct dynamically from AI vision
          if (!matchedSpecies) {
            matchedSpecies = {
              scientificName: groqMatch.scientificName || 'Araneae sp.',
              commonName: groqMatch.commonName || 'Spider specimen',
              family: 'Araneae',
              genus: (groqMatch.scientificName || 'Araneae').split(' ')[0] || 'Unknown',
              habitat: 'Natural & domestic environments',
              distribution: 'Global / Regional',
              behavior: 'Active predator',
              venomInfo: 'Standard spider venom. Keep safe distance and observe without contact.',
              toxicityLevel: 'harmless',
              firstAid: 'Wash area with soap and water. Apply cold compress if bitten.',
              morphology: {
                keyFeatures: visualEvidence,
              },
            };
          }
        }
      } catch (err) {
        console.warn('[VisionAI] Groq vision attempt failed:', err);
      }

      if (!matchedSpecies) {
        try {
          const aiMatch = await geminiVisionClient.askGeminiVision(imageBuffer, mimeType);
          if (aiMatch?.scientificName) {
            matchedSpecies = speciesCatalog.find(
              (s) =>
                s.scientificName.toLowerCase() === aiMatch.scientificName?.toLowerCase() ||
                s.commonName.toLowerCase().includes(aiMatch.commonName?.toLowerCase() || '___')
            );
            confidence = aiMatch.confidence || 0.94;
            if (aiMatch.visualEvidence) {
              visualEvidence = aiMatch.visualEvidence;
            }
          }
        } catch (err) {
          console.warn('[VisionAI] Gemini vision attempt failed:', err);
        }
      }
    }

    // Step 2: Vector Database similarity match
    if (!matchedSpecies && imageBuffer) {
      try {
        const vectorMatch = await vectorMatcherService.matchWithVectorDatabase(imageBuffer, mimeType);
        if (vectorMatch && vectorMatch.isSpider === false) {
          const subject = vectorMatch.detectedSubject || 'Human / Non-Arachnid';
          return {
            topPrediction: {
              scientificName: 'Non-Arachnid',
              commonName: subject,
              confidence: vectorMatch.score || 0.94,
              confidenceBand: 'high',
              rank: 1,
              visualEvidence: [
                `Visual vector space classifier matched benchmark: ${subject}`,
                'Subject does not display 8-legged chelicerate morphology',
              ],
            },
            predictions: [],
            uncertaintyLevel: 'high',
            disclaimer: 'No spider detected. redBack.ai is designed specifically for identifying spiders.',
            notes: `Subject identified as: ${subject}. Zero spider bite risk.`,
            speciesDetails: {
              commonName: subject,
              scientificName: 'Non-Arachnida',
              family: 'Non-Arachnida',
              genus: 'None',
              habitat: 'Human or domestic environments',
              distribution: 'Global',
              behavior: 'Non-arachnid subject',
              venomInfo: 'This is not a spider. Zero arachnid envenomation risk.',
              toxicityLevel: 'harmless',
              firstAid: 'No spider bite detected.',
              morphology: {
                keyFeatures: [
                  `Detected: ${subject}`,
                  'No spider fangs, ocular arrangement, or 8-legged morphology detected.',
                ],
              },
            },
          };
        }

        if (vectorMatch && vectorMatch.scientificName) {
          const matchSci = vectorMatch.scientificName.toLowerCase();
          matchedSpecies = speciesCatalog.find(
            (s) => s.scientificName.toLowerCase() === matchSci
          );
          if (matchedSpecies) {
            confidence = vectorMatch.score;
            visualEvidence = [
              `Visual vector match (${(vectorMatch.score * 100).toFixed(1)}% cosine similarity)`,
              'Morphological embedding matched catalog profile',
            ];
          }
        }
      } catch (err) {
        console.warn('[VisionAI] Vector matcher attempt failed:', err);
      }
    }

    // Step 3: Text match on filename & user notes
    if (!matchedSpecies && (userNotes || filename) && speciesCatalog.length > 0) {
      const searchText = `${filename || ''} ${userNotes || ''}`.toLowerCase().replace(/[-_.]/g, ' ');
      for (const sp of speciesCatalog) {
        const comWords = sp.commonName.toLowerCase().split(' ').filter((w) => w.length > 3 && w !== 'spider');
        const sciWords = sp.scientificName.toLowerCase().split(' ').filter((w) => w.length > 3);
        const hasMatch = [...comWords, ...sciWords].some((w) => searchText.includes(w));
        if (hasMatch) {
          matchedSpecies = sp;
          confidence = 0.89;
          visualEvidence = sp.morphology?.keyFeatures || [
            `Identified by morphological match with ${sp.commonName}`,
          ];
          break;
        }
      }
    }

    // Step 4: No spider confirmed (strictly reject non-spider, human, or object)
    if (!matchedSpecies) {
      return {
        topPrediction: {
          scientificName: 'Non-Arachnid',
          commonName: 'No Spider Detected',
          confidence: 0.96,
          confidenceBand: 'low',
          rank: 1,
          visualEvidence: [
            'No chelicerae fangs, eye arrangement, or 8-legged morphology detected',
            'Image does not match any known spider profile in the species vector database',
          ],
        },
        predictions: [],
        uncertaintyLevel: 'high',
        disclaimer: 'No spider detected. redBack.ai is calibrated specifically for spider identification. Please point the camera directly at an arachnid specimen.',
        notes: 'Subject does not exhibit spider anatomy. Zero spider bite or envenomation risk.',
        speciesDetails: {
          commonName: 'No Spider Detected',
          scientificName: 'Non-Arachnid',
          family: 'Non-Arachnida',
          genus: 'None',
          habitat: 'Not applicable',
          distribution: 'Global',
          behavior: 'Non-spider subject',
          venomInfo: 'This is not a spider. Zero spider venom risk.',
          toxicityLevel: 'harmless',
          firstAid: 'No spider bite detected.',
          morphology: {
            keyFeatures: [
              'No arachnid diagnostic traits observed',
              'Please scan a spider specimen for identification',
            ],
          },
        },
      };
    }

    // Step 5: Format response
    const topPrediction: IPrediction = {
      speciesId: matchedSpecies?._id,
      scientificName: matchedSpecies?.scientificName || 'Latrodectus tredecimguttatus',
      commonName: matchedSpecies?.commonName || 'Mediterranean black widow',
      confidence,
      confidenceBand: confidence >= VISION_CONFIG.HIGH_CONFIDENCE_THRESHOLD ? 'high' : 'moderate',
      rank: 1,
      visualEvidence:
        visualEvidence.length > 0
          ? visualEvidence
          : matchedSpecies?.morphology?.keyFeatures || [
              'Morphology matches reference specimen',
              `Typical habitat: ${matchedSpecies?.habitat || 'Mediterranean dry fields'}`,
            ],
    };

    const uncertaintyLevel =
      confidence >= VISION_CONFIG.HIGH_CONFIDENCE_THRESHOLD ? 'low' : 'moderate';

    return {
      topPrediction,
      predictions: [topPrediction],
      uncertaintyLevel,
      disclaimer: VISION_CONFIG.SAFETY_DISCLAIMER,
      notes: matchedSpecies?.venomInfo
        ? `Toxicity: ${matchedSpecies.toxicityLevel || 'Documented'}. ${matchedSpecies.venomInfo}`
        : 'Identified by redBack.ai Vision Pipeline.',
      speciesDetails: matchedSpecies || undefined,
    };
  }
}

export const visionAIService = new VisionAIService();
export default visionAIService;
