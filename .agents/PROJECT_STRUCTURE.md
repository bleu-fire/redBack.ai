# Redback.ai Project Structure Reference

This document maps out the full repository tree and technical specification for **redback.ai** on branch `mobile`.

---

## 🏛 Architecture Summary

* **Frontend / Mobile Client**: React Native + Expo SDK 54 (Expo Router file-based screens) in `mobile/`.
* **Backend Architecture**: **Modern Modular Monolith** with TypeScript in `backend/` structured around isolated domain modules (`modules/auth`, `modules/species`, `modules/identification`, `modules/learning`) and a shared kernel (`shared/`).
* **AI & Vector Pipeline**: **Pinecone Vector Database** for sub-millisecond visual embedding similarity search & taxonomic candidate retrieval paired with a provider-neutral Multimodal Vision Model.
* **Database**: MongoDB (Mongoose) running via Docker Compose (`docker-compose.yml`) for structured species taxonomy, sightings, and user profiles.

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
│           ├── SKILL.md                  # Development skill & master runbook
│           └── references/
│               ├── design-system.md      # Naturalist design system tokens & specs
│               ├── system-design.md      # Modular monolith architecture & Pinecone pipeline
│               ├── screen-map.md         # 13 core screens routing table
│               ├── api-specs.md          # Domain module endpoints & Mongoose schemas
│               └── troubleshooting.md    # Common issue fixes
├── backend/                               # Modern Modular Monolith (Express.js + TypeScript)
│   ├── src/
│   │   ├── server.ts                     # Express server bootstrap & HTTP lifecycle
│   │   ├── app.ts                        # Express application instance & global middleware
│   │   ├── config/                       # Core infrastructure configurations
│   │   │   ├── db.ts                     # MongoDB connection via Mongoose
│   │   │   ├── env.ts                    # Env config variables validation
│   │   │   └── pinecone.ts               # Pinecone Vector Client configuration
│   │   ├── modules/                      # Domain Modules (Bounded Contexts)
│   │   │   ├── auth/                     # Auth & User Profile Domain
│   │   │   │   ├── auth.routes.ts        # /api/v1/auth routes
│   │   │   │   ├── auth.controller.ts    # Request handlers
│   │   │   │   ├── auth.service.ts       # Business logic & JWT tokens
│   │   │   │   └── user.model.ts         # User schema
│   │   │   ├── species/                  # Species Taxonomy & Catalog Domain
│   │   │   │   ├── species.routes.ts     # /api/v1/species routes
│   │   │   │   ├── species.controller.ts # Catalog & search handlers
│   │   │   │   ├── species.service.ts    # Taxonomy business logic & queries
│   │   │   │   └── species.model.ts      # Species schema
│   │   │   ├── identification/           # AI Vision & Pinecone Vector Search Domain
│   │   │   │   ├── identification.routes.ts # /api/v1/identifications routes
│   │   │   │   ├── identification.controller.ts # Image upload & scan handler
│   │   │   │   ├── identification.service.ts # AI pipeline orchestration
│   │   │   │   ├── pinecone.service.ts   # Pinecone visual embedding similarity search
│   │   │   │   ├── vision-adapter.service.ts # Vision model provider abstraction
│   │   │   │   └── identification.model.ts # Identification observation schema
│   │   │   └── learning/                 # Education & Citizen Science Domain
│   │   │       ├── learning.routes.ts    # /api/v1/learning routes
│   │   │       ├── learning.controller.ts# Topic & quiz handlers
│   │   │       ├── learning.service.ts   # Educational content business logic
│   │   │       └── learning-topic.model.ts # LearningTopic schema
│   │   └── shared/                       # Shared Kernel across modules
│   │       ├── errors/                   # AppError and standardized error response
│   │       ├── middlewares/              # auth.middleware.ts, error.middleware.ts, upload.middleware.ts
│   │       └── utils/                    # Common helper utilities & logger
│   ├── .env.example
│   ├── package.json
│   └── tsconfig.json
├── mobile/                                # React Native / Expo Mobile Application
│   ├── app/                              # 13 Expo Router screens
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
│   │   ├── results.tsx                   # Screen 8: AI Identification Results
│   │   └── settings.tsx                  # Screen 13: User Settings
│   ├── assets/                           # Media & design assets
│   │   └── design/                       # UI concepts, system design & UI kit posters
│   ├── components/                       # Shared UI components & design system modules
│   │   └── ui/                           # Button, Badge, SafetyCard, StatCounter
│   ├── constants/                        # Theme tokens, colors & typography
│   │   └── theme.ts                      # Naturalist palette tokens
│   ├── hooks/                            # Custom React hooks
│   └── package.json                      # Expo package dependencies
├── docs/                                  # Full system specs & PRDs
├── docker-compose.yml                     # MongoDB container
├── Description.md                         # Detailed PRD
└── README.md                              # Main README
```
