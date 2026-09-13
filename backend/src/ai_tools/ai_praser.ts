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

// Example usage:
async function run() {
  const chunks = await processSpiderPdf("./data/australian_spiders_guide.pdf");
  console.log(`Generated ${chunks.length} chunks.`);
  console.log("Sample chunk preview:", chunks[0]);
}

run().catch(console.error);