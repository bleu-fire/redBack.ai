import { SpeciesDetail } from './types';
import { AUSTRALIA_PRIMARY_SPECIES } from './australiaPrimary';
import { AUSTRALIA_SECONDARY_SPECIES } from './australiaSecondary';

export const AUSTRALIAN_SPECIES: SpeciesDetail[] = [
  ...AUSTRALIA_PRIMARY_SPECIES,
  ...AUSTRALIA_SECONDARY_SPECIES,
];
