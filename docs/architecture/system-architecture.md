# System Architecture — redBack.ai

```text
┌─────────────────────────────────────────────────────────────┐
│                      Mobile Client                          │
│             (React Native / Expo SDK 54)                    │
│             - Expo Router (File-based)                      │
│             - Naturalist Field-Journal Design System        │
│             - Camera Scanner & Photo Picker                 │
│             - Offline Sightings Cache (AsyncStorage)        │
└──────────────────────────────┬──────────────────────────────┘
                               │ HTTPS / JSON
                               ▼
┌─────────────────────────────────────────────────────────────┐
│               Modern Modular Monolith Backend               │
│             (Node.js / Express.js / TypeScript)             │
│                                                             │
│   ┌───────────────────┐              ┌──────────────────┐   │
│   │  modules/auth     │              │  modules/species │   │
│   │  - user.model.ts  │              │  - species.model │   │
│   │  - auth.service.ts│              │  - service.ts    │   │
│   │  - controller.ts  │              │  - controller.ts │   │
│   │  - routes.ts      │              │  - routes.ts     │   │
│   └───────────────────┘              └──────────────────┘   │
│                                                             │
│   ┌─────────────────────────┐        ┌──────────────────┐   │
│   │  modules/identification │        │ modules/learning │   │
│   │  - identification.model │        │ - learning.model │   │
│   │  - pinecone.service.ts  │        │ - service.ts     │   │
│   │  - vision-adapter.ts    │        │ - controller.ts  │   │
│   │  - controller & routes  │        │ - routes.ts      │   │
│   └─────────────────────────┘        └──────────────────┘   │
│               │                                │            │
│               └────────────────┬───────────────┘            │
│                                │                            │
│                                ▼                            │
│                    ┌───────────────────────┐                │
│                    │     Shared Kernel     │                │
│                    │ (auth, error, upload) │                │
│                    └───────────────────────┘                │
└──────────────────────────────┬──────────────────────────────┘
                               │
               ┌───────────────┼───────────────┐
               │               │               │
               ▼               ▼               ▼
    ┌────────────────────┐ ┌────────────────────┐ ┌────────────────────┐
    │  MongoDB Database  │ │ Pinecone Vector DB │ │ Multimodal AI Model│
    │  (Users, Species,  │ │ (Visual Embeddings │ │ (Vision Validation │
    │   Observations)    │ │  Fast K-NN Search) │ │   & Explanations)  │
    └────────────────────┘ └────────────────────┘ └────────────────────┘
```

## Responsibilities

### Mobile
- Camera/gallery access with live viewfinder framing reticle.
- Authentication UX (Login, Register).
- Results rendering with confidence badges and medical disclaimer.
- Search and profile UI.
- Never store provider API keys.

### Express.js API: Modern Modular Monolith
- **Modular Monolith Organization:** Feature-based bounded contexts inside `src/modules/` (`auth`, `species`, `identification`, `learning`).
- **Pinecone Vector Database:** High-dimensional visual similarity search and K-NN classification against reference species catalog embeddings.
- **Multimodal AI Vision:** Provider-neutral vision verification producing morphological visual evidence.
- **Shared Kernel:** Centralized `AppError`, rate limiting, and Multer file upload in `src/shared/`.
- **Medical Disclaimer:** Strict server-side enforcement of mandatory safety disclaimers on every identification payload.

### MongoDB
Stores users, species taxonomy, sources, identifications, and citizen science educational topics.
