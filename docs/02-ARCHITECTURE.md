# System Architecture — redBack.ai

## 1. High-Level Architecture

```text
+-------------------------------------------------------------+
|                      Mobile Client                          |
|             (React Native / Expo SDK 54)                    |
|             - Expo Router (File-based)                      |
|             - Camera & ImagePicker API                      |
|             - Axios HTTP Client                             |
+------------------------------+------------------------------+
                               | HTTPS / JSON
                               v
+-------------------------------------------------------------+
|                      Backend API                            |
|             (Node.js / Express.js / TypeScript)             |
|                                                             |
|   +-------------------+              +------------------+   |
|   |  modules/auth     |              |  modules/species |   |
|   |  - user.model.ts  |              |  - model.ts      |   |
|   |  - auth.service.ts|              |  - controller.ts |   |
|   |  - controller.ts  |              |  - routes.ts     |   |
|   +-------------------+              +------------------+   |
|               |                                |            |
|               +----------------+---------------+            |
|                                |                            |
|                                v                            |
|                    +-----------------------+                |
|                    |     Middlewares       |                |
|                    |  (auth, error, cors)  |                |
|                    +-----------------------+                |
+------------------------------+------------------------------+
                               |
               +---------------+---------------+
               |                               |
               v                               v
    +--------------------+           +--------------------+
    |  MongoDB Database  |           | AI Vision Provider |
    |  (Users, Species,  |           | (Gemini Vision /   |
    |   Observations)    |           |  Custom Model API) |
    +--------------------+           +--------------------+
```

---

## 2. Technology Stack

### Mobile Client
- **Framework:** React Native with Expo (SDK 54)
- **Routing:** Expo Router (`app/` directory, lowercase routes)
- **State & Networking:** Axios with configured `baseURL`
- **UI Components:** Custom themed dark/light components with lucide icons

### Backend API
- **Runtime:** Node.js (v20+) with TypeScript (ES2021)
- **Framework:** Express.js 4.x
- **Architecture:** Feature-Based / Vertical Slice (`src/modules/`)
- **Database ODM:** Mongoose 8.x (MongoDB)
- **Authentication:** JWT (JSON Web Tokens) + Bcrypt password hashing
- **Testing:** Unit tests via tsx test runner

---

## 3. Directory Layout

```text
redBack.ai/
├── mobile/                  # Frontend Expo application
│   ├── app/                 # Expo Router screens (13 core screens)
│   ├── assets/              # Logos, 3D assets, translations
│   ├── components/          # Reusable UI components
│   └── data/                # API client (api.ts, logic.ts)
│
├── backend/                 # Backend REST API
│   ├── src/
│   │   ├── config/          # DB connection & environment variables
│   │   ├── middlewares/     # Auth guard & global error handler
│   │   ├── modules/         # Feature modules
│   │   │   ├── auth/        # Model, Service, Controller, Routes
│   │   │   └── species/     # Model, Controller, Routes
│   │   ├── scripts/         # DB seed scripts
│   │   ├── app.ts           # Express application setup
│   │   └── server.ts        # Server entrypoint & port listener
│
└── docs/                    # Official Project Documentation
```

