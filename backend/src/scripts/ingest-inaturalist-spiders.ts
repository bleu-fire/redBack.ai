import 'dotenv/config';
import path from 'path';
import { pineconeService } from '../config/pinecone';
import { groqClient, GroqVisionResult } from '../services/ai/groq.client';
import { geminiVisionClient } from '../services/ai/gemini-vision.client';
import {
  InatPhoto,
  InatObservation,
  PendingPhoto,
  VisualDescriptionError,
  sleep,
  fetchWithRetry,
  imageUrl,
  loadCheckpoint,
  embedAndUpsert,
} from './inat-ingest.helpers';

const TARGET_COUNT = Number(process.env.INAT_SPIDER_IMAGE_COUNT || 2000);
const NAMESPACE = process.env.INAT_PINECONE_NAMESPACE || 'inaturalist-spiders';
const BATCH_SIZE = 32;
const UPSERT_SIZE = 100;
const CHECKPOINT_PATH = path.resolve(__dirname, '../../data/inaturalist-spider-ingest-checkpoint.json');
const ACCEPTED_LICENSES = new Set(['cc0', 'cc-by']);
const INAT_OBSERVATIONS = 'https://api.inaturalist.org/v1/observations';

async function makePendingPhoto(observation: InatObservation, photo: InatPhoto): Promise<PendingPhoto | null> {
  const url = imageUrl(photo.url);
  const imageResponse = await fetchWithRetry(url);
  if (!imageResponse.ok) return null;
  const imageBuffer = Buffer.from(await imageResponse.arrayBuffer());
  if (imageBuffer.length === 0) return null;

  let visionResult: GroqVisionResult | null = null;
  let visionError: unknown;
  if (process.env.GROQ_API_KEY) {
    try {
      visionResult = await groqClient.identifySpiderImage(
        imageBuffer,
        imageResponse.headers.get('content-type') || 'image/jpeg',
        true
      );
    } catch (error) {
      visionError = error;
    }
  }

  if (!visionResult && process.env.GEMINI_API_KEY) {
    try {
      const geminiResult = await geminiVisionClient.askGeminiVision(
        imageBuffer,
        imageResponse.headers.get('content-type') || 'image/jpeg'
      );
      if (geminiResult?.scientificName || geminiResult?.commonName) {
        visionResult = {
          isSpider: true,
          scientificName: geminiResult.scientificName,
          commonName: geminiResult.commonName,
          confidence: geminiResult.confidence || 0.9,
          visualEvidence: geminiResult.visualEvidence || [],
        };
      }
    } catch (error) {
      visionError = error;
    }
  }

  if (!visionResult) {
    const detail = visionError instanceof Error ? ` ${visionError.message}` : '';
    throw new VisualDescriptionError(
      `No visual provider could describe photo ${photo.id}.${detail} Add a Gemini key or increase Groq vision quota.`
    );
  }
  if (visionResult.isSpider === false) {
    console.log(`Skipping photo ${photo.id}: vision model did not confirm a spider.`);
    return null;
  }
  if (!visionResult.visualEvidence?.length) {
    throw new VisualDescriptionError(`Groq returned no visual evidence for photo ${photo.id}; refusing taxonomy-only vectors.`);
  }

  const scientificName = observation.taxon?.name || 'Araneae';
  const commonName = observation.taxon?.preferred_common_name || 'Spider';
  const photoAttribution = photo.attribution || `Photo by ${observation.user?.login || 'unknown iNaturalist observer'}`;
  const license = photo.license_code || 'unknown';
  const visionSpecies = [visionResult.commonName, visionResult.scientificName].filter(Boolean).join(' ');
  const text = `Spider photograph. iNaturalist species: ${commonName} (${scientificName}). Vision description: ${visionSpecies}. Visible features: ${visionResult.visualEvidence.join('; ')}.`;

  return {
    id: `inat-photo-${photo.id}`,
    text,
    metadata: {
      source: 'iNaturalist',
      observationId: observation.id,
      photoId: photo.id,
      scientificName,
      commonName,
      observedOn: observation.observed_on || 'unknown',
      placeGuess: observation.place_guess || 'unknown',
      observer: observation.user?.login || 'unknown',
      attribution: photoAttribution,
      license,
      imageUrl: url,
      observationUrl: `https://www.inaturalist.org/observations/${observation.id}`,
    },
  };
}

async function main(): Promise<void> {
  if (!process.env.GROQ_API_KEY && !process.env.GEMINI_API_KEY) {
    throw new Error('GROQ_API_KEY or GEMINI_API_KEY is required to derive visual descriptions from the spider photos.');
  }
  if (!pineconeService.isConfigured()) {
    throw new Error('PINECONE_API_KEY is required to embed and index the photos.');
  }

  const checkpoint = loadCheckpoint(CHECKPOINT_PATH);
  const completed = new Set(checkpoint.completedPhotoIds);
  const selected = new Set<string>();
  const pending: PendingPhoto[] = [];
  let page = 1;
  let importedThisRun = 0;

  console.log(`Collecting up to ${TARGET_COUNT} worldwide spider photos into namespace "${NAMESPACE}".`);
  console.log(`Already indexed in checkpoint: ${completed.size}`);

  while (completed.size < TARGET_COUNT && page <= 250) {
    const params = new URLSearchParams({
      taxon_id: '47118',
      quality_grade: 'research',
      photos: 'true',
      per_page: '200',
      page: String(page),
      order_by: 'observed_on',
      order: 'desc',
    });
    const observationsResponse = await fetchWithRetry(`${INAT_OBSERVATIONS}?${params}`);
    if (!observationsResponse.ok) {
      throw new Error(`iNaturalist returned HTTP ${observationsResponse.status}`);
    }
    const payload: any = await observationsResponse.json();
    const observations: InatObservation[] = Array.isArray(payload) ? payload : payload.results || [];
    if (observations.length === 0) break;

    for (const observation of observations) {
      for (const photo of observation.photos || []) {
        const id = `inat-photo-${photo.id}`;
        const license = (photo.license_code || '').toLowerCase();
        if (!photo.id || !photo.url || !ACCEPTED_LICENSES.has(license) || completed.has(id) || selected.has(id)) continue;

        try {
          const item = await makePendingPhoto(observation, photo);
          if (!item) continue;
          pending.push(item);
          selected.add(id);
          if (pending.length >= BATCH_SIZE) {
            importedThisRun += await embedAndUpsert({
              pending: pending.splice(0),
              checkpoint,
              checkpointPath: CHECKPOINT_PATH,
              completed,
              namespace: NAMESPACE,
              batchSize: BATCH_SIZE,
              upsertSize: UPSERT_SIZE,
            });
            console.log(`Indexed ${completed.size}/${TARGET_COUNT} photos (iNaturalist page ${page}).`);
          }
        } catch (error) {
          if (error instanceof VisualDescriptionError) throw error;
          console.warn(`Could not process photo ${photo.id}; continuing.`, error);
        }

        if (completed.size + pending.length >= TARGET_COUNT) break;
        await sleep(1000);
      }
      if (completed.size + pending.length >= TARGET_COUNT) break;
    }

    page++;
    await sleep(1100);
  }

  if (pending.length > 0) {
    importedThisRun += await embedAndUpsert({
      pending,
      checkpoint,
      checkpointPath: CHECKPOINT_PATH,
      completed,
      namespace: NAMESPACE,
      batchSize: BATCH_SIZE,
      upsertSize: UPSERT_SIZE,
    });
  }
  console.log(`Finished. Indexed ${completed.size} photos total in namespace "${NAMESPACE}" (added ${importedThisRun} this run).`);
}

main().catch((error) => {
  console.error('[iNaturalist spider ingestion failed]', error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
