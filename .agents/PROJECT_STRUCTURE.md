# Redback.ai Project Structure Reference

This document maps out the full repository tree and technical specification for **redback.ai**.

---

## 🏛 Architecture Summary

* **Frontend / Mobile Client**: React Native + Expo (Expo Router) in `mobile/`.
* **Backend API**: Express.js + Mongoose (MongoDB) with TypeScript in `backend/`.
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
│   │   ├── server.ts                     # Express server bootstrap
│   │   ├── app.ts                        # Express application instance
│   │   ├── config/                       # Configuration modules
│   │   │   ├── db.ts                     # Mongoose connection
│   │   │   └── env.ts                    # Env config variables
│   │   ├── models/                       # Mongoose data models
│   │   │   ├── user.model.ts
│   │   │   ├── species.model.ts
│   │   │   ├── identification.model.ts
│   │   │   └── learning-topic.model.ts
│   │   ├── controllers/                  # Route handlers
│   │   │   ├── auth.controller.ts
│   │   │   ├── species.controller.ts
│   │   │   ├── identifications.controller.ts
│   │   │   └── learning.controller.ts
│   │   ├── routes/                       # Express route modules
│   │   │   ├── index.ts                  # /api/v1 router aggregation
│   │   │   ├── auth.routes.ts
│   │   │   ├── species.routes.ts
│   │   │   ├── identifications.routes.ts
│   │   │   └── learning.routes.ts
│   │   └── middlewares/                  # Express middlewares
│   │       ├── auth.middleware.ts
│   │       ├── error.middleware.ts
│   │       └── upload.middleware.ts
│   ├── .env.example
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
