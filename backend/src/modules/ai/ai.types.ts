export interface ChatContext {
  name?: string;
  scientific?: string;
  venomInfo?: string;
  habitat?: string;
  documentId?: string;
  documentTitle?: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant' | 'model';
  content: string;
}

export interface SourceReference {
  id?: string;
  title: string;
  scientificName?: string;
  family?: string;
  sourceType: 'species_catalog' | 'field_guide' | 'clinical_protocol' | 'document';
  section?: string;
  pageOrChunk?: string;
  citation: string;
  snippet?: string;
}

export interface AskNaturalistResult {
  reply: string;
  sources: SourceReference[];
}

export interface AskNaturalistInput {
  message: string;
  context?: ChatContext;
  history?: ChatMessage[];
}

