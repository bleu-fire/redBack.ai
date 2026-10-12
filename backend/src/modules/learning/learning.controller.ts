import { Request, Response, NextFunction } from 'express';

// Standard comprehensive learning modules catalog
export const LEARNING_MODULES_CATALOG = [
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
    coverImage: '/images/spider-3d.png',
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
      ],
      donts: [
        {
          lead: 'NEVER apply pressure bandage to Redback bite',
          detail: 'Pressure immobilization dramatically amplifies local agony without slowing latrotoxin absorption.',
        },
        {
          lead: 'NEVER incise, cut, or attempt suction',
          detail: 'Incision damages tissues and promotes dangerous secondary bacterial infection.',
        },
        {
          lead: 'NEVER apply tight arterial tourniquets',
          detail: 'Tourniquets cause permanent limb ischemia and gangrene.',
        },
      ],
    },
    quiz: [
      {
        id: 'q1',
        question: 'Which spider bite requires a cold pack instead of a pressure bandage?',
        options: [
          'Sydney Funnel-web spider',
          'Redback / Black Widow spider',
          'Mouse spider',
          'Moroccan Funnel-web spider',
        ],
        correctIndex: 1,
        explanation:
          'Latrodectus venoms (Redback & Black Widow) cause intense local neurotoxic pain that is worsened by pressure wrapping. An ice pack wrapped in cloth relieves pain.',
      },
      {
        id: 'q2',
        question: 'What is the correct emergency first-aid for a Funnel-Web spider bite?',
        options: [
          'Wash wound and walk to the nearest clinic',
          'Pressure Immobilisation Bandage (PIB) from fingers/toes up whole limb & immobilise victim',
          'Apply boiling water to neutralise venom',
          'Cut incision over fang puncture marks',
        ],
        correctIndex: 1,
        explanation:
          'Funnel-web venom spreads through the lymphatic system. A firm crepe bandage and complete immobilization delay the onset of life-threatening systemic crisis.',
      },
    ],
  },
  {
    id: 'moroccan-spider-fauna',
    title: 'North African & Moroccan Biodiversity',
    subtitle: 'From Atlas Cedar forests to Saharan oases: Morocco’s key arachnid taxa.',
    category: 'Morocco',
    categoryBadge: 'Taxonomy',
    readTime: '5 min',
    xpReward: 80,
    difficulty: 'Intermediate',
    progress: 40,
    isFeatured: false,
    coverImage: '/images/spider-3d.png',
    overview:
      'Morocco features an extraordinarily biodiverse arachnofauna shaped by the Atlantic coastline, Rif mountains, High Atlas ranges, and southern pre-Saharan steppes.',
    keyTakeaways: [
      'Macrothele calpeiana is the ONLY spider protected under European and Mediterranean conservation laws.',
      'Mediterranean Recluse (Loxosceles rufescens) is frequent around human dwellings, basements, and stone walls.',
      'Radiated Wolf Spider (Hogna radiata) is common in fields, visually striking, but medically harmless.',
    ],
    sections: [
      {
        heading: 'Biogeographical Crossroads',
        content:
          'Morocco is a critical biodiversity bridge linking Mediterranean Europe with the Saharan biome. Its microclimates foster high endemism across the High Atlas, Rif, and Anti-Atlas mountain chains.',
      },
      {
        heading: 'Protected Giant: Macrothele calpeiana',
        content:
          'Reaching 35–40 mm in body length with long spinnerets, Macrothele calpeiana is the largest mygalomorph spider in Europe and North Africa. It builds sheet webs under rocks and cork oak logs. While its bite is painful, it is not life-threatening.',
      },
      {
        heading: 'Urban & Domestic Dwellers',
        content:
          'Loxosceles rufescens (Mediterranean Recluse) frequently colonizes domestic environments across Casablanca, Marrakech, and Tangier. They are nocturnal, reclusive, and non-aggressive unless trapped inside footwear or bedding.',
      },
    ],
    quiz: [
      {
        id: 'q1',
        question: 'Which Moroccan spider is legally protected under Mediterranean conservation conventions?',
        options: [
          'Loxosceles rufescens (Recluse)',
          'Macrothele calpeiana (Moroccan Funnel-web)',
          'Hogna radiata (Radiated Wolf Spider)',
          'Argiope lobata (Lobed Argiope)',
        ],
        correctIndex: 1,
        explanation:
          'Macrothele calpeiana is protected under the Bern Convention (Appendix II) and the EU Habitats Directive due to habitat vulnerability.',
      },
    ],
  },
  {
    id: 'spider-anatomy-morphology',
    title: 'Arachnid Morphology & Diagnostic Keys',
    subtitle: 'Cephalothorax, chelicerae articulation, and eye arrangements explained.',
    category: 'Anatomy',
    categoryBadge: 'Biology',
    readTime: '4 min',
    xpReward: 60,
    difficulty: 'Beginner',
    progress: 0,
    isFeatured: false,
    coverImage: '/images/spider-3d.png',
    overview:
      'Learning key body zones and distinguishing spiders from insects is the foundation of field arachnology.',
    keyTakeaways: [
      'Spiders have 2 body tagmata: Cephalothorax (prosoma) and Abdomen (opisthosoma).',
      'All spiders have 8 walking legs (insects have 6).',
      'Mygalomorphae strike downwards; Araneomorphae strike in an opposing pincer motion.',
    ],
    sections: [
      {
        heading: 'Two Main Body Segments',
        content:
          'Unlike insects which have three tagmata (head, thorax, abdomen), arachnids have two: the fused head and thorax called the cephalothorax (prosoma), and the abdomen (opisthosoma).',
      },
      {
        heading: 'Chelicerae & Fangs: Orthognath vs Labidognath',
        content:
          'Primitive spiders (Mygalomorphs like Funnel-webs and Tarantulas) possess parallel fangs that strike straight downwards. Modern spiders (Araneomorphs like Widows and Orb-weavers) possess opposed fangs that strike sideways like tongs.',
      },
    ],
    quiz: [
      {
        id: 'q1',
        question: 'How many body segments (tagmata) does an adult spider possess?',
        options: ['1', '2 (Cephalothorax & Abdomen)', '3 (Head, Thorax, Abdomen)', '4'],
        correctIndex: 1,
        explanation:
          'All spiders possess two tagmata: the prosoma (cephalothorax) and the opisthosoma (abdomen), connected by a narrow pedicel.',
      },
    ],
  },
];

export class LearningController {
  getAllModules = async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(200).json({
        status: 'success',
        results: LEARNING_MODULES_CATALOG.length,
        data: LEARNING_MODULES_CATALOG,
      });
    } catch (error) {
      next(error);
    }
  };

  getModuleById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const found = LEARNING_MODULES_CATALOG.find(
        (m) => m.id.toLowerCase() === id.toLowerCase()
      );

      if (!found) {
        return res.status(404).json({
          status: 'fail',
          message: 'Learning module not found',
        });
      }

      res.status(200).json({
        status: 'success',
        data: found,
      });
    } catch (error) {
      next(error);
    }
  };
}

export const learningController = new LearningController();
export default learningController;
