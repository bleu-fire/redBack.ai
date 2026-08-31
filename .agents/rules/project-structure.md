# Project Structure Guidelines & Map

This document outlines the official file and folder structure for **redback.ai** (NestJS + Mongoose backend & Expo / React Native mobile app).

---

## 📁 Repository Overview

```text
redBack.ai/
├── .agents/                               # Custom agent rules & skills
│   ├── rules/
│   │   └── project-structure.md          # Project layout specifications
│   └── skills/
│       └── redback-dev/
│           └── SKILL.md                  # Development skill & runbook
├── backend/                               # NestJS REST API + Mongoose (MongoDB)
│   ├── src/
│   │   ├── main.ts                       # Entrypoint (Prefix: /api/v1)
│   │   ├── app.module.ts                 # Main root NestJS module
│   │   ├── schemas/                      # Mongoose data schemas
│   │   │   ├── user.schema.ts
│   │   │   ├── species.schema.ts
│   │   │   ├── identification.schema.ts
│   │   │   └── learning-topic.schema.ts
│   │   ├── auth/                         # Authentication module (JWT + bcrypt)
│   │   │   ├── auth.module.ts
│   │   │   ├── auth.controller.ts
│   │   │   └── auth.service.ts
│   │   ├── species/                      # Species catalog & search module
│   │   │   ├── species.module.ts
│   │   │   ├── species.controller.ts
│   │   │   └── species.service.ts
│   │   ├── identifications/              # AI Identification scanner module
│   │   │   ├── identifications.module.ts
│   │   │   ├── identifications.controller.ts
│   │   │   └── identifications.service.ts
│   │   └── learning/                     # Educational content module
│   │       ├── learning.module.ts
│   │       ├── learning.controller.ts
│   │       └── learning.service.ts
│   ├── .env.example                      # Environment variables template
│   ├── nest-cli.json                     # NestJS CLI configuration
│   ├── package.json                      # Node.js dependencies (NestJS + Mongoose)
│   └── tsconfig.json                     # TypeScript compiler configuration
├── mobile/                                # React Native / Expo Mobile Application
│   ├── app/                              # Expo Router file-based screens (13 screens)
│   │   ├── (auth)/
│   │   │   ├── login.tsx                 # Screen 3: Login
│   │   │   └── register.tsx              # Screen 4: Register
│   │   ├── (tabs)/
│   │   │   ├── index.tsx                 # Screen 5: Home Dashboard
│   │   │   ├── explore.tsx               # Screen 10: Search / Discover
│   │   │   ├── learn.tsx                 # Screen 11: Learning Center
│   │   │   └── profile.tsx               # Screen 12: User Profile
│   │   ├── species/
│   │   │   └── [id].tsx                  # Screen 9: Species Details
│   │   ├── index.tsx                     # Screen 1: Splash
│   │   ├── onboarding.tsx                # Screen 2: Onboarding
│   │   ├── scanner.tsx                   # Screen 6: Camera Scanner
│   │   ├── upload.tsx                    # Screen 7: Upload Image
│   │   ├── results.tsx                   # Screen 8: AI Results
│   │   └── settings.tsx                  # Screen 13: Settings
│   ├── assets/                           # Media & icon assets
│   ├── components/                       # Shared UI components
│   ├── hooks/                            # Custom React hooks
│   └── package.json                      # Expo package dependencies
├── docs/                                  # Project specifications & ADRs
│   ├── product/                          # PRD, functional requirements, roadmap
│   ├── api/                              # REST API endpoint specifications
│   ├── database/                         # Database design specs
│   └── screen-map.md                     # Screen navigation map (13 screens)
├── docker-compose.yml                     # Local MongoDB container setup
├── Description.md                         # Detailed Product Requirements Document
└── README.md                              # Main project readme
```

---

## 🛠️ Stack Principles
1. **Backend**: NestJS framework using `@nestjs/mongoose` with MongoDB.
2. **Mobile**: Expo SDK with Expo Router for file-based routing.
3. **Database**: MongoDB running via Docker Compose (`docker-compose.yml`).
