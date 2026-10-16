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
      intro: `### Field Arachnologist Ready\nHello! I am **Naturalist AI (Reddy)**, your field arachnologist connected directly to the **redBack.ai** species database.\n\n### Specimen Focus\n- Focus: **${speciesName}** (*${scientificName}*)\n- Inquire about ++clinical venom danger++, triage, and emergency first aid\n- Inquire about ++eye pattern morphology++ and identification markers\n- Compare against similar local and international look-alikes`,
    },
  ];
};

export const parseAiResponse = (
  raw: string
): { intro: string; points?: string[]; tip?: string } => {
  if (!raw) return { intro: '' };

  // Convert || and ~ to ++ (green highlight) and strip stray delimiter symbols
  let text = raw
    .replace(/\|\|([^|\n]+)\|\|/g, '++$1++')
    .replace(/~~([^~\n]+)~~/g, '++$1++')
    .replace(/~([^~\n]+)~/g, '++$1++')
    .replace(/[|~]/g, '');

  const lines = text.split('\n');
  const bodyLines: string[] = [];
  let tipText: string | undefined;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) {
      bodyLines.push('');
      continue;
    }

    if (/^\*?(Tip|Note):\s*/i.test(line)) {
      tipText = line.replace(/^\*?(Tip|Note):\s*/i, '').replace(/\*+$/, '').trim();
    } else {
      bodyLines.push(line);
    }
  }

  return {
    intro: bodyLines.join('\n').trim(),
    tip: tipText,
  };
};
