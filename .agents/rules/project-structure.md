# Project Structure Guidelines & Map

This document outlines the official file and folder structure for **redback.ai** (Express.js + Mongoose backend & Expo / React Native mobile app).

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
├── backend/                               # Express.js REST API + Mongoose (MongoDB)
│   ├── src/
│   │   ├── server.ts                     # Server entrypoint (Prefix: /api/v1)
│   │   ├── app.ts                        # Express application setup
│   │   ├── config/                       # DB and env configurations
│   │   │   ├── db.ts
│   │   │   └── env.ts
│   │   ├── models/                       # Mongoose models
│   │   │   ├── user.model.ts
│   │   │   ├── species.model.ts
│   │   │   ├── identification.model.ts
│   │   │   └── learning-topic.model.ts
│   │   ├── controllers/                  # Route controllers
│   │   │   ├── auth.controller.ts
│   │   │   ├── species.controller.ts
│   │   │   ├── identifications.controller.ts
│   │   │   └── learning.controller.ts
│   │   ├── routes/                       # Express routes
│   │   │   ├── index.ts
│   │   │   ├── auth.routes.ts
│   │   │   ├── species.routes.ts
│   │   │   ├── identifications.routes.ts
│   │   │   └── learning.routes.ts
│   │   └── middlewares/                  # Auth, error, and upload middlewares
│   │       ├── auth.middleware.ts
│   │       ├── error.middleware.ts
│   │       └── upload.middleware.ts
│   ├── .env.example                      # Environment variables template
│   ├── package.json                      # Node.js dependencies (Express + Mongoose)
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
1. **Backend**: Express.js with TypeScript and Mongoose with MongoDB.
2. **Mobile**: Expo SDK with Expo Router for file-based routing.
3. **Database**: MongoDB running via Docker Compose (`docker-compose.yml`).
