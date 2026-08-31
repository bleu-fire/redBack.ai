# Redback.ai Project Structure Reference

This document maps out the full repository tree and technical specification for **redback.ai**.

---

## 🏛 Architecture Summary

* **Frontend / Mobile Client**: React Native + Expo (Expo Router) in `mobile/`.
* **Backend API**: NestJS + `@nestjs/mongoose` (MongoDB) in `backend/`.
* **Database**: MongoDB running via Docker Compose (`docker-compose.yml`).

---

## 📂 Complete File Tree

```text
redBack.ai/
├── .agents/
│   ├── PROJECT_STRUCTURE.md              # Project structure reference
│   ├── rules/
│   │   └── project-structure.md          # Architecture & file mapping rules
│   └── skills/
│       └── redback-dev/
│           └── SKILL.md                  # Development procedures & guidelines
├── backend/
│   ├── src/
│   │   ├── main.ts                       # NestJS bootstrap script
│   │   ├── app.module.ts                 # Main application module
│   │   ├── schemas/                      # Mongoose data schemas
│   │   │   ├── user.schema.ts
│   │   │   ├── species.schema.ts
│   │   │   ├── identification.schema.ts
│   │   │   └── learning-topic.schema.ts
│   │   ├── auth/                         # Authentication module
│   │   │   ├── auth.module.ts
│   │   │   ├── auth.controller.ts
│   │   │   └── auth.service.ts
│   │   ├── species/                      # Species search & catalog module
│   │   │   ├── species.module.ts
│   │   │   ├── species.controller.ts
│   │   │   └── species.service.ts
│   │   ├── identifications/              # AI image identification module
│   │   │   ├── identifications.module.ts
│   │   │   ├── identifications.controller.ts
│   │   │   └── identifications.service.ts
│   │   └── learning/                     # Learning topics module
│   │       ├── learning.module.ts
│   │       ├── learning.controller.ts
│   │       └── learning.service.ts
│   ├── .env.example
│   ├── nest-cli.json
│   ├── package.json
│   └── tsconfig.json
├── mobile/
│   ├── app/                              # 13 Expo Router screens
│   │   ├── (auth)/
│   │   │   ├── login.tsx                 # Login
│   │   │   └── register.tsx              # Register
│   │   ├── (tabs)/
│   │   │   ├── index.tsx                 # Home
│   │   │   ├── explore.tsx               # Search / Explore
│   │   │   ├── learn.tsx                 # Learning Center
│   │   │   └── profile.tsx               # Profile
│   │   ├── species/
│   │   │   └── [id].tsx                  # Species Details
│   │   ├── index.tsx                     # Splash
│   │   ├── onboarding.tsx                # Onboarding
│   │   ├── scanner.tsx                   # Camera Scanner
│   │   ├── upload.tsx                    # Upload Image
│   │   ├── results.tsx                   # AI Identification Results
│   │   └── settings.tsx                  # User Settings
│   ├── assets/
│   ├── components/
│   └── package.json
├── docs/                                  # Full system specs & PRDs
├── docker-compose.yml                     # MongoDB container
├── Description.md                         # Detailed PRD
└── README.md                              # Main README
```
