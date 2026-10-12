export interface ChatContext {
  name?: string;
  scientific?: string;
  venomInfo?: string;
  habitat?: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant' | 'model';
  content: string;
}

export interface AskNaturalistInput {
  message: string;
  context?: ChatContext;
  history?: ChatMessage[];
}
