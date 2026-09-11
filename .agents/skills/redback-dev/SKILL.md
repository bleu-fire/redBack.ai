---
name: redback-dev
description: >-
  Specialized development skill and runbook for the redBack.ai spider identification and education platform. Use when developing, debugging, or testing the React Native / Expo mobile app (Expo SDK 54, Expo Router), Express.js / TypeScript / Mongoose backend, AI vision identification pipeline, or spider taxonomy and venom safety workflows.
---

# redBack.ai Development Skill & Runbook

Welcome to the dedicated development skill for **redBack.ai**, an AI-powered spider identification, educational taxonomy, and biodiversity discovery ecosystem.

This runbook establishes strict coding standards, architectural rules, domain-specific safeguards, and troubleshooting workflows for both the mobile client and backend API.

---

## 1. Project Overview & Architecture

```text
redBack.ai/
├── mobile/            # React Native / Expo SDK 54 (Expo Router file-based screens)
├── backend/           # Express.js REST API with TypeScript & Mongoose (MongoDB)
├── ai-service/        # Provider-neutral AI vision identification abstraction
├── docs/              # PRD, Architecture Decision Records (ADRs), Schema & Screen Map
└── docker-compose.yml # Local MongoDB database instance
```

---

## 2. Mobile Development Guidelines (React Native / Expo SDK 54)

### File-Based Routing (Expo Router)
1. **Lowercase Filenames**: Screen files in `mobile/app/` **MUST** be lowercase or kebab-case (e.g., `login.tsx`, `register.tsx`, `settings.tsx`). Never use PascalCase (e.g. `LoginScreen.tsx`).
2. **One File Per Route**: Avoid duplicate files for the same screen. Follow the 13 defined screens in [Screen Map](./references/screen-map.md).
3. **Leading Slash Navigation**: Always use paths starting with `/` (e.g. `router.replace('/(tabs)')`, `router.push('/(auth)/register')`).
4. **No Direct Secret Keys**: Never store vision model keys or database credentials in the mobile client. Always proxy requests through the Express backend.

### Asset Resolution & Layout Patterns
- **Project Alias (`@/`)**: Always require static assets with the `@/` path alias:
  ```tsx
  <ImageBackground source={require('@/assets/images/spider-bg.png')} contentFit="cover" style={{ flex: 1 }}>
  ```
  *(Never use bare specifiers like `require("assets/...")` which fail in Metro bundler).*
- **Full-Screen Backgrounds**: Always wrap the root screen container in `<ImageBackground>` with `style={{ flex: 1, width: '100%', height: '100%' }}` and a subtle overlay (e.g. `backgroundColor: 'rgba(0, 0, 0, 0.4)'`) to keep typography readable.

---

## 3. Backend & Database Architecture (Express.js / TypeScript / MongoDB)

### API Standards
- **Endpoint Prefix**: All API endpoints must start with `/api/v1/` (e.g., `/api/v1/auth`, `/api/v1/species`, `/api/v1/identifications`, `/api/v1/learning`).
- **Models**: Maintain Mongoose schemas in `backend/src/models/` ([API & Models Reference](./references/api-specs.md)).
- **Centralized Errors**: Throw `AppError(message, statusCode)` inside controllers; let `error.middleware.ts` format standard error JSON.

### Local Database
- Start local MongoDB via Docker:
  ```bash
  docker compose up -d
  ```

---

## 4. Spider Domain & AI Pipeline Safeguards

### Mandatory Safety & Medical Disclaimer
The app identifies potentially dangerous species (e.g., *Latrodectus hasselti* / Redback, *Atrax robustus* / Sydney Funnel-web).
- **Rule**: **NEVER** provide medical advice, emergency bite treatment, or safety guarantees.
- **Requirement**: Always include the safety disclaimer in identification screens:
  > *"redBack.ai provides educational species identification assistance only. If bitten by a spider or experiencing severe symptoms, seek immediate emergency medical care."*

### Handling AI Uncertainty
- When confidence is `< 70%`, fallback to genus/family level (e.g., *Latrodectus sp.* or *Theridiidae*) and invite the user to retake the photo with better lighting or closer angle.

---

## 5. Development & Verification Runbooks

### Run Dev Servers
- **Mobile**:
  ```bash
  cd mobile && npx expo start
  ```
- **Backend**:
  ```bash
  cd backend && npm run dev
  ```

### Build & Type Verification (Run Before Completing Any Task)
```bash
# Verify mobile TypeScript compiles clean:
cd mobile && ./node_modules/.bin/tsc --noEmit

# Verify backend TypeScript compiles clean:
cd backend && ./node_modules/.bin/tsc --noEmit
```

---

## 6. Supplementary References

- [Screen Map](./references/screen-map.md): Comprehensive routing table for all 13 core screens.
- [API & Models](./references/api-specs.md): Mongoose schemas, field definitions, and endpoint specs.
- [Troubleshooting Guide](./references/troubleshooting.md): Solutions for Metro resolver, Expo Router duplication, and Docker issues.
