import { SpeciesDetail } from './species/types';
import { MOROCCAN_SPECIES } from './species/morocco';
import { AUSTRALIAN_SPECIES } from './species/australia';

export * from './species/types';
export * from './species/morocco';
export * from './species/australia';
export * from './species/clinicalThreat';

export const SPECIES_CATALOG: SpeciesDetail[] = [
  ...MOROCCAN_SPECIES,
  ...AUSTRALIAN_SPECIES,
];
