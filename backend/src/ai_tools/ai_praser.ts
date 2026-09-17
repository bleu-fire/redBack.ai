<<<<<<< Updated upstream
import * as fs from "fs";
import pdf from "pdf-parse";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

export interface SpiderChunkMetadata {
  source: string;
  page?: number;
  speciesName?: string;
  dangerLevel?: "high" | "moderate" | "low" | "unknown";
  hasFirstAidInfo: boolean;
}

export interface ChunkedDocument {
  content: string;
  metadata: SpiderChunkMetadata;
}

/**
 * Extracts metadata hints from chunk content
 */
function extractSpiderMetadata(text: string, source: string): SpiderChunkMetadata {
  const lower = text.toLowerCase();

  // Basic classification heuristics (expand based on your PDF structure)
  let dangerLevel: SpiderChunkMetadata["dangerLevel"] = "unknown";
  if (lower.includes("deadly") || lower.includes("medically significant") || lower.includes("antivenom")) {
    dangerLevel = "high";
  } else if (lower.includes("mild pain") || lower.includes("localized swelling")) {
    dangerLevel = "moderate";
  } else if (lower.includes("harmless") || lower.includes("non-toxic")) {
    dangerLevel = "low";
  }

  // Detect first-aid / emergency management instructions
  const hasFirstAidInfo =
    lower.includes("first aid") ||
    lower.includes("pressure immobilisation") ||
    lower.includes("cold compress") ||
    lower.includes("tourniquet");

  // Attempt to match common Latin binomial nomenclature (e.g., Latrodectus hasselti)
  const binomialMatch = text.match(/\b([A-Z][a-z]+ [a-z]{3,})\b/);

  return {
    source,
    speciesName: binomialMatch ? binomialMatch[1] : undefined,
    dangerLevel,
    hasFirstAidInfo,
  };
}

/**
 * Main ingestion & chunking function
 */
export async function processSpiderPdf(filePath: string): Promise<ChunkedDocument[]> {
  const dataBuffer = fs.readFileSync(filePath);

  // 1. Parse raw PDF text
  const pdfData = await pdf(dataBuffer);
  const rawText = pdfData.text;

  // 2. Configure Recursive Splitting
  // Keeps natural boundaries: paragraphs -> line breaks -> sentences -> words
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 600,       // ~120-150 words: tight enough for dense clinical/taxonomic facts
    chunkOverlap: 80,      // preserves context across split boundaries
    separators: ["\n\n", "\n", ". ", "; ", " ", ""],
  });

  // 3. Generate raw string chunks
  const textChunks = await splitter.splitText(rawText);

  // 4. Map into structured documents with metadata for vector search
  const documents: ChunkedDocument[] = textChunks.map((chunkText) => {
    return {
      content: chunkText.trim(),
      metadata: extractSpiderMetadata(chunkText, filePath),
    };
  });

  return documents;
}

// Example runner (only executes when running this file directly):
async function run() {
  const pdfPath = process.env.PDF_PATH || "./searching/Spider-Guide-Wegner-BASF-Revised-12-2-14.pdf";
  if (fs.existsSync(pdfPath)) {
    const chunks = await processSpiderPdf(pdfPath);
    console.log(`Generated ${chunks.length} chunks.`);
    if (chunks.length > 0) {
      console.log("Sample chunk preview:", chunks[0]);
    }
  } else {
    console.log(`PDF not found at ${pdfPath}. Skipping standalone preview.`);
  }
}

if (require.main === module) {
  run().catch(console.error);
}
=======
>>>>>>> Stashed changes
