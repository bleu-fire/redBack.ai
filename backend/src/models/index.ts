/**
 * Central Model Barrel Re-export
 * In the Modern Modular Monolith, schemas belong to their respective domain modules.
 * This barrel provides a unified import facade for cross-module queries, seeds, and tests.
 */

// Auth Domain
export * from '../modules/auth/user.model';

// Species & Biodiversity Domain
export * from '../modules/species/species.model';
export * from '../modules/species/favorite.model';

// AI Identification & Citizen Science Domain
export * from '../modules/Identification/identification.model';
export * from '../modules/Identification/observation.model';

// Learning & Education Domain
export * from '../modules/learning/learning-topic.model';
export * from '../modules/learning/quiz.model';
