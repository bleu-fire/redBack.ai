# System Architecture — redBack.ai

## 1. High-Level Architecture: Modern Modular Monolith

```text
+-------------------------------------------------------------+
|                      Mobile Client                          |
|             (React Native / Expo SDK 54)                    |
|             - Expo Router (File-based routing)              |
|             - Naturalist Field-Journal Design System        |
|             - Camera Scanner & Photo Picker                 |
|             - Offline Sightings Cache (AsyncStorage)        |
+------------------------------+------------------------------+
                               | HTTPS / JSON
                               v
+-------------------------------------------------------------+
|               Modern Modular Monolith Backend               |
|             (Node.js / Express.js / TypeScript)             |
|                                                             |
|   +-------------------+              +------------------+   |
|   |  modules/auth     |              |  modules/species |   |
|   |  - user.model.ts  |              |  - species.model |   |
|   |  - auth.service.ts|              |  - service.ts    |   |
|   |  - controller.ts  |              |  - controller.ts |   |
|   |  - routes.ts      |              |  - routes.ts     |   |
|   +-------------------+              +------------------+   |
|                                                             |
|   +-------------------------+        +------------------+   |
|   |  modules/identification |        | modules/learning |   |
|   |  - identification.model |        | - learning.model |   |
|   |  - pinecone.service.ts  |        | - service.ts     |   |
|   |  - vision-adapter.ts    |        | - controller.ts  |   |
|   |  - controller & routes  |        | - routes.ts      |   |
|   +-------------------------+        +------------------+   |
|               |                                |            |
|               +----------------+---------------+            |
|                                |                            |
|                                v                            |
|                    +-----------------------+                |
|                    |     Shared Kernel     |                |
|                    | (auth, error, upload) |                |
|                    +-----------------------+                |
+------------------------------+------------------------------+
                               |
               +---------------+---------------+
               |               |               |
               v               v               v
    +--------------------+ +--------------------+ +--------------------+
    |  MongoDB Database  | | Pinecone Vector DB | | Multimodal AI Model|
    |  (Users, Species,  | | (Visual Embeddings | | (Vision Validation |
    |   Observations)    | |  Fast K-NN Search) | |   & Explanations)  |
    +--------------------+ +--------------------+ +--------------------+
```

---

## 2. Technology Stack

### Mobile Client
- **Framework:** React Native with Expo (SDK 54)
- **Routing:** Expo Router (`app/` directory, lowercase routes)
- **UI Design System:** Naturalist Field-Journal theme tokens (`mobile/constants/theme.ts`) with custom UI components (`Button`, `Badge`, `SafetyCard`, `StatCounter`)
- **State & Networking:** Axios client with token interceptors
- **Icons:** Lucide React Native

### Backend API: Modern Modular Monolith
- **Runtime:** Node.js (v20+) with TypeScript
- **Framework:** Express.js 4.x
- **Architecture:** **Modern Modular Monolith** with domain-driven bounded contexts in `src/modules/` and a `src/shared/` kernel.
- **Vector Database for AI:** **Pinecone Vector Database** for dense image embedding similarity search and instant nearest-neighbor taxonomic candidate retrieval.
- **Relational / Document DB:** MongoDB (via Mongoose 8.x) for curated taxonomy, user accounts, and observations.
- **Authentication:** Stateless JWT + Bcrypt password hashing.

---

## 3. Directory Layout

```text
redBack.ai/
├── mobile/                  # Frontend Expo application
│   ├── app/                 # Expo Router screens (13 core screens)
│   ├── assets/              # Logos, design posters, 3D assets
│   │   └── design/          # system-design.png, ui-components-kit.png
│   ├── components/          # Reusable UI components & design system modules
│   │   └── ui/              # Button, Badge, SafetyCard, StatCounter
│   ├── constants/           # Theme tokens (theme.ts)
│   └── data/                # API client
│
├── backend/                 # Modern Modular Monolith API
│   ├── src/
│   │   ├── config/          # DB connection, env, and Pinecone vector config
│   │   │   ├── db.ts
│   │   │   ├── env.ts
│   │   │   └── pinecone.ts
│   │   ├── modules/         # Domain Feature Modules (Modular Monolith)
│   │   │   ├── auth/        # Model, Service, Controller, Routes
│   │   │   ├── species/     # Model, Service, Controller, Routes
│   │   │   ├── identification/ # Pinecone vector search, vision model, controller, routes
│   │   │   └── learning/    # Learning topics, quizzes, controller, routes
│   │   ├── shared/          # Shared Kernel across modules
│   │   │   ├── errors/      # AppError & centralized error formatting
│   │   │   ├── middlewares/ # Auth guard, Multer upload, and error handling
│   │   │   └── utils/       # Helpers and logger
│   │   ├── app.ts           # Express application setup
│   │   └── server.ts        # Server entrypoint & port listener
│
└── docs/                    # Official Project Documentation
```
