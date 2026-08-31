# redback.ai — Spider Explorer AI

redback.ai is a mobile-first AI application for identifying spider species from photographs and presenting reliable scientific and educational information about the identified species.

## Documentation

- Product requirements: `docs/product/PRD.md`
- Functional requirements: `docs/product/functional-requirements.md`
- Architecture: `docs/architecture/system-architecture.md`
- API contract: `docs/api/API.md`
- Database: `docs/database/schema.md`
- AI pipeline: `docs/ai/AI-PIPELINE.md`
- Security: `docs/security/security.md`
- Development: `docs/development/setup.md`
- Deployment: `docs/deployment/deployment.md`
- Testing: `docs/testing/testing-strategy.md`
- Research/data: `docs/research/data-sources.md`
- ADRs: `docs/decisions/001-core-architecture.md`

## Current product scope

The current Redback screen list contains 13 screens:
1. Splash
2. Onboarding
3. Login
4. Register
5. Home
6. Camera Scanner
7. Upload Image
8. AI Results
9. Species Details
10. Search
11. Learning Center
12. User Profile
13. Settings

Notification, quiz, favorite, and standalone learning-module features were removed from the earlier class-diagram scope. Learning content remains represented by the Learning Center screen and can be powered through the AI/API approach.

## Suggested stack

- Mobile: React Native + Expo + Expo Router
- Backend: NestJS + PostgreSQL
- Auth: JWT + bcrypt/argon2-equivalent password hashing
- AI integration: external vision-capable AI API, abstracted behind the backend
- Scientific/search data: curated database plus external/open biodiversity sources where licensing and reliability permit
- Storage: object storage for uploaded images
- Optional async jobs: Redis + BullMQ

## Principles

1. AI predictions are probabilistic, not absolute.
2. Venom/toxicity information must be presented conservatively and with source attribution.
3. Scientific names and taxonomy should be traceable to authoritative sources.
4. User images are private by default.
5. API keys and model credentials never live in the mobile client.
