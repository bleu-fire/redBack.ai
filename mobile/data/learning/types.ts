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
