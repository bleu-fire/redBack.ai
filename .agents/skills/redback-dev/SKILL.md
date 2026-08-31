---
name: redback-dev
description: >-
  Development guidelines, architecture patterns, and step-by-step procedures for building and testing the redback.ai backend (NestJS/PostgreSQL) and mobile client (React Native/Expo).
---

# Redback.ai Development Skill

This skill provides step-by-step procedures and standard conventions for developing, testing, and expanding the **redback.ai** ecosystem.

---

## 1. Directory Structure

- `backend/`: NestJS REST API microservice with TypeORM & PostgreSQL.
- `mobile/`: Expo / React Native mobile application with Expo Router.
- `ai-service/`: External AI vision service abstraction layer.
- `docs/`: Product, API, Database, and Architecture documentation.

---

## 2. Backend Development Workflow (NestJS)

### Architecture Rules
1. **Modules & Controllers**: Group by domain (`auth`, `species`, `identifications`, `learning`).
2. **DTO Validation**: Use `class-validator` and `class-transformer` for request payloads.
3. **Database Entities**: Keep TypeORM entities in `src/entities/` matching the schema in `docs/database/schema.md`.
4. **API Versioning**: Prefix all endpoints with `/api/v1`.

### Commands
- Start dev server:
  ```bash
  cd backend && npm run start:dev
  ```
- Build project:
  ```bash
  cd backend && npm run build
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
2. Ensure database schema changes remain synchronized with `docs/database/schema.md`.
