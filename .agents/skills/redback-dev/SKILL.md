---
name: redback-dev
description: >-
  Development guidelines, architecture patterns, and step-by-step procedures for building and testing the redback.ai backend (Express.js/MongoDB) and mobile client (React Native/Expo).
---

# Redback.ai Development Skill

This skill provides step-by-step procedures and standard conventions for developing, testing, and expanding the **redback.ai** ecosystem.

---

## 1. Directory Structure

- `backend/`: Express.js REST API microservice with TypeScript & Mongoose (MongoDB).
- `mobile/`: Expo / React Native mobile application with Expo Router.
- `ai-service/`: External AI vision service abstraction layer.
- `docs/`: Product, API, Database, and Architecture documentation.

---

## 2. Backend Development Workflow (Express.js)

### Architecture Rules
1. **Controllers & Routes**: Group by domain (`auth`, `species`, `identifications`, `learning`).
2. **Mongoose Models**: Keep Schema & Models in `backend/src/models/`.
3. **API Versioning**: Prefix all endpoints with `/api/v1`.
4. **Error Handling**: Use `AppError` and centralized error middleware.

### Commands
- Start dev server:
  ```bash
  cd backend && npm run dev
  ```
- Build project:
  ```bash
  cd backend && npm run build
  ```
- Start production server:
  ```bash
  cd backend && npm start
  ```

---

## 3. Mobile Development Workflow (React Native / Expo)

### Architecture Rules
1. Use **Expo Router** file-based routing inside `mobile/app/`.
2. Follow screen specs defined in `docs/screen-map.md` (13 core screens).
3. Do not hardcode API credentials in the mobile client; delegate AI and database calls through the backend API.

### Commands
- Start Expo dev server:
  ```bash
  cd mobile && npx expo start
  ```

---

## 4. Verification & Testing

Before declaring success on any change:
1. Verify TypeScript compiles clean without errors (`npm run build`).
2. Ensure database schema and API endpoints remain synchronized with `docs/api/API.md` and `docs/database/schema.md`.
