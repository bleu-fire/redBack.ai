import { SourceReference } from '@/data/api/types';

export interface StructuredChatMessage {
  id: string;
  sender: 'user' | 'bot';
  time: string;
  text?: string;
  intro?: string;
  supportingPoints?: string[];
  uncertainPoints?: string[];
  actionSteps?: { number: number; text: string }[];
  sources?: SourceReference[];
  tip?: string;
}

