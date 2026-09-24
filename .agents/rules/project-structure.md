# Project Structure Guidelines & Map

This document outlines the official file and folder structure for **redback.ai** featuring a **Modern Modular Monolith** backend (Express.js + TypeScript + Mongoose + Pinecone Vector Database) and Expo / React Native mobile app.

---

## 📁 Repository Overview

```text
redBack.ai/
├── .agents/                               # Custom agent rules & skills
│   ├── rules/
│   │   └── project-structure.md          # Project layout specifications
│   ├── skills/
│   │   └── redback-dev/
│   │       ├── SKILL.md                  # Development skill & master runbook
│   │       └── references/               # Modular deep-dive runbooks
│   │           ├── design-system.md      # Naturalist design system tokens & specs
│   │           ├── system-design.md      # Full-stack modular architecture & AI pipeline
│   │           ├── screen-map.md         # 13 core screens routing table
│   │           ├── api-specs.md          # Backend module contracts & schemas
│   │           └── troubleshooting.md    # Common issue fixes
│   └── PROJECT_STRUCTURE.md              # High-level architecture map
├── backend/                               # Modern Modular Monolith (Express.js + TypeScript)
│   ├── src/
│   │   ├── server.ts                     # HTTP listener & process lifecycle
│   │   ├── app.ts                        # Express application assembly & global middlewares
│   │   ├── config/                       # Core infrastructure configurations
│   │   │   ├── env.ts                    # Environment variables validation
│   │   │   ├── db.ts                     # MongoDB connection via Mongoose
│   │   │   └── pinecone.ts               # Pinecone Vector Client configuration
│   │   ├── modules/                      # Domain-driven Bounded Contexts (Modular Monolith)
│   │   │   ├── auth/                     # Authentication & User Management Module
│   │   │   │   ├── auth.routes.ts        # /api/v1/auth routes
│   │   │   │   ├── auth.controller.ts    # Request handlers
│   │   │   │   ├── auth.service.ts       # Business logic & password hashing
│   │   │   │   └── user.model.ts         # User Mongoose schema
│   │   │   ├── species/                  # Species Taxonomy & Catalog Module
│   │   │   │   ├── species.routes.ts     # /api/v1/species routes
│   │   │   │   ├── species.controller.ts # Catalog & search handlers
│   │   │   │   ├── species.service.ts    # Taxonomy business logic & queries
│   │   │   │   └── species.model.ts      # Species Mongoose schema
│   │   │   ├── identification/           # AI Vision & Vector Search Module
│   │   │   │   ├── identification.routes.ts # /api/v1/identifications routes
│   │   │   │   ├── identification.controller.ts # Image upload & scan handler
│   │   │   │   ├── identification.service.ts # Orchestrator for AI pipeline
│   │   │   │   ├── pinecone.service.ts   # Pinecone vector similarity search & indexing
│   │   │   │   ├── vision-adapter.service.ts # Multimodal vision provider abstraction
│   │   │   │   └── identification.model.ts # Identification observation schema
│   │   │   └── learning/                 # Education Center & Citizen Science Module
│   │   │       ├── learning.routes.ts    # /api/v1/learning routes
│   │   │       ├── learning.controller.ts# Topic & quiz handlers
│   │   │       ├── learning.service.ts   # Educational content business logic
│   │   │       └── learning-topic.model.ts # LearningTopic schema
│   │   └── shared/                       # Shared Kernel across modules
│   │       ├── errors/                   # AppError and standardized error response
│   │       ├── middlewares/              # auth.middleware.ts, error.middleware.ts, upload.middleware.ts
│   │       └── utils/                    # Common helper utilities & logger
│   ├── .env.example                      # Environment variables template
│   ├── package.json                      # Node.js dependencies
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
│   ├── assets/                           # Media & design assets
│   │   └── design/                       # UI concepts, system design & UI kit posters
│   ├── components/                       # Shared UI components & design system modules
│   │   └── ui/                           # Button, Badge, SafetyCard, StatCounter
│   ├── constants/                        # Theme tokens, colors & typography
│   │   └── theme.ts                      # Naturalist palette tokens
│   ├── hooks/                            # Custom React hooks
│   └── package.json                      # Expo package dependencies
├── docs/                                  # Project specifications & ADRs
│   ├── architecture/                     # System architecture (Modern Modular Monolith)
│   ├── ai/                               # AI Vision & Pinecone Vector pipeline
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
1. **Backend Architecture**: Modern Modular Monolith with clean domain boundaries (`src/modules/*`), isolating business logic, models, controllers, and services per feature domain.
2. **AI & Vector Search**: Dual AI pipeline combining **Pinecone Vector Database** (for ultra-fast visual embedding similarity search & nearest-neighbor taxonomic candidate retrieval) with **Multimodal Vision Models** (for morphological reasoning, validation, and explanations).
3. **Database**: MongoDB (via Mongoose) for structured relational species metadata, user observations, and citizen science journals.
4. **Mobile**: Expo SDK 54 with Expo Router for file-based routing and a warm Naturalist Field-Journal UI design system.
