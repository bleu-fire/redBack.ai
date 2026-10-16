import { LearningModule } from './types';

export const emergencyBiteSafetyModule: LearningModule = {
  id: 'emergency-bite-safety',
  title: 'Emergency Bite Safety & Protocols',
  subtitle: 'Lifesaving first-aid rules for North African and Australian venomous species.',
  category: 'Safety',
  categoryBadge: 'First Aid',
  readTime: '6 min',
  xpReward: 100,
  difficulty: 'Crucial',
  progress: 75,
  isFeatured: true,
  coverImage: require('@/assets/images/spider-3d.png'),
  overview:
    'Understanding the fundamental distinction between neurotoxic funnel-web bites and latrodectus (black widow/redback) bites can save lives. Never treat all spider bites with the same protocol.',
  safetyAlert:
    'redBack.ai provides educational guidance only. If bitten by a potentially venomous spider or experiencing systemic cramps or respiratory distress, contact emergency services immediately.',
  keyTakeaways: [
    'Funnel-Web / Mouse Spider: Requires immediate Pressure Immobilization Bandage (PIB) like a snakebite.',
    'Redback / Black Widow (Latrodectus): Requires COLD ice pack. Never use pressure bandage (it exacerbates severe local pain).',
    'NEVER cut the bite, suck venom, or apply arterial tourniquets.',
    'Morocco Poison Center (CAPM): 0537-68-64-64 | Australia Poisons: 13 11 26',
  ],
  sections: [
    {
      heading: 'Two Distinct Venom Pathways',
      content:
        'Spiders of medical importance produce drastically distinct venoms requiring opposing physical management strategies:',
      bullets: [
        'Funnel-Web Spiders (Atrax, Macrothele): Rapidly acting delta-atracotoxins attack ion channels. Lymphatic spread must be delayed using firm elastic compression (PIB).',
        'Widow Spiders (Latrodectus hasselti, L. tredecimguttatus): Alpha-latrotoxins act slowly at presynaptic junctions. Pressure wrapping severely amplifies burning pain without slowing toxin action.',
      ],
    },
    {
      heading: 'Morocco Emergency Response (Centre Anti-Poison)',
      content:
        'In Morocco, the Mediterranean Black Widow and Mediterranean Recluse cause 99% of serious bites. The Centre Anti-Poison et de Pharmacovigilance du Maroc (CAPM) operates 24/7. Always photograph the specimen safely from 30 cm away for rapid hospital verification.',
    },
    {
      heading: 'First-Aid Action Matrix',
      content:
        '1. Reassure victim and keep them completely immobile.\n2. Wash wound gently with clean water and mild soap.\n3. Apply appropriate thermal treatment (Ice for Latrodectus; elastic wrap for Funnel-webs).\n4. Seek urgent emergency evaluation.',
    },
  ],
  dosAndDonts: {
    dos: [
      {
        lead: 'Keep patient calm & resting flat',
        detail: 'Immobilize the victim to significantly slow lymphatic poison dissemination.',
      },
      {
        lead: 'Apply cold compress for Latrodectus',
        detail: 'Wrap ice in a clean cloth to relieve severe local pain from Redback / Widow bites.',
      },
      {
        lead: 'Apply firm crepe bandage for Funnel-webs',
        detail: 'Wrap firmly from digits upward toward the heart to contain fast-moving neurotoxins.',
      },
      {
        lead: 'Photograph specimen safely',
        detail: 'Use redBack.ai from 30 cm away so emergency physicians can select correct antivenom.',
      },
    ],
    donts: [
      {
        lead: 'Never apply arterial tourniquets',
        detail: 'Occluding arterial blood flow causes severe tissue necrosis and amputation risk.',
      },
      {
        lead: 'Never incise or attempt suction',
        detail: 'Cutting bite marks or attempting mouth suction introduces fatal systemic infection.',
      },
      {
        lead: 'No pressure wrap on Redbacks',
        detail: 'Bandaging does not delay widow venom and severely escalates excruciating local pain.',
      },
      {
        lead: 'Never allow victim to walk',
        detail: 'Physical exertion pumps muscles, accelerating venom delivery into critical organs.',
      },
    ],
  },
  quiz: [
    {
      id: 'q1',
      question: 'What is the correct first-aid protocol for a Redback or Black Widow bite?',
      options: [
        'Arterial tourniquet above the joint',
        'Cold ice pack wrapped in a cloth to relieve localized pain',
        'Firm pressure immobilization bandage (PIB)',
        'Cutting the wound to bleed out venom',
      ],
      correctIndex: 1,
      explanation:
        'Correct! For Latrodectus bites, cold ice packs reduce intense pain. Pressure bandages should NOT be used as they dramatically increase local suffering.',
    },
    {
      id: 'q2',
      question: 'Which spider bite REQUIRES a Pressure Immobilization Bandage (PIB) like a snakebite?',
      options: [
        'Sydney Funnel-Web Spider (Atrax robustus)',
        'Huntsman Spider',
        'Garden Orb-Weaver',
        'Jumping Spider',
      ],
      correctIndex: 0,
      explanation:
        'Correct! Sydney funnel-web venom moves through the lymphatic system. A firm pressure immobilization bandage dramatically delays systemic distribution.',
    },
    {
      id: 'q3',
      question: 'What is the 24/7 emergency hotline for Morocco Anti-Poison Center (CAPM)?',
      options: ['0537-68-64-64', '911-00-11', '13 11 26', '0800-POISON'],
      correctIndex: 0,
      explanation:
        'Correct! The Moroccan Centre Anti-Poison et de Pharmacovigilance (CAPM) is available 24/7 at 0537-68-64-64.',
    },
  ],
};
