export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface ProtocolRule {
  lead: string;
  detail: string;
}

export interface LearningModule {
  id: string;
  title: string;
  subtitle: string;
  category: 'Safety' | 'Morocco' | 'Australia' | 'Anatomy' | 'Webs';
  categoryBadge: string;
  readTime: string;
  xpReward: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Crucial';
  progress: number; // 0 to 100
  isFeatured?: boolean;
  coverImage: any;
  overview: string;
  keyTakeaways: string[];
  safetyAlert?: string;
  sections: {
    heading: string;
    content: string;
    bullets?: string[];
  }[];
  dosAndDonts?: {
    dos: (ProtocolRule | string)[];
    donts: (ProtocolRule | string)[];
  };
  quiz: QuizQuestion[];
}

export const LEARNING_MODULES: LearningModule[] = [
  {
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
        options: [
          '0537-68-64-64',
          '911-00-11',
          '13 11 26',
          '0800-POISON',
        ],
        correctIndex: 0,
        explanation:
          'Correct! The Moroccan Centre Anti-Poison et de Pharmacovigilance (CAPM) is available 24/7 at 0537-68-64-64.',
      },
    ],
  },
  {
    id: 'moroccan-spider-guide',
    title: 'Spiders of Morocco',
    subtitle: 'From the Mediterranean Black Widow to harmless desert jumpers.',
    category: 'Morocco',
    categoryBadge: 'Morocco',
    readTime: '8 min',
    xpReward: 60,
    difficulty: 'Intermediate',
    progress: 40,
    coverImage: require('@/assets/images/spider-bg.png'),
    overview:
      'Morocco features an extraordinary biodiversity of arachnids spanning the Atlas Mountains, Atlantic coastlines, and Sahara fringes. Learn to identify the 3 medically relevant species and our beneficial garden allies.',
    keyTakeaways: [
      'Only 2 Moroccan species pose significant venom risks: Latrodectus tredecimguttatus (Malmignatte) and Loxosceles rufescens (Violin spider).',
      'The Moroccan Funnel-Web (Macrothele calpeiana) is a protected ecological treasure.',
      'The Lobed Argiope (Argiope lobata) and Radiated Wolf Spider (Hogna radiata) are completely harmless and vital insect controllers.',
    ],
    sections: [
      {
        heading: 'Mediterranean Black Widow',
        content:
          'Unlike the Australian redback which has a single dorsal stripe, the Mediterranean black widow exhibits 13 bright red or orange spots surrounded by delicate pale borders. Found in rural wheat fields and scrublands, they are active mostly during warm summer harvest seasons.',
      },
      {
        heading: 'Mediterranean Recluse',
        content:
          'Recognizable by its fawn-brown coloring, violin motif, and unique six-eye configuration arranged in 3 pairs (dyads). They hide in urban closets, behind framed artwork, and underneath furniture.',
      },
      {
        heading: 'Harmless Cultural Favorites',
        content:
          'The Moroccan wall jumping spider (Menemerus semilimbatus) is welcomed in traditional riads for its voracious appetite for flies and mosquitoes. With huge soulful eyes, it poses zero risk to pets or children.',
      },
    ],
    quiz: [
      {
        id: 'mq1',
        question: 'How many red/orange spots does the Mediterranean black widow typically display?',
        options: ['1 red stripe', '13 distinct spots', 'Zero spots (all black)', '3 yellow circles'],
        correctIndex: 1,
        explanation:
          'Correct! Its scientific name Latrodectus tredecimguttatus refers to its 13 red or orange spots.',
      },
      {
        id: 'mq2',
        question: 'How many eyes does the Mediterranean Recluse (Loxosceles) possess?',
        options: ['8 eyes', '6 eyes arranged in 3 pairs', '2 large forward eyes', '4 eyes'],
        correctIndex: 1,
        explanation:
          'Correct! Loxosceles species have only 6 eyes arranged in three pairs (dyads), unlike most spiders which have 8.',
      },
    ],
  },
  {
    id: 'spider-anatomy-senses',
    title: 'Spider Anatomy & Sensory Superpowers',
    subtitle: 'Hydraulic legs, slit sensilla, and multiscopic vision.',
    category: 'Anatomy',
    categoryBadge: 'Anatomy',
    readTime: '5 min',
    xpReward: 50,
    difficulty: 'Beginner',
    progress: 100,
    coverImage: require('@/assets/images/spider-logo-3d.png'),
    overview:
      'Spiders are biomechanical masterpieces. Rather than using extensor muscles, they extend their legs using hydraulic blood pressure (hemolymph), allowing lightning-quick lunges.',
    keyTakeaways: [
      'Two main body segments: Cephalothorax (head + thorax) and Abdomen (opisthosoma).',
      'Hydraulic leg extension powered by hemolymph fluid pressure.',
      'Trichobothria (fine sensory hairs) detect airborne acoustic frequencies and approaching predators.',
    ],
    sections: [
      {
        heading: 'Cephalothorax vs Abdomen',
        content:
          'Unlike insects with 3 segments and antennae, spiders have 2 tagmata joined by a narrow waist called the pedicel. The cephalothorax bears 8 legs, chelicerae fangs, pedipalps, and eyes.',
      },
      {
        heading: 'Vision Across Families',
        content:
          'Orb-weavers have rudimentary eyesight optimized for sensing light vs dark, while jumping spiders possess telephoto binocular visual acuity exceeding that of cats and dogs per body length.',
      },
    ],
    quiz: [
      {
        id: 'aq1',
        question: 'How do spiders extend their legs without extensor muscles?',
        options: [
          'Hydraulic fluid pressure (hemolymph)',
          'Internal elastic rubber ligaments',
          'Magnetic repelling charges',
          'Tendon pulleys',
        ],
        correctIndex: 0,
        explanation:
          'Correct! Spiders use hydraulic fluid pressure pumped into their limbs to extend their legs.',
      },
    ],
  },
  {
    id: 'silk-and-web-architecture',
    title: 'Silk Chemistry & Web Architecture',
    subtitle: 'From sticky spiral engineering to subterranean trapdoors.',
    category: 'Webs',
    categoryBadge: 'Webs',
    readTime: '7 min',
    xpReward: 50,
    difficulty: 'Intermediate',
    progress: 0,
    coverImage: require('@/assets/images/spider-bg.png'),
    overview:
      'Spider dragline silk has a tensile strength greater than high-grade alloy steel and exceptional elasticity. Different gland types produce specialized silks for structural radial spokes, sticky capture spirals, and egg protection.',
    keyTakeaways: [
      'Spider silk is composed of crystalline protein chains (spidroins).',
      'Only the spiral threads of an orb web are coated in sticky glue; the spider walks on dry radial spokes.',
      'Stabilimentum: Bold zigzag silk ribbons that reinforce the web or warn birds to avoid flying through.',
    ],
    sections: [
      {
        heading: 'The 4 Web Architecture Types',
        content:
          '1. Orb Webs: Circular geometric masterpieces (Araneus, Argiope).\n2. Tangled Cobwebs: Chaotic 3D scaffolds with tension tripwires (Latrodectus).\n3. Funnel Webs: Horizontal sheet terminating in a deep escape tube (Atrax, Macrothele).\n4. Trapdoor Burrows: Camouflaged hinged subterranean vaults (Moggridgea).',
      },
    ],
    quiz: [
      {
        id: 'wq1',
        question: 'Why doesn\'t an orb-weaver spider stick to its own web?',
        options: [
          'It secretes oil from its feet and walks exclusively on non-sticky radial spokes',
          'It is immune to all adhesives',
          'The entire web is dry',
          'It flies across the gaps',
        ],
        correctIndex: 0,
        explanation:
          'Correct! Spiders carefully navigate the non-sticky structural spokes and have specialized foot claws (calamistrum/tarsal claws) coated in anti-adhesive secretions.',
      },
    ],
  },
];
