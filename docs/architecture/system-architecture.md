# System Architecture

```text
┌───────────────────────┐
│ React Native / Expo   │
│ Mobile App            │
└───────────┬───────────┘
            │ HTTPS
            ▼
┌───────────────────────┐
│ NestJS API            │
│ Auth / Species / Scan │
│ Search / Learning     │
└───────┬───────┬───────┘
        │       │
        │       ├──────────────┐
        ▼                      ▼
┌───────────────┐      ┌─────────────────┐
│ PostgreSQL    │      │ Object Storage  │
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

### NestJS API
- Authentication and authorization.
- Request validation.
- Image upload orchestration.
- AI adapter invocation.
- Species catalog queries.
- Result normalization.
- Rate limiting and audit logging.

### PostgreSQL
Stores users, species, taxonomy, sources, scans, predictions, and educational metadata.

### AI adapter
A provider-neutral service such as `VisionIdentificationService` keeps provider-specific SDKs out of domain logic.

## Recommended NestJS modules

- `AuthModule`
- `UsersModule`
- `SpeciesModule`
- `IdentificationModule`
- `SearchModule`
- `LearningModule`
- `UploadsModule`
- `HealthModule`
- `CommonModule`

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
