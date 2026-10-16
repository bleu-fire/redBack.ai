import { LearningModule } from './types';
import { emergencyBiteSafetyModule } from './emergencyModule';
import {
  moroccanSpiderGuideModule,
  spiderAnatomySensesModule,
  silkAndWebArchitectureModule,
} from './speciesModules';

export const LEARNING_MODULES: LearningModule[] = [
  emergencyBiteSafetyModule,
  moroccanSpiderGuideModule,
  spiderAnatomySensesModule,
  silkAndWebArchitectureModule,
];

export {
  emergencyBiteSafetyModule,
  moroccanSpiderGuideModule,
  spiderAnatomySensesModule,
  silkAndWebArchitectureModule,
};
