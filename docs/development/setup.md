# Development Setup

## Prerequisites

- Node.js LTS compatible with the selected NestJS/Expo versions.
- npm or pnpm.
- PostgreSQL.
- Expo tooling.
- Git.

## Repository layout

```text
redback.ai/
├── apps/
│   ├── mobile/
│   └── api/
├── services/
│   └── ai/
├── packages/
│   ├── types/
│   ├── validation/
│   └── config/
├── docs/
├── scripts/
└── README.md
```

## Environment variables

```env
DATABASE_URL=
JWT_SECRET=
AI_PROVIDER=
AI_API_KEY=
OBJECT_STORAGE_ENDPOINT=
OBJECT_STORAGE_BUCKET=
OBJECT_STORAGE_ACCESS_KEY=
OBJECT_STORAGE_SECRET_KEY=
```

Never commit `.env` files containing secrets.

## Local workflow

1. Start PostgreSQL.
2. Run migrations.
3. Seed a small development species dataset.
4. Start NestJS API.
5. Start Expo mobile app.
6. Configure the mobile app to use the local API URL reachable from the device/emulator.

## Code conventions

- TypeScript strict mode.
- DTO validation at API boundaries.
- Services contain business logic.
- Controllers remain thin.
- Repository/database access stays behind services/repositories.
- Shared response types live in a shared package where practical.
