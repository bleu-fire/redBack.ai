# ADR-001: Core Architecture

## Status
Accepted

## Decision

Use React Native + Expo for the mobile client and Express.js (TypeScript) + MongoDB (Mongoose) for the backend. Integrate external vision AI through a provider abstraction in the backend.

## Reasons

- TypeScript across the entire application stack.
- Strong mobile development workflow through Expo.
- Express.js provides lightweight, high-performance, and flexible REST API routing.
- MongoDB and Mongoose provide flexible document modeling for rich species metadata, prediction arrays, and educational content.
- Provider abstraction prevents AI vendor lock-in.
- Keeping AI credentials server-side improves security.

## Consequences

The mobile client depends on the backend for AI operations. The backend must manage image storage, provider failures, validation, and scientific data synchronization.
