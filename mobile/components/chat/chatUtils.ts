import { Layers, CheckCircle2, BookOpen, ShieldAlert } from 'lucide-react-native';
import { StructuredChatMessage } from './chat.types';

export const QUICK_PROMPTS = [
  { id: 'compare', icon: Layers, label: 'Compare look-alikes' },
  { id: 'explain', icon: CheckCircle2, label: 'Explain evidence' },
  { id: 'anatomy', icon: BookOpen, label: 'Key anatomy' },
  { id: 'danger', icon: ShieldAlert, label: 'Is it dangerous?' },
];

export const getInitialMessages = (
  speciesName: string,
  scientificName: string
): StructuredChatMessage[] => {
  const now = new Date();
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return [
    {
      id: 'greeting-init',
      sender: 'bot',
      time: timeStr,
      intro: `Hello! I am Naturalist AI (Reddy), your field arachnologist connected directly to the redBack.ai species database.`,
      supportingPoints: [
        `Specimen focus: ${speciesName} (${scientificName})`,
        'Ask about clinical venom danger, triage, and emergency first aid',
        'Inquire about eye pattern morphology and identification markers',
        'Compare against similar local and international look-alikes',
      ],
      tip: 'Tap any of the quick prompt chips below or type your observation question.',
    },
  ];
};

export const parseAiResponse = (
  raw: string
): { intro: string; points?: string[]; tip?: string } => {
  const lines = raw.split('\n').map((l) => l.trim()).filter(Boolean);
  const points: string[] = [];
  const introLines: string[] = [];
  let tipText: string | undefined;

  for (const line of lines) {
    if (line.toLowerCase().startsWith('tip:') || line.toLowerCase().startsWith('note:')) {
      tipText = line.replace(/^(tip:|note:)\s*/i, '');
    } else if (line.startsWith('- ') || line.startsWith('* ') || line.startsWith('• ')) {
      points.push(line.replace(/^[-*•]\s*/, ''));
    } else {
      introLines.push(line);
    }
  }

  return {
    intro: introLines.join('\n\n') || raw,
    points: points.length > 0 ? points : undefined,
    tip: tipText,
  };
};
