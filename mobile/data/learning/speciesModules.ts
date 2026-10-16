import { LearningModule } from './types';

export const moroccanSpiderGuideModule: LearningModule = {
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
};

export const spiderAnatomySensesModule: LearningModule = {
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
};

export const silkAndWebArchitectureModule: LearningModule = {
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
      question: "Why doesn't an orb-weaver spider stick to its own web?",
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
};
