import { SpeciesDetail } from './types';
import { MOROCCAN_PRIMARY_SPECIES } from './moroccoPrimary';
import { MOROCCAN_SECONDARY_SPECIES } from './moroccoSecondary';

export const MOROCCAN_SPECIES: SpeciesDetail[] = [
  ...MOROCCAN_PRIMARY_SPECIES,
  ...MOROCCAN_SECONDARY_SPECIES,
];
