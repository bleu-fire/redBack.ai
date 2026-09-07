# System Architecture

```text
┌───────────────────────┐
│ React Native / Expo   │
│ Mobile App            │
└───────────┬───────────┘
            │ HTTPS
            ▼
┌───────────────────────┐
│ Express.js API        │
│ Auth / Species / Scan │
│ Search / Learning     │
└───────┬───────┬───────┘
        │       │
        │       ├──────────────┐
        ▼                      ▼
┌───────────────┐      ┌─────────────────┐
│ MongoDB       │      │ Object Storage  │
│ Users/Species │      │ Uploaded images │
└───────────────┘      └─────────────────┘
        │
        │ species context
        ▼
┌───────────────────────┐
│ AI Adapter            │
│ Vision Model Provider │
└───────────┬───────────┘
            │
            ▼
┌───────────────────────┐
│ Structured Result     │
│ validation + ranking  │
└───────────────────────┘
```

## Responsibilities

### Mobile
- Camera/gallery access.
- Authentication UX.
- Upload UX.
- Results rendering.
- Search and profile UI.
- Never store provider API keys.

### Express.js API
- Authentication and authorization (JWT + bcrypt).
- Request validation and error handling middleware.
- Image upload orchestration (Multer).
- AI adapter invocation.
- Species catalog queries and text search.
- Result normalization.
- Rate limiting and audit logging.

### MongoDB
Stores users, species, taxonomy, sources, identifications, predictions, and educational metadata using Mongoose schemas.

### AI adapter
A provider-neutral service such as `VisionIdentificationService` keeps provider-specific SDKs out of domain logic.

## Express.js Modules & Routing Structure

- `routes/auth.routes.ts` & `controllers/auth.controller.ts` (Authentication & Profile)
- `routes/species.routes.ts` & `controllers/species.controller.ts` (Species Catalog & Search)
- `routes/identifications.routes.ts` & `controllers/identifications.controller.ts` (Image Upload & Predictions)
- `routes/learning.routes.ts` & `controllers/learning.controller.ts` (Learning Center Topics)
- `middlewares/auth.middleware.ts` & `middlewares/error.middleware.ts` (Security & Centralized Errors)
- `middlewares/upload.middleware.ts` (Multer file intake)
- `config/db.ts` & `config/env.ts` (MongoDB Connection & Environment Variables)

## Request flow

1. Client authenticates.
2. Client requests an identification.
3. API validates JWT and image metadata.
4. Image is stored temporarily/private.
5. AI adapter sends the image with a constrained identification prompt/schema.
6. Backend validates model output.
7. Predictions are resolved against canonical species records.
8. Backend returns normalized results.
9. Mobile renders confidence, details, and sources.
