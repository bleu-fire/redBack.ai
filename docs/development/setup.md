# Development Setup

## Prerequisites

- Node.js LTS (v20+ recommended).
- npm or pnpm.
- MongoDB (local instance or MongoDB Atlas).
- Expo tooling (React Native).
- Git.

## Repository layout

```text
redback.ai/
├── backend/            # Express.js REST API with TypeScript & Mongoose
├── mobile/             # React Native / Expo mobile application
├── ai-service/         # External AI vision service abstraction layer
├── docs/               # System & Product documentation
└── README.md
```

## Environment variables (`backend/.env`)

```env
PORT=3000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/redback_db
JWT_SECRET=super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=7d
AI_API_KEY=
```

Never commit `.env` files containing secrets.

## Local workflow

1. Start MongoDB (e.g. `mongod` or Docker container).
2. Install backend dependencies: `cd backend && npm install`.
3. Start Express.js API in development: `npm run dev` (or `npm run start:dev`).
4. Build backend for production check: `npm run build`.
5. Start Expo mobile app: `cd mobile && npx expo start`.
6. Configure the mobile app to point to the local Express API URL reachable from your device or emulator.

## Code conventions

- TypeScript strict mode.
- DTO validation at API boundaries.
- Services contain business logic.
- Controllers remain thin.
- Repository/database access stays behind services/repositories.
- Shared response types live in a shared package where practical.
