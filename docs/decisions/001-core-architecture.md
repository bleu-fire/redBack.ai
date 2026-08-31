# ADR-001: Core Architecture

## Status
Accepted

## Decision

Use React Native + Expo for the mobile client and NestJS + PostgreSQL for the backend. Integrate external vision AI through a provider abstraction in the backend.

## Reasons

- TypeScript across the main application stack.
- Strong mobile development workflow through Expo.
- NestJS provides modular backend boundaries.
- PostgreSQL is appropriate for relational user/species/source data.
- Provider abstraction prevents AI vendor lock-in.
- Keeping AI credentials server-side improves security.

## Consequences

The mobile client depends on the backend for AI operations. The backend must manage image storage, provider failures, validation, and scientific data synchronization.
