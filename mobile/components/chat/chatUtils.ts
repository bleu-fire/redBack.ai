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
): StructuredChatMessage[] => [
  {
    id: 'm1',
    sender: 'user',
    time: '9:42 AM',
    text: `Why do you think this is a ${speciesName}? What features support this identification?`,
  },
  {
    id: 'm2',
    sender: 'bot',
    time: '9:42 AM',
    intro: `Based on your observation photo, these features support ${speciesName} (${scientificName}):`,
    supportingPoints: [
      'Distinct vivid red/orange abdominal dorsal marking pattern',
      'Glossy spherical dark body shape typical of Latrodectus',
      'Characteristic tangled irregular cobweb structure and posture',
    ],
    uncertainPoints: [
      'Clearer view of ventral hourglass marking needed to confirm sex',
      'Lighting makes leg segment spines less distinct',
    ],
  },
  {
    id: 'm3',
    sender: 'user',
    time: '9:44 AM',
    text: 'What should I photograph next to confirm this with higher confidence?',
  },
  {
    id: 'm4',
    sender: 'bot',
    time: '9:44 AM',
    intro: 'To elevate identification confidence, try to capture:',
    actionSteps: [
      { number: 1, text: 'Clearer side-angle profile of abdomen and dorsal markings' },
      { number: 2, text: 'Web structure (irregular tangled maze vs orb sheet)' },
      { number: 3, text: 'Ventral underside to inspect hourglass pattern if safely visible' },
    ],
    tip: 'Maintain safe distance (20–30 cm). Use 2x or 3x optical zoom with daylight rather than getting close.',
  },
];

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
